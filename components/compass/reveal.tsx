"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/lib/utils"

type RevealProps = {
  children: React.ReactNode
  delay?: number        // stagger offset in ms
  distance?: number     // px to travel upward (default 24)
  duration?: number     // animation duration in ms (default 500)
  className?: string
  once?: boolean        // stay visible once triggered (default true)
}

export function Reveal({
  children,
  delay = 0,
  distance = 24,
  duration = 500,
  className,
  once = true,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    // Respect reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setVisible(true)
      return
    }
    if (!("IntersectionObserver" in window)) {
      setVisible(true)
      return
    }
    const node = ref.current
    if (!node) { setVisible(true); return }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          if (once) observer.disconnect()
        } else if (!once) {
          setVisible(false)
        }
      },
      { threshold: 0.12 }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [once])

  return (
    <div
      ref={ref}
      className={cn(className)}
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0px)" : `translateY(${distance}px)`,
        transition: `opacity ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms, transform ${duration}ms cubic-bezier(0.4,0,0.2,1) ${delay}ms`,
        willChange: "opacity, transform",
      }}
    >
      {children}
    </div>
  )
}

// Convenience wrapper — staggered children with auto-incrementing delay
type StaggerProps = {
  children: React.ReactNode[]
  baseDelay?: number    // initial delay in ms
  stagger?: number      // ms between each child
  className?: string    // applied to each Reveal wrapper
  wrapperClassName?: string
}

export function Stagger({
  children,
  baseDelay = 0,
  stagger = 80,
  className,
  wrapperClassName,
}: StaggerProps) {
  return (
    <div className={wrapperClassName}>
      {children.map((child, i) => (
        <Reveal key={i} delay={baseDelay + i * stagger} className={className}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
