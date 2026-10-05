"use client"

import { useEffect, useRef } from "react"

interface Particle {
  x: number
  y: number
  r: number
  v: number
  ph: number
  a: number
  ember: boolean
}

/** Fundo: lua vermelha e névoa (CSS) + canvas de poeira e brasas. Pausa com a aba oculta; estático com prefers-reduced-motion. */
export function Background() {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const cv = ref.current
    const cx = cv?.getContext("2d")
    if (!cv || !cx) return
    const root = document.documentElement
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)")
    let W = 0
    let H = 0
    let parts: Particle[] = []
    let rgb = "236,226,208"
    let alpha = 0.38
    let raf = 0
    let last = 0

    const readColors = () => {
      const s = getComputedStyle(root)
      rgb = s.getPropertyValue("--dust").trim() || rgb
      alpha = parseFloat(s.getPropertyValue("--dust-a")) || 0.38
    }
    const draw = () => {
      cx.clearRect(0, 0, W, H)
      for (const p of parts) {
        cx.fillStyle = p.ember ? `rgba(255,97,83,${0.5 * p.a})` : `rgba(${rgb},${alpha * p.a})`
        cx.beginPath()
        cx.arc(p.x, p.y, p.r, 0, 6.283)
        cx.fill()
      }
    }
    const size = () => {
      W = cv.width = window.innerWidth
      H = cv.height = window.innerHeight
      const n = window.innerWidth < 700 ? 20 : 44
      parts = Array.from({ length: n }, (_, i) => ({
        x: Math.random() * W,
        y: Math.random() * H,
        r: Math.random() * 1.5 + 0.6,
        v: Math.random() * 16 + 8,
        ph: Math.random() * 6.28,
        a: Math.random() * 0.6 + 0.3,
        ember: i % 7 === 0,
      }))
    }
    const tick = (ts: number) => {
      const dt = Math.min(0.05, (ts - last) / 1000 || 0)
      last = ts
      for (const p of parts) {
        p.x += p.v * dt
        p.y += Math.sin(ts / 2600 + p.ph) * 6 * dt - (p.ember ? 5 * dt : 0)
        if (p.x > W + 4) {
          p.x = -4
          p.y = Math.random() * H
        }
        if (p.y < -4) p.y = H + 4
      }
      draw()
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      cancelAnimationFrame(raf)
      if (mq.matches || document.hidden) {
        draw()
        return
      }
      last = performance.now()
      raf = requestAnimationFrame(tick)
    }
    const onResize = () => {
      size()
      start()
    }
    const onVis = () => {
      root.classList.toggle("bg-paused", document.hidden)
      start()
    }
    const onTheme = () => {
      readColors()
      if (mq.matches) draw()
    }

    readColors()
    size()
    start()
    window.addEventListener("resize", onResize)
    document.addEventListener("visibilitychange", onVis)
    mq.addEventListener("change", start)
    const mo = new MutationObserver(onTheme)
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", onResize)
      document.removeEventListener("visibilitychange", onVis)
      mq.removeEventListener("change", start)
      mo.disconnect()
    }
  }, [])

  return (
    <div id="bg" aria-hidden="true">
      <div className="moon" />
      <div className="haze" />
      <canvas id="dust" ref={ref} />
      <div className="vig" />
      <div className="grain" />
    </div>
  )
}
