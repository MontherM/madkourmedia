"use client"
import { useEffect, useState } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import Logo from "./Logo"

const links = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#projekte" },
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

  // Lock body scroll when mobile menu is open
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
          scrolled || open
            ? "bg-bg/95 backdrop-blur-xl border-b border-white/[0.05]"
            : "bg-transparent"
        }`}
      >
        <div className="container-wide flex items-center justify-between py-5">
          <Logo onClick={() => setOpen(false)} />

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

          {/* Hamburger — mobile only */}
          <button
            aria-label={open ? "Menü schliessen" : "Menü öffnen"}
            onClick={() => setOpen(!open)}
            className="md:hidden flex flex-col justify-center items-end gap-[6px] p-2 w-10 h-10"
          >
            <motion.span
              className="block h-px bg-ink origin-center"
              animate={{ width: 20, rotate: open ? 45 : 0, y: open ? 7.5 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block h-px bg-ink-3 origin-center"
              animate={{ width: open ? 20 : 13, opacity: open ? 0 : 1 }}
              transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            />
            <motion.span
              className="block h-px bg-ink origin-center"
              animate={{ width: 20, rotate: open ? -45 : 0, y: open ? -7.5 : 0 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            />
          </button>
        </div>
      </motion.header>

      {/* Mobile overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-bg flex flex-col pt-24 pb-10 md:hidden"
          >
            <div className="container-wide flex flex-col justify-between h-full">
              <nav className="flex flex-col">
                {links.map((link, i) => (
                  <motion.div
                    key={link.href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -24 }}
                    transition={{
                      delay: 0.1 + i * 0.07,
                      duration: 0.45,
                      ease: [0.16, 1, 0.3, 1],
                    }}
                    className="overflow-hidden border-b border-white/[0.06]"
                  >
                    <Link
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="block py-5 font-display font-bold text-ink hover:text-accent transition-colors duration-300"
                      style={{ fontSize: "clamp(28px, 6vw, 40px)", letterSpacing: "-0.02em" }}
                    >
                      {link.label}
                    </Link>
                  </motion.div>
                ))}
              </nav>

              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.38, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col gap-4"
              >
                <Link
                  href="#kontakt"
                  onClick={() => setOpen(false)}
                  className="btn-primary self-start"
                >
                  Projekt starten →
                </Link>
                <span className="label text-ink-4">hello@madkourmedia.com · Zürich</span>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
