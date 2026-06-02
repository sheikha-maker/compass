"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { pathPillars } from "@/lib/path-content"
import { cn } from "@/lib/utils"

export function PathOverview() {
  return (
    <section className="border-b border-border bg-gradient-to-b from-timeline-2/10 to-background py-10 md:py-12">
      <div className="mx-auto max-w-4xl px-5 md:px-8">
        <p className="max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Your application is a story built over years: coursework, experiences, and relationships. This section helps
          you choose depth over panic at each stage.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/tools#prereq-tracker"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            Prereq Tracker
          </Link>
          <Link
            href="/tools#course-planner"
            className="rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition-colors hover:border-primary/40 hover:text-primary"
          >
            Course Planner
          </Link>
        </div>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          {pathPillars.map((pillar) => {
            const Icon = pillar.icon
            return (
              <a
                key={pillar.id}
                href={`#${pillar.id}`}
                className="group flex gap-4 rounded-xl border border-border bg-card p-4 transition-all hover:border-timeline-2/50 hover:shadow-md"
              >
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-timeline-2/20">
                  <Icon className="h-5 w-5 text-timeline-2" aria-hidden />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif font-medium text-foreground">{pillar.title}</p>
                  <p className="mt-0.5 text-sm text-muted-foreground">{pillar.description}</p>
                </div>
                <ArrowRight
                  className={cn(
                    "mt-1 h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-timeline-2"
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
