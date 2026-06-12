import type { ReactNode } from "react"
import { cn } from "@/lib/utils"
import { CalendarClock } from "lucide-react"

type SectionProps = {
  id: string
  eyebrow?: string
  title: string
  intro?: string
  lastReviewed?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, intro, lastReviewed, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 border-b border-border py-14 md:py-20", className)}>
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div className="flex-1">
              {eyebrow && (
                <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
              )}
              <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
            </div>
            {lastReviewed && (
              <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground mt-1">
                <CalendarClock className="h-3 w-3" aria-hidden="true" />
                Last reviewed: {lastReviewed}
              </span>
            )}
          </div>
          {intro && <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
