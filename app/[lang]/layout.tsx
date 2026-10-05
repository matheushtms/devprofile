import type { Metadata } from "next"
import { notFound } from "next/navigation"
import "../globals.css"
import { langs } from "@/data/types"
import { dictionaries } from "@/data/dictionary"
import { fontBody, fontLabel, fontPoster, fontTitle } from "@/lib/fonts"
import { htmlLang, isLang } from "@/lib/site"
import { buildMetadata } from "@/lib/seo"
import { Background } from "@/components/portfolio/background"
import { BulletHoles } from "@/components/portfolio/bullet-holes"
import { CursorTheme } from "@/components/portfolio/cursor-theme"
import { SvgFilters } from "@/components/portfolio/svg-filters"
import { Header } from "@/components/portfolio/header"
import { Footer } from "@/components/portfolio/footer"
import { RevealObserver } from "@/components/portfolio/reveal-observer"

export const dynamicParams = false

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return isLang(lang) ? buildMetadata(lang, "") : {}
}

// Roda antes da pintura: abre escuro por padrão (independe do sistema), aplica o tema salvo e marca .js.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');var t='dark';try{if(localStorage.getItem('theme')==='light')t='light'}catch(e){}d.setAttribute('data-theme',t)})()`

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: Promise<{ lang: string }>
}) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = dictionaries[lang]

  return (
    <html lang={htmlLang(lang)} className={`${fontTitle.variable} ${fontLabel.variable} ${fontBody.variable} ${fontPoster.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <SvgFilters />
        <Background />
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <Header lang={lang} nav={t.nav} themeL={t.themeL} themeD={t.themeD} />
        <main id="main">{children}</main>
        <Footer foot1={t.foot1} foot2={t.foot2} />
        <RevealObserver />
        <BulletHoles />
        <CursorTheme />
      </body>
    </html>
  )
}
