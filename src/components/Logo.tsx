/**
 * MadkourMedia Logo — SVG-Nachbau des geometrischen M-Marks
 * Zwei architektonische Türme formen gemeinsam ein M.
 * fill="currentColor" → funktioniert auf hell & dunkel.
 */

interface LogoMarkProps {
  size?: number
  className?: string
}

export function LogoMark({ size = 32, className = "" }: LogoMarkProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 90"
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      {/* Outer hexagonal frame — very subtle */}
      <path
        d="M50 2L96 26V64L50 88L4 64V26L50 2Z"
        fill="currentColor"
        opacity="0.06"
      />

      {/* Left tower */}
      <path d="M8 80V34L20 20H34V80H8Z" />

      {/* Left diagonal arm → center valley */}
      <path d="M34 20L34 46L50 62L50 80H38V58L34 54V20Z" />

      {/* Right diagonal arm → center valley */}
      <path d="M50 62L66 46L66 20V54L62 58V80H50V62Z" />

      {/* Right tower */}
      <path d="M66 20H80L92 34V80H66V20Z" />

      {/* Horizontal floor lines on left tower */}
      <rect x="8" y="50" width="26" height="1.5" fill="currentColor" opacity="0.3" />
      <rect x="8" y="64" width="26" height="1.5" fill="currentColor" opacity="0.3" />

      {/* Horizontal floor lines on right tower */}
      <rect x="66" y="50" width="26" height="1.5" fill="currentColor" opacity="0.3" />
      <rect x="66" y="64" width="26" height="1.5" fill="currentColor" opacity="0.3" />
    </svg>
  )
}

interface LogoFullProps {
  className?: string
  size?: "sm" | "md" | "lg"
}

const sizeMap = {
  sm: { mark: 24, title: "11px", sub: "8px" },
  md: { mark: 30, title: "13px", sub: "9px" },
  lg: { mark: 40, title: "17px", sub: "11px" },
}

export function LogoFull({ className = "", size = "md" }: LogoFullProps) {
  const s = sizeMap[size]
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <LogoMark size={s.mark} />
      <div className="leading-none">
        <span
          style={{
            fontFamily: "var(--font-syne), system-ui, sans-serif",
            fontSize: s.title,
            fontWeight: 800,
            letterSpacing: "0.2em",
            textTransform: "uppercase" as const,
            display: "block",
            lineHeight: 1,
          }}
        >
          Madkour
        </span>
        <span
          style={{
            fontFamily: "var(--font-dm-sans), system-ui, sans-serif",
            fontSize: s.sub,
            fontWeight: 300,
            letterSpacing: "0.28em",
            textTransform: "uppercase" as const,
            display: "block",
            marginTop: "3px",
            opacity: 0.45,
          }}
        >
          Media
        </span>
      </div>
    </div>
  )
}
