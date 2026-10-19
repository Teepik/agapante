/**
 * Les établissements des nouvelles voies : lycées professionnels, IUT, instituts, écoles post-bac.
 * Contenu rassemblé et vérifié en octobre 2026, avec ses sources ; régénéré par un script.
 */
import type { Ecole } from "./ecoles";

export const ecolesVoies: Ecole[] = [
  {
    id: "reseau-polytech",
    name: "Réseau Polytech",
    short: "Polytech",
    line: "postbac",
    ville:
      "16 écoles : Angers, Annecy-Chambéry, Clermont, Dijon, Grenoble, Lille, Lyon, Marseille, Montpellier, Nancy, Nantes, Nice Sophia, Orléans, Paris-Saclay, Sorbonne (Paris), Tours",
    kind: "Écoles publiques d'ingénieurs des universités, après le bac",
    acces: "Concours Geipi Polytech sur Parcoursup : dossier et épreuve écrite de 3 heures (28 avril 2026)",
    duree: "5 ans : 2 ans de cycle préparatoire (PeiP), puis 3 ans de cycle ingénieur",
    places:
      "Polytech Nantes : 140 places en 2026 pour 11 369 vœux ; en 2025, 11 262 candidats, 5 107 propositions, 139 entrées. Polytech Lille : 180 places en 2026 pour 11 532 vœux.",
    cout: "178 € par an en PeiP à Polytech Nantes (tarif licence, 2025-2026), puis le tarif ingénieur public, 630 € en 2026-2027 ; gratuit pour les boursiers ; concours 60 €, offert aux boursiers",
    formations:
      "Une centaine de spécialités dans 12 domaines : informatique, électronique, génie électrique, mécanique, génie civil, génie industriel, matériaux, énergie et procédés, eau et environnement, biotechnologies et agroalimentaire, génie biomédical, mathématiques appliquées.",
    debouches:
      "À Polytech Nantes, plus de 90 % des diplômés ont un emploi moins de 3 mois après l'école, dans le conseil, l'informatique, l'automobile, l'aéronautique, l'énergie, le BTP ou l'agroalimentaire.",
    plus: "Après le PeiP, tu peux changer d'école à l'intérieur du réseau : 80 à 90 % des élèves passent en cycle ingénieur. L'apprentissage est possible dès le cycle ingénieur.",
    station: "cycle-integre",
    url: "https://www.polytech-reseau.org",
    sources: [
      "https://www.geipi-polytech.org/private/6916f1fec3c34?utm_id=22",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=17&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=25&typeBac=0&originePc=0",
      "https://www.polytech-reseau.org/en/?p=1376",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  {
    id: "prepa-des-inp",
    name: "La Prépa des INP",
    line: "postbac",
    ville: "Talence (Bordeaux), Saint-Martin-d'Hères (Grenoble), Vandœuvre-lès-Nancy, Saint-Denis de La Réunion…",
    kind: "Cycle préparatoire intégré public du Groupe INP, après le bac",
    acces: "Parcoursup : dossier, puis entretien de 15 à 20 minutes (du 27 avril au 12 mai 2026)",
    duree: "2 ans de prépa intégrée, puis 3 ans dans une école du Groupe INP ou d'un partenaire",
    places:
      "En 2026 : 113 places à Grenoble pour 3 622 vœux, 86 à Nancy, 70 à Bordeaux, 28 à La Réunion. À Grenoble en 2025 : 3 540 candidats, 979 propositions, 119 entrées.",
    cout: "Droits d'ingénieur public : 628 € en 2025-2026 (630 € en 2026-2027), plus 105 € de CVEC ; gratuit pour les boursiers ; frais de candidature 90 €, 5 € pour les boursiers",
    formations:
      "1 800 heures en deux ans, environ 30 heures par semaine : un tronc commun de 1 450 heures, puis 320 heures d'enseignements à choix en 2e année, tournés vers les écoles du réseau ; un projet et un stage pour finir.",
    debouches:
      "Plus de 40 écoles d'ingénieurs du Groupe INP et partenaires, dans toutes les spécialités ; le Groupe INP diplôme environ un ingénieur sur six en France.",
    plus: "Le passage se fait au contrôle continu, par classement : en 2025, 99 % des élèves sont entrés en école, et plus de 90 % ont obtenu l'un de leurs trois premiers vœux.",
    station: "cycle-integre",
    url: "https://www.la-prepa-des-inp.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=4&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=3&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=5&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=6&typeBac=0&originePc=0",
      "https://www.univ-lorraine.fr/orientation-insertion-professionnelle/wp-content/uploads/sites/7/2023/12/la-prepa-des-inp-2024-ok.pdf",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  {
    id: "utt",
    name: "Université de technologie de Troyes",
    short: "UTT",
    line: "postbac",
    ville: "Troyes",
    kind: "Université de technologie publique, école d'ingénieurs après le bac",
    acces:
      "Parcoursup, procédure des universités de technologie : dossier, test de langue en ligne, entretien en petit groupe en visioconférence (avril-mai 2026)",
    duree: "5 ans : 2 ans de tronc commun, puis 3 ans dans une branche",
    places: "314 places en 2026 pour 5 395 vœux ; en 2025, 5 450 candidats, 2 364 propositions, 357 entrées",
    cout: "628 € par an en 2025-2026 (630 € en 2026-2027), gratuit pour les boursiers ; frais de candidature 105 €, offerts aux boursiers",
    formations:
      "Branches : génie industriel, génie mécanique, informatique et systèmes d'information, matériaux, réseaux et télécommunications, systèmes numériques et intelligence artificielle ; plusieurs se font aussi en apprentissage.",
    debouches:
      "Chef de projet, consultant, ingénieur d'études et de développement, sécurité des systèmes d'information, logistique, recherche et développement, dans les transports, le luxe, le conseil, l'énergie ou le BTP.",
    plus: "Le choix de la branche est libre à la fin du tronc commun, sans classement interne. Un semestre d'études à l'étranger est possible dès le 4e semestre, en Europe, en Chine ou au Canada.",
    station: "cycle-integre",
    url: "https://www.utt.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=54&typeBac=0&originePc=0",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  {
    id: "utbm",
    name: "Université de technologie de Belfort-Montbéliard",
    short: "UTBM",
    line: "postbac",
    ville: "Belfort, Sévenans, Montbéliard",
    kind: "Université de technologie publique, école d'ingénieurs après le bac",
    acces: "Parcoursup, procédure des universités de technologie : dossier et entretien",
    duree: "5 ans : 4 semestres de tronc commun, puis 3 ans de spécialité",
    places: "290 places en 2026 pour 4 577 vœux ; en 2025, 4 584 candidats, 3 066 propositions, 316 entrées",
    cout: "628 € par an en 2025-2026 (630 € en 2026-2027), gratuit pour les boursiers ; frais de candidature 105 €, offerts aux boursiers",
    formations:
      "Un tronc commun de maths, physique, informatique, chimie, dessin technique, fabrication et conception ; puis énergie et génie électrique, mécanique et ergonomie, mécanique, informatique, génie industriel, ou une spécialité en apprentissage dès la 3e année (mécanique et transports, logistique industrielle…).",
    debouches:
      "Chef de projet, responsable recherche et développement, ingénieur méthodes ou calcul, dans la mécanique, l'énergie, l'aéronautique, la défense, les transports ou l'horlogerie.",
    plus: "La spécialité se choisit à la fin du tronc commun, sans sélection ni classement ; un stage de 4 semaines est prévu dès le tronc commun.",
    station: "cycle-integre",
    url: "https://www.utbm.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=56&typeBac=0&originePc=0",
      "https://www.service-public.gouv.fr/particuliers/vosdroits/F2865",
    ],
  },
  {
    id: "esiee-paris",
    name: "ESIEE Paris",
    line: "postbac",
    ville: "Champs-sur-Marne (cité Descartes)",
    kind: "École d'ingénieurs à la fois publique et consulaire, membre fondateur de l'Université Gustave Eiffel, après le bac",
    acces: "Parcoursup, par le concours Puissance Alpha : dossier et QCM le 25 avril 2026",
    duree: "5 ans : 2 ans de cycle généraliste, puis 3 ans de cycle ingénieur",
    places:
      "255 places en cycle généraliste et 20 en cycle généraliste renforcé, pour les bacheliers STI2D ou avec une seule spécialité scientifique (brochure 2025-2026) ; taux d'accès Parcoursup de 50 %, selon l'école (2026)",
    cout: "Bourses internes jusqu'à 60 % des frais ; 28 % des élèves sous statut étudiant sont boursiers du Crous ; en apprentissage, scolarité gratuite et salaire (2026)",
    formations:
      "21 filières d'ingénieur, dont 11 en apprentissage : informatique, cybersécurité, data et intelligence artificielle, systèmes embarqués, électronique, génie industriel, e-santé et biotechnologies, énergies renouvelables, génie civil…",
    debouches:
      "Selon l'école : 92 % d'insertion professionnelle, 98 % des diplômés en CDI, 85 % qui signent un contrat avant la fin de leurs études (brochure 2025-2026).",
    plus: "La 1re année commence par un semestre à l'international ; la moitié des élèves du cycle ingénieur sont apprentis. En 2026, l'école rejoint aussi le concours CCINP pour recruter près de 150 élèves de prépa.",
    station: "cycle-postbac",
    url: "https://www.esiee.fr",
    sources: [
      "https://www.esiee.fr/fileadmin/user_upload/Fichiers/brochures/brochure-post-bac-esiee-paris-2025-2026.pdf",
      "https://www.esiee.fr/fileadmin/user_upload/Fichiers/presse/communiques-presse/cp-2026/dossier-de-presse-conf-presse-esieeparis-29-janvier-2026.pdf",
      "https://www.puissance-alpha.fr/media/3952.pdf",
    ],
  },
  {
    id: "epf",
    name: "EPF École d'ingénieurs",
    short: "EPF",
    line: "postbac",
    ville: "Cachan, Troyes, Montpellier, Saint-Nazaire",
    kind: "École d'ingénieurs privée d'intérêt général (EESPIG), sous contrat avec l'État, après le bac",
    acces: "Concours Avenir sur Parcoursup : dossier et trois QCM le 2 mai 2026 (maths, sciences, anglais)",
    duree: "5 ans : 3 ans de tronc commun, puis 2 ans de majeure",
    places: "Cachan : 231 places en 2026 pour 5 345 vœux ; en 2025, 6 045 candidats, 5 223 propositions, 251 entrées",
    cout: "9 880 € par an (2025-2026), 20 % de réduction pour les boursiers, tarifs réduits à Troyes et Saint-Nazaire ; 4e et 5e années gratuites et rémunérées en apprentissage",
    formations:
      "Ingénieur généraliste ; majeures à Cachan : aéronautique et espace, matériaux et structures durables, transformation numérique et supply chain, systèmes numériques et intelligents, e-santé et biomécanique ; parcours franco-allemand et franco-québécois dès la 1re année.",
    debouches:
      "92,7 % des diplômés en emploi 3 mois après le diplôme, 43 065 € bruts par an en moyenne à l'embauche (2024) ; 15,4 % commencent leur carrière à l'étranger.",
    plus: "4 stages en 5 ans et un semestre à l'international ; doubles diplômes possibles avec CentraleSupélec, Sciences Po, Arts et Métiers ou Georgia Tech.",
    station: "cycle-postbac",
    url: "https://www.epf.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=104&typeBac=0&originePc=0",
      "https://www.onisep.fr/ressources/structures-enseignement/ile-de-france/val-de-marne/epf-ecole-d-ingenieurs-generalistes-site-de-paris-cachan/diplome-d-ingenieur-de-l-epf",
      "https://www.onisep.fr/ressources/univers-formation/formations/post-bac/diplome-d-ingenieur-de-l-epf",
    ],
  },
  {
    id: "epita",
    name: "EPITA, école d'ingénieurs en informatique",
    short: "EPITA",
    line: "postbac",
    ville: "Le Kremlin-Bicêtre, Lyon, Toulouse, Rennes, Strasbourg",
    kind: "École d'ingénieurs privée, après le bac",
    acces: "Concours Advance sur Parcoursup : QCM de maths et d'anglais, oral de 30 minutes (avril-mai 2026)",
    duree: "5 ans : 2 ans de cycle préparatoire intégré, puis 3 ans de cycle ingénieur",
    places:
      "Le Kremlin-Bicêtre : 260 places en 2026 pour 3 012 vœux ; en 2025, 2 894 candidats, 2 399 propositions, 321 entrées",
    cout: "10 190 € par an (fiche Parcoursup 2026) ; formation ouverte aux bourses du Crous ; cycle ingénieur possible en apprentissage",
    formations:
      "Informatique : 15 majeures, dont intelligence artificielle, cybersécurité, santé, robotique et systèmes embarqués, image, cloud, informatique quantique ; un cycle anglophone.",
    debouches:
      "Selon l'école : premier emploi en moins de 2 mois pour tous les diplômés, 47 000 € par an en moyenne en France et plus de 55 000 € à l'étranger ; 27 % des diplômés travaillent à l'étranger.",
    plus: "Un semestre à l'étranger dès la 2e année de prépa ; un stage de 5 mois en 4e année et un de 6 mois en 5e année.",
    station: "cycle-postbac",
    url: "https://www.epita.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=130&typeBac=0&originePc=0",
    ],
  },
  {
    id: "ipsa",
    name: "IPSA, école d'ingénieurs de l'air et de l'espace",
    short: "IPSA",
    line: "postbac",
    ville: "Ivry-sur-Seine, Toulouse",
    kind: "École d'ingénieurs privée, après le bac",
    acces: "Concours Advance sur Parcoursup : QCM de maths et d'anglais, oral de 30 minutes (avril-mai 2026)",
    duree: "5 ans : cycle préparatoire, puis cycle ingénieur",
    places:
      "Ivry-sur-Seine : 190 places en 2026 pour 3 914 vœux ; Toulouse : 140 places pour 3 239 vœux. À Ivry en 2025 : 3 439 candidats, 2 500 propositions, 335 entrées.",
    cout: "11 499 € par an (fiche Parcoursup 2026) ; formation ouverte aux bourses du Crous",
    formations:
      "Aéronautique et spatial : 9 majeures en conception, propulsion et systèmes d'engins ; une section anglophone à Ivry ; un cycle ingénieur en apprentissage à Ivry (systèmes aéronautiques autonomes, propulsion aérospatiale).",
    debouches:
      "85 % des diplômés dans l'aéronautique et le spatial ; ingénieur aéronautique, d'essais, d'études ou méthodes ; 44 500 à 46 500 € par an primes incluses à la sortie, selon l'école (2024).",
    plus: "Un semestre dans une université partenaire pour tous les élèves ; doubles diplômes avec l'École navale ou Paris-Saclay.",
    station: "cycle-postbac",
    url: "https://www.ipsa.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=128&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=129&typeBac=0&originePc=0",
    ],
  },
  {
    id: "estaca",
    name: "ESTACA, école d'ingénieurs des transports",
    short: "ESTACA",
    line: "postbac",
    ville: "Montigny-le-Bretonneux (Paris-Saclay), Laval, Bordeaux",
    kind: "École d'ingénieurs privée d'intérêt général (EESPIG), sous contrat avec l'État, après le bac",
    acces: "Concours Avenir sur Parcoursup : dossier et trois QCM le 2 mai 2026 (maths, sciences, anglais)",
    duree: "5 ans",
    places:
      "Paris-Saclay : 230 places en 2026 pour 6 799 vœux ; Laval : 120 places pour 5 114 vœux. À Paris-Saclay en 2025 : 7 377 candidats, 2 763 propositions, 246 entrées.",
    cout: "10 130 € par an (2026-2027), avec des bourses internes ; formation ouverte aux bourses du Crous",
    formations:
      "Ingénieur généraliste des transports : aéronautique, spatial, automobile, ferroviaire et transports urbains, naval ; pédagogie par projets, en effectifs réduits.",
    debouches:
      "Aéronautique (50 % des diplômés), automobile (18 %), ferroviaire (13 %), spatial (12 %) ; la moitié des diplômés sont embauchés par l'entreprise de leur stage de fin d'études.",
    plus: "Passage au contrôle continu, sans concours entre les années ; environ 10 % des élèves font un double diplôme chaque année, et des passerelles mènent aux écoles du groupe ISAE en fin de cursus.",
    station: "cycle-postbac",
    url: "https://www.estaca.fr",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=105&typeBac=0&originePc=0",
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=102&typeBac=0&originePc=0",
    ],
  },
  {
    id: "essec-global-bba",
    name: "ESSEC Global BBA",
    short: "ESSEC BBA",
    line: "postbac",
    ville: "Cergy, Rabat-Salé, Singapour",
    kind: "Bachelor d'une grande école de commerce privée d'intérêt général (EESPIG), après le bac",
    acces:
      "Concours Sésame sur Parcoursup : épreuves écrites à distance (8 avril 2026), puis entretien de motivation et oral d'anglais pour les admissibles",
    duree: "4 ans ; diplôme au grade de licence",
    places:
      "620 places par Sésame en 2026. À Cergy, voie francophone : 325 places pour 8 514 vœux en 2026 ; en 2025, 8 666 candidats, 1 000 propositions, 326 entrées.",
    cout: "17 400 € par an, plus 2 653 € de frais de service en 1re année (fiche Parcoursup 2026) ; scolarité gratuite pour les boursiers du Crous à l'échelon 7, réduite pour les autres boursiers selon les revenus ; concours 315 €, 157,50 € pour les boursiers",
    formations:
      "Gestion, finance, marketing, stratégie, en français ou en anglais ; au moins 6 mois dans l'une des 188 universités partenaires ; 10 à 12 mois d'expériences en entreprise ; apprentissage possible dès la 3e année.",
    debouches:
      "Selon l'ESSEC (étude 2025) : 55 % des diplômés poursuivent en master ; ceux qui travaillent tout de suite gagnent en moyenne 49 000 € bruts par an, et 94 % trouvent un emploi en moins de 6 mois.",
    plus: "En 1re année, une expérience d'un mois dans le secteur social ou humanitaire ; une entrée en 3e année est possible après deux années d'études supérieures.",
    station: "cycle-postbac",
    url: "https://www.essec.edu",
    sources: [
      "https://dossierappel.parcoursup.fr/Candidats/public/fiches/afficherFicheFormation?g_ta_cod=26156&typeBac=0&originePc=0",
      "https://www.concours-sesame.net/media/8742/Rapport-public-2025---ESSEC-BBA---combine.pdf",
      "https://www.essec.edu/fr/programme/global-bba/bba-admission-parallele/financement",
      "https://www.essec.edu/fr/programme/global-bba/bba-admission-parallele/admission",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-02/nombre-de-places-aux-concours-2026-offertes-par-les-tablissements-d-enseignement-sup-rieures-techniques-priv-es-et-consulaires-2026--39467.pdf",
    ],
  },
  {
    id: "edhec-bba",
    name: "EDHEC International BBA",
    short: "EDHEC BBA",
    line: "postbac",
    ville: "Roubaix (métropole lilloise)",
    kind: "Bachelor d'une école de commerce privée, après le bac",
    acces: "Dossier, tests en ligne (motivation, personnalité, anglais), puis épreuves orales",
    duree: "4 ans ; grade de licence, diplôme visé par l'État",
    places: "1 200 places en 1re année en 2026",
    cout: "En 2026 : 15 900 € par an en parcours Business Management, 23 900 € en Global Business, 12 500 € en parcours en ligne ; gratuit en apprentissage en 3e et 4e années (Business Management)",
    formations:
      "Management en français ou en anglais : parcours Business Management, Global Business ou en ligne ; doubles diplômes avec l'UTC (ingénierie digitale et management) et l'Université catholique de Lille (droit et finance internationale).",
    debouches:
      "Finance (35 % des postes), management d'unité et entrepreneuriat (19 %), développement commercial (16 %), marketing et communication (12 %) ; 61 % des diplômés trouvent leur premier emploi avant même le diplôme, et 36 % sont embauchés à l'étranger.",
    plus: "Tous les élèves étudient à l'étranger, de 6 mois à 3 ans ; 13 à 18 mois de stages ; 33 % d'élèves étrangers.",
    station: "cycle-postbac",
    url: "https://www.edhec.edu",
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/edhec-business-school-institut-catholique-de-lille/bachelor-en-sciences-du-management-diplome-superieur-de-management-international-de-l-entreprise-edhec",
    ],
  },
  {
    id: "ieseg",
    name: "IÉSEG School of Management",
    short: "IÉSEG",
    line: "postbac",
    ville: "Lille, Paris",
    kind: "École de commerce privée, programme grande école en 5 ans après le bac",
    acces: "Concours ACCÈS sur Parcoursup ; à partir de 2027, dossier et oraux à la place des épreuves écrites",
    duree: "5 ans ; grade de master, diplôme visé par l'État",
    places:
      "1 200 places en 1re année en 2026 ; aussi 80 places en 3e année après bac+2 et 500 en 4e année après bac+3",
    cout: "14 230 € par an en 2026 (71 150 € pour les 5 ans) ; 4e et 5e années gratuites en apprentissage ; 35 % d'élèves boursiers en 2025",
    formations:
      "Management, finance, audit et contrôle de gestion, marketing, data, opérations ; cours entièrement en anglais de la 2e à la 5e année ; 16 doubles diplômes.",
    debouches:
      "96 % des diplômés en emploi en 4 mois ; 51 750 € bruts par an en moyenne à l'embauche (2024) ; 19 % embauchés à l'étranger.",
    plus: "Tous les élèves partent étudier à l'étranger, de 6 à 12 mois ; 13 mois de stages, dont 6 à l'étranger.",
    station: "cycle-postbac",
    url: "https://www.ieseg.fr",
    sources: [
      "https://www.onisep.fr/ressources/structures-enseignement/hauts-de-france/nord/ieseg-school-of-management/diplome-du-programme-grande-ecole-de-l-ieseg",
      "https://www.enseignementsup-recherche.gouv.fr/sites/default/files/2026-02/nombre-de-places-aux-concours-2026-offertes-par-les-tablissements-d-enseignement-sup-rieures-techniques-priv-es-et-consulaires-2026--39467.pdf",
      "https://www.essca.eu/actualites/concours-acces-nouvelle-etape/",
    ],
  },
];
