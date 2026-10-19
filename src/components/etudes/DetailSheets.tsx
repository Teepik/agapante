"use client";

import { ecoleById, ecoles } from "@/lib/etudes/ecoles";
import { lineById, type LaneId } from "@/lib/etudes/lines";
import { lyceeById, lyceeInternat, lycees, statutLabel, type Lycee } from "@/lib/etudes/lycees";
import { passerelleById, passerelles } from "@/lib/etudes/passerelles";
import { laneOf } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { Sheet, StepButton } from "./Sheet";
import { SaveButton } from "./store";
import { Dot, Icon } from "./ui";

/* --------------------------------------------------------------------------
   Établissement après le bac
   -------------------------------------------------------------------------- */

export function EcoleSheet({
  id,
  onClose,
  onOpenEcole,
  onOpenStation,
}: {
  id: string;
  onClose: () => void;
  onOpenEcole: (id: string) => void;
  onOpenStation: (id: string, line: LaneId | null) => void;
}) {
  const e = ecoleById[id];
  if (!e) return null;
  const same = ecoles.filter((x) => x.line === e.line);
  const i = same.findIndex((x) => x.id === id);
  const prev = i > 0 ? same[i - 1] : null;
  const next = i < same.length - 1 ? same[i + 1] : null;

  return (
    <Sheet
      labelId="e-ecole-title"
      line={e.line}
      resetKey={id}
      onClose={onClose}
      meta={
        <>
          <span>
            <Dot line={e.line} /> {lineById[e.line].name}
          </span>
          <span>{e.kind}</span>
        </>
      }
      title={e.name}
      when={e.ville}
      actions={
        <>
          <SaveButton kind="ecole" id={e.id} name={e.name} />
          {e.url ? (
            <a className="e-btn e-btn--sm" href={e.url} target="_blank" rel="noopener noreferrer">
              <Icon name="external" /> Site officiel
            </a>
          ) : null}
        </>
      }
      footer={
        <>
          {prev ? (
            <StepButton
              dir="prev"
              label="Établissement précédent"
              value={prev.name}
              onClick={() => onOpenEcole(prev.id)}
            />
          ) : (
            <span />
          )}
          {next ? (
            <StepButton
              dir="next"
              label="Établissement suivant"
              value={next.name}
              onClick={() => onOpenEcole(next.id)}
            />
          ) : null}
        </>
      }
    >
      <dl className="e-facts">
        <div>
          <dt>Pour y entrer</dt>
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
      <section className="e-sec">
        <h3>Ce qu&apos;on y apprend</h3>
        <p>{e.formations}</p>
      </section>
      <section className="e-sec">
        <h3>Où cela mène</h3>
        <p>{e.debouches}</p>
      </section>
      <div className="e-note">
        <strong>Le détail qui compte</strong>
        {e.plus}
      </div>
      {e.sources?.length ? <Sources urls={e.sources} /> : null}
      {e.station && stationById[e.station] ? (
        <section className="e-sec">
          <h3>Sur la carte</h3>
          <ul className="e-rows">
            <li>
              <button
                type="button"
                className="e-row"
                onClick={() => onOpenStation(e.station!, laneOf(e.station!) ?? e.line)}
              >
                <Dot line={e.line} />
                <span>
                  <span className="e-row__k">L&apos;étape</span>
                  <span className="e-row__v">{stationById[e.station].name}</span>
                </span>
                <Icon name="chevron-right" />
              </button>
            </li>
          </ul>
        </section>
      ) : null}
    </Sheet>
  );
}

/* --------------------------------------------------------------------------
   Lycée de l'annuaire
   -------------------------------------------------------------------------- */

export function LyceeSheet({
  id,
  onClose,
  onOpenLycee,
}: {
  id: string;
  onClose: () => void;
  onOpenLycee: (id: string) => void;
}) {
  const l = lyceeById[id];
  if (!l) return null;
  const same = lycees.filter(
    (x) => (x.zone === "paris" || x.zone === "idf") === (l.zone === "paris" || l.zone === "idf"),
  );
  const i = same.findIndex((x) => x.id === id);
  const prev = i > 0 ? same[i - 1] : null;
  const next = i < same.length - 1 ? same[i + 1] : null;
  const r = l.resultats;

  return (
    <Sheet
      labelId="e-lycee-title"
      resetKey={id}
      onClose={onClose}
      meta={
        <>
          <span>{statutLabel[l.statut]}</span>
          {l.tutelle ? <span>{l.tutelle}</span> : l.confession ? <span>{l.confession}</span> : null}
        </>
      }
      title={l.name}
      when={`${l.ville}, ${l.departement}`}
      actions={
        <>
          <SaveButton kind="lycee" id={l.id} name={l.name} />
          {l.url ? (
            <a className="e-btn e-btn--sm" href={l.url} target="_blank" rel="noopener noreferrer">
              <Icon name="external" /> Site officiel
            </a>
          ) : null}
        </>
      }
      footer={
        <>
          {prev ? (
            <StepButton
              dir="prev"
              label="Lycée précédent"
              value={prev.short ?? prev.name}
              onClick={() => onOpenLycee(prev.id)}
            />
          ) : (
            <span />
          )}
          {next ? (
            <StepButton
              dir="next"
              label="Lycée suivant"
              value={next.short ?? next.name}
              onClick={() => onOpenLycee(next.id)}
            />
          ) : null}
        </>
      }
    >
      {l.points ? <p className="e-sheet__lead">{l.points}</p> : null}

      <dl className="e-facts">
        {r && typeof r.reussite === "number" ? (
          <div>
            <dt>Réussite au bac {r.session}</dt>
            <dd>{r.reussite} %</dd>
          </div>
        ) : null}
        {r && typeof r.mentions === "number" ? (
          <div>
            <dt>Mentions {r.session}</dt>
            <dd>{r.mentions} %</dd>
          </div>
        ) : null}
        {r && typeof r.tb === "number" ? (
          <div>
            <dt>Mentions très bien</dt>
            <dd>{r.tb} %</dd>
          </div>
        ) : null}
        {r && typeof r.va === "number" ? (
          <div>
            <dt>Valeur ajoutée</dt>
            <dd>
              {r.va > 0 ? "+" : ""}
              {r.va} {Math.abs(r.va) > 1 ? "points" : "point"}
            </dd>
          </div>
        ) : null}
        <div>
          <dt>Internat</dt>
          <dd>{internatText(l)}</dd>
        </div>
        {l.mixite ? (
          <div>
            <dt>Élèves</dt>
            <dd>
              {l.mixite.charAt(0).toUpperCase() + l.mixite.slice(1)}
              {l.effectif ? `, ${l.effectif}` : ""}
            </dd>
          </div>
        ) : null}
        {l.frais ? (
          <div style={{ gridColumn: "1 / -1" }}>
            <dt>Frais</dt>
            <dd>{l.frais}</dd>
          </div>
        ) : null}
      </dl>

      {l.internat?.existe && l.internat.note ? (
        <section className="e-sec">
          <h3>L&apos;internat</h3>
          <p>{l.internat.note}</p>
        </section>
      ) : null}

      {l.admission ? (
        <section className="e-sec">
          <h3>Pour y entrer en 2nde</h3>
          <p>{l.admission}</p>
        </section>
      ) : null}

      {l.options?.length ? (
        <section className="e-sec">
          <h3>Options et sections</h3>
          <ul className="e-taglist">
            {l.options.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {l.musique ? (
        <div className="e-note">
          <strong>La musique</strong>
          {l.musique}
        </div>
      ) : null}

      {l.prepas?.length ? (
        <section className="e-sec">
          <h3>Les prépas dans les murs</h3>
          <ul className="e-taglist">
            {l.prepas.map((o) => (
              <li key={o}>{o}</li>
            ))}
          </ul>
        </section>
      ) : null}

      {l.sources?.length ? <Sources urls={l.sources} /> : null}

      {r?.source ? (
        <p className="e-small e-muted">
          Résultats :{" "}
          <a className="e-link" href={r.source} target="_blank" rel="noopener noreferrer">
            source officielle
          </a>
          . La valeur ajoutée compare la réussite du lycée à celle attendue pour ses élèves.
        </p>
      ) : null}
    </Sheet>
  );
}

/* --------------------------------------------------------------------------
   Passerelle
   -------------------------------------------------------------------------- */

export function PasserelleSheet({
  id,
  onClose,
  onOpenStation,
  onOpenPasserelle,
  onShowOnMap,
}: {
  id: string;
  onClose: () => void;
  onOpenStation: (id: string, line: LaneId | null) => void;
  onOpenPasserelle: (id: string) => void;
  onShowOnMap: (id: string) => void;
}) {
  const x = passerelleById[id];
  if (!x) return null;
  const i = passerelles.findIndex((p) => p.id === id);
  const prev = i > 0 ? passerelles[i - 1] : null;
  const next = i < passerelles.length - 1 ? passerelles[i + 1] : null;
  const to = stationById[x.to];
  const toLine = laneOf(x.to);

  return (
    <Sheet
      labelId="e-pass-title"
      line={toLine}
      resetKey={id}
      onClose={onClose}
      meta={
        <span>
          <span className="e-numbadge">{x.num}</span> Passerelle
        </span>
      }
      title={x.title}
      when={x.when}
      actions={
        x.draw ? (
          <button type="button" className="e-btn e-btn--sm" onClick={() => onShowOnMap(x.id)}>
            <Icon name="map" /> Voir sur la carte
          </button>
        ) : null
      }
      footer={
        <>
          {prev ? (
            <StepButton
              dir="prev"
              label={`Passerelle ${prev.num}`}
              value={prev.title}
              onClick={() => onOpenPasserelle(prev.id)}
            />
          ) : (
            <span />
          )}
          {next ? (
            <StepButton
              dir="next"
              label={`Passerelle ${next.num}`}
              value={next.title}
              onClick={() => onOpenPasserelle(next.id)}
            />
          ) : null}
        </>
      }
    >
      <div className="e-from-to">
        <p>
          <Icon name="arrow-up" width={18} height={18} />
          <span>
            <span>Tu pars de</span>
            {x.fromLabel}
          </span>
        </p>
        <p>
          {toLine ? <Dot line={toLine} /> : <Dot line="u" />}
          <span>
            <span>Tu arrives à</span>
            {to?.name}
          </span>
        </p>
      </div>
      <p className="e-sheet__lead">{x.how}</p>
      {x.who ? (
        <section className="e-sec">
          <h3>Pour qui</h3>
          <p>{x.who}</p>
        </section>
      ) : null}
      {x.note ? (
        <div className="e-note">
          <strong>À savoir</strong>
          {x.note}
        </div>
      ) : null}
      <section className="e-sec">
        <h3>Les étapes concernées</h3>
        <ul className="e-rows">
          {[...x.from, x.to].map((sid) => {
            const st = stationById[sid];
            const ln = laneOf(sid);
            if (!st) return null;
            return (
              <li key={sid}>
                <button type="button" className="e-row" onClick={() => onOpenStation(sid, ln)}>
                  {ln ? <Dot line={ln} /> : <Dot line="u" />}
                  <span>
                    <span className="e-row__k">{sid === x.to ? "Arrivée" : "Départ"}</span>
                    <span className="e-row__v">{st.name}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            );
          })}
        </ul>
      </section>
    </Sheet>
  );
}

/** Les sources d'une fiche, en liens discrets. */
function Sources({ urls }: { urls: string[] }) {
  return (
    <section className="e-sec">
      <h3>Sources</h3>
      <ul className="e-srcs">
        {urls.map((u) => {
          let host = u;
          try {
            host = new URL(u).hostname.replace(/^www\./, "");
          } catch {
            /* adresse brute */
          }
          return (
            <li key={u}>
              <a href={u} target="_blank" rel="noopener noreferrer">
                {host}
              </a>
            </li>
          );
        })}
      </ul>
    </section>
  );
}

export function internatText(l: Lycee): string {
  const k = lyceeInternat(l);
  if (!k) return "Externat";
  if (k === "prepas") return "Réservé aux élèves de prépa";
  const pour = l.internat?.pour;
  const des = l.internat?.des;
  const from = des ? (/^(6e|5e|4e|3e|2nde)$/.test(des) ? `dès la ${des}` : des) : null;
  const txt = [pour, from].filter(Boolean).join(", ");
  return txt ? txt.charAt(0).toUpperCase() + txt.slice(1) : "Oui";
}
