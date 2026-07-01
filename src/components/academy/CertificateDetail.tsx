"use client"

// Looks a certificate up in the seed data (public verification demo) and in
// the user's own store, then renders the printable card with a QR code.

import { useEffect, useState } from "react"
import Link from "next/link"
import QRCode from "qrcode"
import CertificateCard from "./CertificateCard"
import PrintButton from "./PrintButton"
import { Check } from "./ui/Icons"
import { getCertificate } from "@/lib/academy/data"
import { useAcademy } from "@/lib/academy/store"

export default function CertificateDetail({ id }: { id: string }) {
  const { state } = useAcademy()
  const cert = state.certificates.find((c) => c.id === id) ?? getCertificate(id)
  const [qrSvg, setQrSvg] = useState("")

  useEffect(() => {
    if (!cert) return
    const verifyUrl = `https://academy.madkourmedia.com/academy/verify/${cert.id}`
    QRCode.toString(verifyUrl, {
      type: "svg",
      margin: 0,
      color: { dark: "#16161a", light: "#0000" },
    })
      .then(setQrSvg)
      .catch(() => setQrSvg(""))
  }, [cert])

  if (!cert) {
    return (
      <div className="mx-auto max-w-xl px-5 py-24 text-center sm:px-8">
        <h1 className="ac-h2">Zertifikat nicht gefunden</h1>
        <p className="mt-4 text-sm" style={{ color: "var(--ac-ink-2)" }}>
          Unter dem Code <span className="font-mono">{id}</span> ist kein Zertifikat hinterlegt.
          Bestehe ein Abschluss-Quiz, um dein eigenes auszustellen.
        </p>
        <Link href="/academy/certificates" className="ac-btn ac-btn-primary mt-8">
          Zu den Zertifikaten
        </Link>
      </div>
    )
  }

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
