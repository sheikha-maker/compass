import { PageLayout } from "@/components/compass/page-layout"
import { WellnessCheckin } from "../components/WellnessCheckin"
import { ActivityLogs } from "@/components/compass/activity-logs"
import { StorageWarning } from "@/components/compass/storage-warning"
import { SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "wellness-checkin", label: "Weekly Check-In" },
  { id: "activity-logs", label: "Activity Logs" },
]

export default function WellnessHoursPage() {
  return (
    <PageLayout title="Wellness & Hours" eyebrow="Tools" navItems={navItems}>
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8 mt-8">
        <StorageWarning />
      </div>
      <WellnessCheckin />
      <ActivityLogs />
      <SiteFooter />
    </PageLayout>
  )
}
