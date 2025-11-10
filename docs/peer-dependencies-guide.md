# Understanding Peer Dependencies in npm Libraries

## Overview

When publishing a library to npm, choosing between `dependencies` and `peerDependencies` is crucial for proper library consumption and avoiding common issues like duplicate React instances, version conflicts, and bundle bloat.

## The Problem with `dependencies`

### What Happens with Regular Dependencies

When you include React in your library's `dependencies`:

```json
{
  "name": "my-ui-library",
  "dependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  }
}
```

**Result: Duplicate React Installation**

```
consumer-app/
├── node_modules/
│   ├── react/ (v18.2.0 - app's version)
│   ├── react-dom/ (v18.2.0)
│   └── my-ui-library/
│       └── node_modules/
│           ├── react/ (v19.1.1 - library's version)
│           └── react-dom/ (v19.1.1)
```

### Issues This Creates

1. **Invalid Hook Call Errors**

   ```
   Error: Invalid hook call. Hooks can only be called inside the body of a function component.
   ```

   - React hooks don't work across different React instances
   - Context providers fail to share state

2. **Bundle Bloat**
   - React gets bundled twice (~42KB gzipped × 2)
   - Increased download time and memory usage
   - Poor performance for end users

3. **Version Conflicts**
   - Different React versions may have incompatible APIs
   - Breaking changes between versions cause runtime errors

4. **State Isolation**
   - React Context doesn't work between instances
   - Global state management breaks down

## The Solution: Peer Dependencies

### Correct Configuration

```json
{
  "name": "snackact-ui",
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0",
    "react-dom": "^18.0.0 || ^19.0.0"
  },
  "devDependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  }
}
```

### How It Works

**Single React Instance:**

```
consumer-app/
├── node_modules/
│   ├── react/ (v18.2.0 - shared instance)
│   ├── react-dom/ (v18.2.0)
│   └── snackact-ui/ (uses shared React above)
```

## Benefits of Peer Dependencies

### 1. Single React Instance

- Library and consumer app share the same React instance
- Hooks work seamlessly across boundaries
- Context and global state function properly

### 2. Version Flexibility

```json
"peerDependencies": {
  "react": "^18.0.0 || ^19.0.0"
}
```

- Supports multiple React versions
- Consumer chooses compatible version for their needs
- Clear compatibility requirements

### 3. Smaller Bundle Size

- React isn't duplicated in the final bundle
- Faster download and initialization
- Better Core Web Vitals scores

### 4. Clear Dependency Management

- Package managers warn about missing peer dependencies
- Explicit about what the library requires
- Prevents silent failures

## Development Dependencies Explained

### Why React in `devDependencies`?

```json
{
  "devDependencies": {
    "react": "^19.1.1",
    "react-dom": "^19.1.1"
  }
}
```

**Purposes:**

- **Development:** TypeScript needs React types for compilation
- **Testing:** Jest/Vitest needs React for component testing
- **Storybook:** Component stories require React to render
- **Build Process:** Vite needs React for development server

**Not Included:** These won't be bundled with your published package

## Real-World Example

### Installation Process

1. **User installs your library:**

   ```bash
   npm install snackact-ui
   ```

2. **npm warns about peer dependencies:**

   ```
   npm WARN snackact-ui@0.0.1 requires a peer of react@^18.0.0 || ^19.0.0
   npm WARN snackact-ui@0.0.1 requires a peer of react-dom@^18.0.0 || ^19.0.0
   ```

3. **User installs required dependencies:**

   ```bash
   npm install react@^18.2.0 react-dom@^18.2.0
   ```

4. **Result:** Single React instance shared by both app and library

### Usage Example

```typescript
// Consumer's app
import { Button } from 'snackact-ui';
import { createContext } from 'react';

const ThemeContext = createContext('light');

function App() {
  return (
    <ThemeContext.Provider value="dark">
      {/* Library component can access this context */}
      <Button variant="primary">
        Themed Button
      </Button>
    </ThemeContext.Provider>
  );
}
```

## When to Use Each Dependency Type

### Use `peerDependencies` for:

- **React/Vue/Angular** - Framework dependencies
- **Styling Libraries** - styled-components, emotion
- **State Management** - Redux, Zustand (when expecting consumer to provide)
- **Peer Libraries** - Libraries that should be singleton

### Use `dependencies` for:

- **Utility Libraries** - lodash, date-fns, uuid
- **Internal Logic** - Your library's core functionality
- **Polyfills** - Core-js, whatwg-fetch
- **Build Tools** - (Usually in devDependencies)

### Use `devDependencies` for:

- **Build Tools** - Vite, Webpack, TypeScript
- **Testing** - Jest, Vitest, Testing Library
- **Linting** - ESLint, Prettier
- **Development Servers** - Storybook

## Best Practices

### Version Ranges

```json
{
  "peerDependencies": {
    // ✅ Good: Supports multiple major versions
    "react": "^16.8.0 || ^17.0.0 || ^18.0.0 || ^19.0.0",

    // ❌ Too restrictive
    "react": "19.1.1",

    // ❌ Too permissive
    "react": "*"
  }
}
```

### Optional Peer Dependencies

```json
{
  "peerDependencies": {
    "react": "^18.0.0 || ^19.0.0"
  },
  "peerDependenciesMeta": {
    "react": {
      "optional": true
    }
  }
}
```

Use for libraries that can work with or without certain dependencies.

## Troubleshooting Common Issues

### Issue: "Module not found: react"

**Cause:** Peer dependency not installed
**Solution:** Install the required peer dependency

```bash
npm install react react-dom
```

### Issue: "Invalid hook call"

**Cause:** Multiple React instances
**Solution:** Check for React in both dependencies and peerDependencies

### Issue: Version mismatch warnings

**Cause:** Installed React version doesn't match peer dependency range
**Solution:** Update React version or adjust peer dependency range

## Migration Checklist

When converting from `dependencies` to `peerDependencies`:

- [ ] Move React/framework to `peerDependencies`
- [ ] Add React to `devDependencies` for development
- [ ] Update build configuration to externalize peer deps
- [ ] Test with different React versions
- [ ] Update documentation with installation instructions
- [ ] Bump major version (breaking change)

## Conclusion

Using `peerDependencies` for React ensures:

- ✅ Single React instance across your app
- ✅ Smaller bundle sizes
- ✅ Better performance
- ✅ Proper hook and context functionality
- ✅ Version flexibility for consumers

This approach is essential for any React library that expects to integrate seamlessly into existing React applications.
