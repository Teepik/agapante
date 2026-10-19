"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { affinites, famillesChoisies, questions } from "@/lib/etudes/boussole";
import { laneName, lanePitch, type LaneId, type LineId } from "@/lib/etudes/lines";
import { itineraires } from "@/lib/etudes/itineraires";
import { metiers } from "@/lib/etudes/metiers";
import { TEST_KEY } from "./Projet";
import { Dot, Icon } from "./ui";

const LETTERS = "ABCDEFGHIJKL";
const empty = () => questions.map(() => [] as number[]);

export function Quiz({
  onShowLine,
  onShowParcours,
  onPickMetier,
}: {
  onShowLine: (line: LaneId) => void;
  onShowParcours: (line: LineId) => void;
  onPickMetier: (id: string) => void;
}) {
  const [answers, setAnswers] = useState<number[][]>(empty);
  const [step, setStep] = useState(0);
  const headRef = useRef<HTMLHeadingElement>(null);
  const done = step >= questions.length;
  const answered = answers.filter((a) => a.length).length;
  const q = questions[step];
  const multi = (q?.max ?? 1) > 1;

  const scores = useMemo(() => affinites(answers), [answers]);

  // Les métiers à explorer : d'abord ceux des familles choisies, puis ceux des voies qui te ressemblent.
  const jobs = useMemo(() => {
    if (!done) return [];
    const fams = new Set(famillesChoisies(answers));
    const pct = Object.fromEntries(scores.map((s) => [s.id, s.pct])) as Record<LaneId, number>;
    return metiers
      .map((m) => ({
        m,
        s: (fams.has(m.famille) ? 50 : 0) + Math.max(...m.routes.map((r) => pct[r.lane] ?? 0)) / 2,
      }))
      .sort((a, b) => b.s - a.s)
      .slice(0, 8)
      .map((x) => x.m);
  }, [done, answers, scores]);

  // Le résultat sert de point de départ à « Mon projet ».
  useEffect(() => {
    if (!done) return;
    try {
      window.localStorage.setItem(TEST_KEY, JSON.stringify(scores.slice(0, 3).map((x) => x.id)));
    } catch {
      /* stockage indisponible */
    }
  }, [done, scores]);

  function next() {
    window.setTimeout(() => {
      setStep((s) => s + 1);
      headRef.current?.focus({ preventScroll: true });
    }, 160);
  }

  function choose(i: number) {
    if (multi) {
      setAnswers((prev) =>
        prev.map((v, k) => {
          if (k !== step) return v;
          if (v.includes(i)) return v.filter((x) => x !== i);
          return v.length >= (q.max ?? 1) ? [...v.slice(1), i] : [...v, i];
        }),
      );
      return;
    }
    setAnswers((prev) => prev.map((v, k) => (k === step ? [i] : v)));
    next();
  }

  function restart() {
    setAnswers(empty());
    setStep(0);
    window.setTimeout(() => headRef.current?.focus({ preventScroll: true }), 0);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (done || e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") return;
    if (multi && e.key === "Enter" && answers[step].length) {
      e.preventDefault();
      next();
      return;
    }
    const i = LETTERS.indexOf(e.key.toUpperCase());
    if (i >= 0 && i < q.options.length) {
      e.preventDefault();
      choose(i);
    }
  }

  return (
    <div className="e-quiz">
      <div className="e-quiz__card" onKeyDown={onKey}>
        {!done ? (
          <>
            <div className="e-quiz__progress">
              <span className="e-num">
                Question {step + 1} sur {questions.length}
              </span>
              <span className="e-quiz__bar" aria-hidden="true">
                <span style={{ transform: `scaleX(${step / questions.length})` }} />
              </span>
            </div>
            <h3 className="e-quiz__q" tabIndex={-1} ref={headRef}>
              {q.prompt}
            </h3>
            {multi ? (
              <p className="e-quiz__hint">
                Jusqu&apos;à {q.max === 2 ? "deux" : "trois"} réponses
                {answers[step].length ? ` : ${answers[step].length} sur ${q.max}` : ""}
              </p>
            ) : null}
            <ul className={multi && q.options.length > 8 ? "e-quiz__opts e-quiz__opts--two" : "e-quiz__opts"}>
              {q.options.map((o, i) => (
                <li key={o.label}>
                  <button
                    type="button"
                    className="e-quiz__opt"
                    aria-pressed={answers[step].includes(i)}
                    onClick={() => choose(i)}
                  >
                    <span className="e-kbd" aria-hidden="true">
                      {LETTERS[i]}
                    </span>
                    <span>{o.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="e-quiz__nav">
              {step > 0 ? (
                <button
                  type="button"
                  className="e-btn e-btn--quiet e-btn--sm e-quiz__back"
                  onClick={() => setStep((s) => s - 1)}
                >
                  <Icon name="chevron-left" /> Question précédente
                </button>
              ) : (
                <span />
              )}
              {multi ? (
                <button
                  type="button"
                  className="e-btn e-btn--primary e-btn--sm"
                  disabled={!answers[step].length}
                  onClick={next}
                >
                  Continuer
                </button>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <div className="e-quiz__progress">
              <span>Ton résultat</span>
              <span className="e-quiz__bar" aria-hidden="true">
                <span style={{ transform: "scaleX(1)" }} />
              </span>
            </div>
            <h3 className="e-quiz__q" tabIndex={-1} ref={headRef}>
              Les voies qui te ressemblent aujourd&apos;hui
            </h3>
            <ol className="e-results" aria-live="polite">
              {scores.slice(0, 3).map((s, i) => {
                const parcours = s.id !== "u" && itineraires.some((x) => x.line === s.id);
                return (
                  <li key={s.id} className={i === 0 ? "e-result is-first" : "e-result"} data-line={s.id}>
                    <div className="e-result__head">
                      <Dot line={s.id} />
                      <p className="e-result__name">{laneName(s.id)}</p>
                      <span className="e-result__pct">{s.pct} %</span>
                    </div>
                    <p className="e-result__pitch">{lanePitch(s.id)}</p>
                    <div className="e-result__actions">
                      <button type="button" className="e-btn e-btn--sm" onClick={() => onShowLine(s.id)}>
                        <Icon name="map" /> Voir sur la carte
                      </button>
                      {parcours ? (
                        <button
                          type="button"
                          className="e-btn e-btn--sm"
                          onClick={() => onShowParcours(s.id as LineId)}
                        >
                          <Icon name="arrow-up" /> Son parcours
                        </button>
                      ) : null}
                    </div>
                  </li>
                );
              })}
            </ol>

            {jobs.length ? (
              <div className="e-quiz__jobs">
                <h4>Des métiers à explorer</h4>
                <div className="e-quiz__jobs-list">
                  {jobs.map((m) => (
                    <button key={m.id} type="button" className="e-chip" onClick={() => onPickMetier(m.id)}>
                      {m.name}
                    </button>
                  ))}
                </div>
              </div>
            ) : null}

            <p className="e-sub" style={{ marginTop: 20 }}>
              Tes goûts vont mûrir d&apos;ici le bac : refais le test l&apos;an prochain, et compare.
            </p>
            <button type="button" className="e-btn e-btn--quiet e-btn--sm e-quiz__back" onClick={restart}>
              <Icon name="refresh" /> Recommencer
            </button>
          </>
        )}
      </div>

      <div className="e-quiz__aside" role="region" aria-label="Tes affinités, en direct">
        <h3>{answered ? "Tes affinités, en direct" : "Tes affinités s'affichent ici"}</h3>
        <ul className="e-bars">
          {scores.map((s) => (
            <li key={s.id} data-line={s.id}>
              <span className="e-bars__name">
                <Dot line={s.id} />
                {laneName(s.id)}
              </span>
              <span className="e-bars__pct">{s.pct} %</span>
              <span className="e-bars__track" aria-hidden="true">
                <span style={{ transform: `scaleX(${s.pct / 100})` }} />
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
