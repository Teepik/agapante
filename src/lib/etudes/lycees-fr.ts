/**
 * Les lycées de toute la France, chargés à la demande.
 *
 * Le fichier public/etudes-data/lycees-france-2025.json se construit hors ligne à partir des données
 * ouvertes de l'Éducation nationale (Licence Ouverte) : l'annuaire de l'éducation pour les lycées,
 * leurs coordonnées et leurs voies ; les indicateurs de résultats des lycées (IVAL) de la session 2025.
 * Une fois chargé, il reste sur l'appareil grâce au service worker de la page.
 */
import { lyceeById, type Lycee, type LyceeStatut, type Resultats } from "./lycees";

export const FRANCE_URL = "/etudes-data/lycees-france-2025.json";
export const FRANCE_SESSION = 2025;

export const SOURCES_FRANCE = {
  annuaire: "https://data.education.gouv.fr/explore/dataset/fr-en-annuaire-education/",
  ivalGT: "https://data.education.gouv.fr/explore/dataset/fr-en-indicateurs-de-resultat-des-lycees-gt_v2/",
  ivalPro: "https://data.education.gouv.fr/explore/dataset/fr-en-indicateurs-de-resultat-des-lycees-pro_v2/",
};

/** Candidats, réussite, valeur ajoutée, mentions, valeur ajoutée des mentions, accès 2nde-bac, sa valeur ajoutée, effectif. */
type RawIndic = (number | null)[];
type RawLycee = [
  uai: string,
  nom: string,
  ville: string,
  cp: string,
  dep: string,
  statut: number,
  lat: number,
  lon: number,
  flags: number,
  web?: string,
  onisep?: string,
  gt?: RawIndic | 0,
  pro?: RawIndic | 0,
];
type Raw = {
  v: number;
  session: number;
  deps: Record<string, string>;
  lycees: RawLycee[];
};

const STATUTS: LyceeStatut[] = ["public", "prive-contrat", "hors-contrat", "defense"];

/** Les lycées de la sélection, retrouvés dans l'annuaire national : leur fiche détaillée s'ouvre à la place. */
export const SELECTION_PAR_UAI: Record<string, string> = {
  "0720896H": "prytanee",
  "0280007F": "marceau",
  "0280665W": "notre-dame-chartres",
  "0560114V": "saint-francois-xavier-vannes",
  "0290170C": "likes-quimper",
  "0290177K": "kreisker-saint-pol-de-leon",
  "0350777E": "saint-martin-rennes",
  "0350774B": "saint-sauveur-redon",
  "0492407A": "mongazon-angers",
  "0530048P": "immaculee-conception-laval",
  "0850086G": "saint-gabriel-saint-laurent-sur-sevre",
  "0411071S": "pontlevoy",
  "0610700E": "bignon-mortagne",
  "0440161L": "loquidy-nantes",
  "0141164P": "sainte-marie-caen",
  "0860755D": "isaac-de-l-etoile-poitiers",
  "0611249B": "croix-des-vents-sees",
  "0851557F": "chavagnes-international-college",
  "0411109H": "academie-saint-louis-chales",
  "0750654D": "henri-iv",
  "0750655E": "louis-le-grand",
  "0750652B": "charlemagne",
  "0750667T": "condorcet",
  "0750660K": "fenelon",
  "0750699C": "janson-de-sailly",
  "0782562L": "hoche",
  "0920145H": "lakanal",
  "0753840S": "stanislas",
  "0753933T": "franklin",
  "0753947H": "saint-jean-de-passy",
  "0753647G": "ecole-alsacienne",
  "0783350T": "saint-jean-hulst",
  "0920919Z": "sainte-croix-neuilly",
  "0950762M": "saint-martin-de-france",
  "0754086J": "charles-de-foucauld",
};

function resultats(r: RawIndic | 0 | undefined, source: string): Resultats | undefined {
  if (!r) return undefined;
  const v = (i: number) => r[i] ?? undefined;
  return {
    session: FRANCE_SESSION,
    candidats: v(0),
    reussite: v(1),
    va: v(2),
    mentions: v(3),
    vaMentions: v(4),
    acces: v(5),
    vaAcces: v(6),
    source,
  };
}

function lycee(r: RawLycee, deps: Record<string, string>): Lycee {
  const [uai, name, ville, cp, dep, statut, lat, lon, flags, web, onisep, gt, pro] = r;
  const eleves = (gt ? (gt[7] ?? 0) : 0) + (pro ? (pro[7] ?? 0) : 0);
  const sections = [
    flags & 128 ? "Section européenne" : "",
    flags & 64 ? "Section internationale" : "",
    flags & 256 ? "Section arts" : "",
    flags & 512 ? "Section sportive" : "",
  ].filter(Boolean);
  return {
    id: `fr-${uai}`,
    name,
    ville,
    departement: [dep, deps[dep]].filter(Boolean).join(" "),
    region: "",
    zone: "autre",
    lat,
    lon,
    statut: STATUTS[statut] ?? "public",
    internat: { existe: Boolean(flags & 1) },
    effectif: eleves ? `${eleves.toLocaleString("fr-FR")} élèves de la 2nde à la terminale` : undefined,
    resultats: resultats(gt, SOURCES_FRANCE.ivalGT),
    url: web ? (/^https?:\/\//.test(web) ? web : `https://${web}`) : undefined,
    national: {
      uai,
      cp,
      voies: { g: Boolean(flags & 2), t: Boolean(flags & 4), p: Boolean(flags & 8) },
      agricole: Boolean(flags & 16),
      postBac: Boolean(flags & 32),
      sections,
      onisep: onisep ? `https://www.onisep.fr/http/redirection/etablissement/slug/${onisep}` : undefined,
      pro: resultats(pro, SOURCES_FRANCE.ivalPro),
    },
  };
}

function decode(raw: Raw): Lycee[] {
  const lycees = raw.lycees.map((r) => lycee(r, raw.deps));
  // Les fiches s'ouvrent par leur identifiant, comme celles de la sélection.
  for (const l of lycees) lyceeById[l.id] ??= l;
  return lycees;
}

let pending: Promise<Lycee[]> | null = null;

/** Charge les lycées de France une seule fois (environ 200 Ko compressés). */
export function chargerLycees(): Promise<Lycee[]> {
  pending ??= fetch(FRANCE_URL)
    .then((res) => {
      if (!res.ok) throw new Error(`lycées de France : ${res.status}`);
      return res.json() as Promise<Raw>;
    })
    .then(decode)
    .catch((err: unknown) => {
      pending = null;
      throw err;
    });
  return pending;
}

/** Les voies d'un lycée, en clair. */
export function voiesTexte(l: Lycee): string | null {
  const v = l.national?.voies;
  if (!v) return null;
  const list = [v.g ? "générale" : "", v.t ? "technologique" : "", v.p ? "professionnelle" : ""].filter(Boolean);
  if (!list.length) return null;
  const last = list.pop();
  return `Voie${list.length ? "s" : ""} ${list.length ? `${list.join(", ")} et ${last}` : last}`;
}

/* ---------- « Ma liste » : les lycées de l'annuaire national gardés sur l'appareil ---------- */

const GARDES = "etudes:lycees-fr";

function lireGardes(): Record<string, Lycee> {
  try {
    const raw = window.localStorage.getItem(GARDES);
    return raw ? (JSON.parse(raw) as Record<string, Lycee>) : {};
  } catch {
    return {};
  }
}

/** Remet en mémoire les lycées gardés dans « Ma liste », sans recharger tout l'annuaire. */
export function restaurerLyceesGardes(): void {
  for (const l of Object.values(lireGardes())) {
    if (l && typeof l.id === "string" && l.id.startsWith("fr-")) lyceeById[l.id] ??= l;
  }
}

/** Garde (ou oublie) la fiche d'un lycée national quand il entre dans « Ma liste » (ou en sort). */
export function garderLycee(id: string, garder: boolean): void {
  if (!id.startsWith("fr-")) return;
  try {
    const gardes = lireGardes();
    if (garder && lyceeById[id]) gardes[id] = lyceeById[id];
    else delete gardes[id];
    window.localStorage.setItem(GARDES, JSON.stringify(gardes));
  } catch {
    /* stockage indisponible : la liste vit le temps de la visite */
  }
}
