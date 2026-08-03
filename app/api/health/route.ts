import { NextResponse } from "next/server"
import { sql } from "drizzle-orm"
import { db, dbAvailable } from "@/lib/db"
import { enforceRateLimit, LIMITS } from "@/lib/rate-limit"

/**
 * GET /api/health
 * Uptime-monitor endpoint. Verifies the two external dependencies the site needs:
 *   - Postgres (a real `SELECT 1`, not just "is DATABASE_URL set")
 *   - The Notion CMS token (a cheap authenticated call to /v1/users/me)
 *
 * Status codes:
 *   200 — everything healthy, or Notion degraded (the site falls back to static
 *         content, so it stays usable and shouldn't page anyone at 3am)
 *   503 — the database is unreachable or unconfigured; sign-in and every tool
 *         sync is broken, so this is a real outage
 *
 * The response body never contains secrets — only pass/fail plus latency.
 */

export const dynamic = "force-dynamic"

const CHECK_TIMEOUT_MS = 5000

type CheckStatus = "ok" | "error" | "not_configured"

type Check = {
  status: CheckStatus
  /** Round-trip time in ms, when the check actually ran. */
  latencyMs?: number
  /** Safe, human-readable reason — never includes credentials. */
  detail?: string
}

function withTimeout<T>(work: Promise<T>, ms: number, label: string): Promise<T> {
  let timer: ReturnType<typeof setTimeout>
  const timeout = new Promise<never>((_, reject) => {
    timer = setTimeout(() => reject(new Error(`${label} timed out after ${ms}ms`)), ms)
  })
  return Promise.race([work, timeout]).finally(() => clearTimeout(timer)) as Promise<T>
}

async function checkDatabase(): Promise<Check> {
  if (!dbAvailable) {
    return { status: "not_configured", detail: "DATABASE_URL is not set" }
  }

  const started = Date.now()
  try {
    await withTimeout(db.execute(sql`SELECT 1`), CHECK_TIMEOUT_MS, "database check")
    return { status: "ok", latencyMs: Date.now() - started }
  } catch (err) {
    console.error("[health] database check failed:", err)
    return {
      status: "error",
      latencyMs: Date.now() - started,
      detail: err instanceof Error ? err.message : "Unknown database error",
    }
  }
}

async function checkNotion(): Promise<Check> {
  if (!process.env.NOTION_API_KEY) {
    return { status: "not_configured", detail: "NOTION_API_KEY is not set — using static content" }
  }

  const started = Date.now()
  try {
    const res = await withTimeout(
      fetch("https://api.notion.com/v1/users/me", {
        headers: {
          Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
          "Notion-Version": "2022-06-28",
        },
        cache: "no-store",
      }),
      CHECK_TIMEOUT_MS,
      "notion check",
    )

    if (!res.ok) {
      return {
        status: "error",
        latencyMs: Date.now() - started,
        detail: `Notion API returned HTTP ${res.status}`,
      }
    }

    return { status: "ok", latencyMs: Date.now() - started }
  } catch (err) {
    console.error("[health] notion check failed:", err)
    return {
      status: "error",
      latencyMs: Date.now() - started,
      detail: err instanceof Error ? err.message : "Unknown Notion error",
    }
  }
}

export async function GET(req: Request) {
  const limited = enforceRateLimit(req, null, "health", LIMITS.health)
  if (limited) return limited

  const [database, notion] = await Promise.all([checkDatabase(), checkNotion()])

  // Notion failures are survivable (static fallback content); the DB is not.
  const healthy = database.status === "ok"
  const degraded = healthy && notion.status !== "ok"

  return NextResponse.json(
    {
      status: healthy ? (degraded ? "degraded" : "ok") : "unhealthy",
      timestamp: new Date().toISOString(),
      checks: { database, notion },
    },
    {
      status: healthy ? 200 : 503,
      headers: { "Cache-Control": "no-store, max-age=0" },
    },
  )
}
