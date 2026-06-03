import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db, dbAvailable } from "./db"
import * as schema from "./db/schema"

if (!process.env.BETTER_AUTH_SECRET) {
  console.warn(
    "[compass] BETTER_AUTH_SECRET is not set. Auth will not work.\n" +
      "Run: openssl rand -base64 32  and add the output to .env.local"
  )
}

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET ?? "fallback-secret-change-me",
  baseURL: process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
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
    requireEmailVerification: false, // set true once you add an email provider
  },
  user: {
    additionalFields: {
      moravianEmail: {
        type: "string",
        required: false,
      },
    },
  },
})

export type Session = typeof auth.$Infer.Session
