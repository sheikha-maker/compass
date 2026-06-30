import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { changelog, formatChangeDate, isRecent } from "@/lib/updates"
import { Reveal } from "@/components/compass/reveal"
import { FreshBadge } from "@/components/compass/fresh-badge"

/**
 * "What's new" — a compact preview of the most recent changes, reinforcing
 * that the Compass grows over time. Links through to the full /updates log.
 */
export function WhatsNew({ limit = 3 }: { limit?: number }) {
  const entries = changelog.slice(0, limit)
  if (entries.length === 0) return null

  return (
    <section className="mx-auto max-w-4xl px-5 py-14 md:px-8">
      <Reveal>
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Always growing</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">What&apos;s new</h2>
          </div>
          <Link
            href="/updates"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary transition-colors hover:text-foreground"
          >
            View all updates
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-6 space-y-3">
        {entries.map((entry, i) => (
          <Reveal key={entry.date + entry.title} delay={i * 80}>
            <Link
              href={entry.href ?? "/updates"}
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"
            >
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  {entry.type !== "fix" && (
                    <FreshBadge variant={entry.type === "new" ? "new" : "updated"} sheen={isRecent(entry.date)} />
                  )}
                  {entry.area && (
                    <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                      {entry.area}
                    </span>
                  )}
                  <span className="text-xs tabular-nums text-muted-foreground">{formatChangeDate(entry.date)}</span>
                </div>
                <p className="mt-2 font-semibold text-foreground">{entry.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{entry.description}</p>
              </div>
              <ArrowRight
                className="mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                aria-hidden="true"
              />
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
