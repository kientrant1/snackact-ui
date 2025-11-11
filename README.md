# Snackact UI

A modern React UI component library built with TypeScript and Tailwind CSS.

## Installation

```bash
npm install snackact-ui
# or
yarn add snackact-ui
```

## Usage

### Basic Usage

```typescript
import { Button } from 'snackact-ui';
import 'snackact-ui/styles'; // Import styles

function App() {
  return (
    <Button variant="primary" onClick={() => console.log('Clicked!')}>
      Click me
    </Button>
  );
}
```

### Available Components

#### Button

A customizable button component with multiple variants.

```typescript
import { Button } from 'snackact-ui';

<Button variant="primary" disabled={false} onClick={handleClick}>
  Primary Button
</Button>

<Button variant="secondary">
  Secondary Button
</Button>
```

**Props:**

- `children`: React.ReactNode - Button content
- `onClick?`: () => void - Click handler
- `variant?`: 'primary' | 'secondary' - Button style variant (default: 'primary')
- `disabled?`: boolean - Whether the button is disabled (default: false)

## Development

This library is built with:

- ⚛️ React 19
- 🏷️ TypeScript
- 🎨 Tailwind CSS v4
- 📖 Storybook
- ⚡ Vite

### Testing Library From Other App Locally

To test this library in another local application during development:

1. **Build the library:**

   ```bash
   yarn build:lib
   ```

2. **In your test application's `package.json`, add the local dependency:**

   ```json
   {
     "dependencies": {
       "snackact-ui": "file:../snackact-ui"
     }
   }
   ```

3. **Install dependencies in your test app:**

   ```bash
   yarn install
   ```

4. **Use the library in your test app:**

   ```typescript
   import { Button } from 'snackact-ui';
   import 'snackact-ui/css';

   function App() {
     return (
       <Button variant="primary">
         Testing local library
       </Button>
     );
   }
   ```

**Note:** After making changes to the library, rebuild it and reinstall in your test app to see the updates.

## Requirements

- React 18.0.0 or higher
- React DOM 18.0.0 or higher

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.
