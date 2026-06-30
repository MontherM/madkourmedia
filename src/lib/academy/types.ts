// Domain model for the AI Academy. Single source of truth for content shapes.
// Today these types describe seed/mock data; later they map 1:1 to Supabase rows.

export type Role = "guest" | "student" | "pro" | "instructor" | "admin" | "super_admin"

export type Plan = "free" | "basic" | "pro" | "elite"

/** Lessons are gated by the minimum plan required to view them. */
export type AccessTier = "free" | "basic" | "pro" | "elite"

export interface Prompt {
  id: string
  title: string
  /** The actual prompt text users copy. */
  body: string
  category: string
  tags: string[]
  /** Average rating 0–5. */
  rating: number
  /** Which AI model this prompt is tuned for. */
  recommendedModel?: string
}

export interface ResourceItem {
  id: string
  title: string
  /** Type drives the icon + label shown in the UI. */
  type: "pdf" | "cheatsheet" | "template" | "checklist" | "workflow" | "mindmap"
  /** Human-readable size, e.g. "2.4 MB". */
  size?: string
}

/** A timestamped marker inside a lesson video. */
export interface ChapterMark {
  /** Seconds from start. */
  at: number
  label: string
}

export interface Lesson {
  id: string
  slug: string
  title: string
  /** One-line "why this matters". */
  summary: string
  /** Duration in minutes. */
  duration: number
  access: AccessTier
  chapterId: string
  levelId: string
  /** Ordered video chapter marks. */
  marks: ChapterMark[]
  prompts: Prompt[]
  resources: ResourceItem[]
  /** XP awarded on completion. */
  xp: number
  hasQuiz: boolean
}

export interface Chapter {
  id: string
  title: string
  levelId: string
  lessonIds: string[]
}

export interface Level {
  id: string
  order: number
  /** e.g. "Level 1". */
  badge: string
  title: string
  subtitle: string
  description: string
  /** Tailwind gradient stops for the level accent. */
  gradient: [string, string]
  outcomes: string[]
  chapterIds: string[]
  access: AccessTier
}

export interface Tool {
  id: string
  name: string
  category: string
  /** Short tagline. */
  tagline: string
  description: string
  pricing: string
  pros: string[]
  cons: string[]
  useCases: string[]
  url: string
}

export interface BadgeDef {
  id: string
  name: string
  description: string
  icon: string
  earned: boolean
}

export interface UserProgress {
  name: string
  role: Role
  plan: Plan
  xp: number
  streak: number
  /** ids of completed lessons. */
  completedLessons: string[]
  bookmarkedLessons: string[]
  badges: BadgeDef[]
  /** lesson id the user should resume. */
  continueLessonId: string
  weeklyGoal: number
  weeklyDone: number
}

export interface PricingTier {
  plan: Plan
  name: string
  price: string
  cadence: string
  tagline: string
  features: string[]
  highlighted?: boolean
  cta: string
}
