import { Heart, Scale, GitCompare, Wind, RefreshCw } from "lucide-react"
import { mindfulnessPractices, lastReviewed } from "@/lib/content"
import { comparisonInsights, comparisonReframePrompts, breathingExercise } from "@/lib/mindset-content"
import { Section } from "./section"
import { WeeklyWellnessRhythm } from "./mindset/weekly-wellness-rhythm"

const practiceIcons = [Heart, Wind, Scale, GitCompare, Heart]

export function Mindfulness() {
  return (
    <Section
      id="mindfulness"
      eyebrow="Mindset"
      title="Mindfulness"
      lastReviewed={lastReviewed}
      intro="Most pre-med guidance overlooks mental well-being, and its effects can snowball. The students who burn out aren't the least capable; they're the ones who never built a way to carry the pressure. Start here."
    >
      <div className="mb-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/8 to-accent/5 p-5 md:p-6">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/15">
            <Wind className="h-5 w-5 text-primary" aria-hidden />
          </div>
          <div>
            <p className="font-serif text-lg font-medium text-foreground">{breathingExercise.title}</p>
            <ol className="mt-3 list-decimal space-y-2 pl-5 text-sm leading-relaxed text-muted-foreground">
              {breathingExercise.steps.map((step) => (
                <li key={step}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {mindfulnessPractices.map((p, i) => {
          const Icon = practiceIcons[i % practiceIcons.length]
          return (
            <div
              key={p.title}
              className="rounded-xl border border-border bg-card p-5 transition-shadow hover:shadow-md"
            >
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <Icon className="h-5 w-5 text-accent" aria-hidden />
              </div>
              <h3 className="font-serif text-lg font-medium text-foreground">{p.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export function Comparison() {
  return (
    <Section
      id="comparison"
      eyebrow="Mindset"
      title="When Comparison Hits"
      intro="Unfortunately, comparison is a common feature of pre-med culture. Someone always has more hours, a higher grade, or an earlier start. Here's how to keep it from steering your decisions."
    >
      <div className="grid gap-4 md:grid-cols-3">
        {comparisonInsights.map((item, i) => (
          <div
            key={item.title}
            className="rounded-xl border border-border bg-card p-5 transition-all hover:border-primary/30 hover:shadow-sm"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary/10 text-sm font-bold text-primary">
              {i + 1}
            </span>
            <h3 className="mt-3 font-serif text-base font-medium text-foreground">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </div>
        ))}
      </div>

      {/* Reframe exercise */}
      <div className="mt-8 rounded-xl border border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5 p-5 md:p-6">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
            <RefreshCw className="h-4 w-4 text-primary" aria-hidden />
          </div>
          <div>
            <p className="font-serif font-medium text-foreground">When comparison hits — try this</p>
            <p className="text-sm text-muted-foreground">Three prompts that redirect comparison into clarity. Pick one and sit with it for five minutes.</p>
          </div>
        </div>
        <ol className="space-y-4">
          {comparisonReframePrompts.map((item, i) => (
            <li key={i} className="flex gap-4">
              <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/15 text-xs font-bold text-primary">
                {i + 1}
              </span>
              <div>
                <p className="font-medium text-foreground">&ldquo;{item.prompt}&rdquo;</p>
                <p className="mt-1 text-sm text-muted-foreground">{item.why}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </Section>
  )
}

export function Balance() {
  return (
    <Section
      id="balance"
      eyebrow="Mindset"
      title="Balance & Sustainability"
      intro="Your academics are your foundation, but a foundation you burn down to build faster isn't worth much. Sustainability is the strategy that wins the long game."
    >
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-xl border border-border bg-card p-6">
          <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
            <Scale className="h-5 w-5 text-accent" aria-hidden />
          </div>
          <ul className="space-y-5">
            {[
              {
                title: "Academics first, always",
                body: "No amount of extracurriculars rescues a GPA you sacrificed to get them. When in doubt, protect your coursework.",
              },
              {
                title: "Sleep is a performance tool, not a luxury",
                body: "The all-nighter that saves one exam quietly costs you the next two weeks. Treat rest as part of your study plan.",
              },
              {
                title: "Build a week you could repeat",
                body: "If your current schedule would break you over a full semester, it's not a plan, it's a countdown. Design for the marathon.",
              },
              {
                title: "Say no on purpose",
                body: "Every yes is a no to something else. Protect your time deliberately so your energy goes where it matters most.",
              },
            ].map((item) => (
              <li key={item.title}>
                <p className="font-medium text-foreground">{item.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </li>
            ))}
          </ul>
        </div>
        <WeeklyWellnessRhythm />
      </div>
    </Section>
  )
}
