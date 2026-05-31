import { Check } from "lucide-react"
import { mcatPhases, mcatTruths, timelineSteps, faqs } from "@/lib/content"
import { Section } from "./section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function McatDeepDive() {
  return (
    <Section
      id="mcat"
      eyebrow="The Big Milestones"
      title="MCAT Deep Dive"
      intro="The MCAT is a marathon, not a sprint. Plan for it like one. Here's the shape of a sane prep: three phases, in order, with rest built in."
    >
      <div className="relative space-y-4 pl-6">
        <div className="absolute bottom-2 left-2 top-2 w-px bg-border" aria-hidden="true" />
        {mcatPhases.map((p) => (
          <div key={p.phase} className="relative rounded-lg border border-border bg-card p-5">
            <div
              className="absolute -left-[1.35rem] top-6 h-3 w-3 rounded-full border-2 border-accent bg-background"
              aria-hidden="true"
            />
            <p className="font-serif text-lg font-medium text-foreground">{p.phase}</p>
            <p className="text-sm text-accent">{p.duration}</p>
            <p className="mt-2 leading-relaxed text-muted-foreground">{p.detail}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-lg border border-primary/20 bg-primary/5 p-5">
        <p className="mb-3 font-serif text-lg font-medium text-foreground">A few honest truths</p>
        <ul className="space-y-2">
          {mcatTruths.map((t) => (
            <li key={t} className="flex gap-2 leading-relaxed text-foreground">
              <Check className="mt-1 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
              {t}
            </li>
          ))}
        </ul>
      </div>
    </Section>
  )
}

export function Timeline() {
  return (
    <Section
      id="timeline"
      eyebrow="The Big Milestones"
      title="Medical School Application Timeline"
      intro="Knowing when things happen removes a lot of the anxiety around 'am I on track?' Here's the rough shape of a cycle. Treat it as a map, not a verdict."
    >
      <div className="relative space-y-4 pl-6">
        <div className="absolute bottom-2 left-2 top-2 w-px bg-border" aria-hidden="true" />
        {timelineSteps.map((step) => (
          <div key={step.window} className="relative rounded-lg border border-border bg-card p-5">
            <div
              className="absolute -left-[1.35rem] top-6 h-3 w-3 rounded-full border-2 border-primary bg-background"
              aria-hidden="true"
            />
            <p className="font-serif text-lg font-medium text-foreground">{step.window}</p>
            <ul className="mt-2 space-y-1.5">
              {step.items.map((item) => (
                <li key={item} className="flex gap-2 leading-relaxed text-muted-foreground">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}

export function Faq() {
  return (
    <Section
      id="faq"
      eyebrow="The Big Milestones"
      title="Helpful Pre-Med FAQ"
      intro="These are the questions pre-med students ask most, and the honest answers, not the anxious ones."
    >
      <Accordion type="single" collapsible defaultValue="faq-5" className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-serif text-lg">{faq.q}</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
