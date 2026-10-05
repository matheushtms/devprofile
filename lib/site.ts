import type { Lang } from "@/data/types"

// URL pública (GitHub Pages). Usada em canonical, hreflang, Open Graph e sitemap.
export const SITE_URL = "https://matheushtms.github.io/devprofile"

export const CONTACT = {
  email: "matheushtms04@gmail.com",
  linkedin: "https://www.linkedin.com/in/matheus-malta-a39b66255/",
  github: "https://github.com/matheushtms",
}

export const meta: Record<Lang, { title: string; description: string; locale: string }> = {
  pt: {
    title: "Matheus Malta | Engenheiro de Software",
    description:
      "Portfólio de Matheus Malta, estudante de Engenharia de Software na PUC Minas: produtos full-stack e mobile, do modelo de dados ao deploy.",
    locale: "pt_BR",
  },
  en: {
    title: "Matheus Malta | Software Engineer",
    description:
      "Portfolio of Matheus Malta, Software Engineering student at PUC Minas: full-stack and mobile products, from data model to deploy.",
    locale: "en_US",
  },
}

export const htmlLang = (lang: Lang) => (lang === "pt" ? "pt-BR" : "en")
export const isLang = (v: string): v is Lang => v === "pt" || v === "en"

export const abs = (path: string) => `${SITE_URL}${path}`
