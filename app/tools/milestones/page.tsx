import { PageLayout } from "@/components/compass/page-layout"
import { YearlyChecklist } from "../components/YearlyChecklist"
import { StorageWarning } from "@/components/compass/storage-warning"
import { SiteFooter } from "@/components/compass/resources"
import { PrintButton } from "@/components/compass/print-button"

const navItems = [
  { id: "yearly-checklist", label: "Moravian Milestones" },
]

export default function ToolMilestonesPage() {
  return (
    <PageLayout title="Milestones" eyebrow="Tools" navItems={navItems}>
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8 mt-8 space-y-3">
        <StorageWarning />
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground">
            Check off milestones as you complete them. Progress is saved in your browser.
          </p>
          <PrintButton />
        </div>
      </div>
      <YearlyChecklist />
      <SiteFooter />
    </PageLayout>
  )
}
