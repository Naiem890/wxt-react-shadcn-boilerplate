# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Overview

WXT + React browser extension boilerplate. Uses WXT framework for cross-browser extension development with React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

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

## Notes

- After `pnpm install`, run `pnpm dedupe` if you see duplicate vite package type errors.
- `src/config/dom.ts` holds DOM selectors for content script targeting — update these per target site.
- WXT auto-imports `browser` API and `define*` functions — don't manually import them.
