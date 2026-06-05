import { betterAuth } from "better-auth"
import { drizzleAdapter } from "better-auth/adapters/drizzle"
import { db, dbAvailable } from "./db"
import * as schema from "./db/schema"

const baseURL =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000")

export const auth = betterAuth({
  secret: process.env.BETTER_AUTH_SECRET!,
  baseURL,

  trustedOrigins: [
    baseURL,
    "https://v0-premedcompass.vercel.app",
    "http://localhost:3000",
    "https://*.vusercontent.net",
  ], // ✅ FIXED: comma added here

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