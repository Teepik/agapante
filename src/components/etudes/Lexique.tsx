"use client";

import { useMemo, useState } from "react";
import { lexique } from "@/lib/etudes/lexique";
import { Icon } from "./ui";

function norm(s: string) {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
}

export function Lexique({ onOpenStation }: { onOpenStation: (id: string) => void }) {
  const [q, setQ] = useState("");
  const list = useMemo(() => {
    const nq = norm(q.trim());
    const sorted = [...lexique].sort((a, b) => norm(a.term).localeCompare(norm(b.term), "fr"));
    return nq ? sorted.filter((x) => norm(`${x.term} ${x.def}`).includes(nq)) : sorted;
  }, [q]);

  return (
    <div className="et-lex">
      <label className="et-search et-search--wide">
        <Icon name="search" />
        <span className="et-sr">Chercher un mot</span>
        <input
          type="search"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Colle, khâgne, Parcoursup…"
          autoComplete="off"
        />
      </label>
      <p className="et-tix__count" aria-live="polite">
        {list.length} {list.length > 1 ? "mots" : "mot"}
      </p>
      <dl className="et-lex__list">
        {list.map((x) => (
          <div key={x.term} className="et-lex__item">
            <dt>{x.term}</dt>
            <dd>
              {x.def}
              {x.station ? (
                <>
                  {" "}
                  <button type="button" className="et-doors__link" onClick={() => onOpenStation(x.station!)}>
                    Voir la station
                  </button>
                </>
              ) : null}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  );
}
