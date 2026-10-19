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
  /** Où l'étape se passe, quand c'est ce qui la distingue (« au lycée », « dans l'école »). */
  lieu?: string;
  /** Un fait de plus, en quelques mots, sur la fiche courte. */
  plus?: string;
  /** L'essentiel, pour la fiche courte, quand le texte de la fiche complète est long. */
  resume?: string;
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
    lieu: "au lycée",
    entree: "Sur Parcoursup",
    cout: "Scolarité gratuite dans le public",
  },
  {
    id: "concours-ingenieurs",
    line: "prepa",
    kind: "choix",
    t0: 6,
    label: "Concours",
    entree: "Écrits, puis oraux",
    resume:
      "Au printemps de la 2e année, tu passes les écrits de plusieurs banques de concours, puis leurs oraux. Ton classement décide des écoles qui t'ouvrent leurs portes.",
  },
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
      "De nombreuses écoles proposent leur cycle ingénieur en apprentissage, souvent dans des spécialités dédiées : ta scolarité est prise en charge et tu touches un salaire.",
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
    lieu: "dans l'école",
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
      "Possible dès la 3e ou la 4e année selon l'école : ta scolarité est prise en charge et tu touches un salaire.",
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
      "Le BTS et le BUT se préparent aussi en alternance : salarié d'une entreprise, tu partages ton temps entre les cours et le travail, tu touches un salaire et tu prépares le même diplôme. Fin 2025, 44 % des étudiants de BTS étaient apprentis ; en BUT, l'alternance s'ouvre surtout en 2e année.",
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
      "En 3e année de BUT, 57 % des étudiants étaient apprentis en 2025-2026 ; en licence professionnelle, 59 % fin 2025.",
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
    alternance:
      "Un master peut se préparer en apprentissage : fin 2025, 8 % des étudiants de master étaient apprentis. Sur Mon Master, tu peux déposer 15 candidatures en alternance, en plus des 15 autres.",
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
    plus: "Contrat doctoral : au moins 2 300 € bruts par mois",
  },
  { id: "metiers-u", line: "univ", kind: "terminus", t0: 12, label: "Chercheur, cadre" },
]);

export const stopById = Object.fromEntries(STOPS.map((s) => [s.id, s])) as Record<string, Stop>;

/** Sous le nom d'une étape : sa durée, le lieu quand il éclaire, l'alternance quand elle est possible. */
export function sousTitre(s: Stop): string {
  const duree = s.duree && s.lieu ? `${s.duree} ${s.lieu}` : s.duree;
  return [duree, s.alternance ? "alternance possible" : null].filter(Boolean).join(", ");
}

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
    what: "Après la licence, l'entrée en master se fait sur dossier, par la plateforme nationale Mon Master : tu consultes les formations, tu déposes tes candidatures, puis tu reçois les réponses des universités.",
    facts: [
      {
        icon: "clock",
        label: "Calendrier 2026",
        value:
          "Candidatures du 17 février au 17 mars, premières réponses le 3 juin, phase complémentaire du 19 juin au 19 juillet",
      },
      {
        icon: "key",
        label: "Candidatures",
        value: "Jusqu'à 15 en formation classique, et 15 de plus en alternance",
      },
      {
        icon: "seat",
        label: "En 2025",
        value: "8 167 formations, 177 297 places ; 68 % des candidats ont reçu une proposition",
      },
    ],
    acces: [
      "Sélection sur dossier, parfois avec un entretien, à l'entrée de la 1re année de master : tes notes, ton projet et ta motivation comptent.",
      "Une fois admis en 1re année, tu poursuis en 2e année dans la même mention quand tu valides ton année.",
      "Si tu as ta licence et que tu attends encore une admission à la fin de la procédure, tu peux saisir le recteur : en 2026, dès le 20 juillet.",
    ],
    apres: ["Master", "École sur titre", "Premier emploi avec la licence"],
    astuce:
      "En 2026, 270 400 candidats ont déposé près de 3 millions de candidatures, 11 en moyenne : vise large, avec des masters de niveaux de sélection différents.",
    sources: [
      "https://www.enseignementsup-recherche.gouv.fr/fr/mon-master-2026-bilan-de-la-phase-de-candidature-101166",
      "https://www.enseignementsup-recherche.gouv.fr/fr/mon-master-la-phase-principale-d-admission-debute-mercredi-3-juin-103007",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-05/nf-sies-2026-10-40383.pdf",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2025-12/nf-sies-2025-32-38737.pdf",
      "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/conseils-et-strategies-d-etudes/reussir-en-master/franchir-la-selection-a-l-entree-en-m1",
    ],
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
