"use client"
import { useState } from "react"
import { Copy, Check } from "./ui/Icons"
import { recordPromptCopy } from "@/lib/academy/store"

export default function CopyButton({
  text,
  label = "Prompt kopieren",
  className = "",
}: {
  text: string
  label?: string
  className?: string
}) {
  const [copied, setCopied] = useState(false)

  const onCopy = async () => {
    try {
      await navigator.clipboard.writeText(text)
      recordPromptCopy()
      setCopied(true)
      setTimeout(() => setCopied(false), 1600)
    } catch {
      /* clipboard unavailable */
    }
  }

  return (
    <button
      onClick={onCopy}
      className={`ac-btn ${copied ? "ac-btn-primary" : "ac-btn-ghost"} !py-2 !px-3.5 !text-[13px] ${className}`}
    >
      {copied ? <Check width={15} height={15} /> : <Copy width={15} height={15} />}
      {copied ? "Kopiert" : label}
    </button>
  )
}
