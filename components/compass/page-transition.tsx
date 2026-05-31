"use client"

import { usePathname } from "next/navigation"
import { useEffect, useRef, useState } from "react"

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [visible, setVisible] = useState(false)
  const prevPathname = useRef(pathname)

  useEffect(() => {
    // Fade in on mount
    const t = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(t)
  }, [])

  useEffect(() => {
    if (prevPathname.current !== pathname) {
      // Brief fade out then back in on route change
      setVisible(false)
      const t = setTimeout(() => {
        setVisible(true)
        prevPathname.current = pathname
      }, 80)
      return () => clearTimeout(t)
    }
  }, [pathname])

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(6px)",
        transition: "opacity 0.25s ease, transform 0.25s ease",
      }}
    >
      {children}
    </div>
  )
}
