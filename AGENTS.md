# AGENTS.md

This file is the entry point for AI coding agents (GitHub Copilot, Cursor, Claude Code, etc.).

Full instructions: [.github/copilot-instructions.md](.github/copilot-instructions.md)

## Quick Reference

- **TypeScript + Vite + Bootstrap 5 (tree-shaken)** static resume site
- `index.html` is the content source of truth — edit directly for resume changes
- `src/main.ts` is the only TS entry (smooth scroll, IntersectionObserver, keyboard nav)
- Icons are inline SVGs (no Font Awesome, no external CDN)
- Bootstrap is tree-shaken — only grid, navbar, nav, breadcrumb, utilities imported
- CSP via `<meta>` tag (`script-src 'self' 'unsafe-inline'` for Vite inline scripts)
- **Before committing:** `npm run format && npm run lint && npm run type-check && npm run format:check && npm run test -- --run && npm run build`
- **Fix issues:** `npm run lint:fix && npm run format`
- Node 24 · ES2022 · ESLint flat config · Prettier (`trailingComma: all`)
- Deploy is automatic via GitHub Actions on push to `main` (Pages source: "GitHub Actions")
- Never commit `dist/` — it's gitignored and deployed via CI

## Critical Pitfalls

- **Never remove `'unsafe-inline'` from CSP `script-src`** — Vite needs inline scripts for module detection. Without it, the page renders blank.
- **Always run `npm run format` after every file edit** — CI fails on unformatted files.
- **Test production build after security changes** — `npm run build && npm run preview`. CSP behaves differently in dev vs production.
- **Don't add `opacity: 0` without a CSS fallback** — if JS fails, content is invisible. Current sections have a 2s fallback animation.
- **Performance budget: ~117KB CSS, ~83KB JS** — don't add large dependencies. Prefer inline SVGs over icon libraries.
