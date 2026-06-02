import { PageLayout } from "@/components/compass/page-layout"
import { WellnessCheckin } from "../components/WellnessCheckin"
import { ActivityLogs } from "@/components/compass/activity-logs"
import { SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "wellness-checkin", label: "Weekly Check-In" },
  { id: "activity-logs", label: "Activity Logs" },
]

export default function WellnessHoursPage() {
  return (
    <PageLayout title="Wellness & Hours" eyebrow="Tools" navItems={navItems}>
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
        <p>
          <strong>Browser storage only.</strong> Your data is saved locally and will be lost if you clear browser history or switch devices. Screenshot or copy your entries regularly.
        </p>
      </div>

      <section className="mx-auto w-full max-w-4xl px-5 md:px-8 mb-8">
        <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Wellness & Hours
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Track your weekly check-ins and activity hours without distractions.
          </p>
        </div>
      </section>

      <WellnessCheckin />
      <ActivityLogs />

      <SiteFooter />
    </PageLayout>
  )
}
