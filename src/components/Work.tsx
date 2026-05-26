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
    // Picsum: deterministic photo seed, warm stage/performance tones
    img: "https://picsum.photos/seed/performer-stage/1400/600",
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
    img: "https://picsum.photos/seed/print-editorial/600/750",
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
    img: "https://picsum.photos/seed/solar-architecture/600/750",
    accent: "#D4A820",
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
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay: index * 0.09, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`group relative overflow-hidden cursor-pointer ${
        project.featured ? "col-span-1 md:col-span-2" : "col-span-1"
      }`}
      style={{ aspectRatio: project.featured ? "16 / 7" : "4 / 5" }}
    >
      {/* Real image */}
      <img
        src={project.img}
        alt={project.name}
        loading="lazy"
        decoding="async"
        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 ease-out"
        style={{ transform: hovered ? "scale(1.04)" : "scale(1)" }}
      />

      {/* Gradient overlay — always present for legibility */}
      <div
        className="absolute inset-0 transition-opacity duration-500"
        style={{
          background:
            "linear-gradient(to top, rgba(8,8,8,0.88) 0%, rgba(8,8,8,0.3) 40%, rgba(8,8,8,0.1) 100%)",
          opacity: hovered ? 1 : 0.82,
        }}
      />

      {/* Top-left accent line on hover */}
      <div
        className="absolute top-0 left-0 w-px transition-all duration-500 ease-out"
        style={{
          height: hovered ? "60px" : "0px",
          background: `linear-gradient(to bottom, ${project.accent}, transparent)`,
        }}
      />
      <div
        className="absolute top-0 left-0 h-px transition-all duration-500 ease-out"
        style={{
          width: hovered ? "60px" : "0px",
          background: `linear-gradient(to right, ${project.accent}, transparent)`,
        }}
      />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-between p-6 md:p-8">
        {/* Top row */}
        <div className="flex justify-between items-start">
          <span className="label text-white/30">{project.id}</span>

          {/* Arrow icon — appears on hover */}
          <motion.div
            animate={{ opacity: hovered ? 1 : 0, x: hovered ? 0 : -8 }}
            transition={{ duration: 0.25 }}
            className="w-8 h-8 border border-white/25 flex items-center justify-center"
          >
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
              <path
                d="M1 9L9 1M9 1H1M9 1V9"
                stroke="white"
                strokeWidth="1.2"
              />
            </svg>
          </motion.div>
        </div>

        {/* Bottom info */}
        <div>
          <motion.div
            animate={{ y: hovered ? -4 : 0 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="label text-white/45 mb-2 block">{project.category}</span>
            <h3
              className="font-display font-bold text-ink leading-tight"
              style={{ fontSize: "clamp(18px, 2vw, 28px)", letterSpacing: "-0.02em" }}
            >
              {project.name}
            </h3>

            {/* Description — slides in on hover */}
            <motion.p
              animate={{ opacity: hovered ? 1 : 0, height: hovered ? "auto" : 0 }}
              transition={{ duration: 0.3 }}
              className="body text-white/55 mt-2.5 overflow-hidden leading-relaxed"
            >
              {project.desc}
            </motion.p>
          </motion.div>

          <div className="flex items-center gap-4 mt-3">
            <span className="label text-white/25">{project.year}</span>
            <span
              className="label transition-opacity duration-300"
              style={{
                color: project.accent,
                opacity: hovered ? 0.8 : 0,
              }}
            >
              Ansehen →
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

        {/* Section header */}
        <div className="flex flex-col md:flex-row justify-between md:items-end mb-12 md:mb-16 gap-4">
          <FadeIn>
            <h2 className="headline text-ink">
              Ausgewählte
              <br />
              Arbeiten
            </h2>
          </FadeIn>
          <FadeIn delay={0.12} direction="left">
            <Link
              href="#portfolio"
              className="label text-ink-3 hover:text-accent transition-colors duration-300 link-underline self-start"
            >
              Alle Projekte →
            </Link>
          </FadeIn>
        </div>

        {/* Project grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* CTA */}
        <FadeIn delay={0.2}>
          <div className="mt-10 md:mt-12 flex justify-center">
            <Link href="#kontakt" className="btn-secondary">
              Ihr Projekt starten
              <svg width="11" height="11" viewBox="0 0 11 11" fill="none" aria-hidden>
                <path d="M1 10L10 1M10 1H1M10 1V10" stroke="currentColor" strokeWidth="1.4" />
              </svg>
            </Link>
          </div>
        </FadeIn>
      </div>
    </section>
  )
}
