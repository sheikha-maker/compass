import { BurnoutCheck } from "@/components/compass/burnout-check"
import { PageLayout } from "@/components/compass/page-layout"

const navItems = [{ id: "burnout-check", label: "Burnout Self-Check" }]

export default function BurnoutCheckPage() {
  return (
    <PageLayout title="Burnout Self-Check" eyebrow="Mindset" navItems={navItems}>
      <BurnoutCheck />
    </PageLayout>
  )
}
