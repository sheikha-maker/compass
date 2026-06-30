import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { CalendarClock } from "lucide-react"
import { Reveal } from "@/components/compass/reveal"
import { FreshBadge, FreshnessIndicator } from "@/components/compass/fresh-badge"

type SectionProps = {
  id: string
  eyebrow?: string
  title: string
  intro?: string
  /** Static "Last reviewed" label (legacy/simple usage) */
  lastReviewed?: string
  /** "Last updated / Recently added" date — renders the freshness indicator pill */
  updatedAt?: string
  /** "updated" → "Last updated", "added" → "Recently added" */
  freshnessKind?: "updated" | "added"
  /** Pulse the freshness dot to signal a genuinely recent change */
  recentlyUpdated?: boolean
  /** Show a "New" / "Updated" badge next to the title */
  badge?: "new" | "updated"
  /** Extra breathing room — for content-dense pages */
  spacious?: boolean
  children: ReactNode
  className?: string
}

export function Section({
  id,
  eyebrow,
  title,
  intro,
  lastReviewed,
  updatedAt,
  freshnessKind = "updated",
  recentlyUpdated = false,
  badge,
  spacious = false,
  children,
  className,
}: SectionProps) {
  return (
    <section
      id={id}
      className={cn(
        "scroll-mt-20 border-b border-border",
        spacious ? "py-16 md:py-24" : "py-14 md:py-20",
        className,
      )}
    >
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <Reveal>
          <header className={cn(spacious ? "mb-10" : "mb-8")}>
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex-1">
                {eyebrow && (
                  <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
                )}
                <div className="flex flex-wrap items-center gap-2.5">
                  <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
                    {title}
                  </h2>
                  {badge && <FreshBadge variant={badge} />}
                </div>
              </div>
              {updatedAt ? (
                <FreshnessIndicator
                  date={updatedAt}
                  kind={freshnessKind}
                  pulse={recentlyUpdated}
                  className="mt-1"
                />
              ) : (
                lastReviewed && (
                  <span className="mt-1 inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground">
                    <CalendarClock className="h-3 w-3" aria-hidden="true" />
                    Last reviewed: {lastReviewed}
                  </span>
                )
              )}
            </div>
            {intro && <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>}
          </header>
        </Reveal>
        <Reveal delay={100}>
          {children}
        </Reveal>
      </div>
    </section>
  )
}
