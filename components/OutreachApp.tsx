"use client"

import { useCallback, useEffect, useState } from "react"
import { Bell, ChevronDown, RotateCcw } from "lucide-react"
import { toast } from "sonner"

import { BrandLogo } from "@/components/BrandLogo"
import { Dashboard } from "@/components/Dashboard"
import { Hero } from "@/components/Hero"
import { ProposalModal } from "@/components/ProposalModal"
import { TrustBar } from "@/components/TrustBar"
import { Button } from "@/components/ui/button"
import { createInfluencer, Influencer, loadInfluencers, saveInfluencers, seedInfluencers, stages } from "@/lib/db"

export function OutreachApp() {
  const [influencers, setInfluencers] = useState<Influencer[]>(seedInfluencers)
  const [filter, setFilter] = useState("")
  const [view, setView] = useState<"pipeline" | "directory">("pipeline")
  const [selected, setSelected] = useState<Influencer | null>(null)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    setInfluencers(loadInfluencers())
    setHydrated(true)
  }, [])

  useEffect(() => {
    if (hydrated) saveInfluencers(influencers)
  }, [influencers, hydrated])

  const handleTarget = useCallback((target: string) => {
    const looksLikeHandle = target.startsWith("@") || target.includes("instagram.com") || target.includes("tiktok.com")
    if (looksLikeHandle) {
      const normalized = `@${target.replace(/^https?:\/\/(www\.)?/, "").replace(/^(instagram|tiktok)\.com\//, "").replace(/^@/, "").split(/[/?#]/)[0]}`.toLowerCase()
      const existing = influencers.find((item) => item.handle.toLowerCase() === normalized)
      if (existing) {
        setFilter(existing.handle)
        setView("directory")
        toast.success("Target identified", { description: `${existing.name} is already in your workspace.` })
      } else {
        const created = createInfluencer(target)
        setInfluencers((current) => [created, ...current])
        setFilter(created.handle)
        setView("directory")
        toast.success("Target identified", { description: `${created.name} was added to Discovered.` })
      }
    } else {
      setFilter(target)
      setView("directory")
      const count = influencers.filter((item) => `${item.name} ${item.niche} ${item.note}`.toLowerCase().includes(target.toLowerCase())).length
      toast.success("Niche scan complete", { description: `${count} relevant creator${count === 1 ? "" : "s"} surfaced for “${target}”.` })
    }
    window.setTimeout(() => document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" }), 100)
  }, [influencers])

  function moveInfluencer(id: string, direction: -1 | 1) {
    const target = influencers.find((influencer) => influencer.id === id)
    if (!target) return
    const nextIndex = Math.min(stages.length - 1, Math.max(0, stages.indexOf(target.stage) + direction))
    const nextStage = stages[nextIndex]
    setInfluencers((current) => current.map((influencer) => influencer.id === id ? { ...influencer, stage: nextStage } : influencer))
    toast.success(direction > 0 ? "Sequence advanced" : "Sequence updated", { description: `${target.name} moved to ${nextStage}.` })
  }

  function resetWorkspace() {
    setInfluencers(seedInfluencers)
    setFilter("")
    setView("pipeline")
    toast.success("Workspace restored", { description: "The sample campaign is ready to explore again." })
  }

  return (
    <div className="min-h-screen bg-white">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 max-w-[1480px] items-center justify-between px-5 sm:px-6">
          <div className="flex items-center gap-4">
            <BrandLogo />
            <span className="hidden h-5 w-px bg-slate-200 sm:block" />
            <span className="hidden rounded-md bg-slate-100 px-2 py-1 text-[10px] font-bold uppercase tracking-[0.16em] text-slate-500 sm:inline-flex">vVJ</span>
          </div>
          <nav className="flex items-center gap-1" aria-label="Workspace navigation">
            <Button variant="ghost" size="sm" className="hidden sm:inline-flex" onClick={() => document.getElementById("workspace")?.scrollIntoView({ behavior: "smooth" })}>Campaign</Button>
            <Button variant="ghost" size="icon" aria-label="Notifications" onClick={() => toast("You’re all caught up", { description: "No outreach actions need attention." })}><Bell className="h-4 w-4" /></Button>
            <Button variant="outline" size="sm" className="ml-1" onClick={resetWorkspace}><RotateCcw className="h-3.5 w-3.5" /><span className="hidden sm:inline">Reset demo</span></Button>
            <button className="ml-2 flex items-center gap-2 rounded-xl p-1.5 transition hover:bg-slate-50" onClick={() => toast("Local workspace", { description: "Your campaign is stored privately in this browser." })} aria-label="Open workspace profile">
              <span className="grid h-8 w-8 place-items-center rounded-full bg-slate-950 text-[11px] font-bold text-white">vVJ</span>
              <ChevronDown className="hidden h-3.5 w-3.5 text-slate-400 sm:block" />
            </button>
          </nav>
        </div>
      </header>

      <main>
        <Hero onSubmit={handleTarget} />
        <Dashboard
          influencers={influencers}
          filter={filter}
          view={view}
          onFilterChange={setFilter}
          onViewChange={setView}
          onMove={moveInfluencer}
          onViewProposal={setSelected}
        />
      </main>
      <TrustBar />
      <ProposalModal influencer={selected} onClose={() => setSelected(null)} />
    </div>
  )
}
