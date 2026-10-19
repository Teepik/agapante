"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { annuaire } from "@/lib/etudes/annuaire-ingenieurs";
import { laneName, type LaneId } from "@/lib/etudes/lines";
import { alternanceDe } from "@/lib/etudes/metro";
import { GROUPES } from "@/lib/etudes/metro-groupes";
import { passerelles } from "@/lib/etudes/passerelles";
import { LANES, LANE_DEFS, UNIVERSITY_TRACKS, placedById } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { Sources } from "../DetailSheets";
import { Sheet, StepButton } from "../Sheet";
import { SaveButton } from "../store";
import { Dot, Icon, Meter } from "../ui";
import { NEARBY, Nearby } from "./Nearby";
import { EcolesStation } from "./EcolesStation";
import { GroupeSection } from "./Groupes";
import { CRITERE_UNE, RECRUTE, ecolesDe, nomEtape, useFiche } from "./StopCard";
import { voieDe, voisins } from "./voie";

/** La fiche complète d'une étape : tout ce qu'il faut savoir, dans le même ordre pour chaque étape. */
export function MetroFiche({
  id,
  line,
  section,
  onClose,
  onSelect,
  onOpenEcole,
  onOpenFormation,
  onOpenAnnuaire,
  onOpenPasserelle,
}: {
  id: string;
  line: LaneId | null;
  section?: string;
  onClose: () => void;
  onSelect: (id: string, line: LaneId | null) => void;
  onOpenEcole: (id: string) => void;
  onOpenFormation: (id: string) => void;
  onOpenAnnuaire: () => void;
  onOpenPasserelle: (id: string) => void;
}) {
  const st = useFiche(id);
  // Le mot cherché près de chez toi, quand on vient d'une spécialité (« génie électrique »).
  const [mot, setMot] = useState<{ cle: string; n: number } | null>(null);

  useEffect(() => {
    if (!section) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(`m-${section}`);
      if (el instanceof HTMLDetailsElement) el.open = true;
      el?.scrollIntoView({ block: "start" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [id, section]);

  if (!st) return null;
  const p = placedById[id];
  const voie = voieDe(id, line);
  const track = UNIVERSITY_TRACKS[id];
  const { prev, next } = voisins(id, voie);
  const fork = id === "bac" && !voie;
  const schools = ecolesDe(id, st);
  const alternance = alternanceDe(id);
  const licences = id === "universite" ? Object.keys(UNIVERSITY_TRACKS).filter((k) => stationById[k]) : [];
  const outgoing = passerelles.filter((x) => x.from.includes(id));
  const incoming = passerelles.filter((x) => x.to === id);

  const meta =
    p?.kind === "trunk" ? (
      <span>Tronc commun, toutes les voies</span>
    ) : track ? (
      <span>
        <Dot line="u" /> Université, {laneName(track)}
      </span>
    ) : voie ? (
      <span>
        <Dot line={voie} /> {laneName(voie)}
      </span>
    ) : (
      <span>Sur toute la carte</span>
    );

  return (
    <Sheet
      labelId="e-mfiche-title"
      line={p?.kind === "trunk" ? null : voie}
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
              value={nomEtape(prev)}
              onClick={() => onSelect(prev, voie)}
            />
          ) : (
            <span />
          )}
          {next && !fork ? (
            <StepButton dir="next" label="Étape suivante" value={nomEtape(next)} onClick={() => onSelect(next, voie)} />
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
                <Meter value={st.selectivite} label={`Sélectivité ${st.selectivite} sur 5`} line={voie ?? undefined} />
                {st.selectiviteNote ? <span className="e-sub e-small e-mfiche__note">{st.selectiviteNote}</span> : null}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {alternance ? (
        <div className="e-note e-note--alt">
          <strong>
            <Icon name="briefcase" /> En alternance
          </strong>
          {alternance}
        </div>
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

      {(GROUPES[id] ?? []).map((g) => (
        <GroupeSection
          key={g.id}
          groupe={g}
          onNearby={
            NEARBY[id]
              ? (cle) => {
                  setMot((m) => ({ cle, n: (m?.n ?? 0) + 1 }));
                  window.requestAnimationFrame(() =>
                    document.getElementById("m-pres")?.scrollIntoView({ block: "start", behavior: "smooth" }),
                  );
                }
              : undefined
          }
        />
      ))}

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

      {fork ? (
        <section className="e-sec">
          <h3>Choisis ta voie</h3>
          <ul className="e-rows">
            {LANES.filter((l) => l !== "pro").map((l) => {
              const first = LANE_DEFS[l].segs[0].id;
              return (
                <li key={l}>
                  <button type="button" className="e-row" onClick={() => onSelect(first, l)}>
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
                <button type="button" className="e-row" onClick={() => onSelect(k, "u")}>
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

      {schools.length ? (
        <section className="e-sec" id="m-ecoles">
          <h3>{schools.length > 1 ? `${schools.length} établissements à découvrir` : "L'établissement"}</h3>
          <EcolesStation
            list={schools}
            voie={RECRUTE[id]}
            critere={CRITERE_UNE[id]}
            onOpenEcole={onOpenEcole}
            onOpenAnnuaire={RECRUTE[id] ? onOpenAnnuaire : undefined}
            annuaireCount={annuaire.length}
          />
        </section>
      ) : null}

      {NEARBY[id] ? (
        <section className="e-sec" id="m-pres">
          <h3>Près de chez toi</h3>
          <Nearby id={id} onOpenFormation={onOpenFormation} mot={mot} />
        </section>
      ) : null}

      {id === "college" || id === "seconde" ? (
        <section className="e-sec">
          <h3>Les lycées</h3>
          <ul className="e-rows">
            <li>
              <Link className="e-row" href="/etudes#lycees-france">
                <Icon name="school" />
                <span>
                  <span className="e-row__v">Les lycées près de chez toi</span>
                  <span className="e-row__k">
                    Tous les lycées de France, avec leurs voies et leurs résultats au bac
                  </span>
                </span>
                <Icon name="chevron-right" />
              </Link>
            </li>
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

      {st.sources?.length ? <Sources urls={st.sources} /> : null}
    </Sheet>
  );
}
