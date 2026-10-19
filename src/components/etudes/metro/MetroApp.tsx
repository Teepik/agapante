"use client";

import Link from "next/link";
import { useCallback, useEffect, useId, useMemo, useState, type KeyboardEvent } from "react";
import { cle } from "@/lib/etudes/communes";
import { METRO_LINES, etapesDuTrajet, stopById, type MetroLineId } from "@/lib/etudes/metro";
import { FAMILLES, metierById, metiers } from "@/lib/etudes/metiers";
import { CohortProvider, ClassPicker, useCohort } from "../cohorte";
import { EcoleSheet, PasserelleSheet } from "../DetailSheets";
import { FormationSheet } from "../FormationSheet";
import { PlaceProvider } from "../place";
import { SelectionProvider } from "../store";
import { BrandMark, Dot, Icon } from "../ui";
import { MetroDesktop } from "./MetroDesktop";
import { MetroFiche } from "./MetroFiche";
import { MetroMobile } from "./MetroMobile";
import { BottomSheet, StopCard } from "./StopCard";

type Overlay =
  | { kind: "fiche"; id: string; section?: string }
  | { kind: "ecole"; id: string }
  | { kind: "formation"; id: string }
  | { kind: "pass"; id: string };

/** Les métiers que la carte sait tracer : au moins un trajet entièrement sur ses lignes. */
const METIERS_CARTE = metiers
  .map((m) => ({ m, routes: m.routes.filter((r) => etapesDuTrajet(r.via).length === r.via.length) }))
  .filter((x) => x.routes.length)
  .map((x) => ({ ...x, key: cle(`${x.m.name} ${FAMILLES[x.m.famille]}`) }));

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
  const { classe, bac, ici } = useCohort();
  const mobile = useMedia("(max-width: 760px)");
  const [sel, setSel] = useState<string | null>(null);
  const [focus, setFocus] = useState<MetroLineId | null>(null);
  const [alternance, setAlternance] = useState(false);
  const [passerelles, setPasserelles] = useState(false);
  const [metier, setMetier] = useState<string | null>(null);
  const [stack, setStack] = useState<Overlay[]>([]);

  const here = classe === "4e" ? "4e" : ici;
  const year = useCallback((t: number) => bac - 4 + Math.floor(t), [bac]);

  const route = useMemo(() => {
    if (!metier) return null;
    const found = METIERS_CARTE.find((x) => x.m.id === metier);
    if (!found) return null;
    const ids = new Set<string>(["college", "seconde", "premiere-terminale", "bac"]);
    for (const r of found.routes) for (const id of etapesDuTrajet(r.via)) ids.add(id);
    return ids;
  }, [metier]);

  const routeCount = metier ? (METIERS_CARTE.find((x) => x.m.id === metier)?.routes.length ?? 0) : 0;

  const push = useCallback((o: Overlay) => setStack((s) => [...s, o]), []);
  const pop = useCallback(() => setStack((s) => s.slice(0, -1)), []);
  const top = stack[stack.length - 1] ?? null;

  const select = useCallback((id: string | null) => {
    setSel(id);
    const s = id ? stopById[id] : null;
    if (s && s.line !== "tronc") setFocus((f) => (f === null ? null : s.line));
  }, []);

  const openFiche = useCallback(
    (id: string, section?: string) => {
      setSel(null);
      push({ kind: "fiche", id, section });
    },
    [push],
  );

  const card = sel ? (
    <StopCard
      id={sel}
      onClose={() => setSel(null)}
      onSelect={(id) => select(id)}
      onFocus={(line) => {
        setFocus(line);
        setSel(null);
        if (mobile) window.requestAnimationFrame(() => document.getElementById("m-mob-lines")?.scrollIntoView());
      }}
      onOpenFiche={openFiche}
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
            Touche une station : ce qu&apos;on y fait, comment y entrer, ce que ça coûte, et où elle mène.
          </p>
        </div>
        <div className="e-mtools">
          <MetierSearch value={metier} onChange={setMetier} />
          <div className="e-mtools__layers" role="group" aria-label="Calques">
            <button
              type="button"
              className="e-chip e-mlayer"
              data-layer="alt"
              aria-pressed={alternance}
              onClick={() => setAlternance((v) => !v)}
            >
              <Icon name="briefcase" /> Alternance
            </button>
            <button
              type="button"
              className="e-chip e-mlayer"
              data-layer="pass"
              aria-pressed={passerelles}
              onClick={() => setPasserelles((v) => !v)}
            >
              <Icon name="route" /> Passerelles
            </button>
          </div>
        </div>
      </section>

      {metier && metierById[metier] ? (
        <p className="e-mroute" role="status">
          <span>
            <strong>{metierById[metier].name}</strong> :{" "}
            {routeCount > 1 ? `${routeCount} trajets sur cette carte` : "son trajet sur cette carte"}
          </span>
          <button type="button" className="e-link" onClick={() => setMetier(null)}>
            Effacer
          </button>
        </p>
      ) : null}

      <div className="e-mstage">
        {mobile ? (
          <MetroMobile
            sel={sel}
            onSelect={select}
            line={focus}
            onLine={setFocus}
            route={route}
            ici={here}
            year={year}
          />
        ) : (
          <>
            <MetroDesktop
              sel={sel}
              onSelect={select}
              focus={focus}
              onFocus={setFocus}
              alternance={alternance}
              passerelles={passerelles}
              onOpenPass={(id) => push({ kind: "pass", id })}
              route={route}
              ici={here}
              year={year}
              card={card}
            />
            <ul className="e-mlegend">
              {METRO_LINES.map((l) => (
                <li key={l.id}>
                  <button
                    type="button"
                    className="e-chip"
                    data-line={l.lane}
                    aria-pressed={focus === l.id}
                    onClick={() => setFocus(focus === l.id ? null : l.id)}
                  >
                    <Dot line={l.lane} /> {l.name}
                  </button>
                </li>
              ))}
              {alternance ? <li className="e-mlegend__key is-alt">Alternance possible</li> : null}
              {passerelles ? (
                <li className="e-mlegend__key is-pass">Passerelle : touche-la pour l&apos;ouvrir</li>
              ) : null}
            </ul>
          </>
        )}
      </div>

      {mobile && sel ? (
        <BottomSheet label={stopById[sel]?.label ?? "Étape"} onClose={() => setSel(null)}>
          {card}
        </BottomSheet>
      ) : null}

      {top?.kind === "fiche" ? (
        <MetroFiche
          id={top.id}
          section={top.section}
          onClose={pop}
          onSelect={(id) => setStack((s) => [...s.slice(0, -1), { kind: "fiche", id }])}
          onOpenEcole={(id) => push({ kind: "ecole", id })}
          onOpenFormation={(id) => push({ kind: "formation", id })}
        />
      ) : null}
      {top?.kind === "ecole" ? (
        <EcoleSheet
          id={top.id}
          onClose={pop}
          onOpenEcole={(id) => setStack((s) => [...s.slice(0, -1), { kind: "ecole", id }])}
          onOpenStation={(id) => (stopById[id] ? push({ kind: "fiche", id }) : undefined)}
          onOpenFormation={(id) => push({ kind: "formation", id })}
        />
      ) : null}
      {top?.kind === "formation" ? <FormationSheet id={top.id} onClose={pop} /> : null}
      {top?.kind === "pass" ? (
        <PasserelleSheet
          id={top.id}
          onClose={pop}
          onOpenStation={(id) => (stopById[id] ? push({ kind: "fiche", id }) : undefined)}
          onOpenPasserelle={(id) => setStack((s) => [...s.slice(0, -1), { kind: "pass", id }])}
          onShowOnMap={() => {
            setStack([]);
            setPasserelles(true);
          }}
        />
      ) : null}
    </div>
  );
}

/** « Je veux devenir… » : le trajet d'un métier s'allume sur la carte. */
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
          placeholder="Je veux devenir… ingénieur, technicien, chercheur"
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
