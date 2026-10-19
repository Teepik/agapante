"use client";

import Link from "next/link";
import { useEffect, useRef, type ReactNode } from "react";
import { mapTexts } from "@/lib/etudes/cohorte";
import { ecoleById, ecoles, nomCourt, type Ecole, type Recrutement } from "@/lib/etudes/ecoles";
import { laneName, laneShort, type LaneId } from "@/lib/etudes/lines";
import { METRO_FICHES, alternanceDe, stopById, type MetroLine } from "@/lib/etudes/metro";
import { GROUPES } from "@/lib/etudes/metro-groupes";
import { GUIDES_DE } from "@/lib/etudes/guides-liens";
import { LANES, placedById } from "@/lib/etudes/plan";
import { etTypo } from "@/lib/etudes/typo";
import { stationById, type StationContent } from "@/lib/etudes/stations";
import { useCohort } from "../cohorte";
import { Dot, Icon } from "../ui";
import { GroupeChips } from "./Groupes";
import { NEARBY } from "./Nearby";
import { essentiel } from "./texte";
import { pastilles, voieDe, voisins } from "./voie";

/** Le contenu d'une étape : la fiche de stations.ts, ou celle propre à la carte. */
export function useFiche(id: string): StationContent | null {
  const { y } = useCohort();
  const raw = stationById[id] ?? METRO_FICHES[id];
  return raw ? mapTexts(raw, y) : null;
}

/** Le nom court d'une étape, pour les boutons « étape précédente » et « étape suivante ». */
export function nomEtape(id: string): string {
  return stationById[id]?.label ?? METRO_FICHES[id]?.label ?? id;
}

/** Les étapes où la question « laquelle choisir ? » se pose entre deux ou trois lignes. */
const COMPARE_DUO: Record<string, MetroLine["id"][]> = {
  "prepa-scientifique": ["prepa", "postbac"],
  "cycle-integre": ["prepa", "postbac"],
  universite: ["univ", "but", "prepa"],
};

/** Les fiches à ouvrir depuis une étape, quand elles éclairent la suite. */
const LIENS: Record<string, { id: string; label: string }[]> = {
  universite: [{ id: "mon-master", label: "Mon Master : comment entrer en master" }],
  "u-master": [{ id: "mon-master", label: "Mon Master : calendrier, candidatures, conseils" }],
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
  const list = [...ids].map((x) => ecoleById[x]).filter(Boolean);
  // Sur les lignes d'ingénieurs, les écoles de commerce post-bac de la page complète restent à part.
  return r ? list.filter((e) => !/commerce/i.test(e.kind)) : list;
}

/** Ce qui met une école à la une, étape par étape : un critère public, dit en clair. */
export const CRITERE_UNE: Record<string, string> = etTypo({
  "ecole-ingenieurs": "Les écoles des concours X-ENS et Mines-Ponts, et les écoles Centrale.",
  "cycle-integre":
    "Les écoles post-bac où 25 % des candidats ou moins ont reçu une proposition sur Parcoursup en 2025, pour leur formation principale.",
  "cycle-postbac":
    "Les écoles post-bac où 25 % des candidats ou moins ont reçu une proposition sur Parcoursup en 2025, pour leur formation principale.",
});

/** La fiche courte qui s'ouvre au toucher d'une station. */
export function StopCard({
  id,
  line,
  onClose,
  onSelect,
  onFocusLane,
  onOpenFiche,
  onOpenEcole,
  onCompare,
}: {
  id: string;
  /** La voie d'où l'on vient, quand l'étape en dessert plusieurs. */
  line: LaneId | null;
  onClose: () => void;
  onSelect: (id: string, line: LaneId | null) => void;
  onFocusLane: (line: LaneId) => void;
  onOpenFiche: (id: string, line: LaneId | null, section?: string) => void;
  onOpenEcole: (id: string) => void;
  onCompare: (lines?: MetroLine["id"][]) => void;
}) {
  const st = useFiche(id);
  if (!st) return null;
  const s = stopById[id];
  const p = placedById[id];
  const voie = voieDe(id, line);
  const { prev, next } = voisins(id, voie);
  const fork = id === "bac" && !voie;
  const liste = ecolesDe(id, st);
  const nbEcoles = liste.length;
  const une = liste
    .filter((e) => e.une && e.uneVoie === RECRUTE[id])
    .sort((a, b) => (a.uneRang ?? 99) - (b.uneRang ?? 99))
    .slice(0, 6);
  const chips = pastilles(id, st);
  const alternance = alternanceDe(id);
  // Quand la fiche courte porte déjà des pastilles ou le choix des voies, le texte se fait plus court.
  const court = fork || Boolean(GROUPES[id]?.some((g) => g.popup !== false));

  return (
    <div className="e-mcard" data-line={voie ?? undefined}>
      <div className="e-mcard__top">
        <span className="e-mcard__line">
          {voie && p?.kind !== "trunk" ? (
            <>
              <Dot line={voie} />
              {laneName(voie)}
            </>
          ) : (
            "Tronc commun, toutes les voies"
          )}
        </span>
        <button type="button" className="e-iconbtn" onClick={onClose} aria-label="Fermer la fiche">
          <Icon name="close" />
        </button>
      </div>
      <h2 className="e-mcard__title">{st.name}</h2>
      <p className="e-mcard__when">{st.when}</p>
      {chips.length ? (
        <ul className="e-mcard__chips">
          {chips.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ) : null}
      <p className="e-mcard__lead">{s?.resume ?? essentiel(st.what, court ? 140 : 220)}</p>
      {alternance ? (
        <p className="e-mcard__alt">
          <Icon name="briefcase" />
          <span>{alternance}</span>
        </p>
      ) : null}

      {(GROUPES[id] ?? []).map((g) => (
        <GroupeChips key={g.id} groupe={g} onOpen={(section) => onOpenFiche(id, voie, section)} />
      ))}

      {fork ? (
        <div className="e-mcard__lanes">
          <p className="e-mcard__k">Après le bac, choisis une voie</p>
          <ul>
            {LANES.filter((l) => l !== "pro").map((l) => (
              <li key={l}>
                <button type="button" className="e-chip" data-line={l} onClick={() => onFocusLane(l)}>
                  <Dot line={l} />
                  {laneShort(l)}
                </button>
              </li>
            ))}
          </ul>
          <button type="button" className="e-link e-mcard__cmp" onClick={() => onCompare()}>
            Prépa, école post-bac, BUT ou université&#8239;: compare-les
          </button>
        </div>
      ) : null}

      {COMPARE_DUO[id] ? (
        <button type="button" className="e-link e-mcard__cmp" onClick={() => onCompare(COMPARE_DUO[id])}>
          {id === "universite" ? "Licence, BUT ou prépa ? Compare-les" : "Prépa ou prépa intégrée ? Compare-les"}
        </button>
      ) : null}

      {(LIENS[id] ?? []).map((l) => (
        <button key={l.id} type="button" className="e-link e-mcard__cmp" onClick={() => onOpenFiche(l.id, "u")}>
          {l.label}
        </button>
      ))}

      {(GUIDES_DE[id] ?? []).map((g) => (
        <Link key={g.href} className="e-link e-mcard__cmp" href={g.href}>
          {g.label}
        </Link>
      ))}

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
        <button type="button" className="e-btn e-btn--primary e-btn--sm" onClick={() => onOpenFiche(id, voie)}>
          Tout savoir
        </button>
        {nbEcoles ? (
          <button type="button" className="e-btn e-btn--sm" onClick={() => onOpenFiche(id, voie, "ecoles")}>
            <Icon name="school" /> {nbEcoles > 1 ? `${nbEcoles} établissements` : "L'établissement"}
          </button>
        ) : null}
        {NEARBY[id] ? (
          <button type="button" className="e-btn e-btn--sm" onClick={() => onOpenFiche(id, voie, "pres")}>
            <Icon name="pin" /> Près de chez toi
          </button>
        ) : null}
      </div>

      {prev || (next && !fork) ? (
        <div className="e-mcard__nav">
          {prev ? (
            <button type="button" className="e-link" onClick={() => onSelect(prev, voie)}>
              <Icon name="chevron-left" /> {nomEtape(prev)}
            </button>
          ) : (
            <span />
          )}
          {next && !fork ? (
            <button type="button" className="e-link" onClick={() => onSelect(next, voie)}>
              {nomEtape(next)} <Icon name="chevron-right" />
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
