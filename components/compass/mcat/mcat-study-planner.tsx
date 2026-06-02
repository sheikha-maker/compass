"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Calendar, ArrowRight } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  buildPrepPhases,
  currentPhaseFromWeeks,
  daysUntil,
  MCAT_PLANNER_KEY,
  MCAT_STORAGE_KEY,
  weeksUntil,
} from "@/lib/mcat"
import { cn } from "@/lib/utils"

type PlannerData = {
  prepStart: string
}

export function McatStudyPlanner() {
  const [testDate, setTestDate] = useState("")
  const [planner, setPlanner] = useState<PlannerData>({ prepStart: "" })
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const mcat = localStorage.getItem(MCAT_STORAGE_KEY)
      if (mcat) {
        const parsed = JSON.parse(mcat) as { date?: string }
        if (parsed.date) setTestDate(parsed.date)
      }
      const plan = localStorage.getItem(MCAT_PLANNER_KEY)
      if (plan) setPlanner(JSON.parse(plan) as PlannerData)
    } catch {}
    setHydrated(true)
  }, [])

  const savePlanner = (next: PlannerData) => {
    setPlanner(next)
    try {
      localStorage.setItem(MCAT_PLANNER_KEY, JSON.stringify(next))
    } catch {}
  }

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-xl border border-border bg-muted/30" />
  }

  const days = testDate ? daysUntil(testDate) : null
  const weeksLeft = testDate ? weeksUntil(testDate) : 0

  const prepWeeks =
    planner.prepStart && testDate
      ? Math.max(
          1,
          Math.ceil(
            (new Date(testDate).getTime() - new Date(planner.prepStart).getTime()) / (7 * 24 * 60 * 60 * 1000)
          )
        )
      : weeksLeft

  const phases = prepWeeks > 0 ? buildPrepPhases(prepWeeks) : []
  const currentPhase =
    prepWeeks > 0 && weeksLeft > 0 ? currentPhaseFromWeeks(weeksLeft, prepWeeks) : null

  let weekCursor = 0
  const phasesWithRange = phases.map((p) => {
    const start = weekCursor + 1
    weekCursor += p.weeks
    return { ...p, weekStart: start, weekEnd: weekCursor }
  })

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex items-start gap-3">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
          <Calendar className="h-5 w-5 text-primary" aria-hidden />
        </div>
        <div>
          <p className="font-serif text-lg font-medium text-foreground">Your prep timeline</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Syncs with your{" "}
            <Link href="/tools#mcat-countdown" className="text-primary underline underline-offset-2">
              MCAT Countdown
            </Link>{" "}
            test date. Add when you started (or plan to start) studying.
          </p>
        </div>
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        <div>
          <Label htmlFor="prep-start" className="text-sm text-muted-foreground">
            Prep start date
          </Label>
          <Input
            id="prep-start"
            type="date"
            className="mt-1.5"
            value={planner.prepStart}
            onChange={(e) => savePlanner({ prepStart: e.target.value })}
          />
        </div>
        <div>
          <Label htmlFor="test-date-planner" className="text-sm text-muted-foreground">
            Target test date
          </Label>
          <Input
            id="test-date-planner"
            type="date"
            className="mt-1.5"
            value={testDate}
            onChange={(e) => {
              setTestDate(e.target.value)
              try {
                const raw = localStorage.getItem(MCAT_STORAGE_KEY)
                const data = raw ? JSON.parse(raw) : {}
                localStorage.setItem(MCAT_STORAGE_KEY, JSON.stringify({ ...data, date: e.target.value }))
              } catch {}
            }}
          />
        </div>
      </div>

      {testDate && days !== null && (
        <div className="mt-5 flex flex-wrap gap-3">
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-2">
            <p className="text-2xl font-semibold text-foreground">{days > 0 ? days : 0}</p>
            <p className="text-xs text-muted-foreground">days until test</p>
          </div>
          <div className="rounded-lg border border-border bg-muted/30 px-4 py-2">
            <p className="text-2xl font-semibold text-foreground">{weeksLeft}</p>
            <p className="text-xs text-muted-foreground">weeks left</p>
          </div>
          {prepWeeks > 0 && (
            <div className="rounded-lg border border-primary/30 bg-primary/5 px-4 py-2">
              <p className="text-2xl font-semibold text-primary">{prepWeeks}</p>
              <p className="text-xs text-muted-foreground">week prep plan</p>
            </div>
          )}
        </div>
      )}

      {phasesWithRange.length > 0 && (
        <div className="mt-6 space-y-3">
          <p className="text-sm font-semibold text-foreground">Suggested phase split</p>
          {phasesWithRange.map((p) => (
            <div
              key={p.id}
              className={cn(
                "rounded-lg border p-4 transition-colors",
                currentPhase === p.id ? "border-primary bg-primary/5" : "border-border bg-background"
              )}
            >
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-medium text-foreground">{p.label}</p>
                <span className="text-xs text-muted-foreground">
                  Weeks {p.weekStart}–{p.weekEnd} · {p.hoursPerWeek}/wk
                </span>
              </div>
              <p className="mt-1 text-sm text-muted-foreground">{p.focus}</p>
              {currentPhase === p.id && (
                <p className="mt-2 flex items-center gap-1 text-xs font-medium text-primary">
                  <ArrowRight className="h-3 w-3" aria-hidden />
                  You&apos;re likely in this phase now
                </p>
              )}
            </div>
          ))}
        </div>
      )}

      {!testDate && (
        <p className="mt-4 text-sm text-muted-foreground">
          Set a test date in the MCAT Countdown tool or above to generate your timeline.
        </p>
      )}
    </div>
  )
}
