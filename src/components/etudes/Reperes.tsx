"use client";

import { useMemo } from "react";
import { frise } from "@/lib/etudes/frise";
import { lexique } from "@/lib/etudes/lexique";
import { sourceCount, sourceGroups } from "@/lib/etudes/sources";
import { useCohort } from "./cohorte";
import { norm } from "./Lycees";
import { Icon } from "./ui";

export function Calendrier() {
  const { bac, debut, y } = useCohort();
  // Les années déjà passées s'effacent : le calendrier commence à l'année en cours.
  const years = frise.filter((p) => bac + p.to > debut);
  return (
    <ol className="e-years">
      {years.map((p) => {
        const here = bac + p.from === debut;
        return (
          <li key={p.stage} className={here ? "e-year is-here" : "e-year"}>
            <div>
              <p className="e-year__years">{y(p.years)}</p>
              <p className="e-year__stage">
                {p.stage}, {p.age}
              </p>
            </div>
            <ul className="e-year__items">
              {p.items.map((it) => (
                <li key={it.what} className={it.key ? "is-key" : undefined}>
                  <span className="e-year__when">{y(it.when)}</span>
                  <span className="e-year__what">{it.what}</span>
                </li>
              ))}
            </ul>
          </li>
        );
      })}
    </ol>
  );
}

export function Lexique({
  query,
  onQuery,
  onOpenStation,
}: {
  query: string;
  onQuery: (q: string) => void;
  onOpenStation: (id: string) => void;
}) {
  const list = useMemo(() => {
    const nq = norm(query.trim());
    const sorted = [...lexique].sort((a, b) => norm(a.term).localeCompare(norm(b.term), "fr"));
    return nq ? sorted.filter((x) => norm(`${x.term} ${x.def}`).includes(nq)) : sorted;
  }, [query]);

  return (
    <div className="e-lex">
      <div className="e-lex__bar">
        <label className="e-field">
          <Icon name="search" />
          <span className="e-sr">Chercher un mot</span>
          <input
            type="search"
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            placeholder="Colle, khâgne, Parcoursup…"
            autoComplete="off"
          />
        </label>
        <p className="e-muted e-small" aria-live="polite">
          {list.length} {list.length > 1 ? "mots" : "mot"}
        </p>
      </div>
      <dl className="e-lex__list">
        {list.map((x) => (
          <div key={x.term} className="e-lex__item" id={`mot-${norm(x.term).replace(/[^a-z0-9]+/g, "-")}`}>
            <dt>{x.term}</dt>
            <dd>
              {x.def}
              {x.station ? (
                <>
                  {" "}
                  <button type="button" className="e-link" onClick={() => onOpenStation(x.station!)}>
                    Voir l&apos;étape
                  </button>
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}

export function Footer() {
  return (
    <footer className="e-foot">
      <div className="e-wrap e-foot__grid">
        <div>
          <p className="e-foot__title">Sources</p>
          <p className="e-foot__note">
            Informations vérifiées en octobre 2026 auprès des établissements, des ministères et de la presse
            spécialisée. Les règles évoluent d&apos;une année à l&apos;autre : vérifie chaque année les sites des
            formations et de Parcoursup.
          </p>
          <p className="e-foot__note">
            Les sources propres à chaque lycée et à chaque établissement figurent dans sa fiche. Fond de carte : IGN,
            Admin Express (licence ouverte).
          </p>
        </div>
        <details>
          <summary>
            Les {sourceCount} sources, par thème
            <Icon name="chevron-down" />
          </summary>
          <div className="e-foot__list">
            {sourceGroups.map((g) => (
              <div key={g.title} className="e-foot__group">
                <p className="e-foot__gtitle">{g.title}</p>
                <ul>
                  {g.items.map((s) => (
                    <li key={s.url}>
                      <a href={s.url} target="_blank" rel="noopener noreferrer">
                        {s.title}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </details>
      </div>
    </footer>
  );
}
