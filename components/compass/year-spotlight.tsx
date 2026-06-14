"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { ONBOARDING_STORAGE_KEY, onboardingOptions, type OnboardingYearId } from "@/lib/onboarding"
import { Reveal } from "@/components/compass/reveal"

export function YearSpotlight() {
  const [yearId, setYearId] = useState<OnboardingYearId | null>(null)

  useEffect(() => {
    try {
      const raw = localStorage.getItem(ONBOARDING_STORAGE_KEY)
      if (!raw) return
      const parsed = JSON.parse(raw) as { year?: OnboardingYearId }
      if (parsed.year) setYearId(parsed.year)
    } catch {}
  }, [])

  if (!yearId) return null

  const option = onboardingOptions.find((o) => o.id === yearId)
  if (!option || !option.recommendations?.length) return null

  return (
    <Reveal>
      <section className="border-b border-border bg-muted/30 px-5 py-10 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Personalized for you · {option.label}
          </p>
          <h2 className="mt-1 font-serif text-xl font-semibold text-foreground">
            Where to focus right now
          </h2>

          <div className="mt-4 grid gap-3 sm:grid-cols-3">
            {option.recommendations.map((rec, i) => (
              <Reveal key={rec.href} delay={i * 70}>
                <Link
                  href={rec.href}
                  className="group flex items-start justify-between gap-3 rounded-xl border border-border bg-card px-4 py-3.5 text-sm transition-all duration-200 hover:border-primary/50 hover:shadow-md hover:-translate-y-0.5"
                >
                  <div>
                    <p className="font-medium text-foreground">{rec.label}</p>
                    {rec.description && (
                      <p className="mt-0.5 text-xs text-muted-foreground">{rec.description}</p>
                    )}
                  </div>
                  <ArrowRight className="mt-0.5 h-3.5 w-3.5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:text-primary" aria-hidden />
                </Link>
              </Reveal>
            ))}
          </div>

          <p className="mt-4 text-xs text-muted-foreground">
            Not a {option.label.toLowerCase()}?{" "}
            <button
              onClick={() => {
                localStorage.removeItem(ONBOARDING_STORAGE_KEY)
                setYearId(null)
                window.scrollTo({ top: 0, behavior: "smooth" })
              }}
              className="underline underline-offset-2 hover:text-foreground transition-colors"
            >
              Update your year
            </button>
          </p>
        </div>
      </section>
    </Reveal>
  )
}
