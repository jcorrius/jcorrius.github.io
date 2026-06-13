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

- `bootstrap@^5.3.8` - UI framework with data-bs-\* attributes
- `vite@^8.0.16` - Modern build tool and dev server (bundles with Rolldown)
- `typescript@^6.0.3` - Type safety and enhanced IntelliSense
- `vitest@^4.1.8` - Fast unit testing framework
- `@vitejs/plugin-legacy@^8.0.2` - Legacy browser support

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
- **Styling flows through one SCSS entry.** `src/main.ts` imports `src/scss/styles.scss`, which imports in order: variables → Bootstrap → global → components (`scss/components/`) → sections (`scss/sections/`) → modern enhancements. Vite + PostCSS/autoprefixer (configured in `vite.config.ts`) compile it.
- **Content is mirrored as structured data.** `index.html` contains a schema.org `Person` JSON-LD block in `<head>` **and** inline microdata (`itemprop`/`itemscope`) throughout `<body>`. When editing resume content, keep the visible text, the microdata, and the JSON-LD in sync.
- **Build/deploy:** `npm run build` runs `tsc && vite build`; `@vitejs/plugin-legacy` emits `*-legacy` and polyfill chunks. CI (`.github/workflows/ci-cd.yml`, Node 22) runs type-check → lint → format:check → test → build, then deploys to GitHub Pages on `main`.

## Repository-Specific Conventions & Gotchas

- **Don't commit rebuilt `dist/` artifacts.** `dist/` is gitignored, but `dist/index.html` and `dist/assets/img/*` were force-tracked historically. A production build rewrites `dist/index.html` with new hashed asset names that aren't tracked — revert it (`git checkout -- dist/index.html`) and commit only real source changes.
- **GitHub Pages deploys via GitHub Actions** (`build_type: workflow`), not a `gh-pages` branch. The repo's Pages **source must stay set to "GitHub Actions"**; if it reverts to "Deploy from a branch", the `github-pages` environment rejects deploys from `main` with "deployments are only allowed from gh-pages". The `test` job is the meaningful code gate; `deploy` runs only on `main`.
- **Windows `format:check` false positive:** with `core.autocrlf=true`, `npm run format:check` flags `.prettierrc` (CRLF vs Prettier's `lf` default). CI on Linux (LF) passes it — don't "fix" it.
- **`npm test` is watch mode locally;** use `npm run test -- --run` for a one-shot run that mirrors CI.
- **`tsconfig.json` uses an explicit `types` array.** Keep `vite/client` listed so TypeScript (6+) resolves the `.scss` side-effect import in `main.ts` (otherwise it errors TS2882).
- **Lint is strict:** ESLint flat config (`eslint.config.js`) runs with `--max-warnings 0`, and `no-console` is a warning — a stray `console.*` fails CI.

## Project Structure

```
├── src/
│   ├── main.ts          # TypeScript entry point
│   ├── scss/            # Sass stylesheets
│   ├── assets/          # Static assets (images, etc.)
│   └── test/            # Unit tests
├── public/              # Static public assets
├── dist/               # Built output (auto-generated)
├── .github/
│   ├── workflows/      # GitHub Actions CI/CD
│   └── dependabot.yml  # Automated dependency updates
├── index.html          # Main HTML template
├── vite.config.ts      # Vite configuration
├── tsconfig.json       # TypeScript configuration
└── package.json        # Dependencies and scripts
```

## Code Standards & Conventions

### TypeScript Guidelines

- Use strict TypeScript configuration with `noEmit` for type checking
- Prefer `const` assertions and explicit typing for better IntelliSense
- Use ES modules (`import`/`export`) exclusively
- Avoid `any` types; use proper type definitions

### CSS/SCSS Guidelines

- Follow Bootstrap 5 conventions with `data-bs-*` attributes
- Use SCSS for enhanced styling capabilities
- Prefer CSS custom properties for theming
- Mobile-first responsive design approach

### Code Formatting

- Prettier handles all formatting automatically
- ESLint enforces code quality rules
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
- Use vitest for fast, Jest-compatible testing
- jsdom for DOM manipulation testing

### Testing Best Practices

- Write tests for all business logic
- Test user interactions and accessibility
- Mock external dependencies appropriately
- Aim for meaningful test descriptions

### Example Test Structure

```typescript
import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Component Name', () => {
  beforeEach(() => {
    // Setup code
  });

  it('should perform expected behavior', () => {
    // Test implementation
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
5. Output to `dist/` directory

### Deployment

- Automatic deployment via GitHub Actions on push to `main`
- Manual deployment: `npm run build` + push to `gh-pages` branch
- Static site hosting on GitHub Pages
- CDN distribution for optimal performance

### Browser Support

- Modern browsers (ES2020+)
- Legacy support via @vitejs/plugin-legacy
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

1. **Run type checking** before committing: `npm run type-check`
2. **Format code automatically**: `npm run format`
3. **Fix linting issues**: `npm run lint:fix`
4. **Test changes**: `npm test`
5. **Build to verify**: `npm run build`

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
- Inline styles (use CSS classes or CSS-in-JS)
- Bootstrap 4 syntax (migrate to Bootstrap 5)
- CommonJS modules (use ES modules)
- Deprecated npm packages

## Security Considerations

### Dependency Management

- Dependabot automatically updates dependencies
- GitHub CodeQL scans for security vulnerabilities
- Regular `npm audit` checks in CI/CD
- Pin major versions, allow minor/patch updates

### Content Security

- No external script execution
- Sanitize any user-generated content
- Use HTTPS for all external resources
- Implement proper CORS policies

### Development Security

- Never commit secrets or API keys
- Use environment variables for configuration
- Validate all inputs and sanitize outputs
- Follow OWASP security guidelines

## Performance Guidelines

### Bundle Optimization

- Vite automatically handles tree-shaking
- Use dynamic imports for code splitting when needed
- Optimize images and assets in `public/` directory
- Minimize CSS and JavaScript in production builds

### Loading Performance

- Lazy load images below the fold
- Use appropriate image formats (WebP, AVIF)
- Minimize render-blocking resources
- Implement proper caching strategies

## Accessibility Requirements

### WCAG Compliance

- Maintain WCAG 2.1 AA compliance
- Use semantic HTML5 elements
- Provide alt text for all images
- Ensure keyboard navigation works

### Testing Accessibility

- Test with screen readers
- Verify keyboard-only navigation
- Check color contrast ratios
- Validate ARIA attributes

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
4. Ensure all tests pass: `npm test`
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

### Code Review Focus Areas

- TypeScript type correctness and completeness
- Bootstrap 5 component usage and accessibility
- Test coverage and quality
- Performance implications of changes
- Security considerations for new dependencies

### Helpful Commands for AI Tools

```bash
# Quick development setup
npm install && npm run dev

# Full quality check
npm run lint && npm run type-check && npm test && npm run build

# Fix common issues
npm run lint:fix && npm run format

# Debug build issues
npm run type-check && npm run build -- --debug
```

This repository is optimized for AI-assisted development with comprehensive tooling, clear conventions, and automated quality checks. Always prioritize type safety, accessibility, and performance when making changes.
