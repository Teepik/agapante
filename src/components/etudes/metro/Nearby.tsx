"use client";

import { useEffect, useMemo, useState } from "react";
import { cle, distanceKm, distanceTexte } from "@/lib/etudes/communes";
import { PSUP_SESSION, accesTexte, chargerFormations, type Formations } from "@/lib/etudes/formations";
import { PlacePicker, usePlace } from "../place";

type Filtre = { id: string; label: string; cat: string; match?: (name: string) => boolean };

const prepa = (sigle: string): Filtre => ({
  id: sigle,
  label: sigle,
  cat: "Prépas",
  match: (n) => n === `Prépa ${sigle}`,
});

/** Les formations de Parcoursup à chercher autour de chez soi, étape par étape. */
export const NEARBY: Record<string, Filtre[]> = {
  "prepa-scientifique": ["MPSI", "PCSI", "MP2I", "PTSI", "BCPST", "TSI", "TB", "TPC"].map(prepa),
  "cycle-integre": [{ id: "ing", label: "Écoles d'ingénieurs post-bac", cat: "Ingénieurs" }],
  "bts-but": [
    { id: "but", label: "BUT", cat: "BUT" },
    { id: "bts", label: "BTS", cat: "BTS" },
  ],
  "but-lp": [{ id: "but", label: "BUT", cat: "BUT" }],
  universite: [{ id: "licence", label: "Licences", cat: "Licence" }],
};

const MAX = 8;

/** « Près de chez toi » : les formations les plus proches, avec leur taux d'accès sur Parcoursup. */
export function Nearby({ id, onOpenFormation }: { id: string; onOpenFormation: (id: string) => void }) {
  const filtres = NEARBY[id] ?? [];
  const { place } = usePlace();
  const [data, setData] = useState<Formations | null>(null);
  const [failed, setFailed] = useState(false);
  const [filtre, setFiltre] = useState(filtres[0]?.id ?? "");
  const [mot, setMot] = useState("");

  useEffect(() => {
    let alive = true;
    chargerFormations()
      .then((d) => alive && setData(d))
      .catch(() => alive && setFailed(true));
    return () => {
      alive = false;
    };
  }, []);

  const f = filtres.find((x) => x.id === filtre) ?? filtres[0];

  const list = useMemo(() => {
    if (!data || !f || !place) return [];
    const cat = data.cats.indexOf(f.cat);
    const k = cle(mot);
    return data.list
      .filter((x) => x.cat === cat && (!f.match || f.match(x.name)) && (!k || x.key.includes(k)))
      .map((x) => ({ x, d: distanceKm(place.lat, place.lon, x.lat, x.lon) }))
      .sort((a, b) => a.d - b.d)
      .slice(0, MAX);
  }, [data, f, place, mot]);

  if (!filtres.length) return null;

  return (
    <div className="e-near">
      <PlacePicker />
      {filtres.length > 1 ? (
        <div className="e-near__filters" role="group" aria-label="Type de formation">
          {filtres.map((x) => (
            <button
              key={x.id}
              type="button"
              className="e-chip"
              aria-pressed={x.id === f?.id}
              onClick={() => setFiltre(x.id)}
            >
              {x.label}
            </button>
          ))}
        </div>
      ) : null}
      {f && (f.cat === "BUT" || f.cat === "BTS" || f.cat === "Licence") ? (
        <label className="e-field e-near__mot">
          <span className="e-sr">Une spécialité, un mot</span>
          <input
            type="search"
            value={mot}
            onChange={(e) => setMot(e.target.value)}
            placeholder={
              f.cat === "Licence" ? "Droit, histoire, informatique…" : "Informatique, génie civil, commerce…"
            }
            autoComplete="off"
          />
        </label>
      ) : null}

      {failed ? (
        <p className="e-small e-muted">Le chargement des formations a échoué : vérifie ta connexion.</p>
      ) : !place ? (
        <p className="e-small e-muted">Indique ta ville : les formations les plus proches s&apos;affichent ici.</p>
      ) : !data ? (
        <p className="e-small e-muted">Chargement des formations de Parcoursup…</p>
      ) : list.length ? (
        <ul className="e-near__list">
          {list.map(({ x, d }) => (
            <li key={x.id}>
              <button type="button" className="e-near__item" onClick={() => onOpenFormation(x.id)}>
                <span className="e-near__name">{x.etab}</span>
                <span className="e-near__meta">
                  {x.name}, {x.ville}, {distanceTexte(d)}
                </span>
                {typeof x.acces === "number" ? (
                  <span className="e-near__acces">
                    {accesTexte(x.acces)}, {Math.round(x.acces)} %
                  </span>
                ) : null}
              </button>
            </li>
          ))}
        </ul>
      ) : (
        <p className="e-small e-muted">Essaie un autre mot ou une autre ville.</p>
      )}
      <p className="e-small e-muted">
        Taux d&apos;accès : la part des candidats qui ont reçu une proposition sur Parcoursup en {PSUP_SESSION}.
      </p>
    </div>
  );
}
