# Jesús Corrius - Personal Website

A modern, responsive personal resume website built with TypeScript, Vite, and Bootstrap 5. This project has been modernized from the original Start Bootstrap Resume template to align with current web development best practices and AI-assisted coding tools.

## 🚀 Live Demo

Visit the live website: [https://jcorrius.github.io](https://jcorrius.github.io)

## ✨ Features

- **Modern Tech Stack**: TypeScript, Vite, Bootstrap 5 (tree-shaken), SCSS
- **Developer Experience**: ESLint, Prettier, hot module replacement
- **Testing**: Vitest with DOM testing utilities
- **PWA Manifest**: Web app manifest (no service worker)
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Security**: CSP, CodeQL analysis, automated dependency updates, no external scripts
- **Accessibility**: Enhanced keyboard navigation and screen reader support
- **Performance**: Inline SVG icons, tree-shaken Bootstrap, async font loading, ~600KB saved vs original

## 🛠️ Development

### Prerequisites

- Node.js 22+
- npm

### Getting Started

```bash
# Clone the repository
git clone https://github.com/jcorrius/jcorrius.github.io.git
cd jcorrius.github.io

# Install dependencies
npm install

# Start development server
npm run dev
```

### Available Scripts

```bash
# Development
npm run dev          # Start development server with hot reload
npm run build        # Build for production
npm run preview      # Preview production build

# Code Quality
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors automatically
npm run format       # Format code with Prettier
npm run format:check # Check code formatting
npm run type-check   # Run TypeScript type checking

# Testing
npm run test         # Run tests
npm run test:ui      # Run tests with UI
npm run test:coverage # Run tests with coverage report
```

## 🏗️ Architecture

### Project Structure

```
├── .github/
│   ├── copilot-instructions.md  # AI assistant instructions
│   ├── workflows/               # GitHub Actions CI/CD
│   │   ├── ci-cd.yml            # Build, test, and deploy pipeline
│   │   └── codeql-analysis.yml  # Security analysis
│   └── dependabot.yml           # Automated dependency updates
├── AGENTS.md                    # Entry point for AI coding agents
├── public/                      # Static assets
│   ├── assets/                  # Images, favicon, icons
│   ├── llms.txt                 # LLM-friendly content
│   ├── manifest.json            # PWA manifest
│   ├── robots.txt               # Robots.txt
│   └── sitemap.xml              # Sitemap
├── src/
│   ├── assets/                  # Source images
│   ├── scss/                    # Sass stylesheets
│   │   ├── components/          # Component styles
│   │   ├── sections/            # Section-specific styles
│   │   ├── variables/           # Sass variables
│   │   ├── _global.scss         # Global styles
│   │   ├── _modern-enhancements.scss  # Modern CSS enhancements
│   │   └── styles.scss          # Main stylesheet entry
│   ├── test/                    # Test files
│   │   ├── setup.ts             # Test setup
│   │   └── main.test.ts         # Main tests
│   └── main.ts                  # TypeScript entry point
├── eslint.config.js             # ESLint configuration
├── tsconfig.json                # TypeScript configuration
├── vite.config.ts               # Vite configuration
└── vitest.config.ts             # Vitest configuration
```

### Key Technologies

- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Type-safe JavaScript with excellent tooling
- **Bootstrap 5**: Modern CSS framework with utility classes
- **Sass**: CSS preprocessor for maintainable stylesheets
- **Vitest**: Fast unit testing framework
- **ESLint + Prettier**: Code quality and formatting

## 🚀 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions when changes are pushed to the main branch.

### Manual Deployment

```bash
# Build the project
npm run build

# The dist/ folder contains the built website
# Deploy the contents to your web server
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes
4. Run tests: `npm test`
5. Check linting: `npm run lint`
6. Commit your changes: `git commit -m 'Add amazing feature'`
7. Push to the branch: `git push origin feature/amazing-feature`
8. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original template by [Start Bootstrap](https://startbootstrap.com/)
- Built with [Vite](https://vitejs.dev/)
- Styled with [Bootstrap](https://getbootstrap.com/)

---

**Built with ❤️ by [Jesús Corrius](https://github.com/jcorrius)**
