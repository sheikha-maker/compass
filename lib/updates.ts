/**
 * lib/updates.ts
 * The changelog / "What's new" feed for The Pre-Med Compass.
 *
 * This is the source of truth for the /updates page and the homepage
 * "What's new" strip. Add a new entry at the TOP of `changelog` whenever
 * content or tools change — it keeps the site visibly alive and maintained.
 *
 * Entries are intentionally plain data so they can later be mirrored from a
 * Notion "Changelog" database without touching the UI.
 */

export type ChangeType = "new" | "updated" | "fix"

export type ChangelogEntry = {
  /** ISO date (YYYY-MM-DD) — used for sorting and display */
  date: string
  type: ChangeType
  title: string
  description: string
  /** Optional deep link to the relevant page/section */
  href?: string
  /** Short tag, e.g. "FAQ", "Course Guides", "Tools" */
  area?: string
}

export const changelog: ChangelogEntry[] = [
  {
    date: "2026-06-20",
    type: "new",
    title: "Student spotlights are here",
    description:
      "Added a 'Where are they now' section featuring past Moravian pre-meds and where their paths led — from MD programs to gap-year research.",
    href: "/#student-spotlight",
    area: "Community",
  },
  {
    date: "2026-06-18",
    type: "new",
    title: "Seasonal pre-med reminders",
    description:
      "The homepage now surfaces a 'This week in pre-med' callout that shifts with the season — MCAT registration in spring, AMCAS reminders in summer, and more.",
    href: "/",
    area: "Homepage",
  },
  {
    date: "2026-06-12",
    type: "updated",
    title: "Expanded Course Survival Guides",
    description:
      "Added an Anatomy & Physiology guide and refreshed Moravian-specific tips for Organic Chemistry and Biochemistry based on recent student feedback.",
    href: "/your-path#course-guides",
    area: "Course Guides",
  },
  {
    date: "2026-06-05",
    type: "updated",
    title: "Year-by-Year Compass refresh",
    description:
      "Reviewed every year's focus list, summer plans, and advisor topics for the 2026–2027 cycle.",
    href: "/your-path#year-compass",
    area: "Your Path",
  },
  {
    date: "2026-05-28",
    type: "new",
    title: "Burnout check-in tool",
    description:
      "A private, on-device burnout self-check to help you notice when it's time to step back and recover.",
    href: "/burnout-check",
    area: "Wellbeing",
  },
  {
    date: "2026-05-20",
    type: "new",
    title: "Pre-Med FAQ added",
    description:
      "Honest answers to the questions Moravian pre-meds ask most — gap years, GPA, research timing, and more.",
    href: "/milestones#faq",
    area: "FAQ",
  },
]

/** The single most recent change date, formatted for display (e.g. "June 2026"). */
export function latestUpdateLabel(): string {
  const latest = changelog[0]?.date
  if (!latest) return "Summer 2026"
  return new Date(latest + "T00:00:00").toLocaleDateString("en-US", { month: "long", year: "numeric" })
}

/** Format an ISO date for display, e.g. "Jun 20, 2026". */
export function formatChangeDate(iso: string): string {
  return new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  })
}

/** Is this entry recent enough to flag with a pulse? (within ~45 days of newest entry) */
export function isRecent(iso: string): boolean {
  const newest = changelog[0]?.date
  if (!newest) return false
  const diff = new Date(newest + "T00:00:00").getTime() - new Date(iso + "T00:00:00").getTime()
  return diff <= 45 * 24 * 60 * 60 * 1000
}
