# AGENTS.md

This file is the entry point for AI coding agents (GitHub Copilot, Cursor, Claude Code, etc.).

Full instructions: [.github/copilot-instructions.md](.github/copilot-instructions.md)

## Quick Reference

- **TypeScript + Vite + Bootstrap 5** static resume site
- `index.html` is the content source of truth — edit directly for resume changes
- `src/main.ts` is the only TS entry (smooth scroll, IntersectionObserver, keyboard nav)
- **Before committing:** `npm run lint && npm run type-check && npm run format:check && npm run test -- --run && npm run build`
- **Fix issues:** `npm run lint:fix && npm run format`
- Node 24 · ES2022 · ESLint flat config · Prettier (`trailingComma: all`)
- Deploy is automatic via GitHub Actions on push to `main` (Pages source: "GitHub Actions")
