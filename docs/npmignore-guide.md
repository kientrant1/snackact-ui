# Understanding .npmignore for npm Package Publishing

## Overview

The `.npmignore` file controls which files and directories are excluded from your npm package when publishing, regardless of whether you use `npm`, `yarn`, or `pnpm` for development. It's essential for creating clean, professional npm packages with optimal download sizes and proper file organization.

## Why .npmignore is Needed (Even with Yarn)

### Package Manager vs Registry

```bash
# Development (local) - Uses yarn
yarn install        # Installs dependencies locally
yarn build:lib      # Builds your library
yarn publish        # Actually uses npm registry under the hood

# Consumer (anywhere) - Can use any package manager
npm install snackact-ui     # npm users
yarn add snackact-ui        # yarn users
pnpm add snackact-ui        # pnpm users
```

**Key Point:** All package managers download from the **same npm registry**. The `.npmignore` file controls what gets uploaded to that registry when you publish.

## The Problem Without .npmignore

### Default npm Behavior

When you run `npm publish` (or `yarn publish`), npm includes **all files** in your project directory except:

- `node_modules/`
- `.git/`
- Files in `.gitignore` (partially)

### What Would Be Published Without .npmignore

```
your-package/
├── src/                    # ❌ Source TypeScript files
├── .storybook/            # ❌ Storybook configuration
├── stories/               # ❌ Storybook stories
├── public/                # ❌ Development assets
├── vite.config.ts         # ❌ Build configuration
├── tsconfig.*.json        # ❌ TypeScript configs
├── eslint.config.js       # ❌ Linting configuration
├── tailwind.config.js     # ❌ Styling configuration
├── .prettierrc            # ❌ Code formatting
├── yarn.lock              # ❌ Lock file (huge!)
├── dist/                  # ✅ Built library files
├── package.json           # ✅ Package metadata
└── README.md              # ✅ Documentation
```

**Issues:**

- ❌ **Bloated package size** - Consumers download unnecessary files
- ❌ **Security risk** - Potentially exposes configuration files
- ❌ **Confusion** - Consumers might import from source instead of dist
- ❌ **Performance** - Slower installation times

## Your Current .npmignore Configuration

```ignore
# Development files
src/
public/
.storybook/
stories/
dist-app/

# Config files
vite.config.ts
tsconfig.*.json
eslint.config.js
tailwind.config.js
postcss.config.js
.prettierrc
*.code-workspace

# Git and development
.git/
.github/
.husky/
node_modules/
.env*

# Build artifacts
*.tsbuildinfo
.vite/

# Tests
**/*.test.*
**/*.spec.*
__tests__/
coverage/

# Documentation (keep README.md and LICENSE)
docs/
```

### What This Achieves

**Excluded (Good):**

- Source TypeScript files (`src/`)
- Development configurations
- Storybook files
- Test files
- Build artifacts
- Git history

**Included (What Consumers Need):**

```
snackact-ui/
├── dist/
│   ├── index.js          # ES modules
│   ├── index.cjs         # CommonJS
│   ├── index.d.ts        # TypeScript declarations
│   └── snackact-ui.css   # Styles
├── package.json          # Package metadata
├── README.md             # Documentation
└── LICENSE               # License information
```

## .npmignore vs .gitignore vs package.json "files"

### Three Different Approaches

#### 1. .gitignore (Git Repository)

```ignore
# Controls what Git tracks
node_modules/
dist/
.env
*.log
```

**Purpose:** Excludes files from version control

#### 2. .npmignore (npm Package)

```ignore
# Controls what npm publishes
src/
.storybook/
vite.config.ts
```

**Purpose:** Excludes files from published package

#### 3. package.json "files" (Allowlist Approach)

```json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

**Purpose:** Explicitly includes only specified files/folders

### When npm Uses Each

**Priority Order:**

1. `package.json "files"` field (if present) - **Allowlist**
2. `.npmignore` (if no "files" field) - **Blocklist**
3. `.gitignore` (fallback) - **Partial blocklist**

**Your Current Setup:**
You use **both** `package.json "files"` AND `.npmignore` for maximum control:

```json
// package.json
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

This is the **best practice** - allowlist what you want, blocklist what you don't.

## Real-World Impact

### Package Size Comparison

**Without .npmignore:**

```bash
# Package includes everything
Package size: ~2.5MB
├── dist/ (150KB)
├── src/ (50KB)
├── node_modules/ (2MB)
├── .storybook/ (100KB)
└── stories/ (200KB)
```

**With .npmignore:**

```bash
# Package includes only essentials
Package size: ~150KB
├── dist/ (150KB)
├── README.md (5KB)
└── LICENSE (1KB)
```

**Benefits:**

- ✅ **94% smaller package** (150KB vs 2.5MB)
- ✅ **Faster installation** for consumers
- ✅ **Reduced bandwidth** costs
- ✅ **Better security** (no config files exposed)

### Consumer Experience

**Bad Package (No .npmignore):**

```typescript
// Consumer might accidentally import from source
import { Button } from 'snackact-ui/src/components/Button' // ❌ Wrong
// This breaks because TypeScript source isn't compiled
```

**Good Package (With .npmignore):**

```typescript
// Consumer imports from proper dist files
import { Button } from 'snackact-ui' // ✅ Correct
// This works because only dist/ is published
```

## Testing Your .npmignore

### 1. Check What Will Be Published

```bash
# Preview package contents without publishing
yarn pack

# Extract and inspect
tar -tf package.tgz
# Should only see: package.json, dist/, README.md, LICENSE
```

### 2. Verify Package Size

```bash
# Check package size
yarn pack
ls -lh *.tgz
# Should be small (under 500KB for most UI libraries)
```

### 3. Test Installation

```bash
# Install your local package in test project
mkdir test-install && cd test-install
npm init -y
npm install ../path/to/your-package.tgz

# Verify only correct files are installed
ls node_modules/snackact-ui/
# Should only see: dist/, package.json, README.md, LICENSE
```

## Best Practices

### 1. Conservative Exclusions

```ignore
# Exclude development files
src/
.storybook/
stories/
public/

# Exclude config files
*.config.*
tsconfig.*
.prettier*
.eslint*

# Exclude artifacts
*.tsbuildinfo
.vite/
coverage/
```

### 2. Always Include

- `dist/` or build output
- `README.md`
- `LICENSE`
- `package.json` (automatically included)

### 3. Test Before Publishing

```bash
# Always test your package contents
yarn pack
tar -tf package.tgz | head -20
```

### 4. Use Both Approaches

```json
// package.json - Allowlist approach
{
  "files": ["dist", "README.md", "LICENSE"]
}
```

```ignore
// .npmignore - Additional blocklist
src/
.storybook/
```

## Common Mistakes to Avoid

### ❌ Including Source Files

```ignore
# Don't do this - exposes source
# src/
```

### ❌ Forgetting Lock Files

```ignore
# Always exclude lock files
yarn.lock
package-lock.json
pnpm-lock.yaml
```

### ❌ Including All Documentation

```ignore
# Include main README, exclude internal docs
docs/
CONTRIBUTING.md
CHANGELOG.md
# Keep: README.md, LICENSE
```

### ❌ Exposing Secrets

```ignore
# Always exclude environment files
.env*
secrets/
```

## Advanced Patterns

### Library with Multiple Entry Points

```ignore
# Include specific dist folders
!dist/
!dist/components/
!dist/utils/
# Exclude everything else
src/
```

### Monorepo Package

```ignore
# Exclude sibling packages
../*/
../../node_modules/
# Include only this package's build
!dist/
```

### CSS-Only Package

```ignore
# Exclude everything except styles
src/
# Keep compiled CSS
!dist/*.css
!dist/themes/
```

## Integration with Your Build Process

### Build Script Integration

```json
{
  "scripts": {
    "prepublishOnly": "yarn build:lib && yarn test",
    "postpack": "echo 'Package size:' && ls -lh *.tgz"
  }
}
```

### Automated Size Checking

```bash
# Add to CI/CD pipeline
yarn pack
PACKAGE_SIZE=$(stat -f%z package.tgz 2>/dev/null || stat -c%s package.tgz)
if [ $PACKAGE_SIZE -gt 1000000 ]; then
  echo "Package too large: ${PACKAGE_SIZE} bytes"
  exit 1
fi
```

## Conclusion

The `.npmignore` file is essential for your npm package because it:

- ✅ **Reduces package size** by excluding unnecessary files
- ✅ **Improves security** by not exposing configuration files
- ✅ **Enhances consumer experience** with clean, focused packages
- ✅ **Speeds up installation** for all package managers
- ✅ **Prevents confusion** by hiding source files from consumers
- ✅ **Works regardless** of whether you use npm, yarn, or pnpm

Without `.npmignore`, your `snackact-ui` package would be bloated with development files that consumers don't need, making it slower to install and potentially exposing sensitive configuration information.
