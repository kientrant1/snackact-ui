# Understanding package.json Entry Fields

## Overview

The `main`, `module`, and `types` fields in `package.json` are entry points that tell different tools and environments how to consume your library. Each serves a specific purpose in the JavaScript/TypeScript ecosystem.

## The Entry Fields Explained

### `main` Field

```json
{
  "main": "./dist/index.js"
}
```

**Purpose:** The default entry point for Node.js and older bundlers

- **Used by:** Node.js `require()`, older bundlers
- **Format:** Usually CommonJS (`.cjs`) or UMD
- **Fallback:** If other fields aren't supported

### `module` Field

```json
{
  "module": "./dist/index.js"
}
```

**Purpose:** Entry point for ES modules

- **Used by:** Modern bundlers (Webpack, Rollup, Vite)
- **Format:** ES modules (`.js` with `import/export`)
- **Benefits:** Tree shaking, better optimization

### `types` Field

```json
{
  "types": "./dist/index.d.ts"
}
```

**Purpose:** TypeScript declaration file location

- **Used by:** TypeScript compiler, IDEs
- **Format:** TypeScript declarations (`.d.ts`)
- **Benefits:** Type safety, IntelliSense

## How Tools Use These Fields

### Node.js Resolution

```javascript
// When someone does: require('snackact-ui')
// Node.js looks for:
1. package.json "main" field
2. index.js in package root
```

### Bundler Resolution (Webpack, Vite, etc.)

```javascript
// When someone does: import { Button } from 'snackact-ui'
// Modern bundlers prefer this order:
1. package.json "module" field (ES modules)
2. package.json "main" field (fallback)
```

### TypeScript Resolution

```typescript
// When TypeScript processes: import { Button } from 'snackact-ui'
// TypeScript looks for:
1. package.json "types" field
2. index.d.ts in package root
3. Infers from JS files if no declarations found
```

## Modern Approach: `exports` Field

The newer `exports` field provides more control and is gradually replacing the older fields:

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": "./dist/style.css"
  }
}
```

### Benefits of `exports`

- **Conditional Exports:** Different files for different conditions
- **Subpath Exports:** Control what can be imported
- **Future-Proof:** Modern standard, better tooling support

## Real-World Example: Your Library

```json
{
  "name": "snackact-ui",
  "main": "./dist/index.js",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    },
    "./styles": "./dist/snackact-ui.css"
  }
}
```

### What Happens When Someone Imports Your Library

#### ES Modules (Modern)

```typescript
import { Button } from 'snackact-ui'
// Resolves to: ./dist/index.js (ES modules)
// Types from: ./dist/index.d.ts
```

#### CommonJS (Node.js)

```javascript
const { Button } = require('snackact-ui')
// Resolves to: ./dist/index.cjs (CommonJS)
```

#### CSS Import

```typescript
import 'snackact-ui/styles'
// Resolves to: ./dist/snackact-ui.css
```

## Build Output Structure

Your Vite build should generate these files:

```
dist/
├── index.js          # ES modules (for "module" field)
├── index.cjs         # CommonJS (for "main" with require)
├── index.d.ts        # TypeScript declarations
├── index.d.ts.map    # Source maps for types
├── snackact-ui.css   # Bundled styles
└── ...
```

## Compatibility Matrix

| Tool/Environment    | Prefers          | Fallback               | Notes                        |
| ------------------- | ---------------- | ---------------------- | ---------------------------- |
| Node.js `require()` | `main`           | `index.js`             | CommonJS format              |
| Node.js `import`    | `exports.import` | `module`               | ES modules                   |
| Webpack             | `exports.import` | `module` → `main`      | Tree shaking with ES modules |
| Vite                | `exports.import` | `module` → `main`      | Optimized for ES modules     |
| TypeScript          | `exports.types`  | `types` → `index.d.ts` | Type definitions             |
| Rollup              | `module`         | `main`                 | ES modules preferred         |

## Best Practices

### 1. Support Both Formats

```json
{
  "main": "./dist/index.cjs", // CommonJS for Node.js
  "module": "./dist/index.js", // ES modules for bundlers
  "types": "./dist/index.d.ts" // TypeScript definitions
}
```

### 2. Use Modern `exports` Field

```json
{
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

### 3. Consistent File Extensions

- `.js` for ES modules
- `.cjs` for CommonJS
- `.d.ts` for TypeScript declarations

### 4. Source Maps

Include source maps for better debugging:

```json
{
  "files": ["dist/**/*.js", "dist/**/*.d.ts", "dist/**/*.map"]
}
```

## Common Issues and Solutions

### Issue: "Module not found"

**Cause:** Entry point files don't exist
**Solution:** Ensure build output matches package.json paths

### Issue: TypeScript can't find types

**Cause:** Missing or incorrect `types` field
**Solution:** Point to correct `.d.ts` file

### Issue: Tree shaking not working

**Cause:** No `module` field or wrong format
**Solution:** Provide ES modules version

### Issue: CommonJS/ES modules conflicts

**Cause:** Same file extension for different formats
**Solution:** Use `.cjs` for CommonJS, `.js` for ES modules

## Migration Strategy

### From Legacy to Modern

1. **Add `exports` field** alongside existing fields
2. **Test with major bundlers** (Webpack, Vite, Rollup)
3. **Verify TypeScript integration** in different projects
4. **Consider backwards compatibility** for older tools

### Example Migration

```json
// Before (legacy)
{
  "main": "lib/index.js",
  "types": "lib/index.d.ts"
}

// After (modern)
{
  "main": "./dist/index.cjs",
  "module": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "import": "./dist/index.js",
      "require": "./dist/index.cjs"
    }
  }
}
```

## Testing Your Package Exports

### Manual Testing

```bash
# Test CommonJS
node -e "console.log(require('./package.json').name, require('.'))"

# Test ES modules
node --input-type=module -e "import pkg from './package.json' assert { type: 'json' }; import lib from '.'; console.log(pkg.name, lib);"

# Test TypeScript
npx tsc --noEmit --moduleResolution node16
```

### Automated Testing

Use tools like `@arethetypeswrong/cli` to verify package exports:

```bash
npx @arethetypeswrong/cli ./package.tgz
```

## Conclusion

The `main`, `module`, and `types` fields are essential for:

- ✅ **Compatibility** across different environments
- ✅ **Performance** through tree shaking and optimization
- ✅ **Developer Experience** with proper TypeScript support
- ✅ **Future-Proofing** your library for evolving standards

By properly configuring these fields, your library will work seamlessly whether consumed by Node.js applications, modern bundlers, or TypeScript projects.
