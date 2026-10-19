/**
 * Géométrie de la carte des études (coordonnées en pixels CSS, carte dessinée à taille réelle).
 *
 * Le parcours monte : la 3e est en bas, le premier métier en haut. Le tronc commun (3e → bac)
 * est un faisceau de huit lignes qui s'élève au centre ; après le bac, il se ramifie en huit
 * voies verticales, comme les branches d'un arbre. La ligne U, l'université, les coupe toutes
 * à l'horizontale.
 */
import type { LineId } from "./lines";

/** Ordre des voies, de gauche à droite (et ordre des lignes dans le faisceau). */
export const ORDER: LineId[] = ["defense", "sante", "sciences", "commerce", "scpo", "lettres", "monde", "arts"];

export const PLAN = {
  W: 1312,
  H: 976,
  /** Abscisse du centre du faisceau. */
  BX: 637,
  /** Écart entre deux lignes du faisceau. */
  BS: 9,
  /** Abscisse de la première voie, et écart entre deux voies. */
  COL0: 112,
  COL_STEP: 150,
  Y: {
    head: 34,
    r5: 112,
    r4: 222,
    r3: 332,
    r2: 442,
    r1: 552,
    bac: 704,
    premiere: 780,
    seconde: 856,
    college: 932,
  },
  /** Hauteur du premier embranchement, et pas entre deux embranchements. */
  TURN0: 650,
  TURN_STEP: 14,
  /** Rayon des virages. */
  R: 14,
  /** Pastille de la ligne U, à gauche. */
  U_X: 46,
} as const;

export type Row = "r1" | "r2" | "r3" | "r4" | "r5";
const ROWS: Row[] = ["r1", "r2", "r3", "r4", "r5"];

export function laneIndex(id: LineId): number {
  return ORDER.indexOf(id);
}

/** Abscisse de la voie d'une ligne. */
export function laneX(id: LineId): number {
  return PLAN.COL0 + laneIndex(id) * PLAN.COL_STEP;
}

/** Abscisse d'une ligne dans le faisceau du tronc commun. */
export function bundleX(id: LineId): number {
  return PLAN.BX + (laneIndex(id) - 3.5) * PLAN.BS;
}

function isLeft(id: LineId): boolean {
  return laneIndex(id) < 4;
}

/** Les lignes extérieures quittent le faisceau les premières : aucune ne croise sa voisine. */
function turnY(id: LineId): number {
  const k = laneIndex(id);
  return PLAN.TURN0 - (k < 4 ? k : 7 - k) * PLAN.TURN_STEP;
}

/** Tracé SVG complet d'une ligne, de la 3e (en bas) jusqu'à son premier métier (en haut). */
export function linePath(id: LineId): string {
  const { Y, R } = PLAN;
  const xb = bundleX(id);
  const xl = laneX(id);
  const yt = turnY(id);
  const left = isLeft(id);
  const dx = left ? -R : R;
  return [
    `M ${xb} ${Y.college}`,
    `V ${yt + R}`,
    `A ${R} ${R} 0 0 ${left ? 0 : 1} ${xb + dx} ${yt}`,
    `H ${xl - dx}`,
    `A ${R} ${R} 0 0 ${left ? 1 : 0} ${xl} ${yt - R}`,
    `V ${Y.r5}`,
  ].join(" ");
}

/** La ligne U coupe toutes les voies. */
export const U_PATH = `M ${PLAN.U_X + 18} ${PLAN.Y.r2} H ${PLAN.W - 8}`;

export type StationKind = "trunk" | "option" | "stop" | "u" | "terminus";

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

/** Options du lycée, rattachées à la 2nde. */
const options: PlacedStation[] = [
  { id: "lycee-defense", kind: "option", line: "defense", x: PLAN.BX, y: PLAN.Y.seconde },
  { id: "conservatoire", kind: "option", line: "arts", x: PLAN.BX, y: PLAN.Y.seconde },
];

/** Stations de chaque ligne après le bac (r2 = correspondance avec la ligne U). */
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

const laneStations: PlacedStation[] = ORDER.flatMap((line) =>
  ROWS.flatMap((row) => {
    const id = LINE_STOPS[line][row];
    if (!id) return [];
    const kind: StationKind = row === "r5" ? "terminus" : row === "r2" ? "u" : "stop";
    return [{ id, kind, line, row, x: laneX(line), y: PLAN.Y[row] }];
  }),
);

/** Station « Université » : la pastille de tête de la ligne U. */
const uHub: PlacedStation = { id: "universite", kind: "u", x: PLAN.U_X, y: PLAN.Y.r2 };

export const placed: PlacedStation[] = [...trunk, ...options, ...laneStations, uHub];
export const placedById = Object.fromEntries(placed.map((p) => [p.id, p])) as Record<string, PlacedStation>;

/** Itinéraire complet d'une ligne, de la 3e à son premier métier. */
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

/** Repères de temps, dans la marge gauche, à la hauteur de chaque étage. */
export const TIME_MARKS: { y: number; age: string; when: string }[] = [
  { y: PLAN.Y.r5, age: "23 ans", when: "premier métier" },
  { y: PLAN.Y.r4, age: "21-23 ans", when: "bac+3 à bac+5" },
  { y: PLAN.Y.r3, age: "20-22 ans", when: "sélection" },
  { y: PLAN.Y.r1, age: "18-20 ans", when: "bac+1, bac+2" },
  { y: PLAN.Y.bac, age: "18 ans", when: "juin 2030" },
  { y: PLAN.Y.premiere, age: "16-17 ans", when: "2028-2030" },
  { y: PLAN.Y.seconde, age: "15 ans", when: "2027-2028" },
  { y: PLAN.Y.college, age: "14 ans", when: "2026-2027" },
];

/* --------------------------------------------------------------------------
   Passerelles
   Les étiquettes des stations sont à droite des voies : les passerelles montent
   sur des rails, à gauche des voies, et changent de voie dans des couloirs
   horizontaux laissés libres entre deux étages d'étiquettes.
   -------------------------------------------------------------------------- */

export const RAIL = { bypass: 9, route: 17 } as const;

/** Couloirs horizontaux : sous la ligne U, au-dessus, et entre les concours et les écoles. */
export const CORRIDOR_Y = {
  low: 512,
  high: 396,
  top: 296,
} as const;
export type Corridor = keyof typeof CORRIDOR_Y;

/** Place le numéro d'une passerelle entre deux voies, au plus près du milieu du couloir. */
function badgeX(xa: number, xb: number) {
  const lo = Math.min(xa, xb) + 16;
  const hi = Math.max(xa, xb) - 16;
  const mid = (xa + xb) / 2;
  const cols = ORDER.map((id) => laneX(id));
  const gaps = cols.slice(1).map((c, i) => (c + cols[i]) / 2 + 8).filter((g) => g >= lo && g <= hi);
  if (!gaps.length) return mid;
  return gaps.reduce((best, g) => (Math.abs(g - mid) < Math.abs(best - mid) ? g : best));
}

export function passPath(fromId: string, toId: string, kind: "bypass" | "route", via: Corridor = "high") {
  const a = placedById[fromId];
  const b = placedById[toId];
  if (!a || !b) return null;
  const r = 9;
  if (kind === "bypass") {
    const x = a.x - RAIL.bypass;
    const d = `M ${a.x} ${a.y} Q ${x} ${a.y} ${x} ${a.y - r} V ${b.y + r} Q ${x} ${b.y} ${b.x} ${b.y}`;
    return { d, mid: { x, y: b.y + (PLAN.Y.r3 - PLAN.Y.r4) / 2 } };
  }
  const xa = a.x - RAIL.route;
  const xb = b.x - RAIL.route;
  const yc = CORRIDOR_Y[via];
  const dir = Math.sign(xb - xa) || 1;
  const d = [
    `M ${a.x} ${a.y}`,
    `Q ${xa} ${a.y} ${xa} ${a.y - r}`,
    `V ${yc + r}`,
    `Q ${xa} ${yc} ${xa + dir * r} ${yc}`,
    `H ${xb - dir * r}`,
    `Q ${xb} ${yc} ${xb} ${yc - r}`,
    `V ${b.y + r}`,
    `Q ${xb} ${b.y} ${b.x} ${b.y}`,
  ].join(" ");
  return { d, mid: { x: badgeX(xa, xb), y: yc } };
}
