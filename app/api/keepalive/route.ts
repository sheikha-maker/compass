import { NextResponse } from "next/server"
import { db, dbAvailable } from "@/lib/db"
import { sql } from "drizzle-orm"

/**
 * GET /api/keepalive
 * Runs a trivial query to prevent Supabase from pausing the free-tier database.
 * Triggered daily by Vercel Cron (see vercel.json).
 * Also protected by CRON_SECRET so it can't be triggered by anyone else.
 */
export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization")
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  if (!dbAvailable) {
    return NextResponse.json({ ok: false, reason: "No database configured" }, { status: 200 })
  }

  try {
    await db.execute(sql`SELECT 1`)
    return NextResponse.json({ ok: true, timestamp: new Date().toISOString() })
  } catch (err) {
    console.error("[keepalive] Database ping failed:", err)
    return NextResponse.json({ ok: false, error: String(err) }, { status: 500 })
  }
}
