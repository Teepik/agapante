/**
 * La classe de l'élève, et les années qui en découlent.
 *
 * Les textes datés s'écrivent avec des repères relatifs à l'année du bac : {B} pour juin du bac,
 * {B-3} pour trois ans plus tôt, {B+2} pour deux ans plus tard. La page les remplace par les années
 * de l'élève qui la lit.
 */

export type Classe = "4e" | "3e" | "2nde" | "1re" | "terminale";

export const CLASSES: { id: Classe; label: string; court: string; avantBac: number }[] = [
  { id: "4e", label: "4e", court: "4e", avantBac: 5 },
  { id: "3e", label: "3e", court: "3e", avantBac: 4 },
  { id: "2nde", label: "2nde", court: "2nde", avantBac: 3 },
  { id: "1re", label: "1re", court: "1re", avantBac: 2 },
  { id: "terminale", label: "Terminale", court: "Tle", avantBac: 1 },
];

export const CLASSE_PAR_DEFAUT: Classe = "3e";

/** L'année scolaire des informations de la page : elle sert au premier affichage, avant de lire la date du jour. */
export const DEBUT_PAR_DEFAUT = 2026;

export function estClasse(v: unknown): v is Classe {
  return typeof v === "string" && CLASSES.some((c) => c.id === v);
}

export function classeInfo(c: Classe) {
  return CLASSES.find((x) => x.id === c) ?? CLASSES[1];
}

/** Première année de l'année scolaire en cours : 2026 pour 2026-2027. La rentrée compte à partir du 1er août. */
export function anneeScolaire(d: Date = new Date()): number {
  return d.getMonth() >= 7 ? d.getFullYear() : d.getFullYear() - 1;
}

/** Année du bac (juin) d'un élève, selon sa classe cette année. */
export function anneeDuBac(classe: Classe, debut: number): number {
  return debut + classeInfo(classe).avantBac;
}

const WORD_JOINER = "⁠";

/** Remplace {B}, {B-3}, {B+2}… par les années de l'élève ; une période d'années reste sur une ligne. */
export function avecAnnees(text: string, bac: number): string {
  if (!text.includes("{B")) return text;
  return text
    .replace(/\{B([+-]\d+)?\}/g, (_, off: string | undefined) => String(bac + (off ? Number(off) : 0)))
    .replace(/\b(\d{4})-(\d{4})\b/g, `$1-${WORD_JOINER}$2`);
}

/** Applique une transformation à tous les textes d'un objet (fiche, étape…). */
export function mapTexts<T>(value: T, f: (s: string) => string): T {
  if (typeof value === "string") return f(value) as unknown as T;
  if (Array.isArray(value)) return value.map((v) => mapTexts(v, f)) as unknown as T;
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value as Record<string, unknown>)) out[k] = k === "url" ? v : mapTexts(v, f);
    return out as unknown as T;
  }
  return value;
}

/** Station du tronc commun où se trouve l'élève (en 4e, la 3e arrive l'an prochain). */
export function stationDeClasse(c: Classe): "college" | "seconde" | "premiere-terminale" | null {
  if (c === "3e") return "college";
  if (c === "2nde") return "seconde";
  if (c === "1re" || c === "terminale") return "premiere-terminale";
  return null;
}
