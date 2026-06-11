import { BurnoutCheck } from "@/components/compass/burnout-check"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { SiteFooter } from "@/components/compass/resources"
import { Activity, BookOpen, HeartPulse, MessageCircle } from "lucide-react"
import Link from "next/link"

const signsList = [
  "Studying but nothing sticking, even after hours",
  "Feeling irritable, flat, or detached from things you usually enjoy",
  "Losing sight of why you wanted medicine in the first place",
  "Sleep and food feeling like luxuries instead of basics",
  "Dreading the week before it's even started",
]

const betweenCheckins = [
  {
    icon: HeartPulse,
    title: "Log your weekly wellness",
    desc: "The Wellness & Hours tool tracks your energy and stress over time so you can spot patterns before they become problems.",
    href: "/tools/wellness-hours",
  },
  {
    icon: BookOpen,
    title: "Read the Mindset section",
    desc: "Practical frameworks for handling comparison, building sustainable habits, and staying connected to your why.",
    href: "/mindset",
  },
  {
    icon: MessageCircle,
    title: "Talk to someone",
    desc: "Moravian Counseling Services is free and confidential for all students. You don't need to be in crisis to use it.",
    href: "https://www.moravian.edu/counseling",
    external: true,
  },
  {
    icon: Activity,
    title: "Check your course load",
    desc: "The Plan & Check tool has a prerequisite tracker and course planner. Sometimes burnout is a scheduling problem.",
    href: "/tools/plan-check",
  },
]

export default function BurnoutCheckPage() {
  return (
    <div className="min-h-screen bg-background">
      <SidebarNav />

      <main id="main-content" className="lg:pl-72">
        {/* Page hero */}
        <div className="border-b border-border bg-card">
          <div className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-16">
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Your Wellbeing</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">
              Burnout Check
            </h1>
            <p className="mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              Five honest questions that give you a reflection score and next-step guidance — not a diagnosis.
              Pre-med burnout often shows up quietly before it feels overwhelming. This check-in helps you catch it early.
            </p>

            {/* Signs callout */}
            <div className="mt-8 rounded-xl border border-border bg-background p-5">
              <p className="text-sm font-semibold text-foreground">Signs worth paying attention to</p>
              <ul className="mt-3 space-y-2">
                {signsList.map((sign) => (
                  <li key={sign} className="flex items-start gap-2.5 text-sm text-muted-foreground">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                    {sign}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-xs text-muted-foreground">
                If several of these feel familiar, take the check-in below. Then look at the resources at the bottom of your result.
              </p>
            </div>
          </div>
        </div>

        {/* The check-in itself */}
        <BurnoutCheck />

        {/* Between check-ins */}
        <section className="border-b border-border py-14 md:py-20">
          <div className="mx-auto max-w-3xl px-5 md:px-8">
            <p className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">In the meantime</p>
            <h2 className="mt-2 font-serif text-2xl font-semibold text-foreground">
              What to do between check-ins
            </h2>
            <p className="mt-3 text-muted-foreground">
              A check-in is most useful when it connects to something actionable. Here's where to go next.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {betweenCheckins.map((item) => {
                const Icon = item.icon
                const Wrapper = item.external ? "a" : Link
                const extraProps = item.external
                  ? { href: item.href, target: "_blank", rel: "noopener noreferrer" }
                  : { href: item.href }
                return (
                  <Wrapper
                    key={item.title}
                    {...extraProps}
                    className="group flex items-start gap-4 rounded-2xl border border-border bg-card p-5 transition-all duration-200 hover:border-primary/50 hover:shadow-lg hover:-translate-y-0.5"
                  >
                    <div className="rounded-xl bg-primary/10 p-2.5 transition-transform duration-200 group-hover:scale-110">
                      <Icon className="h-4 w-4 text-primary" aria-hidden="true" />
                    </div>
                    <div>
                      <p className="font-semibold text-foreground">{item.title}</p>
                      <p className="mt-1 text-sm text-muted-foreground">{item.desc}</p>
                    </div>
                  </Wrapper>
                )
              })}
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>
    </div>
  )
}
