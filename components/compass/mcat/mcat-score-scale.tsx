"use client"

import { useState } from "react"
import { MCAT_SCORE_BANDS } from "@/lib/mcat"
import { cn } from "@/lib/utils"

export function McatScoreScale() {
  const [hovered, setHovered] = useState<number | null>(null)
  const active = hovered ?? 505

  const band = MCAT_SCORE_BANDS.find((b) => active >= b.min && active <= b.max) ?? MCAT_SCORE_BANDS[0]
  const position = Math.min(100, Math.max(0, ((active - 472) / (528 - 472)) * 100))

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <p className="font-serif text-lg font-medium text-foreground">Understanding MCAT scores</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Hover or tap a range to see what it generally means. Always verify targets with MSAR and your advisor.
      </p>

      <div className="mt-6">
        <div className="relative h-3 overflow-hidden rounded-full bg-gradient-to-r from-muted via-primary/40 to-primary">
          <div
            className="absolute top-0 h-full w-1 bg-foreground shadow-md transition-all duration-200"
            style={{ left: `calc(${position}% - 2px)` }}
            aria-hidden
          />
        </div>
        <div className="mt-1 flex justify-between text-[10px] font-medium text-muted-foreground">
          <span>472</span>
          <span>500</span>
          <span>510</span>
          <span>528</span>
        </div>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        {MCAT_SCORE_BANDS.map((b) => (
          <button
            key={b.label}
            type="button"
            className={cn(
              "rounded-full border px-3 py-1 text-xs font-medium transition-colors",
              active >= b.min && active <= b.max
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-secondary/50 text-muted-foreground hover:border-primary/40"
            )}
            onMouseEnter={() => setHovered((b.min + b.max) / 2)}
            onMouseLeave={() => setHovered(null)}
            onFocus={() => setHovered((b.min + b.max) / 2)}
            onBlur={() => setHovered(null)}
          >
            {b.min}–{b.max}
          </button>
        ))}
      </div>

      <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
        <p className="font-medium text-foreground">{band.label}</p>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{band.note}</p>
      </div>
    </div>
  )
}
