"use client"

import { useEffect, useRef, useState } from "react"
import { Compass, ArrowDown, BookOpen, Stethoscope, GraduationCap, Rocket } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useTheme } from "next-themes"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Link from "next/link"

const timelineSteps = [
  { year: "Year 1", label: "Foundation", icon: BookOpen, color: "bg-timeline-1" },
  { year: "Year 2", label: "Explore", icon: Stethoscope, color: "bg-timeline-2" },
  { year: "Year 3", label: "Prepare", icon: GraduationCap, color: "bg-timeline-3" },
  { year: "Year 4", label: "Apply", icon: Rocket, color: "bg-timeline-4" },
]

const THEME_OPTIONS = [
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
  { value: "red", label: "Red" },
  { value: "green", label: "Green" },
  { value: "purple", label: "Purple" },
  { value: "brown", label: "Brown" },
]

function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  if (!mounted) return <div className="h-9 w-28 rounded-full bg-white/10" />

  return (
    <Select value={theme ?? "light"} onValueChange={(value) => setTheme(value)}>
      <SelectTrigger className="h-9 min-w-[112px] rounded-full text-sm">
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

function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    let animId: number
    const particles: { x: number; y: number; r: number; dx: number; dy: number; alpha: number }[] = []

    function resize() {
      if (!canvas) return
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }

    function spawn() {
      if (!canvas) return
      for (let i = 0; i < 38; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 2.5 + 0.5,
          dx: (Math.random() - 0.5) * 0.35,
          dy: (Math.random() - 0.5) * 0.35,
          alpha: Math.random() * 0.35 + 0.08,
        })
      }
    }

    function draw() {
      if (!canvas || !ctx) return
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(255,255,255,${p.alpha})`
        ctx.fill()
        p.x += p.dx
        p.y += p.dy
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
      }
      // Soft connecting lines
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dist = Math.hypot(particles[i].x - particles[j].x, particles[i].y - particles[j].y)
          if (dist < 90) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(255,255,255,${0.07 * (1 - dist / 90)})`
            ctx.lineWidth = 0.6
            ctx.stroke()
          }
        }
      }
      animId = requestAnimationFrame(draw)
    }

    resize()
    spawn()
    draw()

    window.addEventListener("resize", () => { resize(); particles.length = 0; spawn() })
    return () => { cancelAnimationFrame(animId) }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none absolute inset-0 h-full w-full"
      aria-hidden="true"
    />
  )
}

export function Hero() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  return (
    <section
      id="welcome"
      className="relative scroll-mt-20 overflow-hidden border-b border-border bg-primary text-foreground"
      style={{
        backgroundColor: "var(--color-primary)",
        backgroundImage: "linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 50%, var(--color-accent) 100%)",
      }}
    >
      <ParticleCanvas />

      {/* Glowing orbs */}
      <div className="pointer-events-none absolute -top-32 left-1/4 h-80 w-80 rounded-full opacity-20 blur-3xl" style={{background: "oklch(0.7 0.2 220)"}} aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-20 right-1/4 h-64 w-64 rounded-full opacity-15 blur-3xl" style={{background: "oklch(0.65 0.18 45)"}} aria-hidden="true" />

      <div className="relative mx-auto w-full max-w-4xl px-5 py-16 md:px-8 md:py-24">
        {/* Badge */}
        <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-primary-foreground/20 bg-primary-foreground/10 px-4 py-1.5 text-sm backdrop-blur-sm">
          <Compass className="h-4 w-4" aria-hidden="true" />
          <span>A guide for Moravian University pre-meds</span>
        </div>

        {/* Main headline */}
        <h1 className="text-balance font-serif text-4xl font-semibold leading-tight text-primary-foreground md:text-5xl lg:text-6xl">
          Navigate your pre-med journey with clarity and intention
        </h1>

        <p className="mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-primary-foreground/85 md:text-xl">
          A comprehensive resource designed to help you make thoughtful decisions, build meaningful experiences, and protect your well-being along the way.
        </p>

        {/* Timeline Visual */}
        <div className="mt-12 rounded-2xl border border-primary-foreground/15 bg-primary-foreground/8 p-6 backdrop-blur-sm md:p-8">
          <p className="mb-6 text-sm font-medium uppercase tracking-wider text-primary-foreground/70">Your Journey</p>
          <div className="relative">
            <div className="absolute left-6 top-6 hidden h-0.5 w-[calc(100%-3rem)] bg-primary-foreground/20 md:block" aria-hidden="true" />
            <div className="grid gap-4 md:grid-cols-4 md:gap-6">
              {timelineSteps.map((step, index) => (
                <Link
                  key={step.year}
                  href={`/your-path?year=${index}#year-compass`}
                  className="group relative flex items-start gap-4 rounded-xl p-3 text-left transition-all duration-200 hover:bg-primary-foreground/15 md:flex-col md:items-center md:text-center"
                >
                  <div className={`relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-full ${step.color} text-white shadow-lg transition-all duration-300 group-hover:scale-115 group-hover:shadow-xl`}>
                    <step.icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="md:mt-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-primary-foreground/60">{step.year}</p>
                    <p className="mt-0.5 font-medium text-primary-foreground">{step.label}</p>
                  </div>
                  {index < timelineSteps.length - 1 && (
                    <div className="absolute left-6 top-14 h-4 w-0.5 bg-primary-foreground/20 md:hidden" aria-hidden="true" />
                  )}
                </Link>
              ))}
            </div>
          </div>
        </div>

        {/* Value props */}
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {[
            { title: "Intentional Decisions", desc: "Make choices that align with your values, not pressure" },
            { title: "Sustainable Path", desc: "Build a journey you can maintain without burning out" },
            { title: "Moravian-Focused", desc: "Advice written for your specific context and workload" },
          ].map((v) => (
            <div key={v.title} className="rounded-xl border border-primary-foreground/15 bg-primary-foreground/8 p-4 backdrop-blur-sm transition-all duration-200 hover:bg-primary-foreground/15 hover:border-primary-foreground/30">
              <p className="font-semibold text-primary-foreground">{v.title}</p>
              <p className="mt-1 text-sm text-primary-foreground/70">{v.desc}</p>
            </div>
          ))}
        </div>

        {/* CTAs */}
        <div className="mt-10 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Button
            size="lg"
            variant="secondary"
            onClick={() => scrollTo("onboarding-quiz")}
            className="gap-2 shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl"
          >
            Get Started
            <ArrowDown className="h-4 w-4" />
          </Button>
          <Link href="/tools">
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground/30 bg-transparent text-primary-foreground transition-all duration-200 hover:bg-primary-foreground/15 hover:border-primary-foreground/50 hover:scale-105"
            >
              Jump to Tools
            </Button>
          </Link>
          <ThemePicker />
          <Link href="/about" className="sm:ml-auto">
            <Button
              variant="ghost"
              className="text-primary-foreground/80 hover:bg-primary-foreground/15 hover:text-primary-foreground transition-all duration-200"
            >
              About this guide
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}
