"use client"
import { useState, FormEvent } from "react"
import FadeIn from "./ui/FadeIn"

const services = [
  "Brand Identity",
  "Content Strategy",
  "Digital Design",
  "Motion & Film",
  "Mehrere Leistungen",
]

export default function Contact() {
  const [selected, setSelected] = useState("")
  const [sent, setSent] = useState(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section id="kontakt" className="py-32 md:py-44 border-t border-white/[0.06]">
      <div className="container-wide">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-16 md:gap-20">

          {/* Left: info */}
          <div className="md:col-span-5">
            <FadeIn>
              <span className="label text-accent mb-6 block">Kontakt</span>
              <h2
                className="font-display font-bold text-ink leading-[0.94] mb-8"
                style={{
                  fontSize: "clamp(40px, 5.2vw, 76px)",
                  letterSpacing: "-0.03em",
                }}
              >
                Starten wir
                <br />
                gemeinsam
                <br />
                <span className="text-accent">Ihr Projekt.</span>
              </h2>
            </FadeIn>

            <FadeIn delay={0.1}>
              <p className="body-lg text-ink-2 leading-relaxed mb-10 max-w-sm">
                Wir nehmen uns Zeit für jede Anfrage. Schildern Sie uns Ihre
                Idee. Wir melden uns innerhalb von 24 Stunden.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="flex flex-col gap-4">
                {/* Email */}
                <a
                  href="mailto:hello@madkourmedia.com"
                  className="flex items-center gap-3 group"
                >
                  <span className="w-8 h-8 border border-white/[0.08] flex items-center justify-center flex-shrink-0 group-hover:border-accent/40 transition-colors duration-300">
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                      <rect x="1" y="2.5" width="10" height="7" rx="0.5" stroke="#5C5C5C" strokeWidth="1" />
                      <path d="M1 3.5L6 7L11 3.5" stroke="#5C5C5C" strokeWidth="1" />
                    </svg>
                  </span>
                  <span className="label text-ink-3 group-hover:text-ink transition-colors duration-300 link-underline">
                    hello@madkourmedia.com
                  </span>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3">
                  <span className="w-8 h-8 border border-white/[0.08] flex items-center justify-center flex-shrink-0">
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" aria-hidden>
                      <path
                        d="M5 0C2.8 0 1 1.8 1 4C1 7 5 12 5 12C5 12 9 7 9 4C9 1.8 7.2 0 5 0ZM5 5.5C4.17 5.5 3.5 4.83 3.5 4C3.5 3.17 4.17 2.5 5 2.5C5.83 2.5 6.5 3.17 6.5 4C6.5 4.83 5.83 5.5 5 5.5Z"
                        fill="#5C5C5C"
                      />
                    </svg>
                  </span>
                  <span className="label text-ink-3">Zürich, Schweiz</span>
                </div>
              </div>
            </FadeIn>

            {/* Response time badge */}
            <FadeIn delay={0.22}>
              <div className="mt-12 p-5 border border-white/[0.08] inline-flex flex-col gap-2">
                <span className="label text-accent flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse-slow" />
                  Aktuell verfügbar
                </span>
                <span className="body text-ink-2">
                  Durchschnittliche Antwortzeit: unter 24 Stunden
                </span>
              </div>
            </FadeIn>
          </div>

          {/* Right: form */}
          <div className="md:col-span-6 md:col-start-7">
            <FadeIn delay={0.06}>
              {sent ? (
                <div className="flex flex-col items-start gap-5 py-16">
                  <div className="w-10 h-10 border border-accent/30 flex items-center justify-center">
                    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" aria-hidden>
                      <path
                        d="M1 6L6 11L15 1"
                        stroke="#6DBB7D"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                      />
                    </svg>
                  </div>
                  <h3 className="subheadline text-ink">Nachricht erhalten.</h3>
                  <p className="body text-ink-2">
                    Wir melden uns innerhalb von 24 Stunden bei Ihnen.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-8">
                  {/* Name row */}
                  <div className="grid grid-cols-2 gap-6">
                    <div className="flex flex-col gap-2">
                      <label className="label text-ink-3" htmlFor="vorname">Vorname</label>
                      <input
                        id="vorname"
                        type="text"
                        placeholder="Max"
                        className="input"
                        required
                      />
                    </div>
                    <div className="flex flex-col gap-2">
                      <label className="label text-ink-3" htmlFor="nachname">Nachname</label>
                      <input
                        id="nachname"
                        type="text"
                        placeholder="Mustermann"
                        className="input"
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-2">
                    <label className="label text-ink-3" htmlFor="email">
                      E-Mail <span className="text-accent">*</span>
                    </label>
                    <input
                      id="email"
                      type="email"
                      placeholder="max@beispiel.ch"
                      className="input"
                      required
                    />
                  </div>

                  {/* Service selector */}
                  <div className="flex flex-col gap-3">
                    <label className="label text-ink-3">Leistung</label>
                    <div className="flex flex-wrap gap-2">
                      {services.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSelected(s)}
                          className={`label px-4 py-2 border transition-all duration-200 ${
                            selected === s
                              ? "border-accent text-accent bg-accent/[0.04]"
                              : "border-white/[0.10] text-ink-3 hover:border-white/20 hover:text-ink-2"
                          }`}
                        >
                          {s}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Message */}
                  <div className="flex flex-col gap-2">
                    <label className="label text-ink-3" htmlFor="nachricht">Ihre Nachricht</label>
                    <textarea
                      id="nachricht"
                      rows={4}
                      placeholder="Beschreiben Sie Ihr Projekt..."
                      className="input resize-none"
                      style={{ paddingTop: "14px" }}
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex items-center gap-4">
                    <button type="submit" className="btn-primary">
                      Anfrage senden
                      <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                        <path
                          d="M1 10L10 1M10 1H1M10 1V10"
                          stroke="currentColor"
                          strokeWidth="1.4"
                        />
                      </svg>
                    </button>
                    <span className="label text-ink-4">Antwort in &lt; 24h</span>
                  </div>
                </form>
              )}
            </FadeIn>
          </div>

        </div>
      </div>
    </section>
  )
}
