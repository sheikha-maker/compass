"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { X, AlertTriangle, Info, Zap, ChevronRight } from "lucide-react"
import { MCAT_STORAGE_KEY } from "@/lib/mcat"
import { ONBOARDING_STORAGE_KEY } from "@/lib/onboarding"

// ─── Types ────────────────────────────────────────────────────────────────────

type AlertSeverity = "urgent" | "warning" | "info"

interface Alert {
  id: string
  severity: AlertSeverity
  title: string
  body: string
  href?: string
  linkLabel?: string
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function read<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    return s ? JSON.parse(s) : fallback
  } catch { return fallback }
}

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(diff / 86_400_000)
}

function weeksSince(dateStr: string): number {
  const diff = Date.now() - new Date(dateStr).getTime()
  return diff / (7 * 86_400_000)
}

function isDismissed(id: string): boolean {
  try {
    const raw = localStorage.getItem("pmc_alert_dismissals")
    if (!raw) return false
    const map: Record<string, number> = JSON.parse(raw)
    const ts = map[id]
    if (!ts) return false
    // Re-show after 7 days
    return Date.now() - ts < 7 * 86_400_000
  } catch { return false }
}

function dismiss(id: string) {
  try {
    const raw = localStorage.getItem("pmc_alert_dismissals")
    const map: Record<string, number> = raw ? JSON.parse(raw) : {}
    map[id] = Date.now()
    localStorage.setItem("pmc_alert_dismissals", JSON.stringify(map))
  } catch {}
}

const DOY = (d: Date) => {
  const start = new Date(d.getFullYear(), 0, 0)
  return Math.floor((d.getTime() - start.getTime()) / 86_400_000)
}

// ─── Alert generation ─────────────────────────────────────────────────────────

function buildAlerts(): Alert[] {
  const alerts: Alert[] = []
  const now = new Date()
  const doy = DOY(now)

  // ── MCAT countdown ──────────────────────────────────────────────────────────
  const mcat = read<{ testDate?: string }>(MCAT_STORAGE_KEY, {})
  if (mcat.testDate) {
    const days = daysUntil(mcat.testDate)
    if (days !== null && days > 0) {
      if (days <= 7) {
        alerts.push({
          id: `mcat-7d-${mcat.testDate}`,
          severity: "urgent",
          title: `MCAT in ${days} day${days === 1 ? "" : "s"}`,
          body: "Rest and light review only — trust your prep. No new content.",
          href: "/tools/plan-check",
          linkLabel: "View MCAT planner",
        })
      } else if (days <= 30) {
        alerts.push({
          id: `mcat-30d-${mcat.testDate}`,
          severity: "warning",
          title: `Your MCAT is ${days} days away`,
          body: "Limit new content. Focus on timed full-lengths and targeted review of weak areas.",
          href: "/tools/plan-check",
          linkLabel: "View MCAT planner",
        })
      } else if (days <= 90) {
        alerts.push({
          id: `mcat-90d-${mcat.testDate}`,
          severity: "info",
          title: `MCAT in ${days} days`,
          body: "If you haven't started full-length practice tests yet, now is the time to begin.",
          href: "/tools/plan-check",
          linkLabel: "View MCAT planner",
        })
      }
    }
  }

  // ── Wellness check-in overdue ───────────────────────────────────────────────
  const wellness = read<{ date?: string; stress?: number; energy?: number }[]>("pmc_wellness_v1", [])
  if (wellness.length === 0) {
    alerts.push({
      id: "wellness-never",
      severity: "info",
      title: "You haven't logged a wellness check-in yet",
      body: "Three questions, two minutes. Knowing your trends early makes it easier to catch burnout before it hits.",
      href: "/tools/wellness-hours",
      linkLabel: "Go to wellness check-in",
    })
  } else {
    const lastEntry = wellness[wellness.length - 1]
    if (lastEntry.date && weeksSince(lastEntry.date) >= 2) {
      alerts.push({
        id: "wellness-overdue",
        severity: "warning",
        title: "No wellness check-in in over 2 weeks",
        body: "You haven't checked in on yourself recently. It only takes two minutes.",
        href: "/tools/wellness-hours",
        linkLabel: "Log a check-in",
      })
    }

    // High stress trend
    const recent3 = wellness.slice(-3)
    const avgStress = recent3.reduce((s, e) => s + (e.stress ?? 0), 0) / recent3.length
    const avgEnergy = recent3.reduce((s, e) => s + (e.energy ?? 0), 0) / recent3.length
    if (recent3.length >= 2 && (avgStress >= 7.5 || avgEnergy <= 3)) {
      alerts.push({
        id: "wellness-strain",
        severity: "warning",
        title: "Your wellness trend shows strain",
        body: avgStress >= 7.5
          ? "Stress has been running high in your recent check-ins. Consider taking the Burnout Self-Check."
          : "Your energy has been consistently low. It may be worth a check-in with counseling.",
        href: "/burnout-check",
        linkLabel: "Take Burnout Self-Check",
      })
    }
  }

  // ── Milestones ──────────────────────────────────────────────────────────────
  const checks = read<Record<string, boolean>>("pmc_checks_v1", {})
  const onboarding = read<{ yearId?: string }>(ONBOARDING_STORAGE_KEY, {})
  const totalDone = Object.values(checks).filter(Boolean).length
  const pct = Math.round((totalDone / 32) * 100)

  if (pct < 25 && onboarding.yearId && ["year3", "year4"].includes(onboarding.yearId)) {
    alerts.push({
      id: "milestones-low-late",
      severity: "warning",
      title: "Milestone progress is low for your year",
      body: "You've completed under 25% of milestones. Review your year's key priorities now.",
      href: "/tools/milestones",
      linkLabel: "View milestones",
    })
  } else if (pct >= 75) {
    alerts.push({
      id: "milestones-high",
      severity: "info",
      title: `Strong milestone progress — ${pct}% complete`,
      body: "You've covered most of the major milestones. Make sure your application materials are keeping pace.",
      href: "/tools/application-prep",
      linkLabel: "Check application prep",
    })
  }

  // ── LOR reminder ───────────────────────────────────────────────────────────
  const lors = read<{ status?: string }[]>("pmc_lors_v1", [])
  const lorSubmitted = lors.filter(l => l.status === "submitted").length
  if (lorSubmitted === 0 && onboarding.yearId && ["year3", "year4"].includes(onboarding.yearId)) {
    alerts.push({
      id: "lor-none-late",
      severity: "warning",
      title: "No letters of recommendation submitted yet",
      body: "Junior and senior year applicants should have at least one LOR conversation underway.",
      href: "/tools/application-prep",
      linkLabel: "Go to LOR tracker",
    })
  }

  // ── Application cycle timing ────────────────────────────────────────────────
  // Day ~120 = late April, day ~150 = late May
  if (doy >= 100 && doy <= 135) {
    alerts.push({
      id: `amcas-prep-${now.getFullYear()}`,
      severity: "info",
      title: "AMCAS opens soon — start preparing now",
      body: "Submissions open in late May. Draft your activity descriptions and personal statement before it opens.",
      href: "/your-path",
      linkLabel: "View application timeline",
    })
  } else if (doy >= 136 && doy <= 175) {
    alerts.push({
      id: `amcas-open-${now.getFullYear()}`,
      severity: "warning",
      title: "AMCAS submissions open — apply early",
      body: "Rolling admissions schools fill seats as applications arrive. Every week of delay matters.",
      href: "/your-path",
      linkLabel: "View application timeline",
    })
  }

  // ── Sort by severity and filter dismissed ───────────────────────────────────
  const order: Record<AlertSeverity, number> = { urgent: 0, warning: 1, info: 2 }
  return alerts
    .filter(a => !isDismissed(a.id))
    .sort((a, b) => order[a.severity] - order[b.severity])
    .slice(0, 3) // max 3 at once
}

// ─── Alert card ───────────────────────────────────────────────────────────────

const STYLES: Record<AlertSeverity, { border: string; bg: string; icon: string; iconEl: React.ReactNode }> = {
  urgent: {
    border: "border-red-300 dark:border-red-800/60",
    bg: "bg-red-50 dark:bg-red-950/20",
    icon: "text-red-600 dark:text-red-400",
    iconEl: <Zap className="h-4 w-4" />,
  },
  warning: {
    border: "border-amber-300 dark:border-amber-800/50",
    bg: "bg-amber-50 dark:bg-amber-950/20",
    icon: "text-amber-600 dark:text-amber-400",
    iconEl: <AlertTriangle className="h-4 w-4" />,
  },
  info: {
    border: "border-blue-200 dark:border-blue-800/40",
    bg: "bg-blue-50 dark:bg-blue-950/20",
    icon: "text-blue-600 dark:text-blue-400",
    iconEl: <Info className="h-4 w-4" />,
  },
}

// ─── Main component ───────────────────────────────────────────────────────────

export function DeadlineAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setAlerts(buildAlerts())
    setMounted(true)
  }, [])

  const dismissAlert = (id: string) => {
    dismiss(id)
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  if (!mounted || alerts.length === 0) return null

  return (
    <div className="mx-auto w-full max-w-4xl px-5 pt-6 md:px-8">
      <div className="flex flex-col gap-2.5">
        {alerts.map((alert) => {
          const s = STYLES[alert.severity]
          return (
            <div
              key={alert.id}
              className={`flex items-start gap-3 rounded-xl border px-4 py-3.5 ${s.border} ${s.bg}`}
              style={{ animation: "fadeSlideIn 0.3s ease both" }}
            >
              <span className={`mt-0.5 shrink-0 ${s.icon}`}>{s.iconEl}</span>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-foreground">{alert.title}</p>
                <p className="text-sm text-muted-foreground mt-0.5 leading-relaxed">{alert.body}</p>
                {alert.href && alert.linkLabel && (
                  <Link
                    href={alert.href}
                    className={`mt-1.5 inline-flex items-center gap-1 text-xs font-semibold ${s.icon} hover:underline`}
                  >
                    {alert.linkLabel}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                )}
              </div>
              <button
                onClick={() => dismissAlert(alert.id)}
                className="shrink-0 rounded-md p-1 text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Dismiss alert"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
