import type { Metadata } from "next"
import CommunityClient from "@/components/academy/CommunityClient"

export const metadata: Metadata = {
  title: "Community — AI Academy",
  description: "Fragen stellen, Workflows teilen, gemeinsam schneller lernen – die Community der AI Academy.",
}

export default function CommunityPage() {
  return <CommunityClient />
}
