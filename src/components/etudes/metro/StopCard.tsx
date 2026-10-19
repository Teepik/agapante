"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { mapTexts } from "@/lib/etudes/cohorte";
import { ecoleById, ecoles, nomCourt, type Ecole, type Recrutement } from "@/lib/etudes/ecoles";
import {
  METRO_FICHES,
  METRO_LINES,
  metroLineById,
  stopById,
  type MetroLine,
  type MetroLineId,
} from "@/lib/etudes/metro";
import { GROUPES } from "@/lib/etudes/metro-groupes";
import { etTypo } from "@/lib/etudes/typo";
import { stationById, type StationContent } from "@/lib/etudes/stations";
import { useCohort } from "../cohorte";
import { Dot, Icon } from "../ui";
import { neighbours } from "./geometry";
import { GroupeChips } from "./Groupes";
import { NEARBY } from "./Nearby";
import { essentiel } from "./texte";

/** Le contenu d'une étape : la fiche de stations.ts, ou celle propre à la carte. */
export function useFiche(id: string): StationContent | null {
  const { y } = useCohort();
  const raw = stationById[id] ?? METRO_FICHES[id];
  return raw ? mapTexts(raw, y) : null;
}

/** Les étapes où la question « laquelle choisir ? » se pose entre deux ou trois lignes. */
const COMPARE_DUO: Record<string, MetroLine["id"][]> = {
  "prepa-scientifique": ["prepa", "postbac"],
  "cycle-integre": ["prepa", "postbac"],
  universite: ["univ", "but", "prepa"],
};

/** Aux étapes d'école d'ingénieurs, toutes les écoles qui recrutent de cette façon. */
export const RECRUTE: Record<string, Recrutement> = {
  "ecole-ingenieurs": "prepa",
  "cycle-integre": "postbac",
  "cycle-postbac": "postbac",
};

/** Les écoles d'une étape : celles que cite sa fiche, celles qui s'y rattachent, celles qui y recrutent. */
export function ecolesDe(id: string, st: StationContent | null): Ecole[] {
  const r = RECRUTE[id];
  const ids = new Set([
    ...(st?.ecoles ?? []),
    ...ecoles.filter((e) => e.station === id || (r && e.recrutement?.includes(r))).map((e) => e.id),
  ]);
  return [...ids].map((x) => ecoleById[x]).filter(Boolean);
}

/** Ce qui met une école à la une, étape par étape : un critère public, dit en clair. */
export const CRITERE_UNE: Record<string, string> = etTypo({
  "ecole-ingenieurs": "Les écoles des concours X-ENS et Mines-Ponts, et les écoles Centrale.",
  "cycle-integre":
    "Les écoles post-bac où 25 % des candidats ou moins ont reçu une proposition sur Parcoursup en 2025.",
  "cycle-postbac":
    "Les écoles post-bac où 25 % des candidats ou moins ont reçu une proposition sur Parcoursup en 2025.",
});

/** La fiche courte qui s'ouvre au toucher d'une station. */
export function StopCard({
  id,
  onClose,
  onSelect,
  onFocus,
  onOpenFiche,
  onOpenEcole,
  onCompare,
}: {
  id: string;
  onClose: () => void;
  onSelect: (id: string) => void;
  onFocus: (line: MetroLineId) => void;
  onOpenFiche: (id: string, section?: string) => void;
  onOpenEcole: (id: string) => void;
  onCompare: (lines?: MetroLine["id"][]) => void;
}) {
  const s = stopById[id];
  const st = useFiche(id);
  if (!s || !st) return null;
  const line = s.line === "tronc" ? null : metroLineById[s.line];
  const { prev, next } = neighbours(id);
  const liste = ecolesDe(id, st);
  const nbEcoles = liste.length;
  const une = liste
    .filter((e) => e.une && e.uneVoie === RECRUTE[id])
    .sort((a, b) => (a.uneRang ?? 99) - (b.uneRang ?? 99))
    .slice(0, 6);
  const chips = [s.duree, s.entree, s.cout, s.plus].filter(Boolean) as string[];
  // Quand la fiche courte porte déjà des pastilles ou les quatre lignes, le texte se fait plus court.
  const court = id === "bac" || Boolean(GROUPES[id]?.some((g) => g.popup !== false));

  return (
    <div className="e-mcard" data-line={line?.lane}>
      <div className="e-mcard__top">
        <span className="e-mcard__line">
          {line ? <Dot line={line.lane} /> : null}
          {line ? line.name : "Tronc commun"}
        </span>
        <button type="button" className="e-iconbtn" onClick={onClose} aria-label="Fermer la fiche">
          <Icon name="close" />
        </button>
      </div>
      <h3 className="e-mcard__title">{st.name}</h3>
      <p className="e-mcard__when">{st.when}</p>
      {chips.length ? (
        <ul className="e-mcard__chips">
          {chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : null}
      <p className="e-mcard__lead">{s.resume ?? essentiel(st.what, court ? 140 : 220)}</p>
      {s.alternance ? (
        <p className="e-mcard__alt">
          <Icon name="briefcase" />
          <span>{s.alternance}</span>
        </p>
      ) : null}

      {(GROUPES[id] ?? []).map((g) => (
        <GroupeChips key={g.id} groupe={g} onOpen={(section) => onOpenFiche(id, section)} />
      ))}

      {id === "bac" ? (
        <div className="e-mcard__lines">
          <p className="e-mcard__k">Après le bac, quatre lignes sur cette carte</p>
          <ul>
            {METRO_LINES.map((l) => (
              <li key={l.id} data-line={l.lane}>
                <button type="button" onClick={() => onFocus(l.id)}>
                  <Dot line={l.lane} />
                  <span>
                    <strong>{l.name}</strong>
                    <span>{l.pitch}</span>
                  </span>
                  <Icon name="chevron-right" />
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="e-link e-mcard__cmp" onClick={() => onCompare()}>
            Comparer les quatre lignes, côte à côte
          </button>
        </div>
      ) : null}

      {COMPARE_DUO[id] ? (
        <button type="button" className="e-link e-mcard__cmp" onClick={() => onCompare(COMPARE_DUO[id])}>
          {id === "universite"
            ? "Licence, BUT ou prépa\u202f? Compare-les"
            : "Prépa ou prépa intégrée\u202f? Compare-les"}
        </button>
      ) : null}

      {une.length ? (
        <div className="e-mcard__une">
          <p className="e-mcard__k">À la une</p>
          <ul>
            {une.map((e) => (
              <li key={e.id}>
                <button type="button" onClick={() => onOpenEcole(e.id)}>
                  {nomCourt(e)}
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : null}

      <div className="e-mcard__actions">
        <button type="button" className="e-btn e-btn--primary e-btn--sm" onClick={() => onOpenFiche(id)}>
          Tout savoir
        </button>
        {nbEcoles ? (
          <button type="button" className="e-btn e-btn--sm" onClick={() => onOpenFiche(id, "ecoles")}>
            <Icon name="school" /> {nbEcoles > 1 ? `${nbEcoles} établissements` : "L'établissement"}
          </button>
        ) : null}
        {NEARBY[id] ? (
          <button type="button" className="e-btn e-btn--sm" onClick={() => onOpenFiche(id, "pres")}>
            <Icon name="pin" /> Près de chez toi
          </button>
        ) : null}
      </div>

      {prev || next ? (
        <div className="e-mcard__nav">
          {prev ? (
            <button type="button" className="e-link" onClick={() => onSelect(prev.id)}>
              <Icon name="chevron-left" /> {prev.label}
            </button>
          ) : (
            <span />
          )}
          {next ? (
            <button type="button" className="e-link" onClick={() => onSelect(next.id)}>
              {next.label} <Icon name="chevron-right" />
            </button>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}

/** Sur téléphone, la fiche courte monte du bas de l'écran. */
export function BottomSheet({ label, onClose, children }: { label: string; onClose: () => void; children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnTo.current = document.activeElement as HTMLElement | null;
    ref.current?.focus({ preventScroll: true });
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      returnTo.current?.focus?.({ preventScroll: true });
    };
  }, [onClose]);

  return (
    <div className="e-mbottom">
      <button type="button" className="e-mbottom__backdrop" aria-label="Fermer" tabIndex={-1} onClick={onClose} />
      <div ref={ref} className="e-mbottom__panel" role="dialog" aria-modal="true" aria-label={label} tabIndex={-1}>
        <span className="e-mbottom__grip" aria-hidden="true" />
        {children}
      </div>
    </div>
  );
}
