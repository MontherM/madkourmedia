"use client"

import Link from "next/link"
import Reveal from "@/components/academy/ui/Reveal"
import ProgressBar from "@/components/academy/ui/ProgressBar"
import { ArrowRight, Bolt, Flame, Trophy, Book, Play, Star } from "@/components/academy/ui/Icons"
import { getLesson, getAllLessons } from "@/lib/academy/data"
import { rankFor, levelStats, overallProgress } from "@/lib/academy/progress"
import { useAcademy } from "@/lib/academy/store"

export default function DashboardClient() {
  const { state, user } = useAcademy()
  const rank = rankFor(user.xp)
  const stats = levelStats(user)
  const overall = overallProgress(user)
  const cont = getLesson(user.continueLessonId)
  const allDone = user.completedLessons.length >= getAllLessons().length
  const bookmarks = user.bookmarkedLessons
    .map((id) => getAllLessons().find((l) => l.id === id))
    .filter(Boolean)
  const certificates = state.certificates

  return (
    <div className="mx-auto max-w-6xl px-5 py-12 sm:px-8">
      <Reveal>
        <p className="text-sm" style={{ color: "var(--ac-ink-3)" }}>Dashboard</p>
        <h1 className="ac-h2 mt-1">{user.name ? `Hallo ${user.name} 👋` : "Willkommen 👋"}</h1>
      </Reveal>

      {/* Stat row */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: Bolt, value: user.xp.toLocaleString("de-CH"), label: `Rang: ${rank.name}` },
          { icon: Flame, value: `${user.streak} ${user.streak === 1 ? "Tag" : "Tage"}`, label: "Aktueller Streak" },
          { icon: Trophy, value: user.badges.filter((b) => b.earned).length, label: "Badges verdient" },
          { icon: Book, value: `${Math.round(overall * 100)}%`, label: "Gesamtfortschritt" },
        ].map(({ icon: Icon, value, label }, i) => (
          <Reveal key={label} delay={i * 0.05}>
            <div className="ac-card p-5">
              <div className="grid h-10 w-10 place-items-center rounded-xl" style={{ background: "var(--ac-primary-soft)", color: "var(--ac-primary)" }}>
                <Icon width={18} height={18} />
              </div>
              <p className="mt-4 text-2xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>{value}</p>
              <p className="text-xs" style={{ color: "var(--ac-ink-3)" }}>{label}</p>
            </div>
          </Reveal>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="space-y-6">
          {/* Continue / start */}
          {cont && !allDone && (
            <Reveal>
              <div className="ac-card overflow-hidden">
                <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl text-white" style={{ background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))" }}>
                      <Play width={18} height={18} />
                    </span>
                    <div>
                      <p className="text-xs uppercase tracking-wider" style={{ color: "var(--ac-ink-3)" }}>
                        {user.completedLessons.length === 0 ? "Hier startest du" : "Weiterlernen"}
                      </p>
                      <p className="mt-0.5 font-semibold">{cont.title}</p>
                      <p className="text-sm" style={{ color: "var(--ac-ink-3)" }}>{cont.duration} Min · +{cont.xp} XP</p>
                    </div>
                  </div>
                  <Link href={`/academy/lessons/${cont.slug}`} className="ac-btn ac-btn-primary">
                    {user.completedLessons.length === 0 ? "Loslegen" : "Fortsetzen"} <ArrowRight width={16} height={16} />
                  </Link>
                </div>
              </div>
            </Reveal>
          )}
          {allDone && (
            <Reveal>
              <div className="ac-card p-6 text-center">
                <p className="text-3xl">🎉</p>
                <p className="mt-2 font-semibold">Alle Lektionen abgeschlossen!</p>
                <p className="mt-1 text-sm" style={{ color: "var(--ac-ink-3)" }}>
                  Sichere dir jetzt die restlichen Zertifikate über die Abschluss-Quizze.
                </p>
                <Link href="/academy/certificates" className="ac-btn ac-btn-primary mt-4">
                  Zu den Zertifikaten <ArrowRight width={16} height={16} />
                </Link>
              </div>
            </Reveal>
          )}

          {/* Rank progress */}
          <Reveal>
            <div className="ac-card p-6">
              <div className="flex items-center justify-between">
                <h3 className="ac-h3">Nächster Rang</h3>
                <span className="ac-pill" style={{ color: "var(--ac-primary)" }}>{rank.name}</span>
              </div>
              <div className="mt-4 flex items-center gap-3">
                <ProgressBar value={rank.progressToNext} />
                <span className="whitespace-nowrap text-xs" style={{ color: "var(--ac-ink-3)" }}>
                  {rank.isMax ? "Maximaler Rang" : `noch ${rank.xpToNext} XP`}
                </span>
              </div>
            </div>
          </Reveal>

          {/* Level breakdown */}
          <Reveal>
            <div className="ac-card p-6">
              <h3 className="ac-h3">Fortschritt pro Level</h3>
              <div className="mt-5 space-y-5">
                {stats.map(({ level, progress }) => (
                  <div key={level.id}>
                    <div className="mb-1.5 flex items-center justify-between text-sm">
                      <span className="font-medium">{level.title}</span>
                      <span style={{ color: "var(--ac-ink-3)" }}>{Math.round(progress * 100)}%</span>
                    </div>
                    <ProgressBar value={progress} />
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        <div className="space-y-6">
          {/* Weekly goal */}
          <Reveal>
            <div className="ac-card p-6">
              <h3 className="ac-h3">Wochenziel</h3>
              <p className="mt-3 text-3xl font-bold" style={{ fontFamily: "var(--font-syne)" }}>
                {user.weeklyDone}<span style={{ color: "var(--ac-ink-3)" }}>/{user.weeklyGoal}</span>
              </p>
              <p className="text-xs" style={{ color: "var(--ac-ink-3)" }}>Lektionen diese Woche</p>
              <ProgressBar value={Math.min(1, user.weeklyDone / user.weeklyGoal)} className="mt-4" />
            </div>
          </Reveal>

          {/* Badges */}
          <Reveal>
            <div className="ac-card p-6">
              <h3 className="ac-h3">Badges</h3>
              <div className="mt-4 grid grid-cols-3 gap-3">
                {user.badges.map((b) => (
                  <div
                    key={b.id}
                    title={`${b.name} — ${b.description}`}
                    className="flex flex-col items-center gap-2 rounded-2xl p-3 text-center"
                    style={{ background: "var(--ac-surface-2)", opacity: b.earned ? 1 : 0.4 }}
                  >
                    <span
                      className="grid h-9 w-9 place-items-center rounded-full text-base"
                      style={{
                        background: b.earned ? "var(--ac-primary-soft)" : "transparent",
                        color: b.earned ? "var(--ac-primary)" : "var(--ac-ink-3)",
                      }}
                    >
                      {b.icon}
                    </span>
                    <span className="text-[11px] leading-tight" style={{ color: "var(--ac-ink-2)" }}>{b.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          {/* Certificates */}
          <Reveal>
            <div className="ac-card p-6">
              <h3 className="ac-h3 flex items-center gap-2"><Trophy width={16} height={16} style={{ color: "var(--ac-primary)" }} /> Zertifikate</h3>
              {certificates.length > 0 ? (
                <ul className="mt-4 space-y-1">
                  {certificates.map((c) => (
                    <li key={c.id}>
                      <Link
                        href={`/academy/certificates/${c.id}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--ac-surface-2)]"
                      >
                        <span className="truncate">{c.levelTitle}</span>
                        <ArrowRight width={15} height={15} style={{ color: "var(--ac-ink-3)", flexShrink: 0 }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm" style={{ color: "var(--ac-ink-3)" }}>Noch keine – bestehe ein Abschluss-Quiz.</p>
              )}
              <Link href="/academy/certificates" className="mt-3 inline-flex items-center gap-1 text-sm" style={{ color: "var(--ac-primary)" }}>
                Alle ansehen <ArrowRight width={14} height={14} />
              </Link>
            </div>
          </Reveal>

          {/* Bookmarks */}
          <Reveal>
            <div className="ac-card p-6">
              <h3 className="ac-h3 flex items-center gap-2"><Star width={16} height={16} style={{ color: "var(--ac-primary)" }} /> Bookmarks</h3>
              {bookmarks.length > 0 ? (
                <ul className="mt-4 space-y-1">
                  {bookmarks.map((l) => (
                    <li key={l!.id}>
                      <Link
                        href={`/academy/lessons/${l!.slug}`}
                        className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-[var(--ac-surface-2)]"
                      >
                        <span className="truncate">{l!.title}</span>
                        <ArrowRight width={15} height={15} style={{ color: "var(--ac-ink-3)", flexShrink: 0 }} />
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-3 text-sm" style={{ color: "var(--ac-ink-3)" }}>
                  Merke dir Lektionen mit dem ★ in der Lektionsansicht.
                </p>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </div>
  )
}
