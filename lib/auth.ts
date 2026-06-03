import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db, dbAvailable } from "./db"
import * as schema from "./db/schema"

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL: process.env.NEXT_PUBLIC_SITE_URL!,
  database: dbAvailable
    ? drizzleAdapter(db, {
        provider: "pg",
        schema: {
          user: schema.user,
          session: schema.session,
          account: schema.account,
          verification: schema.verification,
        },
      })
    : undefined,
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: false,
  },
})