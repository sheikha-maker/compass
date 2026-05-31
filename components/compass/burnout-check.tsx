"use client"

import { useState } from "react"
import { ArrowRight, ArrowLeft, RotateCcw, Heart, Zap, Moon, BookOpen, Users, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { Section } from "./section"

type Answer = 0 | 1 | 2 | 3

const questions = [
  {
    id: "energy",
    icon: Zap,
    category: "Energy",
    text: "How often do you wake up and feel genuinely ready for the day?",
    options: ["Almost never: I'm exhausted before it starts", "Rarely: most mornings feel heavy", "Sometimes: depends on the week", "Often: I usually have energy to give"],
  },
  {
    id: "motivation",
    icon: Compass,
    category: "Motivation",
    text: "When you think about medicine as a career, how does it feel right now?",
    options: ["Distant or hollow: I'm going through the motions", "Uncertain: I question it more than I used to", "Mixed: some days I'm sure, some days I'm not", "Clear: it still feels like what I want"],
  },
  {
    id: "sleep",
    icon: Moon,
    category: "Sleep & Rest",
    text: "How well are you sleeping and actually recovering?",
    options: ["Barely: sleep doesn't feel restorative", "Poorly: I'm often running on empty", "Okay: not great but I manage", "Well: I get enough and feel it"],
  },
  {
    id: "academics",
    icon: BookOpen,
    category: "Academics",
    text: "How do you feel about your coursework load right now?",
    options: ["Drowning: it feels unmanageable", "Stretched thin: barely keeping up", "Manageable but tight: I could tip either way", "Under control: I have room to breathe"],
  },
  {
    id: "social",
    icon: Users,
    category: "Connection",
    text: "How connected do you feel to friends, family, or people you care about?",
    options: ["Isolated: I've withdrawn from most people", "Distant: relationships feel like effort", "So-so: I maintain some but less than I'd like", "Connected: I have people I can lean on"],
  },
  {
    id: "joy",
    icon: Heart,
    category: "Joy",
    text: "How often do you do something just because you enjoy it: not for your application?",
    options: ["Never: everything feels like a resume line", "Rarely: I feel guilty when I'm not 'productive'", "Sometimes: I can let myself rest occasionally", "Regularly: I protect time for things I love"],
  },
  {
    id: "pressure",
    icon: Zap,
    category: "Pressure",
    text: "How much of your effort comes from genuine drive vs. fear of falling behind?",
    options: ["Almost all fear: I'm running from failure", "Mostly fear: anxiety is the main engine", "Mixed: some of both most of the time", "Mostly drive: I'm doing this because I want it"],
  },
  {
    id: "body",
    icon: Heart,
    category: "Physical",
    text: "How is your body doing: headaches, tension, getting sick often?",
    options: ["Frequently: my body is showing the stress clearly", "Often: I notice it but push through", "Occasionally: some tension but not alarming", "Generally fine: I feel physically okay"],
  },
]

type Result = {
  level: "high" | "moderate" | "low" | "thriving"
  headline: string
  summary: string
  color: string
  bgColor: string
  reflections: string[]
  actions: { label: string; href: string }[]
}

function getResult(answers: Answer[]): Result {
  const total = answers.reduce((sum, a) => sum + a, 0)
  const max = questions.length * 3

  if (total <= max * 0.3) {
    return {
      level: "high",
      headline: "You're carrying a lot right now.",
      summary: "Your answers suggest you're experiencing significant burnout. This isn't a sign you're not cut out for medicine: it's a signal your current pace isn't sustainable. The most important thing you can do right now isn't study harder. It's rest, and reach out.",
      color: "text-red-600 dark:text-red-400",
      bgColor: "bg-red-50 border-red-200 dark:bg-red-950/30 dark:border-red-900/50",
      reflections: [
        "You don't have to solve everything today. What's one thing you can let go of this week?",
        "When did you last feel genuinely okay? What was different then?",
        "Is there one person, a friend, family member, or advisor, you could talk to honestly today?",
      ],
      actions: [
        { label: "Moravian Counseling Services", href: "https://www.moravian.edu/counseling" },
        { label: "Balance & Sustainability", href: "/mindset#balance" },
        { label: "Mindfulness practices", href: "/mindset#mindfulness" },
      ],
    }
  } else if (total <= max * 0.55) {
    return {
      level: "moderate",
      headline: "You're stretched, and it's starting to show.",
      summary: "You're not at a breaking point, but you're closer than you should be. A few areas of your life are being quietly neglected while you hold the rest together. This is the stage where small, intentional changes prevent bigger problems down the road.",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 border-amber-200 dark:bg-amber-950/30 dark:border-amber-900/50",
      reflections: [
        "Which of your commitments is costing the most and giving back the least?",
        "What would your life look like if you dropped one thing, even temporarily?",
        "Are you resting, or just pausing before the next thing?",
      ],
      actions: [
        { label: "Decision Tools", href: "/mindset#decision-tools" },
        { label: "Balance & Sustainability", href: "/mindset#balance" },
        { label: "When Comparison Hits", href: "/mindset#comparison" },
      ],
    }
  } else if (total <= max * 0.78) {
    return {
      level: "low",
      headline: "You're doing well, keep the foundations in place.",
      summary: "You're managing the pressure reasonably well. There are probably a few areas you're watching, but overall you're not in danger territory. The work now is staying intentional so this holds as things get harder.",
      color: "text-primary",
      bgColor: "bg-primary/5 border-primary/20",
      reflections: [
        "What's working right now that you want to protect?",
        "Is there anything you're tolerating that you don't have to?",
        "How will you know if things start to shift in the wrong direction?",
      ],
      actions: [
        { label: "Year-by-Year Compass", href: "/your-path#year-compass" },
        { label: "Activity Logs", href: "/tools#activity-logs" },
        { label: "Peers & Mentorship", href: "/your-path#mentorship" },
      ],
    }
  } else {
    return {
      level: "thriving",
      headline: "You're in a genuinely good place.",
      summary: "Your answers suggest you're carrying your load with intention and still making room for what matters. That's not luck, it's the result of choices you're making. Keep going the way you're going, and help someone else when you get the chance.",
      color: "text-green-600 dark:text-green-400",
      bgColor: "bg-green-50 border-green-200 dark:bg-green-950/30 dark:border-green-900/50",
      reflections: [
        "What habits or boundaries are responsible for this? Name them so you can protect them.",
        "Is there a peer who might be struggling that you could reach out to?",
        "What's your plan for keeping this balance when the semester gets harder?",
      ],
      actions: [
        { label: "Peers & Mentorship", href: "/your-path#mentorship" },
        { label: "Year-by-Year Compass", href: "/your-path#year-compass" },
        { label: "Course Planner", href: "/tools#course-planner" },
      ],
    }
  }
}

export function BurnoutCheck() {
  const [step, setStep] = useState<"intro" | "questions" | "result">("intro")
  const [current, setCurrent] = useState(0)
  const [answers, setAnswers] = useState<(Answer | null)[]>(Array(questions.length).fill(null))
  const [selected, setSelected] = useState<Answer | null>(null)

  function startCheck() {
    setStep("questions")
    setCurrent(0)
    setAnswers(Array(questions.length).fill(null))
    setSelected(null)
  }

  function handleSelect(val: Answer) {
    setSelected(val)
  }

  function handleNext() {
    if (selected === null) return
    const newAnswers = [...answers]
    newAnswers[current] = selected
    setAnswers(newAnswers)

    if (current < questions.length - 1) {
      setCurrent(current + 1)
      setSelected(newAnswers[current + 1])
    } else {
      setStep("result")
    }
  }

  function handleBack() {
    if (current === 0) {
      setStep("intro")
      return
    }
    const prev = current - 1
    setCurrent(prev)
    setSelected(answers[prev])
  }

  function restart() {
    setStep("intro")
    setCurrent(0)
    setAnswers(Array(questions.length).fill(null))
    setSelected(null)
  }

  const q = questions[current]
  const Icon = q?.icon
  const progress = ((current) / questions.length) * 100
  const result = step === "result" ? getResult(answers as Answer[]) : null

  return (
    <Section
      id="burnout-check"
      eyebrow="Mindset"
      title="Burnout Self-Check"
      intro="This isn't a diagnostic tool. It's a mirror, a chance to honestly check in with yourself without judgment. There are no right answers and no score to optimize."
    >
      {step === "intro" && (
        <div
          className="rounded-2xl border border-border bg-card p-6 md:p-10"
          style={{ animation: "fadeSlideIn 0.35s ease forwards" }}
        >
          <div className="mx-auto max-w-lg text-center">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10">
              <Heart className="h-8 w-8 text-primary" />
            </div>
            <h2 className="font-serif text-2xl font-semibold text-foreground">How are you actually doing?</h2>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              8 questions. About 3 minutes. No account, no data saved. Just you being honest with yourself.
            </p>
            <p className="mt-3 text-sm text-muted-foreground">
              At the end you'll get a reflection, not a verdict, with resources matched to where you are.
            </p>
            <Button onClick={startCheck} size="lg" className="mt-8 gap-2 px-8 hover:scale-105 transition-transform">
              Start the check-in
              <ArrowRight className="h-4 w-4" />
            </Button>
            <p className="mt-4 text-xs text-muted-foreground">
              If you're in crisis right now,{" "}
              <a href="https://www.moravian.edu/counseling" className="text-primary underline underline-offset-2" target="_blank" rel="noopener noreferrer">
                Moravian Counseling Services
              </a>{" "}
              is available to you.
            </p>
          </div>
        </div>
      )}

      {step === "questions" && q && (
        <div style={{ animation: "fadeSlideIn 0.25s ease forwards" }}>
          {/* Progress bar */}
          <div className="mb-6">
            <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
              <span>{q.category}</span>
              <span>{current + 1} of {questions.length}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div
                className="h-full rounded-full bg-primary transition-all duration-500 ease-out"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          {/* Question card */}
          <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <p className="font-serif text-xl font-semibold leading-snug text-foreground md:text-2xl">
                {q.text}
              </p>
            </div>

            <div className="space-y-3">
              {q.options.map((option, i) => (
                <button
                  key={i}
                  onClick={() => handleSelect(i as Answer)}
                  className={cn(
                    "group w-full rounded-xl border px-5 py-4 text-left text-sm leading-relaxed transition-all duration-150",
                    selected === i
                      ? "border-primary bg-primary/8 text-foreground shadow-sm ring-1 ring-primary/30"
                      : "border-border bg-card text-muted-foreground hover:border-primary/40 hover:bg-primary/4 hover:text-foreground hover:-translate-y-0.5 hover:shadow-sm",
                  )}
                >
                  <div className="flex items-start gap-3">
                    <span className={cn(
                      "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition-colors",
                      selected === i ? "border-primary bg-primary text-primary-foreground" : "border-border text-muted-foreground group-hover:border-primary/50"
                    )}>
                      {["A", "B", "C", "D"][i]}
                    </span>
                    {option}
                  </div>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between">
              <Button variant="ghost" onClick={handleBack} className="gap-2 text-muted-foreground">
                <ArrowLeft className="h-4 w-4" />
                {current === 0 ? "Back to intro" : "Previous"}
              </Button>
              <Button
                onClick={handleNext}
                disabled={selected === null}
                className="gap-2 transition-all hover:scale-105 disabled:opacity-40"
              >
                {current === questions.length - 1 ? "See my reflection" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      )}

      {step === "result" && result && (
        <div style={{ animation: "fadeSlideIn 0.35s ease forwards" }}>
          {/* Result header */}
          <div className={cn("rounded-2xl border p-6 md:p-8", result.bgColor)}>
            <p className={cn("text-sm font-semibold uppercase tracking-wider", result.color)}>
              Your reflection
            </p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
              {result.headline}
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-foreground/80">
              {result.summary}
            </p>
          </div>

          {/* Reflection prompts */}
          <div className="mt-5 rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="mb-4 font-semibold text-foreground">Questions worth sitting with:</p>
            <ul className="space-y-4">
              {result.reflections.map((r, i) => (
                <li
                  key={i}
                  className="flex gap-3 leading-relaxed text-muted-foreground"
                  style={{ animation: `fadeSlideIn 0.3s ease ${i * 0.1}s both` }}
                >
                  <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" />
                  {r}
                </li>
              ))}
            </ul>
          </div>

          {/* Suggested resources */}
          <div className="mt-5 rounded-2xl border border-border bg-card p-6 md:p-8">
            <p className="mb-4 font-semibold text-foreground">Suggested next steps:</p>
            <div className="flex flex-wrap gap-3">
              {result.actions.map((a, i) => (
                <Link
                  key={i}
                  href={a.href}
                  target={a.href.startsWith("http") ? "_blank" : undefined}
                  rel={a.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="inline-flex items-center gap-2 rounded-xl border border-border bg-secondary px-4 py-2.5 text-sm font-medium text-foreground transition-all hover:border-primary/40 hover:bg-primary/5 hover:-translate-y-0.5 hover:shadow-sm"
                >
                  {a.label}
                  <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          </div>

          {/* Reminder */}
          <div className="mt-5 rounded-xl border border-primary/20 bg-primary/5 p-5">
            <p className="text-sm leading-relaxed text-foreground">
              <strong>Remember:</strong> This check-in reflects one moment in time. How you feel this week isn't how you'll feel forever, and recognizing where you are is always the first step toward something better. You can retake this anytime.
            </p>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Button onClick={restart} variant="outline" className="gap-2">
              <RotateCcw className="h-4 w-4" />
              Take it again
            </Button>
            <Link href="/mindset">
              <Button className="gap-2 hover:scale-105 transition-transform">
                Go to Mindset section
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      )}
    </Section>
  )
}
