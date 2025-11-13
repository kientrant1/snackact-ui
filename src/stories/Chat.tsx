import { ChatInput, ChatHistory } from '@/index'

import '@/styles'
import { messages } from './data/message'

type Theme = 'light' | 'dark'
export interface QuizProps {
  theme: Theme
}

export const Chat = ({ theme }: QuizProps) => {
  const searchTerm = ''
  const isLoading = false

  const handleAction = () => {
    throw new Error('Function not implemented.')
  }

  return (
    <div className={`snackact-ui-theme-${theme}`}>
      <ChatHistory
        messages={messages}
        searchTerm={searchTerm}
        isLoading={isLoading}
      />
      <ChatInput onSendMessage={handleAction} />
    </div>
  )
}
