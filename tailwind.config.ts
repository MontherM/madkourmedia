import type { Config } from "tailwindcss"

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#080808",
        surface: "#0E0E0E",
        "surface-2": "#141414",
        accent: "#6DBB7D",
        "accent-dim": "rgba(109,187,125,0.08)",
        ink: "#EFEFEF",
        "ink-2": "#A0A0A0",
        "ink-3": "#5C5C5C",
        "ink-4": "#2E2E2E",
      },
      fontFamily: {
        sans: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1440px",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        pulse: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.4" },
        },
        "scroll-down": {
          "0%": { transform: "translateY(0)", opacity: "1" },
          "75%": { transform: "translateY(6px)", opacity: "0" },
          "76%": { transform: "translateY(-6px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      animation: {
        marquee: "marquee 28s linear infinite",
        "fade-up": "fade-up 0.7s cubic-bezier(0.16,1,0.3,1) forwards",
        "pulse-slow": "pulse 3s ease-in-out infinite",
        "scroll-down": "scroll-down 1.8s ease-in-out infinite",
      },
    },
  },
  plugins: [],
}

export default config
