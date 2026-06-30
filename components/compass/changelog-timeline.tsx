import Link from "next/link"
import { ArrowUpRight, Sparkles, RefreshCw, Wrench } from "lucide-react"
import type { ChangelogEntry } from "@/lib/updates"
import { formatChangeDate, isRecent } from "@/lib/updates"
import { FreshBadge, PulseDot } from "@/components/compass/fresh-badge"
import { Reveal } from "@/components/compass/reveal"
import { cn } from "@/lib/utils"

const typeMeta = {
  new: { icon: Sparkles, dot: "bg-accent", label: "New" },
  updated: { icon: RefreshCw, dot: "bg-primary", label: "Updated" },
  fix: { icon: Wrench, dot: "bg-muted-foreground", label: "Fix" },
} as const

export function ChangelogTimeline({ entries }: { entries: ChangelogEntry[] }) {
  return (
    <div className="relative pl-6">
      {/* Vertical spine */}
      <div className="absolute bottom-2 left-2 top-2 w-px bg-border" aria-hidden="true" />

      <div className="space-y-5">
        {entries.map((entry, i) => {
          const meta = typeMeta[entry.type]
          const Icon = meta.icon
          const recent = isRecent(entry.date)
          const Wrapper = entry.href ? Link : "div"

          return (
            <Reveal key={entry.date + entry.title} delay={i * 70}>
              <div className="relative">
                {/* Node */}
                <span
                  className={cn(
                    "absolute -left-4 mt-1.5 h-3 w-3 rounded-full border-2 border-background",
                    meta.dot,
                  )}
                  aria-hidden="true"
                />
                <Wrapper
                  {...(entry.href ? { href: entry.href } : {})}
                  className={cn(
                    "group block rounded-2xl border border-border bg-card p-5 transition-all duration-200",
                    entry.href && "hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg",
                  )}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    {entry.type === "fix" ? (
                      <span className="inline-flex items-center gap-1 rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        <Icon className="h-3 w-3" aria-hidden="true" />
                        Fix
                      </span>
                    ) : (
                      <FreshBadge variant={entry.type} sheen={recent} />
                    )}
                    {entry.area && (
                      <span className="rounded-full border border-border bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        {entry.area}
                      </span>
                    )}
                    <span className="text-xs tabular-nums text-muted-foreground">{formatChangeDate(entry.date)}</span>
                    {recent && <PulseDot className="ml-0.5" />}
                  </div>

                  <p className="mt-2.5 flex items-center gap-1.5 font-serif text-lg font-semibold text-foreground">
                    {entry.title}
                    {entry.href && (
                      <ArrowUpRight
                        className="h-4 w-4 text-muted-foreground transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary"
                        aria-hidden="true"
                      />
                    )}
                  </p>
                  <p className="mt-1.5 leading-relaxed text-muted-foreground">{entry.description}</p>
                </Wrapper>
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
