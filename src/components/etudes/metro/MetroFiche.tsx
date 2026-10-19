"use client";

import { useEffect } from "react";
import { annuaire } from "@/lib/etudes/annuaire-ingenieurs";
import { metroLineById, stopById } from "@/lib/etudes/metro";
import { GROUPES } from "@/lib/etudes/metro-groupes";
import { Sources } from "../DetailSheets";
import { Sheet, StepButton } from "../Sheet";
import { SaveButton } from "../store";
import { Dot, Icon, Meter } from "../ui";
import { neighbours } from "./geometry";
import { NEARBY, Nearby } from "./Nearby";
import { EcolesStation } from "./EcolesStation";
import { GroupeSection } from "./Groupes";
import { CRITERE_UNE, ecolesDe, useFiche } from "./StopCard";

const RECRUTE_INGE = new Set(["ecole-ingenieurs", "cycle-integre", "cycle-postbac"]);

/** La fiche complète d'une étape : tout ce qu'il faut savoir, dans le même ordre pour chaque étape. */
export function MetroFiche({
  id,
  section,
  onClose,
  onSelect,
  onOpenEcole,
  onOpenFormation,
  onOpenAnnuaire,
}: {
  id: string;
  section?: string;
  onClose: () => void;
  onSelect: (id: string) => void;
  onOpenEcole: (id: string) => void;
  onOpenFormation: (id: string) => void;
  onOpenAnnuaire: () => void;
}) {
  const s = stopById[id];
  const st = useFiche(id);

  useEffect(() => {
    if (!section) return;
    const t = window.setTimeout(() => {
      const el = document.getElementById(`m-${section}`);
      if (el instanceof HTMLDetailsElement) el.open = true;
      el?.scrollIntoView({ block: "start" });
    }, 60);
    return () => window.clearTimeout(t);
  }, [id, section]);

  if (!s || !st) return null;
  const line = s.line === "tronc" ? null : metroLineById[s.line];
  const { prev, next } = neighbours(id);
  const schools = ecolesDe(id, st);

  return (
    <Sheet
      labelId="e-mfiche-title"
      line={line?.lane ?? null}
      resetKey={id}
      onClose={onClose}
      meta={
        line ? (
          <span>
            {<Dot line={line.lane} />} {line.name}
          </span>
        ) : (
          <span>Tronc commun, toutes les voies</span>
        )
      }
      title={st.name}
      when={st.when}
      actions={<SaveButton kind="station" id={id} name={st.name} />}
      footer={
        <>
          {prev ? (
            <StepButton dir="prev" label="Étape précédente" value={prev.label} onClick={() => onSelect(prev.id)} />
          ) : (
            <span />
          )}
          {next ? (
            <StepButton dir="next" label="Étape suivante" value={next.label} onClick={() => onSelect(next.id)} />
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
                <Meter
                  value={st.selectivite}
                  label={`Sélectivité ${st.selectivite} sur 5`}
                  line={line?.lane ?? undefined}
                />
                {st.selectiviteNote ? <span className="e-sub e-small e-mfiche__note">{st.selectiviteNote}</span> : null}
              </dd>
            </div>
          ) : null}
        </dl>
      ) : null}

      {s.alternance ? (
        <div className="e-note e-note--alt">
          <strong>
            <Icon name="briefcase" /> En alternance
          </strong>
          {s.alternance}
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
        <GroupeSection key={g.id} groupe={g} />
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

      {schools.length ? (
        <section className="e-sec" id="m-ecoles">
          <h3>{schools.length > 1 ? `${schools.length} établissements à découvrir` : "L'établissement"}</h3>
          <EcolesStation
            list={schools}
            critere={CRITERE_UNE[id]}
            onOpenEcole={onOpenEcole}
            onOpenAnnuaire={RECRUTE_INGE.has(id) ? onOpenAnnuaire : undefined}
            annuaireCount={annuaire.length}
          />
        </section>
      ) : null}

      {NEARBY[id] ? (
        <section className="e-sec" id="m-pres">
          <h3>Près de chez toi</h3>
          <Nearby id={id} onOpenFormation={onOpenFormation} />
        </section>
      ) : null}

      {st.sources?.length ? <Sources urls={st.sources} /> : null}
    </Sheet>
  );
}
