"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Home, Book, Sparkles, Grid, User } from "./ui/Icons"

const tabs = [
  { href: "/academy", label: "Start", icon: Home, exact: true },
  { href: "/academy/curriculum", label: "Lernen", icon: Book },
  { href: "/academy/prompts", label: "Prompts", icon: Sparkles },
  { href: "/academy/tools", label: "Tools", icon: Grid },
  { href: "/academy/dashboard", label: "Profil", icon: User },
]

export default function MobileTabBar() {
  const pathname = usePathname() ?? ""

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-50 md:hidden"
      style={{
        background: "color-mix(in srgb, var(--ac-bg) 88%, transparent)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        borderTop: "1px solid var(--ac-border)",
        paddingBottom: "env(safe-area-inset-bottom)",
      }}
    >
      <ul className="flex items-stretch justify-around px-1">
        {tabs.map((t) => {
          const active = t.exact ? pathname === t.href : pathname.startsWith(t.href)
          const Icon = t.icon
          return (
            <li key={t.href} className="flex-1">
              <Link
                href={t.href}
                className="flex flex-col items-center gap-1 py-2.5 text-[10px] font-medium transition-colors"
                style={{ color: active ? "var(--ac-primary)" : "var(--ac-ink-3)" }}
              >
                <Icon width={21} height={21} />
                {t.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
