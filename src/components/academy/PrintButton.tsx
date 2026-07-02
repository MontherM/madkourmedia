"use client"
import { Download } from "./ui/Icons"

export default function PrintButton({ className = "" }: { className?: string }) {
  return (
    <button onClick={() => window.print()} className={`ac-btn ac-btn-ghost ${className}`}>
      <Download width={16} height={16} /> Herunterladen / Drucken
    </button>
  )
}
