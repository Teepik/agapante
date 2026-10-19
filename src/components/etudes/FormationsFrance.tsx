"use client";

import { useCallback, useEffect, useId, useMemo, useRef, useState } from "react";
import { cle, distanceKm, distanceTexte } from "@/lib/etudes/communes";
import {
  PSUP_SESSION,
  SOURCE_PSUP,
  chargerFormations,
  contratLabel,
  type Formation,
  type Formations,
} from "@/lib/etudes/formations";
import { useLoadWhenNear } from "./LyceesFrance";
import { PlaceExamples, PlacePicker, usePlace } from "./place";
import { Overview, Radar, rayonAdapte } from "./Radar";
import { useSelection } from "./store";
import { Icon } from "./ui";

type Statut = "tous" | "public" | "prive";
type Tri = "distance" | "accessibles" | "selectives";
type Hit = { f: Formation; d: number };

const RAYONS = [10, 25, 50, 100, 300];
const PAGE = 30;
const NBSP = " ";
const MOTS = ["informatique", "droit", "infirmier", "commerce", "design", "sport"];

function useFormations() {
  const [state, setState] = useState<"idle" | "loading" | "ready" | "error">("idle");
  const [data, setData] = useState<Formations | null>(null);
  const started = useRef(false);
  const load = useCallback(() => {
    if (started.current) return;
    started.current = true;
    setState("loading");
    chargerFormations()
      .then((d) => {
        setData(d);
        setState("ready");
      })
      .catch(() => {
        started.current = false;
        setState("error");
      });
  }, []);
  return { state, data, load };
}

/** Les formations de Parcoursup autour de « ta ville », avec leurs chiffres d'admission. */
export function FormationsFrance({ onOpenFormation }: { onOpenFormation: (id: string) => void }) {
  const { place, where } = usePlace();
  const { state, data, load } = useFormations();
  const [cat, setCat] = useState<number | null>(null);
  const [mot, setMot] = useState("");
  const [rayon, setRayon] = useState(25);
  const [statut, setStatut] = useState<Statut>("tous");
  const [tri, setTri] = useState<Tri>("distance");
  const [shown, setShown] = useState(PAGE);
  const [hot, setHot] = useState<string | null>(null);
  const root = useLoadWhenNear(Boolean(place), load);
  const uid = useId();
  const { has } = useSelection();

  // Un rayon à la mesure du lieu et du choix : le plus petit qui montre au moins quinze formations.
  useEffect(() => {
    if (!data || !place) return;
    const k = cle(mot);
    const ds = data.list
      .filter((f) => (cat === null || f.cat === cat) && (!k || f.key.includes(k)))
      .map((f) => distanceKm(place.lat, place.lon, f.lat, f.lon));
    setRayon(rayonAdapte(ds, RAYONS, cat === null && !k ? 15 : 5));
    setShown(PAGE);
  }, [data, place, cat, mot]);

  const hits = useMemo<Hit[]>(() => {
    if (!data || !place) return [];
    const k = cle(mot);
    const out: Hit[] = [];
    for (const f of data.list) {
      if (cat !== null && f.cat !== cat) continue;
      if (statut === "public" && f.contrat !== 0) continue;
      if (statut === "prive" && f.contrat === 0) continue;
      const d = distanceKm(place.lat, place.lon, f.lat, f.lon);
      if (d > rayon) continue;
      if (k && !f.key.includes(k)) continue;
      out.push({ f, d });
    }
    return out.sort((a, b) => {
      if (tri === "distance") return a.d - b.d;
      const va = a.f.acces;
      const vb = b.f.acces;
      if (va === undefined && vb === undefined) return a.d - b.d;
      if (va === undefined) return 1;
      if (vb === undefined) return -1;
      return (tri === "accessibles" ? vb - va : va - vb) || a.d - b.d;
    });
  }, [data, place, cat, mot, rayon, statut, tri]);

  const status =
    state === "loading"
      ? "Chargement des formations de Parcoursup…"
      : state === "error"
        ? "Le chargement des formations a échoué : vérifie ta connexion, puis réessaie."
        : "";
  const ready = Boolean(place && data);

  return (
    <div className="e-dir e-fr" ref={root}>
      <div className="e-fr__head">
        <PlacePicker onUse={load} status={status} />
        {state === "error" ? (
          <button type="button" className="e-link e-fr__retry" onClick={load}>
            Réessayer
          </button>
        ) : null}

        {ready && data ? (
          <>
            <div className="e-dir__filters" role="group" aria-label="Type de formation">
              <button type="button" className="e-chip" aria-pressed={cat === null} onClick={() => setCat(null)}>
                Toutes
              </button>
              {data.cats.map((c, i) => (
                <button
                  key={c}
                  type="button"
                  className="e-chip"
                  aria-pressed={cat === i}
                  onClick={() => setCat(cat === i ? null : i)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="e-fr__filters">
              <label className="e-field e-field--sm e-fr__mot">
                <Icon name="search" />
                <span className="e-sr">Un mot pour affiner</span>
                <input
                  type="search"
                  value={mot}
                  onChange={(e) => setMot(e.target.value)}
                  placeholder="Un mot : informatique, droit, infirmier…"
                  autoComplete="off"
                />
              </label>
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
            </div>
            {!mot ? (
              <p className="e-fr__try">
                <span className="e-muted">Des idées :</span>
                {MOTS.map((m) => (
                  <button key={m} type="button" className="e-chip" onClick={() => setMot(m)}>
                    {m}
                  </button>
                ))}
              </p>
            ) : null}

            <div className="e-dir__countrow">
              <p className="e-dir__count" aria-live="polite">
                {hits.length} {hits.length > 1 ? "formations" : "formation"} à moins de {rayon}
                {NBSP}km {where}
              </p>
              <div className="e-seg e-seg--sm" role="group" aria-label="Trier les formations">
                {(
                  [
                    ["distance", "Plus proches"],
                    ["accessibles", "Plus accessibles"],
                    ["selectives", "Plus sélectives"],
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
              BTS, BUT, licences, prépas, écoles : toutes les formations de Parcoursup autour de chez toi, avec leurs
              places, leurs candidats et la part de candidats qui ont reçu une proposition.
            </p>
            <PlaceExamples examples={["Rennes", "Toulouse", "Strasbourg", "Paris"]} onUse={load} />
          </div>
        )}
      </div>

      <div className="e-fr__map">
        {ready && place ? (
          <Radar
            place={place}
            rayon={rayon}
            points={hits.map((h) => ({
              id: h.f.id,
              lat: h.f.lat,
              lon: h.f.lon,
              name: `${h.f.name}, ${h.f.etab}`,
              filled: h.f.contrat !== 0,
            }))}
            hot={hot}
            onHot={setHot}
            onOpen={onOpenFormation}
            label={`Carte des formations à moins de ${rayon} km`}
            legend={{ filled: "Privé", hollow: "Public" }}
          />
        ) : (
          <Overview
            points={data?.list ?? null}
            label={data ? `Carte des ${data.list.length} formations de Parcoursup` : "Carte de France"}
            caption={
              data
                ? `${data.list.length.toLocaleString("fr-FR")} formations sur Parcoursup en ${PSUP_SESSION}.`
                : "Toutes les formations de Parcoursup."
            }
          />
        )}
      </div>

      {ready ? (
        <div className="e-fr__body">
          {hits.length ? (
            <ul className="e-dir__list">
              {hits.slice(0, shown).map((h) => (
                <li key={h.f.id}>
                  <Entry
                    hit={h}
                    hot={hot === h.f.id}
                    saved={has("formation", h.f.id)}
                    onHot={setHot}
                    onOpen={() => onOpenFormation(h.f.id)}
                  />
                </li>
              ))}
            </ul>
          ) : (
            <div className="e-dir__empty">
              <p>Élargis le rayon, change de mot ou de type de formation pour en voir d&apos;autres.</p>
            </div>
          )}
          {hits.length > shown ? (
            <button type="button" className="e-btn e-btn--sm e-dir__more" onClick={() => setShown((s) => s + PAGE)}>
              Afficher {Math.min(PAGE, hits.length - shown)} formations de plus
            </button>
          ) : null}
          <p className="e-small e-muted e-fr__note">
            Taux d&apos;accès : part des candidats qui ont reçu une proposition, ou qui auraient pu en recevoir une,
            lors de la session {PSUP_SESSION}. Il dépend aussi du nombre de candidats : une formation peu demandée
            paraît plus accessible. Données publiques du ministère de l&apos;Enseignement supérieur :{" "}
            <a className="e-link" href={SOURCE_PSUP} target="_blank" rel="noopener noreferrer">
              Parcoursup {PSUP_SESSION}
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
  const { f, d } = hit;
  return (
    <button
      type="button"
      className={hot ? "e-entry is-hot" : "e-entry"}
      onClick={onOpen}
      onMouseEnter={() => onHot(f.id)}
      onMouseLeave={() => onHot(null)}
      onFocus={() => onHot(f.id)}
      onBlur={() => onHot(null)}
    >
      <span className="e-entry__name">
        {f.name}
        {saved ? <Icon name="bookmark" width={16} height={16} fill="currentColor" aria-label="Dans ma liste" /> : null}
      </span>
      <span className="e-entry__meta">
        <span>{f.etab}</span>
        <span>{f.ville}</span>
        <span>{distanceTexte(d)}</span>
        <span>{contratLabel[f.contrat]}</span>
      </span>
      <dl className="e-entry__stats">
        {typeof f.places === "number" ? (
          <div>
            <dt>Places</dt>
            <dd>{f.places.toLocaleString("fr-FR")}</dd>
          </div>
        ) : null}
        {typeof f.acces === "number" ? (
          <div>
            <dt>Taux d&apos;accès</dt>
            <dd>{f.acces} %</dd>
          </div>
        ) : null}
      </dl>
    </button>
  );
}
