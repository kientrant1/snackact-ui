import type { Meta, StoryObj } from '@storybook/react-vite'
import { Chat } from './Chat'

const meta = {
  title: 'SnackactUI/Chat',
  component: Chat,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Chat>

export default meta

type Story = StoryObj<typeof meta>

export const MyChat: Story = {
  args: {
    theme: 'light',
  },
}
