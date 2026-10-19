"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import { ecoles } from "@/lib/etudes/ecoles";
import { lexique } from "@/lib/etudes/lexique";
import { laneName, type LaneId } from "@/lib/etudes/lines";
import { lycees, statutLabel } from "@/lib/etudes/lycees";
import { FAMILLES, metiers } from "@/lib/etudes/metiers";
import { passerelles } from "@/lib/etudes/passerelles";
import { UNIVERSITY_TRACKS, placed } from "@/lib/etudes/plan";
import { stationById } from "@/lib/etudes/stations";
import { norm } from "./Lycees";
import { useCohort } from "./cohorte";
import { SECTIONS } from "./TopNav";
import { Icon, type IconName } from "./ui";

type Group = "Sections" | "Métiers" | "Étapes" | "Lycées" | "Établissements" | "Passerelles" | "Mots";
const GROUPS: Group[] = ["Sections", "Métiers", "Étapes", "Lycées", "Établissements", "Passerelles", "Mots"];

/** Les guides pas à pas, avec les mots qui y mènent. */
const GUIDES: { href: string; name: string; hint: string; mots: string }[] = [
  {
    href: "/etudes/bac",
    name: "Le bac, pas à pas",
    hint: "Les voies, les spécialités, la note, les épreuves, les résultats",
    mots: "bac baccalaureat voie generale technologique professionnelle bac pro cap specialites options coefficients controle continu note moyenne epreuves anticipees francais maths philosophie grand oral mention oral de controle rattrapage redoublement candidat libre hors contrat cned amenagements tiers temps stmg sti2d stl st2s std2a sthr s2tmd stav",
  },
  {
    href: "/etudes/parcoursup",
    name: "Parcoursup, pas à pas",
    hint: "Le calendrier, les vœux, le dossier, les réponses et quoi faire",
    mots: "parcoursup voeux sous-voeux dossier fiche avenir lettre de motivation reponses oui en attente non amenagement oui-si classement phase complementaire caes inscription cvec bourse dossier social etudiant mobilite cesure",
  },
];

/** Des mots qui mènent aussi aux sections : « bourse » ouvre les coûts, « Parcoursup » les formations. */
const MOTS_CLES: Record<string, string> = {
  couts:
    "budget argent prix frais inscription cvec bourse aides crous loyer logement apl visale salaire apprenti etranger erasmus",
  ecoles: "formations parcoursup taux d'acces admission bts but licence prepa ecole",
  lycees: "lycee pres de chez moi internat resultats bac",
  calendrier: "dates echeances agenda",
  projet: "imprimer plan b agenda",
};

type Item = {
  key: string;
  group: Group;
  name: string;
  hint: string;
  icon: IconName;
  hay: string;
  run: () => void;
};

export function CommandPalette({
  onClose,
  onStation,
  onLycee,
  onEcole,
  onPasserelle,
  onMot,
  onMetier,
}: {
  onClose: () => void;
  onMetier: (id: string) => void;
  onStation: (id: string, line: LaneId | null) => void;
  onLycee: (id: string) => void;
  onEcole: (id: string) => void;
  onPasserelle: (id: string) => void;
  onMot: (term: string) => void;
}) {
  const [q, setQ] = useState("");
  const [sel, setSel] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const returnTo = useRef<HTMLElement | null>(null);

  useEffect(() => {
    returnTo.current = document.activeElement as HTMLElement | null;
    document.documentElement.classList.add("e-lock");
    inputRef.current?.focus();
    return () => {
      document.documentElement.classList.remove("e-lock");
      returnTo.current?.focus?.({ preventScroll: true });
    };
  }, []);

  const { y } = useCohort();
  const router = useRouter();
  const items = useMemo<Item[]>(() => {
    const out: Item[] = [];
    for (const g of GUIDES) {
      out.push({
        key: `g-${g.href}`,
        group: "Sections",
        name: g.name,
        hint: g.hint,
        icon: "book",
        hay: norm(`${g.name} ${g.mots}`),
        run: () => router.push(g.href),
      });
    }
    for (const s of SECTIONS) {
      out.push({
        key: `s-${s.id}`,
        group: "Sections",
        name: s.label,
        hint: "Aller à la section",
        icon: "arrow-down",
        hay: norm(`${s.label} ${MOTS_CLES[s.id] ?? ""}`),
        run: () => document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" }),
      });
    }
    const steps: { id: string; line: LaneId | null; where: string }[] = [
      ...placed.map((p) => ({
        id: p.id,
        line: p.line ?? null,
        where: p.line ? laneName(p.line) : "Tronc commun",
      })),
      ...Object.entries(UNIVERSITY_TRACKS).map(([id, l]) => ({
        id,
        line: "u" as const,
        where: `Université, ${laneName(l)}`,
      })),
    ];
    for (const p of steps) {
      const st = stationById[p.id];
      if (!st) continue;
      out.push({
        key: `st-${p.id}`,
        group: "Étapes",
        name: st.name,
        hint: `${p.where}, ${y(st.when)}`,
        icon: "station",
        hay: norm(`${st.name} ${st.label} ${st.sub ?? ""} ${p.where}`),
        run: () => onStation(p.id, p.line),
      });
    }
    for (const m of metiers) {
      out.push({
        key: `me-${m.id}`,
        group: "Métiers",
        name: m.name,
        hint: `${FAMILLES[m.famille]}, ${m.etudes}`,
        icon: "briefcase",
        hay: norm(`${m.name} ${FAMILLES[m.famille]}`),
        run: () => onMetier(m.id),
      });
    }
    for (const l of lycees) {
      out.push({
        key: `ly-${l.id}`,
        group: "Lycées",
        name: l.name,
        hint: `${l.ville}, ${statutLabel[l.statut].toLowerCase()}`,
        icon: "school",
        hay: norm(`${l.name} ${l.short ?? ""} ${l.ville} ${l.departement} ${l.tutelle ?? ""}`),
        run: () => onLycee(l.id),
      });
    }
    for (const e of ecoles) {
      out.push({
        key: `ec-${e.id}`,
        group: "Établissements",
        name: e.name,
        hint: `${e.ville}, ${e.kind}`,
        icon: "cap",
        hay: norm(`${e.name} ${e.short ?? ""} ${e.ville} ${e.kind}`),
        run: () => onEcole(e.id),
      });
    }
    for (const x of passerelles) {
      out.push({
        key: `pa-${x.id}`,
        group: "Passerelles",
        name: x.title,
        hint: x.when,
        icon: "route",
        hay: norm(`${x.title} ${x.fromLabel} passerelle`),
        run: () => onPasserelle(x.id),
      });
    }
    for (const m of lexique) {
      out.push({
        key: `mo-${m.term}`,
        group: "Mots",
        name: m.term,
        hint: m.def,
        icon: "book",
        hay: norm(m.term),
        run: () => onMot(m.term),
      });
    }
    return out;
  }, [onStation, onLycee, onEcole, onPasserelle, onMot, onMetier, y, router]);

  const results = useMemo(() => {
    const nq = norm(q.trim());
    if (!nq) return items.filter((i) => i.group === "Sections");
    const tokens = nq.split(/\s+/);
    const scored = items
      .filter((i) => tokens.every((t) => i.hay.includes(t)))
      .map((i) => {
        const n = norm(i.name);
        return { i, s: n.startsWith(nq) ? 0 : n.includes(nq) ? 1 : 2 };
      });
    return GROUPS.flatMap((g) =>
      scored
        .filter((x) => x.i.group === g)
        .sort((a, b) => a.s - b.s)
        .slice(0, g === "Sections" ? 3 : 6)
        .map((x) => x.i),
    );
  }, [q, items]);

  useEffect(() => setSel(0), [q]);

  useEffect(() => {
    listRef.current?.querySelector<HTMLElement>(`[data-index="${sel}"]`)?.scrollIntoView({ block: "nearest" });
  }, [sel]);

  function pick(i: Item) {
    onClose();
    window.setTimeout(() => i.run(), 0);
  }

  function onKey(e: React.KeyboardEvent) {
    if (e.key === "Escape") {
      e.preventDefault();
      onClose();
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      setSel((s) => Math.min(results.length - 1, s + 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setSel((s) => Math.max(0, s - 1));
    } else if (e.key === "Enter" && results[sel]) {
      e.preventDefault();
      pick(results[sel]);
    }
  }

  let lastGroup: Group | null = null;

  return (
    <div className="e-cmd-layer" onKeyDown={onKey}>
      <div className="e-cmd-backdrop" onClick={onClose} aria-hidden="true" />
      <div className="e-cmd" role="dialog" aria-modal="true" aria-label="Rechercher dans la page">
        <div className="e-cmd__field">
          <Icon name="search" />
          <input
            ref={inputRef}
            type="text"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Une étape, un lycée, une école, un mot…"
            role="combobox"
            aria-expanded="true"
            aria-controls="e-cmd-list"
            aria-activedescendant={results[sel] ? `e-cmd-${results[sel].key}` : undefined}
            autoComplete="off"
            spellCheck={false}
          />
          <span className="e-kbd">Échap</span>
        </div>
        <div className="e-cmd__list" id="e-cmd-list" role="listbox" ref={listRef} aria-label="Résultats">
          {results.length ? (
            results.map((r, idx) => {
              const head = r.group !== lastGroup;
              lastGroup = r.group;
              return (
                <div key={r.key} role="presentation">
                  {head ? (
                    <p className="e-cmd__group" role="presentation">
                      {q.trim() ? r.group : "Aller à"}
                    </p>
                  ) : null}
                  <div
                    id={`e-cmd-${r.key}`}
                    role="option"
                    aria-selected={idx === sel}
                    data-index={idx}
                    className="e-cmd__item"
                    onMouseMove={() => setSel(idx)}
                    onClick={() => pick(r)}
                  >
                    <Icon name={r.icon} />
                    <span>
                      <span className="e-cmd__name">{r.name}</span>
                      <span className="e-cmd__hint">{r.hint}</span>
                    </span>
                    {idx === sel ? <Icon name="chevron-right" /> : <span />}
                  </div>
                </div>
              );
            })
          ) : (
            <p className="e-cmd__empty">Essaie un autre mot : un nom d&apos;école, une ville, une matière.</p>
          )}
        </div>
        <div className="e-cmd__foot" aria-hidden="true">
          <span>
            <span className="e-kbd">↑</span>
            <span className="e-kbd">↓</span> pour choisir
          </span>
          <span>
            <span className="e-kbd">Entrée</span> pour ouvrir
          </span>
        </div>
      </div>
    </div>
  );
}
