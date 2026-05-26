"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"

const links = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Projekte", href: "#projekte" },
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

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : ""
    return () => { document.body.style.overflow = "" }
  }, [open])

  const close = () => setOpen(false)

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-bg/95 backdrop-blur-xl border-b border-white/[0.05]"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between py-5">
          {/* Logotype */}
          <Link href="/" onClick={close} className="flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
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
            <Link
              href="#kontakt"
              className="label text-black bg-accent px-5 py-2.5 hover:bg-[#7dd18d] transition-colors duration-300 ml-2"
            >
              Projekt starten
            </Link>
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            className="md:hidden relative w-8 h-8 flex flex-col items-end justify-center gap-1.5 p-1"
          >
            <motion.span
              animate={{ rotate: open ? 45 : 0, y: open ? 8 : 0, width: "20px" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px bg-ink origin-center"
              style={{ width: "20px" }}
            />
            <motion.span
              animate={{ opacity: open ? 0 : 1, x: open ? 8 : 0 }}
              transition={{ duration: 0.2 }}
              className="block h-px bg-ink-3"
              style={{ width: "12px" }}
            />
            <motion.span
              animate={{ rotate: open ? -45 : 0, y: open ? -8 : 0, width: "20px" }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="block h-px bg-ink origin-center"
              style={{ width: "20px" }}
            />
          </button>
        </div>
      </motion.header>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.55, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col justify-between md:hidden"
          >
            {/* Top spacer for header */}
            <div className="h-[72px]" />

            {/* Links */}
            <nav className="container-wide flex flex-col gap-0">
              {links.map((link, i) => (
                <div key={link.href} className="border-b border-white/[0.06] overflow-hidden">
                  <motion.div
                    initial={{ y: "100%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "100%" }}
                    transition={{
                      delay: 0.05 + i * 0.07,
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                  >
                    <Link
                      href={link.href}
                      onClick={close}
                      className="flex items-center justify-between py-5 group"
                    >
                      <span
                        className="font-display font-bold text-ink group-hover:text-accent transition-colors duration-300"
                        style={{
                          fontSize: "clamp(28px, 8vw, 52px)",
                          letterSpacing: "-0.025em",
                        }}
                      >
                        {link.label}
                      </span>
                      <span className="label text-ink-3 group-hover:text-accent transition-colors">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </Link>
                  </motion.div>
                </div>
              ))}
            </nav>

            {/* Bottom row */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="container-wide pb-10 flex items-center justify-between"
            >
              <Link href="#kontakt" onClick={close} className="btn-primary">
                Projekt starten →
              </Link>
              <a
                href="mailto:hello@madkourmedia.com"
                className="label text-ink-3 hover:text-ink transition-colors"
              >
                hello@madkourmedia.com
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
