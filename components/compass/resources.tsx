import { ExternalLink, Mail, Compass } from "lucide-react"
import { usefulLinks, lastReviewed } from "@/lib/content"
import { Section } from "./section"

// Group links by category
const linkCategories = [
  "Moravian Resources",
  "Official Resources",
  "MCAT Prep",
  "School Research",
  "Clinical Opportunities",
  "Applications",
  "Wellbeing",
  "Study Tools",
  "Communities",
]

export function Resources() {
  const groupedLinks = linkCategories.map(category => ({
    category,
    links: usefulLinks.filter(link => link.category === category)
  })).filter(group => group.links.length > 0)

  return (
    <Section
      id="resources"
      eyebrow="Your Tools"
      title="Resources & Contribute"
      intro="Curated links to help you navigate the pre-med journey. Organized by what you need, when you need it."
    >
      <div className="space-y-8">
        {groupedLinks.map((group) => (
          <div key={group.category}>
            <h3 className="mb-3 font-serif text-lg font-medium text-foreground">{group.category}</h3>
            <div className="grid gap-3 sm:grid-cols-2">
              {group.links.map((link) => (
                <a
                  key={`${link.category}-${link.label}`}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-3 rounded-lg border border-border bg-card p-4 transition-colors hover:border-accent/50"
                >
                  <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                  <div>
                    <p className="font-medium text-foreground group-hover:text-accent">{link.label}</p>
                    <p className="mt-0.5 text-sm text-muted-foreground">{link.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 rounded-lg border border-primary/20 bg-primary/5 p-6">
        <h3 className="font-serif text-lg font-medium text-foreground">Want to contribute to this guide?</h3>
        <p className="mt-2 leading-relaxed text-muted-foreground">
          If you&apos;re a current or former Moravian pre-med and want to share something you wish you&apos;d known, reach out.
        </p>
        <a
          href="mailto:sheikha@moravian.edu"
          className="mt-4 inline-flex items-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Mail className="h-4 w-4" />
          sheikha@moravian.edu
        </a>
      </div>
    </Section>
  )
}

export function SiteFooter() {
  return (
    <footer className="bg-primary px-5 py-10 text-primary-foreground md:px-8">
      <div className="mx-auto flex max-w-3xl flex-col items-start gap-3">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5" aria-hidden="true" />
          <span className="font-serif text-lg font-semibold">The Pre-Med Compass</span>
        </div>
        <p className="text-sm leading-relaxed text-primary-foreground/70">
          A student-made guide for Moravian University pre-meds. Not affiliated with official advising, always confirm
          requirements with your pre-health advisor. Built with care, by Ayaan.
        </p>
        <p className="text-xs text-primary-foreground/50 mt-1">
          Last reviewed: {lastReviewed}
        </p>
      </div>
    </footer>
  )
}
