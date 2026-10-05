"use client"

import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion"
import { withBasePath } from "@/lib/utils"

/** Dois prints inclinados com parallax leve; sem parallax com prefers-reduced-motion. */
export function HeroArt({ pilot }: { pilot: string }) {
  const reduce = useReducedMotion()
  const { scrollY } = useScroll()
  const ya = useTransform(scrollY, (v) => (reduce ? 0 : -v * 0.05))
  const yb = useTransform(scrollY, (v) => (reduce ? 0 : v * 0.04))

  return (
    <div className="hero-art" aria-hidden="true">
      <motion.div className="shot a" style={{ y: ya }}>
        <div className="bar">
          <i />
          <i />
          <i />
        </div>
        <img src={withBasePath("/images/tela-plantei.png")} alt="" width={1440} height={900} decoding="async" />
      </motion.div>
      <motion.div className="shot b" style={{ y: yb }}>
        <div className="bar">
          <i />
          <i />
          <i />
        </div>
        <img src={withBasePath("/images/tela-dindin.png")} alt="" width={1440} height={900} decoding="async" />
      </motion.div>
      <div className="badge">
        <span className="dot" />
        {pilot}
      </div>
    </div>
  )
}
