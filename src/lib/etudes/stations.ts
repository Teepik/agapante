import type { IconName } from "@/components/etudes/ui";
import { etTypo as frTypo } from "./typo";

export type Fact = {
  icon: Extract<IconName, "clock" | "coins" | "seat" | "key">;
  label: string;
  value: string;
};

export type StationContent = {
  id: string;
  name: string;
  /** Nom court affiché sur le plan. */
  label: string;
  /** Précision affichée sous le nom, sur le plan. */
  sub?: string;
  when: string;
  what: string;
  facts?: Fact[];
  /** 0 à 5 ; absent quand la question ne se pose pas. */
  selectivite?: number;
  selectiviteNote?: string;
  acces?: string[];
  contenu?: string[];
  apres?: string[];
  astuce?: string;
  ecoles?: string[];
};

export const stations: StationContent[] = frTypo([
  /* ---------------- Tronc commun ---------------- */
  {
    id: "college",
    name: "3e",
    label: "3e",
    sub: "Tu es ici, 2026-2027",
    when: "Cette année, 2026-2027, vers 14 ans",
    what: "La dernière année de collège. Tu passes le brevet en juin et tu choisis ton lycée : c'est le moment de visiter, de comparer et de regarder les options qui comptent pour toi.",
    facts: [
      { icon: "clock", label: "Brevet", value: "Juin 2027" },
      { icon: "key", label: "Choix du lycée", value: "De janvier à mai 2027" },
    ],
    contenu: [
      "Passer le brevet : le passer est obligatoire, le conseil de classe décide ensuite du passage en 2nde.",
      "Visiter des lycées et leurs journées portes ouvertes, de janvier à mars.",
      "Venant d'un collège hors contrat : préparer l'examen d'entrée d'un lycée public, ou le dossier d'un lycée privé.",
    ],
    apres: ["2nde générale et technologique", "Lycée de la Défense", "2nde professionnelle"],
    astuce:
      "Tes notes de 4e et de 3e servent déjà : les lycées de la Défense, par exemple, sélectionnent sur les moyennes de français, de maths et d'anglais.",
  },
  {
    id: "seconde",
    name: "2nde",
    label: "2nde",
    sub: "Tronc commun, 2027-2028",
    when: "En 2027-2028, vers 15 ans",
    what: "Une année de tronc commun, avec les mêmes matières pour tous. Au deuxième trimestre, tu choisis les trois spécialités de ta 1re : c'est ta première vraie correspondance.",
    contenu: [
      "Français, maths, histoire-géographie, deux langues, physique-chimie, SVT, SES, numérique.",
      "Des tests de positionnement en français et en maths à la rentrée.",
      "Un stage d'observation de deux semaines en juin, obligatoire.",
    ],
    astuce:
      "Choisis un stage de seconde dans un métier qui t'attire : laboratoire, cabinet d'avocat, régiment, conservatoire. Il nourrira ta lettre de motivation sur Parcoursup.",
  },
  {
    id: "premiere-terminale",
    name: "1re et Terminale",
    label: "1re et Terminale",
    sub: "3, puis 2 spécialités",
    when: "De 2028 à 2030, vers 16 et 17 ans",
    what: "Le cœur du lycée : trois spécialités en 1re, deux en Terminale, plus le tronc commun. Ce sont les bulletins de ces deux années que lisent les formations sélectives.",
    facts: [
      {
        icon: "clock",
        label: "Épreuves anticipées",
        value: "Français et maths, juin 2029",
      },
      {
        icon: "key",
        label: "Calcul du bac",
        value: "40 % contrôle continu, 60 % épreuves finales",
      },
    ],
    contenu: [
      "Trois spécialités en 1re, deux en Terminale.",
      "En Terminale, l'option maths expertes (si tu gardes les maths) ou maths complémentaires (si tu les quittes).",
      "Depuis 2026, une épreuve anticipée de mathématiques en fin de 1re : deux heures, sans calculatrice.",
      "Le grand oral en fin de Terminale.",
    ],
    astuce:
      "Garde les maths le plus longtemps possible : c'est la spécialité qui laisse le plus de portes ouvertes. Fais l'essai dans le simulateur, plus bas.",
  },
  {
    id: "bac",
    name: "Bac",
    label: "Bac",
    sub: "Juin 2030",
    when: "En juin 2030, vers 18 ans",
    what: "Le baccalauréat général ouvre toutes les formations du supérieur. Tes vœux se font sur Parcoursup de janvier à mars de Terminale, et les premières réponses arrivent début juin, avant les résultats du bac.",
    facts: [
      {
        icon: "key",
        label: "Vœux Parcoursup",
        value: "Jusqu'à 10, de janvier à mars 2030",
      },
      { icon: "clock", label: "Premières réponses", value: "Début juin 2030" },
    ],
    contenu: [
      "Épreuves finales : philosophie, les deux spécialités, le grand oral.",
      "Sur Parcoursup, chaque formation lit tes notes de 1re et de Terminale, la fiche Avenir de tes professeurs et ta motivation.",
    ],
    astuce:
      "Les formations sélectives décident sur ton dossier, avant le bac. Une mention reste un beau signal et peut ouvrir des bourses au mérite.",
  },

  /* ---------------- Options du lycée ---------------- */
  {
    id: "lycee-defense",
    name: "Lycée de la Défense",
    label: "Option : lycée de la Défense",
    sub: "Prytanée, Saint-Cyr-l'École…",
    when: "De la 2nde à la Terminale, en internat",
    what: "Des lycées publics du ministère des Armées, réputés pour leur exigence et leur cadre : le Prytanée national militaire à La Flèche, les lycées militaires de Saint-Cyr-l'École, d'Aix-en-Provence et d'Autun, et d'autres lycées de la Marine et de l'Air. Leurs prépas mènent notamment aux écoles d'officiers.",
    facts: [
      {
        icon: "clock",
        label: "Candidature",
        value: "Janvier-février de la 3e",
      },
      {
        icon: "coins",
        label: "Pension",
        value: "Environ 2 600 € par an, remises selon revenus",
      },
    ],
    selectivite: 4,
    selectiviteNote: "Les places vont d'abord aux publics prioritaires, puis aux meilleurs dossiers.",
    acces: [
      "Au moins 70 % des places pour les enfants de militaires, dont les enfants de réservistes opérationnels comptant dix ans de réserve au 1er janvier de l'année d'entrée.",
      "Jusqu'à 15 % pour les enfants d'agents du ministère des Armées et de fonctionnaires, jusqu'à 15 % pour les élèves boursiers.",
      "Sélection sur les moyennes de français, de maths et d'anglais de 4e et du 1er trimestre de 3e.",
      "Moins de 17 ans au 1er janvier de l'année d'entrée en 2nde.",
    ],
    apres: ["Prépas des lycées de la Défense", "Toutes les prépas et universités"],
    astuce:
      "Le Prytanée, à La Flèche, abrite des prépas MPSI, PCSI, MP*, MP, PC, PSI, ECG et littéraires : on peut y rester après le bac.",
  },
  {
    id: "conservatoire",
    name: "Le conservatoire en parallèle",
    label: "En parallèle : conservatoire",
    sub: "Musique et lycée",
    when: "Pendant tout le lycée",
    what: "Tu peux mener ton lycée et un cursus de conservatoire en même temps : horaires aménagés, bac technologique S2TMD (musique), ou voie générale avec la spécialité musique. C'est ce niveau, travaillé au lycée, qui ouvre ensuite les concours des écoles supérieures.",
    contenu: [
      "Bac S2TMD : dès la 2nde, dans 35 lycées associés à un conservatoire ; en Terminale, 7 h de culture musicale et 7 h de pratique.",
      "Voie générale : la spécialité musique (4 h en 1re, 6 h en Terminale) ou l'option musique (3 h).",
      "Au conservatoire : chant ou instrument, formation musicale, chœur ou orchestre, et le cycle préparatoire aux concours du supérieur.",
    ],
    apres: [
      "Pôle supérieur de musique",
      "Conservatoire national supérieur",
      "Musicologie à l'université",
      "Toutes les autres lignes",
    ],
    astuce:
      "Ta pratique de chœur est un atout dans n'importe quel dossier : elle montre la rigueur, l'écoute et l'endurance.",
  },

  /* ---------------- Ligne 6 : Défense ---------------- */
  {
    id: "prepa-officiers",
    name: "Prépa scientifique, ECG ou littéraire",
    label: "Prépa sciences, ECG ou lettres",
    sub: "2 ans",
    when: "Après le bac, 2 ans",
    what: "Les écoles d'officiers recrutent par concours après une prépa. Les lycées de la Défense ont leurs propres prépas, mais toutes les prépas y mènent : scientifiques pour l'École navale et l'École de l'air et de l'espace, scientifiques, économiques ou littéraires pour Saint-Cyr.",
    facts: [{ icon: "clock", label: "Durée", value: "2 ans" }],
    selectivite: 4,
    acces: [
      "Parcoursup, sur dossier.",
      "Pour les prépas des lycées de la Défense : moins de 22 ans au 1er janvier de l'année du concours, et une visite médicale.",
    ],
    contenu: ["Le programme de la prépa choisie, plus le sport et, souvent, une préparation militaire."],
  },
  {
    id: "concours-officiers",
    name: "Les concours d'officier",
    label: "Concours : Saint-Cyr, Navale, Air",
    sub: "écrits, oraux, sport",
    when: "En fin de prépa",
    what: "Chaque école recrute par concours en fin de prépa : Saint-Cyr par les banques scientifique (CCINP), littéraire (BEL) et économique (BCE), l'École navale par le concours Centrale-Supélec, l'École de l'air et de l'espace par le CCINP. La visite médicale et les épreuves sportives s'ajoutent aux écrits et aux oraux.",
    selectivite: 4,
    acces: [
      "Saint-Cyr, 185 places au plus en 2026 : 83 en sciences, 40 par la prépa ECG, 37 en lettres, 25 sur titres universitaires.",
      "École navale : 85 places par les prépas scientifiques en 2026.",
      "École de l'air et de l'espace : 77 places par les prépas scientifiques en 2026, plus des places sur titres à bac+3 et bac+5.",
    ],
    ecoles: ["saint-cyr", "navale", "eae"],
  },
  {
    id: "ecole-officiers",
    name: "École d'officiers",
    label: "École d'officiers",
    sub: "3 ans, rémunéré",
    when: "Après le concours, 3 ans",
    what: "Trois années pour devenir officier : un diplôme de master ou d'ingénieur, une formation militaire exigeante, beaucoup de sport et de commandement. Les élèves sont rémunérés et s'engagent ensuite à servir plusieurs années : six ans après Saint-Cyr, huit ans après l'École navale.",
    facts: [
      { icon: "clock", label: "Durée", value: "3 ans" },
      { icon: "coins", label: "Coût", value: "Formation rémunérée" },
    ],
    contenu: [
      "Formation académique (master ou diplôme d'ingénieur), militaire et humaine.",
      "Commandement, sport, stages en unité et à l'étranger.",
    ],
    apres: ["Lieutenant", "Chef de section", "Officier de marine", "Pilote"],
    ecoles: ["saint-cyr", "navale", "eae", "esa"],
  },
  {
    id: "metiers-defense",
    name: "Officier",
    label: "Officier",
    sub: "Terre, Mer, Air",
    when: "Vers 23 ans",
    what: "Officier, c'est commander : une section d'une trentaine de soldats en sortant d'école, puis une compagnie, un bâtiment, un escadron. C'est un métier d'engagement, avec des responsabilités très tôt.",
    apres: [
      "Chef de section",
      "Commandant d'unité",
      "Officier de marine",
      "Pilote de chasse",
      "Officier d'état-major",
      "Attaché de défense",
    ],
    astuce: "Officier de réserve : on peut aussi servir à temps partiel, à côté d'un autre métier.",
  },

  /* ---------------- Ligne 4 : Santé ---------------- */
  {
    id: "pass-las",
    name: "La licence santé (ex-PASS et LAS)",
    label: "Licence santé",
    sub: "1re année, ex-PASS",
    when: "Après le bac, 1 à 2 ans",
    what: "La porte d'entrée vers médecine, pharmacie, odontologie, maïeutique et kinésithérapie. À partir de la rentrée 2027, une licence unique remplace le PASS et la LAS (nom provisoire : licence « portail santé ») : un bloc santé, un bloc dans une autre discipline au choix, un bloc transversal. Après la 1re ou la 2e année, tu candidates aux filières de santé.",
    facts: [
      {
        icon: "clock",
        label: "Candidature en santé",
        value: "Après la 1re ou la 2e année",
      },
      {
        icon: "coins",
        label: "Coût",
        value: "Droits universitaires : 178 € par an",
      },
    ],
    selectivite: 5,
    selectiviteNote: "Il faut au moins 10 sur 20 dans chaque bloc, puis un bon classement pour obtenir une place.",
    acces: [
      "Un seul vœu sur Parcoursup, avec des sous-vœux pour choisir l'université et la discipline associée.",
      "Un seul redoublement possible.",
    ],
    contenu: [
      "Bloc santé : biologie, chimie, physique, anatomie.",
      "Bloc disciplinaire au choix : sciences, droit, langues, psychologie…",
      "Bloc transversal : méthodes, langues, compétences.",
    ],
    apres: ["Médecine", "Pharmacie", "Odontologie", "Maïeutique", "Kinésithérapie"],
    astuce:
      "Réforme annoncée le 17 avril 2026 : en octobre 2026, les textes définitifs étaient attendus et des doyens demandaient un report à 2028. Vérifie les règles exactes en 2029.",
    ecoles: ["fac-sante"],
  },
  {
    id: "u-sante",
    name: "Licence : le rebond",
    label: "Licence : le rebond",
    sub: "si la santé attend",
    when: "Si la 2e année de santé attend encore",
    what: "Si la santé attend encore, ta licence continue : tes crédits restent acquis, tu poursuis dans la discipline de ton bloc disciplinaire, et tu peux candidater de nouveau après la 2e année.",
    contenu: [
      "Tu passes en 2e année avec tes crédits validés.",
      "Une nouvelle candidature en santé possible après la 2e année.",
    ],
    apres: ["Licence de sciences", "Licence de droit", "Master", "Kinésithérapie, autres métiers de la santé"],
  },
  {
    id: "etudes-sante",
    name: "Les études de santé",
    label: "Études de santé",
    sub: "médecine, pharmacie…",
    when: "De la 2e année jusqu'au diplôme",
    what: "Une fois admis, chaque filière suit son propre chemin, avec des stages à l'hôpital ou en officine de plus en plus nombreux.",
    facts: [
      {
        icon: "clock",
        label: "Médecine",
        value: "Environ 10 ans (généraliste), 10 à 12 ans (spécialiste)",
      },
      {
        icon: "clock",
        label: "Pharmacie, dentaire",
        value: "6 à 9 ans après le bac",
      },
      { icon: "clock", label: "Sage-femme", value: "5 ans après le bac" },
      {
        icon: "clock",
        label: "Kinésithérapie",
        value: "Environ 5 ans après le bac",
      },
    ],
    contenu: [
      "Cours, travaux pratiques, puis stages à l'hôpital dès le deuxième cycle.",
      "Un vrai métier appris au contact des patients.",
    ],
    ecoles: ["fac-sante", "esa"],
  },
  {
    id: "internat",
    name: "L'internat de médecine",
    label: "Internat : ta spécialité",
    sub: "EDN et ECOS",
    when: "À partir de la 7e année",
    what: "En 6e année, des épreuves nationales classent les étudiants : les EDN en octobre (des écrits sur tablette, 60 % du classement), les ECOS au printemps (des examens cliniques face à des patients simulés, 30 %), et ton parcours (10 %). Ton classement décide de ta spécialité et de ta ville d'internat.",
    facts: [
      {
        icon: "clock",
        label: "Durée",
        value: "4 à 6 ans ; 4 ans désormais en médecine générale",
      },
    ],
    selectivite: 4,
    selectiviteNote: "Les spécialités et les villes les plus demandées vont aux mieux classés.",
    contenu: [
      "Tu travailles à l'hôpital comme interne, avec un salaire.",
      "Plus de quarante spécialités : médecine générale, chirurgie, pédiatrie, cardiologie, psychiatrie…",
    ],
  },
  {
    id: "metiers-sante",
    name: "Les métiers de la santé",
    label: "Médecin, pharmacien…",
    sub: "et vétérinaire",
    when: "Entre 24 et 30 ans selon le métier",
    what: "Soigner, prévenir, chercher : les métiers de la santé sont parmi les plus utiles et les plus demandés. Le vétérinaire et l'ingénieur agronome appartiennent à la même famille du vivant.",
    apres: [
      "Médecin généraliste",
      "Chirurgien",
      "Médecin militaire",
      "Pharmacien",
      "Chirurgien-dentiste",
      "Sage-femme",
      "Kinésithérapeute",
      "Vétérinaire",
      "Chercheur en biologie",
    ],
  },

  /* ---------------- Ligne 1 : Sciences ---------------- */
  {
    id: "prepa-scientifique",
    name: "Prépa scientifique",
    label: "Prépa scientifique",
    sub: "MPSI, PCSI, MP2I…",
    when: "Après le bac, 2 ans",
    what: "Deux années très intenses pour préparer les concours des grandes écoles d'ingénieurs et des ENS. En 1re année, tu choisis une voie : MPSI (maths, physique), PCSI (physique, chimie), MP2I (maths, informatique), PTSI (technologie) ou BCPST (biologie, vers l'agronomie et le vétérinaire). La 2e année se fait en MP, PC, PSI, MPI, PT ou BCPST.",
    facts: [
      {
        icon: "clock",
        label: "Durée",
        value: "2 ans, parfois 3 (les « 5/2 »)",
      },
      {
        icon: "coins",
        label: "Coût",
        value: "Gratuite en lycée public ; inscription universitaire de 178 € (boursiers exonérés)",
      },
    ],
    selectivite: 4,
    selectiviteNote: "Les meilleures prépas recrutent surtout des dossiers excellents en maths et en physique.",
    acces: [
      "Parcoursup, sur dossier : notes de 1re et de Terminale, appréciations, fiche Avenir.",
      "Maths et physique-chimie (ou SI, NSI) en Terminale, maths expertes très conseillée.",
    ],
    contenu: [
      "30 à 40 heures de cours par semaine.",
      "Un devoir surveillé chaque semaine, souvent le samedi matin.",
      "Des colles : une interrogation orale par semaine dans les grandes matières.",
    ],
    apres: [
      "Polytechnique",
      "ENS",
      "Mines",
      "Ponts",
      "Centrale",
      "Agronomie",
      "Vétérinaire",
      "Écoles d'officiers",
      "Université en L3",
    ],
    astuce:
      "Les places des prépas du sommet sont rares : en 2025, la MPSI d'Henri-IV a reçu 8 117 candidatures pour 96 places. Au palmarès 2026 de L'Étudiant, Sainte-Geneviève et Hoche (Versailles), Louis-le-Grand, Henri-IV, Saint-Louis et Stanislas (Paris), le Parc (Lyon) et Pierre-de-Fermat (Toulouse) figurent en tête.",
    ecoles: ["polytechnique", "ens-ulm", "centralesupelec", "agroparistech", "veto"],
  },
  {
    id: "u-sciences",
    name: "Licence de sciences ou double licence",
    label: "Licence de sciences",
    sub: "double licence possible",
    when: "Après le bac, ou après une prépa",
    what: "Une licence de sciences (maths, physique, informatique, biologie) ou une double licence. Les doubles licences comptent parmi les formations les plus demandées : la double licence informatique-maths de Paris-Saclay a reçu 1 711 vœux pour 50 places. On peut aussi y entrer après une prépa.",
    acces: ["Parcoursup ; les doubles licences sont très sélectives."],
    apres: ["Master", "Grande école sur titre", "ENS", "Doctorat"],
  },
  {
    id: "concours-ingenieurs",
    name: "Les concours des écoles d'ingénieurs",
    label: "Concours : X-ENS, Mines, Centrale",
    sub: "écrits puis oraux",
    when: "Au printemps de la 2e année de prépa",
    what: "Plusieurs banques de concours se partagent les écoles : X-ENS (Polytechnique, les ENS, l'ESPCI), Mines-Ponts (dix écoles, dont Mines Paris, les Ponts, Supaéro, Télécom Paris), Centrale-Supélec (treize écoles, environ 3 500 places), CCINP (plus de 70 écoles), e3a-Polytech (67 écoles).",
    selectivite: 5,
    selectiviteNote:
      "Polytechnique accueille environ 430 élèves français par promotion ; les écoles du CCINP offrent environ 5 500 places.",
    contenu: [
      "Écrits d'avril à mai, oraux de juin à juillet.",
      "Tu passes plusieurs banques de concours et tu classes tes écoles.",
    ],
    ecoles: ["polytechnique", "ens-ulm", "mines", "ponts", "centralesupelec", "supaero"],
  },
  {
    id: "ecole-ingenieurs",
    name: "Grande école d'ingénieurs",
    label: "Grande école d'ingénieurs",
    sub: "3 ans",
    when: "De bac+2 à bac+5",
    what: "Trois années pour devenir ingénieur : sciences, projets, stages en entreprise ou en laboratoire, semestre à l'étranger. Les écoles les plus prestigieuses ouvrent aussi la recherche et les grands corps de l'État.",
    facts: [
      {
        icon: "clock",
        label: "Durée",
        value: "3 ans après la prépa, 5 ans après le bac",
      },
      {
        icon: "coins",
        label: "Coût",
        value: "De quelques centaines à quelques milliers d'euros par an ; l'X et les ENS rémunèrent leurs élèves",
      },
    ],
    contenu: ["Tronc commun scientifique puis spécialisation.", "Stages, projets, échanges et doubles diplômes."],
    apres: ["Ingénieur", "Chercheur", "Officier ingénieur", "Fondateur de start-up"],
    ecoles: ["polytechnique", "ens-ulm", "mines", "ponts", "centralesupelec", "supaero", "insa", "utc"],
  },
  {
    id: "metiers-sciences",
    name: "Ingénieur, chercheur",
    label: "Ingénieur, chercheur",
    sub: "entrepreneur",
    when: "Vers 23 ans",
    what: "Le diplôme d'ingénieur est l'un des plus recherchés. En 2026, les jeunes ingénieurs gagnaient en moyenne 39 284 € bruts par an hors primes (42 338 € primes comprises), surtout dans le conseil, le numérique, le BTP et les transports. Les écoles du sommet sont bien au-dessus : 55 000 € hors primes en moyenne pour les polytechniciens.",
    facts: [
      {
        icon: "coins",
        label: "Salaire d'embauche",
        value: "39 284 € bruts par an hors primes en moyenne ; 55 000 € pour l'X",
      },
    ],
    apres: [
      "Ingénieur en énergie",
      "Ingénieur aéronautique",
      "Data scientist",
      "Chercheur",
      "Ingénieur de l'armement",
      "Consultant",
      "Fondateur de start-up",
    ],
  },

  /* ---------------- Ligne 2 : Commerce ---------------- */
  {
    id: "prepa-ecg",
    name: "Prépa ECG",
    label: "Prépa ECG",
    sub: "2 ans",
    when: "Après le bac, 2 ans",
    what: "La prépa économique et commerciale : maths (approfondies ou appliquées), économie ou géopolitique, culture générale et deux langues. Elle mène aux grandes écoles de commerce, et aussi à Saint-Cyr.",
    facts: [
      { icon: "clock", label: "Durée", value: "2 ans" },
      {
        icon: "coins",
        label: "Coût",
        value: "Gratuite en lycée public ; inscription universitaire de 178 € (boursiers exonérés)",
      },
    ],
    selectivite: 4,
    acces: [
      "Parcoursup, sur dossier.",
      "La spécialité maths en Terminale pour les maths approfondies ; maths complémentaires pour les maths appliquées.",
    ],
    contenu: [
      "Maths, économie (ESH) ou histoire-géopolitique (HGG), culture générale, deux langues.",
      "Colles et devoirs chaque semaine.",
    ],
    apres: ["HEC", "ESSEC", "ESCP", "EDHEC", "emlyon", "Saint-Cyr", "Université en L3"],
  },
  {
    id: "u-eco",
    name: "Licence d'économie-gestion, Dauphine",
    label: "Licence éco-gestion",
    sub: "Dauphine, doubles licences",
    when: "Après le bac, ou après une prépa",
    what: "La licence d'économie-gestion mène aux masters, et aux grandes écoles par admission sur titre. Paris Dauphine-PSL sélectionne dès le bac : en 2025, environ 16 % des candidats à sa licence de gestion ont été admis.",
    acces: ["Parcoursup ; Dauphine sélectionne dès le bac sur dossier."],
    apres: ["Master", "Grande école sur titre", "Finance", "Conseil"],
    ecoles: ["dauphine"],
  },
  {
    id: "concours-commerce",
    name: "Les concours BCE et Ecricome",
    label: "Concours BCE et Ecricome",
    sub: "écrits puis oraux",
    when: "Au printemps de la 2e année de prépa",
    what: "En fin de prépa ECG, les écrits communs de la BCE et d'Ecricome ouvrent une trentaine d'écoles ; chacune fait ensuite passer ses oraux. En 2026, la BCE offrait 4 880 places et Ecricome 1 970.",
    selectivite: 5,
    selectiviteNote: "Places par la prépa en 2026 : HEC 415, ESSEC 445, ESCP 430, EDHEC 490, emlyon 525.",
    ecoles: ["hec", "essec", "escp", "edhec"],
  },
  {
    id: "ecole-commerce",
    name: "Grande école de commerce",
    label: "Grande école de commerce",
    sub: "3 ans",
    when: "De bac+2 à bac+5",
    what: "Trois années de management, de finance, de stratégie, avec beaucoup de stages et un passage à l'étranger. Le programme « Grande École » délivre un master.",
    facts: [
      {
        icon: "clock",
        label: "Durée",
        value: "3 ans, souvent avec une année de césure",
      },
      {
        icon: "coins",
        label: "Coût",
        value: "Environ 19 000 à 25 000 € par an, avec bourses et tarifs selon les revenus",
      },
    ],
    contenu: [
      "Cours de gestion, finance, marketing, droit, stratégie.",
      "Stages longs, associations, échanges internationaux.",
    ],
    apres: ["Banque d'affaires", "Conseil en stratégie", "Direction d'entreprise", "Entrepreneuriat", "Luxe", "Audit"],
    ecoles: ["hec", "essec", "escp", "edhec"],
  },
  {
    id: "metiers-commerce",
    name: "Dirigeant, financier, consultant",
    label: "Dirigeant, financier",
    sub: "conseil, entreprise",
    when: "Vers 23 ans",
    what: "Diriger, financer, conseiller, créer : les diplômés travaillent dans la finance, le conseil, l'industrie, le luxe ou leur propre entreprise. En 2026, les jeunes diplômés des écoles de management gagnaient en moyenne environ 41 000 € bruts par an hors primes ; les écoles du sommet affichent nettement plus.",
    facts: [
      {
        icon: "coins",
        label: "Salaire d'embauche",
        value: "Environ 41 000 € bruts par an hors primes en moyenne (enquête 2026)",
      },
    ],
    apres: ["Banquier d'affaires", "Consultant", "Directeur financier", "Chef de produit", "Entrepreneur", "Auditeur"],
  },

  /* ---------------- Ligne 3 : Sciences Po, droit ---------------- */
  {
    id: "sciences-po",
    name: "Sciences Po ou un IEP",
    label: "Sciences Po ou un IEP",
    sub: "5 ans dès le bac",
    when: "Après le bac, 5 ans",
    what: "Sciences Po Paris et les IEP de région recrutent dès le bac, pour cinq ans : trois ans de bachelor, dont une année à l'étranger, puis deux ans de master. On y étudie l'histoire, le droit, l'économie, la science politique et les langues.",
    facts: [
      {
        icon: "clock",
        label: "Durée",
        value: "5 ans, dont une année à l'étranger",
      },
      {
        icon: "coins",
        label: "Coût",
        value: "De 0 à 14 900 € par an selon les revenus (bachelor)",
      },
    ],
    selectivite: 5,
    selectiviteNote:
      "En 2026, Sciences Po Paris a admis 1 249 candidats pour environ 11 400 candidatures, soit à peu près 11 %.",
    acces: [
      "Sciences Po Paris : dossier et oral sur Parcoursup. Depuis 2027, la note d'admission (sur 80) additionne tes épreuves anticipées de français et de maths (20 points), ton parcours (20) et l'oral (40).",
      "Les sept IEP du réseau ScPo : un concours commun en avril de Terminale (questions contemporaines, histoire, langue), 1 220 places en 2026. Bordeaux et Grenoble recrutent à part.",
    ],
    contenu: [
      "Histoire, science politique, droit, économie, sociologie, langues.",
      "Bachelor en trois ans, puis master en deux ans.",
    ],
    apres: ["INSP", "Diplomatie", "Journalisme", "Avocat", "Entreprise", "ONG"],
    astuce:
      "Bonne nouvelle pour un élève du hors contrat : à Sciences Po Paris, les épreuves anticipées, notées de la même façon pour tous, remplacent le contrôle continu dans la note d'admission.",
    ecoles: ["sciencespo", "iep"],
  },
  {
    id: "u-droit",
    name: "Licence de droit et doubles licences",
    label: "Licence de droit",
    sub: "doubles licences",
    when: "Après le bac, 3 ans",
    what: "Trois ans pour apprendre le droit civil, constitutionnel, pénal, administratif. Les parcours d'excellence sont très sélectifs : en 2026, le Collège de droit d'Assas offrait 75 places pour 1 741 vœux, sa double licence droit-économie-gestion 35 places pour 2 187 vœux.",
    facts: [{ icon: "coins", label: "Coût", value: "Droits universitaires" }],
    acces: ["Parcoursup ; les doubles licences et les collèges de droit sont très sélectifs."],
    apres: ["Master de droit", "Sciences Po en master", "Concours de la fonction publique"],
    ecoles: ["assas", "paris1"],
  },
  {
    id: "master-droit",
    name: "Le master",
    label: "Master : droit, affaires publiques",
    sub: "bac+5",
    when: "De bac+3 à bac+5",
    what: "Le master se choisit dès la 1re année : les places sont sélectionnées à l'entrée. Droit des affaires, droit public, affaires publiques, relations internationales : c'est là que se dessine le métier.",
    acces: ["Sélection sur dossier à l'entrée du master, via la plateforme nationale Mon Master."],
    apres: ["Barreau", "Magistrature", "INSP", "Notariat", "Juriste d'entreprise"],
  },
  {
    id: "concours-etat",
    name: "Les concours de l'État et du barreau",
    label: "Concours : INSP, magistrature, barreau",
    sub: "après le master",
    when: "Après le master, souvent avec une année de préparation",
    what: "Les grands métiers du droit et de l'État s'ouvrent par concours ou examen : l'INSP pour la haute fonction publique (80 places en 2026), l'École nationale de la magistrature (305 places au premier concours en 2026), l'examen d'entrée à l'école d'avocats, le diplôme de notaire.",
    selectivite: 5,
    acces: [
      "Avocat : un master 2 est exigé depuis 2025, puis 18 mois d'école d'avocats.",
      "Magistrat : concours à bac+4, puis 31 mois de formation rémunérée.",
      "INSP : concours externe ouvert dès bac+3, souvent préparé après un master.",
      "Notaire : master 2, puis diplôme supérieur de notariat (environ bac+7).",
    ],
    ecoles: ["insp"],
  },
  {
    id: "metiers-scpo",
    name: "Haut fonctionnaire, diplomate, magistrat, avocat",
    label: "Haut fonctionnaire, avocat",
    sub: "diplomate, magistrat",
    when: "Vers 24-26 ans",
    what: "Servir l'État, défendre, juger, négocier : des métiers où l'on écrit, où l'on argumente et où l'on décide.",
    apres: ["Préfet", "Diplomate", "Magistrat", "Avocat", "Notaire", "Journaliste", "Directeur d'administration"],
  },

  /* ---------------- Ligne 5 : Lettres ---------------- */
  {
    id: "khagne",
    name: "Hypokhâgne et khâgne",
    label: "Hypokhâgne et khâgne",
    sub: "A/L, B/L, Chartes",
    when: "Après le bac, 2 ans",
    what: "Deux années de prépa littéraire d'une grande richesse : lettres, philosophie, histoire, langues. La khâgne A/L prépare l'ENS, la B/L ajoute maths et sciences sociales, la prépa Chartes prépare l'École des chartes. Les mêmes écrits ouvrent aussi les écoles de commerce, Saint-Cyr, le CELSA, l'École du Louvre.",
    facts: [
      { icon: "clock", label: "Durée", value: "2 ans, parfois 3" },
      {
        icon: "coins",
        label: "Coût",
        value: "Gratuite en lycée public ; inscription universitaire de 178 € (boursiers exonérés)",
      },
    ],
    selectivite: 4,
    acces: [
      "Parcoursup, sur dossier.",
      "A/L : tous profils littéraires ; B/L : des maths en Terminale ; Chartes : le latin.",
    ],
    contenu: [
      "Lettres, philosophie, histoire, langues anciennes et vivantes, géographie.",
      "Dissertations, explications de textes, colles.",
    ],
    apres: [
      "ENS",
      "École des chartes",
      "Écoles de commerce",
      "Sciences Po",
      "Écoles de journalisme",
      "Université en L3",
    ],
  },
  {
    id: "u-lettres",
    name: "Licence de lettres, d'histoire ou de philosophie",
    label: "Licence de lettres",
    sub: "entrée en L3 après khâgne",
    when: "Après le bac, ou après une khâgne",
    what: "La licence permet d'approfondir une discipline et de préparer les concours de l'enseignement. Après une khâgne, on y entre en 3e année.",
    acces: ["Parcoursup ; entrée en L3 après deux années de khâgne."],
    apres: ["Master", "Professeur", "Sciences Po en master", "Recherche"],
  },
  {
    id: "concours-lettres",
    name: "Les concours : ENS, Chartes, BEL",
    label: "Concours : ENS, Chartes, BEL",
    sub: "fin de khâgne",
    when: "Au printemps de la khâgne",
    what: "Les écrits de la banque d'épreuves littéraires (BEL) servent à la fois pour les trois ENS et pour d'autres écoles : écoles de commerce (BCE, Ecricome), Saint-Cyr, CELSA, École des chartes, École du Louvre, écoles d'interprètes. En 2025, l'ENS Ulm offrait 72 places en A/L et 25 en B/L ; l'École des chartes en offre 20 en 2026.",
    selectivite: 5,
    ecoles: ["ens-ulm", "ens-lyon", "chartes", "journalisme"],
  },
  {
    id: "ens-chartes",
    name: "ENS et École des chartes",
    label: "ENS, École des chartes",
    sub: "3 à 4 ans",
    when: "De bac+2 à bac+6",
    what: "Les élèves y préparent un master, la recherche et souvent l'agrégation. À l'École des chartes, on forme les conservateurs du patrimoine et des bibliothèques.",
    facts: [
      {
        icon: "coins",
        label: "Statut",
        value: "Normaliens et chartistes rémunérés (environ 1 860 € bruts par mois à l'ENS)",
      },
    ],
    apres: ["Professeur agrégé", "Chercheur", "Conservateur", "Archiviste", "Éditeur"],
    ecoles: ["ens-ulm", "ens-lyon", "chartes", "louvre"],
  },
  {
    id: "metiers-lettres",
    name: "Professeur, chercheur, conservateur",
    label: "Professeur, chercheur",
    sub: "conservateur, journaliste",
    when: "Vers 23-26 ans",
    what: "Transmettre et faire vivre la culture : enseigner, chercher, conserver les trésors du patrimoine, écrire, éditer.",
    apres: [
      "Professeur agrégé",
      "Maître de conférences",
      "Conservateur du patrimoine",
      "Journaliste",
      "Éditeur",
      "Diplomate culturel",
    ],
  },

  /* ---------------- Ligne 8 : International ---------------- */
  {
    id: "bachelor-etranger",
    name: "Une université à l'étranger",
    label: "Université à l'étranger",
    sub: "dès le bac",
    when: "Après le bac, 3 à 4 ans",
    what: "Avec un excellent bac français, on peut entrer directement dans les meilleures universités d'Europe et du monde. Le Royaume-Uni est devenu très cher depuis le Brexit ; la Suisse, la Belgique et les Pays-Bas restent abordables, et le Canada propose aux Français un tarif réduit.",
    facts: [
      { icon: "clock", label: "Durée", value: "3 à 4 ans de bachelor" },
      {
        icon: "coins",
        label: "Coût",
        value: "De 1 194 € par an (Louvain) à plus de 60 000 £ (Oxford, Cambridge)",
      },
    ],
    selectivite: 5,
    acces: [
      "Oxford et Cambridge : candidature UCAS avant le 15 octobre de Terminale, tests et entretiens, un bac visé de 15 à 17 sur 20.",
      "EPFL : au moins 16 sur 20 en maths, en physique et de moyenne ; ETH Zurich : un allemand de niveau C1.",
      "États-Unis : dossiers en novembre ou en janvier de Terminale ; certaines universités aident les familles selon leurs revenus.",
    ],
    ecoles: ["oxford", "cambridge", "imperial", "lse", "epfl", "eth", "usa"],
  },
  {
    id: "u-monde",
    name: "Échange ou double diplôme",
    label: "Échange, double diplôme",
    sub: "Erasmus, partenariats",
    when: "Pendant la licence, l'école ou le master",
    what: "Sans quitter ta formation française, tu peux partir un semestre ou un an (Erasmus et accords d'échange), ou suivre un double diplôme avec une université étrangère.",
    apres: ["Master à l'étranger", "Double diplôme", "Doctorat"],
  },
  {
    id: "master-etranger",
    name: "Master à l'étranger",
    label: "Master à l'étranger",
    sub: "1 à 2 ans",
    when: "Après une licence ou une grande école",
    what: "Beaucoup d'étudiants de grandes écoles françaises font une année de master dans une grande université étrangère, souvent en double diplôme.",
    apres: ["Doctorat", "Organisations internationales", "Entreprises internationales"],
  },
  {
    id: "doctorat",
    name: "Le doctorat (PhD)",
    label: "Doctorat (PhD)",
    sub: "3 à 5 ans",
    when: "Après un master",
    what: "Trois ans (plus en Amérique du Nord) pour mener une recherche originale et soutenir une thèse. C'est la voie vers la recherche et l'enseignement supérieur, en France comme à l'étranger.",
    apres: ["Chercheur", "Enseignant-chercheur", "Ingénieur de recherche", "Expert"],
  },
  {
    id: "metiers-monde",
    name: "Une carrière internationale",
    label: "Carrière internationale",
    sub: "recherche, organisations",
    when: "Vers 23-28 ans",
    what: "Travailler dans plusieurs langues et plusieurs pays : recherche, institutions européennes et internationales, grandes entreprises.",
    apres: [
      "Chercheur à l'étranger",
      "Institutions européennes",
      "Nations unies",
      "Entreprises internationales",
      "Diplomatie",
    ],
  },

  /* ---------------- Ligne 7 : Arts ---------------- */
  {
    id: "pole-superieur",
    name: "Pôle supérieur, école d'art ou d'architecture",
    label: "Pôle supérieur, archi, art",
    sub: "3 à 5 ans",
    when: "Après le bac",
    what: "Après le bac, plusieurs portes s'ouvrent aux artistes : un pôle supérieur de musique (diplôme national supérieur professionnel de musicien, de grade licence), une école nationale d'architecture, les Beaux-Arts ou les Arts décoratifs.",
    acces: [
      "Pôles supérieurs : concours sur audition.",
      "Architecture : Parcoursup, dossier et entretien ; licence en 3 ans, master en 2 ans, puis l'habilitation.",
      "Beaux-Arts de Paris : concours, 70 places en 2026 pour 1 551 vœux.",
    ],
    apres: ["CNSMD", "Musicien", "Architecte", "Professeur de musique"],
    ecoles: ["ensa", "beauxarts"],
  },
  {
    id: "u-arts",
    name: "Musicologie et arts à l'université",
    label: "Musicologie",
    sub: "avec un conservatoire",
    when: "Après le bac, 3 ans",
    what: "La licence de musicologie mêle histoire de la musique, analyse, écriture et pratique. Une trentaine d'universités la proposent, et beaucoup d'étudiants la suivent en même temps qu'un conservatoire.",
    acces: ["Parcoursup ; certaines universités font passer une audition."],
    apres: [
      "Master",
      "Professeur d'éducation musicale et de chant choral (CAPES)",
      "Musicologue",
      "Métiers de la culture",
    ],
  },
  {
    id: "concours-cnsmd",
    name: "Les concours des conservatoires supérieurs",
    label: "Concours CNSMD",
    sub: "audition",
    when: "Dès que ton niveau le permet",
    what: "Le concours se joue sur audition devant un jury : ton répertoire, ta technique, ta musicalité, ta culture. Les candidats ont souvent une dizaine d'années de pratique derrière eux.",
    selectivite: 5,
    selectiviteNote:
      "En 2025, le CNSMD de Paris a admis environ 23 % de ses 2 044 candidats, et environ 17 % en chant.",
    acces: [
      "Des limites d'âge selon la discipline : en chant à Paris, avant 25 ans pour les femmes et 27 ans pour les hommes (règle à revérifier) ; à Lyon, de 16 à 30 ans.",
      "Le cycle préparatoire d'un conservatoire à rayonnement régional est la meilleure préparation.",
    ],
    ecoles: ["cnsmdp", "cnsmdl"],
  },
  {
    id: "cnsmd",
    name: "Le conservatoire national supérieur",
    label: "CNSMD Paris ou Lyon",
    sub: "jusqu'au master",
    when: "5 ans",
    what: "Le sommet de l'enseignement musical en France. En trois ans, le diplôme national supérieur professionnel de musicien et une licence (avec Sorbonne Université à Paris, avec Lyon 2 à Lyon), puis un master en deux ans.",
    facts: [{ icon: "clock", label: "Durée", value: "5 ans : licence puis master" }],
    contenu: [
      "Cours individuels, musique de chambre, chœur ou orchestre, concerts.",
      "Écriture, analyse, culture musicale.",
    ],
    apres: ["Chanteur", "Instrumentiste", "Chef de chœur", "Compositeur", "Professeur"],
    ecoles: ["cnsmdp", "cnsmdl"],
  },
  {
    id: "metiers-arts",
    name: "Musicien, chef de chœur, architecte",
    label: "Musicien, architecte",
    sub: "chef de chœur, compositeur",
    when: "Vers 23-25 ans",
    what: "Des métiers de passion et d'exigence : interpréter, diriger, composer, enseigner, bâtir.",
    apres: ["Chanteur", "Chef de chœur", "Instrumentiste", "Compositeur", "Professeur de conservatoire", "Architecte"],
  },

  /* ---------------- Université ---------------- */
  {
    id: "universite",
    name: "La licence à l'université",
    label: "Licence",
    sub: "3 ans",
    when: "Après le bac, 3 ans",
    what: "Au centre de la carte, l'université prolonge le lycée tout droit. Elle délivre la licence (bac+3), le master (bac+5) et le doctorat. Ses droits sont modestes, ses filières très nombreuses, et ses doubles licences comptent parmi les formations les plus sélectives de France.",
    facts: [
      {
        icon: "clock",
        label: "Licence, master, doctorat",
        value: "3 ans, 2 ans, 3 ans",
      },
      {
        icon: "coins",
        label: "Coût",
        value: "178 € par an en licence, 255 € en master, plus 105 € de contribution vie étudiante",
      },
    ],
    contenu: [
      "Des cours magistraux, des travaux dirigés en petits groupes, beaucoup de travail personnel.",
      "Des passerelles vers les grandes écoles, à chaque étape.",
    ],
    apres: ["Master", "Grandes écoles sur titre", "Doctorat", "Concours de la fonction publique"],
    astuce:
      "Au classement de Shanghai 2026, l'Université Paris-Saclay est 13e au monde, PSL 33e, Sorbonne Université 55e et l'Université Paris Cité 57e.",
  },
  {
    id: "u-master",
    name: "Le master",
    label: "Master",
    sub: "2 ans",
    when: "De bac+3 à bac+5, 2 ans",
    what: "Deux années pour se spécialiser après la licence : droit des affaires, physique, histoire, finance, langues… Le master mène directement au métier, ou au doctorat pour qui veut faire de la recherche.",
    facts: [
      { icon: "clock", label: "Durée", value: "2 ans" },
      {
        icon: "coins",
        label: "Coût",
        value: "255 € par an, plus 105 € de contribution vie étudiante",
      },
    ],
    acces: ["Sélection sur dossier à l'entrée de la 1re année, via la plateforme nationale Mon Master."],
    apres: ["Entreprise", "Fonction publique", "Grandes écoles sur titre", "Doctorat"],
  },
  {
    id: "metiers-u",
    name: "Les métiers de l'université",
    label: "Chercheur, enseignant",
    sub: "et presque tous les métiers",
    when: "Après le master vers 23 ans, après le doctorat vers 26 ans",
    what: "L'université mène à presque tous les métiers. Après le master : l'entreprise, la fonction publique, le droit, la culture. Après le doctorat : la recherche et l'enseignement supérieur, en France comme à l'étranger.",
    apres: [
      "Chercheur",
      "Enseignant-chercheur",
      "Ingénieur de recherche",
      "Juriste",
      "Économiste",
      "Cadre de la fonction publique",
      "Data scientist",
    ],
  },
]);

export const stationById = Object.fromEntries(stations.map((s) => [s.id, s])) as Record<string, StationContent>;
