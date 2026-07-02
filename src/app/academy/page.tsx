import Link from "next/link"
import Reveal from "@/components/academy/ui/Reveal"
import ProgressBar from "@/components/academy/ui/ProgressBar"
import { ArrowRight, Check, Sparkles, Flame, Bolt, Trophy, Book, Lock } from "@/components/academy/ui/Icons"
import { getLevels, totalLessonCount, getPrompts, getTools } from "@/lib/academy/data"

const marqueeSkills = [
  "Prompting",
  "KI-Agenten",
  "Workflow-Design",
  "Excel & Tabellen",
  "Recherche",
  "Angebote",
  "Custom GPTs",
  "n8n",
  "Context Engineering",
  "Meetings",
  "Content",
]

const transformation: [string, string, string][] = [
  ["01", "Du probierst ChatGPT ab und zu aus.", "Du weißt bei jeder Aufgabe in 30 Sekunden: delegieren, prüfen oder selbst machen."],
  ["02", "Jedes Angebot, jedes Protokoll kostet dich 45 Minuten.", "Offerten, Protokolle und Recherchen laufen in Minuten – in konstanter Qualität."],
  ["03", "„KI-Agenten“ sind für dich ein Buzzword.", "Dein erster Agent arbeitet nachts für dich – mit klaren Grenzen und Logging."],
]

const method = [
  ["Warum", "Wieso diese Aufgabe mit KI besser läuft – der Sinn dahinter."],
  ["Wie", "Der konkrete, nachbaubare Weg. Schritt für Schritt, am echten Beispiel."],
  ["Wann", "In welcher Situation – und wann es sich nicht lohnt."],
  ["Welche KI", "Das richtige Werkzeug für genau dieses Problem – tool-unabhängig."],
  ["Grenzen", "Wo KI scheitert und du wachsam sein musst. Ehrlich."],
  ["Business-Nutzen", "Wie daraus echte Zeit- und Geldersparnis wird."],
]

const features = [
  ["Outcome pro Lektion", "Jede Lektion verspricht eine Fähigkeit – und liefert sie mit einem Artefakt zum Mitnehmen: Prompt, Vorlage oder Workflow."],
  ["Prompt-Bibliothek", "Geprüfte Prompts mit Suche, Kategorien, Copy-Button und .md-Export für Obsidian & Notion."],
  ["Quiz & Zertifikate", "Bestehens-Zertifikate mit Score und Verifizierungscode – kein „war dabei“-Diplom."],
  ["Dranbleiben eingebaut", "XP, Streaks, Badges, Wochenziel – dein Fortschritt ist sichtbar und motiviert."],
  ["Community & Live", "Forum, Live Q&A und Menschen aus dem DACH-Raum, die dieselben Probleme lösen."],
  ["Immer aktuell", "KI ändert sich monatlich. Die Academy auch – neue Lektionen, Tools und Prompts inklusive."],
]

const audiences = ["Anfänger", "Büroangestellte", "Unternehmer", "Studenten", "Content Creator", "KMU & Teams", "Immobilien", "Agenturen"]

export default function AcademyHome() {
  const levels = getLevels()

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="ac-dot-bg pointer-events-none absolute inset-0 opacity-40" />
        <div className="relative mx-auto max-w-7xl px-5 pb-16 pt-12 sm:px-8 sm:pt-16 lg:pb-24 lg:pt-20">
          {/* Poster headline over the full width */}
          <Reveal>
            <span className="ac-sticker">
              <Sparkles width={13} height={13} /> Deutschsprachig · tool-unabhängig
            </span>
          </Reveal>
          <Reveal delay={0.05}>
            <h1 className="ac-display mt-7 max-w-5xl">
              Von Rumprobieren zu <span className="ac-gradient-text">Automatisieren.</span>
            </h1>
          </Reveal>

          <div className="mt-10 grid gap-12 lg:mt-14 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex min-w-0 flex-col justify-center">
              <Reveal delay={0.1}>
                <p className="max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--ac-ink-2)" }}>
                  Kein weiterer „ChatGPT-Kurs“. Eine Lernplattform mit klarem Weg: verstehen,
                  anwenden, delegieren – bis Angebote, Protokolle und Recherchen von selbst laufen.
                  Mit einem Menschen, nicht mit einem Avatar.
                </p>
              </Reveal>
              <Reveal delay={0.15}>
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  <Link href="/academy/curriculum" className="ac-btn ac-btn-primary">
                    Kostenlos starten <ArrowRight width={16} height={16} />
                  </Link>
                  <Link href="/academy/pricing" className="ac-btn ac-btn-ghost">
                    Preise ansehen
                  </Link>
                </div>
                <p className="mt-3 text-xs" style={{ color: "var(--ac-ink-3)" }}>
                  Level 1 komplett gratis · kein Konto nötig · monatlich kündbar
                </p>
              </Reveal>
              <Reveal delay={0.2}>
                <dl className="mt-12 flex max-w-md divide-x" style={{ borderColor: "var(--ac-border)" }}>
                  {[
                    [`${totalLessonCount}`, "Lektionen"],
                    [`${getPrompts().length}`, "Prompts"],
                    [`${getTools().length}`, "AI-Tools"],
                  ].map(([n, l], i) => (
                    <div key={l} className={i === 0 ? "pr-6 sm:pr-8" : "px-6 sm:px-8"} style={{ borderColor: "var(--ac-border)" }}>
                      <dt className="text-3xl font-extrabold sm:text-4xl" style={{ fontFamily: "var(--font-syne)" }}>{n}</dt>
                      <dd className="mt-1 text-xs sm:text-sm" style={{ color: "var(--ac-ink-3)" }}>{l}</dd>
                    </div>
                  ))}
                </dl>
              </Reveal>
            </div>

            {/* Hero visual: faux dashboard, slightly rotated like a printed card */}
            <Reveal delay={0.15} className="flex min-w-0 items-center">
              <div className="w-full lg:rotate-[-1.2deg]" style={{ filter: "drop-shadow(8px 8px 0 var(--ac-primary-soft))" }}>
                <HeroVisual />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Skills marquee */}
        <div className="ac-marquee border-y py-3.5" style={{ borderColor: "var(--ac-border)" }} aria-hidden>
          {[0, 1].map((copy) => (
            <div key={copy} className="ac-marquee-track">
              {marqueeSkills.map((s) => (
                <span key={`${copy}-${s}`} className="flex items-center whitespace-nowrap px-5 text-sm font-medium" style={{ color: "var(--ac-ink-2)" }}>
                  {s}
                  <span className="ml-10 inline-block h-1.5 w-1.5 rounded-full" style={{ background: "var(--ac-primary)" }} />
                </span>
              ))}
            </div>
          ))}
        </div>
      </section>

      {/* ── Transformation ───────────────────────────────────── */}
      <section>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <span className="ac-eyebrow">Das Versprechen</span>
            <h2 className="ac-h2 mt-3 max-w-3xl">In 4 Wochen sieht deine Arbeit anders aus.</h2>
          </Reveal>
          <div className="mt-10 sm:mt-14">
            {transformation.map(([num, before, after], i) => (
              <Reveal key={num} delay={i * 0.05}>
                <div
                  className="grid gap-4 border-t py-8 sm:grid-cols-[80px_1fr_1fr] sm:gap-8 sm:py-10"
                  style={{ borderColor: "var(--ac-border)" }}
                >
                  <span className="ac-counter">{num}</span>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--ac-ink-3)" }}>Heute</p>
                    <p className="mt-2 text-base leading-relaxed line-through decoration-1 sm:text-lg" style={{ color: "var(--ac-ink-3)", textDecorationColor: "var(--ac-primary)" }}>
                      {before}
                    </p>
                  </div>
                  <div>
                    <p className="text-[11px] font-medium uppercase tracking-[0.18em]" style={{ color: "var(--ac-primary)" }}>Nach der Academy</p>
                    <p className="mt-2 text-base font-medium leading-relaxed sm:text-lg">{after}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Levels ───────────────────────────────────────────── */}
      <section id="levels" className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <span className="ac-eyebrow">Der Lernpfad</span>
            <div className="mt-3 flex flex-wrap items-end justify-between gap-4">
              <h2 className="ac-h2 max-w-xl">Drei Stufen – vom ersten Prompt zum eigenen Agenten.</h2>
              <Link href="/academy/curriculum" className="ac-btn ac-btn-ghost !py-2.5 !px-4 !text-[13px]">
                Ganzen Lehrplan ansehen <ArrowRight width={14} height={14} />
              </Link>
            </div>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:mt-14 lg:grid-cols-3">
            {levels.map((lvl, i) => (
              <Reveal key={lvl.id} delay={i * 0.06}>
                <Link href="/academy/curriculum" className="ac-card ac-card-hover block h-full overflow-hidden">
                  <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${lvl.gradient[0]}, ${lvl.gradient[1]})` }} />
                  <div className="p-6 sm:p-7">
                    <div className="flex items-start justify-between gap-3">
                      <span className="ac-counter" style={{ WebkitTextStroke: `1.5px ${lvl.gradient[0]}` }}>0{lvl.order}</span>
                      {lvl.access !== "free" ? (
                        <span className="ac-pill !text-[11px]">
                          <Lock width={11} height={11} /> ab {lvl.access}
                        </span>
                      ) : (
                        <span className="ac-pill !text-[11px]" style={{ color: "var(--ac-primary)" }}>gratis</span>
                      )}
                    </div>
                    <h3 className="mt-4 text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                      {lvl.title}
                    </h3>
                    <p className="mt-1 text-sm font-medium" style={{ color: "var(--ac-primary)" }}>{lvl.subtitle}</p>
                    <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>
                      {lvl.description}
                    </p>
                    <ul className="mt-5 space-y-2 border-t pt-5" style={{ borderColor: "var(--ac-border)" }}>
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

      {/* ── Method ───────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <span className="ac-eyebrow">Die Methode</span>
            <h2 className="ac-h2 mt-3 max-w-2xl">
              Andere zeigen dir einen Prompt. Wir zeigen das ganze Bild.
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-x-12 sm:mt-14 sm:grid-cols-2">
            {method.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.04}>
                <div className="flex gap-5 border-t py-6" style={{ borderColor: "var(--ac-border)" }}>
                  <span className="w-8 flex-shrink-0 pt-0.5 font-mono text-sm" style={{ color: "var(--ac-primary)" }}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="font-semibold">{title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>{desc}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-8 max-w-2xl text-sm leading-relaxed" style={{ color: "var(--ac-ink-3)" }}>
              Jede Lektion in dieser Struktur – 5 bis 17 Minuten, eine Fähigkeit, ein Artefakt zum
              Mitnehmen. Kein Füllmaterial.
            </p>
          </Reveal>
        </div>
      </section>

      {/* ── Features ─────────────────────────────────────────── */}
      <section className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <span className="ac-eyebrow">Mehr als Videos</span>
            <h2 className="ac-h2 mt-3 max-w-2xl">Ein System zum Lernen und Anwenden.</h2>
          </Reveal>
          <div className="mt-10 grid gap-4 sm:mt-14 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(([title, desc], i) => (
              <Reveal key={title} delay={i * 0.04}>
                <div className="ac-card ac-card-hover h-full p-6" style={{ borderLeft: "3px solid var(--ac-primary)" }}>
                  <h3 className="font-semibold" style={{ fontFamily: "var(--font-syne)" }}>{title}</h3>
                  <p className="mt-2.5 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Audiences marquee ────────────────────────────────── */}
      <div className="ac-marquee border-t py-4" style={{ borderColor: "var(--ac-border)" }} aria-hidden>
        {[0, 1].map((copy) => (
          <div key={copy} className="ac-marquee-track" style={{ animationDirection: "reverse", animationDuration: "36s" }}>
            {audiences.map((a) => (
              <span key={`${copy}-${a}`} className="mx-2.5 whitespace-nowrap">
                <span className="ac-pill">{a}</span>
              </span>
            ))}
          </div>
        ))}
      </div>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section id="community" className="border-t" style={{ borderColor: "var(--ac-border)" }}>
        <div className="mx-auto max-w-7xl px-5 py-16 sm:px-8 sm:py-24">
          <Reveal>
            <div
              className="relative overflow-hidden rounded-3xl p-8 sm:p-16"
              style={{ background: "var(--ac-btn-ink)", color: "var(--ac-btn-ink-text)" }}
            >
              <div className="ac-dot-bg absolute inset-0 opacity-10" />
              <div className="relative z-10 max-w-2xl">
                <h2 className="ac-h2">Fang mit der ersten Lektion an. Heute.</h2>
                <p className="mt-4 text-base opacity-80 sm:text-lg">
                  Level 1 ist komplett kostenlos – inklusive Quiz. Wenn dir die erste Lektion keine
                  Zeit spart, ist die Academy nichts für dich. Fair?
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/academy/lessons/was-ist-ki" className="ac-btn" style={{ background: "var(--ac-primary)", color: "#fff" }}>
                    Erste Lektion starten <ArrowRight width={16} height={16} />
                  </Link>
                  <Link
                    href="/academy/community"
                    className="ac-btn"
                    style={{ border: "1px solid currentColor", color: "inherit", background: "transparent" }}
                  >
                    Community ansehen
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
    <div className="ac-card w-full p-5 sm:p-6" style={{ boxShadow: "var(--ac-shadow)" }}>
      <div className="flex items-center justify-between gap-3">
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
          [Book, "5/12", "Lektionen"],
        ].map(([Icon, n, l], i) => {
          const I = Icon as typeof Bolt
          return (
            <div key={i} className="rounded-xl p-3 sm:p-4" style={{ background: "var(--ac-surface-2)" }}>
              <I width={16} height={16} style={{ color: "var(--ac-primary)" }} />
              <p className="mt-2.5 text-lg font-bold sm:text-xl" style={{ fontFamily: "var(--font-syne)" }}>{n as string}</p>
              <p className="text-[11px]" style={{ color: "var(--ac-ink-3)" }}>{l as string}</p>
            </div>
          )
        })}
      </div>

      <div className="mt-5 space-y-4">
        {[
          ["AI Basics", 0.82],
          ["AI Productivity", 0.34],
          ["AI Workflows & Agenten", 0.08],
        ].map(([label, val]) => (
          <div key={label as string}>
            <div className="mb-1.5 flex justify-between gap-2 text-sm">
              <span className="truncate">{label as string}</span>
              <span style={{ color: "var(--ac-ink-3)" }}>{Math.round((val as number) * 100)}%</span>
            </div>
            <ProgressBar value={val as number} />
          </div>
        ))}
      </div>

      <div
        className="mt-6 flex items-center gap-3 rounded-xl p-4"
        style={{ background: "var(--ac-primary-soft)" }}
      >
        <span className="grid h-9 w-9 flex-shrink-0 place-items-center rounded-full" style={{ background: "var(--ac-primary)", color: "#fff" }}>
          <Sparkles width={16} height={16} />
        </span>
        <div className="min-w-0 text-sm">
          <p className="truncate font-medium">Weiter geht’s: Gute Fragen stellen</p>
          <p style={{ color: "var(--ac-ink-3)" }}>Level 1 · 16 Min · +70 XP</p>
        </div>
      </div>
    </div>
  )
}
