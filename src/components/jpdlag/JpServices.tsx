"use client"
import { motion } from "framer-motion"
import JpFadeIn from "./JpFadeIn"

const services = [
  {
    num: "01",
    name: "Individuelle Beratung",
    desc: "Persönliche Begleitung über die gesamte Projektdauer. Jedes Vorhaben ist einzigartig und verdient eine Beratung, die das auch widerspiegelt.",
    tags: ["Eigentümer", "Investoren", "Öff. Hand"],
  },
  {
    num: "02",
    name: "Positionierung & Zielgruppe",
    desc: "Zielgruppenbestimmung und Positionierung für Neubau, Umnutzung und Sanierung. Klarheit über Produkt und Markt, bevor der erste Spatenstich erfolgt.",
    tags: ["Neubau", "Umnutzung", "Sanierung"],
  },
  {
    num: "03",
    name: "Immobilienprodukt & Konzept",
    desc: "Definition von Immobilienprodukt, Raumkonzept und Funktionsumfang. Architektonisches Denken verbunden mit wirtschaftlicher Realität.",
    tags: ["Raumkonzept", "Funktionsumfang", "Konzept"],
  },
  {
    num: "04",
    name: "Projektkalkulation",
    desc: "Projektkalkulation und Mietzinskalkulation auf solider Basis. Zahlen, denen man vertrauen kann und auf die sich Entscheidungen stützen.",
    tags: ["Kalkulation", "Mietzins", "Wirtschaftlichkeit"],
  },
  {
    num: "05",
    name: "Projektsteuerung",
    desc: "Steuerung des Projekts von der Planung bis zur Übergabe an Eigentümer und Bewirtschafter. Inklusive Gewährleistungsmanagement.",
    tags: ["Steuerung", "Übergabe", "Gewährleistung"],
  },
  {
    num: "06",
    name: "Portfolio-Entwicklung",
    desc: "Portfolio-Entwicklung und Management ohne Bewirtschaftung. Strategischer Aufbau und Weiterentwicklung von Immobilienportfolios.",
    tags: ["Portfolio", "Strategie", "Management"],
  },
]

const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 11 11" fill="none">
    <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export default function JpServices() {
  return (
    <section id="leistungen" className="py-36 md:py-52 bg-jp-surface">
      <div className="container-wide">
        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20 md:mb-28">
          <JpFadeIn className="md:col-span-4">
            <span
              className="text-jp-ink-3 block mb-4"
              style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              Was wir tun
            </span>
            <h2
              className="font-jp-display font-bold text-jp-ink"
              style={{ fontSize: "clamp(36px, 4vw, 60px)", letterSpacing: "-0.025em", lineHeight: 1.0 }}
            >
              Leistungen
            </h2>
          </JpFadeIn>
          <JpFadeIn delay={0.1} className="md:col-span-5 md:col-start-7 flex items-end">
            <p
              className="text-jp-ink-2"
              style={{ fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.75, fontWeight: 300 }}
            >
              Ganzheitliche Kompetenz in Immobilienentwicklung und Beratung.
              Jede Leistung ist auf nachhaltige Wertschopfung ausgerichtet.
            </p>
          </JpFadeIn>
        </div>

        {/* Services list */}
        <div className="border-t border-black/[0.07]">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.6, delay: i * 0.04, ease: [0.16, 1, 0.3, 1] }}
              className="group py-8 md:py-10 border-b border-black/[0.07] grid grid-cols-12 gap-4 items-start cursor-default hover:bg-white/50 transition-colors duration-300 -mx-4 md:-mx-8 px-4 md:px-8"
            >
              <span
                className="col-span-2 md:col-span-1 text-jp-ink-4 pt-1"
                style={{ fontSize: "10px", letterSpacing: "0.16em", textTransform: "uppercase" }}
              >
                {s.num}
              </span>

              <div className="col-span-10 md:col-span-3">
                <h3
                  className="font-jp-display font-bold text-jp-ink group-hover:text-jp-accent transition-colors duration-300"
                  style={{ fontSize: "clamp(18px, 1.6vw, 24px)", letterSpacing: "-0.015em" }}
                >
                  {s.name}
                </h3>
              </div>

              <p
                className="hidden md:block col-span-4 text-jp-ink-2 leading-relaxed pt-1"
                style={{ fontSize: "clamp(14px, 0.95vw, 16px)", fontWeight: 300 }}
              >
                {s.desc}
              </p>

              <div className="hidden md:flex col-span-3 flex-wrap gap-2 justify-end pt-1">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-jp-ink-3 border border-black/[0.08] group-hover:border-jp-accent/30 group-hover:text-jp-accent transition-all duration-300"
                    style={{
                      fontSize: "9px",
                      letterSpacing: "0.16em",
                      textTransform: "uppercase",
                      padding: "5px 10px",
                    }}
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="hidden md:flex col-span-1 items-start justify-end pt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowUpRight />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
