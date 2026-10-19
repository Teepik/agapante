"use client";

import { METRO_LINES, metroLineById, type MetroLineId, type Stop } from "@/lib/etudes/metro";
import { Dot, Icon } from "../ui";
import { stopsOf } from "./geometry";

/** Sur téléphone, la carte se lit de haut en bas : le tronc commun, l'aiguillage du bac, puis la ligne choisie. */
export function MetroMobile({
  onCompare,
  sel,
  onSelect,
  line,
  onLine,
  route,
  ici,
  year,
}: {
  onCompare: () => void;
  sel: string | null;
  onSelect: (id: string) => void;
  line: MetroLineId | null;
  onLine: (line: MetroLineId | null) => void;
  route: Set<string> | null;
  ici: string | null;
  year: (t: number) => number;
}) {
  const shown = line && line !== "tronc" ? metroLineById[line] : null;

  return (
    <div className="e-mmob">
      <p className="e-mmob__k">Jusqu&apos;au bac</p>
      <ol className="e-mmob__list" data-line="u">
        {ici === "4e" ? (
          <li className="e-mrow is-here is-stub">
            <span className="e-mrow__rail" aria-hidden="true">
              <span className="e-mrow__dot" />
            </span>
            <span className="e-mrow__body">
              <span className="e-mrow__name">4e</span>
              <span className="e-mrow__here">Tu es ici</span>
            </span>
          </li>
        ) : null}
        {stopsOf("tronc").map((s) => (
          <Row
            key={s.id}
            s={s}
            sel={sel}
            here={ici === s.id}
            dim={Boolean(route && !route.has(s.id))}
            year={year}
            onSelect={onSelect}
          />
        ))}
      </ol>

      <div className="e-mmob__fork" id="m-mob-lines">
        <p className="e-mmob__k">Après le bac, choisis une ligne</p>
        <div className="e-mmob__lines" role="group" aria-label="Les lignes après le bac">
          {METRO_LINES.map((l) => {
            const inRoute = !route || stopsOf(l.id).some((s) => route.has(s.id));
            return (
              <button
                key={l.id}
                type="button"
                data-line={l.lane}
                className={inRoute ? "e-mline-btn" : "e-mline-btn is-dim"}
                aria-pressed={shown?.id === l.id}
                onClick={() => onLine(shown?.id === l.id ? null : l.id)}
              >
                <Dot line={l.lane} />
                <span>
                  <strong>{l.name}</strong>
                  <span>{l.horizon}</span>
                </span>
                <Icon name={shown?.id === l.id ? "chevron-down" : "chevron-right"} />
              </button>
            );
          })}
        </div>
        <button type="button" className="e-link e-mmob__cmp" onClick={onCompare}>
          Comparer les quatre lignes, côte à côte
        </button>
      </div>

      {shown ? (
        <>
          <p className="e-mmob__pitch">{shown.pitch}</p>
          <ol className="e-mmob__list" data-line={shown.lane}>
            {stopsOf(shown.id).map((s) => (
              <Row
                key={s.id}
                s={s}
                sel={sel}
                here={false}
                dim={Boolean(route && !route.has(s.id))}
                year={year}
                onSelect={onSelect}
              />
            ))}
          </ol>
        </>
      ) : null}
    </div>
  );
}

function Row({
  s,
  sel,
  here,
  dim,
  year,
  onSelect,
}: {
  s: Stop;
  sel: string | null;
  here: boolean;
  dim: boolean;
  year: (t: number) => number;
  onSelect: (id: string) => void;
}) {
  const cls = ["e-mrow", `is-${s.kind}`, here ? "is-here" : "", dim ? "is-dim" : ""].filter(Boolean).join(" ");
  return (
    <li className={cls}>
      <button type="button" aria-pressed={sel === s.id} onClick={() => onSelect(s.id)}>
        <span className="e-mrow__rail" aria-hidden="true">
          <span className="e-mrow__dot" />
        </span>
        <span className="e-mrow__body">
          <span className="e-mrow__name">{s.label}</span>
          <span className="e-mrow__meta">
            {s.duree ? `${s.lieu ? `${s.duree} ${s.lieu}` : s.duree}, dès ${year(s.t0)}` : year(s.t0)}
            {s.alternance ? (
              <span className="e-mrow__alt">
                <Icon name="briefcase" /> alternance possible
              </span>
            ) : null}
          </span>
          {here ? <span className="e-mrow__here">Tu es ici</span> : null}
        </span>
        <Icon name="chevron-right" />
      </button>
    </li>
  );
}
