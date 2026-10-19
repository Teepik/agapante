"use client";

import { useMemo, useState } from "react";
import { lineById, linesByNum } from "@/lib/etudes/lines";
import { laneShort } from "@/lib/etudes/lines";
import { LANES } from "@/lib/etudes/plan";
import {
  destinations,
  doorLabel,
  presets,
  recommend,
  specialites,
  speById,
  type Door,
  type MathsOption,
  type Selection,
  type SpeId,
} from "@/lib/etudes/specialites";
import { Dot, Icon } from "./ui";

const DOORS: Door[] = ["grande", "ouverte", "entrouverte", "fermee"];

export function Specialites({ onOpenStation }: { onOpenStation: (id: string) => void }) {
  const [mode, setMode] = useState<"spe" | "cible">("spe");
  const [sel, setSel] = useState<Selection>(presets[0].sel);
  return (
    <>
      <div className="e-seg e-sim__mode" role="group" aria-label="Sens du simulateur">
        <button type="button" aria-pressed={mode === "spe"} onClick={() => setMode("spe")}>
          Je choisis mes spécialités
        </button>
        <button type="button" aria-pressed={mode === "cible"} onClick={() => setMode("cible")}>
          Je pars de ma cible
        </button>
      </div>
      {mode === "spe" ? (
        <Forward sel={sel} setSel={setSel} onOpenStation={onOpenStation} />
      ) : (
        <Reverse
          onTry={(x) => {
            setSel(x);
            setMode("spe");
          }}
          onOpenStation={onOpenStation}
        />
      )}
    </>
  );
}

/* --------------------------------------------------------------------------
   À l'envers : de la formation visée aux spécialités
   -------------------------------------------------------------------------- */

function Reverse({ onTry, onOpenStation }: { onTry: (s: Selection) => void; onOpenStation: (id: string) => void }) {
  const [target, setTarget] = useState(destinations[0].id);
  const dest = destinations.find((d) => d.id === target) ?? destinations[0];
  const recos = useMemo(() => recommend(dest), [dest]);

  return (
    <div className="e-sim">
      <div className="e-sim__panel">
        <p className="e-sub" style={{ margin: 0 }}>
          Choisis la formation que tu vises :
        </p>
        <div className="e-cibles">
          {LANES.filter((l) => destinations.some((d) => d.line === l)).map((l) => (
            <div key={l} className="e-cibles__group" data-line={l}>
              <p className="e-cibles__lane">
                <Dot line={l} /> {laneShort(l)}
              </p>
              <div className="e-sim__chips">
                {destinations
                  .filter((d) => d.line === l)
                  .map((d) => (
                    <button
                      key={d.id}
                      type="button"
                      className="e-chip"
                      aria-pressed={d.id === dest.id}
                      onClick={() => setTarget(d.id)}
                    >
                      {d.name}
                    </button>
                  ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div aria-live="polite">
        <h3 className="e-h3" style={{ marginBottom: 6 }}>
          {dest.station ? (
            <button type="button" className="e-link" onClick={() => onOpenStation(dest.station!)}>
              {dest.name}
            </button>
          ) : (
            dest.name
          )}
        </h3>
        <p className="e-sub" style={{ marginBottom: 18 }}>
          Les duos de terminale qui ouvrent cette porte le plus grand, en gardant le plus d&apos;autres portes ouvertes.
        </p>
        <ol className="e-recos">
          {recos.map((r) => (
            <li key={r.duo.join("+")} className="e-reco">
              <p className="e-reco__state">
                <span className={`e-door e-door--${r.door}`} aria-hidden="true" />
                {doorLabel[r.door]}
              </p>
              <p className="e-reco__duo">
                {speById[r.duo[0]].name} et {speById[r.duo[1]].name}
              </p>
              <p className="e-reco__opts">{optionsText(r.sel, r.thirds)}</p>
              <p className="e-reco__why">{r.why}</p>
              <div className="e-reco__foot">
                <span className="e-muted e-small">
                  Ce profil ouvre grand {r.breadth} formation{r.breadth > 1 ? "s" : ""} sur {destinations.length}.
                </span>
                <button type="button" className="e-btn e-btn--sm" onClick={() => onTry(r.sel)}>
                  Essayer ce profil
                </button>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </div>
  );
}

function optionsText(sel: Selection, thirds: SpeId[]): string {
  const parts: string[] = [];
  const names = thirds.map((t) => speById[t].short);
  if (thirds.length >= specialites.length - 2) parts.push("En 1re, une troisième spécialité de ton choix");
  else if (thirds.length <= 3) parts.push(`En 1re, ajoute ${names.join(" ou ")}`);
  else parts.push(`En 1re, une troisième spécialité au choix, par exemple ${names.slice(0, 2).join(" ou ")}`);
  if (sel.maths === "expertes") parts.push("en terminale, l'option maths expertes");
  if (sel.maths === "complementaires") parts.push("en terminale, l'option maths complémentaires");
  if (sel.latin) parts.push("l'option latin");
  if (sel.droit) parts.push("l'option droit et grands enjeux du monde contemporain");
  return `${parts.join(" ; ")}.`;
}

/* --------------------------------------------------------------------------
   À l'endroit : des spécialités aux portes
   -------------------------------------------------------------------------- */

function Forward({
  sel,
  setSel,
  onOpenStation,
}: {
  sel: Selection;
  setSel: (f: Selection | ((s: Selection) => Selection)) => void;
  onOpenStation: (id: string) => void;
}) {
  const verdicts = useMemo(
    () => (sel.terminale.length === 2 ? destinations.map((d) => ({ d, v: d.judge(sel) })) : []),
    [sel],
  );

  const tally = useMemo(() => {
    const t: Record<Door, number> = {
      grande: 0,
      ouverte: 0,
      entrouverte: 0,
      fermee: 0,
    };
    verdicts.forEach(({ v }) => (t[v.door] += 1));
    return t;
  }, [verdicts]);

  function togglePremiere(id: SpeId) {
    setSel((s) => {
      const has = s.premiere.includes(id);
      // Trois spécialités déjà choisies : la nouvelle remplace la plus ancienne.
      const premiere = has
        ? s.premiere.filter((x) => x !== id)
        : s.premiere.length >= 3
          ? [...s.premiere.slice(1), id]
          : [...s.premiere, id];
      const terminale = s.terminale.filter((x) => premiere.includes(x));
      return normalize({ ...s, premiere, terminale });
    });
  }

  function toggleTerminale(id: SpeId) {
    setSel((s) => {
      const has = s.terminale.includes(id);
      if (!has && s.terminale.length >= 2) return normalize({ ...s, terminale: [s.terminale[1], id] });
      const terminale = has ? s.terminale.filter((x) => x !== id) : [...s.terminale, id];
      return normalize({ ...s, terminale });
    });
  }

  function setMaths(maths: MathsOption) {
    setSel((s) => normalize({ ...s, maths }));
  }

  const mathsInTle = sel.terminale.includes("maths");
  const canComplementaires = sel.premiere.includes("maths") && !mathsInTle;
  const presetActive = presets.find((p) => sameSel(p.sel, sel))?.id;

  return (
    <div className="e-sim">
      <div className="e-sim__panel">
        <div>
          <p className="e-sub" style={{ margin: "0 0 10px" }}>
            Pars d&apos;un profil, puis ajuste :
          </p>
          <div className="e-sim__presets">
            {presets.map((p) => (
              <button
                key={p.id}
                type="button"
                className="e-chip"
                aria-pressed={presetActive === p.id}
                onClick={() => setSel(p.sel)}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        <fieldset className="e-sim__step">
          <legend>
            En 1re, trois spécialités <span>{sel.premiere.length} sur 3</span>
          </legend>
          <div className="e-sim__chips">
            {specialites.map((s) => {
              const on = sel.premiere.includes(s.id);
              return (
                <button
                  key={s.id}
                  type="button"
                  className="e-chip"
                  aria-pressed={on}
                  onClick={() => togglePremiere(s.id)}
                  title={s.name}
                >
                  {on ? <Icon name="check" /> : null}
                  {s.short}
                </button>
              );
            })}
          </div>
        </fieldset>

        <fieldset className="e-sim__step" disabled={sel.premiere.length < 3}>
          <legend>
            En terminale, garde-en deux <span>{sel.terminale.length} sur 2</span>
          </legend>
          <div className="e-sim__chips">
            {sel.premiere.length < 3 ? (
              <p className="e-sim__wait">Choisis d&apos;abord tes trois spécialités de 1re.</p>
            ) : (
              sel.premiere.map((id) => (
                <button
                  key={id}
                  type="button"
                  className="e-chip"
                  aria-pressed={sel.terminale.includes(id)}
                  onClick={() => toggleTerminale(id)}
                >
                  {sel.terminale.includes(id) ? <Icon name="check" /> : null}
                  {speById[id].short}
                </button>
              ))
            )}
          </div>
        </fieldset>

        <fieldset className="e-sim__step" disabled={sel.terminale.length < 2}>
          <legend>Une option en plus</legend>
          <div className="e-radios" role="radiogroup" aria-label="Option de mathématiques en terminale">
            <label className={mathsInTle ? "e-radio" : "e-radio is-off"}>
              <input
                type="radio"
                name="maths"
                checked={sel.maths === "expertes"}
                disabled={!mathsInTle}
                onChange={() => setMaths("expertes")}
              />
              <span>
                <strong>Maths expertes</strong>
                <span>3 heures de plus, pour qui garde les maths</span>
              </span>
            </label>
            <label className={canComplementaires ? "e-radio" : "e-radio is-off"}>
              <input
                type="radio"
                name="maths"
                checked={sel.maths === "complementaires"}
                disabled={!canComplementaires}
                onChange={() => setMaths("complementaires")}
              />
              <span>
                <strong>Maths complémentaires</strong>
                <span>pour garder des maths après les avoir quittées</span>
              </span>
            </label>
            <label className="e-radio">
              <input type="radio" name="maths" checked={sel.maths === "aucune"} onChange={() => setMaths("aucune")} />
              <span>
                <strong>Tes deux spécialités seules</strong>
                <span>le programme de base de terminale</span>
              </span>
            </label>
          </div>
          <div className="e-optchecks">
            <label className="e-optcheck">
              <input
                type="checkbox"
                checked={sel.latin}
                onChange={(e) => setSel((s) => ({ ...s, latin: e.target.checked }))}
              />
              Option latin ou grec
            </label>
            <label className="e-optcheck">
              <input
                type="checkbox"
                checked={sel.droit}
                onChange={(e) => setSel((s) => ({ ...s, droit: e.target.checked }))}
              />
              Option droit et grands enjeux du monde contemporain
            </label>
          </div>
        </fieldset>
      </div>

      <div aria-live="polite">
        {verdicts.length ? (
          <>
            <ul className="e-verdicts__tally" aria-label="Résumé">
              {DOORS.map((d) => (
                <li key={d}>
                  <strong>{tally[d]}</strong>
                  <span>
                    <span className={`e-door e-door--${d}`} aria-hidden="true" />
                    {doorLabel[d]}
                  </span>
                </li>
              ))}
            </ul>
            {linesByNum.map((l) => {
              const rows = verdicts.filter(({ d }) => d.line === l.id);
              if (!rows.length) return null;
              return (
                <section key={l.id} className="e-verdicts__group" data-line={l.id}>
                  <h3>
                    <Dot line={l.id} /> {lineById[l.id].name}
                  </h3>
                  <ul>
                    {rows.map(({ d, v }) => (
                      <li key={d.id} className={`e-verdict e-verdict--${v.door}`}>
                        <span className="e-verdict__state">
                          <span className={`e-door e-door--${v.door}`} aria-hidden="true" />
                          {doorLabel[v.door]}
                        </span>
                        <div>
                          <p className="e-verdict__name">
                            {d.station ? (
                              <button type="button" className="e-link" onClick={() => onOpenStation(d.station!)}>
                                {d.name}
                              </button>
                            ) : (
                              d.name
                            )}
                          </p>
                          <p className="e-verdict__why">{v.why}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </>
        ) : (
          <div className="e-empty">
            <strong>Tes portes s&apos;afficheront ici</strong>
            Choisis trois spécialités de 1re, puis les deux que tu gardes en terminale.
          </div>
        )}
      </div>
    </div>
  );
}

function normalize(s: Selection): Selection {
  const mathsTle = s.terminale.includes("maths");
  let maths = s.maths;
  if (maths === "expertes" && !mathsTle) maths = "aucune";
  if (maths === "complementaires" && (mathsTle || !s.premiere.includes("maths"))) maths = "aucune";
  return { ...s, maths };
}

function sameSel(a: Selection, b: Selection) {
  const eq = (x: string[], y: string[]) => x.length === y.length && x.every((i) => y.includes(i));
  return (
    eq(a.premiere, b.premiere) &&
    eq(a.terminale, b.terminale) &&
    a.maths === b.maths &&
    a.latin === b.latin &&
    a.droit === b.droit
  );
}
