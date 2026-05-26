"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PageLoader() {
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)
  const [hidden, setHidden] = useState(false)

  useEffect(() => {
    // Fast-ramp up to ~80%, then slower finishing burst
    let raf: number
    let start: number | null = null
    const totalMs = 1600

    const tick = (ts: number) => {
      if (!start) start = ts
      const elapsed = ts - start
      const t = Math.min(elapsed / totalMs, 1)

      // Ease-in-out curve that slows near the end
      const eased = t < 0.8
        ? t / 0.8 * 0.85                        // 0 → 85% in first 80% of time
        : 0.85 + ((t - 0.8) / 0.2) * 0.15       // 85% → 100% in last 20%

      const next = Math.round(eased * 100)
      setProgress(next)

      if (t < 1) {
        raf = requestAnimationFrame(tick)
      } else {
        setProgress(100)
        setTimeout(() => setDone(true), 280)
        setTimeout(() => setHidden(true), 880)
      }
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  if (hidden) return null

  return (
    <AnimatePresence>
      {!done ? (
        <motion.div
          key="loader"
          className="fixed inset-0 z-[99999] flex flex-col bg-bg overflow-hidden"
        >
          {/* Grid bg */}
          <div className="absolute inset-0 grid-bg opacity-50 pointer-events-none" />

          {/* Radial glow */}
          <div
            className="absolute bottom-0 left-0 w-[70vw] h-[70vw] pointer-events-none"
            style={{
              background: "radial-gradient(ellipse at 0% 100%, rgba(109,187,125,0.05) 0%, transparent 60%)",
            }}
          />

          <div className="container-wide flex flex-col justify-between h-full py-10 md:py-12">
            {/* Logo top-left */}
            <motion.div
              initial={{ opacity: 0, y: -12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="flex items-center gap-3"
            >
              <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
                <rect x="0" y="0" width="11" height="11" fill="#6DBB7D" />
                <rect x="15" y="0" width="11" height="11" fill="#6DBB7D" />
                <rect x="7" y="15" width="11" height="11" fill="#6DBB7D" opacity="0.5" />
              </svg>
              <div className="leading-none">
                <span className="font-display text-[13px] font-bold tracking-[0.18em] text-ink uppercase block">
                  Madkour
                </span>
                <span className="label text-ink-3 block mt-[2px]">Media</span>
              </div>
            </motion.div>

            {/* Bottom: counter + bar */}
            <div className="flex flex-col gap-3">
              <div className="flex items-end justify-between">
                <motion.p
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="body text-ink-3"
                >
                  Branding.&nbsp;Content.&nbsp;Design.
                </motion.p>

                {/* Big counter */}
                <span
                  className="font-display font-bold text-ink tabular-nums leading-none"
                  style={{
                    fontSize: "clamp(44px, 7vw, 96px)",
                    letterSpacing: "-0.04em",
                  }}
                >
                  {progress}
                  <span className="text-accent">%</span>
                </span>
              </div>

              {/* Track */}
              <div className="relative h-px w-full bg-white/[0.06] overflow-hidden">
                <motion.div
                  className="absolute inset-y-0 left-0 bg-accent origin-left"
                  style={{ width: `${progress}%` }}
                  transition={{ duration: 0.08, ease: "linear" }}
                />
              </div>
            </div>
          </div>
        </motion.div>
      ) : (
        <motion.div
          key="exit"
          className="fixed inset-0 z-[99999] bg-bg"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
        />
      )}
    </AnimatePresence>
  )
}
