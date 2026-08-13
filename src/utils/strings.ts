export function slugify(title: string) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-');
}

export function padContentLength(length: number) {
  return String(length ?? 0).padStart(2, '0');
}
