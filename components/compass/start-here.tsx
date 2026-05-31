"use client"

import { ArrowRight } from "lucide-react"
import Link from "next/link"
import { startPaths, navItems } from "@/lib/content"
import { Section } from "./section"

const idToPage: Record<string, string> = {
  "year-compass": "/your-path",
  "balance": "/mindset",
  "mindfulness": "/mindset",
  "decision-tools": "/mindset",
  "experience-tools": "/your-path",
  "mcat": "/milestones",
  "timeline": "/milestones",
  "course-planner": "/tools",
  "activity-logs": "/tools",
  "mentorship": "/your-path",
  "course-guides": "/your-path",
  "faq": "/milestones",
}

export function StartHere() {
  function labelFor(id: string) {
    return navItems.find((n) => n.id === id)?.label ?? id
  }

  return (
    <Section
      id="start-here"
      eyebrow="New here? Start with this"
      title="How to Use This Guide"
      intro="You don't have to read this top to bottom. Find the situation that sounds like you and start there. Ignore the rest until it's relevant."
    >
      <div className="grid gap-4">
        {startPaths.map((path) => (
          <div
            key={path.situation}
            className="rounded-lg border border-border bg-card p-5 transition-shadow hover:shadow-sm"
          >
            <p className="font-serif text-lg font-medium text-foreground">
              If {path.situation.toLowerCase()}
            </p>
            <p className="mt-1.5 leading-relaxed text-muted-foreground">{path.action}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              {path.targets.map((target) => {
                const page = idToPage[target] ?? "/"
                return (
                  <Link
                    key={target}
                    href={`${page}#${target}`}
                    className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary px-3 py-1.5 text-sm font-medium text-secondary-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
                  >
                    {labelFor(target)}
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}
