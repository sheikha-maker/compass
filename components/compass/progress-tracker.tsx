"use client"

import { useEffect, useState } from "react"

export function ReadingProgress() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    function onScroll() {
      const el = document.documentElement
      const scrollTop = el.scrollTop || document.body.scrollTop
      const scrollHeight = el.scrollHeight - el.clientHeight
      setProgress(scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0)
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <div
      className="fixed top-0 left-0 z-[100] h-[3px] bg-primary transition-all duration-100 ease-out"
      style={{ width: `${progress}%`, boxShadow: "0 0 8px oklch(0.6 0.22 264 / 0.7)" }}
      aria-hidden="true"
    />
  )
}
