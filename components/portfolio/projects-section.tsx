"use client"

import { useMemo, useState } from "react"
import Link from "next/link"
import { AnimatePresence, motion, MotionConfig } from "framer-motion"
import { ArrowRight, Monitor, Smartphone } from "lucide-react"
import type { Dictionary, Lang, Origin, Platform, Project } from "@/data/types"
import { ProjectThumb } from "./media"

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

function FilterBtn({ pressed, label, icon, onClick }: { pressed: boolean; label: string; icon?: React.ReactNode; onClick: () => void }) {
  return (
    <button type="button" className="fbtn" aria-pressed={pressed} onClick={onClick}>
      {icon}
      {label}
    </button>
  )
}

export function ProjectsSection({ lang, t, projects, stackFilters }: Props) {
  const [f, setF] = useState<Filters>(NONE)
  const originLabel = (o: Origin) => (o === "freela" ? t.freela : t.acad)

  const visible = useMemo(
    () =>
      projects.filter(
        (p) =>
          (!f.type || p.platforms.includes(f.type)) &&
          (!f.origin || p.origin === f.origin) &&
          (!f.stack || p.stack.some((s) => s.toLowerCase().includes(f.stack!.toLowerCase()))),
      ),
    [f, projects],
  )
  const active = !!(f.type || f.origin || f.stack)
  const count = lang === "pt" ? `Mostrando ${visible.length} de ${projects.length} projetos` : `Showing ${visible.length} of ${projects.length} projects`

  function toggle<K extends keyof Filters>(key: K, value: Filters[K]) {
    setF((cur) => ({ ...cur, [key]: cur[key] === value ? null : value }))
  }

  function fb<K extends keyof Filters>(k: K, v: Filters[K], label: string, icon?: React.ReactNode) {
    return (
      <FilterBtn
        key={String(v)}
        pressed={f[k] === v}
        label={label}
        icon={icon}
        onClick={() => (v === null ? setF((c) => ({ ...c, [k]: null })) : toggle(k, v))}
      />
    )
  }

  return (
    <section className="blk" id="projetos">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <span className="mono k">03 / {t.prK}</span>
            <h2>{t.prT}</h2>
          </div>
          <span className="mono">{t.tableHint}</span>
        </div>

        <div className="filters rv" role="group" aria-label={lang === "pt" ? "Filtros" : "Filters"}>
          <div className="frow">
            <span className="mono">{t.fType}</span>
            {fb("type", null, t.all)}
            {fb("type", "web", t.web, <Monitor className="ico" aria-hidden="true" />)}
            {fb("type", "mobile", t.mobile, <Smartphone className="ico" aria-hidden="true" />)}
          </div>
          <div className="frow">
            <span className="mono">{t.fOrigin}</span>
            {fb("origin", null, t.all)}
            {fb("origin", "freela", t.freela)}
            {fb("origin", "acad", t.acad)}
          </div>
          <div className="frow">
            <span className="mono">{t.fStack}</span>
            {fb("stack", null, t.all)}
            {stackFilters.map((s) => (
              fb("stack", s, s)
            ))}
          </div>
        </div>

        <div className="fbar">
          <span className="mono" aria-live="polite">
            {count}
          </span>
          <button type="button" className="linkbtn" hidden={!active} onClick={() => setF(NONE)}>
            {t.clear}
          </button>
        </div>

        <MotionConfig reducedMotion="user">
          <motion.div layout className="grid" id="grid">
            <AnimatePresence mode="popLayout" initial={false}>
              {visible.map((p) => (
                <motion.div
                  key={p.slug}
                  layout
                  className="pcw"
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.42, ease: [0.2, 0.8, 0.2, 1] }}
                >
                  <Link className="pc" href={`/${lang}/projetos/${p.slug}/`} aria-label={`${t.viewP}: ${p.name}`}>
                    <div className="thumb">
                      <ProjectThumb project={p} />
                    </div>
                    <div className="pb">
                      <div className="meta">
                        <div className="types">
                          {p.platforms.map((x) =>
                            x === "web" ? (
                              <Monitor key={x} className="ico" aria-hidden="true" />
                            ) : (
                              <Smartphone key={x} className="ico" aria-hidden="true" />
                            ),
                          )}
                        </div>
                        <span className="mono">
                          {p.year} · {originLabel(p.origin)}
                        </span>
                      </div>
                      <h3>{p.name}</h3>
                      <p className="sub">{p.subtitle[lang]}</p>
                      <p className="sum">{p.summary[lang]}</p>
                      <div className="chips">
                        {p.stack.slice(0, 3).map((s) => (
                          <span key={s} className="chip">
                            {s}
                          </span>
                        ))}
                        {p.stack.length > 3 && <span className="chip">+{p.stack.length - 3}</span>}
                      </div>
                      <span className="go">
                        {t.viewP} <ArrowRight className="ico" aria-hidden="true" />
                      </span>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </MotionConfig>

        <div className={`empty${visible.length === 0 ? " show" : ""}`}>
          <h3>{t.emptyT}</h3>
          <p>{t.emptyP}</p>
          <button type="button" className="btn ghost" style={{ marginTop: 16 }} onClick={() => setF(NONE)}>
            {t.clear}
          </button>
        </div>
      </div>
    </section>
  )
}
