import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db, dbAvailable } from "@/lib/db"
import { wellnessCheckin } from "@/lib/db/schema"
import { eq, asc, and } from "drizzle-orm"
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

  // Basic validation
  if (
    typeof weekKey !== "string" ||
    typeof dateLabel !== "string" ||
    typeof energy !== "number" ||
    typeof motivation !== "number" ||
    typeof stress !== "number"
  ) {
    return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
  }

  // Upsert — filter by weekKey in the query, not in JS
  const existing = await db
    .select({ id: wellnessCheckin.id })
    .from(wellnessCheckin)
    .where(
      and(
        eq(wellnessCheckin.userId, user.id),
        eq(wellnessCheckin.weekKey, weekKey)
      )
    )

  if (existing.length > 0) {
    await db
      .update(wellnessCheckin)
      .set({ energy, motivation, stress, dateLabel, loggedAt: new Date() })
      .where(eq(wellnessCheckin.id, existing[0].id))
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
