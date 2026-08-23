import "server-only";

export function normalizeStoredImageUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    return url.toString();
  } catch {
    return null;
  }
}

export function resolveShowcaseImageUrl(formData: FormData): string | null {
  const uploaded = normalizeStoredImageUrl(String(formData.get("imageUrl") ?? ""));
  if (uploaded) return uploaded;

  const existing = normalizeStoredImageUrl(String(formData.get("existingImageUrl") ?? ""));
  if (existing) return existing;

  return null;
}

export function isAllowedShowcaseImageUrl(url: string): boolean {
  return normalizeStoredImageUrl(url) !== null;
}
