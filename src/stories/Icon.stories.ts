import type { Meta, StoryObj } from '@storybook/react-vite'
import { Icon } from './Icon'

const meta = {
  title: 'SnackactUI/Icons',
  component: Icon,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
  argTypes: {
    theme: {
      control: { type: 'radio' },
      options: ['light', 'dark'],
      description: 'Theme variant for the icons display',
    },
  },
} satisfies Meta<typeof Icon>

export default meta

type Story = StoryObj<typeof meta>

export const MyIcons: Story = {
  args: {
    theme: 'light',
  },
}
