"use client"

import { useEffect, useRef, useState, type ReactNode, type CSSProperties } from "react"
import { cn } from "@/lib/utils"

/**
 * useParallax — returns a ref + a translateY value that drifts as the element
 * scrolls through the viewport. Subtle by design (a few px to a couple dozen).
 * Disabled entirely under prefers-reduced-motion or without IntersectionObserver.
 */
export function useParallax(strength = 18) {
  const ref = useRef<HTMLDivElement>(null)
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    if (typeof window === "undefined") return
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return

    const node = ref.current
    if (!node) return

    let raf = 0
    let active = false

    const onScroll = () => {
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        const rect = node.getBoundingClientRect()
        const vh = window.innerHeight || 1
        // progress: -1 (just entering bottom) → 1 (leaving top), 0 at center
        const progress = (rect.top + rect.height / 2 - vh / 2) / (vh / 2 + rect.height / 2)
        setOffset(progress * strength)
      })
    }

    const io = new IntersectionObserver(
      ([entry]) => {
        active = entry.isIntersecting
        if (active) {
          window.addEventListener("scroll", onScroll, { passive: true })
          onScroll()
        } else {
          window.removeEventListener("scroll", onScroll)
        }
      },
      { threshold: 0 },
    )
    io.observe(node)

    return () => {
      io.disconnect()
      window.removeEventListener("scroll", onScroll)
      if (raf) cancelAnimationFrame(raf)
    }
  }, [strength])

  return { ref, offset }
}

type ParallaxLayerProps = {
  children: ReactNode
  /** px of travel across the full scroll-through; negative drifts the other way */
  strength?: number
  className?: string
  style?: CSSProperties
}

/** A drop-in wrapper that applies a subtle vertical parallax drift to its children. */
export function ParallaxLayer({ children, strength = 18, className, style }: ParallaxLayerProps) {
  const { ref, offset } = useParallax(strength)
  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        ...style,
        transform: `translate3d(0, ${offset}px, 0)`,
        transition: "transform 0.1s linear",
        willChange: "transform",
      }}
    >
      {children}
    </div>
  )
}
