import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db, dbAvailable } from "@/lib/db"
import { wellnessCheckin } from "@/lib/db/schema"
import { eq, asc } from "drizzle-orm"
import { headers } from "next/headers"

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

export async function GET() {
  if (!dbAvailable) return NextResponse.json({ checkins: [] })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const checkins = await db
    .select()
    .from(wellnessCheckin)
    .where(eq(wellnessCheckin.userId, user.id))
    .orderBy(asc(wellnessCheckin.loggedAt))

  return NextResponse.json({ checkins })
}

export async function POST(req: NextRequest) {
  if (!dbAvailable) return NextResponse.json({ error: "DB not configured" }, { status: 503 })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const body = await req.json()
  const { weekKey, dateLabel, energy, motivation, stress } = body

  // Upsert — one entry per week per user
  const existing = await db
    .select()
    .from(wellnessCheckin)
    .where(eq(wellnessCheckin.userId, user.id))

  const match = existing.find((e) => e.weekKey === weekKey)

  if (match) {
    await db
      .update(wellnessCheckin)
      .set({ energy, motivation, stress, dateLabel, loggedAt: new Date() })
      .where(eq(wellnessCheckin.id, match.id))
  } else {
    await db.insert(wellnessCheckin).values({
      id: crypto.randomUUID(),
      userId: user.id,
      weekKey,
      dateLabel,
      energy,
      motivation,
      stress,
    })
  }

  return NextResponse.json({ ok: true })
}
