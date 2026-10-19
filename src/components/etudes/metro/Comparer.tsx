"use client";

import { useState } from "react";
import { COMPARER_NOTE, CRITERES } from "@/lib/etudes/comparer";
import { METRO_LINES, type MetroLine } from "@/lib/etudes/metro";
import { Sheet } from "../Sheet";
import { Dot } from "../ui";

type LigneId = MetroLine["id"];

/** Les quatre lignes, côte à côte, sur les mêmes questions ; on peut n'en garder que deux ou trois. */
export function ComparerSheet({ onClose, initial }: { onClose: () => void; initial?: LigneId[] }) {
  const [on, setOn] = useState<LigneId[]>(initial?.length ? initial : METRO_LINES.map((l) => l.id));
  const lignes = METRO_LINES.filter((l) => on.includes(l.id));

  function toggle(id: LigneId) {
    setOn((xs) => (xs.includes(id) ? (xs.length > 2 ? xs.filter((x) => x !== id) : xs) : [...xs, id]));
  }

  return (
    <Sheet
      labelId="e-cmp-title"
      resetKey="comparer"
      onClose={onClose}
      wide
      meta={<span>Après le bac</span>}
      title="Les quatre lignes, côte à côte"
      when="Les mêmes questions pour chaque ligne : où, comment, à quel rythme, pour quel diplôme."
    >
      <div className="e-cmp__pick" role="group" aria-label="Lignes à comparer">
        {METRO_LINES.map((l) => (
          <button
            key={l.id}
            type="button"
            className="e-chip"
            data-line={l.lane}
            aria-pressed={on.includes(l.id)}
            onClick={() => toggle(l.id)}
          >
            <Dot line={l.lane} /> {l.short}
          </button>
        ))}
      </div>

      <div className="e-cmp" style={{ ["--cols" as string]: lignes.length }}>
        <div className="e-cmp__head" aria-hidden="true">
          <span />
          {lignes.map((l) => (
            <span key={l.id} data-line={l.lane} className="e-cmp__col">
              <Dot line={l.lane} /> {l.name}
            </span>
          ))}
        </div>
        {CRITERES.map((c) => (
          <section key={c.id} className="e-cmp__row" aria-labelledby={`e-cmp-${c.id}`}>
            <h3 id={`e-cmp-${c.id}`} className="e-cmp__label">
              {c.label}
            </h3>
            <ul className="e-cmp__cells">
              {lignes.map((l) => (
                <li key={l.id} data-line={l.lane}>
                  <span className="e-cmp__line">
                    <Dot line={l.lane} /> {l.name}
                  </span>
                  <p>{c.valeurs[l.id]}</p>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
      <p className="e-small e-muted">{COMPARER_NOTE}</p>
    </Sheet>
  );
}
