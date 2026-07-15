"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { Check, ArrowRight, Trophy, Bolt } from "./ui/Icons"
import Bar from "./ui/ProgressBar"
import type { Quiz, QuizQuestion } from "@/lib/academy/types"
import { recordQuizResult } from "@/lib/academy/store"

interface Props {
  quiz: Quiz
  levelTitle: string
}

type Answers = Record<string, string[]>

const arraysEqual = (a: string[], b: string[]) =>
  a.length === b.length && [...a].sort().join() === [...b].sort().join()

function isCorrect(q: QuizQuestion, ans: string[] = []): boolean {
  if (q.type === "flashcard") return ans.includes("known")
  return arraysEqual(ans, q.correct ?? [])
}

export default function QuizRunner({ quiz, levelTitle }: Props) {
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState<Answers>({})
  const [flipped, setFlipped] = useState(false)
  const [done, setDone] = useState(false)
  const [certificateId, setCertificateId] = useState<string>()

  const total = quiz.questions.length
  const q = quiz.questions[step]
  const current = answers[q?.id] ?? []

  const result = useMemo(() => {
    const correct = quiz.questions.filter((qq) => isCorrect(qq, answers[qq.id])).length
    const score = total ? correct / total : 0
    return { correct, score, passed: score >= quiz.passScore }
  }, [answers, quiz, total])

  const select = (optionId: string) => {
    setAnswers((prev) => {
      const existing = prev[q.id] ?? []
      if (q.type === "multiple") {
        const next = existing.includes(optionId)
          ? existing.filter((x) => x !== optionId)
          : [...existing, optionId]
        return { ...prev, [q.id]: next }
      }
      return { ...prev, [q.id]: [optionId] }
    })
  }

  const answered =
    q?.type === "flashcard" ? current.length > 0 : (answers[q?.id]?.length ?? 0) > 0

  const goNext = () => {
    if (step < total - 1) {
      setStep((s) => s + 1)
      setFlipped(false)
    } else {
      // Persist the attempt; on a pass this issues the level certificate.
      const cert = recordQuizResult(quiz, result.score)
      setCertificateId(cert?.id)
      setDone(true)
    }
  }

  const restart = () => {
    setAnswers({})
    setStep(0)
    setFlipped(false)
    setDone(false)
  }

  // ── Results screen ────────────────────────────────────────────────
  if (done) {
    return (
      <div className="mx-auto max-w-2xl">
        <div className="ac-card overflow-hidden text-center">
          <div
            className="px-8 py-10"
            style={{
              background: result.passed
                ? "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))"
                : "var(--ac-surface-2)",
              color: result.passed ? "#fff" : "var(--ac-ink)",
            }}
          >
            <div className="mx-auto grid h-16 w-16 place-items-center rounded-full" style={{ background: "rgba(255,255,255,0.18)" }}>
              <Trophy width={28} height={28} />
            </div>
            <p className="mt-4 text-5xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
              {Math.round(result.score * 100)}%
            </p>
            <p className="mt-1 opacity-90">
              {result.correct} / {total} richtig · {result.passed ? "Bestanden 🎉" : "Knapp daneben"}
            </p>
          </div>

          <div className="p-7">
            {result.passed ? (
              <>
                <p className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--ac-primary)" }}>
                  <Bolt width={15} height={15} /> +{quiz.xp} XP gutgeschrieben
                </p>
                <p className="mt-2 text-sm" style={{ color: "var(--ac-ink-2)" }}>
                  Du hast {levelTitle} abgeschlossen. Sichere dir jetzt dein Zertifikat.
                </p>
                <div className="mt-6 flex flex-wrap justify-center gap-3">
                  <Link
                    href={certificateId ? `/certificates/${certificateId}` : "/certificates"}
                    className="ac-btn ac-btn-primary"
                  >
                    Zertifikat ansehen <ArrowRight width={16} height={16} />
                  </Link>
                  <button onClick={restart} className="ac-btn ac-btn-ghost">Wiederholen</button>
                </div>
              </>
            ) : (
              <>
                <p className="text-sm" style={{ color: "var(--ac-ink-2)" }}>
                  Du brauchst mindestens {Math.round(quiz.passScore * 100)}%. Schau dir die Erklärungen
                  unten an und versuch es erneut.
                </p>
                <button onClick={restart} className="ac-btn ac-btn-primary mt-6">Quiz wiederholen</button>
              </>
            )}
          </div>
        </div>

        {/* Review */}
        <div className="mt-6 space-y-3">
          <h3 className="ac-h3">Auswertung</h3>
          {quiz.questions.map((qq, i) => {
            const ok = isCorrect(qq, answers[qq.id])
            return (
              <div key={qq.id} className="ac-card p-5">
                <div className="flex items-start gap-3">
                  <span
                    className="mt-0.5 grid h-6 w-6 flex-shrink-0 place-items-center rounded-full text-xs font-bold"
                    style={{
                      background: ok ? "var(--ac-primary)" : "rgba(244,63,94,0.15)",
                      color: ok ? "#fff" : "#f43f5e",
                    }}
                  >
                    {ok ? <Check width={13} height={13} /> : "✕"}
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-medium">{i + 1}. {qq.prompt}</p>
                    {qq.type === "flashcard" ? (
                      <p className="mt-1 text-sm" style={{ color: "var(--ac-ink-2)" }}>{qq.back}</p>
                    ) : (
                      <p className="mt-1 text-sm" style={{ color: "var(--ac-ink-3)" }}>
                        Richtig: {qq.options?.filter((o) => qq.correct?.includes(o.id)).map((o) => o.text).join(", ")}
                      </p>
                    )}
                    {qq.explanation && (
                      <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>{qq.explanation}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    )
  }

  // ── Question screen ───────────────────────────────────────────────
  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-6 flex items-center gap-3">
        <Bar value={(step) / total} />
        <span className="whitespace-nowrap text-xs" style={{ color: "var(--ac-ink-3)" }}>
          {step + 1} / {total}
        </span>
      </div>

      <div className="ac-card p-7">
        <span className="ac-pill !text-[11px]">
          {q.type === "single" ? "Eine Antwort" : q.type === "multiple" ? "Mehrfachauswahl" : "Karteikarte"}
        </span>
        <h2 className="ac-h3 mt-4">{q.prompt}</h2>

        {q.type === "flashcard" ? (
          <div className="mt-6">
            <button
              onClick={() => setFlipped((f) => !f)}
              className="flex min-h-[120px] w-full items-center justify-center rounded-2xl p-6 text-center text-sm transition-colors"
              style={{ background: "var(--ac-surface-2)", border: "1px solid var(--ac-border)" }}
            >
              {flipped ? (
                <span style={{ color: "var(--ac-ink)" }}>{q.back}</span>
              ) : (
                <span style={{ color: "var(--ac-ink-3)" }}>Tippen zum Umdrehen</span>
              )}
            </button>
            {flipped && (
              <div className="mt-4 grid grid-cols-2 gap-3">
                <button
                  onClick={() => select("unknown")}
                  className="ac-btn ac-btn-ghost"
                  style={current.includes("unknown") ? { borderColor: "var(--ac-border-strong)" } : undefined}
                >
                  Nochmal üben
                </button>
                <button
                  onClick={() => select("known")}
                  className="ac-btn"
                  style={{
                    background: current.includes("known") ? "var(--ac-primary)" : "var(--ac-surface)",
                    color: current.includes("known") ? "#fff" : "var(--ac-ink)",
                    border: "1px solid var(--ac-border)",
                  }}
                >
                  Gewusst
                </button>
              </div>
            )}
          </div>
        ) : (
          <div className="mt-6 space-y-2.5">
            {q.options?.map((opt) => {
              const selected = current.includes(opt.id)
              return (
                <button
                  key={opt.id}
                  onClick={() => select(opt.id)}
                  className="flex w-full items-center gap-3 rounded-xl p-4 text-left text-sm transition-colors"
                  style={{
                    background: selected ? "var(--ac-primary-soft)" : "var(--ac-surface-2)",
                    border: `1px solid ${selected ? "var(--ac-primary)" : "var(--ac-border)"}`,
                  }}
                >
                  <span
                    className="grid h-5 w-5 flex-shrink-0 place-items-center text-[11px]"
                    style={{
                      borderRadius: q.type === "multiple" ? 6 : 999,
                      border: `1.5px solid ${selected ? "var(--ac-primary)" : "var(--ac-border-strong)"}`,
                      background: selected ? "var(--ac-primary)" : "transparent",
                      color: "#fff",
                    }}
                  >
                    {selected && <Check width={12} height={12} />}
                  </span>
                  {opt.text}
                </button>
              )
            })}
          </div>
        )}
      </div>

      <div className="mt-5 flex justify-end">
        <button onClick={goNext} disabled={!answered} className="ac-btn ac-btn-primary disabled:opacity-40">
          {step < total - 1 ? "Weiter" : "Auswerten"} <ArrowRight width={16} height={16} />
        </button>
      </div>
    </div>
  )
}
