/**
 * components/compass/page-skeleton.tsx
 * Loading placeholder that mirrors the PageLayout shell (sidebar + primary hero
 * band + stacked sections) so route transitions don't flash an empty screen.
 */

type Props = {
  /** Number of section blocks to render below the hero band. */
  sections?: number
}

export function PageSkeleton({ sections = 3 }: Props) {
  return (
    <div className="min-h-screen bg-background" role="status" aria-busy="true">
      <span className="sr-only">Loading page content…</span>

      {/* Sidebar placeholder (desktop only, matches PageLayout's w-72 rail) */}
      <div
        aria-hidden="true"
        className="fixed inset-y-0 left-0 hidden w-72 flex-col border-r border-sidebar-border bg-sidebar px-5 py-4 lg:flex"
      >
        <div className="h-6 w-40 animate-pulse rounded-lg bg-muted" />
        <div className="mt-8 flex flex-col gap-2">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="h-8 animate-pulse rounded-md bg-muted"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>

      <div className="lg:pl-72">
        {/* Hero band */}
        <div className="border-b border-border bg-primary px-5 py-10 md:px-8 md:py-14" aria-hidden="true">
          <div className="mx-auto max-w-4xl">
            <div className="h-3 w-28 animate-pulse rounded-full bg-primary-foreground/20" />
            <div className="mt-4 h-9 w-64 animate-pulse rounded-xl bg-primary-foreground/20 md:w-80" />
            <div className="mt-4 h-5 w-full max-w-xl animate-pulse rounded-lg bg-primary-foreground/15" />
            <div className="mt-2 h-5 w-2/3 max-w-md animate-pulse rounded-lg bg-primary-foreground/15" />
          </div>
        </div>

        {/* Section blocks */}
        <div className="mx-auto max-w-4xl px-5 py-14 md:px-8" aria-hidden="true">
          <div className="flex flex-col gap-14">
            {Array.from({ length: sections }).map((_, s) => (
              <div key={s} className="flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
                  <div className="h-7 w-56 animate-pulse rounded-xl bg-muted" />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div
                      key={i}
                      className="h-28 animate-pulse rounded-2xl bg-muted"
                      style={{ animationDelay: `${i * 70}ms` }}
                    />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
