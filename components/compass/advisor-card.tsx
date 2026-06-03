import { Mail, Phone, MapPin, ExternalLink, Star } from "lucide-react"

export function AdvisorCard() {
  return (
    <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 space-y-5">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-primary/15">
          <Star className="h-6 w-6 text-primary" aria-hidden="true" />
        </div>
        <div>
          <h3 className="font-serif text-lg font-semibold text-foreground">
            Dr. Cecilia M. Fox
          </h3>
          <p className="text-sm text-muted-foreground leading-snug mt-0.5">
            Professor of Biological Sciences · Director, Neuroscience Program
          </p>
          <p className="text-sm font-medium text-primary mt-1">
            Your Health Professions Advisor
          </p>
        </div>
      </div>

      {/* First action prompt */}
      <div className="rounded-lg border border-primary/20 bg-background px-4 py-3 text-sm leading-relaxed text-foreground">
        Before you do anything else on this site, introduce yourself to Dr. Fox. She advises every pre-health student at Moravian, oversees the Pre-Health Club and Brain Club, and runs the SOAR summer research program. One office hours visit in your first semester is worth more than most resources on this page.
      </div>

      {/* Contact details */}
      <div className="grid gap-2 text-sm">
        <a
          href="mailto:foxc@moravian.edu"
          className="flex items-center gap-2.5 text-foreground hover:text-primary transition-colors"
        >
          <Mail className="h-4 w-4 text-muted-foreground shrink-0" />
          foxc@moravian.edu
        </a>
        <a
          href="tel:6108611426"
          className="flex items-center gap-2.5 text-foreground hover:text-primary transition-colors"
        >
          <Phone className="h-4 w-4 text-muted-foreground shrink-0" />
          610-861-1426
        </a>
        <div className="flex items-start gap-2.5 text-muted-foreground">
          <MapPin className="h-4 w-4 text-muted-foreground shrink-0 mt-0.5" />
          <span>Priscilla Payne Hurd Academic Complex, Room 216</span>
        </div>
      </div>

      {/* What she does */}
      <div className="space-y-2">
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          What she can help with
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "Pre-health advising",
            "Course sequencing",
            "MCAT planning",
            "Med school applications",
            "SOAR research",
            "Pre-Health Club",
            "Brain Club",
            "Letters of recommendation",
          ].map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-border bg-card px-2.5 py-1 text-xs text-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>

      {/* Research context */}
      <div className="rounded-lg border border-border bg-card px-4 py-3 text-sm leading-relaxed text-muted-foreground">
        <span className="font-medium text-foreground">Her lab: </span>
        Dr. Fox researches neuroprotective effects of antioxidants (selenium, curcumin, capsaicin) in Parkinson&apos;s disease models, and the impact of personalized music on cognition in dementia patients. If you&apos;re interested in neuroscience research, she&apos;s your first call. She also founded the{" "}
        <a
          href="https://www.moravian.edu/neuroscience/lvsfn-chapter"
          target="_blank"
          rel="noopener noreferrer"
          className="font-medium text-primary underline underline-offset-2"
        >
          Lehigh Valley Society for Neuroscience
        </a>{" "}
        chapter in 2009.
      </div>

      <a
        href="https://www.moravian.edu/neuroscience/faculty/fox"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-2"
      >
        Full faculty profile
        <ExternalLink className="h-3.5 w-3.5" />
      </a>
    </div>
  )
}
