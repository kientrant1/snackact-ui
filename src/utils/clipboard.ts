import type { ClipboardEvent } from 'react'

export interface ClipboardImageData {
  file: File
  preview: string
  name: string
  size: number
  type: string
  id: string
}

export interface ClipboardOptions {
  onSuccess?: (images: ClipboardImageData[]) => void
  onError?: (error: string) => void
  validateFile?: (file: File) => string | null
  maxImages?: number
  generateId?: () => string
}

/**
 * Extracts image files from clipboard event
 * @param event - The clipboard event
 * @returns Array of image files found in clipboard
 */
export function getImagesFromClipboard(event: ClipboardEvent): File[] {
  const items = event.clipboardData?.items
  if (!items) return []

  const imageFiles: File[] = []
  for (let i = 0; i < items.length; i++) {
    const item = items[i]
    if (item.type.startsWith('image/')) {
      const file = item.getAsFile()
      if (file) imageFiles.push(file)
    }
  }

  return imageFiles
}

/**
 * Processes clipboard images with validation and preview generation
 * @param event - The clipboard event
 * @param options - Configuration options
 */
export function processClipboardImages(
  event: ClipboardEvent,
  options: ClipboardOptions = {}
): void {
  const {
    onSuccess,
    onError,
    validateFile,
    maxImages,
    generateId = () =>
      `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
  } = options

  const imageFiles = getImagesFromClipboard(event)

  if (imageFiles.length === 0) return

  event.preventDefault()

  // Limit files if maxImages is specified
  const filesToProcess = maxImages ? imageFiles.slice(0, maxImages) : imageFiles

  const processedImages: ClipboardImageData[] = []
  let processedCount = 0

  filesToProcess.forEach(file => {
    // Validate file if validator is provided
    if (validateFile) {
      const validationError = validateFile(file)
      if (validationError) {
        onError?.(validationError)
        processedCount++
        if (
          processedCount === filesToProcess.length &&
          processedImages.length > 0
        ) {
          onSuccess?.(processedImages)
        }
        return
      }
    }

    const reader = new FileReader()
    reader.onload = event => {
      const preview = event.target?.result as string
      const imageData: ClipboardImageData = {
        file,
        preview,
        name: file.name || `pasted-image-${Date.now()}.png`,
        size: file.size,
        type: file.type,
        id: generateId(),
      }

      processedImages.push(imageData)
      processedCount++

      // Call onSuccess when all files are processed
      if (processedCount === filesToProcess.length) {
        onSuccess?.(processedImages)
      }
    }

    reader.onerror = () => {
      onError?.(`Failed to read ${file.name}`)
      processedCount++
      if (
        processedCount === filesToProcess.length &&
        processedImages.length > 0
      ) {
        onSuccess?.(processedImages)
      }
    }

    reader.readAsDataURL(file)
  })
}

/**
 * Simple clipboard image handler for basic use cases
 * @param event - The clipboard event
 * @param callback - Function to call with processed images
 */
export function handleClipboardImages(
  event: ClipboardEvent,
  callback: (images: ClipboardImageData[]) => void
): void {
  processClipboardImages(event, {
    onSuccess: callback,
    onError: error => console.error('Clipboard image error:', error),
  })
}
