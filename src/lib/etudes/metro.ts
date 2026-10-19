/**
 * La carte interactive des études, version « plan de métro » : quatre lignes après le bac, le tronc commun
 * avant, chaque étape à sa vraie durée sur l'axe du temps. Les fiches reprennent le contenu vérifié de
 * stations.ts ; ce module décrit seulement le tracé, les durées et ce qui s'y ajoute (alternance, choix).
 */
import type { LaneId } from "./lines";
import type { StationContent } from "./stations";
import { etTypo } from "./typo";

export type MetroLineId = "tronc" | "prepa" | "postbac" | "but" | "univ";

export type MetroLine = {
  id: Exclude<MetroLineId, "tronc">;
  /** La voie de la carte complète : sa couleur et ses fiches. */
  lane: LaneId;
  name: string;
  short: string;
  pitch: string;
  /** Jusqu'où mène la ligne, en années après le bac. */
  horizon: string;
};

export const METRO_LINES: MetroLine[] = etTypo([
  {
    id: "prepa",
    lane: "sciences",
    name: "Prépa et grandes écoles d'ingénieurs",
    short: "Prépa",
    pitch: "Deux ans de prépa au lycée, les concours, puis trois ans d'école.",
    horizon: "Jusqu'à bac+5",
  },
  {
    id: "postbac",
    lane: "postbac",
    name: "Écoles d'ingénieurs post-bac",
    short: "Post-bac",
    pitch: "Cinq ans dans la même école, avec une prépa intégrée.",
    horizon: "Jusqu'à bac+5",
  },
  {
    id: "but",
    lane: "courtes",
    name: "BUT, BTS et alternance",
    short: "BUT, BTS",
    pitch: "Deux ou trois ans très concrets, souvent en alternance, et la possibilité de continuer.",
    horizon: "Bac+2 ou bac+3",
  },
  {
    id: "univ",
    lane: "u",
    name: "Université",
    short: "Université",
    pitch: "Licence, master, doctorat : la voie la plus ouverte.",
    horizon: "De bac+3 à bac+8",
  },
]);

export const metroLineById = Object.fromEntries(METRO_LINES.map((l) => [l.id, l])) as Record<
  MetroLine["id"],
  MetroLine
>;

/** Une étape (un segment de ligne), un choix (une correspondance) ou un terminus (un métier). */
export type StopKind = "etape" | "choix" | "terminus";

export type Stop = {
  /** Identifiant de la fiche : celui de stations.ts, ou d'une fiche propre à la carte. */
  id: string;
  line: MetroLineId;
  kind: StopKind;
  /** Début de l'étape, en années depuis la rentrée de 3e (le bac tombe à 4). */
  t0: number;
  /** Fin de l'étape ; absent pour un choix ou un terminus. */
  t1?: number;
  /** Le nom court, sur la carte. */
  label: string;
  duree?: string;
  /** Comment on y entre, en quelques mots. */
  entree?: string;
  /** Ce que coûte une année, en quelques mots. */
  cout?: string;
  /** Ce que permet l'alternance à cette étape ; absent quand l'étape se fait en formation classique. */
  alternance?: string;
};

export const BAC_T = 4;

export const STOPS: Stop[] = etTypo([
  /* Tronc commun */
  { id: "college", line: "tronc", kind: "etape", t0: 0, t1: 1, label: "3e", duree: "1 an" },
  { id: "seconde", line: "tronc", kind: "etape", t0: 1, t1: 2, label: "2nde", duree: "1 an" },
  {
    id: "premiere-terminale",
    line: "tronc",
    kind: "etape",
    t0: 2,
    t1: 4,
    label: "1re et terminale",
    duree: "2 ans",
  },
  { id: "bac", line: "tronc", kind: "choix", t0: 4, label: "Bac et Parcoursup" },

  /* Prépa et grandes écoles */
  {
    id: "prepa-scientifique",
    line: "prepa",
    kind: "etape",
    t0: 4,
    t1: 6,
    label: "Prépa scientifique",
    duree: "2 ans",
    entree: "Sur Parcoursup",
    cout: "Scolarité gratuite dans le public",
  },
  { id: "concours-ingenieurs", line: "prepa", kind: "choix", t0: 6, label: "Concours", entree: "Écrits, puis oraux" },
  {
    id: "ecole-ingenieurs",
    line: "prepa",
    kind: "etape",
    t0: 6,
    t1: 9,
    label: "Grande école d'ingénieurs",
    duree: "3 ans",
    entree: "Sur concours ou sur titre",
    cout: "630 € par an dans le public",
    alternance:
      "De nombreuses écoles proposent leur cycle ingénieur en apprentissage, souvent dans des spécialités dédiées : l'entreprise paie la scolarité et te verse un salaire.",
  },
  { id: "metiers-sciences", line: "prepa", kind: "terminus", t0: 9, label: "Ingénieur, chercheur" },

  /* Écoles post-bac */
  {
    id: "cycle-integre",
    line: "postbac",
    kind: "etape",
    t0: 4,
    t1: 6,
    label: "Prépa intégrée",
    duree: "2 ans",
    entree: "Sur Parcoursup, souvent par un concours commun",
    cout: "De 178 € par an dans le public à 11 499 € dans le privé",
  },
  {
    id: "cycle-postbac",
    line: "postbac",
    kind: "etape",
    t0: 6,
    t1: 9,
    label: "Cycle ingénieur",
    duree: "3 ans",
    entree: "Au contrôle continu, ou par admission parallèle",
    cout: "630 € par an dans le public",
    alternance:
      "Possible dès la 3e ou la 4e année selon l'école : l'entreprise paie ta scolarité et te verse un salaire.",
  },
  { id: "metiers-postbac", line: "postbac", kind: "terminus", t0: 9, label: "Ingénieur, manager" },

  /* BUT, BTS et alternance */
  {
    id: "bts-but",
    line: "but",
    kind: "etape",
    t0: 4,
    t1: 6,
    label: "BTS ou BUT",
    duree: "2 ans",
    entree: "Sur Parcoursup",
    cout: "BTS public gratuit, BUT 178 € par an",
    alternance:
      "Le BTS et le BUT se préparent aussi en alternance : tu signes un contrat avec un employeur, tu partages ton temps entre les cours et l'entreprise, et tu touches un salaire.",
  },
  {
    id: "but-lp",
    line: "but",
    kind: "etape",
    t0: 6,
    t1: 7,
    label: "BUT 3 ou licence pro",
    duree: "1 an",
    entree: "Dans ton IUT, ou sur dossier",
    cout: "178 € par an, salaire en alternance",
    alternance:
      "La 3e année de BUT se suit en formation classique ou en alternance ; la licence professionnelle se prépare très souvent en alternance.",
  },
  { id: "metiers-courtes", line: "but", kind: "terminus", t0: 7, label: "Technicien supérieur" },

  /* Université */
  {
    id: "universite",
    line: "univ",
    kind: "etape",
    t0: 4,
    t1: 7,
    label: "Licence",
    duree: "3 ans",
    entree: "Sur Parcoursup",
    cout: "178 € par an, boursiers dispensés",
  },
  { id: "mon-master", line: "univ", kind: "choix", t0: 7, label: "Mon Master", entree: "Sur dossier" },
  {
    id: "u-master",
    line: "univ",
    kind: "etape",
    t0: 7,
    t1: 9,
    label: "Master",
    duree: "2 ans",
    entree: "Sur dossier, via Mon Master",
    cout: "255 € par an, boursiers dispensés",
    alternance: "De nombreux masters se suivent en apprentissage, avec un salaire et une première expérience.",
  },
  {
    id: "doctorat",
    line: "univ",
    kind: "etape",
    t0: 9,
    t1: 12,
    label: "Doctorat",
    duree: "3 ans",
    entree: "Après un master",
    cout: "398 € par an d'inscription",
  },
  { id: "metiers-u", line: "univ", kind: "terminus", t0: 12, label: "Chercheur, cadre" },
]);

export const stopById = Object.fromEntries(STOPS.map((s) => [s.id, s])) as Record<string, Stop>;

/** L'instant qui représente l'étape sur la carte : le milieu d'une étape, le point d'un choix. */
export function stopT(s: Stop): number {
  return typeof s.t1 === "number" ? (s.t0 + s.t1) / 2 : s.t0;
}

/** Les fiches propres à la carte, pour les étapes qui manquent à stations.ts. */
export const METRO_FICHES: Record<string, StationContent> = etTypo({
  "mon-master": {
    id: "mon-master",
    name: "Mon Master, l'entrée en master",
    label: "Mon Master",
    when: "Au printemps de la 3e année de licence",
    what: "Après la licence, l'entrée en master se fait sur dossier, par la plateforme nationale Mon Master : tu formules tes vœux, les universités étudient ton dossier, puis tu reçois leurs réponses.",
    acces: ["Sélection sur dossier à l'entrée de la 1re année de master, via la plateforme nationale Mon Master."],
    apres: ["Master", "École sur titre", "Premier emploi avec la licence"],
  },
});

/* ---------- Passerelles dessinées ---------- */

export type MetroPass = {
  /** Identifiant dans passerelles.ts, pour ouvrir sa fiche. */
  id: string;
  from: string;
  to: string;
  /** Moment du saut, en années depuis la rentrée de 3e. */
  t: number;
};

/** Les passerelles entre les lignes de cette carte, au moment où elles se prennent. */
export const METRO_PASS: MetroPass[] = [
  { id: "rebond-postbac", from: "universite", to: "cycle-integre", t: 5 },
  { id: "postbac-universite", from: "cycle-integre", to: "universite", t: 5 },
  { id: "prepa-universite", from: "prepa-scientifique", to: "universite", t: 6 },
  { id: "prepa-cycle-postbac", from: "prepa-scientifique", to: "cycle-postbac", t: 6 },
  { id: "bts-but-cycle-postbac", from: "bts-but", to: "cycle-postbac", t: 6 },
  { id: "but-ingenieur", from: "but-lp", to: "ecole-ingenieurs", t: 7 },
  { id: "licence-ingenieur", from: "universite", to: "ecole-ingenieurs", t: 7 },
  { id: "licence-cycle-postbac", from: "universite", to: "cycle-postbac", t: 7 },
  { id: "but-master", from: "but-lp", to: "u-master", t: 7 },
  { id: "ecole-doctorat", from: "ecole-ingenieurs", to: "doctorat", t: 9 },
];

/** Les étapes de la carte qu'un métier traverse : les licences thématiques se lisent sur la ligne Université. */
export function etapesDuTrajet(via: string[]): string[] {
  return via.map((id) => (id.startsWith("u-") && id !== "u-master" ? "universite" : id)).filter((id) => stopById[id]);
}
