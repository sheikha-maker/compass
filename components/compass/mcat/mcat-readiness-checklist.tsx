"use client"

import Link from "next/link"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { MCAT_READINESS_KEY } from "@/lib/mcat"
import { mcatReadinessItems } from "@/lib/mcat-content"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

export function McatReadinessChecklist() {
  const [checked, setChecked, hydrated] = useLocalStorage<Record<string, boolean>>(MCAT_READINESS_KEY, {})

  const done = mcatReadinessItems.filter((i) => checked[i.id]).length
  const pct = Math.round((done / mcatReadinessItems.length) * 100)

  if (!hydrated) {
    return <div className="h-48 animate-pulse rounded-xl border border-border bg-muted/30" />
  }

  return (
    <div className="rounded-xl border border-border bg-card p-5">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-serif text-lg font-medium text-foreground">Am I ready to register?</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Honest self-check before locking in your test date. Not a guarantee, just guardrails.
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-semibold text-foreground">{done}/{mcatReadinessItems.length}</p>
          <p className="text-xs text-muted-foreground">items checked</p>
        </div>
      </div>
      <Progress value={pct} className="mt-4 h-2" />
      {pct < 50 && (
        <p className="mt-2 text-sm text-accent">
          Most students register with a plan, not perfection, but if burnout items are unchecked, visit the{" "}
          <Link href="/burnout-check" className="underline underline-offset-2">
            Burnout Self-Check
          </Link>{" "}
          first.
        </p>
      )}
      <ul className="mt-5 space-y-3">
        {mcatReadinessItems.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <Checkbox
              id={item.id}
              checked={!!checked[item.id]}
              onCheckedChange={(v) => setChecked({ ...checked, [item.id]: v === true })}
            />
            <Label htmlFor={item.id} className="cursor-pointer text-sm leading-relaxed font-normal text-foreground">
              {item.label}
            </Label>
          </li>
        ))}
      </ul>
    </div>
  )
}
