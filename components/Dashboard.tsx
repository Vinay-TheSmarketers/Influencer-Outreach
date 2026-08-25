"use client"

import { ArrowLeft, ArrowRight, BarChart3, Eye, LayoutDashboard, ListFilter, Search, Sparkles, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { formatFollowers, Influencer, stages } from "@/lib/db"

type DashboardProps = {
  influencers: Influencer[]
  filter: string
  view: "pipeline" | "directory"
  onFilterChange: (value: string) => void
  onViewChange: (view: "pipeline" | "directory") => void
  onMove: (id: string, direction: -1 | 1) => void
  onViewProposal: (influencer: Influencer) => void
}

function InfluencerCard({ influencer, onMove, onViewProposal }: { influencer: Influencer; onMove: DashboardProps["onMove"]; onViewProposal: DashboardProps["onViewProposal"] }) {
  const stageIndex = stages.indexOf(influencer.stage)
  return (
    <article className="group rounded-2xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md">
      <div className="flex items-start gap-3">
        <div className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-slate-100 text-xs font-bold text-slate-700">{influencer.initials}</div>
        <div className="min-w-0 flex-1">
          <div className="truncate text-sm font-semibold text-slate-950">{influencer.name}</div>
          <div className="truncate text-xs text-slate-400">{influencer.handle}</div>
        </div>
        <span className="rounded-full border border-slate-200 px-2 py-1 text-[10px] font-bold text-slate-500">{influencer.fitScore}%</span>
      </div>
      <div className="mt-4 flex items-center justify-between text-xs text-slate-500">
        <span>{formatFollowers(influencer.followers)} followers</span>
        <span>{influencer.engagement}% eng.</span>
      </div>
      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
        <Button variant="ghost" size="sm" className="h-8 px-2 text-xs" onClick={() => onViewProposal(influencer)}><Eye className="h-3.5 w-3.5" /> Assets</Button>
        <div className="flex gap-1">
          <Button variant="ghost" size="icon" className="h-8 w-8" disabled={stageIndex === 0} onClick={() => onMove(influencer.id, -1)} aria-label={`Move ${influencer.name} back`}><ArrowLeft className="h-3.5 w-3.5" /></Button>
          <Button variant="outline" size="icon" className="h-8 w-8" disabled={stageIndex === stages.length - 1} onClick={() => onMove(influencer.id, 1)} aria-label={`Advance ${influencer.name}`}><ArrowRight className="h-3.5 w-3.5" /></Button>
        </div>
      </div>
    </article>
  )
}

export function Dashboard({ influencers, filter, view, onFilterChange, onViewChange, onMove, onViewProposal }: DashboardProps) {
  const filtered = influencers.filter((item) => `${item.name} ${item.handle} ${item.niche} ${item.location}`.toLowerCase().includes(filter.toLowerCase()))
  const active = influencers.filter((item) => item.stage !== "Discovered" && item.stage !== "Assets Provided").length
  const replies = influencers.filter((item) => ["Negotiating", "Assets Provided"].includes(item.stage)).length
  const metrics = [
    { label: "Creators tracked", value: influencers.length, detail: "Local workspace", icon: Users },
    { label: "Active sequences", value: active, detail: "Across 3 stages", icon: Sparkles },
    { label: "Positive replies", value: replies, detail: `${Math.round((replies / influencers.length) * 100)}% response rate`, icon: BarChart3 },
  ]

  return (
    <section id="workspace" className="bg-slate-50 px-4 py-12 sm:px-6 sm:py-16">
      <div className="mx-auto max-w-[1480px]">
        <div className="mb-8 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">
          <div>
            <div className="text-xs font-semibold uppercase tracking-[0.17em] text-slate-400">Campaign workspace</div>
            <h2 className="mt-2 text-3xl font-semibold tracking-[-0.035em] text-slate-950">Build relationships, not spreadsheets.</h2>
            <p className="mt-2 text-sm text-slate-500">Every move is saved automatically on this device.</p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:flex-row lg:w-auto">
            <div className="relative min-w-64 flex-1">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input value={filter} onChange={(event) => onFilterChange(event.target.value)} placeholder="Filter creators…" className="h-10 bg-white pl-10" />
            </div>
            <div className="flex rounded-xl border border-slate-200 bg-white p-1">
              <button onClick={() => onViewChange("pipeline")} className={cn("flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition", view === "pipeline" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50")}><LayoutDashboard className="h-3.5 w-3.5" /> Pipeline</button>
              <button onClick={() => onViewChange("directory")} className={cn("flex flex-1 items-center justify-center gap-2 rounded-lg px-3 py-2 text-xs font-semibold transition", view === "directory" ? "bg-slate-900 text-white" : "text-slate-500 hover:bg-slate-50")}><ListFilter className="h-3.5 w-3.5" /> Directory</button>
            </div>
          </div>
        </div>

        <div className="mb-6 grid gap-3 sm:grid-cols-3">
          {metrics.map(({ label, value, detail, icon: Icon }) => (
            <div key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
              <div className="flex items-center justify-between"><span className="text-sm font-medium text-slate-500">{label}</span><Icon className="h-4 w-4 text-slate-400" /></div>
              <div className="mt-3 text-3xl font-semibold tracking-tight text-slate-950">{value}</div>
              <div className="mt-1 text-xs text-slate-400">{detail}</div>
            </div>
          ))}
        </div>

        {view === "pipeline" ? (
          <div className="overflow-x-auto pb-3">
            <div className="grid min-w-[1180px] grid-cols-5 gap-3">
              {stages.map((stage, index) => {
                const items = filtered.filter((item) => item.stage === stage)
                return (
                  <div key={stage} className="rounded-2xl border border-slate-200 bg-slate-100/70 p-3">
                    <div className="mb-3 flex items-center justify-between px-1 py-1">
                      <div><div className="text-xs font-bold uppercase tracking-[0.1em] text-slate-600">{stage}</div><div className="mt-1 text-[11px] text-slate-400">{index === 0 ? "New opportunities" : index === 4 ? "Ready to launch" : "Sequence in motion"}</div></div>
                      <span className="grid h-6 min-w-6 place-items-center rounded-full bg-white px-1.5 text-xs font-bold text-slate-500 shadow-sm">{items.length}</span>
                    </div>
                    <div className="space-y-3">{items.map((influencer) => <InfluencerCard key={influencer.id} influencer={influencer} onMove={onMove} onViewProposal={onViewProposal} />)}</div>
                  </div>
                )
              })}
            </div>
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="hidden grid-cols-[1.5fr_.8fr_.7fr_.7fr_.8fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-[11px] font-bold uppercase tracking-[0.12em] text-slate-400 md:grid">
              <span>Creator</span><span>Niche</span><span>Audience</span><span>Engagement</span><span>Stage</span><span>Action</span>
            </div>
            <div className="divide-y divide-slate-100">
              {filtered.map((influencer) => (
                <div key={influencer.id} className="grid gap-4 px-5 py-4 transition hover:bg-slate-50 md:grid-cols-[1.5fr_.8fr_.7fr_.7fr_.8fr_auto] md:items-center">
                  <div className="flex items-center gap-3"><div className="grid h-10 w-10 place-items-center rounded-full bg-slate-100 text-xs font-bold">{influencer.initials}</div><div><div className="text-sm font-semibold">{influencer.name}</div><div className="text-xs text-slate-400">{influencer.handle} · {influencer.platform}</div></div></div>
                  <div className="text-sm text-slate-600">{influencer.niche}</div>
                  <div className="text-sm font-semibold text-slate-700">{formatFollowers(influencer.followers)}</div>
                  <div className="text-sm text-slate-600">{influencer.engagement}%</div>
                  <div><span className="inline-flex rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-semibold text-slate-600">{influencer.stage}</span></div>
                  <Button variant="outline" size="sm" onClick={() => onViewProposal(influencer)}><Eye className="h-3.5 w-3.5" /> Proposal</Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {filtered.length === 0 && <div className="rounded-2xl border border-dashed border-slate-300 bg-white py-16 text-center text-sm text-slate-500">No creators match “{filter}”. Try a broader niche or handle.</div>}
      </div>
    </section>
  )
}
