import dynamic from "next/dynamic"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { OnboardingQuiz } from "@/components/compass/onboarding-quiz"
import { SectionCards } from "@/components/compass/section-cards"
import { SiteFooter } from "@/components/compass/resources"
import Link from "next/link"

const Hero = dynamic(
  () => import("@/components/compass/hero").then((m) => ({ default: m.Hero })),
  { ssr: false, loading: () => <div className="h-[480px] bg-primary" /> }
)

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <Hero />
        <OnboardingQuiz />
        <SectionCards />
        {/* Tools Overview Section */}
        <section className="mx-auto max-w-4xl px-5 py-14 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick access</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Your essential tools
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Plan your coursework, track your applications, and stay on top of your milestones and wellness.
          </p>
          <div className="mt-6 grid gap-3 sm:grid-cols-2 xl:grid-cols-5">
            <Link href="/tools/plan-check" className="rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary hover:shadow-md">Plan & Check</Link>
            <Link href="/tools/application-prep" className="rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary hover:shadow-md">Application Prep</Link>
            <Link href="/tools/milestones" className="rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary hover:shadow-md">Milestones</Link>
            <Link href="/tools/wellness-hours" className="rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary hover:shadow-md">Wellness & Hours</Link>
            <Link href="/tools/resources" className="rounded-2xl border border-border bg-card px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary hover:shadow-md">Resources</Link>
          </div>
        </section>
        <SiteFooter />
      </main>
    </div>
  )
}