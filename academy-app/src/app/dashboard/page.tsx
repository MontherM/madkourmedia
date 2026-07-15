import type { Metadata } from "next"
import DashboardClient from "@/components/academy/DashboardClient"

export const metadata: Metadata = {
  title: "Dashboard — AI Academy",
  description: "Dein Lernfortschritt: XP, Streak, Badges, Zertifikate und Wochenziel.",
}

export default function DashboardPage() {
  return <DashboardClient />
}
