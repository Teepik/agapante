import { frTypo } from "@/lib/typo";

export type Secteur = {
  slug: string;
  nav: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lede: string;
  size: string;
  intro: string[];
  realities: { title: string; detail: string }[];
  useCases: { title: string; detail: string; gain: string }[];
  approach: { title: string; detail: string }[];
  funding?: { title: string; detail: string }[];
  faq: { q: string; a: string }[];
  keywords: string[];
};

const rawSecteurs: Secteur[] = [
  {
    slug: "tpe",
    nav: "TPE",
    title: "IA pour les TPE",
    metaTitle: "Intelligence artificielle pour les TPE : par où commencer",
    metaDescription:
      "Accompagnement IA pour les très petites entreprises : gains rapides, budget maîtrisé, aucune équipe technique requise. Diagnostic, outillage et formation.",
    eyebrow: "Secteur",
    headline: "Quelques heures par semaine, récupérées pour de bon",
    lede: "Dans une entreprise de moins de vingt personnes, l'IA ne se juge pas sur un plan à trois ans. Elle se juge sur le vendredi après-midi qu'elle vous rend.",
    size: "Moins de 20 salariés",
    intro: [
      "Une TPE n'a ni DSI, ni chef de projet disponible, ni budget d'expérimentation. Elle a en revanche un avantage décisif : la décision et l'exécution sont dans la même pièce. Ce qui est décidé le lundi peut être en place le mercredi.",
      "Notre intervention est donc courte, très concrète et orientée sur trois ou quatre gestes du quotidien : les devis, les réponses clients, la saisie administrative, la veille. Pas de transformation, pas de conduite du changement à trois vagues — de l'outillage utile, installé, et une équipe formée à s'en servir.",
      "Nous refusons systématiquement les missions où le retour sur investissement ne serait pas visible en moins d'un trimestre. À cette taille, tout le reste est du confort de consultant.",
    ],
    realities: [
      {
        title: "Le temps est la seule ressource rare",
        detail:
          "Chaque heure passée en formation doit se rembourser dans le mois. Nos sessions durent 90 minutes et se font sur vos vrais dossiers.",
      },
      {
        title: "Pas d'équipe technique",
        detail:
          "Tout ce que nous mettons en place doit fonctionner sans administrateur système et se réparer par un appel téléphonique.",
      },
      {
        title: "Le dirigeant est le goulot d'étranglement",
        detail:
          "Les premiers cas d'usage visent souvent à décharger le dirigeant lui-même : rédaction, relances, préparation de rendez-vous, suivi.",
      },
      {
        title: "Les données sont dans les têtes et les mails",
        detail:
          "Peu de systèmes, beaucoup de tacite. Une part du travail consiste à rendre exploitable ce qui existe déjà.",
      },
    ],
    useCases: [
      {
        title: "Devis et propositions commerciales",
        detail:
          "Génération d'une première version à partir de vos modèles, de vos tarifs et de vos réalisations passées, à relire et ajuster.",
        gain: "2 à 5 h / semaine",
      },
      {
        title: "Réponses clients et service après-vente",
        detail:
          "Assistant de rédaction connecté à vos réponses types, votre catalogue et votre historique.",
        gain: "30 à 50 % du temps de traitement",
      },
      {
        title: "Comptes rendus et administratif",
        detail:
          "Transcription et synthèse automatique des rendez-vous, préparation des pièces récurrentes.",
        gain: "1 à 3 h / semaine",
      },
      {
        title: "Visibilité et contenus",
        detail:
          "Production régulière de contenus alignés sur votre positionnement, sans y passer la soirée.",
        gain: "Publication régulière tenue",
      },
    ],
    approach: [
      {
        title: "Une demi-journée d'observation",
        detail: "Sur site, à regarder comment le travail se fait réellement. C'est là que se trouvent les gains.",
      },
      {
        title: "Trois cas d'usage, pas trente",
        detail: "Choisis pour leur effet immédiat et leur faible risque, mis en place dans la foulée.",
      },
      {
        title: "Formation sur vos dossiers",
        detail: "Deux sessions courtes avec l'équipe, sur des cas que vous avez traités la semaine précédente.",
      },
      {
        title: "Un point à 30 jours",
        detail: "Ce qui a pris, ce qui n'a pas pris, et ce qu'on corrige. Puis nous vous laissons tranquille.",
      },
    ],
    faq: [
      {
        q: "Est-ce que c'est adapté à une entreprise de cinq personnes ?",
        a: "Oui, et c'est souvent là que le rapport effort/gain est le meilleur. Le format est simplement plus court : deux à trois semaines au total.",
      },
      {
        q: "Faut-il changer nos logiciels ?",
        a: "Presque jamais. Nous ajoutons une couche d'usage au-dessus de ce que vous avez déjà. Remplacer un logiciel métier qui fonctionne est rarement une bonne idée.",
      },
      {
        q: "Nos données clients sont-elles en sécurité ?",
        a: "Nous configurons systématiquement des comptes professionnels qui excluent l'entraînement des modèles sur vos données, et nous écrivons avec vous les règles de ce qui ne doit jamais être transmis à un outil externe.",
      },
    ],
    keywords: [
      "IA pour TPE",
      "intelligence artificielle petite entreprise",
      "automatisation TPE",
      "formation IA artisan commerçant",
      "gagner du temps IA",
    ],
  },
  {
    slug: "pme",
    nav: "PME",
    title: "IA pour les PME",
    metaTitle: "Déploiement de l'IA en PME : méthode, cas d'usage et ROI",
    metaDescription:
      "Cabinet de conseil externe pour les PME de 20 à 250 salariés : diagnostic, cas d'usage priorisés, conduite du changement et MVP sur mesure.",
    eyebrow: "Secteur",
    headline: "L'échelle où l'IA cesse d'être un gadget",
    lede: "Assez de volume pour que l'automatisation compte, assez de proximité pour que le changement soit possible. La PME est le terrain le plus favorable — à condition de ne pas éparpiller l'effort.",
    size: "De 20 à 250 salariés",
    intro: [
      "En PME, le sujet arrive rarement par la direction générale : il arrive par un service qui a testé quelque chose, par un client qui pose la question, ou par un concurrent qui communique. Le risque n'est pas l'immobilisme, c'est la dispersion.",
      "Notre rôle consiste à ramener cette énergie vers deux ou trois chantiers structurants, à les instrumenter correctement, et à donner à l'organisation les moyens de tenir dans la durée. Une PME qui réussit son déploiement IA ne fait pas dix choses : elle en fait trois, bien.",
      "Nous intervenons comme prestataire externe, sans grille de temps de cabinet, avec une présence calibrée sur vos jalons réels.",
    ],
    realities: [
      {
        title: "Des systèmes hétérogènes",
        detail:
          "Un ERP vieillissant, trois outils SaaS, beaucoup d'Excel. L'intégration coûte souvent plus cher que le modèle.",
      },
      {
        title: "Une DSI réduite ou externalisée",
        detail:
          "Nous concevons des solutions exploitables avec les ressources dont vous disposez vraiment, pas celles d'un grand groupe.",
      },
      {
        title: "Un enjeu de compétitivité concret",
        detail:
          "Délais de réponse, marge sur devis, taux de service : le sujet IA se rattache à des indicateurs que vous suivez déjà.",
      },
      {
        title: "Une pyramide des âges contrastée",
        detail:
          "La formation doit fonctionner autant pour un alternant de 22 ans que pour un chef d'atelier de 55 ans. C'est un travail de pédagogie, pas de technologie.",
      },
    ],
    useCases: [
      {
        title: "Réponse aux appels d'offres et chiffrage",
        detail:
          "Extraction automatique des exigences, pré-rédaction des réponses à partir de votre bibliothèque, contrôle de complétude.",
        gain: "40 à 60 % du temps de rédaction",
      },
      {
        title: "Assistant documentaire interne",
        detail:
          "Interrogation en langage naturel de vos procédures, contrats, fiches techniques et historiques projets, avec citation des sources.",
        gain: "Recherche divisée par 5",
      },
      {
        title: "Traitement des flux entrants",
        detail:
          "Classement et pré-traitement des mails, commandes, factures fournisseurs et réclamations.",
        gain: "1 à 2 ETP redéployés",
      },
      {
        title: "Qualité et contrôle",
        detail:
          "Détection d'anomalies sur les données de production, de facturation ou de stock avant qu'elles ne coûtent cher.",
        gain: "Réduction des non-conformités",
      },
      {
        title: "Support et relation client",
        detail:
          "Assistance aux conseillers en temps réel, suggestions de réponse, synthèse automatique des dossiers.",
        gain: "Temps de traitement -30 %",
      },
      {
        title: "Recrutement et RH",
        detail:
          "Aide au tri des candidatures dans un cadre non discriminatoire et sous contrôle humain systématique.",
        gain: "Délai de recrutement raccourci",
      },
    ],
    approach: [
      {
        title: "Diagnostic de 4 semaines",
        detail: "Entretiens, quantification, matrice de priorisation et business case chiffré.",
      },
      {
        title: "Un premier chantier engagé vite",
        detail: "Sur un périmètre restreint et volontaire, pour créer la preuve interne dont vous avez besoin.",
      },
      {
        title: "Une gouvernance légère",
        detail: "Un comité mensuel, trois indicateurs, un porteur métier identifié. Pas de comitologie inutile.",
      },
      {
        title: "Un transfert organisé",
        detail: "Formation de référents internes et documentation pour que le sujet vive sans nous.",
      },
    ],
    funding: [
      {
        title: "Dispositifs régionaux",
        detail:
          "De nombreuses régions financent tout ou partie des diagnostics de transformation numérique. Nous vous orientons vers les dispositifs applicables à votre territoire.",
      },
      {
        title: "France Num et réseaux consulaires",
        detail:
          "CCI, CMA et France Num proposent des accompagnements et des aides au numérique pour les petites structures.",
      },
      {
        title: "Financement de la formation",
        detail:
          "Les volets formation de nos missions peuvent, selon les cas, être pris en charge par votre OPCO. Nous fournissons les éléments nécessaires au montage du dossier.",
      },
    ],
    faq: [
      {
        q: "Combien coûte un déploiement IA en PME ?",
        a: "Cela dépend entièrement du périmètre. Nous ne publions pas de grille tarifaire car un diagnostic de cadrage et un déploiement multi-sites n'ont rien de comparable. Un appel de 30 minutes suffit à donner un ordre de grandeur honnête.",
      },
      {
        q: "En combien de temps voit-on des résultats ?",
        a: "Les premiers gains mesurables apparaissent généralement entre le deuxième et le quatrième mois sur un chantier bien cadré. Les gains structurels — organisation, qualité, marge — se lisent sur douze mois.",
      },
      {
        q: "Faut-il recruter un profil data ou IA ?",
        a: "Rarement en dessous de 150 salariés. Il est presque toujours plus efficace de former un référent interne déjà légitime sur le métier que de recruter un profil technique isolé.",
      },
      {
        q: "Travaillez-vous avec notre prestataire informatique actuel ?",
        a: "Oui, et nous le sollicitons dès le cadrage. Court-circuiter l'infogéreur en place est le meilleur moyen de bloquer un projet au moment de la mise en production.",
      },
    ],
    keywords: [
      "déploiement IA PME",
      "conseil IA PME",
      "transformation numérique PME",
      "cas d'usage IA PME",
      "ROI intelligence artificielle PME",
      "accompagnement IA industrie",
    ],
  },
  {
    slug: "eti",
    nav: "ETI",
    title: "IA pour les ETI",
    metaTitle: "Stratégie et déploiement de l'IA en ETI multi-sites",
    metaDescription:
      "Accompagnement des entreprises de taille intermédiaire : portefeuille de cas d'usage, gouvernance IA, conformité AI Act et industrialisation multi-sites.",
    eyebrow: "Secteur",
    headline: "Passer du portefeuille de pilotes au portefeuille de produits",
    lede: "À cette taille, le problème n'est plus de trouver des idées ni des budgets. C'est de faire converger des initiatives dispersées vers une capacité industrielle.",
    size: "De 250 à 5 000 salariés",
    intro: [
      "Une ETI a généralement déjà tout : des pilotes lancés par plusieurs directions, une DSI structurée, un délégué à la protection des données, parfois un data scientist. Ce qui manque, c'est une doctrine commune et un mécanisme d'arbitrage.",
      "Nous intervenons comme tiers extérieur, précisément parce que l'arbitrage entre directions est difficile à porter en interne. Nous apportons une méthode d'évaluation homogène, une lecture des risques et une capacité à dire non à des projets défendus par des gens influents.",
      "Notre valeur se situe aussi sur la conformité : classification des systèmes au regard de l'AI Act, documentation technique attendue, chaîne de responsabilité et traçabilité. Autant de sujets qui, mal anticipés, bloquent les mises en production.",
    ],
    realities: [
      {
        title: "Des initiatives concurrentes",
        detail:
          "Trois directions, trois prestataires, trois plateformes. Le coût caché de la fragmentation dépasse souvent le coût des licences.",
      },
      {
        title: "Une exigence de conformité forte",
        detail:
          "RGPD, AI Act, obligations sectorielles, exigences clients grands comptes, cybersécurité : la production ne se déclenche que si le dossier est solide.",
      },
      {
        title: "Le multi-sites et l'international",
        detail:
          "Ce qui fonctionne sur un site ne se réplique pas mécaniquement. La standardisation est un chantier à part entière.",
      },
      {
        title: "Une attente de mesure",
        detail:
          "Le comité exécutif attend un suivi de la valeur créée, pas un compte rendu d'activité. Nous construisons ce dispositif.",
      },
    ],
    useCases: [
      {
        title: "Plateforme IA interne mutualisée",
        detail:
          "Un socle commun d'accès aux modèles, avec gestion des droits, journalisation, maîtrise des coûts et catalogue de cas d'usage validés.",
        gain: "Fin du shadow AI",
      },
      {
        title: "Industrialisation d'un pilote réussi",
        detail:
          "Passage d'un cas d'usage prouvé sur un site à un déploiement multi-sites documenté et supervisé.",
        gain: "Effet d'échelle",
      },
      {
        title: "Ingénierie et bureau d'études",
        detail:
          "Exploitation du patrimoine documentaire technique, aide à la conception, recherche de pièces et de précédents.",
        gain: "Cycles de conception raccourcis",
      },
      {
        title: "Supply chain et prévision",
        detail:
          "Prévision de la demande, optimisation des stocks, détection d'anomalies fournisseurs.",
        gain: "Taux de service amélioré",
      },
      {
        title: "Conformité et contrôle interne",
        detail:
          "Revue automatisée de contrats, contrôle de conformité documentaire, préparation des audits.",
        gain: "Couverture de contrôle élargie",
      },
      {
        title: "Centre de service partagé",
        detail:
          "Automatisation assistée des fonctions support : comptabilité fournisseurs, paie, achats indirects.",
        gain: "Coût par transaction réduit",
      },
    ],
    approach: [
      {
        title: "Audit du portefeuille existant",
        detail: "Inventaire de toutes les initiatives en cours, évaluation homogène, recommandation d'arrêt ou de fusion.",
      },
      {
        title: "Doctrine et gouvernance",
        detail: "Comité IA, critères d'éligibilité, processus de validation, cadre de conformité AI Act documenté.",
      },
      {
        title: "Industrialisation",
        detail: "Socle technique commun, standards de développement, chaîne de mise en production et supervision.",
      },
      {
        title: "Montée en compétence interne",
        detail: "Formation des équipes projet et des référents métiers, avec un objectif d'autonomie complète.",
      },
    ],
    faq: [
      {
        q: "Que change concrètement l'AI Act pour une ETI ?",
        a: "L'essentiel dépend de la classification de vos systèmes. La majorité des usages bureautiques relèvent d'obligations légères, principalement de transparence et de formation. Les usages touchant au recrutement, à l'évaluation des personnes, à la sécurité ou à l'accès à des services essentiels demandent en revanche une documentation technique, une gestion des risques et une supervision humaine formalisées. Le tri se fait au cas par cas, et c'est l'un des premiers livrables que nous produisons.",
      },
      {
        q: "Intervenez-vous en complément d'un grand cabinet déjà en place ?",
        a: "Oui. Nous intervenons fréquemment sur des périmètres que les missions généralistes laissent de côté : l'adoption terrain, la conformité opérationnelle, ou la construction rapide d'un objet qui débloque une décision.",
      },
      {
        q: "Comment garantir la maîtrise des coûts d'inférence ?",
        a: "Par une architecture qui rend les modèles interchangeables, un suivi de consommation par cas d'usage, et des règles de routage entre modèles selon la criticité. C'est un point que nous instrumentons dès la conception.",
      },
      {
        q: "Pouvez-vous signer un accord de confidentialité renforcé ?",
        a: "Oui, y compris avec des exigences de cloisonnement, d'hébergement européen et de non-réutilisation des livrables.",
      },
    ],
    keywords: [
      "IA ETI",
      "gouvernance IA entreprise",
      "AI Act conformité entreprise",
      "industrialisation cas d'usage IA",
      "plateforme IA interne",
      "conseil IA multi-sites",
    ],
  },
  {
    slug: "administrations",
    nav: "Secteur public",
    title: "IA pour les administrations et le secteur public",
    metaTitle: "IA dans le secteur public : collectivités, établissements et opérateurs",
    metaDescription:
      "Accompagnement des collectivités, établissements publics et opérateurs de l'État : cadrage, souveraineté des données, conformité et acculturation des agents.",
    eyebrow: "Secteur",
    headline: "Servir mieux, sans jamais déléguer la décision",
    lede: "Dans le secteur public, l'IA se juge à l'aune du service rendu et de la confiance. Nous travaillons avec cette contrainte comme point de départ, pas comme obstacle.",
    size: "Collectivités, établissements publics, opérateurs de l'État",
    intro: [
      "Les organisations publiques ont des contraintes que le secteur privé ignore : commande publique, exigence de transparence, égalité de traitement, archivage, et une attention légitime portée à l'usage de données de citoyens. Elles ont aussi des gisements de valeur considérables, souvent dans le back-office plutôt que dans la relation à l'usager.",
      "Notre approche part de deux principes simples. Premièrement, aucune décision affectant un droit ne doit être prise par un système automatisé sans intervention humaine réelle. Deuxièmement, tout ce qui est déployé doit être explicable à un élu, à un agent et à un usager.",
      "Nous accompagnons aussi bien le cadrage stratégique que l'acculturation des agents, avec un souci constant de sobriété budgétaire et de réversibilité.",
    ],
    realities: [
      {
        title: "La commande publique",
        detail:
          "Nos missions sont conçues pour s'inscrire dans vos procédures d'achat, y compris en marché à procédure adaptée ou via une centrale d'achat.",
      },
      {
        title: "La souveraineté des données",
        detail:
          "Hébergement en France ou en Europe, qualification SecNumCloud lorsque c'est requis, modèles ouverts auto-hébergés quand le contexte l'exige.",
      },
      {
        title: "L'exigence d'explicabilité",
        detail:
          "Tout traitement doit pouvoir être décrit simplement et documenté, notamment au regard du code des relations entre le public et l'administration.",
      },
      {
        title: "Le dialogue social",
        detail:
          "L'introduction d'outils d'IA se prépare avec les instances représentatives. Nous fournissons les éléments factuels attendus.",
      },
    ],
    useCases: [
      {
        title: "Recherche dans le corpus réglementaire et documentaire",
        detail:
          "Interrogation des délibérations, arrêtés, notes de service et jurisprudences internes, avec citation systématique des sources.",
        gain: "Temps de recherche divisé",
      },
      {
        title: "Aide à la rédaction administrative",
        detail:
          "Comptes rendus de séance, courriers types, notes de synthèse, dans le respect des formalismes en vigueur.",
        gain: "Charge rédactionnelle allégée",
      },
      {
        title: "Traitement des sollicitations des usagers",
        detail:
          "Qualification et orientation des demandes entrantes, avec réponse humaine maintenue sur tout ce qui touche à un droit.",
        gain: "Délais de réponse réduits",
      },
      {
        title: "Instruction de dossiers",
        detail:
          "Contrôle de complétude et pré-analyse des pièces, l'agent conservant l'intégralité de la décision.",
        gain: "Dossiers incomplets détectés en amont",
      },
      {
        title: "Marchés publics",
        detail:
          "Aide à la rédaction des pièces, analyse comparative des offres sous contrôle de la commission compétente.",
        gain: "Analyse plus homogène",
      },
      {
        title: "Acculturation des agents",
        detail:
          "Programme de formation par métier, charte d'usage, réseau de référents et dispositif d'écoute.",
        gain: "Usages encadrés et partagés",
      },
    ],
    approach: [
      {
        title: "Cadrage sous contrainte",
        detail: "Nous partons de vos obligations réglementaires et de votre cadre budgétaire pour définir le champ du possible.",
      },
      {
        title: "Expérimentation encadrée",
        detail: "Un périmètre restreint, une évaluation documentée, une décision de généralisation argumentée.",
      },
      {
        title: "Charte et gouvernance",
        detail: "Règles d'usage, procédure de validation, information des instances, traçabilité des traitements.",
      },
      {
        title: "Transfert aux agents",
        detail: "Formation, documentation et réseau de référents, pour une autonomie complète en fin de mission.",
      },
    ],
    faq: [
      {
        q: "Pouvez-vous répondre à un marché public ?",
        a: "Oui. Nous répondons aux consultations et pouvons également intervenir en marché à procédure adaptée ou via un accord-cadre existant. Nous fournissons l'ensemble des pièces administratives requises.",
      },
      {
        q: "Les données des usagers sortent-elles du territoire national ?",
        a: "Pas si votre cadre l'interdit. Nous concevons des architectures avec hébergement en France ou en Europe, et des modèles auto-hébergés lorsque la sensibilité des données le justifie. Ce point est arbitré au cadrage, avant tout développement.",
      },
      {
        q: "Une IA peut-elle instruire une demande d'usager ?",
        a: "Elle peut préparer, vérifier la complétude, proposer une analyse. Elle ne doit jamais prendre seule une décision affectant un droit. Nous formalisons cette frontière dans la charte d'usage et dans la conception même des outils.",
      },
      {
        q: "Nos agents sont-ils inquiets à juste titre ?",
        a: "Les inquiétudes exprimées sont généralement rationnelles et portent sur le sens du travail plus que sur l'emploi. Les traiter explicitement, en atelier, avec des engagements écrits, est la condition d'un déploiement qui tient.",
      },
    ],
    keywords: [
      "IA secteur public",
      "intelligence artificielle collectivité territoriale",
      "IA administration publique",
      "souveraineté numérique IA",
      "acculturation agents IA",
      "marché public intelligence artificielle",
    ],
  },
];

export const secteurs: Secteur[] = frTypo(rawSecteurs);

export function getSecteur(slug: string): Secteur | undefined {
  return secteurs.find((s) => s.slug === slug);
}
