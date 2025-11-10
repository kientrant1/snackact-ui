# Understanding tsconfig.lib.json for npm Libraries

## Overview

When building a library for npm, you need different TypeScript compilation settings than what you use for development. The `tsconfig.lib.json` file provides library-specific TypeScript configuration that generates proper declaration files (.d.ts) for npm consumers while excluding development-only files.

## The Problem with Using tsconfig.app.json for Libraries

### Your Current tsconfig.app.json Settings

```json
{
  "compilerOptions": {
    "noEmit": true, // ❌ No files generated
    "declaration": undefined, // ❌ No .d.ts files
    "jsx": "react-jsx" // ✅ Good for development
  },
  "include": ["src"] // ✅ Includes everything
}
```

**Issues for Library Building:**

- ❌ **`noEmit: true`** - Prevents TypeScript from generating any files
- ❌ **No declaration files** - Consumers get no TypeScript support
- ❌ **Includes test files** - Test files would be included in library types
- ❌ **Includes stories** - Storybook files would be included in library types
- ❌ **Wrong output directory** - No control over where files are generated

## The Solution: Dedicated Library Configuration

### Your tsconfig.lib.json Configuration

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "noEmit": false, // ✅ Generate files
    "declaration": true, // ✅ Generate .d.ts files
    "declarationMap": true, // ✅ Generate source maps for types
    "emitDeclarationOnly": true, // ✅ Only generate declarations (Vite handles JS)
    "outDir": "./dist" // ✅ Output to dist folder
  },
  "include": ["src"],
  "exclude": [
    "src/**/*.stories.*", // ✅ Exclude Storybook files
    "src/**/*.test.*", // ✅ Exclude test files
    "src/**/*.spec.*" // ✅ Exclude spec files
  ]
}
```

## Configuration Breakdown

### 1. Extending Base Configuration

```json
{
  "extends": "./tsconfig.app.json"
}
```

**Purpose:**

- Inherits all base TypeScript settings
- Maintains consistency with development configuration
- Only overrides library-specific settings

### 2. Declaration Generation

```json
{
  "declaration": true,
  "declarationMap": true,
  "emitDeclarationOnly": true
}
```

**Why Each Setting:**

- **`declaration: true`** - Generates `.d.ts` files for TypeScript consumers
- **`declarationMap: true`** - Creates source maps for better debugging in IDEs
- **`emitDeclarationOnly: true`** - Only outputs type declarations (Vite handles JavaScript compilation)

### 3. Output Control

```json
{
  "noEmit": false,
  "outDir": "./dist"
}
```

- **`noEmit: false`** - Overrides the app config to actually generate files
- **`outDir: "./dist"`** - Places declarations alongside Vite's JavaScript output

### 4. File Filtering

```json
{
  "exclude": ["src/**/*.stories.*", "src/**/*.test.*", "src/**/*.spec.*"]
}
```

**Excludes development files that shouldn't be in your library's public API**

## Build Process Integration

### How It Works with Your Build Commands

```json
{
  "scripts": {
    "build:lib": "tsc -p tsconfig.lib.json && vite build --mode lib"
  }
}
```

**Step-by-Step Process:**

1. **TypeScript Compilation** (`tsc -p tsconfig.lib.json`)
   - Generates `.d.ts` files in `dist/`
   - Creates declaration source maps
   - Excludes test and story files

2. **Vite Build** (`vite build --mode lib`)
   - Generates JavaScript bundles (ES modules + CommonJS)
   - Bundles CSS
   - Creates JavaScript source maps

### Output Structure

```
dist/
├── index.js              # Vite: ES modules
├── index.cjs             # Vite: CommonJS
├── index.d.ts            # TypeScript: Type declarations
├── index.d.ts.map        # TypeScript: Declaration source maps
├── components/
│   ├── Button.d.ts       # TypeScript: Component types
│   └── Button.d.ts.map   # TypeScript: Component source maps
└── snackact-ui.css       # Vite: Bundled styles
```

## Comparison: Development vs Library Builds

### Development (tsconfig.app.json)

```typescript
// Purpose: Type checking during development
{
  "noEmit": true,          // No file generation
  "jsx": "react-jsx",      // React JSX support
  "include": ["src"],      // All source files
  "exclude": []            // No exclusions
}
```

**Used for:** IDE type checking, development server, Storybook

### Library (tsconfig.lib.json)

```typescript
// Purpose: Generate consumable type declarations
{
  "noEmit": false,         // Generate declaration files
  "declaration": true,     // Create .d.ts files
  "outDir": "./dist",      // Output to dist
  "exclude": ["**/*.stories.*", "**/*.test.*"] // Clean API
}
```

**Used for:** npm package publishing, consumer TypeScript support

## Real-World Impact

### Without tsconfig.lib.json

```typescript
// Consumer tries to use your library
import { Button } from 'snackact-ui'
//       ^^^^^^
// Error: Could not find declaration file for module 'snackact-ui'
// TypeScript can't provide intellisense or type checking
```

### With tsconfig.lib.json

```typescript
// Consumer gets full TypeScript support
import { Button } from 'snackact-ui'
//       ^^^^^^
// ✅ Full intellisense
// ✅ Type checking
// ✅ Go-to-definition works
// ✅ Refactoring support

// Your Button component interface is available
interface ButtonProps {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
  disabled?: boolean
}
```

## Advanced Configuration Patterns

### Multi-Package Library

```json
{
  "extends": "./tsconfig.base.json",
  "compilerOptions": {
    "declaration": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": [
    "src/**/*.stories.*",
    "src/**/*.test.*",
    "src/internal/**/*" // Private internal modules
  ]
}
```

### Strict Library Configuration

```json
{
  "extends": "./tsconfig.app.json",
  "compilerOptions": {
    "declaration": true,
    "declarationMap": true,
    "emitDeclarationOnly": true,
    "stripInternal": true, // Remove @internal marked exports
    "removeComments": false, // Keep JSDoc comments
    "preserveConstEnums": true // Better enum support
  }
}
```

### Conditional Type Generation

```json
{
  "compilerOptions": {
    "declaration": true,
    "declarationDir": "./types", // Separate types directory
    "typeRoots": ["./node_modules/@types", "./src/types"]
  }
}
```

## Common Issues and Solutions

### Issue: "Cannot find module" in generated .d.ts

**Cause:** Missing path mappings or incorrect imports
**Solution:** Ensure path mappings are consistent between configs

### Issue: Test files appearing in library types

**Cause:** Missing or incorrect exclude patterns
**Solution:** Add comprehensive exclude patterns

### Issue: Declaration source maps not working

**Cause:** Missing `declarationMap: true`
**Solution:** Enable declaration maps for better debugging

### Issue: Internal types exposed to consumers

**Cause:** No proper encapsulation
**Solution:** Use `stripInternal` or better file organization

## Best Practices

### 1. Separate Concerns

```json
// tsconfig.json (root)
{
  "files": [],
  "references": [
    { "path": "./tsconfig.app.json" },
    { "path": "./tsconfig.lib.json" }
  ]
}
```

### 2. Clean Library API

```json
{
  "exclude": [
    "src/**/*.stories.*",
    "src/**/*.test.*",
    "src/**/*.spec.*",
    "src/internal/**/*",
    "src/__tests__/**/*",
    "src/__mocks__/**/*"
  ]
}
```

### 3. Consistent Output Structure

```json
{
  "compilerOptions": {
    "outDir": "./dist",
    "declarationDir": "./dist", // Keep types with JS
    "preserveValueImports": true // Better module resolution
  }
}
```

### 4. Documentation Integration

```json
{
  "compilerOptions": {
    "removeComments": false, // Keep JSDoc
    "stripInternal": true, // Hide @internal
    "generateCpuProfile": "typescript-performance.json" // Performance monitoring
  }
}
```

## Testing Your Configuration

### Verify Declaration Generation

```bash
# Build library
yarn build:lib

# Check generated declarations
ls -la dist/*.d.ts
# Should see: index.d.ts, components/Button.d.ts

# Verify content
cat dist/index.d.ts
# Should contain: export * from './components/Button';
```

### Test Consumer Experience

```bash
# Create test project
mkdir test-consumer && cd test-consumer
npm init -y
npm install ../snackact-ui

# Test TypeScript integration
echo "import { Button } from 'snackact-ui';" > test.ts
npx tsc --noEmit test.ts
# Should compile without errors
```

## Integration with Package.json

Your library configuration supports the package.json type exports:

```json
{
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts", // From tsconfig.lib.json
      "import": "./dist/index.js", // From Vite
      "require": "./dist/index.cjs" // From Vite
    }
  }
}
```

## Conclusion

The `tsconfig.lib.json` file is essential because it:

- ✅ **Generates TypeScript declarations** for npm consumers
- ✅ **Excludes development files** from the public API
- ✅ **Provides proper output control** for library builds
- ✅ **Maintains separation** between development and library configurations
- ✅ **Enables excellent developer experience** for TypeScript consumers
- ✅ **Supports modern tooling** with source maps and clean APIs

Without this configuration, your library would lack TypeScript support for consumers, making it much less useful in TypeScript projects and reducing its adoption potential.
