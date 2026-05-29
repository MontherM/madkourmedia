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
  const headlineLines = ["Bauen was", "bleibt.", "Basel."]

  return (
    <section
      className="relative bg-jp-bg overflow-hidden"
      style={{ minHeight: "100svh", display: "grid", gridTemplateRows: "1fr auto" }}
    >
      {/* Warm radial tint */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 65% 50%, rgba(27,45,30,0.03) 0%, transparent 55%)",
        }}
      />

      {/* Main grid: 45 / 55 split, full bleed on right */}
      <div
        className="relative w-full"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr",
          minHeight: "100svh",
        }}
      >
        {/* Desktop: side-by-side */}
        <div
          className="hidden lg:grid w-full"
          style={{
            gridTemplateColumns: "45% 55%",
            minHeight: "100svh",
          }}
        >
          {/* Left column */}
          <div className="flex flex-col justify-center pl-[clamp(40px,6vw,96px)] pr-12 pt-32 pb-20">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="flex items-center gap-3 mb-10"
            >
              <div className="w-5 h-px" style={{ background: "#1B2D1E" }} />
              <span
                className="text-jp-ink-3"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
              >
                Bauherrenvertretung &amp; Projektentwicklung, Basel
              </span>
            </motion.div>

            {/* Headline */}
            <h1 className="mb-10" aria-label="Bauen was bleibt. Basel.">
              {headlineLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="block font-jp-display font-bold text-jp-ink"
                    style={{ fontSize: "clamp(52px, 5.5vw, 96px)", lineHeight: 0.97, letterSpacing: "-0.03em" }}
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
              transition={{ delay: 0.6, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="flex flex-col gap-9"
            >
              <p
                className="text-jp-ink-2"
                style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.8, fontWeight: 300, maxWidth: "340px" }}
              >
                Bauherrenvertretung, Projektentwicklung und Immobilienberatung
                aus Basel. Mit den Wurzeln bei Herzog &amp; de Meuron.
              </p>

              <div className="flex flex-wrap items-center gap-3">
                <Link
                  href="#kontakt"
                  className="inline-flex items-center gap-2 text-white bg-jp-accent hover:bg-jp-accent-hover transition-colors duration-300"
                  style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", padding: "15px 28px" }}
                >
                  Kontakt aufnehmen <ArrowUpRight />
                </Link>
                <Link
                  href="#leistungen"
                  className="inline-flex items-center gap-2 text-jp-ink border border-black/[0.14] hover:border-black/30 transition-all duration-300"
                  style={{ fontSize: "11px", fontWeight: 400, letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 27px" }}
                >
                  Leistungen <ArrowUpRight />
                </Link>
              </div>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.7 }}
              className="flex items-center gap-8 mt-14 pt-8 border-t border-black/[0.07]"
            >
              {[
                { value: "Seit 2016", label: "Erfahrung aufgebaut" },
                { value: "H&dM", label: "Herkunft & Netzwerk" },
                { value: "Basel", label: "Standort" },
              ].map((s) => (
                <div key={s.label} className="flex flex-col gap-1">
                  <span
                    className="font-jp-display font-bold text-jp-ink"
                    style={{ fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.02em" }}
                  >
                    {s.value}
                  </span>
                  <span
                    className="text-jp-ink-3"
                    style={{ fontSize: "9px", letterSpacing: "0.16em", textTransform: "uppercase" }}
                  >
                    {s.label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right column: slight padding so visual clears the nav and has breathing room */}
          <motion.div
            className="relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{ paddingTop: "96px", paddingRight: "clamp(40px,6vw,96px)", paddingBottom: "48px", paddingLeft: "8px" }}
          >
            <div className="w-full h-full rounded-sm overflow-hidden" style={{ minHeight: "500px" }}>
              <AlbaHeroVisual
                // Uncomment when Spline is ready:
                // splineUrl="https://prod.spline.design/YOUR_SCENE_ID/scene.splinecode"
              />
            </div>
          </motion.div>
        </div>

        {/* Mobile: stacked */}
        <div className="lg:hidden flex flex-col">
          <div className="container-wide pt-28 pb-10">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="flex items-center gap-3 mb-8"
            >
              <div className="w-5 h-px" style={{ background: "#1B2D1E" }} />
              <span className="text-jp-ink-3" style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}>
                Bauherrenvertretung, Basel
              </span>
            </motion.div>

            <h1 className="mb-8" aria-label="Bauen was bleibt. Basel.">
              {headlineLines.map((line, i) => (
                <div key={i} className="overflow-hidden">
                  <motion.div
                    custom={i}
                    variants={lineVariants}
                    initial="hidden"
                    animate="visible"
                    className="block font-jp-display font-bold text-jp-ink"
                    style={{ fontSize: "clamp(48px, 12vw, 72px)", lineHeight: 0.97, letterSpacing: "-0.03em" }}
                  >
                    {line}
                  </motion.div>
                </div>
              ))}
            </h1>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.7 }}
              className="flex flex-col gap-7"
            >
              <p className="text-jp-ink-2" style={{ fontSize: "15px", lineHeight: 1.8, fontWeight: 300 }}>
                Bauherrenvertretung aus Basel. Mit den Wurzeln bei Herzog &amp; de Meuron.
              </p>
              <div className="flex flex-wrap gap-3">
                <Link href="#kontakt"
                  className="inline-flex items-center gap-2 text-white bg-jp-accent"
                  style={{ fontSize: "11px", fontWeight: 500, letterSpacing: "0.14em", textTransform: "uppercase", padding: "14px 24px" }}
                >
                  Kontakt <ArrowUpRight />
                </Link>
                <Link href="#leistungen"
                  className="inline-flex items-center gap-2 text-jp-ink border border-black/[0.14]"
                  style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "13px 23px" }}
                >
                  Leistungen <ArrowUpRight />
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Mobile visual */}
          <motion.div
            style={{ height: "55vw", minHeight: "280px", maxHeight: "420px" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.9 }}
          >
            <AlbaHeroVisual />
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-7 left-[clamp(20px,4vw,64px)] flex items-center gap-2.5"
      >
        <div className="w-px h-7 overflow-hidden relative">
          <motion.div
            className="absolute inset-0"
            style={{ background: "linear-gradient(to bottom, transparent, #1B2D1E, transparent)" }}
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
        <span
          className="text-jp-ink-4"
          style={{ fontSize: "9px", letterSpacing: "0.22em", textTransform: "uppercase" }}
        >
          Scroll
        </span>
      </motion.div>
    </section>
  )
}
