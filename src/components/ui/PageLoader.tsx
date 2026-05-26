"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"

export default function PageLoader() {
  const [done, setDone] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1400)
    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[9998] bg-bg flex items-end"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.9, ease: [0.76, 0, 0.24, 1] }}
        >
          {/* Progress line */}
          <motion.div
            className="absolute bottom-0 left-0 h-px bg-accent"
            initial={{ width: "0%" }}
            animate={{ width: "100%" }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Logotype */}
          <div className="container-wide pb-14 w-full">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="flex items-center gap-3"
            >
              <svg width="22" height="22" viewBox="0 0 26 26" fill="none">
                <rect x="0" y="0" width="11" height="11" fill="#6DBB7D" />
                <rect x="15" y="0" width="11" height="11" fill="#6DBB7D" />
                <rect x="7" y="15" width="11" height="11" fill="#6DBB7D" opacity="0.5" />
              </svg>
              <span
                className="font-display font-bold text-ink uppercase tracking-[0.15em]"
                style={{ fontSize: "clamp(14px, 1.2vw, 18px)" }}
              >
                Madkour<span className="text-accent">Media</span>
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
