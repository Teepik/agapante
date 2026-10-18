"use client";

import { useEffect, useRef } from "react";
import { itineraires } from "@/lib/etudes/itineraires";
import { lineById, type LineId } from "@/lib/etudes/lines";
import { Bullet, Gauge, Icon } from "./ui";

export function Itineraires({
  current,
  onSelect,
  onShowRoute,
  onOpenStation,
}: {
  current: LineId;
  onSelect: (line: LineId) => void;
  onShowRoute: (line: LineId) => void;
  onOpenStation: (id: string, line: LineId) => void;
}) {
  const it = itineraires.find((x) => x.line === current) ?? itineraires[0];
  const l = lineById[it.line];
  const resultRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    resultRef.current?.focus({ preventScroll: true });
  }, [current]);

  return (
    <div className="et-trip">
      <div className="et-trip__planner">
        <div className="et-trip__from">
          <span className="et-trip__k">Départ</span>
          <span className="et-trip__v">
            <Icon name="pin" width={18} height={18} /> 3e, aujourd&apos;hui
          </span>
        </div>
        <div className="et-trip__to">
          <span className="et-trip__k" id="et-trip-to">
            Arrivée
          </span>
          <ul className="et-trip__dests" role="radiogroup" aria-labelledby="et-trip-to">
            {itineraires.map((x) => (
              <li key={x.line}>
                <button
                  type="button"
                  role="radio"
                  aria-checked={x.line === it.line}
                  className={`et-trip__dest${x.featured ? " is-featured" : ""}`}
                  data-line={x.line}
                  onClick={() => onSelect(x.line)}
                >
                  <Bullet line={x.line} size="sm" />
                  <span>{x.destination}</span>
                  {x.featured ? <span className="et-trip__star">Conseillé</span> : null}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="et-trip__result" data-line={it.line} tabIndex={-1} ref={resultRef} aria-live="polite">
        {it.featured ? (
          <p className="et-trip__badge">
            <Icon name="route" width={18} height={18} /> L&apos;itinéraire qui garde le plus de portes ouvertes
          </p>
        ) : null}
        <h3 className="et-trip__title">
          <Bullet line={it.line} size="lg" /> {it.destination}
        </h3>
        <p className="et-trip__why">{it.why}</p>

        <dl className="et-trip__stats">
          <div>
            <dt>
              <Icon name="clock" width={18} height={18} /> Trajet
            </dt>
            <dd>{it.duree}</dd>
          </div>
          <div>
            <dt>
              <Icon name="route" width={18} height={18} /> Correspondances
            </dt>
            <dd>{it.steps.filter((s) => s.choice).length} choix clés</dd>
          </div>
          <div>
            <dt>
              <Icon name="flag" width={18} height={18} /> Exigence
            </dt>
            <dd>
              <Gauge value={it.exigence} label={`Exigence ${it.exigence} sur 5`} />
            </dd>
          </div>
        </dl>

        <ol className="et-trip__steps">
          {it.steps.map((s) => (
            <li key={s.title} className={s.choice ? "et-trip__step is-choice" : "et-trip__step"}>
              <span className="et-trip__dot" aria-hidden="true" />
              <p className="et-trip__when">{s.when}</p>
              <p className="et-trip__stitle">
                {s.station ? (
                  <button type="button" className="et-doors__link" onClick={() => onOpenStation(s.station!, it.line)}>
                    {s.title}
                  </button>
                ) : (
                  s.title
                )}
                {s.choice ? <span className="et-trip__choice">Choix clé</span> : null}
              </p>
              <p className="et-trip__detail">{s.detail}</p>
            </li>
          ))}
        </ol>

        <div className="et-trip__keys">
          <h4>
            <Icon name="lightbulb" /> Ce qui fait la différence
          </h4>
          <ul className="et-list">
            {it.cles.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <div className="et-trip__actions">
          <button type="button" className="et-btn et-btn--primary" onClick={() => onShowRoute(it.line)}>
            <Icon name="map" /> Voir le trajet sur le plan
          </button>
          <span className="et-trip__dir">Direction : {l.direction}</span>
        </div>
      </div>
    </div>
  );
}
