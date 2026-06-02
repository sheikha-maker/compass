"use client"

import { useState } from "react"
import { RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

// ─── Types ───────────────────────────────────────────────────────────────────

interface Question {
  text: string
  options: { label: string; value: number }[]
}

interface ResultTier {
  range: [number, number]
  label: string
  tagline: string
  description: string
  resources: { text: string; href?: string }[]
  cardBg: string
  cardBorder: string
  textColor: string
  tagBg: string
  tagText: string
}

// ─── Constants ───────────────────────────────────────────────────────────────

const QUESTIONS: Question[] = [
  {
    text: "How often do you feel emotionally drained after a day of classes or studying?",
    options: [
      { label: "Rarely", value: 0 },
      { label: "Sometimes", value: 1 },
      { label: "Often", value: 2 },
      { label: "Almost always", value: 3 },
    ],
  },
  {
    text: "When you think about your future in medicine, how do you feel?",
    options: [
      { label: "Excited and clear", value: 0 },
      { label: "Mostly hopeful", value: 1 },
      { label: "Unsure or disconnected", value: 2 },
      { label: "Dreading it", value: 3 },
    ],
  },
  {
    text: "How well are you sleeping and taking care of basic needs. food, exercise, downtime?",
    options: [
      { label: "Consistently well", value: 0 },
      { label: "Mostly okay", value: 1 },
      { label: "Struggling some days", value: 2 },
      { label: "Consistently neglecting them", value: 3 },
    ],
  },
  {
    text: "How much do you feel like yourself outside of your pre-med role?",
    options: [
      { label: "Fully. I have hobbies, friends, fun", value: 0 },
      { label: "Somewhat. there's some balance", value: 1 },
      { label: "Not much. pre-med is consuming", value: 2 },
      { label: "Pre-med is my whole identity right now", value: 3 },
    ],
  },
  {
    text: "When you're struggling, do you have people or resources you feel comfortable reaching out to?",
    options: [
      { label: "Yes, readily", value: 0 },
      { label: "Somewhat", value: 1 },
      { label: "Not really", value: 2 },
      { label: "No. I feel quite alone", value: 3 },
    ],
  },
]

const RESULTS: ResultTier[] = [
  {
    range: [0, 4],
    label: "You seem balanced",
    tagline: "Keep protecting what's working.",
    description:
      "Your responses suggest you're managing the pre-med journey with relative balance. That's genuinely hard to do, and it deserves recognition. Keep protecting the things that are working. Your routines, your support system, and your identity outside of medicine. Checking in regularly (even when things feel fine) is one of the best things you can do.",
    resources: [
      { text: "Keep checking in here each week" },
      { text: "Talk to your advisor about what's working" },
      { text: "Share what you're doing with other pre-meds. it helps them too" },
    ],
    cardBg: "bg-teal-50 dark:bg-teal-950/20",
    cardBorder: "border-teal-200 dark:border-teal-800/40",
    textColor: "text-teal-900 dark:text-teal-200",
    tagBg: "bg-teal-100 dark:bg-teal-900/40",
    tagText: "text-teal-800 dark:text-teal-300",
  },
  {
    range: [5, 8],
    label: "Some signs of strain",
    tagline: "You're carrying more than you might realize.",
    description:
      "Some areas of your wellbeing are showing stress. This is very common in pre-med, but common doesn't mean okay. You don't have to feel this way. Small, consistent changes make a real difference: one protected evening per week, one honest conversation, one walk without your phone. You don't need to overhaul everything at once.",
    resources: [
      { text: "Schedule a check-in with your pre-health advisor" },
      { text: "Try blocking one evening per week as non-pre-med time" },
      {
        text: "Moravian Counseling Services: Free and confidential",
        href: "https://www.moravian.edu/counseling",
      },
    ],
    cardBg: "bg-amber-50 dark:bg-amber-950/20",
    cardBorder: "border-amber-200 dark:border-amber-800/40",
    textColor: "text-amber-900 dark:text-amber-200",
    tagBg: "bg-amber-100 dark:bg-amber-900/40",
    tagText: "text-amber-800 dark:text-amber-300",
  },
  {
    range: [9, 15],
    label: "This is heavy right now",
    tagline: "Please reach out to someone — today, not next week.",
    description:
      "Your responses reflect genuine burnout or near-burnout. This is not a sign that you're not cut out for medicine. It's a sign that you're human and you need support. Many of the strongest physicians hit this point before they ever reached med school. The most important thing you can do right now is not push harder, it's ask for help.",
    resources: [
      {
        text: "Moravian Counseling Services: If needed, please reach out",
        href: "https://www.moravian.edu/counseling",
      },
      { text: "Talk to someone today. A friend, a family member, anyone" },
      { text: "Consider talking to your advisor about your course load" },
    ],
    cardBg: "bg-red-50 dark:bg-red-950/20",
    cardBorder: "border-red-200 dark:border-red-800/40",
    textColor: "text-red-900 dark:text-red-200",
    tagBg: "bg-red-100 dark:bg-red-900/40",
    tagText: "text-red-800 dark:text-red-300",
  },
]

// ─── Main Component ───────────────────────────────────────────────────────────

export function BurnoutCheck() {
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [submitted, setSubmitted] = useState(false)

  const allAnswered = Object.keys(answers).length === QUESTIONS.length
  const total = Object.values(answers).reduce((a, b) => a + b, 0)
  const result = submitted
    ? RESULTS.find((r) => total >= r.range[0] && total <= r.range[1]) ?? RESULTS[1]
    : null

  const reset = () => {
    setAnswers({})
    setSubmitted(false)
  }

  return (
    <section id="burnout-check" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">
            Your Wellbeing
          </p>
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Burnout Check
          </h2>
          <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
            Five honest questions. No score is wrong — this just helps you figure out where to focus
            your energy. Take it whenever something feels off.
          </p>
        </header>

        {!submitted ? (
          <div className="flex flex-col gap-5">
            {QUESTIONS.map((q, qi) => (
              <div key={qi} className="rounded-xl border border-border bg-card p-5">
                <p className="text-sm font-semibold text-foreground mb-4 leading-relaxed">
                  {qi + 1}. {q.text}
                </p>
                <div className="flex flex-wrap gap-2">
                  {q.options.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => setAnswers((a) => ({ ...a, [qi]: opt.value }))}
                      className={`rounded-full px-4 py-1.5 text-sm border transition-all duration-150 ${answers[qi] === opt.value
                        ? "bg-foreground text-background border-foreground"
                        : "bg-card text-muted-foreground border-border hover:border-primary/60 hover:text-foreground"
                        }`}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}

            <Button
              className="w-full"
              disabled={!allAnswered}
              onClick={() => setSubmitted(true)}
            >
              See my results
            </Button>
          </div>
        ) : result ? (
          <div>
            <div
              className={`rounded-xl border p-6 ${result.cardBg} ${result.cardBorder}`}
            >
              {/* Score + label */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <p className={`font-serif text-4xl font-semibold leading-none ${result.textColor}`}>
                    {total}/15
                  </p>
                  <p className={`text-lg font-semibold mt-2 ${result.textColor}`}>
                    {result.label}
                  </p>
                  <p className={`text-sm mt-1 font-medium ${result.textColor} opacity-80`}>
                    {result.tagline}
                  </p>
                </div>
                <span
                  className={`shrink-0 rounded-full px-3 py-1 text-xs font-semibold ${result.tagBg} ${result.tagText}`}
                >
                  {total <= 4 ? "Balanced" : total <= 8 ? "Some strain" : "Needs attention"}
                </span>
              </div>

              {/* Description */}
              <p className={`text-sm leading-relaxed ${result.textColor} opacity-90 mb-5`}>
                {result.description}
              </p>

              {/* Resources */}
              <div className="flex flex-col gap-2">
                <p className={`text-xs font-semibold uppercase tracking-wider ${result.textColor} opacity-60 mb-1`}>
                  What to do next
                </p>
                {result.resources.map((r, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2.5 rounded-lg px-3 py-2.5 bg-white/40 dark:bg-white/5"
                  >
                    <span className={`text-sm font-bold ${result.textColor} opacity-60`}>→</span>
                    {r.href ? (
                      <a
                        href={r.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`text-sm font-medium underline underline-offset-2 ${result.textColor}`}
                      >
                        {r.text}
                      </a>
                    ) : (
                      <p className={`text-sm ${result.textColor}`}>{r.text}</p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            <Button
              variant="outline"
              className="mt-4 gap-2"
              onClick={reset}
            >
              <RotateCcw className="h-4 w-4" />
              Retake
            </Button>

            <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
              This is a reflection tool, not a clinical assessment. If you're struggling significantly,
              please speak with a mental health professional.{" "}
              <a
                href="https://www.moravian.edu/counseling"
                className="underline underline-offset-2"
                target="_blank"
                rel="noopener noreferrer"
              >
                Moravian Counseling Services
              </a>{" "}
              is free for all students.
            </p>
          </div>
        ) : null}
      </div>
    </section>
  )
}
