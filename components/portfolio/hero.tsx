import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import type { Dictionary } from "@/data/types"
import { withBasePath } from "@/lib/utils"
import { HeroArt } from "./hero-art"
import { RichText } from "./rich-text"

export function Hero({ t }: { t: Dictionary }) {
  return (
    <div className="wrap hero" id="home-top">
      <div>
        <div className="avail">
          <span className="dot" />
          {t.avail}
        </div>
        <h1 aria-label="Matheus Malta">
          <span className="w" style={{ "--i": 0 } as React.CSSProperties} aria-hidden="true">
            Matheus
          </span>{" "}
          <span className="w" style={{ "--i": 1 } as React.CSSProperties} aria-hidden="true">
            Malta<span className="dotm">.</span>
          </span>
        </h1>
        <p className="mono" style={{ marginTop: 20, fontSize: ".85rem" }}>
          {t.heroRole}
        </p>
        <p className="lead">
          <RichText text={t.lead} />
        </p>
        <div className="cta">
          <Link className="btn primary" href="#projetos">
            {t.cta1} <ArrowRight className="ico" aria-hidden="true" />
          </Link>
          <a className="btn ghost" href={withBasePath("/cv.pdf")} download>
            <Download className="ico" aria-hidden="true" /> {t.cta2}
          </a>
        </div>
      </div>
      <HeroArt pilot={t.pilot} />
    </div>
  )
}
