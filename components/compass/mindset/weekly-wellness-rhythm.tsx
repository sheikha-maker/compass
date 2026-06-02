"use client"

import Link from "next/link"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { weeklyRhythmHabits } from "@/lib/mindset-content"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const STORAGE_KEY = "pmc_weekly_rhythm_v1"

export function WeeklyWellnessRhythm() {
  const [checked, setChecked, hydrated] = useLocalStorage<Record<string, boolean>>(STORAGE_KEY, {})
  const done = weeklyRhythmHabits.filter((h) => checked[h.id]).length
  const pct = Math.round((done / weeklyRhythmHabits.length) * 100)

  if (!hydrated) {
    return <div className="h-40 animate-pulse rounded-xl border border-border bg-muted/30" />
  }

  return (
    <div className="rounded-xl border border-accent/25 bg-gradient-to-br from-accent/5 to-card p-5 md:p-6">
      <p className="font-serif text-lg font-medium text-foreground">This week&apos;s wellness rhythm</p>
      <p className="mt-1 text-sm text-muted-foreground">
        A quick reset on Sunday or Monday. Not a grade, just a mirror. Pair with the{" "}
        <Link href="/tools#wellness-checkin" className="text-primary underline underline-offset-2">
          Weekly Check-in
        </Link>{" "}
        tool for trends over time.
      </p>
      <Progress value={pct} className="mt-4 h-2" />
      <p className="mt-2 text-xs text-muted-foreground">
        {done} of {weeklyRhythmHabits.length} habits checked this week
      </p>
      <ul className="mt-4 space-y-3">
        {weeklyRhythmHabits.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <Checkbox
              id={`rhythm-${item.id}`}
              checked={!!checked[item.id]}
              onCheckedChange={(v) => setChecked({ ...checked, [item.id]: v === true })}
            />
            <Label htmlFor={`rhythm-${item.id}`} className="cursor-pointer text-sm font-normal leading-relaxed">
              {item.label}
            </Label>
          </li>
        ))}
      </ul>
    </div>
  )
}
