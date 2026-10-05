import type { Metadata } from "next"
import { notFound } from "next/navigation"
import "../globals.css"
import { langs } from "@/data/types"
import { dictionaries } from "@/data/dictionary"
import { fontBody, fontDisplay, fontMono } from "@/lib/fonts"
import { htmlLang, isLang } from "@/lib/site"
import { buildMetadata } from "@/lib/seo"
import { Background } from "@/components/portfolio/background"
import { Header } from "@/components/portfolio/header"
import { Footer } from "@/components/portfolio/footer"
import { ScrollProgress } from "@/components/portfolio/scroll-progress"
import { RevealObserver } from "@/components/portfolio/reveal-observer"

export const dynamicParams = false

export function generateStaticParams() {
  return langs.map((lang) => ({ lang }))
}

export async function generateMetadata({ params }: { params: Promise<{ lang: string }> }): Promise<Metadata> {
  const { lang } = await params
  return isLang(lang) ? buildMetadata(lang, "") : {}
}

// Roda antes da pintura: aplica o tema salvo (sem flash) e marca .js para os reveals.
const themeScript = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='light'||t==='dark')d.setAttribute('data-theme',t)}catch(e){}})()`

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
    <html lang={htmlLang(lang)} className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <Background />
        <a className="skip" href="#main">
          {t.skip}
        </a>
        <ScrollProgress />
        <Header lang={lang} nav={t.nav} themeL={t.themeL} themeD={t.themeD} />
        <main id="main">{children}</main>
        <Footer foot1={t.foot1} foot2={t.foot2} />
        <RevealObserver />
      </body>
    </html>
  )
}
