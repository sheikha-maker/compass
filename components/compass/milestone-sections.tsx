import { Section } from "./section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { timelineSteps, faqs } from "@/lib/content"
import { McatSectionsOverview } from "./mcat/mcat-sections-overview"
import { McatScoreScale } from "./mcat/mcat-score-scale"
import { McatPhaseStepper, McatHonestTruths } from "./mcat/mcat-phase-stepper"
import { McatTopicsAccordion } from "./mcat/mcat-topics-accordion"
import { McatResourceMatrix } from "./mcat/mcat-resource-matrix"
import { McatReadinessChecklist } from "./mcat/mcat-readiness-checklist"
import { McatStudyPlanner } from "./mcat/mcat-study-planner"
import { ApplicationTimelineVisual } from "./mcat/application-timeline-visual"

export function McatDeepDive() {
  return (
    <Section
      id="mcat"
      eyebrow="The Big Milestones"
      title="MCAT Deep Dive"
      intro="The MCAT is a marathon, not a sprint. Plan for it like one — understand the exam structure, build a phased study plan, and use the tools below to stay honest about readiness."
    >
      <div className="space-y-12">
        <div id="mcat-overview">
          <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">Exam structure</h3>
          <McatSectionsOverview />
        </div>

        <div id="mcat-scores">
          <McatScoreScale />
        </div>

        <div id="mcat-planner">
          <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">Build your timeline</h3>
          <McatStudyPlanner />
        </div>

        <div id="mcat-phases">
          <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">Three phases of prep</h3>
          <p className="mb-4 text-sm text-muted-foreground">
            Click each phase to see tasks, common mistakes, and suggested weekly hours.
          </p>
          <McatPhaseStepper />
        </div>

        <div id="mcat-topics">
          <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">High-yield by section</h3>
          <McatTopicsAccordion />
        </div>

        <div id="mcat-resources">
          <h3 className="mb-4 font-serif text-xl font-semibold text-foreground">Resources — what to use when</h3>
          <McatResourceMatrix />
        </div>

        <div id="mcat-readiness">
          <McatReadinessChecklist />
        </div>

        <McatHonestTruths />
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
      <ApplicationTimelineVisual />
      <div className="relative mt-8 space-y-4 pl-6">
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
