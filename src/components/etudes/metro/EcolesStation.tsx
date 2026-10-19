"use client";

import { useMemo, useState } from "react";
import { cle } from "@/lib/etudes/communes";
import { type Ecole, type Statut } from "@/lib/etudes/ecoles";
import { Icon } from "../ui";
import { essentiel } from "./texte";

export const STATUT_LABEL: Record<Statut, string> = {
  public: "Public",
  eespig: "Privé reconnu par l'État",
  prive: "Privé",
};

type Filtre = "public" | "prive" | "alternance";

const FILTRES: { id: Filtre; label: string; test: (e: Ecole) => boolean }[] = [
  { id: "public", label: "Publiques", test: (e) => e.statut === "public" },
  { id: "prive", label: "Privées", test: (e) => e.statut === "eespig" || e.statut === "prive" },
  { id: "alternance", label: "En alternance", test: (e) => Boolean(e.alternance) },
];

/** Au-delà, la liste se filtre et se cherche. */
const LONGUE = 8;

function texte(e: Ecole): string {
  return essentiel(e.pourquoi ?? e.formations, 150);
}

/**
 * Les écoles d'une étape : celles à la une d'abord (avec la raison, toujours un critère public),
 * puis toutes, à chercher par nom ou par ville et à filtrer.
 */
export function EcolesStation({
  list,
  critere,
  onOpenEcole,
  onOpenAnnuaire,
  annuaireCount,
}: {
  list: Ecole[];
  /** Ce qui met une école à la une à cette étape. */
  critere?: string;
  onOpenEcole: (id: string) => void;
  onOpenAnnuaire?: () => void;
  annuaireCount?: number;
}) {
  const [q, setQ] = useState("");
  const [filtres, setFiltres] = useState<Filtre[]>([]);

  const une = list.filter((e) => e.une).sort((a, b) => (a.uneRang ?? 99) - (b.uneRang ?? 99));
  // Plusieurs écoles pour une même raison (un concours) : elles se regroupent sous ce titre.
  const groupes = [...new Set(une.map((e) => e.une!))].map((raison) => ({
    raison,
    ecoles: une.filter((e) => e.une === raison),
  }));
  const groupe = groupes.some((g) => g.ecoles.length > 1);
  const longue = list.length > LONGUE;
  const disponibles = FILTRES.filter((f) => list.some(f.test) && !list.every(f.test));

  const shown = useMemo(() => {
    const k = cle(q);
    return [...list]
      .filter((e) => !k || cle(`${e.name} ${e.short ?? ""} ${e.ville}`).includes(k))
      .filter((e) => filtres.every((id) => FILTRES.find((f) => f.id === id)!.test(e)))
      .sort((a, b) => a.name.localeCompare(b.name, "fr"));
  }, [list, q, filtres]);

  function toggle(id: Filtre) {
    setFiltres((fs) => (fs.includes(id) ? fs.filter((x) => x !== id) : [...fs, id]));
  }

  return (
    <div className="e-mecoles">
      {une.length ? (
        <div className="e-mune">
          <p className="e-mune__k">À la une</p>
          {critere ? <p className="e-small e-muted">{critere}</p> : null}
          {groupe ? (
            groupes.map((g) => (
              <div key={g.raison} className="e-mune__group">
                <p className="e-mune__why">{g.raison}</p>
                <ul className="e-mune__list">
                  {g.ecoles.map((e) => (
                    <li key={e.id}>
                      <Carte e={e} onOpen={onOpenEcole} />
                    </li>
                  ))}
                </ul>
              </div>
            ))
          ) : (
            <ul className="e-mune__list">
              {une.map((e) => (
                <li key={e.id}>
                  <Carte e={e} onOpen={onOpenEcole} raison />
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : null}

      {longue ? (
        <div className="e-mecoles__tools">
          <label className="e-field">
            <Icon name="search" />
            <span className="e-sr">Chercher une école</span>
            <input
              type="search"
              value={q}
              onChange={(ev) => setQ(ev.target.value)}
              placeholder="Une école, une ville"
              autoComplete="off"
            />
          </label>
          {disponibles.length ? (
            <div className="e-mecoles__filters" role="group" aria-label="Filtrer les écoles">
              {disponibles.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  className="e-chip"
                  aria-pressed={filtres.includes(f.id)}
                  onClick={() => toggle(f.id)}
                >
                  {f.id === "alternance" ? <Icon name="briefcase" /> : null}
                  {f.label}
                </button>
              ))}
            </div>
          ) : null}
          <p className="e-small e-muted" aria-live="polite">
            {shown.length > 1 ? `${shown.length} écoles` : shown.length === 1 ? "Une école" : "Essaie un autre mot."}
          </p>
        </div>
      ) : null}

      <ul className="e-mschools">
        {shown.map((e) => (
          <li key={e.id}>
            <button type="button" className="e-mschool" onClick={() => onOpenEcole(e.id)}>
              <span className="e-mschool__name">{e.name}</span>
              <span className="e-mschool__meta">
                {[e.ville, e.statut ? STATUT_LABEL[e.statut] : e.kind].join(", ")}
                {e.alternance ? (
                  <span className="e-mschool__alt">
                    <Icon name="briefcase" /> alternance
                  </span>
                ) : null}
              </span>
              <span className="e-mschool__text">{texte(e)}</span>
            </button>
          </li>
        ))}
      </ul>

      {onOpenAnnuaire && annuaireCount ? (
        <button type="button" className="e-btn e-mecoles__all" onClick={onOpenAnnuaire}>
          <Icon name="list" /> Les {annuaireCount} écoles d&apos;ingénieurs habilitées en France
        </button>
      ) : null}
    </div>
  );
}

function Carte({ e, onOpen, raison = false }: { e: Ecole; onOpen: (id: string) => void; raison?: boolean }) {
  return (
    <button type="button" className="e-mune__card" onClick={() => onOpen(e.id)}>
      <span className="e-mune__name">{e.short && e.short.length < e.name.length ? e.short : e.name}</span>
      {raison ? <span className="e-mune__why">{e.une}</span> : null}
      <span className="e-mune__meta">{e.ville}</span>
      <span className="e-mune__text">{texte(e)}</span>
    </button>
  );
}
