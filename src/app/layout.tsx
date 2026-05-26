import type { Metadata, Viewport } from "next"
import { DM_Sans, Syne } from "next/font/google"
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
  title: {
    default: "MadkourMedia — Branding. Content. Design.",
    template: "%s — MadkourMedia",
  },
  description:
    "Strategie, Content & Design für Unternehmen, die wachsen wollen. Ganzheitliche Markenkommunikation aus Zürich.",
  keywords: [
    "Branding",
    "Content Strategy",
    "Digital Design",
    "Motion",
    "Agentur",
    "Zürich",
    "Schweiz",
    "Markenkommunikation",
  ],
  metadataBase: new URL("https://www.madkourmedia.com"),
  authors: [{ name: "MadkourMedia", url: "https://www.madkourmedia.com" }],
  creator: "MadkourMedia",
  openGraph: {
    title: "MadkourMedia — Branding. Content. Design.",
    description:
      "Strategie, Content & Design für Unternehmen, die wachsen wollen.",
    url: "https://www.madkourmedia.com",
    siteName: "MadkourMedia",
    locale: "de_CH",
    type: "website",
    images: [
      {
        url: "/og-image.jpg", // place a 1200×630 image in /public
        width: 1200,
        height: 630,
        alt: "MadkourMedia — Branding. Content. Design.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "MadkourMedia — Branding. Content. Design.",
    description: "Strategie, Content & Design für Unternehmen, die wachsen wollen.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  // Next.js auto-detects src/app/icon.svg as favicon
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#080808",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}
