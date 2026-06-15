import { SidebarNav } from "@/components/compass/sidebar-nav"
import { HeroClient } from "@/components/compass/hero-client"
import { OnboardingQuiz } from "@/components/compass/onboarding-quiz"
import { SectionCardsClient } from "@/components/compass/section-cards-client"
import { SiteFooter } from "@/components/compass/resources"
import { ProgressDashboard } from "@/app/tools/components/ProgressDashboard"
import { DeadlineAlerts } from "@/components/compass/deadline-alerts"
import { Reveal } from "@/components/compass/reveal"
import { TiltCard } from "@/components/compass/tilt-card"
import { McatHomepageBanner } from "@/components/compass/mcat-homepage-banner"
import { StatsBar } from "@/components/compass/stats-bar"
import { YearSpotlight } from "@/components/compass/year-spotlight"
import Link from "next/link"
import { ClipboardList, FileText, CheckSquare, HeartPulse, Library } from "lucide-react"

const tools = [
  { href: "/tools/plan-check",        icon: ClipboardList, label: "Plan & Check",      desc: "Prerequisite tracker, course planner, GPA calculator, and MCAT countdown."             },
  { href: "/tools/application-prep",  icon: FileText,      label: "Application Prep",  desc: "Track applications, manage your school list, prep essays and interviews, and log LORs." },
  { href: "/tools/milestones",        icon: CheckSquare,   label: "Milestones",         desc: "Year-by-year checklist of key Moravian pre-med milestones to keep you on track."       },
  { href: "/tools/wellness-hours",    icon: HeartPulse,    label: "Wellness & Hours",   desc: "Weekly wellness check-ins and activity logs to track clinical and volunteer hours."    },
  { href: "/tools/resources",         icon: Library,       label: "Resources",          desc: "Curated links and recommendations to support every stage of your pre-med journey.", span: true },
]

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />
      <main id="main-content" className="lg:pl-72">
        <HeroClient />
        <McatHomepageBanner />

        {/* Deadline alerts */}
        <DeadlineAlerts />

        {/* Onboarding */}
        <OnboardingQuiz />

        {/* Year-aware spotlight */}
        <YearSpotlight />

        {/* Section cards */}
        <SectionCardsClient />

        {/* Stats bar */}
        <StatsBar />

        {/* Progress dashboard */}
        <Reveal delay={0} className="mx-auto max-w-4xl px-5 pt-10 md:px-8">
          <ProgressDashboard />
        </Reveal>

        {/* Tools Overview */}
        <section id="tools-overview" className="mx-auto max-w-4xl px-5 py-14 md:px-8">
          <Reveal>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Quick access</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground md:text-3xl">
              Your essential tools
            </h2>
            <p className="mt-3 max-w-2xl text-muted-foreground">
              Plan your coursework, track your applications, and stay on top of your milestones and wellness.
            </p>
          </Reveal>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {tools.map((tool, i) => {
              const Icon = tool.icon
              return (
                <Reveal key={tool.href} delay={i * 80} className={tool.span ? "sm:col-span-2" : ""}>
                  <TiltCard className="rounded-2xl h-full" intensity={5}>
                    <Link
                      href={tool.href}
                      className="group flex h-full items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg"
                    >
                      <div className="icon-bounce rounded-xl bg-primary/10 p-2.5">
                        <Icon className="h-5 w-5 text-primary" aria-hidden="true" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{tool.label}</p>
                        <p className="mt-0.5 text-sm text-muted-foreground">{tool.desc}</p>
                      </div>
                    </Link>
                  </TiltCard>
                </Reveal>
              )
            })}
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
