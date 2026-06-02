import { PageLayout } from "@/components/compass/page-layout"
import { CoursePlannerCalendar } from "../components/CoursePlannerCalendar"
import { PrereqTracker } from "../components/PrereqTracker"
import { MCATCountdown } from "../components/MCATCountdown"
import { SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "course-planner", label: "Course Planner" },
  { id: "prereq-tracker", label: "Prereq Tracker" },
  { id: "mcat-countdown", label: "MCAT Countdown" },
]

export default function PlanCheckPage() {
  return (
    <PageLayout title="Plan & Check" eyebrow="Tools" navItems={navItems}>
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
        <p>
          <strong>Browser storage only.</strong> Your data is saved locally and will be lost if you clear browser history or switch devices. Screenshot or copy your entries regularly.
        </p>
      </div>

      <section className="mx-auto w-full max-w-4xl px-5 md:px-8 mb-8">
        <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Plan & Check
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Map semesters, checkpoints, and MCAT prep together without extra noise.
          </p>
        </div>
      </section>

      <CoursePlannerCalendar />
      <PrereqTracker />
      <MCATCountdown />

      <SiteFooter />
    </PageLayout>
  )
}
