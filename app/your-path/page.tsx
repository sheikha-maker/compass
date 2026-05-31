import { PageLayout } from "@/components/compass/page-layout"
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
    <PageLayout title="Building Your Path" eyebrow="Building Your Path" navItems={navItems}>
      <ExperienceTools />
      <YearCompass />
      <CourseGuides />
      <Mentorship />
    </PageLayout>
  )
}
