import type { MetadataRoute } from "next"
import { getAllLessons, getQuizzes } from "@/lib/academy/data"

const BASE = "https://academy.madkourmedia.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/curriculum`, priority: 0.8 },
    { url: `${BASE}/prompts`, priority: 0.7 },
    { url: `${BASE}/tools`, priority: 0.7 },
    { url: `${BASE}/community`, priority: 0.6 },
    { url: `${BASE}/pricing`, priority: 0.8 },
    { url: `${BASE}/certificates`, priority: 0.5 },
  ]

  const lessons: MetadataRoute.Sitemap = getAllLessons().map((l) => ({
    url: `${BASE}/lessons/${l.slug}`,
    priority: 0.6,
  }))

  const quizzes: MetadataRoute.Sitemap = getQuizzes().map((q) => ({
    url: `${BASE}/quiz/${q.levelId}`,
    priority: 0.4,
  }))

  return [...statics, ...lessons, ...quizzes]
}
