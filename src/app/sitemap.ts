import type { MetadataRoute } from "next"

const BASE = "https://www.madkourmedia.com"

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${BASE}/`, priority: 1 },
    { url: `${BASE}/jpdlag`, priority: 0.6 },
  ]
}
