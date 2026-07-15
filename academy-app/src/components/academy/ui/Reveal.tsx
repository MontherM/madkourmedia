"use client"
import { motion } from "framer-motion"

interface RevealProps {
  children: React.ReactNode
  delay?: number
  y?: number
  className?: string
}

/** Subtle scroll-into-view fade used across the academy. */
export default function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
