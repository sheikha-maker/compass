"use client"

import { useEffect, useState } from "react"
import { ArrowUp } from "lucide-react"

export function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 400)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label="Back to top"
      className="fixed bottom-6 right-5 z-50 flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card shadow-lg transition-all duration-200 hover:border-primary hover:text-primary hover:shadow-xl hover:-translate-y-0.5 lg:bottom-8 lg:right-8"
    >
      <ArrowUp className="h-4 w-4" aria-hidden="true" />
    </button>
  )
}
