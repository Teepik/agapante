/**
 * Les guides pas à pas (le bac, Parcoursup) : des sections faites de blocs simples, que la page met en forme.
 * Les textes datés s'écrivent avec les repères de cohorte ({B} pour juin du bac, {B-1} l'année d'avant) :
 * chaque élève lit ses propres années.
 */
import type { Classe } from "./cohorte";
import type { LaneId } from "./lines";

/** Une étape sur le rail du guide : un moment de l'année, ce qui s'y passe. */
export type Etape = {
  id: string;
  /** Le moment, avec les repères de cohorte : « Janvier {B} », « Fin de 1re ». */
  quand: string;
  titre: string;
  texte: string;
  /** Une étape décisive : elle s'affiche en correspondance, comme une capsule du tronc commun. */
  cle?: boolean;
  /** La section du guide qui la détaille. */
  section?: string;
};

export type Carte = {
  titre: string;
  sous?: string;
  texte: string;
  /** Des lignes étiquetées : « En 1re », « En Terminale », « Ensuite ». */
  lignes?: { label: string; texte: string }[];
  points?: string[];
  /** La couleur d'une voie de la carte, pour relier le guide au plan. */
  ton?: LaneId;
};

export type Question = { q: string; r: string };

/** Une date officielle d'un calendrier : un jour, ou une période (fin incluse). */
export type Jalon = {
  /** Premier jour, au format AAAA-MM-JJ. */
  du: string;
  /** Dernier jour inclus, au format AAAA-MM-JJ. */
  au?: string;
  /** La date telle qu'on la lit : « Jeudi 11 mars 2027 ». */
  quand: string;
  titre: string;
  texte?: string;
  cle?: boolean;
};

/** « Que faire si… » : ce que voit l'élève, et la marche à suivre. */
export type Situation = {
  id: string;
  /** Ce que voit l'élève, en quelques mots. */
  label: string;
  /** Ce qu'il fait, dans l'ordre. */
  etapes: string[];
  /** Ce qui rassure, ou ce qu'il faut savoir en plus. */
  note?: string;
};

/** Une source, nommée comme on la cite : l'éditeur, le titre de la page, sa date. */
export type Source = { label: string; url: string };

export type Bloc =
  | { type: "texte"; texte: string }
  | { type: "etapes"; etapes: Etape[] }
  | { type: "cartes"; cartes: Carte[]; colonnes?: 2 | 3 | 4 }
  | { type: "faits"; faits: { label: string; valeur: string }[] }
  | { type: "liste"; titre?: string; items: string[]; numerotee?: boolean }
  | {
      type: "note";
      titre: string;
      texte: string;
      ton?: "conseil" | "alt" | "repere";
      /** Un lien vers un outil du site : le simulateur de spécialités, les formations près de chez soi. */
      lien?: { href: string; label: string };
    }
  | { type: "faq"; questions: Question[] }
  | { type: "tableau"; legende: string; colonnes: string[]; lignes: string[][] }
  /** Des paliers qui montent, du plus bas au plus haut : les mentions du bac. */
  | { type: "paliers"; titre: string; paliers: { seuil: string; label: string; detail?: string }[] }
  | { type: "outil"; outil: string };

export type Section = {
  id: string;
  titre: string;
  /** Le nom court, dans le sommaire. */
  court: string;
  intro?: string;
  blocs: Bloc[];
  sources?: Source[];
};

export type Guide = {
  titre: string;
  lede: string;
  /** Une phrase personnelle sous le titre, selon la classe de l'élève, avec ses années. */
  pourToi: Record<Classe, string>;
  /** Le rail d'ouverture : les grandes étapes, dans l'ordre. */
  rail: Etape[];
  sections: Section[];
  /** La date de vérification des informations, affichée en bas de page. */
  verifie: string;
};
