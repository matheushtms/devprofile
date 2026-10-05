"use client"

import { useEffect, useRef } from "react"
import { holeSvgString } from "@/lib/hole"

// Clique em área vazia: texto, links, botões, imagens, header e rail não reagem.
const BLOCKED =
  "a,button,p,h1,h2,h3,h4,li,dt,dd,span,b,small,img,svg,figcaption,label,input,select,textarea,dl,.rail,header,.toast"
const MAX = 8
const MIN_GAP_MS = 140

function hasOwnText(el: Element) {
  return Array.from(el.childNodes).some((n) => n.nodeType === Node.TEXT_NODE && (n.textContent ?? "").trim() !== "")
}

/** Buracos de bala decorativos: só mouse/caneta, no máximo 8, somem em ~5s, sem som, sem animação com reduced-motion. */
export function BulletHoles() {
  const box = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const holes = box.current
    if (!holes) return
    let seed = 1
    let lastHole = 0
    const timers = new Set<ReturnType<typeof setTimeout>>()
    const later = (fn: () => void, ms: number) => {
      const t = setTimeout(() => {
        timers.delete(t)
        fn()
      }, ms)
      timers.add(t)
    }

    const shoot = (e: PointerEvent) => {
      if (e.pointerType !== "mouse" && e.pointerType !== "pen") return
      if (e.button !== 0) return
      const target = e.target as Element | null
      if (!target || target.closest(BLOCKED) || hasOwnText(target)) return
      const now = performance.now()
      if (now - lastHole < MIN_GAP_MS) return
      lastHole = now

      const rm = window.matchMedia("(prefers-reduced-motion: reduce)").matches
      const el = document.createElement("span")
      el.className = rm ? "hole" : "hole hit"
      el.style.left = `${e.pageX - 22}px`
      el.style.top = `${e.pageY - 22}px`
      el.innerHTML = holeSvgString(seed++)
      holes.appendChild(el)
      while (holes.children.length > MAX) holes.firstElementChild?.remove()
      later(
        () => {
          if (rm) el.remove()
          else {
            el.classList.add("gone")
            later(() => el.remove(), 1700)
          }
        },
        rm ? 4000 : 5000,
      )
    }

    document.addEventListener("pointerdown", shoot)
    return () => {
      document.removeEventListener("pointerdown", shoot)
      timers.forEach(clearTimeout)
    }
  }, [])

  return <div id="holes" ref={box} aria-hidden="true" />
}
