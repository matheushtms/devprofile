import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// next/image não prefixa automaticamente o basePath com images.unoptimized:true
// no export estático (ver next.config.mjs) — usar em todo src estático absoluto.
export function withBasePath(path: string) {
  return `${process.env.NEXT_PUBLIC_BASE_PATH ?? ""}${path}`
}
