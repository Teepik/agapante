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

/** Couloirs horizontaux libres d'étiquettes, où courent les passerelles. */
export const CORRIDOR = {
  A: PLAN.Y.r1 + 82,
  B: PLAN.Y.r2 + 90,
  B2: PLAN.Y.r2 + 100,
  C: PLAN.Y.r3 + 96,
} as const;
export type Corridor = keyof typeof CORRIDOR;

/** Côté de la ligne laissé libre par les étiquettes (elles regardent le centre du plan). */
function freeSide(id: LineId): number {
  return sideOf(id) === "left" ? -14 : 14;
}

/** Place le numéro d'une passerelle entre deux lignes, au plus près du milieu du couloir. */
function badgeX(xa: number, xb: number) {
  const lo = Math.min(xa, xb) + 18;
  const hi = Math.max(xa, xb) - 18;
  const mid = (xa + xb) / 2;
  const cols = ORDER.map((id) => COLS[id]).sort((m, n) => m - n);
  const gaps = cols.slice(1).map((c, i) => (c + cols[i]) / 2).filter((g) => g >= lo && g <= hi);
  if (!gaps.length) return mid;
  return gaps.reduce((best, g) => (Math.abs(g - mid) < Math.abs(best - mid) ? g : best));
}

/**
 * Tracé d'une passerelle.
 * « bypass » : rail doré le long de la même ligne, qui double la station de sélection.
 * « route » : descend le long de la ligne de départ, suit un couloir horizontal, puis rejoint la station d'arrivée.
 */
export function passPath(
  fromId: string,
  toId: string,
  kind: "bypass" | "route",
  via: Corridor = "B",
  dxTo?: number,
) {
  const a = placedById[fromId];
  const b = placedById[toId];
  if (!a || !b) return null;
  const r = 14;
  const dxa = a.line ? freeSide(a.line) : 0;
  const dxb = dxTo ?? (b.line ? freeSide(b.line) : 0);
  const xa = a.x + dxa;
  const xb = b.x + dxb;
  if (kind === "bypass") {
    const d = `M ${a.x} ${a.y} Q ${xa} ${a.y} ${xa} ${a.y + r} V ${b.y - r} Q ${xa} ${b.y} ${b.x} ${b.y}`;
    const midY = a.y < PLAN.Y.r3 && b.y > PLAN.Y.r3 ? (PLAN.Y.r3 + PLAN.Y.r4) / 2 : (a.y + b.y) / 2;
    return { d, mid: { x: xa, y: midY } };
  }
  const cy = CORRIDOR[via];
  const dir = Math.sign(xb - xa) || 1;
  const parts = [
    `M ${a.x} ${a.y}`,
    dxa ? `Q ${xa} ${a.y} ${xa} ${a.y + r}` : "",
    `V ${cy - r}`,
    `Q ${xa} ${cy} ${xa + dir * r} ${cy}`,
    `H ${xb - dir * r}`,
    `Q ${xb} ${cy} ${xb} ${cy + r}`,
    `V ${b.y - r}`,
    dxb ? `Q ${xb} ${b.y} ${b.x} ${b.y}` : `V ${b.y}`,
  ];
  return { d: parts.filter(Boolean).join(" "), mid: { x: badgeX(xa, xb), y: cy } };
}
