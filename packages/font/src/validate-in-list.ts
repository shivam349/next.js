import { formatAvailableValues } from './format-available-values'
import { nextFontError } from './next-font-error'

/**
 * Validates that a value is in a list of allowed values
 * @param value - The value to validate
 * @param allowedValues - List of allowed values
 * @param valueName - Name of the value type (e.g., 'subset', 'weight', 'style')
 * @param fontFamily - Optional font family name for better error messages
 */
export function validateInList(
  value: string,
  allowedValues: string[],
  valueName: string,
  fontFamily?: string
): void {
  if (!allowedValues.includes(value)) {
    const fontContext = fontFamily ? ` for font \`${fontFamily}\`` : ''
    nextFontError(
      `Unknown ${valueName} \`${value}\`${fontContext}.\nAvailable ${valueName}s: ${formatAvailableValues(
        allowedValues
      )}`
    )
  }
}

/**
 * Validates that all values in an array are in a list of allowed values
 * @param values - The values to validate
 * @param allowedValues - List of allowed values
 * @param valueName - Name of the value type (e.g., 'subset', 'weight', 'style')
 * @param fontFamily - Optional font family name for better error messages
 */
export function validateAllInList(
  values: string[],
  allowedValues: string[],
  valueName: string,
  fontFamily?: string
): void {
  values.forEach((value) => {
    validateInList(value, allowedValues, valueName, fontFamily)
  })
}
