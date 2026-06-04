"use client"

import { useState } from "react"
import { Compass, Menu, X, Info } from "lucide-react"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { usePathname } from "next/navigation"
import { AuthButton } from "@/components/compass/auth-button"

const sectionLinks = [
  { href: "/", label: "Home & Start Here", group: "Start" },
  { href: "/mindset", label: "Mindset", group: "Sections" },
  { href: "/burnout-check", label: "✦ Burnout Self-Check", group: "Sections" },
  { href: "/your-path", label: "Building Your Path", group: "Sections" },
  { href: "/milestones", label: "The Big Milestones", group: "Sections" },
  { href: "/tools/plan-check", label: "Plan & Check", group: "Tools" },
  { href: "/tools/application-prep", label: "Application Prep", group: "Tools" },
  { href: "/tools/milestones", label: "Milestones", group: "Tools" },
  { href: "/tools/wellness-hours", label: "Wellness & Hours", group: "Tools" },
  { href: "/tools/resources", label: "Resources", group: "Tools" },
  { href: "/about", label: "About this guide", group: "About" },
]

const groups = ["Start", "Sections", "Tools", "About"]

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

      {open && (
        <button
          className="fixed inset-0 z-40 bg-foreground/30 lg:hidden"
          aria-label="Close navigation"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Sidebar */}
      <nav
        aria-label="Guide sections"
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

        <div className="border-b border-sidebar-border px-4 py-3">
          <AuthButton />
        </div>

        <div className="px-3 py-4">
          {groups.map((group) => (
            <div key={group} className="mb-5">
              <p className="px-3 pb-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                {group}
              </p>
              <ul className="space-y-0.5">
                {sectionLinks
                  .filter((l) => l.group === group)
                  .map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex w-full items-center gap-2 rounded-md px-3 py-2 text-left text-sm transition-all duration-150",
                          pathname === link.href
                            ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground shadow-sm"
                            : "text-muted-foreground hover:bg-sidebar-accent/60 hover:text-foreground hover:translate-x-0.5",
                        )}
                        aria-current={pathname === link.href ? "page" : undefined}
                      >
                        {link.href === "/about" && <Info className="h-4 w-4 shrink-0" />}
                        {link.label}
                      </Link>
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
      </nav>
    </>
  )
}
