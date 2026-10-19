"use client";

import { useEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { maxByLine, questions } from "@/lib/etudes/boussole";
import { lineById, linesByNum, type LineId } from "@/lib/etudes/lines";
import { TEST_KEY } from "./Projet";
import { Dot, Icon } from "./ui";

const LETTERS = "ABCDEFG";

export function Quiz({
  onShowLine,
  onShowParcours,
}: {
  onShowLine: (line: LineId) => void;
  onShowParcours: (line: LineId) => void;
}) {
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [step, setStep] = useState(0);
  const max = useMemo(() => maxByLine(), []);
  const headRef = useRef<HTMLHeadingElement>(null);
  const done = step >= questions.length;
  const answered = answers.filter((a) => a >= 0).length;

  const scores = useMemo(() => {
    const raw = {} as Record<LineId, number>;
    questions.forEach((q, qi) => {
      const o = q.options[answers[qi]];
      if (!o) return;
      for (const [k, v] of Object.entries(o.w) as [LineId, number][]) raw[k] = (raw[k] ?? 0) + v;
    });
    return linesByNum
      .map((l) => ({
        id: l.id,
        pct: Math.round(((raw[l.id] ?? 0) / (max[l.id] || 1)) * 100),
      }))
      .sort((a, b) => b.pct - a.pct);
  }, [answers, max]);

  // Le résultat sert de point de départ à « Mon projet ».
  useEffect(() => {
    if (!done) return;
    try {
      window.localStorage.setItem(TEST_KEY, JSON.stringify(scores.slice(0, 3).map((x) => x.id)));
    } catch {
      /* stockage indisponible */
    }
  }, [done, scores]);

  function choose(i: number) {
    setAnswers((prev) => prev.map((v, k) => (k === step ? i : v)));
    window.setTimeout(() => {
      setStep((s) => s + 1);
      headRef.current?.focus({ preventScroll: true });
    }, 160);
  }

  function restart() {
    setAnswers(questions.map(() => -1));
    setStep(0);
    window.setTimeout(() => headRef.current?.focus({ preventScroll: true }), 0);
  }

  function onKey(e: KeyboardEvent<HTMLDivElement>) {
    if (done || e.metaKey || e.ctrlKey || e.altKey) return;
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT") return;
    const i = LETTERS.indexOf(e.key.toUpperCase());
    if (i >= 0 && i < questions[step].options.length) {
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
              {questions[step].prompt}
            </h3>
            <ul className="e-quiz__opts">
              {questions[step].options.map((o, i) => (
                <li key={o.label}>
                  <button
                    type="button"
                    className="e-quiz__opt"
                    aria-pressed={answers[step] === i}
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
            {step > 0 ? (
              <button
                type="button"
                className="e-btn e-btn--quiet e-btn--sm e-quiz__back"
                onClick={() => setStep((s) => s - 1)}
              >
                <Icon name="chevron-left" /> Question précédente
              </button>
            ) : null}
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
                const l = lineById[s.id];
                return (
                  <li key={s.id} className={i === 0 ? "e-result is-first" : "e-result"} data-line={s.id}>
                    <div className="e-result__head">
                      <Dot line={s.id} />
                      <p className="e-result__name">{l.name}</p>
                      <span className="e-result__pct">{s.pct} %</span>
                    </div>
                    <p className="e-result__pitch">{l.pitch}</p>
                    <div className="e-result__actions">
                      <button type="button" className="e-btn e-btn--sm" onClick={() => onShowLine(s.id)}>
                        <Icon name="map" /> Voir sur la carte
                      </button>
                      <button type="button" className="e-btn e-btn--sm" onClick={() => onShowParcours(s.id)}>
                        <Icon name="arrow-up" /> Son parcours
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
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
                {lineById[s.id].name}
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
