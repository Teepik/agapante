import { frTypo } from "@/lib/typo";

const NARROW_NBSP = " ";

/** Noms composés qu'on ne coupe jamais au trait d'union (le trait reste celui de la police). */
const UNBREAKABLE = [
  "X-ENS",
  "Mines-Ponts",
  "Centrale-Supélec",
  "Saint-Cyr",
  "Agro-Véto",
  "e3a-Polytech",
  "Henri-IV",
  "Paris-Saclay",
  "Dauphine-PSL",
  "Mines-Télécom",
  "Panthéon-Assas",
  "Panthéon-Sorbonne",
];
const WORD_JOINER = "\u2060";

function keepTogether(input: string): string {
  let out = input;
  for (const w of UNBREAKABLE) {
    if (out.includes(w)) out = out.split(w).join(w.replace(/-/g, `-${WORD_JOINER}`));
  }
  return out;
}

function thousands(input: string): string {
  // 1 249 → 1 249 avec une espace fine insécable, pour ne jamais couper un nombre.
  return input.replace(/(\d) (\d{3})(?!\d)/g, `$1${NARROW_NBSP}$2`).replace(/(\d) (\d{3})(?!\d)/g, `$1${NARROW_NBSP}$2`);
}

function yearRanges(input: string): string {
  // 2026-2027 : une période d'années reste sur une seule ligne.
  return input.replace(/\b(\d{4})-(\d{2,4})\b/g, `$1-${WORD_JOINER}$2`);
}

function deep<T>(value: T): T {
  if (typeof value === "string") return keepTogether(yearRanges(thousands(value))) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => deep(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    // Les adresses web restent intactes.
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = k === "url" ? v : deep(v);
    return out as unknown as T;
  }
  return value;
}

/** Typographie française du site, plus les espaces fines des milliers. */
export function etTypo<T>(value: T): T {
  return deep(frTypo(value));
}
