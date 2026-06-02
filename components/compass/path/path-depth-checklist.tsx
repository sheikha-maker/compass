"use client"

import Link from "next/link"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { pathDepthChecklistItems } from "@/lib/path-content"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"

const STORAGE_KEY = "pmc_path_depth_v1"

export function PathDepthChecklist() {
  const [checked, setChecked, hydrated] = useLocalStorage<Record<string, boolean>>(STORAGE_KEY, {})
  const done = pathDepthChecklistItems.filter((i) => checked[i.id]).length
  const pct = Math.round((done / pathDepthChecklistItems.length) * 100)

  if (!hydrated) {
    return <div className="h-36 animate-pulse rounded-xl border border-border bg-muted/30" />
  }

  return (
    <div className="rounded-xl border border-timeline-2/30 bg-timeline-2/5 p-5 md:p-6">
      <p className="font-serif text-lg font-medium text-foreground">Depth over checklist panic</p>
      <p className="mt-1 text-sm text-muted-foreground">
        Schools read for growth and reflection. Use this when you worry you&apos;re &quot;behind.&quot;
      </p>
      <Progress value={pct} className="mt-4 h-2" />
      <ul className="mt-4 space-y-3">
        {pathDepthChecklistItems.map((item) => (
          <li key={item.id} className="flex items-start gap-3">
            <Checkbox
              id={item.id}
              checked={!!checked[item.id]}
              onCheckedChange={(v) => setChecked({ ...checked, [item.id]: v === true })}
            />
            <Label htmlFor={item.id} className="cursor-pointer text-sm font-normal leading-relaxed">
              {item.label}
            </Label>
          </li>
        ))}
      </ul>
      {done < 3 && (
        <p className="mt-4 text-sm text-muted-foreground">
          Start with your advisor and the{" "}
          <Link href="/your-path#year-compass" className="text-primary underline underline-offset-2">
            Year-by-Year Compass
          </Link>
          . You have more time than the group chat suggests.
        </p>
      )}
    </div>
  )
}
