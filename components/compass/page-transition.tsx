"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<"in" | "out">("in")
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // Fade in on mount
    setPhase("in")
  }, [])

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      setPhase("out")
      const t = setTimeout(() => {
        setPhase("in")
        prevPathname.current = pathname
      }, 120)
      return () => clearTimeout(t)
    }
  }, [pathname])

  return (
    <div
      style={{
        opacity: phase === "in" ? 1 : 0,
        transform: phase === "in" ? "translateY(0) scale(1)" : "translateY(8px) scale(0.995)",
        transition: phase === "in"
          ? "opacity 0.35s ease, transform 0.35s ease"
          : "opacity 0.12s ease, transform 0.12s ease",
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}
