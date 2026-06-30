/**
 * lib/seasonal.ts
 * "This week in pre-med" — a seasonal callout for the homepage.
 *
 * The active callout is chosen automatically by the current month, but you can
 * pin one manually by setting `SEASONAL_OVERRIDE` to a callout `id` (or null to
 * use auto). This makes it easy to surface, e.g., MCAT registration reminders in
 * spring or AMCAS reminders in summer.
 */

import type { LucideIcon } from "lucide-react"
import { CalendarClock, FileText, BookOpen, Snowflake, Sun, Sprout } from "lucide-react"

export type SeasonalCallout = {
  id: string
  /** Inclusive 1-based month range this callout is active for (auto mode) */
  months: number[]
  eyebrow: string
  title: string
  body: string
  icon: LucideIcon
  cta?: { label: string; href: string }
}

/** Set to a callout id to pin it, or null for automatic (month-based) selection. */
export const SEASONAL_OVERRIDE: string | null = null

export const seasonalCallouts: SeasonalCallout[] = [
  {
    id: "spring-mcat",
    months: [2, 3, 4], // Feb–Apr
    eyebrow: "This season in pre-med",
    title: "MCAT registration is open for summer test dates",
    body: "If you're testing in May–July, register now — popular dates and nearby test centers fill up fast. Lock your date before you build your final study plan.",
    icon: CalendarClock,
    cta: { label: "Plan your MCAT timeline", href: "/tools/plan-check#mcat-countdown" },
  },
  {
    id: "summer-amcas",
    months: [5, 6, 7], // May–Jul
    eyebrow: "This season in pre-med",
    title: "AMCAS is open — submit as early as you're ready",
    body: "Most schools use rolling admissions, so verified-and-submitted in early summer is a real advantage. Don't wait for a 'perfect' application in August.",
    icon: FileText,
    cta: { label: "See the application timeline", href: "/your-path#application-timeline" },
  },
  {
    id: "fall-secondaries",
    months: [8, 9, 10], // Aug–Oct
    eyebrow: "This season in pre-med",
    title: "Secondary season is here — turn them around fast",
    body: "Aim to return each secondary within two weeks. Pre-write the common prompts (challenge, diversity, why this school) so a flood of secondaries doesn't stall you.",
    icon: BookOpen,
    cta: { label: "Prep your essays", href: "/tools/application-prep" },
  },
  {
    id: "winter-reset",
    months: [11, 0, 1], // Nov, Dec, Jan
    eyebrow: "This season in pre-med",
    title: "Use winter break to reset, not just grind",
    body: "Finals are heavy and the new year invites pressure. Plan next semester's course load deliberately, then actually rest — a recovered student outperforms an exhausted one.",
    icon: Snowflake,
    cta: { label: "Check in on your wellbeing", href: "/tools/wellness-hours" },
  },
]

/** Pick the active callout based on override, then current month. */
export function getActiveSeasonalCallout(now: Date = new Date()): SeasonalCallout | null {
  if (SEASONAL_OVERRIDE) {
    return seasonalCallouts.find((c) => c.id === SEASONAL_OVERRIDE) ?? null
  }
  const month = now.getMonth() // 0-based
  return seasonalCallouts.find((c) => c.months.includes(month)) ?? seasonalCallouts[0] ?? null
}

export { Sun, Sprout }
