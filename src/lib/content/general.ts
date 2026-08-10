import { frTypo } from "@/lib/typo";

export const homeFaq = frTypo([
  {
    q: "Qu'est-ce qu'Agapante fait exactement ?",
    a: "Agapante est un cabinet de conseil indépendant spécialisé dans le déploiement de l'intelligence artificielle en organisation. Nous intervenons comme prestataire externe sur trois volets : le conseil et la stratégie (diagnostic, cas d'usage, feuille de route), l'accompagnement au déploiement (pilotage, formation, conduite du changement) et la réalisation de MVP clés en main.",
  },
  {
    q: "À quel type d'organisations vous adressez-vous ?",
    a: "Aux TPE, PME et ETI de tous secteurs, ainsi qu'aux collectivités, établissements publics et opérateurs de l'État. Nos formats d'intervention sont calibrés différemment selon la taille : quelques semaines pour une TPE, plusieurs mois pour un déploiement multi-sites en ETI.",
  },
  {
    q: "Faut-il déjà être équipé ou avoir des compétences techniques ?",
    a: "Non. La majorité de nos missions démarrent dans des organisations sans équipe data ni expertise IA interne. Une partie de notre travail consiste précisément à rendre l'organisation autonome, en formant des référents internes et en documentant tout ce qui est mis en place.",
  },
  {
    q: "Combien coûte une mission ?",
    a: "Nous ne publions pas de grille tarifaire, car un diagnostic de cadrage de quelques semaines et un déploiement multi-sites sur douze mois n'ont rien de comparable. Un premier échange de trente minutes, gratuit et sans engagement, suffit à donner un ordre de grandeur honnête sur votre situation.",
  },
  {
    q: "Êtes-vous liés à un éditeur ou à un fournisseur de solutions ?",
    a: "Non. Nous sommes indépendants de tout éditeur et ne percevons aucune commission d'apport d'affaires. Nos recommandations technologiques sont argumentées, comparées et conçues pour rester réversibles.",
  },
  {
    q: "Intervenez-vous partout en France ?",
    a: "Oui. Nous travaillons sur toute la France, principalement à distance, avec des déplacements sur site aux moments qui le justifient : immersion, ateliers de cadrage, formations et restitutions.",
  },
  {
    q: "Et si la conclusion est qu'il ne faut rien lancer ?",
    a: "Nous vous le disons clairement, en documentant les conditions à réunir pour que le sujet devienne pertinent. Un « pas maintenant » argumenté vaut mieux qu'un projet lancé pour de mauvaises raisons et abandonné six mois plus tard.",
  },
  {
    q: "Comment se déroule le premier contact ?",
    a: "Vous décrivez votre situation via le formulaire de contact. Nous revenons vers vous sous 24 heures ouvrées pour convenir d'un appel de cadrage de trente minutes, sans engagement, à l'issue duquel vous savez si nous sommes utiles — et si nous ne le sommes pas, nous vous le disons.",
  },
]);

export const principles = frTypo([
  {
    number: "01",
    title: "L'usage avant l'outil",
    detail:
      "Nous partons de gestes de travail observés, pas d'un catalogue de solutions. Un cas d'usage qui ne se chiffre pas en heures par semaine n'en est pas encore un.",
  },
  {
    number: "02",
    title: "Le droit de dire non",
    detail:
      "Nous n'avons rien à vous revendre en aval. Quand la bonne recommandation est de ne rien lancer, nous l'écrivons noir sur blanc.",
  },
  {
    number: "03",
    title: "La preuve plutôt que la promesse",
    detail:
      "Chaque chantier s'accompagne d'un critère de réussite chiffré et d'un critère d'arrêt, écrits avant le démarrage et vérifiés en comité.",
  },
  {
    number: "04",
    title: "L'autonomie comme objectif",
    detail:
      "Nous formons des référents internes et documentons tout. Une mission réussie est une mission dont vous n'avez plus besoin.",
  },
]);

export const methodSteps = frTypo([
  {
    number: "01",
    title: "Comprendre",
    subtitle: "Semaine 1 à 2",
    detail:
      "Nous venons observer comment le travail se fait réellement : entretiens métiers, immersion terrain, mesure des temps, revue des données et des outils déjà en place. Rien d'utile ne sort d'un cadrage mené uniquement en salle de réunion.",
    outputs: ["Cartographie des processus", "Inventaire de l'existant", "Diagnostic des données"],
  },
  {
    number: "02",
    title: "Arbitrer",
    subtitle: "Semaine 3 à 5",
    detail:
      "Chaque cas d'usage identifié est évalué sur quatre axes — impact, effort, risque, maturité de la donnée — puis confronté en atelier avec vos décideurs. On ne retient que trois à cinq chantiers : une organisation ne conduit pas dix changements simultanés.",
    outputs: ["Matrice de priorisation", "Business case chiffré", "Cadre de conformité"],
  },
  {
    number: "03",
    title: "Prouver",
    subtitle: "Semaine 6 à 15",
    detail:
      "Un premier chantier engagé sur un périmètre étroit, avec des utilisateurs volontaires, un critère de réussite et un critère d'arrêt écrits à l'avance. Qualité de production dès le premier jour : une interface bâclée fausse le test.",
    outputs: ["Outil en service", "Mesure avant / après", "Décision documentée"],
  },
  {
    number: "04",
    title: "Installer",
    subtitle: "Mois 4 à 12",
    detail:
      "L'usage ne s'installe que lorsqu'il remplace le geste précédent dans la procédure officielle. Formation par métier sur vos dossiers réels, réseau de référents, gouvernance légère, tableau de bord d'adoption publié en interne.",
    outputs: ["Procédures réécrites", "Référents formés", "Tableau de bord d'adoption"],
  },
  {
    number: "05",
    title: "Transmettre",
    subtitle: "Fin de mission",
    detail:
      "Nous partons. Documentation complète, code source lorsqu'il y a développement, passation aux référents et plan d'autonomie à six mois. Aucune dépendance contractuelle à notre présence.",
    outputs: ["Documentation intégrale", "Passation aux référents", "Plan d'autonomie"],
  },
]);

export const engagements = frTypo([
  {
    title: "Indépendance totale",
    detail: "Aucune commission d'éditeur, aucune revente. Nos recommandations n'ont pas d'arrière-pensée commerciale.",
  },
  {
    title: "Propriété des livrables",
    detail: "Documents, code source, configurations : tout vous appartient et reste exploitable sans nous.",
  },
  {
    title: "Réversibilité par conception",
    detail: "Aucune architecture verrouillée sur un fournisseur unique. Changer d'avis doit rester possible.",
  },
  {
    title: "Confidentialité",
    detail: "Accord de confidentialité systématique, cloisonnement des missions, aucune réutilisation de vos données.",
  },
  {
    title: "Transparence sur le prix",
    detail: "Un forfait annoncé avant le démarrage, un périmètre écrit, pas de dérive facturée en cours de route.",
  },
  {
    title: "Sobriété",
    detail: "Nous refusons les missions dont nous ne voyons pas le retour. Une mission inutile nuit d'abord à notre réputation.",
  },
]);

export const stats = frTypo([
  { value: "3", label: "modes d'intervention", detail: "Conseil, accompagnement, réalisation" },
  { value: "24 h", label: "délai de réponse", detail: "Jours ouvrés" },
  { value: "6-10", label: "semaines pour un MVP", detail: "De l'atelier de cadrage à la production" },
  { value: "100 %", label: "des livrables transférés", detail: "Code, documentation, méthode" },
]);
