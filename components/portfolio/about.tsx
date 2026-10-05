import type { Dictionary } from "@/data/types"
import { Hole } from "@/lib/hole"
import { withBasePath } from "@/lib/utils"
import { SectionHead } from "./section-head"

/** Sobre em colagem: foto duotone sobre bloco vermelho rasgado, bio e o "antes da tecnologia" em cartão vermelho. */
export function About({ t }: { t: Dictionary }) {
  return (
    <section className="blk" id="sobre">
      <div className="wrap">
        <SectionHead n="01" kicker={t.aboutK} title={t.aboutT} />
        <div className="about">
          <figure className="collage rv" style={{ margin: 0 }}>
            <div className="redblock" />
            <div className="pic torn2 scr">
              <img className="duo-teal" src={withBasePath("/images/profile.jpg")} alt="Matheus Malta" width={1402} height={1122} decoding="async" loading="lazy" />
            </div>
            <figcaption className="slab cap">{t.photoCap}</figcaption>
            <Hole seed={9} small style={{ right: 10, top: 22 }} />
          </figure>
          <div className="rv" style={{ "--d": "80ms" } as React.CSSProperties}>
            <div className="bio">
              {t.bio.map((p) => (
                <p key={p}>{p}</p>
              ))}
            </div>
            <div className="quote">
              <p className="label">{t.backT}</p>
              <p>{t.back}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
