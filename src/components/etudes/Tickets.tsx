"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { ecoles, type Ecole } from "@/lib/etudes/ecoles";
import { lineById, linesByNum, type LineId } from "@/lib/etudes/lines";
import { Bullet, Icon } from "./ui";

function norm(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function Tickets({
  focusId,
  onOpenStation,
}: {
  /** Ticket à mettre en avant (depuis une fiche station). */
  focusId: { id: string; n: number } | null;
  onOpenStation: (id: string) => void;
}) {
  const [line, setLine] = useState<LineId | "all">("all");
  const [q, setQ] = useState("");
  const [flipped, setFlipped] = useState<Set<string>>(new Set());
  const [punched, setPunched] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!focusId) return;
    const e = ecoles.find((x) => x.id === focusId.id);
    if (!e) return;
    setLine("all");
    setQ("");
    setFlipped((f) => new Set(f).add(e.id));
    setPunched((p) => new Set(p).add(e.id));
    window.requestAnimationFrame(() => {
      const el = document.getElementById(`ticket-${e.id}`);
      el?.scrollIntoView({ behavior: "smooth", block: "center" });
      el?.classList.add("is-spot");
      window.setTimeout(() => el?.classList.remove("is-spot"), 1600);
    });
  }, [focusId]);

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return ecoles.filter(
      (e) =>
        (line === "all" || e.line === line) &&
        (!nq || norm(`${e.name} ${e.short ?? ""} ${e.ville} ${e.kind}`).includes(nq)),
    );
  }, [line, q]);

  function flip(id: string) {
    setFlipped((f) => {
      const n = new Set(f);
      if (n.has(id)) n.delete(id);
      else n.add(id);
      return n;
    });
    setPunched((p) => new Set(p).add(id));
  }

  return (
    <div className="et-tix">
      <div className="et-tix__bar">
        <div className="et-tix__filters" role="group" aria-label="Filtrer par ligne">
          <button type="button" className="et-chip" aria-pressed={line === "all"} onClick={() => setLine("all")}>
            Toutes
          </button>
          {linesByNum.map((l) => (
            <button
              key={l.id}
              type="button"
              className="et-chip et-chip--line"
              data-line={l.id}
              aria-pressed={line === l.id}
              onClick={() => setLine(line === l.id ? "all" : l.id)}
            >
              <Bullet line={l.id} size="sm" /> {l.short}
            </button>
          ))}
        </div>
        <label className="et-search">
          <Icon name="search" />
          <span className="et-sr">Chercher une école ou une ville</span>
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Une école, une ville…"
            autoComplete="off"
          />
        </label>
      </div>

      <p className="et-tix__count" aria-live="polite">
        {list.length} {list.length > 1 ? "billets" : "billet"} sur {ecoles.length}
        {line !== "all" ? `, ligne ${lineById[line].num}` : ""}
      </p>

      {list.length ? (
        <ul className="et-tix__grid">
          {list.map((e) => (
            <li key={e.id}>
              <Ticket
                e={e}
                flipped={flipped.has(e.id)}
                punched={punched.has(e.id)}
                onFlip={() => flip(e.id)}
                onOpenStation={onOpenStation}
              />
            </li>
          ))}
        </ul>
      ) : (
        <div className="et-tix__empty">
          <p>Aucun billet ne correspond. Essaie un autre mot, ou affiche toutes les lignes.</p>
          <button
            type="button"
            className="et-btn et-btn--sm"
            onClick={() => {
              setQ("");
              setLine("all");
            }}
          >
            Tout afficher
          </button>
        </div>
      )}
    </div>
  );
}

function Ticket({
  e,
  flipped,
  punched,
  onFlip,
  onOpenStation,
}: {
  e: Ecole;
  flipped: boolean;
  punched: boolean;
  onFlip: () => void;
  onOpenStation: (id: string) => void;
}) {
  const backRef = useRef<HTMLButtonElement>(null);
  const frontRef = useRef<HTMLButtonElement>(null);
  const first = useRef(true);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    (flipped ? backRef : frontRef).current?.focus({ preventScroll: true });
  }, [flipped]);

  const l = lineById[e.line];
  return (
    <article id={`ticket-${e.id}`} className={`et-ticket${flipped ? " is-flipped" : ""}${punched ? " is-punched" : ""}`} data-line={e.line}>
      <div className="et-ticket__inner">
        <div className="et-ticket__face et-ticket__front" inert={flipped}>
          <div className="et-ticket__band">
            <Bullet line={e.line} size="sm" />
            <span>{l.short}</span>
            <span className="et-ticket__kind">{e.kind}</span>
          </div>
          <h3 className="et-ticket__name">{e.name}</h3>
          <p className="et-ticket__city">
            <Icon name="pin" width={15} height={15} /> {e.ville}
          </p>
          <dl className="et-ticket__facts">
            <div>
              <dt>Accès</dt>
              <dd>{e.acces}</dd>
            </div>
            <div>
              <dt>Durée</dt>
              <dd>{e.duree}</dd>
            </div>
            {e.places ? (
              <div>
                <dt>Places</dt>
                <dd>{e.places}</dd>
              </div>
            ) : null}
            {e.cout ? (
              <div>
                <dt>Coût</dt>
                <dd>{e.cout}</dd>
              </div>
            ) : null}
          </dl>
          <button ref={frontRef} type="button" className="et-ticket__flip" onClick={onFlip} aria-label={`Composter le billet ${e.name} pour voir le détail`}>
            <Icon name="ticket" /> Composter
          </button>
        </div>

        <div className="et-ticket__face et-ticket__back" inert={!flipped}>
          <div className="et-ticket__stripe" aria-hidden="true" />
          <h3 className="et-ticket__name et-ticket__name--back">{e.name}</h3>
          <dl className="et-ticket__more">
            <div>
              <dt>On y apprend</dt>
              <dd>{e.formations}</dd>
            </div>
            <div>
              <dt>Et après</dt>
              <dd>{e.debouches}</dd>
            </div>
            <div>
              <dt>Le détail qui compte</dt>
              <dd>{e.plus}</dd>
            </div>
          </dl>
          <div className="et-ticket__actions">
            <button ref={backRef} type="button" className="et-ticket__flip" onClick={onFlip}>
              <Icon name="refresh" /> Retourner
            </button>
            {e.station ? (
              <button type="button" className="et-linkbtn" onClick={() => onOpenStation(e.station!)}>
                <Icon name="map" /> Sa station
              </button>
            ) : null}
            {e.url ? (
              <a className="et-linkbtn" href={e.url} target="_blank" rel="noopener noreferrer">
                <Icon name="external" /> Site officiel
              </a>
            ) : null}
          </div>
        </div>
      </div>
      <span className="et-ticket__hole" aria-hidden="true" />
    </article>
  );
}
