"use client"

import { useState } from "react"
import { Check, ChevronRight } from "lucide-react"
import { mcatPhasesEnhanced, mcatTruths } from "@/lib/mcat-content"
import { cn } from "@/lib/utils"

export function McatPhaseStepper() {
  const [active, setActive] = useState(0)
  const phase = mcatPhasesEnhanced[active]

  return (
    <div className="space-y-4">
      <div className="grid gap-2 sm:grid-cols-3">
        {mcatPhasesEnhanced.map((p, i) => (
          <button
            key={p.id}
            type="button"
            onClick={() => setActive(i)}
            className={cn(
              "rounded-xl border p-4 text-left transition-all duration-200",
              active === i
                ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                : "border-border bg-card hover:border-primary/30 hover:bg-muted/30"
            )}
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-accent">Phase {i + 1}</p>
            <p className="mt-1 font-serif text-sm font-medium text-foreground">{p.phase.replace(/^Phase \d+ — /, "")}</p>
            <p className="mt-1 text-xs text-muted-foreground">{p.weeklyHours}</p>
          </button>
        ))}
      </div>

      <div className="relative rounded-xl border border-border bg-card p-5">
        <div className="absolute left-0 top-0 h-1 w-full overflow-hidden rounded-t-xl bg-border">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${((active + 1) / mcatPhasesEnhanced.length) * 100}%` }}
          />
        </div>
        <p className="font-serif text-lg font-medium text-foreground">{phase.phase}</p>
        <p className="text-sm text-accent">{phase.duration}</p>
        <p className="mt-3 leading-relaxed text-muted-foreground">{phase.detail}</p>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">This phase — do this</p>
            <ul className="space-y-2">
              {phase.tasks.map((t) => (
                <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                  <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="mb-2 text-sm font-semibold text-foreground">Watch out for</p>
            <ul className="space-y-2">
              {phase.mistakes.map((m) => (
                <li key={m} className="flex gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {m}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}

export function McatHonestTruths() {
  return (
    <div className="rounded-lg border border-primary/20 bg-primary/5 p-5">
      <p className="mb-3 font-serif text-lg font-medium text-foreground">A few honest truths</p>
      <ul className="space-y-2">
        {mcatTruths.map((t) => (
          <li key={t} className="flex gap-2 leading-relaxed text-foreground">
            <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
    </div>
  )
}
