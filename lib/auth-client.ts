import { createAuthClient } from "better-auth/react"

// createAuthClient internally calls useRef, which crashes if invoked during
// server-side prerendering (React is null in that context). We defer
// initialisation to the first actual call, which only ever happens in the browser.

type AuthClient = ReturnType<typeof createAuthClient>

let _client: AuthClient | null = null

function getClient(): AuthClient {
  if (!_client) {
    _client = createAuthClient({
      baseURL:
        typeof window !== "undefined"
          ? window.location.origin
          : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",
    })
  }
  return _client
}

// Wrap only the pieces the codebase actually uses.
// These are safe to export at module level because none are invoked until
// a user interaction or component render — never during static generation.

export const signIn = {
  email: (...args: Parameters<AuthClient["signIn"]["email"]>) =>
    getClient().signIn.email(...args),
}

export const signUp = {
  email: (...args: Parameters<AuthClient["signUp"]["email"]>) =>
    getClient().signUp.email(...args),
}

export function signOut(...args: Parameters<AuthClient["signOut"]>) {
  return getClient().signOut(...args)
}

// useSession is a React hook — only ever called inside client components,
// never during prerendering, so deferring via getClient() is safe.
export function useSession() {
  return getClient().useSession()
}
