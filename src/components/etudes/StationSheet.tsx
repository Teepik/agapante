"use client";

import { lineById, linesByNum, type LineId } from "@/lib/etudes/lines";
import { LINE_STOPS, placedById, routeOf } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { ecoleById } from "@/lib/etudes/ecoles";
import { passerelles } from "@/lib/etudes/passerelles";
import { Sheet, StepButton } from "./Sheet";
import { SaveButton } from "./store";
import { Dot, Icon, Meter } from "./ui";

type Props = {
  id: string;
  line: LineId | null;
  onClose: () => void;
  onNavigate: (id: string, line: LineId | null) => void;
  onOpenEcole: (id: string) => void;
  onOpenPasserelle: (id: string) => void;
};

export function StationSheet({ id, line, onClose, onNavigate, onOpenEcole, onOpenPasserelle }: Props) {
  const st = stationById[id];
  const p = placedById[id];
  if (!st || !p) return null;

  const ctx: LineId | null = line ?? p.line ?? null;
  const route = ctx ? routeOf(ctx) : ["college", "seconde", "premiere-terminale", "bac"];
  const idx = route.indexOf(id);
  const prev = idx > 0 ? route[idx - 1] : null;
  const next = idx >= 0 && idx < route.length - 1 ? route[idx + 1] : null;
  const atFork = id === "bac" && !line;
  const outgoing = passerelles.filter((x) => x.from.includes(id));
  const incoming = passerelles.filter((x) => x.to === id);

  const meta =
    p.kind === "trunk" ? (
      <span>Tronc commun, toutes les voies</span>
    ) : p.kind === "u" ? (
      <span>
        <Dot line="u" /> Université{p.line ? `, ${lineById[p.line].name}` : ""}
      </span>
    ) : ctx ? (
      <span>
        <Dot line={ctx} /> {lineById[ctx].name}
      </span>
    ) : null;

  return (
    <Sheet
      labelId="e-station-title"
      line={ctx}
      resetKey={id}
      onClose={onClose}
      meta={meta}
      title={st.name}
      when={st.when}
      actions={<SaveButton kind="station" id={id} name={st.name} />}
      footer={
        <>
          {prev ? (
            <StepButton
              dir="prev"
              label="Étape précédente"
              value={stationById[prev]?.name ?? ""}
              onClick={() => onNavigate(prev, ctx)}
            />
          ) : (
            <span />
          )}
          {next && !atFork ? (
            <StepButton
              dir="next"
              label="Étape suivante"
              value={stationById[next]?.name ?? ""}
              onClick={() => onNavigate(next, ctx)}
            />
          ) : null}
        </>
      }
    >
      <p className="e-sheet__lead">{st.what}</p>

      {st.facts?.length || typeof st.selectivite === "number" ? (
        <dl className="e-facts">
          {st.facts?.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
          {typeof st.selectivite === "number" ? (
            <div>
              <dt>Sélectivité</dt>
              <dd>
                <Meter value={st.selectivite} label={`Sélectivité ${st.selectivite} sur 5`} line={ctx ?? undefined} />
                {st.selectiviteNote ? (
                  <span className="e-sub e-small" style={{ display: "block", fontWeight: 450 }}>
                    {st.selectiviteNote}
                  </span>
                ) : null}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {st.acces?.length ? (
        <section className="e-sec">
          <h4>Pour y entrer</h4>
          <ul className="e-list">
            {st.acces.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.contenu?.length ? (
        <section className="e-sec">
          <h4>Ce que tu y fais</h4>
          <ul className="e-list">
            {st.contenu.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.apres?.length ? (
        <section className="e-sec">
          <h4>Et ensuite</h4>
          <ul className="e-taglist">
            {st.apres.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.astuce ? (
        <aside className="e-note">
          <strong>Le conseil</strong>
          {st.astuce}
        </aside>
      ) : null}

      {atFork ? (
        <section className="e-sec">
          <h4>Choisis ta voie</h4>
          <ul className="e-rows">
            {linesByNum.map((l) => {
              const first = LINE_STOPS[l.id].r1;
              if (!first) return null;
              return (
                <li key={l.id}>
                  <button type="button" className="e-row" onClick={() => onNavigate(first, l.id)}>
                    <Dot line={l.id} />
                    <span>
                      <span className="e-row__v">{stationById[first]?.name}</span>
                      <span className="e-row__k">{l.name}</span>
                    </span>
                    <Icon name="chevron-right" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {st.ecoles?.length ? (
        <section className="e-sec">
          <h4>Les établissements de cette étape</h4>
          <ul className="e-rows">
            {st.ecoles.map((eid) => {
              const e = ecoleById[eid];
              if (!e) return null;
              return (
                <li key={eid}>
                  <button type="button" className="e-row" onClick={() => onOpenEcole(eid)}>
                    <Dot line={e.line} />
                    <span>
                      <span className="e-row__v">{e.name}</span>
                      <span className="e-row__k">{e.ville}</span>
                    </span>
                    <Icon name="chevron-right" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {outgoing.length || incoming.length ? (
        <section className="e-sec">
          <h4>Passerelles</h4>
          <ul className="e-rows">
            {outgoing.map((x) => (
              <li key={x.id}>
                <button type="button" className="e-row" onClick={() => onOpenPasserelle(x.id)}>
                  <span className="e-numbadge">{x.num}</span>
                  <span>
                    <span className="e-row__k">D&apos;ici, vers</span>
                    <span className="e-row__v">{stationById[x.to]?.name}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            ))}
            {incoming.map((x) => (
              <li key={`in-${x.id}`}>
                <button type="button" className="e-row" onClick={() => onOpenPasserelle(x.id)}>
                  <span className="e-numbadge">{x.num}</span>
                  <span>
                    <span className="e-row__k">On arrive aussi ici depuis</span>
                    <span className="e-row__v">{x.fromLabel}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}
    </Sheet>
  );
}
