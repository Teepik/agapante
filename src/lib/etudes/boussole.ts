import type { LineId } from "./lines";
import { frTypo } from "@/lib/typo";

export type Option = { label: string; w: Partial<Record<LineId, number>> };
export type Question = { id: string; prompt: string; options: Option[] };

export const questions: Question[] = frTypo([
  {
    id: "samedi",
    prompt: "Un samedi libre, qu'est-ce qui te fait le plus envie ?",
    options: [
      { label: "Résoudre une énigme ou un problème de maths coriace", w: { sciences: 3, commerce: 1, monde: 1 } },
      { label: "Monter un projet : un stand, une vente, une petite affaire", w: { commerce: 3, scpo: 1 } },
      { label: "Lire un roman ou un livre d'histoire", w: { lettres: 3, scpo: 1 } },
      { label: "Répéter un morceau, chanter, dessiner", w: { arts: 3, lettres: 1 } },
      { label: "Partir camper, randonner, mener une équipe", w: { defense: 3, sante: 1, commerce: 1 } },
      { label: "Observer la nature, les animaux, le corps humain", w: { sante: 3, sciences: 1 } },
    ],
  },
  {
    id: "matiere",
    prompt: "La matière où le temps passe le plus vite",
    options: [
      { label: "Les maths", w: { sciences: 3, commerce: 2, monde: 1 } },
      { label: "La physique-chimie ou les SVT", w: { sante: 3, sciences: 2 } },
      { label: "L'histoire-géographie", w: { scpo: 3, lettres: 2, defense: 1 } },
      { label: "Le français, le latin ou le grec", w: { lettres: 3, scpo: 1 } },
      { label: "Les langues vivantes", w: { monde: 3, commerce: 1, scpo: 1 } },
      { label: "La musique ou les arts", w: { arts: 3 } },
      { label: "Le sport", w: { defense: 2, sante: 1 } },
    ],
  },
  {
    id: "plus-tard",
    prompt: "Plus tard, tu te vois plutôt…",
    options: [
      { label: "Inventer ou construire des choses utiles", w: { sciences: 3 } },
      { label: "Diriger une équipe ou une entreprise", w: { commerce: 3, defense: 1 } },
      { label: "Servir le pays, protéger les autres", w: { defense: 3, scpo: 2 } },
      { label: "Soigner, accompagner", w: { sante: 3 } },
      { label: "Transmettre, enseigner, chercher", w: { lettres: 2, sciences: 1, arts: 1 } },
      { label: "Créer, interpréter, émouvoir", w: { arts: 3 } },
      { label: "Vivre et travailler à l'étranger", w: { monde: 3, commerce: 1 } },
    ],
  },
  {
    id: "probleme",
    prompt: "Face à un problème compliqué, tu préfères…",
    options: [
      { label: "Le décortiquer seul, crayon en main, jusqu'à trouver", w: { sciences: 3, lettres: 1 } },
      { label: "En discuter et convaincre les autres", w: { scpo: 3, commerce: 1 } },
      { label: "Écrire pour y voir clair", w: { lettres: 3, scpo: 1 } },
      { label: "Passer à l'action sur le terrain", w: { defense: 3, sante: 1 } },
      { label: "Essayer, recommencer, jusqu'à ce que ce soit beau", w: { arts: 3, sciences: 1 } },
    ],
  },
  {
    id: "moteur",
    prompt: "Ce qui te motive le plus",
    options: [
      { label: "Comprendre comment marche le monde", w: { sciences: 2, lettres: 2, monde: 1 } },
      { label: "Avoir des responsabilités tôt", w: { defense: 2, commerce: 2 } },
      { label: "Être utile aux autres, concrètement", w: { sante: 3, defense: 1 } },
      { label: "Débattre d'idées, de justice, de politique", w: { scpo: 3 } },
      { label: "La beauté d'une œuvre bien faite", w: { arts: 3, lettres: 1 } },
      { label: "Découvrir d'autres pays et d'autres cultures", w: { monde: 3 } },
    ],
  },
  {
    id: "defi",
    prompt: "Ton défi idéal",
    options: [
      { label: "Un concours difficile, en temps limité", w: { sciences: 2, commerce: 1, lettres: 1, defense: 1 } },
      { label: "Un concert devant un vrai public", w: { arts: 3 } },
      { label: "Un débat ou une plaidoirie", w: { scpo: 3 } },
      { label: "Une expédition ou un raid", w: { defense: 3, monde: 1 } },
      { label: "Un stage à l'hôpital ou un projet humanitaire", w: { sante: 3 } },
      { label: "Créer une entreprise avec des amis", w: { commerce: 3, sciences: 1 } },
    ],
  },
]);

/** Score maximal atteignable par ligne, pour ramener chaque score à un pourcentage. */
export function maxByLine(): Record<LineId, number> {
  const out = {} as Record<LineId, number>;
  for (const q of questions) {
    const best = {} as Record<LineId, number>;
    for (const o of q.options) {
      for (const [k, v] of Object.entries(o.w) as [LineId, number][]) best[k] = Math.max(best[k] ?? 0, v);
    }
    for (const [k, v] of Object.entries(best) as [LineId, number][]) out[k] = (out[k] ?? 0) + v;
  }
  return out;
}
