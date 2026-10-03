import { PageLayout } from "@/components/compass/page-layout"
import { ActivityLogs } from "@/components/compass/activity-logs"
import { StorageWarning } from "@/components/compass/storage-warning"
import { SiteFooter } from "@/components/compass/resources"

const navItems = [{ id: "activity-logs", label: "Activity Logs" }]

export default function HoursPage() {
  return (
    <PageLayout title="Hours Tracker" eyebrow="Plan" navItems={navItems}>
      <div className="mx-auto mt-8 w-full max-w-4xl px-5 md:px-8"><StorageWarning /></div>
      <ActivityLogs />
      <SiteFooter />
    </PageLayout>
  )
}
