export function serializeDoc<T>(doc: T) {
  return JSON.parse(JSON.stringify(doc));
}