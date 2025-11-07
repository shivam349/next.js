import { allowedDisplayValues } from './constants'
import { formatAvailableValues } from './format-available-values'
import { nextFontError } from './next-font-error'

/**
 * Validates the display value for font configuration
 * @param display - The display value to validate
 * @param fontFamily - Optional font family name for better error messages
 */
export function validateDisplay(
  display: string,
  fontFamily?: string
): void {
  if (!allowedDisplayValues.includes(display)) {
    const fontContext = fontFamily ? ` for font \`${fontFamily}\`` : ''
    nextFontError(
      `Invalid display value \`${display}\`${fontContext}.\nAvailable display values: ${formatAvailableValues(
        allowedDisplayValues
      )}`
    )
  }
}
