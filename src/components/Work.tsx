"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import FadeIn from "./ui/FadeIn"

const ArrowUpRight = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
    <path d="M1 9L9 1M9 1H1M9 1V9" stroke="white" strokeWidth="1.2" />
  </svg>
)

const projects = [
  {
    id: "01",
    name: "Dani Sparn Entertainment",
    category: "Branding & OOH-Kampagne",
    year: "2024",
    desc: "Ganzheitliche Markenkommunikation für eine Eventfirma — von der CI bis zur Outdoor-Kampagne.",
    span: "full", // spans full row
    bg: "linear-gradient(135deg, #0c1a10 0%, #080808 55%, #0a100c 100%)",
    accent: "#6DBB7D",
  },
  {
    id: "02",
    name: "Security Expo 2024",
    category: "Print & Editorial",
    year: "2024",
    desc: "Messemagazin-Produktion für die grösste Sicherheitsleitmesse der Schweiz.",
    span: "half",
    bg: "linear-gradient(135deg, #0a0c1a 0%, #080810 55%, #0d0d18 100%)",
    accent: "#8899DD",
  },
  {
    id: "03",
    name: "REI Solar",
    category: "Brand Identity",
    year: "2023",
    desc: "Markenentwicklung und digitaler Auftritt für einen Schweizer Solarpionier.",
    span: "half",
    bg: "linear-gradient(135deg, #1a1200 0%, #100c00 55%, #0f0b00 100%)",
    accent: "#D4A820",
  },
  {
    id: "04",
    name: "H&B Real Estate AG",
    category: "Corporate Identity",
    year: "2024",
    desc: "Markenstrategie und digitaler Auftritt für ein Schweizer Immobilienunternehmen.",
    span: "half",
    bg: "linear-gradient(135deg, #0b0b12 0%, #0c0c14 55%, #0e0b16 100%)",
    accent: "#B8A8D8",
  },
  {
    id: "05",
    name: "Mit Musig dur d Schwiiz",
    category: "Motion & Film",
    year: "2023",
    desc: "Eventfilm und visuelle Kommunikation für ein Schweizer Kultur-Tourneeformat.",
    span: "half",
    bg: "linear-gradient(135deg, #120a08 0%, #0e0908 55%, #130a07 100%)",
    accent: "#D48060",
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
  const isFull = project.span === "full"

  return (
    <motion.article
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden cursor-pointer ${
        isFull ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
      style={{ aspectRatio: isFull ? "16 / 6" : "4 / 3" }}
    >
      {/* Background */}
      <motion.div
        className="absolute inset-0"
        animate={{ scale: hovered ? 1.03 : 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{ background: project.bg }}
      />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.035] mix-blend-overlay pointer-events-none"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner accent lines */}
      <motion.div
        className="absolute top-0 right-0 flex flex-col items-end pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.35 }}
      >
        <div
          className="h-px w-14"
          style={{ background: `linear-gradient(to left, ${project.accent}70, transparent)` }}
        />
        <div
          className="w-px h-14"
          style={{ background: `linear-gradient(to bottom, ${project.accent}70, transparent)` }}
        />
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-5 md:p-8">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <span className="label" style={{ color: "rgba(255,255,255,0.25)" }}>
            {project.id}
          </span>
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="w-8 h-8 border border-white/20 flex items-center justify-center"
          >
            <ArrowUpRight />
          </motion.div>
        </div>

        {/* Bottom info */}
        <div>
          <motion.div
            animate={{ y: hovered ? -6 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span
              className="label mb-2 block"
              style={{ color: "rgba(255,255,255,0.35)" }}
            >
              {project.category}
            </span>
            <h3
              className="font-display font-bold text-ink leading-[1.05]"
              style={{ fontSize: "clamp(17px, 2vw, 26px)", letterSpacing: "-0.015em" }}
            >
              {project.name}
            </h3>
            <motion.p
              className="body text-white/45 mt-2 overflow-hidden"
              animate={{ height: hovered ? "auto" : 0, opacity: hovered ? 1 : 0 }}
              initial={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {project.desc}
            </motion.p>
          </motion.div>

          <div className="mt-3 flex items-center gap-4">
            <span className="label" style={{ color: "rgba(255,255,255,0.2)" }}>
              {project.year}
            </span>
            <span
              className="w-1 h-1 rounded-full flex-shrink-0"
              style={{ background: project.accent, opacity: 0.6 }}
            />
            <span className="label" style={{ color: project.accent, opacity: 0.7 }}>
              {project.category.split(" ")[0]}
            </span>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

export default function Work() {
  return (
    <section id="portfolio" className="py-32 md:py-44">
      <div className="container-wide">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-4">
          <FadeIn>
            <h2 className="headline text-ink">
              Ausgewählte
              <br />
              Arbeiten
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} direction="left">
            <div className="flex flex-col items-start md:items-end gap-1">
              <span className="label text-ink-3">{projects.length} Projekte</span>
              <Link
                href="#portfolio"
                className="label text-accent hover:text-ink transition-colors duration-300 link-underline"
              >
                Alle ansehen →
              </Link>
            </div>
          </FadeIn>
        </div>

        {/* Grid: first card full-width, rest 2-col */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.15}>
          <div className="mt-10 md:mt-12 flex justify-center">
            <Link href="#kontakt" className="btn-secondary">
              Ihr Projekt starten →
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
