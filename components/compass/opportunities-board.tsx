"use client"

import { useState } from "react"
import {
  FlaskConical, Stethoscope, Eye, Users, HandHeart,
  ExternalLink, Clock, ChevronDown,
} from "lucide-react"
import { Section } from "./section"
import type { NotionOpportunity, OpportunityCategory } from "@/lib/notion"
import { cn } from "@/lib/utils"

const CATEGORY_META: Record<OpportunityCategory, { icon: typeof FlaskConical; color: string }> = {
  Research:   { icon: FlaskConical, color: "bg-violet-500/15 text-violet-700 dark:text-violet-300" },
  Clinical:   { icon: Stethoscope,  color: "bg-blue-500/15 text-blue-700 dark:text-blue-300" },
  Shadowing:  { icon: Eye,          color: "bg-teal-500/15 text-teal-700 dark:text-teal-300" },
  Leadership: { icon: Users,        color: "bg-amber-500/15 text-amber-700 dark:text-amber-300" },
  Service:    { icon: HandHeart,    color: "bg-rose-500/15 text-rose-700 dark:text-rose-300" },
}

const CATEGORY_ORDER: OpportunityCategory[] = ["Research", "Clinical", "Shadowing", "Leadership", "Service"]

function OpportunityCard({ opp }: { opp: NotionOpportunity }) {
  const [open, setOpen] = useState(false)
  const meta = CATEGORY_META[opp.category]
  const Icon = meta.icon

  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-shadow hover:shadow-sm">
      <div className="flex items-start gap-3">
        <span className={cn("flex h-9 w-9 shrink-0 items-center justify-center rounded-lg", meta.color)}>
          <Icon className="h-4 w-4" aria-hidden />
        </span>
        <div className="min-w-0 flex-1">
          <p className="font-medium text-foreground">{opp.name}</p>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{opp.description}</p>

          <button
            onClick={() => setOpen(o => !o)}
            className="mt-2.5 inline-flex items-center gap-1 text-xs font-semibold text-primary hover:underline"
          >
            {open ? "Hide details" : "How to apply"}
            <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} aria-hidden />
          </button>

          {open && (
            <div className="mt-3 space-y-2.5 rounded-lg border border-border bg-muted/30 p-3.5 text-sm">
              {opp.howToApply && (
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">How to apply</p>
                  <p className="mt-0.5 leading-relaxed text-foreground">{opp.howToApply}</p>
                </div>
              )}
              {opp.timeline && (
                <div className="flex items-start gap-1.5">
                  <Clock className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  <p className="text-foreground">{opp.timeline}</p>
                </div>
              )}
              {opp.contact && (
                <div className="flex items-start gap-1.5">
                  <ExternalLink className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden />
                  <p className="text-foreground">{opp.contact}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export function OpportunitiesBoard({
  opportunities,
  updatedAt,
  recentlyUpdated,
}: {
  opportunities: NotionOpportunity[]
  updatedAt?: string
  recentlyUpdated?: boolean
}) {
  const [activeCategory, setActiveCategory] = useState<OpportunityCategory | "all">("all")

  const visible = activeCategory === "all"
    ? opportunities
    : opportunities.filter(o => o.category === activeCategory)

  const present = CATEGORY_ORDER.filter(c => opportunities.some(o => o.category === c))

  return (
    <Section
      id="moravian-opportunities"
      eyebrow="Building Your Path"
      title="Moravian Opportunities"
      updatedAt={updatedAt}
      recentlyUpdated={recentlyUpdated}
      intro="Research, clinical, shadowing, leadership, and service opportunities specific to Moravian and the Lehigh Valley. This is local knowledge you won't find on a national pre-med site."
    >
      {/* Category filter pills */}
      <div className="mb-5 flex flex-wrap gap-2">
        <button
          onClick={() => setActiveCategory("all")}
          className={cn(
            "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
            activeCategory === "all"
              ? "border-primary bg-primary/10 text-primary"
              : "border-border bg-card text-muted-foreground hover:border-primary/40"
          )}
        >
          All
        </button>
        {present.map(cat => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-xs font-medium transition-colors",
              activeCategory === cat
                ? "border-primary bg-primary/10 text-primary"
                : "border-border bg-card text-muted-foreground hover:border-primary/40"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {visible.length === 0 ? (
        <p className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
          No opportunities listed in this category yet.
        </p>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2">
          {visible.map(opp => (
            <OpportunityCard key={opp.name} opp={opp} />
          ))}
        </div>
      )}

      <p className="mt-5 text-xs text-muted-foreground">
        Know of an opportunity that should be here? Reach out through the Resources page and it can be added.
      </p>
    </Section>
  )
}
