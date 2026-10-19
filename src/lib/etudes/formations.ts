/**
 * Les formations de Parcoursup, chargées à la demande : places, candidats, taux d'accès, mentions et
 * bacs des admis, pour chaque formation de la session 2025.
 *
 * public/etudes-data/formations-2025.json se construit hors ligne à partir du jeu de données du
 * ministère de l'Enseignement supérieur « Parcoursup 2025 : vœux de poursuite d'études et réponses
 * des établissements » (fr-esr-parcoursup, Licence Ouverte).
 */
import { cle } from "./communes";

export const FORMATIONS_URL = "/etudes-data/formations-2025.json";
export const PSUP_SESSION = 2025;
export const SOURCE_PSUP = "https://data.enseignementsup-recherche.gouv.fr/explore/dataset/fr-esr-parcoursup/";

export type Contrat = 0 | 1 | 2 | 3;
export const contratLabel: Record<Contrat, string> = {
  0: "Public",
  1: "Privé sous contrat",
  2: "Privé",
  3: "Privé hors contrat",
};

export type Formation = {
  id: string;
  code: number;
  name: string;
  /** Nom et établissement, sans accents : sert à la recherche par mot. */
  key: string;
  cat: number;
  selective: boolean;
  etab: string;
  uai: string;
  ville: string;
  dep: string;
  contrat: Contrat;
  lat: number;
  lon: number;
  places?: number;
  candidats?: number;
  admis?: number;
  /** Part des candidats qui ont pu recevoir une proposition (taux d'accès). */
  acces?: number;
  /** Mentions des admis néo-bacheliers, en % : très bien (félicitations comprises), bien, assez bien. */
  tb?: number;
  b?: number;
  ab?: number;
  boursiers?: number;
  /** Bacs des admis néo-bacheliers, en % : général, technologique, professionnel. */
  bg?: number;
  bt?: number;
  bp?: number;
};

export type Formations = { cats: string[]; list: Formation[] };

type RawEtab = [uai: string, name: string, ville: string, dep: string, contrat: number];
type Raw = {
  v: number;
  session: number;
  cats: string[];
  etabs: RawEtab[];
  labels: string[];
  formations: (number | null)[][];
};

/** Les formations déjà chargées (ou gardées dans « Ma liste »), par identifiant. */
export const formationById: Record<string, Formation> = {};

function decode(raw: Raw): Formations {
  const list = raw.formations.map((r): Formation => {
    const v = (i: number) => (r[i] ?? undefined) as number | undefined;
    const e = raw.etabs[r[1] as number];
    const f: Formation = {
      id: `psup-${r[0]}`,
      code: r[0] as number,
      name: raw.labels[r[2] as number],
      key: cle(`${raw.labels[r[2] as number]} ${e[1]}`),
      cat: r[3] as number,
      selective: r[4] === 1,
      uai: e[0],
      etab: e[1],
      ville: e[2],
      dep: e[3],
      contrat: (e[4] as Contrat) ?? 0,
      lat: (r[5] as number) / 1000,
      lon: (r[6] as number) / 1000,
      places: v(7),
      candidats: v(8),
      admis: v(9),
      acces: v(10),
      tb: v(11),
      b: v(12),
      ab: v(13),
      boursiers: v(14),
      bg: v(15),
      bt: v(16),
      bp: v(17),
    };
    return f;
  });
  for (const f of list) formationById[f.id] ??= f;
  return { cats: raw.cats, list };
}

let pending: Promise<Formations> | null = null;

/** Charge les formations une seule fois (environ 370 Ko compressés). */
export function chargerFormations(): Promise<Formations> {
  pending ??= fetch(FORMATIONS_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`formations : ${res.status}`);
      return res.json() as Promise<Raw>;
    })
    .then(decode)
    .catch((err: unknown) => {
      pending = null;
      throw err;
    });
  return pending;
}

/** La fiche de la formation sur Parcoursup. */
export function lienParcoursup(f: Formation): string {
  return `https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=${f.code}&typeBac=0&originePc=0`;
}

/** « 11 % des candidats ont pu recevoir une proposition » : l'accès en une étiquette. */
export function accesTexte(acces: number): string {
  if (acces >= 90) return "Très accessible";
  if (acces >= 60) return "Accessible";
  if (acces >= 30) return "Sélective";
  if (acces >= 10) return "Très sélective";
  return "Extrêmement sélective";
}

/* ---------- « Ma liste » : les formations gardées sur l'appareil ---------- */

const GARDEES = "etudes:formations";

function lireGardees(): Record<string, Formation> {
  try {
    const raw = window.localStorage.getItem(GARDEES);
    return raw ? (JSON.parse(raw) as Record<string, Formation>) : {};
  } catch {
    return {};
  }
}

/** Remet en mémoire les formations gardées dans « Ma liste », sans recharger tout le fichier. */
export function restaurerFormationsGardees(): void {
  for (const f of Object.values(lireGardees())) {
    if (f && typeof f.id === "string" && f.id.startsWith("psup-")) formationById[f.id] ??= f;
  }
}

/** Garde (ou oublie) une formation quand elle entre dans « Ma liste » (ou en sort). */
export function garderFormation(id: string, garder: boolean): void {
  try {
    const gardees = lireGardees();
    if (garder && formationById[id]) gardees[id] = formationById[id];
    else delete gardees[id];
    window.localStorage.setItem(GARDEES, JSON.stringify(gardees));
  } catch {
    /* stockage indisponible : la liste vit le temps de la visite */
  }
}
