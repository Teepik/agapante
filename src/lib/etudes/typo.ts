import { frTypoString } from "@/lib/typo";

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
  return input
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${NARROW_NBSP}$2`)
    .replace(/(\d) (\d{3})(?!\d)/g, `$1${NARROW_NBSP}$2`);
}

function hours(input: string): string {
  // 3 h 30, 23 h 59 : une heure reste sur une seule ligne.
  return input.replace(/(\d)[ \u00a0]h (\d{2})\b/g, "$1\u00a0h\u00a0$2");
}

const MOIS = "janvier|février|mars|avril|mai|juin|juillet|août|septembre|octobre|novembre|décembre";
const JOUR_MOIS = new RegExp(`\\b(\\d{1,2}|1er) (${MOIS})\\b`, "g");
const MI_MOIS = new RegExp(`\\b([Mm]i)-(${MOIS})\\b`, "g");

function dates(input: string): string {
  // « 2 mars », « mi-juillet » : le jour reste avec son mois.
  return input.replace(JOUR_MOIS, "$1\u00a0$2").replace(MI_MOIS, `$1-${WORD_JOINER}$2`);
}

function yearRanges(input: string): string {
  // 2026-2027 : une période d'années reste sur une seule ligne.
  return input.replace(/\b(\d{4})-(\d{2,4})\b/g, `$1-${WORD_JOINER}$2`);
}

/** Une adresse web : elle reste intacte, sinon le lien casse (« 2026-2027 », « %C3%A9 »). */
const URL_RE = /^(https?:\/\/|mailto:|\/)/;
/** Une date machine (2027-06-14) : elle reste lisible par le code. */
const ISO_DATE_RE = /^\d{4}-\d{2}-\d{2}$/;

function deep<T>(value: T): T {
  if (typeof value === "string") {
    if (URL_RE.test(value) || ISO_DATE_RE.test(value)) return value;
    return keepTogether(yearRanges(dates(hours(thousands(frTypoString(value)))))) as unknown as T;
  }
  if (Array.isArray(value)) return value.map((v) => deep(v)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = k === "url" ? v : deep(v);
    return out as unknown as T;
  }
  return value;
}

/** Typographie française du site, plus les espaces fines des milliers ; les adresses web restent intactes. */
export function etTypo<T>(value: T): T {
  return deep(value);
}
