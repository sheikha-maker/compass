"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

// Spring-like easing: fast in, gentle settle
const EASE_IN  = "cubic-bezier(0.32, 0, 0.67, 0)"
const EASE_OUT = "cubic-bezier(0.16, 1, 0.3, 1)"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [phase, setPhase] = useState<"idle" | "out" | "in">("in")
  const prevPathname = useRef(pathname)

  useEffect(() => {
    if (prevPathname.current === pathname) return
    setPhase("out")
    const t = setTimeout(() => {
      setPhase("in")
      prevPathname.current = pathname
    }, 100)
    return () => clearTimeout(t)
  }, [pathname])

  const style =
    phase === "out"
      ? { opacity: 0, transform: "translateY(6px) scale(0.993)", transition: `opacity 0.1s ${EASE_IN}, transform 0.1s ${EASE_IN}` }
      : { opacity: 1, transform: "translateY(0) scale(1)",        transition: `opacity 0.45s ${EASE_OUT}, transform 0.45s ${EASE_OUT}` }

  return (
    <div style={{ ...style, willChange: "opacity, transform" }}>
      {children}
    </div>
  )
}
