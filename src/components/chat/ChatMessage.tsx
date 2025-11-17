import type { ComponentProps } from '@/types/component'
import type { Message } from '@/types/message'
import MarkdownRenderer from '@/components/ui/MarkdownRenderer'

interface ChatMessageProps extends ComponentProps {
  message: string | React.ReactNode
  messageId: string
  isUser: boolean
  timestamp: string
  images?: Message['images']
}

interface MessageContentProps extends ComponentProps {
  message: string | React.ReactNode
  isUser: boolean
  images?: Message['images']
}

interface ImageContentProps extends ComponentProps {
  images: Message['images']
}

const ImageContent = ({ images }: ImageContentProps) => {
  return (
    <>
      {images && images.length > 0 && (
        <div
          className={`
          grid gap-2 max-w-sm
          ${images.length === 1 ? 'grid-cols-1' : ''}
          ${images.length === 2 ? 'grid-cols-2' : ''}
          ${images.length >= 3 ? 'grid-cols-2' : ''}
        `}
        >
          {images.map((image, index) => (
            <div
              key={image.id}
              className={`
                rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600
                ${images.length >= 3 && index === 0 ? 'col-span-2' : ''}
              `}
            >
              <img
                src={image.preview}
                alt={image.name}
                className="w-full h-auto object-cover max-h-48"
              />
              <div className="px-2 py-1 bg-black bg-opacity-20 text-xs text-white">
                <p className="truncate">{image.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  )
}

const MessageContent = ({ message, isUser, images }: MessageContentProps) => {
  return (
    <div className="space-y-3">
      {/* Images display */}
      <ImageContent images={images} />

      {/* Text content */}
      {message && (
        <>
          {isUser || typeof message !== 'string' ? (
            <p className="text-sm leading-relaxed">{message}</p>
          ) : (
            <MarkdownRenderer content={message} />
          )}
        </>
      )}
    </div>
  )
}

export function ChatMessage({
  message,
  messageId,
  isUser,
  timestamp,
  images,
  className,
  testId,
  ...props
}: ChatMessageProps) {
  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4 ${className || ''}`}
      data-testid={`${testId}-${messageId}`}
      {...props}
    >
      <div
        className={`flex flex-col max-w-[70%] ${isUser ? 'items-end' : 'items-start'}`}
      >
        <div
          className={`rounded-2xl px-4 py-3 ${
            isUser
              ? 'bg-blue-600 text-white'
              : 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-100'
          }`}
        >
          <MessageContent message={message} isUser={isUser} images={images} />
        </div>
        <span className="text-xs text-gray-500 dark:text-gray-400 mt-1 px-2">
          {timestamp}
        </span>
      </div>
    </div>
  )
}
