"use client"

import { useEffect, useRef, useState } from "react"
import { ArrowUpRight, Copy, Download, Github, Linkedin, Mail } from "lucide-react"
import type { Dictionary } from "@/data/types"
import { Hole } from "@/lib/hole"
import { CONTACT } from "@/lib/site"
import { withBasePath } from "@/lib/utils"

/** Contato em laje vermelha: copiar e-mail, LinkedIn, GitHub e baixar o CV (sem formulário). */
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
        <div className="finale rv">
          <div>
            <p className="label">05 / {t.ctK}</p>
            <h2 className="worn" style={{ marginTop: 10 }}>
              {t.ctT}
            </h2>
            <p>{t.ctP}</p>
          </div>
          <div className="clist">
            <button type="button" className="crw" onClick={copy}>
              <Mail className="ico" aria-hidden="true" />
              <span>
                <small>E-mail</small>
                {CONTACT.email}
              </span>
              <Copy className="ico" aria-hidden="true" />
            </button>
            <a className="crw" href={CONTACT.linkedin} target="_blank" rel="noopener noreferrer">
              <Linkedin className="ico" aria-hidden="true" />
              <span>
                <small>LinkedIn</small>
                matheus-malta
              </span>
              <ArrowUpRight className="ico" aria-hidden="true" />
            </a>
            <a className="crw" href={CONTACT.github} target="_blank" rel="noopener noreferrer">
              <Github className="ico" aria-hidden="true" />
              <span>
                <small>GitHub</small>
                matheushtms
              </span>
              <ArrowUpRight className="ico" aria-hidden="true" />
            </a>
            <a className="crw" href={withBasePath("/cv.pdf")} download>
              <Download className="ico" aria-hidden="true" />
              <span>
                <small>{t.cvS}</small>
                {t.cv}
              </span>
            </a>
          </div>
          <Hole seed={4} style={{ right: "34%", bottom: 26 }} />
        </div>
      </div>
      <div className={`toast${toast ? " on" : ""}`} role="status" aria-live="polite">
        {toast}
      </div>
    </section>
  )
}
