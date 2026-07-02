import { Sparkles } from "./ui/Icons"
import type { Certificate } from "@/lib/academy/types"

/** Pure, printable certificate visual. `qrSvg` is a server-rendered QR SVG string. */
export default function CertificateCard({
  cert,
  qrSvg,
}: {
  cert: Certificate
  qrSvg: string
}) {
  const issued = new Date(cert.issuedAt).toLocaleDateString("de-CH", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  })

  return (
    <div
      id="certificate"
      className="relative mx-auto w-full max-w-2xl overflow-hidden rounded-3xl bg-white text-[#16161a]"
      style={{ border: "1px solid rgba(15,15,25,0.1)", boxShadow: "var(--ac-shadow)" }}
    >
      {/* Top accent */}
      <div className="h-2 w-full" style={{ background: "linear-gradient(90deg, #b53a0c, #e4572e)" }} />

      <div className="px-8 py-10 sm:px-12 sm:py-12">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="grid h-7 w-7 place-items-center rounded-lg text-white" style={{ background: "linear-gradient(135deg, #b53a0c, #e4572e)" }}>
              <Sparkles width={15} height={15} />
            </span>
            <span style={{ fontFamily: "var(--font-syne)" }}>AI&nbsp;Academy</span>
          </div>
          <span className="text-[11px] uppercase tracking-[0.22em] text-[#8a8a93]">Zertifikat</span>
        </div>

        <div className="mt-10 text-center">
          <p className="text-sm text-[#55555f]">Hiermit wird bestätigt, dass</p>
          <p className="mt-3 text-4xl font-bold sm:text-5xl" style={{ fontFamily: "var(--font-syne)" }}>
            {cert.recipient}
          </p>
          <p className="mt-4 text-sm text-[#55555f]">erfolgreich abgeschlossen hat</p>
          <p className="mt-2 text-xl font-semibold" style={{ color: "#b53a0c" }}>
            {cert.levelTitle}
          </p>
        </div>

        <div className="mt-10 flex items-end justify-between gap-6">
          <div className="space-y-3 text-sm">
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#8a8a93]">Ausgestellt am</p>
              <p className="font-medium">{issued}</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#8a8a93]">Ergebnis</p>
              <p className="font-medium">{Math.round(cert.score * 100)}%</p>
            </div>
            <div>
              <p className="text-[11px] uppercase tracking-wider text-[#8a8a93]">Verifizierungscode</p>
              <p className="font-mono font-medium">{cert.id}</p>
            </div>
          </div>

          <div className="text-center">
            <div
              className="h-24 w-24 rounded-lg bg-white p-1.5"
              style={{ border: "1px solid rgba(15,15,25,0.1)" }}
              dangerouslySetInnerHTML={{ __html: qrSvg }}
            />
            <p className="mt-1.5 text-[10px] text-[#8a8a93]">Scan zum Verifizieren</p>
          </div>
        </div>

        <div className="mt-8 border-t pt-5 text-center text-[11px] text-[#8a8a93]" style={{ borderColor: "rgba(15,15,25,0.08)" }}>
          MadkourMedia · AI Academy — verifizierbar unter /academy/verify/{cert.id}
        </div>
      </div>
    </div>
  )
}
