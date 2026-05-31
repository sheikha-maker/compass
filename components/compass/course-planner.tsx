"use client"

import { useState } from "react"
import { Plus, Trash2, GraduationCap, ChevronDown, ChevronUp } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Section } from "./section"
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
import { cn } from "@/lib/utils"

type Status = "planned" | "in-progress" | "done"

type Course = {
  id: string
  name: string
  semester: string
  year: string
  credits: string
  status: Status
}

const statusMeta: Record<Status, { label: string; className: string }> = {
  planned: { label: "Planned", className: "bg-secondary text-secondary-foreground" },
  "in-progress": { label: "In Progress", className: "bg-accent/15 text-accent" },
  done: { label: "Done", className: "bg-primary/15 text-primary" },
}

const semesterOptions = ["Fall", "Spring", "Summer"]
const yearOptions = ["Year 1", "Year 2", "Year 3", "Year 4"]

// Ordered display: Year 1 Fall, Year 1 Spring, Year 2 Fall ...
const termOrder = yearOptions.flatMap((y) => semesterOptions.slice(0, 2).map((s) => `${y} · ${s}`))

export function CoursePlanner() {
  const [courses, setCourses, hydrated] = useLocalStorage<Course[]>("compass-courses-v2", [])
  const [name, setName] = useState("")
  const [semester, setSemester] = useState("Fall")
  const [year, setYear] = useState("Year 1")
  const [credits, setCredits] = useState("")
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({})

  function addCourse(e: React.FormEvent) {
    e.preventDefault()
    if (!name.trim()) return
    setCourses((prev) => [
      ...prev,
      {
        id: crypto.randomUUID(),
        name: name.trim(),
        semester,
        year,
        credits: credits.trim(),
        status: "planned",
      },
    ])
    setName("")
    setCredits("")
  }

  function cycleStatus(id: string) {
    const order: Status[] = ["planned", "in-progress", "done"]
    setCourses((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status: order[(order.indexOf(c.status) + 1) % order.length] } : c,
      ),
    )
  }

  function remove(id: string) {
    setCourses((prev) => prev.filter((c) => c.id !== id))
  }

  function toggleCollapse(term: string) {
    setCollapsed((prev) => ({ ...prev, [term]: !prev[term] }))
  }

  // Group courses by "Year X · Semester"
  const grouped = termOrder
    .map((term) => {
      const [termYear, termSem] = term.split(" · ")
      const termCourses = courses.filter((c) => c.year === termYear && c.semester === termSem)
      return { term, courses: termCourses }
    })
    .filter((g) => g.courses.length > 0)

  const totalCredits = courses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0)

  return (
    <Section
      id="course-planner"
      eyebrow="Your Tools"
      title="Course Planner"
      intro="Map your prerequisites semester by semester. No account needed, everything saves in your browser."
    >
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
        <span className="mt-0.5 shrink-0">⚠️</span>
        <p>
          <strong>Browser storage only.</strong> Your courses will be lost if you clear your browser history or switch devices. Screenshot or export your plan regularly.
        </p>
      </div>

      {/* Add course form */}
      <form onSubmit={addCourse} className="rounded-xl border border-border bg-card p-5">
        <p className="mb-4 text-sm font-medium text-foreground">Add a course</p>
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="sm:col-span-2 lg:col-span-2">
            <Label htmlFor="course-name">Course name</Label>
            <Input
              id="course-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Organic Chemistry I"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="course-year">Year</Label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="course-year" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {yearOptions.map((y) => (
                  <SelectItem key={y} value={y}>{y}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="course-semester">Semester</Label>
            <Select value={semester} onValueChange={setSemester}>
              <SelectTrigger id="course-semester" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {semesterOptions.map((s) => (
                  <SelectItem key={s} value={s}>{s}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="course-credits">Credits</Label>
            <Input
              id="course-credits"
              type="number"
              min="0"
              max="6"
              value={credits}
              onChange={(e) => setCredits(e.target.value)}
              placeholder="4"
              className="mt-1.5"
            />
          </div>
          <div className="flex items-end sm:col-span-2 lg:col-span-3">
            <Button type="submit" className="w-full gap-1.5 sm:w-auto">
              <Plus className="h-4 w-4" />
              Add Course
            </Button>
          </div>
        </div>
      </form>

      {/* Semester view */}
      <div className="mt-6">
        {!hydrated ? null : courses.length === 0 ? (
          <div className="flex flex-col items-center rounded-xl border border-dashed border-border bg-card/50 px-6 py-14 text-center">
            <GraduationCap className="mb-3 h-9 w-9 text-muted-foreground" aria-hidden="true" />
            <p className="font-medium text-foreground">No courses yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Add your first course above, it'll appear in the right semester automatically.
            </p>
          </div>
        ) : (
          <>
            <div className="mb-4 flex items-center justify-between text-sm text-muted-foreground">
              <span>{courses.length} course{courses.length !== 1 ? "s" : ""} planned</span>
              <span>{totalCredits} total credits</span>
            </div>

            <div className="space-y-4">
              {grouped.map(({ term, courses: termCourses }) => {
                const termCredits = termCourses.reduce((sum, c) => sum + (Number(c.credits) || 0), 0)
                const isCollapsed = collapsed[term]
                return (
                  <div key={term} className="rounded-xl border border-border bg-card overflow-hidden">
                    {/* Semester header */}
                    <button
                      onClick={() => toggleCollapse(term)}
                      className="flex w-full items-center justify-between px-5 py-3.5 text-left hover:bg-muted/40 transition-colors"
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-medium text-foreground">{term}</span>
                        <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
                          {termCourses.length} course{termCourses.length !== 1 ? "s" : ""}
                          {termCredits > 0 ? ` · ${termCredits} cr` : ""}
                        </span>
                      </div>
                      {isCollapsed ? (
                        <ChevronDown className="h-4 w-4 text-muted-foreground" />
                      ) : (
                        <ChevronUp className="h-4 w-4 text-muted-foreground" />
                      )}
                    </button>

                    {!isCollapsed && (
                      <div className="divide-y divide-border border-t border-border">
                        {termCourses.map((c) => (
                          <div
                            key={c.id}
                            className="flex items-center gap-3 px-5 py-3.5"
                          >
                            <div className="min-w-0 flex-1">
                              <p className="truncate text-sm font-medium text-foreground">{c.name}</p>
                              {c.credits && (
                                <p className="text-xs text-muted-foreground">{c.credits} credits</p>
                              )}
                            </div>
                            <button
                              onClick={() => cycleStatus(c.id)}
                              className={cn(
                                "shrink-0 rounded-full px-3 py-1 text-xs font-medium transition-colors",
                                statusMeta[c.status].className,
                              )}
                              aria-label={`Status: ${statusMeta[c.status].label}. Click to change.`}
                            >
                              {statusMeta[c.status].label}
                            </button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => remove(c.id)}
                              aria-label={`Remove ${c.name}`}
                              className="shrink-0 text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>
    </Section>
  )
}
