"use client";

import type { ReactNode } from "react";
import { ecoleById, type Ecole } from "@/lib/etudes/ecoles";
import { laneName } from "@/lib/etudes/lines";
import { lyceeById, statutLabel, type Lycee } from "@/lib/etudes/lycees";
import { voiesTexte } from "@/lib/etudes/lycees-fr";
import { internatText, points } from "./DetailSheets";
import { Sheet } from "./Sheet";
import { Dot } from "./ui";

type Row<T> = { label: string; get: (x: T) => ReactNode };

const pct = (v?: number) => (typeof v === "number" ? `${v} %` : null);

const LYCEE_ROWS: Row<Lycee>[] = [
  { label: "Ville", get: (l) => `${l.ville}, ${l.departement}` },
  { label: "Statut", get: (l) => statutLabel[l.statut] },
  { label: "Voies", get: (l) => voiesTexte(l) },
  { label: "Internat", get: (l) => internatText(l) },
  {
    label: "Élèves",
    get: (l) => {
      const t = [l.mixite, l.effectif].filter(Boolean).join(", ");
      return t ? t.charAt(0).toUpperCase() + t.slice(1) : null;
    },
  },
  {
    label: "Réussite au bac",
    get: (l) => (l.resultats ? [pct(l.resultats.reussite), l.resultats.session].filter(Boolean).join(", en ") : null),
  },
  { label: "Mentions", get: (l) => pct(l.resultats?.mentions) },
  { label: "Mentions très bien", get: (l) => pct(l.resultats?.tb) },
  {
    label: "Valeur ajoutée",
    get: (l) => (typeof l.resultats?.va === "number" ? points(l.resultats.va) : null),
  },
  { label: "Accès de la 2nde au bac", get: (l) => pct(l.resultats?.acces) },
  {
    label: "Bac pro",
    get: (l) => {
      const p = l.national?.pro;
      if (typeof p?.reussite !== "number") return null;
      return `${p.reussite} % de réussite${typeof p.va === "number" ? `, ${points(p.va)}` : ""}`;
    },
  },
  { label: "Prépas sur place", get: (l) => l.prepas?.join(", ") || null },
  { label: "Options et sections", get: (l) => l.options?.join(", ") || null },
  { label: "Frais", get: (l) => l.frais ?? null },
  { label: "Pour y entrer", get: (l) => l.admission ?? null },
];

const ECOLE_ROWS: Row<Ecole>[] = [
  {
    label: "Voie",
    get: (e) => (
      <span style={{ display: "inline-flex", alignItems: "center", gap: 7 }}>
        <Dot line={e.line} /> {laneName(e.line)}
      </span>
    ),
  },
  { label: "Ville", get: (e) => e.ville },
  { label: "Type", get: (e) => e.kind },
  { label: "Accès", get: (e) => e.acces },
  { label: "Durée", get: (e) => e.duree },
  { label: "Places", get: (e) => e.places ?? null },
  { label: "Coût", get: (e) => e.cout ?? null },
  { label: "Formations", get: (e) => e.formations },
  { label: "Débouchés", get: (e) => e.debouches },
  { label: "À savoir", get: (e) => e.plus },
];

/** Deux à quatre lycées ou établissements de « Ma liste », côte à côte. */
export function CompareSheet({
  what,
  ids,
  onClose,
  onOpen,
}: {
  what: "lycee" | "ecole";
  ids: string[];
  onClose: () => void;
  onOpen: (id: string) => void;
}) {
  const items =
    what === "lycee" ? ids.map((id) => lyceeById[id]).filter(Boolean) : ids.map((id) => ecoleById[id]).filter(Boolean);
  const rows = (what === "lycee" ? LYCEE_ROWS : ECOLE_ROWS) as Row<Lycee | Ecole>[];

  return (
    <Sheet
      labelId="e-compare-title"
      resetKey={`${what}:${ids.join(",")}`}
      onClose={onClose}
      wide
      meta={<span>Ma liste</span>}
      title={what === "lycee" ? "Comparer les lycées" : "Comparer les établissements"}
      when={`${items.length} côte à côte`}
    >
      <div className="e-compare">
        <table className="e-compare__table">
          <thead>
            <tr>
              <td />
              {items.map((x) => (
                <th key={x.id} scope="col">
                  <button type="button" className="e-link" onClick={() => onOpen(x.id)}>
                    {x.short ?? x.name}
                  </button>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const cells = items.map((x) => r.get(x));
              if (cells.every((c) => c === null || c === "")) return null;
              return (
                <tr key={r.label}>
                  <th scope="row">{r.label}</th>
                  {cells.map((c, k) => (
                    <td key={items[k].id}>
                      {c ?? (
                        <span className="e-muted" aria-label="Information absente de la fiche">
                          –
                        </span>
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </Sheet>
  );
}
