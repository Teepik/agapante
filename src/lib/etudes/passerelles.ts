import type { LineId } from "./lines";
import type { PassDraw } from "./plan";
import { passerellesVoies } from "./passerelles-voies";
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
  /** Tracé sur la carte : les voies de départ, la voie d'arrivée, le moment (années après le bac). */
  draw?: PassDraw;
  sources?: string[];
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

const base: Passerelle[] = frTypo([
  {
    id: "prepa-universite",
    num: 1,
    from: ["prepa-scientifique", "prepa-ecg", "khagne"],
    fromLines: ["sciences", "commerce", "lettres"],
    fromLabel: "Une prépa",
    to: "universite",
    title: "De la prépa à l'université",
    when: "Après une ou deux années de prépa",
    how: "En prépa publique, tu es inscrit en parallèle dans une université partenaire du lycée. Une année validée vaut 60 crédits européens et ouvre la 2e année de licence ; deux années valent 120 crédits et ouvrent la 3e. Les conditions exactes dépendent de la convention signée par ton lycée, parfois plus exigeante pour la 3e année.",
    who: "Tous les élèves de prépa, qu'ils réussissent les concours ou qu'ils changent d'avis en route.",
    draw: { from: ["sciences", "commerce", "lettres"], to: "u", t: 2 },
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
    how: "À la rentrée 2025, un nouvel élève ingénieur sur trois venait d'une prépa classique ; les autres arrivaient de prépas intégrées, de BUT, de BTS ou de l'université. Quinze grandes écoles, dont Polytechnique, Mines Paris, les Ponts et ISAE-SUPAERO, recrutent en 3e année de licence ou en 1re année de master par la procédure GEI-UNIV. Pour Polytechnique, il faut au moins 13/20 de moyenne en 2e année de licence et moins de 23 ans.",
    draw: { from: ["u"], to: "sciences", t: 3 },
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
    how: "HEC, l'ESSEC et l'ESCP ouvrent leur master 1 aux titulaires d'un bac+3 : dossier, tests de management et d'anglais, puis entretiens. D'autres concours accueillent dès bac+2 : Passerelle (BSB, EM Normandie, IMT BS) et Tremplin, d'Ecricome (NEOMA, KEDGE, EM Strasbourg).",
    draw: { from: ["u"], to: "commerce", t: 3 },
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
    draw: { from: ["lettres"], to: "commerce", t: 2 },
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
    draw: { from: ["sciences", "commerce", "lettres"], to: "defense", t: 2 },
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
    how: "Les écoles d'officiers gardent des places sur titres universitaires : 25 à Saint-Cyr en 2026, pour les titulaires d'un master de 25 ans au plus ; à l'École de l'air et de l'espace, des places après bac+3 (dont en sciences politiques) et après bac+5.",
    draw: { from: ["u"], to: "defense", t: 3 },
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
    how: "Si la santé attend encore, ta licence continue dans la discipline que tu as choisie, avec tous tes crédits acquis.",
    note: "Réforme de 2027 : vérifie les règles exactes l'année de ta terminale.",
    draw: { from: ["sante"], to: "u", t: 1 },
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
    how: "Avec un master, un diplôme d'ingénieur, un diplôme d'école de commerce au grade de master ou un doctorat, tu peux entrer directement en 2e ou 3e année de médecine, de pharmacie, d'odontologie ou de maïeutique. Le dossier se dépose avant la mi-mars, puis vient un entretien avec un jury ; chaque université fixe ses places (en 2026 à Paris Cité : 38 en médecine, 24 en pharmacie). Deux tentatives sont permises.",
    note: "La réforme des études de santé prévoit aussi une passerelle dès bac+3, pour environ 5 % des places de 2e année : un projet encore en discussion.",
    draw: { from: ["u"], to: "sante", t: 5 },
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
    how: "L'ENS de la rue d'Ulm recrute aussi des « normaliens étudiants » sur dossier, en 3e année de licence en lettres, en 2e ou 3e année en sciences. Ils suivent les cours et préparent le diplôme de l'École ; le salaire et l'engagement de dix ans restent propres aux élèves admis par le concours. Les ENS de Lyon, de Rennes et Paris-Saclay ont aussi des concours à bac+2 ou bac+3.",
    draw: { from: ["u"], to: "lettres", t: 3 },
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
    how: "Les masters de Sciences Po s'ouvrent dès bac+3, sur dossier puis entretien. Les IEP du réseau ScPo recrutent aussi en master : à Sciences Po Lille en 2026, dossier, essai et oral, avec jusqu'à dix places par majeure.",
    draw: { from: ["u"], to: "scpo", t: 3 },
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
    how: "Pour changer de première année, tu déposes un nouveau dossier sur Parcoursup, au même calendrier que les lycéens ; pour redoubler dans la même formation, une réinscription suffit. Une année de prépa validée vaut 60 crédits et ouvre la 2e année de licence (passerelle 1), et la licence santé garde tes crédits dans ta discipline (passerelle 7).",
    draw: { from: ["sciences", "sante"], to: "u", t: 1 },
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
    draw: { from: ["sciences", "lettres"], to: "u", t: 5 },
  },
]);

/** Les passerelles, numérotées dans l'ordre : celles du site, puis celles des nouvelles voies. */
export const passerelles: Passerelle[] = [
  ...base,
  ...frTypo(passerellesVoies).map((p, i) => ({ ...p, num: base.length + i + 1 })),
];

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
      "Droit et science politique à Assas : 35 places pour 4 023 candidats en 2025",
    ],
    acces: "Parcoursup, sur dossier ; souvent moins de 10 % d'admis.",
    rythme: "25 à 30 heures de cours par semaine et jusqu'à 39 crédits par semestre, contre 30 en licence simple.",
    apres: "Les meilleurs masters, les grandes écoles sur titre, la recherche.",
  },
  {
    id: "cpes",
    title: "Le CPES de PSL, avec le lycée Henri-IV",
    lines: ["sciences", "lettres"],
    what: "Une licence de PSL en trois ans. La 1re année se passe au lycée Henri-IV, dans l'un des trois parcours ; la 2e associe deux majeures sur les campus de PSL ; la 3e se spécialise.",
    examples: ["Parcours Humanités & société", "Parcours Sciences", "Parcours Économie, société & droit"],
    acces:
      "Parcoursup, en 1re année seulement : 237 places à la rentrée 2026 ; 178 € par an, gratuit pour les boursiers.",
    rythme: "Des petites classes et un suivi proches de la prépa, l'ouverture d'une université de recherche en plus.",
    apres: "Masters de PSL, grandes écoles, ENS.",
    url: "https://psl.eu/formation/cpes-psl-henri-IV",
  },
  {
    id: "sciencespo-dd",
    title: "Les doubles diplômes de Sciences Po",
    lines: ["scpo", "monde"],
    what: "Le bachelor de Sciences Po se double d'un diplôme d'une autre université, en France ou à l'étranger.",
    examples: [
      "Neuf doubles bachelors avec des universités étrangères, dont Columbia, Berkeley et University College London",
      "Trois avec des universités parisiennes, dont Sorbonne Université et Université Paris Cité",
      "Avec l'ESCP, un double bachelor en quatre ans à partir de 2027",
    ],
    acces: "La procédure de Sciences Po, avec un dossier propre à chaque double diplôme.",
    rythme:
      "Trois à quatre ans selon le partenaire ; à l'étranger, souvent deux ans sur un campus de Sciences Po puis deux ans chez le partenaire.",
    apres: "Les masters de Sciences Po ou de l'université partenaire.",
  },
  {
    id: "ingenieur-manager",
    title: "Ingénieur et manager",
    lines: ["sciences", "commerce"],
    what: "Une fois admis dans une grande école d'ingénieurs, tu peux ajouter un passage par une école de commerce partenaire et repartir avec les deux diplômes.",
    examples: [
      "HEC avec Polytechnique, Mines Paris, les Ponts, ISAE-SUPAERO ou l'ENSAE",
      "CentraleSupélec et l'ESSEC, associées depuis 2009",
      "Mines Paris avec HEC, l'ESCP ou Dauphine",
    ],
    acces: "Pendant l'école d'ingénieurs, sur dossier et entretiens auprès de l'école partenaire.",
    rythme: "Une à deux années de plus que le cursus simple.",
    apres: "Direction de projets industriels, conseil, finance, création d'entreprise technologique.",
  },
  {
    id: "architecte-ingenieur",
    title: "Architecte et ingénieur",
    lines: ["arts", "sciences"],
    what: "Un double cursus de sept ans qui mène aux deux diplômes, d'architecte et d'ingénieur. Dix-sept établissements le proposent : surtout des écoles nationales supérieures d'architecture (ENSA) associées à des écoles d'ingénieurs, ainsi que l'INSA de Strasbourg et l'ESTP.",
    examples: [
      "Mines Paris et l'ENSA Paris-Malaquais",
      "Les ENSA de Paris-La Villette, Lyon, Nantes ou Toulouse, avec leurs écoles d'ingénieurs partenaires",
      "L'INSA de Strasbourg et l'ESTP",
    ],
    acces: "Après le bac, sur dossier et lettre de motivation, puis entretien.",
    rythme: "Sept ans, partagés entre les deux écoles ; l'organisation varie d'un établissement à l'autre.",
    apres: "Grands projets de construction, structures, bâtiment durable.",
  },
  {
    id: "medecine-sciences",
    title: "Médecin et chercheur",
    lines: ["sante", "sciences"],
    what: "Mener de front médecine et recherche : l'École de l'Inserm Liliane Bettencourt intercale un master et une thèse de sciences dans les études de médecine ou de pharmacie. D'autres parcours associent la médecine à un diplôme d'ingénieur.",
    examples: [
      "École de l'Inserm Liliane Bettencourt : 40 élèves en 2026",
      "Médecin et ingénieur : Mines Saint-Étienne avec l'université Jean-Monnet",
      "Mines Paris et Université Paris Cité : un parcours ingénieur-médecin en construction",
    ],
    acces: "Sur dossier, pendant la 2e année de médecine ou de pharmacie.",
    rythme:
      "Un parcours long, d'environ quatorze ans pour l'École de l'Inserm, avec la thèse au cœur des études de santé.",
    apres: "Médecin-chercheur, recherche biomédicale, hôpital universitaire.",
  },
  {
    id: "musique-etudes",
    title: "Musique et études",
    lines: ["arts", "u"],
    what: "Mener de front un conservatoire supérieur et une licence universitaire : au CNSMD de Paris, le diplôme de musicien se double d'une licence avec Sorbonne Université ; à Lyon, avec l'université Lyon 2.",
    examples: [
      "CNSMD de Paris et Sorbonne Université",
      "CNSMD de Lyon et Lyon 2",
      "Au lycée : bac S2TMD ou horaires aménagés",
      "Pôle supérieur de Paris Boulogne-Billancourt et Sorbonne Université",
      "Double licence sciences et musicologie à Sorbonne Université : 24 places",
    ],
    acces: "Le concours du conservatoire ; l'inscription à l'université partenaire suit.",
    rythme:
      "Une pratique quotidienne et des cours universitaires aménagés ; à Sorbonne Université, le statut d'artiste de haut niveau adapte l'emploi du temps.",
    apres:
      "Musicien avec un double bagage : interprète, enseignant, musicologue, direction de chœur, métiers de la culture.",
  },
  {
    id: "droit-international",
    title: "Droit français et droit étranger",
    lines: ["scpo", "monde"],
    what: "Un double diplôme en droit français et en droit d'un autre pays, souvent avec deux années à l'étranger.",
    examples: [
      "Droit et Common Law à Assas : 10 places en 2026",
      "Assas et King's College London : quatre ans, deux à Londres et deux à Paris, 20 places",
      "Paris 1 avec Queen Mary à Londres ou l'université de Cologne, en quatre ans",
      "Paris 1, aussi en droit italien, espagnol ou américain",
    ],
    acces:
      "Sur dossier après le bac, avec un excellent niveau de langue ; pour King's College, le test LNAT en plus et une mention très bien exigée.",
    rythme: "Des cours dans deux systèmes juridiques, souvent une année à l'étranger.",
    apres: "Avocat d'affaires international, juriste européen, diplomatie.",
  },
]);
