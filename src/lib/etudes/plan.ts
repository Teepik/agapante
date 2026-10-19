/**
 * Géométrie de la carte des études : une échelle de temps qui monte.
 *
 * La 3e est en bas. Le tronc commun (3e → bac) est un faisceau de neuf lignes ; après le bac,
 * il se ramifie en neuf voies verticales. La hauteur de chaque étape est sa durée réelle :
 * une année d'études vaut PX pixels. L'université, au centre, prolonge le lycée tout droit.
 */
import type { LaneId, LineId } from "./lines";

/** Les voies, de gauche à droite (et ordre des lignes dans le faisceau). */
export const LANES: LaneId[] = ["sante", "defense", "sciences", "commerce", "u", "scpo", "lettres", "monde", "arts"];

/** Les huit voies thématiques, sans l'université. */
export const ORDER: LineId[] = LANES.filter((l): l is LineId => l !== "u");

/** Une étape qui dure (une formation), de `from` à `to` années après le bac ; `more` : sa fin la plus tardive. */
export type Seg = {
  id: string;
  from: number;
  to: number;
  name: string;
  dur: string;
  more?: number;
};
/** Un moment (un concours), à `at` années après le bac. */
export type Ev = { id: string; at: number; sub: string };
/** Une sortie en chemin : des métiers qui s'ouvrent avant le haut de la voie. */
export type Exit = { at: number; name: string; age: string };
/** Le premier métier, en haut de la voie. */
export type End = { id: string; at: number; name: string; age: string };
export type LaneDef = { segs: Seg[]; events: Ev[]; exits: Exit[]; end: End };

export const LANE_DEFS: Record<LaneId, LaneDef> = {
  sante: {
    segs: [
      {
        id: "pass-las",
        from: 0,
        to: 1,
        name: "Licence santé",
        dur: "1 à 2 ans",
      },
      {
        id: "etudes-sante",
        from: 1,
        to: 6,
        name: "Études de santé",
        dur: "jusqu'à la 6e année",
      },
      {
        id: "internat",
        from: 6,
        to: 10,
        name: "Internat de médecine",
        dur: "4 à 6 ans",
        more: 12,
      },
    ],
    events: [],
    exits: [{ at: 6, name: "Pharmacien, dentiste", age: "vers 24 ans" }],
    end: {
      id: "metiers-sante",
      at: 12,
      name: "Médecin",
      age: "vers 28 à 30 ans",
    },
  },
  defense: {
    segs: [
      {
        id: "prepa-officiers",
        from: 0,
        to: 2,
        name: "Prépa, toutes filières",
        dur: "2 ans",
      },
      {
        id: "ecole-officiers",
        from: 2,
        to: 5,
        name: "École d'officiers",
        dur: "3 ans, rémunéré",
      },
    ],
    events: [{ id: "concours-officiers", at: 2, sub: "Saint-Cyr, Navale, Air" }],
    exits: [],
    end: { id: "metiers-defense", at: 5, name: "Officier", age: "vers 23 ans" },
  },
  sciences: {
    segs: [
      {
        id: "prepa-scientifique",
        from: 0,
        to: 2,
        name: "Prépa scientifique",
        dur: "2 ans",
      },
      {
        id: "ecole-ingenieurs",
        from: 2,
        to: 5,
        name: "École d'ingénieurs",
        dur: "3 ans",
      },
    ],
    events: [{ id: "concours-ingenieurs", at: 2, sub: "X-ENS, Mines, Centrale" }],
    exits: [],
    end: {
      id: "metiers-sciences",
      at: 5,
      name: "Ingénieur, chercheur",
      age: "vers 23 ans",
    },
  },
  commerce: {
    segs: [
      { id: "prepa-ecg", from: 0, to: 2, name: "Prépa ECG", dur: "2 ans" },
      {
        id: "ecole-commerce",
        from: 2,
        to: 5,
        name: "École de commerce",
        dur: "3 ans",
      },
    ],
    events: [{ id: "concours-commerce", at: 2, sub: "BCE, Ecricome" }],
    exits: [],
    end: {
      id: "metiers-commerce",
      at: 5,
      name: "Dirigeant, financier",
      age: "vers 23 ans",
    },
  },
  u: {
    segs: [
      { id: "universite", from: 0, to: 3, name: "Licence", dur: "3 ans" },
      { id: "u-master", from: 3, to: 5, name: "Master", dur: "2 ans" },
      {
        id: "doctorat",
        from: 5,
        to: 8,
        name: "Doctorat",
        dur: "3 ans et plus",
      },
    ],
    events: [],
    exits: [{ at: 5, name: "La plupart des métiers", age: "vers 23 ans" }],
    end: {
      id: "metiers-u",
      at: 8,
      name: "Chercheur, enseignant",
      age: "vers 26 ans",
    },
  },
  scpo: {
    segs: [
      {
        id: "sciences-po",
        from: 0,
        to: 3,
        name: "Sciences Po ou un IEP",
        dur: "le bachelor, 3 ans",
      },
      {
        id: "master-droit",
        from: 3,
        to: 5,
        name: "Master",
        dur: "droit, affaires publiques",
      },
      {
        id: "concours-etat",
        from: 5,
        to: 7.5,
        name: "INSP, magistrature, barreau",
        dur: "concours puis école",
      },
    ],
    events: [],
    exits: [],
    end: {
      id: "metiers-scpo",
      at: 7.5,
      name: "Haut fonctionnaire, avocat",
      age: "vers 25 à 26 ans",
    },
  },
  lettres: {
    segs: [
      {
        id: "khagne",
        from: 0,
        to: 2,
        name: "Hypokhâgne, khâgne",
        dur: "2 ans",
      },
      {
        id: "ens-chartes",
        from: 2,
        to: 6,
        name: "ENS, École des chartes",
        dur: "3 à 4 ans",
      },
    ],
    events: [{ id: "concours-lettres", at: 2, sub: "ENS, Chartes, BEL" }],
    exits: [],
    end: {
      id: "metiers-lettres",
      at: 6,
      name: "Professeur, chercheur",
      age: "vers 24 ans",
    },
  },
  monde: {
    segs: [
      {
        id: "bachelor-etranger",
        from: 0,
        to: 3,
        name: "Université à l'étranger",
        dur: "3 à 4 ans",
      },
      {
        id: "master-etranger",
        from: 3,
        to: 5,
        name: "Master à l'étranger",
        dur: "1 à 2 ans",
      },
    ],
    events: [],
    exits: [],
    end: {
      id: "metiers-monde",
      at: 5,
      name: "Carrière internationale",
      age: "vers 23 ans",
    },
  },
  arts: {
    segs: [
      {
        id: "pole-superieur",
        from: 0,
        to: 3,
        name: "Pôle supérieur, école d'art",
        dur: "3 à 5 ans",
      },
      {
        id: "cnsmd",
        from: 3,
        to: 5,
        name: "CNSMD Paris ou Lyon",
        dur: "le master, 2 ans",
      },
    ],
    events: [{ id: "concours-cnsmd", at: 3, sub: "CNSMD, audition" }],
    exits: [],
    end: {
      id: "metiers-arts",
      at: 5,
      name: "Musicien, architecte",
      age: "vers 23 à 25 ans",
    },
  },
};

/** Les licences de chaque voie, à l'université : présentes dans les fiches, hors du dessin. */
export const UNIVERSITY_TRACKS: Record<string, LineId> = {
  "u-sante": "sante",
  "u-sciences": "sciences",
  "u-eco": "commerce",
  "u-droit": "scpo",
  "u-lettres": "lettres",
  "u-monde": "monde",
  "u-arts": "arts",
};

export const PLAN = {
  W: 1232,
  /** Pixels par année d'études après le bac. */
  PX: 48,
  /** Pixels par année au lycée. */
  PXT: 48,
  /** Abscisse de la première voie, et écart entre deux voies. */
  COL0: 116,
  COL_STEP: 124,
  /** Écart entre deux lignes du faisceau. */
  BS: 9,
  /** Rayon des virages. */
  R: 14,
  /** Ordonnée du début des études supérieures (septembre après le bac). */
  Y0: 720,
  /** Hauteur réservée à l'éventail, entre le bac et la rentrée suivante. */
  FAN: 88,
} as const;

/** Abscisse d'une voie. */
export function laneX(id: LaneId): number {
  return PLAN.COL0 + LANES.indexOf(id) * PLAN.COL_STEP;
}

/** Centre du faisceau : l'université, tout droit. */
export const BX = laneX("u");

/** Ordonnée d'un moment, en années après le bac. */
export function yAt(t: number): number {
  return PLAN.Y0 - t * PLAN.PX;
}

export const Y_BAC = PLAN.Y0 + PLAN.FAN;

/** Les classes du tronc commun, en années avant le bac. */
const TRUNK_T = {
  college: 3.5,
  seconde: 2.5,
  "premiere-terminale": 1,
  bac: 0,
} as const;
export type TrunkId = keyof typeof TRUNK_T;

export function trunkY(id: TrunkId): number {
  return Y_BAC + TRUNK_T[id] * PLAN.PXT;
}

export const PLAN_H = Math.round(trunkY("college") + 40);

/** Abscisse d'une ligne dans le faisceau du tronc commun. */
export function bundleX(id: LaneId): number {
  return BX + (LANES.indexOf(id) - 4) * PLAN.BS;
}

/** Les lignes extérieures quittent le faisceau les premières : aucune ne croise sa voisine. */
function turnY(id: LaneId): number {
  const k = LANES.indexOf(id);
  const rank = k < 4 ? k : 8 - k;
  return PLAN.Y0 + 60 - rank * 12;
}

/** Tracé complet d'une voie, de la 3e jusqu'à son premier métier. */
export function linePath(id: LaneId): string {
  const { R } = PLAN;
  const xb = bundleX(id);
  const top = yAt(LANE_DEFS[id].end.at);
  const yc = trunkY("college");
  if (id === "u") return `M ${xb} ${yc} V ${top}`;
  const xl = laneX(id);
  const yt = turnY(id);
  const left = xl < xb;
  const dx = left ? -R : R;
  return [
    `M ${xb} ${yc}`,
    `V ${yt + R}`,
    `A ${R} ${R} 0 0 ${left ? 0 : 1} ${xb + dx} ${yt}`,
    `H ${xl - dx}`,
    `A ${R} ${R} 0 0 ${left ? 1 : 0} ${xl} ${yt - R}`,
    `V ${top}`,
  ].join(" ");
}

export type StationKind = "trunk" | "option" | "seg" | "event" | "end";

export type PlacedStation = {
  id: string;
  kind: StationKind;
  /** Voie qui porte la station (aucune pour le tronc commun). */
  line?: LaneId;
  x: number;
  /** Ordonnée du repère : début de l'étape, moment, ou métier. */
  y: number;
  /** Pour une étape : ordonnées de son début, de sa fin, et de sa fin la plus tardive. */
  y1?: number;
  y2?: number;
  y3?: number;
  /** Textes de la carte. */
  name?: string;
  dur?: string;
  sub?: string;
  age?: string;
  /** Années après le bac (début, pour une étape). */
  t?: number;
};

const trunk: PlacedStation[] = (["college", "seconde", "premiere-terminale", "bac"] as const).map((id) => ({
  id,
  kind: "trunk",
  x: BX,
  y: trunkY(id),
  t: -TRUNK_T[id],
}));

const options: PlacedStation[] = [
  {
    id: "lycee-defense",
    kind: "option",
    line: "defense",
    x: BX,
    y: trunkY("seconde"),
    t: -2.5,
  },
  {
    id: "conservatoire",
    kind: "option",
    line: "arts",
    x: BX,
    y: trunkY("seconde"),
    t: -2.5,
  },
];

const laneStations: PlacedStation[] = LANES.flatMap((line) => {
  const def = LANE_DEFS[line];
  const x = laneX(line);
  const segs: PlacedStation[] = def.segs.map((s) => ({
    id: s.id,
    kind: "seg",
    line,
    x,
    y: yAt(s.from),
    y1: yAt(s.from),
    y2: yAt(s.to),
    y3: s.more ? yAt(s.more) : undefined,
    name: s.name,
    dur: s.dur,
    t: s.from,
  }));
  const events: PlacedStation[] = def.events.map((e) => ({
    id: e.id,
    kind: "event",
    line,
    x,
    y: yAt(e.at),
    name: "Concours",
    sub: e.sub,
    t: e.at,
  }));
  const end: PlacedStation = {
    id: def.end.id,
    kind: "end",
    line,
    x,
    y: yAt(def.end.at),
    name: def.end.name,
    age: def.end.age,
    t: def.end.at,
  };
  return [...segs, ...events, end];
});

export const placed: PlacedStation[] = [...trunk, ...options, ...laneStations];
export const placedById = Object.fromEntries(placed.map((p) => [p.id, p])) as Record<string, PlacedStation>;

/** Les sorties en chemin, posées sur leur voie ; elles ouvrent la fiche des métiers de la voie. */
export const exitsPlaced = LANES.flatMap((line) =>
  LANE_DEFS[line].exits.map((e) => ({
    ...e,
    line,
    x: laneX(line),
    y: yAt(e.at),
    station: LANE_DEFS[line].end.id,
  })),
);

/** Voie d'une station, dessinée ou non (les licences de l'université sont rattachées à leur thème). */
export function laneOf(stationId: string): LaneId | null {
  return placedById[stationId]?.line ?? UNIVERSITY_TRACKS[stationId] ?? null;
}

/** Itinéraire complet d'une voie, de la 3e à son premier métier, dans l'ordre du temps. */
export function routeOf(line: LaneId): string[] {
  const def = LANE_DEFS[line];
  const pre = ["college", "seconde"];
  if (line === "defense") pre.push("lycee-defense");
  if (line === "arts") pre.push("conservatoire");
  pre.push("premiere-terminale", "bac");
  const steps = [
    ...def.segs.map((s) => ({ id: s.id, t: s.from })),
    ...def.events.map((e) => ({ id: e.id, t: e.at - 0.01 })),
  ].sort((a, b) => a.t - b.t);
  return [...pre, ...steps.map((s) => s.id), def.end.id];
}

/** Voies qui desservent une station. */
export function linesAt(stationId: string): LaneId[] {
  const p = placedById[stationId];
  if (!p) return [];
  if (p.kind === "trunk") return [...LANES];
  if (p.line) return [p.line];
  return [];
}

/** La station d'une voie à un moment donné : celle que l'on quitte, ou celle où l'on arrive. */
export function stationAt(lane: LaneId, t: number, role: "from" | "to"): string | null {
  const def = LANE_DEFS[lane];
  if (role === "to") {
    const ev = def.events.find((e) => e.at === t);
    if (ev) return ev.id;
    const seg = def.segs.find((s) => s.from <= t && t < s.to);
    if (seg) return seg.id;
    return def.end.at === t ? def.end.id : null;
  }
  return def.segs.find((s) => s.from < t && t <= s.to)?.id ?? null;
}

/** Repères de temps, dans la marge gauche. */
export const TIME_MARKS: { y: number; age: string; when: string }[] = [
  { y: yAt(12), age: "30 ans", when: "bac+12" },
  { y: yAt(10), age: "28 ans", when: "bac+10" },
  { y: yAt(8), age: "26 ans", when: "bac+8, doctorat" },
  { y: yAt(5), age: "23 ans", when: "bac+5, master" },
  { y: yAt(3), age: "21 ans", when: "bac+3, licence" },
  { y: yAt(2), age: "20 ans", when: "bac+2" },
  { y: Y_BAC, age: "18 ans", when: "le bac, juin {B}" },
  { y: trunkY("premiere-terminale"), age: "16-17 ans", when: "{B-2}-{B}" },
  { y: trunkY("seconde"), age: "15 ans", when: "{B-3}-{B-2}" },
  { y: trunkY("college"), age: "14 ans", when: "{B-4}-{B-3}" },
];

/** Lignes de niveau : les paliers à retenir, tracés jusqu'à la dernière voie qui les atteint. */
export const LEVELS: { y: number; x2: number; strong: boolean }[] = [2, 3, 5, 8, 10, 12].map((t) => {
  const reach = LANES.filter((l) => LANE_DEFS[l].end.at >= t);
  const last = reach.length ? Math.max(...reach.map(laneX)) : PLAN.COL0;
  return {
    y: yAt(t),
    x2: t <= 5 ? PLAN.W - 8 : last + PLAN.COL_STEP - 12,
    strong: t === 3 || t === 5 || t === 8,
  };
});

/* --------------------------------------------------------------------------
   Passerelles : un trait horizontal, au moment où l'on change de voie.
   -------------------------------------------------------------------------- */

export type PassDraw = { from: LaneId[]; to: LaneId; t: number };

export function passGeometry(def: PassDraw) {
  const y = yAt(def.t);
  const xt = laneX(def.to);
  const sources = def.from.map((lane) => ({ lane, x: laneX(lane) }));
  const runs: { x1: number; x2: number; dir: 1 | -1 }[] = [];
  const left = sources.filter((s) => s.x < xt);
  const right = sources.filter((s) => s.x > xt);
  if (left.length) runs.push({ x1: Math.min(...left.map((s) => s.x)), x2: xt, dir: 1 });
  if (right.length) runs.push({ x1: Math.max(...right.map((s) => s.x)), x2: xt, dir: -1 });
  const longest = runs.reduce((a, b) => (Math.abs(b.x2 - b.x1) > Math.abs(a.x2 - a.x1) ? b : a), runs[0]);
  const hot = [...def.from.map((lane) => stationAt(lane, def.t, "from")), stationAt(def.to, def.t, "to")].filter(
    (id): id is string => Boolean(id),
  );
  return { y, xt, sources, runs, mid: (longest.x1 + longest.x2) / 2, hot };
}
