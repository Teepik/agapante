"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  CLASSES,
  CLASSE_PAR_DEFAUT,
  DEBUT_PAR_DEFAUT,
  anneeDuBac,
  anneeScolaire,
  avecAnnees,
  estClasse,
  stationDeClasse,
  type Classe,
} from "@/lib/etudes/cohorte";

import { writeParam } from "./url";

const KEY = "etudes:classe";

type Ctx = {
  classe: Classe;
  setClasse: (c: Classe) => void;
  /** Première année de l'année scolaire en cours. */
  debut: number;
  /** Année du bac de l'élève (juin). */
  bac: number;
  /** Remplace les repères {B}, {B-3}… par les années de l'élève. */
  y: (text: string) => string;
  /** Station du tronc commun où se trouve l'élève. */
  ici: "college" | "seconde" | "premiere-terminale" | null;
};

const CohortContext = createContext<Ctx | null>(null);

/** La classe de l'élève : lue dans l'adresse (?classe=2nde), puis sur cet appareil. */
export function CohortProvider({ children }: { children: ReactNode }) {
  const [classe, setC] = useState<Classe>(CLASSE_PAR_DEFAUT);
  const [debut, setDebut] = useState(DEBUT_PAR_DEFAUT);

  useEffect(() => {
    setDebut(anneeScolaire());
    let c: string | null = null;
    try {
      c = new URLSearchParams(window.location.search).get("classe");
    } catch {
      /* adresse illisible */
    }
    if (!estClasse(c)) {
      try {
        c = window.localStorage.getItem(KEY);
      } catch {
        /* stockage indisponible */
      }
    }
    if (estClasse(c)) setC(c);
  }, []);

  const setClasse = useCallback((c: Classe) => {
    setC(c);
    try {
      window.localStorage.setItem(KEY, c);
    } catch {
      /* stockage indisponible : le choix vit le temps de la visite */
    }
    writeParam("classe", c);
  }, []);

  const value = useMemo<Ctx>(() => {
    const bac = anneeDuBac(classe, debut);
    return { classe, setClasse, debut, bac, y: (t: string) => avecAnnees(t, bac), ici: stationDeClasse(classe) };
  }, [classe, debut, setClasse]);

  return <CohortContext.Provider value={value}>{children}</CohortContext.Provider>;
}

export function useCohort(): Ctx {
  const ctx = useContext(CohortContext);
  if (!ctx) throw new Error("useCohort hors de CohortProvider");
  return ctx;
}

/** « Tu es en 3e » : le choix de la classe, qui recalcule les dates de toute la page. */
export function ClassPicker() {
  const { classe, setClasse, bac } = useCohort();
  const group = useRef<HTMLDivElement>(null);

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    const k = CLASSES.findIndex((c) => c.id === classe);
    const step =
      e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : e.key === "ArrowLeft" || e.key === "ArrowUp" ? -1 : 0;
    if (!step) return;
    e.preventDefault();
    const next = CLASSES[(k + step + CLASSES.length) % CLASSES.length];
    setClasse(next.id);
    requestAnimationFrame(() => group.current?.querySelector<HTMLElement>('[aria-checked="true"]')?.focus());
  }

  return (
    <div className="e-classe">
      <span className="e-classe__label" id="e-classe-label">
        Tu es en
      </span>
      <div className="e-seg" role="radiogroup" aria-labelledby="e-classe-label" ref={group} onKeyDown={onKey}>
        {CLASSES.map((c) => (
          <button
            key={c.id}
            type="button"
            role="radio"
            aria-checked={classe === c.id}
            tabIndex={classe === c.id ? 0 : -1}
            onClick={() => setClasse(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <span className="e-classe__bac" aria-live="polite">
        Ton bac : juin {bac}
      </span>
    </div>
  );
}
