"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useLayoutEffect, useMemo, useRef, useState, type KeyboardEvent } from "react";
import { cle } from "@/lib/etudes/communes";
import { enLettres, type LaneId } from "@/lib/etudes/lines";
import { ALT_IDS, METRO_FICHES, type MetroLine } from "@/lib/etudes/metro";
import { FAMILLES, metierById, metiers } from "@/lib/etudes/metiers";
import { passerelleById } from "@/lib/etudes/passerelles";
import { LANES, UNIVERSITY_TRACKS } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { CareerMap } from "../CareerMap";
import { CohortProvider, ClassPicker } from "../cohorte";
import { EcoleSheet, PasserelleSheet } from "../DetailSheets";
import { FormationSheet } from "../FormationSheet";
import { PlaceProvider } from "../place";
import { SelectionProvider } from "../store";
import { BrandMark, Icon } from "../ui";
import { AnnuaireSheet } from "./Annuaire";
import { ComparerSheet } from "./Comparer";
import { MetroFiche } from "./MetroFiche";
import { BottomSheet, StopCard, nomEtape } from "./StopCard";

type Overlay =
  | { kind: "fiche"; id: string; line: LaneId | null; section?: string }
  | { kind: "ecole"; id: string }
  | { kind: "formation"; id: string }
  | { kind: "pass"; id: string }
  | { kind: "annuaire" }
  | { kind: "comparer"; lines?: MetroLine["id"][] };

/**
 * L'étape ouverte, la voie d'où l'on vient, le bouton touché sur la carte, et la façon d'afficher la fiche :
 * posée près de la station, ou montée du bas de l'écran (téléphone, ou liste voie par voie sur écran étroit).
 */
type Sel = { id: string; line: LaneId | null; anchor: HTMLElement | null; sheet: boolean };

const CARD_W = 372;

/** La note du ministère sur l'apprentissage dans le supérieur, situation au 31 décembre 2025. */
const SOURCE_ALTERNANCE =
  "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-10/2026_10_NF_SIES_24_%20Apprentissage%202025.pdf";

/** Les métiers à chercher : la carte trace la route de chacun. */
const METIERS_CARTE = metiers.map((m) => ({ m, key: cle(`${m.name} ${FAMILLES[m.famille]}`) }));

/** Une fiche hors du dessin se pose près de l'étape qui y mène : Mon Master et les licences, près de la licence. */
function ancreDe(id: string): string {
  if (id === "mon-master" || UNIVERSITY_TRACKS[id]) return "universite";
  return id;
}

function useMedia(query: string): boolean {
  const [on, setOn] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia(query);
    const update = () => setOn(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, [query]);
  return on;
}

export function MetroApp() {
  return (
    <CohortProvider>
      <SelectionProvider>
        <PlaceProvider>
          <Metro />
        </PlaceProvider>
      </SelectionProvider>
    </CohortProvider>
  );
}

function Metro() {
  const mobile = useMedia("(max-width: 760px)");
  const [sel, setSel] = useState<Sel | null>(null);
  const [focusLine, setFocusLine] = useState<LaneId | null>(null);
  const [laneLine, setLaneLine] = useState<LaneId>("sciences");
  const [activePass, setActivePass] = useState<string | null>(null);
  const [alternance, setAlternance] = useState(false);
  const [metier, setMetierState] = useState<string | null>(null);
  const [stack, setStack] = useState<Overlay[]>([]);
  const planRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState<{ left: number; top: number } | null>(null);
  const [tick, setTick] = useState(0);

  const push = useCallback((o: Overlay) => setStack((s) => [...s, o]), []);
  const pop = useCallback(() => setStack((s) => s.slice(0, -1)), []);
  const top = stack[stack.length - 1] ?? null;

  const open = useCallback(
    (id: string, line: LaneId | null, anchor?: HTMLElement) => {
      const wrap = planRef.current;
      const liste = Boolean(wrap?.querySelector(".e-lanes"));
      const sheet = mobile || (liste && (wrap?.clientWidth ?? 0) < 1000);
      setSel({ id, line, anchor: anchor ?? null, sheet });
    },
    [mobile],
  );

  const selRef = useRef<Sel | null>(null);
  useEffect(() => {
    selRef.current = sel;
  }, [sel]);
  const close = useCallback(() => {
    // Au clavier, le focus revient à la station d'où la fiche est partie.
    const s = selRef.current;
    if (s?.anchor?.isConnected && cardRef.current?.contains(document.activeElement)) {
      s.anchor.focus({ preventScroll: true });
    }
    setSel(null);
  }, []);

  const toMap = useCallback(() => {
    document.getElementById("carte-plan")?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  const chooseMetier = useCallback((id: string | null) => {
    setMetierState(id);
    setSel(null);
    if (!id) return;
    setFocusLine(null);
    setActivePass(null);
    setLaneLine(metierById[id]?.routes[0]?.lane ?? "u");
  }, []);

  const showPass = useCallback((id: string | null) => {
    setActivePass(id);
    setSel(null);
    if (!id) return;
    setMetierState(null);
    setFocusLine(null);
    const to = passerelleById[id]?.draw?.to;
    if (to) setLaneLine(to);
  }, []);

  const openFiche = useCallback(
    (id: string, line: LaneId | null, section?: string) => {
      setSel(null);
      push({ kind: "fiche", id, line, section });
    },
    [push],
  );

  const openStation = useCallback(
    (id: string, line: LaneId | null) => {
      if (stationById[id] || METRO_FICHES[id]) push({ kind: "fiche", id, line });
    },
    [push],
  );

  // La fiche courte se pose à côté de la station touchée, dans le cadre de la carte.
  useLayoutEffect(() => {
    if (!sel || sel.sheet) {
      setPos(null);
      return;
    }
    const wrap = planRef.current;
    const anchor =
      sel.anchor && wrap?.contains(sel.anchor)
        ? sel.anchor
        : wrap?.querySelector<HTMLElement>(`[data-station="${ancreDe(sel.id)}"]`);
    const card = cardRef.current;
    if (!wrap || !card) return;
    const w = wrap.getBoundingClientRect();
    const h = card.offsetHeight;
    if (!anchor) {
      setPos({ left: Math.max(8, (wrap.clientWidth - CARD_W) / 2), top: Math.max(8, 96 - w.top) });
      return;
    }
    const r = anchor.getBoundingClientRect();
    const right = r.right - w.left + 12;
    // Une ligne de la liste voie par voie occupe toute la largeur : la fiche se range sur sa droite.
    const left = anchor.closest(".e-lanes")
      ? Math.max(8, wrap.clientWidth - CARD_W - 32)
      : right + CARD_W <= wrap.clientWidth - 8
        ? right
        : Math.max(8, r.left - w.left - 12 - CARD_W);
    const top = Math.min(Math.max(8, r.top - w.top - 28), Math.max(8, wrap.offsetHeight - h - 8));
    setPos({ left, top });
  }, [sel, tick]);

  // La fiche ouverte reste en vue, et reçoit le focus pour se lire au clavier.
  useEffect(() => {
    const card = cardRef.current;
    if (!pos || !card) return;
    const r = card.getBoundingClientRect();
    if (r.top < 72 || r.bottom > window.innerHeight) card.scrollIntoView({ block: "nearest", behavior: "smooth" });
    card.focus({ preventScroll: true });
  }, [pos]);

  // La carte change d'échelle avec la fenêtre : la fiche suit sa station.
  useEffect(() => {
    if (!sel || sel.sheet) return;
    const onResize = () => setTick((t) => t + 1);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [sel]);

  // Un clic ailleurs sur la page ou la touche Échap referment la fiche courte.
  useEffect(() => {
    if (!sel || sel.sheet) return;
    const onDown = (e: PointerEvent) => {
      const t = e.target as HTMLElement;
      if (cardRef.current?.contains(t) || t.closest?.("[data-station]")) return;
      setSel(null);
    };
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape" && !stack.length) close();
    };
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [sel, stack.length, close]);

  const card = sel ? (
    <StopCard
      id={sel.id}
      line={sel.line}
      onClose={close}
      onSelect={(id, line) => open(id, line)}
      onFocusLane={(l) => {
        setSel(null);
        setFocusLine(l);
        setLaneLine(l);
        setActivePass(null);
        setMetierState(null);
        if (mobile) window.requestAnimationFrame(toMap);
      }}
      onOpenFiche={openFiche}
      onOpenEcole={(id) => push({ kind: "ecole", id })}
      onCompare={(lines) => {
        setSel(null);
        push({ kind: "comparer", lines });
      }}
    />
  ) : null;

  return (
    <div className="e-metro">
      <header className="e-mbar">
        <Link href="/etudes" className="e-brand e-mbar__brand">
          <BrandMark />
          études
        </Link>
        <div className="e-mbar__class">
          <ClassPicker />
        </div>
        <Link href="/etudes" className="e-btn e-btn--sm e-mbar__full">
          La page complète
        </Link>
      </header>

      <section className="e-mhead">
        <div>
          <h1 className="e-mhead__title">La carte des études</h1>
          <p className="e-mhead__lede">
            Du bas vers le haut&#8239;: le tronc commun jusqu&apos;au bac, puis {enLettres(LANES.length)} voies, chacune
            à sa vraie durée, jusqu&apos;au premier métier. Touche une station&#8239;: ce qu&apos;on y fait, comment y
            entrer, ce que ça coûte.
          </p>
        </div>
        <div className="e-mtools">
          <MetierSearch value={metier} onChange={chooseMetier} />
          <div className="e-mtools__layers" role="group" aria-label="Outils de la carte">
            <button
              type="button"
              className="e-chip e-mlayer"
              data-layer="alt"
              aria-pressed={alternance}
              onClick={() => setAlternance((v) => !v)}
            >
              <Icon name="briefcase" /> Alternance
            </button>
            <button type="button" className="e-chip e-mlayer" onClick={() => push({ kind: "comparer" })}>
              <Icon name="list" /> Comparer les voies
            </button>
            <Link className="e-chip e-mlayer" href="/etudes/bac">
              <Icon name="cap" /> Le bac
            </Link>
            <Link className="e-chip e-mlayer" href="/etudes/parcoursup">
              <Icon name="route" /> Parcoursup
            </Link>
          </div>
        </div>
      </section>

      {alternance ? (
        <div className="e-maltinfo" role="status">
          <p>
            <strong>L&apos;alternance, fin 2025&#8239;:</strong> 44&nbsp;% des étudiants de BTS, 24&nbsp;% des étudiants
            d&apos;IUT, 59&nbsp;% des étudiants de licence professionnelle et 8&nbsp;% des étudiants de master étaient
            apprentis. Sur la carte, les étapes où elle est possible portent un halo orange.
          </p>
          <p className="e-maltinfo__links">
            <button type="button" className="e-link" onClick={() => openFiche("alternance", "courtes")}>
              Salaire, contrat, comment trouver une entreprise
            </button>
            <a href={SOURCE_ALTERNANCE} target="_blank" rel="noopener noreferrer" className="e-maltinfo__src">
              Source&#8239;: ministère de l&apos;Enseignement supérieur, octobre 2026
            </a>
          </p>
        </div>
      ) : null}

      <div className="e-mplan" ref={planRef}>
        <CareerMap
          focusLine={focusLine}
          route={null}
          metier={metier ? metierById[metier] : null}
          onClearMetier={() => chooseMetier(null)}
          onOpen={open}
          onFocusLine={(l) => {
            setFocusLine(l);
            setActivePass(null);
            setMetierState(null);
            if (l) setLaneLine(l);
          }}
          laneLine={laneLine}
          onLaneLine={setLaneLine}
          activePass={activePass}
          onActivePass={showPass}
          onOpenPasserelle={(id) => push({ kind: "pass", id })}
          selected={sel?.id ?? null}
          alt={alternance ? ALT_IDS : null}
        />

        {sel && !sel.sheet && card ? (
          <div
            ref={cardRef}
            className="e-mcard-pop"
            style={pos ? { left: pos.left, top: pos.top } : { left: 0, top: 0, visibility: "hidden" }}
            role="dialog"
            aria-label={nomEtape(sel.id)}
            tabIndex={-1}
          >
            {card}
          </div>
        ) : null}
      </div>

      {sel?.sheet ? (
        <BottomSheet label={nomEtape(sel.id)} onClose={() => setSel(null)}>
          {card}
        </BottomSheet>
      ) : null}

      {top?.kind === "fiche" ? (
        <MetroFiche
          id={top.id}
          line={top.line}
          section={top.section}
          onClose={pop}
          onSelect={(id, line) => setStack((s) => [...s.slice(0, -1), { kind: "fiche", id, line }])}
          onOpenEcole={(id) => push({ kind: "ecole", id })}
          onOpenFormation={(id) => push({ kind: "formation", id })}
          onOpenAnnuaire={() => push({ kind: "annuaire" })}
          onOpenPasserelle={(id) => push({ kind: "pass", id })}
        />
      ) : null}
      {top?.kind === "comparer" ? <ComparerSheet onClose={pop} initial={top.lines} /> : null}
      {top?.kind === "annuaire" ? (
        <AnnuaireSheet onClose={pop} onOpenEcole={(id) => push({ kind: "ecole", id })} />
      ) : null}
      {top?.kind === "ecole" ? (
        <EcoleSheet
          id={top.id}
          onClose={pop}
          onOpenEcole={(id) => setStack((s) => [...s.slice(0, -1), { kind: "ecole", id }])}
          onOpenStation={openStation}
          onOpenFormation={(id) => push({ kind: "formation", id })}
        />
      ) : null}
      {top?.kind === "formation" ? <FormationSheet id={top.id} onClose={pop} /> : null}
      {top?.kind === "pass" ? (
        <PasserelleSheet
          id={top.id}
          onClose={pop}
          onOpenStation={openStation}
          onOpenPasserelle={(id) => setStack((s) => [...s.slice(0, -1), { kind: "pass", id }])}
          onShowOnMap={(id) => {
            setStack([]);
            showPass(id);
            window.requestAnimationFrame(toMap);
          }}
        />
      ) : null}
    </div>
  );
}

/** « Je veux devenir… » : les routes d'un métier s'allument sur la carte. */
function MetierSearch({ value, onChange }: { value: string | null; onChange: (id: string | null) => void }) {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);
  const listId = useId();

  const suggestions = useMemo(() => {
    const k = cle(q);
    if (k.length < 2) return [];
    return METIERS_CARTE.filter((x) => x.key.includes(k))
      .sort((a, b) => Number(!a.key.startsWith(k)) - Number(!b.key.startsWith(k)))
      .slice(0, 7)
      .map((x) => x.m);
  }, [q]);

  function choose(id: string) {
    onChange(id);
    setQ("");
    setOpen(false);
    window.requestAnimationFrame(() =>
      document.getElementById("carte-plan")?.scrollIntoView({ behavior: "smooth", block: "start" }),
    );
  }

  function onKey(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setOpen(true);
      setActive((a) => Math.min(a + 1, Math.max(suggestions.length - 1, 0)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActive((a) => Math.max(a - 1, 0));
    } else if (e.key === "Enter") {
      const x = suggestions[active] ?? suggestions[0];
      if (x) {
        e.preventDefault();
        choose(x.id);
      }
    } else if (e.key === "Escape") {
      if (open) setOpen(false);
      else if (value) onChange(null);
    }
  }

  const expanded = open && suggestions.length > 0;

  return (
    <div className="e-fr__combo e-msearch">
      <label className="e-field">
        <Icon name="search" />
        <span className="e-sr">Je veux devenir</span>
        <input
          type="search"
          role="combobox"
          aria-autocomplete="list"
          aria-expanded={expanded}
          aria-controls={listId}
          aria-activedescendant={expanded ? `${listId}-${active}` : undefined}
          value={q}
          onChange={(e) => {
            setQ(e.target.value);
            setOpen(true);
            setActive(0);
          }}
          onFocus={() => setOpen(true)}
          onBlur={() => setOpen(false)}
          onKeyDown={onKey}
          placeholder="Je veux devenir… médecin, ingénieur"
          autoComplete="off"
        />
      </label>
      <ul id={listId} role="listbox" aria-label="Métiers" className="e-suggest" hidden={!expanded}>
        {suggestions.map((m, i) => (
          <li
            key={m.id}
            id={`${listId}-${i}`}
            role="option"
            aria-selected={i === active}
            onMouseDown={(e) => {
              e.preventDefault();
              choose(m.id);
            }}
            onMouseEnter={() => setActive(i)}
          >
            <span className="e-suggest__name">{m.name}</span>
            <span className="e-suggest__detail">{m.etudes}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
