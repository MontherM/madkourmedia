export default function MarqueeBand() {
  const items = [
    "Branding",
    "Content Strategy",
    "Digital Design",
    "Motion & Film",
    "Corporate Identity",
    "Social Media",
    "Print & Editorial",
    "Web Design",
  ]

  const doubled = [...items, ...items]

  return (
    <div className="border-y border-white/[0.07] overflow-hidden py-[18px] bg-surface">
      <div
        className="flex whitespace-nowrap animate-marquee"
        style={{ width: "max-content" }}
      >
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-8 mx-8">
            <span
              className="font-display font-bold text-ink-3 uppercase"
              style={{ fontSize: "clamp(10px, 0.9vw, 13px)", letterSpacing: "0.14em" }}
            >
              {item}
            </span>
            {/* Architectural M mark as separator */}
            <svg
              viewBox="0 0 58 48"
              fill="currentColor"
              className="text-accent/35 flex-shrink-0"
              style={{ width: "11px", height: "9px" }}
              aria-hidden="true"
            >
              <rect x="0" y="0" width="11" height="48" />
              <rect x="0" y="38" width="15" height="10" />
              <rect x="14" y="8" width="10" height="40" />
              <path d="M24 8 L29 19 L34 8 Z" />
              <rect x="34" y="8" width="10" height="40" />
              <rect x="43" y="38" width="15" height="10" />
              <rect x="47" y="0" width="11" height="48" />
            </svg>
          </span>
        ))}
      </div>
    </div>
  )
}
