"use client"

import { useState } from "react"
import { Plus, Trash2, Activity as ActivityIcon } from "lucide-react"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { Section } from "./section"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const categories = [
  "Clinical",
  "Research",
  "Shadowing",
  "Leadership",
  "Service (Non-Clinical)",
] as const

type Category = (typeof categories)[number]

type LogEntry = {
  id: string
  category: Category
  title: string
  hours: string
  date: string
  note: string
}

export function ActivityLogs() {
  const [logs, setLogs, hydrated] = useLocalStorage<LogEntry[]>("compass-activity-logs", [])
  const [category, setCategory] = useState<Category>("Clinical")
  const [title, setTitle] = useState("")
  const [hours, setHours] = useState("")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")

  function addLog(e: React.FormEvent) {
    e.preventDefault()
    if (!title.trim()) return
    setLogs((prev) => [
      {
        id: crypto.randomUUID(),
        category,
        title: title.trim(),
        hours: hours.trim(),
        date: date || new Date().toISOString().slice(0, 10),
        note: note.trim(),
      },
      ...prev,
    ])
    setTitle("")
    setHours("")
    setDate("")
    setNote("")
  }

  function remove(id: string) {
    setLogs((prev) => prev.filter((l) => l.id !== id))
  }

  const totals = categories.map((cat) => ({
    cat,
    hours: logs
      .filter((l) => l.category === cat)
      .reduce((sum, l) => sum + (Number(l.hours) || 0), 0),
  }))
  const grandTotal = totals.reduce((s, t) => s + t.hours, 0)

  return (
    <Section
      id="activity-logs"
      eyebrow="Your Tools"
      title="Activity Logs"
      intro="Track your experiences and hours by category, and jot reflections while they're fresh. Those notes become your application later."
    >
      <div className="mb-5 flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/30 dark:text-amber-400">
        <span className="mt-0.5 shrink-0">⚠️</span>
        <p><strong>Browser storage only.</strong> Your data is saved locally and will be lost if you clear your browser history or switch devices. Screenshot or copy your entries regularly to keep a backup.</p>
      </div>
      {/* Totals overview */}
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <div className="rounded-lg border border-primary/30 bg-primary/5 p-4">
          <p className="text-2xl font-semibold text-foreground">{grandTotal}</p>
          <p className="text-xs text-muted-foreground">Total hours</p>
        </div>
        {totals.map((t) => (
          <div key={t.cat} className="rounded-lg border border-border bg-card p-4">
            <p className="text-2xl font-semibold text-foreground">{t.hours}</p>
            <p className="text-xs text-muted-foreground">{t.cat}</p>
          </div>
        ))}
      </div>

      <form onSubmit={addLog} className="grid gap-3 rounded-lg border border-border bg-card p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <Label htmlFor="log-category">Category</Label>
            <Select value={category} onValueChange={(v) => setCategory(v as Category)}>
              <SelectTrigger id="log-category" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>
                    {c}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="log-title">Experience</Label>
            <Input
              id="log-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. ER volunteer, Dr. Lee's lab"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="log-hours">Hours</Label>
            <Input
              id="log-hours"
              type="number"
              min="0"
              value={hours}
              onChange={(e) => setHours(e.target.value)}
              placeholder="4"
              className="mt-1.5"
            />
          </div>
          <div>
            <Label htmlFor="log-date">Date</Label>
            <Input
              id="log-date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mt-1.5"
            />
          </div>
        </div>
        <div>
          <Label htmlFor="log-note">Reflection (optional)</Label>
          <Textarea
            id="log-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder="What did you see or learn? What stuck with you?"
            className="mt-1.5 min-h-20"
          />
        </div>
        <Button type="submit" className="gap-1.5 justify-self-start">
          <Plus className="h-4 w-4" />
          Add entry
        </Button>
      </form>

      <div className="mt-6">
        {!hydrated ? null : logs.length === 0 ? (
          <div className="flex flex-col items-center rounded-lg border border-dashed border-border bg-card/50 px-6 py-12 text-center">
            <ActivityIcon className="mb-3 h-8 w-8 text-muted-foreground" aria-hidden="true" />
            <p className="font-medium text-foreground">No entries yet</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Log your first experience above. Future-you will thank you when applications open.
            </p>
          </div>
        ) : (
          <ul className="space-y-3">
            {logs.map((l) => (
              <li key={l.id} className="rounded-lg border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="rounded-full bg-accent/15 px-2.5 py-0.5 text-xs font-medium text-accent">
                        {l.category}
                      </span>
                      <span className="text-sm text-muted-foreground">{l.date}</span>
                      {l.hours && (
                        <span className="text-sm font-medium text-foreground">{l.hours} hrs</span>
                      )}
                    </div>
                    <p className="mt-1.5 font-medium text-foreground">{l.title}</p>
                    {l.note && <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{l.note}</p>}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => remove(l.id)}
                    aria-label={`Remove ${l.title}`}
                    className="text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </Section>
  )
}
