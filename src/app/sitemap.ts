import type { MetadataRoute } from "next"
import { getAllLessons, getQuizzes } from "@/lib/academy/data"

const BASE = "https://www.madkourmedia.com"

export default function sitemap(): MetadataRoute.Sitemap {
  const statics: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/jpdlag`, priority: 0.6 },
    { url: `${BASE}/academy`, priority: 0.9 },
    { url: `${BASE}/academy/curriculum`, priority: 0.8 },
    { url: `${BASE}/academy/prompts`, priority: 0.7 },
    { url: `${BASE}/academy/tools`, priority: 0.7 },
    { url: `${BASE}/academy/community`, priority: 0.6 },
    { url: `${BASE}/academy/pricing`, priority: 0.8 },
    { url: `${BASE}/academy/certificates`, priority: 0.5 },
  ]

  const lessons: MetadataRoute.Sitemap = getAllLessons().map((l) => ({
    url: `${BASE}/academy/lessons/${l.slug}`,
    priority: 0.6,
  }))

  const quizzes: MetadataRoute.Sitemap = getQuizzes().map((q) => ({
    url: `${BASE}/academy/quiz/${q.levelId}`,
    priority: 0.4,
  }))

  return [...statics, ...lessons, ...quizzes]
}
