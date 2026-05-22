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
    <div className="border-y border-white/[0.06] overflow-hidden py-4 bg-surface">
      <div className="flex whitespace-nowrap animate-marquee" style={{ width: "max-content" }}>
        {doubled.map((item, i) => (
          <span key={i} className="flex items-center gap-6 mx-6">
            <span className="label text-ink-3">{item}</span>
            <span className="w-1 h-1 rounded-full bg-accent opacity-50 flex-shrink-0" />
          </span>
        ))}
      </div>
    </div>
  )
}
