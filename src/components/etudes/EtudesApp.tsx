"use client";

import { useCallback, useEffect, useState } from "react";
import type { LineId } from "@/lib/etudes/lines";
import { ecoles } from "@/lib/etudes/ecoles";
import { lycees } from "@/lib/etudes/lycees";
import { CareerMap } from "./CareerMap";
import { CommandPalette } from "./CommandPalette";
import { EcoleSheet, LyceeSheet, PasserelleSheet } from "./DetailSheets";
import { Ecoles } from "./Ecoles";
import { Hero } from "./Hero";
import { Lycees } from "./Lycees";
import { MyList } from "./MyList";
import { Parcours } from "./Parcours";
import { Passerelles } from "./Passerelles";
import { Quiz } from "./Quiz";
import { Calendrier, Footer, Lexique } from "./Reperes";
import { Specialites } from "./Specialites";
import { StationSheet } from "./StationSheet";
import { SelectionProvider, useSelection } from "./store";
import { TopNav } from "./TopNav";

type Open =
  | { kind: "station"; id: string; line: LineId | null }
  | { kind: "passerelle"; id: string }
  | { kind: "ecole"; id: string }
  | { kind: "lycee"; id: string }
  | { kind: "liste" }
  | null;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function EtudesApp() {
  return (
    <SelectionProvider>
      <App />
    </SelectionProvider>
  );
}

function App() {
  const { saved } = useSelection();
  const [open, setOpen] = useState<Open>(null);
  const [cmd, setCmd] = useState(false);
  const [focusLine, setFocusLine] = useState<LineId | null>(null);
  const [route, setRoute] = useState<LineId | null>(null);
  const [laneLine, setLaneLine] = useState<LineId>("sciences");
  const [showPass, setShowPass] = useState(false);
  const [spotPass, setSpotPass] = useState<string | null>(null);
  const [trip, setTrip] = useState<LineId>("sciences");
  const [lexQuery, setLexQuery] = useState("");

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement;
      const typing = t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setCmd((v) => !v);
      } else if (e.key === "/" && !typing && !open) {
        e.preventDefault();
        setCmd(true);
      }
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const openStation = useCallback((id: string, line: LineId | null = null) => {
    setOpen({ kind: "station", id, line });
  }, []);
  const openPasserelle = useCallback((id: string) => {
    setOpen({ kind: "passerelle", id });
    setSpotPass(id);
  }, []);
  const openEcole = useCallback((id: string) => setOpen({ kind: "ecole", id }), []);
  const openLycee = useCallback((id: string) => setOpen({ kind: "lycee", id }), []);
  const close = useCallback(() => setOpen(null), []);

  const showLine = useCallback((line: LineId, asRoute = false) => {
    setFocusLine(line);
    setRoute(asRoute ? line : null);
    setLaneLine(line);
    scrollToId("carte");
  }, []);

  const showPassOnMap = useCallback((id: string) => {
    setOpen(null);
    setShowPass(true);
    setSpotPass(id);
    setFocusLine(null);
    setRoute(null);
    scrollToId("carte");
  }, []);

  const showMot = useCallback((term: string) => {
    setLexQuery(term);
    scrollToId("lexique");
  }, []);

  return (
    <>
      <a className="e-skip" href="#carte">
        Aller à la carte
      </a>
      <TopNav savedCount={saved.length} onSearch={() => setCmd(true)} onOpenList={() => setOpen({ kind: "liste" })} />

      <main>
        <Hero />

        <section id="carte" className="e-section e-section--fog e-map-section" aria-labelledby="t-carte">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-carte" className="e-title">
                La carte des études
              </h2>
              <p className="e-lede">
                Le tronc commun monte jusqu&apos;au bac, puis se ramifie en huit voies jusqu&apos;aux métiers. Touche
                une étape pour ouvrir sa fiche.
              </p>
            </div>
          </div>
          <CareerMap
            focusLine={focusLine}
            route={route}
            onOpen={openStation}
            onFocusLine={(l) => {
              setFocusLine(l);
              setRoute(null);
              if (l) setLaneLine(l);
            }}
            laneLine={laneLine}
            onLaneLine={setLaneLine}
            showPass={showPass}
            onTogglePass={() => {
              setShowPass((v) => !v);
              setSpotPass(null);
            }}
            spotPass={spotPass}
            onOpenPasserelle={openPasserelle}
          />
        </section>

        <section id="test" className="e-section" aria-labelledby="t-test">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-test" className="e-title">
                Quelle voie te ressemble ?
              </h2>
              <p className="e-lede">
                Six questions, deux minutes. Le résultat classe les huit voies selon tes goûts d&apos;aujourd&apos;hui.
              </p>
            </div>
            <Quiz
              onShowLine={(l) => showLine(l)}
              onShowParcours={(l) => {
                setTrip(l);
                scrollToId("parcours");
              }}
            />
          </div>
        </section>

        <section id="parcours" className="e-section e-section--fog" aria-labelledby="t-parcours">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-parcours" className="e-title">
                Huit parcours, de la 3e au métier
              </h2>
              <p className="e-lede">
                Pour chaque voie, le chemin le plus solide, étape par étape, avec les choix qui comptent vraiment.
              </p>
            </div>
            <Parcours
              current={trip}
              onSelect={setTrip}
              onShowRoute={(l) => showLine(l, true)}
              onOpenStation={(id, l) => openStation(id, l)}
            />
          </div>
        </section>

        <section id="lycees" className="e-section" aria-labelledby="t-lycees">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-lycees" className="e-title">
                Choisir son lycée
              </h2>
              <p className="e-lede">
                Le lycée prépare le bac et ton dossier : les formations sélectives lisent tes bulletins de 1re et de
                terminale. {lycees.length} lycées à comparer, de l&apos;Ouest à Paris.
              </p>
            </div>
            <Lycees onOpenLycee={openLycee} />
          </div>
        </section>

        <section id="specialites" className="e-section e-section--fog" aria-labelledby="t-spe">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-spe" className="e-title">
                Tes spécialités ouvrent des portes
              </h2>
              <p className="e-lede">
                En 1re, tu suis trois spécialités ; en terminale, tu en gardes deux. Compose ton trio : la liste montre
                ce qu&apos;il ouvre.
              </p>
            </div>
            <Specialites onOpenStation={(id) => openStation(id)} />
          </div>
        </section>

        <section id="ecoles" className="e-section" aria-labelledby="t-ecoles">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-ecoles" className="e-title">
                Après le bac, {ecoles.length} établissements
              </h2>
              <p className="e-lede">
                Prépas, universités, grandes écoles, conservatoires : comment on y entre, combien de temps on y reste,
                ce qu&apos;on y apprend et où cela mène.
              </p>
            </div>
            <Ecoles onOpenEcole={openEcole} />
          </div>
        </section>

        <section id="passerelles" className="e-section e-section--fog" aria-labelledby="t-pass">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-pass" className="e-title">
                Changer de voie en chemin
              </h2>
              <p className="e-lede">
                Les voies se croisent. Les passerelles permettent d&apos;en changer en cours de route ; les doubles
                cursus permettent d&apos;en suivre deux à la fois.
              </p>
            </div>
            <Passerelles onOpenPasserelle={openPasserelle} />
          </div>
        </section>

        <section id="calendrier" className="e-section" aria-labelledby="t-cal">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-cal" className="e-title">
                Ton calendrier, de 2026 à 2035
              </h2>
              <p className="e-lede">
                Les dates à retenir, année après année. Les plus importantes sont marquées d&apos;un point.
              </p>
            </div>
            <Calendrier />
          </div>
        </section>

        <section id="lexique" className="e-section" aria-labelledby="t-lex">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-lex" className="e-title">
                Les mots de l&apos;orientation
              </h2>
              <p className="e-lede">Colle, khâgne, Parcoursup : les termes du voyage, expliqués simplement.</p>
            </div>
            <Lexique query={lexQuery} onQuery={setLexQuery} onOpenStation={(id) => openStation(id)} />
          </div>
        </section>
      </main>

      <Footer />

      {open?.kind === "station" ? (
        <StationSheet
          id={open.id}
          line={open.line}
          onClose={close}
          onNavigate={openStation}
          onOpenEcole={openEcole}
          onOpenPasserelle={openPasserelle}
        />
      ) : null}
      {open?.kind === "passerelle" ? (
        <PasserelleSheet
          id={open.id}
          onClose={close}
          onOpenStation={openStation}
          onOpenPasserelle={openPasserelle}
          onShowOnMap={showPassOnMap}
        />
      ) : null}
      {open?.kind === "ecole" ? (
        <EcoleSheet id={open.id} onClose={close} onOpenEcole={openEcole} onOpenStation={openStation} />
      ) : null}
      {open?.kind === "lycee" ? <LyceeSheet id={open.id} onClose={close} onOpenLycee={openLycee} /> : null}
      {open?.kind === "liste" ? (
        <MyList onClose={close} onLycee={openLycee} onEcole={openEcole} onStation={openStation} />
      ) : null}

      {cmd ? (
        <CommandPalette
          onClose={() => setCmd(false)}
          onStation={openStation}
          onLycee={openLycee}
          onEcole={openEcole}
          onPasserelle={openPasserelle}
          onMot={showMot}
        />
      ) : null}
    </>
  );
}
