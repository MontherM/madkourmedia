"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import AlbaHeroVisual from "./AlbaHeroVisual"

const lineVariants = {
  hidden: { y: "110%", opacity: 0 },
  visible: (i: number) => ({
    y: "0%",
    opacity: 1,
    transition: { duration: 1.0, delay: 0.15 + i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
}

const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export default function JpHero() {
  const headlineLines = ["Raum fur", "Wertvolles.", "Schaffen."]

  return (
    <section className="relative min-h-screen flex flex-col bg-jp-bg overflow-hidden">
      {/* Subtle warm texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 60% 40%, rgba(27,45,30,0.04) 0%, transparent 60%)",
        }}
      />

      <div className="container-wide flex-1 flex flex-col lg:flex-row lg:items-center gap-0 pt-32 lg:pt-24 pb-0">
        {/* Left: content */}
        <div className="flex-1 lg:flex-[0_0_50%] flex flex-col justify-center py-12 lg:py-20 lg:pr-12">
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.05 }}
            className="flex items-center gap-3 mb-10"
          >
            <div
              className="w-5 h-px"
              style={{ background: "#1B2D1E" }}
            />
            <span
              className="text-jp-ink-3"
              style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase", fontWeight: 400 }}
            >
              Real Estate Development &amp; Consulting
            </span>
          </motion.div>

          {/* Headline */}
          <h1 className="mb-10" aria-label="Raum fur Wertvolles. Schaffen.">
            {headlineLines.map((line, i) => (
              <div key={i} className="overflow-hidden">
                <motion.div
                  custom={i}
                  variants={lineVariants}
                  initial="hidden"
                  animate="visible"
                  className="block font-jp-display font-bold text-jp-ink"
                  style={{
                    fontSize: "clamp(54px, 7vw, 110px)",
                    lineHeight: 0.96,
                    letterSpacing: "-0.03em",
                  }}
                >
                  {line}
                </motion.div>
              </div>
            ))}
          </h1>

          {/* Subline + CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.65, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col gap-10"
          >
            <p
              className="text-jp-ink-2 max-w-[360px]"
              style={{ fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.75, fontWeight: 300 }}
            >
              JP DL AG entwickelt und berät bei Immobilienprojekten mit
              architektonischem Anspruch und wirtschaftlicher Prazision.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="#kontakt"
                className="inline-flex items-center gap-2 text-white bg-jp-accent hover:bg-jp-accent-hover transition-colors duration-300"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "15px 28px",
                }}
              >
                Kontakt aufnehmen <ArrowUpRight />
              </Link>
              <Link
                href="#leistungen"
                className="inline-flex items-center gap-2 text-jp-ink border border-black/[0.14] hover:border-black/30 transition-all duration-300"
                style={{
                  fontSize: "11px",
                  fontWeight: 400,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "14px 27px",
                }}
              >
                Leistungen <ArrowUpRight />
              </Link>
            </div>
          </motion.div>

          {/* Key metrics */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="flex items-center gap-8 mt-16 pt-8 border-t border-black/[0.07]"
          >
            {[
              { value: "15+", label: "Jahre Erfahrung" },
              { value: "40+", label: "Projekte realisiert" },
              { value: "CH", label: "Standort Schweiz" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col gap-1">
                <span
                  className="font-jp-display font-bold text-jp-ink"
                  style={{ fontSize: "clamp(22px, 2.4vw, 32px)", letterSpacing: "-0.02em" }}
                >
                  {stat.value}
                </span>
                <span
                  className="text-jp-ink-3"
                  style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}
                >
                  {stat.label}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Right: 3D visual */}
        <motion.div
          className="flex-1 lg:flex-[0_0_50%] relative lg:self-stretch"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          style={{ minHeight: "480px" }}
        >
          {/* Slight background shift for the visual area */}
          <div className="absolute inset-0 lg:-right-[clamp(20px,4vw,64px)]">
            <AlbaHeroVisual
              // Uncomment and add your Spline URL here when ready:
              // splineUrl="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
            />
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-[clamp(20px,4vw,64px)] flex items-center gap-2.5"
      >
        <div className="w-px h-8 overflow-hidden relative">
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent, #1B2D1E, transparent)" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span
          className="text-jp-ink-4"
          style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
