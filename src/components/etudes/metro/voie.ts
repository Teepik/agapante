import type { LaneId } from "@/lib/etudes/lines";
import { laneOf, placedById, routeOf, UNIVERSITY_TRACKS } from "@/lib/etudes/plan";
import { stopById } from "@/lib/etudes/metro";
import type { StationContent } from "@/lib/etudes/stations";

const TRONC = ["college", "seconde", "premiere-terminale", "bac"];

/** Les fiches propres à la carte, rattachées à une voie : Mon Master, entre la licence et le master. */
const HORS_PLAN: Record<string, { lane: LaneId; prev: string; next: string }> = {
  "mon-master": { lane: "u", prev: "universite", next: "u-master" },
};

/**
 * La voie d'une étape : celle d'où l'on vient quand elle est connue, sinon sa propre voie.
 * Les classes du tronc commun appartiennent à toutes les voies : sans voie choisie, elles restent sans couleur.
 * Une licence de l'université se lit sur la voie Université.
 */
export function voieDe(id: string, line: LaneId | null): LaneId | null {
  if (HORS_PLAN[id]) return HORS_PLAN[id].lane;
  if (UNIVERSITY_TRACKS[id]) return "u";
  if (placedById[id]?.kind === "trunk") return line;
  return line ?? laneOf(id);
}

/** L'étape précédente et la suivante sur une voie ; au bac, sans voie choisie, la suite reste à choisir. */
export function voisins(id: string, voie: LaneId | null): { prev: string | null; next: string | null } {
  const hors = HORS_PLAN[id];
  if (hors) return { prev: hors.prev, next: hors.next };
  const route = voie ? routeOf(voie) : TRONC;
  const i = route.indexOf(UNIVERSITY_TRACKS[id] ? "universite" : id);
  if (i < 0) return { prev: null, next: null };
  return { prev: i > 0 ? route[i - 1] : null, next: i < route.length - 1 ? route[i + 1] : null };
}

/** Les pastilles de la fiche courte : durée, entrée, coût, en quelques mots. */
export function pastilles(id: string, st: StationContent): string[] {
  const s = stopById[id];
  if (s) return [s.duree, s.entree, s.cout, s.plus].filter(Boolean) as string[];
  const p = placedById[id];
  const out: string[] = [];
  if (p?.kind === "seg" && p.dur) out.push(p.dur);
  const cout = st.facts?.find((f) => /^Coût/.test(f.label));
  if (cout && cout.value.length <= 90) out.push(cout.value);
  return out;
}
