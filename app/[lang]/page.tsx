import { notFound } from "next/navigation"
import { dictionaries } from "@/data/dictionary"
import { projects, stackFilters } from "@/data/projects"
import { isLang } from "@/lib/site"
import { About } from "@/components/portfolio/about"
import { Contact } from "@/components/portfolio/contact"
import { Experience } from "@/components/portfolio/experience"
import { FactsStrip } from "@/components/portfolio/facts-strip"
import { Hero } from "@/components/portfolio/hero"
import { Rail } from "@/components/portfolio/rail"
import { ProjectsSection } from "@/components/portfolio/projects-section"
import { Skills } from "@/components/portfolio/skills"

export default async function Home({ params }: { params: Promise<{ lang: string }> }) {
  const { lang } = await params
  if (!isLang(lang)) notFound()
  const t = dictionaries[lang]

  return (
    <>
      <Rail nav={t.nav} label={lang === "pt" ? "Seções" : "Sections"} />
      <div className="view" id="home-top">
        <Hero t={t} lang={lang} />
        <FactsStrip t={t} />
        <About t={t} />
        <Skills t={t} />
        <ProjectsSection lang={lang} t={t} projects={projects} stackFilters={stackFilters} />
        <Experience t={t} />
        <Contact t={t} />
      </div>
    </>
  )
}
