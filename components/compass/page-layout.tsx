"use client"

import { useEffect, useState } from "react"
import { Compass, Menu, X, Info, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

export type PageNavItem = {
  id: string
  label: string
}

type Props = {
  title: string
  eyebrow: string
  backHref?: string
  navItems: PageNavItem[]
  children: React.ReactNode
}

export function PageLayout({ title, eyebrow, backHref = "/", navItems, children }: Props) {
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
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
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
        <div className="flex items-center gap-2 border-b border-sidebar-border px-6 py-5">
          <Compass className="h-6 w-6 text-primary" aria-hidden="true" />
          <div>
            <p className="font-serif text-lg font-semibold leading-tight text-foreground">The Pre-Med Compass</p>
            <p className="text-xs text-muted-foreground">Moravian University</p>
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
                  {item.label}
                </button>
              </li>
            ))}
          </ul>

          {/* Nav between pages */}
          <div className="mt-6 border-t border-sidebar-border pt-4 space-y-0.5">
            <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">Other Sections</p>
            {[
              { href: "/mindset", label: "Mindset" },
              { href: "/your-path", label: "Building Your Path" },
              { href: "/milestones", label: "The Big Milestones" },
              { href: "/tools", label: "Your Tools" },
            ].map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/about"
              className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-sidebar-accent/60 hover:text-foreground"
            >
              <Info className="h-4 w-4" />
              About this guide
            </Link>
          </div>
        </div>
      </nav>

      <main className="lg:pl-72">
        {/* Page hero */}
        <div className="border-b border-border bg-primary px-5 py-10 text-primary-foreground md:px-8 md:py-14">
          <div className="mx-auto max-w-4xl">
            <p className="text-sm font-medium uppercase tracking-wider text-primary-foreground/60">{eyebrow}</p>
            <h1 className="mt-2 font-serif text-3xl font-semibold md:text-4xl">{title}</h1>
          </div>
        </div>
        {children}
      </main>
    </div>
  )
}
