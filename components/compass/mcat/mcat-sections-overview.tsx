import { Clock, FileQuestion } from "lucide-react"
import { MCAT_EXAM_STATS, MCAT_SECTIONS } from "@/lib/mcat"

export function McatSectionsOverview() {
  return (
    <div className="space-y-6">
      <div className="grid gap-3 sm:grid-cols-2">
        {MCAT_SECTIONS.map((sec) => (
          <div
            key={sec.id}
            className={`rounded-xl border p-4 transition-shadow hover:shadow-md ${sec.border} ${sec.bg}`}
          >
            <div className="flex items-start justify-between gap-2">
              <span className={`rounded-md px-2 py-0.5 text-xs font-bold uppercase tracking-wider ${sec.color} text-white`}>
                {sec.short}
              </span>
              <div className="flex gap-3 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <FileQuestion className="h-3.5 w-3.5" aria-hidden />
                  {sec.questions} Qs
                </span>
                <span className="flex items-center gap-1">
                  <Clock className="h-3.5 w-3.5" aria-hidden />
                  {sec.minutes} min
                </span>
              </div>
            </div>
            <p className={`mt-2 font-serif text-base font-medium ${sec.text}`}>{sec.name}</p>
            <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{sec.disciplines}</p>
          </div>
        ))}
      </div>

      <div className="rounded-xl border border-border bg-muted/40 p-4">
        <p className="text-sm font-medium text-foreground">Exam at a glance</p>
        <dl className="mt-3 grid gap-2 text-sm sm:grid-cols-2">
          <div>
            <dt className="text-muted-foreground">Scored questions</dt>
            <dd className="font-medium">{MCAT_EXAM_STATS.scoredQuestions} total</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Test length</dt>
            <dd className="font-medium">~{MCAT_EXAM_STATS.totalMinutes} minutes</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Section scores</dt>
            <dd className="font-medium">{MCAT_EXAM_STATS.sectionRange}</dd>
          </div>
          <div>
            <dt className="text-muted-foreground">Total score</dt>
            <dd className="font-medium">{MCAT_EXAM_STATS.totalRange}</dd>
          </div>
        </dl>
        <p className="mt-3 text-xs text-muted-foreground">{MCAT_EXAM_STATS.breaks}</p>
      </div>
    </div>
  )
}
