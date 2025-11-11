import type { Meta, StoryObj } from '@storybook/react-vite'
import { Quiz } from './Quiz'

const meta = {
  title: 'Example/Quiz',
  component: Quiz,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered',
  },
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  // More on argTypes: https://storybook.js.org/docs/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} satisfies Meta<typeof Quiz>

export default meta

type Story = StoryObj<typeof meta>

export const MyQuiz: Story = {}
