// Lib functions and helpers

/**
 * Helper function to combine class names
 */
export const cn = (
  ...classes: (string | undefined | null | false)[]
): string => {
  return classes.filter(Boolean).join(' ')
}
