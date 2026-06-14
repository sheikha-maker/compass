"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Timer, ArrowRight } from "lucide-react"
import { MCAT_STORAGE_KEY, daysUntil } from "@/lib/mcat"

export function McatHomepageBanner() {
  const [days, setDays] = useState<number | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(MCAT_STORAGE_KEY)
      if (!raw) return
      const data = JSON.parse(raw) as { date?: string }
      if (!data.date) return
      const d = daysUntil(data.date)
      if (d > 0) setDays(d)
    } catch {}
  }, [])

  if (days === null) return null

  const urgent = days <= 30
  const weeks = Math.ceil(days / 7)

  return (
    <Link
      href="/tools/plan-check#mcat-countdown"
      className={`group flex items-center justify-between gap-4 border-b px-5 py-3 transition-colors md:px-8 ${
        urgent
          ? "border-destructive/30 bg-destructive/5 hover:bg-destructive/10"
          : "border-primary/20 bg-primary/5 hover:bg-primary/10"
      }`}
    >
      <div className="flex items-center gap-3">
        <Timer className={`h-4 w-4 shrink-0 ${urgent ? "text-destructive" : "text-primary"}`} aria-hidden />
        <p className="text-sm font-medium text-foreground">
          <span className={`font-bold ${urgent ? "text-destructive" : "text-primary"}`}>
            {days} day{days !== 1 ? "s" : ""}
          </span>{" "}
          until your MCAT
          {!urgent && (
            <span className="ml-1.5 text-muted-foreground font-normal">
              · {weeks} week{weeks !== 1 ? "s" : ""} to go
            </span>
          )}
          {urgent && (
            <span className="ml-1.5 text-muted-foreground font-normal">· Final stretch</span>
          )}
        </p>
      </div>
      <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden />
    </Link>
  )
}
