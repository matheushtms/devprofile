import { Code, Database, Wrench } from "lucide-react"
import type { Dictionary, IconName } from "@/data/types"

const icons: Record<IconName, typeof Code> = { code: Code, db: Database, tool: Wrench }
const list = { listStyle: "none", margin: 0, padding: 0 } as const

export function Skills({ t }: { t: Dictionary }) {
  return (
    <section className="blk" id="skills">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <span className="mono k">02 / {t.skK}</span>
            <h2>{t.skT}</h2>
          </div>
        </div>
        <div className="skills">
          {t.skCats.map((c, i) => {
            const Icon = icons[c.icon]
            return (
              <div key={c.title} className="card rv" style={{ "--d": `${i * 80}ms` } as React.CSSProperties}>
                <h3>
                  <Icon className="ico" aria-hidden="true" />
                  {c.title}
                </h3>
                <ul className="chips" style={list}>
                  {c.items.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
