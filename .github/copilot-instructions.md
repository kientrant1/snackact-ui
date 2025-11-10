# GitHub Copilot Instructions for React and Next.js Projects

This file provides guidelines for GitHub Copilot to ensure consistent, clean, and performant code generation for React and Next.js applications.

## 📁 Modular Guidelines Structure

For detailed guidelines, see the modular instruction files in the `.github/copilot-instructions/` directory:

- **[General Principles](./copilot-instructions/general-principles.md)** - Core coding principles, patterns, and best practices
- **[React Guidelines](./copilot-instructions/react-guidelines.md)** - React-specific component design, state management, and performance
- **[TypeScript Guidelines](./copilot-instructions/typescript-guidelines.md)** - TypeScript configuration and type organization
- **[Testing Guidelines](./copilot-instructions/testing-guidelines.md)** - Testing strategies and best practices
- **[Security Guidelines](./copilot-instructions/security-guidelines.md)** - Security practices and sensitive data handling
- **[Project Structure](./copilot-instructions/project-structure.md)** - File organization and architecture patterns
- **[PR Review Guidelines](./copilot-instructions/pr-review-guidelines.md)** - GitHub Pull Request review focus areas and checklist

## Development Workflow

### Code Quality & Configuration

- ESLint: Uses Flat config (eslint.config.js) with Next.js and TypeScript rules
- Prettier: Auto-formatting via lint-staged (see .prettierrc for custom rules)
- Husky, lint-staged: Check code before committing or pushing
- TypeScript: Strict mode enabled in tsconfig.json
- Tests: Vitest + Testing Library for unit tests

## Quick Reference

### Package Management

This project uses **yarn** for managing dependencies. All package installations and scripts should use `yarn` instead of `npm` or `pnpm`.

### Key Principles

- **TypeScript First:** All new code should be written in TypeScript
- **Component Focus:** Keep components small, focused, and testable
- **Security:** Never expose actual environment variables or API keys
- **Performance:** Prioritize Server Components and proper data fetching patterns
- **Type Safety:** Types go in `types/` folder, utilities in `lib/` folder

## Reference Links

### General Instructions

- [TypeScript](https://github.com/Code-and-Sorts/awesome-copilot-instructions/blob/main/instructions/languages/typescript/typescript.instructions.md?plain=1)
