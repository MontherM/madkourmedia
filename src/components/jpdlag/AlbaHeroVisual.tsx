"use client"
import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"

interface AlbaHeroVisualProps {
  // To embed Spline later, uncomment and pass your scene URL:
  // splineUrl="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
  splineUrl?: string
}

function AlbaBuildingModel() {
  // SVG rendering of the ALBA HAUS based on the architectural render:
  // ~12 horizontal floor plates, glass curtain wall, projecting slab edges, urban plaza.
  const floors = 12
  const W = 280
  const topW = 258
  const floorH = 24
  const slabThick = 5
  const baseY = floors * floorH + 80
  const baseX = (400 - W) / 2
  const topX = (400 - topW) / 2

  const xLeft = (f: number) => baseX + ((topX - baseX) * f) / floors
  const xRight = (f: number) => baseX + W - ((baseX + W - (topX + topW)) * f) / floors

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
      {/* Sky gradient */}
      <div className="absolute inset-0" style={{
        background: "linear-gradient(180deg, #B8CCD8 0%, #D8E4EC 35%, #C8D4DC 70%, #BEC8CC 100%)"
      }} />

      <svg
        viewBox="0 0 400 440"
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="xMidYMid meet"
        aria-hidden="true"
      >
        {/* Clouds */}
        <ellipse cx="70" cy="55" rx="55" ry="16" fill="rgba(255,255,255,0.55)" />
        <ellipse cx="110" cy="48" rx="38" ry="12" fill="rgba(255,255,255,0.45)" />
        <ellipse cx="310" cy="38" rx="48" ry="14" fill="rgba(255,255,255,0.4)" />
        <ellipse cx="350" cy="44" rx="32" ry="10" fill="rgba(255,255,255,0.35)" />
        <ellipse cx="195" cy="24" rx="36" ry="10" fill="rgba(255,255,255,0.3)" />

        {/* Floor plates: bottom to top */}
        {Array.from({ length: floors }).map((_, f) => {
          const fi = floors - 1 - f
          const y = baseY - (fi + 1) * floorH
          const xl = xLeft(fi)
          const xr = xRight(fi)
          const w = xr - xl

          // Subtle alternating glass tones (warm/cool)
          const glassFill = fi % 2 === 0
            ? "rgba(185,208,222,0.75)"
            : "rgba(175,198,215,0.70)"
          const reflection = fi > floors / 2
            ? "rgba(255,255,255,0.08)"
            : "rgba(200,220,235,0.06)"

          return (
            <g key={f}>
              {/* Glass spandrel */}
              <rect
                x={xl + 0.5}
                y={y + slabThick}
                width={w - 1}
                height={floorH - slabThick - 0.5}
                fill={glassFill}
              />
              {/* Reflection highlight */}
              <rect
                x={xl + 0.5}
                y={y + slabThick}
                width={w * 0.35}
                height={floorH - slabThick - 0.5}
                fill={reflection}
              />
              {/* Mullion grid */}
              {Array.from({ length: 8 }).map((_, m) => (
                <line
                  key={m}
                  x1={xl + (m + 1) * (w / 9)}
                  y1={y + slabThick}
                  x2={xl + (m + 1) * (w / 9)}
                  y2={y + floorH - 0.5}
                  stroke="rgba(120,148,168,0.35)"
                  strokeWidth="0.6"
                />
              ))}

              {/* Projecting slab edge (the horizontal banding) */}
              <rect
                x={xl - 5}
                y={y}
                width={w + 10}
                height={slabThick}
                fill="#CEC9BF"
                stroke="rgba(175,170,160,0.5)"
                strokeWidth="0.4"
              />
              {/* Cast shadow under slab */}
              <rect
                x={xl - 5}
                y={y + slabThick}
                width={w + 10}
                height={2.5}
                fill="rgba(0,0,0,0.09)"
              />
            </g>
          )
        })}

        {/* Ground floor — open lobby */}
        {(() => {
          const xl = xLeft(0) - 5
          const xr = xRight(0) + 5
          const w = xr - xl
          const y = baseY - floorH
          return (
            <g>
              <rect x={xl} y={y + slabThick} width={w} height={floorH - slabThick}
                fill="rgba(155,178,192,0.55)" />
              {/* Columns */}
              {[0.12, 0.3, 0.5, 0.7, 0.88].map((p, i) => (
                <rect key={i}
                  x={xl + p * w - 3.5} y={y + slabThick}
                  width={7} height={floorH - slabThick}
                  fill="rgba(195,190,180,0.9)"
                  stroke="rgba(160,155,145,0.3)" strokeWidth="0.4"
                />
              ))}
              {/* Lobby glass between columns */}
              <rect x={xl} y={y + slabThick} width={w} height={floorH - slabThick}
                fill="rgba(170,195,210,0.3)" />
            </g>
          )
        })()}

        {/* Roof slab */}
        <rect
          x={xLeft(floors) - 5}
          y={baseY - floors * floorH - slabThick}
          width={xRight(floors) - xLeft(floors) + 10}
          height={slabThick + 2}
          fill="#C4BFB5"
          stroke="rgba(165,160,150,0.4)"
          strokeWidth="0.4"
        />

        {/* Plaza / ground */}
        <rect x="0" y={baseY} width="400" height="100" fill="#B8B5A8" />
        <rect x="0" y={baseY} width="400" height="3" fill="rgba(0,0,0,0.07)" />
        {/* Sidewalk */}
        <rect x="0" y={baseY + 18} width="400" height="1" fill="rgba(255,255,255,0.18)" />
        {/* Road marking */}
        <rect x="0" y={baseY + 40} width="400" height="2" fill="rgba(255,255,255,0.1)" />

        {/* Trees — canopy shapes inspired by render */}
        {[
          { x: 36,  y: baseY - 55, rx: 30, ry: 22, c1: "#4E7040", c2: "#3D5C30" },
          { x: 82,  y: baseY - 42, rx: 22, ry: 17, c1: "#527844", c2: "#426034" },
          { x: 318, y: baseY - 50, rx: 28, ry: 21, c1: "#4E7040", c2: "#3D5C30" },
          { x: 362, y: baseY - 40, rx: 20, ry: 15, c1: "#507242", c2: "#406032" },
          { x: 144, y: baseY - 32, rx: 16, ry: 12, c1: "#486C3C", c2: "#385A2C" },
          { x: 260, y: baseY - 36, rx: 18, ry: 14, c1: "#4E7040", c2: "#3E6030" },
        ].map((t, i) => (
          <g key={i}>
            <rect x={t.x - 3} y={t.y + t.ry - 2} width={6} height={baseY - t.y - t.ry + 2}
              fill="rgba(90,70,50,0.35)" />
            <ellipse cx={t.x} cy={t.y} rx={t.rx} ry={t.ry} fill={t.c1} opacity={0.82} />
            <ellipse cx={t.x - t.rx * 0.3} cy={t.y - t.ry * 0.3} rx={t.rx * 0.6} ry={t.ry * 0.55}
              fill={t.c2} opacity={0.5} />
            <ellipse cx={t.x + t.rx * 0.25} cy={t.y - t.ry * 0.15} rx={t.rx * 0.45} ry={t.ry * 0.4}
              fill="rgba(120,160,80,0.25)" />
          </g>
        ))}

        {/* People */}
        {[{ x: 108, s: 1 }, { x: 148, s: 0.9 }, { x: 258, s: 1 }, { x: 296, s: 0.88 }].map((p, i) => (
          <g key={i} transform={`translate(${p.x},${baseY + 1}) scale(${p.s})`}>
            <circle cx="0" cy="-13" r="3" fill="rgba(50,40,35,0.5)" />
            <rect x="-2.5" y="-10" width="5" height="8" fill="rgba(50,40,35,0.38)" rx="0.5" />
          </g>
        ))}

        {/* Bus */}
        <rect x="3" y={baseY - 22} width="60" height="22" fill="rgba(70,150,90,0.72)" rx="2" />
        <rect x="3" y={baseY - 22} width="60" height="8" fill="rgba(120,190,140,0.4)" rx="2" />
        {[14, 26, 38, 50].map((bx) => (
          <rect key={bx} x={bx} y={baseY - 18} width={9} height={12} fill="rgba(190,220,230,0.6)" rx="0.5" />
        ))}

        {/* ALBA HAUS label above building */}
        <text
          x="200"
          y={baseY - floors * floorH - 30}
          textAnchor="middle"
          fill="rgba(30,50,38,0.8)"
          style={{ fontFamily: "Korb, system-ui, sans-serif", fontSize: "10px", fontWeight: 700, letterSpacing: "0.4em" }}
        >
          ALBA HAUS
        </text>
        <line
          x1="168" y1={baseY - floors * floorH - 20}
          x2="232" y2={baseY - floors * floorH - 20}
          stroke="rgba(27,45,30,0.35)" strokeWidth="0.75"
        />
      </svg>

      {/* Live indicator */}
      <motion.div
        className="absolute top-5 right-5 flex items-center gap-1.5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
      >
        <motion.div
          className="w-1.5 h-1.5 rounded-full"
          style={{ background: "#1B2D1E" }}
          animate={{ opacity: [1, 0.15, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        />
        <span style={{
          fontSize: "8px", letterSpacing: "0.2em", textTransform: "uppercase",
          color: "rgba(27,45,30,0.45)", fontFamily: "var(--font-dm-sans), system-ui"
        }}>
          Visualisierung
        </span>
      </motion.div>

      {/* Scale bar */}
      <div className="absolute bottom-4 right-5 flex items-center gap-2">
        <div style={{ width: "28px", height: "1px", background: "rgba(30,50,38,0.3)" }} />
        <span style={{
          fontSize: "8px", letterSpacing: "0.16em", textTransform: "uppercase",
          color: "rgba(30,50,38,0.35)", fontFamily: "var(--font-dm-sans), system-ui"
        }}>Basel</span>
      </div>
    </div>
  )
}

export default function AlbaHeroVisual({ splineUrl }: AlbaHeroVisualProps) {
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [splineLoaded, setSplineLoaded] = useState(false)

  useEffect(() => {
    if (splineUrl) setSplineLoaded(true)
  }, [splineUrl])

  return (
    <div className="relative w-full h-full overflow-hidden" style={{ minHeight: "520px" }}>
      {splineLoaded && splineUrl ? (
        <iframe
          ref={iframeRef}
          src={splineUrl}
          title="ALBA HAUS 3D-Modell"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          allow="autoplay"
        />
      ) : (
        <AlbaBuildingModel />
      )}
    </div>
  )
}
