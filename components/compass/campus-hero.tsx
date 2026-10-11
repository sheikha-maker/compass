"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, Compass } from "lucide-react"
import { Button } from "@/components/ui/button"

export function CampusHero() {
  return (
    <section className="relative isolate overflow-hidden border-b border-border bg-[#f8f7f3] dark:bg-background">
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hub-hero.png"
          alt="Moravian University Haupert Union Building"
          fill
          priority
          className="object-cover object-center opacity-55 dark:opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#f8f7f3]/92 via-[#f8f7f3]/62 to-[#f8f7f3]/18 dark:from-background/88 dark:via-background/55 dark:to-background/15" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-16 md:grid-cols-[1.05fr_0.95fr] md:items-center md:px-8 md:py-24">
        <div>
          <div className="inline-flex items-center gap-2 text-sm font-medium uppercase tracking-[0.18em] text-primary">
            <Compass className="size-4" aria-hidden="true" />
            Moravian pre-meds
          </div>
          <h1 className="mt-6 max-w-3xl font-serif text-5xl font-semibold leading-[0.98] tracking-tight text-[#102f59] dark:text-foreground md:text-7xl">
            Your pre-med journey, all in one place.
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-[#263b55]/80 dark:text-muted-foreground md:text-xl">
            A student-built guide to help you plan your path, track your experiences, and stay balanced on the road to medical school.
          </p>
        </div>
        <div className="hidden md:block" aria-hidden="true" />
      </div>
    </section>
  )
}

export function ValuePillars() {
  const pillars = [
            ["Plan thoughtfully", "Build a clear academic and application plan before the next decision.", "plan"],
    ["Track honestly", "Keep a useful record of experiences, hours, and progress over time.", "track"],
    ["Stay well", "Make room for reflection, support, and a sustainable pace.", "well"],
  ] as const

  return (
    <section className="bg-[#f8f7f3] px-5 py-16 dark:bg-background md:px-8 md:py-20">
      <div className="mx-auto max-w-5xl text-center">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary">Built for the whole journey</p>
        <h2 className="mx-auto mt-4 max-w-3xl font-serif text-4xl font-semibold leading-tight text-[#102f59] dark:text-foreground md:text-5xl">
          Plan thoughtfully. Track honestly. Stay well.
        </h2>
        <div className="mt-12 grid gap-8 md:grid-cols-3 md:divide-x md:divide-border">
          {pillars.map(([title, description]) => (
            <div key={title} className="px-4 text-center">
              <h3 className="font-serif text-2xl font-semibold capitalize text-[#102f59] dark:text-foreground">{title}</h3>
              <p className="mx-auto mt-3 max-w-xs leading-relaxed text-muted-foreground">{description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export function StoryFooter() {
  return (
    <section className="relative overflow-hidden rounded-t-[3rem] bg-[#102f59] px-5 py-16 text-center text-white md:px-8 md:py-20">
      <div className="relative mx-auto max-w-3xl">

        <p className="mx-auto mt-4 max-w-xl text-white/75">A focused guide for Moravian pre-med students.</p>
        <Link href="/your-path" className="mt-8 inline-block">
          <Button size="lg" variant="secondary" className="rounded-full gap-2 px-7">
            Start planning <ArrowRight data-icon="inline-end" />
          </Button>
        </Link>
      </div>
    </section>
  )
}
