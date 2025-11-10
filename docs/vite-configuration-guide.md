# Understanding Vite Configuration for npm Libraries

## Overview

When building a library for npm, Vite needs special configuration to generate the correct output format, handle dependencies properly, and support multiple consumption patterns. This guide explains why we updated your `vite.config.ts` for the `snackact-ui` library.

## The Problem with Default Vite Configuration

### Default Vite Build (Application Mode)

```typescript
// Default Vite config for apps
export default defineConfig({
  plugins: [react()],
  build: {
    // Builds for web application deployment
    // Creates index.html, chunks, assets
    // Bundles ALL dependencies
  },
})
```

**Issues for Libraries:**

- ❌ Bundles React with your library (duplicate React instances)
- ❌ Creates HTML file and web app assets
- ❌ No TypeScript declarations
- ❌ Single output format (not consumable by different environments)
- ❌ No proper entry point for package.json

## The Solution: Library Mode Configuration

### Updated Configuration Breakdown

```typescript
export default defineConfig(({ mode }) => {
  const isLibMode = mode === 'lib'

  return {
    plugins: [react()],
    server: { port: 3001 },
    build: isLibMode
      ? {
          // Library-specific build configuration
        }
      : {
          // Regular app build (for development/Storybook)
          outDir: 'dist-app',
        },
  }
})
```

### Why We Use Mode Detection

**Dual Build System:**

- **Library Mode (`mode === 'lib'`)**: For npm publishing
- **App Mode (default)**: For development server and Storybook

**Benefits:**

- ✅ Same config file for both use cases
- ✅ Development server still works
- ✅ Storybook builds correctly
- ✅ Library builds with proper npm format

## Library Build Configuration Explained

### 1. Library Entry Point

```typescript
lib: {
  entry: resolve(__dirname, 'src/index.ts'),
  name: 'SnackactUI',
  fileName: (format) => `index.${format === 'es' ? 'js' : format === 'cjs' ? 'cjs' : `${format}.js`}`,
  formats: ['es', 'cjs']
}
```

**Purpose:**

- **entry**: Main file that exports your library components
- **name**: Global variable name for UMD builds
- **fileName**: Controls output file naming for different formats
- **formats**: Generates both ES modules and CommonJS versions

**Output:**

```
dist/
├── index.js     # ES modules (for bundlers)
├── index.cjs    # CommonJS (for Node.js)
```

### 2. External Dependencies

```typescript
rollupOptions: {
  external: ['react', 'react-dom', 'react/jsx-runtime'],
  output: {
    globals: {
      react: 'React',
      'react-dom': 'ReactDOM',
      'react/jsx-runtime': 'jsx'
    }
  }
}
```

**Why External Dependencies:**

- ✅ **Prevents bundling React** with your library
- ✅ **Smaller bundle size** - consumers provide their own React
- ✅ **No version conflicts** - uses consumer's React version
- ✅ **Proper hooks behavior** - single React instance

**What Happens:**

```javascript
// Without external - BAD ❌
import React from 'bundled-react-19.1.1'

// With external - GOOD ✅
import React from 'react' // Consumer's React version
```

### 3. CSS Handling

```typescript
cssCodeSplit: false,
sourcemap: true,
emptyOutDir: true
```

**Configuration Details:**

- **cssCodeSplit: false**: Bundles all CSS into single file
- **sourcemap: true**: Generates source maps for debugging
- **emptyOutDir: true**: Cleans dist folder before each build

**CSS Output:**

```
dist/
├── index.js
├── index.cjs
├── snackact-ui.css    # All styles bundled
├── *.map files        # Source maps
```

## Build Commands Integration

### Package.json Scripts

```json
{
  "scripts": {
    "build:lib": "vite build --mode lib",
    "build": "tsc -b && vite build",
    "dev": "vite"
  }
}
```

### How Commands Work

**Development Server:**

```bash
yarn dev
# Uses default mode
# Serves app at localhost:3001
# Hot reload for development
```

**Library Build:**

```bash
yarn build:lib
# Uses --mode lib
# Triggers isLibMode = true
# Generates npm-ready files
```

## Comparison: Before vs After

### Before (App Configuration)

```typescript
// Simple app config
export default defineConfig({
  plugins: [react()],
  build: {
    // Default app build
  },
})
```

**Problems:**

- Only works for web apps
- Can't generate library formats
- Bundles everything together
- No external dependency handling

### After (Library Configuration)

```typescript
// Dual-mode config
export default defineConfig(({ mode }) => {
  const isLibMode = mode === 'lib'
  return {
    plugins: [react()],
    build: isLibMode ? libraryConfig : appConfig,
  }
})
```

**Benefits:**

- ✅ Supports both app and library builds
- ✅ Proper dependency externalization
- ✅ Multiple output formats
- ✅ npm-ready bundle structure

## File Output Structure

### Library Mode Output

```
dist/
├── index.js          # ES modules entry
├── index.cjs         # CommonJS entry
├── index.d.ts        # TypeScript declarations
├── snackact-ui.css   # Bundled styles
└── *.map            # Source maps
```

### Development Mode Output

```
dist-app/
├── index.html        # Development app
├── assets/           # App-specific assets
└── *.js             # App bundles
```

## Integration with Package.json

Your Vite config works with package.json entry points:

```json
{
  "main": "./dist/index.cjs", // From rollupOptions
  "module": "./dist/index.js", // From rollupOptions
  "types": "./dist/index.d.ts", // From TypeScript build
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js", // ES modules
      "require": "./dist/index.cjs" // CommonJS
    }
  }
}
```

## Common Configuration Patterns

### Framework-Agnostic Library

```typescript
build: {
  lib: {
    entry: 'src/index.ts',
    formats: ['es', 'cjs', 'umd']
  },
  rollupOptions: {
    external: ['react', 'vue'], // Multiple frameworks
  }
}
```

### CSS-Only Library

```typescript
build: {
  lib: {
    entry: 'src/styles.css',
    formats: ['es']
  },
  rollupOptions: {
    output: {
      assetFileNames: 'styles.css'
    }
  }
}
```

### Utility Library (No Frameworks)

```typescript
build: {
  lib: {
    entry: 'src/index.ts',
    formats: ['es', 'cjs']
  },
  rollupOptions: {
    external: [] // No external deps
  }
}
```

## Troubleshooting Common Issues

### Issue: React bundled with library

**Cause:** Missing external configuration
**Solution:** Add React to rollupOptions.external

### Issue: CSS not bundled

**Cause:** CSS code splitting enabled
**Solution:** Set `cssCodeSplit: false`

### Issue: Wrong file extensions

**Cause:** Incorrect fileName function
**Solution:** Use proper format mapping

### Issue: Missing source maps

**Cause:** sourcemap not enabled
**Solution:** Set `sourcemap: true`

## Testing Your Configuration

### Verify Library Build

```bash
# Build the library
yarn build:lib

# Check output files
ls -la dist/
# Should see: index.js, index.cjs, index.d.ts, *.css

# Test package contents
yarn pack
# Verify only dist/ files are included
```

### Test Integration

```bash
# In a test project
npm install ../path/to/your-library.tgz

# Test imports
import { Button } from 'your-library'        # ES modules
const { Button } = require('your-library')   # CommonJS
import 'your-library/styles'                 # CSS
```

## Best Practices

### 1. Separate Build Outputs

```typescript
build: isLibMode
  ? {
      outDir: 'dist', // Library files
    }
  : {
      outDir: 'dist-app', // App files (don't publish)
    }
```

### 2. Comprehensive External List

```typescript
external: [
  'react',
  'react-dom',
  'react/jsx-runtime',    // React 17+ JSX transform
  '@types/react'          # If using React types
]
```

### 3. Consistent Naming

```typescript
fileName: format => {
  if (format === 'es') return 'index.js'
  if (format === 'cjs') return 'index.cjs'
  return `index.${format}.js`
}
```

### 4. Production Optimization

```typescript
build: {
  minify: 'terser',      # Better minification
  sourcemap: true,       # Always include for debugging
  target: 'es2020'       # Modern browser support
}
```

## Conclusion

The updated Vite configuration enables your library to:

- ✅ **Generate proper npm package formats** (ES modules + CommonJS)
- ✅ **Exclude peer dependencies** from bundle (React externalization)
- ✅ **Support multiple consumption patterns** (import/require)
- ✅ **Maintain development workflow** (dev server, Storybook)
- ✅ **Provide debugging capabilities** (source maps)
- ✅ **Optimize for production** (minification, tree shaking)

This configuration is essential for creating professional, consumable npm libraries that integrate seamlessly into different JavaScript/TypeScript projects.
