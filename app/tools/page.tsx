import { PageLayout } from "@/components/compass/page-layout"
import { CoursePlannerCalendar } from "./components/CoursePlannerCalendar"
import { PrereqTracker } from "./components/PrereqTracker"
import { ActivityLogs } from "@/components/compass/activity-logs"
import { Resources, SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "course-planner", label: "Course Planner" },
  { id: "prereq-tracker", label: "Prerequisite Tracker" },
  { id: "activity-logs", label: "Activity Logs" },
  { id: "resources", label: "Resources & Contribute" },
]

export default function ToolsPage() {
  return (
    <PageLayout title="Your Tools" eyebrow="Your Tools" navItems={navItems}>
      <CoursePlannerCalendar />
      <PrereqTracker />
      <ActivityLogs />
      <Resources />
      <SiteFooter />
    </PageLayout>
  )
}
