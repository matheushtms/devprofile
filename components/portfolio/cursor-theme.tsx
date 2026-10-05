"use client"

import { useEffect } from "react"

/** Cursor de mira de rifle de época: SVG 44x44, hotspot no centro (22,22), cores por tema.
 *  O CSS só aplica `--cur` em `(hover:hover) and (pointer:fine)`; sem isso (toque) o cursor fica `auto`. */
export function CursorTheme() {
  useEffect(() => {
    const root = document.documentElement

    const apply = () => {
      const dark = root.getAttribute("data-theme") !== "light"
      const main = dark ? "#F2EADC" : "#0D0C0C"
      const halo = dark ? "#000" : "#F8F1E2"
      const red = dark ? "#FF6153" : "#B3140F"
      const mk = (inner: string) =>
        `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='44' height='44' viewBox='0 0 44 44' fill='none' stroke-linecap='round'>${inner}</svg>`,
        )}") 22 22`
      const ring = (r: number, col: string, w: number) => `<circle cx='22' cy='22' r='${r}' stroke='${col}' stroke-width='${w}'/>`
      const line = (x1: number, y1: number, x2: number, y2: number, col: string, w: number) =>
        `<path d='M${x1} ${y1}L${x2} ${y2}' stroke='${col}' stroke-width='${w}'/>`
      const ticks = (a: number, b: number, col: string, w: number) =>
        [
          line(22, a, 22, b, col, w),
          line(22, 44 - a, 22, 44 - b, col, w),
          line(a, 22, b, 22, col, w),
          line(44 - a, 22, 44 - b, 22, col, w),
        ].join("")
      const inner = (col: string, w: number) =>
        [
          line(22, 15.5, 22, 19, col, w),
          line(22, 28.5, 22, 25, col, w),
          line(15.5, 22, 19, 22, col, w),
          line(28.5, 22, 25, 22, col, w),
        ].join("")
      const dot = (col: string) => `<circle cx='22' cy='22' r='1.3' fill='${col}'/>`

      const base =
        ring(12, halo, 3.4) + ticks(2, 10, halo, 3.4) + inner(halo, 3.2) + ring(12, main, 1.3) + ticks(2, 10, main, 1.3) + inner(main, 1.2) + dot(main)
      const hover = ring(7.5, halo, 3.6) + ticks(5, 12, halo, 3.4) + ring(7.5, red, 1.8) + ticks(5, 12, red, 1.5) + dot(red)
      root.style.setProperty("--cur", `${mk(base)}, crosshair`)
      root.style.setProperty("--cur-h", `${mk(hover)}, pointer`)
    }

    apply()
    const mo = new MutationObserver(apply)
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => mo.disconnect()
  }, [])

  return null
}
