import { useState, useRef, useCallback } from 'react'
import type { DragEvent, ChangeEvent, ClipboardEvent } from 'react'
import type { ComponentProps } from '@/types/component'
import {
  processClipboardImages,
  type ClipboardImageData,
} from '@/utils/clipboard'

export interface ImageData {
  file: File
  preview: string
  name: string
  size: number
  type: string
  id: string
}

interface ImageInputProps extends ComponentProps {
  images: ImageData[]
  onImagesChange: (images: ImageData[]) => void
  maxImages?: number
  acceptedTypes?: string[]
  maxFileSize?: number // in bytes
}

export function ImageInput({
  images,
  onImagesChange,
  maxImages = 5,
  acceptedTypes = [
    'image/png',
    'image/jpeg',
    'image/jpg',
    'image/gif',
    'image/webp',
  ],
  maxFileSize = 10 * 1024 * 1024, // 10MB
  className,
  testId,
  ...props
}: ImageInputProps) {
  const [isDragOver, setIsDragOver] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes'
    const k = 1024
    const sizes = ['Bytes', 'KB', 'MB', 'GB']
    const i = Math.floor(Math.log(bytes) / Math.log(k))
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
  }

  const validateFile = useCallback(
    (file: File): string | null => {
      if (!acceptedTypes.includes(file.type)) {
        return `File type ${file.type} is not supported`
      }
      if (file.size > maxFileSize) {
        return `File size exceeds ${formatFileSize(maxFileSize)}`
      }
      return null
    },
    [acceptedTypes, maxFileSize]
  )

  const processFiles = useCallback(
    (files: FileList | File[]) => {
      const fileArray = Array.from(files)
      const remainingSlots = maxImages - images.length
      const filesToProcess = fileArray.slice(0, remainingSlots)

      const newImages: ImageData[] = []
      let processedCount = 0

      filesToProcess.forEach(file => {
        const validationError = validateFile(file)
        if (validationError) {
          // Could add error handling here
          return
        }

        const reader = new FileReader()
        reader.onload = event => {
          const preview = event.target?.result as string
          const imageData: ImageData = {
            file,
            preview,
            name: file.name || `image-${Date.now()}.png`,
            size: file.size,
            type: file.type,
            id: `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
          }

          newImages.push(imageData)
          processedCount++

          if (processedCount === filesToProcess.length) {
            onImagesChange([...images, ...newImages])
          }
        }
        reader.readAsDataURL(file)
      })
    },
    [images, maxImages, onImagesChange, validateFile]
  )

  const handlePaste = (e: ClipboardEvent) => {
    const remainingSlots = maxImages - images.length

    processClipboardImages(e, {
      maxImages: remainingSlots,
      validateFile,
      onSuccess: (clipboardImages: ClipboardImageData[]) => {
        const imageData: ImageData[] = clipboardImages.map(img => ({
          file: img.file,
          preview: img.preview,
          name: img.name,
          size: img.size,
          type: img.type,
          id: img.id,
        }))

        onImagesChange([...images, ...imageData])
      },
      onError: error => {
        // Could add error handling here or emit to parent
        console.error('Clipboard image error:', error)
      },
    })
  }

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(true)
  }

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)
  }

  const handleDrop = (e: DragEvent) => {
    e.preventDefault()
    setIsDragOver(false)

    const files = e.dataTransfer.files
    if (files.length > 0) {
      processFiles(files)
    }
  }

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files && files.length > 0) {
      processFiles(files)
    }
    // Reset input value to allow selecting the same file again
    e.target.value = ''
  }

  const removeImage = (imageId: string) => {
    onImagesChange(images.filter(img => img.id !== imageId))
  }

  const openFileDialog = () => {
    fileInputRef.current?.click()
  }

  const canAddMore = images.length < maxImages

  return (
    <div
      className={`space-y-3 ${className || ''}`}
      data-testid={testId}
      onPaste={handlePaste}
      {...props}
    >
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept={acceptedTypes.join(',')}
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* Image previews */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map(image => (
            <div
              key={image.id}
              className="relative group border border-gray-200 dark:border-gray-600 rounded-lg overflow-hidden bg-gray-50 dark:bg-gray-800"
            >
              <img
                src={image.preview}
                alt={image.name}
                className="w-full h-24 object-cover"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <button
                  onClick={() => removeImage(image.id)}
                  className="p-1 text-white hover:text-red-300 transition-colors"
                  aria-label={`Remove ${image.name}`}
                >
                  <svg
                    className="w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </button>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-xs p-2">
                <p className="truncate font-medium">{image.name}</p>
                <p className="text-gray-300">
                  {formatFileSize(image.size)} •{' '}
                  {image.type.split('/')[1].toUpperCase()}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Drop zone / Add button */}
      {canAddMore && (
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={openFileDialog}
          className={`
            border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${
              isDragOver
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
            }
            ${images.length === 0 ? 'bg-gray-50 dark:bg-gray-800' : ''}
          `}
        >
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center">
              <svg
                className="w-6 h-6 text-gray-500 dark:text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4v16m8-8H4"
                />
              </svg>
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium">
                {images.length === 0
                  ? 'Click, drag & drop, or paste images'
                  : `Add more images (${images.length}/${maxImages})`}
              </p>
              <p className="text-xs mt-1">
                PNG, JPG, GIF, WebP up to {formatFileSize(maxFileSize)}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Image count indicator */}
      {images.length > 0 && (
        <div className="flex justify-between items-center text-xs text-gray-500 dark:text-gray-400">
          <span>
            {images.length} image{images.length !== 1 ? 's' : ''} selected
          </span>
          {!canAddMore && <span>Maximum {maxImages} images reached</span>}
        </div>
      )}
    </div>
  )
}
