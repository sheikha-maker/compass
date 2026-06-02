"use client"

import { useState } from "react"
import { timelineSteps } from "@/lib/content"
import { cn } from "@/lib/utils"

const SEASON_COLORS = [
  "bg-timeline-1",
  "bg-timeline-2",
  "bg-timeline-3",
  "bg-timeline-4",
  "bg-accent",
]

export function ApplicationTimelineVisual() {
  const [active, setActive] = useState(0)
  const step = timelineSteps[active]

  return (
    <div className="rounded-xl border border-border bg-gradient-to-br from-primary/5 via-card to-accent/5 p-5 md:p-6">
      <p className="text-sm font-medium text-muted-foreground">Application cycle overview</p>
      <div className="mt-4 flex gap-1 overflow-x-auto pb-1">
        {timelineSteps.map((s, i) => (
          <button
            key={s.window}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "min-w-[4.5rem] flex-1 rounded-t-lg px-2 py-3 text-center text-[10px] font-semibold uppercase tracking-wide text-white transition-all sm:text-xs",
              SEASON_COLORS[i % SEASON_COLORS.length],
              active === i ? "opacity-100 ring-2 ring-primary ring-offset-2 ring-offset-background" : "opacity-60 hover:opacity-85"
            )}
          >
            <span className="line-clamp-2">{["Spring", "Early summer", "Summer", "Fall–Winter", "Decisions"][i]}</span>
          </button>
        ))}
      </div>
      <div className="rounded-b-xl border border-t-0 border-border bg-card p-5">
        <p className="font-serif text-lg font-medium text-foreground">{step.window}</p>
        <ul className="mt-3 space-y-2">
          {step.items.map((item) => (
            <li key={item} className="flex gap-2 text-sm text-muted-foreground">
              <span
                className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", SEASON_COLORS[active % SEASON_COLORS.length])}
                aria-hidden
              />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
