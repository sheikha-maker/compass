"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Palette } from "lucide-react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

const THEME_OPTIONS = [
  { value: "light",  label: "Light"  },
  { value: "dark",   label: "Dark"   },
  { value: "navy",   label: "Navy"   },
  { value: "teal",   label: "Teal"   },
  { value: "green",  label: "Green"  },
  { value: "gold",   label: "Gold"   },
  { value: "red",    label: "Red"    },
  { value: "purple", label: "Purple" },
  { value: "mauve",  label: "Mauve"  },
  { value: "brown",  label: "Brown"  },
]

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-8 w-full animate-pulse rounded-md bg-sidebar-accent/30" />

  return (
    <div className="flex items-center gap-2">
      <Palette className="h-3.5 w-3.5 shrink-0 text-muted-foreground" aria-hidden="true" />
      <Select value={theme ?? "light"} onValueChange={setTheme}>
        <SelectTrigger className="h-8 flex-1 text-xs border-sidebar-border bg-sidebar-accent/30 hover:bg-sidebar-accent/50 focus:ring-1 focus:ring-ring">
          <SelectValue placeholder="Theme" />
        </SelectTrigger>
        <SelectContent>
          {THEME_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value} className="text-xs">
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
