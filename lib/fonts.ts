import { Anton, Barlow, Oswald, Rye } from "next/font/google"

// Títulos de cartaz, rótulos, texto corrido e a fonte de cartaz (usada só no "PROCURA-SE").
export const fontTitle = Anton({ subsets: ["latin"], weight: "400", variable: "--font-anton", display: "swap" })
export const fontLabel = Oswald({ subsets: ["latin"], weight: ["400", "500", "600"], variable: "--font-oswald", display: "swap" })
export const fontBody = Barlow({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-barlow",
  display: "swap",
})
export const fontPoster = Rye({ subsets: ["latin"], weight: "400", variable: "--font-rye", display: "swap" })
