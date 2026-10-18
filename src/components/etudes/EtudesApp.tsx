"use client";

import { useCallback, useEffect, useState } from "react";
import type { LineId } from "@/lib/etudes/lines";
import { placed } from "@/lib/etudes/plan";
import { sources } from "@/lib/etudes/sources";
import { Boussole } from "./Boussole";
import { Frise } from "./Frise";
import { Hero } from "./Hero";
import { Itineraires } from "./Itineraires";
import { Lexique } from "./Lexique";
import { Lycee } from "./Lycee";
import { NetworkMap } from "./NetworkMap";
import { PasserelleSheet } from "./PasserelleSheet";
import { Passerelles } from "./Passerelles";
import { Specialites } from "./Specialites";
import { StationSheet } from "./StationSheet";
import { Tickets } from "./Tickets";
import { TopNav } from "./TopNav";
import { Plaque } from "./ui";

const VISITED_KEY = "etudes:carnet";
const TOTAL = placed.length;

function useCarnet() {
  const [visited, setVisited] = useState<Set<string>>(new Set());
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(VISITED_KEY);
      if (raw) setVisited(new Set(JSON.parse(raw) as string[]));
    } catch {
      /* stockage indisponible : le carnet vit le temps de la visite */
    }
  }, []);
  const add = useCallback((id: string) => {
    setVisited((v) => {
      if (v.has(id)) return v;
      const next = new Set(v).add(id);
      try {
        window.localStorage.setItem(VISITED_KEY, JSON.stringify([...next]));
      } catch {
        /* idem */
      }
      return next;
    });
  }, []);
  return { visited, add };
}

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function EtudesApp() {
  const { visited, add } = useCarnet();
  const [focusLine, setFocusLine] = useState<LineId | null>(null);
  const [route, setRoute] = useState<LineId | null>(null);
  const [stripLine, setStripLine] = useState<LineId>("sciences");
  const [trip, setTrip] = useState<LineId>("sciences");
  const [open, setOpen] = useState<
    { kind: "station"; id: string; line: LineId | null } | { kind: "passerelle"; id: string } | null
  >(null);
  const [ticketFocus, setTicketFocus] = useState<{ id: string; n: number } | null>(null);
  const [showPass, setShowPass] = useState(false);
  const [spotPass, setSpotPass] = useState<string | null>(null);

  const openStation = useCallback(
    (id: string, line: LineId | null = null) => {
      setOpen({ kind: "station", id, line });
      add(id);
    },
    [add],
  );

  const openPasserelle = useCallback((id: string) => {
    setOpen({ kind: "passerelle", id });
    setSpotPass(id);
  }, []);

  const showLine = useCallback((line: LineId, gold = false) => {
    setFocusLine(line);
    setRoute(gold ? line : null);
    setStripLine(line);
    scrollToId("plan");
  }, []);

  const focusOnPlan = useCallback((line: LineId | null) => {
    setFocusLine(line);
    setRoute(null);
    if (line) setStripLine(line);
  }, []);

  return (
    <>
      <TopNav visited={visited.size} total={TOTAL} />

      <Hero onPickLine={(l) => showLine(l)} />

      <section id="plan" className="et-section et-section--plan" aria-labelledby="t-plan">
        <div className="et-section__head">
          <Plaque id="t-plan">Le plan</Plaque>
          <p className="et-section__lede">
            Le haut du plan, c&apos;est le lycée, commun à tous. Au bac, les lignes s&apos;écartent : chacune file
            vers ses prépas, ses écoles et ses métiers. La ligne U, l&apos;université, les croise toutes : on peut y
            changer de direction.
          </p>
        </div>
        <NetworkMap
          focusLine={focusLine}
          route={route}
          visited={visited}
          onOpen={openStation}
          onFocusLine={focusOnPlan}
          stripLine={stripLine}
          onStripLine={(l) => {
            setStripLine(l);
            setFocusLine(l);
          }}
          showPass={showPass}
          onTogglePass={() => {
            setShowPass((v) => !v);
            setSpotPass(null);
          }}
          spotPass={spotPass}
          onOpenPasserelle={openPasserelle}
        />
      </section>

      <section id="boussole" className="et-section" aria-labelledby="t-boussole">
        <div className="et-section__head">
          <Plaque id="t-boussole">La boussole</Plaque>
          <p className="et-section__lede">
            Six questions, une minute. Ta boussole s&apos;oriente vers les lignes qui te ressemblent le plus
            aujourd&apos;hui.
          </p>
        </div>
        <Boussole
          onShowLine={(l) => showLine(l)}
          onShowItineraire={(l) => {
            setTrip(l);
            scrollToId("itineraires");
          }}
        />
      </section>

      <section id="itineraires" className="et-section" aria-labelledby="t-itin">
        <div className="et-section__head">
          <Plaque id="t-itin">Les itinéraires d&apos;excellence</Plaque>
          <p className="et-section__lede">
            Choisis une arrivée : voici le trajet le plus solide pour y parvenir, étape par étape, avec les choix
            qui comptent vraiment.
          </p>
        </div>
        <Itineraires
          current={trip}
          onSelect={setTrip}
          onShowRoute={(l) => showLine(l, true)}
          onOpenStation={(id, l) => openStation(id, l)}
        />
      </section>

      <section id="passerelles" className="et-section" aria-labelledby="t-pass">
        <div className="et-section__head">
          <Plaque id="t-pass">Changer de ligne, rouler sur deux lignes</Plaque>
          <p className="et-section__lede">
            Les lignes se croisent. Les passerelles permettent de changer de voie en cours de route ; les doubles
            cursus permettent d&apos;en suivre deux à la fois.
          </p>
        </div>
        <Passerelles
          onOpenPasserelle={openPasserelle}
          onShowOnPlan={(id) => {
            setShowPass(true);
            setSpotPass(id);
            setFocusLine(null);
            setRoute(null);
            scrollToId("plan");
          }}
        />
      </section>

      <section id="lycee" className="et-section" aria-labelledby="t-lycee">
        <div className="et-section__head">
          <Plaque id="t-lycee">Ton lycée</Plaque>
          <p className="et-section__lede">
            Le lycée prépare le bac, et surtout ton dossier : les formations sélectives lisent tes bulletins de 1re
            et de Terminale. Choisis un lycée qui te pousse, dans un cadre où tu travailles bien.
          </p>
        </div>
        <Lycee />
      </section>

      <section id="specialites" className="et-section" aria-labelledby="t-spe">
        <div className="et-section__head">
          <Plaque id="t-spe">Tes spécialités</Plaque>
          <p className="et-section__lede">
            En 1re, tu suis trois spécialités ; en Terminale, tu en gardes deux. Compose ton trio et regarde
            quelles portes s&apos;ouvrent.
          </p>
        </div>
        <Specialites onOpenStation={(id) => openStation(id)} />
      </section>

      <section id="ecoles" className="et-section" aria-labelledby="t-ecoles">
        <div className="et-section__head">
          <Plaque id="t-ecoles">Les écoles</Plaque>
          <p className="et-section__lede">
            Un billet par établissement : comment on y entre, combien de temps on y reste, ce que l&apos;on y apprend
            et où l&apos;on va ensuite. Composte un billet pour le retourner.
          </p>
        </div>
        <Tickets focusId={ticketFocus} onOpenStation={(id) => openStation(id)} />
      </section>

      <section id="frise" className="et-section" aria-labelledby="t-frise">
        <div className="et-section__head">
          <Plaque id="t-frise">Ta frise, de 2026 à 2035</Plaque>
          <p className="et-section__lede">
            Les dates à connaître, année par année. Les plus importantes sont signalées en or.
          </p>
        </div>
        <Frise />
      </section>

      <section id="lexique" className="et-section" aria-labelledby="t-lex">
        <div className="et-section__head">
          <Plaque id="t-lex">Le lexique</Plaque>
          <p className="et-section__lede">Les mots du voyage, expliqués simplement.</p>
        </div>
        <Lexique onOpenStation={(id) => openStation(id)} />
      </section>

      <footer className="et-foot">
        <div className="et-foot__inner">
          <p className="et-foot__title">Sources</p>
          <p className="et-muted">
            Informations vérifiées en octobre 2026 auprès des sources officielles ci-dessous. Les règles peuvent
            évoluer d&apos;ici 2030 : vérifie chaque année les sites des formations et de Parcoursup.
          </p>
          <ul className="et-foot__list">
            {sources.map((s) => (
              <li key={s.url}>
                <a href={s.url} target="_blank" rel="noopener noreferrer">
                  {s.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </footer>

      {open?.kind === "station" ? (
        <StationSheet
          id={open.id}
          line={open.line}
          onClose={() => setOpen(null)}
          onNavigate={(id, l) => openStation(id, l)}
          onShowEcole={(eid) => {
            setOpen(null);
            setTicketFocus({ id: eid, n: Date.now() });
          }}
          onOpenPasserelle={openPasserelle}
        />
      ) : null}
      {open?.kind === "passerelle" ? (
        <PasserelleSheet
          id={open.id}
          onClose={() => setOpen(null)}
          onOpenStation={(id, l) => openStation(id, l)}
          onOpenPasserelle={openPasserelle}
        />
      ) : null}
    </>
  );
}
