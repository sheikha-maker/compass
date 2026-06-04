import { PageLayout } from "@/components/compass/page-layout"
import { PrereqTracker } from "../components/PrereqTracker"
import { CoursePlannerCalendar } from "../components/CoursePlannerCalendar"
import { MCATCountdown } from "../components/MCATCountdown"
import { StorageWarning } from "@/components/compass/storage-warning"
import { SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "prereq-tracker", label: "Prerequisite Tracker" },
  { id: "course-planner", label: "Course Planner" },
  { id: "mcat-countdown", label: "MCAT Countdown" },
]

export default function PlanCheckPage() {
  return (
    <PageLayout title="Plan & Check" eyebrow="Tools" navItems={navItems}>
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8 mt-8">
        <StorageWarning />
      </div>
      <PrereqTracker />
      <CoursePlannerCalendar />
      <MCATCountdown />
      <SiteFooter />
    </PageLayout>
  )
}
