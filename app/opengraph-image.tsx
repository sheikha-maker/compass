import { ImageResponse } from "next/og"

export const runtime = "edge"
export const alt = "The Pre-Med Compass — built for Moravian University pre-med students"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #1e2a8a 0%, #2d3db8 50%, #1a3a6e 100%)",
          padding: "64px 72px",
          fontFamily: "serif",
        }}
      >
        {/* Top — compass icon + site name */}
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          {/* Compass SVG */}
          <svg width="48" height="48" viewBox="0 0 32 32" fill="none">
            <circle cx="16" cy="16" r="14" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />
            <circle cx="16" cy="16" r="2" fill="white" />
            <polygon points="16,4 14,16 18,16" fill="white" />
            <polygon points="16,28 14,16 18,16" fill="rgba(255,255,255,0.4)" />
            <line x1="16" y1="5" x2="16" y2="7" stroke="white" strokeWidth="1.2" opacity="0.6" />
            <line x1="27" y1="16" x2="25" y2="16" stroke="white" strokeWidth="1.2" opacity="0.6" />
            <line x1="5" y1="16" x2="7" y2="16" stroke="white" strokeWidth="1.2" opacity="0.6" />
            <line x1="16" y1="27" x2="16" y2="25" stroke="white" strokeWidth="1.2" opacity="0.6" />
          </svg>
          <span style={{ color: "rgba(255,255,255,0.7)", fontSize: "20px", letterSpacing: "0.05em" }}>
            THE PRE-MED COMPASS
          </span>
        </div>

        {/* Middle — headline */}
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: "700",
              color: "white",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Navigate pre-med with clarity.
          </div>
          <div
            style={{
              fontSize: "28px",
              color: "rgba(255,255,255,0.65)",
              lineHeight: 1.4,
              maxWidth: "800px",
            }}
          >
            MCAT prep, application timeline, burnout tools, and a year-by-year compass — built specifically for Moravian University students.
          </div>
        </div>

        {/* Bottom — URL tag */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            background: "rgba(255,255,255,0.12)",
            borderRadius: "12px",
            padding: "12px 24px",
            alignSelf: "flex-start",
          }}
        >
          <span style={{ color: "rgba(255,255,255,0.8)", fontSize: "18px" }}>
            v0-premedcompass.vercel.app
          </span>
        </div>
      </div>
    ),
    { ...size }
  )
}
