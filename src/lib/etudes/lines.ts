/**
 * Les douze voies thématiques de la carte : chacune est une grande famille de parcours.
 * L'université, treizième voie, est définie plus bas ; l'ordre des colonnes est celui de LANES (plan.ts),
 * et le numéro de chaque voie suit cet ordre, de gauche à droite.
 */

export type LineId =
  | "pro"
  | "courtes"
  | "parasocial"
  | "sante"
  | "defense"
  | "sciences"
  | "postbac"
  | "commerce"
  | "scpo"
  | "lettres"
  | "monde"
  | "arts";

export type Line = {
  id: LineId;
  num: number;
  name: string;
  short: string;
  /** Une phrase : ce que l'on vient chercher sur cette ligne. */
  pitch: string;
  /** Les métiers vers lesquels roule la ligne. */
  direction: string;
};

export const lines: Line[] = [
  {
    id: "pro",
    num: 1,
    name: "Voie professionnelle",
    short: "Pro",
    pitch: "Apprendre un métier dès 15 ans : CAP ou bac pro, au lycée professionnel ou en apprentissage.",
    direction: "électricien, cuisinier, mécanicien, accompagnant éducatif, technicien de maintenance",
  },
  {
    id: "courtes",
    num: 2,
    name: "BTS, BUT et alternance",
    short: "BTS, BUT",
    pitch:
      "Deux ou trois ans pour un métier qualifié, souvent en alternance, avec la possibilité de continuer ensuite.",
    direction: "technicien supérieur, assistant ingénieur, chargé de clientèle, développeur",
  },
  {
    id: "parasocial",
    num: 3,
    name: "Soin et social",
    short: "Soin, social",
    pitch: "Soigner, rééduquer, accompagner : instituts paramédicaux et écoles du travail social.",
    direction: "infirmier, kinésithérapeute, orthophoniste, ergothérapeute, éducateur spécialisé",
  },
  {
    id: "sante",
    num: 4,
    name: "Santé et vivant",
    short: "Santé",
    pitch: "Soigner, comprendre le corps et le vivant : médecine, pharmacie, vétérinaire.",
    direction: "médecin, pharmacien, chirurgien-dentiste, sage-femme, vétérinaire",
  },
  {
    id: "defense",
    num: 5,
    name: "Défense et officiers",
    short: "Défense",
    pitch: "Commander, servir le pays, partir en mission : la voie des écoles d'officiers.",
    direction: "officier de l'armée de Terre, de la Marine ou de l'Air et de l'Espace",
  },
  {
    id: "sciences",
    num: 6,
    name: "Sciences et ingénieur",
    short: "Sciences",
    pitch: "Résoudre, inventer, construire : prépas scientifiques et grandes écoles d'ingénieurs.",
    direction: "ingénieur, chercheur, fondateur d'entreprise technologique",
  },
  {
    id: "postbac",
    num: 7,
    name: "Écoles en cinq ans",
    short: "Écoles post-bac",
    pitch: "Entrer dès le bac dans une école d'ingénieurs ou de commerce, pour cinq ans, prépa comprise.",
    direction: "ingénieur, manager, chef de projet",
  },
  {
    id: "commerce",
    num: 8,
    name: "Commerce et management",
    short: "Commerce",
    pitch: "Diriger, entreprendre, financer : prépa économique et grandes écoles de commerce.",
    direction: "dirigeant, financier, consultant, entrepreneur",
  },
  {
    id: "scpo",
    num: 9,
    name: "Sciences Po, droit et État",
    short: "Sciences Po",
    pitch: "Défendre, juger, gouverner : Sciences Po, facultés de droit, grands concours de l'État.",
    direction: "haut fonctionnaire, diplomate, magistrat, avocat",
  },
  {
    id: "lettres",
    num: 10,
    name: "Lettres et patrimoine",
    short: "Lettres",
    pitch: "Lire, écrire, transmettre : khâgne, École normale supérieure, École des chartes.",
    direction: "professeur, chercheur, conservateur, journaliste, éditeur",
  },
  {
    id: "monde",
    num: 11,
    name: "International",
    short: "Monde",
    pitch: "Étudier en anglais ou en allemand dans les meilleures universités d'Europe et du monde.",
    direction: "carrière internationale, recherche, organisations internationales",
  },
  {
    id: "arts",
    num: 12,
    name: "Musique et arts",
    short: "Arts",
    pitch: "Chanter, jouer, composer, bâtir : conservatoires supérieurs, architecture, beaux-arts.",
    direction: "musicien, chef de chœur, compositeur, architecte, professeur",
  },
];

export const lineById = Object.fromEntries(lines.map((l) => [l.id, l])) as Record<LineId, Line>;

/** Ordre de lecture des lignes (par numéro), pour les légendes et filtres. */
export const linesByNum = [...lines].sort((a, b) => a.num - b.num);

/** L'université : une voie à part entière, au centre de la carte, d'où partent la plupart des passerelles. */
export type LaneId = LineId | "u";

export const uLane = {
  id: "u" as const,
  name: "Université",
  short: "Université",
  pitch: "Licence, master, doctorat : la voie la plus ouverte, d'où partent la plupart des passerelles.",
  direction: "presque tous les métiers, de l'entreprise à la recherche",
};

export function laneName(id: LaneId): string {
  return id === "u" ? uLane.name : lineById[id].name;
}

export function laneShort(id: LaneId): string {
  return id === "u" ? uLane.short : lineById[id].short;
}

export function lanePitch(id: LaneId): string {
  return id === "u" ? uLane.pitch : lineById[id].pitch;
}

export function laneDirection(id: LaneId): string {
  return id === "u" ? uLane.direction : lineById[id].direction;
}

const EN_LETTRES: Record<number, string> = {
  2: "deux",
  3: "trois",
  4: "quatre",
  5: "cinq",
  6: "six",
  7: "sept",
  8: "huit",
  9: "neuf",
  10: "dix",
  11: "onze",
  12: "douze",
  13: "treize",
  14: "quatorze",
  15: "quinze",
};

/** Un petit nombre écrit en lettres, pour les phrases. */
export function enLettres(n: number): string {
  return EN_LETTRES[n] ?? String(n);
}
