import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/lib/auth"
import { db, dbAvailable } from "@/lib/db"
import { userToolData } from "@/lib/db/schema"
import { eq, and } from "drizzle-orm"
import { headers } from "next/headers"

async function getUser() {
  const session = await auth.api.getSession({ headers: await headers() })
  return session?.user ?? null
}

// GET /api/tool-data/[key]  → { value: string | null }
export async function GET(
  _req: NextRequest,
  { params }: { params: Promise<{ key: string }> }
) {
  if (!dbAvailable) return NextResponse.json({ value: null })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

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
  if (!dbAvailable) return NextResponse.json({ error: "DB not configured" }, { status: 503 })

  const user = await getUser()
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

  const { key } = await params
  const { value } = await req.json() as { value: string }

  if (typeof value !== "string") {
    return NextResponse.json({ error: "value must be a JSON string" }, { status: 400 })
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
