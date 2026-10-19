/**
 * Les écoles d'ingénieurs : fiches vérifiées en octobre 2026, générées depuis la recherche documentaire
 * du projet. Ce module garde l'essentiel (statut, recrutement, alternance, accroche) ; les textes
 * entiers, les chiffres et les sources sont dans ecoles-details.ts, chargé à l'ouverture d'une fiche.
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
    accroche:
      "Tu vises la recherche, l'industrie de pointe ou le service de l'État : à la sortie, environ 53 % des diplômés partent en entreprise, 34 % préparent un doctorat et 15 % rejoignent un corps de l'État.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 1,
    uneVoie: "prepa",
  },
  "ens-ulm": {
    accroche:
      "Tu rêves de recherche ou d'enseignement supérieur : chaque année, environ 170 normaliens scientifiques sortent de l'École, et 75 % d'entre eux préparent une thèse après leur master.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 2,
    uneVoie: "prepa",
    short: "ENS Ulm",
  },
  "ens-paris-saclay": {
    accroche:
      "Tu vises la recherche ou l'enseignement, y compris en sciences de l'ingénieur : 69 % des normaliens poursuivent en thèse (enquête 2022), et l'École prépare à l'agrégation.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 13,
    uneVoie: "prepa",
  },
  "ens-lyon": {
    accroche:
      "Tu te destines à l'enseignement ou à la recherche : le diplôme de l'ENS de Lyon y prépare d'abord, et ouvre aussi l'administration et l'entreprise.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 14,
    uneVoie: "prepa",
  },
  espci: {
    accroche:
      "Tu aimes la physique, la chimie et la biologie au labo : environ la moitié du temps de 1re et 2e années se passe en activités expérimentales.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 16,
    uneVoie: "prepa",
  },
  mines: {
    accroche:
      "Tu vises l'industrie, l'énergie, le conseil ou la recherche : 70 % des diplômés 2024 ont trouvé leur premier emploi avant la fin des études, 85 % en CDI, pour un salaire brut moyen de 56 890 € en France ; 13 % préparent un doctorat.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours Mines-Ponts",
    uneRang: 3,
    uneVoie: "prepa",
  },
  ponts: {
    accroche:
      "Tu veux bâtir des villes, des transports et des ouvrages, ou travailler dans l'industrie, le conseil ou la finance : 95 % des diplômés 2025 ont un emploi à 6 mois, pour un salaire brut annuel moyen de 57 545 € primes comprises.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours Mines-Ponts",
    uneRang: 4,
    uneVoie: "prepa",
  },
  supaero: {
    accroche:
      "37 % des employeurs de ses diplômés travaillent dans l'aérospatial et la défense : Airbus, Safran, Thales, Dassault, la DGA, MBDA, ArianeGroup.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Ingénieur de spécialité génie industriel pour l'aéronautique et l'espace : 3 ans en apprentissage, après un BUT, une prépa ATS ou une licence 3",
    une: "Concours Mines-Ponts",
    uneRang: 6,
    uneVoie: "prepa",
  },
  ensta: {
    accroche:
      "Ses diplômés travaillent dans la défense, l'énergie (dont le nucléaire), les transports, le maritime, le numérique et la santé.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Cycle généraliste en apprentissage en 2e et 3e années ; formations d'ingénieur en apprentissage en conception mécanique et en systèmes embarqués, sur 3 ans",
    une: "Concours Mines-Ponts",
    uneRang: 20,
    uneVoie: "prepa",
  },
  "telecom-paris": {
    accroche:
      "42 % des diplômés 2025 travaillent dans les services numériques, les logiciels et les télécoms, 17 % dans le conseil en stratégie et organisation, et 12 % préparent une thèse.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "FISEA : 1re année en statut étudiant, puis 2 ans d'apprentissage en cybersécurité, IA et science des données, réseaux télécoms et internet des objets ou systèmes embarqués",
    une: "Concours Mines-Ponts",
    uneRang: 21,
    uneVoie: "prepa",
  },
  ensae: {
    accroche:
      "Pour la promotion 2023 : taux net d'emploi de 94 %, 73 % embauchés avant même le diplôme, 56 500 € bruts par an primes comprises au premier emploi en France.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance: "Le stage de fin d'études de 3e année peut commencer en alternance pendant l'année",
    une: "Concours Mines-Ponts",
    uneRang: 22,
    uneVoie: "prepa",
  },
  centralesupelec: {
    accroche:
      "Promotion 2023 : 80 % des diplômés trouvent un emploi avant la sortie de l'école, 20 % sont embauchés à l'étranger, avec un salaire brut moyen de 53 800 € par an primes comprises.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Cursus généraliste en apprentissage sur 3 ans ou sur les 2 dernières années, 1re année à Metz ou à Rennes ; 85 places en 2026",
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 5,
    uneVoie: "prepa",
  },
  "centrale-nantes": {
    accroche:
      "Promotion 2025 : 32 % des diplômés travaillent dans le conseil et l'ingénierie, 25 % dans le numérique, 14 % dans l'industrie des transports, 7 % dans l'énergie.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "Apprentissage sur 3 ans (choix en 1re année) ou sur 2 ans (choix en 2e), ou 1 an en contrat de professionnalisation ; salaire de 600 à 1 500 € par mois",
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 26,
    uneVoie: "prepa",
  },
  "imt-atlantique": {
    accroche: "IMT Atlantique forme des ingénieurs du numérique, de l'énergie et de l'industrie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Quatre diplômes d'ingénieur en apprentissage sur 3 ans, 50 % du temps en entreprise : Informatique, réseaux et télécommunications ; Ingénierie logicielle ; Transformation digitale des systèmes industriels (génie industriel) ; Écologie industrielle et décarbonation (ouverture en 2026). Entrée après un BUT 2 ou 3, un BTS, une L3 ou une prépa ATS. Cursus généraliste : contrat de professionnalisation possible en 3e année.",
    une: "Concours Mines-Ponts",
    uneRang: 30,
    uneVoie: "prepa",
  },
  utt: {
    accroche:
      "Pour un métier d'ingénieur ouvert : chef de projet, consultant, développeur, sécurité informatique, R&D.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Dès la 3e année en Matériaux et mécanique ; dès la 4e en Génie industriel, Génie mécanique et Systèmes numériques",
  },
  insa: {
    accroche:
      "L'INSA Lyon ouvre la plus grande promotion de 1re année des écoles d'ingénieurs sur Parcoursup : 665 places en 2026.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Possible après la 1re année : biotechnologies, génie industriel, génie mécanique, informatique, télécoms, génie électrique (ITII)",
    une: "Taux d'accès Parcoursup 2025 : 12 %",
    uneRang: 12,
    uneVoie: "postbac",
  },
  utc: {
    accroche:
      "Selon l'école, 97,2 % des diplômés ont un emploi, trouvé en 1 mois en moyenne, et 61,5 % sont embauchés avant même leur sortie.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Dès la 3e année en ingénierie mécanique et en informatique ; en génie des procédés en 3e année du cycle ingénieur",
    une: "Taux d'accès Parcoursup 2025 : 22 %",
    uneRang: 22,
    uneVoie: "postbac",
  },
  utbm: {
    accroche:
      "L'UTBM forme des ingénieurs pour l'industrie : production, méthodes et logistique (28,5 % des postes), bureau d'études (26,5 %), informatique.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Dès la 3e année : mécanique et transports, énergie et génie électrique, informatique, logistique industrielle",
  },
  "reseau-polytech": {
    accroche:
      "Seize écoles publiques d'ingénieurs, au sein des universités, qui forment 10 % des ingénieurs diplômés en France.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance: "Dès la 1re année du cycle ingénieur (3e année après le bac), avec un contrat de 2 ou 3 ans",
  },
  "prepa-des-inp": {
    accroche:
      "La Prépa des INP te mène en deux ans, sur contrôle continu, à l'une des plus de 40 écoles du Groupe INP et de ses partenaires.",
    statut: "public",
    recrutement: ["postbac"],
    alternance: "Prépa sous statut étudiant ; l'apprentissage dépend ensuite de l'école d'ingénieurs obtenue",
  },
  epf: {
    accroche: "Une formation d'ingénieur généraliste : tu choisis ton domaine en 4e année seulement.",
    statut: "eespig",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "4e et 5e années en apprentissage, gratuites et rémunérées ; contrat de professionnalisation possible en 5e année",
  },
  epita: {
    accroche: "L'EPITA forme des ingénieurs en informatique.",
    statut: "prive",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur en apprentissage après une L2, une L3, un BUT ou un bachelor ; 5 majeures ; 2 semaines à l'école, 2 en entreprise",
  },
  "esiee-paris": {
    accroche:
      "ESIEE Paris forme des ingénieurs du numérique, de l'électronique et de l'industrie : informatique, cybersécurité, data et IA, systèmes embarqués, santé numérique, énergie, génie civil.",
    recrutement: ["titre", "postbac", "prepa"],
    alternance:
      "Cycle ingénieur en apprentissage dès la 1re année, après un bac + 2 ou le premier cycle : 418 places dans 10 filières, de l'IA au génie civil",
  },
  ipsa: {
    accroche:
      "L'IPSA forme des ingénieurs pour l'aéronautique et le spatial : 85 % des jeunes diplômés y travaillent, ou dans les nouvelles mobilités, chez Airbus, Safran, Dassault Aviation, Thales, ArianeGroup, au CNES ou à la DGA.",
    statut: "prive",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Aéro 3 à Aéro 5 en apprentissage à Paris-Ivry, après un bac + 2 ou l'Aéro 2 ; systèmes autonomes ou propulsion ; 3 semaines école, 3 semaines entreprise",
  },
  estaca: {
    accroche:
      "L'ESTACA forme des ingénieurs des transports : aéronautique, automobile, ferroviaire, spatial et naval, pour la R&D, la production, la qualité, le conseil ou les achats.",
    statut: "eespig",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Deux diplômes par apprentissage : véhicules, systèmes autonomes et connectés ; génie industriel pour l'aéronautique et l'espace. 5e année possible en alternance",
  },
  icam: {
    accroche:
      "Tu vises un poste d'ingénieur généraliste dans l'industrie : mécanique, génie électrique, automatique, énergie.",
    statut: "eespig",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur Icam sous statut apprenti (ingénieur généraliste), de la 3e à la 5e année, à Lille, Grand Paris Sud, Bretagne, Vendée et Toulouse, après la prépa professionnalisante ou un bac+2. Rythme : 1 mois / 1 mois en 3e année, 3 mois / 3 mois en 4e, 6 mois / 6 mois en 5e, dont 11 semaines à l'étranger. À Strasbourg-Europe : ingénieur spécialisé Systèmes numériques industriels, en apprentissage.",
  },
  "arts-et-metiers": {
    accroche:
      "Arts et Métiers forme des ingénieurs de l'industrie : 35 % des jeunes diplômés travaillent en production, exploitation, méthodes, qualité ou maintenance, 23 % en R&D et innovation.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Programme Grande École en apprentissage dès la 1re année, à Angers et Paris : 24 places par campus (rentrée 2025), 60 % du temps en entreprise",
  },
  navale: {
    accroche: "Tu y deviens officier de la Marine nationale.",
    statut: "public",
    recrutement: ["prepa", "titre"],
  },
  agroparistech: {
    accroche:
      "Les ingénieurs AgroParisTech travaillent dans le conseil, l'agroalimentaire, la recherche, les administrations, la forêt ou l'environnement.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Sur les trois ans (concours dédié après un BTSA, un BTS, un BUT ou une licence pro) ou sur les deux dernières années ; 50 places au concours 2026",
  },
});

/** Les nouvelles écoles. */
export const ecolesIngenieurs: Ecole[] = etTypo<Ecole[]>([
  {
    id: "ens-rennes",
    name: "École normale supérieure de Rennes",
    short: "ENS Rennes",
    line: "sciences",
    ville: "Bruz (Ille-et-Vilaine), campus de Ker Lann",
    kind: "École normale supérieure",
    acces: "Prépa MP, MPI, PSI, PT, TSI, ATS ou 2SEP, puis concours ENS ; aussi concours de 2e année (L3, M1)",
    duree: "4 ans après le concours de 1re année",
    places: "Environ 65 élèves fonctionnaires stagiaires recrutés chaque année par concours",
    cout: "Normaliens élèves : environ 1 800 € bruts par mois, contre un engagement décennal",
    formations:
      "Le diplôme de l'ENS Rennes (grade de master) repose sur quatre compétences : recherche, avec des stages en laboratoire et un master recherche ; pluridisciplinarité ; pédagogie, qui prépare à l'agrégation ; international, avec des stages longs à l'étranger.",
    debouches:
      "Tu vises l'enseignement supérieur ou la recherche : 70 % des élèves poursuivent en thèse, et l'école affiche 83 % de réussite à l'agrégation.",
    plus: "Ses concours s'ouvrent aux filières PSI, PT, TSI et ATS en plus de MP et MPI, avec un département de mécatronique et un département de sciences du sport (concours 2SEP).",
    station: "ecole-ingenieurs",
    url: "https://www.ens-rennes.fr/",
    accroche:
      "Tu vises l'enseignement supérieur ou la recherche : 70 % des élèves poursuivent en thèse, et l'école affiche 83 % de réussite à l'agrégation.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 15,
    uneVoie: "prepa",
  },
  {
    id: "centrale-lyon",
    name: "École centrale de Lyon",
    short: "Centrale Lyon",
    line: "sciences",
    ville: "Écully (près de Lyon) et Saint-Étienne",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, TSI, puis concours Centrale-Supélec ; aussi PT, sur titre ou après le bac (CapECL)",
    duree: "3 ans après 2 années de prépa",
    places: "286 places au concours Centrale-Supélec 2026, dont 127 en MP ; 24 places après le CapECL",
    cout: "Depuis 2026, jusqu'à 4 113 € par an selon le revenu ; CapECL : 630 € en 2026-2027 ; gratuit pour les boursiers",
    formations:
      "1re année de tronc commun (sciences, humanités, économie), projets en équipe et stage d'exécution de 4 semaines.",
    debouches:
      "Ses diplômés partent surtout dans les technologies de l'information (18 %), l'énergie (18 %), le conseil et les bureaux d'études (12 %), la finance (11 %) et les industries de transport, de l'automobile à l'aéronautique (9 %).",
    plus: "Doubles cursus : architecte avec l'école d'architecture de Lyon dès la 1re année, médecin avec les Hospices civils de Lyon dès la 2e, manager avec emlyon.",
    station: "ecole-ingenieurs",
    url: "https://www.ec-lyon.fr",
    accroche:
      "Ses diplômés partent surtout dans les technologies de l'information (18 %), l'énergie (18 %), le conseil et les bureaux d'études (12 %), la finance (11 %) et les industries de transport, de l'automobile à l'aéronautique (9 %).",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "Ingénieur de spécialité Énergie : 3 ans en apprentissage à Écully, avec l'ITII de Lyon, après un BUT, un BTS, une licence ou une prépa ATS ; 28 places en 2025",
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 24,
    uneVoie: "prepa",
  },
  {
    id: "centrale-lille",
    name: "École Centrale de Lille",
    short: "Centrale Lille",
    line: "sciences",
    ville: "Villeneuve-d'Ascq ; IG2I à Lens",
    kind: "École d'ingénieurs publique",
    acces:
      "Prépa MP, MPI, PC, PSI, TSI, puis concours Centrale-Supélec ; PT, ATS, sur titre ; ITEEM et IG2I après le bac",
    duree: "3 ans après 2 années de prépa",
    places: "205 places au concours Centrale-Supélec 2026 : 90 en MP, 60 en PSI, 45 en PC, 10 en MPI",
    cout: "Depuis 2026, de 1 500 à 4 500 € par an selon le revenu, fixés pour toute la scolarité ; boursiers du Crous exonérés",
    formations:
      "Deux ans de socle commun : sciences, économie, humanités, développement durable, et un projet d'équipe de 18 mois pour une entreprise ou un laboratoire.",
    debouches:
      "Le conseil et les bureaux d'études emploient 38,9 % des jeunes diplômés, l'informatique 19,4 %, la finance 7,4 %, l'énergie 6,5 %.",
    plus: "Le projet de 18 mois, mené en équipe d'une dizaine d'élèves pour une entreprise ou un laboratoire, structure les deux premières années.",
    station: "ecole-ingenieurs",
    url: "https://centralelille.fr",
    accroche:
      "Le conseil et les bureaux d'études emploient 38,9 % des jeunes diplômés, l'informatique 19,4 %, la finance 7,4 %, l'énergie 6,5 %.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "3e année possible en contrat de professionnalisation de 12 à 14 mois, droits offerts, salaire d'au moins 80 % du Smic",
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 25,
    uneVoie: "prepa",
  },
  {
    id: "centrale-mediterranee",
    name: "Centrale Méditerranée",
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
      "Trois semestres de socle scientifique commun, rythmés par 4 semaines de cours puis 1 semaine d'activités en entreprise.",
    debouches: "Centrale Méditerranée forme des ingénieurs généralistes pour l'industrie, le conseil et la recherche.",
    plus: "Chaque élève vit une alternance dès la 1re année : en entreprise comme apprenti, en laboratoire de recherche ou en création d'entreprise (« 100 % des élèves sont alternants »).",
    station: "ecole-ingenieurs",
    url: "https://www.centrale-mediterranee.fr",
    accroche: "Centrale Méditerranée forme des ingénieurs généralistes pour l'industrie, le conseil et la recherche.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Apprentissage possible dès la 1re année et sur les 3 ans du cursus, pour le même diplôme d'ingénieur généraliste. Après l'admission, les entreprises choisissent leurs apprentis lors d'un job dating. Temps en entreprise : 40 à 45 % en 1re année, jusqu'à 65 % en 2e et 3e années ; 9 semaines consécutives à l'étranger au semestre 8 ; CFA Formasup Méditerranée.",
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 27,
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
    formations: "1re année : socle scientifique, technique et humain, stage opérateur de 4 semaines.",
    debouches:
      "Mines Saint-Étienne forme des ingénieurs généralistes pour l'industrie, l'énergie, la santé, la data et la finance.",
    plus: "80 % du cursus ICM est au choix, et 75 % des élèves préparent un double diplôme en 3e année, en France ou à l'étranger.",
    station: "ecole-ingenieurs",
    url: "https://www.mines-stetienne.fr",
    accroche:
      "Mines Saint-Étienne forme des ingénieurs généralistes pour l'industrie, l'énergie, la santé, la data et la finance.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Quatre diplômes d'ingénieur de spécialité en alternance sur 3 ans, avec l'ISTP à Saint-Étienne : génie industriel (IGI), génie nucléaire (IGN), systèmes électroniques embarqués (ISEE), ingénierie énergétique (ISE). Entrée après un bac + 2 ou un bac + 3 scientifique ou technologique, sous statut d'apprenti ou de salarié. ICM : contrat de professionnalisation possible en dernière année.",
    une: "Concours Mines-Ponts",
    uneRang: 28,
    uneVoie: "prepa",
  },
  {
    id: "mines-nancy",
    name: "École nationale supérieure des mines de Nancy",
    short: "Mines Nancy",
    line: "sciences",
    ville: "Nancy (campus Artem) ; Saint-Dié-des-Vosges pour le diplôme en apprentissage Ingénierie de la conception",
    kind: "École d'ingénieurs publique",
    acces:
      "Concours commun Mines-Ponts (MP, MPI, PC, PSI, PT, TSI) ; La Prépa des INP ; CUPGE ; admission sur titre pour les étudiants de licence (GEI-UNIV) ; admissions après un BUT ou un BTS pour les diplômes de spécialité.",
    duree: "3 ans après bac + 2",
    places:
      "Concours Mines-Ponts 2026 : 141 places (46 MP, 12 MPI, 36 PC, 40 PSI, 6 PT, 1 TSI). S'y ajoutent 7 places pour La Prépa des INP, 10 pour la CUPGE et 10 sur titre via GEI-UNIV (5 en 1re année, 5 en 2e année).",
    cout: "2 613 € par an pour les élèves de l'Union européenne (notice du concours 2026), montant fixé chaque année par le ministère ; boursiers exonérés.",
    formations: "1re année : tronc commun scientifique et managérial, stage opérateur d'un mois.",
    debouches:
      "Mines Nancy forme des ingénieurs généralistes pour l'énergie, le numérique, les matériaux, le génie civil et l'industrie.",
    plus: "Avec l'alliance Artem, tu mènes en 2e année un projet un jour par semaine avec des étudiants en art et en management de Nancy.",
    station: "ecole-ingenieurs",
    url: "https://mines-nancy.univ-lorraine.fr",
    accroche:
      "Mines Nancy forme des ingénieurs généralistes pour l'énergie, le numérique, les matériaux, le génie civil et l'industrie.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "Le cursus ICM se suit sous statut étudiant. L'école propose un diplôme d'ingénieur de spécialité Génie mécanique, parcours Ingénierie de la conception, en apprentissage sur 3 ans à Saint-Dié-des-Vosges, avec les CFAI et l'ITII de Lorraine. Contrat de professionnalisation possible en 3e année du diplôme Génie industriel et matériaux.",
    une: "Concours Mines-Ponts",
    uneRang: 29,
    uneVoie: "prepa",
  },
  {
    id: "supoptique",
    name: "Institut d'Optique Graduate School",
    short: "SupOptique (IOGS)",
    line: "sciences",
    ville:
      "Palaiseau (1re année, campus de l'École polytechnique) ; Bordeaux-Talence et Saint-Étienne en 2e et 3e années",
    kind: "École d'ingénieurs privée reconnue par l'État",
    acces:
      "Concours Centrale-Supélec (MP, MPI, PC, PSI, TSI) ; Banque PT pour la filière PT ; GEI-UNIV après un bac + 3 ou un bac + 4 ; admission sur dossier et épreuves après une L2 de physique, un BTS ou un BUT.",
    duree: "3 ans après bac + 2",
    places:
      "Concours 2026 : 124 places en MP, MPI, PC et PSI, soit 32 MP, 8 MPI, 50 PC, 28 PSI et 6 places pour des candidats étrangers, plus 15 places en PT. TSI : 1 place en 2025. GEI-UNIV 2026 : 10 places après un bac + 3, 5 après un bac + 4. Voie sur dossier : 20 places à Palaiseau en 2025.",
    cout: "3 200 € par an en 2026, soit 9 600 € pour les 3 ans ; frais réduits selon l'échelon de bourse sur critères sociaux.",
    formations: "La 1re année, commune, se passe à Palaiseau.",
    debouches:
      "SupOptique forme des ingénieurs de l'optique et de la photonique : systèmes optiques, imagerie, vision artificielle, nanosciences.",
    plus: "Une école tout entière consacrée à l'optique, fondée en 1917, adossée à trois laboratoires : Charles Fabry à Palaiseau, LP2N à Bordeaux, Hubert Curien à Saint-Étienne.",
    station: "ecole-ingenieurs",
    url: "https://www.institutoptique.fr",
    accroche:
      "SupOptique forme des ingénieurs de l'optique et de la photonique : systèmes optiques, imagerie, vision artificielle, nanosciences.",
    statut: "eespig",
    recrutement: ["prepa", "titre"],
    alternance:
      "Oui : une filière d'ingénieur par apprentissage, portée par le CFA SupOptique, à côté du cursus sous statut étudiant.",
  },
  {
    id: "chimie-paristech",
    name: "Chimie ParisTech - PSL",
    short: "Chimie ParisTech (ENSCP)",
    line: "sciences",
    ville: "Paris (5e arrondissement)",
    kind: "École d'ingénieurs publique",
    acces:
      "Concours commun Mines-Ponts (PC, PSI) ; Concours Commun INP (TPC) ; concours A BCPST de la banque Agro-Véto ; classe préparatoire intégrée (CPI) de la Fédération Gay-Lussac ; prépa ATS ; GEI-UNIV sur dossier et entretien après une L3 ou un BUT (1re année) ou un M1 (2e année).",
    duree: "3 ans après bac + 2",
    places:
      "Concours Mines-Ponts 2026 : 71 places (68 PC, 3 PSI). Selon PSL, s'y ajoutent 3 places en BCPST, 5 pour la CPI de la Fédération Gay-Lussac, 2 en ATS et 10 au plus sur dossier et entretien (L3, BTS, DUT). Environ 115 diplômés par an.",
    cout: "2026-2027 : 1 200 € pour les nouveaux entrants en 1re année, 628 € en 2e et 3e années (étudiants européens) ; 3 941 € hors Union européenne ; CVEC de 105 €. Bourses sur critères sociaux possibles ; en 3e année, l'alternant est salarié.",
    formations:
      "1re année : chimie moléculaire, chimie des matériaux, économie et management, stage ouvrier de 1 à 2 mois.",
    debouches:
      "Chimie ParisTech forme des ingénieurs chimistes pour l'industrie chimique, les matériaux, l'énergie, la cosmétique, les biotechnologies ou le conseil, et pour la recherche publique.",
    plus: "Une école d'environ 500 étudiants, membre de l'Université PSL, qui délivre son diplôme au nom de PSL.",
    station: "ecole-ingenieurs",
    url: "https://www.chimieparistech.psl.eu",
    accroche:
      "Chimie ParisTech forme des ingénieurs chimistes pour l'industrie chimique, les matériaux, l'énergie, la cosmétique, les biotechnologies ou le conseil, et pour la recherche publique.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "3e année possible en alternance, en contrat de professionnalisation d'un an : de septembre à fin janvier, 2 jours à l'école et 2 ou 3 jours en entreprise chaque semaine, puis temps plein en entreprise de février à fin août.",
    une: "Concours Mines-Ponts",
    uneRang: 32,
    uneVoie: "prepa",
  },
  {
    id: "insa-toulouse",
    name: "Institut national des sciences appliquées de Toulouse",
    short: "INSA Toulouse",
    line: "postbac",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique, après le bac",
    acces: "Parcoursup : dossier, puis entretien de motivation pour les mieux préclassés (Groupe INSA)",
    duree: "5 ans",
    places: "260 places en 2026 (bac général), plus 40 pour les bacs STI2D et STL",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers",
    formations: "La 1re année est commune à tous.",
    debouches:
      "L'INSA Toulouse prépare à 8 métiers d'ingénieur, de l'automatique-électronique au génie biologique, en passant par le génie civil, l'informatique et les réseaux ou les mathématiques appliquées.",
    plus: "Les bacheliers STI2D et STL ont leur propre premier cycle, la « Formation active en sciences » : 40 places en 2026.",
    station: "cycle-integre",
    url: "https://www.insa-toulouse.fr",
    accroche:
      "L'INSA Toulouse prépare à 8 métiers d'ingénieur, de l'automatique-électronique au génie biologique, en passant par le génie civil, l'informatique et les réseaux ou les mathématiques appliquées.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance: "À partir de la 3e année après le bac, en automatique-électronique et en génie civil",
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
    acces: "Parcoursup : dossier, puis entretien de motivation pour les mieux préclassés (Groupe INSA)",
    duree: "5 ans",
    places: "230 places en 1re année en 2026, pour 13 638 vœux",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers",
    formations:
      "Deux ans de tronc commun en STPI : 70 % de sciences, 20 % d'ouverture, 10 % d'orientation, et un stage ouvrier d'au moins 4 semaines dès la fin de la 1re année.",
    debouches:
      "Une école publique à dominante numérique : informatique, mathématiques appliquées, électronique et informatique industrielle, électronique et télécoms, systèmes embarqués.",
    plus: "Le tronc commun existe en version internationale (GLOBALINSA) ou en filière avec Sciences Po Rennes, pour un double diplôme en 6 ans.",
    station: "cycle-integre",
    url: "https://www.insa-rennes.fr",
    accroche:
      "Une école publique à dominante numérique : informatique, mathématiques appliquées, électronique et informatique industrielle, électronique et télécoms, systèmes embarqués.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "De la 3e à la 5e année : électronique, systèmes embarqués et télécoms (E-SET), génie mécanique et automatique",
    une: "Taux d'accès Parcoursup 2025 : 20 %",
    uneRang: 20,
    uneVoie: "postbac",
  },
  {
    id: "groupe-insa",
    name: "Groupe INSA : INSA Centre Val de Loire, INSA Hauts-de-France, INSA Rouen Normandie, INSA Strasbourg et écoles partenaires",
    short: "Groupe INSA",
    line: "postbac",
    ville: "Blois, Bourges, Valenciennes, Rouen, Strasbourg",
    kind: "École d'ingénieurs publique, après le bac",
    acces: "Parcoursup : dossier, puis entretien de motivation pour les mieux préclassés (Groupe INSA)",
    duree: "5 ans",
    places: "835 places en 2026 : Rouen 245, Strasbourg 210, Hauts-de-France 200, Centre Val de Loire 180",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers",
    formations: "Deux ans de premier cycle scientifique (STPI), puis trois ans de spécialité.",
    debouches:
      "Ces quatre INSA suivent la même admission que Lyon, Toulouse et Rennes, avec les droits d'une école publique, et accueillent plus largement : en 2025, chacun a fait entre 3 875 et 7 102 propositions, pour 192 à 261 entrées.",
    plus: "Les critères et le calendrier sont communs à tous les INSA : tu peux candidater dans plusieurs à la fois.",
    station: "cycle-integre",
    url: "https://www.groupe-insa.fr",
    accroche:
      "Ces quatre INSA suivent la même admission que Lyon, Toulouse et Rennes, avec les droits d'une école publique, et accueillent plus largement : en 2025, chacun a fait entre 3 875 et 7 102 propositions, pour 192 à 261 entrées.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "À partir de la 3e année après le bac, selon les spécialités de chaque INSA ; à Rouen, 4 spécialités sur 11",
  },
  {
    id: "esilv",
    name: "École supérieure d'ingénieurs Léonard de Vinci",
    short: "ESILV",
    line: "postbac",
    ville: "Paris-La Défense, Nantes, Montpellier",
    kind: "École d'ingénieurs privée, après le bac",
    acces: "Parcoursup : dossier, puis trois QCM le 2 mai 2026 (concours Avenir)",
    duree: "5 ans",
    places: "390 places en 2026 à Paris-La Défense ; en 2025, 84 à Nantes et 50 à Montpellier",
    cout: "11 400 € par an en 2026-2027 ; boursiers du Crous : 5 % à 30 % de réduction ; gratuit en apprentissage",
    formations:
      "Deux ans de prépa intégrée, avec un parcours en anglais possible dès la 1re année, puis trois ans de cycle ingénieur.",
    debouches:
      "Selon l'école, 70 % des diplômés 2024 étaient embauchés avant la fin du cursus, pour 47 700 € par an en moyenne en France, primes incluses, et 68 700 € à l'étranger.",
    plus: "Chaque année, un projet technologique en équipe ; en 4e et 5e années, 11 parcours transversaux à combiner avec ta majeure, de la recherche aux sciences quantiques en passant par l'entrepreneuriat.",
    station: "cycle-integre",
    url: "https://www.esilv.fr",
    accroche:
      "Selon l'école, 70 % des diplômés 2024 étaient embauchés avant la fin du cursus, pour 47 700 € par an en moyenne en France, primes incluses, et 68 700 € à l'étranger.",
    statut: "prive",
    recrutement: ["postbac", "titre"],
    alternance: "Cycle ingénieur en alternance sur 3 ans : 14 majeures sur 15, salaire de 41 % à 78 % du Smic",
  },
  {
    id: "ece",
    name: "ECE École d'ingénieurs",
    short: "ECE",
    line: "postbac",
    ville: "Paris, Lyon, Bordeaux, Marseille, Rennes",
    kind: "École d'ingénieurs privée, après le bac",
    acces: "Parcoursup : dossier, puis trois QCM le 2 mai 2026 (concours Avenir)",
    duree: "5 ans",
    places: "520 places en 2026 à Paris ; en 2025, 130 à Lyon et 85 à Bordeaux",
    cout: "11 990 € par an en 2026-2027, même tarif pour les boursiers ; 10 à 20 % de réduction avec mention bien ou très bien",
    formations:
      "Deux ans de prépa intégrée : sciences fondamentales, électronique, informatique, langues et formation humaine.",
    debouches:
      "Une école tournée vers le numérique et les technologies : cybersécurité, data et IA, systèmes embarqués, défense, finance, santé, énergie.",
    plus: "Plus de 130 programmes d'échange dans 50 pays et 9 doubles diplômes internationaux.",
    station: "cycle-integre",
    url: "https://www.ece.fr",
    accroche:
      "Une école tournée vers le numérique et les technologies : cybersécurité, data et IA, systèmes embarqués, défense, finance, santé, énergie.",
    statut: "prive",
    recrutement: ["postbac", "titre"],
    alternance: "En cycle ingénieur, contrat de 3 ans : 5 spécialités à Paris et à Lyon, scolarité prise en charge",
  },
  {
    id: "estp",
    name: "École spéciale des travaux publics, du bâtiment et de l'industrie",
    short: "ESTP",
    line: "sciences",
    ville: "Cachan, Dijon, Orléans, Troyes, Aix-en-Provence",
    kind: "École d'ingénieurs privée reconnue par l'État",
    acces: "Cycle ingénieur à bac+2 ; après le bac, bi-cursus architecte-ingénieur sur Parcoursup ou bachelor",
    duree: "Cycle ingénieur",
    places: "37 places en 2026 en bi-cursus (ENSA Paris-La Villette), 45 en bachelor à Cachan",
    cout: "Cycle ingénieur : 9 950 € par an (rentrée 2026) ; bachelor : 8 000 € en 2026, même tarif pour les boursiers",
    formations:
      "Le cycle ingénieur dure 3 ans : stage pratique d'au moins 6 semaines en 1re année, stage technique d'au moins 9 semaines en 2e année, travail de fin d'études d'au moins 24 semaines en 3e année.",
    debouches: "L'ESTP se consacre entièrement à la construction : bâtiment, travaux publics, énergie des bâtiments.",
    plus: "Le bi-cursus architecte-ingénieur commence après le bac en école d'architecture : trois ans de licence d'architecture, renforcés en maths et en physique par l'ESTP, puis quatre ans qui associent master d'architecture et cycle ingénieur.",
    station: "ecole-ingenieurs",
    url: "https://www.estp.fr",
    accroche: "L'ESTP se consacre entièrement à la construction : bâtiment, travaux publics, énergie des bâtiments.",
    statut: "eespig",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "Sur 3 ans : génie énergétique de la construction durable (Cachan) et travaux publics (Aix-en-Provence)",
  },
  {
    id: "efrei",
    name: "Efrei Paris (Université Paris-Panthéon-Assas), grande école d'ingénieurs du numérique",
    short: "Efrei",
    line: "postbac",
    ville: "Paris (Villejuif), Bordeaux",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces: "Parcoursup : concours Puissance Alpha, dossier et QCM (maths, sciences, anglais)",
    duree: "5 ans",
    places:
      "Places post-bac 2026 à confirmer ; cycle ingénieur 2026 : 50 via e3a-Polytech, 80 sur titre, 80 en apprentissage",
    cout: "2026-2027 : 10 000 € en P1, jusqu'à 12 000 € en ING3 ; boursiers : bourse CROUS de 1 454 à 6 335 € et bourses de l'école",
    formations:
      "Deux ans de prépa intégrée : informatique, mathématiques, physique et électronique (180 h chacune en 1re année), formation générale et un mois de stage en décembre-janvier.",
    debouches:
      "L'Efrei forme des ingénieurs du numérique : développement logiciel, data science, cybersécurité et réseaux, systèmes embarqués.",
    plus: "L'Efrei est rattachée à l'Université Paris-Panthéon-Assas.",
    station: "cycle-integre",
    url: "https://www.efrei.fr/",
    accroche:
      "L'Efrei forme des ingénieurs du numérique : développement logiciel, data science, cybersécurité et réseaux, systèmes embarqués.",
    statut: "eespig",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur en apprentissage dès l'ING1 : logiciels et SI, big data et machine learning (Paris, Bordeaux), réseaux et sécurité (Paris) ; 80 places en 2026",
  },
  {
    id: "isep",
    name: "Isep, école d'ingénieurs du numérique",
    short: "Isep",
    line: "postbac",
    ville: "Paris (6e), Issy-les-Moulineaux ; prépa à Bordeaux",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces: "Parcoursup : concours Puissance Alpha, dossier et QCM (maths, sciences, anglais)",
    duree: "5 ans",
    places: "2026 : 60 places en prépa Informatique et technologies numériques (Paris) ; autres programmes à confirmer",
    cout: "2026-2027 : 9 000 € par an en prépa, 10 850 € en cycle ingénieur ; boursiers CROUS : 2 000 € de réduction par an",
    formations:
      "Deux ans de prépa intégrée : maths, physique, signaux et systèmes, projets d'électronique, de robotique et d'informatique, économie, anglais et LV2, puis un semestre à l'étranger ou un stage en 2e année.",
    debouches:
      "L'Isep forme des ingénieurs du numérique : logiciel, cybersécurité, IA, systèmes embarqués, data, ingénierie biomédicale.",
    plus: "Passage au cycle ingénieur sur contrôle continu à la fin de la prépa.",
    station: "cycle-integre",
    url: "https://www.isep.fr/",
    accroche:
      "L'Isep forme des ingénieurs du numérique : logiciel, cybersécurité, IA, systèmes embarqués, data, ingénierie biomédicale.",
    statut: "eespig",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Apprentissage dès la 1re année du cycle ingénieur, sur 2 ou 3 ans, même formation ; 40 % des ingénieurs Isep sont apprentis",
  },
  {
    id: "junia",
    name: "JUNIA, grande école d'ingénieurs regroupant HEI, ISA et ISEN Lille",
    short: "JUNIA",
    line: "postbac",
    ville: "Lille (campus principal), Bordeaux, Châteauroux",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces: "Parcoursup : concours Puissance Alpha, dossier et QCM (maths, sciences, anglais)",
    duree: "5 ans",
    places: "Places 2026 à confirmer : absentes des pages consultées en octobre 2026",
    cout: "2026-2027 : 7 722 € par an en prépa, 8 775 à 9 527 € en cycle ingénieur ; boursiers : documentation bourses de l'école",
    formations: "Deux ans de cycle préparatoire.",
    debouches:
      "JUNIA réunit trois écoles d'ingénieurs : HEI (bâtiment, énergie, industrie), ISEN (numérique, cybersécurité, IA, robotique) et ISA (agriculture, agroalimentaire, environnement).",
    plus: "Trois diplômes d'ingénieur dans une même école, du numérique à l'agriculture, et une prépa Adimaker fondée sur les projets, ouverte aussi dans des lycées partenaires jusqu'à l'île Maurice.",
    station: "cycle-integre",
    url: "https://www.junia.com/",
    accroche:
      "JUNIA réunit trois écoles d'ingénieurs : HEI (bâtiment, énergie, industrie), ISEN (numérique, cybersécurité, IA, robotique) et ISA (agriculture, agroalimentaire, environnement).",
    statut: "eespig",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Sept cycles ingénieur par apprentissage après un bac + 2 ou la prépa : BTP, énergie, aéronautique, robotique, numérique, agriculture, paysage",
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
      "En prépa intégrée (2 ans) : maths, physique, informatique, mécanique, électronique, énergétique, matériaux, gestion de projet et anglais, avec un stage de 3 mois en fin de 1re année.",
    debouches: "CESI forme ses ingénieurs sur 26 campus : tu peux souvent étudier près de chez toi.",
    plus: "Pédagogie active par projets : dès la 1re année, tu apprends en équipe à partir de situations professionnelles.",
    station: "cycle-integre",
    url: "https://www.cesi.fr/",
    accroche: "CESI forme ses ingénieurs sur 26 campus : tu peux souvent étudier près de chez toi.",
    statut: "prive",
    recrutement: ["postbac", "titre"],
    alternance:
      "À partir de la 3e année (cycle ingénieur en 3 ans), après la prépa intégrée ou après un bac+2 : spécialités Généraliste, Informatique, BTP, Systèmes électriques & électroniques embarqués ; deux parcours avec le CEFIPA sur le campus de Nanterre (Généraliste, Systèmes électriques & électroniques embarqués). Mobilité internationale de 12 semaines.",
  },
  {
    id: "esigelec",
    name: "ESIGELEC, école supérieure d'ingénieurs en génie électrique",
    short: "ESIGELEC",
    line: "postbac",
    ville: "Rouen (Technopôle du Madrillet) et Poitiers (campus ouvert en septembre 2023)",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces:
      "Concours Avenir sur Parcoursup, commun à 7 écoles et 21 campus, comptés comme un seul vœu : étude du dossier (notes de spécialité de 1re, deux premiers trimestres de terminale, notes du bac de français, fiche Avenir), puis épreuves. Profil violet (terminale générale) : écrits en QCM le 2 mai 2026 dans 30 villes, dont les « grands classés » sont dispensés ; profil orange (terminale STI2D ou générale) : oral le 11 avril 2026. Spécialités conseillées : maths en terminale et une autre spécialité scientifique. Vœux du 19 janvier au 12 mars 2026. Frais : 120 € (30 € pour les boursiers) pour le profil violet, 75 € pour le profil orange. Admissions parallèles : pages dédiées pour les CPGE (math spé, ATS), les BTS et autres bac+2, les licences 3 et les bac+4.",
    duree: "5 ans après le bac",
    places:
      "Places post-bac 2026 : publiées par le Concours Avenir. En apprentissage (2026-2027) : 120 places en 3e année à Rouen et 40 à Poitiers, puis 40 et 10 places de plus en 4e année, et 40 de plus en 5e année à Rouen.",
    cout: "2026-2027 : cycle préparatoire intégré à 7 800 € par an, ramenés à 5 850 € pour les boursiers de l'État (dégrèvement de 25 %) ; cycle ingénieur à 8 280 € par an. S'ajoutent 150 € de frais de dossier en 1re année, 60 € de protection médicale, 80 € de carte d'associations et la CVEC (105 €). En apprentissage : scolarité gratuite et salaire versé par l'entreprise.",
    formations:
      "Les 3 premières années forment un cycle fondamental : prépa intégrée internationale en 1re et 2e années, puis une mineure au choix parmi 9 pour explorer un domaine.",
    debouches:
      "L'ESIGELEC forme des ingénieurs de l'électronique, du numérique et de l'énergie pour l'automobile et le ferroviaire, l'aéronautique et le spatial, la e-santé, la défense ou l'industrie.",
    plus: "26 doubles diplômes, 90 universités partenaires et 35 % d'étudiants internationaux venus de 40 pays.",
    station: "cycle-integre",
    url: "https://www.esigelec.fr/",
    accroche:
      "L'ESIGELEC forme des ingénieurs de l'électronique, du numérique et de l'énergie pour l'automobile et le ferroviaire, l'aéronautique et le spatial, la e-santé, la défense ou l'industrie.",
    statut: "eespig",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Programme suivi en apprentissage au choix, avec les 16 majeures accessibles : entrée dès la 3e année (contrat de 36 mois), en 4e année (24 mois) ou en 5e année (12 mois), à Rouen et à Poitiers. Scolarité gratuite et salaire versé par l'entreprise.",
  },
  {
    id: "eseo",
    name: "ESEO, école supérieure d'électronique de l'Ouest",
    short: "ESEO",
    line: "postbac",
    ville: "Angers (campus principal, 800 étudiants), Dijon et Paris-Vélizy",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces:
      "Concours Puissance Alpha sur Parcoursup pour le parcours ingénieur en 5 ans (prépa ingénieur informatique et électronique à Angers, Dijon ou Paris-Vélizy ; prépa scientifique à Angers). Bac général ou technologique. Admissions parallèles via la plateforme d'admission ESEO : en 2e année de prépa après un bac+1 scientifique ou technique, et en cycle ingénieur dès un bac+2 ou un bac+3, sous statut étudiant ou apprenti.",
    duree: "5 ans après le bac",
    places: "Places post-bac 2026 : publiées par le concours Puissance Alpha (puissance-alpha.fr).",
    cout: "2026-2027 : prépa ingénieur informatique et électronique à 6 550 € par an à Angers et à Dijon, 7 600 € à Paris-Vélizy ; prépa scientifique d'Angers à 1 980 € par an ; cycle ingénieur à 9 390 € par an sous statut étudiant. Frais annexes : 89 € de contribution au BDE, plus 40 € de séminaire d'accueil en 1re année. En apprentissage, l'entreprise prend en charge la formation. Pour les boursiers, l'ESEO renvoie à sa rubrique « aides au financement ».",
    formations:
      "En prépa (2 ans) : maths et informatique, électronique numérique et analogique, physique, sciences de l'ingénieur, langues et enjeux écologiques, avec des projets d'électronique et un stage d'au moins 8 semaines en fin de 2e année.",
    debouches:
      "L'ESEO forme des ingénieurs de l'électronique et de l'informatique : cloud, data et IA, systèmes embarqués, cybersécurité, énergies renouvelables, e-santé.",
    plus: "École de 1 200 étudiants centrée sur l'électronique et le numérique, avec 50 doubles diplômes et 61 universités partenaires.",
    station: "cycle-integre",
    url: "https://www.eseo.fr/",
    accroche:
      "L'ESEO forme des ingénieurs de l'électronique et de l'informatique : cloud, data et IA, systèmes embarqués, cybersécurité, énergies renouvelables, e-santé.",
    statut: "eespig",
    recrutement: ["postbac", "titre"],
    alternance:
      "Cycle ingénieur de 3 ans en apprentissage, après la prépa ou un bac+2/3, à Angers, Dijon et Paris-Vélizy, avec 3 options : informatique et systèmes d'information ; systèmes embarqués, électronique et radiofréquences ; systèmes embarqués, logiciels et cybersécurité. Formation financée par l'entreprise.",
  },
  {
    id: "eigsi",
    name: "EIGSI, école d'ingénieurs généralistes de La Rochelle",
    short: "EIGSI",
    line: "postbac",
    ville: "La Rochelle (campus principal) et Casablanca (Maroc)",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces:
      "Concours Avenir (AvenirBac), commun à 7 écoles : ECE, EIGSI, EPF, ESIGELEC, ESILV, Builders, ESTACA. Profil violet (terminale générale) : épreuves écrites le 2 mai 2026. Profil orange (terminale STI2D ou générale) : épreuves orales le 11 avril 2026, dans l'un des 9 centres d'examen. Admissions parallèles : procédure AvenirPlus pour entrer en 2e année de prépa après un bac+1 ou un bac+2 scientifique, ou en cycle ingénieur après un bac+2, une licence ou un master ; rentrée décalée SPRINT pour les bac+1 ; apprentissage après un bac+2 scientifique.",
    duree: "5 ans après le bac",
    places: "Places post-bac 2026 : publiées par le Concours Avenir.",
    cout: "2026-2027 : 8 800 € par an, dont 1 500 € de frais d'inscription, en prépa intégrée comme en cycle ingénieur (statut étudiant) ; 5 800 € pour la rentrée décalée SPRINT. En apprentissage, l'entreprise paie les droits (10 500 € par an). Pour les boursiers, l'école renvoie à sa page « aide au financement » et à la bourse Pierre Dubois.",
    formations:
      "En prépa (2 ans) : maths, physique, mécanique, électronique, informatique, automatique, avec 40 % de travaux pratiques en petits groupes et un stage ouvrier de 6 semaines en 1re année.",
    debouches:
      "L'EIGSI forme des ingénieurs généralistes pour l'industrie, l'énergie et l'environnement, le BTP, les transports et la logistique, le numérique ou la santé.",
    plus: "Près de 500 heures de projets sur le cycle ingénieur et 45 parcours bi-diplômants.",
    station: "cycle-integre",
    url: "https://www.eigsi.fr/",
    accroche:
      "L'EIGSI forme des ingénieurs généralistes pour l'industrie, l'énergie et l'environnement, le BTP, les transports et la logistique, le numérique ou la santé.",
    statut: "eespig",
    recrutement: ["postbac", "titre"],
    alternance:
      "Ingénieur généraliste par apprentissage, ouvert depuis septembre 2012 : 3 ans à La Rochelle après un bac+2 scientifique, avec les options du cycle ingénieur et 12 semaines de mobilité internationale (dont 5 semaines en juillet de la 1re année, sur le campus de Casablanca). 350 alternants en formation dans plus de 290 entreprises.",
  },
  {
    id: "enseeiht",
    name: "Toulouse INP - ENSEEIHT",
    short: "ENSEEIHT (N7)",
    line: "sciences",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP et sur titre",
    duree: "3 ans après bac + 2",
    places: "298 places au Concours Commun INP, réparties entre trois départements (tableau de septembre 2026)",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; boursiers exonérés",
    formations:
      "Tu entres directement dans un département : Sciences du numérique (ex-informatique et télécommunications), Électronique, énergie électrique et automatique, ou Mécanique des fluides, énergétique et environnement (hydraulique, énergie, climat).",
    debouches:
      "L'ENSEEIHT forme des ingénieurs de l'énergie, de l'électronique, du numérique et de la mécanique des fluides.",
    plus: "Fondée en 1907, l'école diplôme plus de 450 ingénieurs par an et s'appuie sur quatre laboratoires toulousains : IMFT, IRIT, LAAS et Laplace.",
    station: "ecole-ingenieurs",
    url: "https://www.enseeiht.fr/fr/index.html",
    accroche:
      "L'ENSEEIHT forme des ingénieurs de l'énergie, de l'électronique, du numérique et de la mécanique des fluides.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Trois formations en apprentissage : numérique, électronique-énergie électrique-automatique, mécanique des fluides-énergétique ; surtout après un BUT, un BTS ou une licence",
  },
  {
    id: "ensiacet",
    name: "Toulouse INP - ENSIACET",
    short: "ENSIACET (A7)",
    line: "sciences",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, TPC, puis Concours Commun INP ; aussi prépas intégrées et sur titre",
    duree: "3 ans après bac + 2",
    places: "Campagne 2026-2027 : 175 places au Concours Commun INP, dont 116 en PC",
    cout: "630 € par an et 105 € de CVEC en 2026-2027 ; boursiers exonérés ; apprentis exonérés et payés de 53 à 78 % du Smic",
    formations:
      "Un premier semestre en tronc commun pour les cinq départements, puis tu te spécialises dans ton diplôme.",
    debouches: "L'ENSIACET forme des ingénieurs de la transformation de la matière et de l'énergie.",
    plus: "Les places du concours sont rattachées à un diplôme : tu choisis chimie, matériaux, génie chimique, génie des procédés ou génie industriel dès ton classement.",
    station: "ecole-ingenieurs",
    url: "https://www.ensiacet.fr/fr/formation/formations-ingenieur.html",
    accroche: "L'ENSIACET forme des ingénieurs de la transformation de la matière et de l'énergie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Quatre diplômes en apprentissage sur 3 ans : matériaux, génie chimique, génie des procédés, génie industriel ; après un BUT ou un BTS ; 24 apprentis par département",
  },
  {
    id: "phelma",
    name: "Grenoble INP - Phelma, UGA",
    short: "Phelma",
    line: "sciences",
    ville: "Grenoble",
    kind: "École d'ingénieurs publique",
    acces: "Prépa scientifique puis Concours Commun INP ; aussi BCPST, Prépa des INP et sur titre",
    duree: "3 ans après bac + 2",
    places: "Campagne 2026-2027 : 24 places en apprentissage, 36 sur titre en 1re année et 20 en 2e année",
    cout: "630 € par an en 2026-2027 (tarif Grenoble INP), plus 105 € de CVEC ; boursiers et apprentis exonérés",
    formations:
      "En 1re année, tu suis le parcours PMP (physique, matériaux, procédés) ou PET (physique, électronique, télécoms), avec 70 % de cours communs au premier semestre et un stage d'opérateur d'au moins 4 semaines.",
    debouches: "Phelma forme des ingénieurs en physique, électronique et matériaux.",
    plus: "Dix filières de spécialisation, dont deux internationales (Advanced Materials, Nanotech), et des semestres optionnels consacrés aux matériaux du nucléaire.",
    station: "ecole-ingenieurs",
    url: "https://phelma.grenoble-inp.fr/fr/formation",
    accroche: "Phelma forme des ingénieurs en physique, électronique et matériaux.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Deux cycles en apprentissage sur 3 ans : microélectronique et télécommunications ; matériaux, énergie, procédés ; 24 places, droits à 0 €",
  },
  {
    id: "ense3",
    name: "Grenoble INP - Ense3, UGA",
    short: "Ense3",
    line: "sciences",
    ville: "Grenoble",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP, BUT et sur titre",
    duree: "3 ans après bac + 2",
    places: "Site consulté en 2026 : environ 325 recrues par an, dont 231 via le Concours Commun INP et 25 apprentis",
    cout: "630 € par an en 2026-2027 (UE), plus 105 € de CVEC ; boursiers et apprentis exonérés",
    formations:
      "Le premier semestre est commun : modélisation et calcul scientifique, conception soutenable, génie électrique, signaux et systèmes, mécanique des fluides et des solides, avec des projets.",
    debouches:
      "Ense3 forme des ingénieurs de l'énergie, de l'eau et de l'environnement : électricité, nucléaire, hydraulique, réseaux, marchés de l'énergie.",
    plus: "L'école se présente comme l'école d'ingénieurs « des transitions » : la conception soutenable figure au programme dès le premier semestre.",
    station: "ecole-ingenieurs",
    url: "https://ense3.grenoble-inp.fr/",
    accroche:
      "Ense3 forme des ingénieurs de l'énergie, de l'eau et de l'environnement : électricité, nucléaire, hydraulique, réseaux, marchés de l'énergie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Filière PRODISE en 3 ans (production, distribution et stockage des énergies) : de bac + 2 à bac + 4, 25 places, alternance d'un à deux mois",
  },
  {
    id: "enseirb-matmeca",
    name: "Bordeaux INP - ENSEIRB-MATMECA",
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
      "Tu choisis ta filière dès le concours : électronique, informatique, mathématique et mécanique, ou télécommunications.",
    debouches:
      "L'ENSEIRB-MATMECA forme des ingénieurs du numérique : électronique, informatique, télécoms, mathématiques appliquées et mécanique.",
    plus: "Deux certificats ouverts à toutes les filières, Espace et Énergie, associent séminaires, projet long, stage et hackathon dans ces secteurs.",
    station: "ecole-ingenieurs",
    url: "https://enseirb-matmeca.bordeaux-inp.fr/fr",
    accroche:
      "L'ENSEIRB-MATMECA forme des ingénieurs du numérique : électronique, informatique, télécoms, mathématiques appliquées et mécanique.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Deux filières en apprentissage dès la 1re année : réseaux et informatique, systèmes électroniques embarqués ; après un BTS, un BUT ou une licence",
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
    formations: "Le cycle généraliste mêle cours, projets et stages en lien étroit avec les entreprises.",
    debouches:
      "Télécom SudParis forme des ingénieurs du numérique : IA et data science, développement logiciel, réseaux et cloud, cybersécurité, finance quantitative.",
    plus: "Deux campus : Évry-Courcouronnes (7,5 ha) et Palaiseau, dans un bâtiment partagé avec Télécom Paris au sein de l'Institut Polytechnique de Paris.",
    station: "ecole-ingenieurs",
    url: "https://www.telecom-sudparis.eu/formation/ingenieur-generaliste/",
    accroche:
      "Télécom SudParis forme des ingénieurs du numérique : IA et data science, développement logiciel, réseaux et cloud, cybersécurité, finance quantitative.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Ingénieur de spécialité informatique et réseaux en apprentissage : 42 places en 1re année, 5 en 2e année, après un BUT, une L3, une prépa ou un M1",
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
    places: "Plus de 15 % des 1 500 places annuelles du concours Mines-Télécom ; une dizaine d'élèves fonctionnaires",
    cout: "Environ 3 200 € par an en 2025 (UE) ; exonération possible pour les boursiers ; élèves fonctionnaires rémunérés, engagés huit ans",
    formations:
      "Après une 1re année de tronc commun à Douai, tu construis en 2e et 3e années ton parcours thématique et ton profil d'ingénieur selon ton projet professionnel.",
    debouches:
      "IMT Nord Europe forme des ingénieurs généralistes aux compétences techniques, scientifiques et managériales, avec une place forte pour le management de projet, l'innovation et les transitions écologique et numérique.",
    plus: "L'école s'étend sur cinq campus, de Dunkerque à Alençon, et ajoute au cursus généraliste cinq diplômes de spécialité en apprentissage, dont un en infrastructures ferroviaires.",
    station: "ecole-ingenieurs",
    url: "https://imt-nord-europe.fr/annuaire-formations/ingenieur-generaliste/",
    accroche:
      "IMT Nord Europe forme des ingénieurs généralistes aux compétences techniques, scientifiques et managériales, avec une place forte pour le management de projet, l'innovation et les transitions écologique et numérique.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Cinq diplômes de spécialité en apprentissage, en 3 ans après un bac + 2 : génie industriel, matériaux, énergie et nucléaire, ferroviaire, informatique et réseaux",
  },
  {
    id: "imt-mines-albi",
    name: "IMT Mines Albi-Carmaux",
    short: "IMT Mines Albi",
    line: "sciences",
    ville: "Albi (campus Jarlard, 24 ha)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, MPI, PT, TSI, BCPST, puis concours Mines-Télécom ; aussi sur titre et en alternance",
    duree: "3 ans après bac + 2",
    places: "Rentrée 2026 : 156 places au concours Mines-Télécom, dont 45 en MP, 45 en PC et 45 en PSI",
    cout: "3 200 € par an pour l'UE (tarif affiché en 2026) ; boursiers exonérés ; en alternance, formation payée et salaire versé",
    formations:
      "Tronc commun scientifique et technique en 1re année ; cours au choix et projet de recherche, d'innovation ou de création d'entreprise en 2e année ; puis une option sur 5 en 3e année : énergies renouvelables, procédés pharmaceutiques et agroalimentaires, matériaux pour les transports, génie industriel, ingénierie de la donnée.",
    debouches:
      "Les diplômés travaillent dans la pharmacie, la cosmétique et l'agroalimentaire, l'aéronautique et les transports, l'énergie et la construction, le conseil et le numérique, comme ingénieur procédés, matériaux, qualité, logistique ou data.",
    plus: "École de l'Institut Mines-Télécom sur un campus de 24 ha avec 8 résidences.",
    station: "ecole-ingenieurs",
    url: "https://www.imt-mines-albi.fr/",
    accroche:
      "Les diplômés travaillent dans la pharmacie, la cosmétique et l'agroalimentaire, l'aéronautique et les transports, l'énergie et la construction, le conseil et le numérique, comme ingénieur procédés, matériaux, qualité, logistique ou data.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Dès la 1re année, en 3 ans, 4 options : énergies renouvelables, procédés pharmaceutiques et agroalimentaires, matériaux pour les transports, génie industriel",
  },
  {
    id: "imt-mines-ales",
    name: "IMT Mines Alès",
    short: "IMT Mines Alès",
    line: "sciences",
    ville: "Alès (Gard)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, MPI, PT, TSI, puis concours Mines-Télécom ; BCPST par G2E ; aussi sur titre",
    duree: "3 ans après bac + 2",
    places: "Rentrée 2026 : 224 places sur concours, dont 68 en MP, 62 en PSI, 58 en PC et 23 en PT",
    cout: "3 500 € par an en 2026-2027 (UE et recrutés sur concours) ; boursiers exonérés ; apprentis rémunérés",
    formations:
      "Un tronc commun, puis un domaine choisi en 2e année parmi 6 (environnement-énergie-risques, écoconception et matériaux, informatique et IA, industrie du futur, génie civil et bâtiment durable, ressources minérales et sous-sol), soit 26 options.",
    debouches:
      "Pour la promotion 2024, 86 % des diplômés ont trouvé un emploi en moins de 4 mois, avec un salaire annuel moyen de 45 100 €, et 20 % ont été embauchés à l'étranger.",
    plus: "Fondée en 1843, l'école mise sur la création d'entreprise : son incubateur, ouvert en 1984, a accompagné 241 entreprises, et chaque élève vit une mission création de 5 semaines.",
    station: "ecole-ingenieurs",
    url: "https://www.imt-mines-ales.fr/",
    accroche:
      "Pour la promotion 2024, 86 % des diplômés ont trouvé un emploi en moins de 4 mois, avec un salaire annuel moyen de 45 100 €, et 20 % ont été embauchés à l'étranger.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "3 diplômes en apprentissage sur 3 ans : Bâtiment, Informatique et réseaux, Mécatronique ; 357 apprentis en 2025-2026",
  },
  {
    id: "ensta-bretagne",
    name: "ENSTA, campus de Brest (ex-ENSTA Bretagne)",
    short: "ENSTA Brest",
    line: "sciences",
    ville: "Brest ; second campus à Palaiseau (Paris-Saclay)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, PT, puis concours Mines-Ponts ; Mines-Télécom pour Défense & Sécurité ; aussi sur titre",
    duree: "3 ans après bac + 2",
    places:
      "Concours Mines-Ponts 2026 : 91 places à Brest ; Défense & Sécurité 2026 : 45 places civiles et 45 IETA (indicatives)",
    cout: "2 936 € par an en 2026-2027 (UE) ; boursiers du CROUS exonérés ; élèves IETA rémunérés par la DGA",
    formations: "1re année : tronc commun (maths, physique, mécanique, numérique, langues) et un mois de stage.",
    debouches:
      "À Brest, l'ENSTA forme aux métiers de la mer et de la défense : génie maritime, énergies en mer, hydrographie et océanographie, robotique, propulsion et pyrotechnie.",
    plus: "Depuis le 1er janvier 2025, ENSTA Paris et ENSTA Bretagne forment une seule école de l'Institut Polytechnique de Paris, avec deux campus, Brest et Palaiseau.",
    station: "ecole-ingenieurs",
    url: "https://www.ensta.fr/",
    accroche:
      "À Brest, l'ENSTA forme aux métiers de la mer et de la défense : génie maritime, énergies en mer, hydrographie et océanographie, robotique, propulsion et pyrotechnie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Systèmes embarqués, architecture navale ou systèmes pyrotechniques, en 3 ans ; 16 places en apprentissage (2e et 3e années) à Paris-Saclay",
  },
  {
    id: "ensea",
    name: "ENSEA",
    short: "ENSEA",
    line: "sciences",
    ville: "Cergy (Val-d'Oise)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, MPI, puis concours CentraleSupélec ; aussi PT, TSI, ATS, BUT ou licence",
    duree: "3 ans après bac + 2",
    places: "En 2026 : 175 places au concours CentraleSupélec, 20 en PT, 10 en TSI, 15 en ATS ; 56 en apprentissage",
    cout: "630 € à la rentrée 2026 (tarif national), plus 295 € de frais ; boursiers exonérés des droits ; apprentis salariés",
    formations: "Tronc commun en 1re année, avec majeures et mineures.",
    debouches: "L'ENSEA forme des ingénieurs de l'électronique, de l'informatique et des télécoms.",
    plus: "Jusqu'à 50 % de l'emploi du temps de 2e année se personnalise, et deux spécialités de 3e année se suivent en anglais.",
    station: "ecole-ingenieurs",
    url: "https://www.ensea.fr/",
    accroche: "L'ENSEA forme des ingénieurs de l'électronique, de l'informatique et des télécoms.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Électronique et informatique industrielle, en 3 ans dès la 1re année : systèmes numériques intégrés ou réseaux et télécoms ; 56 places en 2026",
  },
  {
    id: "ensiie",
    name: "ENSIIE",
    short: "ENSIIE",
    line: "sciences",
    ville: "Évry-Courcouronnes (Essonne)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, TSI, puis concours Mines-Télécom ; aussi sur titre (licence, BUT, ATS)",
    duree: "3 ans après bac + 2",
    places: "Concours Mines-Télécom : 109 places affichées pour la session 2027, dont 55 en MP et 20 en MPI",
    cout: "630 € à la rentrée 2026 (tarif national des écoles publiques) ; boursiers exonérés ; apprentis rémunérés et exonérés",
    formations: "Tronc commun en 1re année : informatique, mathématiques appliquées, gestion, entrepreneuriat.",
    debouches:
      "L'ENSIIE forme des ingénieurs en informatique et en mathématiques appliquées, avec une base de gestion d'entreprise.",
    plus: "Associée depuis 2017 à l'Université Paris-Saclay et à l'Institut Mines-Télécom, l'école ouvre 12 masters en bi-cursus en 3e année et un double cursus ingénieur-manager de 4 ans avec IMT Business School.",
    station: "ecole-ingenieurs",
    url: "https://www.ensiie.fr/",
    accroche:
      "L'ENSIIE forme des ingénieurs en informatique et en mathématiques appliquées, avec une base de gestion d'entreprise.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance: "Ingénieur en informatique sous statut d'apprenti (FISA) : 21 apprentis entrés en 2023-2024",
  },
  {
    id: "isae-ensma",
    name: "ISAE-ENSMA",
    short: "ISAE-ENSMA",
    line: "sciences",
    ville: "Futuroscope, Chasseneuil-du-Poitou (près de Poitiers)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, MPI, PT, TSI, puis concours Mines-Télécom ; aussi ATS et sur titre",
    duree: "3 ans après bac + 2",
    places: "Rentrée 2026 : 151 places au concours Mines-Télécom (58 PSI, 55 MP, 28 PC), 2 en ATS, 13 sur titres",
    cout: "630 € de droits à la rentrée 2026 ; boursiers dispensés ; apprentis salariés",
    formations: "1re année de tronc commun scientifique, technique et humain.",
    debouches:
      "Les diplômés travaillent surtout dans l'aéronautique et le spatial, puis dans l'automobile, le ferroviaire, l'énergie et les bureaux d'études, comme ingénieur calcul, R&D, conception ou développement.",
    plus: "Au Futuroscope depuis 1993, l'école consacre 17 000 de ses 32 000 m² à la recherche, avec l'Institut Pprime, laboratoire du CNRS d'environ 600 personnes.",
    station: "ecole-ingenieurs",
    url: "https://www.ensma.fr/",
    accroche:
      "Les diplômés travaillent surtout dans l'aéronautique et le spatial, puis dans l'automobile, le ferroviaire, l'énergie et les bureaux d'études, comme ingénieur calcul, R&D, conception ou développement.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Génie industriel pour l'aéronautique et l'espace, en 3 ans, avec le CFA Sup Nouvelle-Aquitaine et le Cnam Nouvelle-Aquitaine",
  },
  {
    id: "institut-agro-rennes-angers",
    name: "L'Institut Agro Rennes-Angers",
    short: "Institut Agro Rennes-Angers",
    line: "sciences",
    ville: "Rennes (agronomie) et Angers (horticulture, paysage)",
    kind: "École d'ingénieurs publique",
    acces:
      "Prépa BCPST, puis concours Agro-Véto ; aussi en apprentissage après un BTSA, un BTS, un BUT ou une licence pro",
    duree: "3 ans après une prépa",
    places:
      "Session 2026 : 130 places en BCPST en agronomie, 60 en horticulture et paysage ; 60 places en apprentissage",
    cout: "1 990 € par an en 2025-2026 (tarif du ministère chargé de l'agriculture), plus 105 € de CVEC ; apprentis exonérés",
    formations:
      "À Rennes, la spécialité agronomie ouvre sur 17 spécialisations, de l'agroécologie à la statistique, à l'animal ou à la mer (halieutique).",
    debouches:
      "Tu peux devenir conseiller agricole, consultant en filières et stratégies territoriales, responsable R&D, ingénieur bio-informatique ou environnement, chargé de mission agroécologie et biodiversité, ou ingénieur en horticulture pour une collectivité, un centre de recherche ou une entreprise de production.",
    plus: "Quatre cursus d'ingénieur sur deux campus : agronomie et alimentation à Rennes, horticulture et paysage à Angers, où l'école forme des ingénieurs en paysage.",
    station: "ecole-ingenieurs",
    url: "https://www.institut-agro-rennes-angers.fr",
    accroche:
      "Tu peux devenir conseiller agricole, consultant en filières et stratégies territoriales, responsable R&D, ingénieur bio-informatique ou environnement, chargé de mission agroécologie et biodiversité, ou ingénieur en horticulture pour une collectivité, un centre de recherche ou une entreprise de production.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Agronomie, agroalimentaire, horticulture et paysage (60 places) ; en agronomie, horticulture et paysage : 60 % du temps en entreprise, 12 semaines à l'étranger",
  },
  {
    id: "institut-agro-montpellier",
    name: "L'Institut Agro Montpellier",
    short: "Institut Agro Montpellier",
    line: "sciences",
    ville: "Montpellier (deux campus, dont La Gaillarde)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa BCPST, puis concours Agro-Véto ; aussi en apprentissage ou par concours spécifique (SAADS)",
    duree: "3 ans après une prépa",
    places: "Session 2026 : 113 places en BCPST en agronomie, 12 en SAADS ; 25 places en apprentissage",
    cout: "1 990 € par an en 2025-2026, plus 105 € de CVEC ; tarif 2026-2027 fixé par arrêté du ministère chargé de l'agriculture",
    formations: "En 1re année, un tronc commun avec un stage dans une entreprise agricole.",
    debouches:
      "Les diplômés rejoignent l'agroalimentaire, les services aux entreprises, les collectivités, la recherche, la production agricole ou des organisations internationales, comme chargé d'études eau-environnement, responsable R&D, conseiller agricole, chef de projet SIG ou œnologue.",
    plus: "Le bouquet vigne et vin ouvre sur le diplôme national d'œnologue, et le cursus SAADS forme aux systèmes agricoles et agroalimentaires durables des pays du Sud.",
    station: "ecole-ingenieurs",
    url: "https://www.institut-agro-montpellier.fr",
    accroche:
      "Les diplômés rejoignent l'agroalimentaire, les services aux entreprises, les collectivités, la recherche, la production agricole ou des organisations internationales, comme chargé d'études eau-environnement, responsable R&D, conseiller agricole, chef de projet SIG ou œnologue.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Dès la 1re année par concours après un BTSA, un BTSM, certains BTS, un BUT ou une licence pro (25 places) ; 3e année possible en contrat de professionnalisation",
  },
  {
    id: "ensic",
    name: "École nationale supérieure des industries chimiques",
    short: "ENSIC",
    line: "sciences",
    ville: "Nancy, en centre-ville",
    kind: "École d'ingénieurs publique",
    acces: "Prépa PC surtout (aussi MP, PSI, TPC), puis CCINP ; BCPST par A PC BIO ; prépas intégrées ; sur titre",
    duree: "3 ans après une prépa ou un cycle préparatoire",
    places:
      "Rentrée 2026 : 64 places au CCINP (PC 50, MP 6, PSI 6, TPC 2), plus des places en BCPST, prépas intégrées et sur titre",
    cout: "630 €/an en 2026-2027, plus 105 € de CVEC ; boursiers exonérés des droits d'inscription",
    formations:
      "Un tronc commun en sciences fondamentales et génie des procédés, avec des projets tout au long du cursus (innovation, conception, R&D).",
    debouches:
      "Tu deviens ingénieur en génie chimique et génie des procédés : tu conçois, pilotes et améliores des procédés de production.",
    plus: "Une école de chimie en plein centre de Nancy, adossée à un laboratoire commun avec le CNRS.",
    station: "ecole-ingenieurs",
    url: "https://ensic.univ-lorraine.fr/",
    accroche:
      "Tu deviens ingénieur en génie chimique et génie des procédés : tu conçois, pilotes et améliores des procédés de production.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "Génie chimique par apprentissage depuis 2023 : 1re année sous statut étudiant, puis 2 ans en alternance (CFA de l'Université de Lorraine)",
  },
  {
    id: "ecpm",
    name: "École européenne de chimie, polymères et matériaux de Strasbourg",
    short: "ECPM",
    line: "sciences",
    ville: "Strasbourg",
    kind: "École d'ingénieurs publique",
    acces: "Prépa PC ou TPC, puis CCINP ; après le bac, CPI de la Fédération Gay-Lussac ; aussi sur titre",
    duree: "3 ans après une prépa ou le CPI",
    places: "Rentrée 2026 : 61 places au CCINP (PC chimie 50, ChemBiotech 8, TPC 3), plus CPI, ATS et sur titre",
    cout: "630 €/an en 2026-2027, plus 105 € de CVEC ; boursiers exonérés des droits d'inscription ; Chemplast gratuit et salarié",
    formations:
      "Trois semestres de tronc commun : sciences analytiques, chimie moléculaire, ingénierie des polymères, matériaux fonctionnels et nanosciences.",
    debouches:
      "Tu deviens ingénieur chimiste, surtout en R&D et innovation : ingénieur de recherche ou d'études, chef de projet, ou docteur après une thèse.",
    plus: "Une école trilingue : anglais en 1re langue, allemand ou espagnol en 2e, et environ 40 % des cours scientifiques donnés en anglais et en allemand.",
    station: "ecole-ingenieurs",
    url: "https://ecpm.unistra.fr/",
    accroche:
      "Tu deviens ingénieur chimiste, surtout en R&D et innovation : ingénieur de recherche ou d'études, chef de projet, ou docteur après une thèse.",
    statut: "public",
    recrutement: ["prepa", "postbac", "titre"],
    alternance:
      "Chemplast (matériaux polymères, avec l'ISPA) : 3 ans en apprentissage ; en ingénieur chimiste, 3e année possible en contrat de professionnalisation",
  },
]);
