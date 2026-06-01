"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { CheckCircle2, Circle, AlertTriangle } from "lucide-react"
import { Input } from "@/components/ui/input"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Prereq {
  id: string
  name: string
  required: number
  note: string
  category: "science" | "behavioral" | "writing"
}

type PrereqData = Record<string, number>

// ─── Constants ───────────────────────────────────────────────────────────────

const PREREQS: Prereq[] = [
  { id: "bio",     name: "Biology",              required: 8, note: "2 semesters + labs recommended", category: "science" },
  { id: "gchem",   name: "General Chemistry",    required: 8, note: "2 semesters + labs recommended", category: "science" },
  { id: "ochem",   name: "Organic Chemistry",    required: 6, note: "2 semesters",                    category: "science" },
  { id: "physics", name: "Physics",              required: 6, note: "2 semesters",                    category: "science" },
  { id: "math",    name: "Math / Statistics",    required: 6, note: "Calculus or statistics",          category: "science" },
  { id: "biochem", name: "Biochemistry",         required: 3, note: "1 semester minimum",              category: "science" },
  { id: "english", name: "English / Writing",    required: 6, note: "2 writing-intensive courses",     category: "writing" },
  { id: "psych",   name: "Psychology",           required: 3, note: "Intro psychology",               category: "behavioral" },
  { id: "socio",   name: "Sociology",            required: 3, note: "Intro sociology",                category: "behavioral" },
]

const CATEGORY_META = {
  science: {
    label: "Natural Sciences",
    bg: "bg-primary/5",
    border: "border-primary/15",
    text: "text-primary",
  },
  behavioral: {
    label: "Behavioral & Social Sciences",
    bg: "bg-violet-50 dark:bg-violet-950/20",
    border: "border-violet-200 dark:border-violet-800/40",
    text: "text-violet-700 dark:text-violet-400",
  },
  writing: {
    label: "Writing & Communication",
    bg: "bg-teal-50 dark:bg-teal-950/20",
    border: "border-teal-200 dark:border-teal-800/40",
    text: "text-teal-700 dark:text-teal-400",
  },
}

const STORAGE_KEY = "pmc_prereqs_v2"

const TOTAL_REQUIRED = PREREQS.reduce((s, p) => s + p.required, 0)

// ─── Sub-components ───────────────────────────────────────────────────────────

function ProgressBar({
  pct,
  complete,
}: {
  pct: number
  complete: boolean
}) {
  return (
    <div className="h-1.5 w-full rounded-full bg-border overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${
          complete ? "bg-green-500" : pct > 0 ? "bg-primary" : "bg-border"
        }`}
        style={{ width: `${pct}%` }}
        aria-hidden="true"
      />
    </div>
  )
}

function PrereqCard({
  prereq,
  done,
  onChange,
}: {
  prereq: Prereq
  done: number
  onChange: (val: number) => void
}) {
  const pct = Math.min(100, Math.round((done / prereq.required) * 100))
  const complete = done >= prereq.required
  const partial = done > 0 && !complete

  return (
    <div
      className={`rounded-xl border p-4 transition-all duration-200 ${
        complete
          ? "border-green-200 bg-green-50 dark:border-green-900/40 dark:bg-green-950/20"
          : partial
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card"
      }`}
    >
      {/* Top row: name + status badge */}
      <div className="flex items-start justify-between gap-2 mb-1">
        <p className="text-sm font-semibold text-foreground leading-tight">{prereq.name}</p>
        {complete ? (
          <span className="shrink-0 inline-flex items-center gap-1 rounded-full bg-green-100 dark:bg-green-900/40 px-2 py-0.5 text-[10px] font-semibold text-green-700 dark:text-green-400">
            <CheckCircle2 className="h-3 w-3" />
            Done
          </span>
        ) : partial ? (
          <span className="shrink-0 rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold text-primary">
            {pct}%
          </span>
        ) : (
          <Circle className="h-4 w-4 shrink-0 text-muted-foreground/30" />
        )}
      </div>

      {/* Note */}
      <p className="text-[11px] text-muted-foreground mb-3 leading-snug">{prereq.note}</p>

      {/* Progress bar */}
      <ProgressBar pct={pct} complete={complete} />

      {/* Credits input */}
      <div className="flex items-center gap-2 mt-3">
        <label htmlFor={`pi-${prereq.id}`} className="text-[11px] text-muted-foreground whitespace-nowrap">
          Credits:
        </label>
        <Input
          id={`pi-${prereq.id}`}
          type="number"
          min={0}
          max={16}
          value={done === 0 ? "" : done}
          placeholder="0"
          onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
          className="h-7 w-14 px-2 text-center text-xs font-semibold"
        />
        <span className="text-[11px] text-muted-foreground">/ {prereq.required} needed</span>
      </div>
    </div>
  )
}

function CategoryGroup({
  categoryKey,
  prereqs,
  data,
  onChange,
}: {
  categoryKey: "science" | "behavioral" | "writing"
  prereqs: Prereq[]
  data: PrereqData
  onChange: (id: string, val: number) => void
}) {
  const meta = CATEGORY_META[categoryKey]
  const groupDone = prereqs.every((p) => (data[p.id] ?? 0) >= p.required)
  const groupPct = prereqs.filter((p) => (data[p.id] ?? 0) >= p.required).length

  return (
    <div className="mb-8">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <span
            className={`inline-block h-2 w-2 rounded-full ${
              groupDone ? "bg-green-500" : "bg-border"
            }`}
            aria-hidden="true"
          />
          <h3 className={`text-sm font-semibold ${meta.text}`}>{meta.label}</h3>
        </div>
        <span className="text-xs text-muted-foreground">
          {groupPct}/{prereqs.length} complete
        </span>
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {prereqs.map((prereq) => (
          <PrereqCard
            key={prereq.id}
            prereq={prereq}
            done={data[prereq.id] ?? 0}
            onChange={(val) => onChange(prereq.id, val)}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function PrereqTracker() {
  const [data, setData] = useState<PrereqData>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setData(JSON.parse(stored))
    } catch {}
  }, [])

  const handleChange = useCallback((id: string, val: number) => {
    setData((prev) => {
      const next = { ...prev, [id]: val }
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
      } catch {}
      return next
    })
  }, [])

  // Overall stats
  const totalDone = PREREQS.reduce((s, p) => s + Math.min(p.required, data[p.id] ?? 0), 0)
  const totalPct = Math.round((totalDone / TOTAL_REQUIRED) * 100)
  const satisfied = PREREQS.filter((p) => (data[p.id] ?? 0) >= p.required).length

  const sciPrereqs     = PREREQS.filter((p) => p.category === "science")
  const behavPrereqs   = PREREQS.filter((p) => p.category === "behavioral")
  const writingPrereqs = PREREQS.filter((p) => p.category === "writing")

  return (
    <section id="prereq-tracker" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        {/* Header */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Your Tools
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Prerequisite Tracker
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Track credits completed or planned for each AAMC prerequisite. Cards turn green
            automatically once you hit the required credits.
          </p>
        </header>

        {/* Overall progress bar */}
        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Overall prerequisite progress</p>
            <span className="text-lg font-bold text-primary">{totalPct}%</span>
          </div>

          {/* Segmented bar */}
          <div className="h-3 w-full rounded-full bg-secondary overflow-hidden flex gap-0.5">
            {PREREQS.map((prereq) => {
              const done = data[prereq.id] ?? 0
              const segPct = (prereq.required / TOTAL_REQUIRED) * 100
              const fill = Math.min(1, done / prereq.required)
              return (
                <div
                  key={prereq.id}
                  title={`${prereq.name}: ${done}/${prereq.required} credits`}
                  className="relative h-full rounded-sm overflow-hidden bg-border/50 flex-shrink-0"
                  style={{ width: `${segPct}%` }}
                >
                  <div
                    className={`absolute inset-y-0 left-0 transition-all duration-500 ${
                      fill >= 1 ? "bg-green-500" : fill > 0 ? "bg-primary" : ""
                    }`}
                    style={{ width: `${fill * 100}%` }}
                  />
                </div>
              )
            })}
          </div>

          {/* Sub-stats */}
          <div className="flex gap-4 mt-3 flex-wrap">
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{satisfied}</span>/{PREREQS.length}{" "}
              prerequisites satisfied
            </p>
            <p className="text-xs text-muted-foreground">
              <span className="font-semibold text-foreground">{totalDone}</span>/{TOTAL_REQUIRED}{" "}
              required credits covered
            </p>
          </div>
        </div>

        {/* Groups */}
        <CategoryGroup
          categoryKey="science"
          prereqs={sciPrereqs}
          data={data}
          onChange={handleChange}
        />
        <CategoryGroup
          categoryKey="behavioral"
          prereqs={behavPrereqs}
          data={data}
          onChange={handleChange}
        />
        <CategoryGroup
          categoryKey="writing"
          prereqs={writingPrereqs}
          data={data}
          onChange={handleChange}
        />

        {/* Tip */}
        <div className="rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-1">💡 How to use this</p>
          <p>
            Enter credits you have <em>completed</em> or are <em>currently enrolled in</em>.
            Planning a course for next semester? Count it here.
            Use this alongside the
            <Link href="/tools#course-planner" className="mx-1 underline underline-offset-2 text-primary transition-colors hover:text-primary/80">
              Course Planner
            </Link>
            to make sure every prerequisite is covered before you apply.
          </p>
        </div>
      </div>
    </section>
  )
}
