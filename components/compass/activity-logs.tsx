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

const REFLECTION_PROMPTS: Record<Category, string[]> = {
  Clinical: [
    "What did you witness that surprised you? How did the care team make patients feel?",
    "Was there a moment where you saw medicine at its best, or its hardest?",
    "What did a patient or family member say that stayed with you?",
  ],
  Research: [
    "What question did today's work help answer? What new questions did it raise?",
    "What did you learn about the research process that you didn't expect?",
    "How does this work connect to patients, even if indirectly?",
  ],
  Shadowing: [
    "What did the physician do that you'd want to emulate? What would you do differently?",
    "How did the doctor communicate with patients? What did and didn't work?",
    "What part of this specialty surprised you most?",
  ],
  Leadership: [
    "What did you learn about motivating or supporting others?",
    "What was harder than you expected? What would you do differently next time?",
    "How did this experience shape how you think about teamwork in medicine?",
  ],
  "Service (Non-Clinical)": [
    "Who did you meet today? What did their situation teach you about health or equity?",
    "What did this experience reveal about the non-medical barriers to healthcare?",
    "How has this shaped your understanding of the communities you want to serve?",
  ],
}

function getPrompt(category: Category): string {
  const prompts = REFLECTION_PROMPTS[category]
  return prompts[Math.floor(Math.random() * prompts.length)]
}

export function ActivityLogs() {
  const [logs, setLogs, hydrated] = useLocalStorage<LogEntry[]>("compass-activity-logs", [])
  const [category, setCategory] = useState<Category>("Clinical")
  const [title, setTitle] = useState("")
  const [hours, setHours] = useState("")
  const [date, setDate] = useState("")
  const [note, setNote] = useState("")
  const [prompt, setPrompt] = useState(() => getPrompt("Clinical"))

  function handleCategoryChange(val: Category) {
    setCategory(val)
    setPrompt(getPrompt(val))
  }

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
    setPrompt(getPrompt(category))
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
            <Select value={category} onValueChange={(v) => handleCategoryChange(v as Category)}>
              <SelectTrigger id="log-category" className="mt-1.5">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c} value={c}>{c}</SelectItem>
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
          <div className="flex items-baseline justify-between mb-1.5">
            <Label htmlFor="log-note">Reflection</Label>
            <span className="text-xs text-muted-foreground">optional, but worth it</span>
          </div>
          <Textarea
            id="log-note"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            placeholder={prompt}
            className="mt-0 min-h-20"
          />
          <p className="mt-1.5 text-[11px] text-muted-foreground leading-snug">
            💡 These notes become your personal statement and secondary essays. Even one sentence counts.
          </p>
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
                    {l.note && (
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{l.note}</p>
                    )}
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
