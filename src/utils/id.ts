import { v4 as uuidv4 } from 'uuid'

export const generateUniqueId = (prefix?: string): string => {
  if (prefix) {
    return `${prefix}-${uuidv4()}`
  }
  return uuidv4()
}
