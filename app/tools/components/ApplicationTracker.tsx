"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2 } from "lucide-react"
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

const STATUS_OPTIONS = [
  { value: "planning", label: "Planning" },
  { value: "started", label: "Primary started" },
  { value: "primary", label: "Primary submitted" },
  { value: "secondary", label: "Secondary submitted" },
  { value: "interview", label: "Interview invited" },
  { value: "decision", label: "Decision received" },
]

const STORAGE_KEY = "pmc_app_tracker_v1"

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

interface Application {
  id: string
  school: string
  type: string
  deadline: string
  status: string
  note: string
}

export function ApplicationTracker() {
  const [apps, setApps] = useState<Application[]>([])
  const [form, setForm] = useState({
    school: "",
    type: "MD",
    deadline: "",
    status: "planning",
    note: "",
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setApps(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = useCallback((next: Application[]) => {
    setApps(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }, [])

  const addApplication = () => {
    if (!form.school.trim()) return
    persist([
      ...apps,
      {
        id: uid(),
        school: form.school.trim(),
        type: form.type,
        deadline: form.deadline,
        status: form.status,
        note: form.note.trim(),
      },
    ])
    setForm({ school: "", type: "MD", deadline: "", status: "planning", note: "" })
  }

  const removeApplication = (id: string) => persist(apps.filter((app) => app.id !== id))

  const updateStatus = (id: string, status: string) =>
    persist(apps.map((app) => (app.id === id ? { ...app, status } : app)))

  const upcoming = apps
    .filter((app) => app.deadline)
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())

  const total = apps.length
  const primarySubmitted = apps.filter((app) => app.status === "primary").length
  const secondarySubmitted = apps.filter((app) => app.status === "secondary").length
  const interviewInvited = apps.filter((app) => app.status === "interview").length

  return (
    <section id="application-tracker" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Application Tracker
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Keep your medical school applications organized: deadlines, status, interview invites, and decision progress.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: "Schools tracked", value: total },
            { label: "Primary submitted", value: primarySubmitted },
            { label: "Secondary submitted", value: secondarySubmitted },
            { label: "Interview invited", value: interviewInvited },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 min-w-[120px] rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold leading-none text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <p className="text-sm font-semibold text-foreground mb-3">Upcoming deadlines</p>
          {upcoming.length > 0 ? (
            <ul className="space-y-2 text-sm text-muted-foreground">
              {upcoming.slice(0, 3).map((app) => (
                <li key={app.id} className="flex items-center justify-between rounded-lg bg-background px-4 py-3">
                  <div>
                    <p className="font-medium text-foreground">{app.school}</p>
                    <p>{app.deadline || "No deadline"}</p>
                  </div>
                  <span className="rounded-full bg-secondary/50 px-2.5 py-1 text-xs text-muted-foreground">
                    {STATUS_OPTIONS.find((option) => option.value === app.status)?.label}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-muted-foreground">Add schools below to see upcoming deadlines.</p>
          )}
        </div>

        {apps.length > 0 && (
          <div className="rounded-xl border border-border bg-card overflow-hidden mb-8">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">School</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Type</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deadline</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {apps.map((app) => (
                  <tr key={app.id} className="border-b border-border last:border-0">
                    <td className="px-4 py-3 font-medium text-foreground">{app.school}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.type}</td>
                    <td className="px-4 py-3 text-muted-foreground">{app.deadline || "N/A"}</td>
                    <td className="px-4 py-3">
                      <Select
                        value={app.status}
                        onValueChange={(v) => updateStatus(app.id, v)}
                      >
                        <SelectTrigger className="h-8 w-44 text-xs">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          {STATUS_OPTIONS.map((option) => (
                            <SelectItem key={option.value} value={option.value} className="text-xs">
                              {option.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-8 w-8 text-muted-foreground hover:text-destructive"
                        onClick={() => removeApplication(app.id)}
                        aria-label={`Remove ${app.school}`}
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
              <Label htmlFor="app-school">School</Label>
              <Input
                id="app-school"
                className="mt-1.5"
                placeholder="e.g. Wake Forest School of Medicine"
                value={form.school}
                onChange={(e) => setForm((f) => ({ ...f, school: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="app-type">Type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => setForm((f) => ({ ...f, type: v }))}
              >
                <SelectTrigger id="app-type" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="MD">MD</SelectItem>
                  <SelectItem value="DO">DO</SelectItem>
                  <SelectItem value="Combined">Combined / Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="app-deadline">Deadline</Label>
              <Input
                id="app-deadline"
                type="date"
                className="mt-1.5"
                value={form.deadline}
                onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="app-status">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v }))}
              >
                <SelectTrigger id="app-status" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="app-note">Notes</Label>
            <Input
              id="app-note"
              className="mt-1.5"
              placeholder="e.g. secondary prompt sent, interview date"
              value={form.note}
              onChange={(e) => setForm((f) => ({ ...f, note: e.target.value }))}
            />
          </div>

          <Button className="mt-5 gap-2" onClick={addApplication}>
            <Plus className="h-4 w-4" />
            Add school
          </Button>
        </div>
      </div>
    </section>
  )
}
