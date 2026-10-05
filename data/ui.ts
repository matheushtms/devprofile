import type { Lang, Localized } from "./types"

// Rótulos exclusivos do tema de cartaz (não fazem parte do dicionário geral).
export const poster: Localized<{ wanted: string; no: string; chapter: string }> = {
  pt: { wanted: "PROCURA-SE", no: "Nº", chapter: "Capítulo" },
  en: { wanted: "WANTED", no: "No.", chapter: "Chapter" },
}

export const sectionIds = ["sobre", "skills", "projetos", "experiencia", "contato"] as const

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X"]
export const roman = (n: number) => ROMAN[n] ?? String(n + 1)
export const pad = (n: number) => String(n).padStart(2, "0")
export type { Lang }
