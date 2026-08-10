import { frTypo } from "@/lib/typo";

export type Expertise = {
  slug: string;
  nav: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  eyebrow: string;
  headline: string;
  lede: string;
  duration: string;
  format: string;
  outcome: string;
  intro: string[];
  symptoms: { label: string; detail: string }[];
  deliverables: { title: string; detail: string }[];
  steps: { title: string; detail: string; duration: string }[];
  proof: { label: string; value: string }[];
  faq: { q: string; a: string }[];
  keywords: string[];
};

const rawExpertises: Expertise[] = [
  {
    slug: "conseil-strategie-ia",
    nav: "Conseil & stratégie IA",
    title: "Conseil et stratégie IA",
    metaTitle: "Conseil en stratégie IA pour PME, ETI et administrations",
    metaDescription:
      "Diagnostic IA, priorisation des cas d'usage, feuille de route chiffrée et cadre de conformité RGPD / AI Act. Un cabinet externe indépendant pour décider vite et bien.",
    eyebrow: "Expertise 01",
    headline: "Savoir quoi faire, dans quel ordre, et pourquoi",
    lede: "Un diagnostic sans complaisance de vos processus, une short-list de cas d'usage réellement rentables, et une feuille de route que votre comité de direction peut voter.",
    duration: "3 à 6 semaines",
    format: "Mission de cadrage — à distance et sur site",
    outcome: "Une feuille de route IA chiffrée, priorisée et défendable",
    intro: [
      "La plupart des organisations n'ont pas un problème d'idées : elles en ont trente. Le problème, c'est qu'aucune n'est arbitrée, chiffrée, ni rattachée à un porteur. Résultat : des pilotes qui s'éternisent, des budgets consommés sans effet mesurable, et une direction qui finit par se méfier du sujet.",
      "Notre travail de conseil consiste à réduire ce brouillard. Nous partons de vos processus réels — pas d'un catalogue d'outils — pour identifier où l'intelligence artificielle crée de la valeur chez vous, à quelle échéance, et à quel coût. Nous sommes tout aussi utiles quand la réponse est « pas maintenant ».",
      "Nous intervenons comme prestataire externe : nous n'avons rien à vous revendre en aval, aucun éditeur à placer, aucune licence à faire signer. Cette indépendance est ce qui rend l'arbitrage honnête.",
    ],
    symptoms: [
      {
        label: "« On a fait des tests, mais rien n'est passé en production »",
        detail:
          "Le signe classique d'un pilote lancé sans critère de succès ni propriétaire métier. Nous reprenons le cadrage à la racine.",
      },
      {
        label: "« On ne sait pas si on a le droit »",
        detail:
          "RGPD, AI Act, secret des affaires, données RH ou de santé : nous posons le cadre juridique et technique avant d'engager le moindre développement.",
      },
      {
        label: "« Chaque service a acheté son outil dans son coin »",
        detail:
          "Shadow AI, données qui fuient, doublons de licences. Nous cartographions l'existant et rationalisons.",
      },
      {
        label: "« Notre DSI est déjà saturée »",
        detail:
          "Nous concevons des trajectoires réalistes au regard de vos capacités internes réelles, pas d'un budget théorique.",
      },
    ],
    deliverables: [
      {
        title: "Cartographie des processus et des irritants",
        detail:
          "Entretiens métiers, observation terrain, mesure du temps réellement passé. Nous produisons une vue objective de là où part votre énergie.",
      },
      {
        title: "Portefeuille de cas d'usage priorisé",
        detail:
          "Chaque cas d'usage est noté sur l'impact, l'effort, le risque et la maturité de la donnée. Vous obtenez une matrice de décision, pas une liste d'envies.",
      },
      {
        title: "Business case chiffré",
        detail:
          "Gain attendu en heures et en euros, coût de mise en œuvre, coût de run annuel, hypothèses explicites et scénario pessimiste. Défendable devant un CODIR ou un financeur.",
      },
      {
        title: "Cadre de conformité et de sécurité",
        detail:
          "Classification des données, analyse d'impact, positionnement au regard de l'AI Act, règles d'usage, choix d'hébergement (dont options souveraines et européennes).",
      },
      {
        title: "Feuille de route à 12 mois",
        detail:
          "Séquencée en vagues, avec les jalons, les rôles internes à mobiliser, les décisions d'achat et les points de sortie possibles.",
      },
      {
        title: "Restitution en comité de direction",
        detail:
          "Une présentation qui tient en 30 minutes, compréhensible sans culture technique, avec les trois décisions à prendre.",
      },
    ],
    steps: [
      {
        title: "Immersion",
        detail:
          "8 à 12 entretiens, collecte des volumétries, revue des outils en place et des données disponibles. Nous cherchons les gestes répétés, pas les slogans.",
        duration: "Semaine 1-2",
      },
      {
        title: "Analyse et modélisation",
        detail:
          "Quantification des irritants, estimation des gains, tests de faisabilité rapides sur vos données réelles quand c'est possible.",
        duration: "Semaine 2-4",
      },
      {
        title: "Arbitrage",
        detail:
          "Atelier de priorisation avec vos décideurs. Nous confrontons les hypothèses et faisons émerger un consensus explicite.",
        duration: "Semaine 4-5",
      },
      {
        title: "Feuille de route et restitution",
        detail:
          "Livraison du dossier complet, présentation en CODIR, transfert des documents sources pour que vous restiez autonomes.",
        duration: "Semaine 5-6",
      },
    ],
    proof: [
      { label: "Entretiens menés en moyenne", value: "10+" },
      { label: "Cas d'usage évalués", value: "20 à 40" },
      { label: "Cas d'usage retenus", value: "3 à 5" },
    ],
    faq: [
      {
        q: "Faut-il déjà avoir des données propres pour lancer un diagnostic IA ?",
        a: "Non. L'état réel de vos données fait justement partie du diagnostic. Dans beaucoup de missions, la première recommandation porte sur la structuration de la donnée avant tout projet d'IA générative — et c'est une économie, pas un retard.",
      },
      {
        q: "Combien de temps mobilise le diagnostic pour nos équipes ?",
        a: "Comptez environ une heure d'entretien par personne interrogée, plus deux ateliers de deux heures pour le noyau décisionnel. Nous nous adaptons à des organisations qui n'ont pas de temps machine à consacrer à un projet transverse.",
      },
      {
        q: "Vous imposez-vous un fournisseur ou une technologie ?",
        a: "Non. Nous sommes indépendants de tout éditeur et ne percevons aucune commission d'apport d'affaires. Les recommandations technologiques sont argumentées, comparées et réversibles.",
      },
      {
        q: "Que se passe-t-il si le diagnostic conclut qu'il ne faut rien lancer ?",
        a: "Nous vous le disons clairement, avec les conditions à réunir pour que le sujet devienne pertinent. Un « non, pas cette année » documenté vaut mieux qu'un pilote de 60 000 € abandonné au bout de six mois.",
      },
    ],
    keywords: [
      "conseil stratégie IA",
      "diagnostic IA entreprise",
      "cabinet conseil intelligence artificielle",
      "feuille de route IA",
      "cas d'usage IA PME",
      "conformité AI Act",
    ],
  },
  {
    slug: "accompagnement-deploiement-ia",
    nav: "Accompagnement au déploiement",
    title: "Accompagnement au déploiement de l'IA",
    metaTitle: "Accompagnement au déploiement de l'IA en entreprise",
    metaDescription:
      "Pilotage de projet, conduite du changement, formation des équipes et gouvernance de l'IA. Nous restons à vos côtés jusqu'à l'adoption réelle des usages.",
    eyebrow: "Expertise 02",
    headline: "Le moment où l'outil devient un usage",
    lede: "Un projet d'IA ne meurt presque jamais d'un problème technique. Il meurt d'une absence d'appropriation. Nous prenons en charge la partie que les prestataires laissent souvent de côté.",
    duration: "3 à 12 mois",
    format: "Présence récurrente — comité mensuel, ateliers, hotline",
    outcome: "Des usages installés, mesurés et tenus par vos équipes",
    intro: [
      "Un outil déployé n'est pas un outil utilisé. Entre la mise à disposition d'un assistant et le moment où un collaborateur y pense spontanément à 9 h 30 un mardi, il y a un travail de terrain : réécrire des procédures, désamorcer des craintes légitimes, former des relais, arbitrer des cas limites, mesurer.",
      "C'est ce travail que nous prenons en charge. Nous ne remplaçons pas vos équipes : nous leur donnons un cadre, un rythme et une autorité. Notre objectif explicite est de devenir inutiles au bout de quelques mois.",
      "Cet accompagnement couvre aussi la dimension sociale : information des représentants du personnel, clarté sur ce que l'IA change et ne change pas dans les fiches de poste, règles d'usage écrites. Le non-dit est le premier facteur de résistance.",
    ],
    symptoms: [
      {
        label: "« On a acheté les licences, personne ne s'en sert »",
        detail:
          "Taux d'activation en berne, usage concentré sur trois enthousiastes. Nous traitons la cause, pas le symptôme.",
      },
      {
        label: "« Les équipes ont peur pour leur poste »",
        detail:
          "Une inquiétude rationnelle qui ne se règle pas par un mail de la direction. Nous l'adressons frontalement, en atelier.",
      },
      {
        label: "« On ne sait pas mesurer si ça marche »",
        detail:
          "Nous posons des indicateurs simples et honnêtes, y compris ceux qui peuvent conclure à un échec.",
      },
      {
        label: "« Le projet dépend d'une seule personne »",
        detail:
          "Nous industrialisons : documentation, référents formés, procédures de secours, réversibilité.",
      },
    ],
    deliverables: [
      {
        title: "Gouvernance de l'IA",
        detail:
          "Comité de pilotage, rôles et responsabilités, charte d'usage interne, procédure de validation des nouveaux cas d'usage.",
      },
      {
        title: "Plan de conduite du changement",
        detail:
          "Séquence de communication, réponses aux objections, implication des managers de proximité, dispositif d'écoute.",
      },
      {
        title: "Formation par métier",
        detail:
          "Sessions courtes et concrètes construites sur vos propres documents et vos propres cas. Pas de cours magistral sur l'histoire des réseaux de neurones.",
      },
      {
        title: "Réseau de référents internes",
        detail:
          "Identification, formation approfondie et animation des personnes qui porteront le sujet après notre départ.",
      },
      {
        title: "Tableau de bord d'adoption",
        detail:
          "Suivi mensuel : taux d'usage réel, temps gagné, qualité perçue, incidents. Des chiffres qui permettent de décider d'arrêter ou d'accélérer.",
      },
      {
        title: "Bilan et transfert",
        detail:
          "Documentation complète, passation aux référents, plan d'autonomie à 6 mois. Nous partons en laissant l'organisation capable.",
      },
    ],
    steps: [
      {
        title: "Alignement",
        detail:
          "Reprise de la feuille de route, définition des indicateurs de succès et des seuils d'arrêt, constitution du comité de pilotage.",
        duration: "Mois 1",
      },
      {
        title: "Premier déploiement encadré",
        detail:
          "Un périmètre restreint, volontaire, très suivi. Nous corrigeons vite et documentons tout ce qui frotte.",
        duration: "Mois 1-3",
      },
      {
        title: "Généralisation",
        detail:
          "Extension progressive par vagues, formation des référents, montée en charge de la gouvernance.",
        duration: "Mois 3-8",
      },
      {
        title: "Autonomie",
        detail:
          "Réduction progressive de notre présence, transfert des rituels, bilan chiffré et plan de suite.",
        duration: "Mois 8-12",
      },
    ],
    proof: [
      { label: "Format d'intervention", value: "Mensuel" },
      { label: "Objectif d'adoption suivi", value: "Hebdo" },
      { label: "Engagement de transfert", value: "100 %" },
    ],
    faq: [
      {
        q: "Intervenez-vous sur des outils que nous avons déjà achetés ?",
        a: "Oui, et c'est le cas le plus fréquent. Copilot, Gemini, ChatGPT Entreprise, Mistral, solutions verticales : nous partons de votre socle existant plutôt que de le remplacer.",
      },
      {
        q: "Faut-il informer le CSE ou les représentants du personnel ?",
        a: "Dans la plupart des cas oui, dès lors que l'introduction d'un outil modifie l'organisation du travail. Nous préparons ces échanges avec vous et fournissons les éléments factuels attendus.",
      },
      {
        q: "Comment mesurez-vous l'adoption sans surveiller les salariés ?",
        a: "Par des indicateurs agrégés et anonymisés — volume d'usage par service, enquêtes courtes, mesures avant/après sur des tâches types. Nous refusons les dispositifs de contrôle individuel, qui détruisent la confiance et sont juridiquement risqués.",
      },
      {
        q: "Peut-on démarrer directement par l'accompagnement, sans diagnostic préalable ?",
        a: "Oui, si vos cas d'usage sont déjà arbitrés. Nous commençons alors par une revue de cadrage d'une semaine pour valider les hypothèses avant d'engager le déploiement.",
      },
    ],
    keywords: [
      "accompagnement déploiement IA",
      "conduite du changement IA",
      "formation IA entreprise",
      "adoption intelligence artificielle",
      "gouvernance IA",
      "AMOA intelligence artificielle",
    ],
  },
  {
    slug: "mvp-ia-cle-en-main",
    nav: "MVP IA clés en main",
    title: "MVP IA clés en main",
    metaTitle: "Développement de MVP IA clés en main en 6 à 10 semaines",
    metaDescription:
      "Conception et développement d'un produit IA fonctionnel, en production, hébergé en Europe, documenté et transférable. Prix forfaitaire, code livré.",
    eyebrow: "Expertise 03",
    headline: "Un produit qui tourne, pas une démonstration",
    lede: "Quand la meilleure façon de trancher un débat est de faire exister la chose. Nous concevons et livrons un MVP réellement utilisé par vos équipes, en six à dix semaines.",
    duration: "6 à 10 semaines",
    format: "Forfait — engagement de résultat sur le périmètre",
    outcome: "Un outil en production, son code, sa documentation",
    intro: [
      "Il arrive un moment où l'analyse ne suffit plus. Où la seule manière de savoir si un assistant de réponse aux appels d'offres tient la route, c'est de le mettre entre les mains de trois personnes pendant deux semaines.",
      "Nous construisons ces objets-là : périmètre volontairement étroit, qualité de production, hébergement maîtrisé, et surtout une trajectoire de sortie claire. Vous récupérez le code source, la documentation et la capacité de faire évoluer l'outil sans nous.",
      "Un MVP n'est pas un prototype jetable. C'est la première version d'un produit — assez solide pour supporter un usage quotidien, assez modeste pour être abandonnée sans drame si l'usage ne prend pas.",
    ],
    symptoms: [
      {
        label: "« On tourne en rond depuis six mois »",
        detail: "Le débat est bloqué faute de preuve. Un objet réel le débloque en quelques semaines.",
      },
      {
        label: "« Les solutions du marché ne collent pas à notre métier »",
        detail:
          "Vos référentiels, votre nomenclature, vos contraintes. Un développement sur mesure est parfois moins cher qu'une licence mal adaptée.",
      },
      {
        label: "« On a besoin de montrer quelque chose »",
        detail:
          "Comité d'investissement, dossier de subvention, conseil d'administration : une démonstration réelle change la conversation.",
      },
      {
        label: "« Nos données ne peuvent pas sortir d'Europe »",
        detail:
          "Hébergement européen, modèles auto-hébergés ou souverains, chiffrement, journalisation : nous concevons sous contrainte.",
      },
    ],
    deliverables: [
      {
        title: "Atelier de cadrage produit",
        detail:
          "Définition du périmètre minimal viable, des utilisateurs cibles, des critères de succès et de ce qui est explicitement hors périmètre.",
      },
      {
        title: "Application en production",
        detail:
          "Interface soignée, authentification, gestion des rôles, journalisation, hébergement européen. Utilisable par des non-techniciens dès le premier jour.",
      },
      {
        title: "Code source et propriété intellectuelle",
        detail:
          "Le dépôt vous appartient intégralement. Pas de boîte noire, pas de dépendance contractuelle à notre présence.",
      },
      {
        title: "Documentation technique et fonctionnelle",
        detail:
          "Architecture, choix techniques justifiés, procédures d'exploitation, guide utilisateur. Reprenable par un prestataire tiers ou votre DSI.",
      },
      {
        title: "Évaluation qualité",
        detail:
          "Jeu de tests métier, mesure du taux d'erreur et des hallucinations, garde-fous et procédures de recours humain documentées.",
      },
      {
        title: "Bilan d'usage à 30 jours",
        detail:
          "Analyse de l'usage réel après mise en service et recommandation argumentée : industrialiser, ajuster ou arrêter.",
      },
    ],
    steps: [
      {
        title: "Cadrage produit",
        detail:
          "Ateliers avec les futurs utilisateurs, maquettes, définition du périmètre gelé et des critères d'acceptation.",
        duration: "Semaine 1-2",
      },
      {
        title: "Construction",
        detail:
          "Développement par itérations d'une semaine, démonstration hebdomadaire, ajustements continus sur données réelles.",
        duration: "Semaine 2-7",
      },
      {
        title: "Mise en service",
        detail:
          "Déploiement, formation des premiers utilisateurs, accompagnement rapproché, correction des irritants.",
        duration: "Semaine 7-9",
      },
      {
        title: "Transfert",
        detail:
          "Remise du code et de la documentation, session de passation technique, bilan d'usage et décision de suite.",
        duration: "Semaine 9-10",
      },
    ],
    proof: [
      { label: "Délai de mise en production", value: "6-10 sem." },
      { label: "Démonstrations pendant le projet", value: "1 / sem." },
      { label: "Propriété du code livré", value: "100 % à vous" },
    ],
    faq: [
      {
        q: "Que se passe-t-il si le MVP ne convainc pas ?",
        a: "C'est un résultat acceptable et prévu. Vous aurez dépensé quelques semaines plutôt qu'un budget annuel, et vous saurez précisément pourquoi. Le bilan à 30 jours documente les raisons de l'arrêt.",
      },
      {
        q: "Sur quelles technologies travaillez-vous ?",
        a: "Nous privilégions des socles standards et réversibles, avec des modèles interchangeables (fournisseurs américains ou européens, modèles ouverts auto-hébergés selon vos contraintes). Le choix est arbitré au cadrage, jamais imposé d'avance.",
      },
      {
        q: "Le MVP peut-il être connecté à nos systèmes internes ?",
        a: "Oui, lorsque les accès techniques existent : ERP, GED, CRM, bases métier, messagerie. Les intégrations font partie du cadrage car elles pèsent lourd dans le délai.",
      },
      {
        q: "Qui maintient l'outil après la livraison ?",
        a: "Vous, votre DSI, un prestataire tiers, ou nous dans le cadre d'un contrat séparé. Nous concevons pour que les trois options restent ouvertes.",
      },
    ],
    keywords: [
      "MVP IA",
      "développement application IA sur mesure",
      "prototype intelligence artificielle entreprise",
      "agent IA métier",
      "RAG documentaire entreprise",
      "IA souveraine hébergement Europe",
    ],
  },
];

export const expertises: Expertise[] = frTypo(rawExpertises);

export function getExpertise(slug: string): Expertise | undefined {
  return expertises.find((e) => e.slug === slug);
}
