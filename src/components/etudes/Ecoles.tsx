"use client";

import { useMemo, useState } from "react";
import { ecoles, type Ecole } from "@/lib/etudes/ecoles";
import { lineById, linesByNum, type LineId } from "@/lib/etudes/lines";
import { norm } from "./Lycees";
import { useSelection } from "./store";
import { Dot, Icon } from "./ui";

const FIRST = 18;

export function Ecoles({ onOpenEcole }: { onOpenEcole: (id: string) => void }) {
  const [line, setLine] = useState<LineId | "all">("all");
  const [q, setQ] = useState("");
  const [all, setAll] = useState(false);
  const { has } = useSelection();

  const list = useMemo(() => {
    const nq = norm(q.trim());
    const order = linesByNum.map((l) => l.id);
    return ecoles
      .filter((e) => line === "all" || e.line === line)
      .filter((e) => !nq || norm(`${e.name} ${e.short ?? ""} ${e.ville} ${e.kind} ${e.formations}`).includes(nq))
      .sort((a, b) => order.indexOf(a.line) - order.indexOf(b.line));
  }, [line, q]);

  const filtered = line !== "all" || q.trim() !== "";
  const shown = filtered || all ? list : list.slice(0, FIRST);

  return (
    <div className="e-dir e-dir--wide">
      <div>
        <div className="e-dir__bar">
          <label className="e-field">
            <Icon name="search" />
            <span className="e-sr">Chercher un établissement, une ville, une matière</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Une école, une ville, une matière…"
              autoComplete="off"
            />
          </label>
        </div>
        <div className="e-dir__filters" role="group" aria-label="Filtrer par voie">
          <button type="button" className="e-chip" aria-pressed={line === "all"} onClick={() => setLine("all")}>
            Toutes les voies
          </button>
          {linesByNum.map((l) => (
            <button
              key={l.id}
              type="button"
              className="e-chip"
              data-line={l.id}
              aria-pressed={line === l.id}
              onClick={() => setLine(line === l.id ? "all" : l.id)}
            >
              <Dot line={l.id} />
              {l.short}
              <span className="e-count">{ecoles.filter((e) => e.line === l.id).length}</span>
            </button>
          ))}
        </div>
        <p className="e-dir__count" aria-live="polite">
          {list.length} {list.length > 1 ? "établissements" : "établissement"}
          {line !== "all" ? `, ${lineById[line].name}` : ""}
        </p>
        {list.length ? (
          <ul className="e-dir__list">
            {shown.map((e, i) => {
              const head = i === 0 || shown[i - 1].line !== e.line;
              return (
                <li key={e.id} data-line={e.line}>
                  {head && line === "all" ? (
                    <p className="e-dir__group">
                      <Dot line={e.line} /> {lineById[e.line].name}
                    </p>
                  ) : null}
                  <EcoleEntry e={e} saved={has("ecole", e.id)} onOpen={() => onOpenEcole(e.id)} />
                </li>
              );
            })}
          </ul>
        ) : (
          <div className="e-dir__empty">
            <p>Élargis la recherche avec un autre mot, ou affiche toutes les voies.</p>
          </div>
        )}
        {!filtered && list.length > FIRST ? (
          <button type="button" className="e-btn e-dir__more" onClick={() => setAll((v) => !v)}>
            {all ? "Afficher moins" : `Afficher les ${list.length - FIRST} autres établissements`}
          </button>
        ) : null}
      </div>
    </div>
  );
}

function EcoleEntry({ e, saved, onOpen }: { e: Ecole; saved: boolean; onOpen: () => void }) {
  return (
    <button type="button" className="e-entry" onClick={onOpen}>
      <span className="e-entry__name">
        {e.name}
        {saved ? <Icon name="bookmark" width={16} height={16} fill="currentColor" aria-label="Dans ma liste" /> : null}
      </span>
      <span className="e-entry__meta">
        <span>{e.ville}</span>
        <span>{e.kind}</span>
      </span>
      <span className="e-entry__desc">{e.acces}</span>
      <Icon name="chevron-right" className="e-entry__chev" />
    </button>
  );
}
