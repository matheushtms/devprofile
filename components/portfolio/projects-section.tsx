"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ArrowRight, Monitor, Smartphone } from "lucide-react"
import type { Dictionary, Lang, Origin, Platform, Project } from "@/data/types"
import { pad } from "@/data/ui"
import { Hole } from "@/lib/hole"
import { ProjectThumb } from "./media"
import { SectionHead } from "./section-head"

interface Filters {
  type: Platform | null
  origin: Origin | null
  stack: string | null
}
const NONE: Filters = { type: null, origin: null, stack: null }

interface Props {
  lang: Lang
  t: Dictionary
  projects: Project[]
  stackFilters: readonly string[]
}

function FilterChip({ pressed, label, icon, onClick }: { pressed: boolean; label: string; icon?: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" className="fchip" aria-pressed={pressed} onClick={onClick}>
      {icon}
      {label}
    </button>
  )
}

/** Furos decorativos em alguns cartões (por posição original na lista, não pela posição filtrada). */
function decoHole(i: number) {
  if (i === 1 || i === 5) return <Hole seed={i + 3} small style={{ right: "16%", bottom: "14%" }} />
  if (i === 7) return <Hole seed={i} small style={{ left: "10%", bottom: "20%" }} />
  return null
}

export function ProjectsSection({ lang, t, projects, stackFilters }: Props) {
  const [f, setF] = useState<Filters>(NONE)
  const originLabel = (o: Origin) => (o === "freela" ? t.freela : t.acad)

  const visible = useMemo(
    () =>
      projects
        .map((p, i) => ({ p, i }))
        .filter(
          ({ p }) =>
            (!f.type || p.platforms.includes(f.type)) &&
            (!f.origin || p.origin === f.origin) &&
            (!f.stack || p.stack.some((s) => s.toLowerCase().includes(f.stack!.toLowerCase()))),
        ),
    [f, projects],
  )
  const active = !!(f.type || f.origin || f.stack)
  const count =
    lang === "pt"
      ? `Mostrando ${visible.length} de ${projects.length} projetos`
      : `Showing ${visible.length} of ${projects.length} projects`

  function chip<K extends keyof Filters>(k: K, v: Filters[K], label: string, icon?: React.ReactNode) {
    return (
      <FilterChip
        key={String(v)}
        pressed={f[k] === v}
        label={label}
        icon={icon}
        onClick={() => setF((cur) => ({ ...cur, [k]: v === null || cur[k] === v ? null : v }))}
      />
    )
  }

  return (
    <section className="blk" id="projetos">
      <div className="wrap">
        <SectionHead n="03" kicker={t.prK} title={t.prT} hint={t.tableHint} />

        <div className="filters rv" role="group" aria-label={lang === "pt" ? "Filtros" : "Filters"}>
          <div className="frow">
            <span className="label">{t.fType}</span>
            {chip("type", null, t.all)}
            {chip("type", "web", t.web, <Monitor className="ico" aria-hidden="true" />)}
            {chip("type", "mobile", t.mobile, <Smartphone className="ico" aria-hidden="true" />)}
          </div>
          <div className="frow">
            <span className="label">{t.fOrigin}</span>
            {chip("origin", null, t.all)}
            {chip("origin", "freela", t.freela)}
            {chip("origin", "acad", t.acad)}
          </div>
          <div className="frow">
            <span className="label">{t.fStack}</span>
            {chip("stack", null, t.all)}
            {stackFilters.map((s) => chip("stack", s, s))}
          </div>
        </div>

        <div className="fbar">
          <span className="label muted" id="count" aria-live="polite">
            {count}
          </span>
          <button type="button" className="linkbtn" id="clearTop" hidden={!active} onClick={() => setF(NONE)}>
            {t.clear}
          </button>
        </div>

        <MotionConfig reducedMotion="user">
          <motion.div layout className="grid" id="grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map(({ p, i }) => (
                <motion.div
                  key={p.slug}
                  layout
                  className="pcw"
                  initial={{ opacity: 0, scale: 0.9, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.42, ease: [0.16, 0.84, 0.24, 1] }}
                >
                  <Link className="pc" href={`/${lang}/projetos/${p.slug}/`} aria-label={`${t.viewP}: ${p.name}`} data-id={p.slug}>
                    <div className="th scr">
                      <ProjectThumb project={p} />
                      {p.status && <span className="slab">{p.status[lang]}</span>}
                      <span className="no" aria-hidden="true">
                        {pad(i + 1)}
                      </span>
                      {decoHole(i)}
                    </div>
                    <div className="bd">
                      <span className="label meta">
                        {p.year} · {originLabel(p.origin)}
                      </span>
                      <h3>{p.name}</h3>
                      <p className="sub">{p.subtitle[lang]}</p>
                      <p className="sum">{p.summary[lang]}</p>
                      <div className="tags">
                        {p.stack.slice(0, 3).map((s) => (
                          <span key={s} className="tag">
                            {s}
                          </span>
                        ))}
                        {p.stack.length > 3 && <span className="tag">+{p.stack.length - 3}</span>}
                      </div>
                      <span className="label go">
                        {t.viewP} <ArrowRight className="ico" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </MotionConfig>

        <div className={`empty${visible.length === 0 ? " show" : ""}`} id="empty">
          <h3>{t.emptyT}</h3>
          <p>{t.emptyP}</p>
          <button type="button" className="btn" style={{ marginTop: 16 }} onClick={() => setF(NONE)}>
            {t.clear}
          </button>
        </div>
      </div>
    </section>
  )
}
