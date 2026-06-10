// better-auth/react calls useRef at module evaluation time, which crashes
// during Next.js server-side prerendering (React is null in that context).
//
// The fix: don't import better-auth/react at the top level. Instead, use
// require() inside a function so the module only loads in the browser.

// eslint-disable-next-line @typescript-eslint/no-require-imports
type AuthClient = ReturnType<typeof import("better-auth/react").createAuthClient>

let _client: AuthClient | null = null

function getClient(): AuthClient {
  if (typeof window === "undefined") {
    // Should never be called on the server, but return a no-op guard
    // rather than crashing if something slips through.
    throw new Error("auth-client must only be used in the browser")
  }
  if (!_client) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const { createAuthClient } = require("better-auth/react") as typeof import("better-auth/react")
    _client = createAuthClient({
      baseURL: window.location.origin,
    })
  }
  return _client
}

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
