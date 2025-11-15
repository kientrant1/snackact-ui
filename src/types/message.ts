import type { ImagePreviewData } from '@/components/chat/ImagePreview'

export interface ChatMessage {
  id: string
  userId: string
  messageId: string
  text: string // The actual message content
  isUser: boolean // Indicates who sent the message by human or AI
  timestamp: string // When the message was sent
  createdAt: Date
  images?: ImagePreviewData[]
}

export type Message = Pick<
  ChatMessage,
  'messageId' | 'text' | 'isUser' | 'timestamp' | 'images'
>
