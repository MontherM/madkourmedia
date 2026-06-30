// Gamification + progress derivations. Pure functions so they are trivial to test
// and reuse on server or client.

import type { Lesson, UserProgress } from "./types"
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
