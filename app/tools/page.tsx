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
  { id: "application-prep", label: "Application Prep" },
  { id: "milestones", label: "Milestones" },
  { id: "wellbeing", label: "Wellness & Hours" },
  { id: "resources", label: "Resources" },
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
          href="/tools#planning"
          className="inline-flex items-center justify-center rounded-full border border-border bg-background px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:border-primary hover:text-primary"
        >
          Jump into the flow
        </Link>
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[260px_minmax(0,1fr)]">
        <div className="rounded-3xl border border-border bg-background p-5">
          <p className="text-xs uppercase tracking-[0.24em] text-muted-foreground">Quick jump</p>
          <div className="mt-4 space-y-3">
            <Link
              href="#planning"
              className="block rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              Plan & Check
            </Link>
            <Link
              href="#application-prep"
              className="block rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              Application Prep
            </Link>
            <Link
              href="#milestones"
              className="block rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              Milestones
            </Link>
            <Link
              href="#wellbeing"
              className="block rounded-2xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary"
            >
              Wellness & Hours
            </Link>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-2">
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">Plan with confidence</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Schedule semesters, validate prerequisites, and keep MCAT planning in one clean workflow.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">Prepare for the MCAT</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Track your target test date, practice pacing, and weekly prep hours without extra clutter.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">Application prep</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Keep school choices, deadlines, essays, interviews, and recommendations organized in one place.
            </p>
          </div>
          <div className="rounded-2xl border border-border bg-background p-5">
            <p className="text-sm font-semibold text-foreground">Keep your wellbeing visible</p>
            <p className="mt-2 text-sm text-muted-foreground">
              Track weekly check-ins and stay ahead of burnout before it becomes a surprise.
            </p>
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
      <section className="mb-10 rounded-3xl border border-border bg-card p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">Tools overview</p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">Jump to the tools you need</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Access Plan & Check, Application Prep, Milestones, Wellness & Hours, and Resources from the top level.
            </p>
          </div>
        </div>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          <Link href="#planning" className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
            Plan & Check
          </Link>
          <Link href="#application-prep" className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
            Application Prep
          </Link>
          <Link href="#milestones" className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
            Milestones
          </Link>
          <Link href="#wellbeing" className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
            Wellness & Hours
          </Link>
          <Link href="#resources" className="rounded-2xl border border-border bg-background px-4 py-4 text-sm font-medium text-foreground transition hover:border-primary hover:text-primary">
            Resources
          </Link>
        </div>
      </section>
      <section id="planning" className="scroll-mt-20 border-b border-border py-10 md:py-14">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
          <div className="mb-8 space-y-3 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Plan & check
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Map semesters, checkpoints, and MCAT prep together without extra noise.
            </p>
          </div>
        </div>
      </section>

      <CoursePlannerCalendar />
      <PrereqTracker />
      <MCATCountdown />

      <section id="application-prep" className="scroll-mt-20 border-b border-border py-10 md:py-14">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
          <div className="mb-8 space-y-3 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Application Prep
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Keep your school list, essays, interviews, and letters in one tidy workflow.
            </p>
          </div>
        </div>
      </section>

      <ApplicationTracker />
      <SchoolList />
      <EssayInterviewPrep />
      <LORTracker />

      <section id="milestones" className="scroll-mt-20 border-b border-border py-10 md:py-14">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
          <div className="mb-8 space-y-3 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Milestones
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Keep your longer-term planning visible with key Moravian pre-med milestones and checkpoints.
            </p>
          </div>
        </div>
      </section>

      <YearlyChecklist />

      <section id="wellbeing" className="scroll-mt-20 border-b border-border py-10 md:py-14">
        <div className="mx-auto w-full max-w-4xl px-5 md:px-8">
          <div className="mb-8 space-y-3 rounded-3xl border border-border bg-card p-6">
            <h2 className="text-balance font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Wellness & Hours
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Track your weekly check-ins and activity hours without distractions.
            </p>
          </div>
        </div>
      </section>

      <WellnessCheckin />
      <ActivityLogs />
      <Resources />
      <SiteFooter />
    </PageLayout>
  )
}
