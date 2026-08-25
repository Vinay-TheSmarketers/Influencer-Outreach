import "@/styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Toaster } from "sonner"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "vVJ — Influencer Outreach Automation",
  description:
    "Discover micro-influencers, move relationships through a focused outreach pipeline, and generate collaboration assets locally.",
  openGraph: {
    title: "vVJ — Influencer Outreach Automation",
    description: "Influencer outreach, orchestrated.",
    type: "website",
    images: [{ url: "/og.png", width: 1200, height: 630, alt: "vVJ — Influencer outreach, orchestrated." }],
  },
  twitter: {
    card: "summary_large_image",
    title: "vVJ — Influencer Outreach Automation",
    description: "Influencer outreach, orchestrated.",
    images: ["/og.png"],
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} min-h-screen bg-white font-sans text-slate-900 antialiased`}>
        {children}
        <Toaster
          position="top-right"
          toastOptions={{
            classNames: {
              toast: "!border-slate-200 !bg-white !text-slate-900 !shadow-xl",
              description: "!text-slate-500",
              actionButton: "!bg-slate-900 !text-white",
            },
          }}
        />
      </body>
    </html>
  )
}
