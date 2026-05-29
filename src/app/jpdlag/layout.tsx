import type { Metadata, Viewport } from "next"
import { DM_Sans } from "next/font/google"
import "./korb.css"

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans",
  weight: ["300", "400", "500"],
  display: "swap",
})

export const metadata: Metadata = {
  title: "JP DL AG — Real Estate Development & Consulting",
  description:
    "JP DL AG entwickelt und berät bei Immobilienprojekten mit architektonischem Anspruch und wirtschaftlicher Präzision. Standort Schweiz.",
  keywords: [
    "Immobilienentwicklung",
    "Projektentwicklung",
    "Immobilienberatung",
    "Schweiz",
    "ALBA Haus",
    "Real Estate",
  ],
  openGraph: {
    title: "JP DL AG — Real Estate Development & Consulting",
    description:
      "Projektentwicklung, Beratung und Architektur mit wirtschaftlichem Anspruch.",
    siteName: "JP DL AG",
    locale: "de_CH",
    type: "website",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function JpLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={dmSans.variable}>
      <body style={{ background: "#F9F8F5", color: "#111111" }}>{children}</body>
    </html>
  )
}
