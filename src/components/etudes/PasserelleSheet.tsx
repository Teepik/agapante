"use client";

import { passerelleById, passerelles } from "@/lib/etudes/passerelles";
import { placedById } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import type { LineId } from "@/lib/etudes/lines";
import { Sheet } from "./Sheet";
import { Bullet, Icon } from "./ui";

export function PasserelleSheet({
  id,
  onClose,
  onOpenStation,
  onOpenPasserelle,
}: {
  id: string;
  onClose: () => void;
  onOpenStation: (id: string, line: LineId | null) => void;
  onOpenPasserelle: (id: string) => void;
}) {
  const x = passerelleById[id];
  if (!x) return null;
  const to = stationById[x.to];
  const toLine = placedById[x.to]?.line ?? null;
  const i = passerelles.findIndex((p) => p.id === id);
  const prev = i > 0 ? passerelles[i - 1] : null;
  const next = i < passerelles.length - 1 ? passerelles[i + 1] : null;

  return (
    <Sheet
      labelId="et-pass-title"
      line={toLine}
      resetKey={id}
      onClose={onClose}
      top={
        <span className="et-pass-kicker">
          <span className="et-pbadge-num">{x.num}</span> Passerelle
        </span>
      }
      title={x.title}
      when={x.when}
      footer={
        <>
          {prev ? (
            <button type="button" className="et-navbtn" onClick={() => onOpenPasserelle(prev.id)}>
              <Icon name="chevron-left" />
              <span>
                <span className="et-navbtn__k">Passerelle {prev.num}</span>
                <span className="et-navbtn__v">{prev.title}</span>
              </span>
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button type="button" className="et-navbtn et-navbtn--next" onClick={() => onOpenPasserelle(next.id)}>
              <span>
                <span className="et-navbtn__k">Passerelle {next.num}</span>
                <span className="et-navbtn__v">{next.title}</span>
              </span>
              <Icon name="chevron-right" />
            </button>
          ) : null}
        </>
      }
    >
      <div className="et-pass-route">
        <div className="et-pass-route__end">
          <span className="et-pass-route__k">Tu pars de</span>
          <span className="et-pass-route__v">
            {x.fromLines.map((l) => (
              <Bullet key={l} line={l} size="sm" />
            ))}
            {x.fromLabel}
          </span>
        </div>
        <span className="et-pass-route__rail" aria-hidden="true" />
        <div className="et-pass-route__end">
          <span className="et-pass-route__k">Tu arrives à</span>
          <span className="et-pass-route__v">
            {toLine ? <Bullet line={toLine} size="sm" /> : <Bullet line="u" size="sm" />}
            {to?.name}
          </span>
        </div>
      </div>

      <p className="et-sheet__what">{x.how}</p>

      {x.who ? (
        <section className="et-sheet__sec">
          <h4>
            <Icon name="key" /> Pour qui
          </h4>
          <p className="et-p">{x.who}</p>
        </section>
      ) : null}

      {x.note ? (
        <aside className="et-tip">
          <Icon name="lightbulb" />
          <p>{x.note}</p>
        </aside>
      ) : null}

      <div className="et-pass-actions">
        {x.from.map((fid) => (
          <button key={fid} type="button" className="et-btn et-btn--sm" onClick={() => onOpenStation(fid, null)}>
            <Icon name="chevron-left" /> {stationById[fid]?.name}
          </button>
        ))}
        <button type="button" className="et-btn et-btn--sm et-btn--primary" onClick={() => onOpenStation(x.to, toLine)}>
          {to?.name} <Icon name="chevron-right" />
        </button>
      </div>
    </Sheet>
  );
}
