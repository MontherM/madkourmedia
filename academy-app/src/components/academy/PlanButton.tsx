"use client"

// Demo checkout: activates the plan in the local store. Swapped for the real
// Stripe checkout session in the payments phase without touching the page.

import { useState } from "react"
import type { Plan } from "@/lib/academy/types"
import { useAcademy, setPlan } from "@/lib/academy/store"
import { Check } from "./ui/Icons"

export default function PlanButton({
  plan,
  cta,
  highlighted,
}: {
  plan: Plan
  cta: string
  highlighted?: boolean
}) {
  const { state } = useAcademy()
  const [activated, setActivated] = useState(false)
  const isCurrent = state.plan === plan

  if (isCurrent) {
    return (
      <button className="ac-btn ac-btn-ghost mt-5 w-full cursor-default" style={{ color: "var(--ac-primary)" }} disabled>
        <Check width={16} height={16} /> Aktueller Plan
      </button>
    )
  }

  return (
    <div className="mt-5">
      <button
        onClick={() => {
          setPlan(plan)
          setActivated(true)
          setTimeout(() => setActivated(false), 2400)
        }}
        className={`ac-btn w-full ${highlighted ? "ac-btn-primary" : "ac-btn-ghost"}`}
      >
        {activated ? <><Check width={16} height={16} /> Aktiviert</> : cta}
      </button>
      <p className="mt-2 text-center text-[11px]" style={{ color: "var(--ac-ink-3)" }}>
        Demo-Aktivierung · Stripe-Checkout folgt
      </p>
    </div>
  )
}
