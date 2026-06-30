import { Quote, GraduationCap } from "lucide-react"
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

/**
 * "Where are they now" — short profiles of past Moravian pre-meds.
 * Seeded from lib/spotlights.ts; ready to be sourced from Notion later.
 */
export function StudentSpotlight() {
  if (studentSpotlights.length === 0) return null

  return (
    <section id="student-spotlight" className="mx-auto max-w-4xl px-5 py-14 md:px-8">
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

      <div className="mt-8 grid gap-4 md:grid-cols-3">
        {studentSpotlights.map((s, i) => (
          <Reveal key={s.name} delay={i * 90}>
            <TiltCard intensity={5} className="h-full rounded-2xl">
              <article className="flex h-full flex-col rounded-2xl border border-border bg-card p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-lg">
                <div className="flex items-center justify-between gap-2">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary/10">
                    <GraduationCap className="h-5 w-5 text-primary" aria-hidden="true" />
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

                <div className="mt-4 flex gap-2 border-l-2 border-accent/40 pl-3">
                  <Quote className="h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                  <p className="text-sm italic leading-relaxed text-muted-foreground">{s.quote}</p>
                </div>

                <p className="mt-auto pt-4 text-sm leading-relaxed text-foreground">
                  <span className="font-semibold">Their advice: </span>
                  {s.advice}
                </p>
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
