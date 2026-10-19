"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { FRANCE_VIEW, project, regions } from "@/lib/etudes/france";
import { statutLabel, type Lycee, type Resultats } from "@/lib/etudes/lycees";
import {
  FRANCE_SESSION,
  SELECTION_PAR_UAI,
  SOURCES_FRANCE,
  chargerFrance,
  chercherCommunes,
  communeLaPlusProche,
  distanceKm,
  type Commune,
  type FranceData,
} from "@/lib/etudes/lycees-fr";
import { useSelection } from "./store";
import { Icon } from "./ui";

type Place = { kind: "commune" | "position"; name: string; lat: number; lon: number };
type Voie = "toutes" | "gt" | "pro";
type Statut = "tous" | "public" | "prive";
type Tri = "distance" | "reussite" | "va";
type Hit = { l: Lycee; d: number; bac?: Resultats; sel?: string };

const PLACE_KEY = "etudes:autour";
const RAYONS = [5, 10, 25, 50, 100];
const PAGE = 30;
const EXEMPLES = ["Nantes", "Lyon", "Bordeaux", "Lille", "75015"];
const NBSP = " ";

function lirePlace(): Place | null {
  try {
    const raw = window.localStorage.getItem(PLACE_KEY);
    if (!raw) return null;
    const p = JSON.parse(raw) as Place;
    return typeof p.lat === "number" && typeof p.lon === "number" && typeof p.name === "string" ? p : null;
  } catch {
    return null;
  }
}

function garderPlace(p: Place) {
  try {
    // La position se garde arrondie au kilomètre, sur cet appareil seulement.
    const kept = p.kind === "position" ? { ...p, lat: +p.lat.toFixed(2), lon: +p.lon.toFixed(2) } : p;
    window.localStorage.setItem(PLACE_KEY, JSON.stringify(kept));
  } catch {
    /* stockage indisponible */
  }
}

function distanceTexte(d: number) {
  return d < 1 ? `à moins d'1${NBSP}km` : `à ${Math.round(d)}${NBSP}km`;
}

function signe(v: number) {
  return `${v > 0 ? "+" : v < 0 ? "−" : ""}${Math.abs(v)}`;
}

/** Les résultats à montrer selon la voie choisie : générale et techno, ou professionnelle. */
function bacDe(l: Lycee, voie: Voie): Resultats | undefined {
  if (voie === "pro") return l.national?.pro;
  if (voie === "gt") return l.resultats;
  return l.resultats ?? l.national?.pro;
}

function voieTag(l: Lycee): string | null {
  const v = l.national?.voies;
  if (!v) return null;
  if (v.p && (v.g || v.t)) return "Général et pro";
  if (v.p) return "Pro";
  if (v.t && !v.g) return "Techno";
  return null;
}

export function LyceesFrance({ onOpenLycee }: { onOpenLycee: (id: string) => void }) {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [data, setData] = useState<FranceData | null>(null);
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const [place, setPlace] = useState<Place | null>(null);
  const [want, setWant] = useState<string | null>(null);
  const [rayon, setRayon] = useState(25);
  const [voie, setVoie] = useState<Voie>("toutes");
  const [statut, setStatut] = useState<Statut>("tous");
  const [internat, setInternat] = useState(false);
  const [tri, setTri] = useState<Tri>("distance");
  const [shown, setShown] = useState(PAGE);
  const [hot, setHot] = useState<string | null>(null);
  const [geo, setGeo] = useState<"idle" | "asking" | "off">("idle");
  const root = useRef<HTMLDivElement>(null);
  const listId = useId();
  const { has } = useSelection();

  const started = useRef(false);

  const load = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setState("loading");
    chargerFrance()
      .then((d) => {
        setData(d);
        setState("ready");
      })
      .catch(() => {
        started.current = false;
        setState("error");
      });
  }, []);

  // Un lieu déjà choisi lors d'une visite précédente : les lycées se chargent quand le bloc approche.
  useEffect(() => {
    const p = lirePlace();
    if (!p) return;
    setPlace(p);
    if (p.kind === "commune") setQ(p.name);
    const el = root.current;
    if (!el || !("IntersectionObserver" in window)) {
      load();
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "600px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [load]);

  const suggestions = useMemo(() => (data && open ? chercherCommunes(data, q) : []), [data, q, open]);

  // Un rayon à la mesure du lieu : le plus petit qui montre au moins dix lycées.
  useEffect(() => {
    if (!data || !place) return;
    const ds = data.lycees.map((l) => distanceKm(place.lat, place.lon, l.lat, l.lon));
    setRayon(RAYONS.find((r) => ds.filter((d) => d <= r).length >= 10) ?? RAYONS[RAYONS.length - 1]);
  }, [data, place]);

  const choose = useCallback((c: Commune) => {
    const p: Place = { kind: "commune", name: c.name, lat: c.lat, lon: c.lon };
    setPlace(p);
    setQ(c.name);
    setOpen(false);
    setShown(PAGE);
    garderPlace(p);
  }, []);

  // Un exemple touché avant la fin du chargement : choisi dès que les communes sont là.
  useEffect(() => {
    if (!data || !want) return;
    const c = chercherCommunes(data, want, 1)[0];
    if (c) choose(c);
    setWant(null);
  }, [data, want, choose]);

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
      } else if (!data && q.trim()) {
        e.preventDefault();
        setWant(q.trim());
        load();
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
    load();
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGeo("idle");
        const p: Place = { kind: "position", name: "ta position", lat: pos.coords.latitude, lon: pos.coords.longitude };
        setPlace(p);
        setQ("");
        setShown(PAGE);
        garderPlace(p);
      },
      () => setGeo("off"),
      { enableHighAccuracy: false, timeout: 12000, maximumAge: 10 * 60 * 1000 },
    );
  }

  const near = useMemo(
    () => (data && place?.kind === "position" ? communeLaPlusProche(data, place.lat, place.lon) : null),
    [data, place],
  );
  const where = place
    ? place.kind === "position"
      ? near
        ? `de toi, près de ${near.name}`
        : "de toi"
      : `de ${place.name}`
    : "";

  const hits = useMemo<Hit[]>(() => {
    if (!data || !place) return [];
    const out: Hit[] = [];
    for (const l of data.lycees) {
      const d = distanceKm(place.lat, place.lon, l.lat, l.lon);
      if (d > rayon) continue;
      const v = l.national!.voies;
      if (voie === "gt" && !(v.g || v.t)) continue;
      if (voie === "pro" && !v.p) continue;
      const pub = l.statut === "public" || l.statut === "defense";
      if (statut === "public" && !pub) continue;
      if (statut === "prive" && pub) continue;
      if (internat && !l.internat?.existe) continue;
      out.push({ l, d, bac: bacDe(l, voie), sel: SELECTION_PAR_UAI[l.national!.uai] });
    }
    const val = (h: Hit) => (tri === "reussite" ? h.bac?.reussite : h.bac?.va);
    return out.sort((a, b) => {
      if (tri === "distance") return a.d - b.d;
      const va = val(a);
      const vb = val(b);
      if (va === undefined && vb === undefined) return a.d - b.d;
      if (va === undefined) return 1;
      if (vb === undefined) return -1;
      return vb - va || a.d - b.d;
    });
  }, [data, place, rayon, voie, statut, internat, tri]);

  const status =
    state === "loading"
      ? "Chargement des lycées de France…"
      : state === "error"
        ? "Le chargement a échoué : vérifie ta connexion, puis réessaie."
        : geo === "asking"
          ? "Recherche de ta position…"
          : geo === "off"
            ? "Ta position reste privée : tape plutôt ta ville ou ton code postal."
            : "";

  const expanded = open && suggestions.length > 0;

  return (
    <div className="e-dir e-fr" ref={root}>
      <div className="e-fr__head">
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
                  load();
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
          {status}
          {state === "error" ? (
            <>
              {" "}
              <button type="button" className="e-link" onClick={load}>
                Réessayer
              </button>
            </>
          ) : null}
        </p>

        {place && data ? (
          <>
            <div className="e-fr__filters">
              <div className="e-fgroup">
                <span className="e-fgroup__k" id={`${listId}-r`}>
                  Rayon
                </span>
                <div className="e-seg e-seg--sm" role="group" aria-labelledby={`${listId}-r`}>
                  {RAYONS.map((r) => (
                    <button
                      key={r}
                      type="button"
                      aria-pressed={rayon === r}
                      onClick={() => {
                        setRayon(r);
                        setShown(PAGE);
                      }}
                    >
                      {r}
                      {NBSP}km
                    </button>
                  ))}
                </div>
              </div>
              <div className="e-fgroup">
                <span className="e-fgroup__k" id={`${listId}-v`}>
                  Voie
                </span>
                <div className="e-seg e-seg--sm" role="group" aria-labelledby={`${listId}-v`}>
                  {(
                    [
                      ["toutes", "Toutes"],
                      ["gt", "2nde générale"],
                      ["pro", "2nde pro"],
                    ] as const
                  ).map(([v, label]) => (
                    <button key={v} type="button" aria-pressed={voie === v} onClick={() => setVoie(v)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="e-fgroup">
                <span className="e-fgroup__k" id={`${listId}-s`}>
                  Statut
                </span>
                <div className="e-seg e-seg--sm" role="group" aria-labelledby={`${listId}-s`}>
                  {(
                    [
                      ["tous", "Tous"],
                      ["public", "Public"],
                      ["prive", "Privé"],
                    ] as const
                  ).map(([v, label]) => (
                    <button key={v} type="button" aria-pressed={statut === v} onClick={() => setStatut(v)}>
                      {label}
                    </button>
                  ))}
                </div>
              </div>
              <button type="button" className="e-chip" aria-pressed={internat} onClick={() => setInternat((v) => !v)}>
                Avec internat
              </button>
            </div>

            <div className="e-dir__countrow">
              <p className="e-dir__count" aria-live="polite">
                {hits.length} {hits.length > 1 ? "lycées" : "lycée"} à moins de {rayon}
                {NBSP}km {where}
              </p>
              <div className="e-seg e-seg--sm" role="group" aria-label="Trier">
                {(
                  [
                    ["distance", "Plus proches"],
                    ["reussite", "Réussite au bac"],
                    ["va", "Valeur ajoutée"],
                  ] as const
                ).map(([t, label]) => (
                  <button key={t} type="button" aria-pressed={tri === t} onClick={() => setTri(t)}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div className="e-fr__start">
            <p>
              Tape ta ville ou ton code postal, ou touche « Autour de moi » : les lycées s&apos;affichent du plus proche
              au plus lointain, publics et privés, avec leurs résultats au bac.
            </p>
            <p className="e-fr__try">
              <span className="e-muted">Pour essayer :</span>
              {EXEMPLES.map((x) => (
                <button
                  key={x}
                  type="button"
                  className="e-chip"
                  onClick={() => {
                    setQ(x);
                    setWant(x);
                    load();
                  }}
                >
                  {x}
                </button>
              ))}
            </p>
          </div>
        )}
      </div>

      <div className="e-fr__map">
        {place && data ? (
          <Radar place={place} rayon={rayon} hits={hits} hot={hot} onHot={setHot} onOpen={onOpenLycee} />
        ) : (
          <Overview data={data} />
        )}
      </div>

      {place && data ? (
        <div className="e-fr__body">
          {hits.length ? (
            <ul className="e-dir__list">
              {hits.slice(0, shown).map((h) => (
                <li key={h.l.id}>
                  <Entry
                    hit={h}
                    hot={hot === h.l.id}
                    saved={has("lycee", h.sel ?? h.l.id)}
                    onHot={setHot}
                    onOpen={() => onOpenLycee(h.sel ?? h.l.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="e-dir__empty">
              <p>Élargis le rayon ou retire un filtre pour voir d&apos;autres lycées.</p>
            </div>
          )}
          {hits.length > shown ? (
            <button type="button" className="e-btn e-btn--sm e-dir__more" onClick={() => setShown((s) => s + PAGE)}>
              Afficher {Math.min(PAGE, hits.length - shown)} lycées de plus
            </button>
          ) : null}
          <p className="e-small e-muted e-fr__note">
            Réussite et valeur ajoutée au bac {FRANCE_SESSION}, voie générale et technologique ou voie professionnelle.
            La valeur ajoutée compare la réussite du lycée à celle attendue pour des élèves comparables : au-dessus de
            zéro, le lycée fait mieux que prévu. Données publiques de l&apos;Éducation nationale :{" "}
            <a className="e-link" href={SOURCES_FRANCE.annuaire} target="_blank" rel="noopener noreferrer">
              annuaire
            </a>{" "}
            et{" "}
            <a className="e-link" href={SOURCES_FRANCE.ivalGT} target="_blank" rel="noopener noreferrer">
              résultats des lycées
            </a>
            .
          </p>
        </div>
      ) : null}
    </div>
  );
}

function Entry({
  hit,
  hot,
  saved,
  onHot,
  onOpen,
}: {
  hit: Hit;
  hot: boolean;
  saved: boolean;
  onHot: (id: string | null) => void;
  onOpen: () => void;
}) {
  const { l, d, bac, sel } = hit;
  const tag = voieTag(l);
  return (
    <button
      type="button"
      className={hot ? "e-entry is-hot" : "e-entry"}
      onClick={onOpen}
      onMouseEnter={() => onHot(l.id)}
      onMouseLeave={() => onHot(null)}
      onFocus={() => onHot(l.id)}
      onBlur={() => onHot(null)}
    >
      <span className="e-entry__name">
        {l.name}
        {saved ? <Icon name="bookmark" width={16} height={16} fill="currentColor" aria-label="Dans ma liste" /> : null}
      </span>
      <span className="e-entry__meta">
        <span>{l.ville}</span>
        <span>{distanceTexte(d)}</span>
        <span>{statutLabel[l.statut]}</span>
        {tag ? <span className="e-tag">{tag}</span> : null}
        {l.national?.agricole ? <span className="e-tag">Agricole</span> : null}
        {l.internat?.existe ? <span className="e-tag">Internat</span> : null}
        {sel ? <span className="e-tag e-tag--ink">Fiche détaillée</span> : null}
      </span>
      {bac && (typeof bac.reussite === "number" || typeof bac.va === "number") ? (
        <dl className="e-entry__stats">
          {typeof bac.reussite === "number" ? (
            <div>
              <dt>Réussite</dt>
              <dd>{bac.reussite} %</dd>
            </div>
          ) : null}
          {typeof bac.va === "number" ? (
            <div>
              <dt>Valeur ajoutée</dt>
              <dd>{signe(bac.va)}</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </button>
  );
}

/** Avant de choisir une ville : tous les lycées de métropole, en semis de points. */
function Overview({ data }: { data: FranceData | null }) {
  const dots = useMemo(() => {
    if (!data) return "";
    let d = "";
    for (const l of data.lycees) {
      if (l.lat < 41 || l.lat > 51.5 || l.lon < -5.6 || l.lon > 9.8) continue;
      const p = project(l.lat, l.lon);
      d += `M${p.x.toFixed(1)} ${p.y.toFixed(1)}h0`;
    }
    return d;
  }, [data]);
  return (
    <div className="e-france">
      <div className="e-france__map">
        <svg
          viewBox={`0 0 ${FRANCE_VIEW.w} ${FRANCE_VIEW.h}`}
          role="img"
          aria-label={data ? `Carte des ${data.lycees.length} lycées de France` : "Carte de France"}
        >
          {regions.map((r) => (
            <path key={r.code} d={r.d} className="e-france__region" />
          ))}
          {dots ? <path d={dots} className="e-radar__all" /> : null}
        </svg>
      </div>
      <p className="e-france__legend">
        {data ? (
          <span>
            {data.lycees.length.toLocaleString("fr-FR")} lycées, de Dunkerque à Mayotte. Outre-mer : cherche ta ville.
          </span>
        ) : (
          <span>Tous les lycées de France, publics et privés.</span>
        )}
      </p>
    </div>
  );
}

/** Autour de la ville choisie : des cercles de distance et les lycées retenus. */
function Radar({
  place,
  rayon,
  hits,
  hot,
  onHot,
  onOpen,
}: {
  place: Place;
  rayon: number;
  hits: Hit[];
  hot: string | null;
  onHot: (id: string | null) => void;
  onOpen: (id: string) => void;
}) {
  const S = 400;
  const C = S / 2;
  const R = 182;
  const k = R / rayon;
  const cos = Math.cos((place.lat * Math.PI) / 180);
  const pos = (lat: number, lon: number) => ({
    x: C + (lon - place.lon) * 111.32 * cos * k,
    y: C - (lat - place.lat) * 110.57 * k,
  });
  const [tip, setTip] = useState<{ x: number; y: number; name: string } | null>(null);
  const small = hits.length > 80;
  const ordered = hot ? [...hits.filter((h) => h.l.id !== hot), ...hits.filter((h) => h.l.id === hot)] : hits;

  return (
    <div className="e-france">
      <div className="e-france__map">
        <div style={{ position: "relative" }}>
          <svg viewBox={`0 0 ${S} ${S}`} role="img" aria-label={`Carte des lycées à moins de ${rayon} km`}>
            <circle cx={C} cy={C} r={R} className="e-radar__disc" />
            <circle cx={C} cy={C} r={R / 2} className="e-radar__ring" />
            <text x={C} y={C - R / 2 - 6} textAnchor="middle" className="e-france__label">
              {(rayon / 2).toLocaleString("fr-FR")}
              {NBSP}km
            </text>
            <text x={C} y={C - R - 6} textAnchor="middle" className="e-france__label">
              {rayon}
              {NBSP}km
            </text>
            {ordered.map(({ l, sel }) => {
              const p = pos(l.lat, l.lon);
              const pub = l.statut === "public" || l.statut === "defense";
              return (
                <circle
                  key={l.id}
                  cx={p.x}
                  cy={p.y}
                  r={hot === l.id ? 8 : small ? 3.6 : 5.5}
                  className={`e-france__dot${pub ? " e-france__dot--public" : ""}${hot === l.id ? " is-hot" : ""}`}
                  onMouseEnter={() => {
                    onHot(l.id);
                    setTip({ x: p.x, y: p.y, name: l.name });
                  }}
                  onMouseLeave={() => {
                    onHot(null);
                    setTip(null);
                  }}
                  onClick={() => onOpen(sel ?? l.id)}
                >
                  <title>{`${l.name}, ${l.ville}`}</title>
                </circle>
              );
            })}
            <circle cx={C} cy={C} r={7} className="e-radar__home" />
          </svg>
          {tip ? (
            <span
              className="e-france__tip"
              style={{ left: `${(tip.x / S) * 100}%`, top: `calc(${(tip.y / S) * 100}% + 16px)` }}
            >
              {tip.name}
            </span>
          ) : null}
        </div>
      </div>
      <p className="e-france__legend">
        <span>
          <i className="is-home" aria-hidden="true" /> {place.kind === "position" ? "Toi" : place.name}
        </span>
        <span>
          <i aria-hidden="true" /> Privé
        </span>
        <span>
          <i className="is-public" aria-hidden="true" /> Public
        </span>
      </p>
    </div>
  );
}
