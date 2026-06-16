import type { Metadata, Viewport } from "next"
import { DM_Sans, Syne } from "next/font/google"
import "./globals.css"
import PageLoader from "@/components/ui/PageLoader"
import CustomCursor from "@/components/ui/CustomCursor"

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
  title: "MadkourMedia — Branding. Content. Design.",
  description:
    "Strategie, Content & Design für Unternehmen, die wachsen wollen. Ganzheitliche Markenkommunikation aus Zürich.",
  keywords: ["Branding", "Content", "Design", "Agentur", "Zürich", "Schweiz", "Marketing"],
  openGraph: {
    title: "MadkourMedia — Branding. Content. Design.",
    description: "Strategie, Content & Design für Unternehmen, die wachsen wollen.",
    url: "https://www.madkourmedia.com",
    siteName: "MadkourMedia",
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
      {/*
        md:cursor-none hides the native cursor on desktop so
        CustomCursor can take over via mix-blend-difference.
      */}
      <body className="md:cursor-none">
        <PageLoader />
        <CustomCursor />
        {children}
      </body>
    </html>
  )
}
