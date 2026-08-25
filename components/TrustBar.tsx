const partners = ["NORTHSTAR", "KITE & CO.", "BRIGHTLAB", "MOTION", "FORMHAUS", "LUMEN", "GOOD DAY", "FIELDWORK"]

export function TrustBar() {
  return (
    <footer className="overflow-hidden border-t border-slate-200 bg-slate-50 py-5" aria-label="Trusted partners">
      <div className="trust-track flex items-center">
        {[...partners, ...partners].map((partner, index) => (
          <div key={`${partner}-${index}`} className="flex items-center">
            <span className="px-8 text-xs font-bold tracking-[0.22em] text-slate-400 sm:px-12">{partner}</span>
            <span className="h-1 w-1 rounded-full bg-slate-300" />
          </div>
        ))}
      </div>
    </footer>
  )
}
