"use client"
import { motion } from "framer-motion"
import JpFadeIn from "./JpFadeIn"

const steps = [
  {
    num: "01",
    title: "Analyse",
    desc: "Wir beginnen mit dem Verstehen. Standort, Markt, Nutzung, Potenzial. Eine solide Analyse ist die Grundlage jeder guten Entscheidung.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="10" cy="10" r="7" stroke="currentColor" strokeWidth="1" />
        <path d="M15.5 15.5L21 21" stroke="currentColor" strokeWidth="1" strokeLinecap="round" />
        <path d="M7 10H13M10 7V13" stroke="currentColor" strokeWidth="0.75" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    num: "02",
    title: "Strategie",
    desc: "Aus Fakten werden Entscheidungen. Wir entwickeln eine klare Strategie: wirtschaftlich tragfahig, architektonisch uberzeugend, zukunftssicher.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="3" width="18" height="18" rx="0.5" stroke="currentColor" strokeWidth="1" />
        <path d="M7 17L10 13L13 15L17 9" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    num: "03",
    title: "Entwicklung",
    desc: "Konzept, Planung, Genehmigungen. Wir begleiten jede Phase der Entwicklung mit Erfahrung, Netzwerk und unternehmerischer Konsequenz.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="4" y="12" width="4" height="8" stroke="currentColor" strokeWidth="1" />
        <rect x="10" y="7" width="4" height="13" stroke="currentColor" strokeWidth="1" />
        <rect x="16" y="3" width="4" height="17" stroke="currentColor" strokeWidth="1" />
      </svg>
    ),
  },
  {
    num: "04",
    title: "Umsetzung",
    desc: "Vom Konzept zur Wirklichkeit. Baumanagement, Qualitatsicherung, Terminsteuerung und die erfolgreiche Ubergabe an Nutzer oder Investoren.",
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M3 12L9 18L21 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
]

export default function JpProcess() {
  return (
    <section className="py-36 md:py-52 bg-jp-bg">
      <div className="container-wide">
        {/* Header */}
        <JpFadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20 md:mb-28">
            <div>
              <span
                className="text-jp-ink-3 block mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
              >
                Wie wir arbeiten
              </span>
              <h2
                className="font-display font-bold text-jp-ink"
                style={{ fontSize: "clamp(38px, 4.5vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1.0 }}
              >
                Unser Prozess.
              </h2>
            </div>
            <p
              className="text-jp-ink-2 max-w-sm"
              style={{ fontSize: "clamp(14px, 1vw, 16px)", lineHeight: 1.75, fontWeight: 300 }}
            >
              Vier Phasen, ein Ziel: ein Projekt, das steht. Wir begleiten
              Sie von der ersten Frage bis zur letzten Unterschrift.
            </p>
          </div>
        </JpFadeIn>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-black/[0.06]">
          {steps.map((step, i) => (
            <motion.div
              key={step.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.7, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="bg-jp-bg p-8 md:p-10 flex flex-col gap-6 group hover:bg-jp-surface transition-colors duration-300"
            >
              {/* Number + icon row */}
              <div className="flex items-start justify-between">
                <span
                  className="font-display font-bold text-jp-ink-4"
                  style={{ fontSize: "clamp(32px, 3.5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {step.num}
                </span>
                <div className="text-jp-ink-3 group-hover:text-jp-accent transition-colors duration-300 mt-1">
                  {step.icon}
                </div>
              </div>

              {/* Connector line */}
              <div className="w-8 h-px bg-jp-accent opacity-60" />

              {/* Content */}
              <div className="flex flex-col gap-3">
                <h3
                  className="font-display font-bold text-jp-ink"
                  style={{ fontSize: "clamp(20px, 1.7vw, 26px)", letterSpacing: "-0.015em" }}
                >
                  {step.title}
                </h3>
                <p
                  className="text-jp-ink-2"
                  style={{ fontSize: "clamp(14px, 0.95vw, 15px)", lineHeight: 1.75, fontWeight: 300 }}
                >
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
