export function SectionHead({ n, kicker, title, hint }: { n: string; kicker: string; title: string; hint?: string }) {
  return (
    <div className="sh rv">
      <span className="num" aria-hidden="true">
        {n}
      </span>
      <p className="label rt">
        {n} / {kicker}
      </p>
      <h2 className="worn">{title}</h2>
      {hint && <p className="hint">{hint}</p>}
    </div>
  )
}
