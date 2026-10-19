/**
 * Les écoles d'ingénieurs : fiches vérifiées en octobre 2026 (pourquoi y aller, ce qu'on y apprend,
 * ce qui distingue chaque école), générées depuis la recherche documentaire du projet.
 *
 * À la une, selon un critère public : les écoles des concours X-ENS et Mines-Ponts et les écoles
 * Centrale (après une prépa) ; les écoles post-bac dont le taux d'accès sur Parcoursup en 2025
 * est de 25 % ou moins.
 */
import type { Ecole } from "./ecoles";
import { etTypo } from "./typo";

/** Ce qui s'ajoute aux fiches existantes, par identifiant. */
export const enrichissements: Record<string, Partial<Ecole>> = etTypo<Record<string, Partial<Ecole>>>({
  polytechnique: {
    pourquoi:
      "Tu vises la recherche, l'industrie de pointe ou le service de l'État : à la sortie, environ 53 % des diplômés partent en entreprise, 34 % préparent un doctorat et 15 % rejoignent un corps de l'État. Le réseau compte environ 50 000 anciens élèves. Si tu es français, tu es payé pendant toute ta scolarité.",
    apprendre:
      "La 1re année s'ouvre sur six mois de formation humaine et militaire, dans les armées ou un organisme civil. Jusqu'en 2e année, tu étudies six disciplines parmi huit (des mathématiques à l'économie), puis tu choisis en 3e année un des 15 programmes d'approfondissement. En 4e année : master, école partenaire ou corps de l'État ; stages en entreprise et en recherche obligatoires, 6 mois à l'étranger en moyenne.",
    specificite:
      "École militaire sous la tutelle du ministère des Armées, dirigée par un officier général : les élèves français ont le statut d'élève officier, portent le grand uniforme et reçoivent une solde. En contrepartie, ils s'engagent à servir 10 ans l'État, ou remboursent leurs études (la « pantoufle »).",
    statut: "public",
    recrutement: ["prepa", "titre"],
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
        valeur: "environ 53 % en entreprise, 34 % en doctorat, 15 % dans un corps de l'État",
        source: "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/cycle-ingenieur-polytechnicien",
      },
      {
        label: "Anciens élèves",
        valeur: "environ 50 000",
        source: "https://programmes.polytechnique.edu/cycle-ingenieur-polytechnicien/cycle-ingenieur-polytechnicien",
      },
    ],
    une: "Concours X-ENS",
    uneRang: 1,
    uneVoie: "prepa",
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
    statut: "public",
    recrutement: ["prepa", "titre"],
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
    une: "Concours X-ENS",
    uneRang: 2,
    uneVoie: "prepa",
    short: "ENS Ulm",
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
    statut: "public",
    recrutement: ["prepa", "titre"],
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
    une: "Concours X-ENS",
    uneRang: 13,
    uneVoie: "prepa",
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
    statut: "public",
    recrutement: ["prepa", "titre"],
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
      },
      {
        label: "Structure du diplôme",
        valeur: "4 ans, 240 ECTS + 50 ECTS d'activités spécifiques, 3 mois de mobilité au minimum",
        source: "https://www.ens-lyon.fr/formation/offre-de-formation/diplome-de-lens-de-lyon",
      },
    ],
    une: "Concours X-ENS",
    uneRang: 14,
    uneVoie: "prepa",
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
  espci: {
    pourquoi:
      "Tu aimes la physique, la chimie et la biologie au labo : environ la moitié du temps de 1re et 2e années se passe en activités expérimentales. À la sortie, 80 % des diplômés rejoignent l'industrie, 20 % la recherche académique ou l'enseignement, et 63 % des anciens ont soutenu une thèse. Salaire moyen déclaré au premier emploi : 47 000 € par an.",
    apprendre:
      "En 1re et 2e années, socle commun en physique, chimie et biologie, avec langues et sciences humaines, et un projet scientifique en équipe sur trois semestres. En 3e année : stage industriel de cinq mois, expérience internationale obligatoire, spécialisation et projet de recherche d'au moins huit semaines. La 4e année, facultative, mène à un master recherche ou à un double diplôme.",
    specificite:
      "École de la Ville de Paris, membre de PSL, où ont travaillé Pierre et Marie Curie, Paul Langevin, Pierre-Gilles de Gennes et Georges Charpak. Environ 90 élèves par promotion, un enseignant-chercheur pour huit élèves en travaux pratiques, 10 laboratoires de recherche et l'incubateur deeptech PC'UP sur place.",
    statut: "public",
    recrutement: ["prepa", "titre"],
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
    une: "Concours X-ENS",
    uneRang: 16,
    uneVoie: "prepa",
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
    statut: "public",
    recrutement: ["prepa", "titre"],
    chiffres: [
      {
        label: "Places au concours commun Mines-Ponts",
        valeur: "130 (MP 52, PSI 36, PC 30, MPI 5, PT 5, TSI 2)",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "2026",
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
        date: "2025",
      },
      {
        label: "Insertion des diplômés",
        valeur: "70 % en poste avant la fin des études, 85 % en CDI, 13 % en doctorat",
        source:
          "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/graduates-career-opportunities-and-integration/",
        date: "2025",
      },
    ],
    une: "Concours Mines-Ponts",
    uneRang: 3,
    uneVoie: "prepa",
    sources: [
      "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
      "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/",
      "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/admission/",
      "https://www.minesparis.psl.eu/en/education/civil-engineering-cycle/graduates-career-opportunities-and-integration/",
      "https://www.minesparis.psl.eu/wp-content/uploads/2025/09/Plaquette-cycle-IC.pdf",
      "https://www.minesparis.psl.eu/en/education/specialised-energy-engineering-cycle/",
    ],
  },
  supaero: {
    pourquoi:
      "37 % des employeurs de ses diplômés travaillent dans l'aérospatial et la défense : Airbus, Safran, Thales, Dassault, la DGA, MBDA, ArianeGroup. Les autres recrutent dans le conseil, l'informatique, l'énergie ou l'automobile. 77 % des diplômés 2023 avaient un emploi avant même la remise du diplôme, avec un salaire moyen de 46,5 k€ par an primes incluses.",
    apprendre:
      "Deux ans de tronc commun : mécanique du vol, mathématiques appliquées, informatique, physique, avec économie, gestion de projet et 11 langues au choix. En 3e année, tu combines un domaine d'application (aéronefs, systèmes spatiaux, systèmes autonomes, énergie-transport-environnement, simulation, neuro-IA) et une filière d'expertise, comme la dynamique des fluides. Stages : 4 semaines en 1re année, 2 mois de recherche en 2e, 5 mois en 3e.",
    specificite:
      "École du ministère des Armées, elle a sur son campus 8 avions pour l'initiation au pilotage et une soufflerie. 85 % des élèves font un semestre d'échange, et l'école compte 32 accords de double diplôme, avec HEC ou Sciences Po par exemple.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Ingénieur de spécialité génie industriel pour l'aéronautique et l'espace : 3 ans en apprentissage, préparés par le Groupe ISAE sur 4 sites, dont ISAE-SUPAERO à Toulouse. Accès après un BUT, une prépa ATS ou une licence 3 : dossier, écrits, entretien, puis signature du contrat. 24 semaines à l'école en 1re année, 18 en 3e. 30 apprentis diplômés par an à ISAE-SUPAERO. En 3e année du cursus généraliste, un contrat de professionnalisation est possible.",
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
        date: "2024",
      },
      {
        label: "Salaire moyen de sortie en France, primes incluses",
        valeur: "46,5 k€ par an",
        source:
          "https://www.isae-supaero.fr/wp-content/uploads/2025/03/Plaquette_ingenieur_generaliste_ISAE-SUPAERO_2024.pdf",
        date: "2024",
      },
      {
        label: "Diplômés en un an",
        valeur: "299 ingénieurs généralistes et 30 apprentis",
        source: "https://www.isae-supaero.fr/isae-supaero-6/institut/nos-chiffres-cles/",
      },
    ],
    une: "Concours Mines-Ponts",
    uneRang: 6,
    uneVoie: "prepa",
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
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Cycle généraliste en apprentissage : 1re année en statut étudiant, puis apprenti en 2e et 3e années (ingénierie des systèmes complexes), via le concours Mines-Ponts ou GEI-UNIV. Deux formations d'ingénieur en apprentissage sur 3 ans, ouvertes après un BUT, une prépa ATS, une L3 ou une prépa : conception mécanique (option architecture navale ou systèmes pyrotechniques) et systèmes embarqués. La formation Défense & Sécurité passe en alternance en 3e année.",
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
    une: "Concours Mines-Ponts",
    uneRang: 19,
    uneVoie: "prepa",
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
      "1re année de tronc commun : mathématiques, physique-électronique, informatique et algorithmique, économie, management, sociologie, langues. En 2e année, tu choisis 2 filières parmi 16, dans les domaines de l'école, informatique et réseaux, image-données-signal, communications et électronique. En 3e année, une option parmi 11 avec un projet de recherche, un double diplôme ou un master à l'Institut polytechnique de Paris. Stage ingénieur de 6 mois.",
    specificite:
      "Chaque élève vit une expérience à l'international. Son Parcours Talents, un double diplôme, ouvre l'accès aux corps techniques de l'État ; d'autres doubles diplômes existent avec HEC ou Sciences Po (ingénieur-manager).",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Formation d'ingénieur en apprentissage (FISEA) : 1re année à temps plein en statut étudiant, puis 2e et 3e années en apprentissage, avec 3 jours à l'école et 2 jours en entreprise par semaine. Quatre parcours : cybersécurité, intelligence artificielle et science des données, réseaux télécoms et internet des objets, systèmes embarqués. Même diplôme d'ingénieur Télécom Paris.",
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
        date: "2026",
      },
      {
        label: "Salaire médian de sortie, brut hors primes",
        valeur: "49,1 k€ par an",
        source: "https://www.telecom-paris.fr/fr/ingenieur/enquete-1er-emploi",
        date: "2026",
      },
      {
        label: "Places en apprentissage, toutes voies",
        valeur: "29",
        source: "https://www.telecom-paris.fr/fr/ingenieur/formation/apprentissage",
      },
    ],
    une: "Concours Mines-Ponts",
    uneRang: 20,
    uneVoie: "prepa",
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
      "Pour la promotion 2023 : 94 % en emploi, 73 % embauchés avant même le diplôme, 56 500 € bruts par an primes comprises au premier emploi en France. La finance et l'assurance accueillent 33 % des diplômés, le conseil et les études 30 %, l'informatique et l'administration 10 % chacune ; 15 % font une thèse.",
    apprendre:
      "1re année : microéconomie, macroéconomie, probabilités, statistique, informatique, puis un stage d'au moins 4 semaines. 2e année : statistique, économétrie, machine learning, et 10 à 16 semaines de stage. En 3e année, tu choisis un parcours parmi 6 (actuariat, data science, finance-risques-données, politiques économiques, data science sociale…) ou la voie recherche, puis 14 à 26 semaines de stage.",
    specificite:
      "Elle forme aussi les « ingénieurs de la statistique, de l'économie et de la donnée », ex-administrateurs de l'Insee. Elle recrute à la fois en prépa scientifique, en prépa ECG et en khâgne B/L, et accueille environ 25 polytechniciens par an.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "En 3e année, le stage de fin d'études peut commencer en alternance pendant l'année. Tarif spécifique de 7 000 € pour les alternants salariés sous convention avec l'école (2026-2027).",
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
        date: "2024",
      },
      {
        label: "Salaire moyen au premier emploi en France, primes comprises",
        valeur: "56 500 € bruts par an",
        source: "https://www.ensae.fr/en/school/careers-and-alumni/job-placement-and-careers",
        date: "2024",
      },
      {
        label: "Diplômés en emploi ayant signé avant le diplôme",
        valeur: "73 %",
        source: "https://www.ensae.fr/en/school/careers-and-alumni/job-placement-and-careers",
        date: "2024",
      },
    ],
    une: "Concours Mines-Ponts",
    uneRang: 21,
    uneVoie: "prepa",
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
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Le cursus généraliste s'ouvre à l'apprentissage, sur 3 ans ou sur les 2 dernières années : 1re année à Metz ou à Rennes, puis Paris-Saclay ; 8 à 19 mois en entreprise. 85 places en 2026 : 34 par le concours Centrale-Supélec, 20 en PT, 16 en TSI, 10 en ATS, 5 par le concours universitaire.",
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
        date: "2023",
      },
      {
        label: "Salaire brut moyen à l'embauche, primes comprises",
        valeur: "53 800 € par an",
        source:
          "https://www.onisep.fr/ressources/structures-enseignement/bretagne/ille-et-vilaine/centralesupelec-campus-de-rennes/diplome-d-ingenieur-de-l-ecole-centralesupelec",
        date: "2023",
      },
      {
        label: "Admissibles attendus aux oraux du concours Centrale-Supélec",
        valeur: "6 000",
        source: "https://www.centralesupelec.fr/actualites/bienvenue-aux-admissibles-2026",
        date: "session 2026",
      },
    ],
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 5,
    uneVoie: "prepa",
    sources: [
      "https://www.centralesupelec.fr/programmes/ingenieur-generaliste",
      "https://www.onisep.fr/ressources/structures-enseignement/bretagne/ille-et-vilaine/centralesupelec-campus-de-rennes/diplome-d-ingenieur-de-l-ecole-centralesupelec",
      "https://www.centralesupelec.fr/sites/default/files/communiques-de-presse/CentraleSupe%CC%81lec_251204_FichePresse_PolitiqueSociale_Dispositifs_VF.pdf",
      "https://www.centralesupelec.fr/actualites/bienvenue-aux-admissibles-2026",
      "https://www.centralesupelec.fr/programmes/ingenieur-specialite-electronique",
    ],
  },
  utt: {
    pourquoi:
      "Pour un métier d'ingénieur ouvert : chef de projet, consultant, développeur, sécurité informatique, R&D. Dans la promotion 2024, 92 % des diplômés ont un emploi et 67 % étaient embauchés avant le diplôme, à 42 520 € bruts par an en moyenne, primes comprises. Les premiers secteurs : informatique (33 %), conseil et études (20 %), puis transports.",
    apprendre:
      "Deux ans de tronc commun : sciences fondamentales, techniques de l'ingénieur, sciences humaines, avec des cours bilingues anglais-français. Puis trois ans dans l'une des 7 branches : génie industriel, génie mécanique, informatique et systèmes d'information, deux branches matériaux, réseaux et télécoms, systèmes numériques et IA. Un semestre d'études à l'étranger est possible dès le 4e semestre : Europe, Chine, Canada.",
    specificite:
      "Tu composes ton parcours à la carte dès le 1er semestre, puis tu choisis librement ta branche à la fin du tronc commun, hors classement interne. En cas de retard, tu prolonges ton cursus le temps de valider les modules manquants.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage dès la 3e année après le bac en Matériaux et mécanique ; dès la 4e année en Génie industriel, Génie mécanique et Systèmes numériques (fiche Parcoursup 2026).",
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
        date: "2025",
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
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage possible après la 1re année (fiche Parcoursup). Spécialités ouvertes en apprentissage : biotechnologies et bioinformatique, génie industriel, génie mécanique, informatique, télécommunications, et génie électrique ou mécanique avec l'ITII de Lyon (Onisep).",
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
    une: "Taux d'accès Parcoursup 2025 : 13 %",
    uneRang: 13,
    uneVoie: "postbac",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=62&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=67&typeBac=0&originePc=0",
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/institut-national-des-sciences-appliquees-de-lyon-site-de-lyon",
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/institut-national-des-sciences-appliquees-de-lyon-site-de-lyon/premier-cycle-insa-post-bac-general-formation-initiale-aux-metiers-d-ingenieur-fimi-de-l-insa-de-lyon",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      "https://www.insa-rennes.fr/fileadmin/ressources/Rubriques/02-INSA/documentation/OffreDeFormation_INSA-Rennes_2026-2027.pdf",
    ],
  },
  utc: {
    pourquoi:
      "Selon l'école, 97,2 % des diplômés ont un emploi, trouvé en 1 mois en moyenne, et 61,5 % sont embauchés avant même leur sortie. Ils travaillent dans de grands groupes, des PME ou des entreprises publiques, comme chefs de projet, en R&D, en développement produit ou en qualité. Le réseau des anciens compte 28 300 diplômés.",
    apprendre:
      "Le tronc commun mêle sciences, techniques et sciences humaines, avec des modules que tu choisis toi-même. Tu entres ensuite dans une branche : génie biologique, informatique, ingénierie mécanique, génie des procédés ou génie urbain. Le semestre à l'étranger est obligatoire, parmi 204 universités partenaires.",
    specificite:
      "Tu composes ton emploi du temps en choisissant tes modules, puis ta branche à la fin du tronc commun. Le cursus « Humanités et technologie » (Hutech), à recrutement séparé, a ouvert 25 places en 2025.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage dès la 3e année après le bac en ingénierie mécanique et en informatique ; en génie des procédés (filière procédés pharmaceutiques et cosmétiques), en 3e année du cycle ingénieur (fiche Parcoursup 2026).",
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
    une: "Taux d'accès Parcoursup 2025 : 22 %",
    uneRang: 22,
    uneVoie: "postbac",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=55&typeBac=0&originePc=0",
      "https://www.utc.fr/wp-content/uploads/sites/28/2024/05/plaquettechiffres24-fr.pdf",
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
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage dès la 3e année après le bac, dans 4 spécialités : mécanique et transports, énergie et génie électrique, informatique, logistique industrielle (fiche Parcoursup 2026).",
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
  "reseau-polytech": {
    pourquoi:
      "Seize écoles publiques d'ingénieurs, au sein des universités, qui forment 10 % des ingénieurs diplômés en France. Après le PeiP, tu choisis parmi 100 spécialités réparties en 12 domaines, dans ton école ou dans une autre ville du réseau. Les droits sont ceux d'une école publique, gratuits pour les boursiers.",
    apprendre:
      "Le PeiP dure deux ans : sciences fondamentales, démarche d'ingénieur, travaux dirigés en petits groupes, tutorat, projet professionnel et stage de découverte en entreprise. Selon le réseau, 80 à 90 % des élèves passent ensuite en cycle ingénieur, pour trois ans de spécialité, avec stages et apprentissage possible.",
    specificite:
      "Une même procédure, le concours Geipi Polytech, ouvre l'accès aux 16 écoles : tu fais tes vœux sur plusieurs villes avec un seul écrit. Le niveau demandé est plus accessible qu'aux INSA : à Polytech Marseille, en 2025, 59 % des admis avaient une mention bien et 16 % une mention assez bien.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage dès la 1re année du cycle ingénieur (3e année après le bac), avec un contrat de 2 ou 3 ans, pour le même diplôme qu'en formation initiale (fiche Parcoursup de Polytech Marseille).",
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
  epita: {
    pourquoi:
      "L'EPITA forme des ingénieurs en informatique. Les cinq métiers les plus fréquents à la sortie : ingénieur développement, consultant, ingénieur cybersécurité et réseaux, ingénieur data et IA, chef de projet. Promotion 2024 : salaire médian de 47 200 € brut par an avec primes en France, 77 % des élèves embauchés avant le diplôme, 98 % des diplômés en poste moins de 2 mois après leur recherche.",
    apprendre:
      "Deux ans de cycle préparatoire, puis 3 ans de cycle ingénieur : tronc commun en 1re année avec projets et « piscines » (semaines intensives de programmation), stage d'un semestre en 2e année, puis une majeure de 600 heures parmi 19, de l'IA et la data science à la cybersécurité, l'informatique quantique, l'image ou l'IA appliquée à la santé. Stage de fin d'études d'environ 6 mois, en France ou à l'étranger.",
    specificite:
      "Une école 100 % informatique : 19 majeures, chacune rattachée à un campus (quantique et image à Paris, IA et santé à Lyon, sécurité industrielle à Toulouse, SecDevOps à Rennes). À Paris, une section anglophone et un parcours accompagné dès la 1re année.",
    statut: "prive",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur en apprentissage, même diplôme (RNCP 40531), avec trois années d'expérience en entreprise. Entrée en 1re année du cycle ingénieur après une L2, une L3, un BUT, une prépa ATS ou un bachelor, ou en 2e année après un M1. Cinq majeures : cybersécurité, développement web et nouvelles applications, industrie du futur, cloud computing, développement et IA. Rythme : 2 semaines à l'école, 2 semaines en entreprise. Coût pour l'apprenti : 0 €.",
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
  ipsa: {
    pourquoi:
      "L'IPSA forme des ingénieurs pour l'aéronautique et le spatial : 85 % des jeunes diplômés y travaillent, ou dans les nouvelles mobilités, chez Airbus, Safran, Dassault Aviation, Thales, ArianeGroup, au CNES ou à la DGA. Métiers visés : ingénieur propulsion, essais, structures, intégration satellite, maintenance aéronautique. Promotion 2023 : salaire médian de 42 350 € par an.",
    apprendre:
      "Deux ans de cycle préparatoire intégré (Aéro 1 et Aéro 2). En Aéro 3, socle commun et pré-majeure, stage technicien de 2 mois, puis un semestre dans l'une des 125 universités partenaires. En Aéro 4 et Aéro 5, une majeure parmi 9 : propulsion aérospatiale, structures et aérodynamisme, espace, lanceurs et satellites, systèmes spatiaux, systèmes embarqués et télécoms, systèmes autonomes, cyber-data-IA, supply chain, finance des programmes spatiaux.",
    specificite:
      "Toutes les majeures portent sur l'air et l'espace, de la propulsion à l'ingénierie financière des programmes spatiaux. En fin de cursus, environ 70 doubles diplômes en France et à l'étranger, dont un parcours avec l'École navale ; réseau de plus de 5 800 diplômés.",
    statut: "prive",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur en apprentissage sur 3 ans (Aéro 3 à Aéro 5), à Paris-Ivry avec le CFA numiA, en section francophone. Entrée après un bac + 2 (BUT, prépa ATS) ou après l'Aéro 2 de l'IPSA. En Aéro 4, deux majeures : systèmes aéronautiques autonomes, propulsion aérospatiale. Rythme : 3 semaines à l'école, 3 semaines en entreprise. Diplôme d'ingénieur contrôlé par la CTI ; formation financée par l'entreprise.",
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
    statut: "eespig",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Deux diplômes d'ingénieur par apprentissage : « Véhicules, systèmes autonomes et connectés » et « Génie industriel pour l'aéronautique et l'espace ». Dans le cursus classique, la 5e année peut se faire en contrat de professionnalisation (automobile, aéronautique, ferroviaire, éco-mobilité) : 3 semaines à l'école et 1 semaine en entreprise par mois au 1er semestre, puis 6 mois en entreprise ; l'entreprise paie la scolarité.",
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
  icam: {
    pourquoi:
      "Tu vises un poste d'ingénieur généraliste dans l'industrie : mécanique, génie électrique, automatique, énergie. L'Icam compte 7 campus en France et 75 entreprises « grands partenaires ». Tes 3 années d'ingénieur peuvent se faire en apprentissage, salarié d'une entreprise, pour le même diplôme. Côté budget, les bourses Feron-Vrau peuvent couvrir la totalité des frais des boursiers du Crous aux échelons 6 et 7.",
    apprendre:
      "Le cycle ingénieur couvre 4 blocs scientifiques (maths-informatique-automatique, génie électrique, génie mécanique et matériaux, énergétique et environnement) et 2 blocs humains (langues, éthique, management, entrepreneuriat). En 3e année, un projet de mécatronique dure toute l'année ; en 4e, échange Erasmus possible ; en 5e, stage ingénieur de 6 mois et mémoire scientifique.",
    specificite:
      "Après le bac, trois portes d'entrée : prépa scientifique en CPGE associée (place garantie en cycle ingénieur sur contrôle continu), prépa professionnalisante (BTS ou BUT associé, puis apprentissage) ou bachelor international. Étudiant ou apprenti, tu obtiens le même diplôme.",
    statut: "eespig",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur Icam sous statut apprenti (ingénieur généraliste), de la 3e à la 5e année, à Lille, Grand Paris Sud, Bretagne, Vendée et Toulouse, après la prépa professionnalisante ou un bac+2. Rythme : 1 mois / 1 mois en 3e année, 3 mois / 3 mois en 4e, 6 mois / 6 mois en 5e, dont 11 semaines à l'étranger. À Strasbourg-Europe : ingénieur spécialisé Systèmes numériques industriels, en apprentissage.",
    chiffres: [
      {
        label: "Frais de scolarité, cycle ingénieur (statut étudiant)",
        valeur: "9 900 € par an, plus 620 € de contribution à la vie collective",
        source: "https://www.icam.fr/formation/formation-ingenieur-icam-sous-statut-etudiant/",
      },
      {
        label: "Apprenants dans le monde",
        valeur: "9 727",
        source: "https://www.icam.fr/",
      },
      {
        label: "Campus",
        valeur: "7 en France, 14 dans le monde",
        source: "https://www.icam.fr/",
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
    ],
  },
  "arts-et-metiers": {
    pourquoi:
      "Arts et Métiers forme des ingénieurs de l'industrie : 35 % des jeunes diplômés travaillent en production, exploitation, méthodes, qualité ou maintenance, 23 % en R&D et innovation. Le conseil et l'ingénierie (30,5 %), le numérique (10,5 %), l'industrie et le BTP (9,5 % chacun) recrutent le plus. 82 % des jeunes diplômés en poste ont trouvé leur premier emploi en moins de deux mois.",
    apprendre:
      "Les deux premières années misent sur l'expérimentation : génie mécanique, génie énergétique, génie industriel et productique. En 3e année, tu choisis parmi 32 expertises, de l'aéronautique et du spatial aux énergies nouvelles. Stage exécutant de 4 semaines en 1re année, stage de fin d'études de 6 mois, mobilité internationale de deux mois à deux ans et une centaine de parcours bi-diplômants, dont un franco-allemand dès la 1re année.",
    specificite:
      "La 1re année se fait obligatoirement sur un campus de région, et chaque campus adapte le cursus aux enjeux de son territoire. Un cursus militaire conduit au Service d'infrastructure de la Défense avec le grade de lieutenant.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Programme Grande École en apprentissage dès la 1re année, à Angers et Paris : 24 places par campus (rentrée 2025), 60 % du temps en entreprise",
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
  navale: {
    pourquoi:
      "Tu y deviens officier de la Marine nationale. À la sortie, chaque élève apte prend un premier poste de chef de quart, puis la carrière mène vers les navires de surface, les sous-marins, l'aéronautique navale ou les commandos marine. Le salaire annuel brut moyen à l'embauche atteint 32 148 € en 2025, primes en plus.",
    apprendre:
      "La formation mêle sciences, navigation et formation militaire. En 1re année, tu choisis la filière navigation (OPS/N : systèmes de combat, détection, lutte sous la mer) ou énergie (OPS/E : propulsion, nucléaire, aéronautique). En 2e année, tu approfondis un domaine, par exemple ondes et signaux ou sciences de la donnée maritime et IA. Périodes de mer chaque année, mission Jeanne d'Arc de cinq mois, semestre d'échange possible à l'étranger.",
    specificite:
      "Tu es militaire dès le premier jour : élève-officier, puis aspirant, puis enseigne de vaisseau, avec une scolarité payée. En entrant, tu choisis un métier d'officier de carrière : l'école parle d'une carrière de 27 ans dans les forces.",
    statut: "public",
    recrutement: ["prepa", "titre"],
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
});

/** Les nouvelles écoles. */
export const ecolesIngenieurs: Ecole[] = etTypo<Ecole[]>([
  {
    id: "ens-rennes",
    name: "École normale supérieure de Rennes",
    short: "ENS Rennes",
    line: "sciences",
    ville: "Bruz (Ille-et-Vilaine), campus de Ker Lann, près de Rennes",
    kind: "École normale supérieure",
    acces:
      "Concours d'entrée en 1re année (niveau L2) : MP, MPI, informatique, PSI, PT, TSI, ATS, 2SEP (sciences du sport) et droit-économie. Concours d'entrée en 2e année (niveau L3 ou M1) en mathématiques, informatique et sciences de l'ingénieur. Admissions parallèles pour les normaliens étudiants.",
    duree: "4 ans après le concours de 1re année",
    places:
      "Environ 65 élèves fonctionnaires stagiaires recrutés chaque année par concours, toutes filières réunies ; la répartition 2026 par concours reste à relever.",
    cout: "Normaliens élèves (fonctionnaires stagiaires) : environ 1 800 € bruts par mois, en échange d'un engagement décennal (10 ans au service de l'État, années d'études comprises, ou remboursement). Normaliens étudiants : même parcours de formation, avec le statut d'étudiant.",
    formations:
      "Le diplôme de l'ENS Rennes (grade de master) repose sur quatre compétences : recherche, avec des stages en laboratoire et un master recherche ; pluridisciplinarité ; pédagogie, qui prépare à l'agrégation ; international, avec des stages longs à l'étranger. Six départements : mathématiques, informatique, mécatronique, sciences du sport et éducation physique, droit-économie-management, sciences pour l'environnement.",
    debouches:
      "Tu vises l'enseignement supérieur ou la recherche : 70 % des élèves poursuivent en thèse, et l'école affiche 83 % de réussite à l'agrégation. Fonctionnaire stagiaire, tu touches environ 1 800 € bruts par mois. Environ 65 élèves entrent chaque année par concours, dans une école de 596 normaliens.",
    plus: "Ses concours s'ouvrent aux filières PSI, PT, TSI et ATS en plus de MP et MPI, avec un département de mécatronique et un département de sciences du sport (concours 2SEP). En 5 ans, ses élèves sont partis 300 fois dans 35 pays.",
    station: "ecole-ingenieurs",
    url: "https://www.ens-rennes.fr/",
    sources: [
      "https://www.ens-rennes.fr/admission",
      "https://www.ens-rennes.fr/admission/concours1a",
      "https://www.ens-rennes.fr/formation",
      "https://www.ens-rennes.fr/formation/diplome-de-lens-rennes",
      "https://ens-paris-saclay.fr/sites/default/files/CONCOURS/CONCOURS_2026/notice_interens_2026_mise_en_ligne_vf260212.pdf",
    ],
    pourquoi:
      "Tu vises l'enseignement supérieur ou la recherche : 70 % des élèves poursuivent en thèse, et l'école affiche 83 % de réussite à l'agrégation. Fonctionnaire stagiaire, tu touches environ 1 800 € bruts par mois. Environ 65 élèves entrent chaque année par concours, dans une école de 596 normaliens.",
    apprendre:
      "Le diplôme de l'ENS Rennes (grade de master) repose sur quatre compétences : recherche, avec des stages en laboratoire et un master recherche ; pluridisciplinarité ; pédagogie, qui prépare à l'agrégation ; international, avec des stages longs à l'étranger. Six départements : mathématiques, informatique, mécatronique, sciences du sport et éducation physique, droit-économie-management, sciences pour l'environnement.",
    specificite:
      "Ses concours s'ouvrent aux filières PSI, PT, TSI et ATS en plus de MP et MPI, avec un département de mécatronique et un département de sciences du sport (concours 2SEP). En 5 ans, ses élèves sont partis 300 fois dans 35 pays.",
    statut: "public",
    recrutement: ["prepa", "titre"],
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
      },
      {
        label: "Réussite à l'agrégation",
        valeur: "83 %",
        source: "https://www.ens-rennes.fr/formation",
      },
    ],
    une: "Concours X-ENS",
    uneRang: 15,
    uneVoie: "prepa",
  },
  {
    id: "centrale-lyon",
    name: "École centrale de Lyon (Centrale Lyon)",
    short: "Centrale Lyon",
    line: "sciences",
    ville: "Écully, près de Lyon ; campus de Saint-Étienne (Centrale Lyon ENISE, cycle CapECL)",
    kind: "École d'ingénieurs publique",
    acces:
      "Concours Centrale-Supélec (MP, MPI, PC, PSI, TSI), Banque PT, banque BCPST et La Prépa des INP. Après un bac + 3 : Concours universitaire des Écoles Centrale, passerelle depuis l'ENISE, CPES de l'ENS de Lyon. Doubles diplômes en 2e année avec emlyon, l'ENS de Lyon ou l'ENSAE.",
    duree: "3 ans après 2 années de prépa",
    places:
      "286 places au concours Centrale-Supélec 2026 : 127 en MP, 82 en PSI, 62 en PC, 15 en MPI. S'y ajoutent 24 places en PT, 5 en TSI, 5 en BCPST, 5 par La Prépa des INP, 24 après le CapECL et 15 par le concours universitaire (Onisep, 2026).",
    cout: "Cursus ingénieur : depuis la rentrée 2026, droits modulés selon le revenu fiscal de référence, jusqu'à 4 113 € par an ; exonération totale pour les boursiers du Crous. CapECL : 630 € en 2026-2027, gratuit pour les boursiers. Apprentis : formation gratuite et salaire.",
    formations:
      "1re année de tronc commun (sciences, humanités, économie), projets en équipe et stage d'exécution de 4 semaines. En 2e année, un approfondissement parmi 32 et un projet d'application, souvent avec une entreprise, puis 3 mois de stage. En 3e année, des options comme aéronautique, bio-ingénierie de la santé, énergie, informatique ou transport et décarbonation. Une mobilité internationale est obligatoire pour valider le cursus.",
    debouches:
      "Ses diplômés partent surtout dans les technologies de l'information (18 %), l'énergie (18 %), le conseil et les bureaux d'études (12 %), la finance (11 %) et les industries de transport, de l'automobile à l'aéronautique (9 %). 78 % trouvent leur premier emploi en moins d'un mois et 21 % commencent à l'étranger. Salaire brut moyen à l'embauche : 44 177 € par an hors primes (2025).",
    plus: "Doubles cursus : architecte avec l'école d'architecture de Lyon dès la 1re année, médecin avec les Hospices civils de Lyon dès la 2e, manager avec emlyon. L'école intègre aussi l'ENISE à Saint-Étienne, où se trouve son cycle préparatoire post-bac CapECL.",
    station: "ecole-ingenieurs",
    url: "https://www.ec-lyon.fr",
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/auvergne-rhone-alpes/rhone/ecole-centrale-de-lyon/diplome-d-ingenieur-de-l-ecole-centrale-de-lyon",
      "https://www.ec-lyon.fr/en/academics/general-engineering",
      "https://www.ec-lyon.fr/formation/cycle-preparatoire-capecl",
      "https://www.ec-lyon.fr/centrale-lyon/actualites/parcoursup-comment-integrer-centrale-lyon-apres-un-bac",
      "https://www.ec-lyon.fr/sites/default/files/content/brochures/pdf/2025-11/dossier-de-presse-2025_centrale-lyon.pdf",
      "https://www.ec-lyon.fr/en/academics/energy-engineer",
    ],
    pourquoi:
      "Ses diplômés partent surtout dans les technologies de l'information (18 %), l'énergie (18 %), le conseil et les bureaux d'études (12 %), la finance (11 %) et les industries de transport, de l'automobile à l'aéronautique (9 %). 78 % trouvent leur premier emploi en moins d'un mois et 21 % commencent à l'étranger. Salaire brut moyen à l'embauche : 44 177 € par an hors primes (2025).",
    apprendre:
      "1re année de tronc commun (sciences, humanités, économie), projets en équipe et stage d'exécution de 4 semaines. En 2e année, un approfondissement parmi 32 et un projet d'application, souvent avec une entreprise, puis 3 mois de stage. En 3e année, des options comme aéronautique, bio-ingénierie de la santé, énergie, informatique ou transport et décarbonation. Une mobilité internationale est obligatoire pour valider le cursus.",
    specificite:
      "Doubles cursus : architecte avec l'école d'architecture de Lyon dès la 1re année, médecin avec les Hospices civils de Lyon dès la 2e, manager avec emlyon. L'école intègre aussi l'ENISE à Saint-Étienne, où se trouve son cycle préparatoire post-bac CapECL.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "Ingénieur de spécialité Énergie (conception des installations énergétiques) : 3 ans en apprentissage à Écully, avec l'ITII de Lyon, après un BUT, un BTS, une licence, une prépa ATS ou le CapECL ; alternance par périodes de 2 à 3 semaines ; 28 places en 2025. Dans le cursus généraliste, la 3e année peut se faire en contrat de professionnalisation.",
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
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 23,
    uneVoie: "prepa",
  },
  {
    id: "centrale-mediterranee",
    name: "Centrale Méditerranée (ex-École centrale de Marseille)",
    short: "Centrale Méditerranée",
    line: "sciences",
    ville: "Marseille (technopôle de Château-Gombert) ; campus de Nice (Éco-Vallée de la plaine du Var)",
    kind: "École d'ingénieurs publique",
    acces:
      "Concours Centrale-Supélec (MP, MPI, PC, PSI, TSI) ; Banque PT pour la filière PT ; admission sur titre pour les étudiants de licence (concours universitaire des Écoles Centrale).",
    duree: "3 ans après bac + 2",
    places:
      "Concours 2026 : 265 places au concours Centrale-Supélec (90 MP, 10 MPI, 90 PC, 70 PSI, 5 TSI) et 5 places en PT via la Banque PT. Environ 300 élèves par promotion (brochure de 2023).",
    cout: "2 600 € par an à la rentrée 2025. Dès la rentrée 2026, les écoles du groupe Centrale modulent leurs droits selon le revenu fiscal de référence de la famille : barème à demander à l'école. Apprentis exonérés des droits d'inscription.",
    formations:
      "Trois semestres de socle scientifique commun, rythmés par 4 semaines de cours puis 1 semaine d'activités en entreprise. En 2e année, tu suis un parcours : bio-ingénierie, énergie durable, environnement, numérique, ou crises et mutations. En 3e année, une option d'approfondissement (informatique, mécanique…) et une filière métier. Au moins un semestre à l'étranger, puis un stage final de 4 à 6 mois.",
    debouches:
      "Centrale Méditerranée forme des ingénieurs généralistes pour l'industrie, le conseil et la recherche. En 3e année, tu choisis une filière métier : analyse de données et aide à la décision, transformation environnementale des organisations, bureau d'études, production et logistique, R&D ou entrepreneuriat. Salaire médian de sortie : 40 000 € bruts par an, primes en plus ; 8 % de la promotion 2021 a poursuivi en thèse.",
    plus: "Chaque élève vit une alternance dès la 1re année : en entreprise comme apprenti, en laboratoire de recherche ou en création d'entreprise (« 100 % des élèves sont alternants »). Plusieurs parcours de 2e et 3e années se suivent sur le campus de Nice.",
    station: "ecole-ingenieurs",
    url: "https://www.centrale-mediterranee.fr",
    sources: [
      "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-d-ingenieurs-post-prepa-le-concours-centrale-supelec-mode-d-emploi.html",
      "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
      "https://syllabus.centrale-med.fr/plugins/odf-web/odf/_content/program-semestre-5-2-2-2-2/Formation%20d'ing%C3%A9nieur%20centralien.pdf",
      "https://www.centrale-mediterranee.fr/sites/default/files/2025-07/2526_Guide%20apprentissage%20%C3%A9l%C3%A8ves.pdf",
      "https://francealumni.fr/docs/2024113902_plaquette-formation-ingenieur-net.pdf",
      "https://www.letudiant.fr/educpros/actualite/centrale-mediterranee-accelere-sa-transition-vers-lingenierie-durable.html",
      "https://www.letudiant.fr/educpros/actualite/les-ecoles-d-ingenieurs-revoient-leurs-frais-d-inscription-pour-faire-face-aux-contraintes-budgetaires.html",
    ],
    pourquoi:
      "Centrale Méditerranée forme des ingénieurs généralistes pour l'industrie, le conseil et la recherche. En 3e année, tu choisis une filière métier : analyse de données et aide à la décision, transformation environnementale des organisations, bureau d'études, production et logistique, R&D ou entrepreneuriat. Salaire médian de sortie : 40 000 € bruts par an, primes en plus ; 8 % de la promotion 2021 a poursuivi en thèse.",
    apprendre:
      "Trois semestres de socle scientifique commun, rythmés par 4 semaines de cours puis 1 semaine d'activités en entreprise. En 2e année, tu suis un parcours : bio-ingénierie, énergie durable, environnement, numérique, ou crises et mutations. En 3e année, une option d'approfondissement (informatique, mécanique…) et une filière métier. Au moins un semestre à l'étranger, puis un stage final de 4 à 6 mois.",
    specificite:
      "Chaque élève vit une alternance dès la 1re année : en entreprise comme apprenti, en laboratoire de recherche ou en création d'entreprise (« 100 % des élèves sont alternants »). Plusieurs parcours de 2e et 3e années se suivent sur le campus de Nice.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Apprentissage possible dès la 1re année et sur les 3 ans du cursus, pour le même diplôme d'ingénieur généraliste. Après l'admission, les entreprises choisissent leurs apprentis lors d'un job dating. Temps en entreprise : 40 à 45 % en 1re année, jusqu'à 65 % en 2e et 3e années ; 9 semaines consécutives à l'étranger au semestre 8 ; CFA Formasup Méditerranée.",
    chiffres: [
      {
        label: "Places au concours Centrale-Supélec (90 MP, 10 MPI, 90 PC, 70 PSI, 5 TSI)",
        valeur: "265",
        source:
          "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-d-ingenieurs-post-prepa-le-concours-centrale-supelec-mode-d-emploi.html",
      },
      {
        label: "Places en PT (Banque PT)",
        valeur: "5",
        source: "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf",
        date: "concours 2026",
      },
      {
        label: "Salaire médian brut annuel de sortie, primes en plus",
        valeur: "40 000 €",
        source: "https://francealumni.fr/docs/2024113902_plaquette-formation-ingenieur-net.pdf",
        date: "2023",
      },
      {
        label: "Droits de scolarité annuels",
        valeur: "2 600 €",
        source:
          "https://www.letudiant.fr/educpros/actualite/centrale-mediterranee-accelere-sa-transition-vers-lingenierie-durable.html",
        date: "2025",
      },
    ],
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 24,
    uneVoie: "prepa",
  },
  {
    id: "mines-saint-etienne",
    name: "École nationale supérieure des mines de Saint-Étienne",
    short: "Mines Saint-Étienne",
    line: "sciences",
    ville: "Saint-Étienne ; campus Aix-Marseille-Provence (Gardanne) pour l'ISMIN ; Lyon pour le double diplôme FUSION",
    kind: "École d'ingénieurs publique",
    acces:
      "Concours commun Mines-Ponts (MP, MPI, PC, PSI, PT, TSI) pour l'ingénieur civil des mines (ICM) et le double diplôme FUSION ; concours Mines-Télécom pour l'ISMIN (microélectronique et informatique, en Provence) ; diplômes d'ingénieur en alternance après un bac + 2 ou un bac + 3 scientifique ou technologique.",
    duree: "3 ans après bac + 2",
    places:
      "Concours Mines-Ponts 2026 : 154 places (40 MP, 20 MPI, 42 PC, 45 PSI, 6 PT, 1 TSI), dont 25 pour le cursus FUSION. ISMIN : 7 places en PT au concours Mines-Télécom (« à confirmer pour 2026 »). Promotion ICM : 185 élèves.",
    cout: "ICM : 3 600 € par an, plus la CVEC ; boursiers du Crous exonérés. Ce montant vaut pour les nouveaux élèves de l'Institut Mines-Télécom à la rentrée 2026. Cursus FUSION : 15 500 € par an.",
    formations:
      "1re année : socle scientifique, technique et humain, stage opérateur de 4 semaines. En 2e année, tu choisis 2 majeures parmi 10 (science des données, informatique, génie biomédical, finance, matériaux, mécanique…) et un défi sociétal parmi 8 (IA, transition écologique, santé…), avec un stage de 3 mois. En 3e année : projet industriel, projet de recherche, stage final de 6 mois. Au moins 3 mois consécutifs à l'étranger.",
    debouches:
      "Mines Saint-Étienne forme des ingénieurs généralistes pour l'industrie, l'énergie, la santé, la data et la finance. D'après l'école, 99 % des diplômés ICM ont un emploi dans les six mois et 73 % signent avant le diplôme. Salaire moyen de sortie : 47 000 € bruts par an, primes comprises. 58 % rejoignent une PME ou une ETI, 42 % un grand groupe.",
    plus: "80 % du cursus ICM est au choix, et 75 % des élèves préparent un double diplôme en 3e année, en France ou à l'étranger. Le cursus FUSION, avec emlyon, associe en 4 ans ingénierie et management, entre Saint-Étienne et Lyon.",
    station: "ecole-ingenieurs",
    url: "https://www.mines-stetienne.fr",
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
    pourquoi:
      "Mines Saint-Étienne forme des ingénieurs généralistes pour l'industrie, l'énergie, la santé, la data et la finance. D'après l'école, 99 % des diplômés ICM ont un emploi dans les six mois et 73 % signent avant le diplôme. Salaire moyen de sortie : 47 000 € bruts par an, primes comprises. 58 % rejoignent une PME ou une ETI, 42 % un grand groupe.",
    apprendre:
      "1re année : socle scientifique, technique et humain, stage opérateur de 4 semaines. En 2e année, tu choisis 2 majeures parmi 10 (science des données, informatique, génie biomédical, finance, matériaux, mécanique…) et un défi sociétal parmi 8 (IA, transition écologique, santé…), avec un stage de 3 mois. En 3e année : projet industriel, projet de recherche, stage final de 6 mois. Au moins 3 mois consécutifs à l'étranger.",
    specificite:
      "80 % du cursus ICM est au choix, et 75 % des élèves préparent un double diplôme en 3e année, en France ou à l'étranger. Le cursus FUSION, avec emlyon, associe en 4 ans ingénierie et management, entre Saint-Étienne et Lyon.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Quatre diplômes d'ingénieur de spécialité en alternance sur 3 ans, avec l'ISTP à Saint-Étienne : génie industriel (IGI), génie nucléaire (IGN), systèmes électroniques embarqués (ISEE), ingénierie énergétique (ISE). Entrée après un bac + 2 ou un bac + 3 scientifique ou technologique, sous statut d'apprenti ou de salarié. ICM : contrat de professionnalisation possible en dernière année.",
    chiffres: [
      {
        label: "Places au concours Mines-Ponts (dont 25 pour FUSION)",
        valeur: "154",
        source: "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf",
        date: "2026",
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
        date: "2025-2026",
      },
    ],
    une: "Concours Mines-Ponts",
    uneRang: 25,
    uneVoie: "prepa",
  },
  {
    id: "insa-toulouse",
    name: "Institut national des sciences appliquées de Toulouse",
    short: "INSA Toulouse",
    line: "postbac",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique, après le bac",
    acces:
      "Admission commune du Groupe INSA sur Parcoursup, sur dossier : résultats scolaires (80 % de l'évaluation), savoir-être, motivation, engagement ; entretien de motivation du 30 avril au 11 mai 2026 pour les candidats les mieux préclassés. Bacheliers STI2D et STL : voie à part, avec entretien individuel obligatoire. Admissions en cours de cursus par le Groupe INSA.",
    duree: "5 ans",
    places:
      "260 places en 1re année en 2026 pour les bacs généraux (15 760 vœux confirmés), plus 40 places pour les bacs STI2D et STL (fiches Parcoursup 2026 : https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=59&typeBac=0&originePc=0 et https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=66&typeBac=0&originePc=0)",
    cout: "Tarif des écoles d'ingénieurs publiques : 630 € par an en 2026-2027, plus 105 € de CVEC (service-public.fr). Gratuit pour les boursiers. Candidature Groupe INSA : 105 €, gratuite pour les boursiers.",
    formations:
      "La 1re année est commune à tous. En 2e et 3e années, tu suis une pré-orientation dans l'un des 4 domaines : génie civil ; génie chimique, biochimique et environnement ; matériaux, composants et systèmes ; modélisation, informatique et communication. En 4e et 5e années, tu choisis parmi 8 spécialités, dont génie mécanique, génie physique et génie des procédés.",
    debouches:
      "L'INSA Toulouse prépare à 8 métiers d'ingénieur, de l'automatique-électronique au génie biologique, en passant par le génie civil, l'informatique et les réseaux ou les mathématiques appliquées. Le choix se fait par étapes : un grand domaine en 2e année, une spécialité en 4e année. En 2026, l'école a reçu 15 760 vœux pour 260 places : vise un dossier solide.",
    plus: "Les bacheliers STI2D et STL ont leur propre premier cycle, la « Formation active en sciences » : 40 places en 2026. En LV2, tu peux choisir le chinois, le japonais ou la langue des signes française, en plus de l'allemand, de l'espagnol ou de l'italien.",
    station: "cycle-integre",
    url: "https://www.insa-toulouse.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=59&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=66&typeBac=0&originePc=0",
      "https://www.insa-toulouse.fr/en/formation/formation-en/licence-ingenieur-insa-de-toulouse-annees-1-2-et-3/",
      "https://www.insa-toulouse.fr/en/training-program/",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
    pourquoi:
      "L'INSA Toulouse prépare à 8 métiers d'ingénieur, de l'automatique-électronique au génie biologique, en passant par le génie civil, l'informatique et les réseaux ou les mathématiques appliquées. Le choix se fait par étapes : un grand domaine en 2e année, une spécialité en 4e année. En 2026, l'école a reçu 15 760 vœux pour 260 places : vise un dossier solide.",
    apprendre:
      "La 1re année est commune à tous. En 2e et 3e années, tu suis une pré-orientation dans l'un des 4 domaines : génie civil ; génie chimique, biochimique et environnement ; matériaux, composants et systèmes ; modélisation, informatique et communication. En 4e et 5e années, tu choisis parmi 8 spécialités, dont génie mécanique, génie physique et génie des procédés.",
    specificite:
      "Les bacheliers STI2D et STL ont leur propre premier cycle, la « Formation active en sciences » : 40 places en 2026. En LV2, tu peux choisir le chinois, le japonais ou la langue des signes française, en plus de l'allemand, de l'espagnol ou de l'italien.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage à partir de la 3e année après le bac (fiche Parcoursup), dans 2 spécialités : automatique-électronique et génie civil (site de l'école).",
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
    une: "Taux d'accès Parcoursup 2025 : 13 %",
    uneRang: 13,
    uneVoie: "postbac",
  },
  {
    id: "insa-rennes",
    name: "Institut national des sciences appliquées de Rennes",
    short: "INSA Rennes",
    line: "postbac",
    ville: "Rennes",
    kind: "École d'ingénieurs publique, après le bac",
    acces:
      "Admission commune du Groupe INSA sur Parcoursup, sur dossier : résultats scolaires (80 % de l'évaluation), savoir-être, motivation, engagement ; entretien de motivation du 30 avril au 11 mai 2026 pour les candidats les mieux préclassés. Le cursus est accessible de bac à bac+4.",
    duree: "5 ans",
    places:
      "230 places en 1re année en 2026, pour 13 638 vœux confirmés (fiche Parcoursup 2026 : https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=60&typeBac=0&originePc=0)",
    cout: "Tarif des écoles d'ingénieurs publiques : 630 € par an en 2026-2027, plus 105 € de CVEC (service-public.fr). Gratuit pour les boursiers. Candidature Groupe INSA : 105 €, gratuite pour les boursiers.",
    formations:
      "Deux ans de tronc commun en STPI : 70 % de sciences, 20 % d'ouverture, 10 % d'orientation, et un stage ouvrier d'au moins 4 semaines dès la fin de la 1re année. De la 3e à la 5e année, tu te spécialises, avec des stages en entreprise de 1 à 3 mois et un projet de fin d'études de 5 mois.",
    debouches:
      "Une école publique à dominante numérique : informatique, mathématiques appliquées, électronique et informatique industrielle, électronique et télécoms, systèmes embarqués. S'y ajoutent le génie civil et urbain, la mécanique-automatique et la physique-matériaux. La mobilité internationale est obligatoire, en stage ou en semestre, parmi plus de 200 universités partenaires.",
    plus: "Le tronc commun existe en version internationale (GLOBALINSA) ou en filière avec Sciences Po Rennes, pour un double diplôme en 6 ans. Les élèves de génie civil peuvent aussi viser un double cursus d'architecte-ingénieur, en 7 ans après le bac.",
    station: "cycle-integre",
    url: "https://www.insa-rennes.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=60&typeBac=0&originePc=0",
      "https://www.insa-rennes.fr/premier-cycle-ingenieur-e.html",
      "https://www.insa-rennes.fr/cursus-ingenieur-e.html",
      "https://www.insa-rennes.fr/fileadmin/ressources/Rubriques/02-INSA/documentation/OffreDeFormation_INSA-Rennes_2026-2027.pdf",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
      "https://data.enseignementsup-recherche.gouv.fr/api/explore/v2.1/catalog/datasets/fr-esr-parcoursup/records",
    ],
    pourquoi:
      "Une école publique à dominante numérique : informatique, mathématiques appliquées, électronique et informatique industrielle, électronique et télécoms, systèmes embarqués. S'y ajoutent le génie civil et urbain, la mécanique-automatique et la physique-matériaux. La mobilité internationale est obligatoire, en stage ou en semestre, parmi plus de 200 universités partenaires.",
    apprendre:
      "Deux ans de tronc commun en STPI : 70 % de sciences, 20 % d'ouverture, 10 % d'orientation, et un stage ouvrier d'au moins 4 semaines dès la fin de la 1re année. De la 3e à la 5e année, tu te spécialises, avec des stages en entreprise de 1 à 3 mois et un projet de fin d'études de 5 mois.",
    specificite:
      "Le tronc commun existe en version internationale (GLOBALINSA) ou en filière avec Sciences Po Rennes, pour un double diplôme en 6 ans. Les élèves de génie civil peuvent aussi viser un double cursus d'architecte-ingénieur, en 7 ans après le bac.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Deux spécialités en apprentissage, de la 3e à la 5e année : électronique, systèmes embarqués et télécommunications (E-SET), et génie mécanique et automatique (livret 2026-2027 : 121 apprentis).",
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
    une: "Taux d'accès Parcoursup 2025 : 21 %",
    uneRang: 21,
    uneVoie: "postbac",
  },
  {
    id: "groupe-insa",
    name: "Groupe INSA : INSA Centre Val de Loire, INSA Hauts-de-France, INSA Rouen Normandie, INSA Strasbourg et écoles partenaires",
    short: "Groupe INSA",
    line: "postbac",
    ville:
      "Blois et Bourges (Centre Val de Loire), Valenciennes (Hauts-de-France), Saint-Étienne-du-Rouvray près de Rouen (Rouen Normandie), Strasbourg",
    kind: "École d'ingénieurs publique, après le bac",
    acces:
      "Admission commune du Groupe INSA sur Parcoursup, sur dossier (résultats scolaires 80 %, savoir-être, motivation, engagement), avec entretien de motivation du 30 avril au 11 mai 2026 pour les candidats les mieux préclassés. La participation aux Cordées de la réussite compte dans l'examen. Admissions en cours de cursus par le Groupe INSA.",
    duree: "5 ans",
    places:
      "835 places en 1re année en 2026 dans ces quatre INSA : Rouen Normandie 245, Strasbourg 210, Hauts-de-France 200, Centre Val de Loire 180 (fiches Parcoursup 2026 : https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=63&typeBac=0&originePc=0 ; https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=61&typeBac=0&originePc=0 ; https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=249&typeBac=0&originePc=0 ; https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=58&typeBac=0&originePc=0)",
    cout: "Tarif des écoles d'ingénieurs publiques : 630 € par an en 2026-2027, plus 105 € de CVEC (service-public.fr). Gratuit pour les boursiers. Candidature : 105 €, gratuite pour les boursiers.",
    formations:
      "Deux ans de premier cycle scientifique (STPI), puis trois ans de spécialité. À Rouen, 11 spécialités, de la chimie aux mathématiques appliquées ; à Blois et Bourges, génie des systèmes industriels, maîtrise des risques industriels, sécurité informatique, énergie et environnement. L'apprentissage s'ouvre partout à partir de la 3e année.",
    debouches:
      "Ces quatre INSA suivent la même admission que Lyon, Toulouse et Rennes, avec les droits d'une école publique, et accueillent plus largement : en 2025, chacun a fait entre 3 875 et 7 102 propositions, pour 192 à 261 entrées. Le Groupe INSA réunit environ 20 000 étudiants et plus de 100 500 anciens élèves.",
    plus: "Les critères et le calendrier sont communs à tous les INSA : tu peux candidater dans plusieurs à la fois. INSA Rouen Normandie accueille les sportifs de haut niveau en section sport-études, et l'INSA Strasbourg vise au moins 11 % de boursiers parmi ses admis en 2026.",
    station: "cycle-integre",
    url: "https://www.groupe-insa.fr",
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
    pourquoi:
      "Ces quatre INSA suivent la même admission que Lyon, Toulouse et Rennes, avec les droits d'une école publique, et accueillent plus largement : en 2025, chacun a fait entre 3 875 et 7 102 propositions, pour 192 à 261 entrées. Le Groupe INSA réunit environ 20 000 étudiants et plus de 100 500 anciens élèves.",
    apprendre:
      "Deux ans de premier cycle scientifique (STPI), puis trois ans de spécialité. À Rouen, 11 spécialités, de la chimie aux mathématiques appliquées ; à Blois et Bourges, génie des systèmes industriels, maîtrise des risques industriels, sécurité informatique, énergie et environnement. L'apprentissage s'ouvre partout à partir de la 3e année.",
    specificite:
      "Les critères et le calendrier sont communs à tous les INSA : tu peux candidater dans plusieurs à la fois. INSA Rouen Normandie accueille les sportifs de haut niveau en section sport-études, et l'INSA Strasbourg vise au moins 11 % de boursiers parmi ses admis en 2026.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage possible à partir de la 3e année après le bac, selon les spécialités de chaque INSA ; à Rouen, 4 spécialités sur 11 se font en apprentissage.",
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
  },
  {
    id: "cesi",
    name: "CESI École d'ingénieurs",
    short: "CESI",
    line: "postbac",
    ville:
      "26 campus en France : Aix-en-Provence, Angoulême, Arras, Bordeaux, Brest, Caen, Dijon, Grenoble, La Rochelle, Le Mans, Lille, Lyon, Montpellier, Nancy, Nantes, Nice, Orléans, Paris-Nanterre, Pau, Reims, Rouen, Saint-Nazaire, Strasbourg, Thionville, Toulouse, Tours",
    kind: "École d'ingénieurs privée, après le bac",
    acces:
      "Sélection propre à CESI sur Parcoursup, en deux étapes : étude du dossier (bulletins de 1re et de terminale, projet de formation, fiche Avenir), puis oral de mars à avril 2026 (argumentation devant un jury sur un sujet d'actualité ou de culture générale, puis échange sur ta motivation). Bacs visés : bac général avec spécialités scientifiques ou bac STI2D. Frais de dossier : 50 €, gratuits pour les boursiers. Rentrée décalée possible en février. Admissions parallèles : entrée directe dans le cycle ingénieur en 3 ans (années 3 à 5), sous statut étudiant ou apprenti.",
    duree: "5 ans après le bac",
    places: "Capacité fixée campus par campus et publiée sur la fiche Parcoursup de chaque campus.",
    cout: "Prépa intégrée : 6 500 € par an. Cycle ingénieur sous statut étudiant : 8 500 € par an (tarifs affichés sur cesi.fr en octobre 2026). Frais de dossier : 50 €, gratuits pour les boursiers sur critères sociaux ; la bourse du Crous se demande à part, sur messervices.etudiant.gouv.fr. En apprentissage, la formation est financée par l'entreprise et son opérateur de compétences, et tu touches un salaire.",
    formations:
      "En prépa intégrée (2 ans) : maths, physique, informatique, mécanique, électronique, énergétique, matériaux, gestion de projet et anglais, avec un stage de 3 mois en fin de 1re année. En cycle ingénieur, tu choisis une majeure : industrie & services, génie civil, data science & IA, systèmes embarqués & IoT, ou réseaux & cybersécurité. Séjour à l'étranger obligatoire : 17 semaines (12 en apprentissage).",
    debouches:
      "CESI forme ses ingénieurs sur 26 campus : tu peux souvent étudier près de chez toi. Après la prépa, tu peux finir en apprentissage, salarié d'une entreprise pendant 3 ans. Les débouchés suivent les majeures : industrie et services, BTP et génie civil, informatique (data et IA, systèmes embarqués, cybersécurité). Réseau : plus de 120 000 anciens élèves CESI et 8 000 entreprises d'accueil.",
    plus: "Pédagogie active par projets : dès la 1re année, tu apprends en équipe à partir de situations professionnelles. Rentrée décalée en février pour rejoindre la prépa en cours d'année, et cycle ingénieur proposé aussi en anglais (généraliste ou informatique).",
    station: "cycle-integre",
    url: "https://www.cesi.fr/",
    sources: [
      "https://www.cesi.fr/",
      "https://www.cesi.fr/admissions/cursus-ingenieur-5-ans/",
      "https://www.cesi.fr/programmes/cycle-preparatoire-integre/",
      "https://www.cesi.fr/programmes/cursus-ingenieur-3-ans/",
      "https://www.cesi.fr/ecole/diplomes-certifications/",
    ],
    pourquoi:
      "CESI forme ses ingénieurs sur 26 campus : tu peux souvent étudier près de chez toi. Après la prépa, tu peux finir en apprentissage, salarié d'une entreprise pendant 3 ans. Les débouchés suivent les majeures : industrie et services, BTP et génie civil, informatique (data et IA, systèmes embarqués, cybersécurité). Réseau : plus de 120 000 anciens élèves CESI et 8 000 entreprises d'accueil.",
    apprendre:
      "En prépa intégrée (2 ans) : maths, physique, informatique, mécanique, électronique, énergétique, matériaux, gestion de projet et anglais, avec un stage de 3 mois en fin de 1re année. En cycle ingénieur, tu choisis une majeure : industrie & services, génie civil, data science & IA, systèmes embarqués & IoT, ou réseaux & cybersécurité. Séjour à l'étranger obligatoire : 17 semaines (12 en apprentissage).",
    specificite:
      "Pédagogie active par projets : dès la 1re année, tu apprends en équipe à partir de situations professionnelles. Rentrée décalée en février pour rejoindre la prépa en cours d'année, et cycle ingénieur proposé aussi en anglais (généraliste ou informatique).",
    statut: "prive",
    recrutement: ["postbac", "titre"],
    alternance:
      "À partir de la 3e année (cycle ingénieur en 3 ans), après la prépa intégrée ou après un bac+2 : spécialités Généraliste, Informatique, BTP, Systèmes électriques & électroniques embarqués ; deux parcours avec le CEFIPA sur le campus de Nanterre (Généraliste, Systèmes électriques & électroniques embarqués). Mobilité internationale de 12 semaines.",
    chiffres: [
      {
        label: "Frais de scolarité, prépa intégrée",
        valeur: "6 500 € par an",
        source: "https://www.cesi.fr/admissions/cursus-ingenieur-5-ans/",
        date: "2026",
      },
      {
        label: "Frais de scolarité, cycle ingénieur (statut étudiant)",
        valeur: "8 500 € par an",
        source: "https://www.cesi.fr/admissions/cursus-ingenieur-5-ans/",
        date: "2026",
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
  },
  {
    id: "esigelec",
    name: "ESIGELEC, école supérieure d'ingénieurs en génie électrique",
    short: "ESIGELEC",
    line: "postbac",
    ville: "Rouen (Technopôle du Madrillet) et Poitiers (campus ouvert en septembre 2023)",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces:
      "Concours Avenir sur Parcoursup, commun à 7 écoles et 21 campus, comptés comme un seul vœu : étude du dossier (notes de spécialité de 1re, deux premiers trimestres de terminale, notes du bac de français, fiche Avenir), puis épreuves écrites en QCM le 2 mai 2026 dans 30 villes ; les « grands classés » en sont dispensés. Vœux du 19 janvier au 12 mars 2026. Frais : 120 € (30 € pour les boursiers) ou 75 € selon le profil. Admissions parallèles : pages dédiées pour les CPGE (math spé, ATS), les BTS et autres bac+2, les licences 3 et les bac+4.",
    duree: "5 ans après le bac",
    places:
      "Places post-bac 2026 : publiées par le Concours Avenir. En apprentissage (2026-2027) : 120 places en 3e année à Rouen et 40 à Poitiers, puis 40 et 10 places de plus en 4e année, et 40 de plus en 5e année à Rouen.",
    cout: "2026-2027 : cycle préparatoire intégré à 7 800 € par an, ramenés à 5 850 € pour les boursiers de l'État (dégrèvement de 25 %) ; cycle ingénieur à 8 280 € par an. S'ajoutent 150 € de frais de dossier en 1re année, 60 € de protection médicale, 80 € de carte d'associations et la CVEC (105 €). En apprentissage : scolarité gratuite et salaire versé par l'entreprise.",
    formations:
      "Les 3 premières années forment un cycle fondamental : prépa intégrée internationale en 1re et 2e années, puis une mineure au choix parmi 9 pour explorer un domaine. En 4e et 5e années, tu choisis une majeure parmi 16, dans des univers comme numérique et IA, énergie, aéronautique et spatial, automobile et ferroviaire, e-santé, défense et sécurité. 10 à 40 % des cours de spécialité sont en anglais.",
    debouches:
      "L'ESIGELEC forme des ingénieurs de l'électronique, du numérique et de l'énergie pour l'automobile et le ferroviaire, l'aéronautique et le spatial, la e-santé, la défense ou l'industrie. Selon l'école, 92 % des diplômés 2025 ont trouvé un emploi en moins de 2 mois. Des promotions sont parrainées par Vinci Energies, Orange, Renault, Alten, Siemens ou EDF.",
    plus: "26 doubles diplômes, 90 universités partenaires et 35 % d'étudiants internationaux venus de 40 pays. Deux campus, Rouen et Poitiers, et 160 places d'apprentis ouvertes dès la 3e année.",
    station: "cycle-integre",
    url: "https://www.esigelec.fr/",
    sources: [
      "https://www.esigelec.fr/",
      "https://www.esigelec.fr/fr/terminale-generale",
      "https://www.esigelec.fr/fr/frais-de-scolarite",
      "https://www.esigelec.fr/fr/le-programme-ingenieur",
      "https://www.esigelec.fr/fr/lapprentissage",
      "https://www.esigelec.fr/fr/16-majeures",
    ],
    pourquoi:
      "L'ESIGELEC forme des ingénieurs de l'électronique, du numérique et de l'énergie pour l'automobile et le ferroviaire, l'aéronautique et le spatial, la e-santé, la défense ou l'industrie. Selon l'école, 92 % des diplômés 2025 ont trouvé un emploi en moins de 2 mois. Des promotions sont parrainées par Vinci Energies, Orange, Renault, Alten, Siemens ou EDF.",
    apprendre:
      "Les 3 premières années forment un cycle fondamental : prépa intégrée internationale en 1re et 2e années, puis une mineure au choix parmi 9 pour explorer un domaine. En 4e et 5e années, tu choisis une majeure parmi 16, dans des univers comme numérique et IA, énergie, aéronautique et spatial, automobile et ferroviaire, e-santé, défense et sécurité. 10 à 40 % des cours de spécialité sont en anglais.",
    specificite:
      "26 doubles diplômes, 90 universités partenaires et 35 % d'étudiants internationaux venus de 40 pays. Deux campus, Rouen et Poitiers, et 160 places d'apprentis ouvertes dès la 3e année.",
    statut: "eespig",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Programme suivi en apprentissage au choix, avec les 16 majeures accessibles : entrée dès la 3e année (contrat de 36 mois), en 4e année (24 mois) ou en 5e année (12 mois), à Rouen et à Poitiers. Scolarité gratuite et salaire versé par l'entreprise.",
    chiffres: [
      {
        label: "Diplômés 2025 en emploi en moins de 2 mois",
        valeur: "92 %",
        source: "https://www.esigelec.fr/",
        date: "2025",
      },
      {
        label: "Frais de scolarité, cycle préparatoire intégré",
        valeur: "7 800 € par an (5 850 € pour les boursiers de l'État)",
        source: "https://www.esigelec.fr/fr/frais-de-scolarite",
        date: "2026-2027",
      },
      {
        label: "Frais de scolarité, cycle ingénieur",
        valeur: "8 280 € par an",
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
  },
  {
    id: "enseeiht",
    name: "Toulouse INP - ENSEEIHT (École nationale supérieure d'électrotechnique, d'électronique, d'informatique, d'hydraulique et des télécommunications)",
    short: "ENSEEIHT (N7)",
    line: "sciences",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP et sur titre",
    duree: "3 ans après bac + 2",
    places: "298 places au Concours Commun INP, réparties entre trois départements (tableau de septembre 2026)",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; boursiers exonérés",
    formations:
      "Tu entres directement dans un département : Sciences du numérique (ex-informatique et télécommunications), Électronique, énergie électrique et automatique, ou Mécanique des fluides, énergétique et environnement (hydraulique, énergie, climat). Stage de 6 semaines en 1re année, de 8 semaines en 2e année, stage de fin d'études de 5 à 6 mois, et au moins 17 semaines de stage à l'étranger.",
    debouches:
      "L'ENSEEIHT forme des ingénieurs de l'énergie, de l'électronique, du numérique et de la mécanique des fluides. Ses diplômés partent dans l'aéronautique et le spatial, la défense, l'énergie, les transports, la santé et les services numériques, chez Airbus, Thales, Safran, EDF, RTE, le CNES ou Capgemini. 69 % des élèves des trois dernières promotions ont signé leur embauche avant le diplôme.",
    plus: "Fondée en 1907, l'école diplôme plus de 450 ingénieurs par an et s'appuie sur quatre laboratoires toulousains : IMFT, IRIT, LAAS et Laplace. Tu choisis ton département dès le concours, car les places sont attribuées par département et par filière.",
    station: "ecole-ingenieurs",
    url: "https://www.enseeiht.fr/fr/index.html",
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
    pourquoi:
      "L'ENSEEIHT forme des ingénieurs de l'énergie, de l'électronique, du numérique et de la mécanique des fluides. Ses diplômés partent dans l'aéronautique et le spatial, la défense, l'énergie, les transports, la santé et les services numériques, chez Airbus, Thales, Safran, EDF, RTE, le CNES ou Capgemini. 69 % des élèves des trois dernières promotions ont signé leur embauche avant le diplôme.",
    apprendre:
      "Tu entres directement dans un département : Sciences du numérique (ex-informatique et télécommunications), Électronique, énergie électrique et automatique, ou Mécanique des fluides, énergétique et environnement (hydraulique, énergie, climat). Stage de 6 semaines en 1re année, de 8 semaines en 2e année, stage de fin d'études de 5 à 6 mois, et au moins 17 semaines de stage à l'étranger.",
    specificite:
      "Fondée en 1907, l'école diplôme plus de 450 ingénieurs par an et s'appuie sur quatre laboratoires toulousains : IMFT, IRIT, LAAS et Laplace. Tu choisis ton département dès le concours, car les places sont attribuées par département et par filière.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Trois formations en apprentissage : numérique, électronique-énergie électrique-automatique, mécanique des fluides-énergétique ; surtout après un BUT, un BTS ou une licence",
    chiffres: [
      {
        label: "Places Concours Commun INP (toutes filières)",
        valeur: "298 (151 SN, 94 3EA, 53 MF2E)",
        source: "https://www.enseeiht.fr/fr/formation/admissions.html",
        date: "2026",
      },
      {
        label: "Places Prépa INP",
        valeur: "47",
        source: "https://www.enseeiht.fr/fr/formation/admissions.html",
        date: "2026",
      },
      {
        label: "Places en admission sur titre (BUT, L2, L3)",
        valeur: "51",
        source: "https://www.enseeiht.fr/fr/formation/admissions.html",
        date: "2026",
      },
      {
        label: "Droits de scolarité du cycle ingénieur",
        valeur: "630 €",
        source: "https://www.enseeiht.fr/fr/formation/formation-ingenieur/droits-d-inscription.html",
        date: "2026-2027",
      },
    ],
  },
  {
    id: "ensiacet",
    name: "Toulouse INP - ENSIACET (École nationale supérieure des ingénieurs en arts chimiques et technologiques)",
    short: "ENSIACET (A7)",
    line: "sciences",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, TPC, puis Concours Commun INP ; aussi prépas intégrées et sur titre",
    duree: "3 ans après bac + 2",
    places: "Campagne 2026-2027 : 175 places au Concours Commun INP, dont 116 en PC",
    cout: "630 € par an et 105 € de CVEC en 2026-2027 ; boursiers exonérés ; apprentis exonérés et payés de 53 à 78 % du Smic",
    formations:
      "Un premier semestre en tronc commun pour les cinq départements, puis tu te spécialises dans ton diplôme. La pédagogie passe par des projets « fil rouge » et la plateforme A7 4.0 (coworking, centre de ressources numériques). Le stage de fin d'études suit le 1er semestre de 3e année ; le diplôme exige au moins trois mois à l'étranger et un niveau B2 en anglais (785 au TOEIC).",
    debouches:
      "L'ENSIACET forme des ingénieurs de la transformation de la matière et de l'énergie. Tu y prépares l'un de ses cinq diplômes : chimie, matériaux, génie chimique, génie des procédés ou génie industriel, du laboratoire jusqu'à l'organisation d'une usine. Quatre de ces diplômes existent aussi en apprentissage, payé de 53 à 78 % du Smic.",
    plus: "Les places du concours sont rattachées à un diplôme : tu choisis chimie, matériaux, génie chimique, génie des procédés ou génie industriel dès ton classement. La filière PC fournit les deux tiers des places.",
    station: "ecole-ingenieurs",
    url: "https://www.ensiacet.fr/fr/formation/formations-ingenieur.html",
    sources: [
      "https://www.ensiacet.fr/fr/formation/admission-et-droits-d-inscriptions.html",
      "https://www.ensiacet.fr/fr/formation/formations-ingenieur.html",
      "https://www.ensiacet.fr/fr/formation/alternance/le-contrat-d-apprentissage-sur-3-ans-fisa.html",
      "https://www.ensiacet.fr/fr/formations/ingenieur-1/cursus-et-pedagogie-ingenieur.html",
      "https://www.ensiacet.fr/fr/entreprises/recruter-nos-etudiants.html",
    ],
    pourquoi:
      "L'ENSIACET forme des ingénieurs de la transformation de la matière et de l'énergie. Tu y prépares l'un de ses cinq diplômes : chimie, matériaux, génie chimique, génie des procédés ou génie industriel, du laboratoire jusqu'à l'organisation d'une usine. Quatre de ces diplômes existent aussi en apprentissage, payé de 53 à 78 % du Smic.",
    apprendre:
      "Un premier semestre en tronc commun pour les cinq départements, puis tu te spécialises dans ton diplôme. La pédagogie passe par des projets « fil rouge » et la plateforme A7 4.0 (coworking, centre de ressources numériques). Le stage de fin d'études suit le 1er semestre de 3e année ; le diplôme exige au moins trois mois à l'étranger et un niveau B2 en anglais (785 au TOEIC).",
    specificite:
      "Les places du concours sont rattachées à un diplôme : tu choisis chimie, matériaux, génie chimique, génie des procédés ou génie industriel dès ton classement. La filière PC fournit les deux tiers des places.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Quatre diplômes en apprentissage sur 3 ans : matériaux, génie chimique, génie des procédés, génie industriel ; après un BUT ou un BTS ; 24 apprentis par département",
    chiffres: [
      {
        label: "Places Concours Commun INP (MP 28, MPI 2, PC 116, PSI 28, TPC 1)",
        valeur: "175",
        source: "https://www.ensiacet.fr/fr/formation/admission-et-droits-d-inscriptions.html",
        date: "2026-2027",
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
        date: "2026-2027",
      },
      {
        label: "CVEC",
        valeur: "105 €",
        source: "https://www.ensiacet.fr/fr/formation/admission-et-droits-d-inscriptions.html",
        date: "2026-2027",
      },
    ],
  },
  {
    id: "phelma",
    name: "Grenoble INP - Phelma, UGA (École nationale supérieure de physique, électronique, matériaux)",
    short: "Phelma",
    line: "sciences",
    ville: "Grenoble",
    kind: "École d'ingénieurs publique",
    acces: "Prépa scientifique puis Concours Commun INP ; aussi BCPST, Prépa des INP et sur titre",
    duree: "3 ans après bac + 2",
    places: "Campagne 2026-2027 : 24 places en apprentissage, 36 sur titre en 1re année et 20 en 2e année",
    cout: "630 € par an en 2026-2027 (tarif Grenoble INP), plus 105 € de CVEC ; boursiers et apprentis exonérés",
    formations:
      "En 1re année, tu suis le parcours PMP (physique, matériaux, procédés) ou PET (physique, électronique, télécoms), avec 70 % de cours communs au premier semestre et un stage d'opérateur d'au moins 4 semaines. En 2e et 3e années, tu rejoins l'une des dix filières : microélectronique, photonique, énergie et nucléaire, matériaux, biomédical, systèmes embarqués, signal et image… Semestres possibles à l'étranger ou dans une autre école Grenoble INP.",
    debouches:
      "Phelma forme des ingénieurs en physique, électronique et matériaux. Ses diplômés partent surtout dans le numérique et les télécoms (23 %), l'énergie (16 %), la R&D et l'industrie des transports (11 % chacun), chez STMicroelectronics, Soitec, EDF, Framatome, le CEA ou Arkema. 70 % sont embauchés avant le diplôme, avec un salaire moyen de 40 000 € brut par an.",
    plus: "Dix filières de spécialisation, dont deux internationales (Advanced Materials, Nanotech), et des semestres optionnels consacrés aux matériaux du nucléaire. Un double cursus ingénieur-master en dernière année ouvre la voie au doctorat.",
    station: "ecole-ingenieurs",
    url: "https://phelma.grenoble-inp.fr/fr/formation",
    sources: [
      "https://phelma.grenoble-inp.fr/fr/formation/admission",
      "https://phelma.grenoble-inp.fr/fr/l-ecole/droits-dinscription-et-paiement",
      "https://phelma.grenoble-inp.fr/fr/formation/inscription-en-1re-annee-ingenieur-par-l-apprentissage",
      "https://phelma.grenoble-inp.fr/fr/formation/filieres-et-parcours-de-2e-et-3e-annees-1",
      "https://phelma.grenoble-inp.fr/fr/formation/premiere-annee",
      "https://phelma.grenoble-inp.fr/fr/l-ecole/debouches",
      "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
    ],
    pourquoi:
      "Phelma forme des ingénieurs en physique, électronique et matériaux. Ses diplômés partent surtout dans le numérique et les télécoms (23 %), l'énergie (16 %), la R&D et l'industrie des transports (11 % chacun), chez STMicroelectronics, Soitec, EDF, Framatome, le CEA ou Arkema. 70 % sont embauchés avant le diplôme, avec un salaire moyen de 40 000 € brut par an.",
    apprendre:
      "En 1re année, tu suis le parcours PMP (physique, matériaux, procédés) ou PET (physique, électronique, télécoms), avec 70 % de cours communs au premier semestre et un stage d'opérateur d'au moins 4 semaines. En 2e et 3e années, tu rejoins l'une des dix filières : microélectronique, photonique, énergie et nucléaire, matériaux, biomédical, systèmes embarqués, signal et image… Semestres possibles à l'étranger ou dans une autre école Grenoble INP.",
    specificite:
      "Dix filières de spécialisation, dont deux internationales (Advanced Materials, Nanotech), et des semestres optionnels consacrés aux matériaux du nucléaire. Un double cursus ingénieur-master en dernière année ouvre la voie au doctorat.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Deux cycles en apprentissage sur 3 ans : microélectronique et télécommunications ; matériaux, énergie, procédés ; 24 places, droits à 0 €",
    chiffres: [
      {
        label: "Places en admission sur titre, 1re année (BUT, ATS, L2, L3)",
        valeur: "36 au plus",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "2026-2027",
      },
      {
        label: "Places en admission sur titre, 2e année",
        valeur: "20",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "2026-2027",
      },
      {
        label: "Places en apprentissage (MT et MEP)",
        valeur: "24",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "2026-2027",
      },
      {
        label: "Places BCPST (parcours PMP)",
        valeur: "2 au plus",
        source: "https://phelma.grenoble-inp.fr/fr/formation/admission",
        date: "2026-2027",
      },
    ],
  },
  {
    id: "ense3",
    name: "Grenoble INP - Ense3, UGA (École nationale supérieure de l'énergie, l'eau et l'environnement)",
    short: "Ense3",
    line: "sciences",
    ville: "Grenoble",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP, BUT et sur titre",
    duree: "3 ans après bac + 2",
    places: "Site consulté en 2026 : environ 325 recrues par an, dont 231 via le Concours Commun INP et 25 apprentis",
    cout: "630 € par an en 2026-2027 (UE), plus 105 € de CVEC ; boursiers et apprentis exonérés",
    formations:
      "Le premier semestre est commun : modélisation et calcul scientifique, conception soutenable, génie électrique, signaux et systèmes, mécanique des fluides et des solides, avec des projets. Au second semestre, tu choisis l'une des huit filières métier : automatique et systèmes intelligents, hydraulique, énergie électrique, énergie nucléaire, ingénierie de produits, mécanique et énergétique, signal et image, systèmes énergétiques et marchés.",
    debouches:
      "Ense3 forme des ingénieurs de l'énergie, de l'eau et de l'environnement : électricité, nucléaire, hydraulique, réseaux, marchés de l'énergie. Ses diplômés deviennent ingénieurs R&D, d'essais, d'études et de conseil, exploitants de réseaux, chefs de projet, acheteurs ou traders d'énergie. Taux net d'emploi de la promotion 2023 : 91,2 % selon l'enquête de la CGE.",
    plus: "L'école se présente comme l'école d'ingénieurs « des transitions » : la conception soutenable figure au programme dès le premier semestre. Sa filière Systèmes énergétiques et marchés mêle ingénierie et économie de l'énergie.",
    station: "ecole-ingenieurs",
    url: "https://ense3.grenoble-inp.fr/",
    sources: [
      "https://ense3.grenoble-inp.fr/fr/formation/admission",
      "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
      "https://ense3.grenoble-inp.fr/fr/formation/cursus-ingenieurs",
      "https://ense3.grenoble-inp.fr/fr/formation/ingenieur-par-apprentissage",
      "https://ense3.grenoble-inp.fr/fr/formation/metiers-et-emplois",
      "https://ense3.grenoble-inp.fr/fr/futur-e-etudiant-e",
    ],
    pourquoi:
      "Ense3 forme des ingénieurs de l'énergie, de l'eau et de l'environnement : électricité, nucléaire, hydraulique, réseaux, marchés de l'énergie. Ses diplômés deviennent ingénieurs R&D, d'essais, d'études et de conseil, exploitants de réseaux, chefs de projet, acheteurs ou traders d'énergie. Taux net d'emploi de la promotion 2023 : 91,2 % selon l'enquête de la CGE.",
    apprendre:
      "Le premier semestre est commun : modélisation et calcul scientifique, conception soutenable, génie électrique, signaux et systèmes, mécanique des fluides et des solides, avec des projets. Au second semestre, tu choisis l'une des huit filières métier : automatique et systèmes intelligents, hydraulique, énergie électrique, énergie nucléaire, ingénierie de produits, mécanique et énergétique, signal et image, systèmes énergétiques et marchés.",
    specificite:
      "L'école se présente comme l'école d'ingénieurs « des transitions » : la conception soutenable figure au programme dès le premier semestre. Sa filière Systèmes énergétiques et marchés mêle ingénierie et économie de l'énergie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Filière PRODISE en 3 ans (production, distribution et stockage des énergies) : de bac + 2 à bac + 4, 25 places, alternance d'un à deux mois",
    chiffres: [
      {
        label: "Admis via le Concours Commun INP",
        valeur: "231 (65 MP, 60 PC, 80 PSI, 15 PT, 3 TSI, 3 MPI)",
        source: "https://ense3.grenoble-inp.fr/fr/formation/admission",
      },
      {
        label: "Élèves recrutés par an",
        valeur: "environ 325",
        source: "https://ense3.grenoble-inp.fr/fr/formation/admission",
      },
      {
        label: "Places en apprentissage (PRODISE)",
        valeur: "25",
        source: "https://ense3.grenoble-inp.fr/fr/formation/admission",
      },
      {
        label: "Droits d'inscription (étudiant UE)",
        valeur: "630 €",
        source: "https://ense3.grenoble-inp.fr/fr/formation/frais-dinscription-et-financement-des-etudes",
        date: "2026-2027",
      },
    ],
  },
  {
    id: "enseirb-matmeca",
    name: "Bordeaux INP - ENSEIRB-MATMECA (École nationale supérieure d'électronique, informatique, télécommunications, mathématique et mécanique de Bordeaux)",
    short: "ENSEIRB-MATMECA",
    line: "sciences",
    ville: "Talence (métropole de Bordeaux)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP, CPBx et sur titre",
    duree: "3 ans après bac + 2",
    places:
      "2026-2027 : 72 places au Concours Commun INP pour la seule filière Informatique ; plus de 1 200 élèves-ingénieurs",
    cout: "630 € par an (UE) et 105 € de CVEC à la rentrée 2026 ; boursiers exonérés des droits et de la CVEC",
    formations:
      "Tu choisis ta filière dès le concours : électronique, informatique, mathématique et mécanique, ou télécommunications. En informatique, la 3e année propose sept spécialisations, dont intelligence artificielle, cybersécurité et calcul intensif. Douze mois de stages sur trois ans, dont un projet de fin d'études de 5 à 6 mois, et au moins 17 semaines à l'étranger.",
    debouches:
      "L'ENSEIRB-MATMECA forme des ingénieurs du numérique : électronique, informatique, télécoms, mathématiques appliquées et mécanique. En informatique, 8 diplômés sur 10 ont un emploi avant de quitter l'école et 95 % travaillent trois mois après, surtout dans les services numériques (46 %) et le conseil-ingénierie (35 %). 42 % restent en Nouvelle-Aquitaine.",
    plus: "Deux certificats ouverts à toutes les filières, Espace et Énergie, associent séminaires, projet long, stage et hackathon dans ces secteurs. Un parcours ingénieur-docteur prépare à la thèse du 5e au 10e semestre.",
    station: "ecole-ingenieurs",
    url: "https://enseirb-matmeca.bordeaux-inp.fr/fr",
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
    pourquoi:
      "L'ENSEIRB-MATMECA forme des ingénieurs du numérique : électronique, informatique, télécoms, mathématiques appliquées et mécanique. En informatique, 8 diplômés sur 10 ont un emploi avant de quitter l'école et 95 % travaillent trois mois après, surtout dans les services numériques (46 %) et le conseil-ingénierie (35 %). 42 % restent en Nouvelle-Aquitaine.",
    apprendre:
      "Tu choisis ta filière dès le concours : électronique, informatique, mathématique et mécanique, ou télécommunications. En informatique, la 3e année propose sept spécialisations, dont intelligence artificielle, cybersécurité et calcul intensif. Douze mois de stages sur trois ans, dont un projet de fin d'études de 5 à 6 mois, et au moins 17 semaines à l'étranger.",
    specificite:
      "Deux certificats ouverts à toutes les filières, Espace et Énergie, associent séminaires, projet long, stage et hackathon dans ces secteurs. Un parcours ingénieur-docteur prépare à la thèse du 5e au 10e semestre.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Deux filières en apprentissage dès la 1re année : réseaux et informatique, systèmes électroniques embarqués ; après un BTS, un BUT ou une licence",
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
  },
  {
    id: "telecom-sudparis",
    name: "Télécom SudParis",
    short: "Télécom SudParis (TSP)",
    line: "sciences",
    ville: "Évry-Courcouronnes et Palaiseau (Essonne)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, puis concours Mines-Télécom ; aussi sur titre et en apprentissage",
    duree: "3 ans après bac + 2",
    places: "206 places au concours Mines-Télécom (session 2027) ; 42 places en apprentissage en 1re année",
    cout: "3 600 € par an pour un entrant de 2026 (UE) ; boursiers d'État exonérés ; apprentis exonérés",
    formations:
      "Le cycle généraliste mêle cours, projets et stages en lien étroit avec les entreprises. En 3e année, tu choisis l'une des 16 voies d'approfondissement : cybersécurité, intelligence artificielle, jeux vidéo, systèmes embarqués, imagerie, data science biomédicale (nouveauté 2026)… Tu peux aussi suivre un M2 de l'Institut Polytechnique de Paris, un semestre dans une autre école de l'IMT ou l'un des 100 parcours à l'international.",
    debouches:
      "Télécom SudParis forme des ingénieurs du numérique : IA et data science, développement logiciel, réseaux et cloud, cybersécurité, finance quantitative. Promotion 2025 : 78,2 % en emploi, 93,6 % en CDI, salaire moyen de 47 594 € brut primes comprises. Les services numériques (46,8 %) et le conseil-ingénierie (25,2 %) recrutent le plus ; plus de 70 % des ingénieurs généralistes signent avant le diplôme.",
    plus: "Deux campus : Évry-Courcouronnes (7,5 ha) et Palaiseau, dans un bâtiment partagé avec Télécom Paris au sein de l'Institut Polytechnique de Paris. Tu peux orienter projets et stages vers l'environnement, la santé, la recherche, l'entrepreneuriat ou la défense.",
    station: "ecole-ingenieurs",
    url: "https://www.telecom-sudparis.eu/formation/ingenieur-generaliste/",
    sources: [
      "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-generaliste/",
      "https://www.telecom-sudparis.eu/en/tuitions/",
      "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-par-apprentissage/",
      "https://www.telecom-sudparis.eu/formation/ingenieur-generaliste/",
      "https://www.telecom-sudparis.eu/enquete-1er-emploi/",
      "https://www.telecom-sudparis.eu/options/",
    ],
    pourquoi:
      "Télécom SudParis forme des ingénieurs du numérique : IA et data science, développement logiciel, réseaux et cloud, cybersécurité, finance quantitative. Promotion 2025 : 78,2 % en emploi, 93,6 % en CDI, salaire moyen de 47 594 € brut primes comprises. Les services numériques (46,8 %) et le conseil-ingénierie (25,2 %) recrutent le plus ; plus de 70 % des ingénieurs généralistes signent avant le diplôme.",
    apprendre:
      "Le cycle généraliste mêle cours, projets et stages en lien étroit avec les entreprises. En 3e année, tu choisis l'une des 16 voies d'approfondissement : cybersécurité, intelligence artificielle, jeux vidéo, systèmes embarqués, imagerie, data science biomédicale (nouveauté 2026)… Tu peux aussi suivre un M2 de l'Institut Polytechnique de Paris, un semestre dans une autre école de l'IMT ou l'un des 100 parcours à l'international.",
    specificite:
      "Deux campus : Évry-Courcouronnes (7,5 ha) et Palaiseau, dans un bâtiment partagé avec Télécom Paris au sein de l'Institut Polytechnique de Paris. Tu peux orienter projets et stages vers l'environnement, la santé, la recherche, l'entrepreneuriat ou la défense.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Ingénieur de spécialité informatique et réseaux en apprentissage : 42 places en 1re année, 5 en 2e année, après un BUT, une L3, une prépa ou un M1",
    chiffres: [
      {
        label: "Places au concours Mines-Télécom",
        valeur: "206",
        source: "https://www.telecom-sudparis.eu/admission/admission-en-cycle-ingenieur-generaliste/",
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
  },
  {
    id: "imt-nord-europe",
    name: "IMT Nord Europe",
    short: "IMT Nord Europe",
    line: "sciences",
    ville: "Douai (1re année), Lille, Valenciennes, Dunkerque, Alençon",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, BCPST, puis concours Mines-Télécom ; aussi sur titre",
    duree: "3 ans après bac + 2",
    places:
      "Plus de 15 % des 1 500 places annuelles du concours Mines-Télécom (site consulté en 2026) ; une dizaine d'élèves fonctionnaires",
    cout: "Environ 3 200 € par an en 2025 (UE) ; exonération possible pour les boursiers ; élèves fonctionnaires rémunérés, engagés huit ans",
    formations:
      "Après une 1re année de tronc commun à Douai, tu construis en 2e et 3e années ton parcours thématique et ton profil d'ingénieur selon ton projet professionnel. Projets concrets et stages rythment le cursus. Une expérience internationale d'au moins 6 mois (stage, échange ou double diplôme) est exigée pour obtenir le diplôme.",
    debouches:
      "IMT Nord Europe forme des ingénieurs généralistes aux compétences techniques, scientifiques et managériales, avec une place forte pour le management de projet, l'innovation et les transitions écologique et numérique. Ses domaines phares couvrent l'énergie, le numérique, la cybersécurité et le génie civil. Une dizaine d'élèves par an entrent comme élèves fonctionnaires : payés pendant leurs études, ils servent ensuite l'État huit ans.",
    plus: "L'école s'étend sur cinq campus, de Dunkerque à Alençon, et ajoute au cursus généraliste cinq diplômes de spécialité en apprentissage, dont un en infrastructures ferroviaires. Elle fournit plus de 15 % des places du concours Mines-Télécom.",
    station: "ecole-ingenieurs",
    url: "https://imt-nord-europe.fr/annuaire-formations/ingenieur-generaliste/",
    sources: [
      "https://imt-nord-europe.fr/annuaire-formations/niveaux-admission/prepa-scientifique/",
      "https://imt-nord-europe.fr/ingenieur-generaliste-devenir-eleve-fonctionnaire/",
      "https://imt-nord-europe.fr/ingenieur-generaliste-admissions/",
      "https://imt-nord-europe.fr/ingenieur-generaliste-cursus/",
      "https://imt-nord-europe.fr/annuaire-formations/ingenieur-generaliste/",
      "https://imt-nord-europe.fr/formations/ingenieur-de-specialite-par-apprentissage/",
    ],
    pourquoi:
      "IMT Nord Europe forme des ingénieurs généralistes aux compétences techniques, scientifiques et managériales, avec une place forte pour le management de projet, l'innovation et les transitions écologique et numérique. Ses domaines phares couvrent l'énergie, le numérique, la cybersécurité et le génie civil. Une dizaine d'élèves par an entrent comme élèves fonctionnaires : payés pendant leurs études, ils servent ensuite l'État huit ans.",
    apprendre:
      "Après une 1re année de tronc commun à Douai, tu construis en 2e et 3e années ton parcours thématique et ton profil d'ingénieur selon ton projet professionnel. Projets concrets et stages rythment le cursus. Une expérience internationale d'au moins 6 mois (stage, échange ou double diplôme) est exigée pour obtenir le diplôme.",
    specificite:
      "L'école s'étend sur cinq campus, de Dunkerque à Alençon, et ajoute au cursus généraliste cinq diplômes de spécialité en apprentissage, dont un en infrastructures ferroviaires. Elle fournit plus de 15 % des places du concours Mines-Télécom.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Cinq diplômes de spécialité en apprentissage, en 3 ans après un bac + 2 : génie industriel, matériaux, énergie et nucléaire, ferroviaire, informatique et réseaux",
    chiffres: [
      {
        label: "Part des 1 500 places annuelles du concours Mines-Télécom",
        valeur: "plus de 15 %",
        source: "https://imt-nord-europe.fr/annuaire-formations/niveaux-admission/prepa-scientifique/",
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
  },
  {
    id: "imt-mines-albi",
    name: "IMT Mines Albi-Carmaux (École nationale supérieure des mines d'Albi-Carmaux)",
    short: "IMT Mines Albi",
    line: "sciences",
    ville: "Albi (campus Jarlard, 24 ha)",
    kind: "École d'ingénieurs publique",
    acces:
      "Concours Mines-Télécom pour la filière étudiant : MP, PC, PSI, MPI, PT, TSI, BCPST. Filière alternant sur dossier et épreuves (plateforme commune de l'IMT) après une CPGE (TPC comprise), un BTS, un BUT 2e année, une L2 ou une prépa ATS. Admission sur titres commune avec IMT Mines Alès et IMT Nord Europe : après une L3 ou un BUT en 1re année, après un M1 en 2e année. Entrée possible après 2 ou 3 ans de CUPGE à l'INU Champollion d'Albi.",
    duree: "3 ans après bac + 2",
    places:
      "Rentrée 2026, filière étudiant (Concours Mines-Télécom) : 156 places, dont 45 en MP, 45 en PC, 45 en PSI, 8 en PT, 7 en BCPST, 4 en MPI et 2 en TSI. Places en alternance et sur titres : à demander à l'école.",
    cout: "Filière étudiant : 3 200 € par an pour les ressortissants de l'UE et de l'EEE, 5 700 € pour les autres (tarifs affichés en 2026). Boursiers exonérés ; réduction de 50 % si les revenus dépassent d'au plus 3 000 € le plafond des bourses. Filière alternant : formation payée par l'entreprise, l'apprenti touche un salaire.",
    formations:
      "Tronc commun scientifique et technique en 1re année ; cours au choix et projet de recherche, d'innovation ou de création d'entreprise en 2e année ; puis une option sur 5 en 3e année : énergies renouvelables, procédés pharmaceutiques et agroalimentaires, matériaux pour les transports, génie industriel, ingénierie de la donnée. 11 mois de stages et un séjour à l'étranger : 18 semaines d'études ou 9 semaines de stage.",
    debouches:
      "Les diplômés travaillent dans la pharmacie, la cosmétique et l'agroalimentaire, l'aéronautique et les transports, l'énergie et la construction, le conseil et le numérique, comme ingénieur procédés, matériaux, qualité, logistique ou data. 82 % trouvent un emploi en moins de deux mois ; pour la promotion 2024, 84 % sont en CDI et touchent en moyenne 42 375 € brut par an.",
    plus: "École de l'Institut Mines-Télécom sur un campus de 24 ha avec 8 résidences. Un double cursus pharmacien-ingénieur accueille des étudiants de 5e année de pharmacie, et plus de 300 doubles diplômes ou options sont ouverts, de Georgia Tech à Sciences Po.",
    station: "ecole-ingenieurs",
    url: "https://www.imt-mines-albi.fr/",
    sources: [
      "https://www.imt-mines-albi.fr/",
      "https://www.imt-mines-albi.fr/fr/integrer-une-formation/comment-integrer-imt-mines-albi",
      "https://www.imt-mines-albi.fr/fr/integrer-formation-ingenieur-generaliste-imt-mines-albi-apres-classe-preparatoire-CPGE",
      "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-etudiant",
      "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-par-alternance",
      "https://www.imt-mines-albi.fr/fr/FAQ-ingenieur-generaliste-imt-mines-albi",
    ],
    pourquoi:
      "Les diplômés travaillent dans la pharmacie, la cosmétique et l'agroalimentaire, l'aéronautique et les transports, l'énergie et la construction, le conseil et le numérique, comme ingénieur procédés, matériaux, qualité, logistique ou data. 82 % trouvent un emploi en moins de deux mois ; pour la promotion 2024, 84 % sont en CDI et touchent en moyenne 42 375 € brut par an.",
    apprendre:
      "Tronc commun scientifique et technique en 1re année ; cours au choix et projet de recherche, d'innovation ou de création d'entreprise en 2e année ; puis une option sur 5 en 3e année : énergies renouvelables, procédés pharmaceutiques et agroalimentaires, matériaux pour les transports, génie industriel, ingénierie de la donnée. 11 mois de stages et un séjour à l'étranger : 18 semaines d'études ou 9 semaines de stage.",
    specificite:
      "École de l'Institut Mines-Télécom sur un campus de 24 ha avec 8 résidences. Un double cursus pharmacien-ingénieur accueille des étudiants de 5e année de pharmacie, et plus de 300 doubles diplômes ou options sont ouverts, de Georgia Tech à Sciences Po.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Filière alternant dès la 1re année, sur 3 ans, avec 4 options : énergies renouvelables, production et construction durables ; procédés pharmaceutiques, agroalimentaires et cosmétiques ; matériaux et procédés avancés pour les transports ; génie industriel pour la performance des organisations. Chaque année : 450 h à l'école et 1 150 h en entreprise. Mobilité internationale de 9 semaines. Contrat signé avant 30 ans.",
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
        date: "2026",
      },
      {
        label: "Salaire annuel brut moyen en France, primes incluses",
        valeur: "42 375 €",
        source:
          "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-etudiant",
        date: "2024",
      },
      {
        label: "Diplômés en activité embauchés en CDI",
        valeur: "84 %",
        source:
          "https://www.imt-mines-albi.fr/fr/integrer-une-formation/diplome-ingenieur-generaliste/filiere-etudiant",
        date: "2024",
      },
    ],
  },
  {
    id: "imt-mines-ales",
    name: "IMT Mines Alès (École nationale supérieure des mines d'Alès)",
    short: "IMT Mines Alès",
    line: "sciences",
    ville: "Alès (Gard)",
    kind: "École d'ingénieurs publique",
    acces:
      "Concours Mines-Télécom : MP, PC, PSI et MPI (épreuves de la banque Mines-Ponts), PT (Banque PT), TSI (banque CentraleSupélec) ; BCPST par le concours G2E. Admission sur titre après un bac + 2 (BTS, BUT 2e année, L2, CUPGE, prépa ATS), après une L3 ou un BUT en 1re année, après un M1 en 2e année. Apprentissage sur dossier et entretien après un BUT, une CPGE (ATS, PT, TSI…), une L2 ou une L3.",
    duree: "3 ans après bac + 2",
    places:
      "Rentrée 2026 : 224 places sur concours, dont 193 au concours Mines-Télécom en MP, PC, PSI et MPI (68 MP, 62 PSI, 58 PC, 5 MPI), 23 en PT, 6 en BCPST (G2E) et 2 en TSI. Admissions sur titres : 15 places en 1re année et 25 en 2e année, recrutement international compris (brochure 2026).",
    cout: "3 500 € par an en 2026-2027 pour les ressortissants de l'UE et pour tous les élèves recrutés sur concours après une prépa ; 6 000 € pour les autres élèves hors UE. Boursiers du gouvernement français exonérés ; exonération de 50 % si les ressources dépassent d'au plus 3 500 € le plafond de bourse. En apprentissage, les trois années sont rémunérées.",
    formations:
      "Un tronc commun, puis un domaine choisi en 2e année parmi 6 (environnement-énergie-risques, écoconception et matériaux, informatique et IA, industrie du futur, génie civil et bâtiment durable, ressources minérales et sous-sol), soit 26 options. Plus de 12 mois en entreprise : stage ouvrier, stage d'adjoint ingénieur de 13 semaines, missions R&D et création de 5 semaines, projet de fin d'études de 4 à 6 mois.",
    debouches:
      "Pour la promotion 2024, 86 % des diplômés ont trouvé un emploi en moins de 4 mois, avec un salaire annuel moyen de 45 100 €, et 20 % ont été embauchés à l'étranger. Les secteurs qui recrutent le plus : BTP et génie civil (30 %), informatique et data (18 %), énergie (13 %), puis transport, industrie, environnement et gestion des risques.",
    plus: "Fondée en 1843, l'école mise sur la création d'entreprise : son incubateur, ouvert en 1984, a accompagné 241 entreprises, et chaque élève vit une mission création de 5 semaines. Un double diplôme ingénieur-architecte se prépare avec ULiège, UMONS ou l'ENSA Montpellier.",
    station: "ecole-ingenieurs",
    url: "https://www.imt-mines-ales.fr/",
    sources: [
      "https://www.imt-mines-ales.fr/",
      "https://imt-mines-ales.fr/les-differentes-voies-dadmissions-pour-les-formation-dingenieur-generaliste-et-pour-les-formations",
      "https://www.imt-mines-ales.fr/tout-savoir-sur-la-formation-dingenieur-generaliste",
      "https://www.imt-mines-ales.fr/sites/default/files/media/2026-06/Brochure-Recrutement-2026.pdf",
      "https://www.imt-mines-ales.fr/vie-etudiante/cout-de-la-scolarite-et-accompagnement-social",
      "https://www.imt-mines-ales.fr/formations/ingenieur-de-specialite-par-apprentissage/lapprentissage-imt-mines-ales",
      "https://www.onisep.fr/ressources/structures-enseignement/occitanie/gard/ecole-nationale-superieure-des-mines-d-ales-imt-mines-ales/diplome-d-ingenieur-de-l-ecole-nationale-superieure-des-mines-d-ales-de-l-institut-mines-telecom",
    ],
    pourquoi:
      "Pour la promotion 2024, 86 % des diplômés ont trouvé un emploi en moins de 4 mois, avec un salaire annuel moyen de 45 100 €, et 20 % ont été embauchés à l'étranger. Les secteurs qui recrutent le plus : BTP et génie civil (30 %), informatique et data (18 %), énergie (13 %), puis transport, industrie, environnement et gestion des risques.",
    apprendre:
      "Un tronc commun, puis un domaine choisi en 2e année parmi 6 (environnement-énergie-risques, écoconception et matériaux, informatique et IA, industrie du futur, génie civil et bâtiment durable, ressources minérales et sous-sol), soit 26 options. Plus de 12 mois en entreprise : stage ouvrier, stage d'adjoint ingénieur de 13 semaines, missions R&D et création de 5 semaines, projet de fin d'études de 4 à 6 mois.",
    specificite:
      "Fondée en 1843, l'école mise sur la création d'entreprise : son incubateur, ouvert en 1984, a accompagné 241 entreprises, et chaque élève vit une mission création de 5 semaines. Un double diplôme ingénieur-architecte se prépare avec ULiège, UMONS ou l'ENSA Montpellier.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Trois diplômes d'ingénieur de spécialité par apprentissage, en 3 ans : Bâtiment (bâtiment durable ou énergétique du bâtiment), Informatique et réseaux (systèmes et réseaux ou développement logiciel), Mécatronique (performance industrielle ou ingénierie système). Environ 1 800 h à l'école et 2 835 h en entreprise. Entrée avant 30 ans ; 357 apprentis en 2025-2026.",
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
        date: "2024",
      },
      {
        label: "Salaire annuel moyen de sortie",
        valeur: "45 100 €",
        source: "https://www.imt-mines-ales.fr/sites/default/files/media/2026-06/Brochure-Recrutement-2026.pdf",
        date: "2024",
      },
      {
        label: "Apprentis ingénieurs (3 spécialités)",
        valeur: "357",
        source:
          "https://www.imt-mines-ales.fr/formations/ingenieur-de-specialite-par-apprentissage/lapprentissage-imt-mines-ales",
        date: "2025-2026",
      },
    ],
  },
]);
