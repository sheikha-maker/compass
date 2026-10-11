"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight, Command, Search, X } from "lucide-react"
import { Button } from "@/components/ui/button"

const destinations = [
  { href: "/your-path", label: "Your Path", description: "Year-by-year compass and milestones" },
  { href: "/tools/plan-check", label: "Plan & Check", description: "Prerequisites, GPA, courses, and MCAT" },
  { href: "/tools/application-prep", label: "Application Prep", description: "School list, essays, and application planning" },
  { href: "/tools/hours", label: "Hours Tracker", description: "Clinical, research, service, and volunteer hours" },
  { href: "/tools/wellness", label: "Wellbeing", description: "Check-ins and sustainable habits" },
  { href: "/tools/resources", label: "Resources", description: "Curated Moravian and pre-med links" },
]

export function GlobalCommandMenu() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const filtered = useMemo(() => destinations.filter((item) =>
    `${item.label} ${item.description}`.toLowerCase().includes(query.toLowerCase())
  ), [query])

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault()
        setOpen((value) => !value)
      }
      if (event.key === "Escape") setOpen(false)
    }
    window.addEventListener("keydown", onKeyDown)
    return () => window.removeEventListener("keydown", onKeyDown)
  }, [])

  return (
    <>
      <Button variant="outline" size="sm" onClick={() => setOpen(true)} className="h-8 gap-2 rounded-full bg-background/90 px-3 text-xs shadow-sm">
        <Search className="h-3.5 w-3.5" aria-hidden="true" />
        <span className="hidden sm:inline">Find a tool</span>
        <kbd className="hidden rounded border border-border px-1 text-[10px] text-muted-foreground sm:inline">⌘K</kbd>
        <span className="sr-only">Open site search</span>
      </Button>
      {open && (
        <div className="fixed inset-0 z-[70] flex items-start justify-center bg-foreground/30 px-4 pt-[12vh]" onClick={() => setOpen(false)}>
          <div role="dialog" aria-modal="true" aria-label="Find a tool or section" className="w-full max-w-xl overflow-hidden rounded-2xl border border-border bg-background shadow-2xl" onClick={(event) => event.stopPropagation()}>
            <div className="flex items-center gap-3 border-b border-border px-4">
              <Search className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
              <input autoFocus value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search sections and tools…" className="h-14 min-w-0 flex-1 bg-transparent text-sm outline-none" />
              <button onClick={() => setOpen(false)} aria-label="Close search"><X className="h-4 w-4 text-muted-foreground" /></button>
            </div>
            <div className="max-h-[55vh] overflow-y-auto p-2">
              {filtered.length ? filtered.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-xl px-3 py-3 hover:bg-muted">
                  <div className="min-w-0 flex-1"><p className="text-sm font-semibold">{item.label}</p><p className="text-xs text-muted-foreground">{item.description}</p></div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" aria-hidden="true" />
                </Link>
              )) : <p className="p-6 text-center text-sm text-muted-foreground">No matching tools or sections.</p>}
            </div>
            <div className="flex items-center gap-2 border-t border-border px-4 py-3 text-xs text-muted-foreground"><Command className="h-3.5 w-3.5" /> Press Command K anytime to search</div>
          </div>
        </div>
      )}
    </>
  )
}

export function ContinuePrompt() {
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const hasVisited = sessionStorage.getItem("pmc_continue_seen")
    if (!hasVisited) setVisible(true)
  }, [])
  if (!visible) return null
  return (
    <aside className="fixed bottom-5 left-5 z-50 w-[min(22rem,calc(100vw-2.5rem))] rounded-2xl border border-border bg-background/95 p-4 shadow-2xl backdrop-blur" aria-label="Continue where you left off">
      <button onClick={() => { sessionStorage.setItem("pmc_continue_seen", "1"); setVisible(false) }} className="absolute right-3 top-3 rounded-full p-1 text-muted-foreground hover:bg-muted" aria-label="Dismiss continue prompt"><X className="h-4 w-4" /></button>
      <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary">Pick up where you left off</p>
      <p className="mt-2 pr-5 text-sm leading-relaxed text-muted-foreground">Your next step is waiting in the Compass. Start with your path or jump straight into a tool.</p>
      <div className="mt-3 flex gap-2"><Link href="/your-path" onClick={() => sessionStorage.setItem("pmc_continue_seen", "1")}><Button size="sm" className="rounded-full">Continue <ArrowRight className="ml-1 h-3.5 w-3.5" /></Button></Link><button onClick={() => { sessionStorage.setItem("pmc_continue_seen", "1"); setVisible(false) }} className="px-2 text-xs font-medium text-muted-foreground">Not now</button></div>
    </aside>
  )
}

export function EmptyState({ title, description, actionHref, actionLabel }: { title: string; description: string; actionHref?: string; actionLabel?: string }) {
  return <div className="editorial-card flex flex-col items-center justify-center px-6 py-12 text-center"><div className="rounded-full bg-primary/10 p-3"><Search className="h-5 w-5 text-primary" aria-hidden="true" /></div><h2 className="mt-4 font-serif text-2xl font-semibold">{title}</h2><p className="mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">{description}</p>{actionHref && actionLabel && <Link href={actionHref} className="mt-5"><Button className="rounded-full">{actionLabel}<ArrowRight className="ml-1 h-4 w-4" /></Button></Link>}</div>
}

export function GuideNote() {
  return <p className="text-xs leading-relaxed text-muted-foreground">This guide is maintained for Moravian pre-med students. Confirm current requirements and deadlines with your advisor before making application decisions.</p>
}
