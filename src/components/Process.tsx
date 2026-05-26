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
    desc: "Strategie und Kreativkonzept als Einheit. Wie soll die Marke klingen, aussehen und wirken? Erst Antworten, dann Design.",
  },
  {
    num: "03",
    title: "Umsetzen",
    desc: "Design, Content und Produktion mit handwerklicher Präzision. Jedes Detail ist bewusst gesetzt — nichts ist zufällig.",
  },
  {
    num: "04",
    title: "Wachsen",
    desc: "Marken sind lebende Systeme. Wir begleiten auf dem Weg und iterieren, damit die Wirkung langfristig stark bleibt.",
  },
]

export default function Process() {
  return (
    <section className="py-24 md:py-32 border-t border-white/[0.06]">
      <div className="container-wide">

        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-16 md:mb-20">
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

        {/* 4-column process grid with 1px dividers (gap-px technique) */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/[0.07]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: i * 0.08,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="bg-bg p-8 md:p-10 flex flex-col gap-8 group hover:bg-surface transition-colors duration-400"
            >
              {/* Large number */}
              <span
                className="font-display font-bold text-ink-4 group-hover:text-accent/50 transition-colors duration-400 select-none"
                style={{
                  fontSize: "clamp(52px, 5.5vw, 80px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                }}
              >
                {step.num}
              </span>

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-display font-bold text-ink"
                  style={{
                    fontSize: "clamp(20px, 1.7vw, 26px)",
                    letterSpacing: "-0.015em",
                    lineHeight: 1.1,
                  }}
                >
                  {step.title}
                </h3>
                <p className="body text-ink-2 leading-relaxed">{step.desc}</p>
              </div>

              {/* Bottom accent line */}
              <div className="mt-auto pt-6 border-t border-white/[0.06]">
                <span className="label text-ink-4">Schritt {step.num}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
