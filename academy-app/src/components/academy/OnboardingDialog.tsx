"use client"

// First-visit onboarding: asks for the name (used on certificates) and a
// weekly lesson goal. Shown once; skippable.

import { useEffect, useState } from "react"
import { Sparkles } from "./ui/Icons"
import { useAcademy, completeOnboarding } from "@/lib/academy/store"

const goals = [2, 3, 5, 7]

export default function OnboardingDialog() {
  const { state } = useAcademy()
  const [mounted, setMounted] = useState(false)
  const [name, setName] = useState("")
  const [goal, setGoal] = useState(3)

  // Render only after hydration so SSR markup stays deterministic.
  useEffect(() => setMounted(true), [])

  if (!mounted || state.onboarded) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{ background: "rgba(5,5,10,0.65)", backdropFilter: "blur(6px)" }}
      role="dialog"
      aria-modal="true"
      aria-label="Willkommen bei der AI Academy"
    >
      <div
        className="w-full max-w-md rounded-3xl p-8"
        style={{ background: "var(--ac-surface)", border: "1px solid var(--ac-border-strong)", boxShadow: "var(--ac-shadow)" }}
      >
        <span
          className="grid h-11 w-11 place-items-center rounded-2xl text-white"
          style={{ background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))" }}
        >
          <Sparkles width={20} height={20} />
        </span>
        <h2 className="ac-h3 mt-5" style={{ fontSize: "clamp(20px,2vw,26px)" }}>
          Willkommen bei der AI Academy 👋
        </h2>
        <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>
          Zwei kurze Fragen, dann geht&apos;s los. Dein Name erscheint später auf deinen
          Zertifikaten.
        </p>

        <label className="mt-6 block text-xs font-medium uppercase tracking-wider" style={{ color: "var(--ac-ink-3)" }} htmlFor="ob-name">
          Dein Name
        </label>
        <input
          id="ob-name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="z. B. Monther Madkour"
          className="ac-input mt-2"
          autoFocus
        />

        <p className="mt-5 text-xs font-medium uppercase tracking-wider" style={{ color: "var(--ac-ink-3)" }}>
          Wochenziel (Lektionen)
        </p>
        <div className="mt-2 grid grid-cols-4 gap-2">
          {goals.map((g) => (
            <button
              key={g}
              onClick={() => setGoal(g)}
              className="ac-btn !px-0 !py-2.5"
              style={
                goal === g
                  ? { background: "var(--ac-primary)", color: "#fff" }
                  : { background: "var(--ac-surface-2)", border: "1px solid var(--ac-border)", color: "var(--ac-ink-2)" }
              }
              aria-pressed={goal === g}
            >
              {g}
            </button>
          ))}
        </div>

        <button
          onClick={() => completeOnboarding(name, goal)}
          disabled={!name.trim()}
          className="ac-btn ac-btn-primary mt-7 w-full disabled:opacity-40"
        >
          Los geht&apos;s
        </button>
        <button
          onClick={() => completeOnboarding("", goal)}
          className="mt-3 w-full text-center text-xs hover:underline"
          style={{ color: "var(--ac-ink-3)" }}
        >
          Später – erstmal umschauen
        </button>
      </div>
    </div>
  )
}
