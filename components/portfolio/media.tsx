import type { Project, ProjectImage } from "@/data/types"
import { withBasePath } from "@/lib/utils"

export const imageSrc = (img: ProjectImage) => withBasePath(`/images/tela-${img}.png`)

export const Wire = () => (
  <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <rect x="10" y="10" width="180" height="100" rx="4" />
    <path d="M10 32h180" />
    <circle cx="24" cy="21" r="3" />
    <circle cx="36" cy="21" r="3" />
    <rect x="26" y="46" width="60" height="50" rx="3" />
    <path d="M98 52h76M98 68h60M98 84h70" />
  </svg>
)

/** Print do projeto (duotone nos cartões, colorido na capa) ou, sem print, o placeholder de wireframe.
 *  Para trocar por imagem real basta preencher `image` em data/projects.ts. */
export function ProjectThumb({ project, full = false, priority = false }: { project: Project; full?: boolean; priority?: boolean }) {
  if (project.image) {
    return (
      <img
        src={imageSrc(project.image)}
        alt=""
        width={1440}
        height={900}
        className={full ? undefined : "duo"}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    )
  }
  return (
    <div className="phd">
      <Wire />
    </div>
  )
}
