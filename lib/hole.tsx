import type { CSSProperties } from "react"

/** Gerador pseudo-aleatório determinístico (mesmo seed, mesmo furo). */
function rng(seed: number) {
  let s = seed * 9301 + 49297
  return () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
}

/** Buraco de bala: SVG procedural (rachaduras radiais + borda), como string, p/ uso imperativo e estático. */
export function holeSvgString(seed: number): string {
  const r = rng(seed)
  let c = ""
  const n = 6 + Math.floor(r() * 4)
  for (let i = 0; i < n; i++) {
    const a = (i / n) * 6.283 + r() * 0.5
    const l = 11 + r() * 12
    c += `<path d="M32 32 L${(32 + Math.cos(a) * l).toFixed(1)} ${(32 + Math.sin(a) * l).toFixed(1)}" stroke="rgba(235,225,205,.28)" stroke-width="${(0.6 + r() * 0.6).toFixed(1)}" fill="none"/>`
  }
  return `<svg viewBox="0 0 64 64" width="100%" height="100%" aria-hidden="true" focusable="false"><circle cx="32" cy="32" r="12" fill="rgba(0,0,0,.28)"/>${c}<circle cx="32" cy="32" r="6.2" fill="#050303" stroke="rgba(235,225,205,.55)" stroke-width="1.6"/><path d="M27 28.5a6.2 6.2 0 0 1 6-2.3" stroke="rgba(255,255,255,.5)" stroke-width="1" fill="none" stroke-linecap="round"/></svg>`
}

/** Furo decorativo posicionado dentro de um pai com position:relative. */
export function Hole({ seed, small = false, style }: { seed: number; small?: boolean; style: CSSProperties }) {
  return (
    <span
      className={`hole${small ? " s" : ""}`}
      style={style}
      aria-hidden="true"
      dangerouslySetInnerHTML={{ __html: holeSvgString(seed) }}
    />
  )
}
