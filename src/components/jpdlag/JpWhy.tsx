import JpFadeIn from "./JpFadeIn"

const reasons = [
  {
    num: "01",
    title: "Klare Prozesse",
    desc: "Transparente Strukturen, definierte Meilensteine und eindeutige Verantwortlichkeiten. Von Beginn an.",
  },
  {
    num: "02",
    title: "Architekturverstandnis",
    desc: "Wir denken wie Architekten und rechnen wie Unternehmer. Diese Verbindung schafft Projekte, die bestehen.",
  },
  {
    num: "03",
    title: "Wirtschaftliches Denken",
    desc: "Jede Entscheidung wird auf ihre okonomische Wirkung gepruft. Schonheit und Rentabilitat schliessen sich nicht aus.",
  },
  {
    num: "04",
    title: "Starkes Netzwerk",
    desc: "Jahrelange Beziehungen zu Architekten, Behorden, Investoren und Handwerkern in der Schweiz.",
  },
  {
    num: "05",
    title: "Umsetzungserfahrung",
    desc: "Wir kennen die Klippen. Und wir wissen, wie man ihnen ausweicht. Erfahrung, die sich auszahlt.",
  },
  {
    num: "06",
    title: "Individuelle Beratung",
    desc: "Keine Standardlosungen. Jedes Projekt, jeder Auftraggeber bekommt die Aufmerksamkeit, die er verdient.",
  },
]

export default function JpWhy() {
  return (
    <section className="py-36 md:py-52 bg-jp-surface-2">
      <div className="container-wide">
        {/* Header */}
        <JpFadeIn>
          <div className="mb-20 md:mb-28 max-w-2xl">
            <span
              className="text-jp-ink-3 block mb-6"
              style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
            >
              Warum JP DL AG
            </span>
            <h2
              className="font-jp-display font-bold text-jp-ink"
              style={{ fontSize: "clamp(38px, 4.5vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1.0 }}
            >
              Sechs Grunde, die
              <br />
              den Unterschied
              <br />
              machen.
            </h2>
          </div>
        </JpFadeIn>

        {/* Grid of reasons */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-black/[0.06]">
          {reasons.map((r, i) => (
            <JpFadeIn key={r.num} delay={i * 0.06}>
              <div className="bg-jp-bg p-8 md:p-10 flex flex-col gap-4 h-full hover:bg-white/70 transition-colors duration-300 group">
                <span
                  className="text-jp-ink-4"
                  style={{ fontSize: "10px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  {r.num}
                </span>
                <h3
                  className="font-jp-display font-bold text-jp-ink group-hover:text-jp-accent transition-colors duration-300"
                  style={{ fontSize: "clamp(18px, 1.5vw, 22px)", letterSpacing: "-0.01em", lineHeight: 1.2 }}
                >
                  {r.title}
                </h3>
                <p
                  className="text-jp-ink-2 mt-auto"
                  style={{ fontSize: "clamp(14px, 0.95vw, 15px)", lineHeight: 1.75, fontWeight: 300 }}
                >
                  {r.desc}
                </p>
              </div>
            </JpFadeIn>
          ))}
        </div>
      </div>
    </section>
  )
}
