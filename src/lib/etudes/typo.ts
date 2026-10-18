import { frTypo } from "@/lib/typo";

const NARROW_NBSP = " ";

function thousands(input: string): string {
  // 1 249 → 1 249 avec une espace fine insécable, pour ne jamais couper un nombre.
  return input.replace(/(\d) (\d{3})(?!\d)/g, `$1${NARROW_NBSP}$2`).replace(/(\d) (\d{3})(?!\d)/g, `$1${NARROW_NBSP}$2`);
}

function deep<T>(value: T): T {
  if (typeof value === "string") return thousands(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => deep(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = deep(v);
    return out as unknown as T;
  }
  return value;
}

/** Typographie française du site, plus les espaces fines des milliers. */
export function etTypo<T>(value: T): T {
  return deep(frTypo(value));
}
