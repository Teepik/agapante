/**
 * Ce que la carte interactive ajoute au plan d'origine (plan.ts) : pour les quatre lignes approfondies,
 * les pastilles des fiches courtes (durée, entrée, coût) et l'alternance ; l'alternance des autres voies ;
 * les fiches propres à la carte (Mon Master). Les quatre lignes servent aussi à la comparaison.
 * Les fiches reprennent le contenu vérifié de stations.ts.
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
    pitch: "Licence, master, doctorat : une voie ouverte à tous les bacheliers, jusqu'à bac+8.",
    horizon: "De bac+3 à bac+8",
  },
]);

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
    cout: "630 € par an dans la plupart des écoles publiques",
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
    cout: "178 € par an dans le public, 9 000 à 11 500 € dans le privé",
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
    cout: "630 € par an dans la plupart des écoles publiques",
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
      "Le BTS et le BUT se préparent aussi en alternance : salarié d'une entreprise, tu partages ton temps entre les cours et le travail, tu touches un salaire et tu prépares le même diplôme. Fin 2025, 44 % des étudiants de BTS étaient apprentis ; en BUT, en 2025-2026, 21 % des étudiants de 2e année et 57 % de ceux de 3e année.",
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

/**
 * L'alternance sur les autres voies du plan, d'après les fiches des stations et des écoles :
 * le CAP et le bac pro en CFA, une partie des places du social, les dernières années d'école de commerce.
 */
const ALT_PLAN: Record<string, string> = etTypo({
  "lycee-pro":
    "Le CAP et le bac pro se préparent aussi en apprentissage, dans un centre de formation d'apprentis (CFA) : avec un contrat signé avec un employeur, tu es salarié et payé, cours compris.",
  "institut-parasocial":
    "Dans le social, une partie des places s'ouvre en apprentissage : éducateur spécialisé, assistant de service social, éducateur de jeunes enfants. L'employeur finance la formation et tu touches un salaire.",
  "ecole-commerce":
    "Plusieurs écoles proposent leurs dernières années en apprentissage : l'entreprise paie la scolarité et tu touches un salaire. À l'IÉSEG, par exemple, les 4e et 5e années sont gratuites en apprentissage.",
  "master-droit":
    "Un master peut se préparer en apprentissage : fin 2025, 8 % des étudiants de master étaient apprentis.",
});

/** Ce que permet l'alternance à une étape, sur n'importe quelle voie du plan. */
export function alternanceDe(id: string): string | undefined {
  return stopById[id]?.alternance ?? ALT_PLAN[id];
}

/** Les étapes où l'alternance est possible, et la station qui l'explique. */
export const ALT_IDS: ReadonlySet<string> = new Set([
  "alternance",
  ...STOPS.filter((s) => s.alternance).map((s) => s.id),
  ...Object.keys(ALT_PLAN),
]);

/** Les fiches propres à la carte, pour les étapes qui manquent à stations.ts. */
export const METRO_FICHES: Record<string, StationContent> = etTypo({
  "mon-master": {
    id: "mon-master",
    name: "Mon Master, l'entrée en master",
    label: "Mon Master",
    when: "De février à juillet de ta 3e année de licence",
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
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-05/bilans-acad-miques-mon-master-2025-40254.pdf",
      "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/conseils-et-strategies-d-etudes/reussir-en-master/franchir-la-selection-a-l-entree-en-m1",
    ],
  },
});
