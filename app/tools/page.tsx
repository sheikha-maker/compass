import { PageLayout } from "@/components/compass/page-layout"
import { CoursePlannerCalendar } from "./components/CoursePlannerCalendar"
import { PrereqTracker } from "./components/PrereqTracker"
import { MCATCountdown } from "./components/MCATCountdown"
import { YearlyChecklist } from "./components/YearlyChecklist"
import { LORTracker } from "./components/LORTracker"
import { ActivityLogs } from "@/components/compass/activity-logs"
import { Resources, SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "course-planner", label: "Course Planner" },
  { id: "prereq-tracker", label: "Prerequisite Tracker" },
  { id: "mcat-countdown", label: "MCAT Countdown" },
  { id: "yearly-checklist", label: "Am I on track?" },
  { id: "lor-tracker", label: "LOR Tracker" },
  { id: "activity-logs", label: "Activity Logs" },
  { id: "resources", label: "Resources & Contribute" },
]

export default function ToolsPage() {
  return (
    <PageLayout title="Your Tools" eyebrow="Your Tools" navItems={navItems}>
      <CoursePlannerCalendar />
      <PrereqTracker />
      <MCATCountdown />
      <YearlyChecklist />
      <LORTracker />
      <ActivityLogs />
      <Resources />
      <SiteFooter />
    </PageLayout>
  )
}
