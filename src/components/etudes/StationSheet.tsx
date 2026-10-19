"use client";

import { mapTexts } from "@/lib/etudes/cohorte";
import { laneName, type LaneId } from "@/lib/etudes/lines";
import { LANES, LANE_DEFS, UNIVERSITY_TRACKS, laneOf, placedById, routeOf } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { ecoleById, ecoles } from "@/lib/etudes/ecoles";
import { passerelles } from "@/lib/etudes/passerelles";
import { useCohort } from "./cohorte";
import { Sheet, StepButton } from "./Sheet";
import { SaveButton } from "./store";
import { Dot, Icon, Meter } from "./ui";

type Props = {
  id: string;
  line: LaneId | null;
  onClose: () => void;
  onNavigate: (id: string, line: LaneId | null) => void;
  onOpenEcole: (id: string) => void;
  onOpenPasserelle: (id: string) => void;
};

export function StationSheet({ id, line, onClose, onNavigate, onOpenEcole, onOpenPasserelle }: Props) {
  const { y } = useCohort();
  const raw = stationById[id];
  if (!raw) return null;
  const st = mapTexts(raw, y);
  const p = placedById[id];
  const track = UNIVERSITY_TRACKS[id];

  // Une licence de l'université est rattachée à son thème ; sur la carte, elle se lit sur la voie Université.
  const ctx: LaneId | null = track ? "u" : (line ?? laneOf(id));
  const route = ctx ? routeOf(ctx) : ["college", "seconde", "premiere-terminale", "bac"];
  const idx = route.indexOf(track ? "universite" : id);
  const prev = idx > 0 ? route[idx - 1] : null;
  const next = idx >= 0 && idx < route.length - 1 ? route[idx + 1] : null;
  const atFork = id === "bac" && !line;
  const schoolIds = [...new Set([...(st.ecoles ?? []), ...ecoles.filter((e) => e.station === id).map((e) => e.id)])];
  const outgoing = passerelles.filter((x) => x.from.includes(id));
  const incoming = passerelles.filter((x) => x.to === id);

  const meta =
    p?.kind === "trunk" ? (
      <span>Tronc commun, toutes les voies</span>
    ) : track ? (
      <span>
        <Dot line="u" /> Université, {laneName(track)}
      </span>
    ) : ctx ? (
      <span>
        <Dot line={ctx} /> {laneName(ctx)}
      </span>
    ) : null;
  const licences = id === "universite" ? Object.keys(UNIVERSITY_TRACKS).filter((k) => stationById[k]) : [];

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
          <h3>Pour y entrer</h3>
          <ul className="e-list">
            {st.acces.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.contenu?.length ? (
        <section className="e-sec">
          <h3>Ce que tu y fais</h3>
          <ul className="e-list">
            {st.contenu.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.apres?.length ? (
        <section className="e-sec">
          <h3>Et ensuite</h3>
          <ul className="e-taglist">
            {st.apres.map((a) => (
              <li key={a}>{a}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {st.astuce ? (
        <div className="e-note">
          <strong>Le conseil</strong>
          {st.astuce}
        </div>
      ) : null}

      {id === "college" || id === "seconde" ? (
        <section className="e-sec">
          <h3>Les lycées</h3>
          <ul className="e-rows">
            <li>
              <a className="e-row" href="#annuaire-lycees" onClick={onClose}>
                <Icon name="school" />
                <span>
                  <span className="e-row__v">L&apos;annuaire des lycées</span>
                  <span className="e-row__k">Pensionnats de l&apos;Ouest, grands lycées de Paris et de Versailles</span>
                </span>
                <Icon name="chevron-right" />
              </a>
            </li>
          </ul>
        </section>
      ) : null}

      {atFork ? (
        <section className="e-sec">
          <h3>Choisis ta voie</h3>
          <ul className="e-rows">
            {LANES.map((l) => {
              const first = LANE_DEFS[l].segs[0].id;
              return (
                <li key={l}>
                  <button type="button" className="e-row" onClick={() => onNavigate(first, l)}>
                    <Dot line={l} />
                    <span>
                      <span className="e-row__v">{stationById[first]?.name}</span>
                      <span className="e-row__k">{laneName(l)}</span>
                    </span>
                    <Icon name="chevron-right" />
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
      ) : null}

      {licences.length ? (
        <section className="e-sec">
          <h3>Les licences, voie par voie</h3>
          <ul className="e-rows">
            {licences.map((k) => (
              <li key={k}>
                <button type="button" className="e-row" onClick={() => onNavigate(k, "u")}>
                  <Dot line={UNIVERSITY_TRACKS[k]} />
                  <span>
                    <span className="e-row__v">{stationById[k].name}</span>
                    <span className="e-row__k">{laneName(UNIVERSITY_TRACKS[k])}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {schoolIds.length ? (
        <section className="e-sec">
          <h3>Les établissements de cette étape</h3>
          <ul className="e-rows">
            {schoolIds.map((eid) => {
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
          <h3>Passerelles</h3>
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
