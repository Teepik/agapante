"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { LaneId } from "@/lib/etudes/lines";
import { Icon } from "./ui";

/**
 * Cadre commun des fiches : panneau latéral sur grand écran, feuille montante sur mobile.
 * Gère le focus (piégé dans la fiche, rendu à l'élément d'origine), Échap et le blocage du défilement.
 */
export function Sheet({
  labelId,
  line,
  meta,
  title,
  when,
  actions,
  resetKey,
  onClose,
  footer,
  wide = false,
  children,
}: {
  labelId: string;
  line?: LaneId | null;
  meta?: ReactNode;
  title: ReactNode;
  when?: ReactNode;
  actions?: ReactNode;
  /** Change quand le contenu change : la fiche remonte alors en haut. */
  resetKey: string;
  onClose: () => void;
  footer?: ReactNode;
  /** Fiche large, pour les tableaux de comparaison. */
  wide?: boolean;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnTo.current = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add("e-lock");
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.classList.remove("e-lock");
      returnTo.current?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    panelRef.current?.querySelector(".e-sheet__body")?.scrollTo({ top: 0 });
  }, [resetKey]);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panelRef.current) return;
      const focusables = panelRef.current.querySelectorAll<HTMLElement>(
        'button:not([disabled]), a[href], input:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="e-sheet-layer">
      <button type="button" className="e-sheet-backdrop" aria-label="Fermer" tabIndex={-1} onClick={onClose} />
      <div
        ref={panelRef}
        className={wide ? "e-sheet e-sheet--wide" : "e-sheet"}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        data-line={line ?? undefined}
      >
        <header className="e-sheet__head">
          <div className="e-sheet__top">
            <div className="e-sheet__meta">{meta}</div>
            <button ref={closeRef} type="button" className="e-iconbtn" onClick={onClose} aria-label="Fermer">
              <Icon name="close" />
            </button>
          </div>
          <h2 id={labelId} className="e-sheet__title">
            {title}
          </h2>
          {when ? <p className="e-sheet__when">{when}</p> : null}
          {actions ? <div className="e-sheet__actions">{actions}</div> : null}
        </header>
        <div className="e-sheet__body">{children}</div>
        {footer ? <footer className="e-sheet__foot">{footer}</footer> : null}
      </div>
    </div>
  );
}

/** Bouton « étape précédente / suivante » en pied de fiche. */
export function StepButton({
  dir,
  label,
  value,
  onClick,
}: {
  dir: "prev" | "next";
  label: string;
  value: string;
  onClick: () => void;
}) {
  return (
    <button type="button" className={dir === "next" ? "e-step e-step--next" : "e-step"} onClick={onClick}>
      {dir === "prev" ? <Icon name="chevron-left" /> : null}
      <span>
        <span className="e-step__k">{label}</span>
        <span className="e-step__v">{value}</span>
      </span>
      {dir === "next" ? <Icon name="chevron-right" /> : null}
    </button>
  );
}
