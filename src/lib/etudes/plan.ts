/**
 * Géométrie du plan (coordonnées en pixels CSS du plan dessiné à taille réelle)
 * et itinéraires des lignes, station par station.
 *
 * Le tronc commun (3e → bac) est un faisceau de huit lignes parallèles ; après le
 * bac, le faisceau s'ouvre en deux gerbes concentriques vers les huit colonnes.
 * La ligne U (l'université) traverse le plan à l'horizontale.
 */
import type { LineId } from "./lines";

export const PLAN = {
  W: 1290,
  H: 1420,
  /** Abscisse du centre du faisceau. */
  BX: 652,
  /** Écart entre deux lignes du faisceau. */
  BS: 10,
  /** Rayon des virages au pied des colonnes. */
  R2: 20,
  Y: {
    college: 104,
    seconde: 240,
    tick: 312,
    premiere: 384,
    bac: 520,
    bend: 570,
    r1: 734,
    r2: 874,
    r3: 1014,
    r4: 1154,
    r5: 1294,
  },
} as const;

/** Ordre des colonnes, de gauche à droite (et ordre des lignes dans le faisceau). */
export const ORDER: LineId[] = ["defense", "sante", "sciences", "commerce", "scpo", "lettres", "monde", "arts"];

export const COLS: Record<LineId, number> = {
  defense: 90,
  sante: 235,
  sciences: 380,
  commerce: 525,
  scpo: 780,
  lettres: 925,
  monde: 1070,
  arts: 1215,
};

export type Row = "r1" | "r2" | "r3" | "r4" | "r5";

export function bundleX(id: LineId): number {
  const k = ORDER.indexOf(id);
  return PLAN.BX + (k - 3.5) * PLAN.BS;
}

export function sideOf(id: LineId): "left" | "right" {
  return ORDER.indexOf(id) < 4 ? "left" : "right";
}

/** Tracé SVG complet d'une ligne : du 3e jusqu'à son terminus. */
export function linePath(id: LineId): string {
  const { BX, Y, R2 } = PLAN;
  const x0 = bundleX(id);
  const cx = COLS[id];
  const left = sideOf(id) === "left";
  const center = left ? BX - 75 : BX + 75;
  const R = Math.abs(x0 - center);
  const yh = Y.bend + R;
  if (left) {
    return [
      `M ${x0} ${Y.college}`,
      `V ${Y.bend}`,
      `A ${R} ${R} 0 0 1 ${center} ${yh}`,
      `H ${cx + R2}`,
      `A ${R2} ${R2} 0 0 0 ${cx} ${yh + R2}`,
      `V ${Y.r5}`,
    ].join(" ");
  }
  return [
    `M ${x0} ${Y.college}`,
    `V ${Y.bend}`,
    `A ${R} ${R} 0 0 0 ${center} ${yh}`,
    `H ${cx - R2}`,
    `A ${R2} ${R2} 0 0 1 ${cx} ${yh + R2}`,
    `V ${Y.r5}`,
  ].join(" ");
}

/** La ligne U traverse tout le plan. */
export const U_PATH = `M 40 ${PLAN.Y.r2} H ${PLAN.W - 14}`;

export type StationKind = "trunk" | "tick" | "stop" | "u" | "terminus";

export type PlacedStation = {
  id: string;
  kind: StationKind;
  /** Ligne qui porte la station (aucune pour le tronc commun). */
  line?: LineId;
  row?: Row;
  x: number;
  y: number;
};

const trunk: PlacedStation[] = [
  { id: "college", kind: "trunk", x: PLAN.BX, y: PLAN.Y.college },
  { id: "seconde", kind: "trunk", x: PLAN.BX, y: PLAN.Y.seconde },
  { id: "premiere-terminale", kind: "trunk", x: PLAN.BX, y: PLAN.Y.premiere },
  { id: "bac", kind: "trunk", x: PLAN.BX, y: PLAN.Y.bac },
];

const ticks: PlacedStation[] = [
  { id: "lycee-defense", kind: "tick", line: "defense", x: bundleX("defense"), y: PLAN.Y.tick },
  { id: "conservatoire", kind: "tick", line: "arts", x: bundleX("arts"), y: PLAN.Y.tick },
];

/** Stations de chaque ligne après le bac, ligne par ligne (r2 = correspondance avec la ligne U). */
export const LINE_STOPS: Record<LineId, Partial<Record<Row, string>>> = {
  defense: { r1: "prepa-officiers", r3: "concours-officiers", r4: "ecole-officiers", r5: "metiers-defense" },
  sante: { r1: "pass-las", r2: "u-sante", r3: "etudes-sante", r4: "internat", r5: "metiers-sante" },
  sciences: {
    r1: "prepa-scientifique",
    r2: "u-sciences",
    r3: "concours-ingenieurs",
    r4: "ecole-ingenieurs",
    r5: "metiers-sciences",
  },
  commerce: { r1: "prepa-ecg", r2: "u-eco", r3: "concours-commerce", r4: "ecole-commerce", r5: "metiers-commerce" },
  scpo: { r1: "sciences-po", r2: "u-droit", r3: "master-droit", r4: "concours-etat", r5: "metiers-scpo" },
  lettres: { r1: "khagne", r2: "u-lettres", r3: "concours-lettres", r4: "ens-chartes", r5: "metiers-lettres" },
  monde: { r1: "bachelor-etranger", r2: "u-monde", r3: "master-etranger", r4: "doctorat", r5: "metiers-monde" },
  arts: { r1: "pole-superieur", r2: "u-arts", r3: "concours-cnsmd", r4: "cnsmd", r5: "metiers-arts" },
};

const ROWS: Row[] = ["r1", "r2", "r3", "r4", "r5"];

const columnStations: PlacedStation[] = ORDER.flatMap((line) =>
  ROWS.flatMap((row) => {
    const id = LINE_STOPS[line][row];
    if (!id) return [];
    const kind: StationKind = row === "r5" ? "terminus" : row === "r2" ? "u" : "stop";
    return [{ id, kind, line, row, x: COLS[line], y: PLAN.Y[row] }];
  }),
);

/** Station « Université » : la pastille de tête de la ligne U, à gauche du plan. */
const uHub: PlacedStation = { id: "universite", kind: "u", x: 40, y: PLAN.Y.r2 };

export const placed: PlacedStation[] = [...trunk, ...ticks, ...columnStations, uHub];
export const placedById = Object.fromEntries(placed.map((p) => [p.id, p])) as Record<string, PlacedStation>;

/** Itinéraire complet d'une ligne, de la 3e à son terminus. */
export function routeOf(line: LineId): string[] {
  const stops = LINE_STOPS[line];
  const pre = ["college", "seconde"];
  if (line === "defense") pre.push("lycee-defense");
  if (line === "arts") pre.push("conservatoire");
  pre.push("premiere-terminale", "bac");
  return [...pre, ...ROWS.map((r) => stops[r]).filter((s): s is string => Boolean(s))];
}

/** Lignes qui desservent une station. */
export function linesAt(stationId: string): LineId[] {
  const p = placedById[stationId];
  if (!p) return [];
  if (p.kind === "trunk") return [...ORDER];
  if (p.line) return [p.line];
  return [];
}

/** Repères de temps affichés dans la marge du plan. */
export const TIME_MARKS: { y: number; age: string; when: string }[] = [
  { y: PLAN.Y.college, age: "14 ans", when: "2026-2027" },
  { y: PLAN.Y.seconde, age: "15 ans", when: "2027-2028" },
  { y: PLAN.Y.premiere, age: "16-17 ans", when: "2028-2030" },
  { y: PLAN.Y.bac, age: "18 ans", when: "juin 2030" },
  { y: PLAN.Y.r1, age: "18-20 ans", when: "bac+1, bac+2" },
  { y: PLAN.Y.r3, age: "20 ans", when: "sélection" },
  { y: PLAN.Y.r4, age: "21-23 ans", when: "bac+3 à bac+5" },
  { y: PLAN.Y.r5, age: "23 ans", when: "premier métier" },
];

/**
 * Tracé d'une passerelle sur le plan.
 * « bypass » : rail doré parallèle à la ligne, qui saute la station de sélection (même colonne).
 * « arc » : courbe entre deux colonnes ; `bend` déporte le point de contrôle (négatif : vers le haut).
 */
export function passPath(fromId: string, toId: string, kind: "arc" | "bypass", bend = 0.2) {
  const a = placedById[fromId];
  const b = placedById[toId];
  if (!a || !b) return null;
  if (kind === "bypass") {
    const side = a.line ? sideOf(a.line) : "left";
    const dx = side === "left" ? 13 : -13;
    const d = [
      `M ${a.x} ${a.y}`,
      `Q ${a.x + dx} ${a.y} ${a.x + dx} ${a.y + 24}`,
      `V ${b.y - 24}`,
      `Q ${a.x + dx} ${b.y} ${b.x} ${b.y}`,
    ].join(" ");
    return { d, mid: { x: a.x + dx, y: (a.y + b.y) / 2 } };
  }
  const mx = (a.x + b.x) / 2;
  const my = (a.y + b.y) / 2;
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // Normale au segment, orientée par le signe de `bend`.
  const cx = mx - dy * bend;
  const cy = my + dx * bend;
  const d = `M ${a.x} ${a.y} Q ${cx} ${cy} ${b.x} ${b.y}`;
  return { d, mid: { x: (a.x + 2 * cx + b.x) / 4, y: (a.y + 2 * cy + b.y) / 4 } };
}
