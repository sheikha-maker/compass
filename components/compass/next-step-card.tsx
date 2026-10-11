import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"

export function NextStepCard({
  eyebrow = "Next step",
  title,
  description,
  href,
  linkLabel = "Continue",
}: {
  eyebrow?: string
  title: string
  description: string
  href: string
  linkLabel?: string
}) {
  return (
    <Card className="border-primary/20 bg-primary/5 shadow-none">
      <CardContent className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between sm:gap-6">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary">{eyebrow}</p>
          <h3 className="mt-1 font-serif text-xl font-semibold text-foreground">{title}</h3>
          <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{description}</p>
        </div>
        <Link
          href={href}
          className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-primary hover:underline"
        >
          {linkLabel}
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  )
}

export function ReviewedSource({
  reviewed = "Fall 2026",
  source,
}: {
  reviewed?: string
  source?: string
}) {
  return (
    <p className="text-xs text-muted-foreground">
      Reviewed {reviewed}{source ? ` · Source: ${source}` : ""}
    </p>
  )
}
