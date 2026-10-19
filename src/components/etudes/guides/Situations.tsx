"use client";

import { useId, useRef, useState } from "react";
import type { Situation } from "@/lib/etudes/guides";
import { Icon } from "../ui";

/** « Que faire si… » : on choisit sa situation, la marche à suivre s'affiche, étape par étape. */
export function Situations({ titre, question, items }: { titre: string; question: string; items: Situation[] }) {
  const uid = useId();
  const [sel, setSel] = useState(items[0]?.id ?? "");
  const panel = useRef<HTMLDivElement>(null);

  function choisir(id: string) {
    setSel(id);
    // Sur téléphone, la marche à suivre est sous la liste : on l'amène à l'écran.
    requestAnimationFrame(() => {
      const el = panel.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight - 120) {
        const reduit = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        el.scrollIntoView({ block: "nearest", behavior: reduit ? "auto" : "smooth" });
      }
    });
  }
  const cur = items.find((x) => x.id === sel) ?? items[0];
  if (!cur) return null;

  return (
    <div className="e-gsit">
      <h3 className="e-gsit__title">{titre}</h3>
      <p className="e-gsit__q" id={`${uid}-q`}>
        {question}
      </p>
      <div className="e-gsit__pick" role="radiogroup" aria-labelledby={`${uid}-q`}>
        {items.map((x) => (
          <button
            key={x.id}
            type="button"
            role="radio"
            aria-checked={x.id === cur.id}
            className="e-gsit__opt"
            onClick={() => choisir(x.id)}
          >
            <span className="e-gsit__radio" aria-hidden="true" />
            {x.label}
          </button>
        ))}
      </div>
      <div className="e-gsit__panel" aria-live="polite" ref={panel}>
        <ol className="e-gsit__steps">
          {cur.etapes.map((e) => (
            <li key={e}>{e}</li>
          ))}
        </ol>
        {cur.note ? (
          <p className="e-gsit__note">
            <Icon name="lightbulb" />
            <span>{cur.note}</span>
          </p>
        ) : null}
      </div>
    </div>
  );
}
