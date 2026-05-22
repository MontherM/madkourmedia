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
      duration: 1.0,
      delay: 0.1 + i * 0.1,
      ease: [0.16, 1, 0.3, 1],
    },
  }),
}

const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export default function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] })
  const y = useTransform(scrollYProgress, [0, 1], [0, -90])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  const headlineLines = [
    { words: [{ text: "WIR BAUEN", accent: false }] },
    { words: [{ text: "MARKEN, DIE", accent: false }] },
    { words: [{ text: "GESEHEN", accent: true }, { text: " WERDEN.", accent: false }] },
  ]

  return (
    <section
      ref={ref}
      className="relative h-screen min-h-[640px] flex flex-col overflow-hidden"
    >
      {/* Subtle grid */}
      <div className="absolute inset-0 grid-bg" />

      {/* Radial glow — very subtle */}
      <div
        className="absolute bottom-0 left-0 w-[60vw] h-[60vw] pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse at 0% 100%, rgba(109,187,125,0.06) 0%, transparent 60%)",
        }}
      />

      <motion.div style={{ y, opacity }} className="flex flex-col h-full w-full">
        {/* Top meta row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1, duration: 0.6 }}
          className="container-wide absolute top-24 left-0 right-0 flex justify-between items-center"
        >
          <span className="label text-ink-3">Branding · Content · Design</span>
          <span className="label text-accent flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
            Verfügbar für Projekte
          </span>
        </motion.div>

        {/* Main content — anchored bottom */}
        <div className="container-wide mt-auto w-full pb-10 md:pb-14">
          {/* Headline */}
          <h1 className="display mb-10 md:mb-14" aria-label="Wir bauen Marken, die gesehen werden.">
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
            transition={{ delay: 0.85, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col md:flex-row justify-between md:items-end gap-6 md:gap-4 pt-7 border-t border-white/[0.07]"
          >
            <p className="body-lg text-ink-2 max-w-[340px] leading-relaxed">
              Strategie, Content &amp; Design für Unternehmen,
              <br />die wachsen wollen.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link href="#kontakt" className="btn-primary">
                Projekt starten <ArrowUpRight />
              </Link>
              <Link href="#portfolio" className="btn-secondary">
                Arbeiten ansehen <ArrowUpRight />
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.6 }}
          className="absolute bottom-8 right-[clamp(20px,4vw,64px)] flex items-center gap-2.5"
        >
          <span className="label text-ink-4">Scroll</span>
          <div className="w-px h-8 overflow-hidden relative">
            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-transparent via-ink-3 to-transparent"
              animate={{ y: ["-100%", "100%"] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            />
          </div>
        </motion.div>
      </motion.div>
    </section>
  )
}
