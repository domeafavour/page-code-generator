export function arrayPush<T>(array: T[], item: T) {
  return [...array, item];
}

export function ensureArray<T>(array: T[] | null | undefined | void): T[] {
  return array || [];
}
