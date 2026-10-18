"use client";

import { useMemo, useRef, useState } from "react";
import { maxByLine, questions } from "@/lib/etudes/boussole";
import { lineById, type LineId } from "@/lib/etudes/lines";
import { Bullet, Icon } from "./ui";

/** Les huit lignes posées sur la rose des vents. */
const ROSE: LineId[] = ["sciences", "defense", "commerce", "scpo", "lettres", "arts", "sante", "monde"];
const C = 160;
const R = 112;
const LETTERS = "ABCDEFG";

function point(i: number, r: number) {
  const a = (i / ROSE.length) * Math.PI * 2 - Math.PI / 2;
  return { x: C + Math.cos(a) * r, y: C + Math.sin(a) * r };
}

export function Boussole({
  onShowLine,
  onShowItineraire,
}: {
  onShowLine: (line: LineId) => void;
  onShowItineraire: (line: LineId) => void;
}) {
  const [answers, setAnswers] = useState<number[]>(() => questions.map(() => -1));
  const [step, setStep] = useState(0);
  const max = useMemo(() => maxByLine(), []);
  const headRef = useRef<HTMLHeadingElement>(null);
  const done = step >= questions.length;

  const scores = useMemo(() => {
    const raw = {} as Record<LineId, number>;
    questions.forEach((q, qi) => {
      const o = q.options[answers[qi]];
      if (!o) return;
      for (const [k, v] of Object.entries(o.w) as [LineId, number][]) raw[k] = (raw[k] ?? 0) + v;
    });
    return ROSE.map((id) => ({ id, pct: Math.round(((raw[id] ?? 0) / (max[id] || 1)) * 100) })).sort(
      (a, b) => b.pct - a.pct,
    );
  }, [answers, max]);

  const answered = answers.filter((a) => a >= 0).length;
  const top = answered ? scores[0] : null;
  const needle = top ? (ROSE.indexOf(top.id) / ROSE.length) * 360 : 0;

  function choose(i: number) {
    setAnswers((prev) => prev.map((v, k) => (k === step ? i : v)));
    window.setTimeout(() => {
      setStep((s) => s + 1);
      headRef.current?.focus({ preventScroll: true });
    }, 180);
  }

  function restart() {
    setAnswers(questions.map(() => -1));
    setStep(0);
    headRef.current?.focus({ preventScroll: true });
  }

  const polygon = ROSE.map((id, i) => {
    const s = scores.find((x) => x.id === id)?.pct ?? 0;
    const p = point(i, 14 + (R - 14) * (s / 100));
    return `${p.x},${p.y}`;
  }).join(" ");

  return (
    <div className="et-compass">
      <div className="et-compass__rose">
        <svg viewBox="0 0 320 320" role="img" aria-label={top ? `La boussole indique la ligne ${lineById[top.id].num}, ${lineById[top.id].name}` : "Boussole en attente de tes réponses"}>
          <circle className="et-rose__ring" cx={C} cy={C} r={R + 18} />
          <circle className="et-rose__ring et-rose__ring--in" cx={C} cy={C} r={R * 0.5} />
          {ROSE.map((id, i) => {
            const p = point(i, R);
            return <line key={id} className="et-rose__spoke" data-line={id} x1={C} y1={C} x2={p.x} y2={p.y} />;
          })}
          {answered ? <polygon className="et-rose__shape" points={polygon} /> : null}
          <g className="et-rose__needle" style={{ transform: `rotate(${needle}deg)` }}>
            <path d={`M ${C} ${C - R + 8} L ${C + 9} ${C} L ${C} ${C + 26} L ${C - 9} ${C} Z`} />
          </g>
          <circle className="et-rose__hub" cx={C} cy={C} r={6} />
        </svg>
        {ROSE.map((id, i) => {
          const p = point(i, R + 18);
          const isTop = top?.id === id;
          return (
            <span
              key={id}
              className={isTop ? "et-rose__tip is-top" : "et-rose__tip"}
              style={{ left: `${(p.x / 320) * 100}%`, top: `${(p.y / 320) * 100}%` }}
            >
              <Bullet line={id} size={isTop ? "lg" : "md"} />
            </span>
          );
        })}
      </div>

      <div className="et-compass__panel" aria-live="polite">
        {!done ? (
          <>
            <div className="et-q__meta">
              <span>
                Question {step + 1} sur {questions.length}
              </span>
              <span className="et-q__dots" aria-hidden="true">
                {questions.map((q, i) => (
                  <span key={q.id} className={i < step ? "is-done" : i === step ? "is-now" : ""} />
                ))}
              </span>
            </div>
            <h3 className="et-q__prompt" tabIndex={-1} ref={headRef}>
              {questions[step].prompt}
            </h3>
            <ul className="et-q__opts">
              {questions[step].options.map((o, i) => (
                <li key={o.label}>
                  <button
                    type="button"
                    className="et-q__opt"
                    aria-pressed={answers[step] === i}
                    onClick={() => choose(i)}
                  >
                    <span className="et-q__key" aria-hidden="true">
                      {LETTERS[i]}
                    </span>
                    <span>{o.label}</span>
                  </button>
                </li>
              ))}
            </ul>
            {step > 0 ? (
              <button type="button" className="et-linkbtn" onClick={() => setStep((s) => s - 1)}>
                <Icon name="chevron-left" /> Question précédente
              </button>
            ) : null}
          </>
        ) : (
          <>
            <h3 className="et-q__prompt" tabIndex={-1} ref={headRef}>
              Ta boussole pointe vers…
            </h3>
            <ol className="et-res">
              {scores.slice(0, 3).map((s, i) => {
                const l = lineById[s.id];
                return (
                  <li key={s.id} className={i === 0 ? "et-res__item is-first" : "et-res__item"} data-line={s.id}>
                    <div className="et-res__head">
                      <Bullet line={s.id} size={i === 0 ? "lg" : "md"} />
                      <div>
                        <p className="et-res__name">{l.name}</p>
                        <p className="et-res__pitch">{l.pitch}</p>
                      </div>
                      <span className="et-res__pct">{s.pct} %</span>
                    </div>
                    <span className="et-res__bar" aria-hidden="true">
                      <span style={{ transform: `scaleX(${s.pct / 100})` }} />
                    </span>
                    <div className="et-res__actions">
                      <button type="button" className="et-btn et-btn--sm et-btn--line" onClick={() => onShowLine(s.id)}>
                        <Icon name="map" /> Voir la ligne {l.num}
                      </button>
                      <button type="button" className="et-btn et-btn--sm" onClick={() => onShowItineraire(s.id)}>
                        <Icon name="route" /> Son itinéraire
                      </button>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="et-res__note">
              Une boussole indique une direction. Refais-la dans quelques mois : tes goûts vont mûrir, et c&apos;est
              tant mieux.
            </p>
            <button type="button" className="et-linkbtn" onClick={restart}>
              <Icon name="refresh" /> Recommencer
            </button>
          </>
        )}
      </div>
    </div>
  );
}
