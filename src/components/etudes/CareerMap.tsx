"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { laneDirection, laneName, lanePitch, laneShort, type LaneId } from "@/lib/etudes/lines";
import {
  BX,
  LANES,
  LANE_DEFS,
  LEVELS,
  PLAN,
  PLAN_H,
  TIME_MARKS,
  exitsPlaced,
  laneX,
  linePath,
  passGeometry,
  placed,
  placedById,
  routeOf,
  type PlacedStation,
} from "@/lib/etudes/plan";
import type { Metier } from "@/lib/etudes/metiers";
import { passerelleById, passerelles } from "@/lib/etudes/passerelles";
import { stationById } from "@/lib/etudes/stations";
import { useCohort } from "./cohorte";
import { Dot, Icon } from "./ui";

type Props = {
  focusLine: LaneId | null;
  route: LaneId | null;
  /** Un métier choisi : ses routes s'allument sur la carte. */
  metier?: Metier | null;
  onClearMetier?: () => void;
  onOpen: (id: string, line: LaneId | null) => void;
  onFocusLine: (line: LaneId | null) => void;
  laneLine: LaneId;
  onLaneLine: (line: LaneId) => void;
  activePass: string | null;
  onActivePass: (id: string | null) => void;
  onOpenPasserelle: (id: string) => void;
};

/** Les options du lycée, posées à côté de la 2nde. */
const OPTION_LABEL: Record<string, string> = {
  "lycee-defense": "Lycée de la Défense",
  conservatoire: "Conservatoire",
  "bac-techno": "Bac technologique",
  "concours-postbac": "Concours post-bac",
  alternance: "Alternance",
};

/** Le nom de la voie, en haut de sa colonne : court, pour tenir dans la largeur d'une voie. */
const DEST_LABEL: Partial<Record<LaneId, string>> = { postbac: "Post-bac" };

/** En dessous de cette échelle, la carte entière devient trop petite pour être lue : on passe voie par voie. */
const MIN_SCALE = 0.78;

/** Largeur d'une colonne de libellés, à droite de la barre. */
const COL = PLAN.COL_STEP - 2;

/** « Médecin » → « médecin » ; les sigles (« CPE ») gardent leurs capitales. */
export function minuscule(s: string): string {
  return /^.[A-ZÉ]/.test(s) ? s : s.charAt(0).toLowerCase() + s.slice(1);
}

/** Les voies et les étapes d'un métier : les licences de l'université allument la voie centrale. */
export function metierPaths(m: Metier) {
  const lanes = new Set<LaneId>();
  const stations = new Set<string>();
  for (const r of m.routes) {
    lanes.add(r.lane);
    for (const id of r.via) {
      if (placedById[id]) {
        stations.add(id);
        const line = placedById[id].line;
        if (line) lanes.add(line);
        else if (placedById[id].kind === "trunk") lanes.add("u");
      } else if (id.startsWith("u-")) {
        lanes.add("u");
        stations.add("universite");
      }
    }
  }
  return { lanes, stations };
}

export function CareerMap(props: Props) {
  const frameRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [choice, setChoice] = useState<"auto" | "carte" | "liste">("auto");

  useEffect(() => {
    const el = frameRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fits = width !== null && width / PLAN.W >= MIN_SCALE;
  const mode = choice === "auto" ? (width === null || fits ? "carte" : "liste") : choice;
  const scale = width ? Math.max(MIN_SCALE, Math.min(1, width / PLAN.W)) : 1;
  const lit = props.route ?? props.focusLine;

  return (
    <div className={`e-map${lit || props.metier ? " is-focus" : ""}${props.activePass ? " is-pass" : ""}`}>
      <div className="e-wrap">
        <div className="e-map__bar">
          {mode === "carte" ? (
            <div className="e-map__filters" role="group" aria-label="Mettre une voie en avant">
              <button type="button" className="e-chip" aria-pressed={!lit} onClick={() => props.onFocusLine(null)}>
                Toutes
              </button>
              {LANES.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="e-chip"
                  data-line={id}
                  aria-pressed={lit === id}
                  onClick={() => {
                    props.onFocusLine(lit === id ? null : id);
                    props.onLaneLine(id);
                  }}
                >
                  <Dot line={id} />
                  {laneShort(id)}
                </button>
              ))}
            </div>
          ) : null}
          {props.metier ? (
            <p className="e-map__metier" aria-live="polite">
              <span>
                Les routes vers <strong>{minuscule(props.metier.name)}</strong>
              </span>
              <button
                type="button"
                className="e-iconbtn"
                onClick={props.onClearMetier}
                aria-label="Effacer les routes du métier"
              >
                <Icon name="close" width={16} height={16} />
              </button>
            </p>
          ) : null}
          <div className="e-map__tools">
            <div className="e-seg" role="group" aria-label="Affichage">
              <button type="button" aria-pressed={mode === "carte"} onClick={() => setChoice("carte")}>
                Carte
              </button>
              <button type="button" aria-pressed={mode === "liste"} onClick={() => setChoice("liste")}>
                Voie par voie
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="e-map__frame" ref={frameRef} id="carte-plan">
        {mode === "carte" ? (
          <div style={fits ? undefined : { overflowX: "auto", paddingBottom: 12 }}>
            <div className="e-map__sizer" style={{ width: PLAN.W * scale, height: PLAN_H * scale }}>
              <div
                className="e-map__canvas"
                style={{
                  width: PLAN.W,
                  height: PLAN_H,
                  transform: `scale(${scale})`,
                }}
              >
                <Drawing {...props} lit={lit} />
              </div>
            </div>
          </div>
        ) : (
          <Lanes {...props} />
        )}
      </div>
    </div>
  );
}

/* --------------------------------------------------------------------------
   La carte entière
   -------------------------------------------------------------------------- */

function Drawing({
  route,
  metier,
  lit,
  onOpen,
  onFocusLine,
  activePass,
  onActivePass,
  onOpenPasserelle,
}: Props & { lit: LaneId | null }) {
  const [peek, setPeek] = useState<LaneId | null>(null);
  const { y, ici, classe } = useCohort();
  const pass = activePass ? passerelleById[activePass] : null;
  const geo = pass?.draw ? passGeometry(pass.draw) : null;
  const hot = new Set(geo?.hot ?? []);
  // Un trait qui arrive par la droite traverse la colonne de libellés de sa cible : le libellé d'un concours passe à gauche.
  const target = geo ? geo.hot[geo.hot.length - 1] : null;
  const lift = geo?.runs.some((r) => r.dir === -1) && target && placedById[target]?.kind === "event" ? target : null;
  const call = geo && pass ? placeCallout(geo, pass.title, lift) : null;
  const job = !geo && metier ? metierPaths(metier) : null;
  const shown = geo || job ? null : (lit ?? peek);
  const dimLane = (line?: LaneId) =>
    job ? Boolean(line && !job.lanes.has(line)) : Boolean(shown && line && line !== shown);
  const dimSt = (p: PlacedStation) =>
    geo ? !hot.has(p.id) : job ? p.kind !== "trunk" && !job.stations.has(p.id) : dimLane(p.line);
  const cls = (base: string, dim: boolean) => (dim ? `${base} is-dim` : base);

  const segs = placed.filter((p) => p.kind === "seg");
  /** Un repère (concours, sortie) au bord d'une étape : son libellé s'en écarte. */
  const marksAt = (line: LaneId, t: number) =>
    LANE_DEFS[line].events.some((e) => e.at === t) || LANE_DEFS[line].exits.some((e) => e.at === t && !e.flip);
  const segEdge = (p: PlacedStation) => {
    const seg = LANE_DEFS[p.line!].segs.find((s) => s.id === p.id)!;
    return `${marksAt(p.line!, seg.to) ? " is-top" : ""}${marksAt(p.line!, seg.from) ? " is-bottom" : ""}`;
  };
  const events = placed.filter((p) => p.kind === "event");
  const ends = placed.filter((p) => p.kind === "end");
  const trunk = placed.filter((p) => p.kind === "trunk");

  return (
    <>
      <svg className="e-map__svg" viewBox={`0 0 ${PLAN.W} ${PLAN_H}`} width={PLAN.W} height={PLAN_H} aria-hidden="true">
        {LEVELS.map((lv) => (
          <line
            key={lv.y}
            className={lv.strong ? "e-level e-level--strong" : "e-level"}
            x1={96}
            x2={lv.x2}
            y1={lv.y}
            y2={lv.y}
          />
        ))}

        {route && !job ? (
          <path key={route} d={linePath(route)} data-line={route} className="e-route-halo" pathLength={1} />
        ) : null}
        {job
          ? [...job.lanes].map((l) => (
              <path key={`job-${l}`} d={linePath(l)} data-line={l} className="e-route-halo" pathLength={1} />
            ))
          : null}

        {LANES.map((id) => (
          <path key={id} d={linePath(id)} data-line={id} className={cls("e-lane", geo ? true : dimLane(id))} />
        ))}

        {segs.map((p) => (
          <g key={p.id} data-line={p.line} className={cls("e-mk", dimSt(p))}>
            <rect className="e-bar" x={p.x - 5} y={p.y2! + 1.5} width={10} height={p.y1! - p.y2! - 3} rx={5} />
            {p.y3 ? (
              <rect
                className="e-bar e-bar--more"
                x={p.x - 5}
                y={p.y3 + 1.5}
                width={10}
                height={p.y2! - p.y3 - 3}
                rx={5}
              />
            ) : null}
          </g>
        ))}

        {exitsPlaced.map((e) => (
          <circle
            key={`${e.line}-${e.at}`}
            data-line={e.line}
            className={cls("e-mk e-exit", geo ? true : dimLane(e.line))}
            cx={e.x}
            cy={e.y}
            r={5}
          />
        ))}

        {events.map((p) => (
          <rect
            key={p.id}
            data-line={p.line}
            className={cls("e-mk e-ev", dimSt(p))}
            x={p.x - 6.5}
            y={p.y - 6.5}
            width={13}
            height={13}
            rx={2.5}
            transform={`rotate(45 ${p.x} ${p.y})`}
          />
        ))}

        {ends.map((p) => (
          <circle key={p.id} data-line={p.line} className={cls("e-mk e-end", dimSt(p))} cx={p.x} cy={p.y} r={8} />
        ))}

        {trunk.map((p) => (
          <rect
            key={p.id}
            className={
              p.id === ici ? "e-cap e-cap--here" : classe === "4e" && p.id === "college" ? "e-cap e-cap--next" : "e-cap"
            }
            x={BX - 49}
            y={p.y - 13}
            width={98}
            height={26}
            rx={13}
          />
        ))}

        {geo ? (
          <g className="e-parrow">
            <defs>
              <marker
                id="e-parrow-head"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="4"
                markerHeight="4"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className="e-parrow__head" />
              </marker>
            </defs>
            {geo.runs.map((r) => {
              const d = `M ${r.x1} ${geo.y} H ${r.x2 - r.dir * 13}`;
              return (
                <g key={r.dir}>
                  <path d={d} className="e-parrow__case" />
                  <path d={d} className="e-parrow__line" markerEnd="url(#e-parrow-head)" />
                </g>
              );
            })}
            {geo.sources.map((s) => (
              <circle key={s.lane} className="e-parrow__dot" cx={s.x} cy={geo.y} r={5.5} />
            ))}
          </g>
        ) : null}
      </svg>

      <ol className="e-time" aria-hidden="true">
        {TIME_MARKS.map((m) => (
          <li key={m.y} style={{ top: m.y - 15 }}>
            <span className="e-time__age">{m.age}</span>
            <span className="e-time__when">{y(m.when)}</span>
          </li>
        ))}
      </ol>

      {trunk.map((p) => {
        const st = stationById[p.id];
        if (!st) return null;
        return (
          <button
            key={p.id}
            type="button"
            className={`e-ms e-ms--trunk${p.id === ici ? " is-here" : ""}`}
            style={{ left: BX - 330, top: p.y - (p.id === "seconde" ? 28 : 24), width: 330 + 49 }}
            aria-label={`${st.name}, tronc commun${p.id === ici ? ", tu es ici" : ""}`}
            onClick={() => onOpen(p.id, null)}
          >
            <span className="e-ms__name">{st.label}</span>
            <span className="e-ms__sub">{trunkSub(p.id, y, ici, classe)}</span>
          </button>
        );
      })}

      {[...new Set(placed.filter((p) => p.kind === "option").map((p) => p.y))].map((oy) => (
        <div key={oy} className="e-opts" style={{ left: BX + 62, top: oy - 14 }}>
          {placed
            .filter((p) => p.kind === "option" && p.y === oy)
            .map((p) => (
              <button
                key={p.id}
                type="button"
                className={cls("e-opt", geo ? true : dimLane(p.line))}
                data-line={p.line}
                aria-label={`${stationById[p.id]?.name ?? OPTION_LABEL[p.id]}, au lycée`}
                onClick={() => onOpen(p.id, p.line ?? null)}
              >
                <Dot line={p.line!} />
                {OPTION_LABEL[p.id] ?? stationById[p.id]?.label}
              </button>
            ))}
        </div>
      ))}

      {segs.map((p) => (
        <button
          key={p.id}
          type="button"
          className={cls(`e-ms e-ms--seg${segEdge(p)}`, dimSt(p))}
          style={{
            left: p.x - 9,
            top: p.y2! + 2,
            width: COL,
            height: p.y1! - p.y2! - 4,
          }}
          data-line={p.line}
          aria-label={`${stationById[p.id]?.name ?? p.name}, ${laneName(p.line!)}, ${p.dur}`}
          onClick={() => onOpen(p.id, p.line ?? null)}
        >
          <span className="e-ms__name">{p.name}</span>
          <span className="e-ms__sub">{p.dur}</span>
        </button>
      ))}

      {events.map((p) => (
        <button
          key={p.id}
          type="button"
          className={cls(`e-ms e-ms--ev${lift === p.id ? " is-flip" : ""}`, dimSt(p))}
          style={{
            left: lift === p.id ? p.x - COL + 9 : p.x - 9,
            // Un concours au moment du bac : son libellé monte dans la barre, loin des virages de l'éventail.
            top: p.t === 0 ? p.y - 40 : p.y - 24,
            width: COL,
            height: 40,
          }}
          data-line={p.line}
          aria-label={`${stationById[p.id]?.name ?? p.name}, ${laneName(p.line!)}`}
          onClick={() => onOpen(p.id, p.line ?? null)}
        >
          <span className="e-ms__name">{p.name}</span>
          <span className="e-ms__sub">{p.sub}</span>
        </button>
      ))}

      {exitsPlaced.map((e) => (
        <button
          key={`${e.line}-${e.at}`}
          type="button"
          className={cls(`e-ms e-ms--exit${e.flip ? " is-flip" : ""}`, geo ? true : dimLane(e.line))}
          style={{ left: e.flip ? e.x - COL + 9 : e.x - 9, top: e.y - (e.flip ? 30 : 23), width: COL, height: 46 }}
          data-line={e.line}
          aria-label={`${e.name}, ${e.age}`}
          onClick={() => onOpen(e.station, e.line)}
        >
          <span className="e-ms__name">{e.name}</span>
          <span className="e-ms__sub">{e.age}</span>
        </button>
      ))}

      {ends.map((p) => {
        const line = p.line!;
        return (
          <div
            key={p.id}
            className={cls("e-dest", dimSt(p))}
            style={{ left: p.x - 9, top: p.y - 14, width: COL }}
            data-line={line}
          >
            <button
              type="button"
              className="e-dest__lane"
              aria-pressed={lit === line}
              onMouseEnter={() => setPeek(line)}
              onMouseLeave={() => setPeek(null)}
              onFocus={() => setPeek(line)}
              onBlur={() => setPeek(null)}
              onClick={() => onFocusLine(lit === line ? null : line)}
            >
              <Dot line={line} />
              {DEST_LABEL[line] ?? laneShort(line)}
            </button>
            <button
              type="button"
              className="e-dest__job"
              aria-label={`${stationById[p.id]?.name ?? p.name}, ${p.age}`}
              onClick={() => onOpen(p.id, line)}
            >
              <span className="e-ms__name">{p.name}</span>
              <span className="e-ms__sub">{p.age}</span>
            </button>
          </div>
        );
      })}

      <PassPanel activePass={activePass} onActivePass={onActivePass} />
      <Legend />

      {call && pass ? (
        <button
          type="button"
          className="e-pcall"
          style={{ left: call.left, top: call.top, width: call.w }}
          onClick={() => onOpenPasserelle(pass.id)}
          aria-label={`Passerelle ${pass.num} : ${pass.title}. Ouvrir la fiche`}
        >
          <span className="e-numbadge">{pass.num}</span>
          <span>
            <span className="e-pcall__title">{pass.title}</span>
            <span className="e-pcall__when">{pass.when}</span>
          </span>
          <Icon name="chevron-right" width={16} height={16} />
        </button>
      ) : null}
    </>
  );
}

/* --------------------------------------------------------------------------
   L'étiquette d'une passerelle : près de son trait, sans masquer ses étapes.
   -------------------------------------------------------------------------- */

const CALL_W = 300;
type Box = { x1: number; x2: number; y1: number; y2: number };
const overlaps = (a: Box, b: Box) => a.x1 < b.x2 && b.x1 < a.x2 && a.y1 < b.y2 && b.y1 < a.y2;

/** Les zones à garder visibles : les barres et les libellés des étapes reliées. */
function hotBoxes(hot: string[], flipped: string | null): Box[] {
  return hot.flatMap((id) => {
    const p = placedById[id];
    if (!p) return [];
    if (p.kind === "seg") {
      const cy = (p.y1! + p.y2!) / 2;
      return [
        { x1: p.x - 8, x2: p.x + 8, y1: p.y2!, y2: p.y1! },
        { x1: p.x + 10, x2: p.x + 113, y1: cy - 30, y2: cy + 30 },
      ];
    }
    if (p.kind === "event") {
      const flip = flipped === id;
      return [
        { x1: p.x - 9, x2: p.x + 9, y1: p.y - 9, y2: p.y + 9 },
        { x1: flip ? p.x - 113 : p.x + 10, x2: flip ? p.x - 10 : p.x + 113, y1: p.y - 28, y2: p.y + 20 },
      ];
    }
    return [{ x1: p.x - 10, x2: p.x + 113, y1: p.y - 30, y2: p.y + 30 }];
  });
}

/** Essaie plusieurs places, au-dessus puis au-dessous du trait, et garde la première qui ne cache rien. */
function placeCallout(geo: ReturnType<typeof passGeometry>, title: string, flipped: string | null) {
  const w = Math.min(CALL_W, 78 + title.length * 7.4);
  const h = title.length * 7.4 > CALL_W - 78 ? 76 : 58;
  const run = geo.runs.reduce((a, b) => (Math.abs(b.x2 - b.x1) > Math.abs(a.x2 - a.x1) ? b : a), geo.runs[0]);
  const { x1, x2, dir } = run;
  const boxes = hotBoxes(geo.hot, flipped);
  const xs = [
    (x1 + x2) / 2,
    x2 - dir * (w / 2 + 14),
    x1 + dir * (w / 2 + 14),
    x2 + dir * (w / 2 + 22),
    x1 - dir * (w / 2 + 22),
  ];
  const clamp = (cx: number) => Math.min(PLAN.W - w / 2 - 8, Math.max(104 + w / 2, cx));
  const tries = [...xs.map((cx) => ({ cx, above: true })), ...xs.map((cx) => ({ cx, above: false }))];
  for (const t of tries) {
    const cx = clamp(t.cx);
    const top = t.above ? geo.y - 14 - h : geo.y + 14;
    const box = { x1: cx - w / 2, x2: cx + w / 2, y1: top, y2: top + h };
    if (!boxes.some((b) => overlaps(b, box))) return { left: cx - w / 2, top, w };
  }
  const cx = clamp((x1 + x2) / 2);
  return { left: cx - w / 2, top: geo.y - 14 - h, w };
}

/** Les passerelles, à afficher une par une. */
function PassPanel({
  activePass,
  onActivePass,
}: {
  activePass: string | null;
  onActivePass: (id: string | null) => void;
}) {
  return (
    <div className="e-ppanel" style={{ left: 104, top: 14, width: 312 }}>
      <p className="e-ppanel__title">Les passerelles</p>
      <p className="e-ppanel__sub">Pour changer de voie en chemin. Choisis-en une pour la voir sur la carte.</p>
      <ul>
        {passerelles
          .filter((x) => x.draw)
          .map((x) => (
            <li key={x.id}>
              <button
                type="button"
                aria-pressed={activePass === x.id}
                onClick={() => onActivePass(activePass === x.id ? null : x.id)}
              >
                <span className="e-numbadge">{x.num}</span>
                <span>{x.title}</span>
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
}

function Legend() {
  return (
    <div className="e-mkey" style={{ left: 1180, top: 14, width: 310 }}>
      <p className="e-ppanel__title">Lire la carte</p>
      <ul>
        <li>
          <svg viewBox="0 0 34 40" aria-hidden="true">
            <rect x="12" y="2" width="10" height="16" rx="5" fill="var(--slate)" />
            <rect x="12" y="21" width="10" height="17" rx="5" fill="var(--slate)" />
          </svg>
          <span>
            <strong>Une barre, une formation.</strong> Sa hauteur est sa durée réelle.
          </span>
        </li>
        <li>
          <svg viewBox="0 0 34 40" aria-hidden="true">
            <rect x="12" y="2" width="10" height="36" rx="5" fill="var(--slate)" />
            <rect
              x="10.5"
              y="13.5"
              width="13"
              height="13"
              rx="2.5"
              transform="rotate(45 17 20)"
              fill="var(--paper)"
              stroke="var(--slate)"
              strokeWidth="2.5"
            />
          </svg>
          <span>
            <strong>Un concours</strong> pour entrer à l&apos;étape suivante.
          </span>
        </li>
        <li>
          <svg viewBox="0 0 34 40" aria-hidden="true">
            <rect x="12" y="2" width="10" height="16" rx="5" fill="var(--hair-2)" />
            <rect x="12" y="21" width="10" height="17" rx="5" fill="var(--slate)" />
          </svg>
          <span>
            <strong>Une barre claire</strong> : une durée qui varie selon la spécialité.
          </span>
        </li>
        <li>
          <svg viewBox="0 0 34 40" aria-hidden="true">
            <rect x="12" y="14" width="10" height="24" rx="5" fill="var(--slate)" />
            <circle cx="17" cy="9" r="7" fill="var(--slate)" stroke="var(--paper)" strokeWidth="3" />
          </svg>
          <span>
            <strong>Le premier métier</strong>, en haut de la voie, et l&apos;âge où l&apos;on y arrive.
          </span>
        </li>
        <li>
          <svg viewBox="0 0 34 40" aria-hidden="true">
            <path d="M0 20h34" stroke="var(--hair-2)" strokeWidth="1.5" />
          </svg>
          <span>
            <strong>Les lignes grises</strong> marquent la licence, le master et le doctorat : bac+3, bac+5, bac+8.
          </span>
        </li>
      </ul>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Voie par voie (petits écrans, ou au choix)
   -------------------------------------------------------------------------- */

type Row =
  | { kind: "station"; key: number; id: string }
  | { kind: "exit"; key: number; name: string; age: string; station: string }
  | { kind: "pass"; key: number; id: string; out: boolean };

function laneRows(lane: LaneId): Row[] {
  const def = LANE_DEFS[lane];
  const rows: Row[] = routeOf(lane).map((id) => {
    const p = placedById[id];
    const key = p.kind === "seg" ? p.t! : p.kind === "event" ? p.t! - 0.01 : p.kind === "end" ? p.t! + 1 : p.t! - 10;
    return { kind: "station", key, id };
  });
  def.exits.forEach((e) =>
    rows.push({
      kind: "exit",
      key: e.at - 0.001,
      name: e.name,
      age: e.age,
      station: def.end.id,
    }),
  );
  passerelles.forEach((x) => {
    if (!x.draw) return;
    if (x.draw.to === lane) rows.push({ kind: "pass", key: x.draw.t - 0.005, id: x.id, out: false });
    else if (x.draw.from.includes(lane)) rows.push({ kind: "pass", key: x.draw.t - 0.005, id: x.id, out: true });
  });
  return rows.sort((a, b) => a.key - b.key);
}

/** Le sous-titre d'une classe du tronc commun : ses années, et « Tu es ici » pour celle de l'élève. */
function trunkSub(id: string, y: (t: string) => string, ici: string | null, classe: string): string {
  const st = stationById[id];
  if (id === "college") {
    const years = y("{B-4}-{B-3}");
    if (ici === "college") return `Tu es ici, ${years}`;
    return classe === "4e" ? `L'an prochain, ${years}` : years;
  }
  if (id === "seconde") return ici === "seconde" ? `Tu es ici, ${y("{B-3}-{B-2}")}` : y(st?.sub ?? "");
  if (id === "premiere-terminale" && ici === "premiere-terminale") {
    return classe === "1re" ? `Tu es ici, en 1re, ${y("{B-2}-{B-1}")}` : `Tu es ici, en terminale, ${y("{B-1}-{B}")}`;
  }
  return y(st?.sub ?? "");
}

function stepMeta(id: string, y: (t: string) => string): string {
  const p = placedById[id];
  const st = stationById[id];
  if (p?.kind === "seg") {
    const seg = Object.values(LANE_DEFS)
      .flatMap((d) => d.segs)
      .find((s) => s.id === id)!;
    const a = 18 + seg.from;
    return seg.more ? `${seg.dur}, à partir de ${a} ans` : `${seg.dur}, de ${a} à ${18 + seg.to} ans`;
  }
  if (p?.kind === "end") return p.age ?? y(st?.when ?? "");
  return y(st?.when ?? "");
}

/** « A », « A et B », « A, B et C ». */
function joinFr(items: string[]): string {
  return items.length < 2 ? (items[0] ?? "") : `${items.slice(0, -1).join(", ")} et ${items[items.length - 1]}`;
}

function Lanes({ laneLine, onLaneLine, onOpen, activePass, onOpenPasserelle }: Props) {
  const { y, ici } = useCohort();
  const rows = laneRows(laneLine);
  const listRef = useRef<HTMLOListElement>(null);

  // Une passerelle choisie ailleurs dans la page : sa ligne vient au centre de l'écran.
  useEffect(() => {
    if (!activePass) return;
    const el = listRef.current?.querySelector<HTMLElement>(".is-spot");
    el?.scrollIntoView({ behavior: "smooth", block: "center" });
  }, [activePass]);
  const trunkCount = rows.filter((r) => {
    const k = r.kind === "station" ? placedById[r.id]?.kind : null;
    return k === "trunk" || k === "option";
  }).length;
  const tabsRef = useRef<HTMLDivElement>(null);

  // Centre l'onglet actif dans sa rangée, sans faire défiler la page.
  useEffect(() => {
    const row = tabsRef.current;
    const el = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !el) return;
    row.scrollTo({
      left: el.offsetLeft - (row.clientWidth - el.clientWidth) / 2,
      behavior: "smooth",
    });
  }, [laneLine]);

  return (
    <div className="e-lanes" data-line={laneLine}>
      <div className="e-lanes__tabs" role="tablist" aria-label="Choisir une voie" ref={tabsRef}>
        {LANES.map((id) => (
          <button
            key={id}
            type="button"
            role="tab"
            aria-selected={id === laneLine}
            data-line={id}
            className="e-chip"
            onClick={() => onLaneLine(id)}
          >
            <Dot line={id} />
            {laneShort(id)}
          </button>
        ))}
      </div>

      <div className="e-lanes__head">
        <Dot line={laneLine} />
        <div>
          <p className="e-lanes__name">{laneName(laneLine)}</p>
          <p className="e-lanes__pitch">{lanePitch(laneLine)}</p>
        </div>
      </div>

      <ol
        ref={listRef}
        className="e-lanes__list"
        role="tabpanel"
        aria-label={`${laneName(laneLine)}, de la 3e au premier métier`}
        style={
          {
            ["--trunk" as string]: `${Math.round(((trunkCount - 0.5) / rows.length) * 100)}%`,
          } as CSSProperties
        }
      >
        {rows.map((r) => {
          if (r.kind === "pass") {
            const x = passerelleById[r.id];
            return (
              <li key={`p-${r.id}`} className={`e-lanes__stop is-pass${activePass === r.id ? " is-spot" : ""}`}>
                <button type="button" onClick={() => onOpenPasserelle(r.id)}>
                  <span className="e-numbadge">{x.num}</span>
                  <span>
                    <span className="e-lanes__kicker">
                      {r.out
                        ? `Passerelle vers ${laneShort(x.draw!.to)}`
                        : `Passerelle depuis ${joinFr(x.draw!.from.map(laneShort))}`}
                    </span>
                    <span className="e-lanes__title">{x.title}</span>
                  </span>
                  <Icon name="chevron-right" width={18} height={18} />
                </button>
              </li>
            );
          }
          if (r.kind === "exit") {
            return (
              <li key={`x-${r.key}`} className="e-lanes__stop is-exit">
                <button type="button" onClick={() => onOpen(r.station, laneLine)}>
                  <span className="e-lanes__mark" aria-hidden="true" />
                  <span>
                    <span className="e-lanes__title">{r.name}</span>
                    <span className="e-lanes__when">{r.age}</span>
                  </span>
                  <Icon name="chevron-right" width={18} height={18} />
                </button>
              </li>
            );
          }
          const st = stationById[r.id];
          const p = placedById[r.id];
          if (!st || !p) return null;
          const kind =
            p.kind === "trunk" || p.kind === "option"
              ? " is-trunk"
              : p.kind === "event"
                ? " is-event"
                : p.kind === "end"
                  ? " is-terminus"
                  : "";
          return (
            <li key={r.id} className={`e-lanes__stop${kind}${r.id === ici ? " is-here" : ""}`}>
              <button type="button" onClick={() => onOpen(r.id, laneLine)}>
                <span className="e-lanes__mark" aria-hidden="true" />
                <span>
                  <span className="e-lanes__title">{st.name}</span>
                  <span className="e-lanes__when">
                    {r.id === ici ? `Tu es ici. ${stepMeta(r.id, y)}` : stepMeta(r.id, y)}
                  </span>
                </span>
                <Icon name="chevron-right" width={18} height={18} />
              </button>
            </li>
          );
        })}
      </ol>
      <p className="e-lanes__dir">
        <Icon name="arrow-up" width={16} height={16} style={{ display: "inline", verticalAlign: -3 }} /> Vers :{" "}
        {laneDirection(laneLine)}.
      </p>
    </div>
  );
}
