"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface AlbaHeroVisualProps {
  // Add the Spline scene URL here when ready:
  // splineUrl?: string
  // Example: splineUrl="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
  splineUrl?: string
}

function ArchitecturalPlaceholder() {
  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Warm dark architectural background */}
      <div className="absolute inset-0" style={{ background: "linear-gradient(160deg, #1E2B20 0%, #141D15 60%, #0F1610 100%)" }} />

      {/* Subtle grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Architectural line composition */}
      <svg
        viewBox="0 0 480 560"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="relative z-10 w-full max-w-[420px]"
        style={{ maxHeight: "520px" }}
        aria-hidden="true"
      >
        {/* Ground plane perspective lines */}
        <line x1="240" y1="480" x2="20" y2="560" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="240" y1="480" x2="460" y2="560" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
        <line x1="240" y1="480" x2="240" y2="560" stroke="rgba(255,255,255,0.06)" strokeWidth="1" />

        {/* Main building mass */}
        <rect x="110" y="220" width="260" height="260" fill="rgba(255,255,255,0.04)" stroke="rgba(255,255,255,0.18)" strokeWidth="1" />

        {/* Building facade grid - horizontal */}
        {[260, 300, 340, 380, 420].map((y) => (
          <line key={y} x1="110" y1={y} x2="370" y2={y} stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
        ))}
        {/* Building facade grid - vertical */}
        {[150, 190, 230, 270, 310, 350].map((x) => (
          <line key={x} x1={x} y1="220" x2={x} y2="480" stroke="rgba(255,255,255,0.07)" strokeWidth="0.75" />
        ))}

        {/* Upper volume / penthouse */}
        <rect x="150" y="140" width="180" height="80" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.22)" strokeWidth="1" />
        {/* Penthouse grid */}
        {[165, 195, 225, 255, 285, 315].map((x) => (
          <line key={x} x1={x} y1="140" x2={x} y2="220" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
        ))}

        {/* Top accent line */}
        <line x1="150" y1="140" x2="330" y2="140" stroke="rgba(109,187,125,0.4)" strokeWidth="1.5" />

        {/* Roof line */}
        <line x1="110" y1="220" x2="370" y2="220" stroke="rgba(255,255,255,0.3)" strokeWidth="1.5" />

        {/* Window highlights (selected cells) */}
        {[
          { x: 115, y: 265, w: 30, h: 30 },
          { x: 155, y: 265, w: 30, h: 30 },
          { x: 275, y: 305, w: 30, h: 30 },
          { x: 315, y: 265, w: 30, h: 30 },
          { x: 155, y: 385, w: 30, h: 30 },
          { x: 235, y: 345, w: 30, h: 30 },
        ].map((w, i) => (
          <rect
            key={i}
            x={w.x}
            y={w.y}
            width={w.w}
            height={w.h}
            fill="rgba(109,187,125,0.12)"
            stroke="rgba(109,187,125,0.25)"
            strokeWidth="0.75"
          />
        ))}

        {/* Elevation dimensions */}
        <line x1="80" y1="140" x2="80" y2="480" stroke="rgba(255,255,255,0.12)" strokeWidth="0.75" />
        <line x1="75" y1="140" x2="85" y2="140" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />
        <line x1="75" y1="480" x2="85" y2="480" stroke="rgba(255,255,255,0.18)" strokeWidth="0.75" />

        {/* ALBA label */}
        <text
          x="240"
          y="96"
          textAnchor="middle"
          fill="rgba(255,255,255,0.7)"
          style={{ fontFamily: "var(--font-syne), system-ui, sans-serif", fontSize: "13px", fontWeight: 700, letterSpacing: "0.3em" }}
        >
          ALBA
        </text>
        <text
          x="240"
          y="115"
          textAnchor="middle"
          fill="rgba(255,255,255,0.3)"
          style={{ fontFamily: "var(--font-dm-sans), system-ui, sans-serif", fontSize: "9px", letterSpacing: "0.22em" }}
        >
          HAUS
        </text>

        {/* Corner detail top-right */}
        <path d="M370 220 L400 200 L400 140 L330 140" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="rgba(255,255,255,0.02)" />

        {/* Compass / orientation mark */}
        <circle cx="420" cy="440" r="16" stroke="rgba(255,255,255,0.1)" strokeWidth="0.75" fill="none" />
        <line x1="420" y1="426" x2="420" y2="434" stroke="rgba(255,255,255,0.4)" strokeWidth="1.5" />
        <text x="420" y="423" textAnchor="middle" fill="rgba(255,255,255,0.3)" style={{ fontSize: "8px", letterSpacing: "0.1em" }}>N</text>
      </svg>

      {/* Pulsing accent dot */}
      <motion.div
        className="absolute top-8 right-8 flex items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#6DBB7D" }}
          animate={{ opacity: [1, 0.3, 1] }}
          transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <span style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}>
          3D-Modell
        </span>
      </motion.div>

      {/* Scale indicator */}
      <div className="absolute bottom-6 left-6 flex items-center gap-3">
        <div style={{ width: "40px", height: "1px", background: "rgba(255,255,255,0.2)" }} />
        <span style={{ fontSize: "8px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
          1:200
        </span>
      </div>
    </div>
  )
}

export default function AlbaHeroVisual({ splineUrl }: AlbaHeroVisualProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [splineLoaded, setSplineLoaded] = useState(false)

  // Lazy-load Spline only when component mounts and URL is provided
  useEffect(() => {
    if (splineUrl) setSplineLoaded(true)
  }, [splineUrl])

  return (
    <div className="relative w-full h-full rounded-none overflow-hidden" style={{ minHeight: "520px" }}>
      {splineLoaded && splineUrl ? (
        /* Spline 3D embed - replace placeholder when ready */
        <iframe
          ref={iframeRef}
          src={splineUrl}
          title="ALBA Haus 3D-Modell"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          allow="autoplay"
        />
      ) : (
        <ArchitecturalPlaceholder />
      )}
    </div>
  )
}
