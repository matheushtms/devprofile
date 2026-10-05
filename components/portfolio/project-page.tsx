import Link from "next/link"
import { ArrowLeft, ArrowRight, ExternalLink, Github, Monitor, Smartphone } from "lucide-react"
import type { Dictionary, Lang, Project } from "@/data/types"
import { imageSrc, ProjectThumb } from "./media"

interface Props {
  lang: Lang
  t: Dictionary
  project: Project
  prev: Project
  next: Project
}

export function ProjectPage({ lang, t, project: p, prev, next }: Props) {
  const origin = p.origin === "freela" ? t.freela : t.acad
  const base = `/${lang}`

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
          <ul className="stack-l" style={{ marginTop: 16 }}>
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
        <figure>
          <img src={imageSrc(p.image)} alt={`${lang === "pt" ? "Tela do" : "Screenshot of"} ${p.name}`} width={1440} height={900} loading="lazy" decoding="async" />
        </figure>
      </div>
    ) : (
      <div className="card" style={{ textAlign: "center", borderStyle: "dashed" }}>
        <p className="mono">{t.noShot}</p>
      </div>
    ),
  })

  return (
    <div className="view">
      <div className="wrap">
        <div className="ph-top">
          <Link className="back-link" href={`${base}/#projetos`}>
            <ArrowLeft className="ico" aria-hidden="true" /> {t.back2}
          </Link>
          <h1>{p.name}</h1>
          <p className="sub">{p.subtitle[lang]}</p>
          <div className="pmeta">
            {p.status && (
              <span className="chip accent">
                <span className="dot" />
                {p.status[lang]}
              </span>
            )}
            <span className="chip">{p.year}</span>
            <span className="chip">{origin}</span>
            {p.platforms.map((x) => (
              <span key={x} className="chip">
                {x === "web" ? <Monitor className="ico" aria-hidden="true" /> : <Smartphone className="ico" aria-hidden="true" />}
                {x === "web" ? t.web : t.mobile}
              </span>
            ))}
          </div>
          {p.links.length > 0 && (
            <div className="pcta">
              {p.links.map((l) => (
                <a key={l.url} className={`btn ${l.kind === "code" ? "ghost" : "primary"}`} href={l.url} target="_blank" rel="noopener noreferrer">
                  {l.kind === "code" ? <Github className="ico" aria-hidden="true" /> : <ExternalLink className="ico" aria-hidden="true" />}{" "}
                  {l.kind === "code" ? t.code : l.kind === "landing" ? t.landing : t.live}
                </a>
              ))}
            </div>
          )}
        </div>
        <div className="cover">
          <ProjectThumb project={p} priority />
        </div>
        <div className="pgrid">
          <article>
            {sections.map((s, i) => (
              <section key={s.title}>
                <h2>
                  <span className="n">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                {s.body}
              </section>
            ))}
          </article>
          <aside className="ficha">
            <div className="card">
              <dl>
                <div>
                  <dt className="mono">{t.year}</dt>
                  <dd>{p.year}</dd>
                </div>
                <div>
                  <dt className="mono">{t.origin}</dt>
                  <dd>{origin}</dd>
                </div>
                <div>
                  <dt className="mono">{t.stack}</dt>
                  <dd className="chips">
                    {p.stack.map((s) => (
                      <span key={s} className="chip">
                        {s}
                      </span>
                    ))}
                  </dd>
                </div>
              </dl>
            </div>
          </aside>
        </div>
        <nav className="pn" aria-label={lang === "pt" ? "Outros projetos" : "Other projects"}>
          <Link href={`${base}/projetos/${prev.slug}/`}>
            <span className="mono">
              <ArrowLeft className="ico" aria-hidden="true" /> {t.prev}
            </span>
            <h3>{prev.name}</h3>
          </Link>
          <Link href={`${base}/projetos/${next.slug}/`}>
            <span className="mono">
              {t.next} <ArrowRight className="ico" aria-hidden="true" />
            </span>
            <h3>{next.name}</h3>
          </Link>
        </nav>
      </div>
    </div>
  )
}
