"use client"
import { useState, FormEvent } from "react"
import JpFadeIn from "./JpFadeIn"

const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

const topics = [
  "Projektentwicklung",
  "Immobilienberatung",
  "Standortanalyse",
  "Baumanagement",
  "Allgemeine Anfrage",
]

export default function JpContact() {
  const [selected, setSelected] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="kontakt" className="py-36 md:py-52 bg-jp-surface border-t border-black/[0.06]">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">

          {/* Left */}
          <div className="md:col-span-5">
            <JpFadeIn>
              <span
                className="text-jp-ink-3 block mb-6"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
              >
                Kontakt
              </span>
              <h2
                className="font-display font-bold text-jp-ink leading-none mb-8"
                style={{ fontSize: "clamp(38px, 4.5vw, 68px)", letterSpacing: "-0.025em" }}
              >
                Starten Sie
                <br />
                Ihr nachstes
                <br />
                <span style={{ color: "#1B2D1E" }}>Projekt.</span>
              </h2>
            </JpFadeIn>
            <JpFadeIn delay={0.1}>
              <p
                className="text-jp-ink-2 mb-10 max-w-sm"
                style={{ fontSize: "clamp(15px, 1.1vw, 17px)", lineHeight: 1.75, fontWeight: 300 }}
              >
                Wir nehmen uns Zeit fur jede Anfrage. Schildern Sie uns Ihr
                Vorhaben, wir melden uns innerhalb von 24 Stunden.
              </p>
            </JpFadeIn>
            <JpFadeIn delay={0.15}>
              <div className="flex flex-col gap-4">
                <a
                  href="mailto:info@jpdlag.ch"
                  className="flex items-center gap-3 group"
                >
                  <div
                    className="w-8 h-8 border border-black/[0.1] flex items-center justify-center flex-shrink-0 group-hover:border-jp-accent/50 transition-colors duration-300"
                  >
                    <svg width="12" height="10" viewBox="0 0 12 10" fill="none">
                      <rect x="0.5" y="0.5" width="11" height="9" rx="0.5" stroke="#909090" strokeWidth="0.75" />
                      <path d="M0.5 1.5L6 5.5L11.5 1.5" stroke="#909090" strokeWidth="0.75" />
                    </svg>
                  </div>
                  <span
                    className="text-jp-ink-3 group-hover:text-jp-ink transition-colors duration-300"
                    style={{ fontSize: "12px", letterSpacing: "0.06em" }}
                  >
                    info@jpdlag.ch
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 border border-black/[0.1] flex items-center justify-center flex-shrink-0">
                    <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                      <path d="M4 0C1.8 0 0 1.8 0 4C0 7 4 12 4 12C4 12 8 7 8 4C8 1.8 6.2 0 4 0ZM4 5.5C3.17 5.5 2.5 4.83 2.5 4C2.5 3.17 3.17 2.5 4 2.5C4.83 2.5 5.5 3.17 5.5 4C5.5 4.83 4.83 5.5 4 5.5Z" fill="#909090" />
                    </svg>
                  </div>
                  <span
                    className="text-jp-ink-3"
                    style={{ fontSize: "12px", letterSpacing: "0.06em" }}
                  >
                    Schweiz
                  </span>
                </div>
              </div>
            </JpFadeIn>
          </div>

          {/* Right: form */}
          <div className="md:col-span-6 md:col-start-7">
            <JpFadeIn delay={0.08}>
              {sent ? (
                <div className="flex flex-col items-start gap-5 py-16">
                  <div
                    className="w-10 h-10 border flex items-center justify-center"
                    style={{ borderColor: "rgba(27,45,30,0.3)" }}
                  >
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none">
                      <path d="M1 6L6 11L15 1" stroke="#1B2D1E" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                  </div>
                  <h3
                    className="font-display font-bold text-jp-ink"
                    style={{ fontSize: "clamp(22px, 2vw, 32px)", letterSpacing: "-0.015em" }}
                  >
                    Nachricht erhalten.
                  </h3>
                  <p
                    className="text-jp-ink-2"
                    style={{ fontSize: "15px", fontWeight: 300 }}
                  >
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-jp-ink-3"
                        style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                      >
                        Vorname
                      </label>
                      <input
                        type="text"
                        placeholder="Max"
                        required
                        className="w-full bg-transparent border-b border-black/[0.12] text-jp-ink placeholder-jp-ink-4 outline-none pb-3 transition-colors duration-200 focus:border-jp-accent"
                        style={{ fontSize: "15px", fontWeight: 300 }}
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label
                        className="text-jp-ink-3"
                        style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                      >
                        Nachname
                      </label>
                      <input
                        type="text"
                        placeholder="Muster"
                        className="w-full bg-transparent border-b border-black/[0.12] text-jp-ink placeholder-jp-ink-4 outline-none pb-3 transition-colors duration-200 focus:border-jp-accent"
                        style={{ fontSize: "15px", fontWeight: 300 }}
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-jp-ink-3"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      E-Mail *
                    </label>
                    <input
                      type="email"
                      placeholder="max@beispiel.ch"
                      required
                      className="w-full bg-transparent border-b border-black/[0.12] text-jp-ink placeholder-jp-ink-4 outline-none pb-3 transition-colors duration-200 focus:border-jp-accent"
                      style={{ fontSize: "15px", fontWeight: 300 }}
                    />
                  </div>

                  {/* Topic */}
                  <div className="flex flex-col gap-3">
                    <label
                      className="text-jp-ink-3"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      Thema
                    </label>
                    <div className="flex flex-wrap gap-2">
                      {topics.map((t) => (
                        <button
                          key={t}
                          type="button"
                          onClick={() => setSelected(t)}
                          className="border transition-all duration-200"
                          style={{
                            fontSize: "9px",
                            letterSpacing: "0.14em",
                            textTransform: "uppercase",
                            padding: "7px 12px",
                            borderColor: selected === t ? "#1B2D1E" : "rgba(0,0,0,0.1)",
                            color: selected === t ? "#1B2D1E" : "#909090",
                            background: selected === t ? "rgba(27,45,30,0.04)" : "transparent",
                          }}
                        >
                          {t}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label
                      className="text-jp-ink-3"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      Ihre Nachricht
                    </label>
                    <textarea
                      rows={4}
                      placeholder="Beschreiben Sie Ihr Vorhaben..."
                      className="w-full bg-transparent border-b border-black/[0.12] text-jp-ink placeholder-jp-ink-4 outline-none pb-3 resize-none transition-colors duration-200 focus:border-jp-accent"
                      style={{ fontSize: "15px", fontWeight: 300 }}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-4">
                    <button
                      type="submit"
                      className="inline-flex items-center gap-2 text-white bg-jp-accent hover:bg-jp-accent-hover transition-colors duration-300"
                      style={{
                        fontSize: "11px",
                        fontWeight: 500,
                        letterSpacing: "0.14em",
                        textTransform: "uppercase",
                        padding: "15px 28px",
                      }}
                    >
                      Anfrage senden <ArrowUpRight />
                    </button>
                    <span
                      className="text-jp-ink-4"
                      style={{ fontSize: "10px", letterSpacing: "0.14em", textTransform: "uppercase" }}
                    >
                      Antwort in &lt; 24h
                    </span>
                  </div>
                </form>
              )}
            </JpFadeIn>
          </div>
        </div>
      </div>
    </section>
  )
}
