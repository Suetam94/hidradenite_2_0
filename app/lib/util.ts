export const isBytes = (value: unknown): boolean => {
  return value instanceof Uint8Array || value instanceof ArrayBuffer
}
