export function Footer({ foot1, foot2 }: { foot1: string; foot2: string }) {
  return (
    <footer>
      <div className="wrap">
        <span>{foot1}</span>
        <span>{foot2}</span>
      </div>
    </footer>
  )
}
