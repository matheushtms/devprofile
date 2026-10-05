import { Award, GraduationCap } from "lucide-react"
import type { Dictionary } from "@/data/types"
import { SectionHead } from "./section-head"

/** Experiência como mapa: trilha tracejada com losangos numerados; formação e certificados abaixo. */
export function Experience({ t }: { t: Dictionary }) {
  return (
    <section className="blk" id="experiencia">
      <div className="wrap">
        <SectionHead n="04" kicker={t.exK} title={t.exT} />
        <ol className="map">
          {t.experience.map((x, i) => (
            <li key={x.period + x.role} className="rv" style={{ "--d": `${i * 60}ms` } as React.CSSProperties}>
              <span className="mk">
                <b>{i + 1}</b>
              </span>
              <div>
                <span className="label per">{x.period}</span>
                <h3>{x.role}</h3>
                <p className="org">{x.org}</p>
                <div className="rule" />
                <p>{x.text}</p>
                <div className="tags">
                  {x.tags.map((g) => (
                    <span key={g} className="tag">
                      {g}
                    </span>
                  ))}
                </div>
              </div>
            </li>
          ))}
        </ol>
        <h3 className="label muted" style={{ marginTop: "var(--s8)" }}>
          {t.edK}
        </h3>
        <div className="certs" style={{ marginTop: "var(--s4)" }}>
          {t.education.map((e, i) => {
            const Icon = i === 0 ? GraduationCap : Award
            return (
              <div key={e.title} className="cert rv" style={{ "--d": `${i * 70}ms` } as React.CSSProperties}>
                <Icon className="ico" aria-hidden="true" />
                <span className="label rt">{e.period}</span>
                <h4>{e.title}</h4>
                <p>{e.text}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
