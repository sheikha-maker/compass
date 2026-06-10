// better-auth/react is an ESM package — top-level import is required.
// However, createAuthClient() calls useRef internally, which crashes during
// Next.js server-side prerendering (React is null in that context).
//
// Fix: import the module normally, but defer the createAuthClient() CALL
// to first browser use. The module import itself is safe; it's the function
// call that triggers the hook execution.

async function getClient() {
  const { createAuthClient } = await import("better-auth/react")

  return createAuthClient({
    baseURL: window.location.origin,
  })
}
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

// Each export is a wrapper that only calls getClient() when invoked —
// never at module evaluation time.

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

export function useSession() {
  return getClient().useSession()
}
