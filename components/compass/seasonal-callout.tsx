import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { getActiveSeasonalCallout } from "@/lib/seasonal"
import { Reveal } from "@/components/compass/reveal"
import { PulseDot } from "@/components/compass/fresh-badge"

/**
 * "This week in pre-med" — a seasonal callout that shifts with the time of year.
 * Content is chosen in lib/seasonal.ts (auto by month, or pinned via override).
 */
export function SeasonalCallout() {
  const callout = getActiveSeasonalCallout()
  if (!callout) return null

  const Icon = callout.icon

  return (
    <Reveal>
      <section className="mx-auto max-w-4xl px-5 pt-10 md:px-8">
        <div className="relative overflow-hidden rounded-2xl border border-accent/30 bg-gradient-to-br from-accent/10 via-card to-card p-6 shadow-sm md:p-7">
          {/* Soft layered glow for depth */}
          <div
            className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/10 blur-3xl float-soft"
            aria-hidden="true"
          />
          <div className="relative flex flex-col gap-4 sm:flex-row sm:items-start">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-accent/15 text-accent">
              <Icon className="h-6 w-6" aria-hidden="true" />
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <PulseDot />
                <p className="text-xs font-semibold uppercase tracking-wider text-accent">{callout.eyebrow}</p>
              </div>
              <h2 className="mt-1.5 text-balance font-serif text-xl font-semibold text-foreground md:text-2xl">
                {callout.title}
              </h2>
              <p className="mt-2 text-pretty leading-relaxed text-muted-foreground">{callout.body}</p>
              {callout.cta && (
                <Link
                  href={callout.cta.href}
                  className="group mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-accent transition-colors hover:text-foreground"
                >
                  {callout.cta.label}
                  <ArrowRight
                    className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </section>
    </Reveal>
  )
}
