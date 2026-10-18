"use client";

import { useEffect, useRef, useState } from "react";
import { lineById, linesByNum, type LineId } from "@/lib/etudes/lines";
import {
  ORDER,
  PLAN,
  TIME_MARKS,
  U_PATH,
  linePath,
  passPath,
  placed,
  placedById,
  routeOf,
  sideOf,
  type PlacedStation,
} from "@/lib/etudes/plan";
import { passerelles } from "@/lib/etudes/passerelles";
import { stationById } from "@/lib/etudes/stations";
import { Bullet, Icon, lineLabel } from "./ui";

type Props = {
  focusLine: LineId | null;
  route: LineId | null;
  visited: Set<string>;
  onOpen: (id: string, line: LineId | null) => void;
  onFocusLine: (line: LineId | null) => void;
  stripLine: LineId;
  onStripLine: (line: LineId) => void;
  showPass: boolean;
  onTogglePass: () => void;
  spotPass: string | null;
  onOpenPasserelle: (id: string) => void;
};

/** En dessous de cette échelle, le plan entier devient trop petit pour être lu : on passe ligne par ligne. */
const MIN_SCALE = 0.86;

export function NetworkMap(props: Props) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [width, setWidth] = useState<number | null>(null);
  const [choice, setChoice] = useState<"auto" | "plan" | "ligne">("auto");

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  const fits = width !== null && width / PLAN.W >= MIN_SCALE;
  const mode = choice === "auto" ? (width === null || fits ? "plan" : "ligne") : choice;
  const scale = fits && width ? Math.min(1, width / PLAN.W) : MIN_SCALE;

  return (
    <div ref={wrapRef} className="et-map">
      <div className="et-map__bar">
        <div className="et-seg" role="group" aria-label="Affichage du plan">
          <button
            type="button"
            className="et-seg__btn"
            aria-pressed={mode === "plan"}
            onClick={() => setChoice("plan")}
          >
            <Icon name="map" /> Plan complet
          </button>
          <button
            type="button"
            className="et-seg__btn"
            aria-pressed={mode === "ligne"}
            onClick={() => setChoice("ligne")}
          >
            <Icon name="list" /> Ligne par ligne
          </button>
        </div>
        <button
          type="button"
          className="et-chip et-chip--pass"
          aria-pressed={props.showPass}
          onClick={props.onTogglePass}
        >
          <Icon name="route" width={18} height={18} /> {props.showPass ? "Masquer les passerelles" : "Afficher les passerelles"}
        </button>
        {(props.focusLine || props.route) && mode === "plan" ? (
          <button type="button" className="et-chip" onClick={() => props.onFocusLine(null)}>
            <Icon name="close" width={16} height={16} /> Afficher toutes les lignes
          </button>
        ) : null}
      </div>

      {mode === "plan" ? (
        <div className={fits ? "et-plan-frame" : "et-plan-frame is-scroll"}>
          <div className="et-plan-sizer" style={{ width: PLAN.W * scale, height: PLAN.H * scale }}>
            <div className="et-plan" style={{ width: PLAN.W, height: PLAN.H, transform: `scale(${scale})` }}>
              <PlanDrawing {...props} />
            </div>
          </div>
        </div>
      ) : (
        <Strip {...props} />
      )}
    </div>
  );
}

/* --------------------------------------------------------------------------
   Le plan entier
   -------------------------------------------------------------------------- */

function PlanDrawing({
  focusLine,
  route,
  visited,
  onOpen,
  onFocusLine,
  showPass,
  spotPass,
  onOpenPasserelle,
}: Props) {
  const lit = route ?? focusLine;
  const drawn = showPass
    ? passerelles.flatMap((x) => {
        if (!x.draw) return [];
        const g = passPath(x.draw.from, x.to, x.draw.kind, x.draw.bend);
        return g ? [{ x, g }] : [];
      })
    : [];
  const dim = (line: LineId | undefined) => (lit && line && line !== lit ? " is-dim" : "");

  return (
    <>
      <svg className="et-plan__svg" viewBox={`0 0 ${PLAN.W} ${PLAN.H}`} width={PLAN.W} height={PLAN.H} aria-hidden="true">
        {/* Ligne U : l'université, tracée en creux */}
        <g className={lit ? "et-uline is-dim" : "et-uline"}>
          <path d={U_PATH} className="et-uline__case" />
          <path d={U_PATH} className="et-uline__core" />
        </g>

        {/* Itinéraire en or */}
        {route ? <path d={linePath(route)} className="et-route-glow" /> : null}

        {/* Les huit lignes */}
        {ORDER.map((id) => (
          <path key={id} d={linePath(id)} data-line={id} className={`et-line${dim(id)}`} />
        ))}

        {/* Repères */}
        {placed.map((p) => (
          <Marker key={p.id} p={p} visited={visited.has(p.id)} dim={Boolean(lit && p.line && p.line !== lit)} />
        ))}

        {/* Passerelles */}
        {drawn.length ? (
          <g className="et-pass">
            <defs>
              <marker id="et-pass-arrow" viewBox="0 0 10 10" refX="7" refY="5" markerWidth="5" markerHeight="5" orient="auto">
                <path d="M 0 0 L 10 5 L 0 10 z" className="et-pass__head" />
              </marker>
            </defs>
            {drawn.map(({ x, g }) => (
              <g key={x.id} className={spotPass === x.id ? "et-pass__item is-spot" : "et-pass__item"}>
                <path d={g.d} className="et-pass__case" />
                <path d={g.d} className="et-pass__path" markerEnd="url(#et-pass-arrow)" />
              </g>
            ))}
          </g>
        ) : null}

        {/* « Tu es ici » */}
        <circle className="et-here-pulse" cx={PLAN.BX} cy={PLAN.Y.college} r="30" />
      </svg>

      <TimeAxis />

      {placed.map((p) => (
        <StationButton key={p.id} p={p} lit={lit} visited={visited.has(p.id)} onOpen={onOpen} />
      ))}

      {drawn.map(({ x, g }) => (
        <button
          key={x.id}
          type="button"
          className={spotPass === x.id ? "et-pbadge is-spot" : "et-pbadge"}
          style={{ left: g.mid.x, top: g.mid.y }}
          onClick={() => onOpenPasserelle(x.id)}
          aria-label={`Passerelle ${x.num} : ${x.title}`}
        >
          {x.num}
        </button>
      ))}

      <Legend focusLine={focusLine} route={route} onFocusLine={onFocusLine} />
    </>
  );
}

function Marker({ p, visited, dim }: { p: PlacedStation; visited: boolean; dim: boolean }) {
  const cls = dim ? " is-dim" : "";
  switch (p.kind) {
    case "trunk":
      return (
        <g className="et-mk">
          <rect
            className={p.id === "college" ? "et-mk__trunk et-mk__trunk--here" : "et-mk__trunk"}
            x={PLAN.BX - 48}
            y={p.y - 14}
            width={96}
            height={28}
            rx={14}
          />
          {visited ? <circle className="et-mk__stamp" cx={PLAN.BX} cy={p.y} r={4} /> : null}
        </g>
      );
    case "tick": {
      const outward = p.line && sideOf(p.line) === "left" ? -1 : 1;
      return (
        <g className={`et-mk${cls}`} data-line={p.line}>
          <line className="et-mk__tick" x1={p.x} y1={p.y} x2={p.x + outward * 16} y2={p.y} />
        </g>
      );
    }
    case "u":
      if (!p.line) {
        return (
          <g className={`et-mk${cls}`}>
            <rect className="et-mk__uhub" x={p.x - 20} y={p.y - 20} width={40} height={40} rx={10} />
            <text className="et-mk__uhub-text" x={p.x} y={p.y + 1}>
              U
            </text>
          </g>
        );
      }
      return (
        <g className={`et-mk${cls}`}>
          <circle className="et-mk__inter" cx={p.x} cy={p.y} r={11} />
          {visited ? <circle className="et-mk__stamp" cx={p.x} cy={p.y} r={4} /> : null}
        </g>
      );
    case "terminus":
      return (
        <g className={`et-mk${cls}`} data-line={p.line}>
          <circle className="et-mk__term" cx={p.x} cy={p.y} r={19} />
          <text className="et-mk__term-text" x={p.x} y={p.y + 1}>
            {p.line ? lineById[p.line].num : ""}
          </text>
        </g>
      );
    default:
      return (
        <g className={`et-mk${cls}`} data-line={p.line}>
          <circle className="et-mk__stop" cx={p.x} cy={p.y} r={8.5} />
          {visited ? <circle className="et-mk__stamp et-mk__stamp--line" cx={p.x} cy={p.y} r={3.5} /> : null}
        </g>
      );
  }
}

function StationButton({
  p,
  lit,
  visited,
  onOpen,
}: {
  p: PlacedStation;
  lit: LineId | null;
  visited: boolean;
  onOpen: (id: string, line: LineId | null) => void;
}) {
  const st = stationById[p.id];
  if (!st) return null;
  const dim = lit && p.line && p.line !== lit;
  const servedBy = p.line ? `, ${lineLabel(p.line)}` : p.kind === "trunk" ? ", toutes les lignes" : ", ligne U";
  const aria = `${st.name}${servedBy}${visited ? ", déjà visitée" : ""}`;

  let style: React.CSSProperties;
  let align: "left" | "right" | "center";
  let extra = "";

  if (p.kind === "trunk") {
    style = { left: p.x - 330, top: p.y - 24, width: 330 + 50 };
    align = "right";
    extra = " et-st--trunk";
  } else if (p.kind === "tick") {
    const left = p.line ? sideOf(p.line) === "left" : true;
    style = left ? { left: p.x - 250, top: p.y - 22, width: 262 } : { left: p.x - 12, top: p.y - 22, width: 262 };
    align = left ? "right" : "left";
    extra = " et-st--tick";
  } else if (p.kind === "terminus") {
    style = { left: Math.max(4, p.x - 68), top: p.y - 22, width: 136 };
    align = "center";
    extra = " et-st--terminus";
  } else if (p.kind === "u" && !p.line) {
    style = { left: 0, top: p.y - 92, width: 84, height: 116 };
    align = "center";
    extra = " et-st--uhub";
  } else if (p.kind === "u") {
    const left = p.line ? sideOf(p.line) === "left" : true;
    style = left ? { left: p.x - 16, top: p.y - 16, width: 140 } : { left: p.x - 124, top: p.y - 16, width: 140 };
    align = left ? "left" : "right";
    extra = " et-st--inter";
  } else {
    const left = p.line ? sideOf(p.line) === "left" : true;
    style = left ? { left: p.x - 16, top: p.y - 22, width: 140 } : { left: p.x - 124, top: p.y - 22, width: 140 };
    align = left ? "left" : "right";
  }

  return (
    <button
      type="button"
      className={`et-st et-st--${align}${extra}${dim ? " is-dim" : ""}${visited ? " is-visited" : ""}`}
      style={style}
      data-line={p.line}
      aria-label={aria}
      onClick={() => onOpen(p.id, p.line ?? null)}
    >
      <span className="et-st__name">{st.label}</span>
      {st.sub ? <span className="et-st__sub">{st.sub}</span> : null}
    </button>
  );
}

function TimeAxis() {
  return (
    <ol className="et-time" aria-hidden="true">
      {TIME_MARKS.map((m) => (
        <li key={m.y} className="et-time__mark" style={{ top: m.y - 18 }}>
          {m.age ? <span className="et-time__age">{m.age}</span> : null}
          <span className="et-time__when">{m.when}</span>
        </li>
      ))}
    </ol>
  );
}

function Legend({
  focusLine,
  route,
  onFocusLine,
}: {
  focusLine: LineId | null;
  route: LineId | null;
  onFocusLine: (line: LineId | null) => void;
}) {
  const active = route ?? focusLine;
  return (
    <div className="et-legend">
      <p className="et-legend__title">Les lignes</p>
      <ul className="et-legend__list">
        {linesByNum.map((l) => (
          <li key={l.id}>
            <button
              type="button"
              className="et-legend__item"
              data-line={l.id}
              aria-pressed={active === l.id}
              onClick={() => onFocusLine(active === l.id ? null : l.id)}
            >
              <Bullet line={l.id} />
              <span>{l.name}</span>
            </button>
          </li>
        ))}
      </ul>
      <p className="et-legend__u">
        <Bullet line="u" /> <span>La ligne U, l&apos;université, croise toutes les autres : à chaque croisement, on peut changer de direction.</span>
      </p>
      <p className="et-legend__u">
        <span className="et-legend__pass" aria-hidden="true" />
        <span>Les passerelles en or relient les lignes entre elles. Affiche-les avec le bouton au-dessus du plan.</span>
      </p>
      <p className="et-legend__hint">Touche une station pour ouvrir sa fiche.</p>
    </div>
  );
}

/* --------------------------------------------------------------------------
   Ligne par ligne (petits écrans, ou au choix)
   -------------------------------------------------------------------------- */

function Strip({ stripLine, onStripLine, visited, onOpen }: Props) {
  const line = lineById[stripLine];
  const stops = routeOf(stripLine);
  const tabsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = tabsRef.current?.querySelector<HTMLElement>('[aria-selected="true"]');
    el?.scrollIntoView({ block: "nearest", inline: "center", behavior: "smooth" });
  }, [stripLine]);

  return (
    <div className="et-strip" data-line={stripLine}>
      <div className="et-strip__tabs" role="tablist" aria-label="Choisir une ligne" ref={tabsRef}>
        {linesByNum.map((l) => (
          <button
            key={l.id}
            type="button"
            role="tab"
            aria-selected={l.id === stripLine}
            data-line={l.id}
            className="et-strip__tab"
            onClick={() => onStripLine(l.id)}
          >
            <Bullet line={l.id} />
            <span>{l.short}</span>
          </button>
        ))}
      </div>

      <div className="et-strip__head">
        <Bullet line={stripLine} size="xl" />
        <div>
          <p className="et-strip__name">{line.name}</p>
          <p className="et-strip__pitch">{line.pitch}</p>
        </div>
      </div>

      <ol className="et-strip__list" role="tabpanel" aria-label={line.name}>
        {stops.map((id) => {
          const st = stationById[id];
          const p = placedById[id];
          if (!st || !p) return null;
          const nPass = passerelles.filter((x) => x.from.includes(id) || x.to === id).length;
          return (
            <li
              key={id}
              className={`et-strip__stop is-${p.kind}${visited.has(id) ? " is-visited" : ""}${id === "college" ? " is-here" : ""}`}
            >
              <button type="button" className="et-strip__btn" onClick={() => onOpen(id, stripLine)}>
                <span className="et-strip__dot" aria-hidden="true" />
                <span className="et-strip__text">
                  <span className="et-strip__title">{st.name}</span>
                  <span className="et-strip__when">{st.when}</span>
                </span>
                {p.kind === "trunk" ? <span className="et-strip__tag">Tronc commun</span> : null}
                {p.kind === "u" ? (
                  <span className="et-strip__tag">
                    <Bullet line="u" size="sm" /> Université
                  </span>
                ) : nPass ? (
                  <span className="et-strip__tag et-strip__tag--pass">
                    <Icon name="route" width={14} height={14} /> {nPass} {nPass > 1 ? "passerelles" : "passerelle"}
                  </span>
                ) : null}
                <Icon name="chevron-right" className="et-strip__chev" />
              </button>
            </li>
          );
        })}
      </ol>
      <p className="et-strip__dir">
        Direction : {line.direction}.
      </p>
    </div>
  );
}

