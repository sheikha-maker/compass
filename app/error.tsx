"use client"

import { useEffect } from "react"
import Link from "next/link"
import { Compass, Home, RefreshCw, LifeBuoy } from "lucide-react"
import { Button } from "@/components/ui/button"

const suggestions = [
  { href: "/mindset", label: "Mindset" },
  { href: "/your-path", label: "Building Your Path" },
  { href: "/milestones", label: "The Big Milestones" },
  { href: "/tools/resources", label: "Resources" },
]

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[compass] route error:", error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Compass className="h-10 w-10 text-primary" aria-hidden="true" />
      </div>

      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
        Something went wrong
      </p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
        The compass spun off course
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        A part of this page failed to load. Nothing you saved was lost — try again, or head somewhere
        else and come back in a moment.
      </p>

      {error.digest ? (
        <p className="mt-3 font-mono text-xs text-muted-foreground/70">
          Reference: {error.digest}
        </p>
      ) : null}

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Button onClick={reset} className="gap-2">
          <RefreshCw className="h-4 w-4" aria-hidden="true" />
          Try again
        </Button>
        <Link href="/">
          <Button variant="outline" className="gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
        </Link>
      </div>

      <div className="mt-12 w-full max-w-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Try one of these instead
        </p>
        <ul className="space-y-1.5">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:shadow-sm"
              >
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className="mt-10 flex items-center gap-2 text-xs text-muted-foreground">
        <LifeBuoy className="h-3.5 w-3.5" aria-hidden="true" />
        Still stuck? Email{" "}
        <a href="mailto:sheikha@moravian.edu" className="underline hover:text-foreground">
          sheikha@moravian.edu
        </a>
      </p>
    </div>
  )
}
