"use client"

import { useEffect, useRef } from "react"

/** Fundo animado: 3 blobs (CSS) + malha de pontos com leve parallax. Pausa com a aba oculta;
 *  com prefers-reduced-motion fica estático (CSS + sem parallax). */
export function Background() {
  const dots = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const root = document.documentElement
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)")
    const onScroll = () => {
      if (reduce.matches || !dots.current) return
      dots.current.style.transform = `translate3d(0,${-(window.scrollY * 0.08) % 28}px,0)`
    }
    const onVis = () => root.classList.toggle("bg-paused", document.hidden)
    window.addEventListener("scroll", onScroll, { passive: true })
    document.addEventListener("visibilitychange", onVis)
    onVis()
    return () => {
      window.removeEventListener("scroll", onScroll)
      document.removeEventListener("visibilitychange", onVis)
    }
  }, [])

  return (
    <div id="bg" aria-hidden="true">
      <i className="b1" />
      <i className="b2" />
      <i className="b3" />
      <div className="dots" ref={dots} />
    </div>
  )
}
