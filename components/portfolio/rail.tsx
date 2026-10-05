"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { sectionIds } from "@/data/ui"

/** Menu lateral com scroll-spy (visível só em ≥1180px, pelo CSS). */
export function Rail({ nav, label }: { nav: { id: string; label: string }[]; label: string }) {
  const [active, setActive] = useState("")

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id)
        }),
      { rootMargin: "-40% 0px -55% 0px" },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) io.observe(el)
    })
    return () => io.disconnect()
  }, [])

  return (
    <nav className="rail" aria-label={label}>
      <ol>
        {nav.map((n) => (
          <li key={n.id}>
            <Link href={`#${n.id}`} title={n.label} aria-label={n.label} aria-current={n.id === active ? "true" : undefined}>
              <span className="t">{n.label}</span>
              <span className="dotr" />
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  )
}
