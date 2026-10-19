"use client";

import { useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import {
  BAC_T,
  METRO_PASS,
  STOPS,
  metroLineById,
  sousTitre,
  stopById,
  type MetroLineId,
  type Stop,
} from "@/lib/etudes/metro";
import { LINE_ORDER, LINE_Y, MAP, linePath, stopXY, tx } from "./geometry";

const CARD_W = 372;

type Props = {
  sel: string | null;
  onSelect: (id: string | null) => void;
  focus: MetroLineId | null;
  onFocus: (line: MetroLineId | null) => void;
  alternance: boolean;
  passerelles: boolean;
  onOpenPass: (id: string) => void;
  /** Les étapes d'un trajet vers un métier : les autres pâlissent. */
  route: Set<string> | null;
  /** L'étape où se trouve l'élève, ou « 4e » avant la carte. */
  ici: string | null;
  year: (t: number) => number;
  card: ReactNode;
};

export function laneVar(line: MetroLineId): string {
  if (line === "tronc") return "var(--ink)";
  const lane = metroLineById[line].lane;
  return lane === "u" ? "var(--ink)" : `var(--l-${lane})`;
}

/** Le plan de métro des études, sur grand écran. */
export function MetroDesktop(props: Props) {
  const { sel, onSelect, focus, onFocus, alternance, passerelles, onOpenPass, route, ici, year, card } = props;
  const wrapRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);

  // La fiche s'ouvre à côté de la station, toujours dans le cadre de la carte.
  useLayoutEffect(() => {
    if (!sel) {
      setPos(null);
      return;
    }
    const wrap = wrapRef.current;
    const node = wrap?.querySelector<SVGGElement>(`[data-stop="${sel}"] .e-mstop__dot`);
    if (!wrap || !node) return;
    const w = wrap.getBoundingClientRect();
    const r = node.getBoundingClientRect();
    const cx = r.left + r.width / 2 - w.left + wrap.scrollLeft;
    const cy = r.top + r.height / 2 - w.top;
    const h = cardRef.current?.offsetHeight ?? 360;
    const room = wrap.clientWidth + wrap.scrollLeft;
    const left = cx + 28 + CARD_W < room ? cx + 28 : Math.max(8 + wrap.scrollLeft, cx - 28 - CARD_W);
    const top = Math.min(Math.max(8, cy - 90), Math.max(8, wrap.clientHeight - h - 8));
    setPos({ left, top });
  }, [sel, card]);

  function dim(line: MetroLineId, id?: string): boolean {
    if (route) return id ? !route.has(id) : !STOPS.some((s) => s.line === line && route.has(s.id));
    return Boolean(focus && line !== "tronc" && line !== focus);
  }

  function onKey(e: KeyboardEvent<SVGGElement>, id: string) {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSelect(id);
    }
  }

  const yAxis = 52;
  const ticks = Array.from({ length: 13 }, (_, t) => t);
  // Les passerelles qui partent au même moment s'écartent un peu les unes des autres.
  const passOffsets = new Map<string, number>();
  for (const t of [...new Set(METRO_PASS.map((p) => p.t))]) {
    const group = METRO_PASS.filter((p) => p.t === t);
    group.forEach((p, i) => passOffsets.set(p.id, (i - (group.length - 1) / 2) * 16));
  }

  return (
    <div className="e-mdesk" ref={wrapRef} onKeyDown={(e) => e.key === "Escape" && sel && onSelect(null)}>
      <svg
        className="e-mdesk__svg"
        viewBox={`0 0 ${MAP.W} ${MAP.H}`}
        role="group"
        aria-label="Plan des études, de la 3e au premier métier"
        onClick={(e) => {
          if (e.target === e.currentTarget) onSelect(null);
        }}
      >
        <defs>
          <marker id="m-arrow" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto">
            <path d="M2 1L8 5L2 9" fill="none" stroke="context-stroke" strokeWidth="1.6" strokeLinecap="round" />
          </marker>
        </defs>

        {/* L'axe du temps */}
        <g className="e-maxis" aria-hidden="true">
          {ticks.map((t) => (
            <g key={t} transform={`translate(${tx(t)} 0)`}>
              <line y1={yAxis + 10} y2={MAP.H - 34} className="e-maxis__grid" />
              <text y={yAxis} textAnchor="middle" className="e-maxis__year">
                {year(t)}
              </text>
              {t > BAC_T ? (
                <text y={yAxis + 20} textAnchor="middle" className="e-maxis__step">
                  bac+{t - BAC_T}
                </text>
              ) : null}
            </g>
          ))}
        </g>

        {/* Les lignes */}
        <path d={`M${tx(0)} ${LINE_Y.tronc} H ${tx(BAC_T)}`} className="e-mline" style={{ stroke: laneVar("tronc") }} />
        {LINE_ORDER.map((line) => (
          <g key={line} className={dim(line) ? "e-mline-g is-dim" : "e-mline-g"}>
            <path d={linePath(line)} className="e-mline" style={{ stroke: laneVar(line) }} />
            <path
              d={linePath(line)}
              className="e-mline__hit"
              onClick={() => onFocus(focus === line ? null : line)}
              aria-hidden="true"
            />
          </g>
        ))}

        {/* L'alternance, le long des étapes qui s'y prêtent */}
        {alternance
          ? STOPS.filter((s) => s.alternance && typeof s.t1 === "number").map((s) => {
              const y = LINE_Y[s.line];
              const x0 = Math.max(tx(s.t0), tx(BAC_T) + MAP.CURVE);
              return <line key={s.id} x1={x0 + 6} x2={tx(s.t1 as number) - 6} y1={y} y2={y} className="e-malt" />;
            })
          : null}

        {/* Les passerelles */}
        {passerelles
          ? METRO_PASS.map((p) => {
              const a = stopById[p.from];
              const b = stopById[p.to];
              if (!a || !b) return null;
              const x = tx(p.t) + (passOffsets.get(p.id) ?? 0);
              const y1 = LINE_Y[a.line];
              const y2 = LINE_Y[b.line];
              const dir = y2 > y1 ? 1 : -1;
              return (
                <g
                  key={p.id}
                  className="e-mpass"
                  role="button"
                  tabIndex={0}
                  aria-label={`Passerelle\u202f: ${a.label} vers ${b.label}`}
                  onClick={() => onOpenPass(p.id)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      onOpenPass(p.id);
                    }
                  }}
                >
                  <path
                    d={`M${x - 10} ${y1 + dir * 7} C ${x - 4} ${(y1 + y2) / 2} ${x + 4} ${(y1 + y2) / 2} ${x + 10} ${y2 - dir * 12}`}
                    className="e-mpass__line"
                    markerEnd="url(#m-arrow)"
                  />
                  <path
                    d={`M${x - 10} ${y1 + dir * 7} C ${x - 4} ${(y1 + y2) / 2} ${x + 4} ${(y1 + y2) / 2} ${x + 10} ${y2 - dir * 12}`}
                    className="e-mpass__hit"
                  />
                </g>
              );
            })
          : null}

        {/* La classe de 4e, juste avant la carte */}
        {ici === "4e" ? (
          <g className="e-mici" aria-hidden="true">
            <line x1={tx(-0.75)} x2={tx(0)} y1={LINE_Y.tronc} y2={LINE_Y.tronc} className="e-mline e-mline--stub" />
            <circle cx={tx(-0.5)} cy={LINE_Y.tronc} r="16" className="e-mici__pulse" />
            <circle cx={tx(-0.5)} cy={LINE_Y.tronc} r="8" className="e-mici__dot" />
            <text x={tx(-0.5)} y={LINE_Y.tronc - 26} textAnchor="middle" className="e-mlabel">
              4e
            </text>
            <text x={tx(-0.5)} y={LINE_Y.tronc + 32} textAnchor="middle" className="e-mici__label">
              Tu es ici
            </text>
          </g>
        ) : null}

        {/* Les stations */}
        {STOPS.map((s) => (
          <StopMark
            key={s.id}
            s={s}
            selected={sel === s.id}
            here={ici === s.id}
            dim={dim(s.line, s.id)}
            alt={alternance && Boolean(s.alternance)}
            onSelect={onSelect}
            onKey={onKey}
          />
        ))}
      </svg>

      {sel && card ? (
        <div
          ref={cardRef}
          className="e-mcard-pop"
          style={pos ? { left: pos.left, top: pos.top } : { visibility: "hidden" }}
          role="dialog"
          aria-label={stopById[sel]?.label}
        >
          {card}
        </div>
      ) : null}
    </div>
  );
}

function StopMark({
  s,
  selected,
  here,
  dim,
  alt,
  onSelect,
  onKey,
}: {
  s: Stop;
  selected: boolean;
  here: boolean;
  dim: boolean;
  alt: boolean;
  onSelect: (id: string) => void;
  onKey: (e: KeyboardEvent<SVGGElement>, id: string) => void;
}) {
  const { x, y } = stopXY(s);
  const color = laneVar(s.line);
  const below = s.kind !== "etape";
  const labelLeft = s.id === "bac";
  const cls = ["e-mstop", `is-${s.kind}`, selected ? "is-sel" : "", dim ? "is-dim" : "", alt ? "is-alt" : ""]
    .filter(Boolean)
    .join(" ");
  const sub = sousTitre(s);
  const name = [s.label, sub].filter(Boolean).join(", ");
  return (
    <g
      className={cls}
      data-stop={s.id}
      role="button"
      tabIndex={0}
      aria-pressed={selected}
      aria-label={here ? `${name}, tu es ici` : name}
      onClick={() => onSelect(s.id)}
      onKeyDown={(e) => onKey(e, s.id)}
      style={{ color }}
    >
      <circle cx={x} cy={y} r="24" className="e-mstop__hit" />
      {here ? <circle cx={x} cy={y} r="17" className="e-mici__pulse" /> : null}
      {alt ? <circle cx={x} cy={y} r="15" className="e-mstop__halo" /> : null}
      {s.kind === "terminus" ? (
        <rect x={x - 9} y={y - 9} width="18" height="18" rx="5" className="e-mstop__dot" />
      ) : (
        <circle cx={x} cy={y} r={s.kind === "choix" ? 11 : 8.5} className="e-mstop__dot" />
      )}
      {below ? (
        <text
          x={labelLeft ? x - 14 : x}
          y={labelLeft ? y + 38 : y + 34}
          textAnchor={labelLeft ? "end" : "middle"}
          className="e-mlabel"
        >
          {s.label}
        </text>
      ) : (
        <>
          <text x={x} y={y - 30} textAnchor="middle" className="e-mlabel">
            {s.label}
          </text>
          {sub ? (
            <text x={x} y={y - 14} textAnchor="middle" className="e-mlabel__sub">
              {sub}
            </text>
          ) : null}
        </>
      )}
      {here ? (
        <text x={x} y={y + 34} textAnchor="middle" className="e-mici__label">
          Tu es ici
        </text>
      ) : null}
    </g>
  );
}
