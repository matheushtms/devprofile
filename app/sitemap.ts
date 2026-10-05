import type { MetadataRoute } from "next"
import { projects } from "@/data/projects"
import { langs } from "@/data/types"
import { abs } from "@/lib/site"

export const dynamic = "force-static"

export default function sitemap(): MetadataRoute.Sitemap {
  return langs.flatMap((lang) => [
    { url: abs(`/${lang}/`), changeFrequency: "monthly" as const, priority: 1 },
    ...projects.map((p) => ({ url: abs(`/${lang}/projetos/${p.slug}/`), changeFrequency: "monthly" as const, priority: 0.7 })),
  ])
}
