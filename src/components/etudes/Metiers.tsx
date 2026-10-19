"use client";

import { useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { cle } from "@/lib/etudes/communes";
import { laneName, type LaneId } from "@/lib/etudes/lines";
import { FAMILLES, metierById, metiers, type Metier } from "@/lib/etudes/metiers";
import { stationById } from "@/lib/etudes/stations";
import { Dot, Icon } from "./ui";

const EXEMPLES = ["kinesitherapeute", "ingenieur-ia", "avocat", "infirmier", "electricien", "architecte"];

/** Le nom court d'une étape, pour les routes. */
function etape(id: string): string {
  const st = stationById[id];
  return st?.label ?? st?.name ?? id;
}

function host(u: string): string {
  try {
    return new URL(u).hostname.replace(/^www\./, "");
  } catch {
    return u;
  }
}

const KEYS = metiers.map((m) => ({ m, k: cle(`${m.name} ${FAMILLES[m.famille]}`) }));

/** « Je veux devenir… » : un métier, ses études, son salaire de départ et les routes qui y mènent. */
export function Metiers({
  selected,
  onSelect,
  onShowOnMap,
  onOpenStation,
}: {
  selected: string | null;
  onSelect: (id: string | null) => void;
  onShowOnMap: (id: string) => void;
  onOpenStation: (id: string, line: LaneId | null) => void;
}) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [famille, setFamille] = useState<number | null>(null);
  const listId = useId();
  const cardRef = useRef<HTMLDivElement>(null);
  const m = selected ? metierById[selected] : null;

  const suggestions = useMemo(() => {
    const k = cle(q);
    if (k.length < 2) return [];
    return KEYS.filter((x) => x.k.includes(k))
      .sort((a, b) => Number(!a.k.startsWith(k)) - Number(!b.k.startsWith(k)))
      .slice(0, 8)
      .map((x) => x.m);
  }, [q]);

  const inFamille = useMemo(() => (famille === null ? [] : metiers.filter((x) => x.famille === famille)), [famille]);

  // Un métier choisi depuis le test ou l'adresse : sa famille s'ouvre.
  useEffect(() => {
    if (m) setFamille(m.famille);
  }, [m]);

  function choose(x: Metier) {
    onSelect(x.id);
    setQ("");
    setOpen(false);
    window.requestAnimationFrame(() => {
      if (window.matchMedia("(max-width: 1080px)").matches) cardRef.current?.scrollIntoView({ behavior: "smooth" });
    });
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, Math.max(suggestions.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const x = suggestions[active] ?? suggestions[0];
      if (x) {
        e.preventDefault();
        choose(x);
      }
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  }

  const expanded = open && suggestions.length > 0;

  return (
    <div className="e-jobs">
      <div className="e-jobs__pick">
        <div className="e-fr__combo">
          <label className="e-field">
            <Icon name="search" />
            <span className="e-sr">Je veux devenir</span>
            <input
              type="search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={expanded}
              aria-controls={listId}
              aria-activedescendant={expanded ? `${listId}-${active}` : undefined}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
                setActive(0);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setOpen(false)}
              onKeyDown={onKey}
              placeholder="Je veux devenir… kiné, ingénieur, avocate"
              autoComplete="off"
            />
          </label>
          <ul id={listId} role="listbox" aria-label="Métiers" className="e-suggest" hidden={!expanded}>
            {suggestions.map((x, i) => (
              <li
                key={x.id}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(x);
                }}
                onMouseEnter={() => setActive(i)}
              >
                <span className="e-suggest__name">{x.name}</span>
                <span className="e-suggest__detail">{x.etudes}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="e-jobs__k" id={`${listId}-f`}>
          Ou parcours les {FAMILLES.length} familles de métiers
        </p>
        <div className="e-jobs__fams" role="group" aria-labelledby={`${listId}-f`}>
          {FAMILLES.map((f, i) => (
            <button
              key={f}
              type="button"
              className="e-chip"
              aria-pressed={famille === i}
              onClick={() => setFamille(famille === i ? null : i)}
            >
              {f}
            </button>
          ))}
        </div>

        {famille !== null ? (
          <ul className="e-jobs__list" aria-label={FAMILLES[famille]}>
            {inFamille.map((x) => (
              <li key={x.id}>
                <button
                  type="button"
                  className="e-jobs__item"
                  aria-pressed={selected === x.id}
                  onClick={() => choose(x)}
                >
                  <span className="e-jobs__name">{x.name}</span>
                  <span className="e-jobs__etudes">{x.etudes}</span>
                </button>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="e-jobs__card" ref={cardRef} aria-live="polite">
        {m ? (
          <Fiche m={m} onShowOnMap={onShowOnMap} onOpenStation={onOpenStation} onClose={() => onSelect(null)} />
        ) : (
          <div className="e-jobs__start">
            <p className="e-jobs__start-t">Choisis un métier</p>
            <p className="e-sub">
              Tu vois ses études, son salaire au début et les routes de la carte qui y mènent, souvent plus d&apos;une.
            </p>
            <div className="e-jobs__ex">
              {EXEMPLES.filter((id) => metierById[id]).map((id) => (
                <button key={id} type="button" className="e-chip" onClick={() => choose(metierById[id])}>
                  {metierById[id].name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function Fiche({
  m,
  onShowOnMap,
  onOpenStation,
  onClose,
}: {
  m: Metier;
  onShowOnMap: (id: string) => void;
  onOpenStation: (id: string, line: LaneId | null) => void;
  onClose: () => void;
}) {
  return (
    <article className="e-job">
      <header className="e-job__head">
        <p className="e-job__fam">{FAMILLES[m.famille]}</p>
        <button type="button" className="e-iconbtn" onClick={onClose} aria-label="Fermer la fiche du métier">
          <Icon name="close" />
        </button>
      </header>
      <h3 className="e-job__name">{m.name}</h3>
      <p className="e-job__pitch">{m.pitch}</p>

      <dl className="e-facts">
        <div>
          <dt>Études</dt>
          <dd>{m.etudes}</dd>
        </div>
        {m.salaire ? (
          <div>
            <dt>Au début{m.salaire.annee ? `, en ${m.salaire.annee}` : ""}</dt>
            <dd>{m.salaire.debut}</dd>
          </div>
        ) : null}
        {m.emploi ? (
          <div style={{ gridColumn: "1 / -1" }}>
            <dt>L&apos;emploi</dt>
            <dd>{m.emploi.texte}</dd>
          </div>
        ) : null}
      </dl>

      <section className="e-sec">
        <h3>{m.routes.length > 1 ? `${m.routes.length} routes pour y arriver` : "La route pour y arriver"}</h3>
        <ol className="e-job__routes">
          {m.routes.map((r) => (
            <li key={r.via.join(">")} data-line={r.lane}>
              <p className="e-job__lane">
                <Dot line={r.lane} /> {laneName(r.lane)}
              </p>
              <ol className="e-job__steps">
                {r.via.map((id) => (
                  <li key={id}>
                    <button
                      type="button"
                      className="e-link"
                      onClick={() => onOpenStation(id, r.lane)}
                      disabled={!stationById[id]}
                    >
                      {etape(id)}
                    </button>
                  </li>
                ))}
              </ol>
              <p className="e-job__texte">{r.texte}</p>
            </li>
          ))}
        </ol>
      </section>

      <div className="e-job__actions">
        <button type="button" className="e-btn e-btn--primary e-btn--sm" onClick={() => onShowOnMap(m.id)}>
          <Icon name="map" /> Voir les routes sur la carte
        </button>
        {m.onisep ? (
          <a className="e-btn e-btn--sm" href={m.onisep} target="_blank" rel="noopener noreferrer">
            <Icon name="external" /> Fiche Onisep
          </a>
        ) : null}
      </div>

      {m.salaire?.source || m.emploi?.source ? (
        <p className="e-small e-muted">
          Sources :{" "}
          {[m.salaire?.source, m.emploi?.source]
            .filter((u, i, a): u is string => Boolean(u) && a.indexOf(u) === i)
            .map((u, i) => (
              <span key={u}>
                {i ? ", " : ""}
                <a className="e-link" href={u} target="_blank" rel="noopener noreferrer">
                  {host(u)}
                </a>
              </span>
            ))}
          .
        </p>
      ) : null}
    </article>
  );
}
