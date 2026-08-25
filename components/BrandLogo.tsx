export function BrandLogo() {
  return (
    <div className="flex items-center gap-2.5" aria-label="Smarketers">
      <svg viewBox="0 0 36 36" className="h-8 w-8" role="img" aria-label="Smarketers growth mark">
        <rect x="1" y="1" width="34" height="34" rx="10" fill="#0f172a" />
        <path d="M9 25.5 15 20l5 2.6 7-8.1" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="m22.7 14.1 5.2-.7-.8 5.1" fill="none" stroke="white" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M10.2 11.6c2-2 7.1-2.2 9.5-.2M15.9 24.2c-2.3.4-5-.3-6.4-1.8" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" />
      </svg>
      <span className="text-lg font-bold tracking-[-0.03em] text-slate-950">Smarketers</span>
    </div>
  )
}
