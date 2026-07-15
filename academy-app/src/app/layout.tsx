import type { Metadata, Viewport } from "next"
import { DM_Sans, Syne } from "next/font/google"
import ThemeProvider from "@/components/academy/ThemeProvider"
import AcademyNav from "@/components/academy/AcademyNav"
import AcademyFooter from "@/components/academy/AcademyFooter"
import "./globals.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
})

const syne = Syne({
  subsets: ["latin"],
  variable: "--font-syne",
  weight: ["700", "800"],
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL("https://academy.madkourmedia.com"),
  title: "AI Academy — KI verstehen, anwenden, automatisieren",
  description:
    "Die spezialisierte KI-Lernplattform für den deutschsprachigen Raum. Vom ersten Prompt bis zum eigenen KI-Agenten – mit Kursen, Prompt-Bibliothek, Tools, Community und Zertifikaten.",
  keywords: ["KI Kurs", "AI Academy", "ChatGPT lernen", "Prompting", "KI Automatisierung", "Künstliche Intelligenz"],
  openGraph: {
    title: "AI Academy — KI verstehen, anwenden, automatisieren",
    description: "Mache dich in wenigen Wochen 10x produktiver mit KI.",
    url: "https://academy.madkourmedia.com",
    siteName: "AI Academy",
    locale: "de_CH",
    type: "website",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${syne.variable}`}>
      <body>
        <ThemeProvider>
          <AcademyNav />
          <main>{children}</main>
          <AcademyFooter />
        </ThemeProvider>
      </body>
    </html>
  )
}
