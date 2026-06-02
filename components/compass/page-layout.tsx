"use client"

import { useEffect, useState } from "react"
import { Compass, Menu, X, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useTheme } from "next-themes"

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "brown", label: "Brown" },
]

const TOOL_LINKS = [
  { href: "/tools/plan-check", label: "Plan & Check" },
  { href: "/tools/application-prep", label: "Application Prep" },
  { href: "/tools/milestones", label: "Milestones" },
  { href: "/tools/wellness-hours", label: "Wellness & Hours" },
  { href: "/tools/resources", label: "Resources" },
]

export type PageNavItem = {
  id: string
  label: string
  progress?: { done: number; total: number }
}

type Props = {
  title: string
  eyebrow: string
  description?: string
  backHref?: string
  navItems: PageNavItem[]
  children: React.ReactNode
}

function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-8 w-24 rounded-full bg-border/20" />

  return (
    <Select value={theme ?? "light"} onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="h-8 min-w-[104px] rounded-full text-sm">
        <SelectValue placeholder="Theme" />
      </SelectTrigger>
      <SelectContent>
        {THEME_OPTIONS.map((option) => (
          <SelectItem key={option.value} value={option.value} className="text-xs">
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}


export function PageLayout({ title, eyebrow, description, backHref = "/", navItems, children }: Props) {
  const [active, setActive] = useState(navItems[0]?.id ?? "")
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )
    navItems.forEach((item) => {
      const el = document.getElementById(item.id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [navItems])

  function handleClick(id: string) {
    setOpen(false)
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile top bar */}
      <header className="sticky top-0 z-40 flex items-center justify-between border-b border-border bg-sidebar/95 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2">
          <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
          <span className="font-serif text-base font-semibold text-foreground">The Pre-Med Compass</span>
        </div>
        <div className="flex items-center gap-1">
          <ThemePicker />
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close navigation" : "Open navigation"}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </header>

      {open && (
        <button
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        aria-label="Page sections"
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 transform overflow-y-auto border-r border-sidebar-border bg-sidebar transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Sidebar header */}
        <div className="flex flex-col gap-3 border-b border-sidebar-border px-6 py-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <Compass className="h-6 w-6 text-primary" aria-hidden="true" />
            <div>
              <p className="font-serif text-lg font-semibold leading-tight text-foreground">The Pre-Med Compass</p>
              <p className="text-xs text-muted-foreground">Moravian University</p>
            </div>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <ThemePicker />
          </div>
        </div>

        <div className="px-3 py-4">
          {/* Back to home */}
          <div className="mb-4">
            <Link
              href={backHref}
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Link>
          </div>

          <div className="mb-3 px-3 pb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            {eyebrow}
          </div>

          <ul className="space-y-0.5">
            {navItems.map((item) => (
              <li key={item.id}>
                <button
                  onClick={() => handleClick(item.id)}
                  className={cn(
                    "w-full rounded-md px-3 py-2 text-left text-sm transition-colors",
                    active === item.id
                      ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground"
                      : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground",
                  )}
                  aria-current={active === item.id ? "true" : undefined}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate">{item.label}</span>
                    {item.progress && (
                      <span
                        className={cn(
                          "shrink-0 text-[10px] font-semibold tabular-nums",
                          item.progress.done === item.progress.total
                            ? "text-green-600 dark:text-green-400"
                            : "text-muted-foreground",
                        )}
                      >
                        {item.progress.done}/{item.progress.total}
                      </span>
                    )}
                  </div>
                  {/* Mini progress bar */}
                  {item.progress && item.progress.total > 0 && (
                    <div className="mt-1.5 h-0.5 rounded-full bg-sidebar-border overflow-hidden">
                      <div
                        className={cn(
                          "h-full rounded-full transition-all duration-300",
                          item.progress.done === item.progress.total
                            ? "bg-green-500"
                            : "bg-primary/60",
                        )}
                        style={{
                          width: `${Math.round((item.progress.done / item.progress.total) * 100)}%`,
                        }}
                      />
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>

          {/* Nav between pages */}
          <div className="mt-6 border-t border-sidebar-border pt-4 space-y-0.5">
            <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Other Sections
            </p>
            {TOOL_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </nav>

      <main className="lg:pl-72">
        <div className="border-b border-border bg-primary px-5 py-10 text-primary-foreground md:px-8 md:py-14">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/60">{eyebrow}</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">{title}</h1>
            {description && (
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-primary-foreground/80">{description}</p>
            )}
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
