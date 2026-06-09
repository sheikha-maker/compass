"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { MCAT_STORAGE_KEY } from "@/lib/mcat"
import {
  CalendarDays, BookCheck, School, FileText,
  HeartPulse, Clock, TrendingUp, ChevronRight
} from "lucide-react"

// ─── Helpers ─────────────────────────────────────────────────────────────────

function readJSON<T>(key: string, fallback: T): T {
  try {
    const s = localStorage.getItem(key)
    return s ? (JSON.parse(s) as T) : fallback
  } catch { return fallback }
}

function daysUntil(dateStr: string): number | null {
  if (!dateStr) return null
  const diff = new Date(dateStr).getTime() - Date.now()
  return Math.ceil(diff / 86_400_000)
}

function totalHours(logs: { hours?: number | string | null }[]): number {
  return logs.reduce((sum, l) => sum + (parseFloat(String(l.hours ?? 0)) || 0), 0)
}

// ─── Types ───────────────────────────────────────────────────────────────────

interface StatCardProps {
  icon: React.ReactNode
  label: string
  value: string
  sub?: string
  href: string
  accent?: "default" | "green" | "amber" | "red" | "blue"
}

const ACCENT = {
  default: "border-border",
  green:   "border-green-300 dark:border-green-800/60",
  amber:   "border-amber-300 dark:border-amber-800/60",
  red:     "border-red-300 dark:border-red-800/60",
  blue:    "border-blue-300 dark:border-blue-800/60",
}

function StatCard({ icon, label, value, sub, href, accent = "default" }: StatCardProps) {
  return (
    <Link
      href={href}
      className={`group flex flex-col gap-3 rounded-2xl border bg-card p-4 transition-all hover:shadow-md hover:-translate-y-0.5 ${ACCENT[accent]}`}
    >
      <div className="flex items-center justify-between">
        <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-primary/10 text-primary">
          {icon}
        </span>
        <ChevronRight className="h-4 w-4 text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100" />
      </div>
      <div>
        <p className="text-2xl font-bold text-foreground">{value}</p>
        <p className="text-xs font-medium text-muted-foreground">{label}</p>
        {sub && <p className="mt-1 text-xs text-muted-foreground/70">{sub}</p>}
      </div>
    </Link>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────

export function ProgressDashboard() {
  const [stats, setStats] = useState<{
    mcatDays: number | null
    mcatDate: string
    milestones: { done: number; total: number }
    apps: number
    appsSubmitted: number
    lors: { submitted: number; total: number }
    lastWellness: string | null
    activityHours: number
  } | null>(null)

  useEffect(() => {
    // MCAT
    const mcat = readJSON<{ testDate?: string }>(MCAT_STORAGE_KEY, {})
    const mcatDays = daysUntil(mcat.testDate ?? "")
    const mcatDate = mcat.testDate
      ? new Date(mcat.testDate).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
      : ""

    // Milestones — 4 years × 8 items = 32
    const checks = readJSON<Record<string, boolean>>("pmc_checks_v1", {})
    const milestoneDone = Object.values(checks).filter(Boolean).length
    const milestoneTotal = 32

    // Applications
    const apps = readJSON<{ status?: string }[]>("pmc_app_tracker_v1", [])
    const appsSubmitted = apps.filter(a =>
      ["primary", "secondary", "interview", "decision"].includes(a.status ?? "")
    ).length

    // LORs
    const lors = readJSON<{ status?: string }[]>("pmc_lors_v1", [])
    const lorsSubmitted = lors.filter(l => l.status === "submitted").length

    // Wellness
    const wellness = readJSON<{ date?: string }[]>("pmc_wellness_v1", [])
    const lastWellness = wellness.length > 0
      ? new Date(wellness[wellness.length - 1].date ?? "").toLocaleDateString("en-US", { month: "short", day: "numeric" })
      : null

    // Activity hours
    const logs = readJSON<{ hours?: string }[]>("compass-activity-logs", [])
    const activityHours = totalHours(logs)

    setStats({
      mcatDays,
      mcatDate,
      milestones: { done: milestoneDone, total: milestoneTotal },
      apps: apps.length,
      appsSubmitted,
      lors: { submitted: lorsSubmitted, total: lors.length },
      lastWellness,
      activityHours,
    })
  }, [])

  if (!stats) return null

  // MCAT accent color
  const mcatAccent =
    stats.mcatDays === null ? "default"
    : stats.mcatDays < 30   ? "red"
    : stats.mcatDays < 90   ? "amber"
    : "green"

  const mcatValue =
    stats.mcatDays === null   ? "—"
    : stats.mcatDays < 0     ? "Passed"
    : stats.mcatDays === 0   ? "Today!"
    : `${stats.mcatDays}d`

  const mcatSub =
    stats.mcatDate
      ? `Test date: ${stats.mcatDate}`
      : "No test date set yet"

  const milestonePct = Math.round((stats.milestones.done / stats.milestones.total) * 100)

  return (
    <section className="mb-8 rounded-3xl border border-border bg-card p-6 shadow-sm">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">Overview</p>
          <h2 className="mt-1 text-xl font-semibold text-foreground">Your progress at a glance</h2>
        </div>
        <TrendingUp className="h-5 w-5 text-muted-foreground" />
      </div>

      {/* Overall milestone bar */}
      <div className="mb-6 rounded-xl border border-border bg-background px-4 py-3">
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-medium text-foreground">Overall milestone progress</p>
          <span className="text-sm font-bold text-primary">{milestonePct}%</span>
        </div>
        <div className="h-2 rounded-full bg-secondary overflow-hidden">
          <div
            className="h-full rounded-full bg-primary transition-all duration-700"
            style={{ width: `${milestonePct}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs text-muted-foreground">
          {stats.milestones.done} of {stats.milestones.total} milestones complete
        </p>
      </div>

      {/* Stat cards */}
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        <StatCard
          icon={<CalendarDays className="h-4 w-4" />}
          label="Until MCAT"
          value={mcatValue}
          sub={mcatSub}
          href="/tools#planning"
          accent={mcatAccent as any}
        />
        <StatCard
          icon={<BookCheck className="h-4 w-4" />}
          label="Milestones done"
          value={`${stats.milestones.done}/${stats.milestones.total}`}
          sub={`${milestonePct}% complete`}
          href="/tools#milestones"
          accent={milestonePct >= 75 ? "green" : milestonePct >= 40 ? "amber" : "default"}
        />
        <StatCard
          icon={<School className="h-4 w-4" />}
          label="Schools tracked"
          value={stats.apps === 0 ? "—" : `${stats.apps}`}
          sub={stats.appsSubmitted > 0 ? `${stats.appsSubmitted} submitted` : "None submitted yet"}
          href="/tools#application-prep"
        />
        <StatCard
          icon={<FileText className="h-4 w-4" />}
          label="LORs submitted"
          value={stats.lors.total === 0 ? "—" : `${stats.lors.submitted}/${stats.lors.total}`}
          sub={stats.lors.total === 0 ? "No writers added yet" : `${stats.lors.total - stats.lors.submitted} pending`}
          href="/tools#application-prep"
          accent={stats.lors.submitted >= 3 ? "green" : "default"}
        />
        <StatCard
          icon={<HeartPulse className="h-4 w-4" />}
          label="Last wellness check"
          value={stats.lastWellness ?? "—"}
          sub={stats.lastWellness ? "Keep it up!" : "No check-ins yet"}
          href="/tools#wellbeing"
          accent={stats.lastWellness ? "green" : "default"}
        />
        <StatCard
          icon={<Clock className="h-4 w-4" />}
          label="Activity hours"
          value={stats.activityHours === 0 ? "—" : `${stats.activityHours.toFixed(1)}h`}
          sub={stats.activityHours > 0 ? "Total logged" : "No hours logged yet"}
          href="/tools#wellbeing"
        />
      </div>
    </section>
  )
}
