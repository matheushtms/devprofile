import { CircleCheck, GraduationCap, Globe, MapPin } from "lucide-react"
import type { Dictionary } from "@/data/types"

const icons = [MapPin, GraduationCap, Globe, CircleCheck]

/** Faixa de fatos com ícones, logo abaixo do hero. */
export function FactsStrip({ t }: { t: Dictionary }) {
  return (
    <div className="strip">
      <div className="wrap">
        {t.facts.map((f, i) => {
          const Icon = icons[i % icons.length]
          return (
            <div className="it" key={f.k}>
              <Icon className="ico" aria-hidden="true" />
              <div>
                <span className="label muted">{f.k}</span>
                <b>{f.v}</b>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
