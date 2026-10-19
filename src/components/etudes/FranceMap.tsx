"use client";

import { useState } from "react";
import { FRANCE_VIEW, project, regions } from "@/lib/etudes/france";
import type { Lycee } from "@/lib/etudes/lycees";

const WEST = new Set(["52", "53", "28", "24"]);

/** Zoom sur Paris et l'Île-de-France : cadrage calculé sur les lycées présents. */
const INSET = { w: 300, h: 170 };
function insetProjection(items: Lycee[]) {
  const lats = items.map((l) => l.lat);
  const lons = items.map((l) => l.lon);
  const lat0 = Math.min(...lats, 48.8) - 0.02;
  const lat1 = Math.max(...lats, 48.9) + 0.02;
  const lon0 = Math.min(...lons, 2.25) - 0.03;
  const lon1 = Math.max(...lons, 2.42) + 0.03;
  const c = Math.cos((((lat0 + lat1) / 2) * Math.PI) / 180);
  const s = Math.min(INSET.w / ((lon1 - lon0) * c), INSET.h / (lat1 - lat0));
  const ox = (INSET.w - (lon1 - lon0) * c * s) / 2;
  const oy = (INSET.h - (lat1 - lat0) * s) / 2;
  return (lat: number, lon: number) => ({
    x: ox + (lon - lon0) * c * s,
    y: oy + (lat1 - lat) * s,
  });
}

/** Écarte les points qui se chevauchent, en gardant leur position réelle pour un trait de rappel. */
function relax(points: { id: string; x: number; y: number }[], min = 14) {
  const p = points.map((q) => ({ ...q, ox: q.x, oy: q.y }));
  for (let it = 0; it < 80; it++) {
    for (let i = 0; i < p.length; i++) {
      for (let j = i + 1; j < p.length; j++) {
        let dx = p[j].x - p[i].x;
        let dy = p[j].y - p[i].y;
        let d = Math.hypot(dx, dy);
        if (d >= min) continue;
        if (d < 0.01) {
          const a = (j * 2.39996) % (Math.PI * 2);
          dx = Math.cos(a);
          dy = Math.sin(a);
          d = 1;
        }
        const push = (min - d) / 2;
        p[i].x -= (dx / d) * push;
        p[i].y -= (dy / d) * push;
        p[j].x += (dx / d) * push;
        p[j].y += (dy / d) * push;
      }
    }
  }
  return p;
}

export function FranceMap({
  items,
  visible,
  hot,
  onHot,
  onOpen,
}: {
  items: Lycee[];
  visible: Set<string>;
  hot: string | null;
  onHot: (id: string | null) => void;
  onOpen: (id: string) => void;
}) {
  const [tip, setTip] = useState<{
    x: number;
    y: number;
    name: string;
    inset: boolean;
  } | null>(null);
  const idf = items.filter((l) => l.zone === "paris" || l.zone === "idf");
  const outside = items.filter((l) => l.zone !== "paris" && l.zone !== "idf");
  const paris = project(48.8566, 2.3522);

  function dot(l: Lycee, x: number, y: number, inset: boolean) {
    const off = !visible.has(l.id);
    return (
      <circle
        key={l.id}
        cx={x}
        cy={y}
        r={hot === l.id ? 8 : 5.5}
        className={`e-france__dot${l.statut === "public" || l.statut === "defense" ? " e-france__dot--public" : ""}${off ? " is-off" : ""}`}
        onMouseEnter={() => {
          onHot(l.id);
          setTip({ x, y, name: l.short ?? l.name, inset });
        }}
        onMouseLeave={() => {
          onHot(null);
          setTip(null);
        }}
        onClick={() => onOpen(l.id)}
      >
        <title>{`${l.name}, ${l.ville}`}</title>
      </circle>
    );
  }

  return (
    <div className="e-france">
      <div className="e-france__map">
        <div style={{ position: "relative" }}>
          <svg
            viewBox={`0 0 ${FRANCE_VIEW.w} ${FRANCE_VIEW.h}`}
            aria-label="Carte de France des lycées de l'annuaire"
            role="img"
          >
            {regions.map((r) => (
              <path
                key={r.code}
                d={r.d}
                className={WEST.has(r.code) ? "e-france__region is-west" : "e-france__region"}
              />
            ))}
            {idf.length ? (
              <g>
                <circle cx={paris.x} cy={paris.y} r={9} className="e-france__home" />
                <text x={paris.x + 13} y={paris.y - 8} className="e-france__label">
                  Paris, en zoom ci-dessous
                </text>
              </g>
            ) : null}
            {outside.map((l) => {
              const p = project(l.lat, l.lon);
              return dot(l, p.x, p.y, false);
            })}
          </svg>
          {tip && !tip.inset ? (
            <span
              className="e-france__tip"
              style={{
                left: `${(tip.x / FRANCE_VIEW.w) * 100}%`,
                top: `calc(${(tip.y / FRANCE_VIEW.h) * 100}% + 16px)`,
              }}
            >
              {tip.name}
            </span>
          ) : null}
        </div>
      </div>

      {idf.length ? (
        <div className="e-france__map" style={{ marginTop: 10 }}>
          <div style={{ position: "relative" }}>
            <svg
              viewBox={`-14 -14 ${INSET.w + 28} ${INSET.h + 28}`}
              aria-label="Zoom sur Paris et l'Île-de-France"
              role="img"
            >
              {(() => {
                const proj = insetProjection(idf);
                const c = proj(48.8566, 2.3522);
                const v = proj(48.8049, 2.1204);
                const pts = relax(idf.map((l) => ({ id: l.id, ...proj(l.lat, l.lon) })));
                return (
                  <>
                    <circle cx={c.x} cy={c.y} r={38} className="e-france__home" />
                    <text x={c.x} y={c.y - 46} className="e-france__label" textAnchor="middle">
                      Paris
                    </text>
                    {v.x > 0 && v.x < INSET.w ? (
                      <text x={v.x} y={v.y + 24} className="e-france__label" textAnchor="middle">
                        Versailles
                      </text>
                    ) : null}
                    {pts.map((q) =>
                      Math.hypot(q.x - q.ox, q.y - q.oy) > 2 ? (
                        <line key={`l-${q.id}`} x1={q.ox} y1={q.oy} x2={q.x} y2={q.y} className="e-france__leader" />
                      ) : null,
                    )}
                    {pts.map((q) => {
                      const l = idf.find((x) => x.id === q.id)!;
                      return dot(l, q.x, q.y, true);
                    })}
                  </>
                );
              })()}
            </svg>
            {tip && tip.inset ? (
              <span
                className="e-france__tip"
                style={{
                  left: `${((tip.x + 14) / (INSET.w + 28)) * 100}%`,
                  top: `calc(${((tip.y + 14) / (INSET.h + 28)) * 100}% + 16px)`,
                }}
              >
                {tip.name}
              </span>
            ) : null}
          </div>
        </div>
      ) : null}

      <p className="e-france__legend">
        <span>
          <i aria-hidden="true" /> Privé
        </span>
        <span>
          <i className="is-public" aria-hidden="true" /> Public ou Défense
        </span>
      </p>
    </div>
  );
}
