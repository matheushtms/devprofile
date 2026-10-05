import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google"

export const fontDisplay = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: "variable",
  axes: ["opsz"],
  variable: "--f-display",
  display: "swap",
})
export const fontBody = Geist({ subsets: ["latin"], variable: "--f-body", display: "swap" })
export const fontMono = Geist_Mono({ subsets: ["latin"], variable: "--f-mono", display: "swap" })
