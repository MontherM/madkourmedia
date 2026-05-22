import Link from "next/link"

const navLinks = [
  { label: "Portfolio", href: "#portfolio" },
  { label: "Projekte", href: "#projekte" },
  { label: "Über uns", href: "#about" },
  { label: "Kontakt", href: "#kontakt" },
]

const legalLinks = [
  { label: "Impressum", href: "/impressum" },
  { label: "Datenschutz", href: "/datenschutz" },
]

export default function Footer() {
  return (
    <footer className="border-t border-white/[0.06] pt-16 pb-10">
      <div className="container-wide">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-20">
          {/* Brand */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                <rect x="0" y="0" width="11" height="11" fill="#6DBB7D" />
                <rect x="15" y="0" width="11" height="11" fill="#6DBB7D" />
                <rect x="7" y="15" width="11" height="11" fill="#6DBB7D" opacity="0.5" />
              </svg>
              <div className="leading-none">
                <span className="font-display text-[12px] font-bold tracking-[0.18em] text-ink uppercase block">
                  Madkour
                </span>
                <span className="label text-ink-3 block mt-[2px]">Media</span>
              </div>
            </div>
            <p className="body text-ink-3 max-w-[220px] leading-relaxed">
              Strategie, Content &amp; Design für Unternehmen, die wachsen wollen.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-2 md:col-start-6 flex flex-col gap-4">
            <span className="label text-ink-4">Navigation</span>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="label text-ink-3 hover:text-ink transition-colors duration-300"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Leistungen */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <span className="label text-ink-4">Leistungen</span>
            {["Brand Identity", "Content Strategy", "Digital Design", "Motion & Film"].map((s) => (
              <span key={s} className="label text-ink-3">{s}</span>
            ))}
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3 md:col-start-10 flex flex-col gap-4">
            <span className="label text-ink-4">Kontakt</span>
            <a
              href="mailto:hello@madkourmedia.com"
              className="label text-ink-3 hover:text-accent transition-colors duration-300 link-underline"
            >
              hello@madkourmedia.com
            </a>
            <span className="label text-ink-3">Zürich, Schweiz</span>
            <Link href="#kontakt" className="btn-primary self-start mt-2">
              Projekt starten →
            </Link>
          </div>
        </div>

        {/* Bottom row */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-white/[0.04]">
          <span className="label text-ink-4">
            © {new Date().getFullYear()} MadkourMedia. Alle Rechte vorbehalten.
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
