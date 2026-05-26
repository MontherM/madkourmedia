"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import FadeIn from "./ui/FadeIn"

const projects = [
  {
    id: "01",
    name: "Dani Sparn Entertainment",
    category: "Branding & OOH-Kampagne",
    year: "2024",
    desc: "Ganzheitliche Markenkommunikation für eine Eventfirma — von der CI bis zur Outdoor-Kampagne in Köln.",
    size: "large", // col-span-2 in 3-col grid
    bg: "#0A1410",
    lineColor: "rgba(109,187,125,0.15)",
    accentColor: "#6DBB7D",
  },
  {
    id: "02",
    name: "Security Expo 2024",
    category: "Print & Editorial",
    year: "2024",
    desc: "Messemagazin-Produktion für die grösste Sicherheitsleitmesse der Schweiz.",
    size: "small",
    bg: "#0A0C14",
    lineColor: "rgba(120,140,220,0.12)",
    accentColor: "#7890DC",
  },
  {
    id: "03",
    name: "REI Solar",
    category: "Brand Identity",
    year: "2023",
    desc: "Markenentwicklung und digitaler Auftritt für einen Schweizer Solarpionier.",
    size: "small",
    bg: "#141000",
    lineColor: "rgba(210,160,30,0.12)",
    accentColor: "#D4A020",
  },
  {
    id: "04",
    name: "H&B Real Estate",
    category: "Corporate Identity",
    year: "2023",
    desc: "Premium-Markenauftritt für ein internationales Immobilienunternehmen in Zusammenarbeit mit Savills.",
    size: "small",
    bg: "#111110",
    lineColor: "rgba(180,155,110,0.10)",
    accentColor: "#B09B6E",
  },
  {
    id: "05",
    name: "Mit Musig dur d Schwiiz",
    category: "Event & Kultur",
    year: "2023",
    desc: "Visueller Auftritt und Kommunikationsstrategie für ein Schweizer Musikprojekt.",
    size: "large",
    bg: "#0E0810",
    lineColor: "rgba(160,100,200,0.10)",
    accentColor: "#A064C8",
  },
]

function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0]
  index: number
}) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      data-cursor
      className={`group relative overflow-hidden cursor-pointer ${
        project.size === "large"
          ? "col-span-1 md:col-span-2"
          : "col-span-1"
      }`}
      style={{
        aspectRatio: project.size === "large" ? "16/7" : "4/3",
        background: project.bg,
      }}
    >
      {/* Animated border glow on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        className="absolute inset-0 border"
        style={{ borderColor: project.accentColor + "30" }}
      />

      {/* Subtle diagonal scan line — unique per card */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `repeating-linear-gradient(
            -55deg,
            transparent,
            transparent 24px,
            ${project.lineColor} 25px,
            transparent 26px
          )`,
        }}
      />

      {/* Large faint number — visual anchor */}
      <span
        className="absolute right-5 top-4 font-display font-bold select-none pointer-events-none"
        style={{
          fontSize: "clamp(48px, 8vw, 120px)",
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "rgba(255,255,255,0.04)",
        }}
      >
        {project.id}
      </span>

      {/* Arrow icon — appears on hover */}
      <motion.div
        animate={{ opacity: hovered ? 1 : 0, scale: hovered ? 1 : 0.85 }}
        transition={{ duration: 0.25 }}
        className="absolute top-5 right-5 w-9 h-9 border border-white/20 flex items-center justify-center"
        style={{ borderColor: hovered ? project.accentColor + "60" : "rgba(255,255,255,0.15)" }}
      >
        <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
          <path d="M1 10L10 1M10 1H1M10 1V10" stroke="white" strokeWidth="1.2" />
        </svg>
      </motion.div>

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-end p-6 md:p-8">
        <motion.div
          animate={{ y: hovered ? -4 : 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="label text-white/35 block mb-2">{project.category}</span>
          <h3
            className="font-display font-bold text-ink leading-tight"
            style={{ fontSize: "clamp(17px, 1.8vw, 26px)", letterSpacing: "-0.015em" }}
          >
            {project.name}
          </h3>

          {/* Description — slides in on hover */}
          <motion.p
            initial={false}
            animate={{
              opacity: hovered ? 1 : 0,
              height: hovered ? "auto" : 0,
              marginTop: hovered ? 8 : 0,
            }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            className="body text-white/45 overflow-hidden"
          >
            {project.desc}
          </motion.p>
        </motion.div>

        <div className="flex items-center gap-3 mt-3">
          <span className="label text-white/20">{project.year}</span>
          <motion.span
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -4 }}
            transition={{ duration: 0.3 }}
            className="label"
            style={{ color: project.accentColor }}
          >
            Ansehen →
          </motion.span>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="portfolio" className="py-32 md:py-44">
      <div className="container-wide">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-4">
          <FadeIn>
            <h2 className="headline text-ink">
              Ausgewählte
              <br />
              Arbeiten
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} direction="left">
            <div className="flex items-center gap-2">
              <span className="label text-ink-4">{projects.length} Projekte</span>
              <span className="label text-ink-4">·</span>
              <Link
                href="#kontakt"
                className="label text-ink-3 hover:text-accent transition-colors duration-300 link-underline"
              >
                Alle ansehen →
              </Link>
            </div>
          </FadeIn>
        </div>

        {/*
          3-column grid — alternating layouts:
          Row 1: large (2 cols) + small (1 col)
          Row 2: small + small (filling remaining)  → but since row 1 uses 3 cols (2+1),
                 row 2 starts fresh: small (1) + large (2)
          This creates a pleasing rhythm.

          Actually with CSS grid auto-placement:
          items 0,1,2 → row 1: [0=col-span-2][1=col-span-1]
          items 3,4   → row 2: [3=col-span-1][4=col-span-2]
        */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.15}>
          <div className="mt-10 md:mt-14 flex justify-center">
            <Link href="#kontakt" className="btn-secondary">
              Ihr Projekt starten →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
