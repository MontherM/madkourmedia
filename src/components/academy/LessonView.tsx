"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import CopyButton from "./CopyButton"
import { Play, Check, Download, ArrowRight, Star, Lock } from "./ui/Icons"
import type { Lesson } from "@/lib/academy/types"

interface Neighbour {
  slug: string
  title: string
}

interface Props {
  lesson: Lesson
  levelTitle: string
  chapterTitle: string
  prev?: Neighbour
  next?: Neighbour
  initiallyCompleted: boolean
  initiallyBookmarked: boolean
}

const tabs = ["Notizen", "Kapitel", "Prompts", "Ressourcen"] as const
type Tab = (typeof tabs)[number]

const fmt = (s: number) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`

const resourceLabel: Record<string, string> = {
  pdf: "PDF",
  cheatsheet: "Cheatsheet",
  template: "Vorlage",
  checklist: "Checkliste",
  workflow: "Workflow",
  mindmap: "Mindmap",
}

export default function LessonView({
  lesson,
  levelTitle,
  chapterTitle,
  prev,
  next,
  initiallyCompleted,
  initiallyBookmarked,
}: Props) {
  const [tab, setTab] = useState<Tab>("Notizen")
  const [completed, setCompleted] = useState(initiallyCompleted)
  const [bookmarked, setBookmarked] = useState(initiallyBookmarked)
  const [playing, setPlaying] = useState(false)
  const [notes, setNotes] = useState("")
  const [activeMark, setActiveMark] = useState(0)

  // Persist notes + state locally (stands in for the backend).
  useEffect(() => {
    try {
      setNotes(localStorage.getItem(`ac-notes-${lesson.slug}`) ?? "")
      setCompleted(localStorage.getItem(`ac-done-${lesson.slug}`) === "1" || initiallyCompleted)
    } catch {
      /* ignore */
    }
  }, [lesson.slug, initiallyCompleted])

  const onNotes = (v: string) => {
    setNotes(v)
    try {
      localStorage.setItem(`ac-notes-${lesson.slug}`, v)
    } catch {
      /* ignore */
    }
  }

  const toggleComplete = () => {
    setCompleted((c) => {
      const next = !c
      try {
        localStorage.setItem(`ac-done-${lesson.slug}`, next ? "1" : "0")
      } catch {
        /* ignore */
      }
      return next
    })
  }

  return (
    <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8">
      {/* Breadcrumb */}
      <div className="flex flex-wrap items-center gap-2 text-xs" style={{ color: "var(--ac-ink-3)" }}>
        <Link href="/academy/curriculum" className="hover:underline">{levelTitle}</Link>
        <span>/</span>
        <span>{chapterTitle}</span>
      </div>

      <div className="mt-5 grid gap-8 lg:grid-cols-[1.7fr_1fr]">
        {/* Main column */}
        <div>
          {/* Player */}
          <div
            className="relative flex aspect-video w-full items-center justify-center overflow-hidden rounded-2xl"
            style={{ background: "linear-gradient(135deg, #0f0f17, #1c1530)", border: "1px solid var(--ac-border)" }}
          >
            <div className="ac-grid-bg absolute inset-0 opacity-30" />
            <button
              onClick={() => setPlaying((p) => !p)}
              className="relative grid h-16 w-16 place-items-center rounded-full text-white transition-transform hover:scale-105"
              style={{ background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))", boxShadow: "0 10px 40px rgba(99,102,241,0.5)" }}
              aria-label={playing ? "Pause" : "Abspielen"}
            >
              {playing ? <span className="text-2xl leading-none">❚❚</span> : <Play width={26} height={26} />}
            </button>
            <span className="absolute bottom-4 right-4 rounded-md px-2 py-1 text-xs text-white/80" style={{ background: "rgba(0,0,0,0.5)" }}>
              {lesson.duration}:00
            </span>
          </div>

          <h1 className="ac-h2 mt-6" style={{ fontSize: "clamp(24px,3vw,36px)" }}>{lesson.title}</h1>
          <p className="mt-2 text-lg" style={{ color: "var(--ac-ink-2)" }}>{lesson.summary}</p>

          {/* Tabs */}
          <div className="mt-8 flex gap-1 border-b" style={{ borderColor: "var(--ac-border)" }}>
            {tabs.map((t) => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative px-4 py-2.5 text-sm transition-colors"
                style={{ color: tab === t ? "var(--ac-ink)" : "var(--ac-ink-3)" }}
              >
                {t}
                {tab === t && <span className="absolute inset-x-2 -bottom-px h-0.5 rounded-full" style={{ background: "var(--ac-primary)" }} />}
              </button>
            ))}
          </div>

          <div className="py-6">
            {tab === "Notizen" && (
              <textarea
                value={notes}
                onChange={(e) => onNotes(e.target.value)}
                placeholder="Schreibe deine Notizen zu dieser Lektion… (wird lokal gespeichert)"
                className="ac-input min-h-[180px] resize-y leading-relaxed"
              />
            )}

            {tab === "Kapitel" && (
              <ul className="space-y-1">
                {lesson.marks.map((m, i) => (
                  <li key={i}>
                    <button
                      onClick={() => { setActiveMark(i); setPlaying(true) }}
                      className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition-colors hover:bg-[var(--ac-surface-2)]"
                      style={{ background: activeMark === i ? "var(--ac-surface-2)" : "transparent" }}
                    >
                      <span className="font-mono text-xs" style={{ color: "var(--ac-primary)" }}>{fmt(m.at)}</span>
                      <span>{m.label}</span>
                    </button>
                  </li>
                ))}
              </ul>
            )}

            {tab === "Prompts" && (
              <div className="space-y-4">
                {lesson.prompts.length === 0 && (
                  <p className="text-sm" style={{ color: "var(--ac-ink-3)" }}>Für diese Lektion gibt es keine Prompts.</p>
                )}
                {lesson.prompts.map((p) => (
                  <div key={p.id} className="ac-card p-5">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <h4 className="font-semibold">{p.title}</h4>
                        {p.recommendedModel && (
                          <span className="mt-1 inline-block text-xs" style={{ color: "var(--ac-primary)" }}>{p.recommendedModel}</span>
                        )}
                      </div>
                      <CopyButton text={p.body} />
                    </div>
                    <pre
                      className="mt-3 overflow-x-auto whitespace-pre-wrap rounded-xl p-4 text-[13px] leading-relaxed"
                      style={{ background: "var(--ac-surface-2)", color: "var(--ac-ink-2)", fontFamily: "var(--font-dm-sans)" }}
                    >
                      {p.body}
                    </pre>
                  </div>
                ))}
              </div>
            )}

            {tab === "Ressourcen" && (
              <ul className="space-y-2">
                {lesson.resources.length === 0 && (
                  <p className="text-sm" style={{ color: "var(--ac-ink-3)" }}>Keine Downloads für diese Lektion.</p>
                )}
                {lesson.resources.map((res) => (
                  <li
                    key={res.id}
                    className="flex items-center justify-between rounded-xl p-4"
                    style={{ background: "var(--ac-surface-2)" }}
                  >
                    <div className="flex items-center gap-3">
                      <span className="grid h-9 w-9 place-items-center rounded-lg" style={{ background: "var(--ac-primary-soft)", color: "var(--ac-primary)" }}>
                        <Download width={16} height={16} />
                      </span>
                      <div>
                        <p className="text-sm font-medium">{res.title}</p>
                        <p className="text-xs" style={{ color: "var(--ac-ink-3)" }}>
                          {resourceLabel[res.type]} {res.size ? `· ${res.size}` : ""}
                        </p>
                      </div>
                    </div>
                    <button className="ac-btn ac-btn-ghost !py-1.5 !px-3 !text-xs">Download</button>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Prev / next */}
          <div className="mt-4 flex items-center justify-between gap-4 border-t pt-6" style={{ borderColor: "var(--ac-border)" }}>
            {prev ? (
              <Link href={`/academy/lessons/${prev.slug}`} className="ac-btn ac-btn-ghost">← Vorherige</Link>
            ) : <span />}
            {next ? (
              <Link href={`/academy/lessons/${next.slug}`} className="ac-btn ac-btn-primary">Nächste Lektion <ArrowRight width={16} height={16} /></Link>
            ) : <span />}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-4 lg:sticky lg:top-20 lg:self-start">
          <div className="ac-card p-5">
            <div className="flex flex-wrap items-center gap-2">
              <span className="ac-pill">{lesson.duration} Min</span>
              <span className="ac-pill" style={{ color: "var(--ac-primary)" }}>+{lesson.xp} XP</span>
              {lesson.access !== "free" && (
                <span className="ac-pill"><Lock width={12} height={12} /> {lesson.access}</span>
              )}
            </div>

            <button
              onClick={toggleComplete}
              className={`ac-btn mt-4 w-full ${completed ? "ac-btn-ghost" : "ac-btn-primary"}`}
            >
              {completed ? <><Check width={16} height={16} /> Abgeschlossen</> : "Als erledigt markieren"}
            </button>

            <button
              onClick={() => setBookmarked((b) => !b)}
              className="ac-btn ac-btn-ghost mt-2 w-full"
              style={{ color: bookmarked ? "var(--ac-primary)" : undefined }}
            >
              <Star width={16} height={16} /> {bookmarked ? "Gemerkt" : "Merken"}
            </button>
          </div>

          {lesson.hasQuiz && (
            <div className="ac-card p-5">
              <h4 className="ac-h3">Quiz</h4>
              <p className="mt-2 text-sm" style={{ color: "var(--ac-ink-2)" }}>
                Teste dein Wissen und sichere dir Bonus-XP, bevor du weitergehst.
              </p>
              <button className="ac-btn ac-btn-ghost mt-4 w-full">Quiz starten</button>
            </div>
          )}

          <div className="ac-card p-5">
            <h4 className="ac-h3">Lektionsstruktur</h4>
            <ol className="mt-3 space-y-2 text-sm" style={{ color: "var(--ac-ink-2)" }}>
              {["Warum wichtig", "Problem", "Lösung", "Live-Demo", "Praxisbeispiel", "Aufgabe", "Zusammenfassung"].map((s, i) => (
                <li key={s} className="flex gap-2.5">
                  <span style={{ color: "var(--ac-ink-3)" }}>{i + 1}.</span>{s}
                </li>
              ))}
            </ol>
          </div>
        </aside>
      </div>
    </div>
  )
}
