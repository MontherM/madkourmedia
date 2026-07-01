import type { Metadata } from "next"
import CurriculumClient from "@/components/academy/CurriculumClient"

export const metadata: Metadata = {
  title: "Lehrplan — AI Academy",
  description: "Der komplette Lernpfad: von AI Basics über Productivity bis AI Master – mit Quiz und Zertifikat pro Level.",
}

export default function CurriculumPage() {
  return <CurriculumClient />
}
