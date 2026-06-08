import { PageLayout } from "@/components/compass/page-layout"
import { Resources, SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "resources", label: "Resources" },
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

      <SiteFooter />
    </PageLayout>
  )
}
