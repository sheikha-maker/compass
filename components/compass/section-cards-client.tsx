"use client"

import dynamic from "next/dynamic"

const SectionCards = dynamic(
  () => import("@/components/compass/section-cards").then((m) => ({ default: m.SectionCards })),
  {
    ssr: false,
    loading: () => (
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-8">
        <div className="h-8 w-48 animate-pulse rounded-lg bg-muted/40" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="h-48 animate-pulse rounded-2xl bg-muted/40" />
          <div className="h-48 animate-pulse rounded-2xl bg-muted/40" />
          <div className="h-48 animate-pulse rounded-2xl bg-muted/40" />
        </div>
      </div>
    ),
  }
)

export function SectionCardsClient() {
  return <SectionCards />
}
