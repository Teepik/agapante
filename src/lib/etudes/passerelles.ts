import type { LineId } from "./lines";
import { etTypo as frTypo } from "./typo";

export type Passerelle = {
  id: string;
  num: number;
  /** Stations de départ (la première sert au tracé sur le plan). */
  from: string[];
  fromLines: (LineId | "u")[];
  fromLabel: string;
  to: string;
  title: string;
  when: string;
  how: string;
  who?: string;
  note?: string;
  /** Tracé sur le plan, quand la passerelle relie deux points éloignés. */
  draw?: { from: string; kind: "arc" | "bypass"; bend?: number };
};

export type DoubleCursus = {
  id: string;
  title: string;
  lines: (LineId | "u")[];
  what: string;
  examples: string[];
  acces: string;
  rythme: string;
  apres: string;
  url?: string;
};

export const passerelles: Passerelle[] = frTypo([
  {
    id: "prepa-universite",
    num: 1,
    from: ["prepa-scientifique", "prepa-ecg", "khagne"],
    fromLines: ["sciences", "commerce", "lettres"],
    fromLabel: "Une prépa",
    to: "universite",
    title: "De la prépa à l'université",
    when: "Après une ou deux années de prépa",
    how: "@P1_HOW",
    who: "Tous les élèves de prépa, qu'ils réussissent les concours ou qu'ils changent d'avis en route.",
  },
  {
    id: "licence-ingenieur",
    num: 2,
    from: ["u-sciences"],
    fromLines: ["u"],
    fromLabel: "Licence, BUT ou master scientifique",
    to: "ecole-ingenieurs",
    title: "De l'université à l'école d'ingénieurs",
    when: "Après bac+2, bac+3 ou bac+4",
    how: "@P2_HOW",
    draw: { from: "u-sciences", kind: "bypass" },
  },
  {
    id: "licence-commerce",
    num: 3,
    from: ["u-eco"],
    fromLines: ["u"],
    fromLabel: "Licence, master ou autre diplôme",
    to: "ecole-commerce",
    title: "De l'université à l'école de commerce",
    when: "Après bac+2, bac+3 ou bac+4",
    how: "@P3_HOW",
    draw: { from: "u-eco", kind: "bypass" },
  },
  {
    id: "khagne-commerce",
    num: 4,
    from: ["khagne"],
    fromLines: ["lettres"],
    fromLabel: "Khâgne",
    to: "ecole-commerce",
    title: "De la khâgne aux écoles de commerce",
    when: "En fin de khâgne",
    how: "Les écrits de la banque d'épreuves littéraires (BEL) ouvrent les écoles de commerce de la BCE et d'Ecricome aux khâgneux, sans changer de prépa : les mêmes copies servent à plusieurs concours.",
    note: "La BEL ouvre aussi Saint-Cyr, le CELSA, l'École du Louvre et des écoles d'interprètes. Les IEP de Lille, Lyon et Aix l'ont quittée en 2026.",
    draw: { from: "khagne", kind: "arc", bend: 0.22 },
  },
  {
    id: "prepas-officiers",
    num: 5,
    from: ["prepa-scientifique", "prepa-ecg", "khagne"],
    fromLines: ["sciences", "commerce", "lettres"],
    fromLabel: "Prépa scientifique, ECG ou littéraire",
    to: "concours-officiers",
    title: "De toutes les prépas à Saint-Cyr",
    when: "En fin de prépa",
    how: "Saint-Cyr recrute dans les trois familles de prépas : en 2026, 83 places en sciences, 40 par la prépa ECG et 37 en lettres. L'École navale et l'École de l'air et de l'espace recrutent dans les prépas scientifiques.",
    note: "Tu peux passer un concours d'officier en plus de tes concours habituels.",
    draw: { from: "prepa-scientifique", kind: "arc", bend: -0.18 },
  },
  {
    id: "titres-officiers",
    num: 6,
    from: ["u-sciences", "u-droit"],
    fromLines: ["u"],
    fromLabel: "Licence ou master",
    to: "concours-officiers",
    title: "De l'université aux écoles d'officiers",
    when: "Après bac+3 ou bac+5",
    how: "Les écoles d'officiers gardent des places sur titres universitaires : 25 à Saint-Cyr en 2026 ; à l'École de l'air et de l'espace, des places après bac+3 (dont en sciences politiques) et après bac+5.",
    draw: { from: "u-sciences", kind: "arc", bend: 0.2 },
  },
  {
    id: "sante-rebond",
    num: 7,
    from: ["pass-las"],
    fromLines: ["sante"],
    fromLabel: "Licence santé",
    to: "u-sante",
    title: "De la santé à une autre licence",
    when: "Après la 1re ou la 2e année",
    how: "Si la santé attend encore, ta licence continue dans la discipline de ton bloc disciplinaire, avec tes crédits acquis : rien n'est perdu.",
    note: "Réforme de 2027 : les règles exactes sont à vérifier en 2029.",
  },
  {
    id: "master-sante",
    num: 8,
    from: ["u-sciences"],
    fromLines: ["u"],
    fromLabel: "Master, diplôme d'ingénieur ou doctorat",
    to: "etudes-sante",
    title: "Vers la santé après un premier diplôme",
    when: "Après bac+5",
    how: "@P8_HOW",
    draw: { from: "u-sciences", kind: "arc", bend: -0.24 },
  },
  {
    id: "licence-ens",
    num: 9,
    from: ["u-lettres"],
    fromLines: ["u"],
    fromLabel: "Licence",
    to: "ens-chartes",
    title: "De la licence à l'ENS",
    when: "Après une licence",
    how: "@P9_HOW",
    draw: { from: "u-lettres", kind: "bypass" },
  },
  {
    id: "licence-sciencespo",
    num: 10,
    from: ["u-lettres", "u-droit"],
    fromLines: ["u"],
    fromLabel: "Licence ou autre diplôme de bac+3",
    to: "master-droit",
    title: "De la licence au master de Sciences Po",
    when: "Après bac+3",
    how: "@P10_HOW",
    draw: { from: "u-lettres", kind: "arc", bend: -0.25 },
  },
  {
    id: "reorientation",
    num: 11,
    from: ["prepa-scientifique", "pass-las", "u-sciences"],
    fromLines: ["sciences", "sante", "u"],
    fromLabel: "Une première année",
    to: "universite",
    title: "Changer de voie après une première année",
    when: "Pendant ou après la 1re année d'études",
    how: "@P11_HOW",
  },
  {
    id: "ecole-doctorat",
    num: 12,
    from: ["ecole-ingenieurs", "ens-chartes"],
    fromLines: ["sciences", "lettres"],
    fromLabel: "Grande école ou ENS",
    to: "doctorat",
    title: "De la grande école au doctorat",
    when: "Après bac+5",
    how: "Un diplôme de grande école vaut un master : il ouvre le doctorat, en France comme à l'étranger. Beaucoup de normaliens et de polytechniciens font une thèse.",
  },
]);

export const passerelleById = Object.fromEntries(passerelles.map((p) => [p.id, p])) as Record<string, Passerelle>;

export const doublesCursus: DoubleCursus[] = frTypo([
  {
    id: "doubles-licences",
    title: "Les doubles licences",
    lines: ["scpo", "commerce"],
    what: "Deux licences suivies en même temps, sur trois ans, avec deux diplômes. Ce sont parmi les formations les plus demandées de Parcoursup.",
    examples: [
      "Droit et économie-gestion à Assas : 35 places en 2026",
      "Droit et histoire, Assas et Sorbonne Université : 35 places",
      "Informatique et maths à Paris-Saclay : 50 places",
      "Sciences et philosophie à Sorbonne Université : 24 places",
      "@DL_EXTRA",
    ],
    acces: "Parcoursup, sur dossier ; souvent moins de 10 % d'admis.",
    rythme: "@DL_RYTHME",
    apres: "Les meilleurs masters, les grandes écoles sur titre, la recherche.",
  },
  {
    id: "cpes",
    title: "Le CPES de PSL, avec le lycée Henri-IV",
    lines: ["sciences", "lettres"],
    what: "@CPES_WHAT",
    examples: ["@CPES_EX"],
    acces: "Parcoursup : 237 places en 1re année.",
    rythme: "Des petites classes et un suivi proches de la prépa, l'ouverture d'une université de recherche en plus.",
    apres: "Masters de PSL, grandes écoles, ENS.",
    url: "https://psl.eu/formation/cpes-psl-henri-IV",
  },
  {
    id: "sciencespo-dd",
    title: "Les doubles diplômes de Sciences Po",
    lines: ["scpo", "monde"],
    what: "Le bachelor de Sciences Po se double d'un diplôme d'une autre université, en France ou à l'étranger.",
    examples: ["@SPDD_EX"],
    acces: "La procédure de Sciences Po, avec un dossier propre à chaque double diplôme.",
    rythme: "@SPDD_RYTHME",
    apres: "Les masters de Sciences Po ou de l'université partenaire.",
  },
  {
    id: "ingenieur-manager",
    title: "Ingénieur et manager",
    lines: ["sciences", "commerce"],
    what: "@IM_WHAT",
    examples: ["@IM_EX"],
    acces: "@IM_ACCES",
    rythme: "Une à deux années de plus que le cursus simple.",
    apres: "Direction de projets industriels, conseil, finance, création d'entreprise technologique.",
  },
  {
    id: "architecte-ingenieur",
    title: "Architecte et ingénieur",
    lines: ["arts", "sciences"],
    what: "@AI_WHAT",
    examples: ["@AI_EX"],
    acces: "@AI_ACCES",
    rythme: "@AI_RYTHME",
    apres: "Grands projets de construction, structures, bâtiment durable.",
  },
  {
    id: "medecine-sciences",
    title: "Médecin et chercheur",
    lines: ["sante", "sciences"],
    what: "@MS_WHAT",
    examples: ["@MS_EX"],
    acces: "@MS_ACCES",
    rythme: "@MS_RYTHME",
    apres: "Médecin-chercheur, recherche biomédicale, hôpital universitaire.",
  },
  {
    id: "musique-etudes",
    title: "Musique et études",
    lines: ["arts", "u"],
    what: "Mener de front un conservatoire supérieur et une licence universitaire : au CNSMD de Paris, le diplôme de musicien se double d'une licence avec Sorbonne Université ; à Lyon, avec l'université Lyon 2.",
    examples: ["CNSMD de Paris et Sorbonne Université", "CNSMD de Lyon et Lyon 2", "Au lycée : bac S2TMD ou horaires aménagés", "@ME_EX"],
    acces: "Le concours du conservatoire ; l'inscription à l'université partenaire suit.",
    rythme: "Une pratique quotidienne et des cours universitaires aménagés.",
    apres: "Musicien avec un double bagage : interprète, enseignant, musicologue, direction de chœur, métiers de la culture.",
  },
  {
    id: "droit-international",
    title: "Droit français et droit étranger",
    lines: ["scpo", "monde"],
    what: "@DI_WHAT",
    examples: ["Droit et Common Law à Assas : 10 places en 2026", "@DI_EX"],
    acces: "Parcoursup, sur dossier, avec un excellent niveau de langue.",
    rythme: "Des cours dans deux systèmes juridiques, souvent une année à l'étranger.",
    apres: "Avocat d'affaires international, juriste européen, diplomatie.",
  },
]);
