"use client";

import { useId, useMemo, useState, type ReactNode } from "react";
import {
  AILLEURS,
  ANNEE,
  APPRENTI,
  APPRENTI_SANS_COTISATIONS,
  CROUS,
  CVEC,
  DISTANCES,
  ECHELONS,
  ETRANGER,
  FORMATIONS,
  MERITE,
  SRC,
  VILLES,
  echelon,
  environ,
  euros,
  formationCoutById,
  plafondBourse,
  pointsDeCharge,
  salaireApprenti,
  villeDe,
  type Famille,
  type Source,
} from "@/lib/etudes/couts";
import { etTypo } from "@/lib/etudes/typo";
import { usePlace } from "./place";
import { Dot, Icon } from "./ui";

type Logement = "parents" | "crous" | "location";
type Range = [number, number];

const LOGEMENTS: { id: Logement; label: string }[] = [
  { id: "parents", label: "Chez tes parents" },
  { id: "crous", label: "En résidence Crous" },
  { id: "location", label: "En location" },
];

const ANNEES_CONTRAT = ["1re année", "2e année", "3e année"];

const r = (x: number | Range): Range => (typeof x === "number" ? [x, x] : x);
const mul = (a: Range, k: number): Range => [a[0] * k, a[1] * k];
const neg = (a: Range): Range => [-a[1], -a[0]];

/** Une estimation arrondie : « ≈ 1 030 € » ou « 1 900 à 2 500 € ». */
function montant(x: Range): string {
  const [a, b] = [environ(x[0]), environ(x[1])];
  if (a === b) return `≈\u00a0${euros(a)}`;
  return `${Math.round(a).toLocaleString("fr-FR")} à ${euros(b)}`;
}

/** Un montant exact, à l'euro : « 283 € » ou « 9 250 à 12 790 € ». */
function exact(x: Range): string {
  const [a, b] = [Math.round(x[0]), Math.round(x[1])];
  return a === b ? euros(a) : `${a.toLocaleString("fr-FR")} à ${euros(b)}`;
}

function lireNombre(s: string): number | null {
  const digits = s.replace(/[^\d]/g, "");
  return digits ? Number(digits) : null;
}

function Stepper({
  value,
  min,
  max,
  onChange,
  label,
  unit,
}: {
  value: number;
  min: number;
  max: number;
  onChange: (n: number) => void;
  label: string;
  unit: (n: number) => string;
}) {
  return (
    <div className="e-stepper" role="group" aria-label={label}>
      <button
        type="button"
        className="e-iconbtn"
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`${label} : un de moins`}
      >
        <Icon name="minus" />
      </button>
      <output aria-live="polite">{unit(value)}</output>
      <button
        type="button"
        className="e-iconbtn"
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`${label} : un de plus`}
      >
        <Icon name="plus" />
      </button>
    </div>
  );
}

function Seg<T extends string | number>({
  options,
  value,
  onChange,
  label,
}: {
  options: { id: T; label: string }[];
  value: T;
  onChange: (v: T) => void;
  label: string;
}) {
  return (
    <div className="e-seg e-seg--wrap" role="group" aria-label={label}>
      {options.map((o) => (
        <button key={o.id} type="button" aria-pressed={value === o.id} onClick={() => onChange(o.id)}>
          {o.label}
        </button>
      ))}
    </div>
  );
}

function Switch({ on, onChange, children }: { on: boolean; onChange: (v: boolean) => void; children: ReactNode }) {
  return (
    <button type="button" role="switch" aria-checked={on} className="e-switch" onClick={() => onChange(!on)}>
      <span className="e-switch__track" aria-hidden="true" />
      <span>{children}</span>
    </button>
  );
}

/** Un champ de montant en euros, saisi au clavier numérique. */
function Montant({
  label,
  hint,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  hint: ReactNode;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  const id = useId();
  return (
    <div className="e-cost__money">
      <label className="e-fgroup__k" htmlFor={id}>
        {label}
      </label>
      <span className="e-field">
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          aria-describedby={`${id}-h`}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        <span className="e-cost__unit" aria-hidden="true">
          €
        </span>
      </span>
      <span className="e-small e-muted" id={`${id}-h`}>
        {hint}
      </span>
    </div>
  );
}

export function Liens({ sources }: { sources: Source[] }) {
  const uniques = sources.filter((s, i, a) => a.findIndex((x) => x.url === s.url) === i);
  return (
    <>
      {uniques.map((s, i) => (
        <span key={s.url}>
          {i ? " ; " : ""}
          <a className="e-link" href={s.url} target="_blank" rel="noopener noreferrer">
            {s.label}
          </a>
        </span>
      ))}
    </>
  );
}

/** « Combien coûtent tes études ? » : frais, logement, vie courante, et ce que les aides en couvrent. */
export function Couts() {
  const { place } = usePlace();
  const ids = useId();
  const [formId, setFormId] = useState("licence");
  const f = formationCoutById[formId] ?? FORMATIONS[0];
  const [annees, setAnnees] = useState(f.annees);
  const [fraisEcole, setFraisEcole] = useState("");
  const [logement, setLogement] = useState<Logement>("location");
  const [villeChoisie, setVille] = useState<string | null>(null);
  const [revenu, setRevenu] = useState("");
  const [fam, setFam] = useState<Famille>({ distance: 0, autres: 0, etudiants: 0, handicap: false, aidant: false });
  const [tb, setTb] = useState(false);
  const [age, setAge] = useState(1);
  const [contrat, setContrat] = useState(0);

  // La ville de « Ta ville » sert de point de départ, si le classement la connaît.
  const ville = useMemo(() => {
    if (villeChoisie) return VILLES.find((v) => v.name === villeChoisie) ?? AILLEURS;
    return (place?.kind === "commune" ? villeDe(place.name, place.lat) : null) ?? AILLEURS;
  }, [villeChoisie, place]);

  function choisir(id: string) {
    setFormId(id);
    setAnnees(formationCoutById[id]?.annees ?? 3);
    setFraisEcole("");
  }

  const calc = useMemo(() => {
    const rev = lireNombre(revenu);
    const points = pointsDeCharge(fam);
    const ech = rev === null ? null : echelon(rev, points);
    const alternance = Boolean(f.alternance);
    const boursier = ech !== null && !alternance;
    const mois = alternance ? 12 : 10;

    // Les frais : ceux de l'école saisis à la main, sinon ceux du barème.
    const saisis = f.prive ? lireNombre(fraisEcole) : null;
    const fraisAn: Range =
      saisis !== null
        ? [saisis + (boursier ? 0 : CVEC), saisis + (boursier ? 0 : CVEC)]
        : r(boursier ? f.boursier : f.frais);
    const fraisMois = mul(fraisAn, 1 / mois);
    const loyer = logement === "parents" ? 0 : logement === "crous" ? CROUS.moyen : ville.loyer;
    const vie = logement === "parents" ? 0 : ville.vie;
    const bourse = boursier && ech !== null ? ECHELONS[ech].annuel / 10 : 0;
    const merite = boursier && tb ? MERITE / 10 : 0;
    const salaire = alternance ? salaireApprenti(age, contrat) : 0;

    const couts: Range = [fraisMois[0] + loyer + vie, fraisMois[1] + loyer + vie];
    const aides = bourse + merite + salaire;
    const reste: Range = [couts[0] - aides, couts[1] - aides];
    return {
      rev,
      points,
      ech,
      boursier,
      alternance,
      mois,
      saisis,
      fraisAn,
      fraisMois,
      loyer,
      vie,
      bourse,
      merite,
      salaire,
      couts,
      aides,
      reste,
    };
  }, [revenu, fam, f, fraisEcole, logement, ville, tb, age, contrat]);

  const { reste, couts, aides } = calc;
  const gagne = reste[1] < 0;
  const part = couts[1] > 0 ? Math.min(1, aides / couts[1]) : aides > 0 ? 1 : 0;
  const an = mul(reste, calc.mois);
  const parents = logement === "parents";

  return (
    <div className="e-cost">
      <div className="e-cost__form">
        <fieldset className="e-sim__step">
          <legend>
            Tes études <span>frais de {ANNEE}</span>
          </legend>
          <div className="e-sim__chips" role="group" aria-label="Tes études">
            {FORMATIONS.map((x) => (
              <button
                key={x.id}
                type="button"
                className="e-chip"
                data-line={x.lane}
                aria-pressed={x.id === f.id}
                onClick={() => choisir(x.id)}
              >
                <Dot line={x.lane} />
                {x.name}
              </button>
            ))}
          </div>
          <p className="e-cost__detail">{f.detail}</p>
          {f.prive ? (
            <div className="e-cost__more">
              <Montant
                label="Les frais de ton école, par an"
                placeholder={`Par exemple ${(r(f.frais)[0] - CVEC).toLocaleString("fr-FR")}`}
                value={fraisEcole}
                onChange={setFraisEcole}
                hint="Le site de chaque école les donne, avec ses réductions pour les boursiers."
              />
            </div>
          ) : null}
          <div className="e-cost__inline">
            <span className="e-fgroup__k">Durée</span>
            <Stepper
              value={annees}
              min={1}
              max={11}
              onChange={setAnnees}
              label="Durée des études"
              unit={(n) => (n > 1 ? `${n} ans` : "1 an")}
            />
          </div>
        </fieldset>

        {calc.alternance ? (
          <fieldset className="e-sim__step">
            <legend>Ton contrat d&apos;apprenti</legend>
            <div className="e-cost__stack">
              <div>
                <span className="e-fgroup__k">Ton âge</span>
                <Seg
                  label="Ton âge"
                  value={age}
                  onChange={setAge}
                  options={APPRENTI.map((a, i) => ({ id: i, label: a.label }))}
                />
              </div>
              <div>
                <span className="e-fgroup__k">Année du contrat</span>
                <Seg
                  label="Année du contrat"
                  value={contrat}
                  onChange={setContrat}
                  options={ANNEES_CONTRAT.map((label, i) => ({ id: i, label }))}
                />
              </div>
              <p className="e-small e-muted">
                Pendant le contrat, la bourse s&apos;arrête et le salaire prend le relais : au moins{" "}
                {APPRENTI[age].pct[contrat]} % du SMIC.{" "}
                <a className="e-link" href={SRC.apprenti.url} target="_blank" rel="noopener noreferrer">
                  La grille officielle
                </a>
                .
              </p>
            </div>
          </fieldset>
        ) : null}

        <fieldset className="e-sim__step">
          <legend>Où tu vivras</legend>
          <div className="e-cost__stack">
            <Seg label="Où tu vivras" value={logement} onChange={setLogement} options={LOGEMENTS} />
            {parents ? (
              <p className="e-small e-muted">
                Transports, repas à 1 € au restaurant universitaire, téléphone : ces dépenses se voient en famille.
              </p>
            ) : (
              <label className="e-cost__select">
                <span className="e-fgroup__k">Ville d&apos;études</span>
                <span className="e-select">
                  <select value={ville.name} onChange={(e) => setVille(e.target.value)}>
                    {VILLES.map((v) => (
                      <option key={v.name} value={v.name}>
                        {v.name}
                      </option>
                    ))}
                    <option value={AILLEURS.name}>{AILLEURS.name}</option>
                  </select>
                  <Icon name="chevron-down" />
                </span>
              </label>
            )}
          </div>
        </fieldset>

        {calc.alternance ? null : (
          <fieldset className="e-sim__step">
            <legend>
              Ta bourse <span>une estimation</span>
            </legend>
            <div className="e-cost__stack">
              <Montant
                label="Revenu brut global de tes parents"
                placeholder="Par exemple 32 000"
                value={revenu}
                onChange={setRevenu}
                hint="La ligne « revenu brut global » de leur avis d'imposition. Le calcul reste sur ton appareil."
              />

              <div className="e-cost__pair">
                <div>
                  <span className="e-fgroup__k">Frères et sœurs à charge</span>
                  <Stepper
                    value={fam.autres}
                    min={0}
                    max={8}
                    onChange={(n) => setFam((x) => ({ ...x, autres: n, etudiants: Math.min(x.etudiants, n) }))}
                    label="Frères et sœurs à charge"
                    unit={(n) => String(n)}
                  />
                </div>
                <div>
                  <span className="e-fgroup__k">Dont étudiants</span>
                  <Stepper
                    value={fam.etudiants}
                    min={0}
                    max={fam.autres}
                    onChange={(n) => setFam((x) => ({ ...x, etudiants: n }))}
                    label="Frères et sœurs étudiants"
                    unit={(n) => String(n)}
                  />
                </div>
              </div>

              <div>
                <span className="e-fgroup__k">Entre ta famille et ton lieu d&apos;études</span>
                <Seg
                  label="Distance entre ta famille et ton lieu d'études"
                  value={fam.distance}
                  onChange={(n) => setFam((x) => ({ ...x, distance: n }))}
                  options={DISTANCES.map((d) => ({ id: d.points, label: d.label }))}
                />
              </div>

              <div className="e-cost__switches">
                <Switch on={fam.handicap} onChange={(v) => setFam((x) => ({ ...x, handicap: v }))}>
                  Handicap reconnu
                </Switch>
                <Switch on={fam.aidant} onChange={(v) => setFam((x) => ({ ...x, aidant: v }))}>
                  Aidant d&apos;un proche
                </Switch>
              </div>

              <p className="e-cost__verdict" aria-live="polite">
                {calc.rev === null ? (
                  <>
                    Entre un revenu pour estimer ta bourse : de {euros(ECHELONS[0].annuel)} à{" "}
                    {euros(ECHELONS[ECHELONS.length - 1].annuel)} par an selon l&apos;échelon.
                  </>
                ) : calc.ech !== null ? (
                  <>
                    <strong>Échelon {ECHELONS[calc.ech].id}</strong> : {euros(ECHELONS[calc.ech].annuel)} par an, versés
                    en dix fois, avec les droits d&apos;inscription et la CVEC offerts dans le public.
                  </>
                ) : (
                  <>
                    <strong>Au-dessus des plafonds</strong> : avec {calc.points} point
                    {calc.points > 1 ? "s" : ""} de charge, la bourse s&apos;arrête à{" "}
                    {euros(plafondBourse(calc.points))}. Le repas à 1 €, l&apos;aide au logement et la caution Visale
                    restent ouverts à tous.
                  </>
                )}
              </p>
              {calc.boursier ? (
                <Switch on={tb} onChange={setTb}>
                  Mention très bien au bac : {euros(MERITE)} de plus par an
                </Switch>
              ) : null}
              <p className="e-small e-muted">
                {calc.points} point{calc.points > 1 ? "s" : ""} de charge, barème {ANNEE}.{" "}
                <a className="e-link" href={SRC.simulateur.url} target="_blank" rel="noopener noreferrer">
                  Le simulateur officiel
                </a>{" "}
                donne le montant exact.
              </p>
            </div>
          </fieldset>
        )}
      </div>

      <div className="e-cost__sum" role="region" aria-labelledby={`${ids}-sum`}>
        <p className="e-cost__k" id={`${ids}-sum`}>
          {gagne ? "Ce qu'il te reste, chaque mois" : "Ce qui reste à payer, chaque mois"}
        </p>
        <p className="e-cost__big">{montant(gagne ? neg(reste) : reste)}</p>
        <p className="e-cost__sub">
          {aides > 0
            ? `${calc.alternance ? "Salaire compris" : "Aides comprises"}, sur ${calc.mois} mois`
            : `Sur ${calc.mois} mois d'études`}
          {parents ? ", hors dépenses de la vie de famille" : ""}
        </p>

        {aides > 0 ? (
          <>
            <div className="e-cost__bar" aria-hidden="true">
              <span className="e-cost__bar-aid" style={{ width: `${part * 100}%` }} />
            </div>
            <ul className="e-stack__legend e-cost__legend">
              <li>
                <i className="is-aid" aria-hidden="true" />
                {calc.alternance ? "Payé par ton salaire" : "Payé par les aides"}{" "}
                <strong>{Math.round(part * 100)} %</strong>
              </li>
              <li>
                <i aria-hidden="true" />
                Reste à payer <strong>{100 - Math.round(part * 100)} %</strong>
              </li>
            </ul>
          </>
        ) : null}

        <dl className="e-cost__lines">
          <div>
            <dt>
              Frais d&apos;études
              <span>
                {calc.fraisAn[1] > 0
                  ? `${exact(calc.fraisAn)} par an, répartis sur ${calc.mois} mois`
                  : calc.boursier && r(f.frais)[1] > 0
                    ? "Offerts aux boursiers"
                    : "Gratuits"}
              </span>
            </dt>
            <dd>{exact(calc.fraisMois)}</dd>
          </div>
          <div>
            <dt>
              Loyer
              <span>
                {parents
                  ? "Chez tes parents"
                  : logement === "crous"
                    ? `Résidence Crous, de ${CROUS.min} à ${euros(CROUS.max)} selon la chambre`
                    : ville === AILLEURS
                      ? "Moyenne en France, parc privé"
                      : `Moyenne à ${ville.name}, parc privé`}
              </span>
            </dt>
            <dd>{euros(calc.loyer)}</dd>
          </div>
          <div>
            <dt>
              Vie courante
              <span>{parents ? "Partagée avec ta famille" : "Repas, transports, téléphone, assurance, loisirs"}</span>
            </dt>
            <dd>{parents ? "–" : montant([calc.vie, calc.vie])}</dd>
          </div>
          {calc.bourse ? (
            <div className="is-aid">
              <dt>
                Bourse
                <span>Échelon {calc.ech !== null ? ECHELONS[calc.ech].id : ""}, sur dix mois</span>
              </dt>
              <dd>−&#8239;{euros(calc.bourse)}</dd>
            </div>
          ) : null}
          {calc.merite ? (
            <div className="is-aid">
              <dt>
                Aide au mérite<span>Mention très bien au bac</span>
              </dt>
              <dd>−&#8239;{euros(calc.merite)}</dd>
            </div>
          ) : null}
          {calc.salaire ? (
            <div className="is-aid">
              <dt>
                Salaire d&apos;apprenti
                <span>
                  Brut minimum, {APPRENTI[age].label.toLowerCase()}, {ANNEES_CONTRAT[contrat]}
                </span>
              </dt>
              <dd>−&#8239;{euros(calc.salaire)}</dd>
            </div>
          ) : null}
        </dl>

        <dl className="e-cost__totals">
          <div>
            <dt>{gagne ? "Il te reste, sur l'année" : "Sur l'année"}</dt>
            <dd>{montant(gagne ? neg(an) : an)}</dd>
          </div>
          <div>
            <dt>{annees > 1 ? `Sur ${annees} ans` : "Sur 1 an"}</dt>
            <dd>{montant(mul(gagne ? neg(an) : an, annees))}</dd>
          </div>
        </dl>

        <p className="e-small e-muted e-cost__how">
          {calc.alternance
            ? `Douze mois de contrat, congés payés compris. Jusqu'à ${euros(APPRENTI_SANS_COTISATIONS)} brut, le salaire net égale le brut. `
            : "Dix mois d'études par an ; en location, le loyer court souvent aussi l'été. "}
          L&apos;aide au logement peut alléger encore le loyer :{" "}
          <a className="e-link" href={SRC.aplSimulateur.url} target="_blank" rel="noopener noreferrer">
            simule-la
          </a>
          .
        </p>
      </div>
    </div>
  );
}

const AIDES: { montant: string; name: string; texte: string; source: Source }[] = etTypo([
  {
    montant: `${euros(ECHELONS[0].annuel)} à ${euros(ECHELONS[ECHELONS.length - 1].annuel)} par an`,
    name: "La bourse sur critères sociaux",
    texte:
      "Selon les revenus et les charges de ta famille, versée en dix mois. Elle dispense des droits d'inscription et de la CVEC dans le public. Le dossier social étudiant se remplit au printemps de l'année du bac : du 1er mars au 31 mai en 2026.",
    source: SRC.bourse,
  },
  {
    montant: `${euros(MERITE)} par an`,
    name: "L'aide au mérite",
    texte: "Pour un boursier reçu au bac avec la mention très bien. Le Crous la verse de lui-même, dix mois par an.",
    source: SRC.merite,
  },
  {
    montant: euros(500),
    name: "L'aide à la mobilité Parcoursup",
    texte:
      "Pour un lycéen boursier qui accepte une formation hors de son académie. La demande s'ouvre à la mi-juillet, une fois la place acceptée.",
    source: SRC.mobilitePsup,
  },
  {
    montant: euros(1),
    name: "Le repas au restaurant universitaire",
    texte: "Pour tous les étudiants depuis mai 2026, apprentis compris, midi et soir, avec un compte Izly.",
    source: SRC.repas,
  },
  {
    montant: "Selon ton loyer",
    name: "L'aide au logement",
    texte:
      "La Caf la calcule d'après ton loyer, ta ville et tes ressources, en résidence comme dans le privé. Simule-la avant de signer un bail.",
    source: SRC.apl,
  },
  {
    montant: euros(0),
    name: "La caution Visale",
    texte:
      "Action Logement se porte garant de ton loyer, gratuitement, jusqu'à 30 ans. La demande se fait sur visale.fr, avant la signature du bail.",
    source: SRC.visale,
  },
  {
    montant: `10 à ${euros(100)} par mois`,
    name: "L'aide Mobili-Jeune",
    texte:
      "Pour un alternant de moins de 30 ans, dans une entreprise privée : Action Logement paie une part du loyer, jusqu'à 1 100 € par an, en plus de l'aide de la Caf.",
    source: SRC.mobiliJeune,
  },
  {
    montant: `${euros(400)} par mois`,
    name: "L'aide à la mobilité internationale",
    texte:
      "Pour un boursier qui part étudier ou faire un stage à l'étranger, d'un à dix mois en tout. Elle s'ajoute à la bourse et à celle d'Erasmus+.",
    source: SRC.mobiliteInter,
  },
]);

/** Les aides à connaître, chacune avec son montant et sa source. */
export function Aides() {
  return (
    <ul className="e-aides">
      {AIDES.map((a) => (
        <li key={a.name} className="e-aide">
          <p className="e-aide__amount">{a.montant}</p>
          <div>
            <h4 className="e-aide__name">{a.name}</h4>
            <p className="e-aide__text">{a.texte}</p>
            <p className="e-small">
              <Liens sources={[a.source]} />
            </p>
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Étudier à l'étranger : des frais réels, d'une université à l'autre. */
export function Etranger() {
  return (
    <>
      <ul className="e-aides e-aides--abroad">
        {ETRANGER.map((e) => (
          <li key={e.ecole} className="e-aide">
            <p className="e-aide__amount">{e.frais}</p>
            <div>
              <h4 className="e-aide__name">
                {e.ecole}
                <span className="e-aide__pays">{e.pays}</span>
              </h4>
              <p className="e-aide__text">{e.texte}</p>
              <p className="e-small">
                <Liens sources={[e.source]} />
              </p>
            </div>
          </li>
        ))}
      </ul>
      <p className="e-note e-cost__abroad">
        <strong>Avec Erasmus+</strong>
        Un semestre ou une année dans une université européenne partenaire : l&apos;inscription se paie dans ton
        université d&apos;origine, la bourse sur critères sociaux continue, et l&apos;aide à la mobilité internationale
        s&apos;y ajoute.{" "}
        <a className="e-link" href={SRC.erasmus.url} target="_blank" rel="noopener noreferrer">
          Les règles d&apos;Erasmus+
        </a>
        .
      </p>
    </>
  );
}
