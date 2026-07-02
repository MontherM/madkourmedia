"use client"

import { useMemo, useState } from "react"
import CopyButton from "./CopyButton"
import { Search, Star } from "./ui/Icons"
import type { Prompt } from "@/lib/academy/types"

export default function PromptLibrary({ prompts }: { prompts: Prompt[] }) {
  const [query, setQuery] = useState("")
  const [cat, setCat] = useState("Alle")

  const categories = useMemo(
    () => ["Alle", ...Array.from(new Set(prompts.map((p) => p.category)))],
    [prompts],
  )

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase()
    return prompts.filter((p) => {
      const matchesCat = cat === "Alle" || p.category === cat
      const matchesQuery =
        !q ||
        p.title.toLowerCase().includes(q) ||
        p.body.toLowerCase().includes(q) ||
        p.tags.some((t) => t.toLowerCase().includes(q))
      return matchesCat && matchesQuery
    })
  }, [prompts, query, cat])

  return (
    <>
      <div className="mt-8 flex flex-col gap-4">
        <div className="relative max-w-md">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2" style={{ color: "var(--ac-ink-3)" }}>
            <Search width={17} height={17} />
          </span>
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Prompts durchsuchen…"
            className="ac-input !pl-11"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {categories.map((c) => {
            const active = c === cat
            return (
              <button
                key={c}
                onClick={() => setCat(c)}
                className="rounded-full px-4 py-1.5 text-sm transition-colors"
                style={{
                  background: active ? "var(--ac-primary)" : "var(--ac-surface)",
                  color: active ? "#fff" : "var(--ac-ink-2)",
                  border: `1px solid ${active ? "transparent" : "var(--ac-border)"}`,
                }}
              >
                {c}
              </button>
            )
          })}
        </div>
      </div>

      <p className="mt-6 text-sm" style={{ color: "var(--ac-ink-3)" }}>
        {filtered.length} {filtered.length === 1 ? "Prompt" : "Prompts"}
      </p>

      <div className="mt-4 grid gap-4 md:grid-cols-2">
        {filtered.map((p) => (
          <div key={p.id} className="ac-card ac-card-hover flex flex-col p-5">
            <div className="flex items-start justify-between gap-3">
              <h3 className="font-semibold leading-snug">{p.title}</h3>
              <span className="inline-flex flex-shrink-0 items-center gap-1 text-xs" style={{ color: "var(--ac-ink-3)" }}>
                <Star width={13} height={13} style={{ color: "var(--ac-primary)" }} /> {p.rating.toFixed(1)}
              </span>
            </div>
            <pre
              className="mt-3 max-h-32 overflow-hidden whitespace-pre-wrap rounded-xl p-3.5 text-[13px] leading-relaxed"
              style={{ background: "var(--ac-surface-2)", color: "var(--ac-ink-2)", fontFamily: "var(--font-dm-sans)" }}
            >
              {p.body}
            </pre>
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {p.tags.map((t) => (
                <span key={t} className="ac-pill !py-0.5 !px-2.5 !text-[11px]">{t}</span>
              ))}
            </div>
            <div className="mt-4 flex items-center justify-between border-t pt-4" style={{ borderColor: "var(--ac-border)" }}>
              <span className="text-xs" style={{ color: "var(--ac-ink-3)" }}>{p.recommendedModel ?? p.category}</span>
              <CopyButton text={p.body} />
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className="ac-card mt-4 p-12 text-center text-sm" style={{ color: "var(--ac-ink-3)" }}>
          Keine Prompts gefunden. Andere Suche oder Kategorie versuchen.
        </div>
      )}
    </>
  )
}
