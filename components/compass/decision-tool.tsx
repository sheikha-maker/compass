"use client"

import { useState } from "react"
import { Check, X, RotateCcw, Compass } from "lucide-react"
import { decisionTools } from "@/lib/content"
import { Section } from "./section"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

function ToolFlow({ tool }: { tool: (typeof decisionTools)[number] }) {
  // For tool #1 a "no" is a negative signal; for #2 and #3 a "yes" is a positive signal.
  // We track raw yes/no answers and compute a recommendation per tool.
  const [answers, setAnswers] = useState<(boolean | null)[]>(() => tool.questions.map(() => null))

  const answered = answers.every((a) => a !== null)
  const yesCount = answers.filter((a) => a === true).length
  const noCount = answers.filter((a) => a === false).length

  function setAnswer(i: number, val: boolean) {
    setAnswers((prev) => prev.map((a, idx) => (idx === i ? val : a)))
  }

  function reset() {
    setAnswers(tool.questions.map(() => null))
  }

  // Recommendation logic differs slightly by tool intent.
  let verdict = ""
  let tone: "positive" | "caution" | "neutral" = "neutral"
  if (answered) {
    if (tool.number === 1) {
      if (noCount >= 2) {
        verdict = "Lean toward no, or 'not right now.'"
        tone = "caution"
      } else {
        verdict = "This looks like a yes worth committing to."
        tone = "positive"
      }
    } else if (tool.number === 2) {
      if (yesCount >= 3) {
        verdict = "Worth continuing, it's still serving you."
        tone = "positive"
      } else {
        verdict = "Consider stepping back. This may have run its course."
        tone = "caution"
      }
    } else {
      if (yesCount >= 2) {
        verdict = "Give yourself permission to cut this. Relief is the goal."
        tone = "caution"
      } else {
        verdict = "You may be able to hold onto this, but keep checking in."
        tone = "neutral"
      }
    }
  }

  return (
    <div>
      <p className="mb-5 leading-relaxed text-muted-foreground">{tool.intro}</p>
      <ol className="space-y-4">
        {tool.questions.map((q, i) => (
          <li key={i} className="rounded-lg border border-border bg-card p-4">
            <p className="text-foreground">
              <span className="mr-2 font-serif font-semibold text-accent">{i + 1}.</span>
              {q}
            </p>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => setAnswer(i, true)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                  answers[i] === true
                    ? "border-accent bg-accent text-accent-foreground"
                    : "border-border bg-secondary text-secondary-foreground hover:border-accent/50",
                )}
              >
                <Check className="h-3.5 w-3.5" />
                Yes
              </button>
              <button
                onClick={() => setAnswer(i, false)}
                className={cn(
                  "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-colors",
                  answers[i] === false
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-border bg-secondary text-secondary-foreground hover:border-primary/50",
                )}
              >
                <X className="h-3.5 w-3.5" />
                No
              </button>
            </div>
          </li>
        ))}
      </ol>

      {answered && (
        <div
          className={cn(
            "mt-5 rounded-lg border p-5",
            tone === "positive" && "border-accent/40 bg-accent/10",
            tone === "caution" && "border-primary/30 bg-primary/5",
            tone === "neutral" && "border-border bg-secondary",
          )}
        >
          <div className="flex items-start gap-3">
            <Compass className="mt-0.5 h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
            <div>
              <p className="font-serif text-lg font-semibold text-foreground">{verdict}</p>
              <p className="mt-1.5 leading-relaxed text-muted-foreground">{tool.guidance}</p>
            </div>
          </div>
        </div>
      )}

      <Button variant="ghost" size="sm" onClick={reset} className="mt-4 gap-1.5 text-muted-foreground">
        <RotateCcw className="h-3.5 w-3.5" />
        Reset
      </Button>
    </div>
  )
}

export function DecisionTools() {
  return (
    <Section
      id="decision-tools"
      eyebrow="Mindset"
      title="Decision Tools"
      intro="Use these when you're uncertain whether to add a new commitment, continue an existing one, or let one go. If you already feel calm and clear, you probably don't need them, and that's fine."
    >
      <Tabs defaultValue="1" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="1">Add</TabsTrigger>
          <TabsTrigger value="2">Continue</TabsTrigger>
          <TabsTrigger value="3">Let go</TabsTrigger>
        </TabsList>
        {decisionTools.map((tool) => (
          <TabsContent key={tool.number} value={String(tool.number)} className="mt-6">
            <h3 className="mb-1 font-serif text-xl font-semibold text-foreground">
              Tool #{tool.number}: {tool.title}
            </h3>
            <ToolFlow tool={tool} />
          </TabsContent>
        ))}
      </Tabs>
    </Section>
  )
}
