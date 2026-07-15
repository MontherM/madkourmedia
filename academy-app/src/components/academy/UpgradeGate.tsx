"use client"

// Paywall shown instead of gated lesson content. Enforced for real at the
// database layer (RLS) once Supabase lands; this is the UX for it.

import Link from "next/link"
import { Lock, Check, ArrowRight } from "./ui/Icons"
import type { AccessTier, Lesson } from "@/lib/academy/types"

const tierLabel: Record<AccessTier, string> = {
  free: "Free",
  basic: "Basic",
  pro: "Pro",
  elite: "Elite",
}

const tierPerks: Record<AccessTier, string[]> = {
  free: [],
  basic: ["Gesamtes Level 1", "Prompt-Bibliothek", "Fortschritt, XP & Streaks"],
  pro: ["Alle Kurse & Level", "Alle Downloads & Vorlagen", "Zertifikate & Live Q&A"],
  elite: ["Alles aus Pro", "Persönliche Coachings", "Masterclasses zuerst"],
}

export default function UpgradeGate({ lesson }: { lesson: Lesson }) {
  const tier = lesson.access

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 text-center sm:px-8">
      <div className="ac-card overflow-hidden">
        {/* Blurred fake player as a teaser */}
        <div
          className="relative flex aspect-video w-full items-center justify-center"
          style={{ background: "linear-gradient(135deg, #1b1917, #33251c)" }}
        >
          <div className="ac-grid-bg absolute inset-0 opacity-30" style={{ filter: "blur(2px)" }} />
          <span
            className="relative grid h-16 w-16 place-items-center rounded-full text-white"
            style={{ background: "rgba(255,255,255,0.12)", backdropFilter: "blur(4px)" }}
          >
            <Lock width={24} height={24} />
          </span>
        </div>

        <div className="p-8">
          <span className="ac-pill" style={{ color: "var(--ac-primary)" }}>
            <Lock width={12} height={12} /> Ab {tierLabel[tier]}
          </span>
          <h1 className="ac-h2 mt-4" style={{ fontSize: "clamp(22px,2.6vw,32px)" }}>{lesson.title}</h1>
          <p className="mt-2 text-sm" style={{ color: "var(--ac-ink-2)" }}>{lesson.summary}</p>

          <ul className="mx-auto mt-6 max-w-xs space-y-2 text-left">
            {tierPerks[tier].map((perk) => (
              <li key={perk} className="flex items-start gap-2.5 text-sm" style={{ color: "var(--ac-ink-2)" }}>
                <Check width={15} height={15} style={{ color: "var(--ac-primary)", flexShrink: 0, marginTop: 2 }} />
                {perk}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/pricing" className="ac-btn ac-btn-primary">
              {tierLabel[tier]} freischalten <ArrowRight width={16} height={16} />
            </Link>
            <Link href="/curriculum" className="ac-btn ac-btn-ghost">
              Zum Lehrplan
            </Link>
          </div>
          <p className="mt-4 text-xs" style={{ color: "var(--ac-ink-3)" }}>
            Monatlich kündbar · {lesson.duration} Min Inhalt · +{lesson.xp} XP
          </p>
        </div>
      </div>
    </div>
  )
}
