import Reveal from "@/components/academy/ui/Reveal"
import PlanButton from "@/components/academy/PlanButton"
import { Check, Sparkles } from "@/components/academy/ui/Icons"
import { getPricing } from "@/lib/academy/data"

export const metadata = {
  title: "Preise & Abos — AI Academy",
  description: "Vom kostenlosen Einstieg bis zum Elite-Zugang mit Coaching. Monatlich kündbar.",
}

const faqs: [string, string][] = [
  ["Kann ich monatlich kündigen?", "Ja. Alle Abos sind monatlich kündbar – kein Risiko, keine Mindestlaufzeit."],
  ["Für wen ist die Academy?", "Von kompletten Anfängern bis zu Profis, die Automatisierung und eigene Agenten bauen wollen."],
  ["Bekomme ich ein Zertifikat?", "Ab Pro: Nach Quiz und Abschlussprojekt erhältst du pro Level ein verifizierbares Zertifikat."],
  ["Gibt es Team-/Firmenpreise?", "Ja, im Elite-Plan inklusive Unternehmensvorlagen. Für größere Teams gibt es individuelle Angebote."],
]

export default function PricingPage() {
  const tiers = getPricing()

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Reveal>
        <div className="text-center">
          <span className="ac-eyebrow">Preise</span>
          <h1 className="ac-h2 mt-3">Kein Kurs. Ein Ökosystem.</h1>
          <p className="mx-auto mt-4 max-w-xl text-lg" style={{ color: "var(--ac-ink-2)" }}>
            Starte kostenlos und wachse mit. Monatlich kündbar – Preise in CHF.
          </p>
        </div>
      </Reveal>

      <div className="mt-14 grid gap-5 lg:grid-cols-4">
        {tiers.map((t, i) => (
          <Reveal key={t.plan} delay={i * 0.05}>
            <div
              className="ac-card relative flex h-full flex-col p-6"
              style={t.highlighted ? { borderColor: "var(--ac-primary)", boxShadow: "var(--ac-shadow)" } : undefined}
            >
              {t.highlighted && (
                <span
                  className="absolute -top-3 left-6 inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium text-white"
                  style={{ background: "linear-gradient(100deg, var(--ac-primary-2), var(--ac-primary))" }}
                >
                  <Sparkles width={12} height={12} /> Beliebt
                </span>
              )}
              <h3 className="text-lg font-bold" style={{ fontFamily: "var(--font-syne)" }}>{t.name}</h3>
              <p className="mt-1 text-sm" style={{ color: "var(--ac-ink-3)" }}>{t.tagline}</p>
              <div className="mt-5 flex items-baseline gap-1">
                <span className="text-3xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>{t.price}</span>
                <span className="text-sm" style={{ color: "var(--ac-ink-3)" }}>{t.cadence}</span>
              </div>

              <PlanButton plan={t.plan} cta={t.cta} highlighted={t.highlighted} />

              <ul className="mt-6 space-y-2.5">
                {t.features.map((f) => (
                  <li key={f} className="flex gap-2.5 text-sm" style={{ color: "var(--ac-ink-2)" }}>
                    <Check width={16} height={16} style={{ color: "var(--ac-primary)", flexShrink: 0, marginTop: 2 }} /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>

      {/* FAQ */}
      <div className="mx-auto mt-20 max-w-3xl">
        <Reveal>
          <h2 className="ac-h3 text-center" style={{ fontWeight: 700 }}>Häufige Fragen</h2>
        </Reveal>
        <div className="mt-8 space-y-3">
          {faqs.map(([q, a], i) => (
            <Reveal key={q} delay={i * 0.04}>
              <details className="ac-card group p-5">
                <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                  {q}
                  <span className="text-xl transition-transform group-open:rotate-45" style={{ color: "var(--ac-primary)" }}>+</span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>{a}</p>
              </details>
            </Reveal>
          ))}
        </div>
      </div>
    </div>
  )
}
