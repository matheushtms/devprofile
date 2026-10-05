import type { Dictionary } from "@/data/types"

const list = { listStyle: "none", margin: 0, padding: 0 } as const

export function Experience({ t }: { t: Dictionary }) {
  return (
    <section className="blk" id="experiencia">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <span className="mono k">04 / {t.exK}</span>
            <h2>{t.exT}</h2>
          </div>
        </div>
        <div className="tl">
          <ol>
            {t.experience.map((i, k) => (
              <li key={i.period + i.role} className="rv" style={{ "--d": `${k * 60}ms` } as React.CSSProperties}>
                <span className="mono">{i.period}</span>
                <h3>{i.role}</h3>
                <div className="co">{i.org}</div>
                <p>{i.text}</p>
                <ul className="chips" style={list}>
                  {i.tags.map((s) => (
                    <li key={s} className="chip">
                      {s}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
          <div className="edu">
            <h3 className="mono" style={{ fontWeight: 400 }}>
              {t.edK}
            </h3>
            {t.education.map((i) => (
              <div key={i.title} className="card rv">
                <span className="mono">{i.period}</span>
                <h4>{i.title}</h4>
                <p>{i.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
