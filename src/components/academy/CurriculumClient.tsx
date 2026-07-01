"use client"

import Link from "next/link"
import Reveal from "@/components/academy/ui/Reveal"
import ProgressBar from "@/components/academy/ui/ProgressBar"
import { Check, Lock, Play, Trophy } from "@/components/academy/ui/Icons"
import {
  getLevels,
  getChaptersForLevel,
  getLessonsForChapter,
  getQuizForLevel,
} from "@/lib/academy/data"
import { levelProgress, canAccess } from "@/lib/academy/progress"
import { useAcademy } from "@/lib/academy/store"

export default function CurriculumClient() {
  const { state, user } = useAcademy()
  const levels = getLevels()

  return (
    <div className="mx-auto max-w-5xl px-5 py-16 sm:px-8">
      <Reveal>
        <span className="ac-eyebrow">Lehrplan</span>
        <h1 className="ac-h2 mt-3">Der komplette Lernpfad.</h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--ac-ink-2)" }}>
          Beliebig erweiterbar – Level für Level, Kapitel für Kapitel. Jede Lektion folgt derselben
          klaren Struktur: Warum → Wie → Wann → Praxis → Aufgabe → Downloads.
        </p>
      </Reveal>

      <div className="mt-14 space-y-14">
        {levels.map((level) => {
          const chapters = getChaptersForLevel(level.id)
          const progress = levelProgress(user, level.id)
          const quiz = getQuizForLevel(level.id)
          const cert = state.certificates.find((c) => c.levelId === level.id)
          return (
            <Reveal key={level.id}>
              <section>
                <div className="flex flex-wrap items-end justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <span
                      className="grid h-12 w-12 place-items-center rounded-2xl text-sm font-bold text-white"
                      style={{ background: `linear-gradient(135deg, ${level.gradient[0]}, ${level.gradient[1]})` }}
                    >
                      {level.order}
                    </span>
                    <div>
                      <h2 className="text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>{level.title}</h2>
                      <p className="text-sm" style={{ color: "var(--ac-ink-3)" }}>{level.subtitle}</p>
                    </div>
                  </div>
                  <span className="ac-pill">
                    {level.access === "free"
                      ? "Kostenlos"
                      : canAccess(user.plan, level.access)
                        ? "Freigeschaltet"
                        : `Ab ${level.access}`}
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <ProgressBar value={progress} className="max-w-xs" />
                  <span className="text-xs" style={{ color: "var(--ac-ink-3)" }}>
                    {Math.round(progress * 100)}% abgeschlossen
                  </span>
                </div>

                <div className="mt-6 space-y-5">
                  {chapters.map((chapter) => {
                    const lessons = getLessonsForChapter(chapter.id)
                    return (
                      <div key={chapter.id} className="ac-card overflow-hidden">
                        <div
                          className="flex items-center justify-between px-5 py-3.5"
                          style={{ borderBottom: "1px solid var(--ac-border)", background: "var(--ac-surface-2)" }}
                        >
                          <h3 className="text-sm font-semibold">{chapter.title}</h3>
                          <span className="text-xs" style={{ color: "var(--ac-ink-3)" }}>{lessons.length} Lektionen</span>
                        </div>
                        <ul>
                          {lessons.map((lesson) => {
                            const done = user.completedLessons.includes(lesson.id)
                            const locked = !canAccess(user.plan, lesson.access)
                            return (
                              <li key={lesson.id}>
                                <Link
                                  href={`/academy/lessons/${lesson.slug}`}
                                  className="flex items-center gap-4 px-5 py-3.5 transition-colors hover:bg-[var(--ac-surface-2)]"
                                  style={{ borderTop: "1px solid var(--ac-border)" }}
                                >
                                  <span
                                    className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full"
                                    style={{
                                      background: done ? "var(--ac-primary)" : "var(--ac-surface-2)",
                                      color: done ? "#fff" : "var(--ac-ink-3)",
                                      border: done ? "none" : "1px solid var(--ac-border)",
                                    }}
                                  >
                                    {done ? <Check width={15} height={15} /> : locked ? <Lock width={14} height={14} /> : <Play width={13} height={13} />}
                                  </span>
                                  <span className="min-w-0 flex-1">
                                    <span className="block truncate text-sm font-medium">{lesson.title}</span>
                                    <span className="block truncate text-xs" style={{ color: "var(--ac-ink-3)" }}>
                                      {lesson.summary}
                                    </span>
                                  </span>
                                  <span className="flex flex-shrink-0 items-center gap-3 text-xs" style={{ color: "var(--ac-ink-3)" }}>
                                    {lesson.hasQuiz && <span className="ac-pill !py-0.5 !px-2 hidden sm:inline-flex">Quiz</span>}
                                    <span>{lesson.duration} Min</span>
                                  </span>
                                </Link>
                              </li>
                            )
                          })}
                        </ul>
                      </div>
                    )
                  })}
                </div>

                {quiz && (
                  <div
                    className="mt-5 flex flex-wrap items-center justify-between gap-4 rounded-2xl p-5"
                    style={{ background: "var(--ac-surface-2)" }}
                  >
                    <div className="flex items-center gap-3">
                      <Trophy width={18} height={18} style={{ color: "var(--ac-primary)" }} />
                      <span className="text-sm" style={{ color: "var(--ac-ink-2)" }}>
                        {cert
                          ? `Bestanden mit ${Math.round(cert.score * 100)}% – dein Zertifikat wartet.`
                          : "Abschluss-Quiz bestehen und Zertifikat sichern."}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Link href={`/academy/quiz/${level.id}`} className="ac-btn ac-btn-ghost !py-2 !px-4 !text-[13px]">
                        Quiz starten
                      </Link>
                      {cert && (
                        <Link
                          href={`/academy/certificates/${cert.id}`}
                          className="ac-btn ac-btn-primary !py-2 !px-4 !text-[13px]"
                        >
                          Zertifikat
                        </Link>
                      )}
                    </div>
                  </div>
                )}
              </section>
            </Reveal>
          )
        })}
      </div>

      <Reveal>
        <div className="mt-16 ac-card p-8 text-center">
          <h3 className="ac-h3">Nach jedem Level: Abschlussprojekt & Zertifikat.</h3>
          <p className="mx-auto mt-2 max-w-lg text-sm" style={{ color: "var(--ac-ink-2)" }}>
            Quiz bestehen, Praxisprojekt einreichen und ein verifizierbares Zertifikat plus
            LinkedIn-Badge erhalten.
          </p>
          <Link href="/academy/pricing" className="ac-btn ac-btn-primary mt-6">
            Vollzugang freischalten
          </Link>
        </div>
      </Reveal>
    </div>
  )
}
