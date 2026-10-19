/**
 * « Je veux devenir… » : des métiers, du CAP au doctorat, et les routes de la carte qui y mènent.
 * Salaires de début de carrière et perspectives tirés des fiches Onisep, de l'enquête Besoins en main-d'œuvre
 * de France Travail et des grilles publiques, vérifiés en octobre 2026 ; régénéré par un script.
 */
import type { LaneId } from "./lines";
import { etTypo } from "./typo";

export const FAMILLES = [
  "Sciences, ingénierie et numérique",
  "Santé et soin",
  "Social, éducation et sport",
  "Défense, sécurité et secours",
  "Nature, agriculture et environnement",
  "Artisanat, industrie et BTP",
  "Commerce, gestion et finance",
  "Droit, État et international",
  "Enseignement, recherche et culture",
  "Communication, médias et lettres",
  "Arts, musique et architecture",
  "Transport, tourisme et hôtellerie",
] as const;

export type MetierRoute = { lane: LaneId; via: string[]; texte: string };
export type Metier = {
  id: string;
  name: string;
  /** Rang dans FAMILLES. */
  famille: number;
  pitch: string;
  etudes: string;
  routes: MetierRoute[];
  salaire?: { debut: string; annee: string; source: string };
  emploi?: { texte: string; source: string };
  onisep?: string;
};

export const metiers: Metier[] = etTypo([
  {
    id: "chercheur-biologie",
    name: "Chercheur en biologie",
    famille: 0,
    pitch:
      "Partage son temps entre la paillasse et l'ordinateur : il conçoit des expériences sur le vivant, analyse les résultats et publie ses découvertes.",
    etudes: "bac+8",
    routes: [
      {
        lane: "u",
        via: ["u-sciences", "u-master", "doctorat", "metiers-u"],
        texte: "Une licence et un master de biologie, puis trois ans de doctorat.",
      },
    ],
    salaire: {
      debut:
        "À partir de 2 358 € bruts par mois pour un chargé de recherche dans un organisme public, et de 1 944 € pour un ingénieur d'études",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chercheur-chercheuse-en-biologie",
    },
    emploi: {
      texte:
        "Le secteur public assure la majorité des recrutements, par un concours très sélectif ; les débuts passent souvent par des contrats courts.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chercheur-chercheuse-en-biologie",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chercheur-chercheuse-en-biologie",
  },
  {
    id: "data-scientist",
    name: "Data scientist",
    famille: 0,
    pitch:
      "Analyse de très grandes masses de données pour aider une organisation à décider : prévoir des ventes, détecter des fraudes, mieux soigner.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte:
          "Une licence de mathématiques ou d'informatique, puis un master en mathématiques appliquées ou en science des données.",
      },
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte: "Deux ans de prépa scientifique, puis une école d'ingénieurs ou de statistique, comme l'ENSAI.",
      },
    ],
    salaire: {
      debut: "À partir de 3 100 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/data-scientist-expert-en-megadonnees",
    },
    emploi: {
      texte:
        "Le secteur des mégadonnées est très porteur ; on débute souvent comme data analyst, et les profils avec une première expérience sont particulièrement demandés.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/data-scientist-expert-en-megadonnees",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/data-scientist-expert-en-megadonnees",
  },
  {
    id: "developpeur",
    name: "Développeur informatique",
    famille: 0,
    pitch:
      "Traduit le cahier des charges d'un client en lignes de code, teste son programme et le fait évoluer : site web, application mobile ou logiciel.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Un BTS SIO, option solutions logicielles, en deux ans, ou un BUT informatique en trois ans.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte: "Une licence puis un master d'informatique.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs en cinq ans dès le bac, avec une spécialité informatique.",
      },
    ],
    salaire: {
      debut:
        "À partir de 2 830 € bruts par mois pour un technicien supérieur débutant, et de 2 920 € pour un ingénieur",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/developpeur-developpeuse-informatique",
    },
    emploi: {
      texte:
        "Avec l'essor du numérique, la demande en développeurs est très forte ; les entreprises de services du numérique concentrent la majorité des postes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/developpeur-developpeuse-informatique",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/developpeur-developpeuse-informatique",
  },
  {
    id: "expert-cybersecurite",
    name: "Expert en cybersécurité",
    famille: 0,
    pitch:
      "Protège les réseaux et les données d'une entreprise ou d'une administration : il repère les failles, déjoue les attaques et organise la riposte.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Deux ans de prépa scientifique, puis une école d'ingénieurs en informatique ou en télécoms, comme Télécom Paris.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte:
          "Une licence puis un master d'informatique, avec une spécialité sécurité, et quelques années d'expérience des réseaux.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs en cinq ans dès le bac, avec une spécialité cybersécurité.",
      },
    ],
    salaire: {
      debut: "À partir de 3 080 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-experte-en-securite-informatique",
    },
    emploi: {
      texte:
        "Forte demande des employeurs : le budget sécurité augmente trois fois plus vite que les autres dépenses liées aux nouvelles technologies.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-experte-en-securite-informatique",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-experte-en-securite-informatique",
  },
  {
    id: "ingenieur-biomedical",
    name: "Ingénieur biomédical",
    famille: 0,
    pitch:
      "Choisit, installe et suit les équipements médicaux d'un hôpital, du scanner au pousse-seringue, et veille à leur maintenance, leur qualité et leur sécurité.",
    etudes: "bac+5",
    routes: [
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte:
          "Une école d'ingénieurs en cinq ans dès le bac, avec une spécialité génie biomédical, comme l'UTC de Compiègne.",
      },
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte: "Deux ans de prépa scientifique, puis une école d'ingénieurs avec une spécialité biomédicale.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte: "Une licence de sciences, puis un master en génie biomédical.",
      },
    ],
    salaire: {
      debut: "À partir de 1 920 € bruts par mois en début de carrière à l'hôpital public",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-biomedical-ingenieure-biomedicale",
    },
    emploi: {
      texte:
        "La très grande majorité des ingénieurs biomédicaux travaille à l'hôpital ; avec l'expérience, on peut diriger le service biomédical.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-biomedical-ingenieure-biomedicale",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-biomedical-ingenieure-biomedicale",
  },
  {
    id: "ingenieur-aeronautique",
    name: "Ingénieur en aéronautique",
    famille: 0,
    pitch:
      "Conçoit, calcule et teste avions, hélicoptères, satellites ou leurs équipements, souvent d'abord en bureau d'études ou en service d'essais.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Deux ans de prépa scientifique, les concours, puis trois ans d'école d'ingénieurs, généraliste ou spécialisée comme l'ISAE-Supaéro ou l'ENAC.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs en cinq ans dès le bac, avec une spécialisation en aéronautique.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte: "Une licence de sciences, puis un master mention aéronautique et espace.",
      },
    ],
    salaire: {
      debut: "À partir de 2 800 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-en-aeronautique",
    },
    emploi: {
      texte:
        "Les recrutements ralentissent, mais les entreprises gardent un volume d'embauches, surtout en Île-de-France, en Occitanie et en Nouvelle-Aquitaine.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-en-aeronautique",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-en-aeronautique",
  },
  {
    id: "ingenieur-ia",
    name: "Ingénieur en intelligence artificielle",
    famille: 0,
    pitch:
      "Conçoit et entraîne des modèles d'apprentissage automatique, des assistants vocaux aux outils d'aide au diagnostic, et suit de près les progrès de la technologie.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Deux ans de prépa scientifique, puis une école d'ingénieurs avec une spécialisation en intelligence artificielle.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte:
          "Une licence d'informatique ou de mathématiques, puis un master en informatique ou en sciences des données.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs en cinq ans dès le bac, avec une spécialité informatique ou robotique.",
      },
    ],
    salaire: {
      debut: "De 2 900 à 4 200 € bruts par mois en début de carrière, selon la région, le secteur et les compétences",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-machine-learning-apprentissage-automatique",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-machine-learning-apprentissage-automatique",
  },
  {
    id: "ingenieur-energies-renouvelables",
    name: "Ingénieur en énergies renouvelables",
    famille: 0,
    pitch:
      "Imagine et améliore des solutions pour produire une énergie propre, solaire, éolienne ou hydrogène : il conçoit des prototypes, les teste et les perfectionne.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Deux ans de prépa scientifique, les concours, puis trois ans d'école d'ingénieurs, généraliste ou spécialisée en énergie.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs en cinq ans dès le bac, avec une spécialité énergie.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte: "Une licence de sciences, puis un master dans le domaine de l'énergie.",
      },
    ],
    salaire: {
      debut: "À partir de 2 500 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-recherche-et-developpement-en-energies-renouvelables",
    },
    emploi: {
      texte:
        "Les grands groupes industriels misent de plus en plus sur ces énergies : avec les bureaux d'études et la recherche publique, ils recrutent, y compris des débutants.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-recherche-et-developpement-en-energies-renouvelables",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-recherche-et-developpement-en-energies-renouvelables",
  },
  {
    id: "ingenieur-nucleaire",
    name: "Ingénieur nucléaire",
    famille: 0,
    pitch:
      "Conçoit, exploite ou contrôle des installations nucléaires, encadre des équipes d'opérateurs et de techniciens, et veille à la sûreté à chaque étape.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Deux ans de prépa scientifique, les concours, puis trois ans d'école d'ingénieurs, généraliste ou spécialisée en génie nucléaire.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte: "Une licence de physique, puis un master mention ingénierie nucléaire.",
      },
    ],
    salaire: {
      debut: "De 2 920 à 3 100 € bruts par mois en début de carrière, selon la spécialité",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-nucleaire",
    },
    emploi: {
      texte:
        "Les employeurs accueillent les débutants avec du mentorat et une formation interne très développée ; plus de la moitié des entreprises du secteur mènent des projets à l'international.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-nucleaire",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-nucleaire",
  },
  {
    id: "technicien-laboratoire",
    name: "Technicien de laboratoire en biologie",
    famille: 0,
    pitch:
      "Prépare les échantillons, réalise analyses et cultures, et consigne les résultats, entre flacons, éprouvettes et appareils de mesure.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Un BTS bioanalyses, biologie médicale ou biotechnologies en deux ans, ou le BUT génie biologique en trois ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Après un BTS, une licence professionnelle en bio-industries ou en industries pharmaceutiques.",
      },
    ],
    emploi: {
      texte:
        "Les industries agroalimentaires, pharmaceutiques et de traitement des pollutions recherchent beaucoup de techniciens biologistes ; la recherche publique offre moins de postes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-biologiste",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-biologiste",
  },
  {
    id: "technicien-informatique",
    name: "Technicien de maintenance informatique",
    famille: 0,
    pitch:
      "Installe, dépanne et met à jour ordinateurs, imprimantes et réseaux, sur place ou à distance, et aide les utilisateurs au quotidien.",
    etudes: "bac pro",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Le bac pro cybersécurité, informatique et réseaux, électronique, en trois ans après la 3e.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Après le bac, un BTS en informatique, réseaux ou télécoms en deux ans, ou un BUT en trois ans.",
      },
    ],
    salaire: {
      debut: "À partir de 2 160 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-maintenance-en-informatique",
    },
    emploi: {
      texte:
        "Entreprises de toutes tailles et administrations font appel à ses services ; l'expérience ouvre la gestion d'un parc informatique ou d'un centre d'appels.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-maintenance-en-informatique",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-maintenance-en-informatique",
  },
  {
    id: "aide-soignant",
    name: "Aide-soignant",
    famille: 1,
    pitch:
      "Aide les patients dans les gestes du quotidien, toilette, repas, déplacements, et surveille leur état aux côtés des infirmiers.",
    etudes: "diplôme d'État en 1 an, niveau bac",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte: "Un an en institut de formation d'aides-soignants, sur dossier et entretien, ouvert dès 17 ans.",
      },
      {
        lane: "pro",
        via: ["lycee-pro", "institut-parasocial", "metiers-parasocial"],
        texte: "Après un bac pro du secteur sanitaire et social, la formation au diplôme d'État peut être allégée.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière à l'hôpital public",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/aide-soignant-aide-soignante",
    },
    emploi: {
      texte: "L'un des métiers qui recrutent le plus : 62 100 projets de recrutement d'aides-soignants en 2026.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/aide-soignant-aide-soignante",
  },
  {
    id: "chirurgien",
    name: "Chirurgien",
    famille: 1,
    pitch:
      "Examine le patient, prépare l'intervention et opère au bloc, en équipe avec l'anesthésiste et les infirmiers, puis suit la convalescence.",
    etudes: "bac+12",
    routes: [
      {
        lane: "sante",
        via: ["pass-las", "etudes-sante", "internat", "metiers-sante"],
        texte:
          "La licence santé, six ans de médecine, puis six ans d'internat de chirurgie, ouverts selon le classement de fin de 6e année.",
      },
    ],
    emploi: {
      texte: "De nombreux départs à la retraite sont attendus dans une spécialité qui attire moins de jeunes qu'avant.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chirurgien-chirurgienne",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chirurgien-chirurgienne",
  },
  {
    id: "chirurgien-dentiste",
    name: "Chirurgien-dentiste",
    famille: 1,
    pitch:
      "Pose un diagnostic, souvent à l'aide de radiographies, soigne les caries et les gencives, extrait les dents abîmées et pose des prothèses.",
    etudes: "bac+6",
    routes: [
      {
        lane: "sante",
        via: ["pass-las", "etudes-sante", "metiers-sante"],
        texte:
          "La licence santé, puis des études d'odontologie : six ans au total pour le diplôme d'État de docteur en chirurgie dentaire.",
      },
    ],
    salaire: {
      debut: "À partir de 4 000 € bruts par mois en libéral en début de carrière, et de 4 634 € à l'hôpital public",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chirurgien-dentiste-chirurgienne-dentiste",
    },
    emploi: {
      texte: "Le contexte favorise l'installation des jeunes diplômés, surtout dans le Nord et dans les campagnes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chirurgien-dentiste-chirurgienne-dentiste",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chirurgien-dentiste-chirurgienne-dentiste",
  },
  {
    id: "ergotherapeute",
    name: "Ergothérapeute",
    famille: 1,
    pitch:
      "Aide les personnes malades, âgées ou en situation de handicap à retrouver leur autonomie au quotidien, en adaptant les gestes, le matériel et le logement.",
    etudes: "bac+3",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Trois ans en institut de formation en ergothérapie, sur dossier via Parcoursup ou après une 1re année de licence santé, pour le diplôme d'État.",
      },
    ],
    salaire: {
      debut: "À partir de 2 667 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ergotherapeute",
    },
    emploi: {
      texte: "Les besoins sont élevés : le nombre d'ergothérapeutes, environ 15 800 en France, progresse sans cesse.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ergotherapeute",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/ergotherapeute",
  },
  {
    id: "infirmier",
    name: "Infirmier",
    famille: 1,
    pitch:
      "Réalise les soins prescrits, administre les traitements et surveille l'état des patients, à l'hôpital, en clinique, en Ehpad ou à domicile.",
    etudes: "bac+3",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Trois ans en institut de formation en soins infirmiers (IFSI), sur dossier via Parcoursup, pour le diplôme d'État.",
      },
    ],
    salaire: {
      debut: "À partir de 1 890 € bruts par mois en début de carrière dans la fonction publique",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/infirmier-infirmiere",
    },
    emploi: {
      texte:
        "Métier très recherché : en 2026, les employeurs jugent difficiles 60,2 % de leurs projets de recrutement d'infirmiers et de sages-femmes.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/infirmier-infirmiere",
  },
  {
    id: "manipulateur-radio",
    name: "Manipulateur en électroradiologie médicale",
    famille: 1,
    pitch:
      "Prépare le matériel et le patient, réalise radiographies, scanners et IRM, et participe aux séances de radiothérapie.",
    etudes: "bac+3",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Trois ans en institut de formation, sur dossier, pour le diplôme d'État de manipulateur d'électroradiologie médicale.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Ou trois ans pour le DTS imagerie médicale et radiologie thérapeutique, qui permet aussi d'exercer.",
      },
    ],
    salaire: {
      debut: "À partir de 1 890 € bruts par mois en début de carrière à l'hôpital public",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/manipulateur-manipulatrice-d-electroradiologie-medicale",
    },
    emploi: {
      texte: "La profession connaît un faible taux de chômage et offre de bonnes perspectives aux jeunes diplômés.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/manipulateur-manipulatrice-d-electroradiologie-medicale",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/manipulateur-manipulatrice-d-electroradiologie-medicale",
  },
  {
    id: "kinesitherapeute",
    name: "Masseur-kinésithérapeute",
    famille: 1,
    pitch:
      "Rééduque, le plus souvent sur prescription médicale, des patients blessés, opérés ou malades, par des massages, des mouvements et des exercices.",
    etudes: "bac+5",
    routes: [
      {
        lane: "parasocial",
        via: ["pass-las", "institut-parasocial", "metiers-parasocial"],
        texte:
          "Une 1re année validée en licence santé, puis quatre ans en institut de formation en masso-kinésithérapie, selon le classement.",
      },
      {
        lane: "parasocial",
        via: ["u-staps", "institut-parasocial", "metiers-parasocial"],
        texte:
          "Une 1re année de STAPS ou de biologie ouvre aussi les instituts, selon les conventions avec l'université et le classement.",
      },
    ],
    salaire: {
      debut: "À partir de 2 040 € bruts par mois en début de carrière à l'hôpital public",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/masseur-kinesitherapeute",
    },
    emploi: {
      texte:
        "Le métier offre de bonnes perspectives d'emploi ; environ 88 000 kinésithérapeutes exercent, pour 80 % en libéral.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/masseur-kinesitherapeute",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/masseur-kinesitherapeute",
  },
  {
    id: "medecin-generaliste",
    name: "Médecin généraliste",
    famille: 1,
    pitch:
      "Reçoit en moyenne 20 à 30 patients par jour, de tous âges, pose un diagnostic, prescrit un traitement et oriente vers un spécialiste quand il le faut.",
    etudes: "bac+10",
    routes: [
      {
        lane: "sante",
        via: ["pass-las", "etudes-sante", "internat", "metiers-sante"],
        texte:
          "La licence santé, la faculté de médecine jusqu'en 6e année, puis quatre ans d'internat de médecine générale.",
      },
    ],
    emploi: {
      texte:
        "Métier très recherché : en 2026, les employeurs jugent difficiles 78,8 % de leurs projets de recrutement de médecins.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/medecin-generaliste",
  },
  {
    id: "orthophoniste",
    name: "Orthophoniste",
    famille: 1,
    pitch:
      "Rééduque la parole, le langage, la lecture, la voix ou la déglutition d'enfants et d'adultes, avec des exercices techniques et ludiques adaptés à chacun.",
    etudes: "bac+5",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Cinq ans d'études dès le bac, sur dossier et entretien, pour le certificat de capacité d'orthophoniste.",
      },
    ],
    salaire: {
      debut:
        "À partir de 2 045 € bruts par mois en début de carrière à l'hôpital public ; en libéral, de 2 300 à 3 500 € nets par mois",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/orthophoniste",
    },
    emploi: {
      texte:
        "Un jeune diplômé mobile trouve facilement un emploi ; plus de 80 % des orthophonistes exercent en libéral.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/orthophoniste",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/orthophoniste",
  },
  {
    id: "pharmacien",
    name: "Pharmacien d'officine",
    famille: 1,
    pitch:
      "Délivre les médicaments, avec ou sans ordonnance, vérifie chaque prescription et conseille les patients au comptoir de la pharmacie.",
    etudes: "bac+6",
    routes: [
      {
        lane: "sante",
        via: ["pass-las", "etudes-sante", "metiers-sante"],
        texte:
          "La licence santé, puis des études de pharmacie : six ans au total pour le diplôme d'État de docteur en pharmacie.",
      },
    ],
    salaire: {
      debut: "De 3 620 à 5 800 € bruts par mois en début de carrière pour un pharmacien salarié, adjoint ou remplaçant",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/pharmacien-pharmacienne-d-officine",
    },
    emploi: {
      texte:
        "Le secteur recrute très facilement, et le métier s'exerce partout, en ville comme à la campagne, en métropole comme outre-mer.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/pharmacien-pharmacienne-d-officine",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/pharmacien-pharmacienne-d-officine",
  },
  {
    id: "sage-femme",
    name: "Sage-femme",
    famille: 1,
    pitch:
      "Suit la grossesse, réalise l'accouchement, veille sur la mère et le nouveau-né, et assure le suivi gynécologique des femmes.",
    etudes: "bac+6",
    routes: [
      {
        lane: "sante",
        via: ["pass-las", "etudes-sante", "metiers-sante"],
        texte:
          "La licence santé, puis cinq ans en école de sages-femmes pour le diplôme d'État de docteur en maïeutique.",
      },
    ],
    salaire: {
      debut: "À partir de 2 264 € bruts par mois en début de carrière à l'hôpital public",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/maieuticien-sage-femme",
    },
    emploi: {
      texte:
        "Métier recherché : en 2026, les employeurs jugent difficiles 60,2 % de leurs projets de recrutement d'infirmiers et de sages-femmes.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/maieuticien-sage-femme",
  },
  {
    id: "veterinaire",
    name: "Vétérinaire",
    famille: 1,
    pitch:
      "Examine, soigne, opère et vaccine les animaux, surtout les chiens et les chats, mais aussi ceux des élevages, et conseille leurs propriétaires.",
    etudes: "bac+6",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "metiers-sante"],
        texte:
          "Deux ans de prépa BCPST, le concours des écoles vétérinaires, puis cinq ans en école nationale vétérinaire.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "metiers-sante"],
        texte:
          "Le concours véto post-bac, sur Parcoursup, ouvre directement les écoles vétérinaires pour six ans d'études.",
      },
    ],
    salaire: {
      debut: "À partir de 2 300 € bruts par mois en début de carrière, selon le lieu d'exercice et le statut",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/veterinaire",
    },
    emploi: {
      texte:
        "D'ici 2030, la demande portera surtout sur les animaux de compagnie ; l'emploi auprès des animaux d'élevage reste stable.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/veterinaire",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/veterinaire",
  },
  {
    id: "accompagnant-educatif-social",
    name: "Accompagnant éducatif et social",
    famille: 2,
    pitch:
      "Aide chaque jour des personnes âgées ou en situation de handicap à se laver, s'habiller, se déplacer et préparer leurs repas, chez elles ou en établissement.",
    etudes: "CAP",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Le diplôme d'État d'accompagnant éducatif et social, en un ou deux ans, accessible dès la fin de la 3e.",
      },
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Ou le bac pro Accompagnement, soins et services à la personne, en trois ans au lycée professionnel.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière dans la fonction publique",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/accompagnant-educatif-et-social-accompagnante-educative-et-sociale",
    },
    emploi: {
      texte:
        "Métier en plein essor : 69 500 projets de recrutement d'aides à domicile et d'auxiliaires de vie en 2026, en hausse de 13,3 % sur un an.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/accompagnant-educatif-et-social-accompagnante-educative-et-sociale",
  },
  {
    id: "assistant-service-social",
    name: "Assistant de service social",
    famille: 2,
    pitch:
      "Reçoit et accompagne des personnes ou des familles en difficulté, lors d'entretiens et de visites à domicile, pour les aider à faire valoir leurs droits.",
    etudes: "bac+3",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Trois ans en école de travail social pour le diplôme d'État d'assistant de service social, sur dossier via Parcoursup.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière dans la fonction publique d'État",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/assistant-assistante-de-service-social",
    },
    emploi: {
      texte:
        "L'emploi progresse : la précarité et le vieillissement de la population renforcent les besoins, et de nombreux départs à la retraite approchent.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/assistant-assistante-de-service-social",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/assistant-assistante-de-service-social",
  },
  {
    id: "cpe",
    name: "Conseiller principal d'éducation (CPE)",
    famille: 2,
    pitch:
      "Organise la vie des élèves en dehors des cours, veille à l'assiduité et à la sécurité, et suit chaque élève avec les professeurs et les familles.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte: "Une licence, le concours de CPE dès la 3e année, puis deux ans de master rémunéré.",
      },
    ],
    salaire: {
      debut: "À partir de 2 000 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/conseiller-principal-d-education-conseillere-principale-d-education",
    },
    emploi: {
      texte:
        "Recrutement chaque année par concours de l'Éducation nationale ; après quatre ans d'ancienneté, le CPE peut viser la direction d'établissement.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/conseiller-principal-d-education-conseillere-principale-d-education",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/conseiller-principal-d-education-conseillere-principale-d-education",
  },
  {
    id: "entraineur-sportif",
    name: "Entraîneur sportif",
    famille: 2,
    pitch:
      "Prépare des sportifs ou une équipe à la compétition : plans d'entraînement, séances, analyse des performances et coaching les jours de match.",
    etudes: "bac+2",
    routes: [
      {
        lane: "u",
        via: ["u-staps", "u-master", "metiers-u"],
        texte: "Une licence STAPS, spécialité entraînement sportif, puis un master spécialisé en entraînement.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Ou le DEJEPS perfectionnement sportif, un diplôme du ministère des Sports préparé en 9 à 18 mois.",
      },
    ],
    emploi: {
      texte:
        "Chaque année, quelques milliers de personnes obtiennent le DEJEPS ; la carrière se construit par étapes, du club local jusqu'au niveau national.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/entraineur-sportif-entraineure-sportive",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/entraineur-sportif-entraineure-sportive",
  },
  {
    id: "professeur-eps",
    name: "Professeur d'EPS",
    famille: 2,
    pitch:
      "Enseigne le sport au collège et au lycée, entre le stade, le gymnase et la piscine, et évalue les élèves pour le brevet et le bac.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-staps", "u-master", "metiers-u"],
        texte: "Une licence STAPS, le CAPEPS dès la 3e année, puis deux ans de master rémunéré.",
      },
    ],
    salaire: {
      debut: "De 2 171 à 2 196 € bruts par mois l'année de titularisation, pour un professeur certifié",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/professeure-professeure-d-eps-education-physique-et-sportive",
    },
    emploi: {
      texte:
        "Le nombre de postes ouverts au CAPEPS paraît chaque année au Bulletin officiel ; le métier ouvre ensuite sur le sport fédéral, l'étranger ou la recherche.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/professeure-professeure-d-eps-education-physique-et-sportive",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/professeure-professeure-d-eps-education-physique-et-sportive",
  },
  {
    id: "professeur-des-ecoles",
    name: "Professeur des écoles",
    famille: 2,
    pitch:
      "Enseigne toutes les matières à une classe de maternelle ou d'élémentaire, prépare ses séances, suit les progrès de chaque enfant et échange avec les familles.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte:
          "Une licence, dont la nouvelle licence professorat des écoles ouverte en 2026, le concours dès la 3e année, puis deux ans de master rémunéré.",
      },
    ],
    salaire: {
      debut: "À partir de 2 171 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-des-ecoles-professeure-des-ecoles",
    },
    emploi: {
      texte:
        "Recrutement par le concours de l'Éducation nationale, désormais dès la 3e année de licence ; les académies et les écoles privées recrutent aussi des professeurs contractuels.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-des-ecoles-professeure-des-ecoles",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-des-ecoles-professeure-des-ecoles",
  },
  {
    id: "psychologue",
    name: "Psychologue",
    famille: 2,
    pitch:
      "Mène des entretiens et fait passer des tests pour comprendre les difficultés d'une personne, puis l'accompagne, à l'hôpital, à l'école, en entreprise ou en cabinet.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-psycho", "u-master", "metiers-u"],
        texte:
          "Une licence de psychologie, puis un master de psychologie avec ses stages, qui donne le titre de psychologue.",
      },
    ],
    salaire: {
      debut:
        "À partir de 1 867 € bruts par mois en début de carrière ; en libéral, selon le nombre de patients et les honoraires",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/psychologue",
    },
    emploi: {
      texte:
        "Les débuts passent souvent par des stages et des contrats courts ; une forte demande sociale et les départs à la retraite créent des emplois.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/psychologue",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/psychologue",
  },
  {
    id: "educateur-jeunes-enfants",
    name: "Éducateur de jeunes enfants",
    famille: 2,
    pitch:
      "Accueille de jeunes enfants en crèche ou en structure d'accueil, imagine des activités d'éveil et accompagne les parents.",
    etudes: "bac+3",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Trois ans en école de travail social pour le diplôme d'État d'éducateur de jeunes enfants, sur dossier via Parcoursup.",
      },
    ],
    salaire: {
      debut: "À partir de 1 945 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-educatrice-de-jeunes-enfants",
    },
    emploi: {
      texte:
        "Le marché du travail est accueillant pour les jeunes diplômés, avec une pénurie d'EJE par endroits ; les premiers contrats sont souvent des CDD.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-educatrice-de-jeunes-enfants",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-educatrice-de-jeunes-enfants",
  },
  {
    id: "educateur-sportif",
    name: "Éducateur sportif",
    famille: 2,
    pitch:
      "Anime, enseigne et entraîne une ou plusieurs disciplines, en club, en collectivité, en club de vacances, en maison de retraite ou en entreprise.",
    etudes: "BPJEPS, niveau bac",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Le BPJEPS, un diplôme du ministère des Sports préparé en 9 à 24 mois.",
      },
      {
        lane: "u",
        via: ["u-staps", "metiers-u"],
        texte: "Ou une licence STAPS en trois ans.",
      },
    ],
    salaire: {
      debut:
        "À partir de 1 867 € bruts par mois en début de carrière comme éducateur territorial des activités physiques et sportives",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-sportif-educatrice-sportive",
    },
    emploi: {
      texte:
        "Avec plus de 16 millions de licenciés, les clubs recrutent plusieurs milliers d'animateurs par an, souvent à temps partiel ou en saison.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-sportif-educatrice-sportive",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-sportif-educatrice-sportive",
  },
  {
    id: "educateur-specialise",
    name: "Éducateur spécialisé",
    famille: 2,
    pitch:
      "Accompagne au quotidien des enfants, des adolescents ou des adultes en difficulté ou en situation de handicap, pour les aider à gagner en autonomie.",
    etudes: "bac+3",
    routes: [
      {
        lane: "parasocial",
        via: ["institut-parasocial", "metiers-parasocial"],
        texte:
          "Trois ans en école de travail social pour le diplôme d'État d'éducateur spécialisé, sur dossier via Parcoursup.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Le BUT carrières sociales, parcours éducation spécialisée, en trois ans ; certains IUT le combinent avec le diplôme d'État.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-specialise-educatrice-specialisee",
    },
    emploi: {
      texte:
        "Marché de l'emploi favorable : les besoins dépassent le nombre de diplômés, surtout en région parisienne et dans les internats.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-specialise-educatrice-specialisee",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/educateur-specialise-educatrice-specialisee",
  },
  {
    id: "commissaire-police",
    name: "Commissaire de police",
    famille: 3,
    pitch:
      "Dirige un commissariat ou un service, encadre les officiers chargés des enquêtes et organise le maintien de l'ordre, d'une enquête à une grande manifestation.",
    etudes: "bac+7",
    routes: [
      {
        lane: "scpo",
        via: ["u-droit", "master-droit", "concours-etat", "metiers-defense"],
        texte:
          "Une licence puis un master, en droit de préférence, le concours national de commissaire, puis la formation à l'École nationale supérieure de la police.",
      },
    ],
    salaire: {
      debut: "À partir de 2 295 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/commissaire-de-police",
    },
    emploi: {
      texte: "Un concours national réputé sélectif, avec plusieurs dizaines de postes ouverts chaque année en externe.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/commissaire-de-police",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/commissaire-de-police",
  },
  {
    id: "gendarme",
    name: "Gendarme",
    famille: 3,
    pitch:
      "Toujours en uniforme, patrouille en voiture ou à moto, protège les habitants, constate les infractions, mène des enquêtes et porte secours.",
    etudes: "bac",
    routes: [
      {
        lane: "defense",
        via: ["metiers-defense"],
        texte:
          "Le bac, le concours de sous-officier de gendarmerie, puis au moins douze mois de formation en école ; le concours de gendarme adjoint volontaire est ouvert à tous les niveaux.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois hors primes en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/gendarme",
    },
    emploi: {
      texte: "La Gendarmerie nationale offre de nombreuses opportunités, avec 12 000 recrutements chaque année.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/gendarme",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/gendarme",
  },
  {
    id: "medecin-militaire",
    name: "Médecin militaire",
    famille: 3,
    pitch:
      "Soigne les militaires et leurs familles, les accompagne en opération, en mer ou en vol, et porte secours aux blessés au plus près du terrain.",
    etudes: "bac+10",
    routes: [
      {
        lane: "defense",
        via: ["ecole-officiers", "etudes-sante", "internat", "metiers-sante"],
        texte:
          "Admis par concours à l'École de santé des armées, à Bron près de Lyon, l'élève officier suit les études de médecine, puis l'internat.",
      },
    ],
  },
  {
    id: "officier-armee-terre",
    name: "Officier de l'armée de Terre",
    famille: 3,
    pitch:
      "Commande une unité de combat dès la sortie d'école : il entraîne ses soldats, prépare les missions et les conduit sur le terrain, en France comme à l'étranger.",
    etudes: "bac+5",
    routes: [
      {
        lane: "defense",
        via: ["prepa-officiers", "concours-officiers", "ecole-officiers", "metiers-defense"],
        texte:
          "Deux ans de prépa scientifique, économique ou littéraire, le concours de Saint-Cyr, puis trois ans à l'École spéciale militaire de Saint-Cyr Coëtquidan.",
      },
      {
        lane: "u",
        via: ["universite", "metiers-defense"],
        texte:
          "Avec une licence, on devient officier sous contrat après trois à cinq mois de formation à Saint-Cyr, puis un an en école de spécialité.",
      },
    ],
    salaire: {
      debut: "À partir de 1 944 € bruts par mois hors primes pour un sous-lieutenant, et de 2 117 € pour un lieutenant",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-l-armee-de-terre",
    },
    emploi: {
      texte:
        "Recrutement chaque année par concours après une prépa, sur titre après un master, ou comme officier sous contrat après une licence.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-l-armee-de-terre",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-l-armee-de-terre",
  },
  {
    id: "officier-marine",
    name: "Officier de marine",
    famille: 3,
    pitch:
      "Dirige une équipe à bord d'un navire ou d'un sous-marin, à la navigation, aux armes ou aux machines, au fil de missions qui l'emmènent sur toutes les mers.",
    etudes: "bac+5",
    routes: [
      {
        lane: "defense",
        via: ["prepa-officiers", "concours-officiers", "ecole-officiers", "metiers-defense"],
        texte:
          "Deux ans de prépa scientifique (MP, PC ou PSI), le concours de l'École navale, puis trois ans d'école à Brest.",
      },
      {
        lane: "u",
        via: ["universite", "metiers-defense"],
        texte: "Avec une licence, on peut entrer comme officier sous contrat, sur dossier et entretien.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois hors primes en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-la-marine-nationale",
    },
    emploi: {
      texte:
        "La Marine nationale compte environ un officier pour dix marins ; les officiers de carrière peuvent accéder aux plus hautes responsabilités.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-la-marine-nationale",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-la-marine-nationale",
  },
  {
    id: "pilote-chasse",
    name: "Pilote de chasse",
    famille: 3,
    pitch:
      "Consacre l'essentiel de son temps à l'entraînement et vole en moyenne trois fois par semaine, pour des missions de défense aérienne, de reconnaissance ou d'appui au sol.",
    etudes: "bac+3",
    routes: [
      {
        lane: "defense",
        via: ["prepa-officiers", "concours-officiers", "ecole-officiers", "metiers-defense"],
        texte:
          "Deux ans de prépa scientifique, le concours de l'École de l'air et de l'espace, à Salon-de-Provence, puis la formation au pilotage.",
      },
      {
        lane: "u",
        via: ["universite", "metiers-defense"],
        texte:
          "Avec une licence, des tests d'entrée ouvrent 12 semaines de formation militaire à Salon-de-Provence, puis trois ans de formation de pilote.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois hors primes, au grade de sous-lieutenant",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-l-armee-de-l-air",
    },
    emploi: {
      texte:
        "Le concours de l'École de l'air et de l'espace offre chaque année une centaine de places aux futurs officiers de carrière.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-l-armee-de-l-air",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/pilote-de-chasse",
  },
  {
    id: "gardien-de-la-paix",
    name: "Policier (gardien de la paix)",
    famille: 3,
    pitch:
      "Surveille les rues à pied, à vélo ou en voiture, intervient sur les appels d'urgence, interpelle les auteurs d'infractions et accueille les victimes.",
    etudes: "bac",
    routes: [
      {
        lane: "defense",
        via: ["metiers-defense"],
        texte:
          "Le bac, le concours de gardien de la paix, puis douze mois en école nationale de police et douze mois de stage.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois hors primes en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/gardien-gardienne-de-la-paix",
    },
    emploi: {
      texte:
        "Les gardiens de la paix forment les deux tiers de la Police nationale ; en 2026, la session de mars du concours externe compte 752 admis.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/gardien-gardienne-de-la-paix",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/gardien-gardienne-de-la-paix",
  },
  {
    id: "sapeur-pompier",
    name: "Sapeur-pompier",
    famille: 3,
    pitch:
      "Porte secours aux blessés et aux malades, combat les incendies, intervient sur les accidents et les catastrophes : chaque journée est différente.",
    etudes: "brevet, dès 18 ans",
    routes: [
      {
        lane: "defense",
        via: ["metiers-defense"],
        texte:
          "Le concours externe de caporal, ouvert dès 18 ans avec le brevet ou un CAP ; trois ans de volontariat ouvrent aussi le grade de sapeur.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-defense"],
        texte:
          "Avec un bac+2, le concours de lieutenant de sapeurs-pompiers, puis une formation à l'École nationale supérieure des officiers de sapeurs-pompiers.",
      },
    ],
    salaire: {
      debut: "À partir de 1 888 € bruts par mois hors primes en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/sapeur-pompier-sapeuse-pompiere",
    },
    emploi: {
      texte:
        "Les sapeurs-pompiers professionnels sont recrutés sur concours, avec un nombre de postes limité chaque année.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/sapeur-pompier-sapeuse-pompiere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/sapeur-pompier-sapeuse-pompiere",
  },
  {
    id: "militaire-du-rang",
    name: "Soldat (militaire du rang)",
    famille: 3,
    pitch:
      "S'entraîne chaque jour dans son régiment et part en mission, comme combattant ou dans une spécialité : conduite, maintenance des matériels, transmissions, logistique.",
    etudes: "niveau 3e, dès 17 ans et demi",
    routes: [
      {
        lane: "defense",
        via: ["metiers-defense"],
        texte:
          "Un engagement dès 17 ans et demi, pour un contrat de 2 à 10 ans, puis quatre à six mois de formation militaire avant de rejoindre un régiment.",
      },
    ],
    salaire: {
      debut: "1 532 € bruts par mois en début de carrière, logé et nourri",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/militaire-du-rang-de-l-armee-de-terre",
    },
    emploi: {
      texte:
        "L'armée de Terre recrute en permanence, et plus de la moitié des sous-officiers sont d'anciens militaires du rang.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/militaire-du-rang-de-l-armee-de-terre",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/militaire-du-rang-de-l-armee-de-terre",
  },
  {
    id: "sous-officier-armee-terre",
    name: "Sous-officier de l'armée de Terre",
    famille: 3,
    pitch:
      "Commande un groupe de soldats, l'instruit et l'entraîne, ou exerce une spécialité technique : mécanique, transmissions, renseignement, logistique.",
    etudes: "bac",
    routes: [
      {
        lane: "defense",
        via: ["metiers-defense"],
        texte:
          "Après le bac, entre 17 ans et demi et 25 ans, huit mois à l'École nationale des sous-officiers d'active de Saint-Maixent, puis une école de spécialité.",
      },
      {
        lane: "defense",
        via: ["lycee-defense", "metiers-defense"],
        texte:
          "L'École militaire préparatoire technique accueille dès 16 ans pour préparer un bac technologique ou professionnel.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/sous-officier-sous-officiere-de-l-armee-de-terre",
    },
    emploi: {
      texte:
        "42 % des sous-officiers viennent directement du civil, les autres du rang ; certains accèdent ensuite aux grades d'officier.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/sous-officier-sous-officiere-de-l-armee-de-terre",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/sous-officier-sous-officiere-de-l-armee-de-terre",
  },
  {
    id: "agriculteur",
    name: "Agriculteur",
    famille: 4,
    pitch:
      "Cultive des céréales ou des légumes, élève des animaux au rythme des saisons, conduit ses machines, gère son exploitation et vend sa production.",
    etudes: "bac pro",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le bac pro conduite et gestion de l'entreprise agricole, en trois ans, ouvre droit aux aides à l'installation.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Après le bac, un BTSA en deux ans, par exemple agronomie et cultures durables.",
      },
    ],
    emploi: {
      texte: "L'un des métiers qui recrutent le plus : 82 000 projets de recrutement d'agriculteurs en 2026.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/agriculteur-agricultrice",
  },
  {
    id: "charge-etudes-naturalistes",
    name: "Chargé d'études naturalistes",
    famille: 4,
    pitch:
      "Inventorie la faune et la flore sur le terrain, puis analyse les données au bureau pour évaluer l'impact d'un projet ou protéger un milieu naturel.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte:
          "Une licence de sciences de la vie, puis un master en biodiversité, écologie ou sciences de l'environnement.",
      },
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte: "Ou une prépa BCPST, puis une école d'ingénieurs agronomes.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois dans une association, et de 1 944 € comme ingénieur territorial",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/charge-chargee-d-etudes-naturalistes",
    },
    emploi: {
      texte:
        "Les collectivités recrutent sur concours, et des postes existent aussi dans le secteur privé ; on peut évoluer vers un poste de chargé de mission.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/charge-chargee-d-etudes-naturalistes",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/charge-chargee-d-etudes-naturalistes",
  },
  {
    id: "expert-bilan-carbone",
    name: "Expert bilan carbone",
    famille: 4,
    pitch:
      "Mesure les émissions de gaz à effet de serre d'une entreprise ou d'une ville, puis propose un plan d'action pour les réduire.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Le plus souvent un diplôme d'ingénieur, complété par une formation courte à l'Institut de formation carbone.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs en cinq ans dès le bac, avec une spécialité énergie ou environnement.",
      },
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte: "Ou une licence, puis un master en économie de l'environnement, de l'énergie et des transports.",
      },
    ],
    salaire: {
      debut: "À partir de 2 500 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-experte-bilan-carbone",
    },
    emploi: {
      texte:
        "Un métier en pleine croissance : la réglementation impose un diagnostic carbone aux structures de plus de 500 salariés et aux villes de plus de 50 000 habitants.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-experte-bilan-carbone",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-experte-bilan-carbone",
  },
  {
    id: "garde-nature",
    name: "Garde nature (parc national, littoral, rivière)",
    famille: 4,
    pitch:
      "Surveille un espace naturel, suit la faune et la flore, informe les visiteurs et constate les infractions aux règles de chasse, de pêche ou de protection.",
    etudes: "CAP + 1 an",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le bac pro gestion des milieux naturels et de la faune, en trois ans après la 3e, puis un concours de la fonction publique.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Après le bac, un BTSA gestion et protection de la nature, ou gestion et maîtrise de l'eau, en deux ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/garde-chasse-peche-littoral-riviere-parcs-nationaux",
    },
    emploi: {
      texte:
        "Le garde est le plus souvent fonctionnaire, recruté sur concours avec des places restreintes ; le secteur privé offre d'autres possibilités.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/garde-chasse-peche-littoral-riviere-parcs-nationaux",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/garde-chasse-peche-littoral-riviere-parcs-nationaux",
  },
  {
    id: "ingenieur-agronome",
    name: "Ingénieur agronome",
    famille: 4,
    pitch:
      "Conseille les agriculteurs, mène des essais sur les cultures et les sols, et cherche des façons de mieux produire en préservant l'environnement.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte: "Deux ans de prépa BCPST, les concours, puis trois ans dans une école d'ingénieurs agronomes.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Certaines écoles d'agronomie, publiques ou privées, recrutent dès le bac pour cinq ans.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte: "Une licence de biologie, puis un master en agrosciences.",
      },
    ],
    salaire: {
      debut: "De 2 800 à 3 300 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/agronome",
    },
    emploi: {
      texte:
        "Les PME recrutent le plus, surtout des débutants ; environ 30 % des agronomes travaillent dans le conseil et la recherche.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/agronome",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/agronome",
  },
  {
    id: "jardinier-paysagiste",
    name: "Jardinier paysagiste",
    famille: 4,
    pitch:
      "Crée et entretient parcs, jardins et espaces verts : plantations, tonte, taille, arrosage et petite maçonnerie, le plus souvent dehors et par tous les temps.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Un CAP agricole jardinier paysagiste en deux ans après la 3e, ou le bac pro aménagements paysagers en trois ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ouvrier-ouvriere-paysagiste",
    },
    emploi: {
      texte:
        "Le secteur du paysage embauche en continu ; avec un bac pro et de l'expérience, on devient chef d'équipe.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ouvrier-ouvriere-paysagiste",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/ouvrier-ouvriere-paysagiste",
  },
  {
    id: "soigneur-animalier",
    name: "Soigneur animalier",
    famille: 4,
    pitch:
      "Prépare et distribue les repas des animaux à heures fixes, nettoie les enclos, surveille leur santé et veille à leur bien-être.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Une formation spécialisée après un CAP au minimum, avec une première expérience au contact des animaux.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois, au niveau du Smic en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/soigneur-soigneuse-d-animaux",
    },
    emploi: {
      texte: "Un métier très convoité : les parcs zoologiques recrutent 5 à 6 soigneurs par an.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/soigneur-soigneuse-d-animaux",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/soigneur-soigneuse-d-animaux",
  },
  {
    id: "technicien-riviere",
    name: "Technicien de rivière",
    famille: 4,
    pitch:
      "Entretient et surveille les cours d'eau et les zones humides : berges, plantations, petits ouvrages, en lien avec les communes et les riverains.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Un BTSA gestion et maîtrise de l'eau ou gestion et protection de la nature, ou un BTS métiers de l'eau, en deux ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Puis, en un an, une licence professionnelle de protection et de gestion de l'environnement.",
      },
    ],
    salaire: {
      debut: "À partir de 1 878 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-riviere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-riviere",
  },
  {
    id: "technicien-forestier",
    name: "Technicien forestier",
    famille: 4,
    pitch:
      "Surveille et gère la forêt avec les ingénieurs forestiers : il désigne les arbres à couper, organise les chantiers et veille à la santé des peuplements.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Le BTSA gestion forestière, en deux ans après le bac, le diplôme le plus demandé.",
      },
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Le bac pro forêt, ou gestion des milieux naturels et de la faune, en trois ans après la 3e.",
      },
    ],
    salaire: {
      debut: "À partir de 2 000 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-forestier-technicienne-forestiere",
    },
    emploi: {
      texte:
        "Des techniciens forestiers sont recrutés chaque année, partout en France ; l'expérience ouvre les postes de responsable d'unité ou de conducteur de travaux.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-forestier-technicienne-forestiere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-forestier-technicienne-forestiere",
  },
  {
    id: "viticulteur",
    name: "Viticulteur",
    famille: 4,
    pitch:
      "Taille et soigne la vigne, organise les vendanges, élabore son vin au chai, puis le vend et accueille ses clients.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Un CAP agricole en deux ans, ou le bac pro conduite et gestion de l'entreprise vitivinicole en trois ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Après le bac, le BTSA viticulture-œnologie en deux ans, éventuellement complété par une licence professionnelle.",
      },
    ],
    emploi: {
      texte:
        "L'un des métiers qui recrutent le plus : 83 800 projets de recrutement de viticulteurs et d'arboriculteurs en 2026.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/viticulteur-viticultrice",
  },
  {
    id: "architecte-interieur",
    name: "Architecte d'intérieur",
    famille: 5,
    pitch:
      "Réaménage logements, boutiques ou bureaux : il dessine les plans, choisit matériaux et couleurs, puis suit les travaux sur place.",
    etudes: "bac+4",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte:
          "Un diplôme supérieur d'arts appliqués en quatre ans après le bac, ou cinq ans dans une école comme l'Ensad ou Camondo.",
      },
    ],
    salaire: {
      debut: "À partir de 2 300 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/architecte-d-interieur",
    },
    emploi: {
      texte:
        "Le métier s'exerce en libéral, en société ou comme salarié d'une agence, et peut évoluer vers la scénographie.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/architecte-d-interieur",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/architecte-d-interieur",
  },
  {
    id: "boulanger",
    name: "Boulanger",
    famille: 5,
    pitch:
      "Commence vers 4 h du matin : pétrit, façonne et cuit pains et viennoiseries pour qu'ils soient prêts à l'ouverture de la boutique.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le CAP boulanger en deux ans, le plus souvent en apprentissage, ou le bac pro boulangerie-pâtisserie en trois ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/boulanger-boulangere",
    },
    emploi: {
      texte:
        "Avec 35 000 boulangeries et de nombreux départs à la retraite, les offres d'emploi sont permanentes ; un ouvrier expérimenté peut s'installer à son compte.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/boulanger-boulangere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/boulanger-boulangere",
  },
  {
    id: "conducteur-travaux",
    name: "Conducteur de travaux",
    famille: 5,
    pitch:
      "Coordonne et dirige un chantier de construction : il organise les équipes, commande les matériaux, tient le budget et les délais.",
    etudes: "bac+3 à bac+5",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un BTS ou un BUT du bâtiment, puis une licence professionnelle du BTP.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs en cinq ans dès le bac, orientée bâtiment ou travaux publics.",
      },
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte: "Deux ans de prépa scientifique, puis une école d'ingénieurs du BTP.",
      },
    ],
    salaire: {
      debut: "À partir de 2 750 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conducteur-conductrice-de-travaux",
    },
    emploi: {
      texte:
        "Les grands projets de construction urbaine entretiennent la demande, et le profil reste recherché ; après une dizaine d'années, on peut devenir directeur de travaux.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conducteur-conductrice-de-travaux",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/conducteur-conductrice-de-travaux",
  },
  {
    id: "cuisinier",
    name: "Cuisinier",
    famille: 5,
    pitch:
      "Réceptionne les produits, prépare, cuit et dresse les plats en brigade, au rythme du service ; on commence commis avant de devenir chef.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Le CAP cuisine en deux ans, ou le bac pro métiers de la restauration, option cuisine, en trois ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Après le bac, le BTS management en hôtellerie-restauration, option cuisine, en deux ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois comme commis de cuisine",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/commis-commise-de-cuisine",
    },
    emploi: {
      texte:
        "L'un des métiers qui recrutent le plus : 51 600 projets de recrutement de cuisiniers en 2026, dont 57,6 % jugés difficiles.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-de-cuisine-cheffe-de-cuisine",
  },
  {
    id: "macon",
    name: "Maçon",
    famille: 5,
    pitch:
      "Monte les murs, coule les fondations et les dalles, pose les parpaings et les briques, souvent en hauteur sur les échafaudages.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le CAP maçon en deux ans, éventuellement complété par un brevet professionnel, ou le bac pro interventions sur le patrimoine bâti, option maçonnerie.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/macon-maconne",
    },
    emploi: {
      texte:
        "Métier en tension : en 2026, les employeurs jugent difficiles 70,5 % de leurs recrutements de maçons qualifiés.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/macon-maconne",
  },
  {
    id: "menuisier",
    name: "Menuisier",
    famille: 5,
    pitch:
      "Prépare portes, fenêtres, escaliers ou meubles dans son atelier, puis les pose sur le chantier, en bois, en aluminium ou en verre.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Un CAP menuisier installateur, fabricant ou aluminium-verre en deux ans, ou le bac pro technicien menuisier-agenceur en trois ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/menuisier-menuisiere",
    },
    emploi: {
      texte:
        "Métier en tension : en 2026, les employeurs jugent difficiles 71,2 % de leurs recrutements d'ouvriers qualifiés en menuiserie et agencement.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/menuisier-menuisiere",
  },
  {
    id: "mecanicien-automobile",
    name: "Mécanicien automobile",
    famille: 5,
    pitch:
      "Cherche l'origine d'une panne grâce aux outils de diagnostic électronique, puis répare et entretient voitures et utilitaires.",
    etudes: "bac pro",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Le bac pro maintenance des véhicules, en trois ans après la 3e.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Après le bac, le BTS maintenance des véhicules en deux ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-automobile",
    },
    emploi: {
      texte:
        "Métier en tension : en 2026, les employeurs jugent difficiles 72,4 % de leurs recrutements de mécaniciens de véhicules.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-automobile",
  },
  {
    id: "plombier-chauffagiste",
    name: "Plombier-chauffagiste",
    famille: 5,
    pitch:
      "Installe et répare canalisations, sanitaires, chauffe-eau, radiateurs et pompes à chaleur, en rénovation comme en construction neuve.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le CAP monteur en installations sanitaires en deux ans, ou le bac pro installateur en chauffage, climatisation et énergies renouvelables en trois ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/plombier-plombiere",
    },
    emploi: {
      texte:
        "Les chantiers abondent, en rénovation comme en neuf, et les employeurs apprécient particulièrement les profils formés à la fois en plomberie et en chauffage.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/plombier-plombiere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/plombier-plombiere",
  },
  {
    id: "patissier",
    name: "Pâtissier",
    famille: 5,
    pitch:
      "Prépare dès l'aube pâtes, crèmes et décors, puis réalise gâteaux, entremets et chocolats, en boutique, en restaurant ou chez un traiteur.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Le CAP pâtissier en deux ans, ou le bac pro boulangerie-pâtisserie, option pâtisserie, en trois ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Après le bac, le brevet technique des métiers pâtissier-confiseur-glacier-traiteur en deux ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/patissier-patissiere",
    },
    emploi: {
      texte: "La pâtisserie recrute en continu, d'abord dans les très nombreuses boulangeries-pâtisseries du pays.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/patissier-patissiere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/patissier-patissiere",
  },
  {
    id: "soudeur",
    name: "Soudeur",
    famille: 5,
    pitch:
      "Assemble des pièces de métal par fusion, pour des cuves, des charpentes, des navires ou des canalisations, en atelier ou sur chantier.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le CAP métallier en deux ans, ou le bac pro technicien en chaudronnerie industrielle en trois ans ; après le bac, un certificat de spécialisation en soudage, en un an.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/soudeur-soudeuse",
    },
    emploi: {
      texte: "Métier en tension : en 2026, les employeurs jugent difficiles 71,3 % de leurs recrutements de soudeurs.",
      source: "https://www.francetravail.fr/candidat/decouvrir-le-marche-du-travail/besoins-en-main-doeuvre.html",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/soudeur-soudeuse",
  },
  {
    id: "technicien-maintenance-industrielle",
    name: "Technicien de maintenance industrielle",
    famille: 5,
    pitch:
      "Entretient et répare les machines d'une usine, planifie les interventions et cherche à éviter les pannes avant qu'elles arrivent.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Un BTS maintenance des systèmes, électrotechnique ou CRSA en deux ans, ou un BUT génie industriel et maintenance en trois ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Après un bac+2, une licence professionnelle de maintenance en un an.",
      },
    ],
    salaire: {
      debut: "À partir de 2 000 € bruts par mois hors primes en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-maintenance-industrielle",
    },
    emploi: {
      texte: "Toutes les industries recherchent des professionnels de la maintenance, sur un marché en tension.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-maintenance-industrielle",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-de-maintenance-industrielle",
  },
  {
    id: "electricien",
    name: "Électricien",
    famille: 5,
    pitch:
      "Étudie les plans, tire les câbles, pose tableaux, prises et éclairages, puis met en service et dépanne les installations, de la maison à l'usine.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le CAP électricien en deux ans, ou le bac pro métiers de l'électricité et de ses environnements connectés en trois ans.",
      },
    ],
    salaire: {
      debut: "De 1 867 à 2 500 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/electricien-installateur-electricienne-installatrice",
    },
    emploi: {
      texte:
        "Les innovations techniques créent de nouveaux débouchés ; avec l'expérience, on devient chef d'équipe, puis chef de chantier.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/electricien-installateur-electricienne-installatrice",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/electricien-installateur-electricienne-installatrice",
  },
  {
    id: "auditeur",
    name: "Auditeur financier",
    famille: 6,
    pitch:
      "Envoyé par un cabinet, il examine les comptes d'une entreprise cliente, vérifie qu'ils donnent une image fidèle de sa situation et propose des améliorations.",
    etudes: "bac+5",
    routes: [
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une prépa ECG, puis une grande école de commerce avec une spécialité audit et contrôle.",
      },
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte:
          "Une licence de gestion, puis un master comptabilité-contrôle-audit : un tiers des recrues des grands cabinets viennent de l'université.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de commerce post-bac en cinq ans, avec une majeure audit ou finance.",
      },
    ],
    salaire: {
      debut: "2 660 à 3 300 € bruts par mois en début de carrière, hors primes",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/auditeur-auditrice-externe",
    },
    emploi: {
      texte:
        "Les grands cabinets recrutent chaque année des centaines de diplômés de bac+5, parfois en alternance, et le renouvellement des équipes multiplie les embauches.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/auditeur-auditrice-externe",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/auditeur-auditrice-externe",
  },
  {
    id: "charge-clientele-banque",
    name: "Chargé de clientèle en banque",
    famille: 6,
    pitch:
      "En agence, il suit les comptes de ses clients, particuliers ou professionnels, et leur propose crédits, épargne et assurances adaptés à leurs projets.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Un BTS banque en deux ans, souvent en alternance, ou un BUT gestion ou commercial en trois ans ; une licence pro peut compléter le BTS.",
      },
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte:
          "Une licence d'économie-gestion, puis un master monnaie, banque, finance, assurance, pour conseiller les professionnels ou gérer un patrimoine.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de commerce post-bac en cinq ans, avec une majeure banque ou finance.",
      },
    ],
    salaire: {
      debut:
        "À partir de 1 867 € bruts par mois en début de carrière, plus des primes quand les objectifs commerciaux sont atteints",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/charge-chargee-de-clientele-banque",
    },
    emploi: {
      texte:
        "La demande se stabilise après la vague du numérique, et la relation client représente plus de la moitié des embauches en CDI des banques.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/charge-chargee-de-clientele-banque",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/charge-chargee-de-clientele-banque",
  },
  {
    id: "chef-de-produit",
    name: "Chef de produit marketing",
    famille: 6,
    pitch:
      "Il pilote une gamme de produits, de l'étude de marché au lancement en magasin, en passant par le prix, l'emballage et la publicité.",
    etudes: "bac+5",
    routes: [
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une prépa ECG, puis une grande école de commerce avec une spécialité marketing.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de commerce post-bac en cinq ans, avec des stages en marketing.",
      },
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte: "Une licence d'économie-gestion, puis un master marketing, vente.",
      },
    ],
    salaire: {
      debut: "2 666 à 2 920 € bruts par mois en début de carrière, selon le secteur",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-produit-marketing-mercatique",
    },
    emploi: {
      texte:
        "Les services marketing recrutent volontiers des jeunes ; le poste s'obtient souvent par promotion interne, et 15 à 20 % des offres visent des débutants.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-produit-marketing-mercatique",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-produit-marketing-mercatique",
  },
  {
    id: "commercial-export",
    name: "Commercial export",
    famille: 6,
    pitch:
      "Il voyage pour trouver de nouveaux clients à l'étranger, négocie les contrats et développe les ventes de son entreprise sur une zone du monde.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Un BTS commerce international en deux ans, ou un BUT techniques de commercialisation, parcours business international, en trois ans.",
      },
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte:
          "Une prépa ECG, puis une grande école de commerce : les grandes entreprises préfèrent les diplômés de bac+5.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de commerce post-bac en cinq ans, avec des semestres et des stages à l'étranger.",
      },
    ],
    salaire: {
      debut: "2 666 à 2 900 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/commercial-commerciale-export",
    },
    emploi: {
      texte:
        "Environ 3 000 postes se libèrent chaque année ; les PME qui exportent recrutent, et les jeunes diplômés débutent souvent comme assistants export en France.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/commercial-commerciale-export",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/commercial-commerciale-export",
  },
  {
    id: "comptable",
    name: "Comptable",
    famille: 6,
    pitch:
      "Il enregistre les factures, les paies et les dépenses d'une entreprise ou d'une association, et prépare les déclarations et les bilans.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Un BTS comptabilité et gestion en deux ans, souvent en alternance, complété si l'on veut par une licence pro ; ou un BUT GEA en trois ans.",
      },
      {
        lane: "u",
        via: ["u-eco", "metiers-u"],
        texte: "Une licence de gestion ou d'économie-gestion, en trois ans.",
      },
    ],
    salaire: {
      debut: "À partir de 2 400 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/comptable",
    },
    emploi: {
      texte:
        "Toute entreprise, administration ou association doit tenir ses comptes : les comptables travaillent partout, et les profils expérimentés sont très recherchés.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/comptable",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/comptable",
  },
  {
    id: "controleur-de-gestion",
    name: "Contrôleur de gestion",
    famille: 6,
    pitch:
      "Il construit les budgets de l'entreprise, suit chaque mois les coûts et les résultats, et propose à la direction des pistes pour gagner en efficacité.",
    etudes: "bac+5",
    routes: [
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une prépa ECG, puis une grande école de commerce avec une spécialité finance ou contrôle de gestion.",
      },
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte:
          "Une licence d'économie-gestion, puis un master de contrôle de gestion ou de comptabilité-contrôle-audit.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de commerce post-bac en cinq ans, avec une majeure finance.",
      },
    ],
    salaire: {
      debut: "2 750 à 3 500 € bruts par mois en début de carrière, hors primes",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/controleur-controleuse-de-gestion",
    },
    emploi: {
      texte:
        "Une valeur sûre de l'emploi : on peut être recruté dès la fin des études, et une première expérience en cabinet d'audit est un atout.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/controleur-controleuse-de-gestion",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/controleur-controleuse-de-gestion",
  },
  {
    id: "expert-comptable",
    name: "Expert-comptable",
    famille: 6,
    pitch:
      "Il tient ou vérifie les comptes de ses entreprises clientes et les conseille sur leurs impôts, leur gestion et leurs projets.",
    etudes: "bac+8",
    routes: [
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte:
          "Une licence de gestion puis un master comptabilité-contrôle-audit, ou le DCG puis le DSCG, suivis de trois ans de stage rémunéré et du diplôme d'expertise comptable.",
      },
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte:
          "Une grande école de commerce avec une filière audit et expertise, puis le DSCG, le stage de trois ans et le diplôme d'expertise comptable.",
      },
    ],
    salaire: {
      debut: "À partir de 4 100 € bruts par mois une fois diplômé",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-comptable-experte-comptable",
    },
    emploi: {
      texte:
        "Le secteur accueille volontiers les jeunes diplômés, surtout à bac+5, et offre de belles carrières en cabinet, jusqu'à devenir associé.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-comptable-experte-comptable",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/expert-comptable-experte-comptable",
  },
  {
    id: "responsable-rh",
    name: "Responsable des ressources humaines",
    famille: 6,
    pitch:
      "Il organise le recrutement, la formation, les salaires et le dialogue avec les représentants du personnel, pour que chacun trouve sa place dans l'entreprise.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-droit", "u-master", "metiers-u"],
        texte:
          "Une licence de droit, d'économie-gestion ou de psychologie, puis un master ressources humaines ou droit social.",
      },
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une prépa ECG, puis une grande école de commerce avec une spécialité ressources humaines.",
      },
      {
        lane: "scpo",
        via: ["sciences-po", "metiers-scpo"],
        texte: "Un diplôme de Sciences Po ou d'un IEP, complété par une première expérience en recrutement.",
      },
    ],
    salaire: {
      debut: "À partir de 2 900 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/responsable-des-ressources-humaines",
    },
    emploi: {
      texte:
        "Chaque équipe RH compte un seul responsable : le poste s'obtient le plus souvent après une première expérience en recrutement ou en gestion du personnel.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/responsable-des-ressources-humaines",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/responsable-des-ressources-humaines",
  },
  {
    id: "technicien-logistique",
    name: "Technicien logistique",
    famille: 6,
    pitch:
      "Dans un entrepôt, il organise et contrôle les entrées et les sorties de marchandises, pour garder juste ce qu'il faut en stock.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Un BTS gestion des transports et logistique associée en deux ans, complété si l'on veut par une licence pro, ou un BUT management de la logistique et des transports en trois ans.",
      },
    ],
    salaire: {
      debut: "2 100 à 2 500 € bruts par mois en début de carrière, hors primes",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-logistique",
    },
    emploi: {
      texte:
        "Tous les secteurs l'emploient : transport, distribution, agroalimentaire, aéronautique, automobile, pharmacie ; après quelques années, il peut diriger un site logistique.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-logistique",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/technicien-technicienne-logistique",
  },
  {
    id: "trader",
    name: "Trader",
    famille: 6,
    pitch:
      "Dans une salle de marché, il achète et vend des actions, des devises ou des matières premières pour sa banque ou ses clients, en surveillant les cours seconde après seconde.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Une prépa scientifique, puis une école d'ingénieurs en mathématiques appliquées ou en statistique, comme les Ponts ou l'ENSAE.",
      },
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une prépa ECG, puis une grande école de commerce avec une majeure finance de marché.",
      },
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte: "Une licence d'économie ou de mathématiques, puis un master de finance ou un magistère banque-finance.",
      },
    ],
    salaire: {
      debut: "2 600 à 3 750 € bruts par mois en début de carrière, plus des primes selon les résultats",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/trader-operateur-operatrice-de-marche",
    },
    emploi: {
      texte:
        "Un petit milieu où les stages ouvrent la porte : les sociétés de bourse et les banques dotées d'une salle de marché recrutent, et la bourse en ligne crée de nouvelles places.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/trader-operateur-operatrice-de-marche",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/trader-operateur-operatrice-de-marche",
  },
  {
    id: "vendeur",
    name: "Vendeur en magasin",
    famille: 6,
    pitch:
      "En boutique ou en grande surface, il accueille les clients, les conseille, met en valeur les produits en rayon et conclut les ventes.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Un CAP équipier polyvalent du commerce en deux ans, ou un bac pro métiers du commerce et de la vente en trois ans, souvent en alternance.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Après le bac, un BTS management commercial opérationnel ou négociation et digitalisation de la relation client, pour viser un poste de responsable de rayon.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière, hors primes",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/vendeur-vendeuse-en-magasin",
    },
    emploi: {
      texte:
        "Près de 25 000 places s'ouvrent chaque année dans les boutiques et les grandes surfaces, souvent à temps partiel ou en CDD au départ ; une expérience réussie mène assez vite à un poste de chef d'équipe.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/vendeur-vendeuse-en-magasin",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/vendeur-vendeuse-en-magasin",
  },
  {
    id: "administrateur-territorial",
    name: "Administrateur territorial",
    famille: 7,
    pitch:
      "Haut fonctionnaire d'une région, d'un département ou d'une grande ville, il dirige des services et met en œuvre les politiques décidées par les élus.",
    etudes: "bac+3",
    routes: [
      {
        lane: "scpo",
        via: ["sciences-po", "concours-etat", "metiers-scpo"],
        texte:
          "Sciences Po ou un IEP, puis le concours d'administrateur territorial et dix-huit mois de formation rémunérée à l'INET, à Strasbourg.",
      },
      {
        lane: "u",
        via: ["u-droit", "u-master", "metiers-u"],
        texte:
          "Une licence de droit ou d'économie, souvent prolongée par un master, puis le concours et la formation de l'INET.",
      },
    ],
    salaire: {
      debut: "À partir de 2 160 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/administrateur-territorial-administratrice-territoriale",
    },
    emploi: {
      texte:
        "Il peut travailler dans des collectivités partout en France et en outre-mer ; avec l'expérience, il peut devenir directeur général des services.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/administrateur-territorial-administratrice-territoriale",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/administrateur-territorial-administratrice-territoriale",
  },
  {
    id: "attache-territorial",
    name: "Attaché territorial",
    famille: 7,
    pitch:
      "Cadre d'une mairie, d'un département ou d'une région, il prépare les décisions des élus, dirige un service et conduit des projets pour les habitants.",
    etudes: "bac+3",
    routes: [
      {
        lane: "u",
        via: ["u-droit", "metiers-u"],
        texte: "Une licence, de droit par exemple, puis le concours externe d'attaché territorial, de catégorie A.",
      },
      {
        lane: "scpo",
        via: ["sciences-po", "concours-etat", "metiers-scpo"],
        texte: "Un diplôme d'IEP, puis le concours externe d'attaché territorial.",
      },
    ],
    salaire: {
      debut: "À partir de 1 891 € bruts par mois, hors primes",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/attache-territorial-attachee-territoriale",
    },
    emploi: {
      texte:
        "Les départs à la retraite s'accélèrent et le nombre de places au concours augmente ; les lauréats disposent ensuite de trois ans pour se faire recruter sur un poste.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/attache-territorial-attachee-territoriale",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/attache-territorial-attachee-territoriale",
  },
  {
    id: "avocat",
    name: "Avocat",
    famille: 7,
    pitch:
      "Il conseille ses clients, particuliers ou entreprises, rédige des contrats et les défend devant les tribunaux, en cherchant aussi à régler les litiges à l'amiable.",
    etudes: "bac+7",
    routes: [
      {
        lane: "scpo",
        via: ["u-droit", "master-droit", "concours-etat", "metiers-scpo"],
        texte:
          "Une licence puis un master 2 de droit, l'examen d'entrée à l'école d'avocats (CRFPA), puis dix-huit mois d'école jusqu'au CAPA.",
      },
      {
        lane: "scpo",
        via: ["sciences-po", "concours-etat", "metiers-scpo"],
        texte: "Sciences Po ou un IEP, avec un master de droit, puis l'examen d'entrée à l'école d'avocats.",
      },
    ],
    emploi: {
      texte:
        "Les débuts demandent de faire ses preuves avant d'entrer dans un grand cabinet ; les avocats spécialisés en droit des affaires et en conseil aux entreprises sont particulièrement recherchés.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/avocat-avocate",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/avocat-avocate",
  },
  {
    id: "commissaire-de-justice",
    name: "Commissaire de justice",
    famille: 7,
    pitch:
      "Il remet les décisions de justice, récupère les impayés, dresse des constats et organise des ventes aux enchères, en toute impartialité.",
    etudes: "bac+7",
    routes: [
      {
        lane: "scpo",
        via: ["u-droit", "master-droit", "concours-etat", "metiers-scpo"],
        texte:
          "Une licence puis un master de droit, l'examen d'entrée à l'Institut national de formation des commissaires de justice, puis deux ans de formation.",
      },
    ],
    emploi: {
      texte:
        "La France compte 3 700 commissaires de justice ; reprendre une étude coûte cher, et beaucoup choisissent de s'associer à des confrères.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/commissaire-de-justice",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/commissaire-de-justice",
  },
  {
    id: "diplomate",
    name: "Diplomate",
    famille: 7,
    pitch:
      "En ambassade, en consulat ou au ministère des Affaires étrangères, il représente la France, négocie avec les autres pays et aide les Français de l'étranger.",
    etudes: "bac+5",
    routes: [
      {
        lane: "scpo",
        via: ["sciences-po", "concours-etat", "metiers-scpo"],
        texte:
          "Sciences Po ou un IEP, puis le concours de secrétaire des Affaires étrangères, ouvert dès bac+3, ou celui de l'INSP.",
      },
      {
        lane: "u",
        via: ["u-droit", "u-master", "metiers-u"],
        texte:
          "Une licence de droit, d'histoire ou de langues, un master de relations internationales et deux langues étrangères parfaitement maîtrisées, puis les concours du ministère.",
      },
    ],
    salaire: {
      debut: "À partir de 1 900 € bruts par mois pour un secrétaire des Affaires étrangères débutant",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/secretaire-des-affaires-etrangeres",
    },
    emploi: {
      texte:
        "Les concours du Quai d'Orsay sont très sélectifs, avec un petit nombre de postes chaque année ; ils ouvrent ensuite les postes en ambassade et en consulat.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/secretaire-des-affaires-etrangeres",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/diplomate",
  },
  {
    id: "greffier",
    name: "Greffier",
    famille: 7,
    pitch:
      "À l'audience, il prend note des débats, authentifie les décisions du juge et veille au respect de chaque étape de la procédure.",
    etudes: "bac+2",
    routes: [
      {
        lane: "u",
        via: ["u-droit", "metiers-u"],
        texte: "Deux ans de licence de droit, puis le concours de l'École nationale des greffes, à Dijon.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Un BUT carrières juridiques, puis le concours de l'École nationale des greffes.",
      },
    ],
    salaire: {
      debut: "À partir de 1 885 € bruts par mois, hors primes",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/greffier-greffiere",
    },
    emploi: {
      texte:
        "Les greffiers travaillent dans toutes les juridictions ; les greffes des services judiciaires comptent près de 22 000 fonctionnaires.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/greffier-greffiere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/greffier-greffiere",
  },
  {
    id: "inspecteur-finances-publiques",
    name: "Inspecteur des finances publiques",
    famille: 7,
    pitch:
      "Cadre de la direction des finances publiques, il contrôle les comptes et les impôts des entreprises, conseille les collectivités ou dirige une équipe.",
    etudes: "bac+3",
    routes: [
      {
        lane: "u",
        via: ["u-eco", "metiers-u"],
        texte:
          "Une licence d'économie, de gestion ou de droit, puis le concours externe d'inspecteur des finances publiques.",
      },
      {
        lane: "scpo",
        via: ["sciences-po", "concours-etat", "metiers-scpo"],
        texte: "Un diplôme d'IEP, puis le concours de catégorie A de la DGFiP.",
      },
    ],
    salaire: {
      debut: "À partir de 2 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/inspecteur-inspectrice-des-finances-publiques",
    },
    emploi: {
      texte:
        "La DGFiP recrute chaque année par concours, et l'expérience ouvre ensuite des postes d'encadrement supérieur.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/inspecteur-inspectrice-des-finances-publiques",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/inspecteur-inspectrice-des-finances-publiques",
  },
  {
    id: "juriste-entreprise",
    name: "Juriste d'entreprise",
    famille: 7,
    pitch:
      "Salarié d'une entreprise, il rédige et négocie les contrats, veille au respect de la loi et protège sa société en cas de litige.",
    etudes: "bac+5",
    routes: [
      {
        lane: "scpo",
        via: ["u-droit", "master-droit", "metiers-scpo"],
        texte:
          "Une licence puis un master de droit des affaires, fiscal ou social ; le DJCE ou un double cursus droit et commerce est un plus.",
      },
      {
        lane: "scpo",
        via: ["sciences-po", "metiers-scpo"],
        texte: "Un double cursus droit et Sciences Po, avec des stages en entreprise.",
      },
    ],
    salaire: {
      debut: "À partir de 3 300 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/juriste-d-entreprise",
    },
    emploi: {
      texte:
        "Plus de 15 000 juristes d'entreprise travaillent en France, surtout dans les sociétés de plus de 500 salariés et dans les administrations.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/juriste-d-entreprise",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/juriste-d-entreprise",
  },
  {
    id: "magistrat",
    name: "Magistrat",
    famille: 7,
    pitch:
      "Juge, il tranche les litiges et rend les décisions ; procureur, il dirige les enquêtes et défend l'intérêt de la société devant le tribunal.",
    etudes: "bac+7",
    routes: [
      {
        lane: "scpo",
        via: ["u-droit", "master-droit", "concours-etat", "metiers-scpo"],
        texte:
          "Une licence puis un master 1 de droit, une préparation en institut d'études judiciaires, le concours de l'École nationale de la magistrature, puis 31 mois de formation rémunérée à Bordeaux.",
      },
      {
        lane: "scpo",
        via: ["sciences-po", "concours-etat", "metiers-scpo"],
        texte: "Un diplôme d'IEP, puis le concours de l'École nationale de la magistrature.",
      },
    ],
    salaire: {
      debut: "À partir de 2 160 € bruts par mois en formation, puis 2 294 € au premier poste, hors primes",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/magistrat-magistrate",
    },
    emploi: {
      texte:
        "Un concours très sélectif, qui attire de nombreux candidats ; une fois en poste, les magistrats changent régulièrement de fonction au fil de leur carrière.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/magistrat-magistrate",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/magistrat-magistrate",
  },
  {
    id: "notaire",
    name: "Notaire",
    famille: 7,
    pitch:
      "Il rédige et authentifie les actes importants de la vie : achat d'une maison, contrat de mariage, succession, création d'entreprise.",
    etudes: "bac+7",
    routes: [
      {
        lane: "scpo",
        via: ["u-droit", "master-droit", "concours-etat", "metiers-scpo"],
        texte:
          "Une licence puis un master de droit notarial, et deux ans de plus pour le diplôme d'études supérieures du notariat.",
      },
    ],
    salaire: {
      debut: "À partir de 3 000 € bruts par mois pour un notaire salarié",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/notaire",
    },
    emploi: {
      texte:
        "Les besoins augmentent, surtout en banlieue et dans les villes nouvelles ; un jeune notaire peut débuter salarié ou s'installer à son compte.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/notaire",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/notaire",
  },
  {
    id: "archiviste",
    name: "Archiviste",
    famille: 8,
    pitch:
      "Il rassemble, classe et conserve les documents qui racontent l'histoire d'une ville, d'une entreprise ou d'une famille, et aide chercheurs et curieux à les consulter.",
    etudes: "bac+3",
    routes: [
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte:
          "Une licence d'histoire, puis un master archives ; les concours de la fonction publique territoriale ouvrent la plupart des postes.",
      },
      {
        lane: "lettres",
        via: ["khagne", "concours-lettres", "ens-chartes", "metiers-lettres"],
        texte: "Une prépa Chartes, puis l'École des chartes et le diplôme d'archiviste-paléographe.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/archiviste",
    },
    emploi: {
      texte:
        "Les collectivités emploient le plus d'archivistes, par des concours aux places comptées ; les grandes entreprises recrutent aussi, surtout en région parisienne.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/archiviste",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/archiviste",
  },
  {
    id: "bibliothecaire",
    name: "Bibliothécaire",
    famille: 8,
    pitch:
      "En médiathèque ou en bibliothèque universitaire, il choisit les livres et les ressources numériques, accueille le public et anime lectures, ateliers et expositions.",
    etudes: "bac",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Un BUT information-communication, parcours métiers du livre, puis un concours de la fonction publique.",
      },
      {
        lane: "u",
        via: ["u-lettres", "metiers-u"],
        texte: "Une licence de lettres ou d'histoire, puis un concours de bibliothécaire de catégorie B ou A.",
      },
    ],
    salaire: {
      debut: "1 919 à 1 950 € bruts par mois en début de carrière pour un agent de catégorie B, hors primes",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/responsable-d-equipe-ou-de-projet-en-bibliotheque-mediatheque",
    },
    emploi: {
      texte:
        "Le réseau est vaste : 15 500 médiathèques communales et intercommunales, environ 550 bibliothèques universitaires, la BnF et la Bpi.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/responsable-d-equipe-ou-de-projet-en-bibliotheque-mediatheque",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/responsable-d-equipe-ou-de-projet-en-bibliotheque-mediatheque",
  },
  {
    id: "conservateur-patrimoine",
    name: "Conservateur du patrimoine",
    famille: 8,
    pitch:
      "Dans un musée, un service d'archives ou de monuments historiques, il étudie, protège et fait connaître les œuvres pour les transmettre aux générations futures.",
    etudes: "bac+5",
    routes: [
      {
        lane: "lettres",
        via: ["khagne", "concours-lettres", "ens-chartes", "metiers-lettres"],
        texte: "Une prépa Chartes, puis l'École des chartes, avant le concours de l'Institut national du patrimoine.",
      },
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte:
          "Une licence d'histoire ou d'histoire de l'art, un master, puis le concours de l'Institut national du patrimoine et dix-huit mois de formation.",
      },
    ],
    salaire: {
      debut: "À partir de 2 240 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conservateur-conservatrice-du-patrimoine",
    },
    emploi: {
      texte:
        "Les places sont rares : on entre par un concours très sélectif de l'Institut national du patrimoine, et la spécialité musées offre le plus de postes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conservateur-conservatrice-du-patrimoine",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/conservateur-conservatrice-du-patrimoine",
  },
  {
    id: "enseignant-chercheur",
    name: "Enseignant-chercheur",
    famille: 8,
    pitch:
      "À l'université, il mène des recherches dans sa discipline, publie ses résultats et donne des cours aux étudiants, de la licence au doctorat.",
    etudes: "bac+8",
    routes: [
      {
        lane: "u",
        via: ["universite", "u-master", "doctorat", "metiers-u"],
        texte:
          "Une licence, un master, puis un doctorat en trois ans ; ensuite la qualification nationale et les concours de maître de conférences.",
      },
      {
        lane: "lettres",
        via: ["khagne", "concours-lettres", "ens-chartes", "metiers-lettres"],
        texte: "Une khâgne puis l'École normale supérieure, avec souvent l'agrégation, avant le doctorat.",
      },
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte: "Une prépa scientifique, une ENS ou une école d'ingénieurs, puis un doctorat.",
      },
    ],
    salaire: {
      debut: "2 333 à 5 594 € bruts par mois en début de poste, selon le statut",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/enseignant-chercheur-enseignante-chercheuse",
    },
    emploi: {
      texte:
        "Les départs à la retraite annoncent une hausse des recrutements, surtout pour enseigner les disciplines scientifiques.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/enseignant-chercheur-enseignante-chercheuse",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/enseignant-chercheur-enseignante-chercheuse",
  },
  {
    id: "formateur-adultes",
    name: "Formateur d'adultes",
    famille: 8,
    pitch:
      "Il conçoit et anime des formations pour des adultes qui veulent apprendre un nouveau métier ou mettre à jour leurs compétences.",
    etudes: "bac+3",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un BTS ou un BUT, puis une licence professionnelle en accompagnement de projets pédagogiques.",
      },
      {
        lane: "u",
        via: ["u-psycho", "u-master", "metiers-u"],
        texte:
          "Une licence de sciences de l'éducation ou de psychologie, puis un master consacré à l'ingénierie de la formation.",
      },
    ],
    salaire: {
      debut: "À partir de 1 868 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/formateur-formatrice-d-adultes",
    },
    emploi: {
      texte:
        "Un marché porteur, car chacun doit mettre à jour ses compétences ; les débuts se font souvent par vacations, qui permettent de se constituer un réseau.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/formateur-formatrice-d-adultes",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/formateur-formatrice-d-adultes",
  },
  {
    id: "guide-conferencier",
    name: "Guide-conférencier",
    famille: 8,
    pitch:
      "Dans un musée, un monument ou en circuit, il fait découvrir l'histoire et les œuvres à des groupes de visiteurs, souvent dans plusieurs langues.",
    etudes: "bac+3",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un BTS tourisme, puis la licence professionnelle guide-conférencier.",
      },
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte:
          "Une licence d'histoire, d'histoire de l'art ou de langues, puis la licence pro guide-conférencier ou un master qui inclut la formation de guide.",
      },
    ],
    salaire: {
      debut: "Variable : en moyenne 175 à 250 € bruts pour une visite d'une heure et demie",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/guide-conferencier-guide-conferenciere",
    },
    emploi: {
      texte:
        "La plupart travaillent en indépendant, à la prestation, avec une forte demande le week-end et l'été ; quelques postes salariés existent dans les musées et les offices de tourisme.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/guide-conferencier-guide-conferenciere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/guide-conferencier-guide-conferenciere",
  },
  {
    id: "professeur-college-lycee",
    name: "Professeur de collège et de lycée",
    famille: 8,
    pitch:
      "Spécialiste d'une matière, français, maths, histoire ou langues, il prépare ses cours, enseigne à plusieurs classes et accompagne ses élèves jusqu'au bac.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte:
          "Une licence de lettres, d'histoire ou de langues, le concours (CAPES) dès la 3e année, puis deux ans de master rémunéré.",
      },
      {
        lane: "u",
        via: ["u-sciences", "u-master", "metiers-u"],
        texte: "Une licence de mathématiques, de physique ou de biologie, puis le même concours et le master rémunéré.",
      },
      {
        lane: "lettres",
        via: ["khagne", "concours-lettres", "ens-chartes", "metiers-lettres"],
        texte: "Une khâgne, puis l'École normale supérieure et l'agrégation.",
      },
    ],
    salaire: {
      debut: "À partir de 2 171 € bruts par mois pour un professeur certifié, l'année de sa titularisation",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-professeure-de-college-et-de-lycee",
    },
    emploi: {
      texte:
        "Le ministère publie chaque année les postes ouverts aux concours ; ensuite, des promotions internes et des postes à l'étranger ou dans le supérieur s'ouvrent aux professeurs.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-professeure-de-college-et-de-lycee",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-professeure-de-college-et-de-lycee",
  },
  {
    id: "restaurateur-oeuvres-art",
    name: "Restaurateur d'œuvres d'art",
    famille: 8,
    pitch:
      "Dans son atelier, il nettoie, consolide et répare tableaux, sculptures, meubles ou livres anciens, avec des techniques respectueuses de leur histoire.",
    etudes: "bac+5",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte:
          "Un DN MADE mention patrimoine en trois ans pour une clientèle privée, ou l'une des quatre formations reconnues en cinq ans pour restaurer les collections des musées.",
      },
      {
        lane: "u",
        via: ["u-arts", "u-master", "metiers-u"],
        texte: "Une licence d'histoire de l'art, puis un master conservation-restauration des biens culturels.",
      },
    ],
    salaire: {
      debut: "Variable en indépendant ; à partir de 1 944 € bruts par mois dans la fonction publique",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/restaurateur-restauratrice-d-oeuvres-d-art",
    },
    emploi: {
      texte:
        "La plupart créent leur propre atelier ; environ 10 % sont salariés, et la peinture et la sculpture concentrent le plus de commandes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/restaurateur-restauratrice-d-oeuvres-d-art",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/restaurateur-restauratrice-d-oeuvres-d-art",
  },
  {
    id: "attache-de-presse",
    name: "Attaché de presse",
    famille: 9,
    pitch:
      "Il fait parler de son entreprise ou de son artiste dans les médias : communiqués, dossiers de presse, contacts avec les journalistes, interviews.",
    etudes: "bac+4",
    routes: [
      {
        lane: "scpo",
        via: ["sciences-po", "metiers-scpo"],
        texte: "Un diplôme d'IEP, avec des stages en agence ou en service de presse.",
      },
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte: "Une licence, puis un master de communication.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un BTS communication ou un BUT information-communication mène d'abord à un poste d'assistant.",
      },
    ],
    salaire: {
      debut: "À partir de 2 300 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/attache-attachee-de-presse",
    },
    emploi: {
      texte:
        "Un milieu compétitif, où les stages ouvrent la porte ; avec l'expérience, on peut diriger un service de presse ou la communication d'une entreprise.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/attache-attachee-de-presse",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/attache-attachee-de-presse",
  },
  {
    id: "chef-projet-communication-digitale",
    name: "Chef de projet communication digitale",
    famille: 9,
    pitch:
      "Il conçoit la communication en ligne d'une marque ou d'une entreprise : réseaux sociaux, site, applications, vidéos et campagnes numériques.",
    etudes: "bac+5",
    routes: [
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une prépa ECG, puis une grande école de commerce avec une majeure marketing digital.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de commerce ou de communication post-bac en cinq ans.",
      },
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte: "Une licence, puis un master communication digitale ou marketing digital.",
      },
    ],
    salaire: {
      debut: "2 900 à 3 300 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-projet-communication-digitale",
    },
    emploi: {
      texte:
        "Recherché pour renforcer les services communication des grandes entreprises ; les agences de communication accueillent plus volontiers les débutants.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-projet-communication-digitale",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-projet-communication-digitale",
  },
  {
    id: "chef-de-publicite",
    name: "Chef de publicité",
    famille: 9,
    pitch:
      "En agence, il gère les campagnes de ses clients annonceurs ; en régie, il vend des espaces publicitaires dans les journaux, à la radio ou sur le web.",
    etudes: "bac+5",
    routes: [
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une prépa ECG, puis une grande école de commerce avec une spécialité marketing ou communication.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de commerce ou de communication post-bac en cinq ans.",
      },
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte: "Une licence, puis un master communication-publicité ou marketing-vente.",
      },
    ],
    salaire: {
      debut: "2 160 à 3 600 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-publicite",
    },
    emploi: {
      texte:
        "Agences, presse, affichage, régies et annonceurs recrutent, surtout en Île-de-France ; changer d'employeur permet souvent de progresser.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-publicite",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-de-publicite",
  },
  {
    id: "community-manager",
    name: "Community manager",
    famille: 9,
    pitch:
      "Il fait vivre une marque sur les réseaux sociaux : il publie, répond aux internautes, anime la communauté et veille à la réputation en ligne.",
    etudes: "bac+3",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Un BUT information-communication ou métiers du multimédia et de l'internet, ou un BTS complété par une licence pro.",
      },
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte: "Une licence, puis un master de communication numérique.",
      },
    ],
    salaire: {
      debut: "À partir de 2 230 € bruts par mois en début de carrière",
      annee: "2026",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/community-manager-animateur-animatrice-de-communaute-en-ligne",
    },
    emploi: {
      texte:
        "Les grandes entreprises offrent le plus d'emplois ; le poste se répand, et l'expérience mène au métier de responsable des réseaux sociaux.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/community-manager-animateur-animatrice-de-communaute-en-ligne",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/community-manager-animateur-animatrice-de-communaute-en-ligne",
  },
  {
    id: "journaliste",
    name: "Journaliste",
    famille: 9,
    pitch:
      "Il enquête, vérifie les faits, interroge des témoins et raconte l'actualité par écrit, en vidéo ou à la radio.",
    etudes: "bac+3",
    routes: [
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte:
          "Une licence, puis un master de journalisme ou l'une des écoles reconnues par la profession, comme le Celsa ou le CFJ, sur concours.",
      },
      {
        lane: "scpo",
        via: ["sciences-po", "metiers-scpo"],
        texte: "Un diplôme d'IEP, souvent complété par une école de journalisme reconnue.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Un BUT information-communication, parcours journalisme, en trois ans.",
      },
    ],
    salaire: {
      debut: "1 878 à 2 579 € bruts par mois en début de carrière, selon le média et la région",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/journaliste",
    },
    emploi: {
      texte:
        "Les grands médias embauchent d'abord les diplômés des écoles reconnues ; les débuts se font souvent à la pige, et les profils polyvalents, à l'aise à l'écrit, sur le web et en vidéo, sont recherchés.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/journaliste",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/journaliste",
  },
  {
    id: "libraire",
    name: "Libraire",
    famille: 9,
    pitch:
      "Il choisit les livres de sa boutique, conseille les lecteurs, organise rencontres et dédicaces, et gère les commandes et les stocks.",
    etudes: "bac",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Un CAP équipier polyvalent du commerce, puis le brevet professionnel de libraire en deux ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un BUT information-communication, parcours métiers du livre, ou une licence pro métiers du livre.",
      },
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte: "Une licence de lettres, puis un master métiers du livre et de l'édition.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/libraire",
    },
    emploi: {
      texte:
        "Ouvrir ou reprendre une librairie demande un gros investissement, face à la concurrence de la grande distribution ; les évolutions de carrière restent limitées.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/libraire",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/libraire",
  },
  {
    id: "redacteur-web",
    name: "Rédacteur web",
    famille: 9,
    pitch:
      "Il écrit des articles, des pages et des fiches pour des sites internet, dans un style concis qui accroche le lecteur dès les premiers mots.",
    etudes: "bac+3",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Un BUT information-communication ou métiers du multimédia et de l'internet, en trois ans.",
      },
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte: "Une licence de lettres, puis un master de communication ou de journalisme.",
      },
    ],
    salaire: {
      debut: "À partir de 1 867 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/redacteur-redactrice-on-line-en-ligne",
    },
    emploi: {
      texte:
        "La fonction est bien présente dans les entreprises et se développe dans le secteur public ; c'est un bon tremplin vers un poste de chef de projet web.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/redacteur-redactrice-on-line-en-ligne",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/redacteur-redactrice-on-line-en-ligne",
  },
  {
    id: "traducteur-interprete",
    name: "Traducteur-interprète",
    famille: 9,
    pitch:
      "Il fait passer un texte, un film ou une conversation d'une langue à une autre, avec précision et dans le ton juste.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte:
          "Une licence de langues, LEA ou LLCER, puis un master de traduction ou une école spécialisée : ESIT, ISIT ou Inalco.",
      },
    ],
    emploi: {
      texte:
        "Les besoins en traduction augmentent avec les échanges internationaux ; le travail se fait surtout en indépendant, et l'intelligence artificielle transforme le métier.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/traducteur-interprete-traductrice-interprete",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/traducteur-interprete-traductrice-interprete",
  },
  {
    id: "editeur",
    name: "Éditeur",
    famille: 9,
    pitch:
      "Il repère les auteurs, choisit les manuscrits, suit la fabrication du livre et prépare sa sortie avec les équipes commerciales.",
    etudes: "bac+5",
    routes: [
      {
        lane: "u",
        via: ["u-lettres", "u-master", "metiers-u"],
        texte: "Une licence de lettres ou d'histoire, puis un master métiers du livre et de l'édition.",
      },
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une école de commerce, pour le marketing et la vente du livre.",
      },
    ],
    salaire: {
      debut: "À partir de 2 580 € bruts par mois, selon la taille de la maison d'édition",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/editeur-editrice",
    },
    emploi: {
      texte:
        "Les candidats sont nombreux pour peu de places, surtout en littérature ; les manuels scolaires et les livres pratiques offrent davantage de débouchés.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/editeur-editrice",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/editeur-editrice",
  },
  {
    id: "animateur-2d-3d",
    name: "Animateur 2D et 3D",
    famille: 10,
    pitch:
      "Spécialiste des images de synthèse, il donne vie à des personnages, des décors et des objets pour le cinéma, les jeux vidéo, la publicité ou le web.",
    etudes: "bac+3",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte: "Un DN MADE mention numérique ou animation en trois ans, puis une école d'animation en cinq ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Un BUT métiers du multimédia et de l'internet, ou un bac+2 complété par une licence pro métiers du numérique.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'animation post-bac en cinq ans, sur concours.",
      },
    ],
    salaire: {
      debut: "2 200 à 2 800 € bruts par mois en début de carrière, selon les offres d'emploi",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/animateur-animatrice-2d-et-3d",
    },
    emploi: {
      texte:
        "Les animateurs français sont très appréciés, jusque dans les grands studios américains ; la télévision est le secteur le plus porteur, et les CDI restent limités au départ.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/animateur-animatrice-2d-et-3d",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/animateur-animatrice-2d-et-3d",
  },
  {
    id: "architecte",
    name: "Architecte",
    famille: 10,
    pitch:
      "Il imagine et dessine des bâtiments, neufs ou rénovés, puis suit le chantier pour que le projet respecte les plans, le budget et les règles.",
    etudes: "bac+5",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte:
          "Une école nationale supérieure d'architecture, sur Parcoursup : cinq ans jusqu'au diplôme d'État, puis un an d'habilitation pour exercer en son nom.",
      },
    ],
    salaire: {
      debut: "À partir de 2 200 € bruts par mois en début de carrière, fixe et variable compris",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/architecte",
    },
    emploi: {
      texte:
        "La France compte peu d'architectes par habitant par rapport à ses voisins ; la rénovation énergétique des bâtiments crée de nouvelles occasions, et la maîtrise des maquettes numériques en 3D est un atout.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/architecte",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/architecte",
  },
  {
    id: "auteur-compositeur-interprete",
    name: "Auteur-compositeur-interprète",
    famille: 10,
    pitch: "Il écrit les paroles, compose la musique et chante ses propres chansons, en studio comme sur scène.",
    etudes: "bac",
    routes: [
      {
        lane: "arts",
        via: ["conservatoire", "pole-superieur", "metiers-arts"],
        texte:
          "Une pratique intense dès le collège, en classe à horaires aménagés ou au conservatoire, puis un pôle supérieur en musiques actuelles.",
      },
      {
        lane: "u",
        via: ["u-arts", "metiers-u"],
        texte: "Une licence de musicologie, avec beaucoup de scène à côté.",
      },
    ],
    emploi: {
      texte:
        "La plupart sont intermittents du spectacle et vivent surtout des cachets de leurs concerts ; l'enseignement ou l'accompagnement d'autres artistes complète souvent les revenus.",
      source:
        "https://www.onisep.fr/ressources/univers-metier/metiers/auteur-compositeur-interprete-autrice-compositrice-interprete",
    },
    onisep:
      "https://www.onisep.fr/ressources/univers-metier/metiers/auteur-compositeur-interprete-autrice-compositrice-interprete",
  },
  {
    id: "chef-orchestre",
    name: "Chef d'orchestre",
    famille: 10,
    pitch:
      "Il choisit l'interprétation d'une œuvre et la fait vivre en dirigeant les répétitions et les concerts d'un ensemble de musiciens et de chanteurs.",
    etudes: "bac+5",
    routes: [
      {
        lane: "arts",
        via: ["conservatoire", "concours-cnsmd", "cnsmd", "metiers-arts"],
        texte:
          "Un long cursus de conservatoire, puis un diplôme supérieur de musicien, avant un deuxième cycle supérieur de direction, au CNSMD de Paris ou de Lyon par exemple.",
      },
    ],
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-cheffe-d-orchestre",
  },
  {
    id: "comedien",
    name: "Comédien",
    famille: 10,
    pitch:
      "Il incarne des personnages sur scène, au cinéma, à la télévision ou en doublage, après de longues heures de répétition.",
    etudes: "bac",
    routes: [
      {
        lane: "arts",
        via: ["conservatoire", "pole-superieur", "metiers-arts"],
        texte:
          "Le théâtre au conservatoire pendant le lycée, puis une école supérieure d'art dramatique et son diplôme national supérieur professionnel de comédien, ou l'ENSATT à Lyon.",
      },
    ],
    emploi: {
      texte:
        "Un métier de passion et de persévérance, à la concurrence rude : la plupart sont intermittents du spectacle, et les rencontres multiplient les chances de décrocher un rôle.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/comedien-comedienne",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/comedien-comedienne",
  },
  {
    id: "designer-interaction",
    name: "Designer d'interaction (UX designer)",
    famille: 10,
    pitch:
      "Il imagine comment une application, un site ou un objet connecté répond à son utilisateur, pour que tout soit simple, clair et agréable.",
    etudes: "bac+3",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte:
          "Un DN MADE mention numérique ou une école d'art (DNA, puis DNSEP design), jusqu'à l'École nationale supérieure des arts décoratifs.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un bac+2, puis une licence professionnelle en design numérique.",
      },
      {
        lane: "u",
        via: ["universite", "u-master", "metiers-u"],
        texte: "Une licence, puis un master de design des objets, médias et espaces numériques.",
      },
    ],
    salaire: {
      debut: "À partir de 2 500 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-designeuse-d-interaction",
    },
    emploi: {
      texte:
        "Des perspectives très prometteuses, des transports à la santé en passant par la culture ; un quart des professionnels travaillent en indépendant.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-designeuse-d-interaction",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-designeuse-d-interaction",
  },
  {
    id: "designer-graphique",
    name: "Designer graphique",
    famille: 10,
    pitch:
      "Il crée des affiches, des logos, des emballages et des sites web qui transmettent un message d'un coup d'œil.",
    etudes: "bac+3",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte:
          "Un DN MADE mention graphisme ou numérique en trois ans, ou une école d'art publique : DNA en trois ans, puis DNSEP en cinq ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un bac+2, complété par une licence professionnelle en design.",
      },
    ],
    salaire: {
      debut: "À partir de 1 878 € bruts par mois pour un salarié ; revenus variables en indépendant",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-designeuse-graphique",
    },
    emploi: {
      texte:
        "Agences de design, de communication et de publicité, studios et sociétés du web recrutent ; le travail en indépendant est très répandu.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-designeuse-graphique",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-designeuse-graphique",
  },
  {
    id: "designer-industriel",
    name: "Designer industriel",
    famille: 10,
    pitch:
      "Il imagine la forme et l'usage d'objets du quotidien, d'un canapé à une gamme de bagages, en dessinant puis en testant des prototypes.",
    etudes: "bac+3",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte:
          "Un DN MADE mention objet ou matériaux en trois ans, puis un DSAA ou une école comme l'ENSCI, en cinq ans.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école de design post-bac en cinq ans.",
      },
    ],
    salaire: {
      debut: "1 868 à 2 667 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-industriel-designeuse-industrielle",
    },
    emploi: {
      texte:
        "Les agences de design, souvent petites, et les bureaux de création des entreprises recrutent le plus, surtout en région parisienne et en Rhône-Alpes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-industriel-designeuse-industrielle",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/designer-industriel-designeuse-industrielle",
  },
  {
    id: "luthier",
    name: "Luthier",
    famille: 10,
    pitch:
      "Dans son atelier, il fabrique, restaure et règle violons, altos, violoncelles ou guitares, et conseille les musiciens.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Après la 3e, le CAP assistant luthier du quatuor en deux ans, complété si l'on veut par un BMA de technicien en facture instrumentale.",
      },
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte: "Après le bac, un DN MADE mention instrument, en trois ans.",
      },
    ],
    emploi: {
      texte:
        "La plupart s'installent à leur compte comme artisans d'art ; certains travaillent comme salariés dans un atelier.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/luthier-luthiere",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/luthier-luthiere",
  },
  {
    id: "musicien",
    name: "Musicien",
    famille: 10,
    pitch:
      "Instrumentiste ou chanteur, il répète chaque jour, interprète des œuvres en concert ou en studio, accompagne d'autres artistes et, souvent, enseigne.",
    etudes: "bac",
    routes: [
      {
        lane: "arts",
        via: ["conservatoire", "concours-cnsmd", "cnsmd", "metiers-arts"],
        texte:
          "Le conservatoire en parallèle du lycée, puis le concours d'un conservatoire national supérieur, à Paris ou à Lyon, et cinq ans d'études jusqu'au master.",
      },
      {
        lane: "arts",
        via: ["conservatoire", "pole-superieur", "metiers-arts"],
        texte:
          "Le conservatoire pendant le lycée, puis un pôle supérieur et son diplôme national supérieur professionnel de musicien.",
      },
      {
        lane: "u",
        via: ["u-arts", "u-master", "metiers-u"],
        texte: "Une licence de musicologie, souvent menée en même temps qu'un cursus de conservatoire.",
      },
    ],
    emploi: {
      texte:
        "Une minorité vit uniquement de la scène : la plupart travaillent comme intermittents du spectacle, au cachet, et complètent leurs revenus en enseignant ou en accompagnant d'autres artistes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/musicien-musicienne",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/musicien-musicienne",
  },
  {
    id: "professeur-musique",
    name: "Professeur de musique",
    famille: 10,
    pitch:
      "Au conservatoire, au collège ou au lycée, il fait découvrir la musique, enseigne la technique d'un instrument ou du chant et fait progresser chaque élève.",
    etudes: "bac+3",
    routes: [
      {
        lane: "arts",
        via: ["conservatoire", "pole-superieur", "metiers-arts"],
        texte:
          "Le conservatoire pendant le lycée, puis un pôle supérieur pour le diplôme d'État de professeur de musique, en trois ans.",
      },
      {
        lane: "arts",
        via: ["conservatoire", "concours-cnsmd", "cnsmd", "metiers-arts"],
        texte:
          "Un conservatoire national supérieur, puis le certificat d'aptitude pour enseigner dans les grands conservatoires.",
      },
      {
        lane: "u",
        via: ["u-arts", "u-master", "metiers-u"],
        texte:
          "Une licence de musicologie, puis le CAPES d'éducation musicale et chant choral pour enseigner au collège et au lycée.",
      },
    ],
    salaire: {
      debut:
        "À partir de 2 067 € bruts par mois en conservatoire public ; 2 196 € avec le CAPES, l'année de la titularisation",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-professeure-de-musique-ou-de-danse",
    },
    emploi: {
      texte:
        "Les départs à la retraite maintiennent des recrutements stables, en petit nombre : en 2024, le CAPES externe d'éducation musicale et chant choral offrait 122 postes.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-professeure-de-musique-ou-de-danse",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/professeur-professeure-de-musique-ou-de-danse",
  },
  {
    id: "realisateur",
    name: "Réalisateur de films",
    famille: 10,
    pitch:
      "À la tête d'une équipe de tournage, il dirige acteurs et techniciens et conduit le film de la préparation jusqu'au montage.",
    etudes: "bac+5",
    routes: [
      {
        lane: "arts",
        via: ["pole-superieur", "metiers-arts"],
        texte: "Une grande école de cinéma, la Fémis ou Louis-Lumière, sur concours très sélectif, en cinq à six ans.",
      },
      {
        lane: "u",
        via: ["u-arts", "u-master", "metiers-u"],
        texte: "Une licence cinéma et audiovisuel, puis un master de création ou de réalisation audiovisuelle.",
      },
    ],
    salaire: {
      debut:
        "Au départ, souvent comme assistant : au cinéma, au moins 1 479 € bruts par semaine de tournage pour un premier assistant réalisateur",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/assistant-realisateur-assistante-realisatrice",
    },
    emploi: {
      texte:
        "Les contrats courts sont la règle : on débute souvent comme assistant sur des films, des publicités ou des téléfilms, avant de passer à la réalisation après quelques années.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/assistant-realisateur-assistante-realisatrice",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/realisateur-realisatrice-de-films",
  },
  {
    id: "accompagnateur-voyages",
    name: "Accompagnateur de voyages",
    famille: 11,
    pitch:
      "Il accompagne un groupe de touristes pendant un circuit, en France ou à l'étranger, et veille au bon déroulement du séjour, des transports aux visites.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte: "Un BTS tourisme en deux ans, puis, si l'on veut, une licence pro guide-conférencier ou tourisme.",
      },
    ],
    salaire: {
      debut: "80 à 90 € bruts par jour, déjeuner compris",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/accompagnateur-accompagnatrice-de-voyages",
    },
    emploi: {
      texte:
        "Les agences confient plus volontiers un groupe à une personne expérimentée : stages et expérience d'animation comptent, et un second métier aide en basse saison.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/accompagnateur-accompagnatrice-de-voyages",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/accompagnateur-accompagnatrice-de-voyages",
  },
  {
    id: "agent-transit",
    name: "Agent de transit",
    famille: 11,
    pitch:
      "Il organise l'expédition de marchandises à travers le monde, négocie le transport et s'occupe des formalités de douane.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Un BTS gestion des transports et logistique associée en deux ans, ou un BUT management de la logistique et des transports en trois ans.",
      },
    ],
    salaire: {
      debut: "1 868 à 2 000 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/agent-agente-de-transit",
    },
    emploi: {
      texte:
        "Une profession peu connue qui recherche des candidats : avec le commerce mondial et la vente en ligne, ses besoins devraient continuer à progresser.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/agent-agente-de-transit",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/agent-agente-de-transit",
  },
  {
    id: "chef-de-cuisine",
    name: "Chef de cuisine",
    famille: 11,
    pitch:
      "Il compose les menus, choisit les produits, répartit le travail de sa brigade et veille à la qualité de chaque assiette.",
    etudes: "CAP",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Un CAP cuisine en deux ans, souvent en apprentissage, ou un bac pro métiers de la restauration en trois ans, puis l'expérience, de commis à chef.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Après le bac, un BTS management en hôtellerie-restauration, option production culinaire, en deux ans.",
      },
    ],
    salaire: {
      debut:
        "2 500 à 3 250 € bruts par mois dans un restaurant traditionnel, davantage en brasserie, en hôtel ou en restaurant étoilé",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-de-cuisine-cheffe-de-cuisine",
    },
    emploi: {
      texte:
        "Un métier passion et un gros pourvoyeur d'emplois, avec des dizaines de milliers de postes ouverts chaque année, dans tous les types d'établissements.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-de-cuisine-cheffe-de-cuisine",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/chef-de-cuisine-cheffe-de-cuisine",
  },
  {
    id: "conducteur-train",
    name: "Conducteur de train",
    famille: 11,
    pitch:
      "Aux commandes d'un train de voyageurs ou de marchandises, il respecte la signalisation et les horaires, et reste vigilant à chaque instant.",
    etudes: "bac",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte:
          "Le bac, parfois un CAP, puis la formation de conducteur assurée par l'entreprise ferroviaire : SNCF, Transdev, Eurotunnel…",
      },
    ],
    salaire: {
      debut: "1 867 à 2 800 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conducteur-conductrice-de-train",
    },
    emploi: {
      texte:
        "Les recrutements dépendent des besoins de chaque région ; l'ouverture à la concurrence et le développement du ferroutage devraient redynamiser le secteur.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conducteur-conductrice-de-train",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/conducteur-conductrice-de-train",
  },
  {
    id: "conseiller-voyages",
    name: "Conseiller en voyages",
    famille: 11,
    pitch:
      "En agence de voyages, il écoute les envies de ses clients, compose et réserve leurs séjours et les conseille sur les destinations.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Un BTS tourisme ou management commercial opérationnel en deux ans, ou un BUT techniques de commercialisation en trois ans.",
      },
    ],
    salaire: {
      debut: "1 867 à 2 167 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conseiller-conseillere-en-voyages",
    },
    emploi: {
      texte:
        "La profession attire les jeunes ; face aux ventes sur internet, elle mise sur le conseil personnalisé, sa vraie valeur ajoutée.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/conseiller-conseillere-en-voyages",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/conseiller-conseillere-en-voyages",
  },
  {
    id: "controleur-aerien",
    name: "Contrôleur aérien",
    famille: 11,
    pitch:
      "Depuis une tour de contrôle ou un centre régional, il guide les pilotes du décollage à l'atterrissage pour que les avions circulent en toute sécurité.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Deux ans de prépa, de BTS ou de licence, le concours de l'ENAC, puis trois ans de formation rémunérée jusqu'au titre d'ingénieur du contrôle de la navigation aérienne.",
      },
    ],
    salaire: {
      debut: "À partir de 2 552 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/controleur-aerien-controleuse-aerienne",
    },
    emploi: {
      texte:
        "Les élèves de l'ENAC sont fonctionnaires dès leur entrée ; ensuite, 40 % exercent dans les centres de contrôle régionaux, 40 % dans les aéroports et 20 % dans les études ou l'encadrement.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/controleur-aerien-controleuse-aerienne",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/controleur-aerien-controleuse-aerienne",
  },
  {
    id: "directeur-hotel",
    name: "Directeur d'hôtel",
    famille: 11,
    pitch:
      "À la fois gestionnaire, commercial et chef d'équipe, il fait tourner l'hôtel : accueil, chambres, restaurant, budget et recrutement.",
    etudes: "bac+2",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "but-lp", "metiers-courtes"],
        texte:
          "Un BTS management en hôtellerie-restauration en deux ans, éventuellement une licence pro, puis de l'expérience en hôtel.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école hôtelière, très appréciée des employeurs, jusqu'au niveau bac+5.",
      },
      {
        lane: "u",
        via: ["u-eco", "u-master", "metiers-u"],
        texte:
          "Une licence de gestion, puis un master en management de l'hôtellerie : un bac+5 est de plus en plus apprécié.",
      },
    ],
    salaire: {
      debut: "À partir de 2 400 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/directeur-directrice-d-hotel",
    },
    emploi: {
      texte:
        "Les perspectives sont bonnes pour les cadres de l'hôtellerie ; l'expérience ouvre la direction de plus grands hôtels, de plusieurs établissements ou un poste à l'étranger.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/directeur-directrice-d-hotel",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/directeur-directrice-d-hotel",
  },
  {
    id: "hotesse-steward",
    name: "Hôtesse de l'air ou steward",
    famille: 11,
    pitch:
      "À bord, il ou elle accueille les passagers, veille à leur sécurité et à leur confort pendant tout le vol, en plusieurs langues.",
    etudes: "bac",
    routes: [
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte:
          "Après le bac, le certificat européen de membre d'équipage de cabine (CCA), préparé en moins d'un an, avec un très bon niveau d'anglais.",
      },
    ],
    salaire: {
      debut:
        "À partir de 1 867 € bruts par mois dans les compagnies à bas prix ; environ 30 % de plus dans les grandes compagnies",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/hotesse-de-l-air-steward",
    },
    emploi: {
      texte:
        "Les recrutements sont réguliers, parfois en contrat saisonnier, et suivent la conjoncture du transport aérien.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/hotesse-de-l-air-steward",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/hotesse-de-l-air-steward",
  },
  {
    id: "ingenieur-logistique",
    name: "Ingénieur logistique",
    famille: 11,
    pitch:
      "Il organise la circulation des produits, de la réception des matières premières à la livraison, en optimisant stocks, coûts et délais.",
    etudes: "bac+5",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte: "Une prépa scientifique, puis une école d'ingénieurs avec une spécialité logistique ou supply chain.",
      },
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte: "Une école d'ingénieurs post-bac en cinq ans, avec une spécialité logistique.",
      },
      {
        lane: "commerce",
        via: ["prepa-ecg", "concours-commerce", "ecole-commerce", "metiers-commerce"],
        texte: "Une grande école de commerce, avec une spécialisation supply chain.",
      },
    ],
    salaire: {
      debut: "À partir de 3 333 € bruts par mois, primes et avantages compris",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-logistique",
    },
    emploi: {
      texte:
        "La logistique est devenue stratégique pour les entreprises, surtout avec le commerce en ligne : après une première expérience réussie, l'emploi se trouve facilement.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-logistique",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/ingenieur-ingenieure-logistique",
  },
  {
    id: "officier-marine-marchande",
    name: "Officier de la marine marchande",
    famille: 11,
    pitch:
      "Sur un cargo, un ferry ou un paquebot, il conduit le navire ou ses machines, encadre l'équipage et veille à la sécurité des passagers et des marchandises.",
    etudes: "bac+5",
    routes: [
      {
        lane: "postbac",
        via: ["concours-postbac", "cycle-integre", "cycle-postbac", "metiers-postbac"],
        texte:
          "L'École nationale supérieure maritime, sur dossier Parcoursup dès le bac : cinq ans et demi jusqu'au diplôme d'officier et au titre d'ingénieur.",
      },
    ],
    salaire: {
      debut: "À partir de 2 800 € bruts par mois pour un lieutenant",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-la-marine-marchande",
    },
    emploi: {
      texte:
        "La modernisation des navires et le vieillissement des équipages créent des besoins : la marine marchande recrute, en Europe comme dans le monde.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-la-marine-marchande",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/officier-officiere-de-la-marine-marchande",
  },
  {
    id: "pilote-de-ligne",
    name: "Pilote de ligne",
    famille: 11,
    pitch:
      "Aux commandes d'un avion de ligne, il prépare le vol, décolle, suit la route et atterrit en assurant la sécurité des passagers.",
    etudes: "bac+3",
    routes: [
      {
        lane: "sciences",
        via: ["prepa-scientifique", "concours-ingenieurs", "ecole-ingenieurs", "metiers-sciences"],
        texte:
          "Au moins une année d'études scientifiques après le bac, souvent une prépa, puis le concours d'élève pilote de ligne de l'ENAC et deux ans de formation.",
      },
      {
        lane: "defense",
        via: ["concours-officiers", "ecole-officiers", "metiers-defense"],
        texte:
          "La voie militaire : un concours ouvert dès le bac, la formation de pilote de l'armée de l'Air et de l'Espace et un engagement de dix ans, avant de rejoindre une compagnie.",
      },
    ],
    salaire: {
      debut: "À partir de 2 100 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/pilote-de-ligne",
    },
    emploi: {
      texte:
        "Les recrutements suivent la santé du transport aérien ; presque tous les diplômés de l'ENAC trouvent un emploi, surtout dans les compagnies, et les formations privées, coûteuses, offrent une insertion plus incertaine.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/pilote-de-ligne",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/pilote-de-ligne",
  },
  {
    id: "receptionniste",
    name: "Réceptionniste",
    famille: 11,
    pitch:
      "Premier visage de l'hôtel, il accueille les clients, gère les réservations, répond aux questions et prépare les factures, souvent en anglais.",
    etudes: "bac",
    routes: [
      {
        lane: "pro",
        via: ["lycee-pro", "metiers-pro"],
        texte: "Un bac pro métiers de l'accueil, en trois ans.",
      },
      {
        lane: "courtes",
        via: ["bts-but", "metiers-courtes"],
        texte: "Un BTS management en hôtellerie-restauration, option hébergement, en deux ans.",
      },
    ],
    salaire: {
      debut: "À partir de 1 890 € bruts par mois en début de carrière",
      annee: "2026",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/receptionniste",
    },
    emploi: {
      texte:
        "Les offres abondent, en CDI ou en contrat saisonnier, par exemple dans les stations de ski : les jeunes diplômés trouvent vite un poste.",
      source: "https://www.onisep.fr/ressources/univers-metier/metiers/receptionniste",
    },
    onisep: "https://www.onisep.fr/ressources/univers-metier/metiers/receptionniste",
  },
] as Metier[]);

export const metierById = Object.fromEntries(metiers.map((m) => [m.id, m])) as Record<string, Metier>;
