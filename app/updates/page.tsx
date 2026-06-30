import type { Metadata } from "next"
import { PageLayout } from "@/components/compass/page-layout"
import { Section } from "@/components/compass/section"
import { ChangelogTimeline } from "@/components/compass/changelog-timeline"
import { changelog, latestUpdateLabel } from "@/lib/updates"

export const metadata: Metadata = {
  title: "Updates & Changelog · The Pre-Med Compass",
  description:
    "What's new in The Pre-Med Compass — recently added guides, tools, FAQs, and improvements. This resource grows over time.",
}

// Group entries by "Month Year" while preserving newest-first order.
function groupByMonth() {
  const groups: { key: string; label: string; entries: typeof changelog }[] = []
  for (const entry of changelog) {
    const label = new Date(entry.date + "T00:00:00").toLocaleDateString("en-US", {
      month: "long",
      year: "numeric",
    })
    const key = label.toLowerCase().replace(/\s+/g, "-")
    let group = groups.find((g) => g.key === key)
    if (!group) {
      group = { key, label, entries: [] }
      groups.push(group)
    }
    group.entries.push(entry)
  }
  return groups
}

export default function UpdatesPage() {
  const groups = groupByMonth()
  const navItems = groups.map((g) => ({ id: g.key, label: g.label }))

  return (
    <PageLayout
      title="Updates & Changelog"
      eyebrow="What's New"
      description={`A running log of everything that's been added or improved. Last update: ${latestUpdateLabel()}.`}
      navItems={navItems}
    >
      {groups.map((group, i) => (
        <Section
          key={group.key}
          id={group.key}
          eyebrow={i === 0 ? "Most recent" : undefined}
          title={group.label}
          spacious
        >
          <ChangelogTimeline entries={group.entries} />
        </Section>
      ))}
    </PageLayout>
  )
}
