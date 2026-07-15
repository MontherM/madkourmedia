import { notFound } from "next/navigation"
import type { Metadata } from "next"
import LessonView from "@/components/academy/LessonView"
import { getLesson, getAllLessons, getNeighbours, getLevel, getChapter } from "@/lib/academy/data"

export function generateStaticParams() {
  return getAllLessons().map((l) => ({ slug: l.slug }))
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const lesson = getLesson(params.slug)
  if (!lesson) return { title: "Lektion — AI Academy" }
  return { title: `${lesson.title} — AI Academy`, description: lesson.summary }
}

export default function LessonPage({ params }: { params: { slug: string } }) {
  const lesson = getLesson(params.slug)
  if (!lesson) notFound()

  const level = getLevel(lesson.levelId)
  const chapter = getChapter(lesson.chapterId)
  const { prev, next } = getNeighbours(lesson.slug)

  return (
    <LessonView
      lesson={lesson}
      levelTitle={level?.title ?? "Academy"}
      chapterTitle={chapter?.title ?? ""}
      prev={prev ? { slug: prev.slug, title: prev.title } : undefined}
      next={next ? { slug: next.slug, title: next.title } : undefined}
    />
  )
}
