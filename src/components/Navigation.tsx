"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const links = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Projekte", href: "#projekte" },
  { label: "Kontakt", href: "#kontakt" },
]

export default function Navigation() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-bg/90 backdrop-blur-xl border-b border-white/[0.05]"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between py-5">
        {/* Logotype */}
        <Link href="/" className="flex items-center gap-3 group">
          <svg
            width="26"
            height="26"
            viewBox="0 0 26 26"
            fill="none"
            className="flex-shrink-0"
          >
            <rect x="0" y="0" width="11" height="11" fill="#6DBB7D" />
            <rect x="15" y="0" width="11" height="11" fill="#6DBB7D" />
            <rect x="7" y="15" width="11" height="11" fill="#6DBB7D" opacity="0.5" />
          </svg>
          <div className="leading-none">
            <span className="font-display text-[13px] font-bold tracking-[0.18em] text-ink uppercase block">
              Madkour
            </span>
            <span className="label text-ink-3 block mt-[2px]">Media</span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-9">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="label text-ink-3 hover:text-ink transition-colors duration-300 link-underline"
            >
              {link.label}
            </Link>
          ))}
          <a
            href={process.env.NEXT_PUBLIC_ACADEMY_URL ?? "https://academy.madkourmedia.com"}
            className="label text-accent hover:text-ink transition-colors duration-300 link-underline"
          >
            AI Academy
          </a>
          <Link
            href="#kontakt"
            className="label text-black bg-accent px-5 py-2.5 hover:bg-[#7dd18d] transition-colors duration-300 ml-2"
          >
            Projekt starten
          </Link>
        </nav>

        {/* Mobile menu toggle — simplified */}
        <button
          aria-label="Menü öffnen"
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span className="block w-5 h-px bg-ink" />
          <span className="block w-3 h-px bg-ink-3" />
        </button>
      </div>
    </motion.header>
  )
}
