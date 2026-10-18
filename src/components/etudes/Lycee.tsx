"use client";

import { useEffect, useState } from "react";
import { calendrier3e, lyceeExemples, lyceeTypes, questionsVisite } from "@/lib/etudes/lycee";
import { Icon } from "./ui";

const KEY = "etudes:visite";

export function Lycee() {
  const [checked, setChecked] = useState<string[]>([]);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(KEY);
      if (raw) setChecked(JSON.parse(raw));
    } catch {
      /* stockage indisponible : la liste reste locale à la visite */
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
    <div className="et-lycee">
      <div>
      <h3 className="et-h3">Quatre sortes de lycées</h3>
      <ul className="et-ltypes">
        {lyceeTypes.map((t) => (
          <li key={t.id} className={`et-ltype et-ltype--${t.id}`}>
            <p className="et-ltype__name">{t.name}</p>
            <p className="et-ltype__tag">{t.tagline}</p>
            <dl className="et-ltype__rows">
              {t.rows.map((r) => (
                <div key={r.k}>
                  <dt>{r.k}</dt>
                  <dd>{r.v}</dd>
                </div>
              ))}
            </dl>
            <p className="et-ltype__plus">
              <Icon name="lightbulb" width={18} height={18} /> {t.plus}
            </p>
          </li>
        ))}
      </ul>
      </div>

      <div className="et-lycee__split">
        <div>
          <h3 className="et-h3">Six questions à poser pendant une visite</h3>
          <p className="et-muted">Coche-les au fil des journées portes ouvertes : ta liste reste sur cet appareil.</p>
          <ul className="et-visit">
            {questionsVisite.map((q) => (
              <li key={q.id}>
                <label className="et-visit__item">
                  <input type="checkbox" checked={checked.includes(q.id)} onChange={() => toggle(q.id)} />
                  <span className="et-visit__box" aria-hidden="true">
                    <Icon name="check" width={16} height={16} />
                  </span>
                  <span>
                    <strong>{q.q}</strong>
                    <span className="et-visit__why">{q.why}</span>
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="et-h3">Ton calendrier de 3e</h3>
          <ol className="et-cal">
            {calendrier3e.map((c) => (
              <li key={c.when + c.what}>
                <p className="et-cal__when">{c.when}</p>
                <p className="et-cal__what">{c.what}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div>
      <h3 className="et-h3">Des lycées à regarder</h3>
      <ul className="et-lex-cards">
        {lyceeExemples.map((x) => (
          <li key={x.name} className="et-lcard">
            <p className="et-lcard__kind">{x.kind}</p>
            <p className="et-lcard__name">{x.name}</p>
            <p className="et-lcard__place">
              <Icon name="pin" width={15} height={15} /> {x.place}
            </p>
            <ul className="et-tags et-tags--sm">
              {x.tags.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
            <p className="et-lcard__note">{x.note}</p>
            {x.url ? (
              <a className="et-linkbtn" href={x.url} target="_blank" rel="noopener noreferrer">
                <Icon name="external" /> Fiche officielle
              </a>
            ) : null}
          </li>
        ))}
      </ul>
      </div>
    </div>
  );
}
