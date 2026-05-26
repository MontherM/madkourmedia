"use client"
import { motion } from "framer-motion"
import FadeIn from "./ui/FadeIn"

const services = [
  {
    num: "01",
    name: "Brand Identity",
    desc: "Logo, Farbe, Typografie, Bildsprache — eine vollständige visuelle Identität, die sofort erkannt wird und langfristig trägt.",
    tags: ["Logo", "CI", "Styleguide"],
    // Accent line color on hover
    accentFrom: "rgba(109,187,125,0.6)",
    accentTo: "rgba(109,187,125,0)",
  },
  {
    num: "02",
    name: "Content Strategy",
    desc: "Kanal- und Redaktionsstrategie, die nachhaltiges Wachstum erzeugt. Konsequente Botschaften über alle Touchpoints hinweg.",
    tags: ["Social Media", "Redaktion", "Kampagnen"],
    accentFrom: "rgba(136,153,221,0.6)",
    accentTo: "rgba(136,153,221,0)",
  },
  {
    num: "03",
    name: "Digital Design",
    desc: "Web, App, Social — digitale Auftritte, die auf Performance und ästhetischen Anspruch gleichermaßen ausgelegt sind.",
    tags: ["Web", "UI/UX", "Print"],
    accentFrom: "rgba(200,170,100,0.6)",
    accentTo: "rgba(200,170,100,0)",
  },
  {
    num: "04",
    name: "Motion & Film",
    desc: "Bewegtbild, das Aufmerksamkeit hält. Reels, Brand Films, Animationen und Eventproduktionen — emotional und präzise.",
    tags: ["Video", "Animation", "Events"],
    accentFrom: "rgba(180,110,200,0.6)",
    accentTo: "rgba(180,110,200,0)",
  },
]

export default function Services() {
  return (
    <section id="projekte" className="py-32 md:py-44">
      <div className="container-wide">

        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-20">
          <FadeIn className="md:col-span-4">
            <span className="label text-ink-3">Was wir tun</span>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-6 md:col-start-6">
            <p className="body-lg text-ink-2 max-w-lg">
              Wir verbinden strategisches Denken mit visueller Kraft — von der
              ersten Idee bis zum vollständigen digitalen Auftritt.
            </p>
          </FadeIn>
        </div>

        {/*
          2 × 2 GLASS CARD GRID
          Emil Kowalski: glass cards with backdrop-filter,
          spring hover (translateY + scale on active),
          accent highlight line uses CSS transition (not keyframes — interruptible)
          Stagger: 80ms between items (Emil: 30–80ms)
        */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.65, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              /* Emil: whileHover lift + whileTap scale(0.98) */
              whileHover={{ y: -3 }}
              whileTap={{ scale: 0.985 }}
              className="group relative overflow-hidden cursor-default"
              style={{
                /* Glass card — Emil: .glass class, subtle backdrop-blur on scroll */
                background: "rgba(255,255,255,0.022)",
                border: "1px solid rgba(255,255,255,0.07)",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 20px rgba(0,0,0,0.12)",
                transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              {/* Hover background fill — Emil: css transition (interruptible) */}
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: "rgba(255,255,255,0.018)",
                  transition: "opacity 0.35s cubic-bezier(0.23,1,0.32,1)",
                }}
              />

              {/* Top accent line — slides in on hover (clip-path animation, Emil) */}
              <div
                className="absolute top-0 left-0 right-0 h-px pointer-events-none"
                style={{
                  background: `linear-gradient(to right, transparent 0%, ${s.accentFrom} 30%, ${s.accentFrom} 70%, transparent 100%)`,
                  transform: "scaleX(0)",
                  transformOrigin: "left center",
                  transition: "transform 0.45s cubic-bezier(0.23,1,0.32,1)",
                }}
                /* Emil: transform-origin matters — scale from left gives directional feel */
                ref={(el) => {
                  if (!el) return
                  const parent = el.closest(".group")
                  if (!parent) return
                  const show = () => { el.style.transform = "scaleX(1)" }
                  const hide = () => { el.style.transform = "scaleX(0)" }
                  parent.addEventListener("mouseenter", show)
                  parent.addEventListener("mouseleave", hide)
                }}
              />

              {/* Ghost number — large background decoration */}
              <span
                className="absolute top-4 right-5 font-display font-bold text-ink pointer-events-none select-none"
                style={{
                  fontSize: "clamp(72px, 8vw, 108px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  opacity: 0.028,
                }}
                aria-hidden
              >
                {s.num}
              </span>

              {/* Card content */}
              <div className="relative z-10 p-8 md:p-10 flex flex-col gap-6 h-full min-h-[280px] md:min-h-[300px]">
                {/* Number label */}
                <span className="label text-ink-4">{s.num}</span>

                {/* Service name — bigger, Emil subheadline */}
                <h3
                  className="font-display font-bold text-ink group-hover:text-ink transition-colors duration-300"
                  style={{
                    fontSize: "clamp(24px, 2.6vw, 38px)",
                    letterSpacing: "-0.02em",
                    lineHeight: 1.05,
                  }}
                >
                  {s.name}
                </h3>

                {/* Description — body-lg, bumped contrast (#B8B8B8) */}
                <p className="body-lg text-ink-2 leading-relaxed flex-grow">
                  {s.desc}
                </p>

                {/* Tags row — at bottom of card */}
                <div className="flex flex-wrap gap-2 pt-5 border-t border-white/[0.06]">
                  {s.tags.map((tag) => (
                    <span
                      key={tag}
                      className="label text-ink-3 px-3 py-2 transition-colors duration-300 group-hover:text-ink-2"
                      style={{
                        border: "1px solid rgba(255,255,255,0.08)",
                        transitionTimingFunction: "var(--ease-spring)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}

                  {/* Arrow — appears on hover, Emil: opacity transition not display */}
                  <span
                    className="ml-auto label text-ink-4 flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{ transitionTimingFunction: "var(--ease-spring)" }}
                  >
                    Mehr erfahren
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
                      <path d="M1 9L9 1M9 1H1M9 1V9" stroke="currentColor" strokeWidth="1.2" />
                    </svg>
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
