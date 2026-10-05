"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Menu, Moon, Sun, X } from "lucide-react"
import type { Lang } from "@/data/types"

interface Props {
  lang: Lang
  nav: { id: string; label: string }[]
  themeL: string
  themeD: string
}

export function Header({ lang, nav, themeL, themeD }: Props) {
  const [open, setOpen] = useState(false)
  const [dark, setDark] = useState(true)
  const pathname = usePathname() || `/${lang}/`
  const rest = pathname.replace(/^\/(pt|en)/, "") || "/"

  useEffect(() => {
    const root = document.documentElement
    const read = () => setDark(root.getAttribute("data-theme") !== "light")
    read()
    const mo = new MutationObserver(read)
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    return () => mo.disconnect()
  }, [])

  function toggleTheme() {
    const next = dark ? "light" : "dark"
    document.documentElement.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
  }

  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href={`/${lang}/`} aria-label="Matheus Malta" onClick={() => setOpen(false)}>
          <i />
          <span>Matheus Malta</span>
        </Link>
        <nav className={`drop${open ? " open" : ""}`} id="nav" aria-label={lang === "pt" ? "Principal" : "Main"}>
          {nav.map((n) => (
            <Link key={n.id} href={`/${lang}/#${n.id}`} onClick={() => setOpen(false)}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="tools">
          <div className="seg" role="group" aria-label="Idioma / Language">
            {(["pt", "en"] as const).map((l) => (
              <Link
                key={l}
                href={`/${l}${rest}`}
                lang={l === "pt" ? "pt-BR" : "en"}
                hrefLang={l === "pt" ? "pt-BR" : "en"}
                aria-current={l === lang ? "true" : undefined}
                scroll={false}
              >
                {l.toUpperCase()}
              </Link>
            ))}
          </div>
          <button type="button" className="iconbtn" aria-label={dark ? themeL : themeD} onClick={toggleTheme}>
            <Moon className="ico i-moon" aria-hidden="true" />
            <Sun className="ico i-sun" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="iconbtn menubtn"
            aria-label="Menu"
            aria-expanded={open}
            aria-controls="nav"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="ico" aria-hidden="true" /> : <Menu className="ico" aria-hidden="true" />}
          </button>
        </div>
      </div>
    </header>
  )
}
