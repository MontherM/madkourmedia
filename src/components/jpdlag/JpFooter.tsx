import Link from "next/link"

const navLinks = [
  { label: "Leistungen", href: "#leistungen" },
  { label: "Projekte", href: "#alba" },
  { label: "Uber uns", href: "#ueber-uns" },
  { label: "Kontakt", href: "#kontakt" },
]

const services = [
  "Projektentwicklung",
  "Immobilienberatung",
  "Standortanalyse",
  "Baumanagement",
  "Vermarktung",
]

export default function JpFooter() {
  return (
    <footer className="bg-jp-ink pt-16 pb-10">
      <div className="container-wide">
        {/* Top row */}
        <div className="grid grid-cols-2 md:grid-cols-12 gap-12 md:gap-8 mb-16 md:mb-20">

          {/* Brand */}
          <div className="col-span-2 md:col-span-4 flex flex-col gap-5">
            <div className="flex items-center gap-3">
              <div
                className="w-7 h-7 flex items-center justify-center flex-shrink-0"
                style={{ background: "rgba(255,255,255,0.1)" }}
              >
                <span
                  className="font-jp-display font-bold text-white"
                  style={{ fontSize: "10px", letterSpacing: "0.05em" }}
                >
                  JP
                </span>
              </div>
              <div className="leading-none">
                <span
                  className="font-jp-display font-bold text-white block"
                  style={{ fontSize: "12px", letterSpacing: "0.14em" }}
                >
                  JP DL AG
                </span>
                <span
                  className="block mt-[2px]"
                  style={{ fontSize: "9px", letterSpacing: "0.18em", textTransform: "uppercase", color: "rgba(255,255,255,0.35)" }}
                >
                  Real Estate Development
                </span>
              </div>
            </div>
            <p
              style={{ fontSize: "13px", fontWeight: 300, lineHeight: 1.7, color: "rgba(255,255,255,0.4)", maxWidth: "220px" }}
            >
              Immobilienentwicklung und Beratung mit architektonischem
              Anspruch. Standort Schweiz.
            </p>
          </div>

          {/* Navigation */}
          <div className="col-span-1 md:col-span-2 md:col-start-6 flex flex-col gap-4">
            <span
              style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}
            >
              Navigation
            </span>
            {navLinks.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.45)" }}
                className="hover:text-white transition-colors duration-200"
              >
                {l.label}
              </Link>
            ))}
          </div>

          {/* Leistungen */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-4">
            <span
              style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}
            >
              Leistungen
            </span>
            {services.map((s) => (
              <span
                key={s}
                style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)" }}
              >
                {s}
              </span>
            ))}
          </div>

          {/* Contact */}
          <div className="col-span-2 md:col-span-3 md:col-start-10 flex flex-col gap-4">
            <span
              style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(255,255,255,0.25)" }}
            >
              Kontakt
            </span>
            <a
              href="mailto:info@jpdlag.ch"
              className="hover:text-white transition-colors duration-200"
              style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.45)" }}
            >
              info@jpdlag.ch
            </a>
            <span style={{ fontSize: "12px", fontWeight: 300, color: "rgba(255,255,255,0.35)" }}>
              Schweiz
            </span>
            <Link
              href="#kontakt"
              className="text-white self-start mt-2 hover:opacity-80 transition-opacity duration-200"
              style={{
                fontSize: "10px",
                fontWeight: 500,
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                padding: "12px 20px",
                background: "rgba(255,255,255,0.1)",
                display: "inline-flex",
                alignItems: "center",
                gap: "6px",
              }}
            >
              Kontakt aufnehmen
            </Link>
          </div>
        </div>

        {/* Bottom */}
        <div
          className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8"
          style={{ borderTop: "1px solid rgba(255,255,255,0.06)" }}
        >
          <span style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}>
            &copy; {new Date().getFullYear()} JP DL AG. Alle Rechte vorbehalten.
          </span>
          <div className="flex items-center gap-6">
            {["Impressum", "Datenschutz"].map((l) => (
              <Link
                key={l}
                href="#"
                className="hover:text-white transition-colors duration-200"
                style={{ fontSize: "10px", letterSpacing: "0.1em", color: "rgba(255,255,255,0.2)" }}
              >
                {l}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
