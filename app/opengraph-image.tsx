import { ImageResponse } from "next/og"

export const alt = "The Pre-Med Compass, A guide for Moravian University pre-meds"
export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "linear-gradient(135deg, #1e2a6e 0%, #2d3f9e 45%, #1a3a5c 100%)",
          color: "#ffffff",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              border: "3px solid rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
            }}
          >
            <div
              style={{
                width: 14,
                height: 14,
                borderRadius: 4,
                background: "#f59e0b",
                transform: "rotate(45deg)",
              }}
            />
          </div>
          <span style={{ fontSize: 22, opacity: 0.85 }}>Moravian University</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20, maxWidth: 900 }}>
          <div
            style={{
              fontSize: 64,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: "-0.02em",
            }}
          >
            The Pre-Med Compass
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, opacity: 0.9 }}>
            Navigate your pre-med journey with clarity, intention, and sustainable habits.
          </div>
        </div>

        <div style={{ display: "flex", gap: 16, fontSize: 20, opacity: 0.8 }}>
          <span>MCAT prep</span>
          <span>·</span>
          <span>Application timeline</span>
          <span>·</span>
          <span>Wellness tools</span>
        </div>
      </div>
    ),
    { ...size }
  )
}
