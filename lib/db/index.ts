import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./schema"

const connectionString = process.env.DATABASE_URL

if (!connectionString) {
  console.warn(
    "[compass] DATABASE_URL is not set. Cloud persistence is disabled.\n" +
      "Add a Supabase (or any Postgres) connection string to .env.local to enable it."
  )
}

// Pool is created lazily — won't throw at import time if URL is missing
const pool = connectionString
  ? new Pool({ connectionString, ssl: { rejectUnauthorized: false } })
  : null

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const db = pool ? drizzle(pool, { schema }) : (null as any)
export const dbAvailable = !!pool
