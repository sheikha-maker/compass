import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db, dbAvailable } from "@/lib/db"
import { userToolData } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { headers } from "next/headers"
import { enforceRateLimit, LIMITS } from "@/lib/rate-limit"

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

// GET /api/tool-data/[key]  → { value: string | null }
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const burst = enforceRateLimit(req, null, "tool-data:burst", LIMITS.burst)
  if (burst) return burst

  if (!dbAvailable) return NextResponse.json({ value: null })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const limited = enforceRateLimit(req, user.id, "tool-data:read", LIMITS.read)
  if (limited) return limited

  const { key } = await params
  const rows = await db
    .select()
    .from(userToolData)
    .where(and(eq(userToolData.userId, user.id), eq(userToolData.toolKey, key)))

  return NextResponse.json({ value: rows[0]?.value ?? null })
}

// PUT /api/tool-data/[key]  body: { value: string }  → { ok: true }
export async function PUT(
  req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  const burst = enforceRateLimit(req, null, "tool-data:burst", LIMITS.burst)
  if (burst) return burst

  if (!dbAvailable) return NextResponse.json({ error: "DB not configured" }, { status: 503 })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const limited = enforceRateLimit(req, user.id, "tool-data:write", LIMITS.sync)
  if (limited) return limited

  const { key } = await params
  const { value } = await req.json() as { value: string }

  if (typeof value !== "string") {
    return NextResponse.json({ error: "value must be a JSON string" }, { status: 400 })
  }

  // Guard against a single row being used to dump megabytes into Postgres.
  const MAX_VALUE_BYTES = 100_000
  if (value.length > MAX_VALUE_BYTES) {
    return NextResponse.json({ error: "value is too large" }, { status: 413 })
  }

  // Upsert: update if row exists, insert otherwise
  const existing = await db
    .select({ id: userToolData.id })
    .from(userToolData)
    .where(and(eq(userToolData.userId, user.id), eq(userToolData.toolKey, key)))

  if (existing.length > 0) {
    await db
      .update(userToolData)
      .set({ value, updatedAt: new Date() })
      .where(eq(userToolData.id, existing[0].id))
  } else {
    await db.insert(userToolData).values({
      id: crypto.randomUUID(),
      userId: user.id,
      toolKey: key,
      value,
    })
  }

  return NextResponse.json({ ok: true })
}
