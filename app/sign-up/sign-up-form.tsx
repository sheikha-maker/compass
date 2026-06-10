"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { Compass, Loader2 } from "lucide-react"
import { signUp } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirect = searchParams.get("redirect") ?? "/tools/wellness-hours"

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)

    if (password.length < 8) {
      setError("Password must be at least 8 characters.")
      setLoading(false)
      return
    }

    const { error: authError } = await signUp.email({ name, email, password })

    if (authError) {
      setError(authError.message ?? "Couldn't create account. Try a different email.")
      setLoading(false)
      return
    }

    router.push(redirect)
    router.refresh()
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="w-full max-w-sm">
        <div className="mb-8 flex items-center gap-2">
          <Compass className="h-7 w-7 text-primary" />
          <div>
            <p className="font-serif text-xl font-semibold leading-tight text-foreground">
              The Pre-Med Compass
            </p>
            <p className="text-xs text-muted-foreground">Moravian University</p>
          </div>
        </div>

        <h1 className="font-serif text-2xl font-semibold text-foreground mb-1">Create account</h1>
        <p className="text-sm text-muted-foreground mb-6">
          Save your activity logs and check-ins across devices.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              type="text"
              autoComplete="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your name"
              required
              className="mt-1.5"
            />
          </div>

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
              autoComplete="new-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 8 characters"
              required
              className="mt-1.5"
            />
          </div>

          {error && (
            <p className="rounded-lg border border-destructive/30 bg-destructive/10 px-3 py-2 text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full gap-2" disabled={loading}>
            {loading && <Loader2 className="h-4 w-4 animate-spin" />}
            Create account
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Already have an account?{" "}
          <Link
            href={`/sign-in?redirect=${encodeURIComponent(redirect)}`}
            className="font-medium text-primary underline underline-offset-2"
          >
            Sign in
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
