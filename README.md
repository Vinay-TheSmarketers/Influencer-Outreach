# vVJ — Influencer Outreach Automation Engine Architecture & Guide

> **Smarketers Off-Page Suite** — Zero-configuration, local-first outreach workspace for discovering micro-influencers, managing relationships through a 5-stage pipeline, generating tailored collaboration proposals, and tracking engagement metrics.

---

## 🏗️ System Architecture Overview

```mermaid
flowchart TD
    User([User Input: @handle or Niche Keyword]) --> UI[Next.js App UI - OutreachApp.tsx]
    
    subgraph Target Processing & Handle Resolver
        UI -->|handleTarget Callback| Resolver[Handle & Niche Classifier]
        Resolver -->|Is @handle or URL?| CheckHandle{Handle vs Niche}
        CheckHandle -->|Handle| Lookup[Match Existing or Call createInfluencer]
        CheckHandle -->|Niche Keyword| ScanNiche[Filter Creator Directory by Niche]
    end
    
    subgraph 5-Stage Pipeline Engine
        Lookup --> Pipeline[Pipeline Workspace State]
        ScanNiche --> Pipeline
        
        Pipeline -->|Stage 1| S1[Discovered]
        Pipeline -->|Stage 2| S2[Engaging 1 week]
        Pipeline -->|Stage 3| S3[DM Sent]
        Pipeline -->|Stage 4| S4[Negotiating]
        Pipeline -->|Stage 5| S5[Assets Provided]
        
        Pipeline -->|moveInfluencer| StageShift[Advance/Rewind Sequence]
    end
    
    subgraph Proposal & Brief Generator
        Pipeline --> ProposalTrigger[Select Influencer for Proposal]
        ProposalTrigger --> Modal[ProposalModal.tsx Component]
        Modal --> DraftGen[Generate Collaboration Brief & Talking Points]
    end
    
    StageShift --> LocalStore[(Browser Local Storage Sync)]
    DraftGen --> CopyClipboard[One-Click Copy & Export]
```

---

## 🔍 How Influencer Discovery & Pipeline Logic Works

### 1. Dynamic Creator Resolver (`handleTarget`)
`OutreachApp.tsx` processes inputs dynamically:
- **Handle Identification**: Normalizes inputs starting with `@` or containing platform domain names (e.g. `instagram.com/creator`).
- **Creator Upsert**: If the creator exists in the workspace directory, vVJ shifts focus to their profile. If new, `createInfluencer()` initializes a new profile in the `Discovered` stage with calculated fit scores.
- **Niche Scanning**: Filters creator records by niche keywords (e.g., `Tech`, `Fitness`, `Beauty`, `Finance`), ranking results by engagement rate.

### 2. The 5-Stage Relationship Pipeline
Creators progress through five defined operational stages:
1. `Discovered`: Surfaced via niche search or handle input.
2. `Engaging (1 week)`: Warm-up phase (liking/commenting on creator content).
3. `DM Sent`: Initial collaboration proposal dispatched.
4. `Negotiating`: Term sheet, rates, and deliverables under discussion.
5. `Assets Provided`: Product samples, briefs, and trackable links dispatched.

### 3. Tailored Proposal Generator (`ProposalModal.tsx`)
Generates customized collaboration briefs based on platform and niche:
- Formulates specific deliverables (e.g., 1x Instagram Reel + 2x Story Slides).
- Computes recommended compensation bounds based on follower count and engagement rate.
- Creates tailored talking points aligning brand goals with creator content style.

---

## 📊 Tech Stack

- **Framework**: Next.js (App Router), React, TypeScript
- **Styling**: Tailwind CSS, Radix UI Primitives, Lucide Icons, Sonner Toasts
- **State & Persistence**: Browser `localStorage` with seed fallback

---

## 🚀 Running Locally

```bash
# Install dependencies
npm install

# Run dev server
npm run dev

# Open in browser
http://localhost:3000
```

---

## 🌐 Part of Smarketers Off-Page Suite
vVJ Influencer Outreach is part of the Smarketers Off-Page Suite — open-source, local-first marketing applications designed for privacy, speed, and reliability without SaaS dependencies.
