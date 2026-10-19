/**
 * Les fiches détaillées des écoles d'ingénieurs : pourquoi y aller, ce qu'on y apprend, ce qui les
 * distingue, leurs chiffres et leurs sources. Chargé à la demande, à l'ouverture d'une fiche d'école.
 */
import type { Ecole } from "./ecoles";
import { etTypo } from "./typo";

export type EcoleDetails = Pick<Ecole, "pourquoi" | "apprendre" | "specificite" | "chiffres" | "sources">;

export const details: Record<string, EcoleDetails> = etTypo<Record<string, EcoleDetails>>({
  polytechnique: {
    pourquoi:
      "Tu vises la recherche, l'industrie de pointe ou le service de l'État : à la sortie, environ 53 % des diplômés partent en entreprise et 34 % préparent un doctorat ; 15 % rejoignent un corps de l'État, certains après leur thèse. Le réseau compte environ 50 000 anciens élèves. Si tu es français, tu es payé pendant toute ta scolarité.",
    apprendre:
      "La 1re année s'ouvre sur six mois de formation humaine et militaire, dans les armées ou un organisme civil. Jusqu'en 2e année, tu étudies six disciplines parmi huit (des mathématiques à l'économie), puis tu choisis en 3e année un des 15 programmes d'approfondissement. En 4e année : master, école partenaire ou corps de l'État. Au fil du cursus, des stages en entreprise et en laboratoire, et 6 mois à l'étranger en moyenne.",
    specificite:
      "École militaire sous la tutelle du ministère des Armées, dirigée par un officier général : les élèves français ont le statut d'élève officier, portent le grand uniforme et reçoivent une solde. En contrepartie, ils s'engagent à servir 10 ans l'État, ou remboursent leurs études (la « pantoufle »).",
    chiffres: [
      {
        label: "Élèves français admis au concours",
        valeur: "431 (5 999 candidats inscrits)",
        source:
          "https://www.polytechnique.edu/admission-cycle-ingenieur/sites/admission/files/content/Livret_Stats_2025.pdf",
        date: "concours 2025",
      },
      {
        label: "Femmes parmi les entrants français",
        valeur: "81, soit 18,8 %",
        source:
          "https://www.polytechnique.edu/admission-cycle-ingenieur/sites/admission/files/content/Livret_Stats_2025.pdf",
        date: "concours 2025",
      },
      {
        label: "Devenir des diplômés",
        valeur: "environ 53 % en entreprise, 34 % en doctorat ; 15 % dans un corps de l'État, dont certains docteurs",
        source: "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/cycle-ingenieur-polytechnicien",
      },
      {
        label: "Anciens élèves",
        valeur: "environ 50 000",
        source: "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/cycle-ingenieur-polytechnicien",
      },
    ],
    sources: [
      "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/cycle-ingenieur-polytechnicien",
      "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/cout-de-la-formation",
      "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/details-du-programme/premiere-annee-du-cycle-ingenieur",
      "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/details-du-programme/detail-du-programme",
      "https://www.polytechnique.edu/admission-cycle-ingenieur/fr",
      "https://www.polytechnique.edu/admission-cycle-ingenieur/statistiques",
      "https://www.polytechnique.edu/admission-cycle-ingenieur/sites/admission/files/content/Livret_Stats_2025.pdf",
      "https://www.polytechnique.edu/admission-cycle-ingenieur/sites/admission/files/content/Notice%20du%20concours%202026%20publi%C3%A9e.pdf",
      "https://www.polytechnique.edu/ecole/une-ecole-militaire",
    ],
  },
  "ens-ulm": {
    pourquoi:
      "Tu rêves de recherche ou d'enseignement supérieur : chaque année, environ 170 normaliens scientifiques sortent de l'École, et 75 % d'entre eux préparent une thèse après leur master. L'École prépare aussi aux grands corps techniques de l'État et à la haute fonction publique. Entré par la voie CPGE, tu es payé pendant tes 4 ans d'études.",
    apprendre:
      "Tu prépares le diplôme de l'ENS, une formation par la recherche construite avec un tuteur, en parallèle d'une licence puis d'un master de PSL ou d'une université partenaire. Six départements scientifiques t'accueillent : mathématiques et applications, informatique, physique, chimie, biologie, géosciences. Le séjour à l'étranger fait partie du parcours, et l'École prépare à l'agrégation.",
    specificite:
      "Chaque élève a un tuteur et compose son propre programme d'études, en choisissant parmi 15 départements et 32 unités de recherche réunis sur le site de la rue d'Ulm, au sein de l'Université PSL. Les élèves recrutés sur concours CPGE ont le statut de fonctionnaire stagiaire.",
    chiffres: [
      {
        label: "Postes d'élèves en sciences (MP, MPI, PC, PSI, BCPST)",
        valeur: "95 (192 avec les lettres)",
        source:
          "https://www.ens.psl.eu/sites/default/files/decision-fixant-le-nombre-de-postes-ouverts-aux-concours-ens-ulm-session-2025_signe.pdf",
        date: "2025",
      },
      {
        label: "Normaliens scientifiques diplômés chaque année",
        valeur: "environ 170, dont 75 % poursuivent en thèse",
        source: "https://www.ens.psl.eu/une-formation-d-exception/carrieres",
      },
      {
        label: "Départements et unités de recherche",
        valeur: "15 départements, 32 unités de recherche, 800 enseignants et chercheurs permanents",
        source: "https://www.ens.psl.eu/l-ecole-normale-superieure-psl/chiffres-cles-et-classements-internationaux",
      },
      {
        label: "Élèves recrutés chaque année par les quatre ENS",
        valeur: "environ 800",
        source:
          "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/notice_interens_2026_mise_en_ligne_vf260212.pdf",
        date: "notice Inter-ENS 2026",
      },
    ],
    sources: [
      "https://www.ens.psl.eu/une-formation-d-exception/admission-concours",
      "https://www.ens.psl.eu/une-formation-d-exception/formations",
      "https://www.ens.psl.eu/une-formation-d-exception/carrieres",
      "https://www.ens.psl.eu/l-ecole-normale-superieure-psl/chiffres-cles-et-classements-internationaux",
      "https://www.ens.psl.eu/sites/default/files/decision-fixant-le-nombre-de-postes-ouverts-aux-concours-ens-ulm-session-2025_signe.pdf",
      "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/notice_interens_2026_mise_en_ligne_vf260212.pdf",
    ],
  },
  "ens-paris-saclay": {
    pourquoi:
      "Tu vises la recherche ou l'enseignement, y compris en sciences de l'ingénieur : 69 % des normaliens poursuivent en thèse (enquête 2022), et l'École prépare à l'agrégation. Fonctionnaire stagiaire, tu es payé pendant tes 4 ans d'études. Tu travailles au contact de 12 laboratoires associés au CNRS, à Inria et à l'Inserm.",
    apprendre:
      "Le diplôme de l'ENS Paris-Saclay se prépare en 4 ans (au moins 300 ECTS) et confère le grade de master. Tu suis une licence puis un master dans l'un des 11 départements, de la biologie au design, et tu valides quatre compétences : recherche, enseignement supérieur, expérience internationale, interdisciplinarité.",
    specificite:
      "Elle recrute aussi en PT (38 postes en 2026), en PSI, en TSI et après un BTS ou un DUT, pour ses trois départements de sciences pour l'ingénieur : génie civil et environnement, génie mécanique, ingénierie électrique et numérique. Ses 1 387 normaliens étudient dans un bâtiment de 62 000 m² sur le campus Paris-Saclay.",
    chiffres: [
      {
        label: "Postes d'élèves ouverts au concours",
        valeur: "215, dont 38 en PT et 36 en PSI",
        source:
          "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/2026_postes_eleves_ouverts_ENS_Paris-Saclay.pdf",
        date: "2026",
      },
      {
        label: "Normaliens poursuivant en thèse",
        valeur: "69 %",
        source: "https://ens-paris-saclay.fr/lecole/presentation-de-lecole/classements-internationaux-et-chiffres-cles",
        date: "enquête d'insertion 2022",
      },
      {
        label: "Inscrits",
        valeur: "1 792, dont 1 387 normaliens",
        source: "https://ens-paris-saclay.fr/lecole/presentation-de-lecole/classements-internationaux-et-chiffres-cles",
      },
      {
        label: "Laboratoires de recherche",
        valeur: "12, avec le CNRS, Inria et l'Inserm",
        source: "https://ens-paris-saclay.fr/lecole/presentation-de-lecole/classements-internationaux-et-chiffres-cles",
      },
    ],
    sources: [
      "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/2026_postes_eleves_ouverts_ENS_Paris-Saclay.pdf",
      "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/notice_interens_2026_mise_en_ligne_vf260212.pdf",
      "https://ens-paris-saclay.fr/formations/engagement-decennal",
      "https://ens-paris-saclay.fr/formations/diplome-ens-paris-saclay",
      "https://ens-paris-saclay.fr/entites/departements",
      "https://ens-paris-saclay.fr/lecole/presentation-de-lecole/classements-internationaux-et-chiffres-cles",
    ],
  },
  "ens-lyon": {
    pourquoi:
      "Tu te destines à l'enseignement ou à la recherche : le diplôme de l'ENS de Lyon y prépare d'abord, et ouvre aussi l'administration et l'entreprise. Reçu au concours, tu touches 1 500 € bruts par mois pendant 4 ans. Tu étudies au contact d'environ 30 structures de recherche et de 700 enseignants-chercheurs.",
    apprendre:
      "Trois années orientées recherche (L3, M1, M2), avec au moins trois rapports de recherche en sciences, puis une année de parcours, souvent la 4e : préparation à l'agrégation, aux concours de la haute fonction publique ou formation complémentaire. Six départements de sciences exactes : biologie, chimie, informatique, mathématiques, physique, sciences de la Terre. Au moins 3 mois de mobilité à l'étranger.",
    specificite:
      "Le diplôme associe deux volets : 240 ECTS de licence et de master, plus 50 ECTS d'activités propres à l'École, dont la mobilité internationale. Sciences exactes et sciences humaines cohabitent dans la même école, ce qui ouvre des parcours croisés.",
    chiffres: [
      {
        label: "Traitement des normaliens élèves",
        valeur: "1 500 € bruts par mois pendant 4 ans",
        source: "https://www.ens-lyon.fr/formation/admission/financement-des-etudes",
      },
      {
        label: "Bourse des élèves admis à titre étranger",
        valeur: "1 000 € par mois, 4 ans au plus",
        source: "https://www.ens-lyon.fr/formation/admission/financement-des-etudes",
      },
      {
        label: "Places aux concours, toutes filières",
        valeur: "226",
        source: "https://lexpress-education.com/articles/les-ens-voies-dadmissions-places/",
        date: "2026",
      },
      {
        label: "Structure du diplôme",
        valeur: "4 ans, 240 ECTS + 50 ECTS d'activités spécifiques, 3 mois de mobilité au minimum",
        source: "https://www.ens-lyon.fr/formation/offre-de-formation/diplome-de-lens-de-lyon",
      },
    ],
    sources: [
      "https://www.ens-lyon.fr/",
      "https://www.ens-lyon.fr/formation/admission",
      "https://www.ens-lyon.fr/formation/admission/procedures-dadmission",
      "https://www.ens-lyon.fr/formation/admission/financement-des-etudes",
      "https://www.ens-lyon.fr/formation/offre-de-formation/diplome-de-lens-de-lyon",
      "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/notice_interens_2026_mise_en_ligne_vf260212.pdf",
      "https://lexpress-education.com/articles/les-ens-voies-dadmissions-places/",
    ],
  },
  "ens-rennes": {
    pourquoi:
      "Tu vises l'enseignement supérieur ou la recherche : 70 % des élèves poursuivent en thèse, et l'école affiche 83 % de réussite à l'agrégation (chiffres de 2023). Fonctionnaire stagiaire, tu touches environ 1 800 € bruts par mois. Environ 65 élèves entrent chaque année par concours, dans une école de 596 normaliens en 2023.",
    apprendre:
      "Le diplôme de l'ENS Rennes (grade de master) repose sur quatre compétences : recherche, avec des stages en laboratoire et un master recherche ; pluridisciplinarité ; pédagogie, qui prépare à l'agrégation ; international, avec des stages longs à l'étranger. Six départements : mathématiques, informatique, mécatronique, sciences du sport et éducation physique, droit-économie-management, sciences pour l'environnement.",
    specificite:
      "Ses concours s'ouvrent aux filières PSI, PT, TSI et ATS en plus de MP et MPI, avec un département de mécatronique et un département de sciences du sport (concours 2SEP). De 2018 à 2023, ses élèves sont partis 300 fois dans 35 pays.",
    chiffres: [
      {
        label: "Élèves fonctionnaires stagiaires recrutés par concours",
        valeur: "environ 65 par an",
        source: "https://www.ens-rennes.fr/admission",
      },
      {
        label: "Rémunération des normaliens élèves",
        valeur: "environ 1 800 € bruts par mois",
        source: "https://www.ens-rennes.fr/admission",
      },
      {
        label: "Élèves poursuivant en thèse",
        valeur: "70 %",
        source: "https://www.ens-rennes.fr/formation",
        date: "septembre 2023",
      },
      {
        label: "Réussite à l'agrégation",
        valeur: "83 %",
        source: "https://www.ens-rennes.fr/formation",
        date: "septembre 2023",
      },
    ],
    sources: [
      "https://www.ens-rennes.fr/admission",
      "https://www.ens-rennes.fr/admission/concours1a",
      "https://www.ens-rennes.fr/formation",
      "https://www.ens-rennes.fr/formation/diplome-de-lens-rennes",
      "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/notice_interens_2026_mise_en_ligne_vf260212.pdf",
    ],
  },
  espci: {
    pourquoi:
      "Tu aimes la physique, la chimie et la biologie au labo : environ la moitié du temps de 1re et 2e années se passe en activités expérimentales. À la sortie, 80 % des diplômés rejoignent l'industrie, 20 % la recherche académique ou l'enseignement, et 63 % des anciens ont soutenu une thèse. Salaire moyen déclaré au premier emploi : 47 000 € par an.",
    apprendre:
      "En 1re et 2e années, socle commun en physique, chimie et biologie, avec langues et sciences humaines, et un projet scientifique en équipe sur trois semestres. En 3e année : stage industriel de cinq mois, expérience internationale obligatoire, spécialisation et projet de recherche d'au moins huit semaines. La 4e année, facultative, mène à un master recherche ou à un double diplôme.",
    specificite:
      "École de la Ville de Paris, membre de PSL, où ont travaillé Pierre et Marie Curie, Paul Langevin, Pierre-Gilles de Gennes et Georges Charpak. Environ 90 élèves par promotion, un enseignant-chercheur pour huit élèves en travaux pratiques, 10 laboratoires de recherche et l'incubateur deeptech PC'UP sur place.",
    chiffres: [
      {
        label: "Élèves recrutés en PC par le concours commun avec l'X",
        valeur: "57 (français et étrangers), plus 5 places en MP",
        source:
          "https://www.polytechnique.edu/admission-cycle-ingenieur/sites/admission/files/content/Notice%202026%20ESPCI_Fili%C3%A8res%20PC%20et%20MP.pdf",
        date: "concours 2026",
      },
      {
        label: "Élèves en 1re année",
        valeur: "environ 90, dont 35 à 40 % de jeunes femmes",
        source: "https://www.espci.psl.eu/formation/cycle-ingenieur/",
      },
      {
        label: "Part du temps en activités expérimentales (1re et 2e années)",
        valeur: "environ 50 %",
        source: "https://www.espci.psl.eu/formation/cycle-ingenieur/",
      },
      {
        label: "Devenir des diplômés",
        valeur:
          "80 % dans l'industrie, 20 % en recherche académique ou enseignement ; 63 % des anciens ont soutenu une thèse",
        source: "https://www.espci.psl.eu/formation/cycle-ingenieur/debouches-et-carrieres/",
        date: "enquête Alumni 2023",
      },
    ],
    sources: [
      "https://www.polytechnique.edu/admission-cycle-ingenieur/sites/admission/files/content/Notice%202026%20ESPCI_Fili%C3%A8res%20PC%20et%20MP.pdf",
      "https://www.espci.psl.eu/",
      "https://www.espci.psl.eu/formation/cycle-ingenieur/",
      "https://www.espci.psl.eu/formation/cycle-ingenieur/debouches-et-carrieres/",
      "https://www.espci.psl.eu/vie-de-campus/vie-etudiante/",
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/diplome-d-ingenieur-de-l-ecole-superieure-de-physique-et-de-chimie-industrielles-de-la-ville-de-paris",
    ],
  },
  mines: {
    pourquoi:
      "Tu vises l'industrie, l'énergie, le conseil ou la recherche : 70 % des diplômés 2024 ont trouvé leur premier emploi avant la fin des études, 85 % en CDI, pour un salaire brut moyen de 56 890 € en France ; 13 % préparent un doctorat. La formation s'appuie sur 18 centres de recherche et un réseau de 16 000 anciens.",
    apprendre:
      "En 1re année, tronc commun en sciences, ingénierie et gestion, avec l'UE « Terre et Société », une semaine d'entrepreneuriat et un trimestre d'immersion dans un centre de recherche. En 3e année, tu choisis une majeure parmi 17, de l'énergie à la santé et aux sciences digitales. Trois stages en entreprise (12 mois au moins au total) et au moins 6 mois à l'étranger, 15 en moyenne.",
    specificite:
      "Environ 150 entrants par an, au sein de l'Université PSL : 30 accords de double diplôme, dont HEC, l'ENS, AgroParisTech, l'École d'architecture Paris-Malaquais et des études de médecine. Le cursus devient modulaire dès la 2e année pour faciliter mobilité et doubles diplômes.",
    chiffres: [
      {
        label: "Places au concours commun Mines-Ponts",
        valeur: "130 (MP 52, PSI 36, PC 30, MPI 5, PT 5, TSI 2)",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Frais de scolarité annuels",
        valeur: "4 150 €, boursiers exonérés",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "notice du concours 2026",
      },
      {
        label: "Entrants en 1re année",
        valeur: "150",
        source: "https://www.minesparis.psl.eu/wp-content/uploads/2025/09/Plaquette-cycle-IC.pdf",
        date: "plaquette de septembre 2025",
      },
      {
        label: "Insertion des diplômés",
        valeur: "70 % en poste avant la fin des études, 85 % en CDI, 13 % en doctorat",
        source:
          "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/graduates-career-opportunities-and-integration/",
        date: "enquête 2025, promotion 2024",
      },
    ],
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/",
      "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/admission/",
      "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/graduates-career-opportunities-and-integration/",
      "https://www.minesparis.psl.eu/wp-content/uploads/2025/09/Plaquette-cycle-IC.pdf",
      "https://www.minesparis.psl.eu/en/education/specialised-energy-engineering-cycle/",
    ],
  },
  ponts: {
    pourquoi:
      "Tu veux bâtir des villes, des transports et des ouvrages, ou travailler dans l'industrie, le conseil ou la finance : 95 % des diplômés 2025 ont un emploi à 6 mois, pour un salaire brut annuel moyen de 57 545 € primes comprises. L'école est membre de l'Institut Polytechnique de Paris.",
    apprendre:
      "Après une 1re année de tronc commun, tu choisis un des six départements : génie civil et construction ; ville, environnement, transport ; génie mécanique et matériaux ; génie industriel ; ingénierie mathématique et informatique ; sciences économiques, gestion, finance. La 3e année se termine par un projet de fin d'études en entreprise ou en laboratoire ; un semestre ou une année à l'étranger est possible.",
    specificite:
      "La 3e année peut se faire ailleurs : double cursus avec HEC Paris, masters de Sciences Po, master « Innovation par le design » (ME310) avec Stanford, génie atomique à l'INSTN ou IFP School. L'école réunit 1 678 élèves, dont 995 en formation d'ingénieur et 38 % de femmes.",
    chiffres: [
      {
        label: "Places au concours commun Mines-Ponts",
        valeur: "215 (MP 82, PSI 70, PC 39, PT 18, MPI 5, TSI 1)",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Frais de scolarité annuels",
        valeur: "3 800 €",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "2025-2026",
      },
      {
        label: "Taux d'insertion à 6 mois",
        valeur: "95 %",
        source: "https://ecoledesponts.fr/formation-initiale/formation-dingenieur/insertion-professionnelle",
        date: "enquête 2026, promotion 2025",
      },
      {
        label: "Salaire brut annuel moyen à l'embauche en France",
        valeur: "51 628 € hors primes, 57 545 € avec primes",
        source: "https://ecoledesponts.fr/formation-initiale/formation-dingenieur/insertion-professionnelle",
        date: "enquête 2026, promotion 2025",
      },
    ],
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://www.ecoledesponts.fr/",
      "https://ecoledesponts.fr/formation-initiale/formation-dingenieur",
      "https://ecoledesponts.fr/formation-initiale/formation-dingenieur/2eme-et-3eme-annees",
      "https://ecoledesponts.fr/formation-initiale/formation-dingenieur/insertion-professionnelle",
      "https://ecoledesponts.fr/admissions/en-formation-dingenieur",
      "https://ecoledesponts.fr/admissions/sinscrire-et-se-reinscrire-lecole",
    ],
  },
  supaero: {
    pourquoi:
      "37 % des employeurs de ses diplômés travaillent dans l'aérospatial et la défense : Airbus, Safran, Thales, Dassault, la DGA, MBDA, ArianeGroup. Les autres recrutent dans le conseil, l'informatique, l'énergie ou l'automobile. 77 % des diplômés 2023 avaient un emploi avant même la remise du diplôme, avec un salaire moyen de 46,5 k€ par an primes incluses.",
    apprendre:
      "Deux ans de tronc commun : mécanique du vol, mathématiques appliquées, informatique, physique, avec économie, gestion de projet et 11 langues au choix. En 3e année, tu combines un domaine d'application (aéronefs, systèmes spatiaux, systèmes autonomes, énergie-transport-environnement, simulation, neuro-IA) et une filière d'expertise, comme la dynamique des fluides. Stages : 4 semaines en 1re année, 2 mois de recherche en 2e, 5 mois en 3e.",
    specificite:
      "École du ministère des Armées, elle a sur son campus 8 avions pour l'initiation au pilotage et une soufflerie. 85 % des élèves font un semestre d'échange, et l'école compte 32 accords de double diplôme, avec HEC ou Sciences Po par exemple.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts",
        valeur: "193",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Diplômés en emploi avant la remise du diplôme",
        valeur: "77 %",
        source:
          "https://www.isae-supaero.fr/wp-content/uploads/2025/03/Plaquette_ingenieur_generaliste_ISAE-SUPAERO_2024.pdf",
        date: "enquête 2024",
      },
      {
        label: "Salaire moyen de sortie en France, primes incluses",
        valeur: "46,5 k€ par an",
        source:
          "https://www.isae-supaero.fr/wp-content/uploads/2025/03/Plaquette_ingenieur_generaliste_ISAE-SUPAERO_2024.pdf",
        date: "enquête 2024",
      },
      {
        label: "Diplômés en un an",
        valeur: "299 ingénieurs généralistes et 30 apprentis",
        source: "https://www.isae-supaero.fr/isae-supaero-6/institut/nos-chiffres-cles/",
      },
    ],
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://www.isae-supaero.fr/wp-content/uploads/2025/03/Plaquette_ingenieur_generaliste_ISAE-SUPAERO_2024.pdf",
      "https://www.isae-supaero.fr/wp-content/uploads/2025/03/Plaquette_ingenieur_specialite-genie-industriel-par-apprentissage_ISAE-SUPAERO_2024.pdf",
      "https://www.isae-supaero.fr/offre-de-formations/ingenieur-generaliste-isae-supaero/",
      "https://www.isae-supaero.fr/isae-supaero-6/institut/nos-chiffres-cles/",
      "https://www.isae-supaero.fr/isae-supaero-6/notre-newsroom/toutes-nos-actualites/admissibles-2026-toutes-les-informations-pour-decouvrir-choisir-lisae-supaero/",
    ],
  },
  ensta: {
    pourquoi:
      "Ses diplômés travaillent dans la défense, l'énergie (dont le nucléaire), les transports, le maritime, le numérique et la santé. Selon ta spécialisation, tu deviens architecte naval, ingénieur en sûreté nucléaire, analyste en cybersécurité ou ingénieur en finance quantitative dans une banque. L'école compte plus de 20 000 diplômés, et la plupart signent leur premier contrat avant le diplôme.",
    apprendre:
      "1re année de tronc commun : mathématiques, physique, mécanique, numérique, langues, et un stage de 4 semaines. En 2e année, tu choisis mathématiques appliquées, mécanique ou sciences du numérique, avec 12 semaines de stage de recherche. En 3e année, 18 spécialisations, de l'intelligence artificielle au génie maritime, aux énergies en mer ou au nucléaire, puis le stage de fin d'études. Chaque élève passe 16 à 17 semaines à l'étranger.",
    specificite:
      "Une seule école sur deux campus, Palaiseau et Brest, pour un même diplôme : la 1re année se fait sur le campus choisi au concours. L'ENSTA forme aussi des ingénieurs militaires (IETA), et 18 % de ses élèves ingénieurs touchent un salaire, comme militaires ou apprentis.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts",
        valeur: "238, dont 16 en apprentissage",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Élèves ingénieurs rémunérés (militaires et apprentis)",
        valeur: "18 %",
        source:
          "https://www.ensta.fr/sites/default/files/content/publications_brochures/pdf/CHIFFRE_CLE_2025-2026_WEB.pdf",
        date: "chiffres clés 2025-2026",
      },
      {
        label: "Boursiers parmi les élèves ingénieurs",
        valeur: "36 %",
        source:
          "https://www.ensta.fr/sites/default/files/content/publications_brochures/pdf/CHIFFRE_CLE_2025-2026_WEB.pdf",
        date: "chiffres clés 2025-2026",
      },
      {
        label: "Diplômés de l'année (tous diplômes)",
        valeur: "plus de 700",
        source:
          "https://www.ensta.fr/sites/default/files/content/publications_brochures/pdf/CHIFFRE_CLE_2025-2026_WEB.pdf",
        date: "2025",
      },
    ],
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://www.ensta.fr/formations/catalogue-de-formations/trouver-ma-formation/formation-dingenieur-generaliste-ensta",
      "https://www.ensta.fr/formations/catalogue-de-formations/admissions",
      "https://www.ensta.fr/formations/catalogue-de-formations/devenir-ingenieur-par-alternance",
      "https://www.ensta.fr/formations/ingenieurs/ingenieur-generaliste/un-large-choix-dexpertise-en-3e-annee",
      "https://www.ensta.fr/sites/default/files/content/publications_brochures/pdf/CHIFFRE_CLE_2025-2026_WEB.pdf",
      "https://www.ensta.fr/rentree-2026-vous-integrez-la-formation-dingenieur-defense-et-securite-statut-militaire-ieta",
    ],
  },
  "telecom-paris": {
    pourquoi:
      "42 % des diplômés 2025 travaillent dans les services numériques, les logiciels et les télécoms, 17 % dans le conseil en stratégie et organisation, et 12 % préparent une thèse. 70 % trouvent leur emploi avant le diplôme, 21 % démarrent leur carrière à l'international. Salaire médian de sortie : 49,1 k€ bruts par an hors primes.",
    apprendre:
      "1re année de tronc commun : mathématiques, physique-électronique, informatique et algorithmique, économie, management, sociologie, langues. En 2e année, tu choisis 2 filières parmi 16 (départements : informatique et réseaux, image-données-signal, communications et électronique). En 3e année, une option parmi 11 avec un projet de recherche, un double diplôme ou un master à l'Institut polytechnique de Paris. Stage ingénieur de 6 mois.",
    specificite:
      "Chaque élève vit une expérience à l'international. Son Parcours Talents, un double diplôme, ouvre l'accès aux corps techniques de l'État ; d'autres doubles diplômes existent avec HEC ou Sciences Po (ingénieur-manager).",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts",
        valeur: "185, plus 7 en apprentissage",
        source: "https://www.telecom-paris.fr/fr/ingenieur/comment-integrer/admission-post-prepa",
        date: "concours 2026",
      },
      {
        label: "Diplômés en emploi avant le diplôme",
        valeur: "70 %",
        source: "https://www.telecom-paris.fr/fr/ingenieur/enquete-1er-emploi",
        date: "enquête 2026",
      },
      {
        label: "Salaire médian de sortie, brut hors primes",
        valeur: "49,1 k€ par an",
        source: "https://www.telecom-paris.fr/fr/ingenieur/enquete-1er-emploi",
        date: "enquête 2026",
      },
      {
        label: "Places en apprentissage, toutes voies",
        valeur: "29",
        source: "https://www.telecom-paris.fr/fr/ingenieur/formation/apprentissage",
      },
    ],
    sources: [
      "https://www.telecom-paris.fr/fr/ingenieur/comment-integrer/admission-post-prepa",
      "https://www.telecom-paris.fr/fr/ingenieur/comment-integrer/droits-admission-bourses",
      "https://www.telecom-paris.fr/fr/ingenieur/enquete-1er-emploi",
      "https://www.telecom-paris.fr/fr/ingenieur",
      "https://www.telecom-paris.fr/fr/ingenieur/formation",
      "https://www.telecom-paris.fr/fr/ingenieur/formation/apprentissage",
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
    ],
  },
  ensae: {
    pourquoi:
      "Pour la promotion 2023 : taux net d'emploi de 94 %, 73 % embauchés avant même le diplôme, 56 500 € bruts par an primes comprises au premier emploi en France. La finance et l'assurance accueillent 33 % des diplômés, le conseil et les études 30 %, l'informatique et l'administration 10 % chacune ; 15 % font une thèse.",
    apprendre:
      "1re année : microéconomie, macroéconomie, probabilités, statistique, informatique, puis un stage d'au moins 4 semaines. 2e année : statistique, économétrie, machine learning, et 10 à 16 semaines de stage. En 3e année, tu choisis un parcours parmi 6 (actuariat, data science, finance-risques-données, politiques économiques, data science sociale…) ou la voie recherche, puis 14 à 26 semaines de stage.",
    specificite:
      "Elle forme aussi les « ingénieurs de la statistique, de l'économie et de la donnée », ex-administrateurs de l'Insee. Elle recrute à la fois en prépa scientifique, en prépa ECG et en khâgne B/L, et accueille environ 25 polytechniciens par an.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts",
        valeur: "80",
        source:
          "https://www.ensae.fr/sites/default/files/pages/documents/Concours/Notice%20maths%20MP%20MPI%20PC%20PSI_2026.pdf",
        date: "concours 2026",
      },
      {
        label: "Taux net d'emploi",
        valeur: "94 %",
        source: "https://www.ensae.fr/en/school/careers-and-alumni/job-placement-and-careers",
        date: "enquête 2024",
      },
      {
        label: "Salaire moyen au premier emploi en France, primes comprises",
        valeur: "56 500 € bruts par an",
        source: "https://www.ensae.fr/en/school/careers-and-alumni/job-placement-and-careers",
        date: "enquête 2024",
      },
      {
        label: "Diplômés en emploi ayant signé avant le diplôme",
        valeur: "73 %",
        source: "https://www.ensae.fr/en/school/careers-and-alumni/job-placement-and-careers",
        date: "enquête 2024",
      },
    ],
    sources: [
      "https://www.ensae.fr/sites/default/files/pages/documents/Concours/Notice%20maths%20MP%20MPI%20PC%20PSI_2026.pdf",
      "https://www.ensae.fr/formation/admission-et-inscription/admission-en-cycle-ingenieur",
      "https://www.ensae.fr/en/student-life/being-student-ensae-paris/tuition-fees",
      "https://www.ensae.fr/en/school/careers-and-alumni/job-placement-and-careers",
      "https://www.ensae.fr/en/education/ingenieur-ensae-program",
      "https://www.ensae.fr/formation/cycle-ingenieur",
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
    ],
  },
  centralesupelec: {
    pourquoi:
      "Promotion 2023 : 80 % des diplômés trouvent un emploi avant la sortie de l'école, 20 % sont embauchés à l'étranger, avec un salaire brut moyen de 53 800 € par an primes comprises. Conseil, bureaux d'études et ingénierie (33 %), informatique (15 %), finance et assurance (12 %), énergie (10 %) recrutent le plus.",
    apprendre:
      "Le cursus avance par séquences de 8 semaines, entre cours et projets : modélisation et information en 1re année, cours électifs en 2e. En 3e année, tu choisis une dominante parmi 8, une mention parmi 23 (intelligence artificielle, quantum engineering, aéronautique-espace-transports, cybersécurité à Rennes…) et une filière métier. L'école annonce 6 mois minimum à l'étranger, 12 en moyenne.",
    specificite:
      "Trois campus (Paris-Saclay, Metz, Rennes) et 7 cursus ingénieur : le généraliste et 6 de spécialité, dont cybersécurité, électronique et informatique. Depuis 2026, les droits suivent le revenu des parents, et l'école compte 80 accords de double diplôme.",
    chiffres: [
      {
        label: "Places au concours Centrale-Supélec (MP, MPI, PC, PSI)",
        valeur: "555, dont 34 en apprentissage",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/bretagne/ille-et-vilaine/centralesupelec-campus-de-rennes/diplome-d-ingenieur-de-l-ecole-centralesupelec",
        date: "concours 2026",
      },
      {
        label: "Diplômés en emploi avant la sortie de l'école",
        valeur: "80 %",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/bretagne/ille-et-vilaine/centralesupelec-campus-de-rennes/diplome-d-ingenieur-de-l-ecole-centralesupelec",
        date: "promotion 2023",
      },
      {
        label: "Salaire brut moyen à l'embauche, primes comprises",
        valeur: "53 800 € par an",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/bretagne/ille-et-vilaine/centralesupelec-campus-de-rennes/diplome-d-ingenieur-de-l-ecole-centralesupelec",
        date: "promotion 2023",
      },
      {
        label: "Admissibles attendus aux oraux du concours Centrale-Supélec",
        valeur: "6 000",
        source: "https://www.centralesupelec.fr/actualites/bienvenue-aux-admissibles-2026",
        date: "session 2026",
      },
    ],
    sources: [
      "https://www.centralesupelec.fr/programmes/ingenieur-generaliste",
      "https://www.onisep.fr/ressources/structures-enseignement/bretagne/ille-et-vilaine/centralesupelec-campus-de-rennes/diplome-d-ingenieur-de-l-ecole-centralesupelec",
      "https://www.centralesupelec.fr/sites/default/files/communiques-de-presse/CentraleSupe%CC%81lec_251204_FichePresse_PolitiqueSociale_Dispositifs_VF.pdf",
      "https://www.centralesupelec.fr/actualites/bienvenue-aux-admissibles-2026",
      "https://www.centralesupelec.fr/programmes/ingenieur-specialite-electronique",
    ],
  },
  "centrale-lyon": {
    pourquoi:
      "Ses diplômés partent surtout dans les technologies de l'information (18 %), l'énergie (18 %), le conseil et les bureaux d'études (12 %), la finance (11 %) et les industries de transport, de l'automobile à l'aéronautique (9 %). 78 % trouvent leur premier emploi en moins d'un mois et 21 % commencent à l'étranger. Salaire brut moyen à l'embauche : 44 177 € par an hors primes (2025).",
    apprendre:
      "1re année de tronc commun (sciences, humanités, économie), projets en équipe et stage d'exécution de 4 semaines. En 2e année, un approfondissement parmi 32 et un projet d'application, souvent avec une entreprise, puis 3 mois de stage. En 3e année, des options comme aéronautique, bio-ingénierie de la santé, énergie, informatique ou transport et décarbonation. Une mobilité internationale est obligatoire pour valider le cursus.",
    specificite:
      "Doubles cursus : architecte avec l'école d'architecture de Lyon dès la 1re année, médecin avec les Hospices civils de Lyon dès la 2e, manager avec emlyon. L'école intègre aussi l'ENISE à Saint-Étienne, où se trouve son cycle préparatoire post-bac CapECL.",
    chiffres: [
      {
        label: "Places au concours Centrale-Supélec (MP, MPI, PC, PSI)",
        valeur: "286",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/ecole-centrale-de-lyon/diplome-d-ingenieur-de-l-ecole-centrale-de-lyon",
        date: "concours 2026",
      },
      {
        label: "Diplômés en emploi en moins d'un mois",
        valeur: "78 %",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/ecole-centrale-de-lyon/diplome-d-ingenieur-de-l-ecole-centrale-de-lyon",
        date: "données 2025",
      },
      {
        label: "Salaire brut moyen à l'embauche, hors primes",
        valeur: "44 177 € par an",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/ecole-centrale-de-lyon/diplome-d-ingenieur-de-l-ecole-centrale-de-lyon",
        date: "2025",
      },
      {
        label: "Candidats au cycle préparatoire CapECL",
        valeur: "1 600 pour 24 places",
        source:
          "https://www.ec-lyon.fr/sites/default/files/content/brochures/pdf/2025-11/dossier-de-presse-2025_centrale-lyon.pdf",
        date: "recrutement 2025",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/ecole-centrale-de-lyon/diplome-d-ingenieur-de-l-ecole-centrale-de-lyon",
      "https://www.ec-lyon.fr/en/academics/general-engineering",
      "https://www.ec-lyon.fr/formation/cycle-preparatoire-capecl",
      "https://www.ec-lyon.fr/centrale-lyon/actualites/parcoursup-comment-integrer-centrale-lyon-apres-un-bac",
      "https://www.ec-lyon.fr/sites/default/files/content/brochures/pdf/2025-11/dossier-de-presse-2025_centrale-lyon.pdf",
      "https://www.ec-lyon.fr/en/academics/energy-engineer",
    ],
  },
  "centrale-lille": {
    pourquoi:
      "Le conseil et les bureaux d'études emploient 38,9 % des jeunes diplômés, l'informatique 19,4 %, la finance 7,4 %, l'énergie 6,5 %. 72,9 % trouvent leur premier emploi avant le diplôme et 13 % sont embauchés à l'étranger. Salaire brut moyen à l'embauche : 47 000 € par an (promotion 2024).",
    apprendre:
      "Deux ans de socle commun : sciences, économie, humanités, développement durable, et un projet d'équipe de 18 mois pour une entreprise ou un laboratoire. En 3e année, un parcours parmi 10 (science des données et IA, industrie 4.0, systèmes embarqués, IA et santé numérique…) et une filière métier. Au moins 36 semaines de stage et 17 semaines à l'international.",
    specificite:
      "Le projet de 18 mois, mené en équipe d'une dizaine d'élèves pour une entreprise ou un laboratoire, structure les deux premières années. Centrale Lille Institut réunit aussi l'ITEEM, l'IG2I à Lens et l'école de chimie ENSCL.",
    chiffres: [
      {
        label: "Places au concours Centrale-Supélec (MP, MPI, PC, PSI)",
        valeur: "205",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ecole-centrale-de-lille/diplome-d-ingenieur-de-l-ecole-centrale-de-lille-de-centrale-lille-institut",
        date: "concours 2026",
      },
      {
        label: "Diplômés en emploi avant le diplôme",
        valeur: "72,9 %",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ecole-centrale-de-lille/diplome-d-ingenieur-de-l-ecole-centrale-de-lille-de-centrale-lille-institut",
        date: "données 2025",
      },
      {
        label: "Salaire brut moyen à l'embauche",
        valeur: "47 000 € par an",
        source: "https://ecole.centralelille.fr/wp-content/uploads/sites/33/2025-10-Ecole-Centrale_Plaquette.pdf",
        date: "promotion 2024, enquête à 4 mois",
      },
      {
        label: "Droits d'inscription selon le revenu",
        valeur: "de 1 500 à 4 500 € par an",
        source: "https://estimation-droits-inscription.centralelille.fr/",
        date: "rentrée 2026",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ecole-centrale-de-lille/diplome-d-ingenieur-de-l-ecole-centrale-de-lille-de-centrale-lille-institut",
      "https://ecole.centralelille.fr/wp-content/uploads/sites/33/2025-10-Ecole-Centrale_Plaquette.pdf",
      "https://estimation-droits-inscription.centralelille.fr/",
      "https://centralelille.fr/wp-content/uploads/Documentations/plaquette-iteem.pdf",
      "https://ig2i.centralelille.fr/en/ig2i/je-suis-bachelier/",
      "https://centralelille.fr/2026/06/17/rentree-2026/",
    ],
  },
  "centrale-nantes": {
    pourquoi:
      "Promotion 2025 : 32 % des diplômés travaillent dans le conseil et l'ingénierie, 25 % dans le numérique, 14 % dans l'industrie des transports, 7 % dans l'énergie. 74 % trouvent un emploi en moins de 2 mois, 20 % à l'international, et 19 % font une thèse. Salaire moyen de sortie en France : 40 728 € hors primes.",
    apprendre:
      "1re année : 65 % de sciences fondamentales, 35 % de sciences humaines, langues et sport, plus 100 h d'engagement citoyen. En 2e puis 3e année, tu prends 2 options parmi 22 (robotique, océan, aéronautique, génie civil, science des données…) et, en 3e année, une option professionnelle parmi 11, dont « Science & musique ». 12 mois de stage en tout, dont 20 semaines en 2e année et 25 en 3e.",
    specificite:
      "Doubles diplômes après 2 ans à Centrale Nantes : ingénieur-architecte, ingénieur-officier avec l'École navale, ingénieur-pharmacien, ingénieur-manager avec Audencia. Deux tiers des élèves partent à l'international en 3e année.",
    chiffres: [
      {
        label: "Places au concours Centrale-Supélec (MP, MPI, PC, PSI)",
        valeur: "260",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/pays-de-la-loire/loire-atlantique/ecole-centrale-de-nantes-nantes-universite/diplome-d-ingenieur-de-l-ecole-centrale-de-nantes",
        date: "concours 2026",
      },
      {
        label: "Premier emploi en moins de 2 mois",
        valeur: "74 %",
        source: "https://www.ec-nantes.fr/centrale-nantes/les-centraliens/que-font-nos-jeunes-diplomes-ingenieurs",
        date: "enquête CGE, promotion 2025",
      },
      {
        label: "Salaire moyen de sortie en France, hors primes",
        valeur: "40 728 €",
        source: "https://www.ec-nantes.fr/centrale-nantes/les-centraliens/que-font-nos-jeunes-diplomes-ingenieurs",
        date: "enquête CGE, promotion 2025",
      },
      {
        label: "Diplômés qui poursuivent en thèse",
        valeur: "19 %",
        source: "https://www.ec-nantes.fr/centrale-nantes/les-centraliens/que-font-nos-jeunes-diplomes-ingenieurs",
        date: "enquête CGE, promotion 2025",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/pays-de-la-loire/loire-atlantique/ecole-centrale-de-nantes-nantes-universite/diplome-d-ingenieur-de-l-ecole-centrale-de-nantes",
      "https://www.ec-nantes.fr/medias/fichier/taupins-2026-web_1779282596685-pdf",
      "https://www.ec-nantes.fr/version-francaise/formation/inscription-1",
      "https://www.ec-nantes.fr/centrale-nantes/les-centraliens/que-font-nos-jeunes-diplomes-ingenieurs",
      "https://www.ec-nantes.fr/organisation/gouvernance/2025-25-20251009-grille-des-tarifs-des-formations-2026-27",
    ],
  },
  "centrale-mediterranee": {
    pourquoi:
      "Centrale Méditerranée forme des ingénieurs généralistes pour l'industrie, le conseil et la recherche. En 3e année, tu choisis une filière métier : analyse de données et aide à la décision, transformation environnementale des organisations, bureau d'études, production et logistique, R&D ou entrepreneuriat. Salaire médian de sortie : 40 000 € bruts par an, primes comprises (brochure de 2023) ; 8 % de la promotion 2021 a poursuivi en thèse.",
    apprendre:
      "Trois semestres de socle scientifique commun, rythmés par 4 semaines de cours puis 1 semaine d'activités en entreprise. En 2e année, tu suis un parcours : bio-ingénierie, énergie durable, environnement, numérique, ou crises et mutations. En 3e année, une option d'approfondissement (informatique, mécanique…) et une filière métier. Au moins un semestre à l'étranger, puis un stage final de 4 à 6 mois.",
    specificite:
      "Toute la promotion suit le rythme de l'alternance dès la 1re année : semaines de cours et semaines en entreprise, comme apprenti, en laboratoire, en création d'entreprise ou sous statut étudiant (parcours Train'ing). Plusieurs parcours de 2e et 3e années se suivent sur le campus de Nice.",
    chiffres: [
      {
        label: "Places au concours Centrale-Supélec (90 MP, 10 MPI, 90 PC, 70 PSI, 5 TSI)",
        valeur: "265",
        source:
          "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-d-ingenieurs-post-prepa-le-concours-centrale-supelec-mode-d-emploi.html",
        date: "concours 2026",
      },
      {
        label: "Places en PT (Banque PT)",
        valeur: "5",
        source: "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
        date: "concours 2026",
      },
      {
        label: "Salaire médian brut annuel de sortie, primes comprises",
        valeur: "40 000 €",
        source: "https://francealumni.fr/docs/2024113902_plaquette-formation-ingenieur-net.pdf",
        date: "brochure de l'école, juin 2023",
      },
      {
        label: "Droits de scolarité annuels",
        valeur: "2 600 €",
        source:
          "https://www.letudiant.fr/educpros/actualite/centrale-mediterranee-accelere-sa-transition-vers-lingenierie-durable.html",
        date: "rentrée 2025",
      },
    ],
    sources: [
      "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-d-ingenieurs-post-prepa-le-concours-centrale-supelec-mode-d-emploi.html",
      "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
      "https://syllabus.centrale-med.fr/plugins/odf-web/odf/_content/program-semestre-5-2-2-2-2/Formation%20d'ing%C3%A9nieur%20centralien.pdf",
      "https://www.centrale-mediterranee.fr/sites/default/files/2025-07/2526_Guide%20apprentissage%20%C3%A9l%C3%A8ves.pdf",
      "https://francealumni.fr/docs/2024113902_plaquette-formation-ingenieur-net.pdf",
      "https://www.letudiant.fr/educpros/actualite/centrale-mediterranee-accelere-sa-transition-vers-lingenierie-durable.html",
      "https://www.letudiant.fr/educpros/actualite/les-ecoles-d-ingenieurs-revoient-leurs-frais-d-inscription-pour-faire-face-aux-contraintes-budgetaires.html",
    ],
  },
  "mines-saint-etienne": {
    pourquoi:
      "Mines Saint-Étienne forme des ingénieurs généralistes pour l'industrie, l'énergie, la santé, la data et la finance. D'après l'école, 99 % des diplômés ICM ont un emploi dans les six mois et 73 % signent avant le diplôme. Salaire moyen de sortie : 47 000 € bruts par an, primes comprises. 58 % rejoignent une PME ou une ETI, 42 % un grand groupe.",
    apprendre:
      "1re année : socle scientifique, technique et humain, stage opérateur de 4 semaines. En 2e année, tu choisis 2 majeures parmi 10 (science des données, informatique, génie biomédical, finance, matériaux, mécanique…) et un défi sociétal parmi 8 (IA, transition écologique, santé…), avec un stage de 3 mois. En 3e année : projet industriel, projet de recherche, stage final de 6 mois. Au moins 3 mois consécutifs à l'étranger.",
    specificite:
      "80 % du cursus ICM est au choix, et 75 % des élèves préparent un double diplôme en 3e année, en France ou à l'étranger. Le cursus FUSION, avec emlyon, associe en 4 ans ingénierie et management, entre Saint-Étienne et Lyon.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts (dont 25 pour FUSION)",
        valeur: "154",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Diplômés ICM en emploi dans les six mois",
        valeur: "99 %",
        source:
          "https://www.mines-stetienne.fr/en/programmes/icm-masters-degree-in-science-and-executive-civil-engineering/careers",
      },
      {
        label: "Salaire moyen brut annuel de sortie, primes comprises",
        valeur: "47 000 €",
        source:
          "https://www.mines-stetienne.fr/en/programmes/icm-masters-degree-in-science-and-executive-civil-engineering/careers",
      },
      {
        label: "Droits de scolarité annuels (ICM, élèves français ou européens)",
        valeur: "3 600 €",
        source:
          "https://www.mines-stetienne.fr/en/programmes/icm-masters-degree-in-science-and-executive-civil-engineering/cost-and-funding",
        date: "nouveaux élèves, rentrée 2026",
      },
    ],
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
      "https://www.mines-stetienne.fr/en/programmes/multidisciplinary-engineering-programmes",
      "https://www.mines-stetienne.fr/en/programmes/icm-masters-degree-in-science-and-executive-civil-engineering",
      "https://www.mines-stetienne.fr/en/programmes/icm-masters-degree-in-science-and-executive-civil-engineering/program-details",
      "https://www.mines-stetienne.fr/en/programmes/icm-masters-degree-in-science-and-executive-civil-engineering/cost-and-funding",
      "https://www.mines-stetienne.fr/en/programmes/icm-masters-degree-in-science-and-executive-civil-engineering/careers",
      "https://www.mines-stetienne.fr/en/programmes/specialized-work-study-engineers",
      "https://www.letudiant.fr/educpros/actualite/les-ecoles-d-ingenieurs-revoient-leurs-frais-d-inscription-pour-faire-face-aux-contraintes-budgetaires.html",
    ],
  },
  "mines-nancy": {
    pourquoi:
      "Mines Nancy forme des ingénieurs généralistes pour l'énergie, le numérique, les matériaux, le génie civil et l'industrie. D'après sa brochure 2025, 97 % de ses diplômés trouvent un emploi et 75 % sont recrutés en moins de 4 mois. Sept laboratoires de recherche lui sont associés, et le classement de Shanghai 2024 la place au 50e rang mondial en ingénierie minière.",
    apprendre:
      "1re année : tronc commun scientifique et managérial, stage opérateur d'un mois. En 2e année, tu choisis un département (énergie, informatique, géosciences et génie civil, génie industriel et maths appliquées, matériaux) et un parcours, par exemple robotique, cybersécurité ou transition énergétique. Stage de 3 mois en 2e année, stage de fin d'études de 6 mois ; 75 % des élèves font leur 3e année hors de l'école.",
    specificite:
      "Avec l'alliance Artem, tu mènes en 2e année un projet un jour par semaine avec des étudiants en art et en management de Nancy. Une section germanophone propose un cursus bilingue sur les 3 ans, jusqu'à 100 % des cours en allemand en 3e année.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts",
        valeur: "141",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Insertion moyenne, toutes formations",
        valeur: "97 %",
        source:
          "https://mines-nancy.univ-lorraine.fr/wp-content/uploads/2025/07/MinesNancy_PlaquettePartenaires_planche_vf.pdf",
        date: "brochure d'avril 2025",
      },
      {
        label: "Diplômés recrutés en moins de 4 mois",
        valeur: "75 %",
        source:
          "https://mines-nancy.univ-lorraine.fr/wp-content/uploads/2025/07/MinesNancy_PlaquettePartenaires_planche_vf.pdf",
        date: "brochure d'avril 2025",
      },
      {
        label: "Droits de scolarité annuels (élèves de l'Union européenne)",
        valeur: "2 613 €",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "notice du concours 2026",
      },
    ],
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
      "https://mines-nancy.univ-lorraine.fr/formation/ingenieur-civil-mines-icm/",
      "https://mines-nancy.univ-lorraine.fr/admission/apres-prepa-inp/",
      "https://mines-nancy.univ-lorraine.fr/entreprises/recrutez-vos-futurs-talents/apprentissage/",
      "https://mines-nancy.univ-lorraine.fr/admission/preparez-arrivee-a-mines-nancy/financer-mes-etudes/",
      "https://mines-nancy.univ-lorraine.fr/wp-content/uploads/2025/07/MinesNancy_PlaquettePartenaires_planche_vf.pdf",
    ],
  },
  "imt-atlantique": {
    pourquoi:
      "IMT Atlantique forme des ingénieurs du numérique, de l'énergie et de l'industrie. Enquête 2025 sur la promotion 2024 : 87 % en activité, 82,5 % en poste moins de deux mois après le diplôme, 41 888 € bruts par an hors primes, 9 % de débuts de carrière à l'étranger. Premiers recruteurs de la promotion 2023 : EDF, Wavestone et Orange.",
    apprendre:
      "1re année : tronc commun scientifique et technique, projets collaboratifs, langues. En 2e et 3e années, tu choisis 2 thématiques d'approfondissement parmi 23, dans des domaines comme l'automatique et la robotique, l'énergie et le nucléaire, l'informatique et les réseaux ou l'ingénierie de la santé. Au moins 9 mois de stages et un semestre à l'étranger ; 40 doubles diplômes possibles hors de France.",
    specificite:
      "Une école sur trois campus, à Brest, Nantes et Rennes, avec environ 40 % d'étudiants internationaux venus de plus de 70 pays. Son diplôme se classe 3e au palmarès L'Étudiant des écoles d'ingénieurs.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts",
        valeur: "290",
        source: "https://www.imt-atlantique.fr/fr/formation/ingenieur-generaliste/candidater",
        date: "2026",
      },
      {
        label: "Diplômés en poste moins de deux mois après le diplôme",
        valeur: "82,5 %",
        source: "https://www.imt-atlantique.fr/fr/entreprises/alumnis/insertion-emploi",
        date: "promotion 2024",
      },
      {
        label: "Salaire brut annuel de sortie, hors primes",
        valeur: "41 888 €",
        source: "https://www.imt-atlantique.fr/fr/entreprises/alumnis/insertion-emploi",
        date: "promotion 2024",
      },
      {
        label: "Droits de scolarité annuels (étudiants européens)",
        valeur: "3 600 €",
        source: "https://www.imt-atlantique.fr/fr/formation/admission/budget-etudiant",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://www.imt-atlantique.fr/fr/formation/ingenieur-generaliste/candidater",
      "https://www.imt-atlantique.fr/fr/formation/ingenieur-generaliste",
      "https://www.imt-atlantique.fr/fr/formation/ingenieur-generaliste/diplome",
      "https://www.imt-atlantique.fr/fr/formation/admission/budget-etudiant",
      "https://www.imt-atlantique.fr/fr/entreprises/alumnis/insertion-emploi",
      "https://www.imt-atlantique.fr/fr/formation/ingenieur-apprentissage",
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
    ],
  },
  supoptique: {
    pourquoi:
      "SupOptique forme des ingénieurs de l'optique et de la photonique : systèmes optiques, imagerie, vision artificielle, nanosciences. D'après l'Onisep, 96,2 % des diplômés trouvent un emploi en 2 mois, pour un salaire brut moyen d'embauche de 40 873 € en 2024. Ils travaillent en conseil et ingénierie (37,9 %), en R&D (17,2 %), en enseignement et recherche (10,3 %) ; 19 % sont embauchés à l'étranger.",
    apprendre:
      "La 1re année, commune, se passe à Palaiseau. En 2e et 3e années, tu rejoins un site thématique : Paris-Saclay (interaction lumière-matière, nanosciences, signal et image, systèmes optiques avancés), Bordeaux (optique numérique, données, images et neurosciences) ou Saint-Étienne (systèmes optiques, vision artificielle, énergie). Les stages se font en entreprise ou en laboratoire.",
    specificite:
      "Une école tout entière consacrée à l'optique, fondée en 1917, adossée à trois laboratoires : Charles Fabry à Palaiseau, LP2N à Bordeaux, Hubert Curien à Saint-Étienne. Sa filière entrepreneuriat accompagne les élèves qui créent leur entreprise.",
    chiffres: [
      {
        label: "Places au concours Centrale-Supélec (MP, MPI, PC, PSI, dont 6 pour candidats étrangers)",
        valeur: "124",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/institut-d-optique-theorique-et-appliquee-campus-de-palaiseau-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
        date: "2026",
      },
      {
        label: "Diplômés en emploi en 2 mois",
        valeur: "96,2 %",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/institut-d-optique-theorique-et-appliquee-campus-de-palaiseau-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
      },
      {
        label: "Salaire annuel brut moyen à l'embauche",
        valeur: "40 873 €",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/institut-d-optique-theorique-et-appliquee-campus-de-palaiseau-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
        date: "2024",
      },
      {
        label: "Frais de scolarité annuels",
        valeur: "3 200 €",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/loire/institut-d-optique-theorique-et-appliquee-campus-de-saint-etienne/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
        date: "2026",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/institut-d-optique-theorique-et-appliquee-campus-de-palaiseau-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/loire/institut-d-optique-theorique-et-appliquee-campus-de-saint-etienne/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
      "https://www.onisep.fr/ressources/structures-enseignement/nouvelle-aquitaine/gironde/institut-d-optique-theorique-et-appliquee-campus-de-bordeaux-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/diplome-d-ingenieur-de-l-institut-d-optique-theorique-et-appliquee",
      "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-d-ingenieurs-post-prepa-le-concours-centrale-supelec-mode-d-emploi.html",
      "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
      "https://www.francealumni.fr/docs/2021162943_institut-d-optique-english-brochure-lr.pdf",
      "https://diplomeo.com/etablissement-iota_institut_d_optique_graduate_school-1098",
    ],
  },
  "chimie-paristech": {
    pourquoi:
      "Chimie ParisTech forme des ingénieurs chimistes pour l'industrie chimique, les matériaux, l'énergie, la cosmétique, les biotechnologies ou le conseil, et pour la recherche publique. L'école héberge 3 laboratoires, et le parcours recherche de 3e année prépare au doctorat. D'après la notice du concours 2026, 95 % des diplômés trouvent un emploi dans les 3 mois.",
    apprendre:
      "1re année : chimie moléculaire, chimie des matériaux, économie et management, stage ouvrier de 1 à 2 mois. En 2e année, un tronc commun (génie chimique, polymères, chimie analytique, énergies…), puis une option parmi six et un stage de 5 mois. En 3e année, parcours ingénierie (énergie, cosmétologie, chimie verte, biotechnologies, procédés…) ou recherche, puis projet de fin d'études de 6 mois. 40 % de la formation est expérimentale.",
    specificite:
      "Une école d'environ 500 étudiants, membre de l'Université PSL, qui délivre son diplôme au nom de PSL. Options et doubles diplômes avec l'ESPCI, AgroParisTech, Dauphine-PSL ou IFP School ; mobilité internationale obligatoire, en stage ou en semestre d'études.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts (68 PC, 3 PSI)",
        valeur: "71",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Droits de scolarité des nouveaux entrants en 1re année (étudiants européens)",
        valeur: "1 200 €",
        source: "https://www.chimieparistech.psl.eu/formation/cycle-ingenieur/cvec-frais-scolarite/",
        date: "2026-2027",
      },
      {
        label: "Diplômés en emploi dans les 3 mois",
        valeur: "95 %",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "notice du concours 2026",
      },
      {
        label: "Diplômés par an",
        valeur: "115",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "notice du concours 2026",
      },
    ],
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://psl.eu/formation/cycle-ingenieur-chimie-paristech",
      "https://www.chimieparistech.psl.eu/formations/cycle-ingenieur/",
      "https://www.chimieparistech.psl.eu/formation/cycle-ingenieur/cvec-frais-scolarite/",
      "https://www.chimieparistech.psl.eu/wp-content/uploads/2025/06/chimie-paris-formation-2025-depliant.pdf",
      "https://www.chimieparistech.psl.eu/wp-content/uploads/2023/12/2023-11plaquette-alternance-3a.pdf",
    ],
  },
  ensimag: {
    pourquoi:
      "L'Ensimag forme des ingénieurs en informatique, mathématiques appliquées et télécommunications. Sa filière Ingénierie des systèmes d'information mène par exemple aux métiers d'architecte de systèmes d'information, de chef de projets logiciels, d'administrateur réseaux ou de responsable de la sécurité informatique. 150 de ses 160 places au Concours Commun INP 2026 vont aux prépas MP et MPI.",
    apprendre:
      "Le cursus dure 3 ans après la prépa. En 2e année, tu choisis une filière : en Ingénierie des systèmes d'information, par exemple, tu te spécialises en architecture de systèmes complexes, en sécurité ou en systèmes d'information. En 3e année, un master peut s'ajouter au diplôme, comme le MSc in Informatics at Grenoble ou le master Cybersecurity.",
    specificite:
      "Une école de Grenoble INP - UGA, créée en 1960, consacrée à l'informatique et aux mathématiques appliquées, avec une voie en apprentissage pour le même diplôme d'ingénieur.",
    chiffres: [
      {
        label: "Places au Concours Commun INP (110 MP, 40 MPI, 5 PC, 5 PSI)",
        valeur: "160",
        source: "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
        date: "session 2026",
      },
      {
        label: "Places en PT (Banque PT)",
        valeur: "10",
        source: "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
        date: "concours 2026",
      },
      {
        label: "Droits annuels d'un étudiant français ou européen dans une école de Grenoble INP - UGA",
        valeur: "630 €",
        source: "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mpi.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-pc.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-psi.html",
      "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
      "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
      "https://www.cti-commission.fr/wp-content/uploads/2026/01/arrete_2025.pdf",
      "https://www.cge.asso.fr/ecoles/grenoble-inp-ensimag-2/",
      "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
      "https://formations.univ-grenoble-alpes.fr/plugins/odf-web/odf/_content/program-ingenieur-de-grenoble-inp-ensimag-filiere-ingenierie-des-systemes-d-information/.pdf",
      "https://diplomeo.com/actualite-comment_j_ai_integre_une_formation_d_ingenieur_a_grenoble_inp_ensimag",
      "https://mines-nancy.univ-lorraine.fr/admission/apres-prepa-inp/",
    ],
  },
  ensai: {
    pourquoi:
      "L'ENSAI forme des ingénieurs de la donnée : statistique, data science, gestion des risques, biostatistique. 92 % de la promotion 2023 avait un emploi moins de 2 mois après le diplôme, pour environ 42 600 € bruts par an hors primes (enquête CGE 2024). La banque, la santé, le marketing et l'industrie recrutent ses ingénieurs ; ses attachés statisticiens rejoignent l'Insee, les services statistiques des ministères ou la Banque de France.",
    apprendre:
      "1re année : socle commun en statistique, économie et informatique. 2e année : statistique avancée et deux grands projets. En 3e année, tu choisis une spécialisation parmi six, toutes en data science : gestion des risques, modélisation économique et santé, marketing, génie statistique, ingénierie des données, biostatistique. Trois stages obligatoires, de 8 à 13 mois au total, et 4 mois d'expérience à l'étranger.",
    specificite:
      "Sur le même concours, tu peux entrer comme élève ingénieur ou comme élève fonctionnaire : l'attaché statisticien stagiaire de l'Insee touche 1 900 € bruts par mois pendant ses études, puis environ 3 500 € dès sa titularisation.",
    chiffres: [
      {
        label: "Places d'élèves ingénieurs au Concours Commun INP (45 MP, 8 MPI, 5 PC, 5 PSI)",
        valeur: "63",
        source: "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
        date: "session 2026",
      },
      {
        label: "Places d'élèves fonctionnaires, attachés statisticiens de l'Insee (20 MP, 3 MPI, 3 PC, 3 PSI)",
        valeur: "29",
        source: "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
        date: "session 2026",
      },
      {
        label: "Diplômés en emploi moins de 2 mois après le diplôme",
        valeur: "92 %",
        source: "https://www.insee.fr/fr/statistiques/fichier/8615308/plaquette_ensai.pdf",
        date: "promotion 2023",
      },
      {
        label: "Salaire brut annuel des ingénieurs à la sortie, hors primes",
        valeur: "environ 42 600 €",
        source: "https://www.insee.fr/fr/statistiques/fichier/8615308/plaquette_ensai.pdf",
        date: "enquête CGE 2024",
      },
    ],
    sources: [
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mpi.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-pc.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-psi.html",
      "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
      "https://www.insee.fr/fr/statistiques/fichier/8615308/plaquette_ensai.pdf",
      "https://www.insee.fr/fr/information/8615308",
      "https://www.cti-commission.fr/wp-content/uploads/2026/01/arrete_2025.pdf",
      "https://www.cge.asso.fr/ecoles/ensai-2/",
      "https://www.onisep.fr/ressources/structures-enseignement/bretagne/ille-et-vilaine/ecole-nationale-de-la-statistique-et-de-l-analyse-de-l-information",
      "https://ressources.campusfrance.org/pratique/etablissements/fr/ing_ensai_fr.pdf",
    ],
  },
  utt: {
    pourquoi:
      "Pour un métier d'ingénieur ouvert : chef de projet, consultant, développeur, sécurité informatique, R&D. Dans la promotion 2024, 92 % des diplômés ont un emploi et 67 % étaient embauchés avant le diplôme, à 42 520 € bruts par an en moyenne, primes comprises. Les premiers secteurs : informatique (33 %), conseil et études (20 %), puis transports.",
    apprendre:
      "Deux ans de tronc commun : sciences fondamentales, techniques de l'ingénieur, sciences humaines, avec des cours bilingues anglais-français. Puis trois ans dans l'une des 7 branches : génie industriel, génie mécanique, informatique et systèmes d'information, deux branches matériaux, réseaux et télécoms, systèmes numériques et IA. Un semestre d'études à l'étranger est possible dès le 4e semestre : Europe, Chine, Canada.",
    specificite:
      "Tu composes ton parcours à la carte dès le 1er semestre, puis tu choisis librement ta branche à la fin du tronc commun, hors classement interne. En cas de retard, tu prolonges ton cursus le temps de valider les modules manquants.",
    chiffres: [
      {
        label: "Places en 1re année",
        valeur: "314",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=54&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Vœux confirmés",
        valeur: "5 395",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=54&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées",
        valeur: "5 450 candidats, 2 364 propositions, 357 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=54&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Taux net d'emploi des diplômés",
        valeur: "92 %",
        source:
          "https://www.utt.fr/actualites/enquete-dinsertion-2025-sur-la-promotion-2024-linsertion-des-diplomes-reste-bonne-malgre-une-baisse-des-offres-demploi",
        date: "enquête 2025, promotion 2024",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=54&typeBac=0&originePc=0",
      "https://www.utt.fr/actualites/enquete-dinsertion-2025-sur-la-promotion-2024-linsertion-des-diplomes-reste-bonne-malgre-une-baisse-des-offres-demploi",
      "https://www.utt.fr/formations/l-insertion-des-ingenieurs-en-chiffres",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  insa: {
    pourquoi:
      "L'INSA Lyon ouvre la plus grande promotion de 1re année des écoles d'ingénieurs sur Parcoursup : 665 places en 2026. Tu y vises 9 spécialités, des biotechnologies aux télécoms, en passant par le génie civil, l'énergie et l'informatique, pour les droits d'une école publique. Tu rejoins aussi le Groupe INSA et ses plus de 100 500 anciens élèves.",
    apprendre:
      "Deux ans de premier cycle (FIMI) pour poser les bases scientifiques, en filière classique, internationale, sport de haut niveau (en 3 ans) ou musique-études. De la 3e à la 5e année, tu rejoins un département : biotechnologies et bioinformatique, génie civil et urbain, génie électrique, énergétique et environnement, industriel, mécanique, informatique, matériaux ou télécommunications.",
    specificite:
      "Le premier cycle se décline en sections internationales (EURINSA, AMERINSA, GLOBALINSA), en section sport de haut niveau et en musique-études. La voie INS'Avenir, en 6 ans avec une année préparatoire, accueille les bacheliers STI2D et STL.",
    chiffres: [
      {
        label: "Places en 1re année (bac général)",
        valeur: "665",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=62&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Vœux confirmés (bac général)",
        valeur: "16 597",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=62&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées (bac général)",
        valeur: "16 884 candidats, 2 004 propositions, 661 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=62&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Places INS'Avenir (bacs STI2D et STL)",
        valeur: "26 places, 484 vœux confirmés",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=67&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=62&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=67&typeBac=0&originePc=0",
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/institut-national-des-sciences-appliquees-de-lyon-site-de-lyon",
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/institut-national-des-sciences-appliquees-de-lyon-site-de-lyon/premier-cycle-insa-post-bac-general-formation-initiale-aux-metiers-d-ingenieur-fimi-de-l-insa-de-lyon",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      "https://www.insa-rennes.fr/fileadmin/ressources/Rubriques/02-INSA/documentation/OffreDeFormation_INSA-Rennes_2026-2027.pdf",
    ],
  },
  "insa-toulouse": {
    pourquoi:
      "L'INSA Toulouse prépare à 8 métiers d'ingénieur, de l'automatique-électronique au génie biologique, en passant par le génie civil, l'informatique et les réseaux ou les mathématiques appliquées. Le choix se fait par étapes : un grand domaine en 2e année, une spécialité en 4e année. En 2026, l'école a reçu 15 760 vœux pour 260 places : vise un dossier solide.",
    apprendre:
      "La 1re année est commune à tous. En 2e et 3e années, tu suis une pré-orientation dans l'un des 4 domaines : génie civil ; génie chimique, biochimique et environnement ; matériaux, composants et systèmes ; modélisation, informatique et communication. En 4e et 5e années, tu choisis parmi 8 spécialités, dont génie mécanique, génie physique et génie des procédés.",
    specificite:
      "Les bacheliers STI2D et STL ont leur propre premier cycle, la « Formation active en sciences » : 40 places en 2026. En LV2, tu peux choisir le chinois, le japonais ou la langue des signes française, en plus de l'allemand, de l'espagnol ou de l'italien.",
    chiffres: [
      {
        label: "Places en 1re année (bac général)",
        valeur: "260",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=59&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Vœux confirmés (bac général)",
        valeur: "15 760",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=59&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées (bac général)",
        valeur: "16 071 candidats, 2 121 propositions, 276 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=59&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Places pour les bacs STI2D et STL",
        valeur: "40 places, 498 vœux confirmés",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=66&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=59&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=66&typeBac=0&originePc=0",
      "https://www.insa-toulouse.fr/en/formation/formation-en/licence-ingenieur-insa-de-toulouse-annees-1-2-et-3/",
      "https://www.insa-toulouse.fr/en/training-program/",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  "insa-rennes": {
    pourquoi:
      "Une école publique à dominante numérique : informatique, mathématiques appliquées, électronique et informatique industrielle, électronique et télécoms, systèmes embarqués. S'y ajoutent le génie civil et urbain, la mécanique-automatique et la physique-matériaux. La mobilité internationale est obligatoire, en stage ou en semestre, parmi plus de 200 universités partenaires.",
    apprendre:
      "Deux ans de tronc commun en STPI : 70 % de sciences, 20 % d'ouverture, 10 % d'orientation, et un stage ouvrier d'au moins 4 semaines dès la fin de la 1re année. De la 3e à la 5e année, tu te spécialises, avec des stages en entreprise de 1 à 3 mois et un projet de fin d'études de 5 mois.",
    specificite:
      "Le tronc commun existe en version internationale (GLOBALINSA) ou en filière avec Sciences Po Rennes, pour un double diplôme en 6 ans. Les élèves de génie civil peuvent aussi viser un double cursus d'architecte-ingénieur, en 7 ans après le bac.",
    chiffres: [
      {
        label: "Places en 1re année",
        valeur: "230",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=60&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Vœux confirmés",
        valeur: "13 638",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=60&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées",
        valeur: "14 043 candidats, 2 827 propositions, 243 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=60&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Admis avec mention très bien",
        valeur: "73 % (dont 5 % avec les félicitations du jury) ; 26 % avec mention bien",
        source:
          "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
        date: "Parcoursup 2025",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=60&typeBac=0&originePc=0",
      "https://www.insa-rennes.fr/premier-cycle-ingenieur-e.html",
      "https://www.insa-rennes.fr/cursus-ingenieur-e.html",
      "https://www.insa-rennes.fr/fileadmin/ressources/Rubriques/02-INSA/documentation/OffreDeFormation_INSA-Rennes_2026-2027.pdf",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
    ],
  },
  utc: {
    pourquoi:
      "Selon l'école, 97,2 % des diplômés ont un emploi, trouvé en 1 mois en moyenne, et 61,5 % sont embauchés avant même leur sortie. Ils travaillent dans de grands groupes, des PME ou des entreprises publiques, comme chefs de projet, en R&D, en développement produit ou en qualité. Le réseau des anciens compte 28 300 diplômés.",
    apprendre:
      "Le tronc commun mêle sciences, techniques et sciences humaines, avec des modules que tu choisis toi-même. Tu entres ensuite dans une branche : génie biologique, informatique, ingénierie mécanique, génie des procédés ou génie urbain. En ingénierie mécanique, la plus grosse branche avec 1 100 élèves, le cycle comprend deux stages de six mois.",
    specificite:
      "Le semestre à l'étranger est obligatoire, parmi 204 universités partenaires. Le cursus « Humanités et technologie » (Hutech), à recrutement séparé, a ouvert 25 places en 2025.",
    chiffres: [
      {
        label: "Places en 1re année",
        valeur: "400",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=55&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Vœux confirmés",
        valeur: "6 635",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=55&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées",
        valeur: "6 861 candidats, 1 506 propositions, 449 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=55&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Admis avec mention très bien",
        valeur: "80 % (dont 12 % avec les félicitations du jury)",
        source:
          "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
        date: "Parcoursup 2025",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=55&typeBac=0&originePc=0",
      "https://www.utc.fr/wp-content/uploads/sites/28/2024/05/plaquettechiffres24-fr.pdf",
      "https://www.utc.fr/wp-content/uploads/sites/28/2025/10/im-2025.pdf",
      "https://www.utc.fr/formations/candidater-a-lutc/candidater-au-diplome-dingenieur-utc/",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
    ],
  },
  utbm: {
    pourquoi:
      "L'UTBM forme des ingénieurs pour l'industrie : production, méthodes et logistique (28,5 % des postes), bureau d'études (26,5 %), informatique. Sur les promotions 2021 à 2023, 88,5 % des diplômés ont un statut de cadre, et 21,5 % travaillent à l'international, notamment en Suisse.",
    apprendre:
      "Quatre semestres de tronc commun pluridisciplinaire, avec un stage de 4 semaines, puis une spécialité : énergie et génie électrique, mécanique, mécanique et ergonomie, informatique ou génie industriel. Tu étudies l'anglais, et tu peux y ajouter l'allemand, l'espagnol ou le chinois.",
    specificite:
      "À la fin du tronc commun, tu accèdes librement à la spécialité de ton choix, hors sélection et classement. Le recrutement est plus ouvert que dans les autres UT : en 2025, 54 % des admis avaient une mention bien et 28 % une mention assez bien.",
    chiffres: [
      {
        label: "Places en 1re année",
        valeur: "290",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=56&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Vœux confirmés",
        valeur: "4 577",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=56&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées",
        valeur: "4 584 candidats, 3 066 propositions, 316 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=56&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Mentions des admis",
        valeur: "14 % très bien, 54 % bien, 28 % assez bien",
        source:
          "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
        date: "Parcoursup 2025",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=56&typeBac=0&originePc=0",
      "https://www.utbm.fr/wp-content/uploads/2025/01/Synth-E2024-5FISE.pdf",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
    ],
  },
  "groupe-insa": {
    pourquoi:
      "Ces quatre INSA suivent la même admission que Lyon, Toulouse et Rennes, avec les droits d'une école publique, et accueillent plus largement : en 2025, chacun a fait entre 3 875 et 7 102 propositions, pour 192 à 261 entrées. Le Groupe INSA réunit environ 20 000 étudiants et plus de 100 500 anciens élèves.",
    apprendre:
      "Deux ans de premier cycle scientifique (STPI), puis trois ans de spécialité. À Rouen, 11 spécialités, de la chimie aux mathématiques appliquées ; à Blois et Bourges, génie des systèmes industriels, maîtrise des risques industriels, sécurité informatique, énergie et environnement. L'apprentissage s'ouvre partout à partir de la 3e année.",
    specificite:
      "Les critères et le calendrier sont communs à tous les INSA : tu peux candidater dans plusieurs à la fois. INSA Rouen Normandie accueille les sportifs de haut niveau en section sport-études, et l'INSA Strasbourg vise au moins 11 % de boursiers parmi ses admis en 2026.",
    chiffres: [
      {
        label: "Places en 1re année, INSA Rouen Normandie",
        valeur: "245 (12 124 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=63&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Places en 1re année, INSA Strasbourg",
        valeur: "210 (12 774 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=61&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Places en 1re année, INSA Hauts-de-France",
        valeur: "200 (10 708 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=249&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Places en 1re année, INSA Centre Val de Loire (Blois)",
        valeur: "180 (10 042 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=58&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=63&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=61&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=249&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=58&typeBac=0&originePc=0",
      "https://www.insa-centrevaldeloire.fr/en/education/engineering-departments",
      "https://webcom.insa-rouen.fr/jpo/formations.html",
      "https://www.insa-rennes.fr/fileadmin/ressources/Rubriques/02-INSA/documentation/OffreDeFormation_INSA-Rennes_2026-2027.pdf",
      "https://www.cidj.com/s-orienter/avec-parcoursup/ecoles-d-ingenieurs-des-le-bac-le-guide-2026-des-concours-et-admissions",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  "reseau-polytech": {
    pourquoi:
      "Seize écoles publiques d'ingénieurs, au sein des universités, qui forment 10 % des ingénieurs diplômés en France. Après le PeiP, tu choisis parmi 100 spécialités réparties en 12 domaines, dans ton école ou dans une autre ville du réseau. Les droits sont ceux d'une école publique, gratuits pour les boursiers.",
    apprendre:
      "Le PeiP dure deux ans : sciences fondamentales, démarche d'ingénieur, travaux dirigés en petits groupes, tutorat, projet professionnel et stage de découverte en entreprise. Selon le réseau, 80 à 90 % des élèves passent ensuite en cycle ingénieur, pour trois ans de spécialité, avec stages et apprentissage possible.",
    specificite:
      "Une même procédure, le concours Geipi Polytech, ouvre l'accès aux 16 écoles : tu fais tes vœux sur plusieurs villes avec un seul écrit. Le niveau demandé est plus accessible qu'aux INSA : à Polytech Marseille, en 2025, 59 % des admis avaient une mention bien et 16 % une mention assez bien.",
    chiffres: [
      {
        label: "Places en 1re année, Polytech Marseille",
        valeur: "200 (10 967 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=9&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées, Polytech Marseille",
        valeur: "10 956 candidats, 5 720 propositions, 203 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=9&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Places de PeiP dans les 16 écoles (bac général)",
        valeur: "2 391",
        source:
          "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
        date: "Parcoursup 2025",
      },
      {
        label: "Places du concours Geipi Polytech (35 écoles)",
        valeur: "4 000 en voie générale, 245 en voie technologique",
        source: "https://www.geipi-polytech.org/private/6916f1fec3c34?utm_id=22",
        date: "concours 2026",
      },
    ],
    sources: [
      "https://www.polytech-reseau.org",
      "https://www.geipi-polytech.org/private/6916f1fec3c34?utm_id=22",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=9&typeBac=0&originePc=0",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
    ],
  },
  "prepa-des-inp": {
    pourquoi:
      "La Prépa des INP te mène en deux ans, sur contrôle continu, à l'une des plus de 40 écoles du Groupe INP et de ses partenaires. En 2025, 99 % des élèves sont entrés en école, et plus de 90 % ont obtenu l'un de leurs trois premiers vœux. Tu gardes ainsi un large choix de spécialités, avec les droits d'une école publique.",
    apprendre:
      "Environ 1 800 heures en deux ans, soit 30 heures par semaine : un tronc commun scientifique de 1 450 heures, puis 320 heures d'enseignements à choix en 2e année, tournés vers les écoles visées. Un stage en entreprise ou en laboratoire en mai-juin de la 2e année et un projet professionnel construit sur les deux ans complètent la formation.",
    specificite:
      "L'entrée en école se joue sur ton classement en contrôle continu, hors concours de fin de prépa : un jury affecte chaque élève selon son mérite et ses vœux. La prépa dure deux ans, trois pour les sportifs et artistes de haut niveau.",
    chiffres: [
      {
        label: "Places à Grenoble",
        valeur: "113 (3 622 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=4&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Places à Toulouse",
        valeur: "96 (4 009 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=47711&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Places à Nancy",
        valeur: "86 (2 598 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=5&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Places à Bordeaux",
        valeur: "70 (3 782 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=3&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
    ],
    sources: [
      "https://www.groupe-inp.fr/la-prepa-des-inp",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=4&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=47711&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=5&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=3&typeBac=0&originePc=0",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  esilv: {
    pourquoi:
      "Selon l'école, 70 % des diplômés 2024 étaient embauchés avant la fin du cursus, pour 47 700 € par an en moyenne en France, primes incluses, et 68 700 € à l'étranger. Ils démarrent surtout dans l'informatique et la data (33 %), la banque, la finance et l'assurance (19 %) et le conseil (16 %).",
    apprendre:
      "Deux ans de prépa intégrée, avec un parcours en anglais possible dès la 1re année, puis trois ans de cycle ingénieur. En 4e année, tu choisis l'une des 15 majeures : data et IA, fintech, actuariat, aérospatial et défense, cybersécurité, robotique, énergie et villes durables, santé… Au total, 14 mois de stages et au moins un semestre à l'international.",
    specificite:
      "Chaque année, un projet technologique en équipe ; en 4e et 5e années, 11 parcours transversaux à combiner avec ta majeure, de la recherche aux sciences quantiques en passant par l'entrepreneuriat. Au concours, les épreuves écrites pèsent le plus lourd : prépare les QCM.",
    chiffres: [
      {
        label: "Places à Paris-La Défense",
        valeur: "390 (6 249 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=13652&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées à Paris-La Défense",
        valeur: "7 146 candidats, 2 462 propositions, 432 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=13652&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Mentions des admis à Paris-La Défense",
        valeur: "45 % très bien, 49 % bien",
        source:
          "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
        date: "Parcoursup 2025",
      },
      {
        label: "Frais de scolarité",
        valeur: "11 400 € par an",
        source: "https://www.esilv.fr/admissions/tarifs-et-financement/",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=13652&typeBac=0&originePc=0",
      "https://www.esilv.fr/admissions/tarifs-et-financement/",
      "https://www.cidj.com/s-orienter/avec-parcoursup/ecoles-d-ingenieurs-des-le-bac-le-guide-2026-des-concours-et-admissions",
      "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
    ],
  },
  ece: {
    pourquoi:
      "Une école tournée vers le numérique et les technologies : cybersécurité, data et IA, systèmes embarqués, défense, finance, santé, énergie. Selon l'enquête 2025 de l'école, 98 % des diplômés 2024 avaient une offre d'embauche avant le diplôme, pour 48 200 € par an en moyenne, primes incluses.",
    apprendre:
      "Deux ans de prépa intégrée : sciences fondamentales, électronique, informatique, langues et formation humaine. En cycle ingénieur, une année commune à Paris, puis deux ans de majeure parmi 12, dont aéronautique et spatial à Bordeaux. Plus de 100 heures de projets par an et 13 mois d'expérience professionnelle sur le cursus.",
    specificite:
      "Plus de 130 programmes d'échange dans 50 pays et 9 doubles diplômes internationaux. Le recrutement est large : en 2025, l'ECE Paris a fait 5 660 propositions pour 6 452 candidats, et une bonne mention au bac réduit la facture de 10 à 20 %.",
    chiffres: [
      {
        label: "Places à Paris",
        valeur: "520 (5 661 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=103&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées à Paris",
        valeur: "6 452 candidats, 5 660 propositions, 512 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=103&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Mentions des admis à Paris",
        valeur: "4 % très bien, 37 % bien, 43 % assez bien",
        source:
          "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
        date: "Parcoursup 2025",
      },
      {
        label: "Frais de scolarité",
        valeur: "11 990 € par an",
        source: "https://www.ece.fr/en/tuition-fees/",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=103&typeBac=0&originePc=0",
      "https://www.ece.fr/en/tuition-fees/",
      "https://www.cidj.com/s-orienter/avec-parcoursup/ecoles-d-ingenieurs-des-le-bac-le-guide-2026-des-concours-et-admissions",
      "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
    ],
  },
  epf: {
    pourquoi:
      "Une formation d'ingénieur généraliste : tu choisis ton domaine en 4e année seulement. Selon l'école, 92,7 % des diplômés trouvent un emploi en moins de 3 mois, 75,7 % ont signé un contrat avant le diplôme et 15,4 % démarrent à l'étranger ; le salaire moyen d'embauche atteignait 43 065 € bruts par an en 2024.",
    apprendre:
      "Trois ans de tronc commun, puis une majeure selon le campus : aéronautique et espace, e-santé et biomécanique ou systèmes numériques à Cachan ; architecture durable à Troyes ; énergie et environnement ou data sciences à Montpellier ; industries aéronautiques et navales à Saint-Nazaire. Quatre stages en cinq ans et un semestre à l'étranger.",
    specificite:
      "Des doubles diplômes avec CentraleSupélec, Sciences Po, Arts et Métiers ou Georgia Tech, et des parcours franco-allemand et franco-québécois. Le programme ParityLab ouvre 100 places réservées aux jeunes femmes passionnées de sciences.",
    chiffres: [
      {
        label: "Places à Cachan",
        valeur: "231 (5 345 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=104&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées à Cachan",
        valeur: "6 045 candidats, 5 223 propositions, 251 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=104&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Places ParityLab (candidates)",
        valeur: "100",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/epf-ecole-d-ingenieurs-generalistes-site-de-paris-cachan/diplome-d-ingenieur-de-l-epf",
        date: "2026",
      },
      {
        label: "Places après une prépa (Centrale-Supélec MP, MPI, PC, PSI)",
        valeur: "154",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/epf-ecole-d-ingenieurs-generalistes-site-de-paris-cachan/diplome-d-ingenieur-de-l-epf",
        date: "2026",
      },
    ],
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=104&typeBac=0&originePc=0",
      "https://www.epf.fr/droits-scolarite-financements",
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/epf-ecole-d-ingenieurs-generalistes-site-de-paris-cachan/diplome-d-ingenieur-de-l-epf",
    ],
  },
  estp: {
    pourquoi:
      "L'ESTP se consacre entièrement à la construction : bâtiment, travaux publics, énergie des bâtiments. Tu y prépares un diplôme d'ingénieur habilité par la CTI, avec un stage chaque année et un semestre obligatoire à l'étranger, parmi 121 universités et établissements partenaires dans 53 pays.",
    apprendre:
      "Le cycle ingénieur dure 3 ans : stage pratique d'au moins 6 semaines en 1re année, stage technique d'au moins 9 semaines en 2e année, travail de fin d'études d'au moins 24 semaines en 3e année. Tu choisis entre ingénieur généraliste de la construction, génie civil, génie énergétique de la construction durable et travaux publics.",
    specificite:
      "Le bi-cursus architecte-ingénieur commence après le bac en école d'architecture : trois ans de licence d'architecture, renforcés en maths et en physique par l'ESTP, puis quatre ans qui associent master d'architecture et cycle ingénieur. En 7 ans, tu obtiens le diplôme d'État d'architecte et le diplôme d'ingénieur de l'ESTP.",
    chiffres: [
      {
        label: "Places du bi-cursus architecte-ingénieur (ENSA Paris-La Villette)",
        valeur: "37 (517 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=13695&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Candidats, propositions, entrées du bi-cursus (ENSA Paris-La Villette)",
        valeur: "621 candidats, 79 propositions, 37 entrées",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=13695&typeBac=0&originePc=0",
        date: "Parcoursup 2025",
      },
      {
        label: "Places du bachelor Manager de la construction (Cachan)",
        valeur: "45 (311 vœux confirmés)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=43219&typeBac=0&originePc=0",
        date: "Parcoursup 2026",
      },
      {
        label: "Frais du cycle ingénieur",
        valeur: "9 950 € par an",
        source: "https://www.estp.fr/en/formations/graduate-school-of-engineering-programme/",
        date: "rentrée de septembre 2026",
      },
    ],
    sources: [
      "https://www.estp.fr/en/formations/graduate-school-of-engineering-programme/",
      "https://www.estp.fr/rejoignez-nous/",
      "https://www.estp.fr/formations/bi-cursus-ingenieur-architecte/",
      "https://www.estp.fr/faq/quels-sont-les-frais-de-scolarite/",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=13695&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=43219&typeBac=0&originePc=0",
    ],
  },
  epita: {
    pourquoi:
      "L'EPITA forme des ingénieurs en informatique. Les cinq métiers les plus fréquents à la sortie : ingénieur développement, consultant, ingénieur cybersécurité et réseaux, ingénieur data et IA, chef de projet. Promotion 2024 : salaire médian de 47 200 € brut par an avec primes en France, 77 % des élèves embauchés avant le diplôme, 98 % des diplômés en recherche d'emploi trouvent un poste en moins de 2 mois.",
    apprendre:
      "Deux ans de cycle préparatoire, puis 3 ans de cycle ingénieur : tronc commun en 1re année avec projets et « piscines » (semaines intensives de programmation), stage d'un semestre en 2e année, puis une majeure de 600 heures parmi 19, de l'IA et la data science à la cybersécurité, l'informatique quantique, l'image ou l'IA appliquée à la santé. Stage de fin d'études d'environ 6 mois, en France ou à l'étranger.",
    specificite:
      "Une école 100 % informatique : 19 majeures, chacune rattachée à un campus (quantique et image à Paris, IA et santé à Lyon, sécurité industrielle à Toulouse, SecDevOps à Rennes). À Paris, une section anglophone et un parcours accompagné dès la 1re année.",
    chiffres: [
      {
        label: "Places en 1re année (concours Advance, 5 campus)",
        valeur: "783",
        source: "https://www.concours-advance.fr/admission-post-bac/presentation-concours-advance/",
      },
      {
        label: "Salaire médian brut annuel avec primes, en France",
        valeur: "47 200 €",
        source: "https://www.epita.fr/debouches/les-chiffres/",
        date: "promotion 2024, enquête CGE",
      },
      {
        label: "Élèves embauchés avant le diplôme",
        valeur: "77 %",
        source: "https://www.epita.fr/debouches/les-chiffres/",
        date: "promotion 2024",
      },
      {
        label: "Frais du cycle ingénieur (1re inscription)",
        valeur: "12 950 € par an",
        source: "https://www.epita.fr/tarifs-et-financement/",
        date: "2027-2028",
      },
    ],
    sources: [
      "https://www.epita.fr/diplome-ingenieur/admission-post-bac/",
      "https://www.concours-advance.fr/admission-post-bac/presentation-concours-advance/",
      "https://www.epita.fr/tarifs-et-financement/",
      "https://www.epita.fr/diplome-ingenieur/cycle-ingenieur/",
      "https://www.epita.fr/diplome-ingenieur/cycle-ingenieur/les-majeures/",
      "https://www.epita.fr/nos-formations/titres-par-lapprentissage/cycle-ingenieur/",
      "https://www.epita.fr/debouches/les-chiffres/",
    ],
  },
  efrei: {
    pourquoi:
      "L'Efrei forme des ingénieurs du numérique : développement logiciel, data science, cybersécurité et réseaux, systèmes embarqués. Diplômés 2023 : 98 % d'insertion, dont 5 % en création d'entreprise. Salaire d'embauche 2025 : de 47 500 à 52 300 € brut par an selon l'Onisep. 20 % des anciens travaillent à l'étranger après 5 ans.",
    apprendre:
      "Deux ans de prépa intégrée : informatique, mathématiques, physique et électronique (180 h chacune en 1re année), formation générale et un mois de stage en décembre-janvier. La Prépa Plus ajoute 6 heures de maths et de physique par semaine. En ING1, tronc commun et un semestre obligatoire à l'étranger, dans plus de 100 universités partenaires. Puis une filière : Information Technology, data science, sécurité et réseaux, systèmes embarqués.",
    specificite:
      "L'Efrei est rattachée à l'Université Paris-Panthéon-Assas. Cinq prépas intégrées, dont la Prépa Bio & Numérique et la Prépa Plus, ouvertes aux profils à une seule spécialité scientifique et aux STI2D ; rentrée décalée possible en février.",
    chiffres: [
      {
        label: "Frais de la 1re année de prépa intégrée",
        valeur: "10 000 €",
        source: "https://www.efrei.fr/admissions/tarifs-ecole-ingenieur-post-bac/",
        date: "2026-2027",
      },
      {
        label: "Salaire annuel brut à l'embauche",
        valeur: "47 500 à 52 300 €",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/efrei-paris-campus-de-villejuif-universite-paris-pantheon-assas/diplome-d-ingenieur-d-efrei-paris",
        date: "2025",
      },
      {
        label: "Taux d'insertion professionnelle",
        valeur: "98 %",
        source: "https://www.puissance-alpha.fr/ecole-ingenieurs-efrei-paris.html",
        date: "diplômés 2023",
      },
      {
        label: "Inscrits en cycle ingénieur",
        valeur: "2 082",
        source: "https://www.efrei.fr/formation/cycle-ingenieur/",
        date: "2025-2026",
      },
    ],
    sources: [
      "https://www.efrei.fr/formation/prepas-integrees/",
      "https://www.efrei.fr/formation/cycle-ingenieur/",
      "https://www.efrei.fr/admissions/tarifs-ecole-ingenieur-post-bac/",
      "https://www.efrei.fr/formation/filieres-en-apprentissage/",
      "https://www.puissance-alpha.fr/ecole-ingenieurs-efrei-paris.html",
      "https://www.puissance-alpha.fr/media/4672.pdf",
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/efrei-paris-campus-de-villejuif-universite-paris-pantheon-assas/diplome-d-ingenieur-d-efrei-paris",
    ],
  },
  "esiee-paris": {
    pourquoi:
      "ESIEE Paris forme des ingénieurs du numérique, de l'électronique et de l'industrie : informatique, cybersécurité, data et IA, systèmes embarqués, santé numérique, énergie, génie civil. Près de 80 % des diplômés sont embauchés dès la remise du diplôme, avec un salaire moyen de 47 700 € brut par an. L'école travaille avec 650 entreprises partenaires.",
    apprendre:
      "Deux ans de premier cycle en mode projet : chaque année, 328 h de maths et de physique, 186 h d'informatique et d'électronique, 106 h de management, langues et sciences humaines, 256 h d'ateliers et de projets, plus des stages obligatoires. Puis 3 ans de cycle ingénieur dans l'une des 9 filières classiques (cybersécurité, data science et IA, systèmes embarqués, e-santé et biotechnologies, énergies renouvelables…) ou en apprentissage.",
    specificite:
      "Après le premier cycle, tu choisis entre la voie classique et l'apprentissage : plus de 400 places d'apprentis chaque année dans 10 filières, du génie civil à l'IA. L'école compte 18 accords de double diplôme et 120 universités partenaires dans 45 pays.",
    chiffres: [
      {
        label: "Places après une terminale générale (cycle généraliste + cycle renforcé)",
        valeur: "255 + 20",
        source:
          "https://www.esiee.fr/fileadmin/user_upload/Fichiers/brochures/brochure-admissions-esiee-paris-2026.pdf",
        date: "rentrée 2026",
      },
      {
        label: "Places en apprentissage (1re année du cycle ingénieur)",
        valeur: "420",
        source:
          "https://www.esiee.fr/fileadmin/user_upload/Fichiers/brochures/brochure-admissions-esiee-paris-2026.pdf",
        date: "rentrée 2026",
      },
      {
        label: "Frais annuels du premier cycle (tarif plein)",
        valeur: "8 280 €",
        source: "https://www.esiee.fr/formations/ingenieur/frais-de-scolarite-et-aides-financieres",
        date: "2026-2027 et 2027-2028",
      },
      {
        label: "Salaire annuel brut moyen des diplômés",
        valeur: "47 700 €",
        source: "https://www.puissance-alpha.fr/ecole-ingenieurs-esiee-paris.html",
      },
    ],
    sources: [
      "https://www.esiee.fr/candidater-1/ingenieur/premier-cycle/terminale-generale",
      "https://www.esiee.fr/formations/ingenieur/le-premier-cycle",
      "https://www.esiee.fr/fileadmin/user_upload/Fichiers/brochures/brochure-admissions-esiee-paris-2026.pdf",
      "https://www.esiee.fr/formations/ingenieur/frais-de-scolarite-et-aides-financieres",
      "https://www.esiee.fr/candidater-1/cycle-ingenieur-en-apprentissage/bac-2",
      "https://www.puissance-alpha.fr/ecole-ingenieurs-esiee-paris.html",
      "https://www.puissance-alpha.fr/media/4672.pdf",
    ],
  },
  isep: {
    pourquoi:
      "L'Isep forme des ingénieurs du numérique : logiciel, cybersécurité, IA, systèmes embarqués, data, ingénierie biomédicale. D'après sa dernière enquête emploi, 60 % des diplômés ont un poste avant le diplôme et 97 % dans les 6 mois, avec un salaire moyen de 47 000 € primes incluses. Recruteurs cités : Capgemini, Thales, Orange, Dassault Aviation, Engie, Crédit Agricole.",
    apprendre:
      "Deux ans de prépa intégrée : maths, physique, signaux et systèmes, projets d'électronique, de robotique et d'informatique, économie, anglais et LV2, puis un semestre à l'étranger ou un stage en 2e année. Ensuite, 3 ans de cycle ingénieur : tronc commun, puis un parcours parmi 11 dès la 2e année (cybersécurité, IA, software engineering, ingénierie biomédicale…), au moins 11 mois de stage et un semestre à l'étranger.",
    specificite:
      "Passage au cycle ingénieur sur contrôle continu à la fin de la prépa. 25 doubles diplômes à l'étranger et d'autres en France, avec Polytechnique, Télécom Paris ou l'Université Paris Cité ; stages de recherche possibles à Stanford.",
    chiffres: [
      {
        label: "Places en prépa intégrée Informatique et technologies numériques (Paris), Puissance Alpha",
        valeur: "60",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/isep-ecole-d-ingenieurs-du-numerique-site-de-paris/cycle-integre-international-cii-de-l-isep-option-informatique-et-technologies-numeriques",
        date: "2026",
      },
      {
        label: "Frais annuels de la prépa intégrée (paiement comptant)",
        valeur: "9 000 €",
        source: "https://www.isep.fr/frais-de-scolarite-et-aide-au-financement/",
        date: "2026-2027",
      },
      {
        label: "Salaire moyen à l'embauche, primes incluses",
        valeur: "47 000 €",
        source: "https://www.puissance-alpha.fr/ecole-ingenieurs-isep.html",
      },
      {
        label: "Part d'apprentis parmi les ingénieurs Isep",
        valeur: "40 %",
        source: "https://www.isep.fr/formation/cycle-ingenieur/",
      },
    ],
    sources: [
      "https://www.isep.fr/formation/cycle-ingenieur-integre/",
      "https://www.isep.fr/formation/cycle-ingenieur/",
      "https://isep.fr/lp/cycle-ingenieur-2026/",
      "https://www.isep.fr/frais-de-scolarite-et-aide-au-financement/",
      "https://www.puissance-alpha.fr/ecole-ingenieurs-isep.html",
      "https://www.puissance-alpha.fr/media/4672.pdf",
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/isep-ecole-d-ingenieurs-du-numerique-site-de-paris/cycle-integre-international-cii-de-l-isep-option-informatique-et-technologies-numeriques",
    ],
  },
  ipsa: {
    pourquoi:
      "L'IPSA forme des ingénieurs pour l'aéronautique et le spatial : 85 % des jeunes diplômés y travaillent, ou dans les nouvelles mobilités, chez Airbus, Safran, Dassault Aviation, Thales, ArianeGroup, au CNES ou à la DGA. Métiers visés : ingénieur propulsion, essais, structures, intégration satellite, maintenance aéronautique. Promotion 2023 : salaire médian de 42 350 € par an.",
    apprendre:
      "Deux ans de cycle préparatoire intégré (Aéro 1 et Aéro 2). En Aéro 3, socle commun et pré-majeure, stage technicien de 2 mois, puis un semestre dans l'une des 125 universités partenaires. En Aéro 4 et Aéro 5, une majeure parmi 9 : propulsion aérospatiale, structures et aérodynamisme, espace, lanceurs et satellites, systèmes spatiaux, systèmes embarqués et télécoms, systèmes autonomes, cyber-data-IA, supply chain, finance des programmes spatiaux.",
    specificite:
      "Toutes les majeures portent sur l'air et l'espace, de la propulsion à l'ingénierie financière des programmes spatiaux. En fin de cursus, environ 70 doubles diplômes en France et à l'étranger, dont un parcours avec l'École navale ; réseau de plus de 5 800 diplômés.",
    chiffres: [
      {
        label: "Places en 1re année (concours Advance, 3 campus)",
        valeur: "400",
        source: "https://www.concours-advance.fr/admission-post-bac/presentation-concours-advance/",
      },
      {
        label: "Frais de scolarité annuels, années 1 à 5",
        valeur: "11 640 €",
        source: "https://www.ipsa.fr/admissions/tarifs-et-financement/",
        date: "2026-2027",
      },
      {
        label: "Salaire médian de sortie",
        valeur: "42 350 €",
        source: "https://www.ipsa.fr/en/corporate-relations/career-opportunities-and-integration/",
        date: "promotion 2023",
      },
      {
        label: "Jeunes diplômés dans l'aéronautique, le spatial ou les nouvelles mobilités",
        valeur: "85 %",
        source: "https://www.ipsa.fr/en/corporate-relations/career-opportunities-and-integration/",
      },
    ],
    sources: [
      "https://www.concours-advance.fr/admission-post-bac/presentation-concours-advance/",
      "https://ipsa.fr/formations/presentation-cycle-ingenieur/?amp=&amp=",
      "https://www.ipsa.fr/formations/cycle-ingenieur/",
      "https://www.ipsa.fr/formations/cycle-ingenieur-apprentissage/",
      "https://www.ipsa.fr/en/corporate-relations/career-opportunities-and-integration/",
      "https://www.ipsa.fr/admissions/tarifs-et-financement/",
    ],
  },
  estaca: {
    pourquoi:
      "L'ESTACA forme des ingénieurs des transports : aéronautique, automobile, ferroviaire, spatial et naval, pour la R&D, la production, la qualité, le conseil ou les achats. Jeunes diplômés 2024 (enquête CGE) : salaire moyen de 44 000 € à l'embauche, 83 % en activité avant le diplôme, 93 % embauchés dans les 2 mois, 15,3 % avec un premier poste à l'étranger.",
    apprendre:
      "Deux ans de cycle préparatoire, identiques sur les trois campus : sciences fondamentales et découverte des cinq filières, choix de la filière à la fin de la 1re année, projets d'équipe en 2e année. Puis 3 ans de cycle ingénieur : projets sur plus d'un quart du temps en 3e année, semestre à l'étranger proposé en 3e ou 4e année, stage de 4 mois en 4e année, spécialisation et stage de fin d'études de 6 mois en 5e année.",
    specificite:
      "Cinq filières des transports réunies dans une même école : aéronautique, automobile, ferroviaire, spatial et naval. Le choix de la filière est libre à la fin de la 1re année. L'ESTACA fait partie du Groupe ISAE.",
    chiffres: [
      {
        label: "Salaire moyen à l'embauche",
        valeur: "44 000 €",
        source: "https://www.estaca.fr/entreprises/recrutez/insertion-diplomes-estaca/",
        date: "2024",
      },
      {
        label: "Élèves en activité avant la remise du diplôme",
        valeur: "83 %",
        source: "https://www.estaca.fr/entreprises/recrutez/insertion-diplomes-estaca/",
        date: "2024",
      },
      {
        label: "Premier emploi à l'étranger",
        valeur: "15,3 %",
        source: "https://www.estaca.fr/entreprises/recrutez/insertion-diplomes-estaca/",
        date: "2024",
      },
      {
        label: "Frais de scolarité annuels",
        valeur: "10 130 €",
        source: "https://www.estaca.fr/admissions/frais-de-scolarite-financement/",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://www.estaca.fr/formations/ingenieur/",
      "https://www.estaca.fr/admissions/terminales/",
      "https://www.estaca.fr/admissions/frais-de-scolarite-financement/",
      "https://www.estaca.fr/formations/ingenieur-apprentissage-2/",
      "https://www.estaca.fr/actualites/suivre-sa-5e-annee-en-alternance/",
      "https://www.estaca.fr/entreprises/recrutez/insertion-diplomes-estaca/",
    ],
  },
  junia: {
    pourquoi:
      "JUNIA réunit trois écoles d'ingénieurs : HEI (bâtiment, énergie, industrie), ISEN (numérique, cybersécurité, IA, robotique) et ISA (agriculture, agroalimentaire, environnement). Promotion 2023 : 88,2 % des diplômés HEI et 83,5 % des diplômés ISEN en emploi en moins de 2 mois, avec un salaire moyen de 38 906 € et de 38 230 € brut par an hors primes.",
    apprendre:
      "Deux ans de cycle préparatoire. En prépa HEI : maths, physique, mécanique, informatique, électronique, sciences de l'ingénieur, gestion de projet, langues et management, avec des projets en équipe. Autres prépas : ISEN numérique, ISA, Adimaker par projets, prépa en anglais. Le parcours HEI prévoit 12 semaines à l'étranger (stage, mission ou projet). Puis 3 ans de cycle ingénieur HEI, ISEN ou ISA, en formation initiale ou en apprentissage.",
    specificite:
      "Trois diplômes d'ingénieur dans une même école, du numérique à l'agriculture, et une prépa Adimaker fondée sur les projets, ouverte aussi dans des lycées partenaires jusqu'à l'île Maurice. Réseau de 36 000 anciens élèves.",
    chiffres: [
      {
        label: "Diplômés HEI en emploi en moins de 2 mois",
        valeur: "88,2 %",
        source: "https://www.puissance-alpha.fr/ecole-ingenieurs-junia-hei-isen.html",
        date: "promotion 2023",
      },
      {
        label: "Salaire annuel brut moyen à l'embauche, hors primes (HEI)",
        valeur: "38 906 €",
        source: "https://www.puissance-alpha.fr/ecole-ingenieurs-junia-hei-isen.html",
        date: "promotion 2023",
      },
      {
        label: "Diplômés ISEN en emploi en moins de 2 mois",
        valeur: "83,5 %",
        source: "https://www.puissance-alpha.fr/ecole-ingenieurs-junia-hei-isen.html",
        date: "promotion 2023",
      },
      {
        label: "Frais annuels du cycle préparatoire (HEI, ISEN, ISA, Adimaker)",
        valeur: "7 722 €",
        source: "https://www.junia.com/frais-scolarite/",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://www.junia.com/fr/formations-admissions/prepa-classes-preparatoires-ingenieur/",
      "https://www.junia.com/fr/formations-admissions/prepa-classes-preparatoires-ingenieur/cycle-preparatoire-integre-ingenieur-generaliste-hei/",
      "https://www.junia.com/fr/formations-admissions/cycle-ingenieur/",
      "https://www.junia.com/fr/formations-admissions/alternance-et-apprentissage/",
      "https://www.junia.com/frais-scolarite/",
      "https://www.puissance-alpha.fr/ecole-ingenieurs-junia-hei-isen.html",
      "https://www.puissance-alpha.fr/media/4672.pdf",
    ],
  },
  cesi: {
    pourquoi:
      "CESI forme ses ingénieurs sur 26 campus : tu peux souvent étudier près de chez toi. Après la prépa, tu peux finir en apprentissage, salarié d'une entreprise pendant 3 ans. Les débouchés suivent les majeures : industrie et services, BTP et génie civil, informatique (data et IA, systèmes embarqués, cybersécurité). Réseau : plus de 120 000 anciens élèves CESI et 8 000 entreprises d'accueil.",
    apprendre:
      "En prépa intégrée (2 ans) : maths, physique, informatique, mécanique, électronique, énergétique, matériaux, gestion de projet et anglais, avec un stage de 3 mois en fin de 1re année. En cycle ingénieur, tu choisis une majeure : industrie & services, génie civil, data science & IA, systèmes embarqués & IoT, ou réseaux & cybersécurité. Séjour à l'étranger obligatoire : 17 semaines (12 en apprentissage).",
    specificite:
      "Pédagogie active par projets : dès la 1re année, tu apprends en équipe à partir de situations professionnelles. Rentrée décalée en février pour rejoindre la prépa en cours d'année, et cycle ingénieur proposé aussi en anglais (généraliste ou informatique).",
    chiffres: [
      {
        label: "Frais de scolarité, prépa intégrée",
        valeur: "6 500 € par an",
        source: "https://www.cesi.fr/admissions/cursus-ingenieur-5-ans/",
        date: "tarif affiché le 19 octobre 2026",
      },
      {
        label: "Frais de scolarité, cycle ingénieur (statut étudiant)",
        valeur: "8 500 € par an",
        source: "https://www.cesi.fr/admissions/cursus-ingenieur-5-ans/",
        date: "tarif affiché le 19 octobre 2026",
      },
      {
        label: "Campus en France",
        valeur: "26",
        source: "https://www.cesi.fr/",
      },
      {
        label: "Mobilité internationale obligatoire",
        valeur: "17 semaines (12 en apprentissage)",
        source: "https://www.cesi.fr/programmes/cursus-ingenieur-3-ans/",
      },
    ],
    sources: [
      "https://www.cesi.fr/",
      "https://www.cesi.fr/admissions/cursus-ingenieur-5-ans/",
      "https://www.cesi.fr/programmes/cycle-preparatoire-integre/",
      "https://www.cesi.fr/programmes/cursus-ingenieur-3-ans/",
      "https://www.cesi.fr/ecole/diplomes-certifications/",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2022-03/liste-des-tablissements-d-enseignement-sup-rieur-priv-s-d-int-r-t-g-n-ral-eespig--17378.pdf",
    ],
  },
  icam: {
    pourquoi:
      "Tu vises un poste d'ingénieur généraliste dans l'industrie : mécanique, génie électrique, automatique, énergie. L'Icam compte 7 campus en France et 75 entreprises « grands partenaires ». Tes 3 années d'ingénieur peuvent se faire en apprentissage, salarié d'une entreprise, pour le même diplôme. Côté budget, les bourses Feron-Vrau peuvent couvrir la totalité des frais des boursiers du Crous aux échelons 6 et 7.",
    apprendre:
      "Le cycle ingénieur couvre 4 blocs scientifiques (maths-informatique-automatique, génie électrique, génie mécanique et matériaux, énergétique et environnement) et 2 blocs humains (langues, éthique, management, entrepreneuriat). En 3e année, un projet de mécatronique dure toute l'année ; en 4e, échange Erasmus possible ; en 5e, stage ingénieur de 6 mois et mémoire scientifique.",
    specificite:
      "Après le bac, trois portes d'entrée : prépa scientifique en CPGE associée (place garantie en cycle ingénieur sur contrôle continu), prépa professionnalisante (BTS ou BUT associé, puis apprentissage) ou bachelor international. Étudiant ou apprenti, tu obtiens le même diplôme.",
    chiffres: [
      {
        label: "Places 2026, prépa scientifique de Lille (CPGE PTSI/PT associée)",
        valeur: "100, pour 1 651 vœux confirmés (1 922 candidats en 2025)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=24653&typeBac=0&originePc=0",
        date: "Parcoursup 2026 et 2025",
      },
      {
        label: "Frais de scolarité",
        valeur: "prépa 4 500 € par an (modulés selon les revenus) ; cycle ingénieur 9 700 € par an",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=24653&typeBac=0&originePc=0",
        date: "fiche Parcoursup 2026",
      },
      {
        label: "Bourse de scolarité Icam pour les boursiers",
        valeur: "1 200 € à 2 700 € par an, sur les 5 ans",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=24653&typeBac=0&originePc=0",
        date: "fiche Parcoursup 2026",
      },
      {
        label: "Diplômes complémentaires ou doubles diplômes proposés",
        valeur: "15 (dont Audencia, HEC Montréal, Cranfield, IQS Barcelone)",
        source: "https://www.icam.fr/formation/formation-ingenieur-icam-sous-statut-etudiant/",
      },
    ],
    sources: [
      "https://www.icam.fr/",
      "https://www.icam.fr/formations/enseignement-superieur/cycles-preparatoires-ingenieurs/",
      "https://www.icam.fr/formation/formation-ingenieur-icam-sous-statut-etudiant/",
      "https://www.icam.fr/formation/formation-ingenieur-icam-sous-statut-apprenti/",
      "https://www.icam.fr/formations/financement-etudes/",
      "https://www.icam.fr/formations/enseignement-superieur/admissions-inscriptions/",
      "https://www.icam.fr/temoignage/licam-une-ecole-eespig-gage-de-serieux-dexigence-et-de-qualite/",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=24653&typeBac=0&originePc=0",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2022-03/liste-des-tablissements-d-enseignement-sup-rieur-priv-s-d-int-r-t-g-n-ral-eespig--17378.pdf",
    ],
  },
  esigelec: {
    pourquoi:
      "L'ESIGELEC forme des ingénieurs de l'électronique, du numérique et de l'énergie pour l'automobile et le ferroviaire, l'aéronautique et le spatial, la e-santé, la défense ou l'industrie. Selon l'école, 92 % des diplômés 2025 ont trouvé un emploi en moins de 2 mois. Des promotions sont parrainées par Vinci Energies, Orange, Renault, Alten, Siemens ou EDF.",
    apprendre:
      "Les 3 premières années forment un cycle fondamental : prépa intégrée internationale en 1re et 2e années, puis une mineure au choix parmi 9 pour explorer un domaine. En 4e et 5e années, tu choisis une majeure parmi 16, dans des univers comme numérique et IA, énergie, aéronautique et spatial, automobile et ferroviaire, e-santé, défense et sécurité. 10 à 40 % des cours de spécialité sont en anglais.",
    specificite:
      "26 doubles diplômes, 90 universités partenaires et 35 % d'étudiants internationaux venus de 40 pays. Deux campus, Rouen et Poitiers, et 160 places d'apprentis ouvertes dès la 3e année.",
    chiffres: [
      {
        label: "Diplômés 2025 en emploi en moins de 2 mois",
        valeur: "92 %",
        source: "https://www.esigelec.fr/",
        date: "2025",
      },
      {
        label: "Places 2026, Rouen, profil violet",
        valeur: "100 (3 917 candidats et 59 entrants en 2025)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=466&typeBac=0&originePc=0",
        date: "Parcoursup 2026 et 2025",
      },
      {
        label: "Frais de scolarité",
        valeur: "prépa 7 800 € par an (5 850 € pour les boursiers de l'État) ; cycle ingénieur 8 280 € par an",
        source: "https://www.esigelec.fr/fr/frais-de-scolarite",
        date: "2026-2027",
      },
      {
        label: "Places d'apprentis en 3e année",
        valeur: "120 à Rouen, 40 à Poitiers",
        source: "https://www.esigelec.fr/fr/frais-de-scolarite",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://www.esigelec.fr/",
      "https://www.esigelec.fr/fr/terminale-generale",
      "https://www.esigelec.fr/fr/frais-de-scolarite",
      "https://www.esigelec.fr/fr/le-programme-ingenieur",
      "https://www.esigelec.fr/fr/lapprentissage",
      "https://www.esigelec.fr/fr/16-majeures",
      "https://eigsi.fr/formation/cycle-preparatoire",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=466&typeBac=0&originePc=0",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2022-03/liste-des-tablissements-d-enseignement-sup-rieur-priv-s-d-int-r-t-g-n-ral-eespig--17378.pdf",
    ],
  },
  eseo: {
    pourquoi:
      "L'ESEO forme des ingénieurs de l'électronique et de l'informatique : cloud, data et IA, systèmes embarqués, cybersécurité, énergies renouvelables, e-santé. Selon l'école, 94 % des diplômés sont en emploi (données 2025), avec un salaire moyen de sortie de 44 500 € par an. Elle s'appuie sur 1 700 entreprises partenaires et près de 8 000 anciens élèves.",
    apprendre:
      "En prépa (2 ans) : maths et informatique, électronique numérique et analogique, physique, sciences de l'ingénieur, langues et enjeux écologiques, avec des projets d'électronique et un stage d'au moins 8 semaines en fin de 2e année. En cycle ingénieur, tu choisis une option parmi 11 : data et IA, cloud et sécurité, systèmes embarqués et cybersécurité, génie électrique et énergies, e-santé, industrie 4.0, smart city…",
    specificite:
      "École de 1 200 étudiants centrée sur l'électronique et le numérique, avec 50 doubles diplômes et 61 universités partenaires. La prépa mène directement au cycle ingénieur, dont 3 options se suivent en apprentissage sur les 3 campus.",
    chiffres: [
      {
        label: "Insertion professionnelle des diplômés",
        valeur: "94 %",
        source: "https://eseo.fr/",
        date: "données 2025, chiffre de l'école",
      },
      {
        label: "Salaire moyen annuel à la sortie",
        valeur: "44 500 €",
        source: "https://eseo.fr/",
      },
      {
        label: "Places 2026, prépa intégrée d'Angers",
        valeur: "43, pour 1 480 vœux confirmés (1 914 candidats en 2025)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=45494&typeBac=0&originePc=0",
        date: "Parcoursup 2026 et 2025",
      },
      {
        label: "Frais de scolarité",
        valeur: "prépa intégrée 6 550 € par an (7 600 € à Paris-Vélizy) ; cycle ingénieur 9 390 € par an",
        source: "https://www.eseo.fr/faq/quels-sont-frais-scolarite/",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://eseo.fr/",
      "https://www.eseo.fr/formations-ingenieurs/prepa-parcours-ingenieurs/",
      "https://www.eseo.fr/formations/prepa-ingenieur-informatique-electronique/",
      "https://www.eseo.fr/formations-ingenieurs/cycle-ingenieur-eseo-parcours-ingenieurs/",
      "https://www.eseo.fr/faq/quels-sont-frais-scolarite/",
      "https://www.eseo.fr/formations-ingenieurs/admissions/",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=45494&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=78&typeBac=0&originePc=0",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2022-03/liste-des-tablissements-d-enseignement-sup-rieur-priv-s-d-int-r-t-g-n-ral-eespig--17378.pdf",
    ],
  },
  eigsi: {
    pourquoi:
      "L'EIGSI forme des ingénieurs généralistes pour l'industrie, l'énergie et l'environnement, le BTP, les transports et la logistique, le numérique ou la santé. Selon l'école, 96 % des diplômés sont en poste en moins de 4 mois, et un élève sur deux reçoit une offre d'emploi à l'issue de son stage de fin d'études. L'école compte 1 600 élèves-ingénieurs.",
    apprendre:
      "En prépa (2 ans) : maths, physique, mécanique, électronique, informatique, automatique, avec 40 % de travaux pratiques en petits groupes et un stage ouvrier de 6 semaines en 1re année. En cycle ingénieur, tronc commun, puis une dominante choisie en fin de 3e année : énergie et environnement, BTP, robotique, IA et big data, cybersécurité, supply chain, santé… Stages de 16 puis 24 semaines ; cours en anglais au 1er semestre de 4e année.",
    specificite:
      "Près de 500 heures de projets sur le cycle ingénieur et 45 parcours bi-diplômants. Un second campus à Casablanca, où tu peux passer un semestre (BTP, logistique, IA et big data). L'école est l'héritière de l'école Violet, fondée en 1901.",
    chiffres: [
      {
        label: "Places 2026, La Rochelle, profil violet",
        valeur: "125 (4 207 candidats et 75 entrants en 2025)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=101&typeBac=0&originePc=0",
        date: "Parcoursup 2026 et 2025",
      },
      {
        label: "Diplômés en poste en moins de 4 mois",
        valeur: "96 %",
        source: "https://www.eigsi.fr/ecole-ingenieur-eigsi/chiffres-cles-ingenieurs-generalistes-statistiques/",
        date: "chiffre de l'école",
      },
      {
        label: "Droits de scolarité, statut étudiant",
        valeur: "8 800 € par an (dont 1 500 € de frais d'inscription)",
        source: "https://www.eigsi.fr/admission-ecole-ingenieur/cout-de-la-scolarite/",
        date: "2026-2027",
      },
      {
        label: "Alternants en formation",
        valeur: "350, dans plus de 290 entreprises",
        source: "https://www.eigsi.fr/formation-ingenieur/formation-par-apprentissage-2/",
      },
    ],
    sources: [
      "https://eigsi.fr/formation/cycle-preparatoire",
      "https://www.eigsi.fr/admission-ecole-ingenieur/cout-de-la-scolarite/",
      "https://www.eigsi.fr/ecole-ingenieur-eigsi/chiffres-cles-ingenieurs-generalistes-statistiques/",
      "https://www.eigsi.fr/formation-ingenieur/formation-par-apprentissage-2/",
      "https://www.eigsi.fr/formation/cycle-ingenieur-ecole/",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=101&typeBac=0&originePc=0",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2022-03/liste-des-tablissements-d-enseignement-sup-rieur-priv-s-d-int-r-t-g-n-ral-eespig--17378.pdf",
      "https://www.esigelec.fr/fr/terminale-generale",
    ],
  },
  eni: {
    pourquoi:
      "Quatre écoles publiques, gratuites pour les boursiers, qui forment des ingénieurs de terrain pour l'industrie : mécanique, production, matériaux, BTP, et électronique-informatique à Brest. Les débouchés vont de l'aéronautique à l'automobile, l'énergie ou les transports. À l'ENIT, 90 % des diplômés ont un emploi en moins de 4 mois (41 790 € brut par an en moyenne) ; à l'ENIM, 70 % en moins de 2 mois (40 000 €).",
    apprendre:
      "2 ans de prépa intégrée (maths, physique, informatique, sciences de l'ingénieur, langues), puis 3 ans de cycle ingénieur avec une option : génie mécanique, industriel, BTP ou matériaux à Tarbes ; mécanique-matériaux, conception-industrialisation ou management industriel à Metz ; génie mécanique, civil ou sensoriel à Saint-Étienne ; électronique, informatique ou robotique à Brest. Au moins un semestre à l'étranger à Metz, Saint-Étienne et Tarbes.",
    specificite:
      "Des écoles très tournées vers l'entreprise : plus de 50 semaines de stage à l'ENIT, trois semestres en entreprise à l'ENIM. Un même vœu Geipi Polytech ouvre les quatre écoles, dont trois rattachées à un ensemble plus large : Bretagne INP, Centrale Lyon, UTTOP.",
    chiffres: [
      {
        label: "ENIT : places 2026 en 1re année (bac général)",
        valeur: "170 (6 837 candidats et 183 entrants en 2025)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=7822&typeBac=0&originePc=0",
        date: "Parcoursup 2026 et 2025",
      },
      {
        label: "ENIM : places 2026 en 1re année (bac général)",
        valeur: "148 (7 084 candidats et 144 entrants en 2025)",
        source:
          "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=41&typeBac=0&originePc=0",
        date: "Parcoursup 2026 et 2025",
      },
      {
        label: "ENIT : insertion des diplômés",
        valeur: "90 % en emploi en moins de 4 mois ; salaire moyen brut avec primes de 41 790 €",
        source:
          "https://www.enit.fr/_attachment/diplome-d-ingenieur-article-4/plaquette%20ing%C3%A9nieur%202026%20v31-08-2026%20vl.pdf?download=true",
        date: "enquête 2026",
      },
      {
        label: "ENIM : insertion des diplômés",
        valeur: "70 % en emploi en moins de 2 mois ; salaire moyen d'embauche de 40 000 € brut, primes comprises",
        source:
          "https://enim.univ-lorraine.fr/sites/dn-drupalkit23.univ-lorraine.fr/files/users/2025_plaquette_enim_tr.pdf",
        date: "plaquette 2025-2026",
      },
    ],
    sources: [
      "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-d-ingenieurs-post-bac-le-concours-geipi-polytech-mode-d-emploi.html",
      "https://www.enib.fr/",
      "https://www.enib.fr/devenir-ingenieur/",
      "https://www.enib.fr/devenir-ingenieur/ingenieur-cycle-ingenieur/",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=38&typeBac=0&originePc=0",
      "https://www.enim.fr/",
      "https://enim.univ-lorraine.fr/formation/ingenieur-enim",
      "https://enim.univ-lorraine.fr/sites/dn-drupalkit23.univ-lorraine.fr/files/users/2025_plaquette_enim_tr.pdf",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=41&typeBac=0&originePc=0",
      "https://www.ec-lyon.fr/centrale-lyon/letablissement/lecole-interne-centrale-lyon-enise",
      "https://enise.ec-lyon.fr/formation/cycle-preparatoire-integre-centrale-lyon-enise-191",
      "https://enise.ec-lyon.fr/formation/ingenieur-genie-mecanique-192",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=24480&typeBac=0&originePc=0",
      "https://www.enit.fr/",
      "https://www.enit.fr/fr/formations/diplome-d-ingenieur.html",
      "https://www.enit.fr/_attachment/diplome-d-ingenieur-article-4/plaquette%20ing%C3%A9nieur%202026%20v31-08-2026%20vl.pdf?download=true",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=7822&typeBac=0&originePc=0",
      "https://www.esigelec.fr/fr/frais-de-scolarite",
    ],
  },
  "arts-et-metiers": {
    pourquoi:
      "Arts et Métiers forme des ingénieurs de l'industrie : 35 % des jeunes diplômés travaillent en production, exploitation, méthodes, qualité ou maintenance, 23 % en R&D et innovation. Le conseil et l'ingénierie (30,5 %), le numérique (10,5 %), l'industrie et le BTP (9,5 % chacun) recrutent le plus. 82 % des jeunes diplômés en poste ont trouvé leur premier emploi en moins de deux mois.",
    apprendre:
      "Les deux premières années misent sur l'expérimentation : génie mécanique, génie énergétique, génie industriel et productique. En 3e année, tu choisis parmi 32 expertises, de l'aéronautique et du spatial aux énergies nouvelles. Stage exécutant de 4 semaines en 1re année, stage de fin d'études de 6 mois, mobilité internationale de deux mois à deux ans et une centaine de parcours bi-diplômants, dont un franco-allemand dès la 1re année.",
    specificite:
      "La 1re année se fait obligatoirement sur un campus de région, et chaque campus adapte le cursus aux enjeux de son territoire. Un cursus militaire conduit au Service d'infrastructure de la Défense avec le grade de lieutenant.",
    chiffres: [
      {
        label: "Places concours CentraleSupélec (MP, MPI, PC, PSI)",
        valeur: "346",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/ecole-nationale-superieure-d-arts-et-metiers-campus-arts-et-metiers-de-paris/diplome-d-ingenieur-de-l-ecole-nationale-superieure-d-arts-et-metiers",
        date: "2026",
      },
      {
        label: "Places Banque PT",
        valeur: "540",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/ecole-nationale-superieure-d-arts-et-metiers-campus-arts-et-metiers-de-paris/diplome-d-ingenieur-de-l-ecole-nationale-superieure-d-arts-et-metiers",
        date: "2026",
      },
      {
        label: "Places TSI (banque CentraleSupélec)",
        valeur: "35",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/ecole-nationale-superieure-d-arts-et-metiers-campus-arts-et-metiers-de-paris/diplome-d-ingenieur-de-l-ecole-nationale-superieure-d-arts-et-metiers",
        date: "2025",
      },
      {
        label: "Places concours ATS",
        valeur: "25",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/ecole-nationale-superieure-d-arts-et-metiers-campus-arts-et-metiers-de-paris/diplome-d-ingenieur-de-l-ecole-nationale-superieure-d-arts-et-metiers",
        date: "2026",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/paris/ecole-nationale-superieure-d-arts-et-metiers-campus-arts-et-metiers-de-paris/diplome-d-ingenieur-de-l-ecole-nationale-superieure-d-arts-et-metiers",
      "https://www.onisep.fr/ressources/structures-enseignement/nouvelle-aquitaine/gironde/ecole-nationale-superieure-d-arts-et-metiers-campus-arts-et-metiers-de-bordeaux-talence/diplome-d-ingenieur-de-l-ecole-nationale-superieure-d-arts-et-metiers",
      "https://artsetmetiers.fr/formation/ingenieur-generaliste",
      "https://artsetmetiers.fr/fr/formation/cursus-apprenti",
      "https://www.artsetmetiers.fr/fr/formation/admissions-programme-grande-ecole",
      "https://www.enssat.fr/uploads/site/documents/Brochures/Tarifs_2026-2027.pdf",
      "https://www.etudiant.gouv.fr/fr/droits-d-inscription-1489",
    ],
  },
  enseeiht: {
    pourquoi:
      "L'ENSEEIHT forme des ingénieurs de l'énergie, de l'électronique, du numérique et de la mécanique des fluides. Ses diplômés partent dans l'aéronautique et le spatial, la défense, l'énergie, les transports, la santé et les services numériques, chez Airbus, Thales, Safran, EDF, RTE, le CNES ou Capgemini. 69 % des élèves des trois dernières promotions ont signé leur embauche avant le diplôme.",
    apprendre:
      "Tu entres directement dans un département : Sciences du numérique (ex-informatique et télécommunications), Électronique, énergie électrique et automatique, ou Mécanique des fluides, énergétique et environnement (hydraulique, énergie, climat). Stage de 6 semaines en 1re année, de 8 semaines en 2e année, stage de fin d'études de 5 à 6 mois, et au moins 17 semaines de stage à l'étranger.",
    specificite:
      "Fondée en 1907, l'école diplôme plus de 450 ingénieurs par an et s'appuie sur quatre laboratoires toulousains : IMFT, IRIT, LAAS et Laplace. Tu choisis ton département dès le concours, car les places sont attribuées par département et par filière.",
    chiffres: [
      {
        label: "Places après une prépa (toutes filières)",
        valeur: "298 (151 SN, 94 3EA, 53 MF2E)",
        source: "https://www.enseeiht.fr/fr/formation/admissions.html",
        date: "tableau de septembre 2026",
      },
      {
        label: "Places Prépa INP",
        valeur: "47",
        source: "https://www.enseeiht.fr/fr/formation/admissions.html",
        date: "tableau de septembre 2026",
      },
      {
        label: "Places en admission sur titre (BUT, L2, L3)",
        valeur: "51",
        source: "https://www.enseeiht.fr/fr/formation/admissions.html",
        date: "tableau de septembre 2026",
      },
      {
        label: "Droits de scolarité du cycle ingénieur",
        valeur: "630 €",
        source: "https://www.enseeiht.fr/fr/formation/formation-ingenieur/droits-d-inscription.html",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://www.enseeiht.fr/fr/formation/admissions.html",
      "https://www.enseeiht.fr/fr/formation/formation-ingenieur/droits-d-inscription.html",
      "https://www.enseeiht.fr/fr/formation/formation-ingenieur-par-l-apprentissage/admissions.html",
      "https://www.enseeiht.fr/fr/formation/formation-ingenieur.html",
      "https://www.enseeiht.fr/fr/l-enseeiht/presentation-de-l-ecole.html",
      "https://www.enseeiht.fr/fr/formation/formation-ingenieur/departement-sn.html",
      "https://www.enseeiht.fr/fr/formation/formation-ingenieur/departement-3ea.html",
      "https://www.enseeiht.fr/fr/formation/formation-ingenieur/departement-mf2e.html",
    ],
  },
  ensiacet: {
    pourquoi:
      "L'ENSIACET forme des ingénieurs de la transformation de la matière et de l'énergie. Tu y prépares l'un de ses cinq diplômes : chimie, matériaux, génie chimique, génie des procédés ou génie industriel, du laboratoire jusqu'à l'organisation d'une usine. Quatre de ces diplômes existent aussi en apprentissage, payé de 53 à 78 % du Smic.",
    apprendre:
      "Un premier semestre en tronc commun pour les cinq départements, puis tu te spécialises dans ton diplôme. La pédagogie passe par des projets « fil rouge » et la plateforme A7 4.0 (coworking, centre de ressources numériques). Le stage de fin d'études suit le 1er semestre de 3e année ; le diplôme exige au moins trois mois à l'étranger et un niveau B2 en anglais (785 au TOEIC).",
    specificite:
      "Les places du concours sont rattachées à un diplôme : tu choisis chimie, matériaux, génie chimique, génie des procédés ou génie industriel dès ton classement. La filière PC fournit les deux tiers des places.",
    chiffres: [
      {
        label: "Places Concours Commun INP (MP 28, MPI 2, PC 116, PSI 28, TPC 1)",
        valeur: "175",
        source: "https://www.ensiacet.fr/fr/formation/admission-et-droits-d-inscriptions.html",
        date: "campagne 2026-2027",
      },
      {
        label: "Apprentis au plus par département",
        valeur: "24",
        source: "https://www.ensiacet.fr/fr/formation/alternance/le-contrat-d-apprentissage-sur-3-ans-fisa.html",
      },
      {
        label: "Droits d'inscription sous statut étudiant (FISE)",
        valeur: "630 €",
        source: "https://www.ensiacet.fr/fr/formation/admission-et-droits-d-inscriptions.html",
        date: "tableau en ligne pour 2026-2027",
      },
      {
        label: "CVEC",
        valeur: "105 €",
        source: "https://www.ensiacet.fr/fr/formation/admission-et-droits-d-inscriptions.html",
        date: "tableau en ligne pour 2026-2027",
      },
    ],
    sources: [
      "https://www.ensiacet.fr/fr/formation/admission-et-droits-d-inscriptions.html",
      "https://www.ensiacet.fr/fr/formation/formations-ingenieur.html",
      "https://www.ensiacet.fr/fr/formation/alternance/le-contrat-d-apprentissage-sur-3-ans-fisa.html",
      "https://www.ensiacet.fr/fr/formations/ingenieur-1/cursus-et-pedagogie-ingenieur.html",
      "https://www.ensiacet.fr/fr/entreprises/recruter-nos-etudiants.html",
    ],
  },
  phelma: {
    pourquoi:
      "Phelma forme des ingénieurs en physique, électronique et matériaux. Ses diplômés partent surtout dans le numérique et les télécoms (23 %), l'énergie (16 %), la R&D et l'industrie des transports (11 % chacun), chez STMicroelectronics, Soitec, EDF, Framatome, le CEA ou Arkema. 70 % sont embauchés avant le diplôme, avec un salaire moyen de 40 000 € brut par an.",
    apprendre:
      "En 1re année, tu suis le parcours PMP (physique, matériaux, procédés) ou PET (physique, électronique, télécoms), avec 70 % de cours communs au premier semestre et un stage d'opérateur d'au moins 4 semaines. En 2e et 3e années, tu rejoins l'une des dix filières : microélectronique, photonique, énergie et nucléaire, matériaux, biomédical, systèmes embarqués, signal et image… Semestres possibles à l'étranger ou dans une autre école Grenoble INP.",
    specificite:
      "Dix filières de spécialisation, dont deux internationales (Advanced Materials, Nanotech), et des semestres optionnels consacrés aux matériaux du nucléaire. Un double cursus ingénieur-master en dernière année ouvre la voie au doctorat.",
    chiffres: [
      {
        label: "Places en admission sur titre, 1re année (BUT, ATS, L2, L3)",
        valeur: "36 au plus",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "campagne 2026-2027",
      },
      {
        label: "Places en admission sur titre, 2e année",
        valeur: "20",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "campagne 2026-2027",
      },
      {
        label: "Places en apprentissage (MT et MEP)",
        valeur: "24",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "campagne 2026-2027",
      },
      {
        label: "Places BCPST (parcours PMP)",
        valeur: "2 au plus",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "campagne 2026-2027",
      },
    ],
    sources: [
      "https://phelma.grenoble-inp.fr/fr/formation/admission",
      "https://phelma.grenoble-inp.fr/fr/l-ecole/droits-dinscription-et-paiement",
      "https://phelma.grenoble-inp.fr/fr/formation/inscription-en-1re-annee-ingenieur-par-l-apprentissage",
      "https://phelma.grenoble-inp.fr/fr/formation/filieres-et-parcours-de-2e-et-3e-annees-1",
      "https://phelma.grenoble-inp.fr/fr/formation/premiere-annee",
      "https://phelma.grenoble-inp.fr/fr/l-ecole/debouches",
      "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
    ],
  },
  ense3: {
    pourquoi:
      "Ense3 forme des ingénieurs de l'énergie, de l'eau et de l'environnement : électricité, nucléaire, hydraulique, réseaux, marchés de l'énergie. Ses diplômés deviennent ingénieurs R&D, d'essais, d'études et de conseil, exploitants de réseaux, chefs de projet, acheteurs ou traders d'énergie. Taux net d'emploi de la promotion 2023 : 91,2 % selon l'enquête de la CGE.",
    apprendre:
      "Le premier semestre est commun : modélisation et calcul scientifique, conception soutenable, génie électrique, signaux et systèmes, mécanique des fluides et des solides, avec des projets. Au second semestre, tu choisis l'une des huit filières métier : automatique et systèmes intelligents, hydraulique, énergie électrique, énergie nucléaire, ingénierie de produits, mécanique et énergétique, signal et image, systèmes énergétiques et marchés.",
    specificite:
      "L'école se présente comme l'école d'ingénieurs « des transitions » : la conception soutenable figure au programme dès le premier semestre. Sa filière Systèmes énergétiques et marchés mêle ingénierie et économie de l'énergie.",
    chiffres: [
      {
        label: "Admis via le Concours Commun INP",
        valeur: "231 (65 MP, 60 PC, 80 PSI, 15 PT, 3 TSI, 3 MPI)",
        source: "https://ense3.grenoble-inp.fr/fr/formation/admission",
        date: "année à confirmer",
      },
      {
        label: "Élèves recrutés par an",
        valeur: "environ 325",
        source: "https://ense3.grenoble-inp.fr/fr/formation/admission",
        date: "année à confirmer",
      },
      {
        label: "Places en apprentissage (PRODISE)",
        valeur: "25",
        source: "https://ense3.grenoble-inp.fr/fr/formation/admission",
        date: "année à confirmer",
      },
      {
        label: "Droits d'inscription (étudiant UE)",
        valeur: "630 €",
        source: "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://ense3.grenoble-inp.fr/fr/formation/admission",
      "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
      "https://ense3.grenoble-inp.fr/fr/formation/cursus-ingenieurs",
      "https://ense3.grenoble-inp.fr/fr/formation/ingenieur-par-apprentissage",
      "https://ense3.grenoble-inp.fr/fr/formation/metiers-et-emplois",
      "https://ense3.grenoble-inp.fr/fr/futur-e-etudiant-e",
    ],
  },
  "enseirb-matmeca": {
    pourquoi:
      "L'ENSEIRB-MATMECA forme des ingénieurs du numérique : électronique, informatique, télécoms, mathématiques appliquées et mécanique. En informatique, 8 diplômés sur 10 ont un emploi avant de quitter l'école et 95 % travaillent trois mois après, surtout dans les services numériques (46 %) et le conseil-ingénierie (35 %). 42 % restent en Nouvelle-Aquitaine.",
    apprendre:
      "Tu choisis ta filière dès le concours : électronique, informatique, mathématique et mécanique, ou télécommunications. En informatique, la 3e année propose sept spécialisations, dont intelligence artificielle, cybersécurité et calcul intensif. Douze mois de stages sur trois ans, dont un projet de fin d'études de 5 à 6 mois, et au moins 17 semaines à l'étranger.",
    specificite:
      "Deux certificats ouverts à toutes les filières, Espace et Énergie, associent séminaires, projet long, stage et hackathon dans ces secteurs. Un parcours ingénieur-docteur prépare à la thèse du 5e au 10e semestre.",
    chiffres: [
      {
        label: "Places Concours Commun INP, filière Informatique",
        valeur: "72 (41 MP, 15 MPI, 3 PC, 10 PSI, 2 TSI, 1 PT)",
        source:
          "https://formation.bordeaux-inp.fr/plugins/odf-web/odf/_content/program-ingenieur-specialite-informatique-2-2-2/Ing%C3%A9nieur%20sp%C3%A9cialit%C3%A9%20Informatique.pdf",
        date: "2026-2027",
      },
      {
        label: "Élèves-ingénieurs",
        valeur: "plus de 1 200",
        source: "https://enseirb-matmeca.bordeaux-inp.fr/fr/chiffres-cles-de-lenseirb-matmeca",
      },
      {
        label: "Droits d'inscription (étudiant UE)",
        valeur: "630 €",
        source: "https://enseirb-matmeca.bordeaux-inp.fr/fr/inscription-rentree-lenseirb-matmeca",
        date: "rentrée 2026",
      },
      {
        label: "Droits d'inscription (hors UE)",
        valeur: "3 950 €",
        source: "https://enseirb-matmeca.bordeaux-inp.fr/fr/inscription-rentree-lenseirb-matmeca",
        date: "rentrée 2026",
      },
    ],
    sources: [
      "https://enseirb-matmeca.bordeaux-inp.fr/fr",
      "https://enseirb-matmeca.bordeaux-inp.fr/fr/admissions-lenseirb-matmeca",
      "https://enseirb-matmeca.bordeaux-inp.fr/fr/inscriptions-2026-recrutement-sur-titres-des-filieres-sous-statut-apprenti-0",
      "https://enseirb-matmeca.bordeaux-inp.fr/fr/chiffres-cles-de-lenseirb-matmeca",
      "https://enseirb-matmeca.bordeaux-inp.fr/fr/inscription-rentree-lenseirb-matmeca",
      "https://enseirb-matmeca.bordeaux-inp.fr/fr/les-formations-dingenieurs-de-lenseirb-matmeca",
      "https://formation.bordeaux-inp.fr/plugins/odf-web/odf/_content/program-ingenieur-specialite-informatique-2-2-2/Ing%C3%A9nieur%20sp%C3%A9cialit%C3%A9%20Informatique.pdf",
      "https://www.etudiant.gouv.fr/fr/droits-d-inscription-1489",
    ],
  },
  "telecom-sudparis": {
    pourquoi:
      "Télécom SudParis forme des ingénieurs du numérique : IA et data science, développement logiciel, réseaux et cloud, cybersécurité. Promotion 2025 : 78,2 % en emploi, 93,6 % en CDI, salaire moyen de 47 594 € brut primes comprises. Les services numériques (46,8 %) et le conseil-ingénierie (25,2 %) recrutent le plus ; plus de 70 % des ingénieurs généralistes signent avant le diplôme.",
    apprendre:
      "Le cycle généraliste mêle cours, projets et stages en lien étroit avec les entreprises. En 3e année, tu choisis l'une des 16 voies d'approfondissement : cybersécurité, intelligence artificielle, jeux vidéo, systèmes embarqués, imagerie, data science biomédicale (nouveauté 2026)… Tu peux aussi suivre un M2 de l'Institut Polytechnique de Paris, un semestre dans une autre école de l'IMT ou l'un des 100 parcours à l'international.",
    specificite:
      "Deux campus : Évry-Courcouronnes (7,5 ha) et Palaiseau, dans un bâtiment partagé avec Télécom Paris au sein de l'Institut Polytechnique de Paris. Tu peux orienter projets et stages vers l'environnement, la santé, la recherche, l'entrepreneuriat ou la défense.",
    chiffres: [
      {
        label: "Places au concours Mines-Télécom",
        valeur: "206",
        source: "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-generaliste/",
        date: "session 2027",
      },
      {
        label: "Places en admission sur titre (1re / 2e année)",
        valeur: "10 / 5",
        source: "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-generaliste/",
        date: "campagne 2027",
      },
      {
        label: "Places en apprentissage (1re / 2e année)",
        valeur: "42 / 5",
        source: "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-par-apprentissage/",
        date: "recrutement 2027",
      },
      {
        label: "Droits annuels, élève UE entré après le 1er juillet 2026",
        valeur: "3 600 €",
        source: "https://www.telecom-sudparis.eu/en/tuitions/",
        date: "2026-2027",
      },
    ],
    sources: [
      "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-generaliste/",
      "https://www.telecom-sudparis.eu/en/tuitions/",
      "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-par-apprentissage/",
      "https://www.telecom-sudparis.eu/formation/ingenieur-generaliste/",
      "https://www.telecom-sudparis.eu/enquete-1er-emploi/",
      "https://www.telecom-sudparis.eu/options/",
    ],
  },
  "imt-nord-europe": {
    pourquoi:
      "IMT Nord Europe forme des ingénieurs généralistes aux compétences techniques, scientifiques et managériales, avec une place forte pour le management de projet, l'innovation et les transitions écologique et numérique. Ses domaines phares couvrent l'énergie, le numérique, la cybersécurité et le génie civil. Une dizaine d'élèves par an entrent comme élèves fonctionnaires : payés pendant leurs études, ils servent ensuite l'État huit ans.",
    apprendre:
      "Après une 1re année de tronc commun à Douai, tu construis en 2e et 3e années ton parcours thématique et ton profil d'ingénieur selon ton projet professionnel. Projets concrets et stages rythment le cursus. Une expérience internationale d'au moins 6 mois (stage, échange ou double diplôme) est exigée pour obtenir le diplôme.",
    specificite:
      "L'école s'étend sur cinq campus, de Dunkerque à Alençon, et ajoute au cursus généraliste cinq diplômes de spécialité en apprentissage, dont un en infrastructures ferroviaires. Elle fournit plus de 15 % des places du concours Mines-Télécom.",
    chiffres: [
      {
        label: "Part des 1 500 places annuelles du concours Mines-Télécom",
        valeur: "plus de 15 %",
        source: "https://imt-nord-europe.fr/annuaire-formations/niveaux-admission/prepa-scientifique/",
        date: "année à confirmer",
      },
      {
        label: "Places d'élève fonctionnaire",
        valeur: "une dizaine par an",
        source: "https://imt-nord-europe.fr/ingenieur-generaliste-devenir-eleve-fonctionnaire/",
      },
      {
        label: "Engagement de service des élèves fonctionnaires",
        valeur: "8 ans",
        source: "https://imt-nord-europe.fr/ingenieur-generaliste-devenir-eleve-fonctionnaire/",
      },
      {
        label: "Droits annuels, étudiant UE",
        valeur: "environ 3 200 €",
        source: "https://imt-nord-europe.fr/annuaire-formations/ingenieur-generaliste/",
        date: "rentrée 2025",
      },
    ],
    sources: [
      "https://imt-nord-europe.fr/annuaire-formations/niveaux-admission/prepa-scientifique/",
      "https://imt-nord-europe.fr/ingenieur-generaliste-devenir-eleve-fonctionnaire/",
      "https://imt-nord-europe.fr/ingenieur-generaliste-admissions/",
      "https://imt-nord-europe.fr/ingenieur-generaliste-cursus/",
      "https://imt-nord-europe.fr/annuaire-formations/ingenieur-generaliste/",
      "https://imt-nord-europe.fr/formations/ingenieur-de-specialite-par-apprentissage/",
    ],
  },
  "imt-mines-albi": {
    pourquoi:
      "Les diplômés travaillent dans la pharmacie, la cosmétique et l'agroalimentaire, l'aéronautique et les transports, l'énergie et la construction, le conseil et le numérique, comme ingénieur procédés, matériaux, qualité, logistique ou data. 82 % trouvent un emploi en moins de deux mois ; pour la promotion 2024, 84 % sont en CDI et touchent en moyenne 42 375 € brut par an.",
    apprendre:
      "Tronc commun scientifique et technique en 1re année ; cours au choix et projet de recherche, d'innovation ou de création d'entreprise en 2e année ; puis une option sur 5 en 3e année : énergies renouvelables, procédés pharmaceutiques et agroalimentaires, matériaux pour les transports, génie industriel, ingénierie de la donnée. 11 mois de stages et un séjour à l'étranger : 18 semaines d'études ou 9 semaines de stage.",
    specificite:
      "École de l'Institut Mines-Télécom sur un campus de 24 ha avec 8 résidences. Un double cursus pharmacien-ingénieur accueille des étudiants de 5e année de pharmacie, et plus de 300 doubles diplômes ou options sont ouverts, de Georgia Tech à Sciences Po.",
    chiffres: [
      {
        label: "Places au Concours Mines-Télécom (filière étudiant)",
        valeur: "156 (45 MP, 45 PC, 45 PSI, 8 PT, 7 BCPST, 4 MPI, 2 TSI)",
        source:
          "https://www.imt-mines-albi.fr/fr/integrer-formation-ingenieur-generaliste-imt-mines-albi-apres-classe-preparatoire-CPGE",
        date: "rentrée 2026",
      },
      {
        label: "Diplômés en emploi en moins de 2 mois",
        valeur: "82 %",
        source: "https://www.imt-mines-albi.fr/",
        date: "affiché sur le site en 2026",
      },
      {
        label: "Salaire annuel brut moyen en France, primes incluses",
        valeur: "42 375 €",
        source:
          "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-etudiant",
        date: "promotion 2024",
      },
      {
        label: "Diplômés en activité embauchés en CDI",
        valeur: "84 %",
        source:
          "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-etudiant",
        date: "promotion 2024",
      },
    ],
    sources: [
      "https://www.imt-mines-albi.fr/",
      "https://www.imt-mines-albi.fr/fr/integrer-une-formation/comment-integrer-imt-mines-albi",
      "https://www.imt-mines-albi.fr/fr/integrer-formation-ingenieur-generaliste-imt-mines-albi-apres-classe-preparatoire-CPGE",
      "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-etudiant",
      "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-par-alternance",
      "https://www.imt-mines-albi.fr/fr/FAQ-ingenieur-generaliste-imt-mines-albi",
    ],
  },
  "imt-mines-ales": {
    pourquoi:
      "Pour la promotion 2024, 86 % des diplômés ont trouvé un emploi en moins de 4 mois, avec un salaire annuel moyen de 45 100 €, et 20 % ont été embauchés à l'étranger. Les secteurs qui recrutent le plus : BTP et génie civil (30 %), informatique et data (18 %), énergie (13 %), puis transport, industrie, environnement et gestion des risques.",
    apprendre:
      "Un tronc commun, puis un domaine choisi en 2e année parmi 6 (environnement-énergie-risques, écoconception et matériaux, informatique et IA, industrie du futur, génie civil et bâtiment durable, ressources minérales et sous-sol), soit 26 options. Plus de 12 mois en entreprise : stage ouvrier, stage d'adjoint ingénieur de 13 semaines, missions R&D et création de 5 semaines, projet de fin d'études de 4 à 6 mois.",
    specificite:
      "Fondée en 1843, l'école mise sur la création d'entreprise : son incubateur, ouvert en 1984, a accompagné 241 entreprises, et chaque élève vit une mission création de 5 semaines. Un double diplôme ingénieur-architecte se prépare avec ULiège, UMONS ou l'ENSA Montpellier.",
    chiffres: [
      {
        label: "Places sur concours (Mines-Télécom, PT, TSI, G2E)",
        valeur: "224 (68 MP, 62 PSI, 58 PC, 5 MPI, 23 PT, 6 BCPST, 2 TSI)",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/occitanie/gard/ecole-nationale-superieure-des-mines-d-ales-imt-mines-ales/diplome-d-ingenieur-de-l-ecole-nationale-superieure-des-mines-d-ales-de-l-institut-mines-telecom",
        date: "2026",
      },
      {
        label: "Diplômés en emploi en moins de 4 mois (VIE compris)",
        valeur: "86 %",
        source: "https://www.imt-mines-ales.fr/sites/default/files/media/2026-06/Brochure-Recrutement-2026.pdf",
        date: "promotion 2024",
      },
      {
        label: "Salaire annuel moyen de sortie",
        valeur: "45 100 €",
        source: "https://www.imt-mines-ales.fr/sites/default/files/media/2026-06/Brochure-Recrutement-2026.pdf",
        date: "promotion 2024",
      },
      {
        label: "Apprentis ingénieurs (3 spécialités)",
        valeur: "357",
        source:
          "https://www.imt-mines-ales.fr/formations/ingenieur-de-specialite-par-apprentissage/lapprentissage-imt-mines-ales",
        date: "2025-2026",
      },
    ],
    sources: [
      "https://www.imt-mines-ales.fr/",
      "https://imt-mines-ales.fr/les-differentes-voies-dadmissions-pour-les-formation-dingenieur-generaliste-et-pour-les-formations",
      "https://www.imt-mines-ales.fr/tout-savoir-sur-la-formation-dingenieur-generaliste",
      "https://www.imt-mines-ales.fr/sites/default/files/media/2026-06/Brochure-Recrutement-2026.pdf",
      "https://www.imt-mines-ales.fr/vie-etudiante/cout-de-la-scolarite-et-accompagnement-social",
      "https://www.imt-mines-ales.fr/formations/ingenieur-de-specialite-par-apprentissage/lapprentissage-imt-mines-ales",
      "https://www.onisep.fr/ressources/structures-enseignement/occitanie/gard/ecole-nationale-superieure-des-mines-d-ales-imt-mines-ales/diplome-d-ingenieur-de-l-ecole-nationale-superieure-des-mines-d-ales-de-l-institut-mines-telecom",
    ],
  },
  "ensta-bretagne": {
    pourquoi:
      "À Brest, l'ENSTA forme aux métiers de la mer et de la défense : génie maritime, énergies en mer, hydrographie et océanographie, robotique, propulsion et pyrotechnie. La formation Défense & Sécurité mène à la DGA, à l'Agence de l'innovation de défense, au SHOM et vers neuf grands groupes partenaires, dont Naval Group, Thales, MBDA, Safran et Dassault ; cybersécurité, énergie et maritime recrutent aussi.",
    apprendre:
      "1re année : tronc commun (maths, physique, mécanique, numérique, langues) et un mois de stage. 2e année : un champ (maths appliquées, mécanique ou numérique) et un stage de recherche d'au moins 12 semaines. 3e année : une spécialisation, dont 7 à Brest (génie maritime, énergies en mer, hydrographie et océanographie, matériaux et structures, robotique, pyrotechnie, systèmes d'observation), puis le stage de fin d'études. Au moins 16 semaines à l'étranger.",
    specificite:
      "Depuis le 1er janvier 2025, ENSTA Paris et ENSTA Bretagne forment une seule école de l'Institut Polytechnique de Paris, avec deux campus, Brest et Palaiseau. Toute la promotion Défense & Sécurité commence à Brest, et ses élèves IETA sont payés par la DGA.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts, campus de Brest",
        valeur: "91 (34 PSI, 26 MP, 25 PC, 6 PT)",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "concours 2026",
      },
      {
        label: "Places Défense & Sécurité au concours Mines-Télécom",
        valeur: "90 (45 civils, 45 IETA), indicatives",
        source: "https://www.ensta.fr/formations/formation-dingenieur-defense-securite",
        date: "2026",
      },
      {
        label: "Frais de scolarité (ressortissants de l'UE)",
        valeur: "2 936 € par an",
        source: "https://www.ensta.fr/formations/formation-dingenieur-defense-securite",
        date: "2026-2027",
      },
      {
        label: "Étudiants de l'ENSTA (deux campus)",
        valeur: "2 351",
        source: "https://www.ensta.fr/",
        date: "2025-2026",
      },
    ],
    sources: [
      "https://www.ensta.fr/",
      "https://www.ensta.fr/formations/catalogue-de-formations/trouver-ma-formation/formation-dingenieur-generaliste-ensta",
      "https://www.ensta.fr/formations/catalogue-de-formations/admissions",
      "https://www.ensta.fr/formations/formation-dingenieur-defense-securite",
      "https://www.ensta.fr/formations/ingenieurs/ingenieur-generaliste/un-large-choix-dexpertise-en-3e-annee",
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
    ],
  },
  ensea: {
    pourquoi:
      "L'ENSEA forme des ingénieurs de l'électronique, de l'informatique et des télécoms. Plus d'un tiers des diplômés 2024 travaillent dans les services informatiques, les autres dans les transports, la banque, les télécoms ou l'énergie ; 7 élèves sur 10 signent leur premier contrat avant le diplôme. Métiers visés : systèmes embarqués, robotique, cybersécurité, aéronautique, biomédical.",
    apprendre:
      "Tronc commun en 1re année, avec majeures et mineures. En 2e année, 2 majeures sur 4 et 1 option sur 14 (drones, IA et big data, microélectronique, véhicules électriques…). En 3e année, une spécialité sur 8 : automatique, systèmes de communication, systèmes embarqués, électronique pour le vivant, informatique, mécatronique, réseaux et sécurité, signal et IA. 36 semaines de stages au minimum et 4 mois à l'étranger.",
    specificite:
      "Jusqu'à 50 % de l'emploi du temps de 2e année se personnalise, et deux spécialités de 3e année se suivent en anglais. Plus de 30 doubles diplômes à l'étranger, et en France avec Audencia, GEM, Paris Dauphine ou l'INSTN en génie atomique.",
    chiffres: [
      {
        label: "Places au concours CentraleSupélec (MP, PC, PSI, MPI)",
        valeur: "175 (70 PSI, 60 MP, 30 PC, 15 MPI)",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-d-oise/ecole-nationale-superieure-de-l-electronique-et-de-ses-applications/diplome-d-ingenieur-de-l-ecole-nationale-superieure-de-l-electronique-et-de-ses-applications",
        date: "2026",
      },
      {
        label: "Places en apprentissage",
        valeur: "56 en 1re année, 28 en 2e année",
        source: "https://alternance.imt.fr/wp-content/uploads/2026/01/Notice-2026_ENSEA.pdf",
        date: "2026",
      },
      {
        label: "Élèves qui signent leur premier contrat avant le diplôme",
        valeur: "7 sur 10",
        source: "https://www.ensea.fr/formations/insertion-professionnelle",
        date: "enquête CGE 2025",
      },
      {
        label: "Part d'alternants dans le cycle ingénieur",
        valeur: "17,15 %",
        source:
          "https://www.letudiant.fr/fiches/etudes/fiche/ensea-ecole-dingenieur-publique-en-electronique-informatique-et-telecommunications.html",
        date: "2024-2025",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-d-oise/ecole-nationale-superieure-de-l-electronique-et-de-ses-applications/diplome-d-ingenieur-de-l-ecole-nationale-superieure-de-l-electronique-et-de-ses-applications",
      "https://alternance.imt.fr/wp-content/uploads/2026/01/Notice-2026_ENSEA.pdf",
      "https://www.letudiant.fr/fiches/etudes/fiche/ensea-ecole-dingenieur-publique-en-electronique-informatique-et-telecommunications.html",
      "https://www.ensea.fr/formations/ingenieur-ensea",
      "https://www.ensea.fr/formations/insertion-professionnelle",
      "https://www.ensea.fr/formations/ingenieur-par-lalternance",
    ],
  },
  ensiie: {
    pourquoi:
      "L'ENSIIE forme des ingénieurs en informatique et en mathématiques appliquées, avec une base de gestion d'entreprise. Ses parcours mènent au logiciel sûr, à la cybersécurité, au calcul intensif et aux données massives, aux jeux vidéo et à la réalité virtuelle. L'école affiche 44 000 € de salaire d'embauche et 80 % de diplômés embauchés au bout de trois mois.",
    apprendre:
      "Tronc commun en 1re année : informatique, mathématiques appliquées, gestion, entrepreneuriat. Dès la 2e année, un parcours : mathématiques appliquées, ingénierie logicielle (programmation sûre, sécurité), interactions numériques (jeux vidéo, réalité virtuelle), calcul intensif et données massives. Stages de 8 et 10 semaines, projet de 6 mois en 3e année ; à l'étranger, un semestre d'études ou 16 semaines de stage.",
    specificite:
      "Associée depuis 2017 à l'Université Paris-Saclay et à l'Institut Mines-Télécom, l'école ouvre 12 masters en bi-cursus en 3e année et un double cursus ingénieur-manager de 4 ans avec IMT Business School.",
    chiffres: [
      {
        label: "Places au concours Mines-Télécom",
        valeur: "109 (55 MP, 20 MPI, 18 PSI, 14 PC, 2 TSI)",
        source: "https://www.ensiie.fr/formation/concours-et-admission/concours-mines-telecom",
        date: "session 2027 selon la page",
      },
      {
        label: "Salaire à l'embauche",
        valeur: "44 000 €",
        source: "https://www.ensiie.fr/",
        date: "affiché sur le site en 2026",
      },
      {
        label: "Diplômés embauchés au bout de 3 mois",
        valeur: "80 %",
        source: "https://www.ensiie.fr/",
        date: "affiché sur le site en 2026",
      },
      {
        label: "Étudiants inscrits",
        valeur: "523",
        source:
          "https://backend.deqar.eu/reports/HCERES/2026/140404/20260618_1419_e2026-ev-0912266u-dee-etab260025402-rd.pdf",
        date: "2024-2025",
      },
    ],
    sources: [
      "https://www.ensiie.fr/",
      "https://www.ensiie.fr/formation/concours-et-admission",
      "https://www.ensiie.fr/formation/concours-et-admission/concours-mines-telecom",
      "https://www.ensiie.fr/formation/trouver-votre-formation/la-formation-initiale-sous-statut-etudiant-fise",
      "https://www.ensiie.fr/formation",
      "https://backend.deqar.eu/reports/HCERES/2026/140404/20260618_1419_e2026-ev-0912266u-dee-etab260025402-rd.pdf",
    ],
  },
  "isae-ensma": {
    pourquoi:
      "Les diplômés travaillent surtout dans l'aéronautique et le spatial, puis dans l'automobile, le ferroviaire, l'énergie et les bureaux d'études, comme ingénieur calcul, R&D, conception ou développement. Premiers employeurs : Safran, Airbus, MBDA, Dassault Aviation, ArianeGroup, Thales, CNES, Renault, Stellantis, Alstom, EDF. La moitié des élèves sont embauchés avant le diplôme.",
    apprendre:
      "1re année de tronc commun scientifique, technique et humain. En 2e année, les disciplines de l'ingénieur, un stage ouvrier de 1 à 2 mois et un stage ingénieur de 3 à 4 mois. En 3e année, une option parmi 7, dont aérodynamique, structures, énergétique, thermique, matériaux et informatique, puis un projet de fin d'études de 3 à 6 mois. 6 mois à l'étranger en moyenne.",
    specificite:
      "Au Futuroscope depuis 1993, l'école consacre 17 000 de ses 32 000 m² à la recherche, avec l'Institut Pprime, laboratoire du CNRS d'environ 600 personnes. Elle fait partie du Groupe ISAE, avec ISAE-SUPAERO, l'ENAC et l'École de l'air et de l'espace.",
    chiffres: [
      {
        label: "Places au concours Mines-Télécom",
        valeur: "151 (58 PSI, 55 MP, 28 PC, 5 PT, 3 MPI, 2 TSI)",
        source: "https://www.ensma.fr/formation-ingenieur-statut-etudiant/admission-3/",
        date: "rentrée 2026",
      },
      {
        label: "Élèves-ingénieurs",
        valeur: "700, dont 38 % de boursiers",
        source: "https://www.ensma.fr/wp-content/uploads/2025/06/depliant-ISAE-ENSMA-2025.pdf",
        date: "2025",
      },
      {
        label: "Élèves embauchés avant le diplôme",
        valeur: "50 %",
        source: "https://www.ensma.fr/wp-content/uploads/2025/06/depliant-ISAE-ENSMA-2025.pdf",
      },
      {
        label: "Salaire brut moyen à la sortie",
        valeur: "37 500 € par an",
        source: "https://www.ensma.fr/wp-content/uploads/2025/06/depliant-ISAE-ENSMA-2025.pdf",
      },
    ],
    sources: [
      "https://www.ensma.fr/en/engineering-program/admission-3/",
      "https://www.ensma.fr/wp-content/uploads/2025/06/depliant-ISAE-ENSMA-2025.pdf",
      "https://www.ensma.fr/formation-ingenieur-statut-etudiant/admission-3/",
      "https://www.ensma.fr/formation-ingenieur-specialite-statut-apprenti/",
      "https://www.ensma.fr/formation-ingenieur-statut-etudiant/insertion-fise/",
      "https://www.ensma.fr/formation-ingenieur-statut-etudiant/enseignement/",
    ],
  },
  navale: {
    pourquoi:
      "Tu y deviens officier de la Marine nationale. À la sortie, chaque élève apte prend un premier poste de chef de quart, puis la carrière mène vers les navires de surface, les sous-marins, l'aéronautique navale ou les commandos marine. Le salaire annuel brut moyen à l'embauche atteint 32 148 € en 2025, primes en plus.",
    apprendre:
      "La formation mêle sciences, navigation et formation militaire. Dès l'entrée, tu suis la filière navigation (OPS/N : systèmes de combat, détection, lutte sous la mer) ou énergie (OPS/E : propulsion, nucléaire, aéronautique). En 2e année, tu approfondis un domaine, par exemple ondes et signaux ou sciences de la donnée maritime et IA. Périodes de mer chaque année, mission Jeanne d'Arc de cinq mois, semestre d'échange possible à l'étranger.",
    specificite:
      "Tu es militaire dès le premier jour : élève-officier, puis aspirant, puis enseigne de vaisseau, avec une scolarité payée. En entrant, tu choisis un métier d'officier de carrière : l'école parle d'une carrière de 27 ans dans les forces.",
    chiffres: [
      {
        label: "Places au concours CentraleSupélec (MP, MPI, PC, PSI)",
        valeur: "85 (56 en filière navigation, 29 en filière énergie)",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/bretagne/finistere/ecole-navale/diplome-d-ingenieur-de-l-ecole-navale",
        date: "2026",
      },
      {
        label: "Salaire annuel brut moyen à l'embauche, primes en plus",
        valeur: "32 148 €",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/bretagne/finistere/ecole-navale/diplome-d-ingenieur-de-l-ecole-navale",
        date: "2025",
      },
      {
        label: "Coût de la scolarité",
        valeur: "0 € (scolarité rémunérée)",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/bretagne/finistere/ecole-navale/diplome-d-ingenieur-de-l-ecole-navale",
        date: "2026",
      },
      {
        label: "Durée de la mission Jeanne d'Arc",
        valeur: "150 jours, soit 5 mois de mer",
        source: "https://www.ecole-navale.fr/formation/formations-officiers/cursus-officiers-de-carriere/",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/bretagne/finistere/ecole-navale/diplome-d-ingenieur-de-l-ecole-navale",
      "https://www.ecole-navale.fr/formation/formations-officiers/cursus-officiers-de-carriere/",
      "https://www.ecole-navale.fr/wp-content/uploads/2026/09/plaquette-Bordaches.pdf",
    ],
  },
  agroparistech: {
    pourquoi:
      "Les ingénieurs AgroParisTech travaillent dans le conseil, l'agroalimentaire, la recherche, les administrations, la forêt ou l'environnement. Selon l'enquête 2026, 92 % des diplômés sont en activité un an après la sortie, avec un salaire médian d'embauche de 35 000 € brut par an, primes comprises. En 3e année, tu peux aussi viser le corps des ingénieurs des ponts, des eaux et des forêts.",
    apprendre:
      "En 1re année, un tronc commun à Palaiseau, rythmé par des projets et un stage. En 2e année, tu choisis un domaine (agriculture et territoires, aliments et biomolécules, environnement, santé) et tu passes au moins 16 semaines à l'étranger. En 3e année, tu te spécialises parmi 21 dominantes, de la gestion forestière à l'analyse de données (IODAA), puis stage de fin d'études et mémoire.",
    specificite:
      "AgroParisTech offre 281 des 1 085 places de la filière agronomie du concours BCPST. Les dominantes de 3e année se déroulent à Palaiseau, Nancy, Montpellier, Clermont-Ferrand ou Orléans, et des doubles diplômes existent avec HEC, Sciences Po ou Mines Paris.",
    chiffres: [
      {
        label: "Places au concours Agro-Véto BCPST",
        valeur: "281",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/agroparistech-centre-de-paris-saclay-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-des-sciences-et-industries-du-vivant-et-de-l-environnement",
        date: "2026",
      },
      {
        label: "Diplômés en activité un an après la sortie",
        valeur: "92 %",
        source: "https://www.agroparistech.fr/formation/observatoire-lemploi",
        date: "enquête 2026",
      },
      {
        label: "Salaire médian d'embauche, brut annuel primes comprises",
        valeur: "35 000 €",
        source: "https://www.agroparistech.fr/formation/observatoire-lemploi",
        date: "enquête 2026",
      },
      {
        label: "Droits de scolarité au taux plein",
        valeur: "1 959 € par an",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/agroparistech-centre-de-paris-saclay-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-des-sciences-et-industries-du-vivant-et-de-l-environnement",
        date: "2024",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/essonne/agroparistech-centre-de-paris-saclay-universite-paris-saclay/diplome-d-ingenieur-de-l-institut-des-sciences-et-industries-du-vivant-et-de-l-environnement",
      "https://www.agroparistech.fr/formation/cursus-ingenieur-0",
      "https://www.agroparistech.fr/sites/default/files/media/2026-06/brochure_cursus_ingenieur_2026.pdf",
      "https://www.agroparistech.fr/formation/observatoire-lemploi",
      "https://www.agroparistech.fr/vie-etudiante/financer-ses-etudes",
      "https://www.concours-agro-veto.fr/concours/concours-cpge-bcpst",
    ],
  },
  "institut-agro-rennes-angers": {
    pourquoi:
      "Tu peux devenir conseiller agricole, consultant en filières et stratégies territoriales, responsable R&D, ingénieur bio-informatique ou environnement, chargé de mission agroécologie et biodiversité, ou ingénieur en horticulture pour une collectivité, un centre de recherche ou une entreprise de production. Le premier emploi arrive en 1,8 mois en moyenne.",
    apprendre:
      "À Rennes, la spécialité agronomie ouvre sur 17 spécialisations, de l'agroécologie à la statistique, à l'animal ou à la mer (halieutique). À Angers, à côté du paysage, la spécialité horticulture propose par exemple innovations végétales urbaines ou Seeds and Plant Propagation. Les stages totalisent 11 à 18 mois, en France ou à l'étranger, et chaque étudiant part à l'international.",
    specificite:
      "Quatre cursus d'ingénieur sur deux campus : agronomie et alimentation à Rennes, horticulture et paysage à Angers, où l'école forme des ingénieurs en paysage. Les étudiantes représentent 70 % des effectifs et les boursiers 30 %.",
    chiffres: [
      {
        label: "Places au concours Agro-Véto BCPST",
        valeur: "190 (130 en agronomie, 60 en horticulture et paysage)",
        source: "https://www.concours-agro-veto.fr/concours/concours-cpge-bcpst",
        date: "session 2026",
      },
      {
        label: "Places au concours Agro-Véto apprentissage",
        valeur: "60 (agronomie 20, agroalimentaire 20, horticulture 10, paysage 10)",
        source: "https://www.concours-agro-veto.fr/concours/concours-apprentissage",
        date: "session 2026",
      },
      {
        label: "Durée moyenne d'accès au premier emploi",
        valeur: "1,8 mois",
        source:
          "https://www.institut-agro-rennes-angers.fr/sites/www.institut-agro-rennes-angers.fr/files/fichiers/bibliotheque-de-documents/relation-entreprises/Institut-Agro-Rennes-Angers-plaquette-taxe-apprentissage.pdf",
        date: "novembre 2025",
      },
      {
        label: "Étudiants boursiers",
        valeur: "30 %",
        source:
          "https://www.institut-agro-rennes-angers.fr/sites/www.institut-agro-rennes-angers.fr/files/fichiers/bibliotheque-de-documents/relation-entreprises/Institut-Agro-Rennes-Angers-plaquette-taxe-apprentissage.pdf",
        date: "novembre 2025",
      },
    ],
    sources: [
      "https://www.concours-agro-veto.fr/concours/concours-cpge-bcpst",
      "https://www.concours-agro-veto.fr/concours/concours-apprentissage",
      "https://www.institut-agro-rennes-angers.fr/sites/www.institut-agro-rennes-angers.fr/files/fichiers/bibliotheque-de-documents/relation-entreprises/Institut-Agro-Rennes-Angers-plaquette-taxe-apprentissage.pdf",
      "https://www.institut-agro-rennes-angers.fr/sites/www.institut-agro-rennes-angers.fr/files/fichiers/bibliotheque-de-documents/formation/plaquettes/Institut-Agro-Rennes-Angers-feuillet-apprentissage-ingenieur-agronome.pdf",
      "https://www.institut-agro-rennes-angers.fr/files/fichiers/bibliotheque-de-documents/formation/plaquettes/Institut-Agro-Rennes-Angers-feuillet-apprentissage-ingenieur-horticulture.pdf",
      "https://www.institut-agro-rennes-angers.fr/files/fichiers/bibliotheque-de-documents/formation/scolarite/Rentree-Calendrier-Rennes.pdf",
      "https://www.institut-agro-montpellier.fr/formations/catalogue-des-formations/recherche-d-une-formation/ingenieur-agronome",
    ],
  },
  "institut-agro-montpellier": {
    pourquoi:
      "Les diplômés rejoignent l'agroalimentaire, les services aux entreprises, les collectivités, la recherche, la production agricole ou des organisations internationales, comme chargé d'études eau-environnement, responsable R&D, conseiller agricole, chef de projet SIG ou œnologue. 40 % des ingénieurs agronomes reçoivent une offre d'embauche avant le diplôme, et le salaire brut moyen atteint 35 000 € par an un an après.",
    apprendre:
      "En 1re année, un tronc commun avec un stage dans une entreprise agricole. En 2e année, une option parmi 4 puis un parcours parmi 7, avec un semestre possible dans une université partenaire. En 3e année, une option parmi une quinzaine, de la vigne et du vin à l'agriculture numérique (AgroTIC). Stages d'assistant ingénieur (2 à 3 mois) et de fin d'études (5 à 6 mois), et au moins 16 semaines à l'étranger.",
    specificite:
      "Le bouquet vigne et vin ouvre sur le diplôme national d'œnologue, et le cursus SAADS forme aux systèmes agricoles et agroalimentaires durables des pays du Sud. 25 % des étudiants viennent de l'étranger.",
    chiffres: [
      {
        label: "Places au concours Agro-Véto BCPST",
        valeur: "125 (113 en agronomie, 12 en SAADS)",
        source: "https://www.concours-agro-veto.fr/concours/concours-cpge-bcpst",
        date: "session 2026",
      },
      {
        label: "Salaire brut annuel moyen un an après le diplôme",
        valeur: "35 000 €",
        source:
          "https://www.institut-agro-montpellier.fr/sites/supagro/files/documents/2026/01/06/Plaquette-Ingenieurs-Institut-Agro-Montpellier-2026.pdf",
        date: "enquête d'avril 2025",
      },
      {
        label: "Ingénieurs agronomes avec une offre d'embauche avant le diplôme",
        valeur: "40 %",
        source:
          "https://www.institut-agro-montpellier.fr/sites/supagro/files/documents/2026/01/06/Plaquette-Ingenieurs-Institut-Agro-Montpellier-2026.pdf",
        date: "enquête d'avril 2025",
      },
      {
        label: "Droits de scolarité",
        valeur: "1 990 € par an, plus 105 € de CVEC",
        source:
          "https://www.institut-agro-montpellier.fr/formations/catalogue-des-formations/recherche-d-une-formation/ingenieur-agronome",
        date: "2025-2026",
      },
    ],
    sources: [
      "https://www.institut-agro-montpellier.fr/formations/catalogue-des-formations/recherche-d-une-formation/ingenieur-agronome",
      "https://www.institut-agro-montpellier.fr/sites/supagro/files/documents/2026/01/06/Plaquette-Ingenieurs-Institut-Agro-Montpellier-2026.pdf",
      "https://www.institut-agro-montpellier.fr/formations/catalogue-des-formations/ingenieurs",
      "https://www.institut-agro-montpellier.fr/formations/frais-de-scolarite-soutien-financier/droits-scolarite",
      "https://www.institut-agro-montpellier.fr/sites/supagro/files/documents/2026/06/04/D%C3%A9cision%20n%C2%B02026-252-IAM%20relative%20aux%20tarifs%20de%20formations%20et%20aux%20services%20rendus%20pour%20l%27ann%C3%A9e%202026-2027.pdf",
      "https://www.concours-agro-veto.fr/concours/concours-cpge-bcpst",
      "https://www.concours-agro-veto.fr/concours/concours-apprentissage",
    ],
  },
  ensic: {
    pourquoi:
      "Tu deviens ingénieur en génie chimique et génie des procédés : tu conçois, pilotes et améliores des procédés de production. Les diplômés travaillent dans la chimie, l'énergie, la pharmacie, l'environnement ou l'agroalimentaire, chez BASF, Air Liquide, TotalEnergies, Sanofi, L'Oréal ou Veolia. L'école annonce 100 % de diplômés en emploi en moins de 6 mois et un salaire moyen de 44 300 € à la sortie.",
    apprendre:
      "Un tronc commun en sciences fondamentales et génie des procédés, avec des projets tout au long du cursus (innovation, conception, R&D). Tu choisis ensuite un domaine : procédés pour l'énergie et l'environnement, produits innovants (de la chimie aux procédés) ou procédés pour les biotechnologies. Plus de 7 mois de stages en industrie, et un séjour à l'étranger pour chaque élève, de 6 mois en moyenne, dans plus de 50 universités partenaires.",
    specificite:
      "Une école de chimie en plein centre de Nancy, adossée à un laboratoire commun avec le CNRS. Elle accueille aussi des étudiants en pharmacie : 20 places en 2e année et une voie d'ingénieur-pharmacien par apprentissage.",
    chiffres: [
      {
        label: "Places au CCINP, rentrée 2026",
        valeur: "64 (PC chimie 50, MP 6, PSI 6, TPC 2)",
        source: "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
        date: "2026",
      },
      {
        label: "Salaire moyen à la sortie",
        valeur: "44 300 € par an",
        source: "https://ensic.univ-lorraine.fr/sites/default/files/users/pdf/formations/brochure_I2C_2026_2027.pdf",
        date: "brochure 2026-2027",
      },
      {
        label: "Diplômés en emploi en moins de 6 mois",
        valeur: "100 %",
        source: "https://ensic.univ-lorraine.fr/sites/default/files/users/pdf/formations/brochure_I2C_2026_2027.pdf",
        date: "brochure 2026-2027",
      },
      {
        label: "Élèves qui partent à l'étranger",
        valeur: "100 %, pour 6 mois en moyenne",
        source: "https://ensic.univ-lorraine.fr/sites/default/files/users/pdf/formations/brochure_I2C_2026_2027.pdf",
        date: "brochure 2026-2027",
      },
    ],
    sources: [
      "https://ensic.univ-lorraine.fr/",
      "https://ensic.univ-lorraine.fr/sites/default/files/users/pdf/formations/brochure_I2C_2026_2027.pdf",
      "https://ensic.univ-lorraine.fr/fr/formations/ingenieur-des-industries-chimiques-i2c/admissions-en-cycle-ingenieur",
      "https://ensic.univ-lorraine.fr/fr/formations/ingenieur-specialite-genie-chimique-par-apprentissage",
      "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-pc.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-psi.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-tpc.html",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  ecpm: {
    pourquoi:
      "Tu deviens ingénieur chimiste, surtout en R&D et innovation : ingénieur de recherche ou d'études, chef de projet, ou docteur après une thèse. Les diplômés travaillent dans la santé, les matériaux, la cosmétique, l'énergie, l'automobile ou l'agroalimentaire ; 70 % sont dans l'industrie. Selon la brochure 2026, 78 % ont un emploi moins de 2 mois après le diplôme, payé 38 000 à 40 000 € bruts par an hors primes.",
    apprendre:
      "Trois semestres de tronc commun : sciences analytiques, chimie moléculaire, ingénierie des polymères, matériaux fonctionnels et nanosciences. En 2e année, tu choisis une majeure dans l'un de ces domaines, ou chimie et intelligence artificielle. Environ 12 mois de stages, dont un à l'étranger. En 3e année : année à Strasbourg, échange ou double diplôme à l'étranger, autre école de la Fédération Gay-Lussac, ou contrat de professionnalisation.",
    specificite:
      "Une école trilingue : anglais en 1re langue, allemand ou espagnol en 2e, et environ 40 % des cours scientifiques donnés en anglais et en allemand. Huit doubles diplômes, dont trois avec l'Allemagne. L'école compte parmi ses diplômés Jean-Pierre Sauvage, prix Nobel de chimie 2016.",
    chiffres: [
      {
        label: "Places au CCINP en PC chimie, rentrée 2026",
        valeur: "58 (50 pour l'ingénieur chimiste, 8 pour ChemBiotech), plus 3 en TPC",
        source: "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-pc.html",
        date: "2026",
      },
      {
        label: "Salaire d'embauche, brut annuel hors primes",
        valeur: "38 000 à 40 000 €",
        source: "https://ecpm.unistra.fr/websites/ecpm/Plaquettes/INGE_2026_web.pdf",
        date: "brochure 2026",
      },
      {
        label: "Diplômés en emploi moins de 2 mois après le diplôme",
        valeur: "78 %",
        source: "https://ecpm.unistra.fr/websites/ecpm/Plaquettes/INGE_2026_web.pdf",
        date: "brochure 2026",
      },
      {
        label: "Doubles diplômes à l'étranger",
        valeur: "8 (3 en Allemagne, 4 en Espagne, 1 au Canada)",
        source: "https://ecpm.unistra.fr/websites/ecpm/Plaquettes/INGE_2026_web.pdf",
        date: "brochure 2026",
      },
    ],
    sources: [
      "https://ecpm.unistra.fr/",
      "https://ecpm.unistra.fr/formations/ingenieur-chimiste-ecpm/",
      "https://ecpm.unistra.fr/formations/ingenieur-chimiste-ecpm/admissions/",
      "https://ecpm.unistra.fr/formations/ingenieur-chemplast/",
      "https://ecpm.unistra.fr/websites/ecpm/Plaquettes/INGE_2026_web.pdf",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-pc.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-tpc.html",
      "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  "sigma-clermont": {
    pourquoi:
      "Tu choisis entre la chimie et les procédés d'un côté, la mécanique et l'industrie de l'autre. En mécanique et génie industriel, les diplômés deviennent ingénieurs R&D, de production, de bureau d'études ou chefs de projet, dans les transports (automobile, aéronautique, ferroviaire), l'énergie, la métallurgie ou la robotique. Le génie des procédés et énergétique mène vers l'environnement, l'énergie et la transformation des matières premières.",
    apprendre:
      "Trois spécialités sous statut étudiant : chimie, génie des procédés et énergétique, mécanique (département mécanique avancée) ; une quatrième en apprentissage, mécanique et génie industriel. Les cursus de Clermont Auvergne INP comptent 14 mois de stages en entreprise en moyenne. Tu peux aussi rejoindre un projet d'élèves : moto SIGMA Regen Superbike, Formula Student ou PERSEUS, avec le CNES.",
    specificite:
      "Née de la fusion de l'IFMA (mécanique) et de l'ENSCCF (chimie), SIGMA Clermont réunit chimie et mécanique sur le campus des Cézeaux. Avec ISIMA et Polytech Clermont, elle forme Clermont Auvergne INP, un institut créé en 2021.",
    chiffres: [
      {
        label: "Places au CCINP, rentrée 2026",
        valeur: "124 (PSI 62, PC chimie 32, MP 20, TSI 8, TPC 2)",
        source: "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
        date: "2026",
      },
      {
        label: "Places en apprentissage (mécanique et génie industriel), 1re année",
        valeur: "48",
        source: "https://alternance.imt.fr/wp-content/uploads/2026/01/Notice-2026_SIGMA-Clermont.pdf",
        date: "rentrée 2026",
      },
      {
        label: "Élèves en cycle ingénieur",
        valeur: "1 002, dont 30 % de boursiers",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/puy-de-dome/ecole-d-ingenieurs-sigma-clermont-clermont-auvergne-inp-universite-clermont-auvergne",
        date: "2026",
      },
      {
        label: "Stages en entreprise par cursus, moyenne de Clermont Auvergne INP",
        valeur: "14 mois",
        source: "https://ressources.campusfrance.org/pratique/etablissements/fr/ing_sigma_fr.pdf",
        date: "novembre 2024",
      },
    ],
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/puy-de-dome/ecole-d-ingenieurs-sigma-clermont-clermont-auvergne-inp-universite-clermont-auvergne",
      "https://www.onisep.fr/http/redirection/formation/slug/FOR.12383",
      "https://www.sigma-clermont.fr/fr/bienvenue-a-sigma-clermont.html",
      "https://alternance.imt.fr/wp-content/uploads/2026/01/Notice-2026_SIGMA-Clermont.pdf",
      "https://www.francecompetences.fr/recherche/rncp/41245",
      "https://ressources.campusfrance.org/pratique/etablissements/fr/ing_sigma_fr.pdf",
      "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-pc.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-psi.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-tpc.html",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  enac: {
    pourquoi:
      "Tu deviens ingénieur généraliste de l'aéronautique, tourné vers la sécurité et la transition du transport aérien. Les diplômés travaillent chez les constructeurs, dans les compagnies aériennes et les aéroports, ou à la DGAC : les élèves fonctionnaires y deviennent cadres, à environ 3 800 € nets par mois en début de carrière. Selon la notice du concours 2026, 100 % des diplômés ont un emploi 4 mois après le diplôme, pour 39 041 € bruts par an.",
    apprendre:
      "1re année commune : opérations aériennes et sécurité, trafic aérien, avionique et télécoms, maths, informatique. En 2e année, une majeure : systèmes avioniques, opérations aériennes, télécommunications aéronautiques et spatiales ou systèmes informatiques pour le transport aérien, plus des mineures (drones, aéroports, data science, cybersécurité). Trois stages, dont 24 semaines au moins en fin d'études ; 60 accords d'échange ou de double diplôme.",
    specificite:
      "C'est l'école de la DGAC, qui forme aussi pilotes, contrôleurs aériens et techniciens de l'aviation civile. Trois statuts mènent au même diplôme : élève civil, élève fonctionnaire payé pendant ses études, ou apprenti. Le campus de Toulouse compte 750 logements étudiants.",
    chiffres: [
      {
        label: "Places au concours Mines-Télécom, rentrée 2026",
        valeur: "108 (90 élèves civils, 18 élèves fonctionnaires)",
        source: "https://concours.enac.fr/concours/c13614/N_fr_NOTICE_IENACAPP_2026.pdf",
        date: "2026",
      },
      {
        label: "Salaire brut annuel des diplômés",
        valeur: "39 041 €",
        source: "https://cahier-de-prepa.fr/pc-descartes/download?id=260",
        date: "notice Mines-Télécom 2026",
      },
      {
        label: "Diplômés en emploi 4 mois après le diplôme",
        valeur: "100 %",
        source: "https://cahier-de-prepa.fr/pc-descartes/download?id=260",
        date: "notice Mines-Télécom 2026",
      },
      {
        label: "Rémunération d'un élève fonctionnaire",
        valeur: "environ 1 500 € nets par mois, en moyenne sur 3 ans",
        source: "https://concours.enac.fr/concours/c13614/N_fr_NOTICE_IENACAPP_2026.pdf",
        date: "2026",
      },
    ],
    sources: [
      "https://concours.enac.fr/concours/c13614/N_fr_NOTICE_IENACAPP_2026.pdf",
      "https://cahier-de-prepa.fr/pc-descartes/download?id=260",
      "http://formations.enac.fr/fr/formations/feuilleter-le-catalogue/sciences-technologies-sante-STS/formation-d-ingenieur-classique-FI/ingenieur-enac-program-47517.html",
      "https://www.enac.fr/en/full-time-graduate-engineer-eu-0",
      "https://www.enac.fr/sites/default/files/2025-11/Tarifs%20ENAC%20CA%20NOV%202025.pdf",
      "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-mp.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-pc.html",
      "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-psi.html",
    ],
  },
});
