"use client"

import { useEffect, useState } from "react"
import { Check, Copy, FileText, MessageSquareText, X } from "lucide-react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import { Influencer } from "@/lib/db"

type ProposalModalProps = { influencer: Influencer | null; onClose: () => void }

export function ProposalModal({ influencer, onClose }: ProposalModalProps) {
  const [copied, setCopied] = useState(false)

  useEffect(() => {
    if (!influencer) return
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && onClose()
    document.addEventListener("keydown", closeOnEscape)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", closeOnEscape)
      document.body.style.overflow = ""
    }
  }, [influencer, onClose])

  if (!influencer) return null

  const proposal = `Hi ${influencer.name.split(" ")[0]},\n\nI’ve been following ${influencer.handle} and love how you make ${influencer.niche.toLowerCase()} feel genuinely useful—especially your focus on ${influencer.note.toLowerCase()}\n\nWe’re building a creator-first campaign at Smarketers and think your voice would be a strong fit. The idea is a paid, flexible collaboration shaped around your usual format, with a clear brief and room for your perspective.\n\nWould you be open to a 15-minute chat this week? I can send the concept, timeline, and deliverables in advance.\n\nBest,\nThe Smarketers Team`

  const talkingPoints = [
    `Lead with ${influencer.name.split(" ")[0]}’s ${influencer.engagement}% engagement rate and unusually active community.`,
    `Connect the campaign naturally to ${influencer.niche.toLowerCase()} and their “${influencer.note}” positioning.`,
    "Offer creative control over the format, hook, and final language.",
    "Confirm paid usage, deliverables, review rounds, timing, and disclosure expectations upfront.",
  ]

  async function copyProposal() {
    await navigator.clipboard.writeText(`${proposal}\n\nTalking points:\n${talkingPoints.map((item) => `• ${item}`).join("\n")}`)
    setCopied(true)
    toast.success("Proposal copied", { description: "The collaboration brief is ready to paste." })
    window.setTimeout(() => setCopied(false), 1800)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/25 p-0 backdrop-blur-sm sm:items-center sm:p-6" role="dialog" aria-modal="true" aria-labelledby="proposal-title" onMouseDown={(event) => event.target === event.currentTarget && onClose()}>
      <div className="max-h-[92vh] w-full max-w-2xl overflow-y-auto rounded-t-3xl border border-slate-200 bg-white shadow-2xl sm:rounded-3xl">
        <div className="sticky top-0 z-10 flex items-start justify-between border-b border-slate-200 bg-white/95 px-6 py-5 backdrop-blur sm:px-8">
          <div>
            <div className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-slate-400">Generated collaboration kit</div>
            <h2 id="proposal-title" className="text-xl font-semibold tracking-tight text-slate-950">Proposal for {influencer.name}</h2>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose} aria-label="Close proposal"><X className="h-5 w-5" /></Button>
        </div>

        <div className="space-y-7 p-6 sm:p-8">
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-slate-50 p-4">
            <div className="grid h-11 w-11 place-items-center rounded-full bg-slate-900 text-sm font-bold text-white">{influencer.initials}</div>
            <div className="min-w-0 flex-1">
              <div className="font-semibold text-slate-950">{influencer.name} <span className="font-normal text-slate-400">{influencer.handle}</span></div>
              <div className="text-sm text-slate-500">{influencer.niche} · {influencer.platform} · {influencer.fitScore}% fit</div>
            </div>
          </div>

          <section>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-950"><FileText className="h-4 w-4" /> Collaboration proposal</div>
            <div className="whitespace-pre-line rounded-2xl border border-slate-200 bg-white p-5 text-sm leading-7 text-slate-600">{proposal}</div>
          </section>

          <section>
            <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-slate-950"><MessageSquareText className="h-4 w-4" /> Talking points</div>
            <ul className="space-y-3">
              {talkingPoints.map((item, index) => (
                <li key={item} className="flex gap-3 rounded-xl bg-slate-50 p-4 text-sm leading-6 text-slate-600">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-xs font-bold text-slate-700 shadow-sm">{index + 1}</span>
                  {item}
                </li>
              ))}
            </ul>
          </section>

          <div className="flex justify-end gap-3 border-t border-slate-100 pt-5">
            <Button variant="outline" onClick={onClose}>Close</Button>
            <Button onClick={copyProposal}>{copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}{copied ? "Copied" : "Copy proposal"}</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
