"use client"

import { MCAT_SECTIONS } from "@/lib/mcat"
import { mcatSectionTopics } from "@/lib/mcat-content"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

export function McatTopicsAccordion() {
  return (
    <Accordion type="single" collapsible className="w-full">
      {mcatSectionTopics.map((block) => {
        const sec = MCAT_SECTIONS.find((s) => s.id === block.sectionId)!
        return (
          <AccordionItem key={block.sectionId} value={block.sectionId}>
            <AccordionTrigger className="text-left font-serif text-base hover:no-underline">
              <span className="flex items-center gap-2">
                <span className={`rounded px-1.5 py-0.5 text-[10px] font-bold uppercase text-white ${sec.color}`}>
                  {sec.short}
                </span>
                {block.title}
              </span>
            </AccordionTrigger>
            <AccordionContent>
              <ul className="mb-3 space-y-1.5">
                {block.topics.map((t) => (
                  <li key={t} className="flex gap-2 text-sm text-muted-foreground">
                    <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                    {t}
                  </li>
                ))}
              </ul>
              <p className="rounded-lg border border-border bg-muted/30 p-3 text-sm text-foreground">
                <span className="font-medium">Moravian tip: </span>
                {block.tip}
              </p>
            </AccordionContent>
          </AccordionItem>
        )
      })}
    </Accordion>
  )
}
