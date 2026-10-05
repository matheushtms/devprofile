export type Lang = "pt" | "en"
export const langs: Lang[] = ["pt", "en"]

export type Localized<T> = Record<Lang, T>

export type Platform = "web" | "mobile"
export type Origin = "freela" | "acad"
export type ProjectImage = "dindin" | "patetive" | "plantei"

export interface Project {
  slug: string
  name: string
  /** matiz (HSL) do placeholder quando não há print */
  hue: number
  year: string
  origin: Origin
  platforms: Platform[]
  stack: string[]
  image: ProjectImage | null
  subtitle: Localized<string>
  status?: Localized<string>
  summary: Localized<string>
  context: Localized<string[]>
  features: Localized<string[]>
  decisions: Localized<{ title: string; body: string }[]>
  architecture: Localized<string>
  challenges?: Localized<string[]>
  role: Localized<string>
  techs: { name: string; desc: Localized<string> }[]
  links: { kind: "live" | "code" | "landing"; url: string }[]
}

export type IconName = "code" | "db" | "tool"

export interface Dictionary {
  skip: string
  nav: { id: string; label: string }[]
  avail: string
  heroRole: string
  /** **trecho** vira negrito */
  lead: string
  cta1: string
  cta2: string
  pilot: string
  aboutK: string
  aboutT: string
  bio: string[]
  facts: { k: string; v: string }[]
  backT: string
  back: string
  photoCap: string
  skK: string
  skT: string
  skCats: { title: string; icon: IconName; items: string[] }[]
  prK: string
  prT: string
  fType: string
  fOrigin: string
  fStack: string
  all: string
  web: string
  mobile: string
  freela: string
  acad: string
  clear: string
  emptyT: string
  emptyP: string
  viewP: string
  tableHint: string
  exK: string
  exT: string
  edK: string
  ctK: string
  ctT: string
  ctP: string
  copied: string
  cv: string
  cvS: string
  foot1: string
  foot2: string
  back2: string
  year: string
  origin: string
  stack: string
  ctxT: string
  feat: string
  dec: string
  chall: string
  role: string
  stk: string
  gal: string
  prev: string
  next: string
  live: string
  code: string
  landing: string
  noShot: string
  themeL: string
  themeD: string
  experience: { period: string; role: string; org: string; text: string; tags: string[] }[]
  education: { period: string; title: string; text: string }[]
}
