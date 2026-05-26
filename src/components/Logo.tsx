// Madkour Media : Architectural M mark
// Recreated from brand identity: two stepped columns forming an M silhouette

interface LogoMarkProps {
  className?: string
}

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      viewBox="0 0 58 48"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      {/* Left outer pillar */}
      <rect x="0" y="0" width="11" height="48" />
      {/* Left base step */}
      <rect x="0" y="38" width="15" height="10" />
      {/* Left inner column */}
      <rect x="14" y="8" width="10" height="40" />
      {/* Center M peak */}
      <path d="M24 8 L29 19 L34 8 Z" />
      {/* Right inner column */}
      <rect x="34" y="8" width="10" height="40" />
      {/* Right base step */}
      <rect x="43" y="38" width="15" height="10" />
      {/* Right outer pillar */}
      <rect x="47" y="0" width="11" height="48" />
    </svg>
  )
}

export function LogoFull({ className }: LogoMarkProps) {
  return (
    <div className={`flex items-center gap-3 ${className ?? ""}`}>
      <LogoMark className="h-8 w-auto text-ink" />
      <div className="leading-none">
        <span className="font-display text-[13px] font-bold tracking-[0.18em] text-ink uppercase block">
          Madkour
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: "10px",
            fontWeight: 400,
            letterSpacing: "0.22em",
            textTransform: "uppercase",
          }}
          className="text-ink-3 block mt-[2px]"
        >
          Media
        </span>
      </div>
    </div>
  )
}
