import Link from "next/link"
import { Compass, ArrowLeft, Home, Search } from "lucide-react"
import { Button } from "@/components/ui/button"

const suggestions = [
  { href: "/mindset",    label: "Mindset"           },
  { href: "/your-path",  label: "Building Your Path" },
  { href: "/milestones", label: "The Big Milestones" },
  { href: "/burnout-check", label: "Burnout Check"  },
]

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-background px-5 text-center">
      {/* Compass */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10">
        <Compass className="h-10 w-10 text-primary" aria-hidden="true" />
      </div>

      {/* Heading */}
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">404</p>
      <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-sm text-muted-foreground">
        This page doesn't exist or may have moved. The compass still works — here's where you can go instead.
      </p>

      {/* CTAs */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link href="/">
          <Button className="gap-2">
            <Home className="h-4 w-4" aria-hidden="true" />
            Back to home
          </Button>
        </Link>
        <Link href="/tools/resources">
          <Button variant="outline" className="gap-2">
            <Search className="h-4 w-4" aria-hidden="true" />
            Browse resources
          </Button>
        </Link>
      </div>

      {/* Suggestions */}
      <div className="mt-12 w-full max-w-sm">
        <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Popular pages
        </p>
        <ul className="space-y-1.5">
          {suggestions.map((s) => (
            <li key={s.href}>
              <Link
                href={s.href}
                className="group flex items-center justify-between rounded-lg border border-border bg-card px-4 py-2.5 text-sm text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground hover:shadow-sm"
              >
                {s.label}
                <ArrowLeft className="h-3.5 w-3.5 rotate-180 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:opacity-100" aria-hidden="true" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
