/**
 * lib/rate-limit.ts
 * Lightweight in-process sliding-window rate limiter for the API routes.
 *
 * Scope & tradeoffs:
 * - State lives in module memory, so the budget is per serverless instance rather
 *   than global. That is enough to stop a single user or script hammering an
 *   endpoint, which is what these routes need — they are all per-user CRUD.
 * - If this ever needs to be strictly global (or survive cold starts), swap the
 *   `hits` map for Upstash Redis; the `checkRateLimit` signature stays the same.
 */

type Window = { count: number; resetAt: number }

const hits = new Map<string, Window>()

/** Drop expired windows so the map can't grow without bound. */
function sweep(now: number) {
  if (hits.size < 500) return
  for (const [key, win] of hits) {
    if (win.resetAt <= now) hits.delete(key)
  }
}

export type RateLimitResult = {
  ok: boolean
  limit: number
  remaining: number
  /** Seconds until the window resets. */
  retryAfter: number
}

export type RateLimitOptions = {
  /** Max requests allowed per window. */
  limit: number
  /** Window length in milliseconds. */
  windowMs: number
}

/**
 * Record a hit for `key` and report whether it is within budget.
 * Pure bookkeeping — callers decide what to do with a rejection.
 */
export function checkRateLimit(key: string, { limit, windowMs }: RateLimitOptions): RateLimitResult {
  const now = Date.now()
  sweep(now)

  const existing = hits.get(key)

  if (!existing || existing.resetAt <= now) {
    hits.set(key, { count: 1, resetAt: now + windowMs })
    return { ok: true, limit, remaining: limit - 1, retryAfter: 0 }
  }

  existing.count += 1
  const remaining = Math.max(0, limit - existing.count)

  return {
    ok: existing.count <= limit,
    limit,
    remaining,
    retryAfter: Math.max(1, Math.ceil((existing.resetAt - now) / 1000)),
  }
}

/**
 * Best-effort client identifier: prefer the authenticated user, fall back to the
 * forwarded client IP so unauthenticated bots are still bucketed.
 */
export function clientKey(req: Request, userId?: string | null): string {
  if (userId) return `user:${userId}`

  const forwarded = req.headers.get("x-forwarded-for")
  const ip = forwarded?.split(",")[0]?.trim() || req.headers.get("x-real-ip") || "unknown"
  return `ip:${ip}`
}

/** Standard rate-limit response headers for both allowed and rejected requests. */
export function rateLimitHeaders(result: RateLimitResult): Record<string, string> {
  const headers: Record<string, string> = {
    "X-RateLimit-Limit": String(result.limit),
    "X-RateLimit-Remaining": String(result.remaining),
  }
  if (!result.ok) headers["Retry-After"] = String(result.retryAfter)
  return headers
}

/**
 * Convenience wrapper for route handlers: returns a ready-to-send 429 when the
 * caller is over budget, or `null` when the request should proceed.
 *
 * `scope` namespaces the bucket so, e.g., reads and writes don't share a counter.
 */
export function enforceRateLimit(
  req: Request,
  userId: string | null | undefined,
  scope: string,
  options: RateLimitOptions,
): Response | null {
  const result = checkRateLimit(`${scope}:${clientKey(req, userId)}`, options)
  if (result.ok) return null

  return Response.json(
    { error: "Too many requests. Please slow down and try again shortly." },
    { status: 429, headers: rateLimitHeaders(result) },
  )
}

/** Shared budgets, kept in one place so limits stay consistent across routes. */
export const LIMITS = {
  /** Reads are cheap but still shouldn't be polled in a tight loop. */
  read: { limit: 60, windowMs: 60_000 },
  /** Writes touch Postgres, so they get a tighter budget. */
  write: { limit: 20, windowMs: 60_000 },
  /**
   * Tool autosave. Higher than `write` because a student actively editing several
   * tools legitimately produces more traffic (writes are debounced client-side).
   */
  sync: { limit: 60, windowMs: 60_000 },
  /** Uptime monitors poll this; generous but not unlimited. */
  health: { limit: 30, windowMs: 60_000 },
  /**
   * Pre-auth IP guard. Runs before the session lookup so an unauthenticated bot
   * can't force a DB round-trip per request. Deliberately generous because
   * campus NAT means many real students can share one address.
   */
  burst: { limit: 150, windowMs: 60_000 },
} as const
