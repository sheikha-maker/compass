import { NextResponse } from "next/server"
import { db, dbAvailable } from "@/lib/db"
import { sql } from "drizzle-orm"
import { timingSafeEqual } from "crypto"

/**
 * GET /api/keepalive
 * Runs a trivial query to prevent Supabase from pausing the free-tier database.
 * Triggered daily by Vercel Cron (see vercel.json).
 * Also protected by CRON_SECRET so it can't be triggered by anyone else.
 */

/** Constant-time string compare so a mistimed guess can't leak the secret byte-by-byte. */
function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a)
  const bufB = Buffer.from(b)
  if (bufA.length !== bufB.length) return false
  return timingSafeEqual(bufA, bufB)
}

export async function GET(req: Request) {
  const authHeader = req.headers.get("authorization") ?? ""
  const expected = `Bearer ${process.env.CRON_SECRET ?? ""}`
  if (!process.env.CRON_SECRET || !safeEqual(authHeader, expected)) {
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
