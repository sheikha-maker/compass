/** Shared MCAT constants used by tools and milestone content. */

export const MCAT_STORAGE_KEY = "pmc_mcat_v1"
export const MCAT_READINESS_KEY = "pmc_mcat_readiness_v1"
export const MCAT_PLANNER_KEY = "pmc_mcat_planner_v1"

export type McatSectionId = "cp" | "cars" | "bb" | "ps"

export const MCAT_SECTIONS = [
  {
    id: "cp" as const,
    short: "C/P",
    name: "Chemical & Physical Foundations",
    questions: 59,
    minutes: 95,
    color: "bg-blue-500",
    border: "border-blue-500/30",
    bg: "bg-blue-500/10",
    text: "text-blue-700 dark:text-blue-300",
    disciplines: "Gen chem, organic chem, physics, biochem",
  },
  {
    id: "cars" as const,
    short: "CARS",
    name: "Critical Analysis & Reasoning",
    questions: 53,
    minutes: 90,
    color: "bg-teal-500",
    border: "border-teal-500/30",
    bg: "bg-teal-500/10",
    text: "text-teal-700 dark:text-teal-300",
    disciplines: "Humanities & social sciences passages",
  },
  {
    id: "bb" as const,
    short: "B/B",
    name: "Biological & Biochemical Foundations",
    questions: 59,
    minutes: 95,
    color: "bg-violet-500",
    border: "border-violet-500/30",
    bg: "bg-violet-500/10",
    text: "text-violet-700 dark:text-violet-300",
    disciplines: "Biology, biochem, organ systems",
  },
  {
    id: "ps" as const,
    short: "P/S",
    name: "Psychological, Social & Biological Foundations",
    questions: 59,
    minutes: 95,
    color: "bg-amber-500",
    border: "border-amber-500/30",
    bg: "bg-amber-500/10",
    text: "text-amber-700 dark:text-amber-300",
    disciplines: "Psychology, sociology, behavior",
  },
] as const

export const MCAT_EXAM_STATS = {
  totalQuestions: 230,
  scoredQuestions: 230,
  totalMinutes: 375,
  sectionRange: "118–132 per section",
  totalRange: "472–528 total",
  breaks: "Optional breaks between sections; plan stamina like test day.",
}

export const MCAT_SCORE_BANDS = [
  { min: 472, max: 495, label: "Below average", note: "Often signals content gaps or timing issues, a focused retake plan can help." },
  { min: 496, max: 504, label: "Around average", note: "Competitive for some DO programs; MD may need improvement or strong holistic factors." },
  { min: 505, max: 508, label: "Competitive", note: "Solid for many MD programs when paired with strong GPA and experiences." },
  { min: 509, max: 512, label: "Strong", note: "Opens more MD options; still research fit with MSAR, not just the number." },
  { min: 513, max: 528, label: "Very strong", note: "Top-tier range, but schools still care about fit, character, and consistency." },
]

export function daysUntil(dateStr: string): number {
  const target = new Date(dateStr)
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  return Math.ceil((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

export function weeksUntil(dateStr: string): number {
  const days = daysUntil(dateStr)
  return days > 0 ? Math.ceil(days / 7) : 0
}

export type PrepPhaseId = "content" | "practice" | "full-length"

export function buildPrepPhases(totalWeeks: number) {
  const contentWeeks = Math.max(4, Math.round(totalWeeks * 0.35))
  const flWeeks = Math.max(3, Math.round(totalWeeks * 0.25))
  const practiceWeeks = Math.max(2, totalWeeks - contentWeeks - flWeeks)
  return [
    { id: "content" as const, label: "Content review", weeks: contentWeeks, hoursPerWeek: "15–20", focus: "Active recall, flashcards, content outlines" },
    { id: "practice" as const, label: "Practice & passages", weeks: practiceWeeks, hoursPerWeek: "20–25", focus: "UWorld/AAMC Qs, timed passages, error logs" },
    { id: "full-length" as const, label: "Full-length tests", weeks: flWeeks, hoursPerWeek: "25–30", focus: "AAMC FLs under real conditions, deep review" },
  ]
}

export function currentPhaseFromWeeks(weeksRemaining: number, totalWeeks: number): PrepPhaseId {
  if (totalWeeks <= 0 || weeksRemaining <= 0) return "full-length"
  const elapsed = totalWeeks - weeksRemaining
  const phases = buildPrepPhases(totalWeeks)
  let cursor = 0
  for (const p of phases) {
    cursor += p.weeks
    if (elapsed < cursor) return p.id
  }
  return "full-length"
}
