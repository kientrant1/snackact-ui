import type { Message } from '@/types/message'

export const messages: Message[] = [
  {
    messageId: 'ai-1',
    text: 'Hello! **May I help you?**',
    isUser: false,
    timestamp: '2024-06-01T10:00:00Z',
  },
  {
    messageId: 'user-1',
    text: 'Can you show the sample markdown text?',
    isUser: true,
    timestamp: '2024-06-01T10:01:00Z',
  },
  {
    messageId: 'ai-1',
    text: 'You can make text **bold** using double asterisks or double underscores. You can make text *italic* using single asterisks or single underscores.',
    isUser: false,
    timestamp: '2024-06-01T10:01:00Z',
  },
]
