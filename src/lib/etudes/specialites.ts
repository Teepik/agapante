/**
 * Simulateur « portes ouvertes » : à partir des spécialités choisies, quelles formations
 * restent accessibles ? Les règles résument les attendus publiés par les formations
 * (Parcoursup, Onisep) ; chaque formation examine aussi l'ensemble du dossier.
 */
import type { LineId } from "./lines";
import { etTypo as frTypo } from "./typo";

export type SpeId =
  | "maths"
  | "pc"
  | "svt"
  | "si"
  | "nsi"
  | "ses"
  | "hggsp"
  | "hlp"
  | "llcer"
  | "llca"
  | "arts"
  | "eppcs";

export type Spe = { id: SpeId; name: string; short: string; family: "sciences" | "humanites" | "autres" };

export const specialites: Spe[] = frTypo([
  { id: "maths", name: "Mathématiques", short: "Maths", family: "sciences" },
  { id: "pc", name: "Physique-chimie", short: "Physique-chimie", family: "sciences" },
  { id: "svt", name: "Sciences de la vie et de la Terre", short: "SVT", family: "sciences" },
  { id: "si", name: "Sciences de l'ingénieur", short: "Sciences de l'ingénieur", family: "sciences" },
  { id: "nsi", name: "Numérique et sciences informatiques", short: "NSI (informatique)", family: "sciences" },
  { id: "ses", name: "Sciences économiques et sociales", short: "SES (économie)", family: "humanites" },
  {
    id: "hggsp",
    name: "Histoire-géographie, géopolitique et sciences politiques",
    short: "HGGSP (géopolitique)",
    family: "humanites",
  },
  { id: "hlp", name: "Humanités, littérature et philosophie", short: "HLP (lettres, philo)", family: "humanites" },
  {
    id: "llcer",
    name: "Langues, littératures et cultures étrangères",
    short: "LLCER (langues)",
    family: "humanites",
  },
  {
    id: "llca",
    name: "Littérature, langues et cultures de l'Antiquité",
    short: "LLCA (latin ou grec)",
    family: "humanites",
  },
  { id: "arts", name: "Arts (dont musique)", short: "Arts, musique", family: "autres" },
  { id: "eppcs", name: "Éducation physique, pratiques et culture sportives", short: "Sport (EPPCS)", family: "autres" },
]);

export const speById = Object.fromEntries(specialites.map((s) => [s.id, s])) as Record<SpeId, Spe>;

export type MathsOption = "expertes" | "complementaires" | "aucune";

export type Selection = {
  premiere: SpeId[];
  terminale: SpeId[];
  maths: MathsOption;
  latin: boolean;
  droit: boolean;
};

export type Door = "grande" | "ouverte" | "entrouverte" | "fermee";

export const doorLabel: Record<Door, string> = {
  grande: "Grande ouverte",
  ouverte: "Ouverte",
  entrouverte: "Entrouverte",
  fermee: "Fermée",
};

export type Verdict = { door: Door; why: string };

export type Destination = {
  id: string;
  name: string;
  line: LineId;
  /** Station du plan correspondante, pour ouvrir sa fiche. */
  station?: string;
  judge: (s: Selection) => Verdict;
};

function ctx(s: Selection) {
  const T = new Set(s.terminale);
  const P = new Set(s.premiere);
  const mathsTle = T.has("maths");
  const mathsAny = mathsTle || s.maths === "complementaires";
  const expertes = mathsTle && s.maths === "expertes";
  return { T, P, mathsTle, mathsAny, expertes };
}

const v = (door: Door, why: string): Verdict => frTypo({ door, why });

export const destinations: Destination[] = frTypo([
  {
    id: "mpsi",
    name: "Prépa MPSI ou MP2I (maths, physique, informatique)",
    line: "sciences",
    station: "prepa-scientifique",
    judge: (s) => {
      const { T, mathsTle, expertes } = ctx(s);
      const science = T.has("pc") || T.has("si") || T.has("nsi");
      if (mathsTle && science)
        return expertes
          ? v("grande", "Maths et une science en Terminale, plus maths expertes : exactement le profil attendu.")
          : v("ouverte", "Le bon duo. Ajoute maths expertes : les prépas l'attendent presque toujours.");
      if (mathsTle) return v("entrouverte", "Les maths sont là, mais il manque physique-chimie, SI ou NSI en Terminale.");
      return v("fermee", "Il faut la spécialité maths en Terminale.");
    },
  },
  {
    id: "pcsi",
    name: "Prépa PCSI (physique, chimie)",
    line: "sciences",
    station: "prepa-scientifique",
    judge: (s) => {
      const { T, P, mathsTle, expertes } = ctx(s);
      if (mathsTle && T.has("pc"))
        return expertes
          ? v("grande", "Maths et physique-chimie, avec maths expertes : profil idéal.")
          : v("ouverte", "Maths et physique-chimie : le profil attendu. Maths expertes renforce le dossier.");
      if (mathsTle && P.has("pc"))
        return v("entrouverte", "Physique-chimie arrêtée en Terminale : rattrapage lourd en prépa.");
      return v("fermee", "La PCSI demande maths et physique-chimie en Terminale.");
    },
  },
  {
    id: "bcpst",
    name: "Prépa BCPST (biologie, agro, vétérinaire)",
    line: "sante",
    station: "prepa-scientifique",
    judge: (s) => {
      const { T, P, mathsTle, mathsAny } = ctx(s);
      const sciencesOnly = [...T].every((x) => x === "maths" || x === "pc" || x === "svt");
      if (sciencesOnly && mathsAny && T.has("svt"))
        return v("grande", "SVT avec maths ou physique-chimie, et des maths en Terminale : le profil BCPST.");
      if (sciencesOnly && mathsTle && T.has("pc") && P.has("svt"))
        return v("ouverte", "Maths et physique-chimie, avec des SVT suivies en 1re : accepté.");
      if (mathsAny && (T.has("svt") || T.has("pc")))
        return v("entrouverte", "Possible, mais la BCPST attend deux sciences parmi maths, physique-chimie et SVT.");
      return v("fermee", "Il faut des maths et deux matières scientifiques en Terminale.");
    },
  },
  {
    id: "ing-postbac",
    name: "École d'ingénieurs après le bac (INSA, UT…)",
    line: "sciences",
    station: "ecole-ingenieurs",
    judge: (s) => {
      const { T, mathsTle } = ctx(s);
      if (mathsTle && (T.has("pc") || T.has("si") || T.has("nsi")))
        return v("grande", "Maths et une science de l'ingénieur ou physique-chimie : le profil recherché.");
      if (mathsTle && T.has("svt")) return v("ouverte", "Maths et SVT : accepté dans la plupart de ces écoles.");
      if (mathsTle) return v("entrouverte", "Les maths sont là ; une seconde spécialité scientifique est attendue.");
      return v("fermee", "Ces écoles demandent la spécialité maths en Terminale.");
    },
  },
  {
    id: "sante",
    name: "Licence santé (ex-PASS et LAS) : médecine, pharmacie…",
    line: "sante",
    station: "pass-las",
    judge: (s) => {
      const { T, mathsAny } = ctx(s);
      if (T.has("svt") && T.has("pc")) return v("grande", "SVT et physique-chimie : les bases du bloc santé de la première année.");
      if (T.has("svt") || T.has("pc"))
        return v(
          "ouverte",
          mathsAny ? "Une science et des maths : un bon socle." : "Une science en Terminale : faisable, avec du travail en biologie ou en chimie.",
        );
      return v("entrouverte", "Accessible, mais la biologie et la chimie démarrent très vite : prévois de les travailler avant la rentrée.");
    },
  },
  {
    id: "ecg",
    name: "Prépa ECG (vers HEC, ESSEC, ESCP…)",
    line: "commerce",
    station: "prepa-ecg",
    judge: (s) => {
      const { T, mathsTle } = ctx(s);
      const eco = T.has("ses") || T.has("hggsp");
      if (mathsTle)
        return v(
          "grande",
          eco
            ? "Maths de spécialité et SES ou HGGSP : idéal pour la voie maths approfondies."
            : "Maths de spécialité en Terminale : la voie maths approfondies t'est ouverte.",
        );
      if (s.maths === "complementaires")
        return v("ouverte", "Avec maths complémentaires, tu vises la voie maths appliquées.");
      return v("fermee", "La prépa ECG demande des maths en Terminale.");
    },
  },
  {
    id: "dauphine",
    name: "Université Paris Dauphine-PSL (économie, gestion)",
    line: "commerce",
    station: "u-eco",
    judge: (s) => {
      const { mathsTle } = ctx(s);
      if (mathsTle) return v("grande", "Maths de spécialité en Terminale : le premier critère de Dauphine.");
      if (s.maths === "complementaires") return v("entrouverte", "Maths complémentaires : possible dans certaines licences, plus difficile.");
      return v("fermee", "Les licences de Dauphine demandent un vrai bagage en maths.");
    },
  },
  {
    id: "scpo",
    name: "Sciences Po et les IEP",
    line: "scpo",
    station: "sciences-po",
    judge: (s) => {
      const { T } = ctx(s);
      if (T.has("hggsp") || T.has("ses"))
        return v("grande", "HGGSP ou SES nourrissent directement ce que l'on attend : histoire, actualité, économie.");
      return v("ouverte", "Tous les profils sont admis ; la culture générale et l'écrit font la différence.");
    },
  },
  {
    id: "droit",
    name: "Licence de droit et doubles licences",
    line: "scpo",
    station: "u-droit",
    judge: (s) => {
      const { T } = ctx(s);
      if (T.has("hggsp") || T.has("ses") || T.has("hlp") || s.droit)
        return v("grande", "Un profil qui argumente et écrit : exactement ce que le droit demande.");
      return v("ouverte", "Le droit accueille tous les profils ; les doubles licences regardent surtout l'excellence du dossier.");
    },
  },
  {
    id: "al",
    name: "Hypokhâgne A/L (lettres)",
    line: "lettres",
    station: "khagne",
    judge: (s) => {
      const { T } = ctx(s);
      if (T.has("hlp") || T.has("llcer") || T.has("llca") || T.has("hggsp"))
        return v("grande", "Lettres, langues, Antiquité ou histoire : tu arrives avec les bons outils.");
      return v("ouverte", "Tous les profils sont acceptés si tu lis beaucoup et écris bien.");
    },
  },
  {
    id: "bl",
    name: "Prépa B/L (lettres et sciences sociales)",
    line: "lettres",
    station: "khagne",
    judge: (s) => {
      const { T, mathsAny } = ctx(s);
      if (mathsAny && T.has("ses")) return v("grande", "Des maths et SES : le duo rare que recherche la B/L.");
      if (mathsAny) return v("ouverte", "Des maths en Terminale : indispensable en B/L.");
      return v("fermee", "La B/L demande des maths en Terminale (spécialité ou complémentaires).");
    },
  },
  {
    id: "chartes",
    name: "Prépa Chartes (histoire, patrimoine)",
    line: "lettres",
    station: "khagne",
    judge: (s) => {
      const { T, P } = ctx(s);
      if (T.has("llca") || s.latin) return v("grande", "Latin au lycée : l'atout décisif pour l'École des chartes.");
      if (P.has("llca")) return v("ouverte", "Latin suivi en 1re : garde-le en option en Terminale.");
      return v("entrouverte", "Le latin pèse lourd au concours : commence-le dès le lycée.");
    },
  },
  {
    id: "cnsmd",
    name: "Conservatoire supérieur de musique (CNSMD)",
    line: "arts",
    station: "concours-cnsmd",
    judge: (s) => {
      const { T } = ctx(s);
      if (T.has("arts")) return v("grande", "La spécialité musique t'appuie ; le concours juge ton niveau d'interprète.");
      return v("ouverte", "Le concours se joue sur ton niveau musical, quelle que soit ta spécialité.");
    },
  },
  {
    id: "archi",
    name: "École nationale supérieure d'architecture",
    line: "arts",
    station: "pole-superieur",
    judge: (s) => {
      const { T, mathsTle } = ctx(s);
      if (T.has("arts") || mathsTle)
        return v("grande", "Arts ou maths : les deux pieds de l'architecte, entre création et structure.");
      return v("ouverte", "Tous les profils sont admis ; le dossier et la culture visuelle comptent.");
    },
  },
  {
    id: "epfl",
    name: "Universités scientifiques à l'étranger (EPFL, ETH, Imperial…)",
    line: "monde",
    station: "bachelor-etranger",
    judge: (s) => {
      const { T, mathsTle, expertes } = ctx(s);
      const science = T.has("pc") || T.has("si") || T.has("nsi");
      if (mathsTle && science)
        return expertes
          ? v("grande", "Maths, une science et maths expertes, avec une excellente moyenne : le profil attendu.")
          : v("ouverte", "Bon profil ; maths expertes est souvent exigée ou très conseillée.");
      if (mathsTle) return v("entrouverte", "Une seconde spécialité scientifique est en général demandée.");
      return v("fermee", "Ces universités demandent la spécialité maths en Terminale.");
    },
  },
]);

/** Profils prêts à essayer. */
export const presets: { id: string; label: string; sel: Selection }[] = frTypo([
  {
    id: "sci",
    label: "Scientifique",
    sel: { premiere: ["maths", "pc", "svt"], terminale: ["maths", "pc"], maths: "expertes", latin: false, droit: false },
  },
  {
    id: "num",
    label: "Ingénieur numérique",
    sel: { premiere: ["maths", "pc", "nsi"], terminale: ["maths", "nsi"], maths: "expertes", latin: false, droit: false },
  },
  {
    id: "eco",
    label: "Économie",
    sel: { premiere: ["maths", "ses", "hggsp"], terminale: ["maths", "ses"], maths: "aucune", latin: false, droit: false },
  },
  {
    id: "sante",
    label: "Santé",
    sel: {
      premiere: ["maths", "pc", "svt"],
      terminale: ["pc", "svt"],
      maths: "complementaires",
      latin: false,
      droit: false,
    },
  },
  {
    id: "scpo",
    label: "Sciences Po",
    sel: { premiere: ["hggsp", "ses", "llcer"], terminale: ["hggsp", "ses"], maths: "aucune", latin: false, droit: true },
  },
  {
    id: "lettres",
    label: "Lettres",
    sel: { premiere: ["hlp", "llca", "hggsp"], terminale: ["hlp", "llca"], maths: "aucune", latin: true, droit: false },
  },
]);
