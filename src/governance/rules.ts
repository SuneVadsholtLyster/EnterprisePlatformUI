export type ValidationResult = { valid: boolean; errors?: string[] }

export function validateFactSheetName(name: string): ValidationResult {
  const errors: string[] = []
  if (!name || name.trim().length === 0) errors.push('Name must not be empty')
  if (name.length > 120) errors.push('Name must be <= 120 characters')
  // Enforce kebab-case preferred for IDs
  if (!/^[a-z0-9\-\s]+$/.test(name)) errors.push('Name contains invalid characters — use lowercase, numbers, spaces or -')
  return { valid: errors.length === 0, errors: errors.length ? errors : undefined }
}

export function validateMetadata(metadata: Record<string, any>): ValidationResult {
  const errors: string[] = []
  if (!metadata) return { valid: false, errors: ['Missing metadata object'] }
  if (!metadata.owner) errors.push('Missing owner')
  if (!metadata.lifecycle) errors.push('Missing lifecycle status')
  return { valid: errors.length === 0, errors: errors.length ? errors : undefined }
}
