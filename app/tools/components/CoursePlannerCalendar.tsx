"use client"

import { useState, useEffect, useCallback } from "react"
import Link from "next/link"
import { Plus, X, BookOpen, FlaskConical, Brain, GraduationCap, Layers, AlertTriangle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

// ─── Types ───────────────────────────────────────────────────────────────────

type CourseCategory = "science" | "lab" | "prereq" | "elective" | "other"

interface Course {
  id: string
  name: string
  credits: number
  category: CourseCategory
}

type PlannerData = Record<string, Course[]>

// ─── Constants ───────────────────────────────────────────────────────────────

const SEMESTERS = [
  { id: "y1f", year: 1, label: "Fall",   yearLabel: "Year 1" },
  { id: "y1s", year: 1, label: "Spring", yearLabel: "Year 1" },
  { id: "y2f", year: 2, label: "Fall",   yearLabel: "Year 2" },
  { id: "y2s", year: 2, label: "Spring", yearLabel: "Year 2" },
  { id: "y3f", year: 3, label: "Fall",   yearLabel: "Year 3" },
  { id: "y3s", year: 3, label: "Spring", yearLabel: "Year 3" },
  { id: "y4f", year: 4, label: "Fall",   yearLabel: "Year 4" },
  { id: "y4s", year: 4, label: "Spring", yearLabel: "Year 4" },
] as const

const YEAR_COLORS: Record<number, { bg: string; text: string; border: string }> = {
  1: { bg: "bg-timeline-1/10", text: "text-timeline-1", border: "border-timeline-1/30" },
  2: { bg: "bg-timeline-2/10", text: "text-timeline-2", border: "border-timeline-2/30" },
  3: { bg: "bg-timeline-3/10", text: "text-timeline-3", border: "border-timeline-3/30" },
  4: { bg: "bg-timeline-4/10", text: "text-timeline-4", border: "border-timeline-4/30" },
}

const CATEGORIES: {
  value: CourseCategory
  label: string
  chipBg: string
  chipText: string
  icon: React.ElementType
}[] = [
  {
    value: "science",
    label: "Science Prereq",
    chipBg: "bg-primary/10",
    chipText: "text-primary",
    icon: BookOpen,
  },
  {
    value: "lab",
    label: "Lab",
    chipBg: "bg-teal-100 dark:bg-teal-950/40",
    chipText: "text-teal-700 dark:text-teal-400",
    icon: FlaskConical,
  },
  {
    value: "prereq",
    label: "Non-Sci Prereq",
    chipBg: "bg-violet-100 dark:bg-violet-950/40",
    chipText: "text-violet-700 dark:text-violet-400",
    icon: Brain,
  },
  {
    value: "elective",
    label: "Major / Elective",
    chipBg: "bg-amber-100 dark:bg-amber-950/40",
    chipText: "text-amber-700 dark:text-amber-400",
    icon: GraduationCap,
  },
  {
    value: "other",
    label: "Other",
    chipBg: "bg-secondary",
    chipText: "text-muted-foreground",
    icon: Layers,
  },
]

const STORAGE_KEY = "pmc_courses_v2"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function categoryMeta(cat: CourseCategory) {
  return CATEGORIES.find((c) => c.value === cat) ?? CATEGORIES[4]
}

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function StatCard({
  label,
  value,
  sub,
}: {
  label: string
  value: number | string
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card px-4 py-3 flex-1 min-w-[100px]">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="text-2xl font-semibold text-foreground leading-none">{value}</p>
      {sub && <p className="text-[10px] text-muted-foreground mt-1">{sub}</p>}
    </div>
  )
}

function CourseChip({
  course,
  onRemove,
}: {
  course: Course
  onRemove: () => void
}) {
  const meta = categoryMeta(course.category)
  return (
    <div
      className={`group relative rounded-md px-2.5 py-1.5 text-xs leading-snug ${meta.chipBg} ${meta.chipText}`}
    >
      <p className="font-semibold pr-4 truncate max-w-[110px]">{course.name}</p>
      <p className="opacity-70 mt-0.5">
        {course.credits} cr · {meta.label}
      </p>
      <button
        onClick={onRemove}
        aria-label={`Remove ${course.name}`}
        className="absolute top-1.5 right-1.5 hidden group-hover:flex h-4 w-4 items-center justify-center rounded-full bg-black/15 hover:bg-black/25 transition-colors"
      >
        <X className="h-2.5 w-2.5" />
      </button>
    </div>
  )
}

function SemesterColumn({
  semester,
  courses,
  onAdd,
  onRemove,
}: {
  semester: (typeof SEMESTERS)[number]
  courses: Course[]
  onAdd: () => void
  onRemove: (id: string) => void
}) {
  const credits = courses.reduce((sum, c) => sum + c.credits, 0)
  const colors = YEAR_COLORS[semester.year]

  return (
    <div className="flex flex-col rounded-xl border border-border bg-card overflow-hidden">
      {/* Header */}
      <div className={`px-3 py-2.5 border-b border-border ${colors.bg}`}>
        <p className={`text-[10px] font-semibold uppercase tracking-widest ${colors.text}`}>
          {semester.yearLabel}
        </p>
        <p className="text-sm font-semibold text-foreground mt-0.5">{semester.label}</p>
        <p className="text-[11px] text-muted-foreground mt-1">
          <span className="font-bold text-foreground">{credits}</span> credits
        </p>
      </div>

      {/* Courses */}
      <div className="flex flex-col gap-1.5 p-2 flex-1 min-h-[120px]">
        {courses.map((course) => (
          <CourseChip
            key={course.id}
            course={course}
            onRemove={() => onRemove(course.id)}
          />
        ))}
      </div>

      {/* Add button */}
      <button
        onClick={onAdd}
        className="mx-2 mb-2 flex items-center justify-center gap-1 rounded-md border-[1.5px] border-dashed border-border py-1.5 text-[11px] text-muted-foreground hover:border-primary/60 hover:text-primary hover:bg-primary/5 transition-all duration-150"
      >
        <Plus className="h-3 w-3" />
        Add
      </button>
    </div>
  )
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function CoursePlannerCalendar() {
  const [data, setData] = useState<PlannerData>({})
  const [addingSem, setAddingSem] = useState<string | null>(null)
  const [form, setForm] = useState({
    name: "",
    credits: "4",
    category: "science" as CourseCategory,
  })

  // Load from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setData(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = useCallback((next: PlannerData) => {
    setData(next)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    } catch {}
  }, [])

  const addCourse = () => {
    if (!addingSem || !form.name.trim()) return
    const course: Course = {
      id: uid(),
      name: form.name.trim(),
      credits: Math.max(1, Math.min(6, Number(form.credits) || 4)),
      category: form.category,
    }
    const updated = {
      ...data,
      [addingSem]: [...(data[addingSem] ?? []), course],
    }
    persist(updated)
    setAddingSem(null)
    setForm({ name: "", credits: "4", category: "science" })
  }

  const removeCourse = (semId: string, courseId: string) => {
    const updated = {
      ...data,
      [semId]: (data[semId] ?? []).filter((c) => c.id !== courseId),
    }
    persist(updated)
  }

  const openModal = (semId: string) => {
    setForm({ name: "", credits: "4", category: "science" })
    setAddingSem(semId)
  }

  // Stats
  const allCourses = Object.values(data).flat()
  const totalCredits = allCourses.reduce((s, c) => s + c.credits, 0)
  const sciCredits = allCourses
    .filter((c) => c.category === "science" || c.category === "lab")
    .reduce((s, c) => s + c.credits, 0)
  const semsFilled = SEMESTERS.filter(
    (s) => (data[s.id] ?? []).length > 0
  ).length

  return (
    <section id="course-planner" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        {/* Header */}
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Your Tools
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Course Planner
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Map your prerequisites semester by semester. Everything saves in your browser.
          </p>
          <div className="mt-5 rounded-xl border border-border bg-card px-4 py-3 text-sm text-muted-foreground">
            <p>
              <span className="font-semibold text-foreground">Pro tip:</span> Use the
              <Link href="/tools#prereq-tracker" className="ml-1 underline underline-offset-2 text-primary transition-colors hover:text-primary/80">
                Prerequisite Tracker
              </Link>
              to cross-check the requirements behind the classes you're planning.
            </p>
          </div>
        </header>

        {/* Storage warning */}
        <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <p>
            <strong>Browser storage only.</strong> Your plan will be lost if you clear browser
            history or switch devices. Screenshot or export regularly.
          </p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          <StatCard label="Total credits planned" value={totalCredits} sub="across all semesters" />
          <StatCard label="Science credits" value={sciCredits} sub="target ≥ 32" />
          <StatCard label="Semesters planned" value={semsFilled} sub="of 8 total" />
          <StatCard label="Courses added" value={allCourses.length} />
        </div>

        {/* Legend */}
        <div className="flex flex-wrap gap-3 mb-5">
          {CATEGORIES.map((cat) => {
            const Icon = cat.icon
            return (
              <div key={cat.value} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={`inline-flex h-5 w-5 items-center justify-center rounded ${cat.chipBg} ${cat.chipText}`}>
                  <Icon className="h-3 w-3" />
                </span>
                {cat.label}
              </div>
            )
          })}
        </div>

        {/* Year bands */}
        <div className="relative overflow-x-auto pb-4">
          <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-20 bg-gradient-to-l from-card to-transparent dark:from-slate-950/95 sm:block" />
          <div className="absolute right-4 top-3 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-muted-foreground shadow-sm backdrop-blur-sm sm:hidden">
            ← scroll →
          </div>
          <div className="min-w-[900px]">
            {/* Year band labels */}
            <div className="grid grid-cols-4 mb-1.5 gap-2">
              {[1, 2, 3, 4].map((yr) => {
                const c = YEAR_COLORS[yr]
                return (
                  <div
                    key={yr}
                    className={`rounded-md py-1 text-center text-[10px] font-bold uppercase tracking-widest ${c.bg} ${c.text}`}
                  >
                    Year {yr}
                  </div>
                )
              })}
            </div>

            {/* 8-column semester grid */}
            <div className="grid grid-cols-8 gap-2">
              {SEMESTERS.map((sem) => (
                <SemesterColumn
                  key={sem.id}
                  semester={sem}
                  courses={data[sem.id] ?? []}
                  onAdd={() => openModal(sem.id)}
                  onRemove={(id) => removeCourse(sem.id, id)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Add course dialog */}
      <Dialog open={addingSem !== null} onOpenChange={(open) => !open && setAddingSem(null)}>
        <DialogContent className="sm:max-w-[360px]">
          <DialogHeader>
            <DialogTitle className="font-serif">
              Add to{" "}
              {addingSem
                ? SEMESTERS.find((s) => s.id === addingSem)?.yearLabel +
                  " · " +
                  SEMESTERS.find((s) => s.id === addingSem)?.label
                : ""}
            </DialogTitle>
          </DialogHeader>

          <div className="grid gap-4 pt-2">
            <div>
              <Label htmlFor="cp-name">Course name</Label>
              <Input
                id="cp-name"
                className="mt-1.5"
                placeholder="e.g. Organic Chemistry I"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && addCourse()}
                autoFocus
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="cp-credits">Credits</Label>
                <Input
                  id="cp-credits"
                  type="number"
                  min={1}
                  max={6}
                  className="mt-1.5"
                  value={form.credits}
                  onChange={(e) => setForm((f) => ({ ...f, credits: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="cp-cat">Category</Label>
                <Select
                  value={form.category}
                  onValueChange={(v) =>
                    setForm((f) => ({ ...f, category: v as CourseCategory }))
                  }
                >
                  <SelectTrigger id="cp-cat" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {CATEGORIES.map((cat) => (
                      <SelectItem key={cat.value} value={cat.value}>
                        {cat.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <Button
                variant="outline"
                className="flex-none"
                onClick={() => setAddingSem(null)}
              >
                Cancel
              </Button>
              <Button className="flex-1" onClick={addCourse} disabled={!form.name.trim()}>
                <Plus className="h-4 w-4" />
                Add Course
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </section>
  )
}
