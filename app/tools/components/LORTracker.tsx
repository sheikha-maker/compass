"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2, AlertTriangle } from "lucide-react"
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

// ─── Types ───────────────────────────────────────────────────────────────────

type LORStatus = "planning" | "asked" | "confirmed" | "submitted"

interface LOR {
  id: string
  name: string
  relationship: string
  deadline: string
  status: LORStatus
}

// ─── Constants ───────────────────────────────────────────────────────────────

const STATUSES: { value: LORStatus; label: string; bg: string; text: string }[] = [
  { value: "planning",  label: "Planning to ask", bg: "bg-blue-100 dark:bg-blue-950/40",   text: "text-blue-700 dark:text-blue-400" },
  { value: "asked",     label: "Asked",            bg: "bg-amber-100 dark:bg-amber-950/40", text: "text-amber-700 dark:text-amber-400" },
  { value: "confirmed", label: "Confirmed",        bg: "bg-teal-100 dark:bg-teal-950/40",   text: "text-teal-700 dark:text-teal-400" },
  { value: "submitted", label: "Submitted",        bg: "bg-green-100 dark:bg-green-950/40", text: "text-green-700 dark:text-green-400" },
]

const STORAGE_KEY = "pmc_lors_v1"

function uid() { return Math.random().toString(36).slice(2, 9) }

function statusMeta(status: LORStatus) {
  return STATUSES.find((s) => s.value === status) ?? STATUSES[0]
}

// ─── Main Component ───────────────────────────────────────────────────────────

export function LORTracker() {
  const [lors, setLors] = useState<LOR[]>([])
  const [form, setForm] = useState({ name: "", relationship: "", deadline: "", status: "planning" as LORStatus })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setLors(JSON.parse(stored))
    } catch {}
  }, [])

  const persist = useCallback((next: LOR[]) => {
    setLors(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }, [])

  const addLOR = () => {
    if (!form.name.trim()) return
    persist([...lors, { id: uid(), name: form.name.trim(), relationship: form.relationship.trim(), deadline: form.deadline, status: form.status }])
    setForm({ name: "", relationship: "", deadline: "", status: "planning" })
  }

  const removeLOR = (id: string) => persist(lors.filter((l) => l.id !== id))

  const updateStatus = (id: string, status: LORStatus) =>
    persist(lors.map((l) => (l.id === id ? { ...l, status } : l)))

  // Stats
  const confirmed = lors.filter((l) => l.status === "confirmed" || l.status === "submitted").length
  const submitted = lors.filter((l) => l.status === "submitted").length
  const target = 5

  // Sort: upcoming deadlines first, then no deadline
  const sorted = [...lors].sort((a, b) => {
    if (!a.deadline && !b.deadline) return 0
    if (!a.deadline) return 1
    if (!b.deadline) return -1
    return new Date(a.deadline).getTime() - new Date(b.deadline).getTime()
  })

  return (
    <section id="lor-tracker" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Letter of Rec Tracker
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Track every writer — who you've asked, what they've confirmed, and when submissions are due.
            Most schools require 3–5 letters.
          </p>
        </header>

        <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
          <p><strong>Browser storage only.</strong> Your data will be lost if you clear browser history or switch devices.</p>
        </div>

        {/* Stats */}
        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: "Writers tracked", value: lors.length },
            { label: "Confirmed", value: confirmed },
            { label: "Submitted", value: submitted },
            { label: "Recommended", value: target, sub: "most schools require 3–5" },
          ].map((s) => (
            <div key={s.label} className="flex-1 min-w-[100px] rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">{s.label}</p>
              <p className={`text-2xl font-semibold leading-none ${s.value >= target && s.label === "Confirmed" ? "text-green-600 dark:text-green-400" : ""}`}>
                {s.value}
              </p>
              {s.sub && <p className="text-[10px] text-muted-foreground mt-1">{s.sub}</p>}
            </div>
          ))}
        </div>

        {/* Progress bar toward target */}
        <div className="rounded-xl border border-border bg-card p-4 mb-6">
          <div className="flex items-baseline justify-between mb-2">
            <p className="text-sm font-semibold text-foreground">Progress toward target</p>
            <span className="text-sm font-bold text-primary">{Math.min(lors.length, target)}/{target}</span>
          </div>
          <div className="flex gap-1.5">
            {Array.from({ length: target }).map((_, i) => {
              const lor = sorted[i]
              const meta = lor ? statusMeta(lor.status) : null
              return (
                <div
                  key={i}
                  className={`flex-1 h-3 rounded-sm transition-all duration-300 ${
                    lor ? (meta?.bg ?? "bg-border") : "bg-border/40"
                  }`}
                  title={lor ? `${lor.name} — ${meta?.label}` : "Empty slot"}
                />
              )
            })}
          </div>
          <div className="flex gap-3 mt-3 flex-wrap">
            {STATUSES.map((s) => (
              <div key={s.value} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <span className={`h-2.5 w-2.5 rounded-sm ${s.bg}`} />
                {s.label}
              </div>
            ))}
          </div>
        </div>

        {/* Table */}
        {lors.length > 0 ? (
          <div className="rounded-xl border border-border bg-card overflow-hidden mb-6">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-secondary/50 border-b border-border">
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Writer</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Relationship</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Deadline</th>
                  <th className="text-left px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {sorted.map((lor) => {
                  const meta = statusMeta(lor.status)
                  const isPast = lor.deadline && new Date(lor.deadline) < new Date()
                  return (
                    <tr key={lor.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">{lor.name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{lor.relationship || "—"}</td>
                      <td className={`px-4 py-3 text-sm ${isPast && lor.status !== "submitted" ? "text-red-600 dark:text-red-400 font-medium" : "text-muted-foreground"}`}>
                        {lor.deadline || "—"}
                        {isPast && lor.status !== "submitted" && (
                          <span className="ml-1.5 text-[10px] text-red-500">overdue</span>
                        )}
                      </td>
                      <td className="px-4 py-3">
                        <Select
                          value={lor.status}
                          onValueChange={(v) => updateStatus(lor.id, v as LORStatus)}
                        >
                          <SelectTrigger className="h-7 w-36 text-xs">
                            <span className={`inline-block px-2 py-0.5 rounded-full text-[10px] font-semibold ${meta.bg} ${meta.text}`}>
                              {meta.label}
                            </span>
                          </SelectTrigger>
                          <SelectContent>
                            {STATUSES.map((s) => (
                              <SelectItem key={s.value} value={s.value} className="text-xs">
                                {s.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="px-4 py-3">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-muted-foreground hover:text-destructive"
                          onClick={() => removeLOR(lor.id)}
                          aria-label={`Remove ${lor.name}`}
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </Button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground text-sm mb-6">
            No writers added yet. Add your first one below.
          </div>
        )}

        {/* Add form */}
        <div className="rounded-xl border border-border bg-card p-5">
          <p className="text-sm font-semibold text-foreground mb-4">Add a writer</p>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <Label htmlFor="lor-name" className="text-xs">Name</Label>
              <Input
                id="lor-name"
                className="mt-1.5"
                placeholder="Dr. Smith"
                value={form.name}
                onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                onKeyDown={(e) => e.key === "Enter" && addLOR()}
              />
            </div>
            <div>
              <Label htmlFor="lor-rel" className="text-xs">Relationship</Label>
              <Input
                id="lor-rel"
                className="mt-1.5"
                placeholder="Organic Chemistry professor"
                value={form.relationship}
                onChange={(e) => setForm((f) => ({ ...f, relationship: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="lor-deadline" className="text-xs">Deadline</Label>
              <Input
                id="lor-deadline"
                type="date"
                className="mt-1.5"
                value={form.deadline}
                onChange={(e) => setForm((f) => ({ ...f, deadline: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="lor-status" className="text-xs">Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setForm((f) => ({ ...f, status: v as LORStatus }))}
              >
                <SelectTrigger id="lor-status" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map((s) => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <Button
            className="mt-4 gap-1.5"
            onClick={addLOR}
            disabled={!form.name.trim()}
          >
            <Plus className="h-4 w-4" />
            Add writer
          </Button>
        </div>

        {/* Tip */}
        <div className="mt-6 rounded-xl border border-border bg-card p-5 text-sm text-muted-foreground leading-relaxed">
          <p className="font-semibold text-foreground mb-1">💡 Who to ask</p>
          <p>
            Most MD programs want at least one science professor, one non-science professor, and one
            clinical supervisor or physician. Ask early — give writers at least 4–6 weeks, and always
            send them your CV, personal statement draft, and a list of your activities to help them
            write something specific.
          </p>
        </div>
      </div>
    </section>
  )
}
