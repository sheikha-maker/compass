"use client"

import { ArrowRight } from "lucide-react"
import { mindsetPillars } from "@/lib/mindset-content"
import { cn } from "@/lib/utils"

export function MindsetOverview() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-primary/5 to-background py-10 md:py-12">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Pre-med is as much about how you think and recover as it is about grades and hours. Use this section to build
          habits that last longer than any single semester.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {mindsetPillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-primary/40 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Icon className="h-5 w-5 text-primary" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif font-medium text-foreground">{pillar.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{pillar.description}</p>
                </div>
                <ArrowRight
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary"
                  )}
                  aria-hidden
                />
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}
