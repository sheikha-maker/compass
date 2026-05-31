import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

type SectionProps = {
  id: string
  eyebrow?: string
  title: string
  intro?: string
  children: ReactNode
  className?: string
}

export function Section({ id, eyebrow, title, intro, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("scroll-mt-20 border-b border-border py-14 md:py-20", className)}>
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          {eyebrow && (
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">{eyebrow}</p>
          )}
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">{title}</h2>
          {intro && <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
