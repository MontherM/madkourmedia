import Reveal from "@/components/academy/ui/Reveal"
import { Check, ArrowRight } from "@/components/academy/ui/Icons"
import { getTools } from "@/lib/academy/data"

export const metadata = {
  title: "AI-Tool-Bibliothek — AI Academy",
  description: "Die wichtigsten KI-Tools im Überblick: Beschreibung, Preis, Vor- und Nachteile, Anwendungsfälle.",
}

export default function ToolsPage() {
  const tools = getTools()

  return (
    <div className="mx-auto max-w-6xl px-5 py-16 sm:px-8">
      <Reveal>
        <span className="ac-eyebrow">AI-Tool-Bibliothek</span>
        <h1 className="ac-h2 mt-3">Die richtige KI für jeden Job.</h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--ac-ink-2)" }}>
          Jedes Tool ehrlich eingeordnet: Wofür es taugt, was es kostet, wo seine Grenzen liegen –
          damit du nicht zehn Abos brauchst.
        </p>
      </Reveal>

      <div className="mt-12 grid gap-5 md:grid-cols-2">
        {tools.map((tool, i) => (
          <Reveal key={tool.id} delay={(i % 2) * 0.05}>
            <div className="ac-card ac-card-hover flex h-full flex-col p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>{tool.name}</h3>
                  <p className="mt-0.5 text-sm" style={{ color: "var(--ac-primary)" }}>{tool.tagline}</p>
                </div>
                <span className="ac-pill">{tool.category}</span>
              </div>

              <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>{tool.description}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ac-ink-3)" }}>Stärken</p>
                  <ul className="mt-2 space-y-1.5">
                    {tool.pros.map((p) => (
                      <li key={p} className="flex gap-2 text-sm" style={{ color: "var(--ac-ink-2)" }}>
                        <Check width={15} height={15} style={{ color: "var(--ac-primary)", flexShrink: 0, marginTop: 2 }} /> {p}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ac-ink-3)" }}>Grenzen</p>
                  <ul className="mt-2 space-y-1.5">
                    {tool.cons.map((c) => (
                      <li key={c} className="flex gap-2 text-sm" style={{ color: "var(--ac-ink-3)" }}>
                        <span className="mt-0.5 flex-shrink-0">–</span> {c}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {tool.useCases.map((u) => (
                  <span key={u} className="ac-pill !py-0.5 !px-2.5 !text-[11px]">{u}</span>
                ))}
              </div>

              <div className="mt-auto flex items-center justify-between border-t pt-5" style={{ borderColor: "var(--ac-border)" }}>
                <span className="text-sm font-medium">{tool.pricing}</span>
                <a
                  href={tool.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
                  style={{ color: "var(--ac-primary)" }}
                >
                  Besuchen <ArrowRight width={15} height={15} />
                </a>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  )
}
