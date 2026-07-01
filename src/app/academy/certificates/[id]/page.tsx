import type { Metadata } from "next"
import CertificateDetail from "@/components/academy/CertificateDetail"
import { getCertificates } from "@/lib/academy/data"

// Seed certificates are prerendered; user-issued codes resolve client-side.
export function generateStaticParams() {
  return getCertificates().map((c) => ({ id: c.id }))
}

export const dynamicParams = true

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  return { title: `Zertifikat ${params.id} — AI Academy` }
}

export default function CertificateDetailPage({ params }: { params: { id: string } }) {
  return <CertificateDetail id={params.id} />
}
