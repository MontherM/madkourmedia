// Gamification + progress derivations. Pure functions so they are trivial to test
// and reuse on server or client.

import type { AccessTier, Lesson, Plan, UserProgress } from "./types"
import { getAllLessons, getLevels, getChaptersForLevel, getLessonsForChapter } from "./data"

/** XP needed to reach a given rank. Simple, readable curve. */
const RANK_THRESHOLDS = [0, 300, 800, 1500, 2500, 4000]
const RANK_NAMES = ["Einsteiger", "Anwender", "Profi", "Experte", "Master", "Legende"]

export function rankFor(xp: number) {
  let idx = 0
  for (let i = 0; i < RANK_THRESHOLDS.length; i++) {
    if (xp >= RANK_THRESHOLDS[i]) idx = i
  }
  const current = RANK_THRESHOLDS[idx]
  const next = RANK_THRESHOLDS[idx + 1] ?? current
  const span = next - current || 1
  return {
    name: RANK_NAMES[idx],
    rank: idx + 1,
    progressToNext: Math.min(1, (xp - current) / span),
    xpToNext: Math.max(0, next - xp),
    isMax: idx === RANK_THRESHOLDS.length - 1,
  }
}

export const isCompleted = (user: UserProgress, lesson: Lesson) =>
  user.completedLessons.includes(lesson.id)

/** Overall completion ratio across all lessons. */
export function overallProgress(user: UserProgress) {
  const all = getAllLessons()
  return all.length ? user.completedLessons.length / all.length : 0
}

/** Per-level completion ratio. */
export function levelProgress(user: UserProgress, levelId: string) {
  const lessons = getChaptersForLevel(levelId).flatMap((c) => getLessonsForChapter(c.id))
  if (!lessons.length) return 0
  const done = lessons.filter((l) => user.completedLessons.includes(l.id)).length
  return done / lessons.length
}

export function levelStats(user: UserProgress) {
  return getLevels().map((level) => ({
    level,
    progress: levelProgress(user, level.id),
  }))
}

export const earnedBadges = (user: UserProgress) => user.badges.filter((b) => b.earned)

// ── Plan gating ─────────────────────────────────────────────────────────────

const TIER_ORDER: AccessTier[] = ["free", "basic", "pro", "elite"]

export const tierRank = (tier: AccessTier | Plan) => TIER_ORDER.indexOf(tier)

/** Whether a user on `plan` may open content gated at `tier`. */
export const canAccess = (plan: Plan, tier: AccessTier) => tierRank(plan) >= tierRank(tier)

// ── Time helpers for streaks & weekly goals ─────────────────────────────────

/** Local calendar day as YYYY-MM-DD. */
export function isoDay(d: Date = new Date()) {
  const y = d.getFullYear()
  const m = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${y}-${m}-${day}`
}

/** ISO-8601 week key like "2026-W27" (Monday-based). */
export function isoWeek(d: Date = new Date()) {
  const date = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()))
  const dayNum = date.getUTCDay() || 7
  date.setUTCDate(date.getUTCDate() + 4 - dayNum)
  const yearStart = new Date(Date.UTC(date.getUTCFullYear(), 0, 1))
  const week = Math.ceil(((date.getTime() - yearStart.getTime()) / 86400000 + 1) / 7)
  return `${date.getUTCFullYear()}-W${String(week).padStart(2, "0")}`
}

const dayBefore = (day: string) => {
  const d = new Date(`${day}T12:00:00`)
  d.setDate(d.getDate() - 1)
  return isoDay(d)
}

/**
 * Streak from a list of active days. `current` counts back from today
 * (a streak survives until the end of today), `max` is the best run ever.
 */
export function computeStreak(activeDays: string[], today: string = isoDay()) {
  const days = new Set(activeDays)
  let current = 0
  let cursor = days.has(today) ? today : dayBefore(today)
  while (days.has(cursor)) {
    current++
    cursor = dayBefore(cursor)
  }

  let max = 0
  for (const day of Array.from(days)) {
    if (days.has(dayBefore(day))) continue // not the start of a run
    let len = 0
    let c = day
    while (days.has(c)) {
      len++
      const d = new Date(`${c}T12:00:00`)
      d.setDate(d.getDate() + 1)
      c = isoDay(d)
    }
    max = Math.max(max, len)
  }
  return { current, max }
}
