import { Sparkles, RefreshCw, CalendarClock } from "lucide-react"
import { cn } from "@/lib/utils"

/**
 * Freshness primitives — a consistent, on-palette way to signal that
 * The Pre-Med Compass is an actively maintained, living resource.
 *
 * - <PulseDot />        a small pulsing accent dot (freshness at a glance)
 * - <FreshBadge />      a "New" / "Updated" pill with the shared accent gradient
 * - <FreshnessIndicator /> a "Last updated / Recently added" line for section tops
 */

export function PulseDot({ className }: { className?: string }) {
  return <span className={cn("fresh-dot", className)} aria-hidden="true" />
}

type FreshBadgeProps = {
  variant?: "new" | "updated"
  label?: string
  className?: string
  sheen?: boolean
}

export function FreshBadge({ variant = "new", label, className, sheen = true }: FreshBadgeProps) {
  const Icon = variant === "new" ? Sparkles : RefreshCw
  const text = label ?? (variant === "new" ? "New" : "Updated")
  return (
    <span
      className={cn(
        "badge-fresh inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide",
        variant === "new" && sheen && "badge-fresh-sheen",
        className,
      )}
    >
      <Icon className="h-3 w-3" aria-hidden="true" />
      {text}
    </span>
  )
}

type FreshnessIndicatorProps = {
  /** e.g. "Summer 2026" or "June 2026" */
  date: string
  /** "updated" → "Last updated", "added" → "Recently added" */
  kind?: "updated" | "added"
  /** Show the pulsing dot (use for genuinely recent changes) */
  pulse?: boolean
  className?: string
}

export function FreshnessIndicator({ date, kind = "updated", pulse = false, className }: FreshnessIndicatorProps) {
  const prefix = kind === "added" ? "Recently added" : "Last updated"
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1.5 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs text-muted-foreground",
        className,
      )}
    >
      {pulse ? <PulseDot /> : <CalendarClock className="h-3 w-3" aria-hidden="true" />}
      {prefix}: {date}
    </span>
  )
}
