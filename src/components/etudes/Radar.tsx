"use client";

import { useMemo, useState } from "react";
import { FRANCE_VIEW, project, regions } from "@/lib/etudes/france";
import type { Place } from "./place";

export type RadarPoint = {
  id: string;
  lat: number;
  lon: number;
  name: string;
  /** Point plein (privé) ou anneau (public). */
  filled: boolean;
};

const S = 400;
const C = S / 2;
const R = 182;
const NBSP = " ";

/** Autour du lieu choisi : deux cercles de distance et les points retenus. */
export function Radar({
  place,
  rayon,
  points,
  hot,
  onHot,
  onOpen,
  label,
  legend,
}: {
  place: Place;
  rayon: number;
  points: RadarPoint[];
  hot: string | null;
  onHot: (id: string | null) => void;
  onOpen: (id: string) => void;
  label: string;
  legend: { filled: string; hollow: string };
}) {
  const k = R / rayon;
  const cos = Math.cos((place.lat * Math.PI) / 180);
  const pos = (lat: number, lon: number) => ({
    x: C + (lon - place.lon) * 111.32 * cos * k,
    y: C - (lat - place.lat) * 110.57 * k,
  });
  const [tip, setTip] = useState<{ x: number; y: number; name: string } | null>(null);
  const small = points.length > 80;
  const ordered = hot ? [...points.filter((p) => p.id !== hot), ...points.filter((p) => p.id === hot)] : points;

  return (
    <div className="e-france">
      <div className="e-france__map">
        <div style={{ position: "relative" }}>
          <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label={label}>
            <circle cx={C} cy={C} r={R} className="e-radar__disc" />
            <circle cx={C} cy={C} r={R / 2} className="e-radar__ring" />
            <text x={C} y={C - R / 2 - 6} textAnchor="middle" className="e-france__label">
              {(rayon / 2).toLocaleString("fr-FR")}
              {NBSP}km
            </text>
            <text x={C} y={C - R - 6} textAnchor="middle" className="e-france__label">
              {rayon}
              {NBSP}km
            </text>
            {ordered.map((p) => {
              const q = pos(p.lat, p.lon);
              return (
                <circle
                  key={p.id}
                  cx={q.x}
                  cy={q.y}
                  r={hot === p.id ? 8 : small ? 3.6 : 5.5}
                  className={`e-france__dot${p.filled ? "" : " e-france__dot--public"}${hot === p.id ? " is-hot" : ""}`}
                  onMouseEnter={() => {
                    onHot(p.id);
                    setTip({ x: q.x, y: q.y, name: p.name });
                  }}
                  onMouseLeave={() => {
                    onHot(null);
                    setTip(null);
                  }}
                  onClick={() => onOpen(p.id)}
                >
                  <title>{p.name}</title>
                </circle>
              );
            })}
            <circle cx={C} cy={C} r={7} className="e-radar__home" />
          </svg>
          {tip ? (
            <span
              className="e-france__tip"
              style={{ left: `${(tip.x / S) * 100}%`, top: `calc(${(tip.y / S) * 100}% + 16px)` }}
            >
              {tip.name}
            </span>
          ) : null}
        </div>
      </div>
      <p className="e-france__legend">
        <span>
          <i className="is-home" aria-hidden="true" /> {place.kind === "position" ? "Toi" : place.name}
        </span>
        <span>
          <i aria-hidden="true" /> {legend.filled}
        </span>
        <span>
          <i className="is-public" aria-hidden="true" /> {legend.hollow}
        </span>
      </p>
    </div>
  );
}

/** Avant de choisir une ville : tous les points de métropole, en semis. */
export function Overview({
  points,
  label,
  caption,
}: {
  points: { lat: number; lon: number }[] | null;
  label: string;
  caption: string;
}) {
  const dots = useMemo(() => {
    if (!points) return "";
    let d = "";
    for (const p of points) {
      if (p.lat < 41 || p.lat > 51.5 || p.lon < -5.6 || p.lon > 9.8) continue;
      const q = project(p.lat, p.lon);
      d += `M${q.x.toFixed(1)} ${q.y.toFixed(1)}h0`;
    }
    return d;
  }, [points]);
  return (
    <div className="e-france">
      <div className="e-france__map">
        <svg viewBox={`0 0 ${FRANCE_VIEW.w} ${FRANCE_VIEW.h}`} role="img" aria-label={label}>
          {regions.map((r) => (
            <path key={r.code} d={r.d} className="e-france__region" />
          ))}
          {dots ? <path d={dots} className="e-radar__all" /> : null}
        </svg>
      </div>
      <p className="e-france__legend">
        <span>{caption}</span>
      </p>
    </div>
  );
}

/** Le plus petit rayon qui montre au moins `min` points autour du lieu. */
export function rayonAdapte(distances: number[], rayons: number[], min = 10): number {
  return rayons.find((r) => distances.filter((d) => d <= r).length >= min) ?? rayons[rayons.length - 1];
}
