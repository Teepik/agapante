"use client";

import { doublesCursus, passerelles } from "@/lib/etudes/passerelles";
import { placedById } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { Dot, Icon } from "./ui";

export function Passerelles({ onOpenPasserelle }: { onOpenPasserelle: (id: string) => void }) {
  return (
    <div className="e-bridges">
      <div>
        <div className="e-block__head">
          <div>
            <h3 className="e-h3">Douze passerelles</h3>
            <p className="e-sub">
              Un choix fait à 17 ans s&apos;ajuste : on change de voie, souvent sans perdre une année.
            </p>
          </div>
        </div>
        <ol className="e-plist">
          {passerelles.map((x) => {
            const toLine = placedById[x.to]?.line;
            return (
              <li key={x.id}>
                <button type="button" className="e-pitem" onClick={() => onOpenPasserelle(x.id)}>
                  <span className="e-numbadge">{x.num}</span>
                  <span>
                    <span className="e-pitem__title">{x.title}</span>
                    <span className="e-pitem__when">{x.when}</span>
                  </span>
                  <span className="e-pitem__route">
                    <b>
                      {x.fromLines.map((l, i) => (
                        <Dot key={`${l}-${i}`} line={l} />
                      ))}
                      {x.fromLabel}
                    </b>
                    <Icon name="arrow-up" style={{ transform: "rotate(90deg)" }} />
                    <b>
                      {toLine ? <Dot line={toLine} /> : <Dot line="u" />}
                      {stationById[x.to]?.name}
                    </b>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            );
          })}
        </ol>
      </div>

      <div>
        <div className="e-block__head">
          <div>
            <h3 className="e-h3">Huit doubles cursus</h3>
            <p className="e-sub">
              Deux formations en même temps, deux diplômes à la sortie. C&apos;est exigeant, et c&apos;est souvent ce
              qui distingue un dossier.
            </p>
          </div>
        </div>
        <ul className="e-duos">
          {doublesCursus.map((d) => (
            <li key={d.id} className="e-duo">
              <div className="e-duo__lines" aria-hidden="true">
                {d.lines.map((l, i) => (
                  <span key={`${l}-${i}`} data-line={l === "u" ? "u" : l} />
                ))}
              </div>
              <h4 className="e-duo__title">{d.title}</h4>
              <p className="e-duo__what">{d.what}</p>
              <ul className="e-list e-duo__ex">
                {d.examples.map((ex) => (
                  <li key={ex}>{ex}</li>
                ))}
              </ul>
              <dl className="e-duo__facts">
                <dt>Pour y entrer</dt>
                <dd>{d.acces}</dd>
                <dt>Le rythme</dt>
                <dd>{d.rythme}</dd>
                <dt>Et après</dt>
                <dd>{d.apres}</dd>
              </dl>
              {d.url ? (
                <p style={{ marginTop: 14 }}>
                  <a className="e-link" href={d.url} target="_blank" rel="noopener noreferrer">
                    Le site officiel
                  </a>
                </p>
              ) : null}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
