import type { Metadata } from "next"
import "../globals.css"

export const metadata: Metadata = {
  title: "Matheus Malta | Portfólio",
  description: "Portfólio de Matheus Malta, Engenheiro de Software.",
}

// Layout raiz só da página "/" (redireciona para /pt ou /en).
export default function RedirectLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
