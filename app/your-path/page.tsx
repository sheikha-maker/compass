import { PageLayout } from "@/components/compass/page-layout"
import { PathOverview } from "@/components/compass/path/path-overview"
import {
  ExperienceTools,
  YearCompass,
  CourseGuides,
  Mentorship,
} from "@/components/compass/path-sections"
import { AdvisorCard } from "@/components/compass/advisor-card"
import { MoravianAmcasTimeline } from "@/components/compass/moravian-amcas-timeline"
import { Section } from "@/components/compass/section"
import { getCourseGuides, getYearCompass } from "@/lib/notion"

export const revalidate = 3600

const navItems = [
  { id: "your-advisor", label: "Your Advisor" },
  { id: "experience-tools", label: "Experience-Specific Tools" },
  { id: "year-compass", label: "Year-by-Year Compass" },
  { id: "course-guides", label: "Course Survival Guides" },
  { id: "mentorship", label: "Peers & Mentorship" },
  { id: "application-timeline", label: "Application Timeline" },
]

export default async function YourPathPage() {
  const [yearCompass, courseGuides] = await Promise.all([
    getYearCompass(),
    getCourseGuides(),
  ])

  return (
    <PageLayout
      title="Building Your Path"
      eyebrow="Building Your Path"
      description="Plan experiences, semesters, and mentorship with depth. Moravian-specific guidance for each year of your pre-med journey."
      navItems={navItems}
    >
      <PathOverview />

      {/* Dr. Fox advisor card — first stop for every Moravian pre-med */}
      <Section
        id="your-advisor"
        eyebrow="Moravian"
        title="Your Advisor"
        intro="Dr. Fox is the single most important person in your pre-health journey at Moravian. Meet her early, visit often."
      >
        <AdvisorCard />
      </Section>

      <ExperienceTools />
      <YearCompass items={yearCompass} />
      <CourseGuides guides={courseGuides} />
      <Mentorship />

      {/* AAMC + Moravian calendar */}
      <Section
        id="application-timeline"
        eyebrow="Moravian + AMCAS"
        title="Application Timeline"
        intro="AMCAS deadlines mapped to your Moravian academic calendar. Know the bottlenecks before they hit you."
      >
        <MoravianAmcasTimeline />
      </Section>
    </PageLayout>
  )
}
