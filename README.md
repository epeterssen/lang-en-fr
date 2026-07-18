# lang-en-fr — French Language Learning App

[Persistence](./documentation\persistence.md)
[St. Emilion 2022](https://vins-saint-emilion.com/en/welcome-in-the-vineyard/the-2022-classification/)
https://picsart.com/create/editor?category=miniapps&selectionMode=click&projectId=6a5bb18a5bc9a63f144fc26a

## Overview

A React single-page app for learning French, deployed on AWS. The frontend is static (no server) and communicates with an AWS Lambda function for AI-powered Q&A. The Lambda holds the Anthropic API key server-side so it is never exposed to the browser.

geojson.io — simplest online editor; paste your GeoJSON, drag vertices to adjust boundaries, copy back out
mapshaper.org — better for complex edits; supports snapping boundaries between adjacent polygons
QGIS — free desktop app, most powerful but steeper learning curve

https://claude.ai/code/artifact/51ee6ae8-5b51-4f59-b77d-deb7b56e0cbd?via=auto_preview

---

## Architecture

```
Browser
  └── React SPA (AWS Amplify)
        └── AIAgentDrawer ──HTTP──> AWS Lambda (us-east-1)
                                        └── Anthropic API (claude-sonnet-4-6)
```

---

## 1. Frontend (React SPA)

**Stack:** React 18 · TypeScript · Vite · Tailwind CSS · shadcn/ui · Phosphor Icons v2 · Zustand · React Router v6

**Repo:** https://github.com/epeterssen/lang-en-fr

**Deployed via:** AWS Amplify — auto-deploys on every push to `main`.

### Key Files

| File | Purpose |
|---|---|
| `src/App.tsx` | Router and top-level layout |
| `src/components/Layout.tsx` | Shell: sticky header, drawer trigger |
| `src/components/FlagBanner.tsx` | French flag accent bar |
| `src/components/HamburgerMenu.tsx` | Settings toggles (background, copy-paste, rolodex) |
| `src/components/AIAgentDrawer.tsx` | Slide-up AI chat drawer |
| `src/components/SectionCard.tsx` | Shared card (blue/red variant, badge color auto-matched) |
| `src/components/ConjugationTable.tsx` | Verb conjugation table with test/reveal toggle |
| `src/components/RolodexView.tsx` | Card carousel (swipe/scroll/drag) |
| `src/components/UnitHeader.tsx` | Sticky unit title with key-entry badges |
| `src/pages/Home.tsx` | Landing page |
| `src/pages/MainMenu.tsx` | 8-unit accordion menu |
| `src/pages/Unit1.tsx` | Unit 1: Foundations |
| `src/pages/Unit2.tsx` | Unit 2: Nouns and Articles |
| `src/pages/Unit3.tsx` | Unit 3: Pronouns |
| `src/pages/Unit4.tsx` | Unit 4: Present Tense Verbs |
| `src/utils/txt.tsx` | `TXT.ttip()` hover tooltip utility |
| `src/types.ts` | Shared `Section` / `ContentItem` types |
| `src/store/settings.ts` | Zustand store (showBackground, allowCopyPaste, rolodex) |
| `.env` / `.env.production` | `VITE_CHAT_API_URL` — Lambda endpoint |

### To Update
- **Add a unit:** Create `src/pages/UnitN.tsx`, add a route in `App.tsx`, link it in `MainMenu.tsx`
- **Change Lambda URL:** Edit `VITE_CHAT_API_URL` in both `.env` and `.env.production`, redeploy via Amplify

---

## 2. AI Backend (AWS Lambda)

**Region:** us-east-1  
**Function URL:** `https://r45rvnktkxozmxltletq73zmg40fpoju.lambda-url.us-east-1.on.aws/`  
**Source:** `lambda/handler.mjs` in this repo  
**Runtime:** Node.js (ESM)

The Lambda receives the conversation history from the drawer, forwards it to the Anthropic API, and returns the assistant reply. The Anthropic API key never leaves the Lambda.

### To Update the Lambda Code
1. Edit `lambda/handler.mjs` locally
2. In the AWS Console → Lambda → function → **Code** tab
3. Paste the updated file contents and click **Deploy**

### To Rotate the Anthropic API Key
1. Go to https://platform.claude.com — Workspace: Default — Key name: `understandingfrench`
2. Create a new key
3. In AWS Console → Lambda → function → **Configuration** → **Environment variables**
4. Update `ANTHROPIC_API_KEY` with the new key
5. Revoke the old key on platform.claude.com

---

## 3. AWS Console Access

**Login:** https://us-east-2.signin.aws.amazon.com — *Sign in using root user email*  
**Important:** Switch region to **us-east-1** (top-right dropdown) after login — Lambda lives there, not us-east-2.

**Services used:**
- **Amplify** — frontend hosting and CI/CD
- **Lambda** — AI backend function

---

## 4. Anthropic API

**Console:** https://platform.claude.com  
**Workspace:** Default  
**Key name:** `understandingfrench`  
**Model:** `claude-sonnet-4-6`
