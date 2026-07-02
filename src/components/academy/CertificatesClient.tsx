"use client"

import Link from "next/link"
import Reveal from "@/components/academy/ui/Reveal"
import { Trophy, ArrowRight, Lock } from "@/components/academy/ui/Icons"
import { getLevels, getQuizForLevel } from "@/lib/academy/data"
import { useAcademy } from "@/lib/academy/store"

export default function CertificatesClient() {
  const { state } = useAcademy()
  const levels = getLevels()

  return (
    <div className="mx-auto max-w-4xl px-5 py-16 sm:px-8">
      <Reveal>
        <span className="ac-eyebrow">Zertifikate</span>
        <h1 className="ac-h2 mt-3">Beweise, was du kannst.</h1>
        <p className="mt-4 max-w-2xl text-lg" style={{ color: "var(--ac-ink-2)" }}>
          Bestehe das Abschluss-Quiz eines Levels und erhalte ein verifizierbares Zertifikat mit
          QR-Code – ideal für LinkedIn und deinen Lebenslauf.
        </p>
      </Reveal>

      <div className="mt-12 space-y-4">
        {levels.map((level, i) => {
          const cert = state.certificates.find((c) => c.levelId === level.id)
          const quiz = getQuizForLevel(level.id)
          return (
            <Reveal key={level.id} delay={i * 0.05}>
              <div className="ac-card flex flex-col gap-4 p-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-4">
                  <span
                    className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-2xl"
                    style={{
                      background: cert ? `linear-gradient(135deg, ${level.gradient[0]}, ${level.gradient[1]})` : "var(--ac-surface-2)",
                      color: cert ? "#fff" : "var(--ac-ink-3)",
                    }}
                  >
                    {cert ? <Trophy width={20} height={20} /> : <Lock width={18} height={18} />}
                  </span>
                  <div>
                    <p className="font-semibold">{level.title}</p>
                    <p className="text-sm" style={{ color: "var(--ac-ink-3)" }}>
                      {cert
                        ? `Ausgestellt · ${Math.round(cert.score * 100)}% · ${cert.id}`
                        : "Noch nicht freigeschaltet"}
                    </p>
                  </div>
                </div>

                {cert ? (
                  <Link href={`/academy/certificates/${cert.id}`} className="ac-btn ac-btn-primary">
                    Ansehen <ArrowRight width={16} height={16} />
                  </Link>
                ) : quiz ? (
                  <Link href={`/academy/quiz/${level.id}`} className="ac-btn ac-btn-ghost">
                    Quiz starten
                  </Link>
                ) : (
                  <span className="text-sm" style={{ color: "var(--ac-ink-3)" }}>Bald verfügbar</span>
                )}
              </div>
            </Reveal>
          )
        })}
      </div>
    </div>
  )
}
