import { Fragment } from "react"

/** Converte **trecho** em <b>, sem usar innerHTML. */
export function RichText({ text }: { text: string }) {
  return (
    <>
      {text.split("**").map((part, i) => (i % 2 ? <b key={i}>{part}</b> : <Fragment key={i}>{part}</Fragment>))}
    </>
  )
}
