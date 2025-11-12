import type { Meta, StoryObj } from '@storybook/react-vite'
import { Quiz } from './Quiz'

const meta = {
  title: 'SnackactUI/Quiz',
  component: Quiz,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof Quiz>

export default meta

type Story = StoryObj<typeof meta>

export const MyQuiz: Story = {
  args: {
    theme: 'light',
    quizComponentName: 'ALL',
  },
}
