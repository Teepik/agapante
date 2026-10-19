"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useMemo,
  useRef,
  useState,
  type KeyboardEvent,
  type ReactNode,
} from "react";
import {
  chargerCommunes,
  chercherCommunes,
  communeLaPlusProche,
  type Commune,
  type Communes,
} from "@/lib/etudes/communes";
import { Icon } from "./ui";

export type Place = { kind: "commune" | "position"; name: string; lat: number; lon: number };

const KEY = "etudes:autour";

type Ctx = {
  place: Place | null;
  setPlace: (p: Place) => void;
  communes: Communes | null;
  /** Charge l'index des communes (au premier usage). */
  loadCommunes: () => void;
  communesState: "idle" | "loading" | "ready" | "error";
  /** « de Nantes », « de toi, près de Rezé » */
  where: string;
};

const PlaceContext = createContext<Ctx | null>(null);

function lire(): Place | null {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Place;
    return typeof p.lat === "number" && typeof p.lon === "number" && typeof p.name === "string" ? p : null;
  } catch {
    return null;
  }
}

function garder(p: Place) {
  try {
    // La position se garde arrondie au kilomètre, sur cet appareil seulement.
    const kept = p.kind === "position" ? { ...p, lat: +p.lat.toFixed(2), lon: +p.lon.toFixed(2) } : p;
    window.localStorage.setItem(KEY, JSON.stringify(kept));
  } catch {
    /* stockage indisponible */
  }
}

/** « Ta ville » : un lieu commun aux lycées et aux formations, gardé sur l'appareil. */
export function PlaceProvider({ children }: { children: ReactNode }) {
  const [place, setP] = useState<Place | null>(null);
  const [communes, setCommunes] = useState<Communes | null>(null);
  const [communesState, setState] = useState<Ctx["communesState"]>("idle");
  const started = useRef(false);

  useEffect(() => {
    const p = lire();
    if (p) setP(p);
  }, []);

  const loadCommunes = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setState("loading");
    chargerCommunes()
      .then((c) => {
        setCommunes(c);
        setState("ready");
      })
      .catch(() => {
        started.current = false;
        setState("error");
      });
  }, []);

  const setPlace = useCallback((p: Place) => {
    setP(p);
    garder(p);
  }, []);

  // Pour nommer « ta position », il faut les communes.
  useEffect(() => {
    if (place?.kind === "position") loadCommunes();
  }, [place, loadCommunes]);

  const where = useMemo(() => {
    if (!place) return "";
    if (place.kind === "commune") return `de ${place.name}`;
    const near = communes ? communeLaPlusProche(communes, place.lat, place.lon) : null;
    return near ? `de toi, près de ${near.name}` : "de toi";
  }, [place, communes]);

  const value = useMemo<Ctx>(
    () => ({ place, setPlace, communes, loadCommunes, communesState, where }),
    [place, setPlace, communes, loadCommunes, communesState, where],
  );
  return <PlaceContext.Provider value={value}>{children}</PlaceContext.Provider>;
}

export function usePlace(): Ctx {
  const ctx = useContext(PlaceContext);
  if (!ctx) throw new Error("usePlace hors de PlaceProvider");
  return ctx;
}

/** Le champ « Ta ville ou ton code postal » et le bouton « Autour de moi ». */
export function PlacePicker({ onUse, status }: { onUse?: () => void; status?: string }) {
  const { place, setPlace, communes, loadCommunes, communesState } = usePlace();
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [want, setWant] = useState<string | null>(null);
  const [geo, setGeo] = useState<"idle" | "asking" | "off">("idle");
  const listId = useId();

  // Le champ montre la ville choisie, ici ou dans l'autre bloc.
  useEffect(() => {
    setQ(place?.kind === "commune" ? place.name : "");
  }, [place]);

  const suggestions = useMemo(() => (communes && open ? chercherCommunes(communes, q) : []), [communes, q, open]);

  const choose = useCallback(
    (c: Commune) => {
      setPlace({ kind: "commune", name: c.name, lat: c.lat, lon: c.lon });
      setQ(c.name);
      setOpen(false);
      onUse?.();
    },
    [setPlace, onUse],
  );

  // Un exemple ou une ville tapée avant la fin du chargement : choisie dès que les communes sont là.
  useEffect(() => {
    if (!communes || !want) return;
    const c = chercherCommunes(communes, want, 1)[0];
    if (c) choose(c);
    setWant(null);
  }, [communes, want, choose]);

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, Math.max(suggestions.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const c = suggestions[active] ?? suggestions[0];
      if (c) {
        e.preventDefault();
        choose(c);
      } else if (!communes && q.trim()) {
        e.preventDefault();
        setWant(q.trim());
        loadCommunes();
      }
    } else if (e.key === "Escape" && open) {
      e.preventDefault();
      setOpen(false);
    }
  }

  function locate() {
    if (!("geolocation" in navigator)) {
      setGeo("off");
      return;
    }
    setGeo("asking");
    loadCommunes();
    onUse?.();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo("idle");
        setPlace({ kind: "position", name: "ta position", lat: pos.coords.latitude, lon: pos.coords.longitude });
      },
      () => setGeo("off"),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 10 * 60 * 1000 },
    );
  }

  const expanded = open && suggestions.length > 0;
  const line =
    communesState === "error"
      ? "Le chargement des communes a échoué : vérifie ta connexion, puis réessaie."
      : geo === "asking"
        ? "Recherche de ta position…"
        : geo === "off"
          ? "Ta position reste privée : tape plutôt ta ville ou ton code postal."
          : (status ?? "");

  return (
    <>
      <div className="e-dir__bar">
        <div className="e-fr__combo">
          <label className="e-field">
            <Icon name="search" />
            <span className="e-sr">Ta ville ou ton code postal</span>
            <input
              type="search"
              role="combobox"
              aria-autocomplete="list"
              aria-expanded={expanded}
              aria-controls={listId}
              aria-activedescendant={expanded ? `${listId}-${active}` : undefined}
              value={q}
              onChange={(e) => {
                setQ(e.target.value);
                setOpen(true);
                setActive(0);
              }}
              onFocus={() => {
                loadCommunes();
                onUse?.();
                setOpen(true);
              }}
              onBlur={() => setOpen(false)}
              onKeyDown={onKey}
              placeholder="Ta ville ou ton code postal"
              autoComplete="off"
              enterKeyHint="search"
            />
          </label>
          <ul id={listId} role="listbox" aria-label="Communes" className="e-suggest" hidden={!expanded}>
            {suggestions.map((c, i) => (
              <li
                key={`${c.name}-${c.cps[0] ?? c.dep}`}
                id={`${listId}-${i}`}
                role="option"
                aria-selected={i === active}
                onMouseDown={(e) => {
                  e.preventDefault();
                  choose(c);
                }}
                onMouseEnter={() => setActive(i)}
              >
                <span className="e-suggest__name">{c.name}</span>
                <span className="e-suggest__detail">{[c.cps[0], c.depName].filter(Boolean).join(", ")}</span>
              </li>
            ))}
          </ul>
        </div>
        <button type="button" className="e-btn" onClick={locate} aria-pressed={place?.kind === "position"}>
          <Icon name="locate" /> Autour de moi
        </button>
      </div>
      <p className="e-dir__count" aria-live="polite">
        {line}
        {communesState === "error" ? (
          <>
            {" "}
            <button type="button" className="e-link" onClick={loadCommunes}>
              Réessayer
            </button>
          </>
        ) : null}
      </p>
    </>
  );
}

/** « Pour essayer : Nantes, Lyon… » */
export function PlaceExamples({ examples, onUse }: { examples: string[]; onUse?: () => void }) {
  const { communes, loadCommunes, setPlace } = usePlace();
  const [want, setWant] = useState<string | null>(null);

  useEffect(() => {
    if (!communes || !want) return;
    const c = chercherCommunes(communes, want, 1)[0];
    if (c) setPlace({ kind: "commune", name: c.name, lat: c.lat, lon: c.lon });
    setWant(null);
  }, [communes, want, setPlace]);

  return (
    <p className="e-fr__try">
      <span className="e-muted">Pour essayer :</span>
      {examples.map((x) => (
        <button
          key={x}
          type="button"
          className="e-chip"
          onClick={() => {
            setWant(x);
            loadCommunes();
            onUse?.();
          }}
        >
          {x}
        </button>
      ))}
    </p>
  );
}
