import type { Metadata } from "next"
import { notFound } from "next/navigation"
import { dictionaries } from "@/data/dictionary"
import { getProject, projects } from "@/data/projects"
import { langs } from "@/data/types"
import { isLang } from "@/lib/site"
import { buildMetadata } from "@/lib/seo"
import { ProjectPage } from "@/components/portfolio/project-page"

type Params = Promise<{ lang: string; slug: string }>

export const dynamicParams = false

export function generateStaticParams() {
  return langs.flatMap((lang) => projects.map((p) => ({ lang, slug: p.slug })))
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { lang, slug } = await params
  const p = getProject(slug)
  if (!isLang(lang) || !p) return {}
  return buildMetadata(lang, `/projetos/${slug}`, `${p.name}, ${p.subtitle[lang]}`, p.summary[lang])
}

export default async function ProjectRoute({ params }: { params: Params }) {
  const { lang, slug } = await params
  const i = projects.findIndex((p) => p.slug === slug)
  if (!isLang(lang) || i < 0) notFound()
  const n = projects.length
  return (
    <ProjectPage
      lang={lang}
      t={dictionaries[lang]}
      project={projects[i]}
      index={i}
      prev={projects[(i + n - 1) % n]}
      next={projects[(i + 1) % n]}
    />
  )
}
