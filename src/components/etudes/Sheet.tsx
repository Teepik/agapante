"use client";

import { useEffect, useRef, type ReactNode } from "react";
import type { LineId } from "@/lib/etudes/lines";
import { Icon } from "./ui";

/**
 * Cadre commun des fiches : panneau latéral sur grand écran, feuille montante sur mobile.
 * Gère le focus (piégé dans la fiche, rendu à l'élément d'origine), Échap et le blocage du défilement.
 */
export function Sheet({
  labelId,
  line,
  top,
  title,
  when,
  resetKey,
  onClose,
  footer,
  children,
}: {
  labelId: string;
  line: LineId | null;
  top: ReactNode;
  title: ReactNode;
  when?: ReactNode;
  /** Change quand le contenu change : la fiche remonte alors en haut. */
  resetKey: string;
  onClose: () => void;
  footer?: ReactNode;
  children: ReactNode;
}) {
  const panelRef = useRef<HTMLElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnTo.current = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add("et-lock");
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      document.documentElement.classList.remove("et-lock");
      returnTo.current?.focus?.({ preventScroll: true });
    };
  }, []);

  useEffect(() => {
    panelRef.current?.querySelector(".et-sheet__body")?.scrollTo({ top: 0 });
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
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])',
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
    <div className="et-sheet-layer">
      <button type="button" className="et-sheet-backdrop" aria-label="Fermer la fiche" tabIndex={-1} onClick={onClose} />
      <aside
        ref={panelRef}
        className="et-sheet"
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelId}
        data-line={line ?? undefined}
      >
        <header className="et-sheet__head">
          <div className="et-sheet__top">
            {top}
            <button ref={closeRef} type="button" className="et-iconbtn" onClick={onClose} aria-label="Fermer la fiche">
              <Icon name="close" />
            </button>
          </div>
          <h3 id={labelId} className="et-sheet__title">
            {title}
          </h3>
          {when ? <p className="et-sheet__when">{when}</p> : null}
        </header>
        <div className="et-sheet__body">{children}</div>
        {footer ? <footer className="et-sheet__nav">{footer}</footer> : null}
      </aside>
    </div>
  );
}
