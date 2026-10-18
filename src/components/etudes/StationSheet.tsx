"use client";

import { lineById, linesByNum, type LineId } from "@/lib/etudes/lines";
import { LINE_STOPS, linesAt, placedById, routeOf } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { ecoleById } from "@/lib/etudes/ecoles";
import { passerelles } from "@/lib/etudes/passerelles";
import { Sheet } from "./Sheet";
import { Bullet, Gauge, Icon, lineLabel } from "./ui";

type Props = {
  id: string;
  line: LineId | null;
  onClose: () => void;
  onNavigate: (id: string, line: LineId | null) => void;
  onShowEcole: (id: string) => void;
  onOpenPasserelle: (id: string) => void;
};

export function StationSheet({ id, line, onClose, onNavigate, onShowEcole, onOpenPasserelle }: Props) {
  const st = stationById[id];
  const p = placedById[id];
  if (!st || !p) return null;

  const served: (LineId | "u")[] = p.kind === "u" ? [...(p.line ? [p.line] : []), "u"] : linesAt(id);
  const ctx: LineId | null = line ?? p.line ?? null;
  const route = ctx ? routeOf(ctx) : ["college", "seconde", "premiere-terminale", "bac"];
  const idx = route.indexOf(id);
  const prev = idx > 0 ? route[idx - 1] : null;
  const next = idx >= 0 && idx < route.length - 1 ? route[idx + 1] : null;
  const atFork = id === "bac" && !line;
  const outgoing = passerelles.filter((x) => x.from.includes(id));
  const incoming = passerelles.filter((x) => x.to === id);

  return (
    <Sheet
      labelId="et-sheet-title"
      line={ctx}
      resetKey={id}
      onClose={onClose}
      top={
        <div className="et-sheet__lines" aria-label={`Desservie par : ${served.map(lineLabel).join(", ")}`}>
          {served.map((l) => (
            <Bullet key={l} line={l} />
          ))}
        </div>
      }
      title={st.name}
      when={st.when}
      footer={
        <>
          {prev ? (
            <button type="button" className="et-navbtn" onClick={() => onNavigate(prev, ctx)}>
              <Icon name="chevron-left" />
              <span>
                <span className="et-navbtn__k">Station précédente</span>
                <span className="et-navbtn__v">{stationById[prev]?.name}</span>
              </span>
            </button>
          ) : (
            <span />
          )}
          {next && !atFork ? (
            <button type="button" className="et-navbtn et-navbtn--next" onClick={() => onNavigate(next, ctx)}>
              <span>
                <span className="et-navbtn__k">{ctx ? `Suite de la ligne ${lineById[ctx].num}` : "Station suivante"}</span>
                <span className="et-navbtn__v">{stationById[next]?.name}</span>
              </span>
              <Icon name="chevron-right" />
            </button>
          ) : null}
        </>
      }
    >
      <p className="et-sheet__what">{st.what}</p>

      {st.facts?.length ? (
        <dl className="et-facts">
          {st.facts.map((f) => (
            <div key={f.label} className="et-facts__item">
              <dt>
                <Icon name={f.icon} width={18} height={18} />
                {f.label}
              </dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      ) : null}

      {typeof st.selectivite === "number" ? (
        <div className="et-sel">
          <span className="et-sel__label">Sélectivité</span>
          <Gauge value={st.selectivite} />
          {st.selectiviteNote ? <span className="et-sel__note">{st.selectiviteNote}</span> : null}
        </div>
      ) : null}

      {st.acces?.length ? (
        <section className="et-sheet__sec">
          <h4>
            <Icon name="key" /> Pour y entrer
          </h4>
          <ul className="et-list">
            {st.acces.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.contenu?.length ? (
        <section className="et-sheet__sec">
          <h4>
            <Icon name="book" /> Ce que tu y fais
          </h4>
          <ul className="et-list">
            {st.contenu.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.apres?.length ? (
        <section className="et-sheet__sec">
          <h4>
            <Icon name="flag" /> Et après ?
          </h4>
          <ul className="et-tags">
            {st.apres.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.astuce ? (
        <aside className="et-tip">
          <Icon name="lightbulb" />
          <p>{st.astuce}</p>
        </aside>
      ) : null}

      {outgoing.length || incoming.length ? (
        <section className="et-sheet__sec">
          <h4>
            <Icon name="route" /> Passerelles
          </h4>
          <ul className="et-pmini">
            {outgoing.map((x) => (
              <li key={x.id}>
                <button type="button" className="et-pmini__btn" onClick={() => onOpenPasserelle(x.id)}>
                  <span className="et-pbadge-num" aria-hidden="true">
                    {x.num}
                  </span>
                  <span>
                    <span className="et-pmini__k">Depuis ici, vers</span>
                    <span className="et-pmini__v">{stationById[x.to]?.name}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            ))}
            {incoming.map((x) => (
              <li key={`in-${x.id}`}>
                <button type="button" className="et-pmini__btn" onClick={() => onOpenPasserelle(x.id)}>
                  <span className="et-pbadge-num" aria-hidden="true">
                    {x.num}
                  </span>
                  <span>
                    <span className="et-pmini__k">On arrive aussi ici depuis</span>
                    <span className="et-pmini__v">{x.fromLabel}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.ecoles?.length ? (
        <section className="et-sheet__sec">
          <h4>
            <Icon name="ticket" /> Les écoles de cette station
          </h4>
          <ul className="et-minitix">
            {st.ecoles.map((eid) => {
              const e = ecoleById[eid];
              if (!e) return null;
              return (
                <li key={eid}>
                  <button type="button" className="et-minitix__btn" data-line={e.line} onClick={() => onShowEcole(eid)}>
                    <span className="et-minitix__name">{e.name}</span>
                    <span className="et-minitix__city">{e.ville}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {atFork ? (
        <section className="et-sheet__sec">
          <h4>
            <Icon name="route" /> Choisis ta ligne
          </h4>
          <ul className="et-fork">
            {linesByNum.map((l) => {
              const first = LINE_STOPS[l.id].r1;
              if (!first) return null;
              return (
                <li key={l.id}>
                  <button type="button" className="et-fork__btn" data-line={l.id} onClick={() => onNavigate(first, l.id)}>
                    <Bullet line={l.id} />
                    <span>
                      <strong>{stationById[first]?.name}</strong>
                      <span>{l.name}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}
    </Sheet>
  );
}
