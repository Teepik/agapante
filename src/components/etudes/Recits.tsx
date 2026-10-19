"use client";

import { useState } from "react";
import { dateRecit, formatRecit, recitsDe } from "@/lib/etudes/recits";
import { Icon } from "./ui";

/** « Ils racontent » : des élèves et des étudiants de la voie, dans des récits publiés. */
export function Recits({ lane, max = 3 }: { lane: string; max?: number }) {
  const list = recitsDe(lane);
  const [all, setAll] = useState(false);
  if (!list.length) return null;
  const shown = all ? list : list.slice(0, max);
  return (
    <div className="e-recits">
      <h4>Ils racontent</h4>
      <ul className="e-recits__list">
        {shown.map((r) => (
          <li key={r.url}>
            <a className="e-recit" href={r.url} target="_blank" rel="noopener noreferrer">
              <span className="e-recit__meta">
                <span>{formatRecit[r.format]}</span>
                <span>{r.media}</span>
                <span>{dateRecit(r)}</span>
              </span>
              <span className="e-recit__title">{r.titre}</span>
              <span className="e-recit__resume">{r.resume}</span>
              <span className="e-recit__etape">
                {r.etape}
                <Icon name="external" width={15} height={15} />
              </span>
            </a>
          </li>
        ))}
      </ul>
      {list.length > max ? (
        <button type="button" className="e-btn e-btn--sm" onClick={() => setAll((v) => !v)}>
          {all
            ? "Afficher moins"
            : `Lire ${list.length - max} autre${list.length - max > 1 ? "s" : ""} récit${list.length - max > 1 ? "s" : ""}`}
        </button>
      ) : null}
    </div>
  );
}
