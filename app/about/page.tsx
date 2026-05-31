import { Compass, ArrowLeft, Heart, Mail, Quote } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const testimonials = [
  {
    quote: "Very tailored to pre-med students, and provides an organized way for students to keep track of their hours.",
    attribution: "Arun Purewal",
  },
  {
    quote: "I found it helpful that it was easy to navigate, and the guide had very helpful information.",
    attribution: "Karl Adriano",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-5 py-4 md:px-8">
          <Link href="/" className="flex items-center gap-2 text-foreground transition-colors hover:text-primary">
            <Compass className="h-5 w-5 text-primary" aria-hidden="true" />
            <span className="font-serif text-base font-semibold">The Pre-Med Compass</span>
          </Link>
          <Link href="/">
            <Button variant="ghost" size="sm" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Guide
            </Button>
          </Link>
        </div>
      </header>

      {/* Main content */}
      <main className="mx-auto max-w-3xl px-5 py-12 md:px-8 md:py-20">
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-1.5 text-sm text-primary">
          <Heart className="h-4 w-4" aria-hidden="true" />
          <span>Why I made this</span>
        </div>

        <h1 className="font-serif text-3xl font-semibold leading-tight text-foreground md:text-4xl lg:text-5xl">
          About The Pre-Med Compass
        </h1>

        {/* Author card */}
        <div className="mt-10 flex flex-col gap-6 rounded-2xl border border-border bg-card p-6 sm:flex-row sm:items-start md:p-8">
          <Image
            src="/ayaan-sheikh.jpg"
            alt="Ayaan Sheikh"
            width={120}
            height={120}
            className="rounded-2xl object-cover shrink-0 ring-2 ring-primary/20 self-center sm:self-start"
          />
          <div>
            <p className="font-serif text-2xl font-semibold text-foreground">Ayaan Sheikh</p>
            <p className="mt-1 text-sm font-medium text-primary">Sophomore · Neuroscience · Moravian University</p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              I&apos;m a sophomore neuroscience major who noticed burnout running through the pre-med community here at Moravian, and honestly, I experienced it myself. What I learned is that stability and intentional planning make an enormous difference. I built this guide because I wanted to share that with everyone else who might be struggling the same way.
            </p>
            <p className="mt-3 leading-relaxed text-muted-foreground">
              The advice I needed wasn&apos;t really out there, or at least not in a form that was sustainable, or written by someone who understood the specific workload Moravian pre-meds carry. So I wrote it myself.
            </p>
            <a
              href="mailto:sheikha@moravian.edu"
              className="mt-4 inline-flex items-center gap-1.5 text-sm text-primary hover:underline"
            >
              <Mail className="h-3.5 w-3.5" />
              sheikha@moravian.edu
            </a>
          </div>
        </div>

        {/* What this guide does */}
        <div className="mt-10 rounded-xl border border-border bg-card p-6 md:p-8">
          <p className="text-lg text-foreground">
            This isn&apos;t a checklist. It isn&apos;t a guarantee. It won&apos;t replace your advisor. What it{" "}
            <em className="font-serif italic">will</em> do:
          </p>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-primary" aria-hidden="true" />
              <span>Help you make intentional decisions instead of anxious ones</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-accent" aria-hidden="true" />
              <span>Help you avoid the pressure traps that derail good students</span>
            </li>
            <li className="flex gap-3">
              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-timeline-3" aria-hidden="true" />
              <span>Help you build a path that&apos;s actually yours</span>
            </li>
          </ul>
          <p className="mt-6 text-muted-foreground">
            Pre-med doesn&apos;t have to feel like a race. This guide is here to remind you of that.
          </p>
        </div>

        {/* Testimonials */}
        <div className="mt-10">
          <h2 className="font-serif text-xl font-semibold text-foreground">What students are saying</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {testimonials.map((t, i) => (
              <div key={i} className="rounded-xl border border-border bg-card p-5">
                <Quote className="mb-3 h-5 w-5 text-primary/40" aria-hidden="true" />
                <p className="leading-relaxed text-foreground">&ldquo;{t.quote}&rdquo;</p>
                <p className="mt-3 text-sm text-muted-foreground">— {t.attribution}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-xl border border-primary/20 bg-primary/5 p-6 md:p-8">
          <h2 className="font-serif text-xl font-semibold text-foreground">Ready to explore?</h2>
          <p className="mt-2 text-muted-foreground">
            Head back to the guide to find resources tailored to wherever you are in your journey.
          </p>
          <Link href="/" className="mt-4 inline-block">
            <Button className="gap-2">
              Start Exploring
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Button>
          </Link>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border bg-muted/30 py-8">
        <div className="mx-auto max-w-3xl px-5 text-center text-sm text-muted-foreground md:px-8">
          <p>Made with care for Moravian University pre-med students.</p>
        </div>
      </footer>
    </div>
  )
}
