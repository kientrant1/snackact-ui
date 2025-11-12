import { addons } from 'storybook/manager-api'
import { create } from 'storybook/theming'

const myTheme = create({
  base: 'light',
  brandTitle: 'Snackact UI Storybook',
  brandUrl: 'https://your-website.com',
  // Path to your logo in the public folder
  brandImage: './snackact-ui.png',
  brandTarget: '_self',
})

addons.setConfig({
  theme: myTheme,
})
