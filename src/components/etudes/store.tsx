"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { garderLycee, restaurerLyceesGardes } from "@/lib/etudes/lycees-fr";
import { Icon } from "./ui";

export type SavedKind = "lycee" | "ecole" | "station";

const KEY = "etudes:liste";

type Ctx = {
  saved: string[];
  has: (kind: SavedKind, id: string) => boolean;
  toggle: (kind: SavedKind, id: string) => void;
};

const SelectionContext = createContext<Ctx | null>(null);

/** « Ma liste » : les lycées, écoles et étapes que l'on garde de côté, sur cet appareil. */
export function SelectionProvider({ children }: { children: ReactNode }) {
  const [saved, setSaved] = useState<string[]>([]);

  useEffect(() => {
    restaurerLyceesGardes();
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setSaved(JSON.parse(raw) as string[]);
    } catch {
      /* stockage indisponible : la liste vit le temps de la visite */
    }
  }, []);

  const toggle = useCallback((kind: SavedKind, id: string) => {
    setSaved((list) => {
      const key = `${kind}:${id}`;
      const on = !list.includes(key);
      const next = on ? [...list, key] : list.filter((x) => x !== key);
      if (kind === "lycee") garderLycee(id, on);
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* idem */
      }
      return next;
    });
  }, []);

  const value = useMemo<Ctx>(
    () => ({ saved, has: (kind, id) => saved.includes(`${kind}:${id}`), toggle }),
    [saved, toggle],
  );

  return <SelectionContext.Provider value={value}>{children}</SelectionContext.Provider>;
}

export function useSelection(): Ctx {
  const ctx = useContext(SelectionContext);
  if (!ctx) throw new Error("useSelection hors de SelectionProvider");
  return ctx;
}

export function SaveButton({
  kind,
  id,
  name,
  compact = false,
}: {
  kind: SavedKind;
  id: string;
  name: string;
  compact?: boolean;
}) {
  const { has, toggle } = useSelection();
  const on = has(kind, id);
  if (compact) {
    return (
      <button
        type="button"
        className="e-iconbtn e-save"
        aria-pressed={on}
        aria-label={on ? `Retirer ${name} de ma liste` : `Ajouter ${name} à ma liste`}
        title={on ? "Retirer de ma liste" : "Ajouter à ma liste"}
        onClick={(e) => {
          e.stopPropagation();
          toggle(kind, id);
        }}
      >
        <Icon name="bookmark" />
      </button>
    );
  }
  return (
    <button type="button" className="e-btn e-btn--sm e-save" aria-pressed={on} onClick={() => toggle(kind, id)}>
      <Icon name="bookmark" />
      {on ? "Dans ma liste" : "Ajouter à ma liste"}
    </button>
  );
}
