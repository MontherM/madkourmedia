"use client"

// Admin / CMS preview. Read-only view over the content layer today; the same
// screens get write access once Supabase + RBAC are wired (roadmap phase 10).

import { useState } from "react"
import Reveal from "@/components/academy/ui/Reveal"
import { Book, Copy, Sparkles, Trophy, Users, Settings } from "@/components/academy/ui/Icons"
import {
  getAllLessons,
  getLevels,
  getLevel,
  getPrompts,
  getTools,
  getQuizzes,
  getForumThreads,
} from "@/lib/academy/data"
import { useAcademy, resetProgress } from "@/lib/academy/store"

const tabs = ["Lektionen", "Prompts", "AI-Tools", "Quizze"] as const
type Tab = (typeof tabs)[number]

const th = "px-4 py-3 text-left text-[11px] font-medium uppercase tracking-[0.14em]"
const td = "px-4 py-3 text-sm"

function Table({ head, children }: { head: string[]; children: React.ReactNode }) {
  return (
    <div className="ac-card overflow-x-auto">
      <table className="w-full min-w-[560px] border-collapse">
        <thead>
          <tr style={{ borderBottom: "1px solid var(--ac-border)", color: "var(--ac-ink-3)" }}>
            {head.map((h) => (
              <th key={h} className={th}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>{children}</tbody>
      </table>
    </div>
  )
}

export default function AdminClient() {
  const { user } = useAcademy()
  const [tab, setTab] = useState<Tab>("Lektionen")
  const [confirmReset, setConfirmReset] = useState(false)

  const lessons = getAllLessons()
  const prompts = getPrompts()
  const tools = getTools()
  const quizzes = getQuizzes()
  const threads = getForumThreads()
  const totalMinutes = lessons.reduce((s, l) => s + l.duration, 0)
  const totalQuestions = quizzes.reduce((s, q) => s + q.questions.length, 0)

  const kpis = [
    { icon: Book, value: lessons.length, label: `Lektionen · ${totalMinutes} Min Inhalt` },
    { icon: Trophy, value: totalQuestions, label: `Quiz-Fragen in ${quizzes.length} Quizzen` },
    { icon: Copy, value: prompts.length, label: "Prompts in der Bibliothek" },
    { icon: Sparkles, value: tools.length, label: "AI-Tools kuratiert" },
    { icon: Users, value: threads.length, label: "Community-Threads" },
    { icon: Settings, value: getLevels().length, label: "Level im Lehrplan" },
  ]

  const rowBorder = { borderTop: "1px solid var(--ac-border)" }

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Reveal>
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="ac-h2">Admin</h1>
          <span className="ac-pill" style={{ color: "var(--ac-primary)" }}>CMS-Vorschau</span>
        </div>
        <p className="mt-3 max-w-2xl text-sm" style={{ color: "var(--ac-ink-2)" }}>
          Übersicht über alle Inhalte der Academy. Bearbeiten &amp; Anlegen wird mit dem
          Supabase-CMS (Roadmap-Phase 10) freigeschaltet – die Datenstruktur ist bereits final.
        </p>
      </Reveal>

      {/* KPIs */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {kpis.map(({ icon: Icon, value, label }, i) => (
          <Reveal key={label} delay={i * 0.04}>
            <div className="ac-card flex items-center gap-4 p-5">
              <span className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl" style={{ background: "var(--ac-primary-soft)", color: "var(--ac-primary)" }}>
                <Icon width={18} height={18} />
              </span>
              <div>
                <p className="text-xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>{value}</p>
                <p className="text-xs" style={{ color: "var(--ac-ink-3)" }}>{label}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {/* Content tables */}
      <Reveal>
        <div className="mt-10 flex gap-1 border-b" style={{ borderColor: "var(--ac-border)" }}>
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
      </Reveal>

      <div className="mt-6">
        {tab === "Lektionen" && (
          <Table head={["Titel", "Level", "Zugang", "Dauer", "XP", "Quiz"]}>
            {lessons.map((l) => (
              <tr key={l.id} style={rowBorder}>
                <td className={`${td} font-medium`}>{l.title}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{getLevel(l.levelId)?.title}</td>
                <td className={td}><span className="ac-pill !py-0.5 !px-2 !text-[11px]">{l.access}</span></td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{l.duration} Min</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>+{l.xp}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{l.hasQuiz ? "✓" : "—"}</td>
              </tr>
            ))}
          </Table>
        )}

        {tab === "Prompts" && (
          <Table head={["Titel", "Kategorie", "Tags", "Rating", "Modell"]}>
            {prompts.map((p) => (
              <tr key={p.id} style={rowBorder}>
                <td className={`${td} font-medium`}>{p.title}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{p.category}</td>
                <td className={td} style={{ color: "var(--ac-ink-3)" }}>{p.tags.join(", ")}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>★ {p.rating.toFixed(1)}</td>
                <td className={td} style={{ color: "var(--ac-ink-3)" }}>{p.recommendedModel ?? "—"}</td>
              </tr>
            ))}
          </Table>
        )}

        {tab === "AI-Tools" && (
          <Table head={["Tool", "Kategorie", "Pricing", "Use-Cases"]}>
            {tools.map((t) => (
              <tr key={t.id} style={rowBorder}>
                <td className={`${td} font-medium`}>{t.name}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{t.category}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{t.pricing}</td>
                <td className={td} style={{ color: "var(--ac-ink-3)" }}>{t.useCases.join(", ")}</td>
              </tr>
            ))}
          </Table>
        )}

        {tab === "Quizze" && (
          <Table head={["Quiz", "Level", "Fragen", "Bestehen ab", "XP"]}>
            {quizzes.map((q) => (
              <tr key={q.id} style={rowBorder}>
                <td className={`${td} font-medium`}>{q.title}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{getLevel(q.levelId)?.title}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{q.questions.length}</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>{Math.round(q.passScore * 100)}%</td>
                <td className={td} style={{ color: "var(--ac-ink-2)" }}>+{q.xp}</td>
              </tr>
            ))}
          </Table>
        )}
      </div>

      {/* Local demo data */}
      <Reveal>
        <div className="ac-card mt-10 flex flex-wrap items-center justify-between gap-4 p-6">
          <div>
            <h3 className="ac-h3">Lokale Demo-Daten</h3>
            <p className="mt-1 text-sm" style={{ color: "var(--ac-ink-2)" }}>
              Fortschritt dieses Browsers: {user.completedLessons.length} Lektionen ·{" "}
              {user.xp.toLocaleString("de-CH")} XP · Plan „{user.plan}“.
            </p>
          </div>
          {confirmReset ? (
            <div className="flex gap-2">
              <button
                onClick={() => {
                  resetProgress()
                  setConfirmReset(false)
                }}
                className="ac-btn !py-2 !px-4 !text-[13px] text-white"
                style={{ background: "#e11d48" }}
              >
                Ja, alles zurücksetzen
              </button>
              <button onClick={() => setConfirmReset(false)} className="ac-btn ac-btn-ghost !py-2 !px-4 !text-[13px]">
                Abbrechen
              </button>
            </div>
          ) : (
            <button onClick={() => setConfirmReset(true)} className="ac-btn ac-btn-ghost !py-2 !px-4 !text-[13px]" style={{ color: "#e11d48" }}>
              Fortschritt zurücksetzen
            </button>
          )}
        </div>
      </Reveal>
    </div>
  )
}
