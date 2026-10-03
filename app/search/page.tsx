"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Search as SearchIcon } from "lucide-react"
import { SidebarNav } from "@/components/compass/sidebar-nav"
import { SiteFooter } from "@/components/compass/resources"

const entries = [
  ["Building Your Path", "Year-by-year compass, course survival guides, experiences, peers, and mentorship.", "/your-path"],
  ["The Big Milestones", "MCAT planning, application timeline, and pre-med FAQ.", "/milestones"],
  ["Mindset", "Mindfulness, decision tools, comparison, and sustainable habits.", "/mindset"],
  ["Application Prep", "School list, applications, essays, secondaries, and interview practice.", "/tools/application-prep"],
  ["Plan & Check", "Prerequisites, GPA planning, course calendar, and MCAT countdown.", "/tools/plan-check"],
  ["Wellness", "Weekly wellbeing check-ins and reflection trends.", "/tools/wellness"],
  ["Hours Tracker", "Activity logs, experience categories, and reflections.", "/tools/hours"],
  ["Resources", "Curated Moravian, MCAT, clinical, application, and wellbeing links.", "/tools/resources"],
  ["Burnout Check", "A private reflection tool for noticing burnout signals.", "/burnout-check"],
  ["Pre-Health Club", "Templates for the Pre-Health Club executive board.", "/pre-health-club"],
] as const

export default function SearchPage() {
  const [query, setQuery] = useState("")
  const results = useMemo(() => { const value = query.trim().toLowerCase(); return value ? entries.filter(([title, description]) => `${title} ${description}`.toLowerCase().includes(value)) : entries }, [query])
  return <div className="min-h-screen bg-background"><SidebarNav /><main className="lg:pl-72"><div className="mx-auto max-w-4xl px-5 py-12 md:px-8 md:py-20"><p className="text-sm font-semibold uppercase tracking-wider text-accent">Find your next step</p><h1 className="mt-2 font-serif text-3xl font-semibold text-foreground md:text-4xl">Search the guide</h1><p className="mt-3 max-w-2xl text-muted-foreground">Jump straight to a topic, tool, or resource instead of scanning every section.</p><label className="relative mt-8 block"><span className="sr-only">Search the guide</span><SearchIcon className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" aria-hidden="true" /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Try “MCAT”, “wellness”, or “applications”" className="w-full rounded-xl border border-border bg-card py-3 pl-12 pr-4 text-foreground outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20" /></label><p className="mt-5 text-sm text-muted-foreground">{results.length} {results.length === 1 ? "result" : "results"}</p><div className="mt-4 grid gap-4 sm:grid-cols-2">{results.map(([title, description, href]) => <Link key={href} href={href} className="rounded-2xl border border-border bg-card p-5 transition hover:-translate-y-0.5 hover:border-primary/50 hover:shadow-lg"><h2 className="font-serif text-xl font-semibold text-foreground">{title}</h2><p className="mt-2 text-sm leading-relaxed text-muted-foreground">{description}</p><span className="mt-4 inline-block text-sm font-semibold text-primary">Open section →</span></Link>)}</div>{results.length === 0 && <p className="mt-8 rounded-xl border border-dashed border-border p-8 text-center text-muted-foreground">No matches yet. Try a broader term or <a className="text-primary underline" href="mailto:sheikha@moravian.edu?subject=Pre-Med%20Compass%20search%20suggestion">suggest a topic</a>.</p>}</div><SiteFooter /></main></div>
}
