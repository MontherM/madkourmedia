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
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    title: "AI Academy",
    statusBarStyle: "black-translucent",
  },
  icons: {
    icon: [
      { url: "/favicon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: "/apple-touch-icon.png",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0f" },
    { media: "(prefers-color-scheme: light)", color: "#fbfbfd" },
  ],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={`${dmSans.variable} ${syne.variable}`}>
      <body>{children}</body>
    </html>
  )
}
