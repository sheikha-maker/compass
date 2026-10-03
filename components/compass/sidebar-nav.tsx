"use client"

import { useState } from "react"
import {
  Compass, Menu, X, Home, Brain, Map, BookOpen,
  ClipboardList, FileText, HeartPulse,
  Library, Info, Activity, Users, Search, Landmark
} from "lucide-react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { ThemePicker } from "@/components/compass/theme-picker"

const AuthButton = dynamic(
  () => import("@/components/compass/auth-button").then((mod) => mod.AuthButton),
  { ssr: false, loading: () => <div className="h-9 w-full animate-pulse rounded-md bg-sidebar-accent/30" /> },
)

const sectionLinks = [
  { href: "/",                       label: "Home",                group: "Start",     icon: Home         },
  { href: "/mindset",                label: "Mindset",             group: "Sections",  icon: Brain        },
  { href: "/your-path",              label: "Building Your Path",  group: "Sections",  icon: Map          },
  { href: "/milestones",             label: "The Big Milestones",  group: "Sections",  icon: BookOpen     },
  { href: "/tools/plan-check",       label: "Plan & Check",        group: "Plan",      icon: ClipboardList},
  { href: "/tools/application-prep", label: "Application Prep",    group: "Plan",      icon: FileText     },
  { href: "/tools/resources",        label: "Resources",           group: "Plan",      icon: Library      },
  { href: "/search",                 label: "Search the guide",    group: "Plan",      icon: Search       },
  { href: "/pre-health-club",        label: "Pre-Health Club",      group: "Campus Community", icon: Users    },
  { href: "/alpha-epsilon-delta",    label: "Alpha Epsilon Delta",  group: "Campus Community", icon: Landmark },
  { href: "/tools/wellness-hours",   label: "Wellness & Hours",    group: "Wellbeing", icon: HeartPulse  },
  { href: "/burnout-check",          label: "Burnout Check",       group: "Wellbeing", icon: Activity     },
  { href: "/about",                  label: "About this guide",    group: "About",     icon: Info         },
]

const groups = ["Start", "Sections", "Plan", "Wellbeing", "Campus Community", "About"]

export function SidebarNav() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <>
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

      {/* Mobile overlay */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-background/60 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar */}
      <nav
        className={cn(
          "fixed inset-y-0 left-0 z-40 flex w-72 flex-col border-r border-border bg-sidebar transition-transform duration-200 ease-in-out lg:translate-x-0",
          open ? "translate-x-0 shadow-xl" : "-translate-x-full"
        )}
        aria-label="Guide sections"
      >
        {/* Logo */}
        <div className="flex items-center gap-2.5 border-b border-border px-5 py-4">
          <Compass className="h-6 w-6 text-primary shrink-0" aria-hidden="true" />
          <span className="font-serif text-base font-semibold text-foreground leading-tight">
            The Pre-Med Compass
          </span>
          <button
            onClick={() => setOpen(false)}
            className="ml-auto text-muted-foreground hover:text-foreground lg:hidden"
            aria-label="Close navigation"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-3 py-4 space-y-5">
          {groups.map((group) => {
            const links = sectionLinks.filter((l) => l.group === group)
            if (!links.length) return null
            return (
              <div key={group}>
                <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  {group}
                </p>
                <ul className="space-y-0.5">
                  {links.map((link) => {
                    const Icon = link.icon
                    const active = pathname === link.href
                    return (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className={cn(
                            "flex w-full items-center gap-2.5 rounded-lg px-3 py-2 text-sm transition-all duration-150",
                            active
                              ? "bg-sidebar-accent font-semibold text-sidebar-accent-foreground shadow-sm"
                              : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground hover:translate-x-0.5"
                          )}
                          aria-current={active ? "page" : undefined}
                        >
                          <Icon
                            className={cn(
                              "h-4 w-4 shrink-0 transition-colors",
                              active ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
                            )}
                            aria-hidden="true"
                          />
                          {link.label}
                        </Link>
                      </li>
                    )
                  })}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Theme + Auth */}
        <div className="border-t border-border px-4 py-3 space-y-2">
          <ThemePicker />
          <AuthButton />
        </div>
      </nav>
    </>
  )
}
