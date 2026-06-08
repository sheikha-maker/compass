"use client"

import dynamic from "next/dynamic"

const Hero = dynamic(
  () => import("@/components/compass/hero").then((m) => ({ default: m.Hero })),
  { ssr: false, loading: () => <div className="h-[480px] bg-primary" /> }
)

export function HeroClient() {
  return <Hero />
}