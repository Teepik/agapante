"use client";

import { useEffect, useMemo, useState } from "react";
import { laneName, lanePitch, laneShort, type LaneId } from "@/lib/etudes/lines";
import { formationById } from "@/lib/etudes/formations";
import { lyceeById, statutLabel } from "@/lib/etudes/lycees";
import { passerelles } from "@/lib/etudes/passerelles";
import { LANES, LANE_DEFS } from "@/lib/etudes/plan";
import { dateLongue, dateRappel, rappels, toIcs } from "@/lib/etudes/projet";
import { dateRecit, recitsDe } from "@/lib/etudes/recits";
import { destinations, recommend, speById } from "@/lib/etudes/specialites";
import { useCohort } from "./cohorte";
import { useSelection } from "./store";
import { Dot, Icon } from "./ui";

const KEY = "etudes:projet";
export const TEST_KEY = "etudes:test";

function load(key: string): LaneId[] {
  try {
    const raw = window.localStorage.getItem(key);
    const v = raw ? (JSON.parse(raw) as string[]) : [];
    return v.filter((x): x is LaneId => (LANES as string[]).includes(x)).slice(0, 3);
  } catch {
    return [];
  }
}

/** Les étapes d'une voie, avec leur durée et l'âge. */
function etapes(lane: LaneId) {
  const def = LANE_DEFS[lane];
  const steps = [
    ...def.segs.map((s) => ({
      t: s.from,
      name: s.name,
      meta: s.more ? `${s.dur}, à partir de ${18 + s.from} ans` : `${s.dur}, de ${18 + s.from} à ${18 + s.to} ans`,
    })),
    ...def.events.map((e) => ({ t: e.at - 0.01, name: `Concours : ${e.sub}`, meta: `vers ${18 + e.at} ans` })),
  ].sort((a, b) => a.t - b.t);
  return [...steps, { t: def.end.at + 1, name: def.end.name, meta: def.end.age }];
}

/** La formation de référence de chaque voie, pour conseiller des spécialités. */
const CIBLE: Partial<Record<LaneId, string>> = {
  courtes: "but-sci",
  parasocial: "ifsi",
  postbac: "ing-postbac",
  sante: "sante",
  sciences: "mpsi",
  commerce: "ecg",
  scpo: "scpo",
  lettres: "al",
  monde: "epfl",
  arts: "cnsmd",
};

/** Le duo de spécialités qui ouvre le plus grand la formation de référence de la voie. */
function specialitesPour(lane: LaneId) {
  const dest = destinations.find((d) => d.id === CIBLE[lane]) ?? destinations.find((d) => d.line === lane);
  if (!dest) return null;
  const r = recommend(dest, 1)[0];
  if (!r) return null;
  const opt =
    r.sel.maths === "expertes"
      ? ", avec maths expertes"
      : r.sel.maths === "complementaires"
        ? ", avec maths complémentaires"
        : "";
  return { dest: dest.name, duo: `${speById[r.duo[0]].short} et ${speById[r.duo[1]].short}${opt}` };
}

export function Projet({
  onShowLine,
  onOpenPasserelle,
  onOpenLycee,
  onOpenFormation,
}: {
  onShowLine: (line: LaneId) => void;
  onOpenPasserelle: (id: string) => void;
  onOpenLycee: (id: string) => void;
  onOpenFormation: (id: string) => void;
}) {
  const { bac, classe } = useCohort();
  const { saved } = useSelection();
  const [voies, setVoies] = useState<LaneId[]>([]);
  const [fromTest, setFromTest] = useState(false);

  useEffect(() => {
    const mine = load(KEY);
    if (mine.length) setVoies(mine);
    else {
      const test = load(TEST_KEY);
      if (test.length) {
        setVoies(test.slice(0, 2));
        setFromTest(true);
      }
    }
  }, []);

  function toggle(l: LaneId) {
    setFromTest(false);
    setVoies((v) => {
      const next = v.includes(l) ? v.filter((x) => x !== l) : v.length >= 3 ? [...v.slice(1), l] : [...v, l];
      try {
        window.localStorage.setItem(KEY, JSON.stringify(next));
      } catch {
        /* le choix vit le temps de la visite */
      }
      return next;
    });
  }

  const lycees = saved
    .filter((k) => k.startsWith("lycee:"))
    .map((k) => lyceeById[k.slice(6)])
    .filter(Boolean);
  const formations = saved
    .filter((k) => k.startsWith("formation:"))
    .map((k) => formationById[k.slice(10)])
    .filter(Boolean);

  const echeances = useMemo(() => {
    const now = new Date();
    return rappels
      .filter((r) => !r.lanes || r.lanes.some((l) => voies.includes(l)))
      .map((r) => ({ r, date: dateRappel(r, bac) }))
      .filter((x) => x.date >= new Date(now.getFullYear(), now.getMonth(), now.getDate()))
      .sort((a, b) => a.date.getTime() - b.date.getTime());
  }, [voies, bac]);

  function downloadIcs() {
    const blob = new Blob([toIcs(echeances)], { type: "text/calendar;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "mon-projet-etudes.ics";
    document.body.appendChild(a);
    a.click();
    a.remove();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function print() {
    document.documentElement.classList.add("e-print-projet");
    const done = () => {
      document.documentElement.classList.remove("e-print-projet");
      window.removeEventListener("afterprint", done);
    };
    window.addEventListener("afterprint", done);
    window.print();
  }

  return (
    <div className="e-projet">
      <div className="e-projet__pick">
        <p className="e-projet__k">Tes voies, trois au plus</p>
        <div className="e-sim__chips">
          {LANES.map((l) => (
            <button
              key={l}
              type="button"
              className="e-chip"
              data-line={l}
              aria-pressed={voies.includes(l)}
              onClick={() => toggle(l)}
            >
              <Dot line={l} />
              {laneShort(l)}
            </button>
          ))}
        </div>
        {fromTest ? <p className="e-sub e-small">Choisies d&apos;après ton résultat au test : ajuste-les.</p> : null}
        <p className="e-projet__who">
          En {classe === "terminale" ? "terminale" : classe}, bac en juin {bac}
        </p>
      </div>

      {voies.length ? (
        <div className="e-projet__plan">
          {voies.map((l) => {
            const spe = specialitesPour(l);
            const planB = passerelles.filter((x) => x.draw?.from.includes(l)).slice(0, 3);
            return (
              <article key={l} className="e-projet__voie" data-line={l}>
                <header>
                  <p className="e-projet__lane">
                    <Dot line={l} /> {laneName(l)}
                  </p>
                  <p className="e-sub">{lanePitch(l)}</p>
                </header>
                {spe ? (
                  <p className="e-projet__spe">
                    <strong>Spécialités conseillées</strong> pour {spe.dest.charAt(0).toLowerCase() + spe.dest.slice(1)}{" "}
                    : {spe.duo}.
                  </p>
                ) : null}
                <ol className="e-projet__steps">
                  {etapes(l).map((s) => (
                    <li key={s.name}>
                      <span className="e-projet__step">{s.name}</span>
                      <span className="e-muted e-small">{s.meta}</span>
                    </li>
                  ))}
                </ol>
                {planB.length ? (
                  <div className="e-projet__b">
                    <p className="e-projet__k">Si tu changes d&apos;avis en chemin</p>
                    <ul>
                      {planB.map((x) => (
                        <li key={x.id}>
                          <button type="button" className="e-link" onClick={() => onOpenPasserelle(x.id)}>
                            {x.title}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}
                {recitsDe(l)[0] ? (
                  <div className="e-projet__b">
                    <p className="e-projet__k">Un récit pour te projeter</p>
                    <p>
                      <a className="e-link" href={recitsDe(l)[0].url} target="_blank" rel="noopener noreferrer">
                        {recitsDe(l)[0].titre}
                      </a>{" "}
                      <span className="e-muted e-small">
                        {recitsDe(l)[0].media}, {dateRecit(recitsDe(l)[0])}
                      </span>
                    </p>
                  </div>
                ) : null}
                <button type="button" className="e-btn e-btn--sm e-noprint" onClick={() => onShowLine(l)}>
                  <Icon name="map" /> Voir sur la carte
                </button>
              </article>
            );
          })}
        </div>
      ) : (
        <div className="e-empty">
          <strong>Choisis une à trois voies</strong>
          Ton plan se construit ici : spécialités, étapes, échéances et plan B. Le test, plus haut, peut t&apos;aider à
          choisir.
        </div>
      )}

      <div className="e-projet__side">
        <section>
          <p className="e-projet__k">Tes lycées à visiter</p>
          {lycees.length ? (
            <ul className="e-projet__list">
              {lycees.map((l) => (
                <li key={l.id}>
                  <button type="button" className="e-link" onClick={() => onOpenLycee(l.id)}>
                    {l.short ?? l.name}
                  </button>
                  <span className="e-muted e-small">
                    {l.ville}, {statutLabel[l.statut].toLowerCase()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="e-sub e-small">
              Ajoute des lycées à ta liste depuis{" "}
              <a className="e-link" href="#annuaire-lycees">
                l&apos;annuaire
              </a>{" "}
              : ils s&apos;affichent ici.
            </p>
          )}
        </section>

        <section>
          <p className="e-projet__k">Tes formations repérées</p>
          {formations.length ? (
            <ul className="e-projet__list">
              {formations.map((f) => (
                <li key={f.id}>
                  <button type="button" className="e-link" onClick={() => onOpenFormation(f.id)}>
                    {f.name}
                  </button>
                  <span className="e-muted e-small">
                    {f.etab}, {f.ville}
                    {typeof f.acces === "number" ? `, ${f.acces} % de taux d'accès` : ""}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="e-sub e-small">
              Repère des formations{" "}
              <a className="e-link" href="#formations-france">
                près de chez toi
              </a>{" "}
              et ajoute-les à ta liste : elles préparent tes vœux Parcoursup.
            </p>
          )}
        </section>

        <section>
          <p className="e-projet__k">Tes prochaines échéances</p>
          <ol className="e-projet__dates">
            {echeances.slice(0, 12).map(({ r, date }) => (
              <li key={r.id}>
                <span className="e-projet__date">{dateLongue(date)}</span>
                <span className="e-projet__what">{r.title}</span>
              </li>
            ))}
          </ol>
          <div className="e-projet__actions e-noprint">
            <button type="button" className="e-btn e-btn--primary e-btn--sm" onClick={downloadIcs}>
              <Icon name="clock" /> Ajouter à mon agenda
            </button>
            <button type="button" className="e-btn e-btn--sm" onClick={print}>
              Imprimer mon projet
            </button>
          </div>
          <p className="e-muted e-small">
            Dates indicatives : elles bougent un peu chaque année. Vérifie-les sur les sites officiels.
          </p>
        </section>
      </div>
    </div>
  );
}
