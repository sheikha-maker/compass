"use client"

import { useState, useEffect } from "react"
import { CheckCircle2, AlertTriangle, Users, BookOpen, Star, Calendar } from "lucide-react"
import { experienceTools, yearCompass, courseGuides, mentorshipPoints, mentorshipCaseStudies, lastReviewed } from "@/lib/content"
import { experienceTypeCards } from "@/lib/path-content"
import { Section } from "./section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { PathDepthChecklist } from "./path/path-depth-checklist"
import { cn } from "@/lib/utils"

export function ExperienceTools() {
  const [openId, setOpenId] = useState<string | undefined>(undefined)

  function jumpToExperience(id: string) {
    setOpenId(id)
    setTimeout(() => {
      document.getElementById("experience-tools")?.scrollIntoView({ behavior: "smooth", block: "start" })
    }, 50)
  }

  return (
    <Section
      id="experience-tools"
      eyebrow="Building Your Path"
      title="Experience-Specific Tools"
      lastReviewed={lastReviewed}
      intro="Research, clinical work, shadowing, leadership, and service each have a different purpose and a different right time. Here's how to think about each one without turning it into a checklist."
    >
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {experienceTypeCards.map((card) => {
          const Icon = card.icon
          return (
            <button
              key={card.id}
              type="button"
              onClick={() => jumpToExperience(card.id)}
              className={cn(
                "flex flex-col items-center rounded-xl border p-4 text-center transition-all",
                openId === card.id
                  ? "border-primary bg-primary/5 shadow-sm ring-1 ring-primary/20"
                  : "border-border bg-card hover:border-primary/30 hover:shadow-sm"
              )}
            >
              <div className={cn("mb-2 flex h-10 w-10 items-center justify-center rounded-lg", card.color)}>
                <Icon className="h-5 w-5" aria-hidden />
              </div>
              <span className="text-sm font-semibold text-foreground">{card.title}</span>
            </button>
          )
        })}
      </div>

      <Accordion type="single" collapsible className="w-full" value={openId} onValueChange={setOpenId}>
        {experienceTools.map((tool) => (
          <AccordionItem key={tool.id} value={tool.id}>
            <AccordionTrigger className="text-left font-serif text-lg">{tool.title}</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-muted-foreground">{tool.body}</p>
              <ul className="mt-4 space-y-2">
                {tool.tips.map((tip) => (
                  <li key={tip} className="flex gap-2 text-sm text-foreground">
                    <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden />
                    {tip}
                  </li>
                ))}
              </ul>
              {tool.moravianHighlight && (
                <div className="mt-4 rounded-lg border border-primary/20 bg-primary/5 p-4">
                  <div className="flex items-center gap-2">
                    <Star className="h-4 w-4 text-primary" aria-hidden />
                    <p className="font-medium text-foreground">{tool.moravianHighlight.title}</p>
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {tool.moravianHighlight.description}
                  </p>
                  <p className="mt-2 text-sm font-medium text-primary">{tool.moravianHighlight.actionItem}</p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}

export function YearCompass() {
  const [active, setActive] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const current = yearCompass[active]

  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    const year = params.get("year")
    if (year !== null) {
      const i = parseInt(year, 10)
      if (!Number.isNaN(i) && i >= 0 && i < yearCompass.length) {
        setActive(i)
        setAnimKey((k) => k + 1)
      }
    }
  }, [])

  function selectYear(i: number) {
    if (i === active) return
    setActive(i)
    setAnimKey((k) => k + 1)
  }

  const yearColors = [
    "border-timeline-1 bg-timeline-1",
    "border-timeline-2 bg-timeline-2",
    "border-timeline-3 bg-timeline-3",
    "border-timeline-4 bg-timeline-4",
  ]

  return (
    <Section
      id="year-compass"
      eyebrow="Building Your Path"
      title="Year-by-Year Compass"
      intro="Not everything here is for you. Just use the parts that apply to where you're at right now. Click your year."
    >
      <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {yearCompass.map((y, i) => (
          <button
            key={y.year}
            onClick={() => selectYear(i)}
            className={cn(
              "group relative flex flex-col items-center rounded-xl border-2 px-3 py-4 text-center transition-all duration-200",
              active === i
                ? `${yearColors[i]} text-white shadow-lg scale-105`
                : "border-border bg-card text-foreground hover:border-primary/40 hover:shadow-md"
            )}
            aria-pressed={active === i}
          >
            <span className="text-xs font-bold uppercase tracking-widest opacity-70">{y.year}</span>
            <span className="mt-1 text-sm font-semibold leading-tight">{y.theme.split(".")[0]}</span>
          </button>
        ))}
      </div>

      <div
        key={animKey}
        className="rounded-2xl border border-border bg-card p-6 shadow-sm"
        style={{ animation: "fadeSlideIn 0.3s ease forwards" }}
      >
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-serif text-2xl font-semibold text-foreground">{current.year}</p>
            <p className="mt-1 font-medium text-accent">{current.theme}</p>
          </div>
          <span
            className={cn("shrink-0 rounded-full px-3 py-1 text-xs font-bold text-white", yearColors[active].split(" ")[1])}
          >
            {active + 1} of 4
          </span>
        </div>

        <ul className="mt-5 space-y-3">
          {current.focus.map((f, fi) => (
            <li
              key={f}
              className="flex gap-2.5 leading-relaxed text-foreground"
              style={{ animation: `fadeSlideIn 0.3s ease ${fi * 0.06}s both` }}
            >
              <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden />
              {f}
            </li>
          ))}
        </ul>

        <div className="mt-5 flex gap-2.5 rounded-xl border border-primary/20 bg-primary/5 p-4">
          <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
          <p className="text-sm leading-relaxed text-foreground">{current.avoid}</p>
        </div>

        {current.sampleSchedule && (
          <div className="mt-6 rounded-xl border border-accent/20 bg-accent/5 p-5">
            <div className="mb-4 flex items-center gap-2">
              <Calendar className="h-4 w-4 text-accent" aria-hidden />
              <p className="font-semibold text-foreground">Sample Schedule</p>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <p className="mb-2.5 text-sm font-semibold text-foreground">Fall Semester</p>
                <ul className="space-y-1.5">
                  {current.sampleSchedule.fall.map((course) => (
                    <li key={course} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-2.5 text-sm font-semibold text-foreground">Spring Semester</p>
                <ul className="space-y-1.5">
                  {current.sampleSchedule.spring.map((course) => (
                    <li key={course} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                      {course}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <p className="mt-4 border-t border-accent/20 pt-3 text-sm font-medium text-accent">
              {current.sampleSchedule.tips}
            </p>
          </div>
        )}

        {current.gapYearCallout && (
          <div className="mt-6 rounded-xl border border-timeline-4/30 bg-timeline-4/5 p-5">
            <div className="mb-3 flex items-center gap-2">
              <BookOpen className="h-4 w-4 text-timeline-4 shrink-0" aria-hidden />
              <p className="font-semibold text-foreground">{current.gapYearCallout.heading}</p>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">{current.gapYearCallout.body}</p>
            <ul className="mt-4 space-y-2">
              {current.gapYearCallout.activities.map((a) => (
                <li key={a} className="flex items-start gap-2 text-sm text-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-timeline-4" aria-hidden />
                  {a}
                </li>
              ))}
            </ul>
            <p className="mt-4 border-t border-timeline-4/20 pt-3 text-sm italic text-muted-foreground">
              {current.gapYearCallout.framingTip}
            </p>
          </div>
        )}

        {/* Experiences */}
        {current.experiences && current.experiences.length > 0 && (
          <div className="mt-6 rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Users className="h-4 w-4 text-primary shrink-0" aria-hidden />
              <p className="font-semibold text-foreground">Experiences to aim for this year</p>
            </div>
            <ul className="space-y-2">
              {current.experiences.map((e) => (
                <li key={e} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden />
                  {e}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Advisor topics */}
        {current.advisorTopics && current.advisorTopics.length > 0 && (
          <div className="mt-4 rounded-xl border border-border bg-card p-5">
            <div className="mb-3 flex items-center gap-2">
              <Star className="h-4 w-4 text-accent shrink-0" aria-hidden />
              <p className="font-semibold text-foreground">Bring these to your advisor meeting</p>
            </div>
            <ul className="space-y-2">
              {current.advisorTopics.map((t) => (
                <li key={t} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {t}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Reflections */}
        {current.reflections && current.reflections.length > 0 && (
          <div className="mt-4 rounded-xl border border-border bg-secondary/40 p-5">
            <p className="mb-3 font-semibold text-foreground">Questions worth sitting with</p>
            <ul className="space-y-3">
              {current.reflections.map((r) => (
                <li key={r} className="flex items-start gap-2.5 text-sm italic text-muted-foreground">
                  <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-muted-foreground/40" aria-hidden />
                  &ldquo;{r}&rdquo;
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      <div className="mt-4 flex justify-between">
        <button
          type="button"
          onClick={() => selectYear(Math.max(0, active - 1))}
          disabled={active === 0}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
        >
          ← Previous year
        </button>
        <button
          type="button"
          onClick={() => selectYear(Math.min(yearCompass.length - 1, active + 1))}
          disabled={active === yearCompass.length - 1}
          className="rounded-lg border border-border px-4 py-2 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:text-foreground disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next year →
        </button>
      </div>
    </Section>
  )
}

const courseDifficulty: Record<string, string> = {
  "General Chemistry I & II": "High workload",
  "Organic Chemistry I & II": "High workload",
  "Biology Sequence": "Volume-heavy",
  "Physics I & II": "Conceptual",
  "Biochemistry": "MCAT bridge",
  "Psychology & Sociology": "MCAT-friendly",
}

export function CourseGuides() {
  return (
    <Section
      id="course-guides"
      eyebrow="Building Your Path"
      title="Course Survival Guides"
      intro="When times are rough, these give you strategies for mastering the hard pre-med courses without burning out. Includes Moravian-specific tips from students who've been there."
    >
      <div className="mb-4 flex flex-wrap gap-2">
        {courseGuides.map((g) => (
          <span
            key={g.course}
            className="rounded-full border border-border bg-secondary px-3 py-1 text-xs font-medium text-muted-foreground"
          >
            {g.course.split(" ")[0]}…
          </span>
        ))}
      </div>
      <Accordion type="single" collapsible className="w-full">
        {courseGuides.map((g) => (
          <AccordionItem key={g.course} value={g.course}>
            <AccordionTrigger className="text-left font-serif text-lg hover:no-underline">
              <span className="flex flex-wrap items-center gap-2">
                {g.course}
                <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-primary">
                  {courseDifficulty[g.course] ?? "Core"}
                </span>
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <div className="space-y-4">
                <div>
                  <p className="mb-1 font-medium text-foreground">Strategy</p>
                  <p className="leading-relaxed text-muted-foreground">{g.strategy}</p>
                </div>
                <div>
                  <p className="mb-1 font-medium text-foreground">If you fall behind</p>
                  <p className="leading-relaxed text-muted-foreground">{g.survival}</p>
                </div>
                {g.moravianTips && (
                  <div className="rounded-lg border border-primary/20 bg-primary/5 p-4">
                    <div className="mb-2 flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" aria-hidden />
                      <p className="font-medium text-foreground">Moravian Tips</p>
                    </div>
                    <ul className="space-y-2">
                      {g.moravianTips.map((tip) => (
                        <li key={tip} className="flex gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                          {tip}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}

const caseStudyColors = [
  "border-l-timeline-1",
  "border-l-timeline-2",
  "border-l-timeline-3",
  "border-l-timeline-4",
]

export function Mentorship() {
  return (
    <Section
      id="mentorship"
      eyebrow="Building Your Path"
      title="Peers & Mentorship"
      intro="This is where you build the relationships that support both your academics and your mental wellness. You are not meant to do this alone."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {mentorshipPoints.map((p) => (
          <div key={p.title} className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
              <Users className="h-5 w-5 text-accent" aria-hidden />
            </div>
            <h3 className="font-serif text-lg font-medium text-foreground">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
      </div>

      <div className="mt-10">
        <h3 className="font-serif text-xl font-semibold text-foreground">Real Stories, Real Lessons</h3>
        <p className="mt-2 text-muted-foreground">
          These scenarios are composites based on real Moravian pre-med experiences. Names and details changed, lessons
          preserved.
        </p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {mentorshipCaseStudies.map((study, i) => (
            <div
              key={study.title}
              className={cn(
                "rounded-xl border border-border border-l-4 bg-card p-5",
                caseStudyColors[i % caseStudyColors.length]
              )}
            >
              <h4 className="font-serif text-lg font-medium text-foreground">{study.title}</h4>
              <div className="mt-3 space-y-3">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-accent">Scenario</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.scenario}</p>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-primary">What happened</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.outcome}</p>
                </div>
                <div className="rounded-lg bg-secondary/50 p-3">
                  <p className="text-xs font-semibold uppercase tracking-wider text-foreground">Lesson</p>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{study.lesson}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}
