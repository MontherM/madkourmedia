'use client'

import { useState, useCallback, useRef } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { CATEGORIES } from '@/lib/visualizer-categories'

type Step = 'upload' | 'category' | 'subcategory' | 'confirm'

function compressImage(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const url = URL.createObjectURL(file)
    img.onload = () => {
      const MAX = 1024
      const ratio = Math.min(MAX / img.width, MAX / img.height, 1)
      const canvas = document.createElement('canvas')
      canvas.width = Math.round(img.width * ratio)
      canvas.height = Math.round(img.height * ratio)
      const ctx = canvas.getContext('2d')!
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)
      const base64 = canvas.toDataURL('image/jpeg', 0.85).split(',')[1]
      URL.revokeObjectURL(url)
      resolve(base64)
    }
    img.onerror = reject
    img.src = url
  })
}

const ease = [0.16, 1, 0.3, 1] as const

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
}

const FEATURES = [
  'Raumstruktur bleibt exakt erhalten',
  '3 Variationen zum Download',
  'Hochauflösende Qualität',
  'Ergebnis in unter 2 Minuten',
]

export default function VisualizerClient() {
  const [step, setStep] = useState<Step>('upload')
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const [imageBase64, setImageBase64] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null)
  const [isDragging, setIsDragging] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFile = useCallback(async (file: File) => {
    if (!file.type.startsWith('image/')) {
      setError('Bitte laden Sie ein Bild hoch (JPG, PNG, WebP).')
      return
    }
    if (file.size > 20 * 1024 * 1024) {
      setError('Bild ist zu gross (max. 20 MB).')
      return
    }
    setError(null)
    const preview = URL.createObjectURL(file)
    setImagePreview(preview)
    const base64 = await compressImage(file)
    setImageBase64(base64)
    setStep('category')
  }, [])

  const onDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      setIsDragging(false)
      const file = e.dataTransfer.files[0]
      if (file) handleFile(file)
    },
    [handleFile]
  )

  const activeCategory = CATEGORIES.find((c) => c.id === selectedCategory)
  const activeSubcategory = activeCategory?.subcategories.find((s) => s.id === selectedSubcategory)

  const isTestMode = process.env.NODE_ENV === 'development'

  const storeAndRedirect = (sessionId: string) => {
    sessionStorage.setItem('viz_image', imageBase64!)
    sessionStorage.setItem('viz_category', selectedCategory!)
    sessionStorage.setItem('viz_subcategory', selectedSubcategory!)
    window.location.href = `/visualizer/success?session_id=${sessionId}&category=${selectedCategory}&subcategory=${selectedSubcategory}`
  }

  const handlePay = async () => {
    if (!selectedCategory || !selectedSubcategory || !imageBase64) return
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ category: selectedCategory, subcategory: selectedSubcategory }),
      })
      const data = await res.json()
      if (data.url) {
        sessionStorage.setItem('viz_image', imageBase64)
        sessionStorage.setItem('viz_category', selectedCategory)
        sessionStorage.setItem('viz_subcategory', selectedSubcategory)
        window.location.href = data.url
      } else {
        setError('Fehler beim Erstellen der Zahlung. Bitte erneut versuchen.')
        setIsLoading(false)
      }
    } catch {
      setError('Netzwerkfehler. Bitte erneut versuchen.')
      setIsLoading(false)
    }
  }

  const handleTestBypass = () => {
    if (!selectedCategory || !selectedSubcategory || !imageBase64) return
    storeAndRedirect('TEST_SESSION')
  }

  return (
    <div className="min-h-screen bg-bg text-ink">
      {/* Nav */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-bg/90 backdrop-blur-xl border-b border-white/[0.05]">
        <div className="container-wide flex items-center justify-between py-5">
          <Link href="/" className="flex items-center gap-3 group">
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
          <Link href="/" className="label text-ink-3 hover:text-ink transition-colors">
            ← Zurück zur Website
          </Link>
        </div>
      </header>

      <main className="pt-28 pb-24">
        <div className="container-wide" style={{ maxWidth: 960 }}>

          {/* Hero */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            className="text-center mb-8 sm:mb-16"
          >
            <span className="label text-accent mb-4 block">KI-Raumvisualisierung</span>
            <h1 className="font-display text-[clamp(40px,6vw,80px)] font-bold leading-[1.05] tracking-tight text-ink mb-6">
              Ihr Raum.<br />Jede Vision.
            </h1>
            <p className="text-ink-2 text-lg max-w-xl mx-auto leading-relaxed">
              Laden Sie ein Foto hoch, wählen Sie einen Stil — unsere KI erstellt
              3 professionelle Visualisierungen in unter 2 Minuten.
            </p>
          </motion.div>

          {/* Step 1: Upload */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" className="mb-8">
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true) }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={onDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`relative border-2 border-dashed rounded-none cursor-pointer transition-all duration-300 ${
                imagePreview
                  ? 'border-accent/40 bg-surface-2'
                  : isDragging
                  ? 'border-accent bg-accent/5'
                  : 'border-ink-4 hover:border-ink-3 bg-surface'
              }`}
              style={{ minHeight: imagePreview ? 320 : 240 }}
            >
              {imagePreview ? (
                <div className="relative w-full h-80">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={imagePreview}
                    alt="Hochgeladener Raum"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-bg/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                    <span className="label text-ink">Bild ersetzen</span>
                  </div>
                  <div className="absolute top-4 right-4 bg-accent text-black px-3 py-1 label">
                    Hochgeladen
                  </div>
                </div>
              ) : (
                <div className="flex flex-col items-center justify-center h-60 gap-4 px-8">
                  <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                    <rect x="0" y="28" width="40" height="2" fill="currentColor" className="text-ink-4" />
                    <path d="M20 4L20 24M20 4L14 10M20 4L26 10" stroke="currentColor" strokeWidth="1.5" className="text-ink-2" />
                    <rect x="4" y="14" width="8" height="8" fill="currentColor" className="text-ink-4" opacity="0.4" />
                    <rect x="28" y="18" width="8" height="6" fill="currentColor" className="text-ink-4" opacity="0.4" />
                  </svg>
                  <div className="text-center">
                    <p className="text-ink font-medium mb-1">Raumfoto hochladen</p>
                    <p className="text-ink-3 text-sm">Drag & Drop oder klicken · JPG, PNG, WebP · max. 20 MB</p>
                  </div>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => { if (e.target.files?.[0]) handleFile(e.target.files[0]) }}
              />
            </div>
            {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
          </motion.div>

          {/* Step 2: Category */}
          <AnimatePresence>
            {step !== 'upload' && (
              <motion.div
                key="category"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="mb-8"
              >
                <p className="label text-ink-3 mb-5">Welcher Raumtyp soll entstehen?</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
                  {CATEGORIES.map((cat, i) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        setSelectedCategory(cat.id)
                        setSelectedSubcategory(null)
                        setStep('subcategory')
                      }}
                      className={`p-3 sm:p-4 text-left border transition-all duration-200 ${
                        selectedCategory === cat.id
                          ? 'border-accent bg-accent/10 text-ink'
                          : 'border-ink-4 bg-surface hover:border-ink-3 text-ink-2'
                      } ${i === CATEGORIES.length - 1 && CATEGORIES.length % 2 !== 0 ? 'col-span-2 sm:col-span-1' : ''}`}
                    >
                      <CategoryIcon id={cat.id} />
                      <p className="font-medium text-sm mt-3 leading-tight">{cat.label}</p>
                      <p className="text-ink-3 text-[11px] mt-1 leading-tight hidden sm:block">{cat.description}</p>
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Subcategory */}
          <AnimatePresence>
            {activeCategory && (
              <motion.div
                key={`sub-${activeCategory.id}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="mb-8"
              >
                <p className="label text-ink-3 mb-5">Welcher Stil?</p>
                <div className="flex flex-wrap gap-3">
                  {activeCategory.subcategories.map((sub) => (
                    <button
                      key={sub.id}
                      onClick={() => {
                        setSelectedSubcategory(sub.id)
                        setStep('confirm')
                      }}
                      className={`px-5 py-3 border label transition-all duration-200 ${
                        selectedSubcategory === sub.id
                          ? 'border-accent bg-accent text-black'
                          : 'border-ink-4 bg-surface hover:border-ink-3 text-ink-2 hover:text-ink'
                      }`}
                    >
                      {sub.label}
                    </button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Confirm + Pay */}
          <AnimatePresence>
            {step === 'confirm' && activeCategory && activeSubcategory && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease }}
                className="border border-ink-4 bg-surface p-8"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                  <div>
                    <p className="label text-accent mb-2">Zusammenfassung</p>
                    <h3 className="font-display text-2xl font-bold text-ink mb-1">
                      {activeCategory.label} — {activeSubcategory.label}
                    </h3>
                    <ul className="mt-4 space-y-2">
                      {FEATURES.map((f) => (
                        <li key={f} className="flex items-center gap-2 text-sm text-ink-2">
                          <span className="w-4 h-4 bg-accent/20 flex items-center justify-center flex-shrink-0">
                            <svg width="8" height="6" viewBox="0 0 8 6" fill="none">
                              <path d="M1 3L3 5L7 1" stroke="#6DBB7D" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </span>
                          {f}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex flex-col items-start md:items-end gap-4 flex-shrink-0">
                    <div>
                      <p className="label text-ink-3">Einmalig</p>
                      <p className="font-display text-5xl font-bold text-ink">CHF 29</p>
                      <p className="text-ink-3 text-sm mt-1">inkl. MwSt.</p>
                    </div>
                    <button
                      onClick={handlePay}
                      disabled={isLoading}
                      className="btn-primary w-full md:w-auto flex items-center justify-center gap-2 min-w-[220px]"
                    >
                      {isLoading ? (
                        <>
                          <SpinIcon />
                          Weiterleitung…
                        </>
                      ) : (
                        <>
                          Jetzt kaufen
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                            <path d="M1 7H13M8 2L13 7L8 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                          </svg>
                        </>
                      )}
                    </button>
                    <p className="text-ink-3 text-xs">Sichere Zahlung via Stripe</p>
                    {isTestMode && (
                      <button
                        onClick={handleTestBypass}
                        className="label text-ink-4 hover:text-ink-2 transition-colors underline underline-offset-2 text-[10px]"
                      >
                        Test-Modus (ohne Zahlung)
                      </button>
                    )}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Empty state features */}
          {step === 'upload' && (
            <motion.div
              variants={fadeUp}
              initial="hidden"
              animate="show"
              className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
            >
              {[
                { label: 'Struktur erhalten', sub: 'Wände, Fenster & Türen bleiben unverändert' },
                { label: '3 Variationen', sub: 'Verschiedene Stimmungen zum Vergleich' },
                { label: 'Sofort-Download', sub: 'Hochauflösende Dateien direkt herunterladen' },
                { label: 'CHF 29 / Session', sub: '3 Visualisierungen — transparent & fair' },
              ].map((f) => (
                <div key={f.label} className="border-t border-ink-4 pt-5">
                  <p className="font-medium text-ink mb-1 text-sm">{f.label}</p>
                  <p className="text-ink-3 text-xs leading-relaxed">{f.sub}</p>
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </main>
    </div>
  )
}

function CategoryIcon({ id }: { id: string }) {
  const icons: Record<string, React.ReactNode> = {
    wohnen: (
      <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
        <path d="M1 8L11 1L21 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="3" y="8" width="16" height="10" stroke="currentColor" strokeWidth="1.5" />
        <rect x="8" y="12" width="6" height="6" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    buero: (
      <svg width="22" height="18" viewBox="0 0 22 18" fill="none">
        <rect x="1" y="4" width="20" height="14" stroke="currentColor" strokeWidth="1.5" />
        <path d="M1 8H21" stroke="currentColor" strokeWidth="1.5" />
        <rect x="5" y="1" width="4" height="3" stroke="currentColor" strokeWidth="1.2" />
        <rect x="13" y="1" width="4" height="3" stroke="currentColor" strokeWidth="1.2" />
        <path d="M7 12H15M9 14H13" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    wellness: (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path d="M11 2C11 2 4 6 4 12C4 15.3 7.1 18 11 18C14.9 18 18 15.3 18 12C18 6 11 2 11 2Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M11 8V18M7 11C8.5 10 9.5 9.5 11 9.5C12.5 9.5 13.5 10 15 11" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
    gastronomie: (
      <svg width="20" height="22" viewBox="0 0 20 22" fill="none">
        <path d="M4 1V9C4 11.2 5.8 13 8 13V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M16 1C16 1 16 5 14 7C12 9 12 13 12 13V21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M1 9H7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    retail: (
      <svg width="22" height="20" viewBox="0 0 22 20" fill="none">
        <path d="M1 5H21L19 17H3L1 5Z" stroke="currentColor" strokeWidth="1.5" />
        <path d="M7 5C7 3 8.3 1 11 1C13.7 1 15 3 15 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5 10H17M7 14H15" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
      </svg>
    ),
  }
  return <div className="text-ink-2">{icons[id] ?? null}</div>
}

function SpinIcon() {
  return (
    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
      <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5" strokeOpacity="0.3" />
      <path d="M7 1A6 6 0 0 1 13 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
