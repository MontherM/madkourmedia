import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import QuizRunner from "@/components/academy/QuizRunner"
import { getQuizzes, getQuizForLevel, getLevel } from "@/lib/academy/data"

export function generateStaticParams() {
  return getQuizzes().map((q) => ({ level: q.levelId }))
}

export function generateMetadata({ params }: { params: { level: string } }): Metadata {
  const quiz = getQuizForLevel(params.level)
  return { title: quiz ? `${quiz.title} — AI Academy` : "Quiz — AI Academy" }
}

export default function QuizPage({ params }: { params: { level: string } }) {
  const quiz = getQuizForLevel(params.level)
  const level = getLevel(params.level)
  if (!quiz || !level) notFound()

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="mb-10 text-center">
        <Link href="/academy/curriculum" className="text-xs hover:underline" style={{ color: "var(--ac-ink-3)" }}>
          ← Zurück zum Lehrplan
        </Link>
        <span className="ac-eyebrow mt-4 block">{level.title}</span>
        <h1 className="ac-h2 mt-2">{quiz.title}</h1>
        <p className="mt-3 text-sm" style={{ color: "var(--ac-ink-2)" }}>
          {quiz.questions.length} Fragen · {Math.round(quiz.passScore * 100)}% zum Bestehen · +{quiz.xp} XP
        </p>
      </div>

      <QuizRunner quiz={quiz} levelTitle={level.title} />
    </div>
  )
}
