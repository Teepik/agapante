"use client";

import { ecoleById, ecoles } from "@/lib/etudes/ecoles";
import { ECOLE_UAI } from "@/lib/etudes/ecoles-psup";
import { lineById, type LaneId } from "@/lib/etudes/lines";
import { lyceeById, lyceeInternat, lycees, statutLabel, type Lycee, type Resultats } from "@/lib/etudes/lycees";
import { voiesTexte } from "@/lib/etudes/lycees-fr";
import { passerelleById, passerelles } from "@/lib/etudes/passerelles";
import { laneOf } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { PsupSection } from "./FormationSheet";
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
  onOpenFormation,
}: {
  id: string;
  onClose: () => void;
  onOpenEcole: (id: string) => void;
  onOpenStation: (id: string, line: LaneId | null) => void;
  onOpenFormation: (id: string) => void;
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
      {ECOLE_UAI[e.id] ? <PsupSection uais={ECOLE_UAI[e.id]} onOpenFormation={onOpenFormation} /> : null}
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
  if (l.national) return <LyceeFranceSheet l={l} onClose={onClose} />;
  const same = lycees.filter(
    (x) => (x.zone === "paris" || x.zone === "idf") === (l.zone === "paris" || l.zone === "idf"),
  );
  const i = same.findIndex((x) => x.id === id);
  const prev = i > 0 ? same[i - 1] : null;
  const next = i >= 0 && i < same.length - 1 ? same[i + 1] : null;
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
            <dd>{points(r.va)}</dd>
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

/** « +3 points », « −1 point » */
export function points(v: number): string {
  return `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)} ${Math.abs(v) > 1 ? "points" : "point"}`;
}

/** La fiche d'un lycée de l'annuaire national : statut, voies, internat et résultats officiels. */
function LyceeFranceSheet({ l, onClose }: { l: Lycee; onClose: () => void }) {
  const n = l.national!;
  const voies = voiesTexte(l);
  const lead = [
    statutLabel[l.statut],
    voies ? voies.charAt(0).toLowerCase() + voies.slice(1) : "",
    l.internat?.existe ? "avec internat" : "",
  ]
    .filter(Boolean)
    .join(", ");
  const both = Boolean(l.resultats && n.pro);

  return (
    <Sheet
      labelId="e-lycee-title"
      resetKey={l.id}
      onClose={onClose}
      meta={
        <>
          <span>{statutLabel[l.statut]}</span>
          {n.agricole ? <span>Lycée agricole</span> : null}
        </>
      }
      title={l.name}
      when={`${l.ville}, ${l.departement}`}
      actions={
        <>
          <SaveButton kind="lycee" id={l.id} name={l.name} />
          {l.url ? (
            <a className="e-btn e-btn--sm" href={l.url} target="_blank" rel="noopener noreferrer">
              <Icon name="external" /> Site du lycée
            </a>
          ) : null}
          {n.onisep ? (
            <a className="e-btn e-btn--sm" href={n.onisep} target="_blank" rel="noopener noreferrer">
              <Icon name="external" /> Fiche Onisep
            </a>
          ) : null}
        </>
      }
    >
      <p className="e-sheet__lead">{lead}.</p>

      <dl className="e-facts">
        <div>
          <dt>Internat</dt>
          <dd>{l.internat?.existe ? "Oui" : "Externat"}</dd>
        </div>
        {l.effectif ? (
          <div>
            <dt>Élèves</dt>
            <dd>{l.effectif}</dd>
          </div>
        ) : null}
      </dl>

      {l.resultats ? (
        <BacFacts r={l.resultats} title={both ? "Le bac général et technologique" : "Les résultats au bac"} />
      ) : null}
      {n.pro ? <BacFacts r={n.pro} title={both ? "Le bac professionnel" : "Les résultats au bac pro"} /> : null}

      {n.sections.length || n.postBac ? (
        <section className="e-sec">
          <h3>Sections et formations</h3>
          <ul className="e-taglist">
            {n.sections.map((o) => (
              <li key={o}>{o}</li>
            ))}
            {n.postBac ? <li>BTS ou prépas après le bac</li> : null}
          </ul>
        </section>
      ) : null}

      {l.resultats || n.pro ? (
        <p className="e-small e-muted">
          Valeur ajoutée : écart entre le résultat du lycée et celui attendu pour des élèves comparables (âge, niveau à
          l&apos;entrée, origine sociale) ; au-dessus de zéro, le lycée fait mieux que prévu. Accès de la 2nde au bac :
          part des élèves entrés en 2nde qui obtiennent le bac dans ce lycée. Source :{" "}
          <a className="e-link" href={(l.resultats ?? n.pro)!.source} target="_blank" rel="noopener noreferrer">
            ministère de l&apos;Éducation nationale
          </a>
          , session {(l.resultats ?? n.pro)!.session}.
        </p>
      ) : (
        <p className="e-small e-muted">
          Les résultats officiels se publient pour les lycées publics et privés sous contrat qui présentent assez de
          candidats. Pour ce lycée, interroge l&apos;établissement aux portes ouvertes.
        </p>
      )}
    </Sheet>
  );
}

function BacFacts({ r, title }: { r: Resultats; title: string }) {
  return (
    <section className="e-sec">
      <h3>{title}</h3>
      <dl className="e-facts">
        {typeof r.reussite === "number" ? (
          <div>
            <dt>Réussite en {r.session}</dt>
            <dd>
              {r.reussite} %{typeof r.va === "number" ? <span className="e-facts__va"> {points(r.va)}</span> : null}
            </dd>
          </div>
        ) : null}
        {typeof r.mentions === "number" ? (
          <div>
            <dt>Mentions</dt>
            <dd>
              {r.mentions} %
              {typeof r.vaMentions === "number" ? <span className="e-facts__va"> {points(r.vaMentions)}</span> : null}
            </dd>
          </div>
        ) : null}
        {typeof r.acces === "number" ? (
          <div>
            <dt>Accès de la 2nde au bac</dt>
            <dd>
              {r.acces} %
              {typeof r.vaAcces === "number" ? <span className="e-facts__va"> {points(r.vaAcces)}</span> : null}
            </dd>
          </div>
        ) : null}
        {typeof r.candidats === "number" ? (
          <div>
            <dt>Candidats</dt>
            <dd>{r.candidats}</dd>
          </div>
        ) : null}
      </dl>
    </section>
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
      {x.sources?.length ? <Sources urls={x.sources} /> : null}
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
export function Sources({ urls }: { urls: string[] }) {
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
