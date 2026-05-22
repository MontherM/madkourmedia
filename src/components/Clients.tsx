"use client"
import FadeIn from "./ui/FadeIn"

const clients = [
  { name: "iM Suk", sector: "Wellness" },
  { name: "H&B Real Estate AG", sector: "Immobilien" },
  { name: "Savills", sector: "Real Estate" },
  { name: "REI Solar", sector: "Energie" },
  { name: "Mit Musig dur d Schwiiz", sector: "Kultur" },
  { name: "Dani Sparn", sector: "Entertainment" },
]

export default function Clients() {
  return (
    <section className="py-24 md:py-32 border-y border-white/[0.05]">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center">
          {/* Label */}
          <FadeIn className="md:col-span-3">
            <span className="label text-ink-3">Sie vertrauen uns</span>
          </FadeIn>

          {/* Client list */}
          <div className="md:col-span-9">
            <div className="flex flex-wrap gap-x-10 gap-y-6 md:gap-x-14">
              {clients.map((c, i) => (
                <FadeIn key={c.name} delay={i * 0.06}>
                  <div className="group">
                    <span
                      className="font-display font-bold text-ink-4 hover:text-ink transition-colors duration-400 cursor-default"
                      style={{ fontSize: "clamp(14px, 1.4vw, 20px)", letterSpacing: "-0.01em" }}
                    >
                      {c.name}
                    </span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Divider with stat numbers */}
        <FadeIn delay={0.2}>
          <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {[
              { n: "50+", label: "Projekte abgeschlossen" },
              { n: "20+", label: "Zufriedene Kunden" },
              { n: "5+", label: "Jahre Erfahrung" },
              { n: "3", label: "Kernbereiche" },
            ].map((s) => (
              <div key={s.n} className="flex flex-col gap-1">
                <span
                  className="font-display font-bold text-ink"
                  style={{ fontSize: "clamp(32px, 3.5vw, 52px)", letterSpacing: "-0.03em", lineHeight: 1 }}
                >
                  {s.n}
                </span>
                <span className="label text-ink-3 mt-1">{s.label}</span>
              </div>
            ))}
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
