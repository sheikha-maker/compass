"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight, Compass, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  ONBOARDING_STORAGE_KEY,
  onboardingOptions,
  type OnboardingYearId,
  getOnboardingOption,
} from "@/lib/onboarding"
import { cn } from "@/lib/utils"

export function OnboardingQuiz() {
  const [selected, setSelected] = useState<OnboardingYearId | null>(null)
  const [collapsed, setCollapsed] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(ONBOARDING_STORAGE_KEY)
      if (stored) {
        const parsed = JSON.parse(stored) as { year?: OnboardingYearId; collapsed?: boolean }
        if (parsed.year) setSelected(parsed.year)
        if (parsed.collapsed) setCollapsed(true)
      }
    } catch {}
    setHydrated(true)
  }, [])

  const persist = (year: OnboardingYearId | null, isCollapsed: boolean) => {
    try {
      localStorage.setItem(
        ONBOARDING_STORAGE_KEY,
        JSON.stringify({ year, collapsed: isCollapsed })
      )
    } catch {}
  }

  const handleSelect = (id: OnboardingYearId) => {
    setSelected(id)
    setCollapsed(false)
    persist(id, false)
  }

  const handleDismiss = () => {
    setCollapsed(true)
    persist(selected, true)
  }

  const handleReset = () => {
    setSelected(null)
    setCollapsed(false)
    persist(null, false)
  }

  if (!hydrated) {
    return (
      <section id="onboarding-quiz" className="scroll-mt-20 border-b border-border py-14 md:py-20">
        <div className="mx-auto h-48 max-w-3xl animate-pulse rounded-xl bg-muted/40 px-5 md:px-8" />
      </section>
    )
  }

  const result = selected ? getOnboardingOption(selected) : null

  if (collapsed && selected && result) {
    return (
      <section id="onboarding-quiz" className="scroll-mt-20 border-b border-border py-6">
        <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-5 md:px-8">
          <p className="text-sm text-muted-foreground">
            Your path: <span className="font-medium text-foreground">{result.label}</span>
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" asChild>
              <Link href={result.href}>Continue</Link>
            </Button>
            <Button variant="ghost" size="sm" onClick={handleReset} className="gap-1">
              <RotateCcw className="h-3.5 w-3.5" aria-hidden />
              Retake quiz
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="onboarding-quiz" className="scroll-mt-20 border-b border-border py-14 md:py-20">
      <div className="mx-auto w-full max-w-3xl px-5 md:px-8">
        <header className="mb-8">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm text-primary">
            <Compass className="h-4 w-4" aria-hidden />
            Quick start
          </div>
          <h2 className="font-serif text-3xl font-semibold text-foreground md:text-4xl">
            Where are you in your journey?
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Pick the option closest to you, we&apos;ll point you to the right sections. No account needed.
          </p>
        </header>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {onboardingOptions.map((opt) => (
            <button
              key={opt.id}
              type="button"
              onClick={() => handleSelect(opt.id)}
              className={cn(
                "rounded-xl border p-4 text-left transition-all duration-200",
                selected === opt.id
                  ? "border-primary bg-primary/5 shadow-md ring-1 ring-primary/20"
                  : "border-border bg-card hover:border-primary/40 hover:shadow-sm"
              )}
            >
              <p className="font-serif text-lg font-medium text-foreground">{opt.label}</p>
              <p className="mt-0.5 text-sm text-muted-foreground">{opt.subtitle}</p>
            </button>
          ))}
        </div>

        {result && (
          <div
            className="mt-8 rounded-2xl border border-primary/25 bg-gradient-to-br from-primary/5 to-accent/5 p-6"
            role="status"
          >
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">Your starting point</p>
            <p className="mt-2 font-serif text-xl font-semibold text-foreground">
              {result.label}: here&apos;s where to begin
            </p>
            <ul className="mt-4 space-y-3">
              {result.recommendations.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-start justify-between gap-3 rounded-lg border border-border bg-card p-3 transition-colors hover:border-primary/40"
                  >
                    <div>
                      <p className="font-medium text-foreground">{link.label}</p>
                      {link.description && (
                        <p className="mt-0.5 text-sm text-muted-foreground">{link.description}</p>
                      )}
                    </div>
                    <ArrowRight className="mt-0.5 h-4 w-4 shrink-0 text-primary transition-transform group-hover:translate-x-0.5" />
                  </Link>
                </li>
              ))}
            </ul>
            <div className="mt-6 flex flex-wrap gap-3">
              <Button asChild>
                <Link href={result.href}>Go to main recommendation</Link>
              </Button>
              <Button variant="outline" onClick={handleDismiss}>
                Got it. Show full guide
              </Button>
            </div>
          </div>
        )}

        {!selected && (
          <p className="mt-6 text-center text-sm text-muted-foreground">
            Not sure? Scroll down to{" "}
            <button
              type="button"
              className="text-primary underline underline-offset-2"
              onClick={() => document.getElementById("start-here")?.scrollIntoView({ behavior: "smooth" })}
            >
              situation-based paths
            </button>
            .
          </p>
        )}
      </div>
    </section>
  )
}
