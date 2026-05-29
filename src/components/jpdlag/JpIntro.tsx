import JpFadeIn from "./JpFadeIn"

export default function JpIntro() {
  return (
    <section id="ueber-uns" className="py-36 md:py-52 bg-jp-bg">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Left */}
          <div className="md:col-span-5">
            <JpFadeIn>
              <span
                className="text-jp-ink-3 block mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
              >
                Über J P DL AG
              </span>
            </JpFadeIn>
            <JpFadeIn delay={0.08}>
              <h2
                className="font-jp-display font-bold text-jp-ink leading-none"
                style={{ fontSize: "clamp(38px, 4.5vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1.0 }}
              >
                Architektonische
                <br />
                Kompetenz.
                <br />
                Unternehmerische
                <br />
                Präzision.
              </h2>
            </JpFadeIn>

            {/* H&dM origin badge */}
            <JpFadeIn delay={0.14}>
              <div
                className="mt-10 border border-black/[0.08] p-5 flex flex-col gap-2"
              >
                <span
                  className="text-jp-ink-3"
                  style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                >
                  Herkunft
                </span>
                <p
                  className="text-jp-ink"
                  style={{ fontSize: "13px", fontWeight: 400, lineHeight: 1.6 }}
                >
                  Seit 2016 internes Kompetenzcenter bei{" "}
                  <span style={{ color: "#1B2D1E", fontWeight: 500 }}>Herzog &amp; de Meuron</span>.
                  Heute eine selbständige Firma mit engen Verbindungen
                  zu Jacques Herzog und Pierre de Meuron.
                </p>
              </div>
            </JpFadeIn>
          </div>

          {/* Right */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-10">
            <JpFadeIn delay={0.12}>
              <p
                className="text-jp-ink-2"
                style={{ fontSize: "clamp(16px, 1.15vw, 19px)", lineHeight: 1.8, fontWeight: 300 }}
              >
                J P DL ist Bauherrenvertreter, Projektentwickler und
                Immobilienberatung für Eigentümer, Gesellschaften, Investoren
                und die öffentliche Hand.
              </p>
            </JpFadeIn>
            <JpFadeIn delay={0.18}>
              <p
                className="text-jp-ink-2"
                style={{ fontSize: "clamp(16px, 1.15vw, 19px)", lineHeight: 1.8, fontWeight: 300 }}
              >
                Von der ersten Idee bis zur Fertigstellung begleiten wir
                Projekte mit individuellem Engagement und persönlicher
                Verantwortung. Fragen Sie nach unseren Referenzen.
              </p>
            </JpFadeIn>

            {/* Key qualities */}
            <JpFadeIn delay={0.24}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/[0.07]">
                {[
                  "Individuelle Beratung",
                  "Persönliche Begleitung",
                  "Netzwerk H&dM",
                  "Standort Basel",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2.5">
                    <div
                      className="w-1 h-1 rounded-full flex-shrink-0"
                      style={{ background: "#1B2D1E" }}
                    />
                    <span
                      className="text-jp-ink-2"
                      style={{ fontSize: "13px", fontWeight: 300 }}
                    >
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </JpFadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
