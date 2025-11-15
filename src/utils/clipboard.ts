import type { ClipboardEvent } from 'react'
import { generateUniqueId } from '@/utils/id'
import logger from '@/utils/logger'

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

const readImageFromFile = (file: File): Promise<ClipboardImageData | null> => {
  const promise = new Promise<ClipboardImageData | null>(resolve => {
    const reader = new FileReader()
    reader.onload = event => {
      const preview = event.target?.result as string
      const imageData: ClipboardImageData = {
        file,
        preview,
        name: file.name || `pasted-image-${Date.now()}.png`,
        size: file.size,
        type: file.type,
        id: generateUniqueId(),
      }

      resolve(imageData)
    }

    reader.onerror = () => {
      logger.error(`Failed to read ${file.name}`)
      resolve(null)
    }

    reader.readAsDataURL(file)
  })
  return promise
}

/**
 * Processes clipboard images with validation and preview generation
 * @param event - The clipboard event
 * @param options - Configuration options
 * @returns Array of image files found in clipboard
 */
export async function processClipboardImages(
  event: ClipboardEvent,
  options: ClipboardOptions = {}
): Promise<{ successImages: ClipboardImageData[]; failedFiles: File[] }> {
  const { validateFile, maxImages } = options
  const result = {
    successImages: [] as ClipboardImageData[],
    failedFiles: [] as File[],
  }

  const imageFiles = getImagesFromClipboard(event)

  if (imageFiles.length === 0) return result

  event.preventDefault()

  // Limit files if maxImages is specified
  const filesToProcess = maxImages ? imageFiles.slice(0, maxImages) : imageFiles

  const processedImagePromises = filesToProcess.map(async file => {
    // Validate file if validator is provided
    if (validateFile) {
      const validationError = validateFile(file)
      logger.error(`Failed to validate file ${file.name}`, validationError)
      return null
    }

    const imageData = await readImageFromFile(file)
    if (!imageData) {
      return null
    }
    return imageData
  })

  // process all files
  const processedImages = await Promise.all(processedImagePromises)

  // classify success and failed files
  processedImages.forEach((img: ClipboardImageData | null, index) => {
    if (img) {
      result.successImages.push(img)
      return
    }
    result.failedFiles.push(filesToProcess[index])
  })
  return result
}
