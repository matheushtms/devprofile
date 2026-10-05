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
  const [dark, setDark] = useState(false)
  const pathname = usePathname() || `/${lang}/`
  const rest = pathname.replace(/^\/(pt|en)/, "") || "/"

  useEffect(() => {
    const root = document.documentElement
    const mq = window.matchMedia("(prefers-color-scheme: dark)")
    const read = () => {
      const attr = root.getAttribute("data-theme")
      setDark(attr ? attr === "dark" : mq.matches)
    }
    read()
    const mo = new MutationObserver(read)
    mo.observe(root, { attributes: true, attributeFilter: ["data-theme"] })
    mq.addEventListener("change", read)
    return () => {
      mo.disconnect()
      mq.removeEventListener("change", read)
    }
  }, [])

  function toggleTheme() {
    const root = document.documentElement
    const attr = root.getAttribute("data-theme")
    const dark = attr ? attr === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches
    const next = dark ? "light" : "dark"
    root.setAttribute("data-theme", next)
    try {
      localStorage.setItem("theme", next)
    } catch {}
  }

  return (
    <header className="top">
      <div className="wrap">
        <Link className="brand" href={`/${lang}/`} aria-label="Matheus Malta" onClick={() => setOpen(false)}>
          <i>M</i>
          <span>matheus.malta</span>
        </Link>
        <nav className={`main${open ? " open" : ""}`} id="nav" aria-label={lang === "pt" ? "Principal" : "Main"}>
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
