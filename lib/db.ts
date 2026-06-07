import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./db/schema"

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

export const dbAvailable = !!connectionString

export const db = dbAvailable
  ? drizzle(new Pool({ connectionString, ssl: { rejectUnauthorized: false } }), { schema })
  : (null as any)