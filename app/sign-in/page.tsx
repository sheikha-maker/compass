"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Compass, Loader2 } from "lucide-react"
import { signIn } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function SignInForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/tools/wellness"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    const { error: authError } = await signIn.email({ email, password })

    if (authError) {
      setError(signInErrorMessage(authError))
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        {/* Logo */}
        <Link href="/" className="mb-8 flex items-center gap-2 hover:opacity-80 transition-opacity">
          <Compass className="h-7 w-7 text-primary" aria-hidden="true" />
          <div>
            <p className="font-serif text-xl font-semibold leading-tight text-foreground">
              The Pre-Med Compass
            </p>
            <p className="text-xs text-muted-foreground">Moravian University</p>
          </div>
        </Link>

        <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">Sign in</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Sign in to use the planning, application, hours, and wellness tools. Your progress syncs across devices.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@moravian.edu"
              required
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1.5"
            />
          </div>

          {error && (
            <p role="alert" className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" aria-hidden="true" />}
            {loading ? "Signing in…" : "Sign in"}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          No account yet?{" "}
          <Link
            href={`/sign-up?redirect=${encodeURIComponent(redirect)}`}
            className="font-medium text-primary underline underline-offset-2"
          >
            Create one
          </Link>
        </p>

        <p className="mt-4 text-center text-sm text-muted-foreground">
          <Link href="/" className="underline underline-offset-2">
            Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}

function signInErrorMessage(err: { status?: number; message?: string }) {
  if (err.status === 429) return "Too many attempts. Please wait a minute and try again."
  if (err.status === 403) return "Sign-in was blocked for security reasons. Refresh the page and try again."
  if (err.status && err.status >= 500) return "Something went wrong on our end. Please try again shortly."
  return err.message || "Couldn't sign in. Check your email and password."
}

export default function SignInPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    }>
      <SignInForm />
    </Suspense>
  )
}
