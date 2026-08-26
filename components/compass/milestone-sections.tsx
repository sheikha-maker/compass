import { Section } from "./section"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { faqs as fallbackFaqs, lastReviewed } from "@/lib/content"
import type { NotionFaq } from "@/lib/notion"
import { AlertTriangle } from "lucide-react"
import { McatSectionsOverview } from "./mcat/mcat-sections-overview"
import { McatScoreScale } from "./mcat/mcat-score-scale"
import { McatPhaseStepper, McatHonestTruths } from "./mcat/mcat-phase-stepper"
import { McatTopicsAccordion } from "./mcat/mcat-topics-accordion"
import { McatReadinessChecklist } from "./mcat/mcat-readiness-checklist"
import { McatStudyPlanner } from "./mcat/mcat-study-planner"
import { ApplicationTimelineVisual } from "./mcat/application-timeline-visual"
import { changelog, formatChangeDate, isRecent } from "@/lib/updates"

/** Find the most recent changelog entry for a given area tag. */
function latestForArea(area: string): { date: string; recent: boolean } | undefined {
  const entry = changelog.find(e => e.area === area)
  if (!entry) return undefined
  return { date: formatChangeDate(entry.date), recent: isRecent(entry.date) }
}

export function McatDeepDive() {
  const mcat = latestForArea("MCAT") ?? { date: lastReviewed, recent: false }
  return (
    <Section
      id="mcat"
      eyebrow="The Big Milestones"
      title="MCAT Deep Dive"
      updatedAt={mcat.date}
      recentlyUpdated={mcat.recent}
      intro="The MCAT is a marathon, not a sprint. Plan for it like one. Understand the exam structure, build a phased study plan, and use the tools below to stay honest about readiness."
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
    </Section>
  )
}

export function Faq({ faqs = fallbackFaqs }: { faqs?: NotionFaq[] }) {
  const faq = latestForArea("FAQ") ?? { date: lastReviewed, recent: false }
  return (
    <Section
      id="faq"
      eyebrow="The Big Milestones"
      title="Helpful Pre-Med FAQ"
      updatedAt={faq.date}
      recentlyUpdated={faq.recent}
      intro="These are the questions pre-med students ask most, and the honest answers, not the anxious ones."
    >
      <Accordion type="single" collapsible defaultValue="faq-5" className="w-full">
        {faqs.map((faq, i) => (
          <AccordionItem key={i} value={`faq-${i}`}>
            <AccordionTrigger className="text-left font-serif text-lg">{faq.q}</AccordionTrigger>
            <AccordionContent>
              <p className="leading-relaxed text-muted-foreground">{faq.a}</p>
              {faq.mistake && (
                <div className="mt-3 flex gap-2.5 rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-3">
                  <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive/70" aria-hidden />
                  <p className="text-sm leading-relaxed text-foreground">
                    <span className="font-semibold">Common mistake: </span>
                    {faq.mistake}
                  </p>
                </div>
              )}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </Section>
  )
}
