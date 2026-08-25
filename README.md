# vVJ — Influencer Outreach Automation Engine

vVJ is a zero-configuration, local-first outreach workspace for discovering micro-influencers, managing relationships through a five-stage pipeline, and generating tailored collaboration proposals and talking points.

## What is included

- A prominent creator-handle and niche search experience
- A realistic directory of 20 micro-influencers
- A five-stage outreach pipeline: Discovered → Engaging (1 week) → DM Sent → Negotiating → Assets Provided
- One-click stage movement with floating action notifications
- Generated collaboration proposals and campaign talking points for every creator
- Browser local-storage persistence with a one-click demo reset
- Responsive, accessible, white-only interface with a scrolling partner trust bar
- No API keys, environment variables, accounts, databases, or paid services

## Requirements

- Node.js 18.17 or newer (Node.js 20 LTS is recommended)
- npm 9 or newer
- Git

## Start the finished application

Open a terminal in this directory and run:

```bash
npm install
npm run dev
```

Then open [http://localhost:3000](http://localhost:3000).

For a production build:

```bash
npm run build
npm start
```

## Foundation source commands

The application was built on the requested open-source foundations. These exact commands clone the upstream projects for inspection or a clean-room rebuild:

```bash
git clone https://github.com/shadcn-ui/next-template.git vvj
cd vvj
git clone https://github.com/shadcn-ui/ui.git .upstream/shadcn-ui
git clone https://github.com/n8n-io/n8n.git .upstream/n8n
git clone https://github.com/prisma/prisma.git .upstream/prisma
npm install
npm run dev
```

The production app uses the `next-template` architecture and shadcn component conventions. Its local workflow state follows node-and-transition concepts found in n8n. Browser local storage is used instead of SQLite because it preserves the zero-edit, instant-start requirement while remaining entirely free; the Prisma source is retained as an optional reference for a future multi-user persistence layer.

## Project structure

```text
app/
  layout.tsx             Metadata, typography, and global toast host
  page.tsx               Application entry point
components/
  BrandLogo.tsx          Smarketers SVG growth mark
  Hero.tsx               Handle and niche input experience
  Dashboard.tsx          Metrics, directory, and outreach pipeline
  OutreachApp.tsx        State, persistence, and workflow actions
  ProposalModal.tsx      Generated proposal and talking points
  TrustBar.tsx           Infinite-scrolling partner bar
  ui/                    shadcn-style Button and Input primitives
lib/
  db.ts                  Typed seed data and local persistence functions
styles/
  globals.css            White-only design system and motion
```

## Local data behavior

The first visit seeds 20 realistic creators. Changes are saved under `vvj-influencers-v1` in the current browser's local storage. Use **Reset demo** in the header to restore the original campaign. Clearing browser site data also resets the workspace.

## Available commands

```bash
npm run dev        # Start the local development server
npm run build      # Create an optimized production build
npm start          # Run the production build
npm run lint       # Run Next.js lint checks
npm run typecheck  # Run strict TypeScript validation
```

## License notes

The upstream repositories retain their respective licenses. This application contains original product code composed on top of those open-source foundations.
