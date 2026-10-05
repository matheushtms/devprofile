import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Github, Monitor, Smartphone } from "lucide-react"
import type { Dictionary, Lang, Project } from "@/data/types"
import { pad, poster, roman } from "@/data/ui"
import { Hole } from "@/lib/hole"
import { imageSrc, ProjectThumb } from "./media"

interface Props {
  lang: Lang
  t: Dictionary
  project: Project
  index: number
  prev: Project
  next: Project
}

export function ProjectPage({ lang, t, project: p, index: i, prev, next }: Props) {
  const origin = p.origin === "freela" ? t.freela : t.acad
  const base = `/${lang}`
  const k = poster[lang]

  const sections: { title: string; body: React.ReactNode }[] = [
    { title: t.ctxT, body: p.context[lang].map((x) => <p key={x}>{x}</p>) },
    {
      title: t.feat,
      body: (
        <ul className="bul">
          {p.features[lang].map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      ),
    },
    {
      title: t.dec,
      body: (
        <dl className="dec">
          {p.decisions[lang].map((d) => (
            <div key={d.title}>
              <dt>{d.title}</dt>
              <dd>{d.body}</dd>
            </div>
          ))}
        </dl>
      ),
    },
    {
      title: t.stk,
      body: (
        <>
          <p>{p.architecture[lang]}</p>
          <ul className="stack-l">
            {p.techs.map((x) => (
              <li key={x.name}>
                <b>{x.name}</b>
                <span>{x.desc[lang]}</span>
              </li>
            ))}
          </ul>
        </>
      ),
    },
  ]
  if (p.challenges)
    sections.push({
      title: t.chall,
      body: (
        <ul className="bul">
          {p.challenges[lang].map((x) => (
            <li key={x}>{x}</li>
          ))}
        </ul>
      ),
    })
  sections.push({ title: t.role, body: <p>{p.role[lang]}</p> })
  sections.push({
    title: t.gal,
    body: p.image ? (
      <div className="gal">
        <img
          src={imageSrc(p.image)}
          alt={`${lang === "pt" ? "Tela do" : "Screenshot of"} ${p.name}`}
          width={1440}
          height={900}
          loading="lazy"
          decoding="async"
        />
      </div>
    ) : (
      <div className="noshot label">{t.noShot}</div>
    ),
  })

  return (
    <div className="view">
      <div className="wrap">
        <div className="p-head">
          <Link className="back-link label" href={`${base}/#projetos`}>
            <ArrowLeft className="ico" aria-hidden="true" /> {t.back2}
          </Link>
          <p className="label rt" style={{ marginTop: 8 }}>
            {k.chapter} {roman(i)} / {k.no} {pad(i + 1)}
          </p>
          <h1 className="worn">{p.name}</h1>
          <p className="sub">
            <span className="band b2">{p.subtitle[lang]}</span>
          </p>
          <div className="pmeta">
            {p.status && <span className="slab">{p.status[lang]}</span>}
            <span className="tag">{p.year}</span>
            <span className="tag">{origin}</span>
            {p.platforms.map((x) => (
              <span key={x} className="tag">
                {x === "web" ? <Monitor className="ico" aria-hidden="true" /> : <Smartphone className="ico" aria-hidden="true" />}
                {x === "web" ? t.web : t.mobile}
              </span>
            ))}
          </div>
          {p.links.length > 0 && (
            <div className="pcta">
              {p.links.map((l) => (
                <a
                  key={l.url}
                  className={`btn${l.kind === "code" ? "" : " primary"}`}
                  href={l.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {l.kind === "code" ? <Github className="ico" aria-hidden="true" /> : <ExternalLink className="ico" aria-hidden="true" />}{" "}
                  {l.kind === "code" ? t.code : l.kind === "landing" ? t.landing : t.live}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="cover">
          <div className="in scr">
            <ProjectThumb project={p} full priority />
          </div>
          <Hole seed={i + 1} style={{ right: "5%", bottom: "9%" }} />
        </div>
        <div className="pgrid">
          <article>
            {sections.map((s, n) => (
              <section key={s.title}>
                <h2>
                  <i />
                  <span>{s.title}</span>
                  <span className="n">{pad(n + 1)}</span>
                </h2>
                {s.body}
              </section>
            ))}
          </article>
          <aside className="regis">
            <dl>
              <div>
                <dt className="label">{t.year}</dt>
                <dd>{p.year}</dd>
              </div>
              <div>
                <dt className="label">{t.origin}</dt>
                <dd>{origin}</dd>
              </div>
              <div>
                <dt className="label">{t.stack}</dt>
                <dd className="tags">
                  {p.stack.map((s) => (
                    <span key={s} className="tag">
                      {s}
                    </span>
                  ))}
                </dd>
              </div>
            </dl>
          </aside>
        </div>
        <nav className="pn" aria-label={lang === "pt" ? "Outros projetos" : "Other projects"}>
          <Link href={`${base}/projetos/${prev.slug}/`}>
            <span className="label">
              <ArrowLeft className="ico" aria-hidden="true" /> {t.prev}
            </span>
            <h3>{prev.name}</h3>
          </Link>
          <Link href={`${base}/projetos/${next.slug}/`}>
            <span className="label">
              {t.next} <ArrowRight className="ico" aria-hidden="true" />
            </span>
            <h3>{next.name}</h3>
          </Link>
        </nav>
      </div>
    </div>
  )
}
