import { frTypo } from "@/lib/typo";

export type Mot = { term: string; def: string; station?: string };

export const lexique: Mot[] = frTypo([
  {
    term: "Admissible, admis",
    def: "Admissible : tu as réussi les écrits d'un concours et tu passes les oraux. Admis : tu as réussi les oraux, une place t'attend.",
  },
  {
    term: "Admission sur titre",
    def: "Entrée directe dans une grande école avec un diplôme déjà obtenu (licence, master, BUT…), sans passer par la prépa. On dit aussi admission parallèle.",
  },
  { term: "Bac+3, bac+5", def: "Le nombre d'années d'études après le bac : la licence à bac+3, le master ou le diplôme de grande école à bac+5." },
  {
    term: "BCE",
    def: "Banque commune d'épreuves : les concours communs de la plupart des grandes écoles de commerce après une prépa ECG.",
    station: "concours-commerce",
  },
  {
    term: "BEL",
    def: "Banque d'épreuves littéraires : les écrits passés en khâgne ouvrent les portes de nombreuses écoles.",
    station: "concours-lettres",
  },
  {
    term: "BCPST",
    def: "La prépa biologie, chimie, physique et sciences de la Terre : vers les écoles d'agronomie, les écoles vétérinaires et les ENS.",
  },
  {
    term: "Colle (ou khôlle)",
    def: "Interrogation orale d'une heure, à trois élèves devant un professeur. En prépa, il y en a chaque semaine.",
    station: "prepa-scientifique",
  },
  { term: "Concours", def: "Un examen qui classe : seuls les premiers obtiennent une place, quelle que soit leur note." },
  {
    term: "Contrôle continu",
    def: "40 % de la note du bac, calculés sur tes moyennes de 1re et de Terminale. Dans un lycée hors contrat, des épreuves ponctuelles le remplacent.",
  },
  {
    term: "CPGE (prépa)",
    def: "Classe préparatoire aux grandes écoles : deux années intensives après le bac, dans un lycée, pour préparer des concours.",
  },
  {
    term: "Crédits ECTS",
    def: "L'unité européenne qui mesure les études : 60 crédits par an, 180 pour une licence. Ils permettent de passer d'une formation à une autre.",
  },
  { term: "Double licence", def: "Deux licences suivies en même temps, avec deux diplômes à la fin. Exigeant et très apprécié." },
  { term: "ECG", def: "La prépa économique et commerciale, voie générale : maths, économie ou géopolitique, culture générale et langues.", station: "prepa-ecg" },
  {
    term: "EDN et ECOS",
    def: "Les épreuves de 6e année de médecine (écrits sur tablette, puis examens cliniques) qui classent les étudiants pour choisir leur spécialité.",
    station: "internat",
  },
  {
    term: "ENS",
    def: "École normale supérieure : elle forme des chercheurs et des professeurs. Ses élèves, les normaliens, sont payés pendant leurs études.",
  },
  {
    term: "Épreuve anticipée",
    def: "Épreuve du bac passée en fin de 1re : le français, et depuis 2026 les mathématiques.",
    station: "premiere-terminale",
  },
  { term: "Fiche Avenir", def: "L'avis de tes professeurs et de ton chef d'établissement, joint à chacun de tes vœux sur Parcoursup." },
  { term: "Grand oral", def: "Épreuve orale de fin de Terminale : tu présentes et défends une question liée à tes spécialités." },
  {
    term: "Grande école",
    def: "Un établissement sélectif, souvent après une prépa : écoles d'ingénieurs, de commerce, ENS, Sciences Po, écoles d'officiers…",
  },
  {
    term: "Hors contrat",
    def: "Un établissement privé sans contrat avec l'État. Ses élèves passent le bac uniquement en examens, y compris pour la part de contrôle continu.",
  },
  { term: "Hypokhâgne, khâgne", def: "Première et deuxième années de prépa littéraire.", station: "khagne" },
  { term: "IEP", def: "Institut d'études politiques : Sciences Po Paris et les Sciences Po de région.", station: "sciences-po" },
  {
    term: "INSP",
    def: "L'Institut national du service public, qui a remplacé l'ENA en 2022 : il forme les hauts fonctionnaires de l'État.",
    station: "concours-etat",
  },
  {
    term: "Internat (médecine)",
    def: "La dernière partie des études de médecine, dans la spécialité choisie : de quatre à six ans selon la spécialité.",
    station: "internat",
  },
  { term: "LAS", def: "Licence accès santé : une licence au choix, avec une option qui permet de candidater en médecine ou en pharmacie.", station: "pass-las" },
  {
    term: "Licence, master, doctorat",
    def: "Les trois diplômes de l'université : la licence (bac+3), le master (bac+5), le doctorat (environ bac+8).",
    station: "universite",
  },
  {
    term: "Maths expertes",
    def: "Option de Terminale de trois heures, pour ceux qui gardent la spécialité maths. Presque indispensable pour une prépa scientifique.",
  },
  { term: "Maths complémentaires", def: "Option de Terminale pour garder des maths après avoir quitté la spécialité." },
  {
    term: "MPSI, PCSI, MP2I, PTSI",
    def: "Les prépas scientifiques de 1re année : maths et physique, physique et chimie, maths et informatique, technologie.",
    station: "prepa-scientifique",
  },
  { term: "PASS", def: "Parcours d'accès spécifique santé : une première année centrée sur la santé, avec une option d'une autre discipline.", station: "pass-las" },
  { term: "Parcoursup", def: "La plateforme nationale où tu formules tes vœux d'études supérieures, de janvier à mars de ta Terminale." },
  { term: "Passerelle", def: "Une possibilité officielle de changer de formation en cours de route, souvent sans perdre d'année.", station: "universite" },
  {
    term: "Prépa étoilée (MP*, PC*)",
    def: "Classe de 2e année qui regroupe les meilleurs élèves et vise les concours les plus sélectifs : X, ENS, Mines, Centrale.",
  },
  { term: "Spécialité", def: "Une matière approfondie au lycée : trois en 1re, deux en Terminale." },
  { term: "Taupe", def: "Le surnom de la 2e année de prépa scientifique ; ses élèves sont les taupins." },
  { term: "UCAS", def: "La plateforme de candidature aux universités britanniques." },
]);
