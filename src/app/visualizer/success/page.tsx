'use client'

import { Suspense, useEffect, useState, useRef } from 'react'
import { useSearchParams } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { getCategoryById, getSubcategoryById } from '@/lib/visualizer-categories'

type GenStatus = 'idle' | 'starting' | 'generating' | 'done' | 'error'

const ease = [0.16, 1, 0.3, 1] as const

function SuccessContent() {
  const params = useSearchParams()
  const sessionId = params.get('session_id')
  const category = params.get('category') ?? ''
  const subcategory = params.get('subcategory') ?? ''

  const cat = getCategoryById(category)
  const sub = getSubcategoryById(category, subcategory)

  const [status, setStatus] = useState<GenStatus>('idle')
  const [images, setImages] = useState<string[]>([])
  const [errorMsg, setErrorMsg] = useState<string | null>(null)
  const [progress, setProgress] = useState(0)
  const pollRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const predictionIds = useRef<string[]>([])
  const started = useRef(false)

  useEffect(() => {
    if (!sessionId || started.current) return
    started.current = true
    startGeneration()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionId])

  const startGeneration = async () => {
    const imageBase64 = sessionStorage.getItem('viz_image')
    if (!imageBase64) {
      setErrorMsg('Kein Bild gefunden. Bitte starten Sie den Prozess neu.')
      setStatus('error')
      return
    }

    setStatus('starting')
    setProgress(5)

    try {
      const res = await fetch('/api/generate/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ sessionId, imageBase64, category, subcategory }),
      })
      const data = await res.json()

      if (!res.ok || !data.predictionIds) {
        setErrorMsg(data.error ?? 'Fehler beim Starten der Generierung.')
        setStatus('error')
        return
      }

      predictionIds.current = data.predictionIds
      setStatus('generating')
      setProgress(15)

      pollRef.current = setInterval(async () => {
        try {
          const ids = predictionIds.current.join(',')
          const statusRes = await fetch(`/api/generate/status?ids=${ids}`)
          const statusData = await statusRes.json()

          const completed = statusData.images?.length ?? 0
          setProgress(15 + Math.round((completed / 3) * 80))

          if (statusData.allDone) {
            clearInterval(pollRef.current!)
            if (statusData.images?.length > 0) {
              setImages(statusData.images)
              setStatus('done')
              setProgress(100)
              sessionStorage.removeItem('viz_image')
            } else {
              setErrorMsg('Die KI-Generierung ist fehlgeschlagen. Bitte kontaktieren Sie uns.')
              setStatus('error')
            }
          }
        } catch {
          clearInterval(pollRef.current!)
          setErrorMsg('Verbindungsfehler beim Abrufen der Ergebnisse.')
          setStatus('error')
        }
      }, 4000)
    } catch {
      setErrorMsg('Netzwerkfehler. Bitte kontaktieren Sie uns.')
      setStatus('error')
    }
  }

  useEffect(() => {
    return () => {
      if (pollRef.current) clearInterval(pollRef.current)
    }
  }, [])

  const downloadImage = async (url: string, index: number) => {
    const res = await fetch(url)
    const blob = await res.blob()
    const a = document.createElement('a')
    a.href = URL.createObjectURL(blob)
    a.download = `visualisierung-${index + 1}.jpg`
    a.click()
  }

  return (
    <main className="pt-32 pb-24">
      <div className="container-wide max-w-4xl mx-auto px-6">

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease }}
          className="text-center mb-12"
        >
          {status === 'done' ? (
            <>
              <span className="label text-accent mb-4 block">Fertig</span>
              <h1 className="font-display text-[clamp(36px,5vw,64px)] font-bold leading-tight text-ink mb-4">
                Ihre Visualisierungen
              </h1>
              {cat && sub && (
                <p className="text-ink-2">{cat.label} — {sub.label}</p>
              )}
            </>
          ) : status === 'error' ? (
            <>
              <span className="label text-red-400 mb-4 block">Fehler</span>
              <h1 className="font-display text-4xl font-bold text-ink mb-4">
                Etwas ist schiefgelaufen
              </h1>
              <p className="text-ink-2 mb-6">{errorMsg}</p>
              <div className="flex gap-4 justify-center">
                <Link href="/visualizer" className="btn-secondary">Erneut versuchen</Link>
                <a href="mailto:info@madkourmedia.com" className="btn-primary">Support kontaktieren</a>
              </div>
            </>
          ) : (
            <>
              <span className="label text-accent mb-4 block">Verarbeitung läuft</span>
              <h1 className="font-display text-[clamp(36px,5vw,64px)] font-bold leading-tight text-ink mb-4">
                {status === 'starting' ? 'Zahlung bestätigt' : 'KI generiert Ihren Raum…'}
              </h1>
              <p className="text-ink-2 mb-8">
                {status === 'starting'
                  ? 'Visualisierungen werden gestartet…'
                  : 'Dies dauert ca. 60–90 Sekunden. Bitte nicht schliessen.'}
              </p>
              <div className="w-full max-w-sm mx-auto h-px bg-ink-4 relative">
                <motion.div
                  className="absolute left-0 top-0 h-px bg-accent"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.8, ease }}
                />
              </div>
              <p className="text-ink-3 text-sm mt-3">{progress}%</p>
            </>
          )}
        </motion.div>

        {/* Image grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {status === 'done' ? (
            images.map((url, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: i * 0.15, ease }}
                className="group"
              >
                <div className="relative overflow-hidden bg-surface aspect-[4/3]">
                  <Image
                    src={url}
                    alt={`Visualisierung ${i + 1}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-bg/0 group-hover:bg-bg/40 transition-colors duration-300 flex items-center justify-center">
                    <button
                      onClick={() => downloadImage(url, i)}
                      className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-accent text-black label px-5 py-2.5 flex items-center gap-2"
                    >
                      <DownloadIcon />
                      Download
                    </button>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 px-1">
                  <span className="label text-ink-3">Variante {i + 1}</span>
                  <button
                    onClick={() => downloadImage(url, i)}
                    className="label text-accent hover:text-ink transition-colors flex items-center gap-1.5"
                  >
                    <DownloadIcon small />
                    Herunterladen
                  </button>
                </div>
              </motion.div>
            ))
          ) : status !== 'error' ? (
            [0, 1, 2].map((i) => (
              <div key={i} className="bg-surface aspect-[4/3] relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.04] to-transparent"
                  animate={{ x: ['-100%', '100%'] }}
                  transition={{ duration: 1.8, repeat: Infinity, delay: i * 0.3, ease: 'linear' }}
                />
                <div className="absolute bottom-4 left-4">
                  <span className="label text-ink-4">Variante {i + 1}</span>
                </div>
              </div>
            ))
          ) : null}
        </div>

        <AnimatePresence>
          {status === 'done' && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5, ease }}
              className="mt-12 text-center"
            >
              <p className="text-ink-2 mb-6">Weitere Räume oder Stile visualisieren?</p>
              <Link href="/visualizer" className="btn-primary inline-flex items-center gap-2">
                Neue Visualisierung starten
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  )
}

function DownloadIcon({ small }: { small?: boolean }) {
  const size = small ? 12 : 14
  return (
    <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
      <path d="M7 1V10M3 7L7 11L11 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M1 13H13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}

export default function SuccessPage() {
  return (
    <div className="min-h-screen bg-bg text-ink">
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="container-wide flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3">
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <rect x="0" y="0" width="11" height="11" fill="#6DBB7D" />
              <rect x="15" y="0" width="11" height="11" fill="#6DBB7D" />
              <rect x="7" y="15" width="11" height="11" fill="#6DBB7D" opacity="0.5" />
            </svg>
            <div className="leading-none">
              <span className="font-display text-[13px] font-bold tracking-[0.18em] text-ink uppercase block">Madkour</span>
              <span className="label text-ink-3 block mt-[2px]">Media</span>
            </div>
          </Link>
          <Link href="/visualizer" className="label text-ink-3 hover:text-ink transition-colors">
            Neue Visualisierung
          </Link>
        </div>
      </header>
      <Suspense fallback={
        <main className="pt-32 pb-24 flex items-center justify-center min-h-[60vh]">
          <div className="text-ink-3 label">Laden…</div>
        </main>
      }>
        <SuccessContent />
      </Suspense>
    </div>
  )
}
