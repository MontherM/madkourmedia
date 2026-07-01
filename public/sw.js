// AI Academy service worker — enables installability + light offline support.
const CACHE = "ai-academy-v1"
const APP_SHELL = [
  "/academy",
  "/academy/curriculum",
  "/academy/prompts",
  "/academy/tools",
  "/academy/dashboard",
  "/manifest.webmanifest",
  "/icon-192.png",
  "/icon-512.png",
]

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE).then((cache) => cache.addAll(APP_SHELL).catch(() => {})),
  )
  self.skipWaiting()
})

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))),
  )
  self.clients.claim()
})

// Network-first for navigations (fresh content), cache fallback when offline.
self.addEventListener("fetch", (event) => {
  const { request } = event
  if (request.method !== "GET") return

  if (request.mode === "navigate") {
    event.respondWith(
      fetch(request)
        .then((res) => {
          const copy = res.clone()
          caches.open(CACHE).then((c) => c.put(request, copy))
          return res
        })
        .catch(() => caches.match(request).then((r) => r || caches.match("/academy"))),
    )
    return
  }

  // Cache-first for static assets.
  if (/\.(?:png|svg|jpg|jpeg|webp|woff2?|css|js)$/.test(new URL(request.url).pathname)) {
    event.respondWith(
      caches.match(request).then(
        (cached) =>
          cached ||
          fetch(request).then((res) => {
            const copy = res.clone()
            caches.open(CACHE).then((c) => c.put(request, copy))
            return res
          }),
      ),
    )
  }
})
