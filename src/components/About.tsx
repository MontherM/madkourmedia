"use client"
import FadeIn from "./ui/FadeIn"

const values = [
  {
    title: "Persönlich",
    desc: "Jede Zusammenarbeit beginnt mit echtem Zuhören. Wir arbeiten direkt, ohne Umwege.",
  },
  {
    title: "Durchdacht",
    desc: "Strategisches Denken vor visuellem Ausdruck. Schönheit, die auch funktioniert.",
  },
  {
    title: "Wirkungsorientiert",
    desc: "Messbare Ergebnisse, nicht nur ästhetische Gefälligkeit. Jede Entscheidung hat einen Grund.",
  },
]

export default function About() {
  return (
    <section id="about" className="py-32 md:py-44">
      <div className="container-wide">

        {/* Section title row */}
        <FadeIn>
          <div className="flex items-end justify-between mb-16 md:mb-20 border-b border-white/[0.06] pb-8">
            <h2
              className="font-display font-bold text-ink leading-none"
              style={{
                fontSize: "clamp(52px, 8vw, 118px)",
                letterSpacing: "-0.03em",
              }}
            >
              ÜBER UNS
            </h2>
            <span className="label text-ink-3 self-start pt-2 hidden md:block">
              MadkourMedia, Zürich
            </span>
          </div>
        </FadeIn>

        {/* Large editorial statement */}
        <FadeIn delay={0.08}>
          <blockquote
            className="font-display font-bold text-ink leading-[0.96] mb-20 md:mb-28"
            style={{
              fontSize: "clamp(28px, 3.8vw, 58px)",
              letterSpacing: "-0.025em",
              maxWidth: "24ch",
            }}
          >
            "Marken werden nicht gemacht.
            <br />
            <span className="text-ink-2">
              Sie wachsen — mit der richtigen Pflege."
            </span>
          </blockquote>
        </FadeIn>

        {/* Two-column: story + mission */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-16 mb-20 md:mb-28">
          {/* Story */}
          <div className="md:col-span-5">
            <FadeIn>
              <span className="label text-accent mb-5 block">Unsere Reise</span>
            </FadeIn>
            <FadeIn delay={0.08}>
              <p className="body-lg text-ink-2 leading-relaxed mb-6">
                MadkourMedia entstand aus dem Wunsch, Marken nicht nur sichtbar,
                sondern spürbar zu machen. Was als kreatives Einzelstudio begann,
                ist heute ein ganzheitlicher Partner für Unternehmen, Selbstständige
                und Vereine, die mehr wollen als nur ein schönes Logo.
              </p>
            </FadeIn>
            <FadeIn delay={0.14}>
              <p className="body-lg text-ink-2 leading-relaxed">
                Wir verbinden strategisches Denken mit visueller Kraft — von der
                Idee über das Design bis zum digitalen Auftritt. Jede Zusammenarbeit
                ist persönlich, durchdacht und auf Wirkung ausgerichtet.
              </p>
            </FadeIn>
          </div>

          {/* Mission */}
          <div className="md:col-span-6 md:col-start-7">
            <FadeIn delay={0.1}>
              <span className="label text-accent mb-5 block">Unsere Mission</span>
            </FadeIn>
            <FadeIn delay={0.18}>
              <p className="body-lg text-ink-2 leading-relaxed mb-6">
                Wir glauben, dass starke Marken Klarheit schaffen — im Auftritt wie
                in der Identität. Unsere Arbeit beginnt mit Zuhören: Wer seid ihr?
                Was wollt ihr ausdrücken?
              </p>
            </FadeIn>
            <FadeIn delay={0.24}>
              <p className="body-lg text-ink-2 leading-relaxed">
                Unser Antrieb ist es, Unternehmen in ihrer Einzigartigkeit sichtbar
                zu machen — mit strategischem Gespür, ästhetischem Anspruch und
                einem klaren Fokus auf langfristige Markenwirkung.
              </p>
            </FadeIn>
          </div>
        </div>

        {/* Values row */}
        <div className="border-t border-white/[0.06] pt-12 md:pt-14 grid grid-cols-1 md:grid-cols-3 gap-px bg-transparent md:gap-10">
          {values.map((v, i) => (
            <FadeIn key={v.title} delay={i * 0.08}>
              <div className="flex flex-col gap-3 pb-8 md:pb-0 border-b md:border-b-0 border-white/[0.06] last:border-b-0">
                <span className="label text-ink-4">{`0${i + 1}`}</span>
                <h4
                  className="font-display font-bold text-ink"
                  style={{
                    fontSize: "clamp(20px, 1.8vw, 28px)",
                    letterSpacing: "-0.015em",
                  }}
                >
                  {v.title}
                </h4>
                <p className="body text-ink-2 leading-relaxed">{v.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>

      </div>
    </section>
  )
}
