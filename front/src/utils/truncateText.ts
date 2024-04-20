export function truncateText(input: string, length?: number) {
  const textLength = length || 120
  const strippedInput = input
    .replace(/<[^>]*>?/gm, '')
    .replace(/[\n]/, '')
    .trim()
  return strippedInput.length > textLength
    ? strippedInput.substring(0, textLength)
    : strippedInput
}
