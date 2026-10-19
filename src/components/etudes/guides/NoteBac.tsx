"use client";

import { useId, useMemo, useState } from "react";
import { etTypo } from "@/lib/etudes/typo";

type Voie = "generale" | "techno";

type Ligne = {
  id: string;
  label: string;
  coef: number;
  quand: string;
  /** Contrôle continu (bulletins de 1re et de Terminale) ou épreuve finale. */
  part: "cc" | "ef";
};

/** Les coefficients de la session 2027 et des suivantes, sur 100 (arrêté du 16 juillet 2018 modifié). */
const LIGNES: Record<Voie, Ligne[]> = etTypo({
  generale: [
    { id: "hg", label: "Histoire-géographie", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "lva", label: "Langue vivante A", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "lvb", label: "Langue vivante B", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "es", label: "Enseignement scientifique", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "eps", label: "Éducation physique et sportive", coef: 6, quand: "Terminale", part: "cc" },
    { id: "spe1re", label: "La spécialité arrêtée en fin de 1re", coef: 8, quand: "1re", part: "cc" },
    { id: "emc", label: "Enseignement moral et civique", coef: 2, quand: "1re et Terminale", part: "cc" },
    { id: "fre", label: "Français, écrit", coef: 5, quand: "Fin de 1re", part: "ef" },
    { id: "fro", label: "Français, oral", coef: 5, quand: "Fin de 1re", part: "ef" },
    { id: "maths", label: "Mathématiques, épreuve anticipée", coef: 2, quand: "Fin de 1re", part: "ef" },
    { id: "philo", label: "Philosophie", coef: 8, quand: "Juin de Terminale", part: "ef" },
    { id: "spe1", label: "Première spécialité de Terminale", coef: 16, quand: "Juin de Terminale", part: "ef" },
    { id: "spe2", label: "Deuxième spécialité de Terminale", coef: 16, quand: "Juin de Terminale", part: "ef" },
    { id: "go", label: "Grand oral", coef: 8, quand: "Juin de Terminale", part: "ef" },
  ],
  techno: [
    { id: "hg", label: "Histoire-géographie", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "lva", label: "Langue vivante A", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "lvb", label: "Langue vivante B", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "m", label: "Mathématiques", coef: 6, quand: "1re et Terminale", part: "cc" },
    { id: "eps", label: "Éducation physique et sportive", coef: 6, quand: "Terminale", part: "cc" },
    { id: "spe1re", label: "La spécialité arrêtée en fin de 1re", coef: 8, quand: "1re", part: "cc" },
    { id: "emc", label: "Enseignement moral et civique", coef: 2, quand: "1re et Terminale", part: "cc" },
    { id: "fre", label: "Français, écrit", coef: 5, quand: "Fin de 1re", part: "ef" },
    { id: "fro", label: "Français, oral", coef: 5, quand: "Fin de 1re", part: "ef" },
    { id: "maths", label: "Mathématiques, épreuve anticipée", coef: 2, quand: "Fin de 1re", part: "ef" },
    { id: "philo", label: "Philosophie", coef: 4, quand: "Juin de Terminale", part: "ef" },
    { id: "spe1", label: "Première spécialité de Terminale", coef: 16, quand: "Juin de Terminale", part: "ef" },
    { id: "spe2", label: "Deuxième spécialité de Terminale", coef: 16, quand: "Juin de Terminale", part: "ef" },
    { id: "go", label: "Grand oral", coef: 12, quand: "Juin de Terminale", part: "ef" },
  ],
});

/**
 * Les options s'ajoutent aux 100 coefficients : 4 pour une option suivie en 1re et en Terminale, 2 pour une option
 * de Terminale. Chaque note compte, quelle qu'elle soit.
 */
const OPTIONS: Record<Voie, { id: string; label: string; coef: number }[]> = etTypo({
  generale: [
    { id: "opt4", label: "Une option suivie en 1re et en Terminale : langue vivante C, arts, EPS…", coef: 4 },
    { id: "latin", label: "Le latin, en plus, en 1re et en Terminale", coef: 4 },
    { id: "grec", label: "Le grec, en plus, en 1re et en Terminale", coef: 4 },
    {
      id: "opt2",
      label: "Une option de Terminale : maths complémentaires, maths expertes, ou droit et grands enjeux",
      coef: 2,
    },
  ],
  techno: [
    { id: "opt4", label: "Une option suivie en 1re et en Terminale : langue vivante C, arts, EPS…", coef: 4 },
    { id: "opt4b", label: "Une deuxième option, en 1re et en Terminale", coef: 4 },
    { id: "latin", label: "Le latin, en plus, en 1re et en Terminale", coef: 4 },
    { id: "grec", label: "Le grec, en plus, en 1re et en Terminale", coef: 4 },
    { id: "opt2", label: "Une option de Terminale : droit et grands enjeux du monde contemporain", coef: 2 },
  ],
});

const fr = (n: number, d = 1) => n.toLocaleString("fr-FR", { minimumFractionDigits: d, maximumFractionDigits: d });

function verdict(m: number): { titre: string; texte: string } {
  return etTypo(verdictBrut(m));
}

function verdictBrut(m: number): { titre: string; texte: string } {
  if (m >= 18)
    return { titre: "Admis, mention très bien avec les félicitations du jury", texte: "À partir de 18 sur 20." };
  if (m >= 16) return { titre: "Admis, mention très bien", texte: "De 16 à moins de 18 sur 20." };
  if (m >= 14) return { titre: "Admis, mention bien", texte: "De 14 à moins de 16 sur 20." };
  if (m >= 12) return { titre: "Admis, mention assez bien", texte: "De 12 à moins de 14 sur 20." };
  if (m >= 10) return { titre: "Admis", texte: "À partir de 10 sur 20." };
  if (m >= 8)
    return {
      titre: "Oral de contrôle",
      texte:
        "Entre 8 et 10 : deux oraux, dans deux matières passées à l'écrit que tu choisis (français, maths, philosophie, spécialités). Le jury garde la meilleure note de chacune.",
    };
  return {
    titre: "Le bac se repasse l'année suivante",
    texte:
      "Sous 8 : tu peux garder tes notes d'épreuves d'au moins 10 et, si tu redoubles ta Terminale, tes moyennes de 1re.",
  };
}

/** Ce que pèse chaque note du bac, et une moyenne à essayer avec ses propres notes. */
export function NoteBac() {
  const uid = useId();
  const [voie, setVoie] = useState<Voie>("generale");
  const [notes, setNotes] = useState<Record<string, string>>({});
  const [opts, setOpts] = useState<Record<string, boolean>>({});
  const lignes = LIGNES[voie];

  const calc = useMemo(() => {
    let somme = 0;
    let coefs = 0;
    let vides = 0;
    const all = [
      ...lignes,
      ...OPTIONS[voie].filter((o) => opts[o.id]).map((o) => ({ ...o, part: "cc" as const, quand: "" })),
    ];
    for (const l of all) {
      const raw = notes[l.id];
      const v = raw === undefined || raw === "" ? NaN : Number(raw.replace(",", "."));
      if (Number.isFinite(v) && v >= 0 && v <= 20) {
        somme += v * l.coef;
        coefs += l.coef;
      } else vides += 1;
    }
    return { moyenne: coefs ? somme / coefs : null, vides, remplis: coefs, total: all.reduce((a, l) => a + l.coef, 0) };
  }, [lignes, notes, opts, voie]);

  const cc = lignes.filter((l) => l.part === "cc");
  const ef = lignes.filter((l) => l.part === "ef");
  const v = calc.moyenne !== null && calc.vides === 0 ? verdict(calc.moyenne) : null;

  return (
    <div className="e-nbac">
      <div className="e-nbac__head">
        <h3 className="e-nbac__title">Ce que pèse chaque note</h3>
        <div className="e-seg" role="radiogroup" aria-label="Voie du bac">
          <button type="button" role="radio" aria-checked={voie === "generale"} onClick={() => setVoie("generale")}>
            Voie générale
          </button>
          <button type="button" role="radio" aria-checked={voie === "techno"} onClick={() => setVoie("techno")}>
            Voie technologique
          </button>
        </div>
      </div>

      <div
        className="e-nbac__bar"
        role="img"
        aria-label={"Sur 100 coefficients\u202f: 40 pour le contrôle continu, 60 pour les épreuves finales"}
      >
        {[...cc, ...ef].map((l) => (
          <span
            key={l.id}
            className={`e-nbac__seg is-${l.part}`}
            style={{ flexGrow: l.coef }}
            title={`${l.label}\u202f: coefficient ${l.coef}`}
          >
            <span className="e-nbac__segcoef">{l.coef}</span>
          </span>
        ))}
      </div>
      <div className="e-nbac__parts">
        <p>
          <span className="e-nbac__key is-cc" aria-hidden="true" />
          <strong>40 % contrôle continu</strong>, tes moyennes de 1re et de Terminale
        </p>
        <p>
          <span className="e-nbac__key is-ef" aria-hidden="true" />
          <strong>60 % épreuves finales</strong>, en fin de 1re et en juin de Terminale
        </p>
      </div>

      <p className="e-nbac__try">
        Essaie avec tes notes, ou celles que tu vises&#8239;: la moyenne se calcule au fil des cases, le résultat
        s&apos;affiche quand tout est rempli.
      </p>
      <div className="e-nbac__cols">
        {[
          { titre: "Contrôle continu", list: cc },
          { titre: "Épreuves finales", list: ef },
        ].map((g) => (
          <fieldset key={g.titre} className="e-nbac__group">
            <legend>{g.titre}</legend>
            {g.list.map((l) => (
              <label key={l.id} className="e-nbac__row" htmlFor={`${uid}-${l.id}`}>
                <span className="e-nbac__label">
                  {l.label}
                  <span className="e-nbac__meta">
                    coefficient {l.coef}, {l.quand.charAt(0).toLowerCase() + l.quand.slice(1)}
                  </span>
                </span>
                <input
                  id={`${uid}-${l.id}`}
                  type="number"
                  inputMode="decimal"
                  min={0}
                  max={20}
                  step={0.5}
                  placeholder="/20"
                  value={notes[l.id] ?? ""}
                  onChange={(e) => setNotes((n) => ({ ...n, [l.id]: e.target.value }))}
                />
              </label>
            ))}
          </fieldset>
        ))}
      </div>

      <fieldset className="e-nbac__group e-nbac__opts">
        <legend>Options, en plus des 100 coefficients</legend>
        {OPTIONS[voie].map((o) => (
          <div key={o.id} className="e-nbac__row">
            <label className="e-nbac__check">
              <input
                type="checkbox"
                checked={Boolean(opts[o.id])}
                onChange={(e) => setOpts((x) => ({ ...x, [o.id]: e.target.checked }))}
              />
              <span className="e-nbac__label">
                {o.label}
                <span className="e-nbac__meta">coefficient {o.coef}</span>
              </span>
            </label>
            {opts[o.id] ? (
              <input
                aria-label={`Note de l'option\u202f: ${o.label}`}
                type="number"
                inputMode="decimal"
                min={0}
                max={20}
                step={0.5}
                placeholder="/20"
                value={notes[o.id] ?? ""}
                onChange={(e) => setNotes((n) => ({ ...n, [o.id]: e.target.value }))}
              />
            ) : null}
          </div>
        ))}
      </fieldset>

      <div className="e-nbac__result" aria-live="polite">
        {v && calc.moyenne !== null ? (
          <>
            <p className="e-nbac__avg">
              {fr(calc.moyenne, 2)}
              <span> sur 20, sur {calc.total} coefficients</span>
            </p>
            <p className="e-nbac__verdict">{v.titre}</p>
            <p className="e-small e-muted">{v.texte}</p>
          </>
        ) : calc.moyenne !== null ? (
          <>
            <p className="e-nbac__avg">
              {fr(calc.moyenne, 2)}
              <span>
                {" "}
                sur 20, moyenne provisoire ({calc.remplis} coefficients remplis sur {calc.total})
              </span>
            </p>
            <p className="e-small e-muted">
              {calc.vides > 1
                ? `Encore ${calc.vides} notes, et le résultat s'affiche.`
                : "Encore une note, et le résultat s'affiche."}
            </p>
          </>
        ) : (
          <p className="e-small e-muted">Ta moyenne s&apos;affiche dès ta première note.</p>
        )}
      </div>
    </div>
  );
}
