# Jesús Corrius - Personal Website

A modern, responsive personal resume website built with TypeScript, Vite, and Bootstrap 5. This project has been modernized from the original Start Bootstrap Resume template to align with current web development best practices and AI-assisted coding tools.

## 🚀 Live Demo

Visit the live website: [https://jcorrius.github.io](https://jcorrius.github.io)

## ✨ Features

- **Modern Tech Stack**: TypeScript, Vite, Bootstrap 5, SCSS
- **Developer Experience**: ESLint, Prettier, hot module replacement
- **Testing**: Vitest with DOM testing utilities
- **PWA Ready**: Web app manifest and service worker support
- **CI/CD Pipeline**: Automated testing, building, and deployment
- **Security**: CodeQL analysis and automated dependency updates
- **Accessibility**: Enhanced keyboard navigation and screen reader support
- **Performance**: Optimized builds with tree-shaking and legacy browser support

## 🛠️ Development

### Prerequisites

- Node.js 18+ 
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
│   ├── workflows/          # GitHub Actions CI/CD
│   └── dependabot.yml      # Automated dependency updates
├── public/                 # Static assets
│   ├── assets/            # Images, favicon, etc.
│   └── manifest.json      # PWA manifest
├── src/
│   ├── scss/              # Sass stylesheets
│   │   ├── components/    # Component styles
│   │   ├── sections/      # Section-specific styles
│   │   └── variables/     # Sass variables
│   ├── test/              # Test files
│   └── main.ts            # TypeScript entry point
├── eslint.config.js       # ESLint configuration
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── vitest.config.ts       # Vitest configuration
```

### Key Technologies

- **Vite**: Fast build tool with hot module replacement
- **TypeScript**: Type-safe JavaScript with excellent tooling
- **Bootstrap 5**: Modern CSS framework with utility classes
- **Sass**: CSS preprocessor for maintainable stylesheets
- **Vitest**: Fast unit testing framework
- **ESLint + Prettier**: Code quality and formatting

## 🔄 Modernization Changes

This project was modernized from the original Start Bootstrap Resume template:

### Security & Dependencies
- ✅ Updated Bootstrap from 4.5.0 to 5.3.7
- ✅ Fixed 22 security vulnerabilities
- ✅ Added Dependabot for automated dependency management
- ✅ Implemented GitHub CodeQL for security scanning

### Developer Experience
- ✅ Added TypeScript configuration for better code intelligence
- ✅ Implemented ESLint + Prettier for consistent code formatting
- ✅ Replaced custom build scripts with modern Vite bundler
- ✅ Added hot module replacement for faster development
- ✅ Integrated Vitest testing framework

### Modern Build System
- ✅ Migrated from custom Node.js scripts to Vite
- ✅ Updated to PostCSS 8 with modern autoprefixer
- ✅ Added tree-shaking and modern bundling optimizations
- ✅ Implemented development server with live reload

### CI/CD & Automation
- ✅ Added GitHub Actions workflows for automated building and testing
- ✅ Implemented automated deployment to GitHub Pages
- ✅ Added code quality checks and security scanning
- ✅ Set up automated dependency updates

### Web Standards
- ✅ Updated to Bootstrap 5 for modern CSS features
- ✅ Improved accessibility and SEO
- ✅ Added PWA capabilities
- ✅ Enhanced with modern CSS animations and interactions

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
- Icons by [Font Awesome](https://fontawesome.com/)

---

**Built with ❤️ by [Jesús Corrius](https://github.com/jcorrius)**

To begin using this template, choose one of the following options to get started:

- [Download the latest release on Start Bootstrap](https://startbootstrap.com/themes/resume/)
- Install using npm: `npm i startbootstrap-resume`
- Clone the repo: `git clone https://github.com/StartBootstrap/startbootstrap-resume.git`
- [Fork, Clone, or Download on GitHub](https://github.com/StartBootstrap/startbootstrap-resume)

## Usage

### Basic Usage

After downloading, simply edit the HTML and CSS files included with `dist` directory. These are the only files you need to worry about, you can ignore everything else! To preview the changes you make to the code, you can open the `index.html` file in your web browser.

### Advanced Usage

Clone the source files of the theme and navigate into the theme's root directory. Run `npm install` and then run `npm start` which will open up a preview of the template in your default browser, watch for changes to core template files, and live reload the browser when changes are saved. You can view the `package.json` file to see which scripts are included.

#### npm Scripts

- `npm run build` builds the project - this builds assets, HTML, JS, and CSS into `dist`
- `npm run build:assets` copies the files in the `src/assets/` directory into `dist`
- `npm run build:pug` compiles the Pug located in the `src/pug/` directory into `dist`
- `npm run build:scripts` brings the `src/js/scripts.js` file into `dist`
- `npm run build:scss` compiles the SCSS files located in the `src/scss/` directory into `dist`
- `npm run clean` deletes the `dist` directory to prepare for rebuilding the project
- `npm run start:debug` runs the project in debug mode
- `npm start` or `npm run start` runs the project, launches a live preview in your default browser, and watches for changes made to files in `src`

You must have npm installed in order to use this build environment.

## Bugs and Issues

Have a bug or an issue with this template? [Open a new issue](https://github.com/StartBootstrap/startbootstrap-resume/issues) here on GitHub or leave a comment on the [theme overview page at Start Bootstrap](https://startbootstrap.com/themes/resume/).

## About

Start Bootstrap is an open source library of free Bootstrap themes and templates. All of the free themes and templates on Start Bootstrap are released under the MIT license, which means you can use them for any purpose, even for commercial projects.

- <https://startbootstrap.com>
- <https://twitter.com/SBootstrap>

Start Bootstrap was created by and is maintained by **[David Miller](http://davidmiller.io/)**.

- <http://davidmiller.io>
- <https://twitter.com/davidmillerskt>
- <https://github.com/davidtmiller>

Start Bootstrap is based on the [Bootstrap](https://getbootstrap.com/) framework created by [Mark Otto](https://twitter.com/mdo) and [Jacob Thorton](https://twitter.com/fat).

## Copyright and License

Copyright 2013-2020 Start Bootstrap LLC. Code released under the [MIT](https://github.com/StartBootstrap/startbootstrap-resume/blob/gh-pages/LICENSE) license.
