/**
 * Typographie française : espaces fines insécables devant les ponctuations
 * doubles, insécables autour des guillemets et avant le signe pourcent.
 * Appliqué aux contenus éditoriaux au chargement du module.
 */
const NARROW_NBSP = " ";
const NBSP = " ";

export function frTypoString(input: string): string {
  return input
    .replace(/ ([:;!?])/g, `${NARROW_NBSP}$1`)
    .replace(/« /g, `«${NARROW_NBSP}`)
    .replace(/ »/g, `${NARROW_NBSP}»`)
    .replace(/(\d) ?%/g, `$1${NBSP}%`)
    .replace(/(\d) (€|h|km|m²)\b/g, `$1${NBSP}$2`);
}

export function frTypo<T>(value: T): T {
  if (typeof value === "string") return frTypoString(value) as unknown as T;
  if (Array.isArray(value)) return value.map((item) => frTypo(item)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [key, val] of Object.entries(value as Record<string, unknown>)) {
      out[key] = frTypo(val);
    }
    return out as unknown as T;
  }
  return value;
}
