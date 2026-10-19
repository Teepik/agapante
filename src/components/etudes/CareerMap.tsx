"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { lineById, linesByNum, type LineId } from "@/lib/etudes/lines";
import {
  ORDER,
  PLAN,
  TIME_MARKS,
  U_PATH,
  laneX,
  linePath,
  passPath,
  placed,
  placedById,
  routeOf,
  type PlacedStation,
} from "@/lib/etudes/plan";
import { passerelles } from "@/lib/etudes/passerelles";
import { stationById } from "@/lib/etudes/stations";
import { Dot, Icon } from "./ui";

type Props = {
  focusLine: LineId | null;
  route: LineId | null;
  onOpen: (id: string, line: LineId | null) => void;
  onFocusLine: (line: LineId | null) => void;
  laneLine: LineId;
  onLaneLine: (line: LineId) => void;
  showPass: boolean;
  onTogglePass: () => void;
  spotPass: string | null;
  onOpenPasserelle: (id: string) => void;
};

/** Les options du lycée, posées à côté de la 2nde. */
const OPTION_LABEL: Record<string, string> = {
  "lycee-defense": "Lycée de la Défense",
  conservatoire: "Conservatoire",
};

/** En dessous de cette échelle, la carte entière devient trop petite pour être lue : on passe voie par voie. */
const MIN_SCALE = 0.8;

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
    <div className={`e-map${lit ? " is-focus" : ""}${props.showPass ? " is-pass" : ""}`}>
      <div className="e-wrap">
        <div className="e-map__bar">
          {mode === "carte" ? (
            <div className="e-map__filters" role="group" aria-label="Mettre une voie en avant">
              <button type="button" className="e-chip" aria-pressed={!lit} onClick={() => props.onFocusLine(null)}>
                Toutes les voies
              </button>
              {linesByNum.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  className="e-chip"
                  data-line={l.id}
                  aria-pressed={lit === l.id}
                  onClick={() => {
                    props.onFocusLine(lit === l.id ? null : l.id);
                    props.onLaneLine(l.id);
                  }}
                >
                  <Dot line={l.id} />
                  {l.short}
                </button>
              ))}
            </div>
          ) : null}
          <div className="e-map__tools">
            {mode === "carte" ? (
              <button
                type="button"
                role="switch"
                aria-checked={props.showPass}
                className="e-switch"
                onClick={props.onTogglePass}
              >
                <span className="e-switch__track" aria-hidden="true" />
                Passerelles
              </button>
            ) : null}
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

      <div className="e-map__frame" ref={frameRef}>
        {mode === "carte" ? (
          <div style={fits ? undefined : { overflowX: "auto", paddingBottom: 12 }}>
            <div className="e-map__sizer" style={{ width: PLAN.W * scale, height: PLAN.H * scale }}>
              <div className="e-map__canvas" style={{ width: PLAN.W, height: PLAN.H, transform: `scale(${scale})` }}>
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
  lit,
  onOpen,
  onFocusLine,
  showPass,
  spotPass,
  onOpenPasserelle,
}: Props & { lit: LineId | null }) {
  const drawn = showPass
    ? passerelles.flatMap((x) => {
        if (!x.draw) return [];
        const g = passPath(x.draw.from, x.to, x.draw.kind, x.draw.via);
        return g ? [{ x, g }] : [];
      })
    : [];
  const dimLine = (line: LineId | undefined) => Boolean(lit && line && line !== lit);

  return (
    <>
      <svg className="e-map__svg" viewBox={`0 0 ${PLAN.W} ${PLAN.H}`} width={PLAN.W} height={PLAN.H} aria-hidden="true">
        {route ? <path d={linePath(route)} data-line={route} className="e-route-halo" /> : null}

        {ORDER.map((id) => (
          <path key={id} d={linePath(id)} data-line={id} className={dimLine(id) ? "e-lane is-dim" : "e-lane"} />
        ))}

        <g className="e-uline">
          <path d={U_PATH} className="e-uline__case" />
          <path d={U_PATH} className="e-uline__core" />
        </g>

        {drawn.length ? (
          <g className="e-pass">
            <defs>
              <marker
                id="e-pass-arrow"
                viewBox="0 0 10 10"
                refX="8"
                refY="5"
                markerWidth="5"
                markerHeight="5"
                orient="auto"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" className="e-pass__head" />
              </marker>
            </defs>
            {drawn.map(({ x, g }) => (
              <g key={x.id} className={`e-pass__item${spotPass === x.id ? " is-spot" : spotPass ? " is-off" : ""}`}>
                <path d={g.d} className="e-pass__case" />
                <path d={g.d} className="e-pass__path" markerEnd="url(#e-pass-arrow)" />
              </g>
            ))}
          </g>
        ) : null}

        {placed.map((p) => (
          <Marker key={p.id} p={p} dim={dimLine(p.line)} />
        ))}
      </svg>

      <ol className="e-time" aria-hidden="true">
        {TIME_MARKS.map((m) => (
          <li key={m.y} style={{ top: m.y - 15 }}>
            <span className="e-time__age">{m.age}</span>
            <span className="e-time__when">{m.when}</span>
          </li>
        ))}
      </ol>

      {ORDER.map((id) => (
        <button
          key={id}
          type="button"
          className={dimLine(id) ? "e-colhead is-dim" : "e-colhead"}
          style={{ left: laneX(id) - 13, top: 10 }}
          data-line={id}
          aria-pressed={lit === id}
          onClick={() => onFocusLine(lit === id ? null : id)}
        >
          <Dot line={id} />
          <span>{lineById[id].name}</span>
        </button>
      ))}

      {placed.map((p) =>
        p.kind === "option" ? null : <StationButton key={p.id} p={p} dim={dimLine(p.line)} onOpen={onOpen} />,
      )}

      <div className="e-opts" style={{ right: PLAN.W - (PLAN.BX - 236), top: PLAN.Y.seconde - 14 }}>
        {placed
          .filter((p) => p.kind === "option")
          .map((p) => (
            <button
              key={p.id}
              type="button"
              className={dimLine(p.line) ? "e-opt is-dim" : "e-opt"}
              data-line={p.line}
              aria-label={stationById[p.id]?.name}
              onClick={() => onOpen(p.id, p.line ?? null)}
            >
              <Dot line={p.line!} />
              {OPTION_LABEL[p.id] ?? stationById[p.id]?.label}
            </button>
          ))}
      </div>

      {drawn.map(({ x, g }) => (
        <button
          key={x.id}
          type="button"
          className={spotPass === x.id ? "e-pbadge is-spot" : "e-pbadge"}
          style={{ left: g.mid.x, top: g.mid.y }}
          onClick={() => onOpenPasserelle(x.id)}
          aria-label={`Passerelle ${x.num} : ${x.title}`}
        >
          {x.num}
        </button>
      ))}

      <Legend />
    </>
  );
}

function Marker({ p, dim }: { p: PlacedStation; dim: boolean }) {
  const cls = dim ? "e-mk is-dim" : "e-mk";
  switch (p.kind) {
    case "trunk":
      return (
        <rect
          className={p.id === "college" ? "e-mk__trunk e-mk__trunk--here" : "e-mk__trunk"}
          x={PLAN.BX - 49}
          y={p.y - 13}
          width={98}
          height={26}
          rx={13}
        />
      );
    case "option":
      return null;
    case "u":
      if (!p.line) {
        return (
          <g className={cls}>
            <rect className="e-mk__hub" x={p.x - 16} y={p.y - 16} width={32} height={32} rx={9} />
            <text className="e-mk__hub-text" x={p.x} y={p.y + 1}>
              U
            </text>
          </g>
        );
      }
      return (
        <g className={cls} data-line={p.line}>
          <circle className="e-mk__inter" cx={p.x} cy={p.y} r={9} />
          <circle className="e-mk__inter-core" cx={p.x} cy={p.y} r={3.5} />
        </g>
      );
    case "terminus":
      return (
        <g className={cls} data-line={p.line}>
          <circle className="e-mk__term" cx={p.x} cy={p.y} r={10} />
        </g>
      );
    default:
      return (
        <g className={cls} data-line={p.line}>
          <circle className="e-mk__stop" cx={p.x} cy={p.y} r={6.5} />
        </g>
      );
  }
}

function StationButton({
  p,
  dim,
  onOpen,
}: {
  p: PlacedStation;
  dim: boolean;
  onOpen: (id: string, line: LineId | null) => void;
}) {
  const st = stationById[p.id];
  if (!st) return null;
  const served = p.line ? `, ${lineById[p.line].name}` : p.kind === "trunk" ? ", tronc commun" : ", université";

  let style: CSSProperties;
  let kind: string;
  if (p.kind === "trunk") {
    kind = "trunk";
    style = { left: PLAN.BX - 380, top: p.y - 24, width: 380 + 49, paddingRight: 112 };
  } else if (p.kind === "u" && !p.line) {
    kind = "hub";
    style = { left: 0, top: p.y - 46, width: 96, textAlign: "center", paddingBottom: 40 };
  } else if (p.kind === "u") {
    kind = "u";
    style = { left: p.x - 12, top: p.y - 6, width: 146 };
  } else if (p.kind === "terminus") {
    kind = "terminus";
    style = { left: p.x - 12, top: p.y - 15, width: 150 };
  } else {
    kind = "stop";
    style = { left: p.x - 12, top: p.y - 14, width: 148 };
  }

  return (
    <button
      type="button"
      className={`e-st e-st--${kind}${dim ? " is-dim" : ""}`}
      style={style}
      data-line={p.line}
      aria-label={`${st.name}${served}`}
      onClick={() => onOpen(p.id, p.line ?? null)}
    >
      <span className="e-st__name">{st.label}</span>
      {st.sub && kind !== "hub" ? <span className="e-st__sub">{st.sub}</span> : null}
    </button>
  );
}

function Legend() {
  return (
    <ul className="e-legend" style={{ left: 790, top: 724 }}>
      <li>
        <svg viewBox="0 0 34 20" aria-hidden="true">
          <rect x="1" y="3" width="32" height="14" rx="7" fill="var(--ink)" />
        </svg>
        <span>
          <strong>Tu es ici :</strong> la 3e, en 2026-2027. Le parcours monte, de ta classe jusqu&apos;au premier
          métier.
        </span>
      </li>
      <li>
        <svg viewBox="0 0 34 20" aria-hidden="true">
          <path d="M2 10h30" stroke="var(--ink)" strokeWidth="3" strokeLinecap="round" />
          <circle cx="17" cy="10" r="6" fill="var(--paper)" stroke="var(--ink)" strokeWidth="2.5" />
        </svg>
        <span>
          <strong>La ligne U</strong>, l&apos;université, croise toutes les voies : à chaque croisement, on peut changer
          de direction.
        </span>
      </li>
      <li>
        <svg viewBox="0 0 34 20" aria-hidden="true">
          <path d="M2 10h30" stroke="var(--ink)" strokeWidth="2.5" strokeLinecap="round" strokeDasharray="0.5 6" />
        </svg>
        <span>
          <strong>Les passerelles</strong> relient les voies entre elles. Affiche-les avec le bouton au-dessus de la
          carte.
        </span>
      </li>
      <li>
        <svg viewBox="0 0 34 20" aria-hidden="true">
          <circle cx="17" cy="10" r="6" fill="var(--paper)" stroke="var(--slate)" strokeWidth="3" />
        </svg>
        <span>Touche une étape pour ouvrir sa fiche.</span>
      </li>
    </ul>
  );
}

/* --------------------------------------------------------------------------
   Voie par voie (petits écrans, ou au choix)
   -------------------------------------------------------------------------- */

function Lanes({ laneLine, onLaneLine, onOpen }: Props) {
  const line = lineById[laneLine];
  const stops = routeOf(laneLine);
  const trunkCount = stops.filter((id) => placedById[id]?.kind === "trunk" || placedById[id]?.kind === "option").length;
  const tabsRef = useRef<HTMLDivElement>(null);

  // Centre l'onglet actif dans sa rangée, sans faire défiler la page.
  useEffect(() => {
    const row = tabsRef.current;
    const el = row?.querySelector<HTMLElement>('[aria-selected="true"]');
    if (!row || !el) return;
    row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.clientWidth) / 2, behavior: "smooth" });
  }, [laneLine]);

  return (
    <div className="e-lanes" data-line={laneLine}>
      <div className="e-lanes__tabs" role="tablist" aria-label="Choisir une voie" ref={tabsRef}>
        {linesByNum.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={l.id === laneLine}
            data-line={l.id}
            className="e-chip"
            onClick={() => onLaneLine(l.id)}
          >
            <Dot line={l.id} />
            {l.short}
          </button>
        ))}
      </div>

      <div className="e-lanes__head">
        <Dot line={laneLine} />
        <div>
          <p className="e-lanes__name">{line.name}</p>
          <p className="e-lanes__pitch">{line.pitch}</p>
        </div>
      </div>

      <ol
        className="e-lanes__list"
        role="tabpanel"
        aria-label={`${line.name}, de la 3e au premier métier`}
        style={{ ["--trunk" as string]: `${Math.round(((trunkCount - 0.5) / stops.length) * 100)}%` }}
      >
        {stops.map((id) => {
          const st = stationById[id];
          const p = placedById[id];
          if (!st || !p) return null;
          const cls =
            p.kind === "trunk" || p.kind === "option"
              ? " is-trunk"
              : p.kind === "u"
                ? " is-u"
                : p.kind === "terminus"
                  ? " is-terminus"
                  : "";
          return (
            <li key={id} className={`e-lanes__stop${cls}${id === "college" ? " is-here" : ""}`}>
              <button type="button" onClick={() => onOpen(id, laneLine)}>
                <span className="e-lanes__mark" aria-hidden="true" />
                <span>
                  <span className="e-lanes__title">{st.name}</span>
                  <span className="e-lanes__when">{st.when}</span>
                </span>
                <Icon name="chevron-right" width={18} height={18} />
              </button>
            </li>
          );
        })}
      </ol>
      <p className="e-lanes__dir">
        <Icon name="arrow-up" width={16} height={16} style={{ display: "inline", verticalAlign: -3 }} /> Vers :{" "}
        {line.direction}.
      </p>
    </div>
  );
}
