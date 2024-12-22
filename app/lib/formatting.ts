export function sanitizeText(input: string): string {
  return input
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "_")
    .toLowerCase();
}
