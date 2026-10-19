"use client";

import { useEffect, useState } from "react";
import type { EcoleDetails } from "@/lib/etudes/ecoles-details";
import { ecoleById, type Ecole } from "@/lib/etudes/ecoles";

let cache: Record<string, EcoleDetails> | null = null;
let pending: Promise<Record<string, EcoleDetails>> | null = null;

/** Les fiches détaillées (textes entiers, chiffres, sources), chargées une fois, à la première ouverture. */
function charger(): Promise<Record<string, EcoleDetails>> {
  pending ??= import("@/lib/etudes/ecoles-details")
    .then((m) => (cache = m.details))
    .catch((err: unknown) => {
      pending = null;
      throw err;
    });
  return pending;
}

/** Une école, complétée de sa fiche détaillée dès qu'elle est chargée. */
export function useEcole(id: string): Ecole | null {
  const base = ecoleById[id] ?? null;
  const [d, setD] = useState<EcoleDetails | null>(() => cache?.[id] ?? null);

  useEffect(() => {
    let alive = true;
    if (cache) {
      setD(cache[id] ?? null);
      return;
    }
    if (!base?.accroche) return;
    charger()
      .then((all) => alive && setD(all[id] ?? null))
      .catch(() => undefined);
    return () => {
      alive = false;
    };
  }, [id, base?.accroche]);

  if (!base) return null;
  if (!d) return base;
  return { ...base, ...d, sources: [...new Set([...(base.sources ?? []), ...(d.sources ?? [])])] };
}
