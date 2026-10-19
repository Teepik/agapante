/**
 * L'annuaire des lycées : pensionnats catholiques de l'Ouest, grands lycées de Paris et de
 * Versailles, lycées de la Défense. Chiffres vérifiés en octobre 2026, avec leur année.
 */
import { etTypo } from "./typo";

export type LyceeStatut = "public" | "prive-contrat" | "hors-contrat" | "defense";
export type LyceeZone = "ouest" | "paris" | "idf" | "autre";

export type Lycee = {
  id: string;
  name: string;
  short?: string;
  ville: string;
  departement: string;
  region: string;
  zone: LyceeZone;
  lat: number;
  lon: number;
  statut: LyceeStatut;
  confession?: string;
  tutelle?: string;
  mixite?: string;
  internat?: { existe: boolean; pour?: string; des?: string; note?: string };
  effectif?: string;
  resultats?: { session: number; reussite?: number; mentions?: number; tb?: number; va?: number; source?: string };
  options?: string[];
  musique?: string;
  prepas?: string[];
  frais?: string;
  admission?: string;
  points?: string;
  url?: string;
  sources?: string[];
};

export const statutLabel: Record<LyceeStatut, string> = {
  public: "Public",
  "prive-contrat": "Privé sous contrat",
  "hors-contrat": "Privé hors contrat",
  defense: "Lycée de la Défense",
};

export const zoneLabel: Record<LyceeZone, string> = {
  ouest: "Ouest",
  paris: "Paris",
  idf: "Île-de-France",
  autre: "Ailleurs",
};

export const lycees: Lycee[] = etTypo([
  {
    id: "prytanee",
    name: "Prytanée national militaire",
    short: "Prytanée",
    ville: "La Flèche",
    departement: "72 Sarthe",
    region: "Pays de la Loire",
    zone: "ouest",
    lat: 47.6997,
    lon: -0.0758,
    statut: "defense",
    mixite: "mixte",
    internat: { existe: true, pour: "garçons et filles", des: "2nde", note: "Internat pour tous les élèves." },
    prepas: ["MPSI", "PCSI", "MP*", "MP", "PC", "PSI", "ECG", "Lettres"],
    frais: "Environ 2 600 € par an de pension et de trousseau (2024-2025), avec des remises selon les revenus.",
    admission:
      "Dossier en janvier-février de la 3e, jugé sur les notes de français, maths et anglais. Priorité aux enfants de militaires, y compris de réservistes opérationnels comptant dix ans de réserve.",
    points: "Lycée et prépas d'excellence du ministère des Armées, dans un internat fondé au XVIIe siècle.",
    url: "https://www.prytanee.terre.defense.gouv.fr",
  },
  {
    id: "marceau",
    name: "Lycée Marceau",
    short: "Marceau",
    ville: "Chartres",
    departement: "28 Eure-et-Loir",
    region: "Centre-Val de Loire",
    zone: "ouest",
    lat: 48.4436,
    lon: 1.4932,
    statut: "public",
    mixite: "mixte",
    internat: { existe: true },
    options: ["latin", "grec", "section européenne anglais ou allemand"],
    prepas: ["MPSI", "PCSI", "MP", "PC"],
    frais: "Gratuit ; l'internat est payant.",
    points: "Un grand lycée public avec des prépas scientifiques dans les murs.",
    url: "https://www.onisep.fr/ressources/structures-enseignement/centre-val-de-loire/eure-et-loir/lycee-marceau",
  },
  {
    id: "notre-dame-chartres",
    name: "Lycée privé Notre-Dame",
    short: "Notre-Dame de Chartres",
    ville: "Chartres",
    departement: "28 Eure-et-Loir",
    region: "Centre-Val de Loire",
    zone: "ouest",
    lat: 48.4502,
    lon: 1.4797,
    statut: "prive-contrat",
    confession: "catholique",
    mixite: "mixte",
    internat: { existe: true, pour: "filles", note: "L'hébergement organisé par l'établissement accueille des filles." },
    options: ["latin", "grec", "section européenne anglais"],
    points: "Lycée catholique général et technologique au cœur de Chartres.",
    url: "https://www.onisep.fr/ressources/structures-enseignement/centre-val-de-loire/eure-et-loir/lycee-prive-notre-dame",
  },
]);

export const lyceeById = Object.fromEntries(lycees.map((l) => [l.id, l])) as Record<string, Lycee>;
