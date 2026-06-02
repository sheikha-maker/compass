"use client"

import { useEffect, useRef, useState } from "react"
import Link from "next/link"
import { Brain, Map, Trophy, Wrench, ArrowRight, Heart } from "lucide-react"

const sections = [
  {
    href: "/mindset",
    eyebrow: "Section 1",
    title: "Mindset",
    description:
      "Mindfulness practices, decision tools, handling comparison, and building sustainable habits to protect your well-being.",
    icon: Brain,
    color: "bg-primary/10 text-primary",
    topics: ["Mindfulness", "Decision Tools", "When Comparison Hits", "Balance & Sustainability"],
  },
  {
    href: "/your-path",
    eyebrow: "Section 2",
    title: "Building Your Path",
    description:
      "Research, clinical, and shadowing guides, plus a year-by-year compass, course survival strategies, and mentorship resources.",
    icon: Map,
    color: "bg-timeline-2/20 text-timeline-2",
    topics: ["Experience-Specific Tools", "Year-by-Year Compass", "Course Survival Guides", "Peers & Mentorship"],
  },
  {
    href: "/milestones",
    eyebrow: "Section 3",
    title: "The Big Milestones",
    description:
      "Everything about the MCAT, your application timeline, and honest answers to the questions pre-meds ask most.",
    icon: Trophy,
    color: "bg-timeline-3/20 text-timeline-3",
    topics: ["MCAT Deep Dive", "Application Timeline", "Pre-Med FAQ"],
  },
  {
    href: "/tools",
    eyebrow: "Section 4",
    title: "Your Tools",
    description:
      "Plan your semesters, track prerequisites, countdown to the MCAT, log wellness, and capture the tools that keep your pre-med path on track.",
    icon: Wrench,
    color: "bg-timeline-4/20 text-timeline-4",
    topics: [
      "Course Planner",
      "Prereq Tracker",
      "MCAT Countdown",
      "LOR Tracker",
      "Yearly Checklist",
      "Weekly Check-in",
      "Activity Logs",
    ],
  },
]

export function SectionCards() {
  const [visible, setVisible] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true) },
      { threshold: 0.1 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="mx-auto max-w-4xl px-5 py-14 md:px-8">
      <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">What's inside</p>
      <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
        Explore by section
      </h2>
      <p className="mt-3 max-w-2xl text-muted-foreground">
        Each section lives on its own page so you can focus on what matters right now without the noise.
      </p>

      {/* Burnout check callout */}
      <Link
        href="/burnout-check"
        className="group mt-8 flex items-center justify-between rounded-2xl border-2 border-primary/30 bg-primary/5 px-6 py-5 transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:-translate-y-0.5 hover:shadow-lg"
      >
        <div className="flex items-center gap-4">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/15">
            <Heart className="h-5 w-5 text-primary" />
          </div>
          <div>
            <p className="font-semibold text-foreground">Not sure how you're doing?</p>
            <p className="text-sm text-muted-foreground">Take the 3-minute Burnout Self-Check. Honest reflection, scored feedback, and next-step guidance.</p>
          </div>
        </div>
        <ArrowRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-200 group-hover:translate-x-1.5" />
      </Link>

      <div className="mt-5 grid gap-4 sm:grid-cols-2">
        {sections.map((s, i) => {
          const Icon = s.icon
          return (
            <Link
              key={s.href}
              href={s.href}
              className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1"
              style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(20px)",
                transition: `opacity 0.4s ease ${i * 0.08}s, transform 0.4s ease ${i * 0.08}s, box-shadow 0.2s ease, border-color 0.2s ease`,
              }}
            >
              <div className="flex items-start justify-between">
                <div className={`inline-flex rounded-xl p-3 ${s.color} transition-transform duration-200 group-hover:scale-110`}>
                  <Icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <ArrowRight className="h-4 w-4 text-muted-foreground transition-all duration-200 group-hover:translate-x-1.5 group-hover:text-primary" />
              </div>
              <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">{s.eyebrow}</p>
              <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              <ul className="mt-4 flex flex-wrap gap-1.5">
                {s.topics.map((t) => (
                  <li
                    key={t}
                    className="rounded-full border border-border bg-secondary px-2.5 py-0.5 text-xs text-muted-foreground transition-colors group-hover:border-primary/20 group-hover:bg-primary/5"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </Link>
          )
        })}
      </div>
    </section>
  )
}
