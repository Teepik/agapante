"use client";

import { useState } from "react";
import { FRANCE_VIEW, project, regions } from "@/lib/etudes/france";
import type { Lycee } from "@/lib/etudes/lycees";

const WEST = new Set(["52", "53", "28", "24"]);

/** Zoom sur Paris et l'ouest de l'Île-de-France. */
const PARIS = { lat0: 48.74, lat1: 48.96, lon0: 2.0, lon1: 2.5, w: 300, h: 150 };
function projectParis(lat: number, lon: number) {
  const c = Math.cos((48.85 * Math.PI) / 180);
  const sx = PARIS.w / ((PARIS.lon1 - PARIS.lon0) * c);
  const sy = PARIS.h / (PARIS.lat1 - PARIS.lat0);
  const s = Math.min(sx, sy);
  return { x: (lon - PARIS.lon0) * c * s, y: (PARIS.lat1 - lat) * s };
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
  const [tip, setTip] = useState<{ x: number; y: number; name: string; inset: boolean } | null>(null);
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
                  Paris : voir le zoom
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
              viewBox={`-12 -12 ${PARIS.w + 24} ${PARIS.h + 24}`}
              aria-label="Zoom sur Paris et Versailles"
              role="img"
            >
              <rect x={-12} y={-12} width={PARIS.w + 24} height={PARIS.h + 24} rx={14} fill="none" />
              {(() => {
                const p = projectParis(48.8566, 2.3522);
                const v = projectParis(48.8049, 2.1204);
                return (
                  <>
                    <circle cx={p.x} cy={p.y} r={34} className="e-france__home" />
                    <text x={p.x - 16} y={p.y - 40} className="e-france__label">
                      Paris
                    </text>
                    <text x={v.x - 26} y={v.y + 24} className="e-france__label">
                      Versailles
                    </text>
                  </>
                );
              })()}
              {idf.map((l) => {
                const p = projectParis(l.lat, l.lon);
                return dot(l, p.x, p.y, true);
              })}
            </svg>
            {tip && tip.inset ? (
              <span
                className="e-france__tip"
                style={{
                  left: `${((tip.x + 12) / (PARIS.w + 24)) * 100}%`,
                  top: `calc(${((tip.y + 12) / (PARIS.h + 24)) * 100}% + 16px)`,
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
