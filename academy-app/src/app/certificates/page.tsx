import type { Metadata } from "next"
import CertificatesClient from "@/components/academy/CertificatesClient"

export const metadata: Metadata = {
  title: "Zertifikate — AI Academy",
  description: "Deine verifizierbaren Abschlusszertifikate mit QR-Code und LinkedIn-Badge.",
}

export default function CertificatesPage() {
  return <CertificatesClient />
}
