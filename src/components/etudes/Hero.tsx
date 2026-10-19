"use client";

import { classeInfo } from "@/lib/etudes/cohorte";
import { enLettres, laneShort, type LaneId } from "@/lib/etudes/lines";
import { LANES } from "@/lib/etudes/plan";
import { ClassPicker, useCohort } from "./cohorte";
import { Icon } from "./ui";

/* L'arbre de l'ouverture : un tronc qui monte de la 3e et se ramifie en treize voies ; l'université, au centre,
   monte tout droit ; la voie professionnelle part dès la 3e. */
const T = {
  W: 640,
  H: 430,
  BX: 320,
  BS: 7,
  BASE: 402,
  BAC: 330,
  /** Virage de la voie professionnelle, entre la 3e et le bac. */
  PRO: 368,
  TURN0: 292,
  STEP: 10,
  R: 10,
  TIP: 112,
  COL: 46,
};
const C = LANES.indexOf("u");
const N = LANES.length;

/** Noms très courts, pour tenir sous les pointes de l'arbre. */
const TIP_LABEL: Partial<Record<LaneId, string>> = {
  courtes: "BTS, BUT",
  parasocial: "Soin",
  postbac: "Écoles",
};

function treePath(k: number) {
  const xb = T.BX + (k - C) * T.BS;
  if (k === C) return `M ${xb} ${T.BASE} V ${T.TIP}`;
  const left = k < C;
  const xl = T.BX + (k - C) * T.COL;
  const yt = LANES[k] === "pro" ? T.PRO : T.TURN0 - (left ? k : N - 1 - k) * T.STEP;
  const dx = left ? -T.R : T.R;
  return [
    `M ${xb} ${T.BASE}`,
    `V ${yt + T.R}`,
    `A ${T.R} ${T.R} 0 0 ${left ? 0 : 1} ${xb + dx} ${yt}`,
    `H ${xl - dx}`,
    `A ${T.R} ${T.R} 0 0 ${left ? 1 : 0} ${xl} ${yt - T.R}`,
    `V ${T.TIP}`,
  ].join(" ");
}

export function Hero() {
  const { classe } = useCohort();
  const here = classeInfo(classe).court;
  return (
    <header className="e-hero" id="top">
      <div className="e-wrap">
        <h1 className="e-hero__title">Toutes les routes après la 3e.</h1>
      </div>
      <div className="e-wrap e-hero__grid">
        <div className="e-hero__text">
          <p className="e-hero__lede">
            Du lycée au premier métier : {enLettres(LANES.length)} grandes voies d&apos;études, les établissements qui
            les jalonnent et les passerelles qui les relient.
          </p>
          <ClassPicker />
          <div className="e-hero__cta">
            <a className="e-btn e-btn--primary" href="#carte">
              <Icon name="map" />
              Explorer la carte
            </a>
            <a className="e-btn" href="#test">
              Faire le test
            </a>
          </div>
          <p className="e-hero__note">Informations vérifiées en octobre 2026. Les sources sont en bas de page.</p>
        </div>

        <figure
          className="e-tree"
          aria-label={`Le tronc commun monte jusqu'au bac, puis se ramifie en ${enLettres(LANES.length)} voies d'études.`}
        >
          <svg viewBox={`0 0 ${T.W} ${T.H}`} role="img" aria-hidden="true">
            {LANES.map((id, k) => (
              <path
                key={id}
                d={treePath(k)}
                pathLength={1}
                className="e-tree__line"
                data-line={id}
                style={{ ["--k" as string]: Math.abs(k - C) }}
              />
            ))}
            {LANES.map((id, k) => {
              const x = T.BX + (k - C) * T.COL;
              const row = (k + 1) % 3;
              return (
                <g key={id} data-line={id} style={{ ["--k" as string]: Math.abs(k - C) }}>
                  <circle className="e-tree__tip" cx={x} cy={T.TIP} r={7} />
                  <text className="e-tree__label" x={x} y={T.TIP - 22 - row * 24} textAnchor="middle">
                    {TIP_LABEL[id] ?? laneShort(id)}
                  </text>
                </g>
              );
            })}
            <rect className="e-tree__bac" x={T.BX - 38} y={T.BAC - 13} width={76} height={26} rx={13} />
            <text x={T.BX} y={T.BAC + 1} textAnchor="middle" dominantBaseline="central" className="e-tree__cap">
              Bac
            </text>
            <rect className="e-tree__base" x={T.BX - 38} y={T.BASE - 13} width={76} height={26} rx={13} />
            <text
              x={T.BX}
              y={T.BASE + 1}
              textAnchor="middle"
              dominantBaseline="central"
              className="e-tree__cap e-tree__cap--here"
            >
              {here}
            </text>
            <text className="e-tree__here" x={T.BX + 52} y={T.BASE + 5}>
              Tu es ici
            </text>
          </svg>
        </figure>
      </div>
    </header>
  );
}
