"use client";

import { useEffect, useRef } from "react";
import { itineraires } from "@/lib/etudes/itineraires";
import { lineById, type LineId } from "@/lib/etudes/lines";
import { useCohort } from "./cohorte";
import { Recits } from "./Recits";
import { Dot, Icon, Meter } from "./ui";

export function Parcours({
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
  const { y } = useCohort();
  const it = itineraires.find((x) => x.line === current) ?? itineraires[0];
  const l = lineById[it.line];
  const panelRef = useRef<HTMLDivElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    panelRef.current?.focus({ preventScroll: true });
  }, [current]);

  return (
    <div className="e-trip">
      <div className="e-trip__list" role="radiogroup" aria-label="Choisir une arrivée">
        {itineraires.map((x) => (
          <button
            key={x.line}
            type="button"
            role="radio"
            aria-checked={x.line === it.line}
            className="e-trip__pick"
            data-line={x.line}
            onClick={() => onSelect(x.line)}
          >
            <Dot line={x.line} />
            <span>
              <span className="e-trip__pick-name">{lineById[x.line].name}</span>
              <span className="e-trip__pick-sub">
                {x.featured ? "Le parcours qui ouvre le plus de portes" : x.duree}
              </span>
            </span>
          </button>
        ))}
      </div>

      <div className="e-trip__panel" data-line={it.line} tabIndex={-1} ref={panelRef} aria-live="polite">
        <p className="e-sheet__meta" style={{ marginBottom: 10 }}>
          <span>
            <Dot line={it.line} /> {l.name}
          </span>
          {it.featured ? <span className="e-tag e-tag--ink">Conseillé</span> : null}
        </p>
        <h3 className="e-trip__title">{it.destination}</h3>
        <p className="e-trip__why">{it.why}</p>

        <dl className="e-trip__stats">
          <div>
            <dt>Durée</dt>
            <dd>{it.duree}</dd>
          </div>
          <div>
            <dt>Choix décisifs</dt>
            <dd>{it.steps.filter((s) => s.choice).length}</dd>
          </div>
          <div>
            <dt>Exigence</dt>
            <dd>
              <Meter value={it.exigence} label={`Exigence ${it.exigence} sur 5`} line={it.line} />
            </dd>
          </div>
        </dl>

        <ol className="e-climb" aria-label="Les étapes, de la 3e au métier">
          {it.steps.map((s) => (
            <li key={s.title} className={s.choice ? "is-choice" : undefined}>
              <span className="e-climb__mark" aria-hidden="true" />
              <div>
                <p className="e-climb__when">{y(s.when)}</p>
                <p className="e-climb__title">
                  {s.station ? (
                    <button type="button" className="e-link" onClick={() => onOpenStation(s.station!, it.line)}>
                      {s.title}
                    </button>
                  ) : (
                    s.title
                  )}
                  {s.choice ? <span className="e-tag">Choix décisif</span> : null}
                </p>
                <p className="e-climb__detail">{s.detail}</p>
              </div>
            </li>
          ))}
        </ol>

        <div className="e-trip__keys">
          <h4>Ce qui fait la différence</h4>
          <ul className="e-list">
            {it.cles.map((c) => (
              <li key={c}>{c}</li>
            ))}
          </ul>
        </div>

        <Recits lane={it.line} />

        <div className="e-trip__actions">
          <button type="button" className="e-btn e-btn--primary" onClick={() => onShowRoute(it.line)}>
            <Icon name="map" /> Voir ce parcours sur la carte
          </button>
          <span className="e-muted e-small">Vers : {l.direction}</span>
        </div>
      </div>
    </div>
  );
}
