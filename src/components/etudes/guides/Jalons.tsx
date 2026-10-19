"use client";

import { useEffect, useState } from "react";
import type { Jalon } from "@/lib/etudes/guides";

const jour = (iso: string) => Date.parse(`${iso}T00:00:00`);
const finDuJour = (iso: string) => jour(iso) + 86_400_000;

/**
 * Des dates officielles, dans l'ordre : ce qui est passé s'efface, ce qui est en cours et la prochaine étape
 * se signalent. La date du jour se lit dans le navigateur, après le premier affichage.
 */
export function Jalons({
  items,
  suivre = true,
  niveau = 4,
}: {
  items: Jalon[];
  /** Signaler ce qui est passé, en cours, à venir : seulement quand ces dates sont celles de l'élève. */
  suivre?: boolean;
  /** Le niveau de titre des étapes, sous celui de l'outil. */
  niveau?: 4 | 5;
}) {
  const H = niveau === 5 ? "h5" : "h4";
  const [now, setNow] = useState<number | null>(null);
  useEffect(() => setNow(Date.now()), []);

  const etat = (j: Jalon): "passe" | "cours" | "avenir" => {
    if (now === null || !suivre) return "avenir";
    if (now >= finDuJour(j.au ?? j.du)) return "passe";
    if (now >= jour(j.du)) return "cours";
    return "avenir";
  };
  const prochain = items.findIndex((j) => etat(j) === "avenir");

  return (
    <ol className="e-gsteps e-gjal">
      {items.map((j, i) => {
        const e = etat(j);
        const cls = [
          "e-gstep",
          j.cle ? "is-key" : "",
          e === "passe" ? "is-past" : "",
          e === "cours" ? "is-now" : "",
          i === prochain && now !== null && suivre ? "is-next" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return (
          <li key={`${j.du}-${j.titre}`} className={cls}>
            <span className="e-gstep__mark" aria-hidden="true" />
            <p className="e-gstep__when">
              {j.quand}
              {e === "cours" ? <span className="e-gjal__tag">En ce moment</span> : null}
              {i === prochain && now !== null && suivre && e === "avenir" ? (
                <span className="e-gjal__tag">Prochaine étape</span>
              ) : null}
              {e === "passe" ? <span className="e-sr"> (passé)</span> : null}
            </p>
            <H className="e-gstep__title">{j.titre}</H>
            {j.texte ? <p className="e-gstep__text">{j.texte}</p> : null}
          </li>
        );
      })}
    </ol>
  );
}
