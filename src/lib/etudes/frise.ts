import { etTypo as frTypo } from "./typo";

export type FriseYear = {
  years: string;
  /** Début et fin de la période, en années par rapport au bac (le bac en juin de l'année 0). */
  from: number;
  to: number;
  stage: string;
  age: string;
  items: { when: string; what: string; key?: boolean }[];
};

export const frise: FriseYear[] = frTypo([
  {
    years: "{B-4}-{B-3}",
    from: -4,
    to: -3,
    stage: "3e",
    age: "14 ans",
    items: [
      {
        when: "Janvier-février {B-3}",
        what: "Préinscription dans un lycée de la Défense, si tu y as accès.",
        key: true,
      },
      {
        when: "Février à avril {B-3}",
        what: "Portes ouvertes, dossiers des lycées privés, examen d'entrée pour un lycée public.",
        key: true,
      },
      { when: "Juin {B-3}", what: "Le brevet." },
    ],
  },
  {
    years: "{B-3}-{B-2}",
    from: -3,
    to: -2,
    stage: "2nde",
    age: "15 ans",
    items: [
      { when: "Septembre {B-3}", what: "Tests de positionnement en français et en maths." },
      { when: "Février-mars {B-2}", what: "Choix de tes trois spécialités de 1re.", key: true },
      { when: "Juin {B-2}", what: "Stage d'observation de deux semaines, obligatoire." },
    ],
  },
  {
    years: "{B-2}-{B-1}",
    from: -2,
    to: -1,
    stage: "1re",
    age: "16 ans",
    items: [
      {
        when: "Toute l'année",
        what: "Tes bulletins entrent dans ton dossier Parcoursup : c'est ici qu'il commence.",
        key: true,
      },
      {
        when: "Printemps {B-1}",
        what: "Choix des deux spécialités gardées en Terminale et de l'option de maths.",
        key: true,
      },
      { when: "Juin {B-1}", what: "Épreuves anticipées : français (écrit et oral) et mathématiques." },
    ],
  },
  {
    years: "{B-1}-{B}",
    from: -1,
    to: 0,
    stage: "Terminale",
    age: "17 ans",
    items: [
      {
        when: "15 octobre {B-1}",
        what: "Date limite habituelle pour Oxford, Cambridge et la médecine au Royaume-Uni, si tu vises l'étranger.",
      },
      { when: "Décembre {B-1}", what: "Ouverture de Parcoursup pour découvrir les formations." },
      { when: "Janvier à mars {B}", what: "Inscription et vœux sur Parcoursup, jusqu'à dix vœux.", key: true },
      {
        when: "Mars à mai {B}",
        what: "Dossier social étudiant : ta demande de bourse et de logement au Crous, en même temps que Parcoursup.",
        key: true,
      },
      { when: "Début avril {B}", what: "Dossiers complétés, lettres de motivation, vœux confirmés." },
      {
        when: "Juin {B}",
        what: "Premières réponses de Parcoursup début juin, puis le bac : philosophie, spécialités, grand oral.",
        key: true,
      },
      {
        when: "Juillet {B}",
        what: "Boursier admis hors de ton académie : l'aide à la mobilité Parcoursup, 500 €, se demande dès la mi-juillet.",
      },
    ],
  },
  {
    years: "{B}-{B+2}",
    from: 0,
    to: 2,
    stage: "Bac+1 et bac+2",
    age: "18-19 ans",
    items: [
      { when: "Septembre {B}", what: "Entrée en prépa, en licence, en école ou à l'étranger." },
      {
        when: "Printemps {B+2}",
        what: "Concours des grandes écoles : écrits au printemps, oraux en juin-juillet.",
        key: true,
      },
    ],
  },
  {
    years: "{B+2}-{B+5}",
    from: 2,
    to: 5,
    stage: "Bac+3 à bac+5",
    age: "20-23 ans",
    items: [
      { when: "{B+2}-{B+5}", what: "Grande école ou master : stages, séjour à l'étranger, double diplôme." },
      { when: "{B+5}", what: "Premier diplôme de niveau bac+5, vers 23 ans : premier métier ou doctorat.", key: true },
    ],
  },
]);
