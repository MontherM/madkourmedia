import type { Metadata } from "next"
import AdminClient from "@/components/academy/AdminClient"

export const metadata: Metadata = {
  title: "Admin — AI Academy",
  description: "Content-Übersicht und CMS-Vorschau der AI Academy.",
  robots: { index: false, follow: false },
}

export default function AdminPage() {
  return <AdminClient />
}
