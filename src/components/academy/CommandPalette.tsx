"use client"

// Global ⌘K search across lessons, prompts, tools and pages. Mounted once in
// the academy nav so it is available everywhere.

import { useCallback, useEffect, useMemo, useRef, useState } from "react"
import { useRouter } from "next/navigation"
import { Search, Play, Copy, Sparkles, ArrowRight, Check } from "./ui/Icons"
import { getAllLessons, getPrompts, getTools, getLevel } from "@/lib/academy/data"
import { useAcademy } from "@/lib/academy/store"

interface Item {
  key: string
  group: "Lektionen" | "Prompts" | "AI-Tools" | "Seiten"
  title: string
  hint: string
  href: string
  haystack: string
}

const pages: { title: string; href: string; hint: string }[] = [
  { title: "Dashboard", href: "/academy/dashboard", hint: "Fortschritt, XP & Badges" },
  { title: "Lehrplan", href: "/academy/curriculum", hint: "Alle Level & Lektionen" },
  { title: "Prompt-Bibliothek", href: "/academy/prompts", hint: "Kopierfertige Prompts" },
  { title: "AI-Tools", href: "/academy/tools", hint: "Tool-Vergleich & Empfehlungen" },
  { title: "Community", href: "/academy/community", hint: "Fragen & Austausch" },
  { title: "Zertifikate", href: "/academy/certificates", hint: "Deine Abschlüsse" },
  { title: "Preise", href: "/academy/pricing", hint: "Free bis Elite" },
]

function buildIndex(): Item[] {
  const lessons: Item[] = getAllLessons().map((l) => ({
    key: `lesson-${l.id}`,
    group: "Lektionen",
    title: l.title,
    hint: `${getLevel(l.levelId)?.title ?? ""} · ${l.duration} Min`,
    href: `/academy/lessons/${l.slug}`,
    haystack: `${l.title} ${l.summary} ${getLevel(l.levelId)?.title ?? ""}`.toLowerCase(),
  }))
  const prompts: Item[] = getPrompts().map((p) => ({
    key: `prompt-${p.id}`,
    group: "Prompts",
    title: p.title,
    hint: `${p.category} · ${p.tags.join(", ")}`,
    href: "/academy/prompts",
    haystack: `${p.title} ${p.category} ${p.tags.join(" ")} ${p.body}`.toLowerCase(),
  }))
  const tools: Item[] = getTools().map((t) => ({
    key: `tool-${t.id}`,
    group: "AI-Tools",
    title: t.name,
    hint: `${t.category} · ${t.tagline}`,
    href: "/academy/tools",
    haystack: `${t.name} ${t.category} ${t.tagline} ${t.useCases.join(" ")}`.toLowerCase(),
  }))
  const pageItems: Item[] = pages.map((p) => ({
    key: `page-${p.href}`,
    group: "Seiten",
    title: p.title,
    hint: p.hint,
    href: p.href,
    haystack: `${p.title} ${p.hint}`.toLowerCase(),
  }))
  return [...lessons, ...prompts, ...tools, ...pageItems]
}

const groupIcon = {
  Lektionen: Play,
  Prompts: Copy,
  "AI-Tools": Sparkles,
  Seiten: ArrowRight,
} as const

const PER_GROUP = 5

export default function CommandPalette() {
  const router = useRouter()
  const { user } = useAcademy()
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [active, setActive] = useState(0)
  const inputRef = useRef<HTMLInputElement>(null)
  const index = useMemo(buildIndex, [])

  const results = useMemo(() => {
    const q = query.trim().toLowerCase()
    const pool = q
      ? index.filter((i) => q.split(/\s+/).every((word) => i.haystack.includes(word)))
      : index
    const grouped: Item[] = []
    for (const group of ["Seiten", "Lektionen", "Prompts", "AI-Tools"] as const) {
      grouped.push(...pool.filter((i) => i.group === group).slice(0, PER_GROUP))
    }
    return grouped
  }, [index, query])

  const close = useCallback(() => {
    setOpen(false)
    setQuery("")
    setActive(0)
  }, [])

  // Global shortcut.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault()
        setOpen((o) => !o)
      }
      if (e.key === "Escape") close()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [close])

  useEffect(() => {
    if (open) {
      inputRef.current?.focus()
      document.body.style.overflow = "hidden"
      return () => {
        document.body.style.overflow = ""
      }
    }
  }, [open])

  useEffect(() => setActive(0), [query])

  const go = (item: Item) => {
    close()
    router.push(item.href)
  }

  const onInputKey = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault()
      setActive((a) => Math.min(a + 1, results.length - 1))
    } else if (e.key === "ArrowUp") {
      e.preventDefault()
      setActive((a) => Math.max(a - 1, 0))
    } else if (e.key === "Enter" && results[active]) {
      e.preventDefault()
      go(results[active])
    }
  }

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="hidden h-9 items-center gap-2 rounded-full px-3.5 text-[13px] sm:inline-flex"
        style={{ border: "1px solid var(--ac-border)", color: "var(--ac-ink-3)", background: "var(--ac-surface)" }}
        aria-label="Suche öffnen"
      >
        <Search width={14} height={14} />
        <span className="hidden lg:inline">Suchen…</span>
        <kbd
          className="hidden rounded-md px-1.5 py-0.5 text-[10px] font-medium lg:inline"
          style={{ background: "var(--ac-surface-2)", border: "1px solid var(--ac-border)" }}
        >
          ⌘K
        </kbd>
      </button>
      <button
        onClick={() => setOpen(true)}
        className="grid h-9 w-9 place-items-center rounded-full sm:hidden"
        style={{ border: "1px solid var(--ac-border)", color: "var(--ac-ink-2)" }}
        aria-label="Suche öffnen"
      >
        <Search width={15} height={15} />
      </button>

      {open && (
        <div
          className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
          style={{ background: "rgba(5,5,10,0.6)", backdropFilter: "blur(6px)" }}
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) close()
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Globale Suche"
        >
          <div
            className="w-full max-w-xl overflow-hidden rounded-2xl"
            style={{ background: "var(--ac-surface)", border: "1px solid var(--ac-border-strong)", boxShadow: "var(--ac-shadow)" }}
          >
            <div className="flex items-center gap-3 px-4" style={{ borderBottom: "1px solid var(--ac-border)" }}>
              <Search width={16} height={16} style={{ color: "var(--ac-ink-3)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={onInputKey}
                placeholder="Lektionen, Prompts, Tools durchsuchen…"
                className="w-full bg-transparent py-4 text-sm outline-none"
                style={{ color: "var(--ac-ink)" }}
                aria-label="Suchbegriff"
              />
              <kbd
                className="rounded-md px-1.5 py-0.5 text-[10px]"
                style={{ background: "var(--ac-surface-2)", border: "1px solid var(--ac-border)", color: "var(--ac-ink-3)" }}
              >
                ESC
              </kbd>
            </div>

            <div className="max-h-[52vh] overflow-y-auto p-2">
              {results.length === 0 && (
                <p className="px-3 py-8 text-center text-sm" style={{ color: "var(--ac-ink-3)" }}>
                  Nichts gefunden für „{query}“.
                </p>
              )}
              {results.map((item, i) => {
                const Icon = groupIcon[item.group]
                const showHeader = i === 0 || results[i - 1].group !== item.group
                const isLessonDone =
                  item.group === "Lektionen" && user.completedLessons.includes(item.key.replace("lesson-", ""))
                return (
                  <div key={item.key}>
                    {showHeader && (
                      <p className="px-3 pb-1 pt-3 text-[10px] font-medium uppercase tracking-[0.16em]" style={{ color: "var(--ac-ink-3)" }}>
                        {item.group}
                      </p>
                    )}
                    <button
                      onClick={() => go(item)}
                      onMouseEnter={() => setActive(i)}
                      className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left"
                      style={{ background: i === active ? "var(--ac-primary-soft)" : "transparent" }}
                    >
                      <span
                        className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-lg"
                        style={{
                          background: i === active ? "var(--ac-primary)" : "var(--ac-surface-2)",
                          color: i === active ? "#fff" : "var(--ac-ink-3)",
                        }}
                      >
                        {isLessonDone ? <Check width={14} height={14} /> : <Icon width={14} height={14} />}
                      </span>
                      <span className="min-w-0 flex-1">
                        <span className="block truncate text-sm font-medium">{item.title}</span>
                        <span className="block truncate text-xs" style={{ color: "var(--ac-ink-3)" }}>{item.hint}</span>
                      </span>
                      {i === active && <ArrowRight width={14} height={14} style={{ color: "var(--ac-primary)", flexShrink: 0 }} />}
                    </button>
                  </div>
                )
              })}
            </div>

            <div
              className="flex items-center gap-4 px-4 py-2.5 text-[11px]"
              style={{ borderTop: "1px solid var(--ac-border)", color: "var(--ac-ink-3)" }}
            >
              <span>↑↓ Navigieren</span>
              <span>↵ Öffnen</span>
              <span>esc Schließen</span>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
