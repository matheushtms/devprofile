/** Filtros SVG compartilhados, definidos uma única vez no layout: `worn` (tinta gasta, só em títulos grandes) e duotones. */
export function SvgFilters() {
  return (
    <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true" focusable="false">
      <defs>
        <filter id="worn" x="-4%" y="-6%" width="108%" height="112%">
          <feTurbulence type="fractalNoise" baseFrequency=".03" numOctaves="2" seed="4" result="warp" />
          <feDisplacementMap in="SourceGraphic" in2="warp" scale="5" result="d" />
          <feTurbulence type="fractalNoise" baseFrequency=".55" numOctaves="2" seed="11" result="gr" />
          <feColorMatrix in="gr" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 -16 11.6" result="holes" />
          <feComposite in="d" in2="holes" operator="in" />
        </filter>
        <filter id="duo-red" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.03 0.35 0.93" />
            <feFuncG type="table" tableValues="0 0.02 0.16" />
            <feFuncB type="table" tableValues="0 0.02 0.13" />
          </feComponentTransfer>
        </filter>
        <filter id="duo-teal" colorInterpolationFilters="sRGB">
          <feColorMatrix type="saturate" values="0" />
          <feComponentTransfer>
            <feFuncR type="table" tableValues="0.02 0.3 0.62" />
            <feFuncG type="table" tableValues="0.03 0.4 0.86" />
            <feFuncB type="table" tableValues="0.03 0.36 0.78" />
          </feComponentTransfer>
        </filter>
      </defs>
    </svg>
  )
}
