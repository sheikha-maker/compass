/**
 * lib/notion.ts
 * Fetches CMS content from Notion databases.
 * Falls back to static content in lib/content.ts if NOTION_API_KEY is absent or a request fails.
 * All fetches are tagged for Next.js ISR (revalidated every hour).
 */

import type { YearCompassItem } from './content'
import {
  faqs as fallbackFaqs,
  courseGuides as fallbackCourseGuides,
  yearCompass as fallbackYearCompass,
} from './content'

// ─── Config ──────────────────────────────────────────────────────────────────

const NOTION_VERSION = '2022-06-28'
const REVALIDATE_SECONDS = 3600 // 1 hour

const DB = {
  faqs:        '57f35a3f-7ad0-41c9-93b0-e21f12874b48',
  courseGuides: '59253998-69e3-46f1-99c5-72e40ef6434a',
  yearCompass:  'c3cfcb50-3ea2-4931-9bc7-3d0a8b5d7309',
} as const

// ─── Types ────────────────────────────────────────────────────────────────────

export type NotionFaq = { q: string; a: string; mistake?: string }
export type NotionCourseGuide = typeof fallbackCourseGuides[number]
export type NotionYearCompassItem = YearCompassItem

// ─── Helpers ──────────────────────────────────────────────────────────────────

function headers(): Record<string, string> {
  return {
    Authorization: `Bearer ${process.env.NOTION_API_KEY}`,
    'Notion-Version': NOTION_VERSION,
    'Content-Type': 'application/json',
  }
}

/** Extract plain text from a Notion title or rich_text property. */
function text(prop: { title?: { plain_text: string }[]; rich_text?: { plain_text: string }[] } | undefined): string {
  if (!prop) return ''
  const arr = prop.title ?? prop.rich_text ?? []
  return arr.map(r => r.plain_text).join('')
}

/** Split newline-delimited text into a trimmed, non-empty string array. */
function lines(raw: string): string[] {
  return raw.split('\n').map(s => s.trim()).filter(Boolean)
}

/** Query a Notion database, filtering to Published rows sorted by Order. */
async function queryDatabase(dbId: string): Promise<NotionPage[]> {
  const res = await fetch(`https://api.notion.com/v1/databases/${dbId}/query`, {
    method: 'POST',
    headers: headers(),
    body: JSON.stringify({
      filter: { property: 'Published', checkbox: { equals: true } },
      sorts: [{ property: 'Order', direction: 'ascending' }],
    }),
    next: { revalidate: REVALIDATE_SECONDS },
  })

  if (!res.ok) {
    throw new Error(`Notion query failed for ${dbId}: HTTP ${res.status}`)
  }

  const data = await res.json() as { results: NotionPage[] }
  return data.results
}

// ─── Public fetch functions ───────────────────────────────────────────────────

export async function getFaqs(): Promise<NotionFaq[]> {
  if (!process.env.NOTION_API_KEY) return fallbackFaqs

  try {
    const pages = await queryDatabase(DB.faqs)
    return pages.map(p => {
      const props = p.properties
      const mistake = text(props['Common Mistake'])
      return {
        q: text(props['Question']),
        a: text(props['Answer']),
        ...(mistake ? { mistake } : {}),
      }
    })
  } catch (err) {
    console.error('[notion] getFaqs failed — using static fallback:', err)
    return fallbackFaqs
  }
}

export async function getCourseGuides(): Promise<NotionCourseGuide[]> {
  if (!process.env.NOTION_API_KEY) return fallbackCourseGuides

  try {
    const pages = await queryDatabase(DB.courseGuides)
    return pages.map(p => {
      const props = p.properties
      return {
        course:       text(props['Course']),
        strategy:     text(props['Strategy']),
        survival:     text(props['Survival Tip']),
        moravianTips: lines(text(props['Moravian Tips'])),
      }
    })
  } catch (err) {
    console.error('[notion] getCourseGuides failed — using static fallback:', err)
    return fallbackCourseGuides
  }
}

export async function getYearCompass(): Promise<NotionYearCompassItem[]> {
  if (!process.env.NOTION_API_KEY) return fallbackYearCompass

  try {
    const pages = await queryDatabase(DB.yearCompass)
    return pages.map(p => {
      const props = p.properties
      const summerHeading = text(props['Summer Heading'])
      const summerItems   = lines(text(props['Summer Items']))
      return {
        year:   text(props['Year']),
        theme:  text(props['Theme']),
        focus:  lines(text(props['Focus'])),
        avoid:  text(props['Avoid']),
        ...(summerHeading ? { summer: { heading: summerHeading, items: summerItems } } : {}),
      } satisfies YearCompassItem
    })
  } catch (err) {
    console.error('[notion] getYearCompass failed — using static fallback:', err)
    return fallbackYearCompass
  }
}

// ─── Content freshness ─────────────────────────────────────────────────────────

import { lastReviewed } from './content'

export type ContentArea = 'faqs' | 'courseGuides' | 'yearCompass'

/** Format an ISO timestamp as e.g. "June 2026". */
function freshnessLabel(iso: string): string {
  return new Date(iso).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })
}

/** Most recent `last_edited_time` across a database's published rows. */
async function latestEdit(dbId: string): Promise<string | null> {
  const pages = await queryDatabase(dbId)
  const times = pages
    .map(p => p.last_edited_time)
    .filter((t): t is string => Boolean(t))
    .sort()
  const newest = times[times.length - 1]
  return newest ? freshnessLabel(newest) : null
}

/**
 * Returns a display label of when each content area was last updated.
 * Pulls from Notion's `last_edited_time` when available; otherwise falls back
 * to the static `lastReviewed` label so the UI always has something honest.
 */
export async function getContentFreshness(): Promise<Record<ContentArea, string>> {
  const fallback: Record<ContentArea, string> = {
    faqs: lastReviewed,
    courseGuides: lastReviewed,
    yearCompass: lastReviewed,
  }
  if (!process.env.NOTION_API_KEY) return fallback

  try {
    const [faqs, courseGuides, yearCompass] = await Promise.all([
      latestEdit(DB.faqs),
      latestEdit(DB.courseGuides),
      latestEdit(DB.yearCompass),
    ])
    return {
      faqs: faqs ?? fallback.faqs,
      courseGuides: courseGuides ?? fallback.courseGuides,
      yearCompass: yearCompass ?? fallback.yearCompass,
    }
  } catch (err) {
    console.error('[notion] getContentFreshness failed — using static fallback:', err)
    return fallback
  }
}

// ─── Internal Notion API types ────────────────────────────────────────────────

type NotionPage = {
  last_edited_time?: string
  properties: Record<string, {
    title?:      { plain_text: string }[]
    rich_text?:  { plain_text: string }[]
    number?:     number
    checkbox?:   boolean
  }>
}
