import { Heart, Scale } from "lucide-react"
import { mindfulnessPractices } from "@/lib/content"
import { Section } from "./section"

export function Mindfulness() {
  return (
    <Section
      id="mindfulness"
      eyebrow="Mindset"
      title="Mindfulness"
      intro="Most pre-med guidance overlooks mental well-being, and its effects can snowball. The students who burn out aren't the least capable, they're the ones who never built a way to carry the pressure. Start here."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {mindfulnessPractices.map((p) => (
          <div key={p.title} className="rounded-lg border border-border bg-card p-5">
            <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-full bg-accent/10">
              <Heart className="h-4.5 w-4.5 text-accent" aria-hidden="true" />
            </div>
            <h3 className="font-serif text-lg font-medium text-foreground">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-muted-foreground">{p.body}</p>
          </div>
        ))}
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
      intro="Unfortunately, comparison is a common feature of pre-med culture. Someone always has more hours, a higher grade, an earlier start. Here's how to keep it from steering your decisions."
    >
      <div className="space-y-4 rounded-lg border border-border bg-card p-6">
        <div>
          <h3 className="font-serif text-lg font-medium text-foreground">Comparison is data about them, not about you</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            Someone else&apos;s timeline reflects their circumstances, resources, and choices, not a rule you broke. Use
            their success as proof it&apos;s possible, not evidence that you&apos;re failing.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-medium text-foreground">Compare yourself to last semester</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            The only honest comparison is to where you were before. Are you steadier, more capable, more clear than you
            were six months ago? That&apos;s the trajectory both you and schools should care about.
          </p>
        </div>
        <div>
          <h3 className="font-serif text-lg font-medium text-foreground">Curate your inputs</h3>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            If a group chat or feed consistently leaves you anxious, mute it during high-stress stretches. Protecting your focus is very important.
          </p>
        </div>
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
      <div className="rounded-lg border border-border bg-card p-6">
        <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
          <Scale className="h-5 w-5 text-accent" aria-hidden="true" />
        </div>
        <ul className="space-y-4">
          <li>
            <p className="font-medium text-foreground">Academics first, always</p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              No amount of extracurriculars rescues a GPA you sacrificed to get them. When in doubt, protect your
              coursework.
            </p>
          </li>
          <li>
            <p className="font-medium text-foreground">Sleep is a performance tool, not a luxury</p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              The all-nighter that &quot;saves&quot; one exam quietly costs you the next two weeks. Treat rest as part of
              your study plan.
            </p>
          </li>
          <li>
            <p className="font-medium text-foreground">Build a week you could repeat</p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              If your current schedule would break you over a full semester, it&apos;s not a plan, it&apos;s a countdown.
              Design for the marathon.
            </p>
          </li>
          <li>
            <p className="font-medium text-foreground">Say no on purpose</p>
            <p className="mt-1 leading-relaxed text-muted-foreground">
              Every yes is a no to something else. Protect your time deliberately so your energy goes where it matters
              most.
            </p>
          </li>
        </ul>
      </div>
    </Section>
  )
}
