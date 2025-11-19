import type { Meta, StoryObj } from '@storybook/react-vite'
import { ToastEditor } from './Editor'

const meta = {
  title: 'SnackactUI/Editor',
  component: ToastEditor,
  parameters: {
    layout: 'padded',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof ToastEditor>

export default meta

type Story = StoryObj<typeof meta>

export const Toast: Story = {
  args: {
    theme: 'light',
    options: {
      initialValue: 'Hello, Toast Editor!',
      initialEditType: 'wysiwyg',
    },
  },
}
