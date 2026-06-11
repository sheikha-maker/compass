import { SidebarNav } from "@/components/compass/sidebar-nav"
import { HeroClient } from "@/components/compass/hero-client"
import { OnboardingQuiz } from "@/components/compass/onboarding-quiz"
import { SectionCardsClient } from "@/components/compass/section-cards-client"
import { SiteFooter } from "@/components/compass/resources"
import { ProgressDashboard } from "@/app/tools/components/ProgressDashboard"
import { DeadlineAlerts } from "@/components/compass/deadline-alerts"
import Link from "next/link"
import { ClipboardList, FileText, CheckSquare, HeartPulse, Library } from "lucide-react"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main className="lg:pl-72">
        <HeroClient />
        <DeadlineAlerts />
        <OnboardingQuiz />
        <SectionCardsClient />
        {/* Progress Dashboard */}
        <div className="mx-auto max-w-4xl px-5 pt-10 md:px-8">
          <ProgressDashboard />
        </div>
        {/* Tools Overview Section */}
        <section id="tools-overview" className="mx-auto max-w-4xl px-5 py-14 md:px-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick access</p>
          <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
            Your essential tools
          </h2>
          <p className="mt-3 max-w-2xl text-muted-foreground">
            Plan your coursework, track your applications, and stay on top of your milestones and wellness.
          </p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <Link
              href="/tools/plan-check"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="rounded-xl bg-primary/10 p-2.5 transition-transform duration-200 group-hover:scale-110">
                <ClipboardList className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Plan & Check</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Prerequisite tracker, course planner, GPA calculator, and MCAT countdown.</p>
              </div>
            </Link>
            <Link
              href="/tools/application-prep"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="rounded-xl bg-primary/10 p-2.5 transition-transform duration-200 group-hover:scale-110">
                <FileText className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Application Prep</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Track applications, manage your school list, prep essays and interviews, and log LORs.</p>
              </div>
            </Link>
            <Link
              href="/tools/milestones"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="rounded-xl bg-primary/10 p-2.5 transition-transform duration-200 group-hover:scale-110">
                <CheckSquare className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Milestones</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Year-by-year checklist of key Moravian pre-med milestones to keep you on track.</p>
              </div>
            </Link>
            <Link
              href="/tools/wellness-hours"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
            >
              <div className="rounded-xl bg-primary/10 p-2.5 transition-transform duration-200 group-hover:scale-110">
                <HeartPulse className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Wellness & Hours</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Weekly wellness check-ins and activity logs to track clinical and volunteer hours.</p>
              </div>
            </Link>
            <Link
              href="/tools/resources"
              className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5 sm:col-span-2"
            >
              <div className="rounded-xl bg-primary/10 p-2.5 transition-transform duration-200 group-hover:scale-110">
                <Library className="h-5 w-5 text-primary" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-foreground">Resources</p>
                <p className="mt-0.5 text-sm text-muted-foreground">Curated links and recommendations to support every stage of your pre-med journey.</p>
              </div>
            </Link>
          </div>
        </section>
        <SiteFooter />
      </main>
    </div>
  )
}