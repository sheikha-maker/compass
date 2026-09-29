import { PageLayout } from "@/components/compass/page-layout"
import { ApplicationTracker } from "../components/ApplicationTracker"
import { SchoolList } from "../components/SchoolList"
import { EssayInterviewPrep } from "../components/EssayInterviewPrep"
import { StorageWarning } from "@/components/compass/storage-warning"
import { SiteFooter } from "@/components/compass/resources"
import { pageMetadata } from "@/lib/seo"

// Sign-in required (see middleware.ts) — noindex so crawlers don't log soft-404s.
export const metadata = pageMetadata({
  title: "Application Prep",
  description:
    "Organize your medical school applications, build a thoughtful school list, and prepare stronger essays and interviews with less last-minute scrambling.",
  path: "/tools/application-prep",
  noindex: true,
})

const navItems = [
  { id: "application-tracker", label: "Application Tracker" },
  { id: "school-list", label: "School List" },
  { id: "essay-interview-prep", label: "Essays & Interviews" },
]

export default function ApplicationPrepPage() {
  return (
    <PageLayout title="Application Prep" eyebrow="Tools" navItems={navItems}>
      <div className="mx-auto w-full max-w-4xl px-5 md:px-8 mt-8">
        <StorageWarning />
      </div>
      <section className="mx-auto w-full max-w-4xl px-5 pt-8 md:px-8" aria-labelledby="application-costs">
        <div className="rounded-2xl border border-border bg-card p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">Plan the investment</p>
          <h2 id="application-costs" className="mt-2 font-serif text-2xl font-semibold text-foreground">Budget for the application cycle</h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">The application is more than one fee. Use these ranges as a planning conversation with your advisor, then confirm current prices with each official program.</p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            <div className="rounded-xl bg-muted/50 p-4"><p className="font-semibold text-foreground">AMCAS primary</p><p className="mt-1 text-sm text-muted-foreground">Budget for the base fee plus an additional charge for each school after the first.</p></div>
            <div className="rounded-xl bg-muted/50 p-4"><p className="font-semibold text-foreground">Secondary applications</p><p className="mt-1 text-sm text-muted-foreground">Often about $75–$150 per school, with fee waivers varying by program.</p></div>
            <div className="rounded-xl bg-muted/50 p-4"><p className="font-semibold text-foreground">Tests and services</p><p className="mt-1 text-sm text-muted-foreground">Set aside money for MCAT registration, CASPer or other program-specific assessments.</p></div>
            <div className="rounded-xl bg-muted/50 p-4"><p className="font-semibold text-foreground">Travel and time</p><p className="mt-1 text-sm text-muted-foreground">Interviews may add transportation, lodging, meals, and time away from work or class.</p></div>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-muted-foreground">If cost is a barrier, check the <a className="font-medium text-primary underline underline-offset-4" href="https://students-residents.aamc.org/applying-medical-school/applying-medical-school" target="_blank" rel="noreferrer">AAMC Fee Assistance Program</a> early. Recheck every amount before submitting an application.</p>
        </div>
      </section>
      <ApplicationTracker />
      <SchoolList />
      <EssayInterviewPrep />
      <section className="mx-auto w-full max-w-4xl px-5 pb-12 md:px-8" aria-labelledby="application-next-step">
        <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-primary">A calmer application workflow</p>
          <h2 id="application-next-step" className="mt-2 font-serif text-2xl font-semibold text-foreground">
            Turn preparation into a weekly habit
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            Start with a focused school list, keep one living draft of your personal story, and practice explaining your experiences out loud. Revisit this page with your advisor as your list and essays take shape.
          </p>
          <div className="mt-5 flex flex-wrap gap-3 text-sm font-medium text-foreground">
            <a href="#school-list" className="rounded-full border border-border bg-background px-4 py-2 transition-colors hover:border-primary hover:text-primary">Review your school list</a>
            <a href="#essay-interview-prep" className="rounded-full border border-border bg-background px-4 py-2 transition-colors hover:border-primary hover:text-primary">Practice your story</a>
          </div>
        </div>
      </section>
      <SiteFooter />
    </PageLayout>
  )
}
