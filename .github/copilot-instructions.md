# Copilot Instructions

## Repository Overview

This is a modernized personal resume website for Jesús Corrius, built with modern web technologies and optimized for AI-assisted development. The site showcases professional experience, skills, and projects in a responsive, accessible format.

**Live Site**: https://jcorrius.github.io

## Technology Stack

### Core Technologies

- **Frontend**: TypeScript, HTML5, Bootstrap 5.3.x
- **Build System**: Vite 8.x (Rolldown-based) with hot module replacement
- **Styling**: SCSS/Sass with PostCSS and Autoprefixer
- **Testing**: Vitest 4.x with jsdom for DOM testing
- **Code Quality**: ESLint 10.x (flat config) + Prettier
- **CI/CD**: GitHub Actions with automated deployment

### Key Dependencies

- `bootstrap@^5.3.8` - UI framework with data-bs-* attributes
- `vite@^8.1.3` - Modern build tool and dev server (bundles with Rolldown)
- `typescript@^6.0.3` - Type safety and enhanced IntelliSense
- `vitest@^4.1.10` - Fast unit testing framework
- `@vitejs/plugin-legacy@^8.1.0` - Legacy browser support
- `eslint@^10.6.0` - Code linting (flat config)
- `prettier@^3.9.4` - Code formatting

## Development Workflow

### Getting Started

```bash
npm install          # Install dependencies
npm run dev         # Start development server
npm run build       # Build for production
npm run preview     # Preview production build
```

### Code Quality Commands

```bash
npm run lint        # Run ESLint checks
npm run lint:fix    # Auto-fix ESLint issues
npm run format      # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check  # TypeScript type checking
```

### Testing Commands

```bash
npm test            # Run tests in watch mode
npm run test -- --run # Run all tests once (non-watch; what CI effectively does)
npm run test:ui     # Run tests with UI interface
npm run test:coverage # Run tests with coverage report

# Run a single test file or a single test by name:
npx vitest run src/test/main.test.ts
npx vitest run -t "should have navigation elements"
```

## Architecture (Big Picture)

This is a **single-page static resume**, not an app. Understanding it requires reading a few files together:

- **`index.html` is the source of truth for all content.** The entire resume (experience, education, skills, etc.) is hand-authored static markup. There is no templating, data file, or client-side rendering — to change resume text, edit `index.html` directly.
- **`src/main.ts` is the only TS entry and adds progressive enhancement only.** It wires smooth scrolling for `.js-scroll-trigger` links, an `IntersectionObserver` that adds `.animate-in` to `.resume-section` elements on scroll, and a `keyboard-navigation` body class toggle. No framework, router, or state management.
- **Styling flows through one SCSS entry.** `src/main.ts` imports `src/scss/styles.scss`, which imports only the needed Bootstrap modules (grid, navbar, nav, breadcrumb, transitions, utilities — not the full framework) plus custom SCSS. Vite + PostCSS/autoprefixer (configured in `vite.config.ts`) compile it.
- **Content is mirrored as structured data.** `index.html` contains a schema.org `Person` JSON-LD block in `<head>` **and** inline microdata (`itemprop`/`itemscope`) throughout `<body>`. When editing resume content, keep the visible text, the microdata, and the JSON-LD in sync.
- **Build/deploy:** `npm run build` runs `tsc && vite build`; `@vitejs/plugin-legacy` emits `*-legacy` and polyfill chunks. Sourcemaps are hidden (not referenced in output). CI (`.github/workflows/ci-cd.yml`, Node 24) runs type-check → lint → format:check → test → build, then deploys to GitHub Pages on `main`.

## Repository-Specific Conventions & Gotchas

- **Don't commit rebuilt `dist/` artifacts.** `dist/` is fully gitignored. Deployment is via GitHub Actions which builds and deploys automatically — never commit `dist/` contents.
- **GitHub Pages deploys via GitHub Actions** (`build_type: workflow`), not a `gh-pages` branch. The repo's Pages **source must stay set to "GitHub Actions"**; if it reverts to "Deploy from a branch", the `github-pages` environment rejects deploys from `main` with "deployments are only allowed from gh-pages". The `test` job is the meaningful code gate; `deploy` runs only on `main`.
- **Windows `format:check` false positive:** with `core.autocrlf=true`, `npm run format:check` flags `.prettierrc` (CRLF vs Prettier's `lf` default). CI on Linux (LF) passes it — don't "fix" it.
- **`npm test` is watch mode locally;** use `npm run test -- --run` for a one-shot run that mirrors CI.
- **`tsconfig.json` uses an explicit `types` array.** Keep `vite/client` listed so TypeScript (6+) resolves the `.scss` side-effect import in `main.ts` (otherwise it errors TS2882).
- **Lint is strict:** ESLint flat config (`eslint.config.js`) runs with `--max-warnings 0`, `@typescript-eslint/recommended` rules, and `no-console` as a warning — a stray `console.*` fails CI.
- **Prettier uses `trailingComma: "all"`** — trailing commas are required on all elements, including function parameters and arguments.
- **Content-Security-Policy** is set via `<meta>` tag in `index.html`. `script-src` includes `'unsafe-inline'` because Vite uses inline module scripts for browser detection and legacy fallback. `style-src` allows Google Fonts. No external scripts (Font Awesome removed, icons are inline SVGs).
- **Icons are inline SVGs** — Font Awesome was removed. All icons (social, checkmarks, graduation caps) are inline SVGs in `index.html`. Do not re-add Font Awesome or any icon CDN.
- **Bootstrap is tree-shaken** — `src/scss/styles.scss` imports only the needed Bootstrap modules. If you need a new Bootstrap component (e.g., forms, buttons, cards), add its `@import` to `styles.scss`.
- **Sections start at `opacity: 0`** and become visible via `.animate-in` class added by `IntersectionObserver` in `main.ts`. A CSS fallback animation makes them visible after 2s even if JS fails.
- **Google Fonts load async** via `media="print"` + `onload` pattern with `preload` hints. Fonts use `display=swap` to avoid FOIT.

## Common Pitfalls

- **Never remove `'unsafe-inline'` from `script-src`** — Vite injects inline module scripts for browser detection and legacy fallback. Without `'unsafe-inline'`, these are blocked by CSP and the page renders blank (content stays at `opacity: 0` because JS never runs).
- **Always test the production build after CSP or security changes** — `npm run dev` uses a different HTML injection pattern than `npm run build`. CSP behavior differs between dev and production. Run `npm run build && npm run preview` and verify the page renders correctly.
- **Always run `npm run format` after editing files** — CI runs `format:check` and fails on any unformatted file. Don't skip this step even for small edits.
- **Don't use `opacity: 0` on content sections without a CSS fallback** — if JS fails to load, content becomes permanently invisible. The current `.resume-section` has a CSS `@keyframes fallback-show` animation that makes sections visible after 2s without JS. Preserve this pattern when adding new animated sections.
- **Performance budget: CSS ~117KB, JS ~83KB** (gzip: ~17KB CSS, ~25KB JS). Don't add large dependencies. Prefer inline SVGs over icon libraries. Only import Bootstrap modules that are actually used.

## Project Structure

```
├── src/
│   ├── main.ts                    # TypeScript entry point
│   ├── scss/                      # Sass stylesheets
│   │   ├── components/            # Component styles
│   │   ├── sections/              # Section-specific styles
│   │   ├── variables/             # Sass variables
│   │   ├── _global.scss           # Global styles
│   │   ├── _modern-enhancements.scss  # Modern CSS enhancements
│   │   └── styles.scss            # Main stylesheet entry
│   ├── assets/                    # Source images
│   └── test/                      # Unit tests
│       ├── setup.ts               # Test setup (mocks, DOM)
│       └── main.test.ts           # Main tests
├── public/                        # Static public assets
│   ├── assets/                    # Images, favicon, icons
│   ├── llms.txt                   # LLM-friendly content
│   ├── manifest.json              # PWA manifest
│   ├── robots.txt                 # Robots.txt
│   └── sitemap.xml                # Sitemap
├── dist/                          # Built output (auto-generated)
├── .github/
│   ├── copilot-instructions.md    # AI assistant instructions
│   ├── workflows/                 # GitHub Actions CI/CD
│   │   ├── ci-cd.yml              # Build, test, and deploy pipeline
│   │   └── codeql-analysis.yml    # Security analysis
│   └── dependabot.yml             # Automated dependency updates
├── AGENTS.md                      # Entry point for AI coding agents
├── index.html                     # Main HTML template
├── eslint.config.js               # ESLint configuration (flat)
├── tsconfig.json                  # TypeScript configuration
├── vite.config.ts                 # Vite configuration
├── vitest.config.ts               # Vitest configuration
└── package.json                   # Dependencies and scripts
```

## Code Standards & Conventions

### TypeScript Guidelines

- Use strict TypeScript configuration with `noEmit` for type checking
- Target ES2022 with `forceConsistentCasingInFileNames` enabled
- Prefer `const` assertions and explicit typing for better IntelliSense
- Use ES modules (`import`/`export`) exclusively
- Avoid `any` types; use proper type definitions

### CSS/SCSS Guidelines

- Follow Bootstrap 5 conventions with `data-bs-*` attributes
- Use SCSS for enhanced styling capabilities
- Prefer CSS custom properties for theming
- Mobile-first responsive design approach

### Code Formatting

- Prettier handles all formatting automatically (`trailingComma: "all"`, `printWidth: 100`)
- ESLint enforces code quality with `@typescript-eslint/recommended` rules
- Use flat ESLint configuration (eslint.config.js)
- Maximum line length: 100 characters

### Naming Conventions

- Files: kebab-case (`my-component.ts`)
- Classes: PascalCase (`MyComponent`)
- Variables/functions: camelCase (`myVariable`)
- Constants: SCREAMING_SNAKE_CASE (`MY_CONSTANT`)

## Testing Strategy

### Test Organization

- Unit tests in `src/test/` directory
- Test files use `.test.ts` or `.spec.ts` extensions
- Use vitest with jsdom environment for DOM testing
- Test setup in `src/test/setup.ts` (mocks IntersectionObserver, resets DOM)

### Example Test Structure

```typescript
import { describe, it, expect, beforeEach, vi } from 'vitest';

describe('Component Name', () => {
  beforeEach(() => {
    document.body.innerHTML = '<!-- setup DOM -->';
  });

  it('should perform expected behavior', () => {
    expect(result).toBe(expected);
  });
});
```

## Build & Deployment

### Build Process

1. TypeScript compilation (`tsc`)
2. Vite bundling with tree-shaking
3. SCSS compilation and PostCSS processing
4. Asset optimization and legacy browser support
5. Sourcemap generation
6. Output to `dist/` directory

### Deployment

- Automatic deployment via GitHub Actions on push to `main`
- Pages source must be set to "GitHub Actions" (not a branch)
- Static site hosting on GitHub Pages
- Manual local preview: `npm run build && npm run preview`

### Browser Support

- Modern browsers (ES2022+)
- Legacy support via @vitejs/plugin-legacy (targets `defaults`)
- Mobile-first responsive design
- PWA capabilities for enhanced mobile experience

## AI Assistant Guidelines

### Code Generation Preferences

- **Always use TypeScript** with proper type annotations
- **Prefer modern ES6+ syntax** (const/let, arrow functions, destructuring)
- **Use Bootstrap 5 classes** and `data-bs-*` attributes consistently
- **Follow existing code patterns** and conventions in the repository
- **Write tests** for new functionality using Vitest

### When Making Changes

1. **Format code**: `npm run format` (run after EVERY file edit, not just at the end)
2. **Run type checking**: `npm run type-check`
3. **Fix linting issues**: `npm run lint:fix`
4. **Test changes**: `npm run test -- --run`
5. **Build to verify**: `npm run build`
6. **Preview production build**: `npm run preview` (especially after CSP/security changes)

### Code Quality Priorities

1. **Type Safety**: Ensure proper TypeScript typing
2. **Accessibility**: Maintain ARIA labels and keyboard navigation
3. **Performance**: Optimize bundle size and loading times
4. **Security**: Follow security best practices for dependencies
5. **Maintainability**: Write clear, self-documenting code

### Common Patterns

- Use `querySelector` with proper type assertions
- Implement Bootstrap modal/dropdown interactions with data attributes
- Handle responsive design with Bootstrap grid system
- Use CSS custom properties for theming

### Avoid These Patterns

- jQuery or other legacy libraries (use vanilla JS/TS)
- Inline styles (use CSS classes)
- Bootstrap 4 syntax (migrate to Bootstrap 5)
- CommonJS modules (use ES modules)
- `any` types (use proper type definitions)
- Deprecated npm packages

## Security Considerations

### Dependency Management

- Dependabot automatically updates dependencies (weekly, npm + github-actions)
- GitHub CodeQL scans for security vulnerabilities
- Regular `npm audit` checks in CI/CD
- Pin major versions, allow minor/patch updates

### Content Security

- Content-Security-Policy set via `<meta>` tag (script-src 'self' 'unsafe-inline', style-src 'self' Google Fonts 'unsafe-inline')
- No external scripts — all icons are inline SVGs
- Email obfuscated to reduce scraping
- Sourcemaps hidden in production (not referenced in output)
- Sanitize any user-generated content
- Use HTTPS for all external resources

## Contribution Workflow

### Before Making Changes

1. Pull latest changes from `main`
2. Create feature branch: `git checkout -b feature/description`
3. Install dependencies: `npm install`
4. Verify setup: `npm run dev`

### Development Process

1. Make incremental changes with frequent testing
2. Run quality checks: `npm run lint && npm run type-check`
3. Write/update tests for new functionality
4. Ensure all tests pass: `npm run test -- --run`
5. Format code: `npm run format`

### Submitting Changes

1. Build production version: `npm run build`
2. Commit with descriptive messages
3. Push branch and create pull request
4. Ensure CI/CD checks pass
5. Request review if needed

## AI-Specific Instructions

### When Generating Code

- **Context Awareness**: Always consider the existing codebase structure and patterns
- **Type Safety**: Include proper TypeScript types and interfaces
- **Testing**: Generate corresponding test cases for new functionality
- **Documentation**: Add JSDoc comments for complex functions
- **Compatibility**: Ensure Bootstrap 5 and modern browser compatibility

### Helpful Commands for AI Tools

```bash
# Quick development setup
npm install && npm run dev

# Full quality check (mirrors CI)
npm run lint && npm run type-check && npm run format:check && npm run test -- --run && npm run build

# Fix common issues
npm run lint:fix && npm run format
```

This repository is optimized for AI-assisted development with comprehensive tooling, clear conventions, and automated quality checks. Always prioritize type safety, accessibility, and performance when making changes.
