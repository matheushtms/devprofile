// GitHub Pages não tem redirect de servidor: meta refresh + JS (escolhe EN se o navegador for em inglês) + link.
// URLs relativas funcionam com e sem basePath (a raiz é sempre servida com barra final).
const script = `if(/^en/i.test(navigator.language||''))location.replace('en/');else location.replace('pt/');`

export default function RootRedirect() {
  return (
    <>
      <meta httpEquiv="refresh" content="1; url=pt/" />
      <script dangerouslySetInnerHTML={{ __html: script }} />
      <main className="wrap" style={{ paddingBlock: 72 }}>
        <p>
          <a href="pt/" style={{ textDecoration: "underline" }}>
            Ir para o portfólio em português
          </a>
          {" · "}
          <a href="en/" style={{ textDecoration: "underline" }}>
            Go to the portfolio in English
          </a>
        </p>
      </main>
    </>
  )
}
