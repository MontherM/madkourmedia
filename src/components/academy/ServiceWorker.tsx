"use client"
import { useEffect } from "react"

/** Registers the PWA service worker once on mount. */
export default function ServiceWorker() {
  useEffect(() => {
    if (typeof window === "undefined" || !("serviceWorker" in navigator)) return
    const onLoad = () => navigator.serviceWorker.register("/sw.js").catch(() => {})
    if (document.readyState === "complete") onLoad()
    else window.addEventListener("load", onLoad, { once: true })
  }, [])
  return null
}
