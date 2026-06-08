"use client"

import { useState, useEffect, useCallback } from "react"
import { Check } from "lucide-react"

type CheckData = Record<string, boolean>

const YEARS = [
  {
    label: "Freshman Year",
    theme: "text-blue-600 dark:text-blue-400",
    bar: "bg-blue-500",
    border: "border-blue-200 dark:border-blue-900/40",
    headBg: "bg-blue-50 dark:bg-blue-950/20",
    items: [
      "Meet with your pre-health advisor and share your medical school goals",
      "Complete introductory science coursework (Biology, Chemistry)",
      "Maintain a competitive GPA (aim for 3.5+)",
      "Join the Pre-Health Club and attend workshops",
      "Begin shadowing or clinical volunteering — even a few hours counts",
      "Establish relationships with at least two professors",
      "Start tracking your experiences and hours",
      "Make a plan for your first summer",
    ],
  },
  {
    label: "Sophomore Year",
    theme: "text-teal-600 dark:text-teal-400",
    bar: "bg-teal-500",
    border: "border-teal-200 dark:border-teal-900/40",
    headBg: "bg-teal-50 dark:bg-teal-950/20",
    items: [
      "Continue prerequisite coursework and monitor GPA",
      "Increase clinical exposure — shadowing across multiple specialties",
      "Explore research opportunities with a faculty member",
      "Take on a leadership role in at least one organization",
      "Begin identifying potential letter-of-recommendation writers",
      "Attend a medical school admissions info session",
      "Update your résumé/CV and experience tracker",
      "Draft a preliminary medical school preparation plan",
    ],
  },
  {
    label: "Junior Year",
    theme: "text-violet-600 dark:text-violet-400",
    bar: "bg-violet-500",
    border: "border-violet-200 dark:border-violet-900/40",
    headBg: "bg-violet-50 dark:bg-violet-950/20",
    items: [
      "Complete most prerequisite coursework",
      "Meet with your advisor to assess application readiness",
      "Build and begin your MCAT study plan",
      "Register for and take the MCAT",
      "Request letters of recommendation — give writers plenty of time",
      "Begin drafting your personal statement",
      "Research and develop your medical school list",
      "Continue clinical, research, and service commitments",
    ],
  },
  {
    label: "Senior Year",
    theme: "text-amber-600 dark:text-amber-400",
    bar: "bg-amber-500",
    border: "border-amber-200 dark:border-amber-900/40",
    headBg: "bg-amber-50 dark:bg-amber-950/20",
    items: [
      "Submit primary applications (AMCAS/AACOMAS) as early as possible",
      "Complete secondary applications within 2 weeks of receiving them",
      "Prepare for interviews — practice both traditional and MMI formats",
      "Maintain your GPA and stay active in commitments",
      "Update schools on any significant new achievements",
      "Review acceptance offers and financial aid packages carefully",
      "Finalize your medical school choice by April 30",
      "Complete graduation requirements and prepare for the transition",
    ],
  },
]

const STORAGE_KEY = "pmc_checks_v1"

export function YearlyChecklist() {
  const [checks, setChecks] = useState<CheckData>({})

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setChecks(JSON.parse(stored))
    } catch {}
  }, [])

  const toggle = useCallback((key: string) => {
    setChecks((prev) => {
      const next = { ...prev, [key]: !prev[key] }
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
      return next
    })
  }, [])

  const totalItems = YEARS.reduce((s, y) => s + y.items.length, 0)
  const totalDone = Object.values(checks).filter(Boolean).length
  const overallPct = Math.round((totalDone / totalItems) * 100)

  return (
    <section id="yearly-checklist" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Moravian University Pre-Med Milestone Checklist
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            The key milestones for each year of your pre-med journey, kept focused. Check things off as you go.
          </p>
        </header>

        {/* Overall progress */}
        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <div className="flex items-baseline justify-between mb-3">
            <p className="text-sm font-semibold text-foreground">Overall progress</p>
            <span className="text-lg font-bold text-primary">{overallPct}%</span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full rounded-full bg-primary transition-all duration-500"
              style={{ width: `${overallPct}%` }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            <span className="font-semibold text-foreground">{totalDone}</span>/{totalItems} milestones complete
          </p>
        </div>

        {/* Year cards grid */}
        <div className="grid gap-4 sm:grid-cols-2">
          {YEARS.map((yr, yi) => {
            const done = yr.items.filter((_, ii) => checks[`${yi}-${ii}`]).length
            const pct = Math.round((done / yr.items.length) * 100)

            return (
              <div
                key={yr.label}
                className={`rounded-xl border bg-card overflow-hidden transition-shadow hover:shadow-md ${yr.border}`}
              >
                {/* Year header */}
                <div className={`px-4 py-3 border-b ${yr.border} ${yr.headBg}`}>
                  <div className="flex items-center justify-between">
                    <p className={`text-sm font-semibold ${yr.theme}`}>{yr.label}</p>
                    <span className={`text-xs font-semibold ${yr.theme}`}>
                      {done}/{yr.items.length}
                    </span>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{pct}% complete</p>
                  <div className="h-1 rounded-full bg-border/50 overflow-hidden mt-2">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${yr.bar}`}
                      style={{ width: `${pct}%` }}
                    />
                  </div>
                </div>

                {/* Checklist items */}
                <div className="px-4 py-3 flex flex-col gap-2">
                  {yr.items.map((item, ii) => {
                    const key = `${yi}-${ii}`
                    const checked = !!checks[key]
                    return (
                      <button
                        key={key}
                        onClick={() => toggle(key)}
                        className="flex items-start gap-2.5 text-left w-full group"
                      >
                        <span
                          className={`mt-0.5 h-4 w-4 shrink-0 rounded flex items-center justify-center border transition-all duration-150 ${
                            checked
                              ? "bg-green-500 border-green-500"
                              : "border-border group-hover:border-primary/60"
                          }`}
                        >
                          {checked && <Check className="h-2.5 w-2.5 text-white" />}
                        </span>
                        <span
                          className={`text-xs leading-relaxed transition-colors ${
                            checked
                              ? "line-through text-muted-foreground"
                              : "text-foreground group-hover:text-primary"
                          }`}
                        >
                          {item}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
