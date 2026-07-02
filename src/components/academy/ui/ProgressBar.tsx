// Pure presentational progress bar using academy tokens.
export default function ProgressBar({
  value,
  className = "",
}: {
  /** 0..1 */
  value: number
  className?: string
}) {
  const pct = Math.round(Math.min(1, Math.max(0, value)) * 100)
  return (
    <div
      className={`h-1.5 w-full overflow-hidden rounded-full ${className}`}
      style={{ background: "var(--ac-surface-2)" }}
      role="progressbar"
      aria-valuenow={pct}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className="h-full rounded-full transition-[width] duration-700"
        style={{
          width: `${pct}%`,
          background: "linear-gradient(90deg, var(--ac-primary-2), var(--ac-primary))",
        }}
      />
    </div>
  )
}
