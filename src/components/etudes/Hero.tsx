import { lineById } from "@/lib/etudes/lines";
import { ORDER } from "@/lib/etudes/plan";
import { Icon } from "./ui";

/* L'arbre de l'ouverture : un tronc qui monte de la 3e et se ramifie en huit voies. */
const T = {
  W: 640,
  H: 430,
  BX: 320,
  BS: 7,
  BASE: 402,
  BAC: 330,
  TURN0: 288,
  STEP: 11,
  R: 11,
  TIP: 98,
  COL: 76,
};

function treePath(k: number) {
  const left = k < 4;
  const xb = T.BX + (k - 3.5) * T.BS;
  const xl = T.BX + (k - 3.5) * T.COL;
  const yt = T.TURN0 - (left ? k : 7 - k) * T.STEP;
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
  return (
    <header className="e-hero" id="top">
      <div className="e-wrap">
        <h1 className="e-hero__title">Toutes les routes après la 3e.</h1>
      </div>
      <div className="e-wrap e-hero__grid">
        <div className="e-hero__text">
          <p className="e-hero__lede">
            Du lycée au premier métier : huit grandes voies d&apos;études, les établissements qui les jalonnent et les
            passerelles qui les relient.
          </p>
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
          aria-label="Le tronc commun monte de la 3e au bac, puis se ramifie en huit voies d'études."
        >
          <svg viewBox={`0 0 ${T.W} ${T.H}`} role="img" aria-hidden="true">
            {ORDER.map((id, k) => (
              <path
                key={id}
                d={treePath(k)}
                pathLength={1}
                className="e-tree__line"
                data-line={id}
                style={{ ["--k" as string]: k < 4 ? 3 - k : k - 4 }}
              />
            ))}
            {ORDER.map((id, k) => {
              const x = T.BX + (k - 3.5) * T.COL;
              const high = k % 2 === 1;
              return (
                <g key={id} data-line={id} style={{ ["--k" as string]: k < 4 ? 3 - k : k - 4 }}>
                  <circle className="e-tree__tip" cx={x} cy={T.TIP} r={8} />
                  <text className="e-tree__label" x={x} y={high ? T.TIP - 50 : T.TIP - 24} textAnchor="middle">
                    {lineById[id].short}
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
              3e
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
