import { PageLayout } from "@/components/compass/page-layout"
import { Resources, SiteFooter } from "@/components/compass/resources"
import { sources } from "@/lib/content"
import { BookMarked, ExternalLink } from "lucide-react"

const navItems = [
  { id: "resources",   label: "Resources"  },
  { id: "references",  label: "References" },
]

export default function ResourcesPage() {
  return (
    <PageLayout title="Resources" eyebrow="Tools" navItems={navItems}>
      <section className="mx-auto w-full max-w-4xl px-5 md:px-8 mb-8">
        <div className="space-y-3 rounded-3xl border border-border bg-card p-6">
          <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Resources
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Helpful links and recommendations to support your pre-med journey.
          </p>
        </div>
      </section>

      <Resources />

      {/* References / Sources */}
      <section id="references" className="scroll-mt-20 border-b border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
          <header className="mb-8">
            <div className="flex items-center gap-3">
              <div className="rounded-xl bg-primary/10 p-2.5">
                <BookMarked className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Transparency</p>
                <h2 className="font-serif text-2xl font-semibold text-foreground">Sources & References</h2>
              </div>
            </div>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              The advice in this guide draws on AAMC data, peer-reviewed research, and Moravian-specific
              resources. Where possible, links go directly to the primary source. Always verify current
              requirements with your pre-health advisor — policies and statistics change year to year.
            </p>
          </header>

          <div className="space-y-10">
            {sources.map((group) => (
              <div key={group.category}>
                <h3 className="mb-3 font-serif text-lg font-semibold text-foreground border-b border-border pb-2">
                  {group.category}
                </h3>
                <ul className="space-y-3">
                  {group.sources.map((source) => (
                    <li key={source.title} className="group rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
                      <a
                        href={source.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-start gap-3"
                      >
                        <ExternalLink className="mt-0.5 h-4 w-4 shrink-0 text-primary opacity-60 group-hover:opacity-100 transition-opacity" aria-hidden="true" />
                        <div>
                          <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                            {source.title}
                          </p>
                          <p className="mt-0.5 text-xs text-muted-foreground">{source.author}</p>
                          <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{source.note}</p>
                        </div>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <SiteFooter />
    </PageLayout>
  )
}
