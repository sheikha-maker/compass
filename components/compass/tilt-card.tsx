"use client"

import { useRef, useState, useCallback } from "react"
import { cn } from "@/lib/utils"

type TiltCardProps = {
  children: React.ReactNode
  className?: string
  intensity?: number   // tilt degrees max (default 8)
  scale?: number       // scale on hover (default 1.015)
  as?: "div" | "article"
}

export function TiltCard({
  children,
  className,
  intensity = 8,
  scale = 1.015,
  as: Tag = "div",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [transform, setTransform] = useState("")
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })
  const frameRef = useRef<number | null>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = requestAnimationFrame(() => {
        const el = ref.current
        if (!el) return
        const rect = el.getBoundingClientRect()
        const x = (e.clientX - rect.left) / rect.width   // 0–1
        const y = (e.clientY - rect.top) / rect.height    // 0–1
        const rotateX = (y - 0.5) * -intensity            // negative: tilt toward cursor
        const rotateY = (x - 0.5) * intensity
        setTransform(
          `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`
        )
        setGlare({ x: x * 100, y: y * 100, opacity: 0.08 })
      })
    },
    [intensity, scale]
  )

  const handleMouseLeave = useCallback(() => {
    if (frameRef.current) cancelAnimationFrame(frameRef.current)
    setTransform(`perspective(800px) rotateX(0deg) rotateY(0deg) scale(1)`)
    setGlare((g) => ({ ...g, opacity: 0 }))
  }, [])

  // Skip on touch / reduced-motion
  const prefersReduced =
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches

  if (prefersReduced) {
    return <Tag className={cn(className)}>{children}</Tag>
  }

  return (
    <div
      ref={ref}
      className={cn("relative", className)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform,
        transition: transform.includes("scale(1)") ? "transform 0.5s cubic-bezier(0.23,1,0.32,1)" : "transform 0.1s linear",
        transformStyle: "preserve-3d",
        willChange: "transform",
      }}
    >
      {/* Glare overlay */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 60%)`,
          transition: "opacity 0.3s ease",
        }}
      />
      {children}
    </div>
  )
}
