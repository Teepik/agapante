/** Les guides pas à pas, et les étapes de la carte qui y mènent. */
import { etTypo } from "./typo";

export type LienGuide = { href: string; label: string; detail: string };

export const GUIDES_DE: Record<string, LienGuide[]> = etTypo({
  college: [
    {
      href: "/etudes/bac#voies",
      label: "Les trois voies du lycée",
      detail: "Générale, technologique ou professionnelle : ce que chacune prépare et ce qu'elle ouvre",
    },
  ],
  seconde: [
    {
      href: "/etudes/bac#specialites",
      label: "Le bac, pas à pas",
      detail: "Choisir sa voie et ses spécialités en fin de 2nde, puis la suite jusqu'au bac",
    },
  ],
  "premiere-terminale": [
    {
      href: "/etudes/bac",
      label: "Le bac, pas à pas",
      detail: "Spécialités, options, épreuves et calcul de la note",
    },
    {
      href: "/etudes/parcoursup",
      label: "Parcoursup, pas à pas",
      detail: "Le calendrier, les vœux, le dossier, les réponses",
    },
  ],
  bac: [
    {
      href: "/etudes/bac#note",
      label: "Le bac, pas à pas",
      detail: "Ce que pèse chaque note, les épreuves, les résultats",
    },
    {
      href: "/etudes/parcoursup",
      label: "Parcoursup, pas à pas",
      detail: "Le calendrier, les vœux, les réponses et ce qu'il faut faire pour chacune",
    },
  ],
  "bac-techno": [
    {
      href: "/etudes/bac#techno",
      label: "Les huit bacs technologiques",
      detail: "Ce que chaque série fait étudier, et où elle mène",
    },
  ],
  "lycee-pro": [
    {
      href: "/etudes/bac#pro",
      label: "Le bac professionnel et le CAP",
      detail: "Les familles de métiers, les stages, les épreuves et la suite",
    },
  ],
});
