/**
 * « Mon projet » : les rappels datés du lycée au premier vœu.
 * Les dates sont indicatives (elles bougent un peu chaque année) ; elles s'écrivent par rapport
 * à l'année du bac : y = -3 pour l'année civile du brevet, y = 0 pour celle du bac.
 */
import type { LaneId } from "./lines";
import { etTypo as frTypo } from "./typo";

export type Rappel = {
  id: string;
  y: number;
  m: number;
  d: number;
  title: string;
  detail: string;
  /** Réservé à certaines voies. */
  lanes?: LaneId[];
};

export const rappels: Rappel[] = frTypo([
  {
    id: "lycee-defense",
    y: -3,
    m: 1,
    d: 7,
    title: "Préinscription en lycée de la Défense",
    detail:
      "En ligne, de début janvier à début février en général. Vérifie les dates de l'année sur le site du ministère des Armées.",
    lanes: ["defense"],
  },
  {
    id: "portes-ouvertes",
    y: -3,
    m: 1,
    d: 15,
    title: "Portes ouvertes des lycées",
    detail: "De janvier à mars : note les dates des lycées qui t'intéressent et prépare tes questions.",
  },
  {
    id: "affectation",
    y: -3,
    m: 4,
    d: 15,
    title: "Vœux pour la 2nde",
    detail:
      "Avec ton professeur principal : vœux d'affectation pour les lycées publics, dossiers pour les lycées privés.",
  },
  { id: "brevet", y: -3, m: 6, d: 25, title: "Le brevet", detail: "Les épreuves écrites, fin juin." },
  {
    id: "spe-1re",
    y: -2,
    m: 2,
    d: 1,
    title: "Choix de tes trois spécialités de 1re",
    detail: "Au deuxième trimestre de 2nde, avec le conseil de classe. Essaie tes combinaisons dans le simulateur.",
  },
  {
    id: "stage-2nde",
    y: -2,
    m: 6,
    d: 15,
    title: "Stage d'observation de 2nde",
    detail: "Deux semaines en juin : cherche-le dès l'hiver, dans un métier qui t'attire.",
  },
  {
    id: "spe-tle",
    y: -1,
    m: 2,
    d: 1,
    title: "Choix des deux spécialités gardées en terminale",
    detail: "Et de l'option de maths : expertes si tu gardes les maths, complémentaires si tu les quittes.",
  },
  {
    id: "anticipees",
    y: -1,
    m: 6,
    d: 15,
    title: "Épreuves anticipées de français et de maths",
    detail: "En fin de 1re. Les formations sélectives regardent ces notes de près.",
  },
  {
    id: "ucas",
    y: -1,
    m: 10,
    d: 15,
    title: "Date limite pour Oxford, Cambridge et la médecine au Royaume-Uni",
    detail: "Candidature UCAS, le 15 octobre de ta terminale en général.",
    lanes: ["monde"],
  },
  {
    id: "parcoursup-ouverture",
    y: -1,
    m: 12,
    d: 18,
    title: "Parcoursup ouvre ses formations",
    detail: "Découvre les fiches des formations, leurs attendus et leurs taux d'accès.",
  },
  {
    id: "parcoursup-voeux",
    y: 0,
    m: 1,
    d: 15,
    title: "Parcoursup : inscription et vœux",
    detail: "De mi-janvier à mi-mars environ : jusqu'à dix vœux, avec des sous-vœux.",
  },
  {
    id: "parcoursup-confirmation",
    y: 0,
    m: 4,
    d: 1,
    title: "Parcoursup : dossiers complets et vœux confirmés",
    detail: "Lettres de motivation et pièces demandées, avant la date limite de l'année.",
  },
  {
    id: "iep",
    y: 0,
    m: 4,
    d: 12,
    title: "Concours commun des IEP",
    detail: "En avril de terminale ; l'inscription se fait sur Parcoursup.",
    lanes: ["scpo"],
  },
  {
    id: "parcoursup-reponses",
    y: 0,
    m: 6,
    d: 2,
    title: "Premières réponses de Parcoursup",
    detail: "Début juin : réponds dans les délais à chaque proposition.",
  },
  {
    id: "bac",
    y: 0,
    m: 6,
    d: 15,
    title: "Le bac",
    detail: "Philosophie, épreuves de spécialité et grand oral, de mi-juin à début juillet.",
  },
]);

/** Date d'un rappel pour un élève dont le bac est en juin de l'année `bac`. */
export function dateRappel(r: Rappel, bac: number): Date {
  return new Date(bac + r.y, r.m - 1, r.d);
}

const MOIS = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

/** « Vers le 15 janvier 2030 » */
export function dateLongue(d: Date): string {
  const jour = d.getDate() === 1 ? "1er" : String(d.getDate());
  return `Vers le ${jour} ${MOIS[d.getMonth()]} ${d.getFullYear()}`;
}

function icsDate(d: Date): string {
  const p = (n: number) => String(n).padStart(2, "0");
  return `${d.getFullYear()}${p(d.getMonth() + 1)}${p(d.getDate())}`;
}

function icsText(s: string): string {
  return s
    .replace(/[  ⁠]/g, " ")
    .replace(/([,;\\])/g, "\\$1")
    .replace(/\n/g, "\\n");
}

/** Coupe les lignes trop longues (75 octets au plus, norme iCalendar). */
function fold(line: string): string {
  const enc = new TextEncoder();
  const out: string[] = [];
  let cur = "";
  let bytes = 0;
  for (const ch of line) {
    const n = enc.encode(ch).length;
    if (bytes + n > (out.length ? 74 : 75)) {
      out.push(cur);
      cur = "";
      bytes = 0;
    }
    cur += ch;
    bytes += n;
  }
  out.push(cur);
  return out.join("\r\n ");
}

/** Un fichier .ics : chaque rappel devient une journée dans l'agenda du téléphone. */
export function toIcs(items: { r: Rappel; date: Date }[]): string {
  const stamp = new Date()
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}/, "");
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Agapante//Etudes//FR",
    "CALSCALE:GREGORIAN",
    "X-WR-CALNAME:Mon projet d'études",
  ];
  for (const { r, date } of items) {
    const end = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 1);
    lines.push(
      "BEGIN:VEVENT",
      `UID:${r.id}-${icsDate(date)}@agapante.com`,
      `DTSTAMP:${stamp}`,
      `DTSTART;VALUE=DATE:${icsDate(date)}`,
      `DTEND;VALUE=DATE:${icsDate(end)}`,
      `SUMMARY:${icsText(r.title)}`,
      `DESCRIPTION:${icsText(`${r.detail} Date indicative : vérifie le calendrier officiel de l'année.`)}`,
      "END:VEVENT",
    );
  }
  lines.push("END:VCALENDAR");
  return lines.map(fold).join("\r\n");
}
