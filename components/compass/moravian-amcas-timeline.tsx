import { ExternalLink, AlertTriangle } from "lucide-react"

type TimelineEvent = {
  date: string
  label: string
  detail: string
  type: "moravian" | "amcas" | "warning" | "deadline"
}

const TIMELINE: TimelineEvent[] = [
  {
    date: "Jan – Mar 2028",
    label: "Write your personal statement & activity descriptions",
    detail: "Spring semester is already heavy (Physics II + Biochem + heavy MCAT prep). Do not wait until after finals — draft now, polish later.",
    type: "warning",
  },
  {
    date: "Early May 2028",
    label: "AMCAS opens for account creation",
    detail: "Set up your account, verify your courses, and start entering activity descriptions. Your Moravian transcript must be requested from the Registrar.",
    type: "amcas",
  },
  {
    date: "~May 1–8, 2028",
    label: "Moravian finals + commencement",
    detail: "Spring semester ends May 1. Finals run through May 6. Commencement is May 8. Plan your MCAT date to clear finals week.",
    type: "moravian",
  },
  {
    date: "May – June 2028",
    label: "Take the MCAT",
    detail: "Your target window. Scores release in ~2–3 weeks. Submit AMCAS immediately after you're confident in your score.",
    type: "amcas",
  },
  {
    date: "Late May 2028",
    label: "AMCAS submissions open — submit Day 1",
    detail: "Most schools use rolling admissions. Applying on Day 1 vs. 6 weeks later is one of the most actionable things you can do. Every week of delay has a measurable effect at rolling schools.",
    type: "deadline",
  },
  {
    date: "June 1, 2028",
    label: "True 'early' deadline",
    detail: "Verified and transmitted by June 1 puts you in the first wave at rolling-admissions schools. This is the real target date, not the school-listed deadline.",
    type: "deadline",
  },
  {
    date: "Jun – Aug 2028",
    label: "Secondary essays arrive",
    detail: "Most schools auto-send secondaries once your AMCAS is verified. Respond within 2 weeks per school. Pre-write common secondaries (challenge, diversity, why this school) in advance.",
    type: "amcas",
  },
  {
    date: "Aug – Oct 2028",
    label: "Interview invitations (rolling)",
    detail: "Most MD schools send interview invites August through November. Accept and schedule as soon as possible — do not delay.",
    type: "amcas",
  },
  {
    date: "Fall 2028",
    label: "Senior year begins",
    detail: "You'll be interviewing while taking senior coursework. Build this into your schedule — interview travel is disruptive but non-negotiable.",
    type: "moravian",
  },
  {
    date: "Mar 15, 2029",
    label: "MSPE (Dean's Letter) deadline",
    detail: "Moravian submits Medical Student Performance Evaluations in October of your application year. Confirm the process with your pre-health advisor.",
    type: "moravian",
  },
  {
    date: "Spring 2029",
    label: "Acceptance decisions",
    detail: "Most schools notify by April 30 (AAMC deadline). You'll hold your spot with a deposit. Final decision by April 30.",
    type: "amcas",
  },
]

const TYPE_STYLES = {
  moravian: {
    dot: "bg-blue-500",
    badge: "bg-blue-50 text-blue-800 border-blue-200 dark:bg-blue-950/30 dark:text-blue-300 dark:border-blue-800/40",
    label: "Moravian",
  },
  amcas: {
    dot: "bg-primary",
    badge: "bg-primary/10 text-primary border-primary/20",
    label: "AMCAS",
  },
  warning: {
    dot: "bg-amber-500",
    badge: "bg-amber-50 text-amber-800 border-amber-200 dark:bg-amber-950/30 dark:text-amber-300 dark:border-amber-800/40",
    label: "Watch out",
  },
  deadline: {
    dot: "bg-red-500",
    badge: "bg-red-50 text-red-800 border-red-200 dark:bg-red-950/30 dark:text-red-300 dark:border-red-800/40",
    label: "Hard deadline",
  },
}

export function MoravianAmcasTimeline() {
  return (
    <div className="space-y-5">
      {/* Critical warning */}
      <div className="flex items-start gap-3 rounded-xl border border-amber-200 bg-amber-50 px-5 py-4 dark:border-amber-800/40 dark:bg-amber-950/20">
        <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600 dark:text-amber-400" />
        <div className="text-sm">
          <p className="font-semibold text-amber-800 dark:text-amber-300 mb-1">
            Spring 2028 is your hardest semester
          </p>
          <p className="text-amber-700 dark:text-amber-400 leading-relaxed">
            Physics II + Biochem + heavy MCAT prep (15–25 hrs/week) + drafting your personal statement all land in the same window. Plan for this now, not in January 2028.
          </p>
        </div>
      </div>

      {/* Legend */}
      <div className="flex flex-wrap gap-2">
        {Object.entries(TYPE_STYLES).map(([key, s]) => (
          <span
            key={key}
            className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${s.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-6 space-y-0">
        {/* Vertical line */}
        <div className="absolute left-2 top-2 bottom-2 w-px bg-border" aria-hidden="true" />

        {TIMELINE.map((event, i) => {
          const s = TYPE_STYLES[event.type]
          return (
            <div key={i} className="relative pb-6 last:pb-0">
              {/* Dot */}
              <div
                className={`absolute -left-4 mt-1.5 h-3 w-3 rounded-full border-2 border-background ${s.dot}`}
                aria-hidden="true"
              />
              <div className="pl-4">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-semibold text-muted-foreground tabular-nums">
                    {event.date}
                  </span>
                  <span
                    className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${s.badge}`}
                  >
                    {s.label}
                  </span>
                </div>
                <p className="text-sm font-semibold text-foreground leading-snug mb-1">
                  {event.label}
                </p>
                <p className="text-sm text-muted-foreground leading-relaxed">{event.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
