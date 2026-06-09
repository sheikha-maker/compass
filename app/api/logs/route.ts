import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db, dbAvailable } from "@/lib/db"
import { activityLog } from "@/lib/db/schema"
import { eq, desc, and } from "drizzle-orm"
import { headers } from "next/headers"

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

export async function GET() {
  if (!dbAvailable) return NextResponse.json({ logs: [] })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const logs = await db
    .select()
    .from(activityLog)
    .where(eq(activityLog.userId, user.id))
    .orderBy(desc(activityLog.createdAt))

  return NextResponse.json({ logs })
}

export async function POST(req: NextRequest) {
  if (!dbAvailable) return NextResponse.json({ error: "DB not configured" }, { status: 503 })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { id, category, title, hours, date, endDate, note } = body

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
  if (!dbAvailable) return NextResponse.json({ error: "DB not configured" }, { status: 503 })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { id } = await req.json()

  // Scope the delete to the current user so no one can delete someone else's log
  await db
    .delete(activityLog)
    .where(and(eq(activityLog.id, id), eq(activityLog.userId, user.id)))

  return NextResponse.json({ ok: true })
}
