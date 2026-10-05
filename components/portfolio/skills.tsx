import { Code, Database, Wrench } from "lucide-react"
import type { Dictionary, IconName } from "@/data/types"
import { Hole } from "@/lib/hole"
import { SectionHead } from "./section-head"

const icons: Record<IconName, typeof Code> = { code: Code, db: Database, tool: Wrench }

/** Skills em fichas (sem barras de nível). */
export function Skills({ t }: { t: Dictionary }) {
  return (
    <section className="blk" id="skills">
      <div className="wrap">
        <SectionHead n="02" kicker={t.skK} title={t.skT} />
        <div className="skgrid">
          {t.skCats.map((c, i) => {
            const Icon = icons[c.icon]
            return (
              <div key={c.title} className="sk rv" style={{ "--d": `${i * 90}ms` } as React.CSSProperties}>
                <div className="head">
                  <Icon className="ico" aria-hidden="true" />
                  <h3>{c.title}</h3>
                </div>
                <ul>
                  {c.items.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
                {i === 1 && <Hole seed={5} small style={{ right: 16, top: 14 }} />}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
