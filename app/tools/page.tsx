import { PageLayout } from "@/components/compass/page-layout"
import { CoursePlanner } from "@/components/compass/course-planner"
import { ActivityLogs } from "@/components/compass/activity-logs"
import { Resources, SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "course-planner", label: "Course Planner" },
  { id: "activity-logs", label: "Activity Logs" },
  { id: "resources", label: "Resources & Contribute" },
]

export default function ToolsPage() {
  return (
    <PageLayout title="Your Tools" eyebrow="Your Tools" navItems={navItems}>
      <CoursePlanner />
      <ActivityLogs />
      <Resources />
      <SiteFooter />
    </PageLayout>
  )
}
