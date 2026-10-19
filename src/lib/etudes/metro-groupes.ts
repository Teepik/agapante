/**
 * Ce que certaines étapes de la carte déplient : les prépas scientifiques, les banques de concours,
 * la prépa ATS, les spécialités de BUT. Chaque élément porte ses sources ; les chiffres datent de la
 * session 2026 (Parcoursup, notices des concours).
 */
import { etTypo } from "./typo";

export type Detail = { label: string; value: string };

export type Element = {
  id: string;
  /** Le nom court, sur la pastille : « MPSI », « Mines-Ponts ». */
  chip: string;
  titre: string;
  /** Une phrase : à qui il s'adresse, ce qu'il ouvre. */
  phrase: string;
  details: Detail[];
  sources?: string[];
  /** Un mot à chercher parmi les formations de Parcoursup, pour « Près de chez toi ». */
  cle?: string;
};

export type Groupe = {
  id: string;
  titre: string;
  /** Au-dessus des pastilles, dans la fiche courte. */
  accroche: string;
  intro?: string;
  elements: Element[];
  /** Les sources communes à tout le groupe. */
  sources?: string[];
  /** Faux : le groupe reste dans la fiche complète, sans pastilles sur la fiche courte. */
  popup?: boolean;
};

const ONISEP_PREPAS =
  "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/les-principales-filieres-d-etudes-superieures/les-cpge-classes-preparatoires-aux-grandes-ecoles/les-prepas-scientifiques";
const X_CONCOURS = "https://www.polytechnique.edu/admission-cycle-ingenieur/concours-dadmission";
const MINES_PONTS = "https://concoursminesponts.fr/wp-content/uploads/2025/12/notice-des-ecoles-2026-22.12.25.pdf";
const MINES_TELECOM = "https://cahier-de-prepa.fr/pc-descartes/download?id=260";
const CCINP = "https://www.concours-commun-inp.fr/_resource/R%C3%A8glement_VF_13-05_26.pdf?download=true";
const CENTRALE =
  "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-d-ingenieurs-post-prepa-le-concours-centrale-supelec-mode-d-emploi.html";
const BANQUE_PT = "https://www.banquept.fr/documents/livret/2026/Livret_PT_2026.pdf";
const AGRO_VETO =
  "https://www.letudiant.fr/etudes/ecole-ingenieur/ecoles-dingenieurs-la-voie-cpge-bcpst-du-concours-agro-veto-mode-demploi.html";
const ATS_AM = "https://s3-site.artsetmetiers.fr/public/2025-12/251208_Arts%20et%20M%C3%A9tiers_Concours%20ATS_CP.pdf";

const PREPAS: Groupe = {
  id: "prepas",
  titre: "Les prépas scientifiques",
  accroche: "Huit prépas, selon tes matières et ton bac",
  intro:
    "En 1re année, chaque prépa a sa dominante, et la 2e année en découle. MPSI, PCSI, MP2I, PTSI et BCPST accueillent surtout des bacheliers généraux ; TSI, TB et TPC sont faites pour les bacs technologiques.",
  elements: [
    {
      id: "prepa-mpsi",
      chip: "MPSI",
      titre: "Mathématiques, physique et sciences de l'ingénieur",
      phrase:
        "Pour qui aime les maths et la physique, raisonne volontiers dans l'abstrait et veut garder toutes les portes des écoles ouvertes.",
      details: [
        {
          label: "Pour qui",
          value:
            "Bac général, avec maths et physique-chimie en terminale ; les maths expertes sont conseillées, et les sciences de l'ingénieur ou la NSI comptent aussi.",
        },
        {
          label: "Au programme",
          value:
            "Surtout des maths et de la physique : 12 h de maths, 8 h de physique-chimie, 2 h d'informatique et 2 h de sciences de l'ingénieur par semaine au lycée Champollion de Grenoble (2026). Au 2e semestre, tu choisis l'option informatique ou l'option sciences de l'ingénieur.",
        },
        {
          label: "En 2e année",
          value:
            "MP avec l'option informatique ; MP ou PSI avec l'option sciences de l'ingénieur. Les classes étoilées (MP*, PSI*) accueillent les élèves retenus sur leurs résultats, pour un entraînement plus poussé aux concours. Taux de passage en 2e année affiché sur Parcoursup en 2026 : 91,4 %.",
        },
        { label: "Concours", value: "X-ENS-ESPCI, Mines-Ponts, Centrale-Supélec, CCINP, e3a-Polytech, Mines-Télécom." },
        {
          label: "Des écoles visées",
          value: "École polytechnique, Mines Paris, CentraleSupélec, ISAE-Supaéro, ENSEEIHT, Ensimag.",
        },
      ],
      sources: [
        "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/classe-preparatoire-mathematiques-physique-et-sciences-de-l-ingenieur-mpsi-1re-annee-option-sciences-industrielles-de-l-ingenieur",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=4920",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=8974&typeBac=0",
        X_CONCOURS,
      ],
    },
    {
      id: "prepa-pcsi",
      chip: "PCSI",
      titre: "Physique, chimie et sciences de l'ingénieur",
      phrase:
        "Pour qui aime la physique, la chimie et les expériences de laboratoire, et veut garder un large choix d'écoles d'ingénieurs.",
      details: [
        {
          label: "Pour qui",
          value:
            "Surtout des bacheliers généraux, avec maths et physique-chimie en terminale ; les sciences de l'ingénieur ou l'informatique comptent aussi.",
        },
        {
          label: "Au programme",
          value:
            "10 h de maths, 8 h de physique, 4 h de chimie, 4 h de sciences industrielles et 2 h d'informatique par semaine au lycée Blaise-Pascal d'Orsay (2026), avec des travaux pratiques en laboratoire. À la fin du 1er semestre, tu choisis l'option physique-chimie ou l'option sciences de l'ingénieur.",
        },
        {
          label: "En 2e année",
          value:
            "PC avec l'option physique-chimie, PSI avec l'option sciences de l'ingénieur, en classe étoilée selon tes résultats. Taux de passage en 2e année affiché sur Parcoursup en 2026 : 92,6 %.",
        },
        {
          label: "Concours",
          value:
            "X-ENS-ESPCI, Mines-Ponts, Centrale-Supélec, CCINP, e3a-Polytech, Mines-Télécom. Après une PC, le CCINP offrait en 2026 555 places en PC physique et 638 en PC chimie.",
        },
        {
          label: "Des écoles visées",
          value: "École polytechnique, ESPCI Paris, Chimie ParisTech, ENSIC, CPE Lyon, IMT Atlantique.",
        },
      ],
      sources: [
        "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/classe-preparatoire-physique-chimie-et-sciences-de-l-ingenieur-pcsi-1re-annee",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=10860",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=8978",
        CCINP,
      ],
    },
    {
      id: "prepa-mp2i",
      chip: "MP2I",
      titre: "Mathématiques, physique, ingénierie et informatique",
      phrase:
        "Pour qui aime les maths et la programmation et vise les écoles du numérique, en gardant aussi la voie MP ou PSI.",
      details: [
        {
          label: "Pour qui",
          value:
            "Bac général, avec maths et physique-chimie ou NSI en terminale ; les maths expertes sont conseillées.",
        },
        {
          label: "Au programme",
          value:
            "Les mêmes maths qu'en MPSI (12 h), 6 h 30 de physique et 4 à 6 h d'informatique par semaine au lycée Claude-Fauriel de Saint-Étienne (2026). Cette prépa existe depuis la rentrée 2021.",
        },
        {
          label: "En 2e année",
          value:
            "MPI avec l'option sciences informatiques, MP ou PSI avec l'option sciences industrielles. Taux de passage en 2e année affiché sur Parcoursup en 2026 : 91,9 %.",
        },
        {
          label: "Concours",
          value:
            "X-ENS-ESPCI, Mines-Ponts, Centrale-Supélec, CCINP, e3a-Polytech, Mines-Télécom. En 2026, la filière MPI offrait 143 places au concours Mines-Ponts, 211 au CCINP et 207 au concours Mines-Télécom.",
        },
        {
          label: "Des écoles visées",
          value: "Télécom Paris, École polytechnique, Ensimag, Mines Saint-Étienne, Télécom SudParis, ENSIIE.",
        },
      ],
      sources: [
        "https://www.onisep.fr/Ressources/Univers-Formation/Formations/Post-bac/classe-preparatoire-mathematiques-physique-ingenierie-et-informatique-mp2i-1re-annee",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=32113&typeBac=0",
        "https://www.education.gouv.fr/bo/21/Special1/ESRS2035767A.htm",
        MINES_PONTS,
        CCINP,
        MINES_TELECOM,
      ],
    },
    {
      id: "prepa-ptsi",
      chip: "PTSI",
      titre: "Physique, technologie et sciences de l'ingénieur",
      phrase:
        "Pour qui aime comprendre et concevoir des objets techniques, avec beaucoup de sciences de l'ingénieur et de travaux pratiques.",
      details: [
        {
          label: "Pour qui",
          value:
            "Surtout des bacheliers généraux, avec maths et physique-chimie ; les sciences de l'ingénieur ou l'informatique comptent aussi. Les bacheliers STI2D visent plutôt la TSI.",
        },
        {
          label: "Au programme",
          value:
            "10 h de maths, 8 h de sciences physiques et 8 h 30 de sciences industrielles de l'ingénieur par semaine au lycée Ferdinand-Buisson de Voiron (2026), en lien avec des problèmes concrets.",
        },
        {
          label: "En 2e année",
          value:
            "La PT surtout, qui prépare à la Banque PT ; la PSI reste possible. Taux de passage en 2e année affiché sur Parcoursup en 2026 : 92 %.",
        },
        {
          label: "Concours",
          value:
            "La Banque PT, qui ouvre Arts et Métiers (540 places en 2026), le Groupe INSA (120), l'ESTP (105) et les grandes écoles des concours X-ENS, Mines-Ponts et Centrale-Supélec ; aussi Mines-Télécom.",
        },
        {
          label: "Des écoles visées",
          value: "Arts et Métiers, Groupe INSA, ESTP, ENS Paris-Saclay, Centrale Lyon, École des Ponts.",
        },
      ],
      sources: [
        "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/classe-preparatoire-physique-technologie-et-sciences-de-l-ingenieur-ptsi-1re-annee",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=4957",
        BANQUE_PT,
      ],
    },
    {
      id: "prepa-bcpst",
      chip: "BCPST",
      titre: "Biologie, chimie, physique et sciences de la Terre",
      phrase:
        "Pour qui aime la biologie, la géologie et les sciences expérimentales, et vise l'agronomie, l'environnement, la recherche ou les écoles vétérinaires.",
      details: [
        {
          label: "Pour qui",
          value:
            "Bac général, avec les maths et la SVT ou la physique-chimie en terminale. En début d'année, 36 heures d'accompagnement en physique-chimie et en SVT complètent ton duo de spécialités.",
        },
        {
          label: "Au programme",
          value:
            "8 h de maths, 8 h de sciences de la vie et de la Terre, 4 h de physique et 3 h de chimie, sur 30 h 30 de cours par semaine selon la grille nationale, avec des travaux pratiques chaque semaine.",
        },
        {
          label: "En 2e année",
          value: "BCPST 2e année. Taux de passage en 2e année affiché sur Parcoursup en 2026 : 82,6 %.",
        },
        {
          label: "Concours",
          value:
            "Agro-Véto (1 085 places en agronomie et 268 dans les quatre écoles vétérinaires en 2026), G2E (257 places), X-ENS-ESPCI, Mines-Télécom.",
        },
        {
          label: "Des écoles visées",
          value:
            "AgroParisTech, École vétérinaire d'Alfort, Institut Agro Rennes-Angers, ENS de Lyon, ENSG Nancy (géologie), ENTPE.",
        },
      ],
      sources: [
        "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/classe-preparatoire-biologie-chimie-physique-et-sciences-de-la-terre-bcpst-1re-annee",
        "https://www.education.gouv.fr/bo/21/Hebdo26/ESRH2108111A.htm",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=8966",
        AGRO_VETO,
        "https://concoursg2e.univ-lorraine.fr/wp-content/uploads/2025/11/notice-dinscription-2026_g2e.pdf",
      ],
    },
    {
      id: "prepa-tsi",
      chip: "TSI",
      titre: "Technologie et sciences industrielles",
      phrase:
        "Pour les bacheliers STI2D ou STL qui veulent devenir ingénieurs, avec une prépa construite pour leur parcours technologique.",
      details: [
        { label: "Pour qui", value: "Les bacheliers STI2D ou STL." },
        {
          label: "Au programme",
          value:
            "Maths, physique-chimie et sciences industrielles, pour analyser des systèmes complexes et concevoir des solutions technologiques, avec des colles chaque semaine.",
        },
        {
          label: "En 2e année",
          value:
            "TSI 2e année, avec la possibilité de la refaire une fois. Taux de passage en 2e année affiché sur Parcoursup en 2026 : 84,6 %.",
        },
        {
          label: "Concours",
          value:
            "En 2026, la filière TSI ouvrait 442 places dans 42 écoles par le CCINP, environ 199 au concours Centrale-Supélec, 37 au concours Mines-Télécom et 17 au concours Mines-Ponts.",
        },
        {
          label: "Des écoles visées",
          value: "Réseau Polytech, ESTIA, ESIGELEC, Isep, SUPMICROTECH-ENSMM, IMT Atlantique.",
        },
      ],
      sources: [
        "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/classe-preparatoire-technologie-et-sciences-industrielles-tsi-1re-annee",
        "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=3131",
        "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-tsi.html",
        CENTRALE,
      ],
    },
    {
      id: "prepa-tb",
      chip: "TB",
      titre: "Technologie et biologie",
      phrase:
        "Pour les bacheliers STL ou STAV passionnés de biologie, qui visent l'agronomie, l'agroalimentaire ou les écoles vétérinaires.",
      details: [
        { label: "Pour qui", value: "Les bacheliers STL ou STAV. Huit lycées la proposent, selon l'Onisep." },
        {
          label: "Au programme",
          value:
            "Biologie, biotechnologies, physique-chimie et maths, avec beaucoup de travaux pratiques en petits groupes.",
        },
        { label: "En 2e année", value: "TB 2e année." },
        {
          label: "Concours",
          value:
            "La voie TB du concours Agro-Véto (12 places dans les quatre écoles vétérinaires en 2026), le concours TB de l'ENS Paris-Saclay, la voie TB de Polytech.",
        },
        {
          label: "Des écoles visées",
          value: "AgroParisTech, Bordeaux Sciences Agro, ENSAIA, Oniris, VetAgro Sup, École vétérinaire de Toulouse.",
        },
      ],
      sources: [
        "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/classe-preparatoire-technologie-et-biologie-tb-1re-annee",
        "https://thotismedia.com/prepa-tb/",
        "https://www.letudiant.fr/etudes/ecole-ingenieur/admissions-ecoles-voies-dacces-tout-savoir-sur-les-concours-communs-agro-veto.html",
      ],
    },
    {
      id: "prepa-tpc",
      chip: "TPC",
      titre: "Technologie, physique et chimie",
      phrase:
        "Pour les bacheliers STL qui aiment la physique et la chimie de laboratoire et visent une école d'ingénieurs en chimie ou en physique.",
      details: [
        {
          label: "Pour qui",
          value: "Les bacheliers STL, spécialité sciences physiques et chimiques en laboratoire (SPCL).",
        },
        {
          label: "Au programme",
          value:
            "10 h de maths, 9 h de physique, 6 h de chimie et 2 h d'informatique par semaine au lycée Laurent-de-Lavoisier de Mulhouse (2026).",
        },
        {
          label: "En 2e année",
          value: "TPC 2e année. Taux de passage en 2e année affiché sur Parcoursup en 2026 : 82,1 %.",
        },
        {
          label: "Concours",
          value:
            "La filière TPC du CCINP : 44 places dans 17 écoles en 2026, surtout des écoles de chimie ; aussi des admissions sur titre.",
        },
        {
          label: "Des écoles visées",
          value: "ECPM Strasbourg, Chimie ParisTech, CPE Lyon, ENSCM Montpellier, ENSGTI Pau, EIL Côte d'Opale.",
        },
      ],
      sources: [
        "https://www.onisep.fr/formation/apres-le-bac-les-etudes-superieures/les-principales-filieres-d-etudes-superieures/les-cpge-classes-preparatoires-aux-grandes-ecoles/les-prepas-scientifiques/la-prepa-tpc-technologie-physique-et-chimie",
        "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=8165",
        "https://www.concours-commun-inp.fr/fr/les-ecoles/les-places-dans-les-ecoles/places-tpc.html",
      ],
    },
  ],
  sources: [ONISEP_PREPAS],
};

const MOTS_PREPA: Groupe = {
  id: "mots-prepa",
  titre: "Les mots de la prépa",
  accroche: "Les mots de la prépa",
  popup: false,
  elements: [
    {
      id: "mot-colle",
      chip: "Colle",
      titre: "Colle, ou khôlle",
      phrase:
        "Une interrogation orale : un professeur interroge un petit groupe d'élèves, souvent trois. Tu en passes deux ou trois par semaine, souvent en fin de journée.",
      details: [],
    },
    {
      id: "mot-ds",
      chip: "DS",
      titre: "Devoir surveillé",
      phrase:
        "Plusieurs heures d'épreuve sur table, dans les conditions des concours, presque chaque semaine, souvent le samedi matin.",
      details: [],
    },
    {
      id: "mot-tipe",
      chip: "TIPE",
      titre: "Travaux d'initiative personnelle encadrés",
      phrase:
        "Un projet scientifique mené sur une année, seul ou en groupe, autour d'un thème annuel. Aux concours, tu le présentes en 15 minutes, puis tu échanges avec le jury.",
      details: [],
    },
    {
      id: "mot-etoile",
      chip: "MP*",
      titre: "Classe étoilée",
      phrase:
        "En 2e année, les classes étoilées (MP*, PC*, PSI*…) regroupent des élèves retenus sur leurs résultats, pour un entraînement plus poussé aux concours.",
      details: [],
    },
    {
      id: "mot-cinq-demis",
      chip: "5/2",
      titre: "Trois demis, cinq demis",
      phrase:
        "Un « 3/2 » est en 2e année ; un « 5/2 » refait sa 2e année pour repasser les concours un an plus tard. Un élève de prépa scientifique est un « taupin ».",
      details: [],
    },
    {
      id: "mot-ects",
      chip: "ECTS",
      titre: "Crédits européens",
      phrase:
        "Chaque année de prépa validée vaut 60 crédits, avec l'accord du conseil de classe : de quoi rejoindre une 2e ou une 3e année de licence. Tu es d'ailleurs inscrit en parallèle dans une université partenaire.",
      details: [],
    },
  ],
  sources: [
    "https://www.letudiant.fr/etudes/classes-prepa/le-lexique-de-la-prepa-scientifique.html",
    "https://www.scei-concours.fr/pdf/TIPE_2027_Attendus_Pedagogiques_final.pdf",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/classe-preparatoire-physique-chimie-et-sciences-de-l-ingenieur-pcsi-1re-annee",
    "https://dossier.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=4920",
    "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=10491&typeBac=0&originePc=0",
  ],
};

const CONCOURS: Groupe = {
  id: "concours",
  titre: "Les banques de concours",
  accroche: "Les concours, banque par banque",
  intro:
    "Une banque réunit plusieurs écoles autour des mêmes écrits. Tu t'inscris en décembre et janvier sur le site commun, le SCEI, tu passes les écrits au printemps, les oraux en juin et juillet, puis tu classes tes écoles.",
  elements: [
    {
      id: "concours-x-ens",
      chip: "X-ENS",
      titre: "Concours X-ENS-ESPCI",
      phrase:
        "Le concours de l'École polytechnique, des quatre ENS et de l'ESPCI : des écrits communs exigeants, puis des oraux propres à chaque école.",
      details: [
        {
          label: "Écoles",
          value: "École polytechnique, ENS Ulm, ENS Paris-Saclay, ENS de Lyon, ENS de Rennes, ESPCI Paris.",
        },
        {
          label: "Filières",
          value:
            "MP, MPI, PC, PSI ; en PT, l'X et les ENS recrutent par la Banque PT, et en BCPST l'X utilise les écrits Agro-Véto.",
        },
        {
          label: "Places",
          value:
            "À l'École polytechnique en 2026 : 431 places pour les candidats français, dont 163 en MP, 131 en PC, 56 en PSI et 22 en MPI.",
        },
        { label: "Calendrier", value: "Écrits à la mi-avril, oraux de juin à mi-juillet, résultats fin juillet." },
      ],
      sources: [X_CONCOURS, "https://thotismedia.com/concours-x-ens-espci/"],
    },
    {
      id: "concours-mines-ponts",
      chip: "Mines-Ponts",
      titre: "Concours commun Mines-Ponts",
      phrase:
        "Le concours des Mines, des Ponts, de l'ISAE-Supaéro, de l'ENSTA, de Télécom Paris et de cinq autres grandes écoles.",
      details: [
        {
          label: "Écoles",
          value:
            "Mines Paris, École des Ponts, ISAE-Supaéro, ENSTA, Télécom Paris, Mines Saint-Étienne, Mines Nancy, IMT Atlantique, ENSAE Paris, Chimie ParisTech.",
        },
        { label: "Filières", value: "MP, MPI, PC, PSI, PT, TSI." },
        {
          label: "Places",
          value: "1 704 en 2026 : 579 en MP, 471 en PSI, 417 en PC, 143 en MPI, 77 en PT, 17 en TSI.",
        },
        {
          label: "Calendrier 2026",
          value:
            "Écrits du 27 au 30 avril, admissibilité le 3 juin, une semaine d'oraux entre le 22 juin et le 18 juillet, résultats le 22 juillet.",
        },
      ],
      sources: [MINES_PONTS],
    },
    {
      id: "concours-centrale",
      chip: "Centrale-Supélec",
      titre: "Concours Centrale-Supélec",
      phrase:
        "Le concours des écoles Centrale et de CentraleSupélec, partagé avec Arts et Métiers, SupOptique, l'ESTP ou l'École navale.",
      details: [
        {
          label: "Écoles",
          value:
            "13 établissements, dont CentraleSupélec, Centrale Lyon, Centrale Lille, Centrale Nantes, Centrale Méditerranée, Arts et Métiers, SupOptique, l'École navale, l'ENSEA et l'ESTP.",
        },
        { label: "Filières", value: "MP, MPI, PC, PSI, TSI ; les élèves de PT passent par la Banque PT." },
        { label: "Places", value: "Environ 3 500 en 2026, pour près de 15 000 candidats." },
        { label: "Calendrier 2026", value: "Écrits du 4 au 7 mai, oraux du 22 juin au 19 juillet." },
      ],
      sources: [CENTRALE, MINES_TELECOM],
    },
    {
      id: "concours-ccinp",
      chip: "CCINP",
      titre: "Concours commun INP",
      phrase:
        "Le concours qui offre le plus de places : les écoles des INP de Toulouse, Grenoble, Bordeaux, Lorraine et Clermont, et de nombreuses écoles de chimie et d'informatique.",
      details: [
        {
          label: "Écoles",
          value:
            "36 écoles au concours, dont ENSEEIHT, Ensimag, ENSEIRB-MATMECA, ENSIC, ENSAI, CY Tech et CPE Lyon ; environ 44 autres recrutent sur ses notes, dont le Groupe INSA et douze écoles Polytech.",
        },
        { label: "Filières", value: "MP, MPI, PC, PSI, TSI, TPC." },
        {
          label: "Places",
          value:
            "3 356 dans les 36 écoles du concours en 2026, environ 5 000 avec les écoles qui recrutent sur ses notes.",
        },
        {
          label: "Calendrier 2026",
          value:
            "Écrits du 20 au 23 avril, admissibilité le 3 juin, oraux de fin juin à mi-juillet, résultats le 22 juillet.",
        },
      ],
      sources: [CCINP],
    },
    {
      id: "concours-e3a",
      chip: "e3a-Polytech",
      titre: "Concours e3a-Polytech",
      phrase:
        "Une seule inscription pour 67 écoles, dont tout le réseau Polytech, avec des écrits passés en même temps que ceux du CCINP.",
      details: [
        {
          label: "Écoles",
          value:
            "Le réseau Polytech, les écoles des concours Avenir Prépas et Ingeni'Up, IMT Nord Europe, l'Isep, l'ESTIA, l'ENSAIT, Efrei…",
        },
        { label: "Filières", value: "MP, MPI, PC, PSI." },
        { label: "Places", value: "Plus de 2 300 en 2026." },
        { label: "Calendrier 2026", value: "Écrits du 21 au 24 avril, oraux de mi-juin à mi-juillet." },
      ],
      sources: ["https://www.e3a-polytech.fr/le-concours/"],
    },
    {
      id: "concours-mines-telecom",
      chip: "Mines-Télécom",
      titre: "Concours Mines-Télécom",
      phrase:
        "Le concours d'une vingtaine d'écoles du numérique, de l'aéronautique et de l'industrie, avec des écrits partagés avec d'autres banques.",
      details: [
        {
          label: "Écoles",
          value:
            "IMT Mines Albi, IMT Mines Alès, IMT Nord Europe, Télécom SudParis, ENAC, ENTPE, ISAE-ENSMA, ISAE-Supméca, Télécom Nancy, ENSIIE, EURECOM…",
        },
        { label: "Filières", value: "MP, MPI, PC, PSI, PT, TSI, BCPST." },
        { label: "Places", value: "2 237 en 2026, dont 827 en MP et 600 en PSI." },
        {
          label: "Calendrier 2026",
          value:
            "Écrits partagés avec Mines-Ponts, Centrale-Supélec ou la Banque PT, de fin avril à mi-mai ; oraux de fin juin à mi-juillet, classement le 22 juillet.",
        },
      ],
      sources: [MINES_TELECOM],
    },
    {
      id: "concours-pt",
      chip: "Banque PT",
      titre: "Banque filière PT",
      phrase:
        "La banque d'épreuves des élèves de PT : une seule série d'écrits ouvre les portes d'Arts et Métiers et de nombreuses grandes écoles.",
      details: [
        {
          label: "Écoles",
          value:
            "Arts et Métiers, École polytechnique, ENS Paris-Saclay, ENS Rennes, les écoles Centrale, Mines Paris, École des Ponts, ISAE-Supaéro, ENSTA, Télécom Paris, Groupe INSA…",
        },
        {
          label: "Places",
          value:
            "En 2026 : 540 à Arts et Métiers, 120 au Groupe INSA, 105 à l'ESTP, 37 à l'ENS Paris-Saclay, 24 à Centrale Lyon, 18 à l'École des Ponts, 10 à l'École polytechnique.",
        },
        {
          label: "Calendrier 2026",
          value: "13 épreuves écrites du 27 avril au 7 mai, admissibilité le 6 juin, oraux de fin juin à mi-juillet.",
        },
      ],
      sources: [BANQUE_PT],
    },
    {
      id: "concours-agro-veto",
      chip: "Agro-Véto",
      titre: "Concours Agro-Véto",
      phrase:
        "La porte d'entrée des écoles d'agronomie, d'agroalimentaire et des quatre écoles vétérinaires publiques.",
      details: [
        {
          label: "Écoles",
          value:
            "AgroParisTech, l'Institut Agro (Montpellier, Rennes-Angers, Dijon), l'ENSAT, Bordeaux Sciences Agro, l'ENSAIA, Oniris, VetAgro Sup, les écoles vétérinaires d'Alfort et de Toulouse.",
        },
        { label: "Filières", value: "BCPST ; la voie TB a son propre concours." },
        {
          label: "Places",
          value: "En 2026 : 1 085 en agronomie, 268 dans les quatre écoles vétérinaires, soit 67 par école.",
        },
        {
          label: "Calendrier 2026",
          value: "Écrits du 27 au 30 avril, oraux et épreuves pratiques du 18 juin au 11 juillet.",
        },
      ],
      sources: [AGRO_VETO],
    },
    {
      id: "concours-g2e",
      chip: "G2E",
      titre: "Concours G2E : géologie, eau, environnement",
      phrase: "Pour les élèves de BCPST attirés par les sciences de la Terre, l'eau, l'environnement et la météo.",
      details: [
        {
          label: "Écoles",
          value:
            "ENSG Nancy, ENTPE, ENGEES, EOST, ENSEGID, IMT Mines Albi, IMT Mines Alès, IMT Nord Europe, l'École nationale de la météorologie, Geodata Paris…",
        },
        { label: "Places", value: "257 en 2026 ; tous les candidats passent les oraux." },
        { label: "Calendrier 2026", value: "Écrits les 11, 12 et 13 mai, oraux du 22 juin au 10 juillet." },
      ],
      sources: [
        "https://concoursg2e.univ-lorraine.fr/wp-content/uploads/2025/11/notice-dinscription-2026_g2e.pdf",
        "https://concoursg2e.univ-lorraine.fr/presentation-du-concours/",
      ],
    },
  ],
};

const ATS: Groupe = {
  id: "ats",
  titre: "La prépa ATS, vers une école d'ingénieurs",
  accroche: "Après un BTS ou un BUT, un an pour viser une école d'ingénieurs",
  elements: [
    {
      id: "prepa-ats",
      chip: "ATS",
      titre: "Adaptation technicien supérieur",
      phrase:
        "Pour les titulaires d'un BTS ou d'un BUT qui veulent entrer en école d'ingénieurs après une année de prépa intensive.",
      details: [
        {
          label: "Pour qui",
          value:
            "Après un BTS, ou deux à trois années de BUT scientifique. Environ la moitié des élèves sont boursiers.",
        },
        {
          label: "Au programme",
          value:
            "Maths, physique, sciences industrielles, langues et culture générale, avec des colles et des devoirs surveillés ; parcours ingénierie industrielle, génie civil ou métiers de la chimie.",
        },
        {
          label: "Concours",
          value:
            "Le concours ATS ouvre une cinquantaine d'écoles, dont Arts et Métiers, Centrale Lille, CentraleSupélec et l'ENSEA. En 2026 : écrits les 4, 5 et 6 mai, oraux à partir du 22 juin, et une deuxième voie d'intégration sur dossier.",
        },
        {
          label: "Vers l'agronomie",
          value:
            "Une prépa d'un an après un BTSA, un BTS ou un BUT mène aussi aux écoles d'agronomie et aux écoles vétérinaires : en 2026, celles-ci réservaient 52 places aux BTS et BTSA et 46 aux BUT.",
        },
      ],
      sources: [
        ONISEP_PREPAS,
        ATS_AM,
        "https://www.letudiant.fr/etudes/classes-prepa/ecoles-dingenieurs-le-concours-ats-propose-une-deuxieme-voie-dintegration-en-2026.html",
        "https://www.letudiant.fr/etudes/ecole-ingenieur/admissions-ecoles-voies-dacces-tout-savoir-sur-les-concours-communs-agro-veto.html",
      ],
    },
  ],
};

const BUT: Groupe = {
  id: "but-specialites",
  titre: "Les 24 spécialités de BUT",
  accroche: "24 spécialités, de l'informatique au droit",
  intro:
    "Le BUT compte 24 spécialités, découpées en 85 parcours. Chaque IUT adapte un tiers de la formation, et des semaines de stage s'ajoutent aux cours.",
  elements: [
    {
      id: "but-cj",
      cle: "Carrières juridiques",
      chip: "CJ",
      titre: "Carrières juridiques",
      phrase:
        "Tu y apprends le droit, avec de l'économie, de la gestion et de la rédaction d'actes, pour devenir assistant juridique, clerc de notaire ou chargé de clientèle en banque ou en assurance.",
      details: [],
    },
    {
      id: "but-cs",
      cle: "Carrières sociales",
      chip: "CS",
      titre: "Carrières sociales",
      phrase:
        "Tu te formes à l'intervention sociale et culturelle (éducation spécialisée, animation, assistance sociale, gestion d'établissements), pour devenir animateur, médiateur social, assistant de service social ou gestionnaire d'établissement.",
      details: [],
    },
    {
      id: "but-chimie",
      cle: "BUT Chimie",
      chip: "Chimie",
      titre: "Chimie",
      phrase:
        "Tu apprends les techniques de laboratoire, l'analyse, le contrôle qualité et la production, avec les règles de sécurité et d'environnement, pour devenir technicien chimiste, assistant ingénieur ou technico-commercial.",
      details: [],
    },
    {
      id: "but-gb",
      cle: "Génie biologique",
      chip: "GB",
      titre: "Génie biologique",
      phrase:
        "Tu étudies le vivant (santé, biotechnologies, alimentation, agronomie, environnement) par l'expérience et l'analyse de données, pour devenir technicien de laboratoire, technicien qualité, diététicien ou assistant ingénieur.",
      details: [],
    },
    {
      id: "but-gcgp",
      cle: "Génie chimique",
      chip: "GCGP",
      titre: "Génie chimique, génie des procédés",
      phrase:
        "Tu apprends à concevoir et à piloter les procédés qui transforment la matière et l'énergie, comme la distillation ou l'extraction, pour travailler en laboratoire, en bureau d'études ou en fabrication.",
      details: [],
    },
    {
      id: "but-gccd",
      cle: "Génie civil",
      chip: "GCCD",
      titre: "Génie civil - construction durable",
      phrase:
        "Tu apprends à concevoir et à construire bâtiments et ouvrages de travaux publics (matériaux, structures, confort, maquette numérique BIM), pour devenir conducteur de travaux, chef de chantier, projeteur ou coordinateur BIM.",
      details: [],
    },
    {
      id: "but-geii",
      cle: "Génie électrique",
      chip: "GEII",
      titre: "Génie électrique et informatique industrielle",
      phrase:
        "Tu travailles l'électricité, l'électronique, l'automatisme et les réseaux industriels, pour devenir électronicien, électrotechnicien, automaticien, roboticien ou technicien de maintenance.",
      details: [],
    },
    {
      id: "but-gim",
      cle: "Génie industriel",
      chip: "GIM",
      titre: "Génie industriel et maintenance",
      phrase:
        "Tu apprends à installer, maintenir et améliorer des équipements industriels qui mêlent mécanique, électricité et thermique, pour travailler en maintenance, en qualité, en sûreté de fonctionnement ou en maîtrise de l'énergie.",
      details: [],
    },
    {
      id: "but-gmp",
      cle: "Génie mécanique",
      chip: "GMP",
      titre: "Génie mécanique et productique",
      phrase:
        "Tu suis un produit mécanique de sa conception à sa fabrication (dessin, simulation numérique, méthodes, production), pour travailler en bureau d'études, en industrialisation, en qualité ou en pilotage de production.",
      details: [],
    },
    {
      id: "but-gaco",
      cle: "Gestion administrative",
      chip: "GACO",
      titre: "Gestion administrative et commerciale des organisations",
      phrase:
        "Tu te formes à la gestion, au commerce, au marketing, aux ressources humaines et à la conduite de projets, pour devenir assistant de direction, assistant commercial ou marketing, assistant RH ou chef de projet.",
      details: [],
    },
    {
      id: "but-gea",
      cle: "Gestion des entreprises",
      chip: "GEA",
      titre: "Gestion des entreprises et des administrations",
      phrase:
        "Tu apprends la comptabilité, la finance, le droit, la fiscalité, le management et la gestion des ressources humaines, pour devenir assistant de gestion en PME, assistant de direction ou chargé de clientèle.",
      details: [],
    },
    {
      id: "but-hse",
      cle: "Hygiène",
      chip: "HSE",
      titre: "Hygiène, sécurité, environnement",
      phrase:
        "Tu étudies la santé et la sécurité au travail et l'impact des activités sur l'environnement (droit, ergonomie, analyse des risques), pour devenir préventeur HSE, coordonnateur qualité-sécurité-environnement ou inspecteur des risques professionnels.",
      details: [],
    },
    {
      id: "but-info-com",
      cle: "Information communication",
      chip: "Info-Com",
      titre: "Information-communication",
      phrase:
        "Tu te formes à la communication des organisations, à la publicité, au journalisme, à l'information numérique ou aux métiers du livre, pour devenir concepteur-rédacteur, chef de publicité, documentaliste, journaliste ou community manager.",
      details: [],
    },
    {
      id: "but-info",
      cle: "BUT Informatique",
      chip: "Info",
      titre: "Informatique",
      phrase:
        "Tu apprends à développer des applications et des sites web, à administrer systèmes, réseaux et bases de données et à conduire des projets, pour devenir développeur, administrateur systèmes et réseaux ou technicien support.",
      details: [],
    },
    {
      id: "but-mlt",
      cle: "Logistique et des transports",
      chip: "MLT",
      titre: "Management de la logistique et des transports",
      phrase:
        "Tu apprends à organiser les flux de marchandises et d'informations et le transport des personnes (stocks, entrepôts, douane, commerce international), pour devenir logisticien, affréteur, déclarant en douane ou gestionnaire d'entrepôt.",
      details: [],
    },
    {
      id: "but-mp",
      cle: "Mesures physiques",
      chip: "MP",
      titre: "Mesures physiques",
      phrase:
        "Tu apprends à mesurer, contrôler et analyser avec des appareils professionnels (physique, chimie, capteurs, traitement du signal), pour devenir technicien d'essais, de métrologie ou d'instrumentation, en industrie ou en laboratoire.",
      details: [],
    },
    {
      id: "but-mt2e",
      cle: "Efficacité énergétique",
      chip: "MT2E",
      titre: "Métiers de la transition et de l'efficacité énergétiques",
      phrase:
        "Tu apprends à dimensionner, installer et exploiter le chauffage, le froid, la climatisation et les énergies renouvelables, en visant la sobriété énergétique, pour devenir conseiller énergie, technicien frigoriste ou technicien en génie climatique.",
      details: [],
    },
    {
      id: "but-mmi",
      cle: "Multimédia",
      chip: "MMI",
      titre: "Métiers du multimédia et de l'internet",
      phrase:
        "Tu apprends à concevoir des sites web, des contenus multimédias et des stratégies de communication numérique, pour devenir chargé de communication numérique, UX designer, rédacteur web, community manager ou webmestre.",
      details: [],
    },
    {
      id: "but-pec",
      cle: "Packaging",
      chip: "PEC",
      titre: "Packaging, emballage et conditionnement",
      phrase:
        "Tu apprends à écoconcevoir des emballages et à organiser leur fabrication en usine, pour devenir concepteur de packaging, technicien packaging ou technicien de contrôle, dans l'agroalimentaire, la cosmétique ou la pharmacie.",
      details: [],
    },
    {
      id: "but-qlio",
      cle: "Qualité, logistique",
      chip: "QLIO",
      titre: "Qualité, logistique industrielle et organisation",
      phrase:
        "Tu apprends à organiser la production, à gérer les flux et les stocks et à piloter la qualité, pour devenir technicien qualité, technicien logistique ou chef d'équipe en fabrication, dans l'industrie comme dans les services.",
      details: [],
    },
    {
      id: "but-r-t",
      cle: "Réseaux et télécommunications",
      chip: "R&T",
      titre: "Réseaux et télécommunications",
      phrase:
        "Tu apprends à installer, administrer et sécuriser les réseaux informatiques et de télécommunications, du cloud aux objets connectés, pour devenir administrateur réseaux, technicien télécoms et réseaux ou technicien de maintenance informatique.",
      details: [],
    },
    {
      id: "but-sd",
      cle: "Science des données",
      chip: "SD",
      titre: "Science des données",
      phrase:
        "Tu apprends à collecter, vérifier, stocker et analyser des données avec la statistique et la programmation, pour aider à la décision comme statisticien, data manager ou développeur, en biostatistique, en gestion ou en marketing.",
      details: [],
    },
    {
      id: "but-sgm",
      cle: "Génie des matériaux",
      chip: "SGM",
      titre: "Science et génie des matériaux",
      phrase:
        "Tu étudies les métaux, polymères, verres, céramiques et composites, leur fabrication, leur mise en forme et leur recyclage, pour travailler en recherche et développement, en atelier de fabrication ou en bureau d'études.",
      details: [],
    },
    {
      id: "but-tc",
      cle: "Techniques de commercialisation",
      chip: "TC",
      titre: "Techniques de commercialisation",
      phrase:
        "Tu apprends le marketing, la vente, la négociation et la relation client, aussi en langue étrangère, pour devenir attaché commercial, chargé de clientèle, chef de rayon, responsable export ou chargé d'études.",
      details: [],
    },
  ],
  sources: [
    "https://enseignementsup-recherche.gouv.fr/fr/licence-professionnellebut-86602",
    "https://www.cio-brest.ac-rennes.fr/sites/cio-brest.ac-rennes.fr/IMG/pdf/les_but_en_bretagne-1.pdf",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-mesures-physiques-parcours-techniques-d-instrumentation",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-metiers-du-multimedia-et-de-l-internet-parcours-strategie-de-communication-numerique-et-design-d-experience",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-packaging-emballage-et-conditionnement-parcours-eco-conception-et-industrialisation",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-qualite-logistique-industrielle-et-organisation-parcours-qualite-et-management-integre",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-reseaux-et-telecommunications-parcours-cybersecurite",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-science-des-donnees-parcours-exploration-et-modelisation-statistique",
    "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/but-science-et-genie-des-materiaux-parcours-metiers-de-l-ingenierie-des-materiaux-et-des-produits",
    "https://iut.univ-avignon.fr/wp-content/uploads/sites/2/2025/01/Plaquette-IUT-BUT-Techniques-de-commercialisation-1.pdf",
  ],
};

/** Les groupes de chaque étape, par identifiant d'étape. */
export const GROUPES: Record<string, Groupe[]> = etTypo({
  "prepa-scientifique": [PREPAS, MOTS_PREPA],
  "concours-ingenieurs": [CONCOURS],
  "bts-but": [BUT],
  "but-lp": [ATS],
});
