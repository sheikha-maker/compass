/**
 * lib/spotlights.ts
 * "Where are they now" — short profiles of past Moravian pre-meds.
 *
 * These are composite/illustrative profiles to seed the UI. Replace or extend
 * with real (consented) student outcomes — this is structured so it can later
 * be sourced from a Notion "Spotlights" database without UI changes.
 */

export type StudentSpotlight = {
  /** Display name or initials */
  name: string
  /** Moravian grad year, e.g. "Class of 2023" */
  gradYear: string
  /** Major(s) at Moravian */
  major: string
  /** Where they are now — the headline outcome */
  now: string
  /** A short, honest quote about their path */
  quote: string
  /** One concrete piece of advice */
  advice: string
  /** Optional path tag for color accenting */
  track?: "MD" | "DO" | "Gap Year" | "Research" | "Other"
}

export const studentSpotlights: StudentSpotlight[] = [
  {
    name: "Maya R.",
    gradYear: "Class of 2022",
    major: "Neuroscience",
    now: "MD candidate, Sidney Kimmel Medical College",
    quote:
      "I almost didn't apply because my GPA dipped sophomore year. The recovery — and being honest about it — ended up being part of my story.",
    advice: "Protect your freshman GPA, but know that an upward trend is a real, valued narrative.",
    track: "MD",
  },
  {
    name: "Daniel K.",
    gradYear: "Class of 2021",
    major: "Biology",
    now: "Took two gap years — clinical research coordinator, now MD/PhD track",
    quote:
      "The gap years weren't 'behind.' They were where I figured out I actually loved the research side of medicine.",
    advice: "If you're unsure, a purposeful gap year almost always strengthens your application.",
    track: "Gap Year",
  },
  {
    name: "Aisha T.",
    gradYear: "Class of 2023",
    major: "Biochemistry",
    now: "DO candidate, PCOM",
    quote:
      "Shadowing a DO changed everything for me. Don't tunnel-vision on MD before you've actually seen the day-to-day.",
    advice: "Shadow across specialties — and across MD and DO — before you decide what 'success' looks like.",
    track: "DO",
  },
]
