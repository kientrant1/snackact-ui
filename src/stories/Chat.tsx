import { useState } from 'react'
import { ChatInput, ChatHistory } from '@/index'
import type { Message } from '@/index'
import { messages as initialMessages } from './data/message'

import '@/styles'

type Theme = 'light' | 'dark'
export interface QuizProps {
  theme: Theme
}

export const Chat = ({ theme }: QuizProps) => {
  const [messages, setMessages] = useState<Message[]>(initialMessages)
  const searchTerm = ''
  const isLoading = false

  const handleSendMessage = (
    newMessage: Omit<Message, 'messageId' | 'timestamp'>
  ) => {
    const messageWithId: Message = {
      ...newMessage,
      messageId: `user-${Date.now()}`,
      timestamp: new Date().toISOString(),
    }

    setMessages(prev => [...prev, messageWithId])

    // Simulate AI response after a delay
    setTimeout(() => {
      const aiResponse: Message = {
        messageId: `ai-${Date.now()}`,
        text:
          newMessage.images && newMessage.images.length > 0
            ? `I can see ${newMessage.images.length} image${newMessage.images.length !== 1 ? 's' : ''} you shared! How can I help you with ${newMessage.images.length === 1 ? 'it' : 'them'}?`
            : 'Thanks for your message! How can I assist you?',
        isUser: false,
        timestamp: new Date().toISOString(),
      }
      setMessages(prev => [...prev, aiResponse])
    }, 1000)
  }

  return (
    <div className={`snackact-ui-theme-${theme}`}>
      <ChatHistory
        messages={messages}
        searchTerm={searchTerm}
        isLoading={isLoading}
      />
      <ChatInput onSendMessage={handleSendMessage} />
    </div>
  )
}
