import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db, dbAvailable } from "@/lib/db"
import { activityLog } from "@/lib/db/schema"
import { eq, desc, and } from "drizzle-orm"
import { headers } from "next/headers"
import { enforceRateLimit, LIMITS } from "@/lib/rate-limit"

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

export async function GET(req: NextRequest) {
  const burst = enforceRateLimit(req, null, "logs:burst", LIMITS.burst)
  if (burst) return burst

  if (!dbAvailable) return NextResponse.json({ logs: [] })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const limited = enforceRateLimit(req, user.id, "logs:read", LIMITS.read)
  if (limited) return limited

  const logs = await db
    .select()
    .from(activityLog)
    .where(eq(activityLog.userId, user.id))
    .orderBy(desc(activityLog.createdAt))

  return NextResponse.json({ logs })
}

export async function POST(req: NextRequest) {
  const burst = enforceRateLimit(req, null, "logs:burst", LIMITS.burst)
  if (burst) return burst

  if (!dbAvailable) return NextResponse.json({ error: "DB not configured" }, { status: 503 })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const limited = enforceRateLimit(req, user.id, "logs:write", LIMITS.write)
  if (limited) return limited

  const body = await req.json()
  const { id, category, title, hours, date, endDate, note } = body

  // Basic validation — mirrors the check already done in /api/wellness
  if (typeof category !== "string" || !category.trim()) {
    return NextResponse.json({ error: "category is required" }, { status: 400 })
  }
  if (typeof title !== "string" || !title.trim()) {
    return NextResponse.json({ error: "title is required" }, { status: 400 })
  }
  if (typeof date !== "string" || !date.trim()) {
    return NextResponse.json({ error: "date is required" }, { status: 400 })
  }
  if (endDate !== undefined && endDate !== null && typeof endDate !== "string") {
    return NextResponse.json({ error: "endDate must be a string" }, { status: 400 })
  }
  if (note !== undefined && note !== null && typeof note !== "string") {
    return NextResponse.json({ error: "note must be a string" }, { status: 400 })
  }

  // Parse hours from string (form input) to float, clamping to a sane range
  let parsedHours: number | null = null
  if (hours !== undefined && hours !== null && hours !== "") {
    const n = parseFloat(String(hours))
    parsedHours = isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : null
  }

  await db.insert(activityLog).values({
    id: id ?? crypto.randomUUID(),
    userId: user.id,
    category,
    title,
    hours: parsedHours,
    date,
    endDate: endDate ?? null,
    note: note ?? null,
  })

  return NextResponse.json({ ok: true })
}

export async function DELETE(req: NextRequest) {
  const burst = enforceRateLimit(req, null, "logs:burst", LIMITS.burst)
  if (burst) return burst

  if (!dbAvailable) return NextResponse.json({ error: "DB not configured" }, { status: 503 })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const limited = enforceRateLimit(req, user.id, "logs:write", LIMITS.write)
  if (limited) return limited

  const { id } = await req.json()

  // Scope the delete to the current user so no one can delete someone else's log
  await db
    .delete(activityLog)
    .where(and(eq(activityLog.id, id), eq(activityLog.userId, user.id)))

  return NextResponse.json({ ok: true })
}
