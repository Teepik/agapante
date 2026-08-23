export function normalizeShowcaseUrl(raw: string): string | null {
  const trimmed = raw.trim();
  if (!trimmed) return null;

  let candidate = trimmed;
  if (!/^https?:\/\//i.test(candidate)) {
    candidate = `https://${candidate}`;
  }

  try {
    const url = new URL(candidate);
    if (url.protocol !== "http:" && url.protocol !== "https:") return null;
    if (!url.hostname || !url.hostname.includes(".")) return null;
    url.hash = "";
    return url.toString().replace(/\/$/, "");
  } catch {
    return null;
  }
}

export function showcaseHostname(url: string): string {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

export function normalizeImageUrl(raw: string): string | null {
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

export function showcaseAccent(url: string): { from: string; to: string; glow: string } {
  let hash = 0;
  for (let i = 0; i < url.length; i += 1) {
    hash = (hash * 31 + url.charCodeAt(i)) >>> 0;
  }

  const hues = [
    { from: "#8b93f8", to: "#7fd1b9", glow: "rgba(139, 147, 248, 0.35)" },
    { from: "#a7aeff", to: "#e5b567", glow: "rgba(167, 174, 255, 0.32)" },
    { from: "#7fd1b9", to: "#6f77e8", glow: "rgba(127, 209, 185, 0.28)" },
    { from: "#c9ceff", to: "#7fd1b9", glow: "rgba(201, 206, 255, 0.3)" },
    { from: "#6f77e8", to: "#e5b567", glow: "rgba(111, 119, 232, 0.34)" },
  ];

  return hues[hash % hues.length];
}
