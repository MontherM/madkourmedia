"use client"
import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import FadeIn from "./ui/FadeIn"

const projects = [
  {
    id: "01",
    slug: "dani-sparn",
    name: "Dani Sparn Entertainment",
    category: "Branding & OOH-Kampagne",
    year: "2024",
    desc: "Ganzheitliche Markenkommunikation für eine Eventfirma — von der CI bis zur Outdoor-Kampagne.",
    featured: true,
    bg: "linear-gradient(135deg, #0c1a10 0%, #080808 60%, #0a100c 100%)",
    accent: "#6DBB7D",
  },
  {
    id: "02",
    slug: "security-expo",
    name: "Security Expo 2024",
    category: "Print & Editorial",
    year: "2024",
    desc: "Messemagazin-Produktion für die grösste Sicherheitsleitmesse der Schweiz.",
    featured: false,
    bg: "linear-gradient(135deg, #0a0c1a 0%, #080810 60%, #0d0d18 100%)",
    accent: "#8899DD",
  },
  {
    id: "03",
    slug: "rei-solar",
    name: "REI Solar",
    category: "Brand Identity",
    year: "2023",
    desc: "Markenentwicklung und digitaler Auftritt für einen Schweizer Solarpionier.",
    featured: false,
    bg: "linear-gradient(135deg, #1a1200 0%, #100c00 60%, #0f0b00 100%)",
    accent: "#D4A820",
  },
]

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden cursor-pointer ${
        project.featured ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
      style={{ aspectRatio: project.featured ? "16/7" : "4/3" }}
    >
      {/* Background */}
      <div
        className="absolute inset-0 transition-transform duration-700 ease-out"
        style={{
          background: project.bg,
          transform: hovered ? "scale(1.02)" : "scale(1)",
        }}
      />

      {/* Subtle noise texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-px h-16 transition-all duration-500"
        style={{
          background: `linear-gradient(to bottom, ${project.accent}60, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />
      <div
        className="absolute top-0 right-0 h-px w-16 transition-all duration-500"
        style={{
          background: `linear-gradient(to left, ${project.accent}60, transparent)`,
          opacity: hovered ? 1 : 0,
        }}
      />

      {/* Content overlay */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <span className="label text-white/30">{project.id}</span>
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -6 }}
            transition={{ duration: 0.3 }}
            className="w-8 h-8 border border-white/20 flex items-center justify-center"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <path d="M1 9L9 1M9 1H1M9 1V9" stroke="white" strokeWidth="1.2" />
            </svg>
          </motion.div>
        </div>

        {/* Bottom info */}
        <div>
          <motion.div
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label text-white/40 mb-2 block">{project.category}</span>
            <h3 className="font-display font-bold text-ink leading-tight"
              style={{ fontSize: "clamp(18px, 2vw, 28px)" }}>
              {project.name}
            </h3>
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{
                opacity: hovered ? 1 : 0,
                height: hovered ? "auto" : 0,
              }}
              transition={{ duration: 0.35 }}
              className="body text-white/50 mt-2 overflow-hidden"
            >
              {project.desc}
            </motion.p>
          </motion.div>
          <div className="flex items-center gap-4 mt-3">
            <span className="label text-white/25">{project.year}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export default function Work() {
  return (
    <section id="portfolio" className="py-32 md:py-44 overflow-hidden">
      <div className="container-wide">
        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-4">
          <FadeIn>
            <h2
              className="headline text-ink"
              style={{ fontSize: 'clamp(32px, 8.5vw, 80px)' }}
            >
              Ausgewählte
              <br />
              Arbeiten
            </h2>
          </FadeIn>
          <FadeIn delay={0.1} direction="left">
            <Link
              href="#portfolio"
              className="label text-ink-3 hover:text-accent transition-colors duration-300 link-underline self-start"
            >
              Alle Projekte ansehen →
            </Link>
          </FadeIn>
        </div>

        {/* Project grid: 2-col, first card spans full width */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* CTA row */}
        <FadeIn delay={0.2}>
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
