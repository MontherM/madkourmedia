"use client"

import { useEffect, useState } from "react"
import { Sparkles, Download, Close } from "./ui/Icons"

interface BIPEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: "accepted" | "dismissed" }>
}

const DISMISS_KEY = "ac-install-dismissed"

export default function InstallPrompt() {
  const [deferred, setDeferred] = useState<BIPEvent | null>(null)
  const [iosHint, setIosHint] = useState(false)
  const [show, setShow] = useState(false)

  useEffect(() => {
    if (typeof window === "undefined") return
    const dismissed = localStorage.getItem(DISMISS_KEY) === "1"
    const standalone =
      window.matchMedia("(display-mode: standalone)").matches ||
      // @ts-expect-error iOS Safari
      window.navigator.standalone === true
    if (dismissed || standalone) return

    const onBIP = (e: Event) => {
      e.preventDefault()
      setDeferred(e as BIPEvent)
      setShow(true)
    }
    window.addEventListener("beforeinstallprompt", onBIP)

    // iOS has no beforeinstallprompt — show a manual hint.
    const ua = window.navigator.userAgent
    const isIOS = /iphone|ipad|ipod/i.test(ua) && !/crios|fxios/i.test(ua)
    if (isIOS) {
      setIosHint(true)
      setShow(true)
    }

    return () => window.removeEventListener("beforeinstallprompt", onBIP)
  }, [])

  const dismiss = () => {
    setShow(false)
    try {
      localStorage.setItem(DISMISS_KEY, "1")
    } catch {
      /* ignore */
    }
  }

  const install = async () => {
    if (!deferred) return
    await deferred.prompt()
    await deferred.userChoice
    dismiss()
  }

  if (!show) return null

  return (
    <div
      className="fixed inset-x-3 z-[60] mx-auto max-w-md md:left-auto md:right-4 md:mx-0"
      style={{ bottom: "calc(env(safe-area-inset-bottom) + 70px)" }}
    >
      <div className="ac-card flex items-center gap-3 p-3.5" style={{ boxShadow: "var(--ac-shadow)" }}>
        <span
          className="grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl text-white"
          style={{ background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))" }}
        >
          <Sparkles width={18} height={18} />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold">AI Academy als App</p>
          <p className="text-xs leading-snug" style={{ color: "var(--ac-ink-3)" }}>
            {iosHint ? "Teilen-Symbol → „Zum Home-Bildschirm“" : "Auf den Homescreen – wie eine echte App."}
          </p>
        </div>
        {!iosHint && (
          <button onClick={install} className="ac-btn ac-btn-primary !py-2 !px-3 !text-[13px]">
            <Download width={15} height={15} /> Installieren
          </button>
        )}
        <button onClick={dismiss} aria-label="Schließen" className="grid h-8 w-8 flex-shrink-0 place-items-center rounded-full" style={{ color: "var(--ac-ink-3)" }}>
          <Close width={16} height={16} />
        </button>
      </div>
    </div>
  )
}
