export default function Loading() {
  return (
    <div className="min-h-screen bg-background lg:pl-72">
      {/* Hero skeleton */}
      <div className="relative h-[600px] animate-pulse bg-primary/20 md:h-[640px]">
        <div className="absolute inset-0 flex flex-col items-start justify-center px-5 py-16 md:px-8">
          <div className="h-3 w-24 rounded-full bg-white/20" />
          <div className="mt-4 h-10 w-72 rounded-xl bg-white/20 md:w-96" />
          <div className="mt-3 h-5 w-56 rounded-lg bg-white/15" />
          <div className="mt-8 flex gap-3">
            <div className="h-10 w-32 rounded-full bg-white/20" />
            <div className="h-10 w-28 rounded-full bg-white/15" />
          </div>
        </div>
      </div>

      {/* Section cards skeleton */}
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-8">
        <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
        <div className="mt-3 h-8 w-52 animate-pulse rounded-xl bg-muted" />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-52 animate-pulse rounded-2xl bg-muted"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Stats skeleton */}
      <div className="border-y border-border bg-muted/20 px-5 py-12 md:px-8">
        <div className="mx-auto max-w-4xl grid grid-cols-2 gap-3 sm:grid-cols-4">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-32 animate-pulse rounded-2xl bg-muted"
              style={{ animationDelay: `${i * 60}ms` }}
            />
          ))}
        </div>
      </div>

      {/* Tool cards skeleton */}
      <div className="mx-auto max-w-4xl px-5 py-14 md:px-8">
        <div className="h-3 w-24 animate-pulse rounded-full bg-muted" />
        <div className="mt-3 h-8 w-48 animate-pulse rounded-xl bg-muted" />
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="h-24 animate-pulse rounded-2xl bg-muted"
              style={{ animationDelay: `${i * 80}ms` }}
            />
          ))}
          <div className="h-24 animate-pulse rounded-2xl bg-muted sm:col-span-2" style={{ animationDelay: "320ms" }} />
        </div>
      </div>
    </div>
  )
}
