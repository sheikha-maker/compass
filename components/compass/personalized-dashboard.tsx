"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import {
  ArrowRight, CalendarDays, BookCheck, Clock,
  HeartPulse, AlertTriangle, Zap, Info, X,
  RotateCcw, ChevronRight,
} from "lucide-react"
import {
  ONBOARDING_STORAGE_KEY,
  getOnboardingOption,
  type OnboardingYearId,
} from "@/lib/onboarding"
import { MCAT_STORAGE_KEY } from "@/lib/mcat"
import { Reveal } from "@/components/compass/reveal"

// ─── Helpers ──────────────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    return s ? (JSON.parse(s) as T) : fallback
  } catch { return fallback }
}

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null
  return Math.ceil((new Date(dateStr).getTime() - Date.now()) / 86_400_000)
}

function weeksSince(dateStr: string): number {
  return (Date.now() - new Date(dateStr).getTime()) / (7 * 86_400_000)
}

function isDismissed(id: string): boolean {
  try {
    const map: Record<string, number> = JSON.parse(
      localStorage.getItem("pmc_alert_dismissals") ?? "{}"
    )
    return !!map[id] && Date.now() - map[id] < 7 * 86_400_000
  } catch { return false }
}

function dismissAlert(id: string) {
  try {
    const map: Record<string, number> = JSON.parse(
      localStorage.getItem("pmc_alert_dismissals") ?? "{}"
    )
    map[id] = Date.now()
    localStorage.setItem("pmc_alert_dismissals", JSON.stringify(map))
  } catch {}
}

// ─── Types ────────────────────────────────────────────────────────────────────

type Severity = "urgent" | "warning" | "info"

interface Alert {
  id: string
  severity: Severity
  title: string
  body: string
  href?: string
  linkLabel?: string
}

interface Stats {
  mcatDays: number | null
  mcatDate: string
  milestoneDone: number
  milestoneTotal: number
  activityHours: number
  lastWellness: string | null
  stressHigh: boolean
}

// ─── Alert builder (top 2 most urgent only) ───────────────────────────────────

function buildAlerts(yearId: OnboardingYearId | null): Alert[] {
  const alerts: Alert[] = []
  const doy = Math.floor(
    (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86_400_000
  )

  // MCAT countdown
  const mcat = read<{ testDate?: string }>(MCAT_STORAGE_KEY, {})
  if (mcat.testDate) {
    const days = daysUntil(mcat.testDate)
    if (days !== null && days > 0 && days <= 30) {
      alerts.push({
        id: `mcat-${days <= 7 ? "7" : "30"}d-${mcat.testDate}`,
        severity: days <= 7 ? "urgent" : "warning",
        title: days <= 7
          ? `MCAT in ${days} day${days === 1 ? "" : "s"} — rest and review only`
          : `Your MCAT is ${days} days away`,
        body: days <= 7
          ? "Trust your prep. No new content. Sleep and light review."
          : "Shift to timed full-lengths and targeted review of weak areas.",
        href: "/tools/plan-check",
        linkLabel: "View MCAT planner",
      })
    }
  }

  // Wellness overdue
  const wellness = read<{ date?: string; stress?: number }[]>("pmc_wellness_v1", [])
  if (wellness.length === 0) {
    alerts.push({
      id: "wellness-never",
      severity: "info",
      title: "You haven't done a wellness check-in yet",
      body: "Three questions, two minutes. Catch burnout before it catches you.",
      href: "/tools/wellness-hours",
      linkLabel: "Log a check-in",
    })
  } else {
    const last = wellness[wellness.length - 1]
    if (last.date && weeksSince(last.date) >= 2) {
      alerts.push({
        id: "wellness-overdue",
        severity: "warning",
        title: "No wellness check-in in 2+ weeks",
        body: "You haven't checked in on yourself recently.",
        href: "/tools/wellness-hours",
        linkLabel: "Log now",
      })
    }
  }

  // LOR gap for late-stage students
  const lors = read<{ status?: string }[]>("pmc_lors_v1", [])
  const lorsDone = lors.filter(l => l.status === "submitted").length
  if (lorsDone === 0 && yearId && ["year3", "year4"].includes(yearId)) {
    alerts.push({
      id: "lor-none-late",
      severity: "warning",
      title: "No letters of recommendation submitted yet",
      body: "At your stage, at least one LOR conversation should be underway.",
      href: "/tools/application-prep",
      linkLabel: "Go to LOR tracker",
    })
  }

  // AMCAS timing
  if (doy >= 100 && doy <= 175) {
    alerts.push({
      id: `amcas-${doy >= 136 ? "open" : "prep"}-${new Date().getFullYear()}`,
      severity: doy >= 136 ? "warning" : "info",
      title: doy >= 136
        ? "AMCAS submissions are open — apply early"
        : "AMCAS opens soon — start preparing now",
      body: doy >= 136
        ? "Rolling admissions schools fill seats as applications arrive."
        : "Draft your activity descriptions and personal statement before it opens.",
      href: "/your-path",
      linkLabel: "View application timeline",
    })
  }

  const order: Record<Severity, number> = { urgent: 0, warning: 1, info: 2 }
  return alerts
    .filter(a => !isDismissed(a.id))
    .sort((a, b) => order[a.severity] - order[b.severity])
    .slice(0, 2)
}

// ─── Severity styles ──────────────────────────────────────────────────────────

const SEV = {
  urgent: {
    border: "border-red-300 dark:border-red-800/60",
    bg: "bg-red-50 dark:bg-red-950/20",
    text: "text-red-600 dark:text-red-400",
    icon: <Zap className="h-3.5 w-3.5" />,
  },
  warning: {
    border: "border-amber-300 dark:border-amber-800/50",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    text: "text-amber-600 dark:text-amber-400",
    icon: <AlertTriangle className="h-3.5 w-3.5" />,
  },
  info: {
    border: "border-blue-200 dark:border-blue-800/40",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    text: "text-blue-600 dark:text-blue-400",
    icon: <Info className="h-3.5 w-3.5" />,
  },
} as const

// ─── Stat pill ────────────────────────────────────────────────────────────────

function StatPill({
  icon, label, value, href, accent,
}: {
  icon: React.ReactNode
  label: string
  value: string
  href: string
  accent?: "green" | "amber" | "red" | "default"
}) {
  const accentClass =
    accent === "green"  ? "border-green-300 dark:border-green-800/50" :
    accent === "amber"  ? "border-amber-300 dark:border-amber-800/50" :
    accent === "red"    ? "border-red-300 dark:border-red-800/50" :
    "border-border"

  return (
    <Link
      href={href}
      className={`group flex items-center gap-3 rounded-xl border bg-card px-4 py-3 transition-all hover:shadow-sm hover:-translate-y-0.5 ${accentClass}`}
    >
      <span className="text-primary">{icon}</span>
      <div className="min-w-0">
        <p className="text-lg font-bold text-foreground leading-none">{value}</p>
        <p className="mt-0.5 text-xs text-muted-foreground truncate">{label}</p>
      </div>
      <ChevronRight className="ml-auto h-3.5 w-3.5 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100 shrink-0" />
    </Link>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function PersonalizedDashboard() {
  const [yearId, setYearId] = useState<OnboardingYearId | null>(null)
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [stats, setStats] = useState<Stats | null>(null)
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    // Year
    const stored = read<{ year?: OnboardingYearId }>(ONBOARDING_STORAGE_KEY, {})
    const id = stored.year ?? null
    setYearId(id)

    // Alerts
    setAlerts(buildAlerts(id))

    // Stats
    const mcat = read<{ testDate?: string }>(MCAT_STORAGE_KEY, {})
    const mcatDays = daysUntil(mcat.testDate ?? "")
    const mcatDate = mcat.testDate
      ? new Date(mcat.testDate).toLocaleDateString("en-US", {
          month: "short", day: "numeric", year: "numeric",
        })
      : ""

    const checks = read<Record<string, boolean>>("pmc_checks_v1", {})
    const milestoneDone = Object.values(checks).filter(Boolean).length

    const logs = read<{ hours?: string }[]>("compass-activity-logs", [])
    const activityHours = logs.reduce(
      (s, l) => s + (parseFloat(String(l.hours ?? 0)) || 0), 0
    )

    const wellness = read<{ date?: string; stress?: number }[]>("pmc_wellness_v1", [])
    const lastWellnessEntry = wellness[wellness.length - 1]
    const lastWellness = lastWellnessEntry?.date
      ? new Date(lastWellnessEntry.date).toLocaleDateString("en-US", {
          month: "short", day: "numeric",
        })
      : null

    const recent3 = wellness.slice(-3)
    const avgStress = recent3.length
      ? recent3.reduce((s, e) => s + (e.stress ?? 0), 0) / recent3.length
      : 0

    setStats({
      mcatDays,
      mcatDate,
      milestoneDone,
      milestoneTotal: 32,
      activityHours,
      lastWellness,
      stressHigh: recent3.length >= 2 && avgStress >= 7.5,
    })

    setMounted(true)
  }, [])

  const dismissOne = (id: string) => {
    dismissAlert(id)
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  const resetYear = () => {
    try { localStorage.removeItem(ONBOARDING_STORAGE_KEY) } catch {}
    setYearId(null)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  // Don't render until hydrated; never render if no year selected
  if (!mounted || !yearId) return null

  const option = getOnboardingOption(yearId)
  if (!option) return null

  const milestonePct = Math.round((stats?.milestoneDone ?? 0) / 32 * 100)

  const mcatValue =
    stats?.mcatDays === null  ? "—" :
    stats.mcatDays < 0        ? "Done" :
    stats.mcatDays === 0      ? "Today!" :
    `${stats.mcatDays}d`

  const mcatAccent =
    stats?.mcatDays === null ? "default" :
    stats.mcatDays < 30     ? "red" :
    stats.mcatDays < 90     ? "amber" : "green"

  return (
    <Reveal>
      <section className="border-b border-border bg-muted/20 px-5 py-10 md:px-8">
        <div className="mx-auto max-w-4xl space-y-6">

          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Your dashboard
              </p>
              <h2 className="mt-1 font-serif text-2xl font-semibold text-foreground">
                Welcome back — you&apos;re in {option.label}
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                {option.subtitle}
              </p>
            </div>
            <button
              onClick={resetYear}
              className="inline-flex items-center gap-1.5 rounded-lg border border-border px-3 py-1.5 text-xs text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
            >
              <RotateCcw className="h-3 w-3" aria-hidden />
              Update year
            </button>
          </div>

          {/* Inline alerts */}
          {alerts.length > 0 && (
            <div className="space-y-2">
              {alerts.map(alert => {
                const s = SEV[alert.severity]
                return (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3 rounded-xl border px-4 py-3 ${s.border} ${s.bg}`}
                  >
                    <span className={`mt-0.5 shrink-0 ${s.text}`}>{s.icon}</span>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                      <p className="text-sm text-muted-foreground mt-0.5">{alert.body}</p>
                      {alert.href && alert.linkLabel && (
                        <Link
                          href={alert.href}
                          className={`mt-1 inline-flex items-center gap-1 text-xs font-semibold ${s.text} hover:underline`}
                        >
                          {alert.linkLabel}
                          <ChevronRight className="h-3 w-3" />
                        </Link>
                      )}
                    </div>
                    <button
                      onClick={() => dismissOne(alert.id)}
                      aria-label="Dismiss"
                      className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </div>
                )
              })}
            </div>
          )}

          {/* Next priorities */}
          <div>
            <p className="mb-3 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Next priorities for you
            </p>
            <div className="grid gap-2.5 sm:grid-cols-3">
              {option.recommendations.map((rec, i) => (
                <Reveal key={rec.href} delay={i * 60}>
                  <Link
                    href={rec.href}
                    className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm transition-all hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
                  >
                    <div>
                      <p className="font-medium text-foreground">{rec.label}</p>
                      {rec.description && (
                        <p className="mt-0.5 text-xs text-muted-foreground">{rec.description}</p>
                      )}
                    </div>
                    <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                  </Link>
                </Reveal>
              ))}
            </div>
          </div>

          {/* Stats row */}
          {stats && (
            <div className="grid grid-cols-2 gap-2.5 sm:grid-cols-4">
              <StatPill
                icon={<CalendarDays className="h-4 w-4" />}
                label={stats.mcatDate ? `Test: ${stats.mcatDate}` : "No test date set"}
                value={mcatValue}
                href="/tools/plan-check"
                accent={mcatAccent as any}
              />
              <StatPill
                icon={<BookCheck className="h-4 w-4" />}
                label={`${stats.milestoneDone}/32 milestones · ${milestonePct}%`}
                value={`${milestonePct}%`}
                href="/tools/milestones"
                accent={milestonePct >= 75 ? "green" : milestonePct >= 40 ? "amber" : "default"}
              />
              <StatPill
                icon={<Clock className="h-4 w-4" />}
                label="Activity hours logged"
                value={stats.activityHours > 0 ? `${stats.activityHours.toFixed(0)}h` : "—"}
                href="/tools/wellness-hours"
              />
              <StatPill
                icon={<HeartPulse className="h-4 w-4" />}
                label={stats.stressHigh ? "Stress running high" : "Last wellness check"}
                value={stats.lastWellness ?? "—"}
                href="/tools/wellness-hours"
                accent={stats.stressHigh ? "red" : stats.lastWellness ? "green" : "default"}
              />
            </div>
          )}

        </div>
      </section>
    </Reveal>
  )
}
