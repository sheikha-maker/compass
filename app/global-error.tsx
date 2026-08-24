"use client"

import { useEffect } from "react"

/**
 * app/global-error.tsx
 * Last-resort fallback: this replaces the root layout, so it must render its own
 * <html>/<body>. Styles are inline (not Tailwind) so the page still renders even
 * when the stylesheet itself failed to load.
 */
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error("[compass] global error:", error)
  }, [error])

  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#fbfaf8",
          color: "#1c1917",
          fontFamily:
            'ui-sans-serif, system-ui, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
          padding: "1.25rem",
          textAlign: "center",
        }}
      >
        <main style={{ maxWidth: "30rem" }}>
          <p
            style={{
              margin: 0,
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "#78716c",
            }}
          >
            The Pre-Med Compass
          </p>
          <h1 style={{ margin: "0.75rem 0 0", fontSize: "1.75rem", fontWeight: 600, lineHeight: 1.25 }}>
            Something went wrong
          </h1>
          <p style={{ margin: "1rem 0 0", lineHeight: 1.6, color: "#57534e" }}>
            The site hit an unexpected error and couldn&apos;t finish loading. Your saved progress is
            safe. Try reloading — if it keeps happening, please let us know.
          </p>

          {error.digest ? (
            <p
              style={{
                margin: "0.75rem 0 0",
                fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
                fontSize: "0.75rem",
                color: "#a8a29e",
              }}
            >
              Reference: {error.digest}
            </p>
          ) : null}

          <div
            style={{
              marginTop: "1.75rem",
              display: "flex",
              flexWrap: "wrap",
              gap: "0.75rem",
              justifyContent: "center",
            }}
          >
            <button
              type="button"
              onClick={reset}
              style={{
                cursor: "pointer",
                borderRadius: "9999px",
                border: "none",
                backgroundColor: "#3b4fd4",
                color: "#ffffff",
                padding: "0.625rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
              }}
            >
              Try again
            </button>
            <a
              href="/"
              style={{
                borderRadius: "9999px",
                border: "1px solid #d6d3d1",
                color: "#1c1917",
                padding: "0.625rem 1.25rem",
                fontSize: "0.875rem",
                fontWeight: 600,
                textDecoration: "none",
              }}
            >
              Back to home
            </a>
          </div>

          <p style={{ margin: "2.5rem 0 0", fontSize: "0.75rem", color: "#78716c" }}>
            Need help? Email{" "}
            <a href="mailto:sheikha@moravian.edu" style={{ color: "#3b4fd4" }}>
              sheikha@moravian.edu
            </a>
          </p>
        </main>
      </body>
    </html>
  )
}
