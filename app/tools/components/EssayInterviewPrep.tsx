"use client"

import { useState, useEffect, useCallback } from "react"
import { Plus, Trash2 } from "lucide-react"
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

const ESSAY_STATUS_OPTIONS = [
  { value: "not-started", label: "Not started" },
  { value: "drafting", label: "Drafting" },
  { value: "reviewing", label: "Reviewing" },
  { value: "complete", label: "Complete" },
]

const INTERVIEW_FORMAT_OPTIONS = [
  { value: "MMI", label: "MMI" },
  { value: "Traditional", label: "Traditional" },
  { value: "Panel", label: "Panel" },
  { value: "Virtual", label: "Virtual" },
  { value: "Other", label: "Other" },
]

const INTERVIEW_STATUS_OPTIONS = [
  { value: "planned", label: "Planned" },
  { value: "practiced", label: "Practiced" },
  { value: "scheduled", label: "Scheduled" },
  { value: "confident", label: "Confident" },
]

const STORAGE_KEY = "pmc_essay_interview_v1"

function uid() {
  return Math.random().toString(36).slice(2, 10)
}

type EssayStatus = "not-started" | "drafting" | "reviewing" | "complete"

type EssayEntry = {
  id: string
  school: string
  prompt: string
  status: EssayStatus
  wordCount: string
  note: string
}

type InterviewEntry = {
  id: string
  question: string
  format: string
  date: string
  status: string
  note: string
}

type PrepState = {
  personal: {
    status: EssayStatus
    draft: string
  }
  secondaries: EssayEntry[]
  interviews: InterviewEntry[]
}

const initialState: PrepState = {
  personal: { status: "not-started", draft: "" },
  secondaries: [],
  interviews: [],
}

export function EssayInterviewPrep() {
  const [data, setData] = useState<PrepState>(initialState)
  const [essayForm, setEssayForm] = useState({
    school: "",
    prompt: "",
    status: "not-started" as EssayStatus,
    wordCount: "",
    note: "",
  })
  const [interviewForm, setInterviewForm] = useState({
    question: "",
    format: "MMI",
    date: "",
    status: "planned",
    note: "",
  })

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        setData(JSON.parse(stored))
      }
    } catch {}
  }, [])

  const persist = useCallback((next: PrepState) => {
    setData(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch {}
  }, [])

  const updatePersonal = (personal: PrepState["personal"]) =>
    persist({ ...data, personal })

  const addEssay = () => {
    if (!essayForm.school.trim() || !essayForm.prompt.trim()) return
    persist({
      ...data,
      secondaries: [
        ...data.secondaries,
        { id: uid(), ...essayForm },
      ],
    })
    setEssayForm({ school: "", prompt: "", status: "not-started", wordCount: "", note: "" })
  }

  const removeEssay = (id: string) =>
    persist({ ...data, secondaries: data.secondaries.filter((item) => item.id !== id) })

  const addInterview = () => {
    if (!interviewForm.question.trim()) return
    persist({
      ...data,
      interviews: [
        ...data.interviews,
        { id: uid(), ...interviewForm },
      ],
    })
    setInterviewForm({ question: "", format: "MMI", date: "", status: "planned", note: "" })
  }

  const removeInterview = (id: string) =>
    persist({ ...data, interviews: data.interviews.filter((item) => item.id !== id) })

  const totalEssays = data.secondaries.length
  const completedEssays = data.secondaries.filter((item) => item.status === "complete").length
  const totalInterviews = data.interviews.length
  const practicedInterviews = data.interviews.filter((item) => item.status === "practiced" || item.status === "confident").length
  const personalWordCount = data.personal.draft.trim().split(/\s+/).filter(Boolean).length

  return (
    <section id="essay-interview-prep" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-5xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Essay & Interview Prep
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Track your personal statement progress, manage secondary essays, and keep interview prep organized all in one place.
          </p>
        </header>

        <div className="flex flex-wrap gap-3 mb-8">
          {[
            { label: "Secondary essays", value: totalEssays },
            { label: "Essays complete", value: completedEssays },
            { label: "Interview items", value: totalInterviews },
            { label: "Interviews practiced", value: practicedInterviews },
          ].map((stat) => (
            <div key={stat.label} className="flex-1 min-w-[140px] rounded-xl border border-border bg-card px-4 py-3">
              <p className="text-xs text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-2xl font-semibold leading-none text-foreground">{stat.value}</p>
            </div>
          ))}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-foreground mb-2">Personal statement</p>
              <p className="text-sm text-muted-foreground max-w-2xl">
                Capture your core message, note strengths, and track revision status as your first draft evolves.
              </p>
            </div>
            <div className="rounded-2xl border border-border bg-background px-4 py-3 text-sm">
              <p className="font-semibold text-foreground">Word count</p>
              <p className="text-2xl font-semibold text-primary">{personalWordCount}</p>
            </div>
          </div>

          <div className="grid gap-4 mt-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="personal-status">Status</Label>
              <Select
                value={data.personal.status}
                onValueChange={(v) => updatePersonal({ ...data.personal, status: v as EssayStatus })}
              >
                <SelectTrigger id="personal-status" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ESSAY_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="personal-draft">Draft</Label>
              <Textarea
                id="personal-draft"
                value={data.personal.draft}
                onChange={(e) => updatePersonal({ ...data.personal, draft: e.target.value })}
                className="h-40 mt-1.5"
                placeholder="Write your personal statement ideas or paste your current draft here."
              />
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <p className="text-sm font-semibold text-foreground mb-5">Secondary essays</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="essay-school">School</Label>
              <Input
                id="essay-school"
                className="mt-1.5"
                placeholder="School name"
                value={essayForm.school}
                onChange={(e) => setEssayForm((f) => ({ ...f, school: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="essay-status">Status</Label>
              <Select
                value={essayForm.status}
                onValueChange={(v) => setEssayForm((f) => ({ ...f, status: v as EssayStatus }))}
              >
                <SelectTrigger id="essay-status" className="mt-1.5">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {ESSAY_STATUS_OPTIONS.map((option) => (
                    <SelectItem key={option.value} value={option.value} className="text-xs">
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid gap-4 mt-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="essay-prompt">Prompt</Label>
              <Textarea
                id="essay-prompt"
                className="h-24 mt-1.5"
                value={essayForm.prompt}
                onChange={(e) => setEssayForm((f) => ({ ...f, prompt: e.target.value }))}
                placeholder="Secondary essay prompt"
              />
            </div>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="essay-wordcount">Word count</Label>
                <Input
                  id="essay-wordcount"
                  className="mt-1.5"
                  placeholder="e.g. 250"
                  value={essayForm.wordCount}
                  onChange={(e) => setEssayForm((f) => ({ ...f, wordCount: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="essay-note">Notes</Label>
                <Input
                  id="essay-note"
                  className="mt-1.5"
                  placeholder="Focus, examples, review notes"
                  value={essayForm.note}
                  onChange={(e) => setEssayForm((f) => ({ ...f, note: e.target.value }))}
                />
              </div>
            </div>
          </div>

          <Button className="mt-5 gap-2" onClick={addEssay}>
            <Plus className="h-4 w-4" />
            Add essay
          </Button>

          {data.secondaries.length > 0 ? (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">School</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Word count</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Note</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {data.secondaries.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">{item.school}</td>
                      <td className="px-4 py-3 text-muted-foreground">{ESSAY_STATUS_OPTIONS.find((option) => option.value === item.status)?.label}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.wordCount || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.note || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeEssay(item.id)}
                          aria-label={`Remove essay for ${item.school}`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">No essays added yet.</p>
          )}
        </div>

        <div className="rounded-xl border border-border bg-card p-5 mb-8">
          <p className="text-sm font-semibold text-foreground mb-5">Interview prep</p>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <Label htmlFor="interview-question">Question</Label>
              <Textarea
                id="interview-question"
                className="h-24 mt-1.5"
                value={interviewForm.question}
                onChange={(e) => setInterviewForm((f) => ({ ...f, question: e.target.value }))}
                placeholder="e.g. Tell me about a challenge you overcame"
              />
            </div>
            <div className="grid gap-4">
              <div>
                <Label htmlFor="interview-format">Format</Label>
                <Select
                  value={interviewForm.format}
                  onValueChange={(v) => setInterviewForm((f) => ({ ...f, format: v }))}
                >
                  <SelectTrigger id="interview-format" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERVIEW_FORMAT_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-xs">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="interview-date">Date</Label>
                <Input
                  id="interview-date"
                  type="date"
                  className="mt-1.5"
                  value={interviewForm.date}
                  onChange={(e) => setInterviewForm((f) => ({ ...f, date: e.target.value }))}
                />
              </div>
              <div>
                <Label htmlFor="interview-status">Status</Label>
                <Select
                  value={interviewForm.status}
                  onValueChange={(v) => setInterviewForm((f) => ({ ...f, status: v }))}
                >
                  <SelectTrigger id="interview-status" className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {INTERVIEW_STATUS_OPTIONS.map((option) => (
                      <SelectItem key={option.value} value={option.value} className="text-xs">
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          <div className="mt-4">
            <Label htmlFor="interview-note">Notes</Label>
            <Input
              id="interview-note"
              className="mt-1.5"
              placeholder="e.g. strong example, follow-up idea"
              value={interviewForm.note}
              onChange={(e) => setInterviewForm((f) => ({ ...f, note: e.target.value }))}
            />
          </div>

          <Button className="mt-5 gap-2" onClick={addInterview}>
            <Plus className="h-4 w-4" />
            Add interview item
          </Button>

          {data.interviews.length > 0 ? (
            <div className="mt-8 overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-secondary/50 border-b border-border">
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Question</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Format</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Date</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">Notes</th>
                    <th className="px-4 py-3" />
                  </tr>
                </thead>
                <tbody>
                  {data.interviews.map((item) => (
                    <tr key={item.id} className="border-b border-border last:border-0">
                      <td className="px-4 py-3 font-medium text-foreground">{item.question}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.format}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.date || "—"}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.status}</td>
                      <td className="px-4 py-3 text-muted-foreground">{item.note || "—"}</td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted-foreground hover:text-destructive"
                          onClick={() => removeInterview(item.id)}
                          aria-label={`Remove interview item`}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p className="mt-6 text-sm text-muted-foreground">No interview items added yet.</p>
          )}
        </div>
      </div>
    </section>
  )
}
