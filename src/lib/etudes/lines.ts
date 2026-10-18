/**
 * Les huit lignes du plan : chacune est une grande famille de parcours.
 * L'ordre du tableau est l'ordre des colonnes sur le plan, de gauche à droite.
 */

export type LineId = "defense" | "sante" | "sciences" | "commerce" | "scpo" | "lettres" | "monde" | "arts";

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
    id: "defense",
    num: 6,
    name: "Défense et officiers",
    short: "Défense",
    pitch: "Commander, servir le pays, partir en mission : la voie des écoles d'officiers.",
    direction: "officier de l'armée de Terre, de la Marine ou de l'Air et de l'Espace",
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
    id: "sciences",
    num: 1,
    name: "Sciences et ingénieur",
    short: "Sciences",
    pitch: "Résoudre, inventer, construire : prépas scientifiques et grandes écoles d'ingénieurs.",
    direction: "ingénieur, chercheur, fondateur d'entreprise technologique",
  },
  {
    id: "commerce",
    num: 2,
    name: "Commerce et management",
    short: "Commerce",
    pitch: "Diriger, entreprendre, financer : prépa économique et grandes écoles de commerce.",
    direction: "dirigeant, financier, consultant, entrepreneur",
  },
  {
    id: "scpo",
    num: 3,
    name: "Sciences Po, droit et État",
    short: "Sciences Po",
    pitch: "Défendre, juger, gouverner : Sciences Po, facultés de droit, grands concours de l'État.",
    direction: "haut fonctionnaire, diplomate, magistrat, avocat",
  },
  {
    id: "lettres",
    num: 5,
    name: "Lettres et patrimoine",
    short: "Lettres",
    pitch: "Lire, écrire, transmettre : khâgne, École normale supérieure, École des chartes.",
    direction: "professeur, chercheur, conservateur, journaliste, éditeur",
  },
  {
    id: "monde",
    num: 8,
    name: "International",
    short: "Monde",
    pitch: "Étudier en anglais ou en allemand dans les meilleures universités d'Europe et du monde.",
    direction: "carrière internationale, recherche, organisations internationales",
  },
  {
    id: "arts",
    num: 7,
    name: "Musique et arts",
    short: "Arts",
    pitch: "Chanter, jouer, composer, bâtir : conservatoires supérieurs, architecture, beaux-arts.",
    direction: "musicien, chef de chœur, compositeur, architecte, professeur",
  },
];

export const lineById = Object.fromEntries(lines.map((l) => [l.id, l])) as Record<LineId, Line>;

/** Ordre de lecture des lignes (par numéro), pour les légendes et filtres. */
export const linesByNum = [...lines].sort((a, b) => a.num - b.num);
