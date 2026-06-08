"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, School } from "lucide-react"
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

const CATEGORY_OPTIONS = [
  { value: "reach", label: "Reach" },
  { value: "match", label: "Match" },
  { value: "safety", label: "Safety" },
]

const SYSTEM_OPTIONS = [
  { value: "AMCAS", label: "AMCAS" },
  { value: "AACOMAS", label: "AACOMAS" },
  { value: "TMDSAS", label: "TMDSAS" },
  { value: "CASPA", label: "CASPA" },
  { value: "Other", label: "Other" },
]

const STORAGE_KEY = "pmc_school_list_v1"

function uid() {
  return Math.random().toString(36).slice(2, 9)
}

interface School {
  id: string
  name: string
  category: string
  system: string
  deadline: string
  interview: string
  note: string
}

export function SchoolList() {
  const [schools, setSchools] = useState<School[]>([])
  const [form, setForm] = useState({
    name: "",
    category: "match",
    system: "AMCAS",
    deadline: "",
    interview: "",
    note: "",
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSchools(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = useCallback((next: School[]) => {
    setSchools(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }, [])

  const addSchool = () => {
    if (!form.name.trim()) return
    persist([
      ...schools,
      {
        id: uid(),
        name: form.name.trim(),
        category: form.category,
        system: form.system,
        deadline: form.deadline,
        interview: form.interview.trim(),
        note: form.note.trim(),
      },
    ])
    setForm({ name: "", category: "match", system: "AMCAS", deadline: "", interview: "", note: "" })
  }

  const removeSchool = (id: string) => persist(schools.filter((school) => school.id !== id))

  const updateCategory = (id: string, category: string) =>
    persist(schools.map((school) => (school.id === id ? { ...school, category } : school)))

  const updateSystem = (id: string, system: string) =>
    persist(schools.map((school) => (school.id === id ? { ...school, system } : school)))

  const upcoming = schools
    .filter((school) => school.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

  const totals = {
    total: schools.length,
    reach: schools.filter((school) => school.category === "reach").length,
    match: schools.filter((school) => school.category === "match").length,
    safety: schools.filter((school) => school.category === "safety").length,
  }

  return (
    <section id="school-list" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            School List & Comparison
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Track the schools you're considering, categorize reach/match/safety, and keep deadlines, application systems, and interview notes in one place.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: "Total schools", value: totals.total },
            { label: "Reach", value: totals.reach },
            { label: "Match", value: totals.match },
            { label: "Safety", value: totals.safety },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 min-w-[130px] rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold leading-none text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <p className="text-sm font-semibold text-foreground mb-3">Upcoming deadlines</p>
          {upcoming.length > 0 ? (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {upcoming.slice(0, 4).map((school) => (
                <li key={school.id} className="flex items-center justify-between rounded-lg bg-background px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">{school.name}</p>
                    <p>{school.deadline}</p>
                  </div>
                  <span className="rounded-full bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground">
                    {school.system}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Add schools below to populate deadlines and compare your list.</p>
          )}
        </div>

        {schools.length === 0 && (
          <div className="empty-state mb-8">
            <School className="h-10 w-10" />
            <p className="empty-title">No schools on your list yet</p>
            <p className="empty-body">
              Most applicants apply to 15–25 schools across reach, target, and safety categories.
              Add schools above and track deadlines, interview notes, and status here.
            </p>
          </div>
        )}

        {schools.length > 0 && (
          <div className="rounded-xl border border-border bg-card overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">School</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Category</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">System</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deadline</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Interview notes</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {schools.map((school) => (
                  <tr key={school.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{school.name}</td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <Select
                        value={school.category}
                        onValueChange={(v) => updateCategory(school.id, v)}
                      >
                        <SelectTrigger className="h-8 w-28 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {CATEGORY_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-xs">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      <Select
                        value={school.system}
                        onValueChange={(v) => updateSystem(school.id, v)}
                      >
                        <SelectTrigger className="h-8 w-28 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {SYSTEM_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-xs">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">{school.deadline || "N/A"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{school.interview || "—"}</td>
                    <td className="px-4 py-3 text-muted-foreground">{school.note || "—"}</td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeSchool(school.id)}
                        aria-label={`Remove ${school.name}`}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-semibold text-foreground mb-5">Add a school</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="school-name">School</Label>
              <Input
                id="school-name"
                className="mt-1.5"
                placeholder="e.g. Drexel University College of Medicine"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="school-category">Category</Label>
              <Select
                value={form.category}
                onValueChange={(v) => setForm((f) => ({ ...f, category: v }))}
              >
                <SelectTrigger id="school-category" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CATEGORY_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="school-system">Application system</Label>
              <Select
                value={form.system}
                onValueChange={(v) => setForm((f) => ({ ...f, system: v }))}
              >
                <SelectTrigger id="school-system" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SYSTEM_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="school-deadline">Deadline</Label>
              <Input
                id="school-deadline"
                type="date"
                className="mt-1.5"
                value={form.deadline}
                onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
              />
            </div>
          </div>

          <div className="grid gap-4 mt-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="school-interview">Interview notes</Label>
              <Input
                id="school-interview"
                className="mt-1.5"
                value={form.interview}
                onChange={(e) => setForm((f) => ({ ...f, interview: e.target.value }))}
                placeholder="e.g. MMI or traditional"
              />
            </div>
            <div>
              <Label htmlFor="school-note">Notes</Label>
              <Input
                id="school-note"
                className="mt-1.5"
                value={form.note}
                onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
                placeholder="e.g. mission fit, pre-req gaps"
              />
            </div>
          </div>

          <Button className="mt-5 gap-2" onClick={addSchool}>
            <Plus className="h-4 w-4" />
            Add school
          </Button>
        </div>
      </div>
    </section>
  )
}
