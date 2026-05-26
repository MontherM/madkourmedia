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
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  // Body scroll lock when menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-bg/92 backdrop-blur-xl border-b border-white/[0.05]"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between py-5">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-3 group"
            onClick={() => setOpen(false)}
          >
            <LogoMark className="h-[30px] w-auto text-ink transition-colors duration-300 group-hover:text-accent" />
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
            <Link href="#kontakt" className="btn-primary ml-2">
              Projekt starten
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className="md:hidden flex flex-col justify-center gap-[7px] w-8 h-8 z-50 relative"
          >
            <motion.span
              animate={open ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-px bg-ink origin-center"
            />
            <motion.span
              animate={open ? { opacity: 0, x: -6 } : { opacity: 1, x: 0 }}
              transition={{ duration: 0.18 }}
              className="block w-4 h-px bg-ink-3"
            />
            <motion.span
              animate={open ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="block w-6 h-px bg-ink origin-center"
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col justify-center px-[clamp(20px,6vw,48px)] md:hidden"
          >
            <nav className="flex flex-col">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: 0.15 + i * 0.07,
                    duration: 0.5,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-center justify-between py-5 border-b border-white/[0.08] group"
                  >
                    <span
                      className="font-display font-bold text-ink group-hover:text-accent transition-colors duration-300"
                      style={{
                        fontSize: "clamp(28px, 7vw, 44px)",
                        letterSpacing: "-0.02em",
                        lineHeight: 1,
                      }}
                    >
                      {link.label}
                    </span>
                    <span className="label text-ink-4 group-hover:text-accent transition-colors duration-300">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.42, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="mt-10"
            >
              <Link
                href="#kontakt"
                onClick={() => setOpen(false)}
                className="btn-primary"
              >
                Projekt starten
                <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                  <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
                </svg>
              </Link>
            </motion.div>

            {/* Bottom info */}
            <div className="absolute bottom-8 left-[clamp(20px,6vw,48px)] right-[clamp(20px,6vw,48px)] flex justify-between items-end">
              <span className="label text-ink-4">hello@madkourmedia.com</span>
              <span className="label text-ink-4">Zürich, Schweiz</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
