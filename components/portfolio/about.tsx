import type { Dictionary } from "@/data/types"
import { withBasePath } from "@/lib/utils"

const d = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties

export function About({ t }: { t: Dictionary }) {
  return (
    <section className="blk" id="sobre">
      <div className="wrap">
        <div className="sec-head rv">
          <div>
            <span className="mono k">01 / {t.aboutK}</span>
            <h2>{t.aboutT}</h2>
          </div>
        </div>
        <div className="bento">
          <div className="side">
            <figure className="card photo rv" style={{ margin: 0 }}>
              <img src={withBasePath("/images/profile.jpg")} alt="Matheus Malta" width={1402} height={1122} decoding="async" />
              <figcaption>
                <span className="chip">{t.photoCap}</span>
              </figcaption>
            </figure>
            <div className="card more rv" style={d(60)}>
              {t.bio.slice(3).map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
          </div>
          <div className="card bio rv" style={d(80)}>
            {t.bio.slice(0, 3).map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="card facts rv" style={d(120)}>
            <dl>
              {t.facts.map((f) => (
                <div key={f.k} style={{ display: "contents" }}>
                  <dt className="mono">{f.k}</dt>
                  <dd>{f.v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <div className="card back rv" style={d(160)}>
            <h3>{t.backT}</h3>
            <p>{t.back}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
