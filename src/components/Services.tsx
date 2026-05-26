"use client"
import { motion } from "framer-motion"
import FadeIn from "./ui/FadeIn"

const services = [
  {
    num: "01",
    name: "Brand Identity",
    desc: "Logo, Farbe, Typografie, Bildsprache — eine vollständige visuelle Identität, die sofort erkannt wird.",
    tags: ["Logo", "CI", "Styleguide"],
  },
  {
    num: "02",
    name: "Content Strategy",
    desc: "Kanal- und Redaktionsstrategie, die Wachstum erzeugt. Konsequente Botschaften über alle Touchpoints.",
    tags: ["Social Media", "Redaktion", "Kampagnen"],
  },
  {
    num: "03",
    name: "Digital Design",
    desc: "Web, App, Social — digitale Auftritte, die auf Performance und ästhetischen Anspruch gleichermaßen ausgelegt sind.",
    tags: ["Web", "UI/UX", "Print"],
  },
  {
    num: "04",
    name: "Motion & Film",
    desc: "Bewegtbild, das Aufmerksamkeit hält. Reels, Brand Films, Animationen und Eventproduktionen.",
    tags: ["Video", "Animation", "Events"],
  },
]

export default function Services() {
  return (
    <section id="projekte" className="py-32 md:py-44">
      <div className="container-wide">

        {/* Section header */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20 md:mb-24">
          <FadeIn className="md:col-span-4">
            <span className="label text-ink-3">Was wir tun</span>
          </FadeIn>
          <FadeIn delay={0.1} className="md:col-span-6 md:col-start-6">
            <p className="body-lg text-ink-2 max-w-lg">
              Wir verbinden strategisches Denken mit visueller Kraft — von der
              ersten Idee bis zum vollständigen digitalen Auftritt.
            </p>
          </FadeIn>
        </div>

        {/* Statement line */}
        <FadeIn delay={0.05}>
          <div className="mb-12 md:mb-16 overflow-hidden">
            <p
              className="font-display font-bold text-ink/[0.12] select-none pointer-events-none"
              style={{
                fontSize: "clamp(48px, 7vw, 112px)",
                letterSpacing: "-0.03em",
                lineHeight: 0.9,
              }}
              aria-hidden="true"
            >
              VIER DISZIPLINEN.
            </p>
          </div>
        </FadeIn>

        {/* Services list */}
        <div className="border-t border-white/[0.07]">
          {services.map((s, i) => (
            <motion.div
              key={s.num}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.6,
                delay: i * 0.06,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="group py-8 md:py-10 border-b border-white/[0.07] grid grid-cols-12 gap-4 items-start cursor-default hover:bg-white/[0.02] transition-colors duration-300 -mx-[clamp(20px,4vw,64px)] px-[clamp(20px,4vw,64px)]"
            >
              {/* Number */}
              <span className="col-span-2 md:col-span-1 label text-ink-4 pt-1">
                {s.num}
              </span>

              {/* Name */}
              <div className="col-span-10 md:col-span-4">
                <h3 className="subheadline text-ink group-hover:text-accent transition-colors duration-300">
                  {s.name}
                </h3>
              </div>

              {/* Description */}
              <p className="hidden md:block col-span-4 body text-ink-2 leading-relaxed pt-1">
                {s.desc}
              </p>

              {/* Tags */}
              <div className="hidden md:flex col-span-3 flex-wrap gap-2 justify-end pt-1">
                {s.tags.map((tag) => (
                  <span
                    key={tag}
                    className="label text-ink-3 border border-white/[0.08] px-3 py-1.5 group-hover:border-accent/25 group-hover:text-ink-2 transition-colors duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
