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

const stats = [
  { n: "50+", label: "Projekte abgeschlossen" },
  { n: "20+", label: "Zufriedene Kunden" },
  { n: "5+", label: "Jahre Erfahrung" },
  { n: "3", label: "Kernbereiche" },
]

export default function Clients() {
  return (
    <section className="py-28 md:py-36 border-y border-white/[0.06]">
      <div className="container-wide">

        {/* Editorial statement — the scroll stopper */}
        <FadeIn>
          <div className="mb-16 md:mb-20 pb-14 md:pb-16 border-b border-white/[0.06]">
            <p
              className="font-display font-bold text-ink leading-[0.94]"
              style={{
                fontSize: "clamp(32px, 4.8vw, 72px)",
                letterSpacing: "-0.025em",
                maxWidth: "16ch",
              }}
            >
              Vertrauen, das durch{" "}
              <span className="text-ink-3">Arbeit</span>{" "}
              verdient wurde.
            </p>
          </div>
        </FadeIn>

        {/* Label + client list */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
          <FadeIn className="md:col-span-3">
            <span className="label text-ink-3">Sie vertrauen uns</span>
          </FadeIn>

          <div className="md:col-span-9">
            <div className="flex flex-wrap gap-x-10 gap-y-5 md:gap-x-14 md:gap-y-6">
              {clients.map((c, i) => (
                <FadeIn key={c.name} delay={i * 0.055}>
                  <div className="group flex flex-col gap-1">
                    <span
                      className="font-display font-bold text-ink-3 hover:text-ink transition-colors duration-300 cursor-default"
                      style={{
                        fontSize: "clamp(15px, 1.4vw, 21px)",
                        letterSpacing: "-0.01em",
                      }}
                    >
                      {c.name}
                    </span>
                    <span className="label text-ink-4">{c.sector}</span>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>

        {/* Stats row */}
        <FadeIn delay={0.18}>
          <div className="mt-16 md:mt-20 pt-10 md:pt-12 border-t border-white/[0.06] grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6">
            {stats.map((s) => (
              <div key={s.n} className="flex flex-col gap-1.5">
                <span
                  className="font-display font-bold text-ink"
                  style={{
                    fontSize: "clamp(36px, 3.8vw, 58px)",
                    letterSpacing: "-0.035em",
                    lineHeight: 1,
                  }}
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
