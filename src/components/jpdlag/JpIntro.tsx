import JpFadeIn from "./JpFadeIn"

export default function JpIntro() {
  return (
    <section id="ueber-uns" className="py-36 md:py-52 bg-jp-bg">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 items-start">

          {/* Left: label + big statement */}
          <div className="md:col-span-5">
            <JpFadeIn>
              <span
                className="text-jp-ink-3 block mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
              >
                Uber JP DL AG
              </span>
            </JpFadeIn>
            <JpFadeIn delay={0.08}>
              <h2
                className="font-jp-display font-bold text-jp-ink leading-none"
                style={{ fontSize: "clamp(38px, 4.5vw, 68px)", letterSpacing: "-0.025em", lineHeight: 1.0 }}
              >
                Wo Architektur
                <br />
                auf wirtschaft-
                <br />
                liches Denken
                <br />
                trifft.
              </h2>
            </JpFadeIn>
          </div>

          {/* Right: text + small values */}
          <div className="md:col-span-6 md:col-start-7 flex flex-col gap-10">
            <JpFadeIn delay={0.12}>
              <p
                className="text-jp-ink-2"
                style={{ fontSize: "clamp(16px, 1.15vw, 19px)", lineHeight: 1.75, fontWeight: 300 }}
              >
                JP DL AG verbindet architektonisches Verstandnis mit
                unternehmerischer Perspektive. Wir begleiten Investoren,
                Eigenturmer und institutionelle Partner von der ersten
                Potenzialanalyse bis zur erfolgreichen Vermarktung.
              </p>
            </JpFadeIn>
            <JpFadeIn delay={0.18}>
              <p
                className="text-jp-ink-2"
                style={{ fontSize: "clamp(16px, 1.15vw, 19px)", lineHeight: 1.75, fontWeight: 300 }}
              >
                Was uns auszeichnet: der ganzheitliche Blick. Wir denken in
                Projekten, nicht in Einzelleistungen. Unsere Expertise reicht
                von der Standortbewertung uber Konzept- und Architekturentwicklung
                bis zum Baumanagement und der Vermarktungsbegleitung.
              </p>
            </JpFadeIn>

            {/* Differentiators */}
            <JpFadeIn delay={0.24}>
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-black/[0.07]">
                {[
                  "Investorenperspektive",
                  "Architekturverstandnis",
                  "Wirtschaftliche Prazision",
                  "Netzwerk Schweiz",
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
