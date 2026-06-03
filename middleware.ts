import { NextRequest, NextResponse } from "next/server"
import { betterFetch } from "@better-fetch/fetch"
import type { Session } from "@/lib/auth"

// Routes that require a logged-in account
const PROTECTED = [
  "/tools/wellness-hours",
  "/tools/application-prep",
  "/tools/milestones",
  "/tools/plan-check",
]

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p))
  if (!isProtected) return NextResponse.next()

  // Check session via better-auth
  const { data: session } = await betterFetch<Session>("/api/auth/get-session", {
    baseURL: request.nextUrl.origin,
    headers: { cookie: request.headers.get("cookie") ?? "" },
  })

  if (!session?.user) {
    const signInUrl = new URL("/sign-in", request.url)
    signInUrl.searchParams.set("redirect", pathname)
    return NextResponse.redirect(signInUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/tools/:path*"],
}
