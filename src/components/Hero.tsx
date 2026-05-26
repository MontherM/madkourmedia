"use client"
import { useRef } from "react"
import Link from "next/link"
import { motion, useScroll, useTransform } from "framer-motion"

const lineVariants = {
  hidden: { y: "108%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: {
      duration: 1.05,
      delay: 0.08 + i * 0.12,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -80])
  const opacity = useTransform(scrollYProgress, [0, 0.55], [1, 0])

  const headlineLines = [
    { words: [{ text: "WIR MACHEN", accent: false }] },
    { words: [{ text: "MARKEN,", accent: false }] },
    { words: [{ text: "DIE ", accent: false }, { text: "BLEIBEN.", accent: true }] },
  ]

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[640px] flex flex-col overflow-hidden"
    >
      {/* Architectural grid */}
      <div className="absolute inset-0 grid-bg" aria-hidden />

      {/*
        AMBIENT ORBS — Taste-Skill Ethereal Glass / soft-skill
        Radial mesh gradients for depth. GPU layer via will-change.
        Fixed pseudo-elements: no scroll repaint.
      */}
      {/* Primary orb — brand green, bottom-left */}
      <div
        className="orb"
        style={{
          width: "clamp(500px, 65vw, 900px)",
          height: "clamp(500px, 65vw, 900px)",
          bottom: "-25%",
          left: "-15%",
          background: "radial-gradient(circle, rgba(109,187,125,0.10) 0%, rgba(109,187,125,0.03) 40%, transparent 65%)",
          willChange: "transform",
        }}
        aria-hidden
      />
      {/* Secondary orb — cool lavender, top-right */}
      <div
        className="orb"
        style={{
          width: "clamp(300px, 45vw, 600px)",
          height: "clamp(300px, 45vw, 600px)",
          top: "-15%",
          right: "5%",
          background: "radial-gradient(circle, rgba(130,130,200,0.05) 0%, transparent 60%)",
          willChange: "transform",
        }}
        aria-hidden
      />

      {/* Large M watermark — architectural identity anchor */}
      <div
        className="absolute right-[-5%] bottom-[-3%] pointer-events-none select-none"
        aria-hidden
      >
        <svg
          viewBox="0 0 58 48"
          fill="currentColor"
          className="text-white"
          style={{
            width: "clamp(280px, 38vw, 620px)",
            height: "auto",
            opacity: 0.032,
          }}
        >
          <rect x="0" y="0" width="11" height="48" />
          <rect x="0" y="38" width="15" height="10" />
          <rect x="14" y="8" width="10" height="40" />
          <path d="M24 8 L29 19 L34 8 Z" />
          <rect x="34" y="8" width="10" height="40" />
          <rect x="43" y="38" width="15" height="10" />
          <rect x="47" y="0" width="11" height="48" />
        </svg>
      </div>

      {/* Parallax content */}
      <motion.div style={{ y, opacity }} className="flex flex-col h-full w-full">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="container-wide absolute top-28 left-0 right-0 flex justify-between items-center"
        >
          <span className="label text-ink-3">
            Branding&nbsp;·&nbsp;Content&nbsp;·&nbsp;Design
          </span>
          <span className="label text-accent flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Verfügbar für Projekte
          </span>
        </motion.div>

        {/* Main content — bottom anchored */}
        <div className="container-wide mt-auto w-full pb-12 md:pb-16">
          {/* Headline — Emil word-reveal (lines clip from bottom, never from 0) */}
          <h1 className="display mb-10 md:mb-14" aria-label="Wir machen Marken, die bleiben.">
            {headlineLines.map((line, lineIdx) => (
              <div key={lineIdx} className="overflow-hidden">
                <motion.div
                  custom={lineIdx}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="block"
                >
                  {line.words.map((w, wIdx) => (
                    <span key={wIdx} className={w.accent ? "text-accent" : "text-ink"}>
                      {w.text}
                    </span>
                  ))}
                </motion.div>
              </div>
            ))}
          </h1>

          {/* Bottom row */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-4 pt-7 border-t border-white/[0.07]"
          >
            <p className="body-lg text-ink-2 max-w-[360px] leading-relaxed">
              Strategie, Content &amp; Design für Unternehmen,
              <br />die wachsen wollen.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              {/* Primary CTA with Button-in-Button icon wrap */}
              <Link href="#kontakt" className="btn-primary">
                Projekt starten
                <span className="btn-icon-wrap">
                  <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                    <path d="M1 7L7 1M7 1H1M7 1V7" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                </span>
              </Link>
              <Link href="#portfolio" className="btn-secondary">
                Arbeiten ansehen
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                  <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.3" />
                </svg>
              </Link>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </section>
  )
}
