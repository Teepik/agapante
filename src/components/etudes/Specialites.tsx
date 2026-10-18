"use client";

import { useMemo, useState } from "react";
import { lineById, linesByNum } from "@/lib/etudes/lines";
import {
  destinations,
  doorLabel,
  presets,
  specialites,
  speById,
  type Door,
  type MathsOption,
  type Selection,
  type SpeId,
} from "@/lib/etudes/specialites";
import { Bullet, Icon } from "./ui";

const DOORS: Door[] = ["grande", "ouverte", "entrouverte", "fermee"];

/** Porte dessinée en perspective : plus le battant pivote vers toi, plus la lumière passe. */
export function DoorIcon({ door }: { door: Door }) {
  const angle = { grande: 76, ouverte: 48, entrouverte: 16, fermee: 0 }[door];
  const rad = (angle * Math.PI) / 180;
  const w = 18 * Math.cos(rad);
  const h = 5 * Math.sin(rad);
  const x0 = 8;
  return (
    <svg className={`et-door et-door--${door}`} viewBox="0 0 36 36" width="34" height="34" aria-hidden="true">
      <rect className="et-door__light" x={x0} y="6" width="18" height="26" />
      <path className="et-door__leaf" d={`M${x0} 6 L${x0 + w} ${6 - h} L${x0 + w} ${32 + h} L${x0} 32 Z`} />
      {door === "fermee" ? <circle className="et-door__knob" cx={x0 + 14.5} cy="19.5" r="1.6" /> : null}
      <path className="et-door__frame" d={`M${x0 - 1.5} 33 V4.5 H${x0 + 19.5} V33`} />
      <path className="et-door__floor" d="M3 33 H33" />
    </svg>
  );
}

export function Specialites({ onOpenStation }: { onOpenStation: (id: string) => void }) {
  const [sel, setSel] = useState<Selection>(presets[0].sel);

  const verdicts = useMemo(
    () => (sel.terminale.length === 2 ? destinations.map((d) => ({ d, v: d.judge(sel) })) : []),
    [sel],
  );

  const tally = useMemo(() => {
    const t: Record<Door, number> = { grande: 0, ouverte: 0, entrouverte: 0, fermee: 0 };
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
      if (!has && s.terminale.length >= 2) {
        return normalize({ ...s, terminale: [s.terminale[1], id] });
      }
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
    <div className="et-sim">
      <div className="et-sim__presets">
        <span className="et-sim__presets-k">Essaie un profil :</span>
        {presets.map((p) => (
          <button
            key={p.id}
            type="button"
            className="et-chip"
            aria-pressed={presetActive === p.id}
            onClick={() => setSel(p.sel)}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="et-sim__grid">
        <div className="et-sim__pick">
          <fieldset className="et-sim__step">
            <legend>
              <span className="et-sim__num">1</span> En 1re, choisis 3 spécialités
              <span className="et-sim__count">{sel.premiere.length}/3</span>
            </legend>
            <div className="et-sim__chips">
              {specialites.map((s) => {
                const on = sel.premiere.includes(s.id);
                return (
                  <button
                    key={s.id}
                    type="button"
                    className="et-spe"
                    aria-pressed={on}
                    onClick={() => togglePremiere(s.id)}
                    title={s.name}
                  >
                    {on ? <Icon name="check" width={16} height={16} /> : null}
                    {s.short}
                  </button>
                );
              })}
            </div>
          </fieldset>

          <fieldset className="et-sim__step" disabled={sel.premiere.length < 3}>
            <legend>
              <span className="et-sim__num">2</span> En Terminale, garde-en 2
              <span className="et-sim__count">{sel.terminale.length}/2</span>
            </legend>
            <div className="et-sim__chips">
              {sel.premiere.length < 3 ? (
                <p className="et-sim__wait">Choisis d&apos;abord tes trois spécialités de 1re.</p>
              ) : (
                sel.premiere.map((id) => (
                  <button
                    key={id}
                    type="button"
                    className="et-spe et-spe--tle"
                    aria-pressed={sel.terminale.includes(id)}
                    onClick={() => toggleTerminale(id)}
                  >
                    {sel.terminale.includes(id) ? <Icon name="check" width={16} height={16} /> : null}
                    {speById[id].short}
                  </button>
                ))
              )}
            </div>
          </fieldset>

          <fieldset className="et-sim__step" disabled={sel.terminale.length < 2}>
            <legend>
              <span className="et-sim__num">3</span> Ajoute une option
            </legend>
            <div className="et-radios" role="radiogroup" aria-label="Option de mathématiques en Terminale">
              <label className={mathsInTle ? "et-radio" : "et-radio is-off"}>
                <input
                  type="radio"
                  name="maths"
                  checked={sel.maths === "expertes"}
                  disabled={!mathsInTle}
                  onChange={() => setMaths("expertes")}
                />
                <span>
                  <strong>Maths expertes</strong>
                  <span>3 h de plus, pour qui garde les maths</span>
                </span>
              </label>
              <label className={canComplementaires ? "et-radio" : "et-radio is-off"}>
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
              <label className="et-radio">
                <input type="radio" name="maths" checked={sel.maths === "aucune"} onChange={() => setMaths("aucune")} />
                <span>
                  <strong>Juste tes deux spécialités</strong>
                  <span>le programme de base de Terminale</span>
                </span>
              </label>
            </div>
            <div className="et-checks">
              <label className="et-check">
                <input type="checkbox" checked={sel.latin} onChange={(e) => setSel((s) => ({ ...s, latin: e.target.checked }))} />
                <span>Option latin ou grec</span>
              </label>
              <label className="et-check">
                <input type="checkbox" checked={sel.droit} onChange={(e) => setSel((s) => ({ ...s, droit: e.target.checked }))} />
                <span>Option droit et grands enjeux du monde contemporain</span>
              </label>
            </div>
          </fieldset>
        </div>

        <div className="et-sim__out" aria-live="polite">
          {verdicts.length ? (
            <>
              <ul className="et-tally" aria-label="Résumé des portes">
                {DOORS.map((d) => (
                  <li key={d} className={`et-tally__item et-tally__item--${d}`}>
                    <DoorIcon door={d} />
                    <span className="et-tally__n">{tally[d]}</span>
                    <span className="et-tally__k">{doorLabel[d]}</span>
                  </li>
                ))}
              </ul>
              <div className="et-doors">
                {linesByNum.map((l) => {
                  const rows = verdicts.filter(({ d }) => d.line === l.id);
                  if (!rows.length) return null;
                  return (
                    <section key={l.id} className="et-doors__group" data-line={l.id}>
                      <h4 className="et-doors__line">
                        <Bullet line={l.id} size="sm" /> {lineById[l.id].name}
                      </h4>
                      <ul>
                        {rows.map(({ d, v }) => (
                          <li key={d.id} className={`et-doors__row et-doors__row--${v.door}`}>
                            <DoorIcon door={v.door} />
                            <div className="et-doors__text">
                              <p className="et-doors__name">
                                {d.station ? (
                                  <button type="button" className="et-doors__link" onClick={() => onOpenStation(d.station!)}>
                                    {d.name}
                                  </button>
                                ) : (
                                  d.name
                                )}
                              </p>
                              <p className="et-doors__why">
                                <span className="et-doors__state">{doorLabel[v.door]}.</span> {v.why}
                              </p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </section>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="et-sim__empty">
              <DoorIcon door="fermee" />
              <p>Choisis trois spécialités de 1re, puis les deux que tu gardes : les portes s&apos;affichent ici.</p>
            </div>
          )}
        </div>
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
  return eq(a.premiere, b.premiere) && eq(a.terminale, b.terminale) && a.maths === b.maths && a.latin === b.latin && a.droit === b.droit;
}
