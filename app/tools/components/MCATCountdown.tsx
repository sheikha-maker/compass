"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MCAT_SECTIONS, MCAT_STORAGE_KEY, daysUntil } from "@/lib/mcat"

interface MCATData {
  date: string
  scores: Record<string, string>
  hours: Record<string, string>
}

const SECTIONS = MCAT_SECTIONS.map((s) => ({
  id: s.id,
  label: s.short,
  color: s.color,
  desc: s.disciplines.split(",")[0] ?? s.name,
}))

// ─── Helpers ─────────────────────────────────────────────────────────────────

function scoreBar(score: string): number {
  const v = Number(score)
  if (!v || v < 118 || v > 132) return 0
  return Math.round(((v - 118) / 14) * 100)
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function MCATCountdown() {
  const [data, setData] = useState<MCATData>({ date: "", scores: {}, hours: {} })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(MCAT_STORAGE_KEY)
      if (stored) setData(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = useCallback((next: MCATData) => {
    setData(next)
    try { localStorage.setItem(MCAT_STORAGE_KEY, JSON.stringify(next)) } catch {}
  }, [])

  const days = data.date ? daysUntil(data.date) : null
  const weeks = days !== null && days > 0 ? Math.ceil(days / 7) : null

  const totalHrs = SECTIONS.reduce((s, sec) => s + (Number(data.hours[sec.id]) || 0), 0)
  const projectedHrs = weeks ? weeks * totalHrs : null

  const validScores = SECTIONS.map((s) => Number(data.scores[s.id])).filter((v) => v >= 118 && v <= 132)
  const totalScore = validScores.length === 4 ? validScores.reduce((a, b) => a + b, 0) : null

  return (
    <section id="mcat-countdown" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            MCAT Countdown
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Set your target test date, log practice scores by section, and track weekly study hours.
            Pair this with the
            <Link href="/milestones#mcat-overview" className="underline underline-offset-2 text-primary transition-colors hover:text-primary/80">
              MCAT Deep Dive
            </Link>
            for section breakdown, phased prep, and a{" "}
            <Link href="/milestones#mcat-planner" className="underline underline-offset-2 text-primary transition-colors hover:text-primary/80">
              personalized timeline
            </Link>
            .
          </p>
        </header>


        {/* Countdown hero */}
        <div className="mb-6 rounded-xl border border-border bg-card p-6 text-center">
          <p className="font-serif text-7xl font-semibold text-foreground leading-none">
            {days === null ? "N/A" : days > 0 ? days : "0"}
          </p>
          <p className="mt-2 text-sm text-muted-foreground">days until your MCAT</p>
          <div className="mt-5 flex items-center justify-center gap-3">
            <Label htmlFor="mcat-date" className="text-sm text-muted-foreground whitespace-nowrap">
              Target test date:
            </Label>
            <Input
              id="mcat-date"
              type="date"
              className="w-44"
              value={data.date}
              onChange={(e) => persist({ ...data, date: e.target.value })}
            />
          </div>
        </div>

        {/* Stats row */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: "Total score", value: totalScore ?? "N/A", sub: "out of 528" },
            { label: "Total hrs/week", value: totalHrs, sub: "across sections" },
            { label: "Weeks left", value: weeks ?? "N/A", sub: "to test day" },
            { label: "Projected hours", value: projectedHrs ?? "N/A", sub: "total study hrs" },
          ].map((s) => (
            <div key={s.label} className="flex-1 min-w-[100px] rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className="text-2xl font-semibold leading-none">{s.value}</p>
              <p className="text-[10px] text-muted-foreground mt-1">{s.sub}</p>
            </div>
          ))}
        </div>

        {/* Practice scores */}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Practice scores
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-8">
          {SECTIONS.map((sec) => {
            const pct = scoreBar(data.scores[sec.id] ?? "")
            return (
              <div key={sec.id} className="rounded-xl border border-border bg-secondary/30 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                  {sec.label}
                </p>
                <p className="text-[11px] text-muted-foreground mb-2">{sec.desc}</p>
                <Input
                  type="number"
                  min={118}
                  max={132}
                  placeholder="118-132"
                  value={data.scores[sec.id] ?? ""}
                  onChange={(e) =>
                    persist({ ...data, scores: { ...data.scores, [sec.id]: e.target.value } })
                  }
                  className="h-8 text-center text-sm font-semibold mb-2"
                />
                <div className="h-1.5 rounded-full bg-border overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${sec.color}`}
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            )
          })}
        </div>

        {/* Weekly study hours */}
        <h3 className="text-sm font-semibold uppercase tracking-wider text-muted-foreground mb-3">
          Weekly study hours
        </h3>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {SECTIONS.map((sec) => (
            <div key={sec.id} className="rounded-xl border border-border bg-secondary/30 p-3">
              <p className="text-[10px] font-semibold uppercase tracking-widest text-muted-foreground mb-2">
                {sec.label}
              </p>
              <Input
                type="number"
                min={0}
                placeholder="0 hrs"
                value={data.hours[sec.id] ?? ""}
                onChange={(e) =>
                  persist({ ...data, hours: { ...data.hours, [sec.id]: e.target.value } })
                }
                className="h-8 text-center text-sm font-semibold"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
