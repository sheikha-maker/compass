import Link from "next/link"
import { PageLayout } from "@/components/compass/page-layout"
import { Mindfulness, Comparison, Balance } from "@/components/compass/mindset-sections"
import { DecisionTools } from "@/components/compass/decision-tool"

const navItems = [
  { id: "mindfulness", label: "Mindfulness" },
  { id: "decision-tools", label: "Decision Tools" },
  { id: "comparison", label: "When Comparison Hits" },
  { id: "balance", label: "Balance & Sustainability" },
]

export default function MindsetPage() {
  return (
    <PageLayout title="Mindset" eyebrow="Mindset" navItems={navItems}>
      <div className="mx-auto max-w-4xl px-5 pt-8 md:px-8">
        <Link
          href="/burnout-check"
          className="group flex items-center justify-between rounded-2xl border-2 border-primary/30 bg-primary/5 px-5 py-4 transition-all duration-200 hover:border-primary/60 hover:bg-primary/10"
        >
          <div>
            <p className="font-semibold text-foreground">Not sure how you're holding up?</p>
            <p className="text-sm text-muted-foreground">Take the 3-minute Burnout Self-Check before you continue.</p>
          </div>
          <span className="ml-4 shrink-0 rounded-xl bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-transform group-hover:scale-105">
            Check in →
          </span>
        </Link>
      </div>
      <Mindfulness />
      <DecisionTools />
      <Comparison />
      <Balance />
    </PageLayout>
  )
}
