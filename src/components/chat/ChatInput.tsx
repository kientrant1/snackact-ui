import { useState, useRef } from 'react'
import type { KeyboardEvent, ClipboardEvent } from 'react'
import type { ComponentProps } from '@/types/component'
import type { Message } from '@/types/message'
import { processClipboardImages } from '@/utils/clipboard'
import { ImagePreview, type ImagePreviewData } from './ImagePreview'
import logger from '@/utils/logger'

interface ChatInputProps extends ComponentProps {
  onSendMessage: (message: Omit<Message, 'messageId' | 'timestamp'>) => void
}

export function ChatInput({
  onSendMessage,
  className,
  testId,
  ...props
}: ChatInputProps) {
  const [message, setMessage] = useState('')
  const [images, setImages] = useState<ImagePreviewData[]>([])
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSend = () => {
    if (message.trim() || images.length > 0) {
      onSendMessage({
        text: message,
        isUser: true,
        images: images.length > 0 ? images : undefined,
      })
      setMessage('')
      setImages([])
    }
  }

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handlePaste = async (e: ClipboardEvent<HTMLTextAreaElement>) => {
    const processImages = await processClipboardImages(e)

    if (processImages.failedFiles.length > 0) {
      logger.error('Clipboard image error', processImages.failedFiles)
    }

    const imagePreviewData: ImagePreviewData[] =
      processImages.successImages.map(img => ({
        file: img.file,
        preview: img.preview,
        name: img.name,
        size: img.size,
        type: img.type,
        id: img.id,
      }))
    setImages(prev => [...prev, ...imagePreviewData])
  }

  const removeImage = (imageId: string) => {
    setImages(prev => prev.filter(img => img.id !== imageId))
    textareaRef.current?.focus()
  }

  return (
    <div
      className={`border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 p-4 ${className || ''}`}
      data-testid={testId}
      {...props}
    >
      <div className="max-w-4xl mx-auto">
        {/* Image previews */}
        <ImagePreview
          images={images}
          onRemoveImage={removeImage}
          className={images.length > 0 ? 'mb-3' : ''}
        />

        {/* Input area */}
        <div className="flex items-end gap-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={e => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            onPaste={handlePaste}
            placeholder="Type your message or paste images..."
            rows={1}
            className="flex-1 resize-none rounded-xl border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 px-4 py-3 text-sm text-gray-900 dark:text-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            onClick={handleSend}
            disabled={!message.trim() && images.length === 0}
            className="rounded-xl bg-blue-600 px-6 py-3 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  )
}
