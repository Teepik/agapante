"use client";

import { useMemo, useState } from "react";
import { ANNUAIRE_SOURCE, annuaire, type EcoleAnnuaire } from "@/lib/etudes/annuaire-ingenieurs";
import { cle } from "@/lib/etudes/communes";
import { Sheet } from "../Sheet";
import { Icon } from "../ui";
import { STATUT_LABEL } from "./EcolesStation";

type Filtre = "postbac" | "prepa" | "apprentissage" | "public" | "prive";

const FILTRES: { id: Filtre; label: string; test: (e: EcoleAnnuaire) => boolean }[] = [
  { id: "postbac", label: "Après le bac", test: (e) => Boolean(e.recrutement?.includes("postbac")) },
  { id: "prepa", label: "Après une prépa", test: (e) => Boolean(e.recrutement?.includes("prepa")) },
  { id: "apprentissage", label: "En apprentissage", test: (e) => Boolean(e.apprentissage) },
  { id: "public", label: "Publiques", test: (e) => e.statut === "public" },
  { id: "prive", label: "Privées", test: (e) => e.statut === "eespig" || e.statut === "prive" },
];

const PAGE = 60;

const REGIONS = [...new Set(annuaire.map((e) => e.region).filter(Boolean) as string[])].sort((a, b) =>
  a.localeCompare(b, "fr"),
);

/** Toutes les écoles d'ingénieurs habilitées : à chercher, filtrer, ouvrir. */
export function AnnuaireSheet({
  onClose,
  onOpenEcole,
  initial,
}: {
  onClose: () => void;
  onOpenEcole: (id: string) => void;
  initial?: Filtre[];
}) {
  const [q, setQ] = useState("");
  const [filtres, setFiltres] = useState<Filtre[]>(initial ?? []);
  const [region, setRegion] = useState("");
  const [max, setMax] = useState(PAGE);

  const shown = useMemo(() => {
    const k = cle(q);
    return annuaire
      .filter((e) => !k || cle(`${e.nom} ${e.court ?? ""} ${e.ville}`).includes(k))
      .filter((e) => !region || e.region === region)
      .filter((e) => filtres.every((id) => FILTRES.find((f) => f.id === id)!.test(e)));
  }, [q, filtres, region]);

  function toggle(id: Filtre) {
    setMax(PAGE);
    setFiltres((fs) => (fs.includes(id) ? fs.filter((x) => x !== id) : [...fs, id]));
  }

  return (
    <Sheet
      labelId="e-annuaire-title"
      line="sciences"
      resetKey="annuaire"
      onClose={onClose}
      meta={<span>Écoles d&apos;ingénieurs</span>}
      title="Toutes les écoles habilitées"
      when={`${annuaire.length} écoles délivrent le titre d'ingénieur diplômé`}
    >
      <div className="e-annu__tools">
        <label className="e-field">
          <Icon name="search" />
          <span className="e-sr">Chercher une école</span>
          <input
            type="search"
            value={q}
            onChange={(ev) => {
              setQ(ev.target.value);
              setMax(PAGE);
            }}
            placeholder="Une école, un sigle, une ville"
            autoComplete="off"
          />
        </label>
        <div className="e-mecoles__filters" role="group" aria-label="Filtrer les écoles">
          {FILTRES.map((f) => (
            <button
              key={f.id}
              type="button"
              className="e-chip"
              aria-pressed={filtres.includes(f.id)}
              onClick={() => toggle(f.id)}
            >
              {f.id === "apprentissage" ? <Icon name="briefcase" /> : null}
              {f.label}
            </button>
          ))}
        </div>
        {REGIONS.length ? (
          <label className="e-annu__region">
            <span>Région</span>
            <select
              value={region}
              onChange={(ev) => {
                setRegion(ev.target.value);
                setMax(PAGE);
              }}
            >
              <option value="">Toute la France</option>
              {REGIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </label>
        ) : null}
        <p className="e-small e-muted" aria-live="polite">
          {shown.length > 1 ? `${shown.length} écoles` : shown.length === 1 ? "Une école" : "Essaie un autre mot."}
        </p>
      </div>

      <ul className="e-annu__list">
        {shown.slice(0, max).map((e) => {
          const tags = [
            e.recrutement?.includes("postbac") ? "Après le bac" : null,
            e.recrutement?.includes("prepa") ? "Après une prépa" : null,
            e.apprentissage ? "Apprentissage" : null,
          ].filter(Boolean) as string[];
          const meta = [e.ville, e.region, e.statut ? STATUT_LABEL[e.statut] : null].filter(Boolean).join(", ");
          const body = (
            <>
              <span className="e-annu__name">
                {e.nom}
                {e.court && e.court !== e.nom ? <span className="e-annu__court"> ({e.court})</span> : null}
              </span>
              <span className="e-annu__meta">{meta}</span>
              {tags.length ? (
                <span className="e-annu__tags">
                  {tags.map((t) => (
                    <span key={t} className={t === "Apprentissage" ? "is-alt" : undefined}>
                      {t}
                    </span>
                  ))}
                </span>
              ) : null}
            </>
          );
          return (
            <li key={e.id}>
              {e.fiche ? (
                <button type="button" className="e-annu__item" onClick={() => onOpenEcole(e.fiche!)}>
                  {body}
                  <span className="e-annu__go">
                    Sa fiche <Icon name="chevron-right" />
                  </span>
                </button>
              ) : e.site ? (
                <a className="e-annu__item" href={e.site} target="_blank" rel="noopener noreferrer">
                  {body}
                  <span className="e-annu__go">
                    Son site <Icon name="external" />
                  </span>
                </a>
              ) : (
                <div className="e-annu__item">{body}</div>
              )}
            </li>
          );
        })}
      </ul>
      {shown.length > max ? (
        <button type="button" className="e-btn" onClick={() => setMax((m) => m + PAGE)}>
          Afficher {Math.min(PAGE, shown.length - max)} écoles de plus
        </button>
      ) : null}

      {ANNUAIRE_SOURCE.url ? (
        <p className="e-small e-muted">
          Source&#8239;:{" "}
          <a href={ANNUAIRE_SOURCE.url} target="_blank" rel="noopener noreferrer">
            {ANNUAIRE_SOURCE.label}
          </a>
          {ANNUAIRE_SOURCE.date ? `, ${ANNUAIRE_SOURCE.date}` : null}.
        </p>
      ) : null}
    </Sheet>
  );
}
