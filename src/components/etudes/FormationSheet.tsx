"use client";

import { useEffect, useState } from "react";
import {
  PSUP_SESSION,
  chargerFormations,
  SOURCE_PSUP,
  accesTexte,
  contratLabel,
  formationById,
  lienParcoursup,
  type Formation,
} from "@/lib/etudes/formations";
import { Sheet } from "./Sheet";
import { SaveButton } from "./store";
import { Icon } from "./ui";

const CATS = [
  "BTS",
  "BUT",
  "Licence",
  "Santé",
  "Prépa",
  "École d'ingénieurs",
  "École de commerce",
  "Art et design",
  "Social",
  "Sciences Po",
  "Formation",
];

const fr = (n: number) => n.toLocaleString("fr-FR");

/** Une barre empilée : la répartition des admis, avec sa légende. */
function Stack({ label, parts }: { label: string; parts: { name: string; value: number }[] }) {
  const shown = parts.map((p, k) => ({ ...p, k })).filter((p) => p.value > 0);
  if (!shown.length) return null;
  return (
    <figure className="e-stack">
      <figcaption>{label}</figcaption>
      <div className="e-stack__bar" aria-hidden="true">
        {shown.map((p) => (
          <span key={p.name} style={{ flexGrow: p.value }} data-k={p.k} />
        ))}
      </div>
      <ul className="e-stack__legend">
        {shown.map((p) => (
          <li key={p.name}>
            <i data-k={p.k} aria-hidden="true" />
            {p.name} <strong>{p.value} %</strong>
          </li>
        ))}
      </ul>
    </figure>
  );
}

/** La fiche d'une formation de Parcoursup : places, candidats, taux d'accès et profil des admis. */
export function FormationSheet({ id, onClose }: { id: string; onClose: () => void }) {
  const f: Formation | undefined = formationById[id];
  if (!f) return null;
  const sans =
    typeof f.tb === "number" && typeof f.b === "number" && typeof f.ab === "number"
      ? Math.max(0, 100 - f.tb - f.b - f.ab)
      : null;

  return (
    <Sheet
      labelId="e-formation-title"
      resetKey={id}
      onClose={onClose}
      meta={
        <>
          <span>{CATS[f.cat] ?? "Formation"}</span>
          <span>{contratLabel[f.contrat]}</span>
          <span>{f.selective ? "Sélective" : "Ouverte à tous les bacheliers"}</span>
        </>
      }
      title={f.name}
      when={`${f.etab}, ${f.ville}`}
      actions={
        <>
          <SaveButton kind="formation" id={f.id} name={f.name} />
          <a className="e-btn e-btn--sm" href={lienParcoursup(f)} target="_blank" rel="noopener noreferrer">
            <Icon name="external" /> Fiche Parcoursup
          </a>
        </>
      }
    >
      {typeof f.acces === "number" ? (
        <p className="e-sheet__lead">
          {accesTexte(f.acces)} : en {PSUP_SESSION}, {f.acces} % des candidats ont pu recevoir une proposition
          {typeof f.candidats === "number" && typeof f.places === "number"
            ? `, avec ${fr(f.candidats)} candidats pour ${fr(f.places)} places`
            : ""}
          .
        </p>
      ) : null}

      <dl className="e-facts">
        {typeof f.places === "number" ? (
          <div>
            <dt>Places</dt>
            <dd>{fr(f.places)}</dd>
          </div>
        ) : null}
        {typeof f.candidats === "number" ? (
          <div>
            <dt>Candidats</dt>
            <dd>{fr(f.candidats)}</dd>
          </div>
        ) : null}
        {typeof f.acces === "number" ? (
          <div>
            <dt>Taux d&apos;accès</dt>
            <dd>{f.acces} %</dd>
          </div>
        ) : null}
        {typeof f.admis === "number" ? (
          <div>
            <dt>Admis</dt>
            <dd>{fr(f.admis)}</dd>
          </div>
        ) : null}
        {typeof f.boursiers === "number" ? (
          <div>
            <dt>Boursiers parmi les admis</dt>
            <dd>{f.boursiers} %</dd>
          </div>
        ) : null}
      </dl>

      {sans !== null || typeof f.bg === "number" ? (
        <section className="e-sec">
          <h3>Les admis qui sortaient du bac</h3>
          {sans !== null ? (
            <Stack
              label="Leur mention au bac"
              parts={[
                { name: "Très bien", value: f.tb ?? 0 },
                { name: "Bien", value: f.b ?? 0 },
                { name: "Assez bien", value: f.ab ?? 0 },
                { name: "Sans mention", value: sans },
              ]}
            />
          ) : null}
          {typeof f.bg === "number" ? (
            <Stack
              label="Leur bac"
              parts={[
                { name: "Général", value: f.bg ?? 0 },
                { name: "Technologique", value: f.bt ?? 0 },
                { name: "Professionnel", value: f.bp ?? 0 },
              ]}
            />
          ) : null}
        </section>
      ) : null}

      <p className="e-small e-muted">
        Taux d&apos;accès : part des candidats qui ont reçu une proposition, ou qui auraient pu en recevoir une. Il
        dépend du nombre de places, du nombre de candidats et de leurs dossiers. Source :{" "}
        <a className="e-link" href={SOURCE_PSUP} target="_blank" rel="noopener noreferrer">
          ministère de l&apos;Enseignement supérieur, Parcoursup {PSUP_SESSION}
        </a>
        .
      </p>
    </Sheet>
  );
}

/** Dans la fiche d'un établissement : ses formations sur Parcoursup, les plus demandées d'abord. */
export function PsupSection({ uais, onOpenFormation }: { uais: string[]; onOpenFormation: (id: string) => void }) {
  const [list, setList] = useState<Formation[] | null>(null);
  const [failed, setFailed] = useState(false);
  const [all, setAll] = useState(false);

  useEffect(() => {
    let alive = true;
    chargerFormations()
      .then((d) => {
        if (!alive) return;
        const set = new Set(uais);
        setList(d.list.filter((f) => set.has(f.uai)).sort((a, b) => (b.candidats ?? 0) - (a.candidats ?? 0)));
      })
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, [uais]);

  if (failed) return null;
  if (!list) {
    return (
      <section className="e-sec">
        <h3>Sur Parcoursup en {PSUP_SESSION}</h3>
        <p className="e-muted e-small">Chargement des chiffres d&apos;admission…</p>
      </section>
    );
  }
  if (!list.length) return null;
  const shown = all ? list : list.slice(0, 6);
  return (
    <section className="e-sec">
      <h3>
        Sur Parcoursup en {PSUP_SESSION} : {list.length} {list.length > 1 ? "formations" : "formation"}
      </h3>
      <ul className="e-rows">
        {shown.map((f) => (
          <li key={f.id}>
            <button type="button" className="e-row" onClick={() => onOpenFormation(f.id)}>
              <Icon name="cap" />
              <span>
                <span className="e-row__v">{f.name}</span>
                <span className="e-row__k">
                  {[
                    typeof f.places === "number" ? `${fr(f.places)} places` : "",
                    typeof f.candidats === "number" ? `${fr(f.candidats)} candidats` : "",
                    typeof f.acces === "number" ? `taux d'accès ${f.acces} %` : "",
                  ]
                    .filter(Boolean)
                    .join(", ")}
                </span>
              </span>
              <Icon name="chevron-right" />
            </button>
          </li>
        ))}
      </ul>
      {list.length > 6 ? (
        <button type="button" className="e-btn e-btn--sm e-psup__more" onClick={() => setAll((v) => !v)}>
          {all ? "Afficher moins" : `Afficher les ${list.length - 6} autres`}
        </button>
      ) : null}
    </section>
  );
}
