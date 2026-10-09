import { drizzle } from "drizzle-orm/node-postgres"
import { Pool, type PoolConfig } from "pg"
import * as schema from "./db/schema"

const rawConnectionString = process.env.DATABASE_URL || process.env.POSTGRES_URL

export const dbAvailable = !!rawConnectionString

/**
 * Hosted Postgres (Supabase) requires SSL, but pg's default is no SSL — which
 * fails with "SSL connection is required". Supabase's certificate chain also
 * isn't in Node's default trust store, so strict verification would fail too.
 *
 * We drop any sslmode=... from the URL (pg lets URL settings override the
 * explicit ssl option) and set SSL ourselves. Local databases stay unencrypted.
 *
 * Note: rejectUnauthorized:false encrypts the connection but does not verify
 * the server's identity. To tighten this later, download Supabase's CA
 * certificate (Project Settings → Database → SSL Configuration) and pass it
 * as ssl: { ca } instead.
 */
function buildPoolConfig(connectionString: string): PoolConfig {
  try {
    const url = new URL(connectionString)
    url.searchParams.delete("sslmode")
    const isLocal = ["localhost", "127.0.0.1", "::1"].includes(url.hostname)
    return {
      connectionString: url.toString(),
      ssl: isLocal ? undefined : { rejectUnauthorized: false },
    }
  } catch {
    // Unparseable URL: fall back to the raw string and let pg report the problem.
    return { connectionString }
  }
}

export const db = dbAvailable
  ? drizzle(new Pool(buildPoolConfig(rawConnectionString as string)), { schema })
  : (null as any)
