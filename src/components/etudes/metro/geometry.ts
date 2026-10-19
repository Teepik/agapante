import { BAC_T, STOPS, stopT, type MetroLineId, type Stop } from "@/lib/etudes/metro";

/** Le plan sur grand écran : le temps de gauche à droite, une ligne par voie après le bac. */
export const MAP = {
  W: 1440,
  H: 600,
  /** Abscisse de la rentrée de 3e. */
  X0: 92,
  /** Une année avant le bac, une année après. */
  PRE: 76,
  POST: 112,
  /** Longueur de l'aiguillage qui suit le bac. */
  CURVE: 48,
};

export const LINE_Y: Record<MetroLineId, number> = {
  prepa: 168,
  postbac: 278,
  tronc: 334,
  but: 390,
  univ: 500,
};

export const LINE_ORDER: Exclude<MetroLineId, "tronc">[] = ["prepa", "postbac", "but", "univ"];

export function tx(t: number): number {
  return t <= BAC_T ? MAP.X0 + t * MAP.PRE : MAP.X0 + BAC_T * MAP.PRE + (t - BAC_T) * MAP.POST;
}

export function stopXY(s: Stop): { x: number; y: number } {
  return { x: tx(stopT(s)), y: LINE_Y[s.line] };
}

/** La fin d'une ligne : son terminus le plus lointain. */
export function lineEnd(line: MetroLineId): number {
  return Math.max(...STOPS.filter((s) => s.line === line).map((s) => s.t1 ?? s.t0));
}

/** Le tracé d'une ligne : l'aiguillage depuis le bac, puis la ligne droite. */
export function linePath(line: Exclude<MetroLineId, "tronc">): string {
  const x0 = tx(BAC_T);
  const y0 = LINE_Y.tronc;
  const y = LINE_Y[line];
  const c = MAP.CURVE;
  return `M${x0} ${y0} C ${x0 + c * 0.55} ${y0} ${x0 + c * 0.45} ${y} ${x0 + c} ${y} H ${tx(lineEnd(line))}`;
}

/** Les étapes d'une ligne, dans l'ordre du trajet. */
export function stopsOf(line: MetroLineId): Stop[] {
  return STOPS.filter((s) => s.line === line).sort((a, b) => stopT(a) - stopT(b));
}

/** L'étape précédente et la suivante, en remontant au tronc commun depuis le début d'une ligne. */
export function neighbours(id: string): { prev: Stop | null; next: Stop | null } {
  const s = STOPS.find((x) => x.id === id);
  if (!s) return { prev: null, next: null };
  const own = stopsOf(s.line);
  const i = own.findIndex((x) => x.id === id);
  const prev = i > 0 ? own[i - 1] : s.line === "tronc" ? null : (STOPS.find((x) => x.id === "bac") ?? null);
  const next = i < own.length - 1 ? own[i + 1] : null;
  return { prev, next };
}
