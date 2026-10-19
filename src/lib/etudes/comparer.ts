/**
 * Les quatre lignes de la carte, côte à côte, sur les mêmes questions. Les faits reprennent les fiches
 * vérifiées des étapes (stations.ts, stations-voies.ts), les passerelles (passerelles.ts,
 * passerelles-voies.ts), les montants de couts.ts pour 2026-2027 et les fiches Parcoursup 2026.
 */
import { CVEC, DROITS } from "./couts";
import type { MetroLine } from "./metro";
import { etTypo } from "./typo";

type LigneId = MetroLine["id"];

export type Critere = {
  id: string;
  label: string;
  valeurs: Record<LigneId, string>;
};

const eur = (n: number) => `${n.toLocaleString("fr-FR")} €`;

export const CRITERES: Critere[] = etTypo([
  {
    id: "ou",
    label: "Où tu étudies",
    valeurs: {
      prepa:
        "Deux ans dans un lycée, en classe préparatoire, puis trois ans dans l'école que tu intègres par concours.",
      postbac:
        "Cinq ans dans la même école, ou dans son réseau : deux ans de prépa intégrée, puis trois ans de cycle ingénieur.",
      but: "Le BUT, trois ans dans un IUT, à l'université. Le BTS, deux ans dans un lycée ou un centre de formation d'apprentis.",
      univ: "À l'université : trois ans de licence, deux ans de master, puis le doctorat pour qui vise la recherche.",
    },
  },
  {
    id: "entree",
    label: "Comment tu y entres",
    valeurs: {
      prepa: "Sur Parcoursup, sur dossier : notes de 1re et de terminale, appréciations, fiche Avenir.",
      postbac:
        "En terminale, sur Parcoursup : par un concours commun à plusieurs écoles (Geipi Polytech, Puissance Alpha, Advance…), ou par la sélection propre à l'école.",
      but: "Sur Parcoursup, sur dossier, avec tout bac. Des places sont réservées aux bacs technologiques en BUT et aux bacs professionnels en BTS.",
      univ: "Sur Parcoursup, sur dossier. Les doubles licences comptent parmi les formations les plus sélectives.",
    },
  },
  {
    id: "rythme",
    label: "Le rythme",
    valeurs: {
      prepa:
        "Une trentaine d'heures de cours, de TD et de TP par semaine, deux ou trois colles, ces interrogations orales en petit groupe, et un devoir surveillé, souvent le samedi matin.",
      postbac:
        "Environ 30 heures de cours par semaine, en petits groupes, avec des projets d'ingénieur dès la 1re année.",
      but: "Cours, travaux pratiques et projets en petits groupes, avec des stages : 22 à 26 semaines sur les trois ans de BUT.",
      univ: "Des cours magistraux en amphithéâtre, des travaux dirigés en petits groupes, et beaucoup de travail personnel.",
    },
  },
  {
    id: "enjeu",
    label: "Ce qui se joue en route",
    valeurs: {
      prepa: "Les concours, au printemps de la 2e année : ton classement décide des écoles qui t'ouvrent leurs portes.",
      postbac:
        "Tes notes des deux premières années, au contrôle continu : elles t'ouvrent le cycle ingénieur et, souvent, le choix de ta spécialité.",
      but: "Le diplôme à bac+2 ou bac+3 : tu travailles, ou tu continues en licence professionnelle, en école d'ingénieurs ou en master.",
      univ: "L'entrée en master, sur dossier, par la plateforme Mon Master : candidatures en février et mars de ta 3e année de licence, réponses à partir de juin.",
    },
  },
  {
    id: "changer",
    label: "Si tu changes d'avis",
    valeurs: {
      prepa:
        "Chaque année validée vaut 60 crédits européens : tu peux rejoindre une 2e ou une 3e année de licence à l'université.",
      postbac:
        "Tu peux repartir en licence en candidatant sur Parcoursup ; d'autres écoles post-bac gardent des places pour les étudiants qui changent de voie.",
      but: "Des passerelles mènent vers la licence, la licence professionnelle ou le BTS ; après le BUT, vers une école d'ingénieurs ou un master.",
      univ: "Avec une 2e ou une 3e année de licence, tu peux entrer en école d'ingénieurs par les admissions parallèles, sur titre ou sur concours.",
    },
  },
  {
    id: "diplome",
    label: "Le diplôme",
    valeurs: {
      prepa: "Le diplôme d'ingénieur, à bac+5, avec le grade de master.",
      postbac: "Le diplôme d'ingénieur, à bac+5, avec le grade de master.",
      but: "Le BTS à bac+2 ; le BUT à bac+3, avec le grade de licence, et le DUT en route, à bac+2.",
      univ: "La licence à bac+3, le master à bac+5, le doctorat à bac+8.",
    },
  },
  {
    id: "cout",
    label: "Ce que ça coûte",
    valeurs: {
      prepa: `Prépa gratuite au lycée public, avec une inscription à l'université (${eur(DROITS.licence)}). Puis ${eur(DROITS.ingenieur)} par an dans la plupart des écoles publiques ; certaines grandes écoles demandent plusieurs milliers d'euros, avec des exonérations pour les boursiers.`,
      postbac: `Dans le public, de ${eur(DROITS.licence)} à ${eur(DROITS.ingenieur)} par an, selon l'école. Dans le privé, de 9 880 € (EPF) à 11 499 € (IPSA).`,
      but: `BTS gratuit au lycée public. BUT : ${eur(DROITS.licence)} de droits par an. En alternance, ta formation est prise en charge et tu touches un salaire.`,
      univ: `${eur(DROITS.licence)} par an en licence, ${eur(DROITS.master)} en master.`,
    },
  },
  {
    id: "alternance",
    label: "L'alternance",
    valeurs: {
      prepa: "Possible ensuite, dans le cycle ingénieur de nombreuses écoles, souvent dans des spécialités dédiées.",
      postbac: "Possible dans le cycle ingénieur, dès la 3e ou la 4e année selon l'école.",
      but: "Le BTS et le BUT se préparent aussi en alternance : tu es salarié, tu touches un salaire, et ta formation est prise en charge.",
      univ: "En licence professionnelle, très souvent, et dans de nombreux masters.",
    },
  },
  {
    id: "pour-qui",
    label: "Pour qui",
    valeurs: {
      prepa:
        "Pour qui aime les maths et les sciences, travaille avec régularité et veut viser les écoles les plus sélectives en gardant le choix ouvert.",
      postbac:
        "Pour qui sait déjà vouloir devenir ingénieur et préfère avancer cinq ans dans la même école, au contrôle continu.",
      but: "Pour qui aime le concret, les projets et l'entreprise, et veut un diplôme qui mène vite à un métier, avec la possibilité de continuer.",
      univ: "Pour qui aime une discipline et veut l'approfondir avec autonomie, jusqu'au master ou jusqu'à la recherche.",
    },
  },
]);

/** Ce qu'il faut savoir en plus : la CVEC s'ajoute chaque année aux droits, à l'université et en école. */
export const COMPARER_NOTE = etTypo(
  `Montants de l'année 2026-2027. À l'université et en école, s'y ajoute chaque année la contribution de vie étudiante et de campus (${eur(CVEC)}). Dans le public, les boursiers sont exonérés des droits d'inscription.`,
);
