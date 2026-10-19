/**
 * Le test « Quelle voie te ressemble ? » : tes goûts, tes matières, tes valeurs et ta façon d'apprendre,
 * traduits en affinités pour chaque voie de la carte, puis en métiers à explorer.
 */
import type { LaneId } from "./lines";
import { LANES } from "./plan";
import { etTypo as frTypo } from "./typo";

export type Option = {
  label: string;
  w: Partial<Record<LaneId, number>>;
  /** Pour la question des familles de métiers : le rang de la famille dans FAMILLES (metiers.ts). */
  famille?: number;
};
export type Question = {
  id: string;
  prompt: string;
  /** Plusieurs réponses possibles, jusqu'à `max`. */
  max?: number;
  options: Option[];
};

export const questions: Question[] = frTypo([
  {
    id: "familles",
    prompt: "Ce qui t'attire le plus",
    max: 3,
    options: [
      {
        label: "Les sciences, l'ingénierie, le numérique",
        famille: 0,
        w: { sciences: 3, postbac: 3, courtes: 2, u: 1 },
      },
      { label: "La santé et le soin", famille: 1, w: { sante: 3, parasocial: 3, pro: 1 } },
      { label: "Le social, l'éducation, le sport", famille: 2, w: { parasocial: 3, u: 2, lettres: 1 } },
      { label: "La défense, la sécurité, les secours", famille: 3, w: { defense: 3, pro: 1, scpo: 1 } },
      { label: "La nature, l'agriculture, l'environnement", famille: 4, w: { courtes: 2, pro: 2, sciences: 2, u: 1 } },
      { label: "L'artisanat, l'industrie, le bâtiment", famille: 5, w: { pro: 3, courtes: 2, postbac: 1 } },
      { label: "Le commerce, la gestion, la finance", famille: 6, w: { commerce: 3, courtes: 2, postbac: 2 } },
      { label: "Le droit, l'État, l'international", famille: 7, w: { scpo: 3, monde: 2, u: 1 } },
      { label: "L'enseignement, la recherche, la culture", famille: 8, w: { lettres: 3, u: 2, sciences: 1 } },
      {
        label: "La communication, les médias, l'écrit",
        famille: 9,
        w: { lettres: 2, scpo: 1, commerce: 1, courtes: 1 },
      },
      { label: "Les arts, la musique, l'architecture", famille: 10, w: { arts: 3, pro: 1 } },
      {
        label: "Les transports, le tourisme, l'hôtellerie",
        famille: 11,
        w: { courtes: 2, pro: 2, monde: 1, defense: 1 },
      },
    ],
  },
  {
    id: "matieres",
    prompt: "Tes matières préférées",
    max: 3,
    options: [
      { label: "Les maths", w: { sciences: 3, postbac: 2, commerce: 2, courtes: 1 } },
      { label: "La physique-chimie", w: { sciences: 2, sante: 2, postbac: 2 } },
      { label: "Les SVT", w: { sante: 3, parasocial: 2, sciences: 1 } },
      { label: "Le français, le latin ou le grec", w: { lettres: 3, scpo: 1 } },
      { label: "L'histoire-géographie", w: { scpo: 3, lettres: 2, defense: 1 } },
      { label: "Les langues vivantes", w: { monde: 3, commerce: 1, scpo: 1 } },
      { label: "L'économie, les SES", w: { commerce: 3, scpo: 2, u: 1 } },
      { label: "La technologie, le numérique", w: { courtes: 2, sciences: 2, postbac: 2, pro: 1 } },
      { label: "Les arts plastiques ou la musique", w: { arts: 3 } },
      { label: "Le sport", w: { defense: 2, parasocial: 2 } },
      { label: "La philosophie", w: { lettres: 2, scpo: 2, u: 1 } },
      { label: "Les travaux pratiques, l'atelier", w: { pro: 3, courtes: 2 } },
    ],
  },
  {
    id: "valeurs",
    prompt: "Ce qui compte le plus pour toi dans un métier",
    max: 2,
    options: [
      { label: "Aider, soigner, accompagner", w: { parasocial: 3, sante: 3 } },
      { label: "Créer, fabriquer de mes mains", w: { pro: 3, arts: 2, courtes: 1 } },
      { label: "Comprendre, chercher, découvrir", w: { sciences: 2, lettres: 2, u: 2, sante: 1 } },
      { label: "Diriger, entreprendre, convaincre", w: { commerce: 3, scpo: 1, postbac: 1 } },
      { label: "Servir le pays, protéger", w: { defense: 3, scpo: 1 } },
      { label: "Voyager, vivre à l'international", w: { monde: 3, commerce: 1 } },
      { label: "Gagner tôt mon indépendance", w: { pro: 3, courtes: 3 } },
      { label: "Transmettre, enseigner", w: { lettres: 2, u: 2, parasocial: 1 } },
    ],
  },
  {
    id: "apprendre",
    prompt: "Ta façon préférée d'apprendre",
    options: [
      { label: "Par la pratique, au plus près du métier", w: { pro: 3, courtes: 2, parasocial: 1 } },
      { label: "En alternant l'école et l'entreprise", w: { courtes: 3, pro: 2, postbac: 1 } },
      {
        label: "Avec des cours exigeants et des concours",
        w: { sciences: 2, commerce: 2, lettres: 2, defense: 1, sante: 1 },
      },
      { label: "En autonomie, avec des choix à faire", w: { u: 3, monde: 1, lettres: 1 } },
      { label: "Dans une école, avec des projets et des stages", w: { postbac: 3, commerce: 1, parasocial: 1 } },
    ],
  },
  {
    id: "duree",
    prompt: "Combien d'années d'études te tentent ?",
    options: [
      { label: "Deux ou trois ans, pour vite travailler", w: { pro: 3, courtes: 3, parasocial: 1 } },
      {
        label: "Autour de cinq ans",
        w: { postbac: 2, commerce: 2, sciences: 2, u: 2, parasocial: 1, defense: 1, monde: 1, arts: 1 },
      },
      { label: "Longtemps, si c'est pour le métier de mes rêves", w: { sante: 3, lettres: 2, scpo: 2, u: 1 } },
      { label: "Je verrai en chemin", w: { u: 2, postbac: 1, courtes: 1 } },
    ],
  },
  {
    id: "lieu",
    prompt: "Où te vois-tu travailler ?",
    options: [
      { label: "Dehors, sur le terrain", w: { defense: 3, pro: 2, courtes: 1 } },
      { label: "Dans un atelier, un chantier ou un laboratoire", w: { pro: 2, sciences: 2, courtes: 2, postbac: 1 } },
      { label: "Auprès des gens : hôpital, école, association", w: { parasocial: 3, sante: 2, lettres: 1 } },
      { label: "Dans une entreprise ou une administration", w: { commerce: 2, scpo: 2, courtes: 1, postbac: 1 } },
      { label: "Sur scène ou dans un atelier d'artiste", w: { arts: 3 } },
      { label: "À l'étranger, en voyage", w: { monde: 3, commerce: 1 } },
    ],
  },
  {
    id: "defi",
    prompt: "Ton défi idéal",
    options: [
      {
        label: "Un concours difficile, en temps limité",
        w: { sciences: 2, commerce: 1, lettres: 1, defense: 1, sante: 1 },
      },
      { label: "Réaliser un objet de A à Z", w: { pro: 3, courtes: 1, postbac: 1 } },
      { label: "Un concert ou une exposition", w: { arts: 3 } },
      { label: "Un débat ou une plaidoirie", w: { scpo: 3 } },
      { label: "Un raid ou une expédition", w: { defense: 3, monde: 1 } },
      { label: "Un stage à l'hôpital ou un projet humanitaire", w: { sante: 2, parasocial: 2 } },
      { label: "Créer une entreprise avec des amis", w: { commerce: 3, postbac: 1 } },
    ],
  },
]);

/** Score maximal atteignable par voie, pour ramener chaque score à un pourcentage. */
export function maxByLane(): Record<LaneId, number> {
  const out = Object.fromEntries(LANES.map((l) => [l, 0])) as Record<LaneId, number>;
  for (const q of questions) {
    const k = q.max ?? 1;
    for (const l of LANES) {
      const ws = q.options.map((o) => o.w[l] ?? 0).sort((a, b) => b - a);
      out[l] += ws.slice(0, k).reduce((a, b) => a + b, 0);
    }
  }
  return out;
}

/** Les affinités, en pourcentage, à partir des réponses (une liste de choix par question). */
export function affinites(answers: number[][]): { id: LaneId; pct: number }[] {
  const max = maxByLane();
  const raw = Object.fromEntries(LANES.map((l) => [l, 0])) as Record<LaneId, number>;
  questions.forEach((q, qi) => {
    for (const i of answers[qi] ?? []) {
      const o = q.options[i];
      if (!o) continue;
      for (const [k, v] of Object.entries(o.w) as [LaneId, number][]) raw[k] += v;
    }
  });
  return LANES.map((id) => ({ id, pct: Math.round((raw[id] / (max[id] || 1)) * 100) })).sort((a, b) => b.pct - a.pct);
}

/** Les familles de métiers choisies, d'après la première question. */
export function famillesChoisies(answers: number[][]): number[] {
  const q = questions[0];
  return (answers[0] ?? []).map((i) => q.options[i]?.famille).filter((f): f is number => typeof f === "number");
}
