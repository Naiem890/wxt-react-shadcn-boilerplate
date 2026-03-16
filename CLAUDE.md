# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Sales Sniper** (temporary name — client may finalize a different product name later) — A high-end B2B productivity Chrome extension that serves as an AI-assisted engagement assistant for LinkedIn. It helps professionals identify relevant conversations in their feed and generate personalized, context-aware engagement suggestions.

### User Workflow

1. **Signal Identification** — Highlight potential opportunities from the LinkedIn feed using configurable keyword patterns (e.g., "looking for recommendations"). Uses a fast keyword filter first, then calls AI only on matches to keep costs low.
2. **Context Understanding** — Read visible page context (post content, public profile info) to help the AI understand the conversation.
3. **Knowledge Base Linking (Private RAG)** — Users can upload PDFs/text files. Text is extracted, chunked, and stored in a vector database (e.g., Pinecone). Relevant chunks are retrieved at response time. The upload system must be fully self-serve — no developer changes needed to add/remove documents.
4. **AI Suggestion Generation** — Generate 3 hyper-personalized engagement suggestions (comments or messages). AI provider should be flexible (Gemini recommended for cost, but system should allow easy provider swapping — OpenAI, Claude, Gemini).
5. **Assisted Writing** — Once a user selects a suggestion, programmatically paste the message into LinkedIn's input field so LinkedIn registers the text and enables the "Send" button.

### Milestones (4 Weeks)

- **Milestone 1: UI/UX & Core Setup (Week 1)** — Design extension UI, set up core foundation, implement Firebase auth.
- **Milestone 2: Feed Scanner & Private RAG (Week 2)** — Proactive feed detector with keyword pre-filter + AI check, document upload & RAG system.
- **Milestone 3: Business Features & Monetization (Week 3)** — Stripe integration, subscription management, AI credit tracking.
- **Milestone 4: Polish, Assets & Launch (Week 4)** — Testing, bug fixing, Chrome Web Store assets and full submission process.

### Technical Stack

- Chrome Extension (Manifest V3) with React + TypeScript (WXT framework)
- Firebase (Auth + Firestore) for user accounts, credits, and knowledge base
- AI provider: Gemini (primary, for cost efficiency) — architecture must support easy swapping to OpenAI/Claude
- Vector database (e.g., Pinecone) for RAG document storage
- Stripe for billing/subscriptions
- Browser DOM interaction and UI injection for LinkedIn integration

### Crucial Requirements

- **Externalized Config**: All UI selectors and prompt templates must be stored in config files for easy updates without code redeployment.
- **Provider Flexibility**: AI model provider must be swappable without major refactoring.
- **Self-Serve RAG**: Document upload/removal must work without developer intervention.
- **Store-Ready Delivery**: Final delivery must include a packaged extension (.zip), store assets, and full Chrome Web Store submission handling.
- **Branding**: "Sales Sniper" is a placeholder name — may change later.

## Commands

```bash
pnpm dev              # Dev server (Chrome)
pnpm dev:firefox      # Dev server (Firefox)
pnpm build            # Production build (Chrome)
pnpm build:firefox    # Production build (Firefox)
pnpm zip              # Package as zip
pnpm compile          # TypeScript type-check (no emit)
```

## Architecture

**WXT entrypoints pattern**: Files in `src/entrypoints/` are auto-discovered by WXT. Each entrypoint uses WXT's `define*` functions (`defineContentScript`, `defineBackground`) which are auto-imported — no explicit imports needed.

- `src/entrypoints/popup/` — React app (browser action popup)
- `src/entrypoints/content.ts` — Content script injected into matched pages (edit `matches` array to target sites)
- `src/entrypoints/background.ts` — Service worker

**Config**: `wxt.config.ts` sets `srcDir: "src"`, `outDir: "dist"`, enables `@wxt-dev/module-react` and `@wxt-dev/auto-icons` modules. The auto-icons module generates all required icon sizes from `src/assets/icon.png`.

**Path alias**: `@` → `src/` (configured in both `wxt.config.ts` vite alias and `tsconfig.json` paths).

**Styling**: Tailwind CSS v4 via `@tailwindcss/vite` plugin. shadcn/ui components in `src/components/ui/`. Theme config (OKLch colors, dark mode) in `src/assets/tailwind.css`.

**Add shadcn components**: `pnpm dlx shadcn@latest add <component-name>`

**Content script helpers** (`src/helper/`): DOM utilities like `watchForElement`, `sleep`, `sleepUntilDocumentReady`, `getOrCreateAppRoot`, `attachStyle` for injecting UI into web pages.

**Selectors config** (`src/config/dom.ts`): DOM selectors for content script targeting — update these per target site. This is the externalized config for LinkedIn UI selectors.

## Notes

- After `pnpm install`, run `pnpm dedupe` if you see duplicate vite package type errors.
- WXT auto-imports `browser` API and `define*` functions — don't manually import them.
- All prompt templates should be stored in config files, not hardcoded in logic.
- The foundation is ported from Esprit AI (developer's existing similar tool).
