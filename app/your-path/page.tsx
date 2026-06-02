import { PageLayout } from "@/components/compass/page-layout"
import { PathOverview } from "@/components/compass/path/path-overview"
import {
  ExperienceTools,
  YearCompass,
  CourseGuides,
  Mentorship,
} from "@/components/compass/path-sections"

const navItems = [
  { id: "experience-tools", label: "Experience-Specific Tools" },
  { id: "year-compass", label: "Year-by-Year Compass" },
  { id: "course-guides", label: "Course Survival Guides" },
  { id: "mentorship", label: "Peers & Mentorship" },
]

export default function YourPathPage() {
  return (
    <PageLayout
      title="Building Your Path"
      eyebrow="Building Your Path"
      description="Plan experiences, semesters, and mentorship with depth. Moravian-specific guidance for each year of your pre-med journey."
      navItems={navItems}
    >
      <PathOverview />
      <ExperienceTools />
      <YearCompass />
      <CourseGuides />
      <Mentorship />
    </PageLayout>
  )
}
