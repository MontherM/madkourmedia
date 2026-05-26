"use client"
import { useEffect, useState } from "react"
import { motion, useSpring, useMotionValue } from "framer-motion"

export default function CustomCursor() {
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)

  // Dot: tight snap
  const dotConfig = { damping: 60, stiffness: 1600, mass: 0.08 }
  const dotX = useSpring(mouseX, dotConfig)
  const dotY = useSpring(mouseY, dotConfig)

  // Ring: lazy follow
  const ringConfig = { damping: 24, stiffness: 200, mass: 0.5 }
  const ringX = useSpring(mouseX, ringConfig)
  const ringY = useSpring(mouseY, ringConfig)

  const [hovered, setHovered] = useState(false)
  const [clicked, setClicked] = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const over = (e: MouseEvent) => {
      const el = (e.target as HTMLElement).closest(
        "a, button, [role='button'], input, textarea, select, label"
      )
      setHovered(!!el)
    }

    const down = () => setClicked(true)
    const up = () => setClicked(false)
    const leave = () => setVisible(false)
    const enter = () => setVisible(true)

    window.addEventListener("mousemove", move)
    window.addEventListener("mouseover", over)
    window.addEventListener("mousedown", down)
    window.addEventListener("mouseup", up)
    document.documentElement.addEventListener("mouseleave", leave)
    document.documentElement.addEventListener("mouseenter", enter)

    return () => {
      window.removeEventListener("mousemove", move)
      window.removeEventListener("mouseover", over)
      window.removeEventListener("mousedown", down)
      window.removeEventListener("mouseup", up)
      document.documentElement.removeEventListener("mouseleave", leave)
      document.documentElement.removeEventListener("mouseenter", enter)
    }
  }, [visible, mouseX, mouseY])

  return (
    <div
      className="pointer-events-none fixed inset-0 z-[9999] hidden md:block"
      aria-hidden="true"
    >
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 mix-blend-difference"
        style={{ x: dotX, y: dotY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.5 : hovered ? 0.4 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <div className="w-[6px] h-[6px] rounded-full bg-white" />
      </motion.div>

      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          opacity: visible ? 1 : 0,
          scale: clicked ? 0.75 : 1,
        }}
        transition={{ duration: 0.15, ease: "easeOut" }}
      >
        <motion.div
          className="rounded-full border border-white/70"
          animate={{
            width: hovered ? 48 : 28,
            height: hovered ? 48 : 28,
            borderColor: hovered ? "rgba(109,187,125,0.9)" : "rgba(255,255,255,0.7)",
          }}
          transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        />
      </motion.div>
    </div>
  )
}
