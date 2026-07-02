import Link from "next/link"
import Reveal from "@/components/academy/ui/Reveal"
import ProgressBar from "@/components/academy/ui/ProgressBar"
import { ArrowRight, Check, Sparkles, Flame, Bolt, Trophy, Book, Lock, Star } from "@/components/academy/ui/Icons"
import { getLevels, totalLessonCount, getPrompts, getTools } from "@/lib/academy/data"

const method = [
  ["Warum", "Wieso diese Aufgabe mit KI besser läuft – der Sinn dahinter."],
  ["Wie", "Der konkrete, nachbaubare Weg. Schritt für Schritt."],
  ["Wann", "In welcher Situation – und wann es sich nicht lohnt."],
  ["Welche KI", "Das richtige Werkzeug für genau dieses Problem."],
  ["Grenzen", "Wo KI scheitert und du wachsam sein musst."],
  ["Business-Nutzen", "Wie daraus echte Zeit- und Geldersparnis wird."],
]

const features = [
  { icon: Book, title: "Strukturierte Levels", desc: "Vom ersten Prompt bis zum eigenen KI-Agenten – ein klarer Lernpfad." },
  { icon: Sparkles, title: "Prompt-Bibliothek", desc: "Geprüfte Prompts mit Filter, Suche und Copy-Button für jede Aufgabe." },
  { icon: Bolt, title: "AI-Tool-Bibliothek", desc: "Claude, ChatGPT, n8n & Co. – mit Vor-/Nachteilen und Anwendungsfällen." },
  { icon: Flame, title: "Gamification", desc: "XP, Streaks, Badges und Wochenziele halten dich konstant dran." },
  { icon: Trophy, title: "Zertifikate", desc: "Quiz, Abschlussprojekt und ein verifizierbares Zertifikat pro Level." },
  { icon: Star, title: "Community & Live", desc: "Forum, Discord, Prompt-Battles und monatliche Live-Calls." },
]

const audiences = ["Anfänger", "Büroangestellte", "Unternehmer", "Studenten", "Content Creator", "KMU & Teams"]

export default function AcademyHome() {
  const levels = getLevels()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="ac-grid-bg pointer-events-none absolute inset-0 opacity-60" />
        <div
          className="pointer-events-none absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full blur-3xl"
          style={{ background: "radial-gradient(circle, var(--ac-primary-soft), transparent 70%)" }}
        />
        <div className="relative mx-auto grid max-w-7xl gap-12 px-5 pb-20 pt-16 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:pt-24">
          <div className="flex flex-col justify-center">
            <Reveal>
              <span className="ac-pill" style={{ color: "var(--ac-primary)" }}>
                <Sparkles width={14} height={14} /> Die KI-Akademie für den DACH-Raum
              </span>
            </Reveal>
            <Reveal delay={0.05}>
              <h1 className="ac-display mt-6">
                Werde in Wochen <span className="ac-gradient-text">10× produktiver</span> mit KI.
              </h1>
            </Reveal>
            <Reveal delay={0.1}>
              <p className="mt-6 max-w-xl text-lg leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>
                Kein weiterer „ChatGPT-Kurs“. Eine Lernplattform, die dich KI wirklich verstehen,
                anwenden und automatisieren lässt – mit Kursen, Prompts, Tools, Community und
                Zertifikaten.
              </p>
            </Reveal>
            <Reveal delay={0.15}>
              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link href="/academy/pricing" className="ac-btn ac-btn-primary">
                  Jetzt starten <ArrowRight width={16} height={16} />
                </Link>
                <Link href="/academy/curriculum" className="ac-btn ac-btn-ghost">
                  Lehrplan ansehen
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.2}>
              <dl className="mt-12 grid max-w-md grid-cols-3 gap-6">
                {[
                  [`${totalLessonCount}+`, "Lektionen"],
                  [`${getPrompts().length * 20}+`, "Prompts"],
                  [`${getTools().length}+`, "AI-Tools"],
                ].map(([n, l]) => (
                  <div key={l}>
                    <dt className="ac-h3" style={{ fontFamily: "var(--font-syne)" }}>{n}</dt>
                    <dd className="mt-1 text-sm" style={{ color: "var(--ac-ink-3)" }}>{l}</dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>

          {/* Hero visual: faux dashboard */}
          <Reveal delay={0.15} className="flex items-center">
            <HeroVisual />
          </Reveal>
        </div>
      </section>

      {/* ── Method ───────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="ac-eyebrow">Was uns anders macht</span>
            <h2 className="ac-h2 mt-3 max-w-2xl">
              Andere zeigen „schreib diesen Prompt“. Wir zeigen das ganze Bild.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {method.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.05}>
                <div className="ac-card ac-card-hover h-full p-6">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-lg text-sm font-bold"
                    style={{ background: "var(--ac-primary-soft)", color: "var(--ac-primary)" }}
                  >
                    {i + 1}
                  </div>
                  <h3 className="ac-h3 mt-4">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>
                    {desc}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Levels ───────────────────────────────────────────── */}
      <section id="levels" className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="ac-eyebrow">Der Lernpfad</span>
            <h2 className="ac-h2 mt-3">Drei Stufen vom Einsteiger zum Master.</h2>
          </Reveal>
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {levels.map((lvl, i) => (
              <Reveal key={lvl.id} delay={i * 0.06}>
                <Link href="/academy/curriculum" className="ac-card ac-card-hover block h-full overflow-hidden">
                  <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${lvl.gradient[0]}, ${lvl.gradient[1]})` }} />
                  <div className="p-7">
                    <div className="flex items-center justify-between">
                      <span className="ac-pill">{lvl.badge}</span>
                      {lvl.access !== "free" && (
                        <span className="inline-flex items-center gap-1 text-xs" style={{ color: "var(--ac-ink-3)" }}>
                          <Lock width={13} height={13} /> {lvl.access}
                        </span>
                      )}
                    </div>
                    <h3 className="mt-5 text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                      {lvl.title}
                    </h3>
                    <p className="mt-1 text-sm" style={{ color: "var(--ac-primary)" }}>{lvl.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>
                      {lvl.description}
                    </p>
                    <ul className="mt-5 space-y-2">
                      {lvl.outcomes.map((o) => (
                        <li key={o} className="flex gap-2 text-sm" style={{ color: "var(--ac-ink-2)" }}>
                          <Check width={16} height={16} style={{ color: "var(--ac-primary)", flexShrink: 0, marginTop: 2 }} />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <span className="ac-eyebrow">Mehr als Videos</span>
            <h2 className="ac-h2 mt-3 max-w-2xl">Ein komplettes Ökosystem zum Lernen und Anwenden.</h2>
          </Reveal>
          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <Reveal key={title} delay={i * 0.04}>
                <div className="ac-card ac-card-hover h-full p-6">
                  <div
                    className="grid h-11 w-11 place-items-center rounded-xl"
                    style={{ background: "var(--ac-primary-soft)", color: "var(--ac-primary)" }}
                  >
                    <Icon width={20} height={20} />
                  </div>
                  <h3 className="ac-h3 mt-4">{title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audiences ────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8">
          <Reveal>
            <div className="flex flex-col items-start gap-6 md:flex-row md:items-center md:justify-between">
              <h2 className="ac-h3 max-w-md" style={{ fontWeight: 700 }}>
                Für jede Zielgruppe ein eigener Pfad – jeder später als Modul buchbar.
              </h2>
              <div className="flex flex-wrap gap-2.5">
                {audiences.map((a) => (
                  <span key={a} className="ac-pill">{a}</span>
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Community / CTA ──────────────────────────────────── */}
      <section id="community" className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-10 sm:p-16"
              style={{ background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))" }}
            >
              <div className="relative z-10 max-w-2xl text-white">
                <h2 className="ac-h2">Lernen ist keine Einbahnstraße.</h2>
                <p className="mt-4 text-lg opacity-90">
                  Forum, Discord, Prompt-Battles, monatliche Live-Calls und ständig neue Tools und
                  Prompts. Du bleibst auf dem aktuellsten Stand – wir auch.
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/academy/pricing" className="ac-btn !bg-white !text-black">
                    Mitglied werden <ArrowRight width={16} height={16} />
                  </Link>
                  <Link href="/academy/curriculum" className="ac-btn !border-white/40 !text-white">
                    Erst stöbern
                  </Link>
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  )
}

function HeroVisual() {
  return (
    <div className="ac-card w-full p-6" style={{ boxShadow: "var(--ac-shadow)" }}>
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm" style={{ color: "var(--ac-ink-3)" }}>Willkommen zurück</p>
          <p className="text-lg font-semibold">Dein Fortschritt</p>
        </div>
        <span className="ac-pill" style={{ color: "var(--ac-primary)" }}>
          <Flame width={14} height={14} /> 7 Tage Streak
        </span>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        {[
          [Bolt, "1.240", "XP"],
          [Trophy, "3", "Badges"],
          [Book, "3/7", "Lektionen"],
        ].map(([Icon, n, l], i) => {
          const I = Icon as typeof Bolt
          return (
            <div key={i} className="rounded-2xl p-4" style={{ background: "var(--ac-surface-2)" }}>
              <I width={17} height={17} style={{ color: "var(--ac-primary)" }} />
              <p className="mt-3 text-xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>{n as string}</p>
              <p className="text-xs" style={{ color: "var(--ac-ink-3)" }}>{l as string}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-5 space-y-4">
        {[
          ["AI Basics", 0.82],
          ["AI Productivity", 0.34],
          ["AI Master", 0.08],
        ].map(([label, val]) => (
          <div key={label as string}>
            <div className="mb-1.5 flex justify-between text-sm">
              <span>{label as string}</span>
              <span style={{ color: "var(--ac-ink-3)" }}>{Math.round((val as number) * 100)}%</span>
            </div>
            <ProgressBar value={val as number} />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center gap-3 rounded-2xl p-4"
        style={{ background: "var(--ac-primary-soft)" }}
      >
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full" style={{ background: "var(--ac-primary)", color: "#fff" }}>
          <Sparkles width={16} height={16} />
        </span>
        <div className="text-sm">
          <p className="font-medium">Weiter geht’s: Gute Fragen stellen</p>
          <p style={{ color: "var(--ac-ink-3)" }}>Level 1 · 16 Min · +70 XP</p>
        </div>
      </div>
    </div>
  )
}
