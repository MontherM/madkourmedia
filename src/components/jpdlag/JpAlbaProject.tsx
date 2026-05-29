"use client"
import Link from "next/link"
import { motion } from "framer-motion"
import JpFadeIn from "./JpFadeIn"

const facts = [
  { label: "Standort", value: "Schweiz" },
  { label: "Nutzung", value: "Wohnen & Gewerbe" },
  { label: "Typ", value: "Neubauprojekt" },
  { label: "Status", value: "In Entwicklung" },
]

const ArrowUpRight = () => (
  <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
    <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
  </svg>
)

export default function JpAlbaProject() {
  return (
    <section id="alba" className="py-36 md:py-52 bg-jp-bg">
      <div className="container-wide">
        {/* Header */}
        <JpFadeIn>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 md:mb-20 pb-8 border-b border-black/[0.07]">
            <div>
              <span
                className="text-jp-ink-3 block mb-4"
                style={{ fontSize: "10px", letterSpacing: "0.22em", textTransform: "uppercase" }}
              >
                Projekt Highlight
              </span>
              <h2
                className="font-jp-display font-bold text-jp-ink"
                style={{ fontSize: "clamp(42px, 5.5vw, 84px)", letterSpacing: "-0.03em", lineHeight: 0.96 }}
              >
                ALBA HAUS
              </h2>
            </div>
            <span
              className="text-jp-ink-4 hidden md:block"
              style={{ fontSize: "10px", letterSpacing: "0.18em", textTransform: "uppercase" }}
            >
              JP DL AG Projektentwicklung
            </span>
          </div>
        </JpFadeIn>

        {/* Main layout: image + info */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-10 items-start">

          {/* Visual / Image area */}
          <JpFadeIn className="lg:col-span-7" delay={0.06}>
            <div
              className="relative overflow-hidden"
              style={{ aspectRatio: "4/3" }}
            >
              {/* Architectural visual placeholder */}
              <div
                className="absolute inset-0 flex items-center justify-center"
                style={{ background: "linear-gradient(160deg, #1E2B20 0%, #141D15 60%, #0F1610 100%)" }}
              >
                {/* Subtle grid */}
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage:
                      "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
                    backgroundSize: "60px 60px",
                  }}
                />
                {/* Large ALBA text */}
                <div className="relative text-center">
                  <div
                    className="font-jp-display font-bold"
                    style={{
                      fontSize: "clamp(80px, 12vw, 160px)",
                      letterSpacing: "-0.04em",
                      color: "rgba(255,255,255,0.04)",
                      lineHeight: 1,
                    }}
                  >
                    ALBA
                  </div>
                  <div
                    className="absolute inset-0 flex items-center justify-center"
                  >
                    <svg viewBox="0 0 320 200" fill="none" width="100%" style={{ maxWidth: "320px" }}>
                      {/* Simplified building elevation */}
                      <rect x="60" y="40" width="200" height="140" stroke="rgba(255,255,255,0.15)" strokeWidth="1" fill="rgba(255,255,255,0.02)" />
                      {/* Floor lines */}
                      {[70, 95, 120, 145].map((y) => (
                        <line key={y} x1="60" y1={y} x2="260" y2={y} stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
                      ))}
                      {/* Column lines */}
                      {[100, 140, 180, 220].map((x) => (
                        <line key={x} x1={x} y1="40" x2={x} y2="180" stroke="rgba(255,255,255,0.06)" strokeWidth="0.75" />
                      ))}
                      {/* Top volume */}
                      <rect x="100" y="14" width="120" height="26" stroke="rgba(255,255,255,0.2)" strokeWidth="1" fill="rgba(255,255,255,0.04)" />
                      {/* Accent top line */}
                      <line x1="100" y1="14" x2="220" y2="14" stroke="rgba(109,187,125,0.5)" strokeWidth="1.5" />
                      {/* Window highlights */}
                      {[
                        { x: 65, y: 75, w: 28, h: 18 },
                        { x: 105, y: 100, w: 28, h: 18 },
                        { x: 185, y: 75, w: 28, h: 18 },
                        { x: 225, y: 125, w: 28, h: 18 },
                        { x: 65, y: 150, w: 28, h: 18 },
                      ].map((w, i) => (
                        <rect key={i} x={w.x} y={w.y} width={w.w} height={w.h} fill="rgba(109,187,125,0.1)" stroke="rgba(109,187,125,0.2)" strokeWidth="0.75" />
                      ))}
                    </svg>
                  </div>
                </div>
                {/* Image placeholder note */}
                <div className="absolute bottom-5 left-5 right-5 flex items-center justify-between">
                  <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.25)", textTransform: "uppercase" }}>
                    Visualisierung ALBA HAUS
                  </span>
                  <span style={{ fontSize: "9px", letterSpacing: "0.2em", color: "rgba(255,255,255,0.15)", textTransform: "uppercase" }}>
                    3D-Modell in Vorbereitung
                  </span>
                </div>
              </div>
            </div>
          </JpFadeIn>

          {/* Info column */}
          <div className="lg:col-span-5 flex flex-col gap-8 lg:pt-4">
            <JpFadeIn delay={0.1}>
              <p
                className="text-jp-ink-2"
                style={{ fontSize: "clamp(15px, 1.1vw, 18px)", lineHeight: 1.8, fontWeight: 300 }}
              >
                Das ALBA HAUS steht fur die Haltung von JP DL AG: Architektur,
                die bleibt. Ein Projekt, das Wohnen und Arbeiten neu denkt und
                dabei wirtschaftliche Nachhaltigkeit konsequent mitdenkt.
              </p>
            </JpFadeIn>

            {/* Key facts */}
            <JpFadeIn delay={0.15}>
              <div className="grid grid-cols-2 gap-px border border-black/[0.07] overflow-hidden">
                {facts.map((fact) => (
                  <div
                    key={fact.label}
                    className="bg-jp-surface p-5 flex flex-col gap-1.5 border-b border-r border-black/[0.06] last:border-r-0"
                  >
                    <span
                      className="text-jp-ink-3"
                      style={{ fontSize: "9px", letterSpacing: "0.2em", textTransform: "uppercase" }}
                    >
                      {fact.label}
                    </span>
                    <span
                      className="font-jp-display font-bold text-jp-ink"
                      style={{ fontSize: "16px", letterSpacing: "-0.01em" }}
                    >
                      {fact.value}
                    </span>
                  </div>
                ))}
              </div>
            </JpFadeIn>

            {/* 3D model hint */}
            <JpFadeIn delay={0.2}>
              <div className="border border-black/[0.07] p-5 flex items-start gap-3">
                <div
                  className="w-8 h-8 flex items-center justify-center flex-shrink-0 border border-black/[0.1]"
                  style={{ marginTop: "2px" }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path d="M7 1L13 4.5V9.5L7 13L1 9.5V4.5L7 1Z" stroke="#1B2D1E" strokeWidth="1" fill="none" />
                    <path d="M7 1V13M1 4.5L7 8L13 4.5" stroke="#1B2D1E" strokeWidth="0.75" />
                  </svg>
                </div>
                <div>
                  <span
                    className="text-jp-ink font-medium block mb-1"
                    style={{ fontSize: "13px" }}
                  >
                    Interaktives 3D-Modell
                  </span>
                  <span
                    className="text-jp-ink-3"
                    style={{ fontSize: "12px", fontWeight: 300, lineHeight: 1.6 }}
                  >
                    Ein interaktives Spline-Modell des ALBA HAUSes ist in
                    Vorbereitung. Nehmen Sie Kontakt auf fur aktuelle
                    Visualisierungen.
                  </span>
                </div>
              </div>
            </JpFadeIn>

            {/* CTA */}
            <JpFadeIn delay={0.24}>
              <Link
                href="#kontakt"
                className="inline-flex items-center gap-2 text-white bg-jp-accent hover:bg-jp-accent-hover transition-colors duration-300 self-start"
                style={{
                  fontSize: "11px",
                  fontWeight: 500,
                  letterSpacing: "0.14em",
                  textTransform: "uppercase",
                  padding: "15px 28px",
                }}
              >
                Kontakt aufnehmen <ArrowUpRight />
              </Link>
            </JpFadeIn>
          </div>
        </div>

        {/* Large project number */}
        <div
          className="text-right mt-8 select-none pointer-events-none"
          style={{
            fontFamily: "Korb, system-ui, sans-serif",
            fontSize: "clamp(100px, 16vw, 240px)",
            fontWeight: 800,
            letterSpacing: "-0.04em",
            lineHeight: 1,
            color: "rgba(0,0,0,0.03)",
          }}
          aria-hidden="true"
        >
          01
        </div>
      </div>
    </section>
  )
}
