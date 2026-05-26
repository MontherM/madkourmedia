"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { LogoMark } from "./Logo"

const links = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Leistungen", href: "#projekte" },
  { label: "Über uns", href: "#about" },
  { label: "Kontakt", href: "#kontakt" },
]

export default function Navigation() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      {/*
        FLOATING GLASS PILL NAV
        Emil Kowalski / Taste-Skill Module A:
        "Navbar is a floating glass pill, detached from the top"
        backdrop-blur only on fixed elements (performance rule)
      */}
      <div className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: -20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="pointer-events-auto w-full max-w-[780px]"
        >
          {/* Outer bezel ring — Double-Bezel pattern (soft-skill) */}
          <div
            style={{
              padding: "1.5px",
              borderRadius: "9999px",
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            {/* Inner pill */}
            <div
              className="flex items-center justify-between gap-2 px-4 py-2.5 rounded-full"
              style={{
                background: scrolled
                  ? "rgba(6,6,6,0.90)"
                  : "rgba(8,8,8,0.75)",
                backdropFilter: "blur(24px) saturate(180%)",
                WebkitBackdropFilter: "blur(24px) saturate(180%)",
                borderRadius: "9999px",
                boxShadow: "inset 0 1px 0 rgba(255,255,255,0.06)",
                transition: "background 0.4s ease",
              }}
            >
              {/* Logo */}
              <Link
                href="/"
                onClick={() => setOpen(false)}
                className="flex items-center gap-2.5 flex-shrink-0 group"
              >
                <LogoMark
                  className="h-[22px] w-auto text-ink transition-colors duration-300 group-hover:text-accent"
                />
                <span
                  className="hidden sm:block font-display font-bold uppercase text-ink"
                  style={{ fontSize: "12px", letterSpacing: "0.16em" }}
                >
                  MadkourMedia
                </span>
              </Link>

              {/* Desktop links */}
              <nav className="hidden md:flex items-center gap-5">
                {links.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="label text-ink-3 hover:text-ink transition-colors duration-250 relative group"
                    style={{ transitionTimingFunction: "var(--ease-spring)" }}
                  >
                    {link.label}
                    {/* Underline dot on hover — Emil micro-interaction */}
                    <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-accent transition-all duration-300 group-hover:w-full" style={{ transitionTimingFunction: "var(--ease-spring)" }} />
                  </Link>
                ))}
              </nav>

              {/* Right side: CTA + hamburger */}
              <div className="flex items-center gap-2">
                {/* Pill CTA button (Button-in-Button from taste-skill) */}
                <Link href="#kontakt" className="btn-pill hidden md:inline-flex">
                  Projekt starten
                  <span className="btn-icon-wrap">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                      <path d="M1 7L7 1M7 1H1M7 1V7" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </Link>

                {/* Mobile hamburger */}
                <button
                  onClick={() => setOpen(!open)}
                  aria-label={open ? "Menü schließen" : "Menü öffnen"}
                  className="md:hidden flex flex-col justify-center gap-[6px] w-7 h-7 ml-1"
                >
                  <motion.span
                    animate={open ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="block w-5 h-px bg-ink origin-center"
                  />
                  <motion.span
                    animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.18 }}
                    className="block w-3.5 h-px bg-ink-3"
                  />
                  <motion.span
                    animate={open ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                    transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
                    className="block w-5 h-px bg-ink origin-center"
                  />
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ── Mobile overlay menu ── */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 flex flex-col justify-center md:hidden"
            style={{ background: "rgba(6,6,6,0.97)", backdropFilter: "blur(32px)", WebkitBackdropFilter: "blur(32px)" }}
          >
            <nav className="container-wide flex flex-col">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ delay: 0.12 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 border-b border-white/[0.07] group"
                  >
                    <span
                      className="font-display font-bold text-ink group-hover:text-accent transition-colors duration-250"
                      style={{ fontSize: "clamp(30px, 7vw, 48px)", letterSpacing: "-0.02em", lineHeight: 1 }}
                    >
                      {link.label}
                    </span>
                    <span className="label text-ink-4 group-hover:text-accent transition-colors duration-250">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.4, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="mt-10"
              >
                <Link href="#kontakt" onClick={() => setOpen(false)} className="btn-primary">
                  Projekt starten
                  <span className="btn-icon-wrap">
                    <svg width="8" height="8" viewBox="0 0 8 8" fill="none" aria-hidden>
                      <path d="M1 7L7 1M7 1H1M7 1V7" stroke="currentColor" strokeWidth="1.3" />
                    </svg>
                  </span>
                </Link>
              </motion.div>
            </nav>

            <div className="absolute bottom-8 container-wide flex justify-between">
              <span className="label text-ink-4">hello@madkourmedia.com</span>
              <span className="label text-ink-4">Zürich, Schweiz</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
