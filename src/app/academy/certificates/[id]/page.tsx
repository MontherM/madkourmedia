import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import QRCode from "qrcode"
import CertificateCard from "@/components/academy/CertificateCard"
import PrintButton from "@/components/academy/PrintButton"
import { Check } from "@/components/academy/ui/Icons"
import { getCertificates, getCertificate } from "@/lib/academy/data"

export function generateStaticParams() {
  return getCertificates().map((c) => ({ id: c.id }))
}

export function generateMetadata({ params }: { params: { id: string } }): Metadata {
  const cert = getCertificate(params.id)
  return { title: cert ? `Zertifikat ${cert.id} — AI Academy` : "Zertifikat — AI Academy" }
}

export default async function CertificateDetailPage({ params }: { params: { id: string } }) {
  const cert = getCertificate(params.id)
  if (!cert) notFound()

  const verifyUrl = `https://academy.madkourmedia.com/academy/verify/${cert.id}`
  const qrSvg = await QRCode.toString(verifyUrl, {
    type: "svg",
    margin: 0,
    color: { dark: "#16161a", light: "#0000" },
  })

  return (
    <div className="mx-auto max-w-3xl px-5 py-14 sm:px-8">
      <div className="mb-6 flex items-center justify-between print:hidden">
        <Link href="/academy/certificates" className="text-sm hover:underline" style={{ color: "var(--ac-ink-3)" }}>
          ← Alle Zertifikate
        </Link>
        <span className="inline-flex items-center gap-1.5 text-sm" style={{ color: "var(--ac-primary)" }}>
          <Check width={15} height={15} /> Verifiziert
        </span>
      </div>

      <CertificateCard cert={cert} qrSvg={qrSvg} />

      <div className="mt-8 flex flex-wrap items-center justify-center gap-3 print:hidden">
        <PrintButton />
        <a
          href={`https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${encodeURIComponent(cert.levelTitle)}&organizationName=${encodeURIComponent("MadkourMedia AI Academy")}&certId=${cert.id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="ac-btn ac-btn-primary"
        >
          Zu LinkedIn hinzufügen
        </a>
      </div>

      <p className="mt-6 text-center text-xs print:hidden" style={{ color: "var(--ac-ink-3)" }}>
        Verifizierungscode <span className="font-mono">{cert.id}</span> · ausgestellt für {cert.recipient}
      </p>
    </div>
  )
}
