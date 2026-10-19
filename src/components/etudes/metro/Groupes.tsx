"use client";

import { useMemo, useState } from "react";
import { cle } from "@/lib/etudes/communes";
import type { Groupe } from "@/lib/etudes/metro-groupes";
import { Sources } from "../DetailSheets";
import { Icon } from "../ui";

/** Au-delà, une pastille par élément prendrait trop de place : un seul bouton ouvre la liste. */
const PASTILLES_MAX = 10;

/** Dans la fiche courte : une pastille par élément, qui ouvre la fiche complète à sa place. */
export function GroupeChips({ groupe, onOpen }: { groupe: Groupe; onOpen: (section: string) => void }) {
  const n = groupe.elements.length;
  if (!n || groupe.popup === false) return null;
  return (
    <div className="e-mcard__group">
      <p className="e-mcard__k">{groupe.accroche}</p>
      {n <= PASTILLES_MAX ? (
        <ul>
          {groupe.elements.map((el) => (
            <li key={el.id}>
              <button type="button" onClick={() => onOpen(el.id)} aria-label={`${el.chip}, ${el.titre}`}>
                {el.chip}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <button type="button" className="e-btn e-btn--sm" onClick={() => onOpen(groupe.id)}>
          <Icon name="list" /> {groupe.titre}
        </button>
      )}
    </div>
  );
}

/** Dans la fiche complète : chaque élément se déplie, avec ses détails et ses sources. */
export function GroupeSection({ groupe }: { groupe: Groupe }) {
  const [q, setQ] = useState("");
  const longue = groupe.elements.length > PASTILLES_MAX;
  const shown = useMemo(() => {
    const k = cle(q);
    return k ? groupe.elements.filter((el) => cle(`${el.chip} ${el.titre} ${el.phrase}`).includes(k)) : groupe.elements;
  }, [groupe, q]);

  if (!groupe.elements.length) return null;
  return (
    <section className="e-sec" id={`m-${groupe.id}`}>
      <h3>{groupe.titre}</h3>
      {groupe.intro ? <p className="e-mgroup__intro">{groupe.intro}</p> : null}
      {longue ? (
        <label className="e-field">
          <Icon name="search" />
          <span className="e-sr">Chercher</span>
          <input
            type="search"
            value={q}
            onChange={(ev) => setQ(ev.target.value)}
            placeholder="Un mot : informatique, chimie, gestion…"
            autoComplete="off"
          />
        </label>
      ) : null}
      <ul className="e-mgroup">
        {shown.map((el) =>
          !el.details.length && !el.sources?.length ? (
            <li key={el.id} id={`m-${el.id}`} className="e-mgroup__item is-static">
              <span className="e-mgroup__chip">{el.chip}</span>
              <span className="e-mgroup__head">
                {el.titre !== el.chip ? <span className="e-mgroup__titre">{el.titre}</span> : null}
                <span className="e-mgroup__phrase">{el.phrase}</span>
              </span>
            </li>
          ) : (
            <li key={el.id}>
              <details className="e-mgroup__item" id={`m-${el.id}`}>
                <summary>
                  <span className="e-mgroup__chip">{el.chip}</span>
                  <span className="e-mgroup__head">
                    {el.titre !== el.chip ? <span className="e-mgroup__titre">{el.titre}</span> : null}
                    <span className="e-mgroup__phrase">{el.phrase}</span>
                  </span>
                  <Icon name="chevron-down" />
                </summary>
                <div className="e-mgroup__body">
                  {el.details.length ? (
                    <dl className="e-facts">
                      {el.details.map((d) => (
                        <div key={d.label}>
                          <dt>{d.label}</dt>
                          <dd>{d.value}</dd>
                        </div>
                      ))}
                    </dl>
                  ) : null}
                  {el.sources?.length ? <Sources urls={el.sources} /> : null}
                </div>
              </details>
            </li>
          ),
        )}
      </ul>
      {longue && !shown.length ? <p className="e-small e-muted">Essaie un autre mot.</p> : null}
      {groupe.sources?.length ? <Sources urls={groupe.sources} /> : null}
    </section>
  );
}
