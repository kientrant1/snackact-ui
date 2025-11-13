import type { Preview } from '@storybook/react-vite'
// Reuse tailwind styles in storybook
import '../src/styles'

const preview: Preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
  },
}

export default preview
