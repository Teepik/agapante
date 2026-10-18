"use client";

import { doublesCursus, passerelles } from "@/lib/etudes/passerelles";
import { lineById } from "@/lib/etudes/lines";
import { placedById } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { Bullet, Icon } from "./ui";

export function Passerelles({
  onOpenPasserelle,
  onShowOnPlan,
}: {
  onOpenPasserelle: (id: string) => void;
  onShowOnPlan: (id: string) => void;
}) {
  return (
    <div className="et-bridges">
      <div className="et-bridges__part">
        <h3 className="et-h3">Changer de ligne : les passerelles</h3>
        <p className="et-bridges__intro">
          Un choix fait à 17 ans s&apos;ajuste. Chaque passerelle est une correspondance : on descend d&apos;une
          ligne, on monte dans une autre, souvent sans perdre une année.
        </p>
        <ol className="et-pcards">
          {passerelles.map((x) => {
            const toLine = placedById[x.to]?.line;
            return (
              <li key={x.id} className="et-pcard" id={`passerelle-${x.id}`} data-line={toLine}>
                <div className="et-pcard__sign">
                  <span className="et-pbadge-num">{x.num}</span>
                  <span className="et-pcard__from">
                    {x.fromLines.map((l) => (
                      <Bullet key={l} line={l} size="sm" />
                    ))}
                    {x.fromLabel}
                  </span>
                  <span className="et-pcard__rail" aria-hidden="true" />
                  <span className="et-pcard__to">
                    {toLine ? <Bullet line={toLine} size="sm" /> : <Bullet line="u" size="sm" />}
                    {stationById[x.to]?.name}
                  </span>
                </div>
                <p className="et-pcard__title">{x.title}</p>
                <p className="et-pcard__when">{x.when}</p>
                <p className="et-pcard__how">{x.how}</p>
                <div className="et-pcard__actions">
                  <button type="button" className="et-linkbtn" onClick={() => onOpenPasserelle(x.id)}>
                    <Icon name="book" /> Lire le détail
                  </button>
                  {x.draw ? (
                    <button type="button" className="et-linkbtn" onClick={() => onShowOnPlan(x.id)}>
                      <Icon name="map" /> Voir sur le plan
                    </button>
                  ) : null}
                </div>
              </li>
            );
          })}
        </ol>
      </div>

      <div className="et-bridges__part">
        <h3 className="et-h3">Rouler sur deux lignes : les doubles cursus</h3>
        <p className="et-bridges__intro">
          Certains étudiants suivent deux formations en même temps, avec deux diplômes à la sortie. C&apos;est
          exigeant, et c&apos;est souvent ce qui distingue un dossier.
        </p>
        <ul className="et-duos">
          {doublesCursus.map((d) => (
            <li key={d.id} className="et-duo">
              <div className="et-duo__tracks" aria-hidden="true">
                {d.lines.map((l, i) => (
                  <span key={`${l}-${i}`} className="et-duo__track" data-line={l === "u" ? undefined : l} data-u={l === "u" ? "1" : undefined} />
                ))}
              </div>
              <div className="et-duo__body">
                <p className="et-duo__lines">
                  {d.lines.map((l, i) => (
                    <Bullet key={`${l}-b-${i}`} line={l} size="sm" />
                  ))}
                  <span>{d.lines.map((l) => (l === "u" ? "Université" : lineById[l].short)).join(" et ")}</span>
                </p>
                <p className="et-duo__title">{d.title}</p>
                <p className="et-duo__what">{d.what}</p>
                <ul className="et-tags et-tags--sm">
                  {d.examples.map((e) => (
                    <li key={e}>{e}</li>
                  ))}
                </ul>
                <dl className="et-duo__facts">
                  <div>
                    <dt>Pour y entrer</dt>
                    <dd>{d.acces}</dd>
                  </div>
                  <div>
                    <dt>Le rythme</dt>
                    <dd>{d.rythme}</dd>
                  </div>
                  <div>
                    <dt>Et après</dt>
                    <dd>{d.apres}</dd>
                  </div>
                </dl>
                {d.url ? (
                  <a className="et-linkbtn" href={d.url} target="_blank" rel="noopener noreferrer">
                    <Icon name="external" /> En savoir plus
                  </a>
                ) : null}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
