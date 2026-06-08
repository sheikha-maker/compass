"use client"

import { useState, useCallback, useEffect } from "react"
import { Plus, Trash2, Info } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Types & constants ────────────────────────────────────────────────────────

const GRADE_POINTS: Record<string, number> = {
  "A+": 4.0, "A": 4.0, "A-": 3.7,
  "B+": 3.3, "B": 3.0, "B-": 2.7,
  "C+": 2.3, "C": 2.0, "C-": 1.7,
  "D+": 1.3, "D": 1.0, "D-": 0.7,
  "F":  0.0,
}

const SCIENCE_SUBJECTS = [
  "Biology", "Chemistry", "Physics", "Biochemistry",
  "Genetics", "Microbiology", "Anatomy", "Physiology",
  "Math", "Statistics", "Neuroscience",
]

interface Course {
  id: string
  name: string
  grade: string
  credits: number
  isScience: boolean
}

const STORAGE_KEY = "pmc_gpa_v1"

function uid() { return Math.random().toString(36).slice(2, 8) }

function blankCourse(): Course {
  return { id: uid(), name: "", grade: "A", credits: 3, isScience: false }
}

function calcGPA(courses: Course[]) {
  const valid = courses.filter(c => c.grade in GRADE_POINTS && c.credits > 0)
  if (valid.length === 0) return { gpa: null, sciGpa: null, totalCredits: 0, sciCredits: 0 }

  const totalQP = valid.reduce((s, c) => s + GRADE_POINTS[c.grade] * c.credits, 0)
  const totalCr = valid.reduce((s, c) => s + c.credits, 0)

  const sci = valid.filter(c => c.isScience)
  const sciQP = sci.reduce((s, c) => s + GRADE_POINTS[c.grade] * c.credits, 0)
  const sciCr = sci.reduce((s, c) => s + c.credits, 0)

  return {
    gpa: totalCr > 0 ? totalQP / totalCr : null,
    sciGpa: sciCr > 0 ? sciQP / sciCr : null,
    totalCredits: totalCr,
    sciCredits: sciCr,
  }
}

function gpaColor(gpa: number | null): string {
  if (gpa === null) return "text-muted-foreground"
  if (gpa >= 3.7) return "text-green-600 dark:text-green-400"
  if (gpa >= 3.5) return "text-teal-600 dark:text-teal-400"
  if (gpa >= 3.0) return "text-amber-600 dark:text-amber-400"
  return "text-red-600 dark:text-red-400"
}

function gpaLabel(gpa: number | null): string {
  if (gpa === null) return ""
  if (gpa >= 3.7) return "Strong — very competitive"
  if (gpa >= 3.5) return "Competitive"
  if (gpa >= 3.3) return "Acceptable — strengthen other areas"
  if (gpa >= 3.0) return "Below average for MD — consider DO or post-bacc"
  return "Needs significant improvement"
}

// ─── Main component ───────────────────────────────────────────────────────────

export function GPACalculator() {
  const [courses, setCourses] = useState<Course[]>([blankCourse()])
  const [showInfo, setShowInfo] = useState(false)

  useEffect(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY)
      if (s) setCourses(JSON.parse(s))
    } catch {}
  }, [])

  const persist = useCallback((next: Course[]) => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
    setCourses(next)
  }, [])

  const addCourse = () => persist([...courses, blankCourse()])

  const removeCourse = (id: string) => {
    if (courses.length === 1) return
    persist(courses.filter(c => c.id !== id))
  }

  const update = (id: string, field: keyof Course, value: string | number | boolean) =>
    persist(courses.map(c => c.id === id ? { ...c, [field]: value } : c))

  const guessScience = (id: string, name: string) => {
    const isScience = SCIENCE_SUBJECTS.some(s => name.toLowerCase().includes(s.toLowerCase()))
    persist(courses.map(c => c.id === id ? { ...c, name, isScience } : c))
  }

  const { gpa, sciGpa, totalCredits, sciCredits } = calcGPA(courses)

  return (
    <section id="gpa-calculator" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">

        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            GPA Calculator
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Calculate your cumulative and science GPA separately — medical schools look at both.
          </p>
        </header>

        {/* GPA result cards */}
        <div className="grid grid-cols-2 gap-4 mb-8">
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">Cumulative GPA</p>
            <p className={`text-4xl font-bold tabular-nums ${gpaColor(gpa)}`}>
              {gpa !== null ? gpa.toFixed(2) : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{gpa !== null ? gpaLabel(gpa) : "Add courses below"}</p>
            <p className="text-xs text-muted-foreground mt-1">{totalCredits} credits</p>
          </div>
          <div className="rounded-2xl border border-border bg-card p-5 text-center">
            <div className="flex items-center justify-center gap-1.5 mb-2">
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Science GPA</p>
              <button
                onClick={() => setShowInfo(v => !v)}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="What is science GPA?"
              >
                <Info className="h-3.5 w-3.5" />
              </button>
            </div>
            <p className={`text-4xl font-bold tabular-nums ${gpaColor(sciGpa)}`}>
              {sciGpa !== null ? sciGpa.toFixed(2) : "—"}
            </p>
            <p className="text-xs text-muted-foreground mt-2">{sciGpa !== null ? gpaLabel(sciGpa) : "Mark courses as science"}</p>
            <p className="text-xs text-muted-foreground mt-1">{sciCredits} science credits</p>
          </div>
        </div>

        {showInfo && (
          <div className="mb-6 rounded-xl border border-blue-200 bg-blue-50 dark:border-blue-800/40 dark:bg-blue-950/20 px-4 py-3 text-sm text-muted-foreground leading-relaxed">
            <p className="font-semibold text-foreground mb-1">What counts as science GPA (BCPM)?</p>
            Medical schools use your <strong>BCPM GPA</strong> — Biology, Chemistry, Physics, and Math.
            AMCAS calculates this separately from your cumulative GPA. Mark the courses below as
            "science" if they fall into these categories. When in doubt, check the{" "}
            <a href="https://students-residents.aamc.org/applying-medical-school-amcas/amcas-course-classification-guide" target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2 font-medium">AAMC course classification guide</a>.
          </div>
        )}

        {/* Benchmarks */}
        <div className="mb-6 grid grid-cols-4 gap-2 text-center">
          {[
            { label: "≥ 3.7", desc: "Strong MD", color: "text-green-600 dark:text-green-400", bg: "bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800/40" },
            { label: "≥ 3.5", desc: "Competitive", color: "text-teal-600 dark:text-teal-400", bg: "bg-teal-50 dark:bg-teal-950/20 border-teal-200 dark:border-teal-800/40" },
            { label: "≥ 3.3", desc: "Acceptable", color: "text-amber-600 dark:text-amber-400", bg: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800/40" },
            { label: "< 3.0", desc: "Challenging", color: "text-red-600 dark:text-red-400", bg: "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-800/40" },
          ].map(b => (
            <div key={b.label} className={`rounded-lg border px-2 py-2.5 ${b.bg}`}>
              <p className={`text-sm font-bold ${b.color}`}>{b.label}</p>
              <p className="text-[10px] text-muted-foreground mt-0.5">{b.desc}</p>
            </div>
          ))}
        </div>

        {/* Course table */}
        <div className="rounded-xl border border-border bg-card overflow-hidden mb-4">
          {/* Header */}
          <div className="grid grid-cols-[1fr_80px_64px_64px_32px] gap-2 px-4 py-2.5 border-b border-border bg-muted/30 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
            <span>Course</span>
            <span className="text-center">Grade</span>
            <span className="text-center">Credits</span>
            <span className="text-center">Science?</span>
            <span />
          </div>

          {/* Course rows */}
          <div className="divide-y divide-border">
            {courses.map((course) => (
              <div key={course.id} className="grid grid-cols-[1fr_80px_64px_64px_32px] gap-2 px-4 py-2.5 items-center">
                <input
                  type="text"
                  placeholder="Course name"
                  value={course.name}
                  onChange={e => guessScience(course.id, e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-2.5 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <select
                  value={course.grade}
                  onChange={e => update(course.id, "grade", e.target.value)}
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-primary"
                >
                  {Object.keys(GRADE_POINTS).map(g => (
                    <option key={g} value={g}>{g}</option>
                  ))}
                </select>
                <input
                  type="number"
                  min={0.5}
                  max={6}
                  step={0.5}
                  value={course.credits}
                  onChange={e => update(course.id, "credits", Number(e.target.value))}
                  className="w-full rounded-md border border-border bg-background px-2 py-1.5 text-sm text-center focus:outline-none focus:ring-1 focus:ring-primary"
                />
                <div className="flex justify-center">
                  <input
                    type="checkbox"
                    checked={course.isScience}
                    onChange={e => update(course.id, "isScience", e.target.checked)}
                    className="h-4 w-4 accent-primary cursor-pointer"
                    aria-label="Science course"
                  />
                </div>
                <button
                  onClick={() => removeCourse(course.id)}
                  disabled={courses.length === 1}
                  className="flex justify-center text-muted-foreground hover:text-red-500 disabled:opacity-25 disabled:cursor-not-allowed transition-colors"
                  aria-label="Remove course"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center justify-between">
          <Button variant="outline" size="sm" onClick={addCourse} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add course
          </Button>
          <p className="text-xs text-muted-foreground">
            Data saved automatically
          </p>
        </div>

        {/* Disclaimer */}
        <p className="mt-6 text-xs text-muted-foreground leading-relaxed border-t border-border pt-4">
          This calculator is for planning purposes only. AMCAS recalculates your GPA from official transcripts
          and may classify courses differently. Always verify with your pre-health advisor and the{" "}
          <a href="https://students-residents.aamc.org" target="_blank" rel="noopener noreferrer" className="underline underline-offset-2">AAMC</a>.
        </p>
      </div>
    </section>
  )
}
