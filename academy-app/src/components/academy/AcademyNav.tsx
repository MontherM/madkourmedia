"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { useState } from "react"
import ThemeToggle from "./ThemeToggle"
import CommandPalette from "./CommandPalette"
import { Menu, Sparkles } from "./ui/Icons"

const links = [
  { href: "/curriculum", label: "Lehrplan" },
  { href: "/prompts", label: "Prompts" },
  { href: "/tools", label: "AI-Tools" },
  { href: "/community", label: "Community" },
  { href: "/pricing", label: "Preise" },
]

export default function AcademyNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header
      className="sticky top-0 z-50 backdrop-blur-xl"
      style={{
        background: "color-mix(in srgb, var(--ac-bg) 78%, transparent)",
        borderBottom: "1px solid var(--ac-border)",
      }}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8">
        <Link href="/" className="flex items-center gap-2 font-semibold tracking-tight">
          <span
            className="grid h-7 w-7 place-items-center rounded-lg"
            style={{ background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))", color: "#fff" }}
          >
            <Sparkles width={15} height={15} />
          </span>
          <span style={{ fontFamily: "var(--font-syne)" }}>AI&nbsp;Academy</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {links.map((l) => {
            const active = pathname?.startsWith(l.href)
            return (
              <Link
                key={l.href}
                href={l.href}
                className="rounded-lg px-3.5 py-2 text-sm transition-colors"
                style={{ color: active ? "var(--ac-ink)" : "var(--ac-ink-2)" }}
              >
                {l.label}
              </Link>
            )
          })}
        </div>

        <div className="flex items-center gap-2.5">
          <CommandPalette />
          <ThemeToggle />
          {/* Wrapper controls visibility: .ac-btn sets display and would beat `hidden`. */}
          <div className="hidden items-center gap-2.5 sm:flex">
            <Link href="/dashboard" className="ac-btn ac-btn-ghost !py-2 !px-4 !text-[13px]">
              Dashboard
            </Link>
            <Link href="/pricing" className="ac-btn ac-btn-primary !py-2 !px-4 !text-[13px]">
              Jetzt starten
            </Link>
          </div>
          <button
            className="grid h-9 w-9 place-items-center rounded-full md:hidden"
            style={{ border: "1px solid var(--ac-border)", color: "var(--ac-ink-2)" }}
            onClick={() => setOpen((o) => !o)}
            aria-label="Menü öffnen"
          >
            <Menu width={16} height={16} />
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t md:hidden" style={{ borderColor: "var(--ac-border)" }}>
          <div className="flex flex-col gap-1 px-5 py-4">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2.5 text-sm"
                style={{ color: "var(--ac-ink-2)" }}
              >
                {l.label}
              </Link>
            ))}
            <Link href="/dashboard" onClick={() => setOpen(false)} className="ac-btn ac-btn-ghost mt-2">
              Dashboard
            </Link>
            <Link href="/pricing" onClick={() => setOpen(false)} className="ac-btn ac-btn-primary mt-1">
              Jetzt starten
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
