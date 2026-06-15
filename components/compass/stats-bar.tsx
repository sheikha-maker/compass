"use client"

import { useEffect, useRef, useState } from "react"
import { Reveal } from "@/components/compass/reveal"

type Stat = {
  value: number
  suffix?: string
  label: string
  description: string
}

const STATS: Stat[] = [
  { value: 4,  label: "Years covered",       description: "Freshman through senior year, with gap year guidance" },
  { value: 32, label: "Milestone checkboxes", description: "A year-by-year checklist built for Moravian students"  },
  { value: 7,  label: "Course guides",        description: "Survival strategies for the hardest pre-med courses"   },
  { value: 14, label: "FAQ answers",          description: "Honest answers to the questions pre-meds ask most"     },
]

function useCountUp(target: number, duration = 1200, started: boolean) {
  const [count, setCount] = useState(0)
  const frameRef = useRef<number | null>(null)
  const startRef = useRef<number | null>(null)

  useEffect(() => {
    if (!started) return

    // Skip animation for prefers-reduced-motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCount(target)
      return
    }

    function tick(ts: number) {
      if (!startRef.current) startRef.current = ts
      const elapsed = ts - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * target))
      if (progress < 1) frameRef.current = requestAnimationFrame(tick)
    }

    frameRef.current = requestAnimationFrame(tick)
    return () => { if (frameRef.current) cancelAnimationFrame(frameRef.current) }
  }, [target, duration, started])

  return count
}

function StatItem({ stat, started, index }: { stat: Stat; started: boolean; index: number }) {
  const count = useCountUp(stat.value, 1000 + index * 100, started)

  return (
    <Reveal delay={index * 100}>
      <div className="group flex flex-col items-center text-center px-4 py-6 rounded-2xl border border-border bg-card transition-all duration-200 hover:border-primary/40 hover:shadow-md hover:-translate-y-0.5">
        <p className="font-serif text-5xl font-bold tabular-nums text-primary transition-transform duration-200 group-hover:scale-110">
          {count}
          {stat.suffix ?? "+"}
        </p>
        <p className="mt-1.5 font-semibold text-foreground">{stat.label}</p>
        <p className="mt-1 text-xs leading-relaxed text-muted-foreground max-w-[140px]">
          {stat.description}
        </p>
      </div>
    </Reveal>
  )
}

export function StatsBar() {
  const ref = useRef<HTMLDivElement>(null)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setStarted(true); return }
    const node = ref.current
    if (!node) { setStarted(true); return }
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setStarted(true); observer.disconnect() } },
      { threshold: 0.3 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <section ref={ref} className="border-b border-border bg-muted/20 px-5 py-12 md:px-8">
      <div className="mx-auto max-w-4xl">
        <Reveal>
          <p className="mb-6 text-center text-sm font-semibold uppercase tracking-wider text-muted-foreground">
            What's inside the guide
          </p>
        </Reveal>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {STATS.map((stat, i) => (
            <StatItem key={stat.label} stat={stat} started={started} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}
