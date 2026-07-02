import Link from "next/link"
import { Sparkles } from "./ui/Icons"

const groups = [
  {
    title: "Lernen",
    links: [
      { href: "/academy/curriculum", label: "Lehrplan" },
      { href: "/academy/prompts", label: "Prompt-Bibliothek" },
      { href: "/academy/tools", label: "AI-Tool-Bibliothek" },
      { href: "/academy/certificates", label: "Zertifikate" },
      { href: "/academy/dashboard", label: "Dashboard" },
    ],
  },
  {
    title: "Plattform",
    links: [
      { href: "/academy/pricing", label: "Preise & Abos" },
      { href: "/academy#levels", label: "Levels" },
      { href: "/academy#community", label: "Community" },
      { href: "/", label: "MadkourMedia" },
    ],
  },
]

export default function AcademyFooter() {
  return (
    <footer className="border-t" style={{ borderColor: "var(--ac-border)" }}>
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <Link href="/academy" className="flex items-center gap-2 font-semibold">
              <span
                className="grid h-7 w-7 place-items-center rounded-lg"
                style={{ background: "linear-gradient(135deg, var(--ac-primary-2), var(--ac-primary))", color: "#fff" }}
              >
                <Sparkles width={15} height={15} />
              </span>
              <span style={{ fontFamily: "var(--font-syne)" }}>AI&nbsp;Academy</span>
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed" style={{ color: "var(--ac-ink-2)" }}>
              KI verstehen, anwenden und automatisieren. Die spezialisierte Lernplattform für den
              deutschsprachigen Raum.
            </p>
          </div>
          {groups.map((g) => (
            <div key={g.title}>
              <h4 className="text-xs font-semibold uppercase tracking-wider" style={{ color: "var(--ac-ink-3)" }}>
                {g.title}
              </h4>
              <ul className="mt-4 space-y-2.5">
                {g.links.map((l) => (
                  <li key={l.label}>
                    <Link href={l.href} className="text-sm transition-colors" style={{ color: "var(--ac-ink-2)" }}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div
          className="mt-12 flex flex-col items-start justify-between gap-3 border-t pt-6 text-xs sm:flex-row sm:items-center"
          style={{ borderColor: "var(--ac-border)", color: "var(--ac-ink-3)" }}
        >
          <span>© {new Date().getFullYear()} MadkourMedia · AI Academy</span>
          <span>Made in Zürich · Deutsch / English</span>
        </div>
      </div>
    </footer>
  )
}
