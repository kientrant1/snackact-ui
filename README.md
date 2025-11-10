# Snackact UI

A React + TypeScript + Vite template project with modern tooling and best practices.

## 🚀 Tech Stack

- **Build Tool**: [Vite](https://vitejs.dev/)
- **Framework**: [React 19](https://react.dev/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [TailwindCSS v4](https://tailwindcss.com/)
- **Package Manager**: [Yarn 4](https://yarnpkg.com/)
- **Linting**: [ESLint](https://eslint.org/)
- **Formatting**: [Prettier](https://prettier.io/)
- **Git Hooks**: [Husky](https://typicode.github.io/husky/)
- **Pre-commit**: [lint-staged](https://github.com/okonet/lint-staged)

## 📁 Project Structure

```
snackact-ui/
├── public/             # Static assets
├── src/
│   ├── assets/        # Images, fonts, etc.
│   ├── components/    # Reusable React components
│   ├── constants/     # App constants and configuration
│   ├── context/       # React context providers
│   ├── functions/     # Business logic functions
│   ├── lib/           # Library code and helpers
│   ├── services/      # API services and external integrations
│   ├── styles/        # Global styles
│   ├── types/         # TypeScript type definitions
│   ├── utils/         # Utility functions
│   ├── App.tsx        # Main App component
│   ├── main.tsx       # Application entry point
│   └── index.css      # Global CSS with Tailwind directives
├── .env.template      # Environment variables template
├── .prettierrc        # Prettier configuration
├── eslint.config.js   # ESLint configuration
├── tailwind.config.js # TailwindCSS configuration
├── tsconfig.json      # TypeScript configuration
└── vite.config.ts     # Vite configuration
```

## 🛠️ Getting Started

### Prerequisites

- Node.js 18+
- Yarn 4.10.3 (managed via Corepack)

### Installation

1. Clone the repository
2. Install dependencies:

```bash
yarn install
```

3. Copy the environment template (optional):

```bash
cp .env.template .env
```

## 📜 Available Scripts

- `yarn dev` - Start development server
- `yarn build` - Build for production
- `yarn preview` - Preview production build
- `yarn lint` - Run ESLint
- `yarn format` - Format code with Prettier
- `yarn format:check` - Check code formatting
- `yarn typecheck` - Run TypeScript type checking
- `yarn prepare` - Set up Husky git hooks

## 🎨 Code Style

This project uses:

- **ESLint** for code linting with Prettier integration
- **Prettier** for code formatting
- **Husky** with **lint-staged** for pre-commit hooks

Code is automatically formatted and linted on commit.

### Prettier Configuration

- Single quotes
- No semicolons
- 2 space indentation
- Trailing commas (ES5)
- 80 character line width

## 🔧 Development

### Adding New Components

Create components in `src/components/` and export them through `index.ts`:

```typescript
// src/components/MyComponent.tsx
export const MyComponent = () => {
  return <div>My Component</div>
}

// src/components/index.ts
export { MyComponent } from './MyComponent'
```

### Using TailwindCSS

TailwindCSS v4 is configured and ready to use. Import in your components or use the utility classes directly:

```tsx
<button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded">
  Click me
</button>
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
