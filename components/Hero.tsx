"use client"

import { FormEvent, useState } from "react"
import { ArrowRight, Search, Sparkles } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

type HeroProps = { onSubmit: (target: string) => void }

export function Hero({ onSubmit }: HeroProps) {
  const [target, setTarget] = useState("")

  function submit(event: FormEvent) {
    event.preventDefault()
    if (!target.trim()) return
    onSubmit(target.trim())
    setTarget("")
  }

  return (
    <section className="relative overflow-hidden border-b border-slate-200 bg-white px-5 pb-14 pt-16 sm:pb-20 sm:pt-24">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,#f1f5f9,transparent_42%)]" />
      <div className="relative mx-auto max-w-5xl text-center">
        <div className="mx-auto mb-7 inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3.5 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-slate-600">
          <Sparkles className="h-3.5 w-3.5" /> vVJ Outreach Engine
        </div>
        <h1 className="mx-auto max-w-4xl text-balance text-4xl font-semibold leading-[1.08] tracking-[-0.045em] text-slate-950 sm:text-6xl">
          Turn the right creators into lasting brand partners.
        </h1>
        <p className="mx-auto mt-6 max-w-3xl text-balance text-base leading-7 text-slate-600 sm:text-lg">
          Meet the Smarketers Family Off Page Suite. The only unified ecosystem your brand needs for scaled, off-page visibility and outreach automation.
        </p>

        <form onSubmit={submit} className="mx-auto mt-10 max-w-3xl" aria-label="Find an influencer">
          <div className="flex flex-col rounded-2xl border border-slate-200 bg-white p-2 shadow-[0_18px_55px_-24px_rgba(15,23,42,0.35)] focus-within:border-slate-400 sm:flex-row">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
              <Input
                value={target}
                onChange={(event) => setTarget(event.target.value)}
                className="h-14 border-0 pl-12 text-base shadow-none focus:ring-0"
                placeholder="Paste a creator handle or search a niche…"
                aria-label="Creator handle or niche"
              />
            </div>
            <Button type="submit" size="lg" className="h-14 shrink-0 px-7">
              Get Started <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <p className="mt-3 text-xs text-slate-400">Try “wellness”, “@mayamoves”, or an Instagram profile URL.</p>
        </form>
      </div>
    </section>
  )
}
