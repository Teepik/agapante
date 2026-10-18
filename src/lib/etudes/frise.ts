import { etTypo as frTypo } from "./typo";

export type FriseYear = {
  years: string;
  stage: string;
  age: string;
  here?: boolean;
  items: { when: string; what: string; key?: boolean }[];
};

export const frise: FriseYear[] = frTypo([
  {
    years: "2026-2027",
    stage: "3e",
    age: "14 ans",
    here: true,
    items: [
      { when: "Janvier-février 2027", what: "Préinscription dans un lycée de la Défense, si tu y as accès.", key: true },
      {
        when: "Février à avril 2027",
        what: "Portes ouvertes, dossiers des lycées privés, examen d'entrée pour un lycée public.",
        key: true,
      },
      { when: "Juin 2027", what: "Le brevet." },
    ],
  },
  {
    years: "2027-2028",
    stage: "2nde",
    age: "15 ans",
    items: [
      { when: "Septembre 2027", what: "Tests de positionnement en français et en maths." },
      { when: "Février-mars 2028", what: "Choix de tes trois spécialités de 1re.", key: true },
      { when: "Juin 2028", what: "Stage d'observation de deux semaines, obligatoire." },
    ],
  },
  {
    years: "2028-2029",
    stage: "1re",
    age: "16 ans",
    items: [
      { when: "Toute l'année", what: "Tes bulletins entrent dans ton dossier Parcoursup : c'est ici qu'il commence.", key: true },
      { when: "Printemps 2029", what: "Choix des deux spécialités gardées en Terminale et de l'option de maths.", key: true },
      { when: "Juin 2029", what: "Épreuves anticipées : français (écrit et oral) et mathématiques." },
    ],
  },
  {
    years: "2029-2030",
    stage: "Terminale",
    age: "17 ans",
    items: [
      {
        when: "15 octobre 2029",
        what: "Date limite habituelle pour Oxford, Cambridge et la médecine au Royaume-Uni, si tu vises l'étranger.",
      },
      { when: "Décembre 2029", what: "Ouverture de Parcoursup pour découvrir les formations." },
      { when: "Janvier à mars 2030", what: "Inscription et vœux sur Parcoursup, jusqu'à dix vœux.", key: true },
      { when: "Début avril 2030", what: "Dossiers complétés, lettres de motivation, vœux confirmés." },
      {
        when: "Juin 2030",
        what: "Premières réponses de Parcoursup début juin, puis le bac : philosophie, spécialités, grand oral.",
        key: true,
      },
    ],
  },
  {
    years: "2030-2032",
    stage: "Bac+1 et bac+2",
    age: "18-19 ans",
    items: [
      { when: "Septembre 2030", what: "Entrée en prépa, en licence, en école ou à l'étranger." },
      { when: "Printemps 2032", what: "Concours des grandes écoles : écrits au printemps, oraux en juin-juillet.", key: true },
    ],
  },
  {
    years: "2032-2035",
    stage: "Bac+3 à bac+5",
    age: "20-23 ans",
    items: [
      { when: "2032-2035", what: "Grande école ou master : stages, séjour à l'étranger, double diplôme." },
      { when: "2035", what: "Premier diplôme de niveau bac+5, vers 23 ans : premier métier ou doctorat.", key: true },
    ],
  },
]);
