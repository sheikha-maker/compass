"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { AlertTriangle, CheckCircle2, TrendingUp, TrendingDown, Minus, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Types ────────────────────────────────────────────────────────────────────

interface CheckinEntry {
  date: string       // week key e.g. "2026-W23"
  dateLabel: string  // e.g. "Jun 7"
  energy: number
  motivation: number
  stress: number
}

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "pmc_wellness_v1"

const SLIDERS = [
  { id: "energy",     label: "Energy",     low: "Exhausted",           high: "Fully charged", color: "#378ADD", tailwind: "bg-blue-500"  },
  { id: "motivation", label: "Motivation", low: "Going through motions", high: "Deeply driven", color: "#1D9E75", tailwind: "bg-teal-500"  },
  { id: "stress",     label: "Stress",     low: "Calm",                high: "Overwhelmed",  color: "#E24B4A", tailwind: "bg-red-500"   },
] as const

type SliderKey = "energy" | "motivation" | "stress"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function weekKey() {
  const d = new Date()
  const jan1 = new Date(d.getFullYear(), 0, 1)
  const week = Math.ceil(((d.getTime() - jan1.getTime()) / 86400000 + jan1.getDay() + 1) / 7)
  return `${d.getFullYear()}-W${week}`
}

function shortDate() {
  return new Date().toLocaleDateString("en-US", { month: "short", day: "numeric" })
}

function load(): CheckinEntry[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY)
    return s ? JSON.parse(s) : []
  } catch { return [] }
}

function save(entries: CheckinEntry[]) {
  try { localStorage.setItem(STORAGE_KEY, JSON.stringify(entries)) } catch {}
}

function trendIcon(curr: number, prev: number | undefined) {
  if (prev === undefined) return <Minus className="h-3.5 w-3.5 text-muted-foreground" />
  const delta = curr - prev
  if (delta > 0.5) return <TrendingUp className="h-3.5 w-3.5 text-green-500" />
  if (delta < -0.5) return <TrendingDown className="h-3.5 w-3.5 text-red-500" />
  return <Minus className="h-3.5 w-3.5 text-muted-foreground" />
}

// ─── SVG Line Chart ───────────────────────────────────────────────────────────

function LineChart({ data }: { data: CheckinEntry[] }) {
  if (data.length < 2) return null

  const W = 560, H = 160, PAD = { t: 12, r: 12, b: 28, l: 28 }
  const chartW = W - PAD.l - PAD.r
  const chartH = H - PAD.t - PAD.b
  const n = data.length

  function x(i: number) { return PAD.l + (i / (n - 1)) * chartW }
  function y(v: number) { return PAD.t + chartH - ((v - 1) / 9) * chartH }

  function polyline(key: SliderKey) {
    return data.map((e, i) => `${x(i)},${y(e[key])}`).join(" ")
  }

  function area(key: SliderKey) {
    const pts = data.map((e, i) => `${x(i)},${y(e[key])}`).join(" ")
    const base = `${x(n - 1)},${y(1)} ${x(0)},${y(1)}`
    return `M ${pts.split(" ").join(" L ")} L ${base} Z`
  }

  const yTicks = [2, 4, 6, 8, 10]

  return (
    <svg viewBox={`0 0 ${W} ${H}`} className="w-full" aria-label="Wellness trend chart">
      {/* Grid lines */}
      {yTicks.map((v) => (
        <g key={v}>
          <line x1={PAD.l} x2={W - PAD.r} y1={y(v)} y2={y(v)} stroke="currentColor" strokeOpacity="0.08" strokeWidth="1" />
          <text x={PAD.l - 4} y={y(v) + 4} textAnchor="end" fontSize="9" fill="currentColor" fillOpacity="0.4">{v}</text>
        </g>
      ))}

      {/* Area fills */}
      {SLIDERS.map((s) => (
        <path key={s.id} d={area(s.id as SliderKey)} fill={s.color} fillOpacity="0.06" />
      ))}

      {/* Lines */}
      {SLIDERS.map((s) => (
        <polyline
          key={s.id}
          points={polyline(s.id as SliderKey)}
          fill="none"
          stroke={s.color}
          strokeWidth="2"
          strokeLinejoin="round"
          strokeLinecap="round"
          opacity={s.id === "stress" ? 0.8 : 1}
        />
      ))}

      {/* Dots + tooltips */}
      {SLIDERS.map((s) =>
        data.map((e, i) => (
          <circle
            key={`${s.id}-${i}`}
            cx={x(i)}
            cy={y(e[s.id as SliderKey])}
            r="3.5"
            fill={s.color}
            stroke="white"
            strokeWidth="1.5"
          >
            <title>{s.label}: {e[s.id as SliderKey]}/10 ({e.dateLabel})</title>
          </circle>
        ))
      )}

      {/* X axis labels */}
      {data.map((e, i) => (
        <text
          key={i}
          x={x(i)}
          y={H - 6}
          textAnchor="middle"
          fontSize="9"
          fill="currentColor"
          fillOpacity="0.5"
        >
          {e.dateLabel}
        </text>
      ))}
    </svg>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function WellnessCheckin() {
  const [history, setHistory] = useState<CheckinEntry[]>([])
  const [values, setValues] = useState<Record<SliderKey, number>>({ energy: 5, motivation: 5, stress: 5 })
  const [logged, setLogged] = useState(false)
  const [alreadyThisWeek, setAlreadyThisWeek] = useState(false)
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null)

  useEffect(() => {
    const parsed = load()
    setHistory(parsed)
    const last = parsed[parsed.length - 1]
    if (last?.date === weekKey()) {
      setAlreadyThisWeek(true)
      setValues({ energy: last.energy, motivation: last.motivation, stress: last.stress })
    }
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
      const next = [...prev.filter((e) => e.date !== entry.date), entry].slice(-16)
      save(next)
      return next
    })
    setLogged(true)
    setAlreadyThisWeek(true)
    setTimeout(() => setLogged(false), 2500)
  }, [values])

  const deleteEntry = useCallback((date: string) => {
    setHistory((prev) => {
      const next = prev.filter((e) => e.date !== date)
      save(next)
      if (date === weekKey()) setAlreadyThisWeek(false)
      return next
    })
    setConfirmDelete(null)
  }, [])

  // ── Derived stats ──────────────────────────────────────────────────────────

  const last = history[history.length - 1]
  const prev = history[history.length - 2]

  const recent3 = history.slice(-3)
  const avgStress = recent3.length ? recent3.reduce((s, e) => s + e.stress, 0) / recent3.length : 0
  const avgEnergy = recent3.length ? recent3.reduce((s, e) => s + e.energy, 0) / recent3.length : 0
  const showAlert = recent3.length >= 2 && (avgStress >= 7.5 || avgEnergy <= 3)

  const chartData = history.slice(-8)

  return (
    <section id="wellness-checkin" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">

        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Wellbeing</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Weekly Check-in
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Three questions, once a week. No judgment — just an honest look at how you're doing over time.
          </p>
        </header>

        {/* Alert */}
        {showAlert && (
          <div className="mb-6 flex items-start gap-3 rounded-xl border border-red-200 bg-red-50 px-5 py-4 dark:border-red-900/40 dark:bg-red-950/20">
            <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600 dark:text-red-400" />
            <div>
              <p className="text-sm font-semibold text-red-800 dark:text-red-300 mb-1">Your recent trend shows some strain.</p>
              <p className="text-sm text-red-700 dark:text-red-400 leading-relaxed">
                {avgStress >= 7.5 ? "Your stress has been running high." : "Your energy has been low."}{" "}
                This is exactly when it's worth pausing.{" "}
                <a href="https://www.moravian.edu/counseling" target="_blank" rel="noopener noreferrer" className="font-medium underline underline-offset-2">
                  Moravian Counseling Services
                </a>{" "}
                is free and confidential.
              </p>
            </div>
          </div>
        )}

        {/* Related tools */}
        <div className="rounded-xl border border-border bg-card p-4 mb-6 text-sm text-muted-foreground">
          <p className="font-semibold text-foreground mb-1">Related tools</p>
          <p>
            Spot a rough patch?{" "}
            <Link href="/burnout-check" className="font-semibold text-primary underline underline-offset-2">Burnout Check</Link>
            {" "}gives deeper insight. Log longer notes in{" "}
            <Link href="#activity-logs" className="font-semibold text-primary underline underline-offset-2">Activity Logs</Link>.
          </p>
        </div>

        {/* Check-in form */}
        <div className="rounded-xl border border-border bg-card p-6 mb-6">
          <p className="text-sm font-semibold text-foreground mb-6">
            {alreadyThisWeek ? "Update this week's check-in" : "How are you feeling this week?"}
          </p>

          <div className="flex flex-col gap-7">
            {SLIDERS.map((s) => (
              <div key={s.id}>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor={`slider-${s.id}`} className="text-sm font-semibold text-foreground">{s.label}</label>
                  <span className="text-sm font-bold tabular-nums" style={{ color: s.color }}>{values[s.id as SliderKey]}/10</span>
                </div>
                <input
                  id={`slider-${s.id}`}
                  type="range" min={1} max={10} step={1}
                  value={values[s.id as SliderKey]}
                  onChange={(e) => setValues((v) => ({ ...v, [s.id]: Number(e.target.value) }))}
                  className="w-full"
                  style={{ accentColor: s.color }}
                />
                <div className="flex justify-between mt-1.5">
                  <span className="text-[11px] text-muted-foreground">{s.low}</span>
                  <span className="text-[11px] text-muted-foreground">{s.high}</span>
                </div>
              </div>
            ))}
          </div>

          <Button className="w-full mt-7 gap-2" onClick={logCheckin} disabled={logged}>
            {logged
              ? <><CheckCircle2 className="h-4 w-4" /> Logged!</>
              : alreadyThisWeek ? "Update this week" : "Log this week"
            }
          </Button>
        </div>

        {/* Stats summary */}
        {history.length >= 1 && last && (
          <div className="grid grid-cols-3 gap-3 mb-6">
            {SLIDERS.map((s) => {
              const val = last[s.id as SliderKey]
              const prevVal = prev?.[s.id as SliderKey]
              return (
                <div key={s.id} className="rounded-xl border border-border bg-card px-4 py-3 text-center">
                  <div className="flex items-center justify-center gap-1 mb-1">
                    <span className="text-xs font-medium text-muted-foreground">{s.label}</span>
                    {trendIcon(val, prevVal)}
                  </div>
                  <p className="text-2xl font-bold" style={{ color: s.color }}>{val}</p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">
                    {prevVal !== undefined
                      ? val > prevVal ? `+${val - prevVal} from last week`
                      : val < prevVal ? `${val - prevVal} from last week`
                      : "Same as last week"
                      : "First entry"
                    }
                  </p>
                </div>
              )
            })}
          </div>
        )}

        {/* Line chart */}
        {chartData.length >= 2 && (
          <div className="rounded-xl border border-border bg-card p-5 mb-6">
            <p className="text-sm font-semibold text-foreground mb-1">Trend — last {chartData.length} weeks</p>
            <p className="text-xs text-muted-foreground mb-4">Hover over dots to see exact values</p>
            <LineChart data={chartData} />
            <div className="flex gap-4 flex-wrap mt-3">
              {SLIDERS.map((s) => (
                <div key={s.id} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                  <span className="h-2.5 w-2.5 rounded-full" style={{ background: s.color }} />
                  {s.label}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* History table */}
        {history.length > 0 && (
          <div className="rounded-xl border border-border bg-card overflow-hidden">
            <div className="px-5 py-3 border-b border-border flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Check-in history</p>
              <p className="text-xs text-muted-foreground">{history.length} {history.length === 1 ? "entry" : "entries"}</p>
            </div>
            <div className="divide-y divide-border">
              {[...history].reverse().map((entry) => (
                <div key={entry.date} className="flex items-center gap-3 px-5 py-3 text-sm">
                  <span className="w-14 shrink-0 text-xs font-medium text-muted-foreground">{entry.dateLabel}</span>
                  <div className="flex gap-3 flex-1">
                    {SLIDERS.map((s) => (
                      <div key={s.id} className="flex items-center gap-1 text-xs">
                        <span className="h-2 w-2 rounded-full shrink-0" style={{ background: s.color }} />
                        <span className="font-semibold tabular-nums">{entry[s.id as SliderKey]}</span>
                      </div>
                    ))}
                  </div>
                  {entry.date === weekKey() && (
                    <span className="text-[10px] font-semibold text-primary bg-primary/10 rounded-full px-2 py-0.5">This week</span>
                  )}
                  {confirmDelete === entry.date ? (
                    <div className="flex gap-1.5">
                      <button onClick={() => deleteEntry(entry.date)} className="text-[10px] font-semibold text-red-600 hover:underline">Delete</button>
                      <button onClick={() => setConfirmDelete(null)} className="text-[10px] text-muted-foreground hover:underline">Cancel</button>
                    </div>
                  ) : (
                    <button onClick={() => setConfirmDelete(entry.date)} className="opacity-0 group-hover:opacity-100 text-muted-foreground hover:text-red-500 transition-opacity">
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {history.length === 0 && (
          <p className="text-sm text-muted-foreground text-center py-6">
            Log your first check-in above — your trend chart will appear after two entries.
          </p>
        )}
      </div>
    </section>
  )
}
