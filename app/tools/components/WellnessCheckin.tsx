"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Types ───────────────────────────────────────────────────────────────────

interface CheckinEntry {
  date: string
  dateLabel: string
  energy: number
  motivation: number
  stress: number
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STORAGE_KEY = "pmc_wellness_v1"

const SLIDERS = [
  {
    id: "energy",
    label: "Energy",
    lowLabel: "Exhausted",
    highLabel: "Fully charged",
    color: "bg-blue-500",
    colorHex: "#378ADD",
  },
  {
    id: "motivation",
    label: "Motivation",
    lowLabel: "Going through motions",
    highLabel: "Deeply driven",
    color: "bg-teal-500",
    colorHex: "#1D9E75",
  },
  {
    id: "stress",
    label: "Stress",
    lowLabel: "Calm",
    highLabel: "Overwhelmed",
    color: "bg-red-500",
    colorHex: "#E24B4A",
  },
] as const

// ─── Helpers ─────────────────────────────────────────────────────────────────

function weekKey() {
  const d = new Date()
  const jan1 = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${week}`
}

function shortDate() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WellnessCheckin() {
  const [history, setHistory] = useState<CheckinEntry[]>([])
  const [values, setValues] = useState({ energy: 5, motivation: 5, stress: 5 })
  const [logged, setLogged] = useState(false)
  const [alreadyLoggedThisWeek, setAlreadyLoggedThisWeek] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        const parsed: CheckinEntry[] = JSON.parse(stored)
        setHistory(parsed)
        const lastKey = parsed[parsed.length - 1]?.date
        if (lastKey === weekKey()) setAlreadyLoggedThisWeek(true)
      }
    } catch {}
  }, [])

  const logCheckin = useCallback(() => {
    const entry: CheckinEntry = {
      date: weekKey(),
      dateLabel: shortDate(),
      energy: values.energy,
      motivation: values.motivation,
      stress: values.stress,
    }
    setHistory((prev) => {
      const filtered = prev.filter((e) => e.date !== entry.date)
      const next = [...filtered, entry].slice(-12)
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
    setLogged(true)
    setAlreadyLoggedThisWeek(true)
    setTimeout(() => setLogged(false), 2500)
  }, [values])

  const recent3 = history.slice(-3)
  const avgStress = recent3.length ? recent3.reduce((s, e) => s + e.stress, 0) / recent3.length : 0
  const avgEnergy = recent3.length ? recent3.reduce((s, e) => s + e.energy, 0) / recent3.length : 0
  const showAlert = recent3.length >= 2 && (avgStress >= 7 || avgEnergy <= 3)

  const last8 = history.slice(-8)
  const maxVal = 10

  return (
    <section id="wellness-checkin" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Wellbeing</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Weekly Check-in
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Three questions, once a week. No judgment — just an honest look at how you're doing.
            Your trends are tracked over time.
          </p>
        </header>

        {/* Alert banner */}
        {showAlert && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900/40 dark:bg-red-950/20">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">
                Your recent trend shows some strain.
              </p>
              <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
                {avgStress >= 7
                  ? "Your stress has been running high the past few weeks."
                  : "Your energy levels have been low recently."}{" "}
                This is exactly when it's worth pausing to check in with yourself — or someone you trust.{" "}
                <a
                  href="https://www.moravian.edu/counseling"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium underline underline-offset-2"
                >
                  Moravian Counseling Services
                </a>{" "}
                is free and confidential.
              </p>
            </div>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-5 mb-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-2">Related tools</p>
          <p>
            If your weekly trend shows strain, try the
            <Link href="/burnout-check" className="mx-1 font-semibold text-primary underline underline-offset-2">
              Burnout Check
            </Link>
            next. Keep longer-term notes in
            <Link href="#activity-logs" className="mx-1 font-semibold text-primary underline underline-offset-2">
              Activity Logs
            </Link>
            so you can spot patterns more easily.
          </p>
        </div>

        {/* Sliders */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <p className="text-sm font-semibold text-foreground mb-6">
            How are you feeling this week?
          </p>

          <div className="flex flex-col gap-7">
            {SLIDERS.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between mb-2">
                  <label
                    htmlFor={`slider-${s.id}`}
                    className="text-sm font-semibold text-foreground"
                  >
                    {s.label}
                  </label>
                  <span className="text-sm font-bold text-foreground tabular-nums">
                    {values[s.id]}/10
                  </span>
                </div>
                <input
                  id={`slider-${s.id}`}
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={values[s.id]}
                  onChange={(e) =>
                    setValues((v) => ({ ...v, [s.id]: Number(e.target.value) }))
                  }
                  className="w-full accent-primary"
                  style={{ accentColor: s.colorHex }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[11px] text-muted-foreground">{s.lowLabel}</span>
                  <span className="text-[11px] text-muted-foreground">{s.highLabel}</span>
                </div>
              </div>
            ))}
          </div>

          <Button
            className="w-full mt-7 gap-2"
            onClick={logCheckin}
            disabled={logged}
          >
            {logged ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                Logged!
              </>
            ) : alreadyLoggedThisWeek ? (
              "Update this week's entry"
            ) : (
              "Log this week"
            )}
          </Button>
        </div>

        {/* Trend chart */}
        {last8.length > 0 && (
          <div className="rounded-xl border border-border bg-card p-5">
            <p className="text-sm font-semibold text-foreground mb-4">Your trend</p>

            {/* Bar chart */}
            <div className="flex items-end gap-2 h-24 mb-3">
              {last8.map((entry, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div className="flex items-end gap-0.5 h-16 w-full justify-center">
                    {SLIDERS.map((s) => (
                      <div
                        key={s.id}
                        className={`flex-1 rounded-t-sm transition-all duration-300 ${s.color}`}
                        style={{
                          height: `${Math.round((entry[s.id] / maxVal) * 100)}%`,
                          minHeight: "2px",
                          opacity: s.id === "stress" ? 0.75 : 1,
                        }}
                        title={`${s.label}: ${entry[s.id]}`}
                      />
                    ))}
                  </div>
                  <span className="text-[9px] text-muted-foreground whitespace-nowrap">
                    {entry.dateLabel}
                  </span>
                </div>
              ))}
            </div>

            {/* Legend */}
            <div className="flex gap-4 flex-wrap">
              {SLIDERS.map((s) => (
                <div key={s.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span
                    className="h-2.5 w-2.5 rounded-full"
                    style={{ background: s.colorHex }}
                  />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {history.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-4">
            Log your first check-in above — your trend will appear here after a couple of weeks.
          </p>
        )}
      </div>
    </section>
  )
}
