export const ONBOARDING_STORAGE_KEY = "pmc_onboarding_v1"

export type OnboardingYearId =
  | "year1"
  | "year2"
  | "year3"
  | "year4"
  | "gap"
  | "exploring"

export type OnboardingLink = {
  href: string
  label: string
  description?: string
}

export type OnboardingOption = {
  id: OnboardingYearId
  label: string
  subtitle: string
  href: string
  recommendations: OnboardingLink[]
}

export const onboardingOptions: OnboardingOption[] = [
  {
    id: "year1",
    label: "Freshman",
    subtitle: "Year 1 — Foundation",
    href: "/your-path?year=0#year-compass",
    recommendations: [
      { href: "/your-path?year=0#year-compass", label: "Year-by-Year Compass", description: "Build habits and protect your GPA" },
      { href: "/mindset#balance", label: "Balance & Sustainability" },
      { href: "/tools#prereq-tracker", label: "Prerequisite Tracker", description: "See what’s ahead" },
    ],
  },
  {
    id: "year2",
    label: "Sophomore",
    subtitle: "Year 2 — Explore",
    href: "/your-path?year=1#year-compass",
    recommendations: [
      { href: "/your-path?year=1#year-compass", label: "Year-by-Year Compass" },
      { href: "/your-path#experience-tools", label: "Experience-Specific Tools" },
      { href: "/tools#course-planner", label: "Course Planner" },
    ],
  },
  {
    id: "year3",
    label: "Junior",
    subtitle: "Year 3 — Prepare",
    href: "/your-path?year=2#year-compass",
    recommendations: [
      { href: "/your-path?year=2#year-compass", label: "Year-by-Year Compass" },
      { href: "/milestones#mcat-planner", label: "MCAT prep timeline" },
      { href: "/tools#mcat-countdown", label: "MCAT Countdown" },
    ],
  },
  {
    id: "year4",
    label: "Senior / applying",
    subtitle: "Year 4 — Apply",
    href: "/your-path?year=3#year-compass",
    recommendations: [
      { href: "/milestones#timeline", label: "Application Timeline" },
      { href: "/tools#lor-tracker", label: "LOR Tracker" },
      { href: "/milestones#faq", label: "Pre-Med FAQ" },
    ],
  },
  {
    id: "gap",
    label: "Gap year",
    subtitle: "Strengthening before applying",
    href: "/milestones#timeline",
    recommendations: [
      { href: "/milestones#timeline", label: "Application Timeline" },
      { href: "/milestones#mcat-readiness", label: "MCAT readiness check" },
      { href: "/milestones#faq", label: "Pre-Med FAQ" },
    ],
  },
  {
    id: "exploring",
    label: "Still exploring",
    subtitle: "Figuring out if medicine fits",
    href: "/mindset#decision-tools",
    recommendations: [
      { href: "/mindset#decision-tools", label: "Decision Tools" },
      { href: "/your-path#experience-tools", label: "Experience-Specific Tools" },
      { href: "/burnout-check", label: "Burnout Self-Check" },
    ],
  },
]

export function getOnboardingOption(id: OnboardingYearId) {
  return onboardingOptions.find((o) => o.id === id)
}
