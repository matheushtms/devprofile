import type { Metadata } from "next"
import type { Lang } from "@/data/types"
import { abs, meta } from "./site"

/** path sem idioma, ex.: "" (home) ou "/projetos/plantei". */
export function buildMetadata(lang: Lang, path: string, title?: string, description?: string): Metadata {
  const m = meta[lang]
  const other: Lang = lang === "pt" ? "en" : "pt"
  const t = title ? `${title} | Matheus Malta` : m.title
  const d = description ?? m.description
  const url = abs(`/${lang}${path}/`)
  return {
    title: t,
    description: d,
    alternates: {
      canonical: url,
      languages: {
        "pt-BR": abs(`/pt${path}/`),
        en: abs(`/en${path}/`),
        "x-default": abs(`/pt${path}/`),
      },
    },
    openGraph: {
      type: "website",
      url,
      title: t,
      description: d,
      locale: m.locale,
      alternateLocale: meta[other].locale,
      siteName: "Matheus Malta",
      images: [{ url: abs("/images/profile.jpg"), width: 1402, height: 1122, alt: "Matheus Malta" }],
    },
    twitter: { card: "summary_large_image", title: t, description: d, images: [abs("/images/profile.jpg")] },
  }
}
