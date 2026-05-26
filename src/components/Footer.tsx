import Link from "next/link"
import Logo from "./Logo"

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Services", href: "#projekte" },
  { label: "Über uns", href: "#about" },
  { label: "Kontakt", href: "#kontakt" },
]

const services = ["Brand Identity", "Content Strategy", "Digital Design", "Motion & Film"]

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
]

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="container-wide">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <Logo size="md" />
            <p className="body text-ink-3 max-w-[220px] leading-relaxed">
              Strategie, Content &amp; Design für Unternehmen, die wachsen wollen.
            </p>
            <div className="flex items-center gap-4 pt-1">
              <a
                href="https://instagram.com/madkourmedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-8 h-8 border border-white/[0.08] flex items-center justify-center hover:border-accent/40 transition-colors duration-300 group"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#5C5C5C" strokeWidth="1.5" className="group-hover:stroke-accent transition-colors duration-300">
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="4" />
                  <circle cx="17.5" cy="6.5" r="0.8" fill="#5C5C5C" stroke="none" className="group-hover:fill-accent transition-colors duration-300" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/madkourmedia"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn"
                className="w-8 h-8 border border-white/[0.08] flex items-center justify-center hover:border-accent/40 transition-colors duration-300 group"
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" stroke="#5C5C5C" strokeWidth="1.5" className="group-hover:stroke-accent transition-colors duration-300" />
                  <rect x="2" y="9" width="4" height="12" stroke="#5C5C5C" strokeWidth="1.5" className="group-hover:stroke-accent transition-colors duration-300" />
                  <circle cx="4" cy="4" r="2" stroke="#5C5C5C" strokeWidth="1.5" className="group-hover:stroke-accent transition-colors duration-300" />
                </svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-2 md:col-start-6 flex flex-col gap-3">
            <span className="label text-ink-4 mb-1">Navigation</span>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label text-ink-3 hover:text-ink transition-colors duration-300 link-underline self-start"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Services */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-3">
            <span className="label text-ink-4 mb-1">Leistungen</span>
            {services.map((s) => (
              <span key={s} className="label text-ink-3">
                {s}
              </span>
            ))}
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3 md:col-start-10 flex flex-col gap-3">
            <span className="label text-ink-4 mb-1">Kontakt</span>
            <a
              href="mailto:hello@madkourmedia.com"
              className="label text-ink-3 hover:text-accent transition-colors duration-300 link-underline self-start"
            >
              hello@madkourmedia.com
            </a>
            <span className="label text-ink-3">Zürich, Schweiz</span>
            <Link href="#kontakt" className="btn-primary self-start mt-3">
              Projekt starten →
            </Link>
          </div>
        </div>

        {/* Divider + copyright */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/[0.04]">
          <span className="label text-ink-4">
            © {year} MadkourMedia. Alle Rechte vorbehalten.
          </span>
          <div className="flex items-center gap-6">
            {legalLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label text-ink-4 hover:text-ink-3 transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
