"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Copy, Download, Github, Linkedin, Mail } from "lucide-react"
import type { Dictionary } from "@/data/types"
import { CONTACT } from "@/lib/site"
import { withBasePath } from "@/lib/utils"

export function Contact({ t }: { t: Dictionary }) {
  const [toast, setToast] = useState("")
  const timer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)
  useEffect(() => () => clearTimeout(timer.current), [])

  function show(msg: string) {
    setToast(msg)
    clearTimeout(timer.current)
    timer.current = setTimeout(() => setToast(""), 2200)
  }

  async function copy() {
    try {
      await navigator.clipboard.writeText(CONTACT.email)
      show(t.copied)
    } catch {
      show(CONTACT.email)
    }
  }

  return (
    <section className="blk" id="contato">
      <div className="wrap">
        <div className="contact rv">
          <div>
            <span className="mono">05 / {t.ctK}</span>
            <h2 style={{ marginTop: 12 }}>{t.ctT}</h2>
            <p>{t.ctP}</p>
          </div>
          <div className="clist">
            <button type="button" className="crow" onClick={copy}>
              <Mail className="ico" aria-hidden="true" />
              <span>
                <small>E-mail</small>
                {CONTACT.email}
              </span>
              <Copy className="ico" aria-hidden="true" />
            </button>
            <a className="crow" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="ico" aria-hidden="true" />
              <span>
                <small>LinkedIn</small>
                matheus-malta
              </span>
              <ArrowUpRight className="ico" aria-hidden="true" />
            </a>
            <a className="crow" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
              <Github className="ico" aria-hidden="true" />
              <span>
                <small>GitHub</small>
                matheushtms
              </span>
              <ArrowUpRight className="ico" aria-hidden="true" />
            </a>
            <a className="crow" href={withBasePath("/cv.pdf")} download>
              <Download className="ico" aria-hidden="true" />
              <span>
                <small>{t.cvS}</small>
                {t.cv}
              </span>
            </a>
          </div>
        </div>
      </div>
      <div className={`toast${toast ? " on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  )
}
