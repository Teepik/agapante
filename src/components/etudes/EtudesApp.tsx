"use client";

import { useCallback, useEffect, useState } from "react";
import { enLettres, type LaneId, type LineId } from "@/lib/etudes/lines";
import { LANES } from "@/lib/etudes/plan";
import { passerelleById } from "@/lib/etudes/passerelles";
import { ecoles } from "@/lib/etudes/ecoles";
import { CareerMap } from "./CareerMap";
import { CohortProvider, useCohort } from "./cohorte";
import { CommandPalette } from "./CommandPalette";
import { CompareSheet } from "./Compare";
import { EcoleSheet, LyceeSheet, PasserelleSheet } from "./DetailSheets";
import { Ecoles } from "./Ecoles";
import { FormationSheet } from "./FormationSheet";
import { FormationsFrance } from "./FormationsFrance";
import { Hero } from "./Hero";
import { Lycees } from "./Lycees";
import { MyList } from "./MyList";
import { Parcours } from "./Parcours";
import { Passerelles } from "./Passerelles";
import { PlaceProvider } from "./place";
import { Projet } from "./Projet";
import { Quiz } from "./Quiz";
import { Calendrier, Footer, Lexique } from "./Reperes";
import { Specialites } from "./Specialites";
import { StationSheet } from "./StationSheet";
import { SelectionProvider, useSelection } from "./store";
import { TopNav } from "./TopNav";
import { readParam, writeParam } from "./url";

type Open =
  | { kind: "station"; id: string; line: LaneId | null }
  | { kind: "passerelle"; id: string }
  | { kind: "ecole"; id: string }
  | { kind: "lycee"; id: string }
  | { kind: "formation"; id: string }
  | { kind: "liste" }
  | { kind: "compare"; what: "lycee" | "ecole" | "formation"; ids: string[] }
  | null;

function scrollToId(id: string) {
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function EtudesApp() {
  return (
    <CohortProvider>
      <SelectionProvider>
        <PlaceProvider>
          <App />
        </PlaceProvider>
      </SelectionProvider>
    </CohortProvider>
  );
}

function App() {
  const { saved } = useSelection();
  const { bac, debut } = useCohort();
  const [open, setOpen] = useState<Open>(null);
  const [cmd, setCmd] = useState(false);
  const [focusLine, setFocusLine] = useState<LaneId | null>(null);
  const [route, setRoute] = useState<LaneId | null>(null);
  const [laneLine, setLaneLine] = useState<LaneId>("sciences");
  const [activePass, setActivePass] = useState<string | null>(null);
  const [trip, setTrip] = useState<LineId>("sciences");
  const [lexQuery, setLexQuery] = useState("");

  // Lecture hors ligne et installation sur le téléphone (en production seulement).
  useEffect(() => {
    if (process.env.NODE_ENV !== "production" || !("serviceWorker" in navigator)) return;
    navigator.serviceWorker.register("/etudes-sw.js", { scope: "/etudes" }).catch(() => {
      /* sans service worker, la page fonctionne en ligne */
    });
  }, []);

  // L'adresse garde la voie et la passerelle affichées : un lien partagé rouvre la même carte.
  useEffect(() => {
    const voie = readParam("voie");
    const pass = readParam("passerelle");
    if (pass && passerelleById[pass]) {
      setActivePass(pass);
      const to = passerelleById[pass].draw?.to;
      if (to) setLaneLine(to);
    } else if (voie && (LANES as string[]).includes(voie)) {
      setFocusLine(voie as LaneId);
      setLaneLine(voie as LaneId);
    }
  }, []);
  useEffect(() => writeParam("voie", activePass ? null : (route ?? focusLine)), [focusLine, route, activePass]);
  useEffect(() => writeParam("passerelle", activePass), [activePass]);

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

  const openStation = useCallback((id: string, line: LaneId | null = null) => {
    setOpen({ kind: "station", id, line });
  }, []);
  const openPasserelle = useCallback((id: string) => setOpen({ kind: "passerelle", id }), []);
  const openEcole = useCallback((id: string) => setOpen({ kind: "ecole", id }), []);
  const openLycee = useCallback((id: string) => setOpen({ kind: "lycee", id }), []);
  const openFormation = useCallback((id: string) => setOpen({ kind: "formation", id }), []);
  const close = useCallback(() => setOpen(null), []);

  const showLine = useCallback((line: LaneId, asRoute = false) => {
    setFocusLine(line);
    setRoute(asRoute ? line : null);
    setLaneLine(line);
    setActivePass(null);
    scrollToId("carte-plan");
  }, []);

  const showPass = useCallback((id: string | null) => {
    setActivePass(id);
    if (!id) return;
    setFocusLine(null);
    setRoute(null);
    const to = passerelleById[id]?.draw?.to;
    if (to) setLaneLine(to);
  }, []);

  const showPassOnMap = useCallback(
    (id: string) => {
      setOpen(null);
      showPass(id);
      scrollToId("carte-plan");
    },
    [showPass],
  );

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

      <div className="e-page">
        <Hero />

        <section id="carte" className="e-section e-section--fog e-map-section" aria-labelledby="t-carte">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-carte" className="e-title">
                La carte des études
              </h2>
              <p className="e-lede">
                Du bas vers le haut : le tronc commun jusqu&apos;au bac, puis {enLettres(LANES.length)} voies, chacune à
                sa vraie durée, jusqu&apos;au premier métier. Touche une étape pour ouvrir sa fiche.
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
              setActivePass(null);
              if (l) setLaneLine(l);
            }}
            laneLine={laneLine}
            onLaneLine={setLaneLine}
            activePass={activePass}
            onActivePass={showPass}
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
                Six questions, deux minutes. Le résultat classe les voies selon tes goûts d&apos;aujourd&apos;hui.
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
                Les parcours, de la 3e au métier
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
                terminale. Cherche les lycées autour de chez toi, partout en France, et compare-les.
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
                En 1re, tu suis trois spécialités ; en terminale, tu en gardes deux. Compose ton trio pour voir ce
                qu&apos;il ouvre, ou pars de la formation que tu vises.
              </p>
            </div>
            <Specialites onOpenStation={(id) => openStation(id)} />
          </div>
        </section>

        <section id="ecoles" className="e-section" aria-labelledby="t-ecoles">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-ecoles" className="e-title">
                Les études après le bac
              </h2>
              <p className="e-lede">
                Toutes les formations de Parcoursup autour de chez toi, avec leurs vrais chiffres d&apos;admission, et{" "}
                {ecoles.length} prépas, universités, grandes écoles et conservatoires expliqués en détail.
              </p>
            </div>
            <div className="e-block" id="formations-france">
              <div className="e-block__head">
                <div>
                  <h3 className="e-h3">Les formations près de chez toi</h3>
                  <p className="e-sub">
                    Places, candidats, taux d&apos;accès, mentions et bacs des admis : les chiffres officiels de
                    Parcoursup.
                  </p>
                </div>
              </div>
              <FormationsFrance onOpenFormation={openFormation} />
            </div>
            <div className="e-block">
              <div className="e-block__head">
                <div>
                  <h3 className="e-h3">Les établissements en détail</h3>
                  <p className="e-sub">
                    Comment on y entre, combien de temps on y reste, ce qu&apos;on y apprend et où cela mène.
                  </p>
                </div>
              </div>
              <Ecoles onOpenEcole={openEcole} />
            </div>
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
                Ton calendrier, de {Math.max(debut, bac - 4)} à {bac + 5}
              </h2>
              <p className="e-lede">
                Les dates à retenir, année après année. Les plus importantes sont marquées d&apos;un point.
              </p>
            </div>
            <Calendrier />
          </div>
        </section>

        <section id="projet" className="e-section e-section--fog" aria-labelledby="t-projet">
          <div className="e-wrap">
            <div className="e-head">
              <h2 id="t-projet" className="e-title">
                Ton projet, sur une page
              </h2>
              <p className="e-lede">
                Choisis une à trois voies : la page en tire tes spécialités, tes étapes, tes échéances et un plan B, à
                garder dans ton agenda et à imprimer pour en parler en famille.
              </p>
            </div>
            <Projet
              onShowLine={(l) => showLine(l)}
              onOpenPasserelle={openPasserelle}
              onOpenLycee={openLycee}
              onOpenFormation={openFormation}
            />
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
      </div>

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
        <EcoleSheet
          id={open.id}
          onClose={close}
          onOpenEcole={openEcole}
          onOpenStation={openStation}
          onOpenFormation={openFormation}
        />
      ) : null}
      {open?.kind === "lycee" ? <LyceeSheet id={open.id} onClose={close} onOpenLycee={openLycee} /> : null}
      {open?.kind === "formation" ? <FormationSheet id={open.id} onClose={close} /> : null}
      {open?.kind === "liste" ? (
        <MyList
          onClose={close}
          onLycee={openLycee}
          onEcole={openEcole}
          onStation={openStation}
          onFormation={openFormation}
          onCompare={(what, ids) => setOpen({ kind: "compare", what, ids })}
        />
      ) : null}

      {open?.kind === "compare" ? (
        <CompareSheet
          what={open.what}
          ids={open.ids}
          onClose={() => setOpen({ kind: "liste" })}
          onOpen={(id) =>
            open.what === "lycee" ? openLycee(id) : open.what === "ecole" ? openEcole(id) : openFormation(id)
          }
        />
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
