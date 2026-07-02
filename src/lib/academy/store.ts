"use client"

// Client-side progress store. Persists to localStorage and stands in for the
// Supabase backend: swap `load`/`persist` for API calls later and every
// component keeps working. Components read via `useAcademy()`.

import { useMemo, useSyncExternalStore } from "react"
import type { Certificate, Plan, Quiz, UserProgress } from "./types"
import {
  badges as badgeDefs,
  getAllLessons,
  getLevel,
  getLevels,
  getChaptersForLevel,
  getLessonsForChapter,
  quizzes,
} from "./data"
import { computeStreak, isoDay, isoWeek } from "./progress"

export interface AcademyState {
  v: 1
  name: string
  plan: Plan
  onboarded: boolean
  weeklyGoal: number
  /** lessonId → ISO day (YYYY-MM-DD) of completion. */
  completions: Record<string, string>
  bookmarks: string[]
  /** Unique ISO days with learning activity (drives the streak). */
  activity: string[]
  /** levelId → best quiz score 0..1. */
  quizBest: Record<string, number>
  certificates: Certificate[]
  promptCopies: number
  /** Slug of the lesson the user last opened. */
  lastLesson: string
}

const STORAGE_KEY = "ai-academy-progress-v1"

export const DEFAULT_STATE: AcademyState = {
  v: 1,
  name: "",
  plan: "free",
  onboarded: false,
  weeklyGoal: 3,
  completions: {},
  bookmarks: [],
  activity: [],
  quizBest: {},
  certificates: [],
  promptCopies: 0,
  lastLesson: "",
}

let state: AcademyState = DEFAULT_STATE
let loaded = false
const listeners = new Set<() => void>()

function load(): AcademyState {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<AcademyState>
      return { ...DEFAULT_STATE, ...parsed, v: 1 }
    }
  } catch {
    /* corrupt storage → fresh start */
  }
  return { ...DEFAULT_STATE }
}

function persist(next: AcademyState) {
  state = next
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
  } catch {
    /* storage unavailable (private mode) — state still lives in memory */
  }
  listeners.forEach((l) => l())
}

function ensureLoaded() {
  if (!loaded && typeof window !== "undefined") {
    state = load()
    loaded = true
  }
}

function subscribe(listener: () => void) {
  ensureLoaded()
  listeners.add(listener)
  // Keep tabs in sync.
  const onStorage = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) {
      state = load()
      listeners.forEach((l) => l())
    }
  }
  window.addEventListener("storage", onStorage)
  return () => {
    listeners.delete(listener)
    window.removeEventListener("storage", onStorage)
  }
}

const getSnapshot = () => {
  ensureLoaded()
  return state
}
const getServerSnapshot = () => DEFAULT_STATE

const withDay = (days: string[], day: string) =>
  days.includes(day) ? days : [...days, day]

// ── Mutations ───────────────────────────────────────────────────────────────

export function toggleLessonComplete(lessonId: string) {
  const day = isoDay()
  const completions = { ...state.completions }
  if (completions[lessonId]) {
    delete completions[lessonId]
    persist({ ...state, completions })
  } else {
    completions[lessonId] = day
    persist({ ...state, completions, activity: withDay(state.activity, day) })
  }
}

export function toggleBookmark(lessonId: string) {
  const bookmarks = state.bookmarks.includes(lessonId)
    ? state.bookmarks.filter((id) => id !== lessonId)
    : [...state.bookmarks, lessonId]
  persist({ ...state, bookmarks })
}

export function visitLesson(slug: string) {
  if (state.lastLesson !== slug) persist({ ...state, lastLesson: slug })
}

export function recordPromptCopy() {
  persist({ ...state, promptCopies: state.promptCopies + 1 })
}

function certificateCode() {
  const hex = Array.from(crypto.getRandomValues(new Uint8Array(3)))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("")
    .toUpperCase()
  return `AC-${new Date().getFullYear()}-${hex}`
}

/**
 * Stores the quiz result; on a pass, issues (or upgrades) the level
 * certificate. Returns the certificate when one exists after the call.
 */
export function recordQuizResult(quiz: Quiz, score: number): Certificate | undefined {
  const day = isoDay()
  const passed = score >= quiz.passScore
  const best = Math.max(state.quizBest[quiz.levelId] ?? 0, score)
  let certificates = state.certificates
  let cert = certificates.find((c) => c.levelId === quiz.levelId)

  if (passed) {
    const levelTitle = getLevel(quiz.levelId)?.title ?? quiz.title
    if (!cert) {
      cert = {
        id: certificateCode(),
        levelId: quiz.levelId,
        levelTitle,
        recipient: state.name || "AI Academy Student",
        issuedAt: day,
        score,
      }
      certificates = [...certificates, cert]
    } else if (score > cert.score) {
      cert = { ...cert, score, issuedAt: day }
      certificates = certificates.map((c) => (c.levelId === quiz.levelId ? cert! : c))
    }
  }

  persist({
    ...state,
    quizBest: { ...state.quizBest, [quiz.levelId]: best },
    certificates,
    activity: withDay(state.activity, day),
  })
  return cert
}

export function completeOnboarding(name: string, weeklyGoal: number) {
  persist({
    ...state,
    name: name.trim(),
    weeklyGoal: Math.max(1, weeklyGoal),
    onboarded: true,
    // Rename any certificates issued before the user told us their name.
    certificates: state.certificates.map((c) =>
      c.recipient === "AI Academy Student" && name.trim() ? { ...c, recipient: name.trim() } : c,
    ),
  })
}

export function setPlan(plan: Plan) {
  persist({ ...state, plan })
}

export function resetProgress() {
  persist({ ...DEFAULT_STATE })
}

// ── Derivations ─────────────────────────────────────────────────────────────

const isQuizPassed = (s: AcademyState, levelId: string) => {
  const quiz = quizzes.find((q) => q.levelId === levelId)
  return !!quiz && (s.quizBest[levelId] ?? 0) >= quiz.passScore
}

const isLevelComplete = (s: AcademyState, levelId: string) => {
  const lessons = getChaptersForLevel(levelId).flatMap((c) => getLessonsForChapter(c.id))
  return lessons.length > 0 && lessons.every((l) => !!s.completions[l.id])
}

export function deriveUser(s: AcademyState): UserProgress {
  const completedLessons = Object.keys(s.completions)
  const lessonXp = getAllLessons()
    .filter((l) => s.completions[l.id])
    .reduce((sum, l) => sum + l.xp, 0)
  const quizXp = quizzes
    .filter((q) => isQuizPassed(s, q.levelId))
    .reduce((sum, q) => sum + q.xp, 0)

  const { current: streak, max: maxStreak } = computeStreak(s.activity)

  const earned: Record<string, boolean> = {
    "b-first": completedLessons.length >= 1,
    "b-streak7": maxStreak >= 7,
    "b-basics": isLevelComplete(s, "l1") || isQuizPassed(s, "l1"),
    "b-prompt": s.promptCopies >= 25,
    "b-automation": !!s.completions["erster-ki-agent"],
    "b-master": getLevels().every((lv) => isQuizPassed(s, lv.id)),
  }

  const week = isoWeek()
  const weeklyDone = Object.values(s.completions).filter((d) => isoWeek(new Date(d)) === week).length

  // Resume where the user left off; otherwise the first open lesson.
  const all = getAllLessons()
  const last = all.find((l) => l.slug === s.lastLesson)
  const continueLesson =
    last && !s.completions[last.id] ? last : all.find((l) => !s.completions[l.id]) ?? all[0]

  return {
    name: s.name,
    role: "student",
    plan: s.plan,
    xp: lessonXp + quizXp,
    streak,
    completedLessons,
    bookmarkedLessons: s.bookmarks,
    badges: badgeDefs.map((b) => ({ ...b, earned: !!earned[b.id] })),
    continueLessonId: continueLesson?.id ?? "",
    weeklyGoal: s.weeklyGoal,
    weeklyDone,
  }
}

// ── Hook ────────────────────────────────────────────────────────────────────

export function useAcademy() {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot)
  const user = useMemo(() => deriveUser(snapshot), [snapshot])
  return { state: snapshot, user }
}
