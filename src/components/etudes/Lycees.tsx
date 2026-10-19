"use client";

import { useEffect, useMemo, useState } from "react";
import { calendrier3e, lyceeTypes, questionsVisite } from "@/lib/etudes/lycee";
import { internatTag, lyceeInternat, lycees, statutLabel, type Lycee } from "@/lib/etudes/lycees";
import { FranceMap } from "./FranceMap";
import { useCohort } from "./cohorte";
import { useSelection } from "./store";
import { Icon } from "./ui";

const KEY = "etudes:visite";

export function norm(s: string) {
  return s
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[⁠  ]/g, (c) => (c === "⁠" ? "" : " "))
    .toLowerCase();
}

type Zone = "tous" | "ouest" | "paris";

/** Nom de tri : le nom usuel, sans « Lycée » ni « Collège-lycée ». */
function sortName(l: Lycee) {
  return norm(l.short ?? l.name).replace(
    /^(college-)?lycee (prive |general et technologique |catholique )?(de |du |des |d'|le |la )?/,
    "",
  );
}

export function Lycees({ onOpenLycee }: { onOpenLycee: (id: string) => void }) {
  const { classe } = useCohort();
  return (
    <>
      <div className="e-block">
        <div className="e-block__head">
          <h3 className="e-h3">Les types de lycées</h3>
        </div>
        <div className="e-table-wrap">
          <table className="e-table">
            <thead>
              <tr>
                <td />
                {lyceeTypes.map((t) => (
                  <th key={t.id} scope="col">
                    {t.name}
                    <span>{t.tagline}</span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Pour y entrer</th>
                {lyceeTypes.map((t) => (
                  <td key={t.id}>{t.entree}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Le bac</th>
                {lyceeTypes.map((t) => (
                  <td key={t.id}>{t.bac}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Le coût</th>
                {lyceeTypes.map((t) => (
                  <td key={t.id}>{t.cout}</td>
                ))}
              </tr>
              <tr>
                <th scope="row">Bon à savoir</th>
                {lyceeTypes.map((t) => (
                  <td key={t.id}>{t.plus}</td>
                ))}
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="e-block" id="annuaire-lycees">
        <div className="e-block__head">
          <div>
            <h3 className="e-h3">L&apos;annuaire des lycées</h3>
            <p className="e-sub">Pensionnats catholiques de l&apos;Ouest, grands lycées de Paris et de Versailles.</p>
          </div>
        </div>
        <Directory onOpen={onOpenLycee} />
      </div>

      <div className="e-block">
        <div className="e-split">
          <div>
            <h3 className="e-h3">{classe === "3e" ? "Ton calendrier de 3e" : "Le calendrier de la 3e"}</h3>
            <p className="e-sub" style={{ marginBottom: 18 }}>
              {classe === "4e"
                ? "Les dates de l'année 2026-2027 : l'an prochain, elles reviendront à peu près aux mêmes moments."
                : classe === "3e"
                  ? "Les dates de l'année 2026-2027."
                  : "Les dates de l'année 2026-2027 : utiles pour changer de lycée ou conseiller un plus jeune."}
            </p>
            <ol className="e-dates">
              {calendrier3e.map((c) => (
                <li key={c.when + c.what}>
                  <span className="e-dates__when">{c.when}</span>
                  <span className="e-dates__what">{c.what}</span>
                </li>
              ))}
            </ol>
          </div>
          <Visit />
        </div>
      </div>
    </>
  );
}

function Directory({ onOpen }: { onOpen: (id: string) => void }) {
  const [q, setQ] = useState("");
  const [zone, setZone] = useState<Zone>("tous");
  const [internat, setInternat] = useState(false);
  const [catho, setCatho] = useState(false);
  const [prepas, setPrepas] = useState(false);
  const [hot, setHot] = useState<string | null>(null);
  const [sort, setSort] = useState<"nom" | "mentions">("nom");
  const { has } = useSelection();

  const list = useMemo(() => {
    const nq = norm(q.trim());
    return lycees
      .filter(
        (l) => zone === "tous" || (zone === "ouest" ? l.zone === "ouest" : l.zone === "paris" || l.zone === "idf"),
      )
      .filter((l) => !internat || lyceeInternat(l) === "lycee")
      .filter((l) => !catho || l.confession === "catholique")
      .filter((l) => !prepas || (l.prepas?.length ?? 0) > 0)
      .filter(
        (l) => !nq || norm(`${l.name} ${l.short ?? ""} ${l.ville} ${l.departement} ${l.tutelle ?? ""}`).includes(nq),
      )
      .sort((a, b) => {
        if (sort === "mentions") return (b.resultats?.mentions ?? -1) - (a.resultats?.mentions ?? -1);
        const za = a.zone === "ouest" ? 0 : 1;
        const zb = b.zone === "ouest" ? 0 : 1;
        return za - zb || sortName(a).localeCompare(sortName(b), "fr");
      });
  }, [q, zone, internat, catho, prepas, sort]);

  const visible = useMemo(() => new Set(list.map((l) => l.id)), [list]);

  return (
    <div className="e-dir">
      <div>
        <div className="e-dir__bar">
          <label className="e-field">
            <Icon name="search" />
            <span className="e-sr">Chercher un lycée, une ville</span>
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Un lycée, une ville, une congrégation…"
              autoComplete="off"
            />
          </label>
          <div className="e-seg" role="group" aria-label="Région">
            {(
              [
                ["tous", "Tous"],
                ["ouest", "Ouest"],
                ["paris", "Paris et Versailles"],
              ] as const
            ).map(([z, label]) => (
              <button key={z} type="button" aria-pressed={zone === z} onClick={() => setZone(z)}>
                {label}
              </button>
            ))}
          </div>
        </div>
        <div className="e-dir__filters" role="group" aria-label="Filtres">
          <button type="button" className="e-chip" aria-pressed={internat} onClick={() => setInternat((v) => !v)}>
            Avec internat
          </button>
          <button type="button" className="e-chip" aria-pressed={catho} onClick={() => setCatho((v) => !v)}>
            Catholique
          </button>
          <button type="button" className="e-chip" aria-pressed={prepas} onClick={() => setPrepas((v) => !v)}>
            Prépas sur place
          </button>
        </div>
        <div className="e-dir__countrow">
          <p className="e-dir__count" aria-live="polite">
            {list.length} {list.length > 1 ? "lycées" : "lycée"} sur {lycees.length}
          </p>
          <div className="e-seg e-seg--sm" role="group" aria-label="Trier">
            <button type="button" aria-pressed={sort === "nom"} onClick={() => setSort("nom")}>
              Par nom
            </button>
            <button type="button" aria-pressed={sort === "mentions"} onClick={() => setSort("mentions")}>
              Par mentions au bac
            </button>
          </div>
        </div>
        {list.length ? (
          <ul className="e-dir__list">
            {list.map((l) => (
              <li key={l.id}>
                <LyceeEntry
                  l={l}
                  hot={hot === l.id}
                  saved={has("lycee", l.id)}
                  onHot={setHot}
                  onOpen={() => onOpen(l.id)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <div className="e-dir__empty">
            <p>Élargis la recherche en retirant un filtre.</p>
          </div>
        )}
      </div>
      <FranceMap items={lycees} visible={visible} hot={hot} onHot={setHot} onOpen={onOpen} />
    </div>
  );
}

function LyceeEntry({
  l,
  hot,
  saved,
  onHot,
  onOpen,
}: {
  l: Lycee;
  hot: boolean;
  saved: boolean;
  onHot: (id: string | null) => void;
  onOpen: () => void;
}) {
  const r = l.resultats;
  const intern = internatTag(l);
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
        <span>{statutLabel[l.statut]}</span>
        {intern ? <span className="e-tag">{intern}</span> : null}
        {l.prepas?.length ? <span className="e-tag">Prépas</span> : null}
      </span>
      {r && (typeof r.reussite === "number" || typeof r.mentions === "number") ? (
        <dl className="e-entry__stats">
          {typeof r.reussite === "number" ? (
            <div>
              <dt>Réussite</dt>
              <dd>{r.reussite} %</dd>
            </div>
          ) : null}
          {typeof r.mentions === "number" ? (
            <div>
              <dt>Mentions</dt>
              <dd>{r.mentions} %</dd>
            </div>
          ) : null}
        </dl>
      ) : null}
    </button>
  );
}

function Visit() {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setChecked(JSON.parse(raw) as string[]);
    } catch {
      /* stockage indisponible : la liste vit le temps de la visite */
    }
  }, []);

  function toggle(id: string) {
    setChecked((c) => {
      const next = c.includes(id) ? c.filter((x) => x !== id) : [...c, id];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* idem */
      }
      return next;
    });
  }

  return (
    <div>
      <h3 className="e-h3">Les questions à poser en visite</h3>
      <p className="e-sub">Coche-les au fil des portes ouvertes : ta liste reste sur cet appareil.</p>
      <ul className="e-checks">
        {questionsVisite.map((x) => (
          <li key={x.id}>
            <label className="e-checkrow">
              <input type="checkbox" checked={checked.includes(x.id)} onChange={() => toggle(x.id)} />
              <span className="e-checkrow__box" aria-hidden="true">
                <Icon name="check" />
              </span>
              <span>
                <strong>{x.q}</strong>
                <span>{x.why}</span>
              </span>
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
}
