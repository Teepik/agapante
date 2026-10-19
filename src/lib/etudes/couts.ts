/**
 * Ce que coûtent les études et ce que les aides couvrent, pour l'année universitaire 2026-2027.
 *
 * Chaque montant vient d'un texte officiel, d'une école ou d'une enquête publiée, cité dans SRC avec sa
 * date. Les montants se révisent chaque année : la page dit toujours de quelle année ils datent, et le
 * calcul reste un ordre de grandeur, à confirmer avec les simulateurs officiels.
 */
import type { LaneId } from "./lines";
import { cle } from "./communes";
import { etTypo } from "./typo";

export const ANNEE = "2026-2027";

export type Source = { label: string; url: string };

export const SRC = {
  frais: {
    label: "Service-public.gouv.fr, coût d'une inscription dans le supérieur (vérifié le 20 août 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
  },
  cvec: {
    label: "etudiant.gouv.fr, la CVEC en questions",
    url: "https://www.etudiant.gouv.fr/fr/faq-cvec-2402",
  },
  prepa: {
    label: "Université de Strasbourg, inscription des élèves de prépa (juin 2026)",
    url: "https://lycee-kleber.com.fr/wp-content/uploads/2026/07/CPGE-2026-Procedure-inscription-Universite-de-Strasbourg.pdf",
  },
  cefdg: {
    label: "L'Etudiant, les frais des écoles de commerce (9 avril 2026, chiffres de la CEFDG)",
    url: "https://www.letudiant.fr/etudes/ecole-de-commerce/ecoles-de-commerce-les-frais-de-scolarite-ne-cessent-d-augmenter.html",
  },
  hec: {
    label: "HEC Paris, frais et financement du programme Grande École",
    url: "https://www.hec.edu/fr/grande-ecole-master-management/frais-et-financement",
  },
  essec: {
    label: "ESSEC, exonération des boursiers (10 octobre 2025)",
    url: "https://www.essec.edu/fr/actualites/essec-exoneration-frais-scolarite-programme-grande-ecole-boursiers-echelons/",
  },
  efrei: {
    label: "Onisep, diplôme d'ingénieur d'Efrei Paris (2026)",
    url: "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/efrei-paris-campus-de-villejuif-universite-paris-pantheon-assas/diplome-d-ingenieur-d-efrei-paris",
  },
  epita: {
    label: "EPITA, brochure de la formation d'ingénieurs",
    url: "https://www.epita.fr/wp-content/uploads/EPITA-Brochure-Formation-Ingenieurs-2025-2026.pdf",
  },
  bourse: {
    label: "Service-public.gouv.fr, bourse sur critères sociaux (vérifié le 10 avril 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F12214",
  },
  points: {
    label: "Circulaire du 13 février 2026, Bulletin officiel n° 9",
    url: "https://www.enseignementsup-recherche.gouv.fr/fr/bo/2026/Hebdo9/ESRS2604201C",
  },
  plafonds: {
    label: "Arrêté du 26 mars 2026 sur les plafonds de ressources",
    url: "https://www.legifrance.gouv.fr/jorf/id/JORFTEXT000053788150",
  },
  simulateur: {
    label: "Le simulateur officiel de la bourse",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R18296",
  },
  merite: {
    label: "Service-public.gouv.fr, aide au mérite (vérifié le 3 septembre 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1010",
  },
  mobilitePsup: {
    label: "Parcoursup, l'aide à la mobilité (6 juillet 2026)",
    url: "https://parcoursup.gouv.fr/preparer-sa-vie-etudiante/l-aide-la-mobilite-parcoursup-1667",
  },
  mobiliteInter: {
    label: "Service-public.gouv.fr, aide à la mobilité internationale (vérifié le 5 juin 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F380",
  },
  erasmus: {
    label: "Service-public.gouv.fr, Erasmus+",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F378",
  },
  crous: {
    label: "Service-public.gouv.fr, logement Crous (vérifié le 3 mars 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F31912",
  },
  apl: {
    label: "Service-public.gouv.fr, l'aide au logement des étudiants (vérifié le 1er juillet 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F1563",
  },
  aplSimulateur: {
    label: "Le simulateur officiel de l'aide au logement",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/R2972",
  },
  visale: {
    label: "Service-public.gouv.fr, garantie Visale (vérifié le 23 janvier 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33453",
  },
  mobiliJeune: {
    label: "Service-public.gouv.fr, aide Mobili-Jeune (vérifié le 1er juin 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33173",
  },
  repas: {
    label: "Gouvernement, le repas à 1 € pour tous les étudiants (13 août 2026)",
    url: "https://www.info.gouv.fr/actualite/repas-a-1-euro-une-mesure-etendue-a-tous-les-etudiants",
  },
  unefVilles: {
    label: "UNEF, classement des villes universitaires 2026 (loyers LocService)",
    url: "https://unef.fr/wp-content/uploads/2026/08/UNEF-Classement-des-villes-universitaires-2026.pdf",
  },
  unefEnquete: {
    label: "UNEF, enquête sur le coût de la vie étudiante 2026",
    url: "https://unef.fr/wp-content/uploads/2026/08/Enquete-UNEF-2026-VF.pdf",
  },
  apprenti: {
    label: "Service-public.gouv.fr, contrat d'apprentissage (vérifié le 8 septembre 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2918",
  },
  smic: {
    label: "Service-public.gouv.fr, le SMIC (vérifié le 1er juin 2026)",
    url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2300",
  },
} satisfies Record<string, Source>;

/* ---------- Frais d'inscription ---------- */

/** Droits d'inscription dans le public, 2026-2027 : licence, master, ingénieur. */
export const DROITS = { licence: 178, master: 255, ingenieur: 630, centrales: 2620 };
/** Contribution de vie étudiante et de campus, payée chaque année par les étudiants du supérieur. */
export const CVEC = 105;

export type FormationCout = {
  id: string;
  name: string;
  lane: LaneId;
  /** Durée habituelle jusqu'au diplôme, en années (modifiable dans le calcul). */
  annees: number;
  /** Frais par an : un montant, ou une fourchette [bas, haut] tirée d'exemples d'écoles. */
  frais: number | [number, number];
  /** Frais par an pour un boursier sur critères sociaux. */
  boursier: number | [number, number];
  /** Ce que couvrent ces frais, en une phrase. */
  detail: string;
  /** Une école privée : les frais varient d'une école à l'autre, et se saisissent. */
  prive?: boolean;
  /** L'apprentissage : formation payée, salaire, bourse suspendue. */
  alternance?: boolean;
  sources: Source[];
};

export const FORMATIONS: FormationCout[] = etTypo([
  {
    id: "bts",
    name: "BTS en lycée public",
    lane: "courtes",
    annees: 2,
    frais: 0,
    boursier: 0,
    detail: "Au lycée public, le BTS est gratuit, droits d'inscription et CVEC compris.",
    sources: [SRC.frais, SRC.cvec],
  },
  {
    id: "but",
    name: "BUT en IUT",
    lane: "courtes",
    annees: 3,
    frais: DROITS.licence + CVEC,
    boursier: 0,
    detail: `${DROITS.licence} € de droits d'inscription, comme en licence, et ${CVEC} € de CVEC ; les boursiers en sont dispensés.`,
    sources: [SRC.frais],
  },
  {
    id: "licence",
    name: "Licence à l'université",
    lane: "u",
    annees: 3,
    frais: DROITS.licence + CVEC,
    boursier: 0,
    detail: `${DROITS.licence} € de droits d'inscription et ${CVEC} € de CVEC ; les boursiers en sont dispensés.`,
    sources: [SRC.frais],
  },
  {
    id: "prepa",
    name: "Prépa en lycée public",
    lane: "sciences",
    annees: 2,
    frais: DROITS.licence + CVEC,
    boursier: 0,
    detail: `La scolarité est gratuite ; chaque élève s'inscrit aussi à une université partenaire : ${DROITS.licence} €, plus ${CVEC} € de CVEC. L'internat, quand il y en a un, se paie à part.`,
    sources: [SRC.prepa, SRC.frais],
  },
  {
    id: "sante",
    name: "Études de santé",
    lane: "sante",
    annees: 6,
    frais: DROITS.licence + CVEC,
    boursier: 0,
    detail: `Le tarif de la licence les premières années (${DROITS.licence} € et ${CVEC} € de CVEC), puis celui du master, ${DROITS.master} €.`,
    sources: [SRC.frais],
  },
  {
    id: "parasocial",
    name: "Institut de soins ou du social",
    lane: "parasocial",
    annees: 3,
    frais: DROITS.licence + CVEC,
    boursier: 0,
    detail: `En institut de soins infirmiers, la région paie la formation ; l'étudiant règle ${DROITS.licence} € de droits et ${CVEC} € de CVEC. La bourse se demande à la région.`,
    sources: [SRC.frais, SRC.cvec],
  },
  {
    id: "ingenieur",
    name: "École d'ingénieurs publique",
    lane: "postbac",
    annees: 5,
    frais: DROITS.ingenieur + CVEC,
    boursier: 0,
    detail: `${DROITS.ingenieur} € de droits et ${CVEC} € de CVEC par an ; les écoles centrales demandent 2 620 €. Les boursiers en sont dispensés.`,
    sources: [SRC.frais],
  },
  {
    id: "ingenieur-prive",
    name: "École d'ingénieurs privée",
    lane: "postbac",
    annees: 5,
    frais: [9250 + CVEC, 12790 + CVEC],
    boursier: [9250, 12790],
    detail:
      "Par exemple 9 250 € par an à l'Efrei, de 10 190 € à 12 790 € à l'EPITA, plus 105 € de CVEC. Le cycle ingénieur peut se faire en alternance, frais payés par l'entreprise et l'État.",
    prive: true,
    sources: [SRC.efrei, SRC.epita],
  },
  {
    id: "commerce",
    name: "École de commerce",
    lane: "commerce",
    annees: 3,
    frais: 13400 + CVEC,
    boursier: 13400,
    detail:
      "13 400 € par an en moyenne dans 23 écoles en 2024-2025, plus de 20 000 € dans les plus demandées. Beaucoup réduisent leurs frais pour les boursiers : HEC selon l'échelon, l'ESSEC supprime ses frais de scolarité dès l'échelon 4.",
    prive: true,
    sources: [SRC.cefdg, SRC.hec, SRC.essec],
  },
  {
    id: "master",
    name: "Master à l'université",
    lane: "u",
    annees: 2,
    frais: DROITS.master + CVEC,
    boursier: 0,
    detail: `${DROITS.master} € de droits d'inscription et ${CVEC} € de CVEC, après la licence ; les boursiers en sont dispensés.`,
    sources: [SRC.frais],
  },
  {
    id: "alternance",
    name: "En alternance",
    lane: "courtes",
    annees: 2,
    frais: CVEC,
    boursier: CVEC,
    detail: `L'entreprise et son opérateur de compétences paient la formation ; il te reste la CVEC, ${CVEC} € dans le supérieur, et tu touches un salaire chaque mois.`,
    alternance: true,
    sources: [SRC.apprenti, SRC.frais],
  },
]);

export const formationCoutById = Object.fromEntries(FORMATIONS.map((f) => [f.id, f])) as Record<string, FormationCout>;

/* ---------- La bourse sur critères sociaux ---------- */

/** Montants annuels 2026-2027, versés en dix mensualités. */
export const ECHELONS: { id: string; annuel: number }[] = [
  { id: "0 bis", annuel: 1454 },
  { id: "1", annuel: 2163 },
  { id: "2", annuel: 3071 },
  { id: "3", annuel: 3828 },
  { id: "4", annuel: 4587 },
  { id: "5", annuel: 5212 },
  { id: "6", annuel: 5506 },
  { id: "7", annuel: 6335 },
];

/**
 * Plafonds de revenu brut global (avis d'imposition 2025, revenus 2024) pour 2026-2027 : une ligne par
 * nombre de points de charge, de 0 à 17, puis une colonne par échelon, de 0 bis à 7. Un revenu inférieur
 * ou égal au plafond d'une colonne ouvre droit à cet échelon. Arrêté du 26 mars 2026, tableau recoupé
 * dans deux publications (Mes-Allocs, L'Etudiant).
 */
const PLAFONDS: number[][] = [
  [35086, 23850, 19281, 17034, 14829, 12667, 7992, 265],
  [38966, 26500, 21423, 18921, 16472, 14077, 8872, 530],
  [42877, 29150, 23564, 20818, 18126, 15476, 9773, 795],
  [46767, 31800, 25705, 22716, 19758, 16875, 10653, 1060],
  [50668, 34450, 27846, 24603, 21412, 18285, 11533, 1325],
  [54569, 37111, 29998, 26500, 23066, 19695, 12434, 1590],
  [58459, 39761, 32139, 28376, 24709, 21105, 13324, 1855],
  [62360, 42411, 34280, 30274, 26352, 22514, 14215, 2120],
  [66261, 45061, 36422, 32171, 28005, 23914, 15094, 2385],
  [70151, 47700, 38563, 34058, 29648, 25323, 15985, 2650],
  [74052, 50361, 40704, 35955, 31291, 26733, 16865, 2915],
  [77952, 53011, 42835, 37853, 32955, 28132, 17755, 3180],
  [81843, 55650, 44976, 39739, 34588, 29542, 18645, 3445],
  [85743, 58300, 47117, 41637, 36231, 30952, 19525, 3710],
  [89634, 60971, 49269, 43513, 37895, 32362, 20426, 3975],
  [93545, 63611, 51410, 45410, 39538, 33772, 21317, 4240],
  [97435, 66261, 53551, 47308, 41170, 35181, 22196, 4505],
  [101347, 68911, 55692, 49195, 42824, 36581, 23087, 4770],
];
export const POINTS_MAX = PLAFONDS.length - 1;

/** Les distances de la circulaire : 1 point de 30 à 249 km, 2 points de 250 à 3 499 km, etc. */
export const DISTANCES: { label: string; points: number }[] = [
  { label: "Moins de 30 km", points: 0 },
  { label: "30 à 249 km", points: 1 },
  { label: "250 km et plus", points: 2 },
  { label: "Outre-mer, 3 500 km et plus", points: 3 },
];

export type Famille = {
  /** Points de distance entre le domicile familial et le lieu d'études. */
  distance: number;
  /** Autres enfants à charge de la famille, hors toi. */
  autres: number;
  /** Parmi eux, ceux qui font des études supérieures. */
  etudiants: number;
  handicap: boolean;
  aidant: boolean;
};

/** Deux points par autre enfant à charge, quatre s'il étudie dans le supérieur ; quatre pour un handicap ou un aidant. */
export function pointsDeCharge(f: Famille): number {
  const etu = Math.min(f.etudiants, f.autres);
  const p = f.distance + 2 * (f.autres - etu) + 4 * etu + (f.handicap ? 4 : 0) + (f.aidant ? 4 : 0);
  return Math.min(p, POINTS_MAX);
}

/** Le rang de l'échelon (0 pour « 0 bis », 7 pour l'échelon 7), ou null au-dessus des plafonds. */
export function echelon(revenu: number, points: number): number | null {
  const row = PLAFONDS[Math.min(Math.max(points, 0), POINTS_MAX)];
  let best: number | null = null;
  row.forEach((max, i) => {
    if (revenu <= max) best = i;
  });
  return best;
}

/** Le plafond de l'échelon 0 bis, pour dire jusqu'où va la bourse. */
export function plafondBourse(points: number): number {
  return PLAFONDS[Math.min(Math.max(points, 0), POINTS_MAX)][0];
}

/** Aide au mérite : 900 € par an, pour un boursier reçu au bac avec la mention très bien. */
export const MERITE = 900;

/* ---------- Se loger et vivre ---------- */

/**
 * Loyer moyen d'un logement étudiant du parc privé, charges comprises (UNEF 2026, données LocService),
 * et coût de la vie courante hors loyer, tiré du même classement : coût de la vie de la ville moins son
 * loyer moyen, moins la part des droits d'inscription que l'UNEF y inclut (283 € par an), comptés à part ici.
 */
export type Ville = { name: string; loyer: number; vie: number; key: string; lat: number };

const VIE_IDF = 670;
const VIE_PROVINCE = 660;

/** Nom, loyer moyen, latitude (pour distinguer les homonymes), vie courante quand le classement la donne. */
const LOYERS: [string, number, number, number?][] = [
  ["Paris", 923, 48.86, VIE_IDF],
  ["Créteil", 794, 48.79, VIE_IDF],
  ["Saint-Denis", 781, 48.94, VIE_IDF],
  ["Nice", 736, 43.7, 650],
  ["Lyon", 647, 45.76, 660],
  ["Bordeaux", 636, 44.84],
  ["Aix-en-Provence", 620, 43.53],
  ["Marseille", 598, 43.3],
  ["Strasbourg", 580, 48.58],
  ["La Rochelle", 569, 46.16],
  ["Toulouse", 558, 43.6],
  ["Montpellier", 555, 43.61],
  ["Lille", 548, 50.63],
  ["Nantes", 531, 47.22],
  ["Grenoble", 502, 45.19],
  ["Rennes", 499, 48.11],
  ["Rouen", 487, 49.44],
  ["Angers", 483, 47.47, 660],
  ["Orléans", 476, 47.9, 660],
  ["Dijon", 475, 47.32, 660],
  ["Tours", 469, 47.39],
  ["Clermont-Ferrand", 455, 45.78],
  ["Caen", 438, 49.18, 660],
  ["Le Mans", 428, 48.0, 660],
  ["Poitiers", 413, 46.58, 660],
  ["Limoges", 409, 45.83, 650],
];

export const VILLES: Ville[] = LOYERS.map(([name, loyer, lat, vie]) => ({
  name,
  loyer,
  lat,
  vie: vie ?? VIE_PROVINCE,
  key: cle(name),
})).sort((a, b) => a.name.localeCompare(b.name, "fr"));

/** Une autre ville : la moyenne nationale du parc privé. */
export const AILLEURS: Ville = { name: "Une autre ville", loyer: 627, vie: VIE_PROVINCE, key: "", lat: 0 };

/** La ville du classement qui porte ce nom (« Paris 15e » compris), au bon endroit, si elle y figure. */
export function villeDe(name: string | undefined | null, lat?: number): Ville | null {
  if (!name) return null;
  const k = cle(name.replace(/\s+\d+e(r)?$/i, ""));
  const v = VILLES.find((x) => x.key === k);
  if (!v) return null;
  return typeof lat === "number" && Math.abs(lat - v.lat) > 0.5 ? null : v;
}

/** Résidence du Crous : de 200 à 500 € selon la chambre ou le studio ; environ 426 € en moyenne (UNEF). */
export const CROUS = { moyen: 426, min: 200, max: 500 };

/* ---------- L'apprentissage ---------- */

/** SMIC brut mensuel pour 35 heures par semaine (arrêté du 22 mai 2026). */
export const SMIC_BRUT = 1867.02;

/** Salaire minimum de l'apprenti, en pourcentage du SMIC, selon l'âge et l'année du contrat. */
export const APPRENTI: { label: string; pct: [number, number, number] }[] = [
  { label: "Moins de 18 ans", pct: [27, 39, 55] },
  { label: "18 à 20 ans", pct: [43, 51, 67] },
  { label: "21 à 25 ans", pct: [53, 61, 78] },
  { label: "26 ans et plus", pct: [100, 100, 100] },
];

/** Le salaire brut minimum d'un apprenti, par mois. */
export function salaireApprenti(age: number, annee: number): number {
  const row = APPRENTI[Math.min(Math.max(age, 0), APPRENTI.length - 1)];
  return (SMIC_BRUT * row.pct[Math.min(Math.max(annee, 0), 2)]) / 100;
}

/** Jusqu'à la moitié du SMIC, le salaire d'un apprenti est exonéré de cotisations : le net égale le brut. */
export const APPRENTI_SANS_COTISATIONS = SMIC_BRUT / 2;

/* ---------- Étudier à l'étranger ---------- */

export type Etranger = { pays: string; ecole: string; frais: string; texte: string; source: Source };

/** Des frais d'inscription réels pour un bachelier français, convertis au taux de la BCE du 16 octobre 2026. */
export const ETRANGER: Etranger[] = etTypo([
  {
    pays: "Belgique",
    ecole: "Université libre de Bruxelles",
    frais: "1 194 € par an",
    texte: "Le plein tarif, qui s'applique à un étudiant venu de France.",
    source: {
      label: "ULB, droits d'inscription 2026-2027",
      url: "https://www.ulb.be/fr/inscriptions/droits-d-inscription",
    },
  },
  {
    pays: "Pays-Bas",
    ecole: "Université d'Amsterdam",
    frais: "2 694 € par an",
    texte: "Le tarif légal pour un étudiant de l'Union européenne.",
    source: {
      label: "Universiteit van Amsterdam, tuition fees 2026-2027",
      url: "https://www.uva.nl/en/education/fees-and-funding/tuition-fees/tuition-fees.html",
    },
  },
  {
    pays: "Suisse",
    ecole: "ETH Zurich",
    frais: "4 380 CHF par an, environ 4 720 €",
    texte: "Le tarif des étudiants qui ont passé leur bac hors de Suisse.",
    source: {
      label: "ETH Zurich, tuition fees",
      url: "https://ethz.ch/students/en/studies/financial/tuition-fees.html",
    },
  },
  {
    pays: "Québec",
    ecole: "Université de Montréal",
    frais: "9 730 $ CA par an en licence, environ 6 100 €",
    texte: "En maîtrise, l'entente France-Québec donne le tarif québécois : environ 1 960 € par an.",
    source: {
      label: "Université de Montréal, coûts des études",
      url: "https://registraire.umontreal.ca/droits-de-scolarite/couts/",
    },
  },
  {
    pays: "Royaume-Uni",
    ecole: "London School of Economics",
    frais: "28 900 à 39 900 £ par an, 34 000 à 47 000 €",
    texte: "Depuis 2021, un étudiant français paie le tarif international.",
    source: {
      label: "LSE, table of fees 2026-2027",
      url: "https://info.lse.ac.uk/staff/divisions/Planning-Division/Assets/Documents/Table-of-Fees-2026-27-and-PGR-structure-combined-29July26.pdf",
    },
  },
]);

/* ---------- Formatage ---------- */

const NBSP = " ";

/** 1234.5 → « 1 235 € » */
export function euros(n: number): string {
  return `${Math.round(n).toLocaleString("fr-FR")}${NBSP}€`;
}

/** Arrondi d'une estimation : à la dizaine sous 1 000 €, à la centaine au-delà. */
export function environ(n: number): number {
  const a = Math.abs(n);
  const step = a < 1000 ? 10 : 100;
  return Math.round(n / step) * step;
}
