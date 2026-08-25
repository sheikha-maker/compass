import { Quote, GraduationCap, Linkedin, ArrowRight } from "lucide-react"
import Image from "next/image"
import { studentSpotlights, type StudentSpotlight } from "@/lib/spotlights"
import { Reveal } from "@/components/compass/reveal"
import { TiltCard } from "@/components/compass/tilt-card"
import { cn } from "@/lib/utils"

const trackStyles: Record<NonNullable<StudentSpotlight["track"]>, string> = {
  MD: "bg-timeline-1/15 text-timeline-1 border-timeline-1/30",
  DO: "bg-timeline-2/15 text-timeline-2 border-timeline-2/30",
  "Gap Year": "bg-timeline-3/15 text-timeline-3 border-timeline-3/30",
  Research: "bg-timeline-4/15 text-timeline-4 border-timeline-4/30",
  Other: "bg-secondary text-muted-foreground border-border",
}

const trackAccentBar: Record<NonNullable<StudentSpotlight["track"]>, string> = {
  MD: "bg-timeline-1",
  DO: "bg-timeline-2",
  "Gap Year": "bg-timeline-3",
  Research: "bg-timeline-4",
  Other: "bg-border",
}

/**
 * "Where are they now" — short profiles of past Moravian pre-meds.
 * Seeded from lib/spotlights.ts; ready to be sourced from Notion later.
 */
export function StudentSpotlight() {
  if (studentSpotlights.length === 0) return null

  const count = studentSpotlights.length

  return (
    <section id="student-spotlight" className="mx-auto max-w-5xl px-5 py-14 md:px-8">
      <Reveal>
        <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Where are they now</p>
        <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
          Moravian pre-meds, a few years on
        </h2>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          Real-shaped stories from students who walked this path before you. Different timelines, different routes — all
          of them honest.
        </p>
      </Reveal>

      <div
        className={cn(
          "mt-8 grid gap-5",
          count === 1 && "mx-auto max-w-sm",
          count === 2 && "mx-auto max-w-3xl sm:grid-cols-2",
          count >= 3 && "sm:grid-cols-2 lg:grid-cols-3",
        )}
      >
        {studentSpotlights.map((s, i) => (
          <Reveal key={s.name} delay={i * 90}>
            <TiltCard intensity={5} className="h-full rounded-2xl">
              <article className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                <div className={cn("h-1.5 w-full", s.track ? trackAccentBar[s.track] : "bg-border")} aria-hidden="true" />

                <div className="flex flex-col p-6">
                  <div className="flex items-center justify-between gap-2">
                    <div className="relative flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-primary/10 ring-2 ring-card ring-offset-2 ring-offset-card">
                      {s.photo ? (
                        <Image
                          src={s.photo}
                          alt={s.name}
                          fill
                          sizes="56px"
                          className="object-cover"
                        />
                      ) : (
                        <GraduationCap className="h-6 w-6 text-primary" aria-hidden="true" />
                      )}
                    </div>
                    {s.track && (
                      <span
                        className={cn(
                          "rounded-full border px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
                          trackStyles[s.track],
                        )}
                      >
                        {s.track}
                      </span>
                    )}
                  </div>

                  <p className="mt-4 font-serif text-lg font-semibold text-foreground">{s.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {s.gradYear} · {s.major}
                  </p>
                  <p className="mt-3 text-sm font-medium text-primary">{s.now}</p>

                  {s.quote && (
                    <div className="mt-4 flex gap-2 border-l-2 border-accent/40 pl-3">
                      <Quote className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                      <p className="text-sm italic leading-relaxed text-muted-foreground">{s.quote}</p>
                    </div>
                  )}

                  {s.advice && (
                    <p className="mt-4 text-sm leading-relaxed text-foreground">
                      <span className="font-semibold">Their advice: </span>
                      {s.advice}
                    </p>
                  )}

                  {s.path && s.path.length > 0 && (
                    <div className="mt-4 rounded-lg border border-dashed border-border bg-secondary/40 p-3">
                      <p className="mb-2 text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">
                        The path, step by step
                      </p>
                      <ol className="space-y-1.5">
                        {s.path.map((step, j) => (
                          <li key={step} className="flex items-start gap-1.5 text-xs leading-relaxed text-muted-foreground">
                            {j > 0 && <ArrowRight className="mt-0.5 h-3 w-3 shrink-0 text-accent" aria-hidden="true" />}
                            <span>{step}</span>
                          </li>
                        ))}
                      </ol>
                    </div>
                  )}

                  {s.linkedin && (
                    <a
                      href={s.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-auto inline-flex items-center gap-1.5 pt-4 text-sm font-medium text-primary hover:underline"
                    >
                      <Linkedin className="h-3.5 w-3.5" aria-hidden="true" />
                      Connect on LinkedIn
                    </a>
                  )}
                </div>
              </article>
            </TiltCard>
          </Reveal>
        ))}
      </div>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Want to be featured? Reach out to your pre-health advisor — these profiles grow over time.
      </p>
    </section>
  )
}
