import type { ComponentProps } from '@/types/component'
import { RemoveIcon } from '@/components/icon'

export interface ImagePreviewData {
  file: File
  preview: string
  name: string
  size: number
  type: string
  id: string
}

interface ImagePreviewProps extends ComponentProps {
  images: ImagePreviewData[]
  onRemoveImage: (imageId: string) => void
}

export function ImagePreview({
  images,
  onRemoveImage,
  className,
  testId,
  ...props
}: ImagePreviewProps) {
  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  if (images.length === 0) return null

  return (
    <div
      className={`space-y-3 ${className || ''}`}
      data-testid={testId}
      {...props}
    >
      {images.map(image => (
        <div
          key={image.id}
          className="p-3 border border-gray-200 dark:border-gray-600 rounded-lg bg-gray-50 dark:bg-gray-800"
        >
          <div className="flex items-start gap-3">
            <img
              src={image.preview}
              alt="Pasted image"
              className="w-16 h-16 object-cover rounded-lg border border-gray-200 dark:border-gray-600"
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                {image.name}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {formatFileSize(image.size)} • {image.type}
              </p>
            </div>
            <button
              onClick={() => onRemoveImage(image.id)}
              className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Remove image"
            >
              <RemoveIcon />
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
