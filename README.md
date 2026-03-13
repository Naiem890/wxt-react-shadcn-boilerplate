# WXT + React Browser Extension Boilerplate

A production-ready browser extension boilerplate built with WXT, React 19, TypeScript, Tailwind CSS v4, and shadcn/ui.

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | [WXT](https://wxt.dev) v0.20 |
| UI | React 19, TypeScript 5.9 |
| Styling | Tailwind CSS v4, shadcn/ui, Radix UI |
| Icons | Lucide React |
| Font | Inter Variable |
| DOM Utilities | Arrive.js (MutationObserver wrapper) |

## Project Structure

```
src/
├── assets/
│   └── tailwind.css           # Tailwind config with shadcn theme (OKLch colors, dark mode)
├── components/
│   └── ui/
│       └── button.tsx          # shadcn Button (6 variants, 7 sizes)
├── config/
│   ├── constants.ts            # App-level constants
│   └── dom.ts                  # DOM selectors for content script targeting
├── entrypoints/
│   ├── background.ts           # Background service worker
│   ├── content.ts              # Content script (injected into web pages)
│   └── popup/                  # Browser action popup (React app)
│       ├── index.html
│       ├── main.tsx
│       └── App.tsx
├── helper/
│   ├── helper.ts               # sleep, sleepUntilDocumentReady, getOrCreateAppRoot, attachStyle
│   └── dom-watcher.ts          # watchForElement — observe DOM for new/changed elements
├── lib/
│   └── utils.ts                # cn() — merge Tailwind classes (clsx + tailwind-merge)
└── types/
    └── arrive.ts               # TypeScript definitions for Arrive library
```

## Getting Started

```bash
# Install dependencies
pnpm install

# Start dev server (Chrome)
pnpm dev

# Start dev server (Firefox)
pnpm dev:firefox

# Build for production
pnpm build

# Build for Firefox
pnpm build:firefox

# Package as zip
pnpm zip
```

## Extension Entrypoints

- **Popup** — The browser action UI. A React app rendered when the user clicks the extension icon.
- **Content Script** — Injected into matched web pages. Edit the `matches` array in `src/entrypoints/content.ts` to target your desired sites.
- **Background** — A service worker for extension-level logic (storage, messaging, alarms, etc.).

## Adding shadcn Components

shadcn is pre-configured. Add new components with:

```bash
pnpm dlx shadcn@latest add <component-name>
```

Components are placed in `src/components/ui/`.

## Path Aliases

`@` is aliased to `src/`, so you can import like:

```ts
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
```

## DOM Utilities (for Content Scripts)

The boilerplate includes helpers for content script development:

- **`watchForElement(selector, callback, options?)`** — Watch for elements appearing in the DOM using MutationObserver. Returns an unsubscribe function.
- **`sleep(ms)`** — Promise-based delay.
- **`sleepUntilDocumentReady(selector, timeout)`** — Wait for a specific element to appear.
- **`getOrCreateAppRoot(container, id)`** — Create or retrieve a root div for mounting React components into the page.
- **`attachStyle(parent, css)`** — Inject CSS into a parent element.

## Important Notes

- After `pnpm install`, if you see type errors related to duplicate vite packages, run `pnpm dedupe` to resolve them.
- The `src/config/dom.ts` file contains DOM selectors — update these to match your target website's structure.
