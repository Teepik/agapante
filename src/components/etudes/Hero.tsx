"use client";

import { lineById, type LineId } from "@/lib/etudes/lines";
import { ORDER } from "@/lib/etudes/plan";
import { Bullet, Icon, Plaque } from "./ui";

const W = 440;
const H = 400;
const TOP = { x: 220, y: 58 };

function target(i: number) {
  return 34 + i * ((W - 68) / 7);
}

export function Hero({ onPickLine }: { onPickLine: (line: LineId) => void }) {
  return (
    <header className="et-hero" id="top">
      <div className="et-hero__text">
        <Plaque as="h1" size="lg">
          Le plan des études
        </Plaque>
        <p className="et-hero__lede">
          Huit lignes partent de ta 3e. Chacune traverse le lycée, passe par des prépas, des écoles ou des
          universités, et arrive à des métiers. Explore les stations, compare les écoles, puis trace ton
          itinéraire.
        </p>
        <div className="et-hero__cta">
          <a href="#plan" className="et-btn et-btn--primary">
            <Icon name="map" /> Explorer le plan
          </a>
          <a href="#boussole" className="et-btn">
            <Icon name="compass" /> Trouver ma direction
          </a>
        </div>
        <p className="et-hero__meta">Règles et chiffres vérifiés en octobre 2026, pour un bac en juin 2030.</p>
      </div>

      <figure className="et-mini">
        <div className="et-mini__canvas">
          <svg viewBox={`0 0 ${W} ${H}`} className="et-mini__svg" aria-hidden="true">
            {ORDER.map((id, k) => {
              const bx = TOP.x + (k - 3.5) * 9;
              const tx = target(k);
              return (
                <path
                  key={id}
                  data-line={id}
                  className="et-mini__line"
                  style={{ animationDelay: `${120 + k * 70}ms` }}
                  d={`M ${bx} ${TOP.y} V 150 C ${bx} 250, ${tx} 228, ${tx} 330`}
                  pathLength={1}
                />
              );
            })}
            <rect className="et-mini__origin" x={TOP.x - 42} y={TOP.y - 13} width={84} height={26} rx={13} />
            <circle className="et-here-pulse et-here-pulse--mini" cx={TOP.x} cy={TOP.y} r="26" />
          </svg>
          <span className="et-mini__here">
            <Icon name="pin" width={16} height={16} /> Tu es ici : 3e
          </span>
          {ORDER.map((id, k) => (
            <button
              key={id}
              type="button"
              className="et-mini__stop"
              style={{ left: `${(target(k) / W) * 100}%`, top: `${(348 / H) * 100}%` }}
              onClick={() => onPickLine(id)}
              aria-label={`Suivre la ligne ${lineById[id].num}, ${lineById[id].name}`}
              title={lineById[id].name}
            >
              <Bullet line={id} size="lg" />
            </button>
          ))}
        </div>
        <figcaption className="et-mini__cap">Touche une pastille pour suivre sa ligne sur le plan.</figcaption>
      </figure>
    </header>
  );
}
