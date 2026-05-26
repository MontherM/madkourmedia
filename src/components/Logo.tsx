import Link from "next/link"

interface LogoProps {
  size?: "sm" | "md" | "lg"
  showText?: boolean
  onClick?: () => void
}

export default function Logo({ size = "md", showText = true, onClick }: LogoProps) {
  const dim = size === "sm" ? 20 : size === "lg" ? 32 : 26
  const nameSz = size === "sm" ? "11px" : size === "lg" ? "15px" : "13px"

  return (
    <Link href="/" onClick={onClick} className="flex items-center gap-3 group select-none">
      <svg
        width={dim}
        height={dim}
        viewBox="0 0 26 26"
        fill="none"
        className="flex-shrink-0 transition-transform duration-500 group-hover:rotate-180"
        style={{ transitionTimingFunction: "cubic-bezier(0.16,1,0.3,1)" }}
      >
        <rect x="0" y="0" width="11" height="11" fill="#6DBB7D" />
        <rect x="15" y="0" width="11" height="11" fill="#6DBB7D" />
        <rect x="7" y="15" width="11" height="11" fill="#6DBB7D" opacity="0.5" />
      </svg>
      {showText && (
        <div className="leading-none">
          <span
            className="font-display font-bold tracking-[0.18em] text-ink uppercase block"
            style={{ fontSize: nameSz }}
          >
            Madkour
          </span>
          <span className="label text-ink-3 block mt-[2px]">Media</span>
        </div>
      )}
    </Link>
  )
}
