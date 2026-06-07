process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0"

import { drizzle } from "drizzle-orm/node-postgres"
import { Pool } from "pg"
import * as schema from "./db/schema"

const connectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

export const dbAvailable = !!connectionString

export const db = dbAvailable
  ? drizzle(new Pool({ connectionString }), { schema })
  : (null as any)