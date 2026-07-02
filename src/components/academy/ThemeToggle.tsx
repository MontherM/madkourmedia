"use client"
import { useTheme } from "./ThemeProvider"
import { Sun, Moon } from "./ui/Icons"

export default function ThemeToggle() {
  const { theme, toggle } = useTheme()
  return (
    <button
      onClick={toggle}
      aria-label={theme === "dark" ? "Zu hellem Design wechseln" : "Zu dunklem Design wechseln"}
      className="grid h-9 w-9 place-items-center rounded-full transition-colors"
      style={{ border: "1px solid var(--ac-border)", color: "var(--ac-ink-2)" }}
    >
      {theme === "dark" ? <Moon width={16} height={16} /> : <Sun width={16} height={16} />}
    </button>
  )
}
