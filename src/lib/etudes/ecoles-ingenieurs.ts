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
      "Tu vises la recherche, l'industrie de pointe ou le service de l'État : à la sortie, environ 53 % des diplômés partent en entreprise et 34 % préparent un doctorat ; 15 % rejoignent un corps de l'État, certains après leur thèse.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 1,
    uneVoie: "prepa",
    places:
      "Concours 2025 : 431 élèves français admis, dont 164 en MP, 131 en PC et 56 en PSI, plus 111 élèves internationaux",
    cout: "Élèves français rémunérés, scolarité gratuite s'ils servent l'État 10 ans dans les 20 ans qui suivent, sinon environ 21 000 à 31 000 € à rembourser ; élèves étrangers : 19 000 € sur 3 ans (UE), 38 000 € (hors UE)",
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
    places: "Session 2025 : 95 postes d'élèves en sciences (MP 38, BCPST 21, PC 18, MPI 12, PSI 6)",
    cout: "Normaliens élèves rémunérés pendant 4 ans comme fonctionnaires stagiaires, contre un engagement décennal (notice Inter-ENS 2026)",
  },
  "ens-paris-saclay": {
    accroche:
      "Tu vises la recherche ou l'enseignement, y compris en sciences de l'ingénieur : 69 % des normaliens poursuivent en thèse (enquête 2022), et l'École prépare à l'agrégation.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 13,
    uneVoie: "prepa",
    places: "Session 2026 : 215 postes d'élèves, dont PT 38, PSI 36, MP 21, PC 18, BCPST 15 et MPI 14",
    cout: "Élèves fonctionnaires stagiaires rémunérés pendant 4 ans, contre un engagement décennal, études comprises (notice Inter-ENS 2026)",
  },
  "ens-lyon": {
    accroche:
      "Tu te destines à l'enseignement ou à la recherche : le diplôme de l'ENS de Lyon y prépare d'abord, et ouvre aussi l'administration et l'entreprise.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 14,
    uneVoie: "prepa",
    places: "Session 2026 : 226 places aux concours, lettres et sciences réunies",
    cout: "Normaliens élèves : 1 500 € bruts par mois pendant 4 ans, contre un engagement décennal",
  },
  espci: {
    accroche:
      "Tu aimes la physique, la chimie et la biologie au labo : environ la moitié du temps de 1re et 2e années se passe en activités expérimentales.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours X-ENS",
    uneRang: 16,
    uneVoie: "prepa",
    places: "Concours 2026 : 57 élèves en PC, 5 en MP, 2 en BCPST ; environ 90 élèves en 1re année",
    cout: "Bourses Joliot depuis 2010, pour les élèves français et internationaux : près de 400 000 € de bourses et d'aides par promotion, sur toute la scolarité",
  },
  mines: {
    accroche:
      "Tu vises l'industrie, l'énergie, le conseil ou la recherche : 70 % des diplômés 2024 ont trouvé leur premier emploi avant la fin des études, 85 % en CDI, pour un salaire brut moyen de 56 890 € en France ; 13 % préparent un doctorat.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours Mines-Ponts",
    uneRang: 3,
    uneVoie: "prepa",
    places: "Concours 2026 : 130 places (MP 52, PSI 36, PC 30, MPI 5, PT 5, TSI 2) ; environ 150 entrants en 1re année",
    cout: "4 150 € par an (notice du concours 2026), exonération pour les boursiers, français ou étrangers",
  },
  ponts: {
    accroche:
      "Tu veux bâtir des villes, des transports et des ouvrages, ou travailler dans l'industrie, le conseil ou la finance : 95 % des diplômés 2025 ont un emploi à 6 mois, pour un salaire brut annuel moyen de 57 545 € primes comprises.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    une: "Concours Mines-Ponts",
    uneRang: 4,
    uneVoie: "prepa",
    places: "Concours 2026 : 215 places, soit MP 82, PSI 70, PC 39, PT 18, MPI 5 et TSI 1",
    cout: "3 800 € par an (2025-2026) ; dès 2026-2027, bourses sur critères sociaux versées par le Crous de Créteil",
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
    places: "193 places au concours Mines-Ponts 2026, dont 80 en PSI et 63 en MP",
    cout: "2 926 € par an pour un élève de l'Union européenne (notice Mines-Ponts 2026) ; gratuit pour les boursiers",
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
    places: "238 places au concours Mines-Ponts 2026 : 131 à Paris-Saclay, 91 à Brest, 16 en apprentissage",
    cout: "2 936 € par an en 2026-2027 (Union européenne) ; boursiers du Crous exonérés ; élèves militaires (IETA) et apprentis rémunérés",
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
    places: "185 places au concours Mines-Ponts 2026, dont 80 en MP et 45 en MPI, plus 7 en apprentissage",
    cout: "3 600 € par an en 2026-2027 (France, Union européenne) ; gratuit pour les boursiers du Crous ; apprentis exonérés en 2e et 3e années",
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
    places: "80 places au concours Mines-Ponts 2026 ; aussi 18 en ECG et 25 en B/L (tableau 2025)",
    cout: "3 500 € par an pour un élève entré en 2026-2027 ; exonération pour les boursiers sur critères sociaux",
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
    places: "555 places au concours Centrale-Supélec 2026 (MP, MPI, PC, PSI), dont 34 en apprentissage",
    cout: "Depuis 2026, de 2 500 à 5 000 € par an selon le revenu des parents ; gratuit pour les boursiers et les apprentis",
  },
  "centrale-nantes": {
    accroche:
      "Promotion 2025 : 32 % des diplômés travaillent dans le conseil et l'ingénierie, 25 % dans le numérique, 14 % dans l'industrie des transports, 7 % dans l'énergie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Apprentissage sur 3 ans (choix en 1re année) ou sur 2 ans (choix en 2e), ou 1 an en contrat de professionnalisation ; salaire de 600 à 1 500 € par mois",
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 26,
    uneVoie: "prepa",
    places: "260 places au concours Centrale-Supélec 2026, dont 110 en MP et 85 en PSI, plus 10 en TSI",
    cout: "Depuis 2026, selon le revenu : jusqu'à 4 770 € par an (plafond 2026) ; gratuit pour les boursiers ; 2 613 € pour les élèves entrés avant",
  },
  "imt-atlantique": {
    accroche: "IMT Atlantique forme des ingénieurs du numérique, de l'énergie et de l'industrie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "4 diplômes en apprentissage sur 3 ans, 50 % en entreprise : informatique-réseaux-télécoms, ingénierie logicielle, génie industriel, écologie industrielle (2026)",
    une: "Concours Mines-Ponts",
    uneRang: 30,
    uneVoie: "prepa",
    places:
      "Concours Mines-Ponts 2026 : 290 places (85 MP, 20 MPI, 85 PC, 85 PSI, 13 PT, 2 TSI) ; GEI-UNIV : 45 en 1re année, 10 en 2e",
    cout: "3 600 € par an en 2026-2027 (étudiants européens), plus 105 € de CVEC ; boursiers du Crous exonérés ; apprentis salariés, formation gratuite",
  },
  utt: {
    accroche:
      "Pour un métier d'ingénieur ouvert : chef de projet, consultant, développeur, sécurité informatique, R&D.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Dès la 3e année en Matériaux et mécanique ; dès la 4e en Génie industriel, Génie mécanique et Systèmes numériques",
    places: "314 places en 1re année en 2026, pour 5 395 vœux",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers",
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
    places: "665 places en 2026 (bac général), plus 26 en INS'Avenir pour les bacs STI2D et STL",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers",
  },
  utc: {
    accroche:
      "Selon l'école (plaquette d'avril 2024), 97,2 % des diplômés ont un emploi, trouvé en 1 mois en moyenne, et 61,5 % sont embauchés avant même leur sortie.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Dès la 3e année en ingénierie mécanique et en informatique ; en génie des procédés en 3e année du cycle ingénieur",
    une: "Taux d'accès Parcoursup 2025 : 22 %",
    uneRang: 22,
    uneVoie: "postbac",
    places: "400 places en 1re année en 2026, pour 6 635 vœux",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers",
  },
  utbm: {
    accroche:
      "L'UTBM forme des ingénieurs pour l'industrie : production, méthodes et logistique (28,5 % des postes), bureau d'études (26,5 %), informatique.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Dès la 3e année : mécanique et transports, énergie et génie électrique, informatique, logistique industrielle",
    places: "290 places en 1re année en 2026, pour 4 577 vœux",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers",
  },
  "reseau-polytech": {
    accroche:
      "Seize écoles publiques d'ingénieurs, au sein des universités, qui forment 10 % des ingénieurs diplômés en France.",
    statut: "public",
    recrutement: ["postbac", "prepa", "titre"],
    alternance: "Dès la 1re année du cycle ingénieur (3e année après le bac), avec un contrat de 2 ou 3 ans",
    places: "200 places en 2026 à Polytech Marseille ; environ 2 400 places de PeiP dans le réseau en 2025",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers, concours compris (60 € sinon)",
  },
  "prepa-des-inp": {
    accroche:
      "La Prépa des INP te mène en deux ans, sur contrôle continu, à l'une des plus de 40 écoles du Groupe INP et de ses partenaires.",
    statut: "public",
    recrutement: ["postbac"],
    alternance: "Prépa sous statut étudiant ; l'apprentissage dépend ensuite de l'école d'ingénieurs obtenue",
    places: "365 places en 2026 sur 4 sites : Grenoble 113, Toulouse 96, Nancy 86, Bordeaux 70",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; gratuit pour les boursiers ; candidature 90 € (5 € boursiers)",
  },
  epf: {
    accroche: "Une formation d'ingénieur généraliste : tu choisis ton domaine en 4e année seulement.",
    statut: "eespig",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "4e et 5e années en apprentissage, gratuites et rémunérées ; contrat de professionnalisation possible en 5e année",
    places: "231 places en 2026 à Cachan ; 100 places ParityLab, 24 en STI2D, 20 en franco-québécois",
    cout: "10 180 € par an en 2026-2027 ; boursiers du Crous : 20 % de réduction sur les 3 premières années",
  },
  epita: {
    accroche: "L'EPITA forme des ingénieurs en informatique.",
    statut: "prive",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur en apprentissage après une L2, une L3, un BUT ou un bachelor ; 5 majeures ; 2 semaines à l'école, 2 en entreprise",
    places: "783 places en 1re année sur 5 campus (session 2027)",
    cout: "2027-2028 : 10 350 € en prépa, 12 950 € en cycle ingénieur ; boursiers : concours gratuit, même grille",
  },
  "esiee-paris": {
    accroche:
      "ESIEE Paris forme des ingénieurs du numérique, de l'électronique et de l'industrie : informatique, cybersécurité, data et IA, systèmes embarqués, santé numérique, énergie, génie civil.",
    recrutement: ["titre", "postbac", "prepa"],
    alternance:
      "Cycle ingénieur en apprentissage dès la 1re année, après un bac+2 ou le premier cycle : 418 places dans 10 filières, de l'IA au génie civil",
    places: "Rentrée 2026 : 255 places + 20 en cycle renforcé après le bac ; 420 apprentis en cycle ingénieur",
    cout: "8 280 € par an en premier cycle, 8 680 € en cycle ingénieur (2026) ; boursiers : 3 312 € au plus bas, 2 070 € dès 2027",
  },
  ipsa: {
    accroche:
      "L'IPSA forme des ingénieurs pour l'aéronautique et le spatial : 85 % des jeunes diplômés y travaillent, ou dans les nouvelles mobilités, chez Airbus, Safran, Dassault Aviation, Thales, ArianeGroup, au CNES ou à la DGA.",
    statut: "prive",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Aéro 3 à Aéro 5 en apprentissage à Paris-Ivry, après un bac+2 ou l'Aéro 2 ; systèmes autonomes ou propulsion ; 3 semaines école, 3 semaines entreprise",
    places: "400 places en 1re année : Paris 200, Toulouse 130, Lyon 70",
    cout: "11 640 € par an en 2026-2027, de la 1re à la 5e année ; boursiers : concours gratuit, même montant",
  },
  estaca: {
    accroche:
      "L'ESTACA forme des ingénieurs des transports : aéronautique, automobile, ferroviaire, spatial et naval, pour la R&D, la production, la qualité, le conseil ou les achats.",
    statut: "eespig",
    recrutement: ["postbac", "prepa", "titre"],
    alternance:
      "Deux diplômes par apprentissage : véhicules, systèmes autonomes et connectés ; génie industriel pour l'aéronautique et l'espace. 5e année possible en alternance",
    places: "Les 3 campus recrutent en 1re année",
    cout: "10 130 € en 2026-2027 ; boursiers : bourses du Crous, concours à 30 € au lieu de 120 €",
  },
  icam: {
    accroche:
      "Tu vises un poste d'ingénieur généraliste dans l'industrie : mécanique, génie électrique, automatique, énergie.",
    statut: "eespig",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "De la 3e à la 5e année (ingénieur généraliste) à Lille, Grand Paris Sud, Bretagne, Vendée et Toulouse, après la prépa professionnalisante ou un bac+2",
    places:
      "Lille, prépa scientifique : 100 places en 2026 (1 922 candidats en 2025) ; une fiche par campus et par voie",
    cout: "Prépa à Lille 4 500 € par an selon les revenus, cycle ingénieur 9 700 € (2026) ; boursiers : bourse Icam de 1 200 € à 2 700 € par an",
  },
  "arts-et-metiers": {
    accroche:
      "Arts et Métiers forme des ingénieurs de l'industrie : 35 % des jeunes diplômés travaillent en production, exploitation, méthodes, qualité ou maintenance, 23 % en R&D et innovation.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Programme Grande École en apprentissage dès la 1re année, à Angers et Paris : 24 places par campus (rentrée 2025), 60 % du temps en entreprise",
    places: "Rentrée 2026 : 540 places en PT, 346 en MP, MPI, PC, PSI, 25 en ATS ; TSI : 35 places en 2025",
    cout: "618 € par an en 2025, 630 € au tarif national en 2026-2027 ; boursiers exonérés ; cursus militaire gratuit et rémunéré",
  },
  navale: {
    accroche: "Tu y deviens officier de la Marine nationale.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    places: "Rentrée 2026 : 85 places au concours CentraleSupélec (56 en filière navigation, 29 en filière énergie)",
    cout: "0 € en 2026 : scolarité gratuite et rémunérée, avec le statut d'élève militaire dès l'incorporation",
  },
  agroparistech: {
    accroche:
      "Les ingénieurs AgroParisTech travaillent dans le conseil, l'agroalimentaire, la recherche, les administrations, la forêt ou l'environnement.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Sur les trois ans (concours dédié après un BTSA, un BTS, un BUT ou une licence pro) ou sur les deux dernières années ; 50 places au concours 2026",
    places: "Rentrée 2026 : 281 places en BCPST, 12 en TB, 15 en MP et PC ; 50 places en apprentissage",
    cout: "1 959 € par an au taux plein (2024) ; boursiers des échelons 0,5 à 7 exonérés ; gratuit en apprentissage",
  },
  eae: {
    accroche: "Tu deviens officier de l'armée de l'Air et de l'Espace, avec un diplôme d'ingénieur.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    places:
      "Rentrée 2026 : 77 places après prépa (47 officiers de l'air, 16 mécaniciens, 14 des bases) et 21 sur titre",
    cout: "0 € en 2026 : scolarité gratuite et rémunérée pour tout élève officier",
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
      "Tu vises l'enseignement supérieur ou la recherche : 70 % des élèves poursuivent en thèse, et l'école affiche 83 % de réussite à l'agrégation (chiffres de 2023).",
    plus: "Ses concours s'ouvrent aux filières PSI, PT, TSI et ATS en plus de MP et MPI, avec un département de mécatronique et un département de sciences du sport (concours 2SEP).",
    station: "ecole-ingenieurs",
    url: "https://www.ens-rennes.fr/",
    accroche:
      "Tu vises l'enseignement supérieur ou la recherche : 70 % des élèves poursuivent en thèse, et l'école affiche 83 % de réussite à l'agrégation (chiffres de 2023).",
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
    ville: "Marseille (Château-Gombert) et Nice",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, TSI, puis concours Centrale-Supélec ; PT via la Banque PT ; aussi sur titre",
    duree: "3 ans après bac+2",
    places: "Concours 2026 : 265 places Centrale-Supélec (90 MP, 10 MPI, 90 PC, 70 PSI, 5 TSI) et 5 en PT",
    cout: "2 600 € par an en 2025-2026 ; depuis la rentrée 2026, droits modulés selon le revenu fiscal de la famille ; apprentis exonérés",
    formations:
      "Trois semestres de socle scientifique commun, rythmés par 4 semaines de cours puis 1 semaine d'activités en entreprise.",
    debouches: "Centrale Méditerranée forme des ingénieurs généralistes pour l'industrie, le conseil et la recherche.",
    plus: "Toute la promotion suit le rythme de l'alternance dès la 1re année : semaines de cours et semaines en entreprise, comme apprenti, en laboratoire, en création d'entreprise ou sous statut étudiant (parcours Train'ing).",
    station: "ecole-ingenieurs",
    url: "https://www.centrale-mediterranee.fr",
    accroche: "Centrale Méditerranée forme des ingénieurs généralistes pour l'industrie, le conseil et la recherche.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Apprentissage dès la 1re année, sur 3 ans, même diplôme : 40 à 45 % du temps en entreprise en 1re année, jusqu'à 65 % ensuite ; 9 semaines à l'étranger",
    une: "Écoles Centrale, concours Centrale-Supélec",
    uneRang: 27,
    uneVoie: "prepa",
  },
  {
    id: "mines-saint-etienne",
    name: "École nationale supérieure des mines de Saint-Étienne",
    short: "Mines Saint-Étienne",
    line: "sciences",
    ville: "Saint-Étienne ; Gardanne (ISMIN) ; Lyon (FUSION)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis concours Mines-Ponts ; ISMIN via le concours Mines-Télécom",
    duree: "3 ans après bac+2",
    places: "Concours Mines-Ponts 2026 : 154 places (40 MP, 20 MPI, 42 PC, 45 PSI, 6 PT, 1 TSI), dont 25 pour FUSION",
    cout: "3 600 € par an pour les nouveaux élèves de la rentrée 2026, plus la CVEC ; boursiers du Crous exonérés ; FUSION : 15 500 € par an",
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
      "4 diplômes de spécialité en alternance sur 3 ans avec l'ISTP : génie industriel, génie nucléaire, systèmes électroniques embarqués, ingénierie énergétique",
    une: "Concours Mines-Ponts",
    uneRang: 28,
    uneVoie: "prepa",
  },
  {
    id: "mines-nancy",
    name: "École nationale supérieure des mines de Nancy",
    short: "Mines Nancy",
    line: "sciences",
    ville: "Nancy (campus Artem) ; Saint-Dié-des-Vosges",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis concours Mines-Ponts ; aussi Prépa des INP, CUPGE, sur titre",
    duree: "3 ans après bac+2",
    places:
      "Concours Mines-Ponts 2026 : 141 places (46 MP, 12 MPI, 36 PC, 40 PSI, 6 PT, 1 TSI) ; 7 places pour La Prépa des INP",
    cout: "2 613 € par an pour les élèves de l'Union européenne (notice du concours 2026) ; boursiers exonérés",
    formations: "1re année : tronc commun scientifique et managérial, stage opérateur d'un mois.",
    debouches:
      "Mines Nancy forme des ingénieurs généralistes pour l'énergie, le numérique, les matériaux, le génie civil et l'industrie.",
    plus: "Avec l'alliance Artem, tu mènes en 2e année un projet un jour par semaine avec des étudiants en art et en management de Nancy.",
    station: "ecole-ingenieurs",
    url: "https://mines-nancy.univ-lorraine.fr",
    accroche:
      "Mines Nancy forme des ingénieurs généralistes pour l'énergie, le numérique, les matériaux, le génie civil et l'industrie.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Diplôme de spécialité Génie mécanique, parcours Ingénierie de la conception, en apprentissage sur 3 ans à Saint-Dié-des-Vosges",
    une: "Concours Mines-Ponts",
    uneRang: 29,
    uneVoie: "prepa",
  },
  {
    id: "supoptique",
    name: "Institut d'Optique Graduate School",
    short: "SupOptique (IOGS)",
    line: "sciences",
    ville: "Palaiseau, puis Bordeaux-Talence ou Saint-Étienne",
    kind: "École d'ingénieurs privée",
    acces: "Prépa MP, MPI, PC, PSI, TSI, puis concours Centrale-Supélec ; PT via la Banque PT ; aussi sur titre",
    duree: "3 ans après bac+2",
    places: "Concours 2026 : 124 places en MP, MPI, PC et PSI (dont 6 pour candidats étrangers) et 15 en PT",
    cout: "3 200 € par an en 2026 (9 600 € pour les 3 ans) ; frais réduits selon l'échelon de bourse",
    formations: "La 1re année, commune, se passe à Palaiseau.",
    debouches:
      "SupOptique forme des ingénieurs de l'optique et de la photonique : systèmes optiques, imagerie, vision artificielle, nanosciences.",
    plus: "Une école tout entière consacrée à l'optique, fondée en 1917, adossée à trois laboratoires : Charles Fabry à Palaiseau, LP2N à Bordeaux, Hubert Curien à Saint-Étienne.",
    station: "ecole-ingenieurs",
    url: "https://www.institutoptique.fr",
    accroche:
      "SupOptique forme des ingénieurs de l'optique et de la photonique : systèmes optiques, imagerie, vision artificielle, nanosciences.",
    statut: "prive",
    recrutement: ["prepa", "titre"],
    alternance: "Filière d'ingénieur par apprentissage, portée par le CFA SupOptique",
  },
  {
    id: "chimie-paristech",
    name: "Chimie ParisTech – PSL",
    short: "Chimie ParisTech (ENSCP)",
    line: "sciences",
    ville: "Paris (5e arrondissement)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa PC ou PSI, puis concours Mines-Ponts ; aussi TPC, BCPST, CPI Gay-Lussac, ATS et sur titre",
    duree: "3 ans après bac+2",
    places: "Concours Mines-Ponts 2026 : 71 places (68 PC, 3 PSI) ; plus des places en BCPST, CPI, ATS et sur dossier",
    cout: "2026-2027 : 1 200 € en 1re année, 628 € en 2e et 3e années (Europe), plus 105 € de CVEC ; bourses sur critères sociaux possibles",
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
    recrutement: ["prepa", "titre"],
    alternance: "3e année possible en contrat de professionnalisation d'un an : l'élève est salarié d'une entreprise",
    une: "Concours Mines-Ponts",
    uneRang: 32,
    uneVoie: "prepa",
  },
  {
    id: "ensimag",
    name: "Grenoble INP – Ensimag",
    short: "Ensimag",
    line: "sciences",
    ville: "Saint-Martin-d'Hères (domaine universitaire de Grenoble)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, puis Concours Commun INP ; aussi Banque PT, Prépa des INP, sur titre",
    duree: "3 ans après bac+2",
    places: "Concours Commun INP 2026 : 160 places (110 MP, 40 MPI, 5 PC, 5 PSI) ; 10 places en PT",
    cout: "630 € par an en 2026-2027 (tarif fixé par l'État), plus 105 € de CVEC ; boursiers du Crous et apprentis exonérés",
    formations: "Le cursus dure 3 ans après la prépa.",
    debouches: "L'Ensimag forme des ingénieurs en informatique, mathématiques appliquées et télécommunications.",
    plus: "Une école de Grenoble INP – UGA, créée en 1960, consacrée à l'informatique et aux mathématiques appliquées, avec une voie en apprentissage pour le même diplôme d'ingénieur.",
    station: "ecole-ingenieurs",
    url: "https://ensimag.grenoble-inp.fr",
    accroche: "L'Ensimag forme des ingénieurs en informatique, mathématiques appliquées et télécommunications.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance: "Même diplôme d'ingénieur sous statut d'apprenti, avec l'ITII Dauphiné-Vivarais",
  },
  {
    id: "ensai",
    name: "École nationale de la statistique et de l'analyse de l'information",
    short: "ENSAI",
    line: "sciences",
    ville: "Bruz, campus de Ker Lann (métropole de Rennes)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, puis Concours Commun INP, en élève ingénieur ou en élève fonctionnaire de l'Insee",
    duree: "3 ans après bac+2 pour le diplôme d'ingénieur",
    places:
      "Concours Commun INP 2026 : 63 places d'élèves ingénieurs et 29 d'élèves fonctionnaires (attachés statisticiens)",
    cout: "Ingénieurs : 2 650 € par an (données 2024). Fonctionnaires : études payées 1 900 € bruts par mois, contre 8 ans au service de l'État",
    formations:
      "1re année : socle commun en statistique, économie et informatique. 2e année : statistique avancée et deux grands projets.",
    debouches:
      "L'ENSAI forme des ingénieurs de la donnée : statistique, data science, gestion des risques, biostatistique.",
    plus: "Sur le même concours, tu peux entrer comme élève ingénieur ou comme élève fonctionnaire : l'attaché statisticien stagiaire de l'Insee touche 1 900 € bruts par mois pendant ses études, puis environ 3 500 € dès sa titularisation.",
    station: "ecole-ingenieurs",
    url: "https://www.ensai.fr",
    accroche:
      "L'ENSAI forme des ingénieurs de la donnée : statistique, data science, gestion des risques, biostatistique.",
    statut: "public",
    recrutement: ["prepa"],
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
    places: "Cycle ingénieur 2026 : 50 via e3a-Polytech, 80 sur titre, 80 en apprentissage",
    cout: "2026-2027 : 10 000 € en P1, jusqu'à 12 000 € en ING3 ; boursiers : bourse Crous de 1 454 à 6 335 € et bourses de l'école",
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
    places: "2026 : 60 places en prépa Informatique et technologies numériques (Paris)",
    cout: "2026-2027 : 9 000 € par an en prépa, 10 850 € en cycle ingénieur ; boursiers Crous : 2 000 € de réduction par an",
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
      "Sept cycles ingénieur par apprentissage après un bac+2 ou la prépa : BTP, énergie, aéronautique, robotique, numérique, agriculture, paysage",
  },
  {
    id: "cesi",
    name: "CESI École d'ingénieurs",
    short: "CESI",
    line: "postbac",
    ville: "26 campus en France, dont Lyon, Lille, Bordeaux et Nantes",
    kind: "École d'ingénieurs privée, après le bac",
    acces: "Parcoursup : dossier, puis oral devant un jury de mars à avril 2026",
    duree: "5 ans après le bac",
    places: "Capacité fixée campus par campus, publiée sur la fiche Parcoursup de chaque campus",
    cout: "Prépa 6 500 € et cycle ingénieur 8 500 € par an (tarifs d'octobre 2026) ; frais de dossier gratuits pour les boursiers",
    formations:
      "En prépa intégrée (2 ans) : maths, physique, informatique, mécanique, électronique, énergétique, matériaux, gestion de projet et anglais, avec un stage de 3 mois en fin de 1re année.",
    debouches: "CESI forme ses ingénieurs sur 26 campus : tu peux souvent étudier près de chez toi.",
    plus: "Pédagogie active par projets : dès la 1re année, tu apprends en équipe à partir de situations professionnelles.",
    station: "cycle-integre",
    url: "https://www.cesi.fr/",
    accroche: "CESI forme ses ingénieurs sur 26 campus : tu peux souvent étudier près de chez toi.",
    statut: "prive",
    recrutement: ["postbac", "titre"],
    alternance: "Dès la 3e année : généraliste, informatique, BTP, systèmes électriques & électroniques embarqués",
  },
  {
    id: "esigelec",
    name: "ESIGELEC, école supérieure d'ingénieurs en génie électrique",
    short: "ESIGELEC",
    line: "postbac",
    ville: "Rouen et Poitiers",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces: "Concours Avenir : dossier, puis QCM le 2 mai 2026 (profil violet) ou oral le 11 avril 2026 (profil orange)",
    duree: "5 ans après le bac",
    places: "Rouen, profil violet : 100 places en 2026 (120 en 2025, pour 3 917 candidats)",
    cout: "2026-2027 : prépa 7 800 € par an (5 850 € pour les boursiers), cycle ingénieur 8 280 € par an",
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
      "Entrée en 3e, 4e ou 5e année, avec les 16 majeures, à Rouen et à Poitiers ; 160 places en 3e année en 2026-2027",
  },
  {
    id: "eseo",
    name: "ESEO, école supérieure d'électronique de l'Ouest",
    short: "ESEO",
    line: "postbac",
    ville: "Angers, Dijon et Paris-Vélizy",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces: "Concours Puissance Alpha : QCU de maths, sciences appliquées et anglais le 25 avril 2026",
    duree: "5 ans après le bac",
    places:
      "Angers, 2026 : 43 places en prépa intégrée et 24 en prépa associée CPGE MPSI ; Dijon et Paris-Vélizy à part",
    cout: "2026-2027 : prépa 6 550 € par an (7 600 € à Paris-Vélizy), cycle ingénieur 9 390 € ; mêmes frais pour les boursiers",
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
      "Cycle ingénieur de 3 ans à Angers, Dijon et Paris-Vélizy : informatique et SI, systèmes embarqués (électronique, ou logiciels et cybersécurité)",
  },
  {
    id: "eigsi",
    name: "EIGSI, école d'ingénieurs généralistes – La Rochelle",
    short: "EIGSI",
    line: "postbac",
    ville: "La Rochelle et Casablanca (Maroc)",
    kind: "École d'ingénieurs privée reconnue par l'État, après le bac",
    acces: "Concours Avenir : écrits le 2 mai 2026 (profil violet) ou oraux le 11 avril 2026 (profil orange)",
    duree: "5 ans après le bac",
    places: "La Rochelle, profil violet : 125 places en 2026 (4 207 candidats en 2025)",
    cout: "8 800 € par an en 2026-2027 ; sur Parcoursup, 8 280 € en 2025-2026, même montant pour les boursiers",
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
      "Depuis 2012 : 3 ans à La Rochelle après un bac+2 scientifique, dont 12 semaines à l'étranger ; 350 alternants",
  },
  {
    id: "eni",
    name: "Écoles nationales d'ingénieurs (ENI) : ENIB Brest, ENIM Metz, Centrale Lyon ENISE, ENIT Tarbes",
    short: "ENI",
    line: "postbac",
    ville: "Brest, Metz, Saint-Étienne et Tarbes",
    kind: "École d'ingénieurs publique, après le bac",
    acces: "Geipi Polytech : dossier, puis écrit de 3 h le 28 avril 2026 (bac général) ou entretien (STI2D)",
    duree: "5 ans après le bac",
    places: "558 places en 2026 : ENIB 120, ENIM 148, Centrale Lyon ENISE 120, ENIT 170",
    cout: "628 € par an en 2025-2026, 630 € en 2026-2027 ; ENISE : 1 613 € à 4 113 € en cycle ingénieur ; gratuit pour les boursiers",
    formations:
      "2 ans de prépa intégrée (maths, physique, informatique, sciences de l'ingénieur, langues), puis 3 ans de cycle ingénieur avec une option : génie mécanique, industriel, BTP ou matériaux à Tarbes ; mécanique-matériaux, conception-industrialisation ou management industriel à Metz ; génie mécanique, civil ou sensoriel à Saint-Étienne ; électronique, informatique ou robotique à Brest.",
    debouches:
      "Quatre écoles publiques, gratuites pour les boursiers, qui forment des ingénieurs de terrain pour l'industrie : mécanique, production, matériaux, BTP, et électronique-informatique à Brest.",
    plus: "Des écoles très tournées vers l'entreprise : plus de 50 semaines de stage à l'ENIT, trois semestres en entreprise à l'ENIM.",
    station: "cycle-integre",
    url: "https://www.geipi-polytech.org/",
    accroche:
      "Quatre écoles publiques, gratuites pour les boursiers, qui forment des ingénieurs de terrain pour l'industrie : mécanique, production, matériaux, BTP, et électronique-informatique à Brest.",
    statut: "public",
    recrutement: ["postbac", "titre", "prepa"],
    alternance:
      "Cycle ingénieur en 3 ans après un bac+2 ou un bac+3 : ENIM (mécanique, nucléaire), ENISE (génie mécanique, civil), ENIT (BTP, génie mécanique ou industriel)",
  },
  {
    id: "enseeiht",
    name: "Toulouse INP – ENSEEIHT",
    short: "ENSEEIHT (N7)",
    line: "sciences",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP et sur titre",
    duree: "3 ans après bac+2",
    places:
      "298 places après une prépa MP, MPI, PC, PSI, PT ou TSI, réparties entre trois départements (tableau de septembre 2026)",
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
    name: "Toulouse INP – ENSIACET",
    short: "ENSIACET (A7)",
    line: "sciences",
    ville: "Toulouse",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, TPC, puis Concours Commun INP ; aussi prépas intégrées et sur titre",
    duree: "3 ans après bac+2",
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
    name: "Grenoble INP – Phelma, UGA",
    short: "Phelma",
    line: "sciences",
    ville: "Grenoble",
    kind: "École d'ingénieurs publique",
    acces: "Prépa scientifique puis Concours Commun INP ; aussi BCPST, Prépa des INP et sur titre",
    duree: "3 ans après bac+2",
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
    name: "Grenoble INP – Ense3, UGA",
    short: "Ense3",
    line: "sciences",
    ville: "Grenoble",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP, BUT et sur titre",
    duree: "3 ans après bac+2",
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
      "Filière PRODISE en 3 ans (production, distribution et stockage des énergies) : de bac+2 à bac+4, 25 places, alternance d'un à deux mois",
  },
  {
    id: "enseirb-matmeca",
    name: "Bordeaux INP – ENSEIRB-MATMECA",
    short: "ENSEIRB-MATMECA",
    line: "sciences",
    ville: "Talence (métropole de Bordeaux)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, MPI, PC, PSI, PT, TSI, puis Concours Commun INP ; aussi Prépa des INP, CPBx et sur titre",
    duree: "3 ans après bac+2",
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
    duree: "3 ans après bac+2",
    places: "206 places au concours Mines-Télécom (session 2027) ; 42 places en apprentissage en 1re année",
    cout: "3 600 € par an pour un entrant de 2026 (UE) ; boursiers d'État exonérés ; apprentis exonérés",
    formations: "Le cycle généraliste mêle cours, projets et stages en lien étroit avec les entreprises.",
    debouches:
      "Télécom SudParis forme des ingénieurs du numérique : IA et data science, développement logiciel, réseaux et cloud, cybersécurité.",
    plus: "Deux campus : Évry-Courcouronnes (7,5 ha) et Palaiseau, dans un bâtiment partagé avec Télécom Paris au sein de l'Institut Polytechnique de Paris.",
    station: "ecole-ingenieurs",
    url: "https://www.telecom-sudparis.eu/formation/ingenieur-generaliste/",
    accroche:
      "Télécom SudParis forme des ingénieurs du numérique : IA et data science, développement logiciel, réseaux et cloud, cybersécurité.",
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
    acces:
      "Prépa MP, MPI, PC, PSI, PT, TSI, BCPST, puis concours Mines-Télécom ; après le bac, sur Parcoursup (160 places en 2025) ; aussi sur titre",
    duree: "3 ans après une prépa, 5 ans après le bac",
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
    recrutement: ["prepa", "postbac", "titre"],
    alternance:
      "Cinq diplômes de spécialité en apprentissage, en 3 ans après un bac+2 : génie industriel, matériaux, énergie et nucléaire, ferroviaire, informatique et réseaux",
    une: "Taux d'accès Parcoursup 2025 : 24 %",
    uneRang: 24,
    uneVoie: "postbac",
  },
  {
    id: "imt-mines-albi",
    name: "IMT Mines Albi-Carmaux",
    short: "IMT Mines Albi",
    line: "sciences",
    ville: "Albi (campus Jarlard, 24 ha)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, MPI, PT, TSI, BCPST, puis concours Mines-Télécom ; aussi sur titre et en alternance",
    duree: "3 ans après bac+2",
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
    duree: "3 ans après bac+2",
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
    duree: "3 ans après bac+2",
    places:
      "Concours Mines-Ponts 2026 : 91 places à Brest ; Défense & Sécurité 2026 : 45 places civiles et 45 IETA (indicatives)",
    cout: "2 936 € par an en 2026-2027 (UE) ; boursiers du Crous exonérés ; élèves IETA rémunérés par la DGA",
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
      "Trois cycles d'ingénieur en apprentissage, sur 3 ans : systèmes embarqués, architecture navale, systèmes pyrotechniques",
    une: "Concours Mines-Ponts",
    uneRang: 71,
    uneVoie: "prepa",
  },
  {
    id: "ensea",
    name: "ENSEA",
    short: "ENSEA",
    line: "sciences",
    ville: "Cergy (Val-d'Oise)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, MPI, puis concours CentraleSupélec ; aussi PT, TSI, ATS, BUT ou licence",
    duree: "3 ans après bac+2",
    places: "En 2026 : 175 places au concours CentraleSupélec, 20 en PT, 10 en TSI, 15 en ATS ; 56 en apprentissage",
    cout: "630 € par an en 2026-2027 (tarif national), plus 295 € de frais (montant 2025) ; boursiers exonérés des droits ; apprentis salariés",
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
    duree: "3 ans après bac+2",
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
    duree: "3 ans après bac+2",
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
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; boursiers exonérés des droits d'inscription",
    formations:
      "Un tronc commun en sciences fondamentales et sciences de l'ingénieur, avec des projets tout au long du cursus (innovation, conception, R&D).",
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
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; boursiers exonérés des droits d'inscription ; Chemplast gratuit et salarié",
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
  {
    id: "sigma-clermont",
    name: "École d'ingénieurs SIGMA Clermont",
    short: "SIGMA Clermont",
    line: "sciences",
    ville: "Aubière (campus des Cézeaux), près de Clermont-Ferrand",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PC, PSI, TPC ou TSI, puis CCINP ; CPI de chimie après le bac ; apprentissage après un bac+3",
    duree: "3 ans après une prépa ou un cycle préparatoire",
    places: "Rentrée 2026 : 124 places au CCINP (PSI 62, PC 32, MP 20, TSI 8, TPC 2) et 48 en apprentissage",
    cout: "630 € par an en 2026-2027, plus 105 € de CVEC ; boursiers exonérés des droits d'inscription",
    formations:
      "Trois spécialités sous statut étudiant : chimie, génie des procédés et énergétique, mécanique (département mécanique avancée) ; une quatrième en apprentissage, mécanique et génie industriel.",
    debouches: "Tu choisis entre la chimie et les procédés d'un côté, la mécanique et l'industrie de l'autre.",
    plus: "Née de la fusion de l'IFMA (mécanique) et de l'ENSCCF (chimie), SIGMA Clermont réunit chimie et mécanique sur le campus des Cézeaux.",
    station: "ecole-ingenieurs",
    url: "http://www.sigma-clermont.fr",
    accroche: "Tu choisis entre la chimie et les procédés d'un côté, la mécanique et l'industrie de l'autre.",
    statut: "public",
    recrutement: ["prepa", "titre", "postbac"],
    alternance:
      "Mécanique et génie industriel en apprentissage, 3 ans : 48 places en 2026, après un bac+3, un BTS ou une 2e année de prépa",
  },
  {
    id: "enac",
    name: "École nationale de l'aviation civile",
    short: "ENAC",
    line: "sciences",
    ville: "Toulouse (apprentis : 3 semestres à Montpellier d'abord)",
    kind: "École d'ingénieurs publique",
    acces: "Prépa MP, PSI, PC, MPI ou PT, puis concours Mines-Télécom ; aussi en apprentissage après une L3 ou un BUT",
    duree: "3 ans après une prépa",
    places:
      "Rentrée 2026 : 108 places au concours Mines-Télécom (90 civils, 18 fonctionnaires) et 35 au plus en apprentissage",
    cout: "1 500 € par an en 2026 pour un élève civil, gratuit pour les boursiers ; élève fonctionnaire payé environ 1 500 € nets par mois",
    formations:
      "1re année commune : opérations aériennes et sécurité, trafic aérien, avionique et télécoms, maths, informatique.",
    debouches:
      "Tu deviens ingénieur généraliste de l'aéronautique, tourné vers la sécurité et la transition du transport aérien.",
    plus: "C'est l'école de la DGAC, qui forme aussi pilotes, contrôleurs aériens et techniciens de l'aviation civile.",
    station: "ecole-ingenieurs",
    url: "https://www.enac.fr",
    accroche:
      "Tu deviens ingénieur généraliste de l'aéronautique, tourné vers la sécurité et la transition du transport aérien.",
    statut: "public",
    recrutement: ["prepa", "titre"],
    alternance:
      "Ingénieur ENAC par apprentissage, 3 ans (Montpellier puis Toulouse) : 35 places au plus en 2026, après une L3, un BUT ou une prépa ATS ou TSI",
  },
]);
