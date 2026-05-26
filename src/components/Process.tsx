"use client"
import { motion } from "framer-motion"
import FadeIn from "./ui/FadeIn"

const steps = [
  {
    num: "01",
    title: "Verstehen",
    desc: "Kein Strich vor dem Briefing. Wir analysieren Zielgruppe, Wettbewerbsumfeld und Markenkern — bevor wir gestalten.",
  },
  {
    num: "02",
    title: "Konzipieren",
    desc: "Strategie und Kreativkonzept als Einheit. Erst Antworten — dann Design. Kein Template, keine Abkürzung.",
  },
  {
    num: "03",
    title: "Umsetzen",
    desc: "Design, Content und Produktion mit handwerklicher Präzision. Jedes Detail ist bewusst — nichts ist zufällig.",
  },
  {
    num: "04",
    title: "Wachsen",
    desc: "Marken sind lebende Systeme. Wir begleiten auf dem Weg und iterieren, damit die Wirkung langfristig stark bleibt.",
  },
]

export default function Process() {
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.05]">
      <div className="container-wide">

        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-14 md:mb-18">
          <FadeIn className="md:col-span-4">
            <span className="label text-ink-3">Wie wir arbeiten</span>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-5 md:col-start-7">
            <p className="body-lg text-ink-2">
              Kein Template, kein Copy-Paste.
              <br />Jede Zusammenarbeit beginnt von vorne.
            </p>
          </FadeIn>
        </div>

        {/*
          GLASS PROCESS CELLS
          Gap-px grid determinism (brutalist-skill):
          bg-white/[0.05] parent + bg-bg children = 1px dividers without border declarations
          Emil: transitions are interruptible — using CSS transitions on hover bg, not keyframes
        */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/[0.06]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="group relative overflow-hidden flex flex-col gap-7 p-8 md:p-10 cursor-default"
              style={{
                background: "rgba(10,10,10,0.98)",
                transition: "background 0.35s cubic-bezier(0.23,1,0.32,1)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(20,20,20,0.98)"
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.background = "rgba(10,10,10,0.98)"
              }}
            >
              {/* Subtle top glow on hover */}
              <div
                className="absolute top-0 inset-x-0 h-12 opacity-0 group-hover:opacity-100 pointer-events-none"
                style={{
                  background: "radial-gradient(ellipse at 50% 0%, rgba(109,187,125,0.06), transparent)",
                  transition: "opacity 0.4s ease",
                }}
              />

              {/* Large number */}
              <span
                className="font-display font-bold select-none"
                style={{
                  fontSize: "clamp(56px, 5.5vw, 80px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "rgba(255,255,255,0.08)",
                  transition: "color 0.35s cubic-bezier(0.23,1,0.32,1)",
                }}
                ref={(el) => {
                  if (!el) return
                  const parent = el.closest(".group")
                  if (!parent) return
                  const show = () => { el.style.color = "rgba(109,187,125,0.35)" }
                  const hide = () => { el.style.color = "rgba(255,255,255,0.08)" }
                  parent.addEventListener("mouseenter", show)
                  parent.addEventListener("mouseleave", hide)
                }}
              >
                {step.num}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-display font-bold text-ink"
                  style={{ fontSize: "clamp(20px, 1.7vw, 26px)", letterSpacing: "-0.015em", lineHeight: 1.1 }}
                >
                  {step.title}
                </h3>
                <p className="body text-ink-2 leading-relaxed">{step.desc}</p>
              </div>

              {/* Step label at bottom */}
              <div className="mt-auto pt-5 border-t border-white/[0.05]">
                <span className="label text-ink-4">Schritt {step.num}</span>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
