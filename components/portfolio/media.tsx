import type { Project, ProjectImage } from "@/data/types"
import { withBasePath } from "@/lib/utils"

export const imageSrc = (img: ProjectImage) => withBasePath(`/images/tela-${img}.png`)

const Wire = () => (
  <svg viewBox="0 0 200 120" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
    <rect x="10" y="10" width="180" height="100" rx="10" />
    <path d="M10 32h180" />
    <circle cx="24" cy="21" r="3" />
    <circle cx="36" cy="21" r="3" />
    <rect x="26" y="46" width="60" height="50" rx="6" />
    <path d="M98 52h76M98 68h60M98 84h70" />
  </svg>
)

/** Print do projeto ou, sem print, o placeholder de wireframe (trocar por imagem real é só preencher `image`). */
export function ProjectThumb({ project, priority = false }: { project: Project; priority?: boolean }) {
  if (project.image) {
    return (
      <img
        src={imageSrc(project.image)}
        alt=""
        width={1440}
        height={900}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
      />
    )
  }
  return (
    <div className="ph" style={{ "--h": project.hue } as React.CSSProperties}>
      <Wire />
      <b>{project.name}</b>
    </div>
  )
}
