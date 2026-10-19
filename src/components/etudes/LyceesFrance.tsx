"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { distanceKm, distanceTexte } from "@/lib/etudes/communes";
import { statutLabel, type Lycee, type Resultats } from "@/lib/etudes/lycees";
import { FRANCE_SESSION, SELECTION_PAR_UAI, SOURCES_FRANCE, chargerLycees } from "@/lib/etudes/lycees-fr";
import { PlaceExamples, PlacePicker, usePlace } from "./place";
import { Overview, Radar, rayonAdapte } from "./Radar";
import { useSelection } from "./store";
import { Icon } from "./ui";

type Voie = "toutes" | "gt" | "pro";
type Statut = "tous" | "public" | "prive";
type Tri = "distance" | "reussite" | "va";
type Hit = { l: Lycee; d: number; bac?: Resultats; sel?: string };

const RAYONS = [5, 10, 25, 50, 100];
const PAGE = 30;
const NBSP = " ";

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

/** Charge les lycées de France au premier besoin. */
function useLycees() {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [list, setList] = useState<Lycee[] | null>(null);
  const started = useRef(false);
  const load = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setState("loading");
    chargerLycees()
      .then((l) => {
        setList(l);
        setState("ready");
      })
      .catch(() => {
        started.current = false;
        setState("error");
      });
  }, []);
  return { state, list, load };
}

/** Charge des données quand le bloc approche de l'écran, si un lieu est déjà choisi. */
export function useLoadWhenNear(active: boolean, load: () => void) {
  const root = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!active) return;
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
  }, [active, load]);
  return root;
}

export function LyceesFrance({ onOpenLycee }: { onOpenLycee: (id: string) => void }) {
  const { place, where } = usePlace();
  const { state, list, load } = useLycees();
  const [rayon, setRayon] = useState(25);
  const [voie, setVoie] = useState<Voie>("toutes");
  const [statut, setStatut] = useState<Statut>("tous");
  const [internat, setInternat] = useState(false);
  const [tri, setTri] = useState<Tri>("distance");
  const [shown, setShown] = useState(PAGE);
  const [hot, setHot] = useState<string | null>(null);
  const root = useLoadWhenNear(Boolean(place), load);
  const uid = useId();
  const { has } = useSelection();

  // Un rayon à la mesure du lieu : le plus petit qui montre au moins dix lycées.
  useEffect(() => {
    if (!list || !place) return;
    setRayon(
      rayonAdapte(
        list.map((l) => distanceKm(place.lat, place.lon, l.lat, l.lon)),
        RAYONS,
      ),
    );
    setShown(PAGE);
  }, [list, place]);

  const hits = useMemo<Hit[]>(() => {
    if (!list || !place) return [];
    const out: Hit[] = [];
    for (const l of list) {
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
  }, [list, place, rayon, voie, statut, internat, tri]);

  const status =
    state === "loading"
      ? "Chargement des lycées de France…"
      : state === "error"
        ? "Le chargement des lycées a échoué : vérifie ta connexion, puis réessaie."
        : "";

  const ready = Boolean(place && list);
  const open = (h: Hit) => onOpenLycee(h.sel ?? h.l.id);

  return (
    <div className="e-dir e-fr" ref={root}>
      <div className="e-fr__head">
        <PlacePicker onUse={load} status={status} />
        {state === "error" ? (
          <button type="button" className="e-link e-fr__retry" onClick={load}>
            Réessayer
          </button>
        ) : null}

        {ready ? (
          <>
            <div className="e-fr__filters">
              <div className="e-fgroup">
                <span className="e-fgroup__k" id={`${uid}-r`}>
                  Rayon
                </span>
                <div className="e-seg e-seg--sm" role="group" aria-labelledby={`${uid}-r`}>
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
                <span className="e-fgroup__k" id={`${uid}-v`}>
                  Voie
                </span>
                <div className="e-seg e-seg--sm" role="group" aria-labelledby={`${uid}-v`}>
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
                <span className="e-fgroup__k" id={`${uid}-s`}>
                  Statut
                </span>
                <div className="e-seg e-seg--sm" role="group" aria-labelledby={`${uid}-s`}>
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
              <div className="e-seg e-seg--sm" role="group" aria-label="Trier les lycées">
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
            <PlaceExamples examples={["Nantes", "Lyon", "Bordeaux", "Lille", "75015"]} onUse={load} />
          </div>
        )}
      </div>

      <div className="e-fr__map">
        {ready && place ? (
          <Radar
            place={place}
            rayon={rayon}
            points={hits.map((h) => ({
              id: h.l.id,
              lat: h.l.lat,
              lon: h.l.lon,
              name: h.l.name,
              filled: !(h.l.statut === "public" || h.l.statut === "defense"),
            }))}
            hot={hot}
            onHot={setHot}
            onOpen={(id) => {
              const h = hits.find((x) => x.l.id === id);
              if (h) open(h);
            }}
            label={`Carte des lycées à moins de ${rayon} km`}
            legend={{ filled: "Privé", hollow: "Public" }}
          />
        ) : (
          <Overview
            points={list}
            label={list ? `Carte des ${list.length} lycées de France` : "Carte de France"}
            caption={
              list
                ? `${list.length.toLocaleString("fr-FR")} lycées, de Dunkerque à Mayotte. Outre-mer : cherche ta ville.`
                : "Tous les lycées de France, publics et privés."
            }
          />
        )}
      </div>

      {ready ? (
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
                    onOpen={() => open(h)}
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
