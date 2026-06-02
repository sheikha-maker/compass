import Link from "next/link"
import { PageLayout } from "@/components/compass/page-layout"
import { CoursePlannerCalendar } from "./components/CoursePlannerCalendar"
import { PrereqTracker } from "./components/PrereqTracker"
import { MCATCountdown } from "./components/MCATCountdown"
import { ApplicationTracker } from "./components/ApplicationTracker"
import { SchoolList } from "./components/SchoolList"
import { EssayInterviewPrep } from "./components/EssayInterviewPrep"
import { YearlyChecklist } from "./components/YearlyChecklist"
import { LORTracker } from "./components/LORTracker"
import { WellnessCheckin } from "./components/WellnessCheckin"
import { ActivityLogs } from "@/components/compass/activity-logs"
import { Resources, SiteFooter } from "@/components/compass/resources"

const navItems = [
  { id: "planning", label: "Plan & Check" },
  { id: "mcat-countdown", label: "MCAT Countdown" },
  { id: "application-prep", label: "Application Prep" },
  { id: "yearly-checklist", label: "Moravian Milestones" },
  { id: "wellbeing", label: "Wellness & Hours" },
  { id: "resources", label: "Resources & Contribute" },
]

function RecommendedFlow() {
  return (
    <section className="mb-10 rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Suggested path</p>
          <h2 className="mt-2 text-2xl font-semibold text-foreground">A simple way to use the tools</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Start with planning, then cross-check prerequisites, track MCAT prep, and keep your wellbeing visible every week.
          </p>
        </div>
        <Link
          href="/tools#course-planner"
          className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Jump into the flow
        </Link>
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-4">
        <div className="rounded-2xl border border-border bg-background p-5">
          <p className="text-sm font-semibold text-foreground">Plan with confidence</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Use Course Planner, then validate your course choices in Prereq Tracker.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="#course-planner" className="block text-primary underline underline-offset-2">Course Planner</Link>
            <Link href="#prereq-tracker" className="block text-primary underline underline-offset-2">Prereq Tracker</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-5">
          <p className="text-sm font-semibold text-foreground">Prepare for the MCAT</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Track your target date, practice scores, and weekly study hours in one place.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="#mcat-countdown" className="block text-primary underline underline-offset-2">MCAT Countdown</Link>
            <Link href="/milestones#mcat" className="block text-primary underline underline-offset-2">MCAT Deep Dive</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-5">
          <p className="text-sm font-semibold text-foreground">Application prep</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Build your school list, track applications, and keep essays, interviews, and letters organized.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="#application-prep" className="block text-primary underline underline-offset-2">Jump to application prep</Link>
          </div>
        </div>
        <div className="rounded-2xl border border-border bg-background p-5">
          <p className="text-sm font-semibold text-foreground">Keep your wellbeing visible</p>
          <p className="mt-2 text-sm text-muted-foreground">
            Check in weekly and use a deeper Burnout Check when stress feels like too much.
          </p>
          <div className="mt-4 space-y-2 text-sm">
            <Link href="#wellness-checkin" className="block text-primary underline underline-offset-2">Weekly Check-in</Link>
            <Link href="/burnout-check" className="block text-primary underline underline-offset-2">Burnout Check</Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export default function ToolsPage() {
  return (
    <PageLayout title="Your Tools" eyebrow="Your Tools" navItems={navItems}>
      <RecommendedFlow />
      <div className="mb-8 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900 dark:border-amber-900/50 dark:bg-amber-950/20 dark:text-amber-200">
        <p>
          <strong>Browser storage only.</strong> Your data is saved locally and will be lost if you clear browser history or switch devices. Screenshot or copy your entries regularly.
        </p>
      </div>
      <section id="planning" className="scroll-mt-20 border-b border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
          <header className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Plan & check
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Plan your semesters and verify your courses against pre-med prerequisites in one workflow.
            </p>
          </header>
        </div>
      </section>

      <CoursePlannerCalendar />
      <PrereqTracker />
      <MCATCountdown />

      <section id="application-prep" className="scroll-mt-20 border-b border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
          <header className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Application Prep
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              A single place for your school list, application progress, essay drafts, interview prep, and recommendation planning.
            </p>
          </header>
        </div>
      </section>

      <ApplicationTracker />
      <SchoolList />
      <EssayInterviewPrep />
      <LORTracker />
      <YearlyChecklist />

      <section id="wellbeing" className="scroll-mt-20 border-b border-border py-14 md:py-20">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
          <header className="mb-8">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-accent">Your Tools</p>
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Wellness & Hours
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              Keep your wellbeing visible while logging the experiences that matter for your application.
            </p>
          </header>
        </div>
      </section>

      <WellnessCheckin />
      <ActivityLogs />
      <Resources />
      <SiteFooter />
    </PageLayout>
  )
}
