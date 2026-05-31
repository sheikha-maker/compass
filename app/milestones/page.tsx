import { PageLayout } from "@/components/compass/page-layout"
import { McatDeepDive, Timeline, Faq } from "@/components/compass/milestone-sections"

const navItems = [
  { id: "mcat", label: "MCAT Deep Dive" },
  { id: "timeline", label: "Application Timeline" },
  { id: "faq", label: "Pre-Med FAQ" },
]

export default function MilestonesPage() {
  return (
    <PageLayout title="The Big Milestones" eyebrow="The Big Milestones" navItems={navItems}>
      <McatDeepDive />
      <Timeline />
      <Faq />
    </PageLayout>
  )
}
