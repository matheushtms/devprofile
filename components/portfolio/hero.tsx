import Link from "next/link"
import { ArrowRight, Download } from "lucide-react"
import type { Dictionary, Lang } from "@/data/types"
import { poster } from "@/data/ui"
import { Hole } from "@/lib/hole"
import { withBasePath } from "@/lib/utils"
import { RichText } from "./rich-text"

const STAR = "M12 1.5l2.6 6.4 6.9.5-5.3 4.5 1.7 6.7L12 15.9 6.1 19.6l1.7-6.7L2.5 8.4l6.9-.5z"
const Star = () => (
  <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
    <path d={STAR} />
  </svg>
)

export function Hero({ t, lang }: { t: Dictionary; lang: Lang }) {
  return (
    <section className="hero" id="inicio">
      <div className="wrap hero-in">
        <div>
          <p className="label k">{t.heroRole}</p>
          <h1 className="mega worn" aria-label="Matheus Malta">
            <span>Matheus</span>
            <span className="band b2">Malta</span>
          </h1>
          <p className="lead">
            <RichText text={t.lead} />
          </p>
          <div className="cta">
            <Link className="btn primary" href="#projetos">
              {t.cta1} <ArrowRight className="ico" aria-hidden="true" />
            </Link>
            <a className="btn" href={withBasePath("/cv.pdf")} download>
              <Download className="ico" aria-hidden="true" /> {t.cta2}
            </a>
          </div>
        </div>
        <div className="poster-col">
          <div className="pw">
            <span className="nail" />
            <div className="poster">
              <div className="fr">
                <div className="wanted">{poster[lang].wanted}</div>
                <div className="stars" aria-hidden="true">
                  <Star />
                  <Star />
                  <Star />
                </div>
                <div className="pwr">
                  <div className="ph">
                    <img src={withBasePath("/images/profile.jpg")} alt="Matheus Malta" width={1402} height={1122} decoding="async" />
                  </div>
                  <span className="stamp">{t.avail}</span>
                </div>
                <div className="nm">Matheus Malta</div>
                <p className="rl">{t.heroRole}</p>
              </div>
            </div>
            <Hole seed={2} style={{ right: 24, top: 118 }} />
          </div>
        </div>
      </div>
      <svg className="ridge" viewBox="0 0 1440 240" preserveAspectRatio="none" aria-hidden="true">
        <path
          fill="currentColor"
          d="M0 240V150l60-14 70 30 80-48 70 22 90-60 70 40 90-30 100 52 80-40 70 18 110-62 90 34 80-18 100 56 70-24 90 38 90-42 60 24 70-12V240z"
        />
      </svg>
    </section>
  )
}
