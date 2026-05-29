"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"

const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#alba" },
  { label: "Über uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
]

export default function JpNavigation() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

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
          ? "bg-jp-bg/90 backdrop-blur-xl border-b border-black/[0.06]"
          : "bg-transparent"
      }`}
    >
      <div className="container-wide flex items-center justify-between py-5">
        {/* Logo */}
        <Link href="/jpdlag" className="flex items-center gap-3 group">
          <div className="w-7 h-7 bg-jp-accent flex items-center justify-center flex-shrink-0">
            <span
              className="font-display font-bold text-white"
              style={{ fontSize: "10px", letterSpacing: "0.05em" }}
            >
              JP
            </span>
          </div>
          <div className="leading-none">
            <span
              className="font-display font-bold text-jp-ink block"
              style={{ fontSize: "13px", letterSpacing: "0.14em" }}
            >
              JP DL AG
            </span>
            <span
              className="text-jp-ink-3 block mt-[2px]"
              style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              Real Estate
            </span>
          </div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-jp-ink-3 hover:text-jp-ink transition-colors duration-300"
              style={{ fontSize: "11px", letterSpacing: "0.16em", textTransform: "uppercase", fontWeight: 400 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#kontakt"
            className="text-white bg-jp-accent hover:bg-jp-accent-hover transition-colors duration-300 ml-2"
            style={{
              fontSize: "11px",
              fontWeight: 500,
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              padding: "12px 24px",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            Kontakt aufnehmen
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          aria-label="Menü öffnen"
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
        >
          <span
            className={`block h-px bg-jp-ink transition-all duration-300 ${menuOpen ? "w-5 rotate-45 translate-y-[7px]" : "w-5"}`}
          />
          <span
            className={`block h-px bg-jp-ink-3 transition-all duration-300 ${menuOpen ? "opacity-0 w-3" : "w-3"}`}
          />
          <span
            className={`block h-px bg-jp-ink transition-all duration-300 ${menuOpen ? "w-5 -rotate-45 -translate-y-[7px]" : "w-5"}`}
          />
        </button>
      </div>

      {/* Mobile menu */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="md:hidden overflow-hidden border-t border-black/[0.06] bg-jp-bg"
      >
        <div className="container-wide py-6 flex flex-col gap-5">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-jp-ink-2 hover:text-jp-ink transition-colors duration-200"
              style={{ fontSize: "15px", fontWeight: 300 }}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#kontakt"
            onClick={() => setMenuOpen(false)}
            className="text-white bg-jp-accent self-start mt-2"
            style={{ fontSize: "11px", letterSpacing: "0.14em", textTransform: "uppercase", padding: "12px 24px" }}
          >
            Kontakt aufnehmen
          </Link>
        </div>
      </motion.div>
    </motion.header>
  )
}
