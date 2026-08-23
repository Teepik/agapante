import "server-only";

export function isVercelBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.endsWith(".blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function isPrivateVercelBlobUrl(url: string): boolean {
  try {
    return new URL(url).hostname.includes(".private.blob.vercel-storage.com");
  } catch {
    return false;
  }
}

export function getBlobPathname(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (!parsed.hostname.endsWith(".blob.vercel-storage.com")) return null;
    const pathname = parsed.pathname.replace(/^\/+/, "");
    return pathname || null;
  } catch {
    return null;
  }
}

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

export function resolveShowcaseImageDisplayUrl(url: string | null | undefined): string | null {
  const normalized = url ? normalizeStoredImageUrl(url) : null;
  if (!normalized) return null;
  if (!isPrivateVercelBlobUrl(normalized)) return normalized;

  const pathname = getBlobPathname(normalized);
  if (!pathname) return normalized;

  return `/api/vitrine/image?pathname=${encodeURIComponent(pathname)}`;
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
