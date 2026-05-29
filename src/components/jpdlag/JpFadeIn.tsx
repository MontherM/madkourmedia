"use client"
import { motion } from "framer-motion"
import { ReactNode } from "react"

interface JpFadeInProps {
  children: ReactNode
  delay?: number
  className?: string
}

export default function JpFadeIn({ children, delay = 0, className = "" }: JpFadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.7, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  )
}
