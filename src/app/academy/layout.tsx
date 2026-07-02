import type { Metadata } from "next"
import ThemeProvider from "@/components/academy/ThemeProvider"
import AcademyNav from "@/components/academy/AcademyNav"
import AcademyFooter from "@/components/academy/AcademyFooter"

export const metadata: Metadata = {
  title: "AI Academy — KI verstehen, anwenden, automatisieren",
  description:
    "Die spezialisierte KI-Lernplattform für den deutschsprachigen Raum. Vom ersten Prompt bis zum eigenen KI-Agenten – mit Kursen, Prompt-Bibliothek, Tools, Community und Zertifikaten.",
  keywords: ["KI Kurs", "AI Academy", "ChatGPT lernen", "Prompting", "KI Automatisierung", "Künstliche Intelligenz"],
  openGraph: {
    title: "AI Academy — KI verstehen, anwenden, automatisieren",
    description: "Mache dich in wenigen Wochen 10x produktiver mit KI.",
    siteName: "AI Academy",
    locale: "de_CH",
    type: "website",
  },
}

export default function AcademyLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AcademyNav />
      <main>{children}</main>
      <AcademyFooter />
    </ThemeProvider>
  )
}
