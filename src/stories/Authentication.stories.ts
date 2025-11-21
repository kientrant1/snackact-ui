import type { Meta, StoryObj } from '@storybook/react-vite'
import { Authentication } from './Authentication'

const meta = {
  title: 'SnackactUI/Authentication',
  component: Authentication,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Authentication>

export default meta

type Story = StoryObj<typeof meta>

export const FormLogin: Story = {
  args: {
    theme: 'light',
  },
}
