"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { mapTexts } from "@/lib/etudes/cohorte";
import { ecoles } from "@/lib/etudes/ecoles";
import { METRO_FICHES, METRO_LINES, metroLineById, stopById, type MetroLineId } from "@/lib/etudes/metro";
import { stationById, type StationContent } from "@/lib/etudes/stations";
import { useCohort } from "../cohorte";
import { Dot, Icon } from "../ui";
import { neighbours } from "./geometry";
import { NEARBY } from "./Nearby";

/** Le contenu d'une étape : la fiche de stations.ts, ou celle propre à la carte. */
export function useFiche(id: string): StationContent | null {
  const { y } = useCohort();
  const raw = stationById[id] ?? METRO_FICHES[id];
  return raw ? mapTexts(raw, y) : null;
}

/** L'essentiel d'un texte : ses premières phrases, jusqu'à environ 220 signes. */
export function essentiel(text: string, max = 220): string {
  const phrases = text.split(/(?<=[.!?])\s+/);
  let out = phrases[0] ?? text;
  for (const p of phrases.slice(1)) {
    if (out.length + p.length + 1 > max) break;
    out = `${out} ${p}`;
  }
  return out;
}

/** Les écoles rattachées à une étape. */
export function ecolesDe(id: string, st: StationContent | null): string[] {
  return [...new Set([...(st?.ecoles ?? []), ...ecoles.filter((e) => e.station === id).map((e) => e.id)])];
}

/** La fiche courte qui s'ouvre au toucher d'une station. */
export function StopCard({
  id,
  onClose,
  onSelect,
  onFocus,
  onOpenFiche,
}: {
  id: string;
  onClose: () => void;
  onSelect: (id: string) => void;
  onFocus: (line: MetroLineId) => void;
  onOpenFiche: (id: string, section?: string) => void;
}) {
  const s = stopById[id];
  const st = useFiche(id);
  if (!s || !st) return null;
  const line = s.line === "tronc" ? null : metroLineById[s.line];
  const { prev, next } = neighbours(id);
  const nbEcoles = ecolesDe(id, st).length;
  const chips = [s.duree, s.entree, s.cout].filter(Boolean) as string[];

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
      <p className="e-mcard__lead">{essentiel(st.what)}</p>
      {s.alternance ? (
        <p className="e-mcard__alt">
          <Icon name="briefcase" />
          <span>{s.alternance}</span>
        </p>
      ) : null}

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
