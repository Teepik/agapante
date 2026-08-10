import { frTypo } from "@/lib/typo";

export type Article = {
  slug: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  excerpt: string;
  category: string;
  date: string;
  updated?: string;
  readingTime: number;
  keywords: string[];
  toc: { id: string; label: string }[];
  html: string;
};

const rawArticles: Article[] = [
  {
    slug: "deployer-ia-entreprise-methode",
    title: "Déployer l'IA en entreprise : la méthode en sept étapes",
    metaTitle: "Déployer l'IA en entreprise : méthode complète en 7 étapes",
    metaDescription:
      "Une méthode éprouvée pour passer de l'intention au déploiement réel : cadrage, priorisation, conformité, pilote, adoption, mesure et industrialisation.",
    excerpt:
      "La différence entre une organisation qui tire un bénéfice de l'IA et une autre qui accumule les pilotes ne tient presque jamais à la technologie. Elle tient à l'ordre dans lequel les étapes sont franchies.",
    category: "Méthode",
    date: "2026-06-12",
    updated: "2026-08-04",
    readingTime: 11,
    keywords: [
      "déployer IA entreprise",
      "méthode déploiement intelligence artificielle",
      "projet IA PME",
      "feuille de route IA",
      "adoption IA",
    ],
    toc: [
      { id: "constat", label: "Le constat de départ" },
      { id: "etape-1", label: "1. Partir des processus, pas des outils" },
      { id: "etape-2", label: "2. Prioriser avec une grille honnête" },
      { id: "etape-3", label: "3. Poser le cadre avant de coder" },
      { id: "etape-4", label: "4. Construire un pilote qui peut échouer" },
      { id: "etape-5", label: "5. Traiter l'adoption comme un chantier à part entière" },
      { id: "etape-6", label: "6. Mesurer, y compris ce qui dérange" },
      { id: "etape-7", label: "7. Industrialiser ou arrêter" },
      { id: "erreurs", label: "Les erreurs qui reviennent le plus souvent" },
    ],
    html: `
<p>Depuis trois ans, les organisations françaises ont massivement expérimenté l'intelligence artificielle générative. Beaucoup moins nombreuses sont celles qui peuvent aujourd'hui citer un usage installé, mesuré, et intégré à leurs procédures. Cet écart entre l'expérimentation et l'exploitation est le vrai sujet.</p>

<h2 id="constat">Le constat de départ</h2>
<p>Un projet d'IA échoue rarement pour des raisons techniques. Les modèles disponibles aujourd'hui sont largement suffisants pour l'immense majorité des besoins d'une PME ou d'une administration. Les causes d'échec sont ailleurs, et elles sont remarquablement stables d'une organisation à l'autre :</p>
<ul>
  <li>le cas d'usage a été choisi pour sa <strong>démonstrabilité</strong>, pas pour sa valeur ;</li>
  <li>aucun <strong>propriétaire métier</strong> n'a été désigné, seulement un sponsor lointain ;</li>
  <li>le <strong>critère de succès</strong> n'a jamais été écrit, donc le projet ne peut ni réussir ni échouer ;</li>
  <li>la <strong>conformité</strong> a été traitée après le développement, ce qui a bloqué la mise en production ;</li>
  <li>l'<strong>adoption</strong> a été considérée comme un problème de communication.</li>
</ul>
<p>La méthode qui suit ne prétend pas être originale. Elle est simplement ordonnée, et cet ordre compte davantage que le contenu de chaque étape.</p>

<h2 id="etape-1">1. Partir des processus, pas des outils</h2>
<p>La question « que pourrait-on faire avec l'IA ? » produit systématiquement des réponses inutilisables. La bonne question est : <em>où passe le temps de nos équipes, et lequel de ces temps est répétitif, documenté, à faible valeur ajoutée et à faible risque ?</em></p>
<p>Concrètement, cela veut dire aller observer. Une demi-journée passée à côté d'un chargé d'affaires qui monte un devis vous apprendra plus que trois réunions de cadrage. Vous verrez qu'il ouvre sept onglets, qu'il recopie manuellement des références, qu'il cherche pendant douze minutes un document technique qu'il sait exister quelque part.</p>
<p>Ces gestes-là sont les bons candidats. Ils sont fréquents, chronométrables, et leur amélioration se traduit immédiatement en heures.</p>
<blockquote>Un cas d'usage qu'on ne peut pas chiffrer en heures par semaine n'est pas encore un cas d'usage. C'est une idée.</blockquote>

<h2 id="etape-2">2. Prioriser avec une grille honnête</h2>
<p>Une fois vingt à quarante cas d'usage identifiés, il faut trancher. Nous utilisons quatre axes, notés de 1 à 5 :</p>
<table>
  <thead>
    <tr><th>Axe</th><th>Question posée</th><th>Piège fréquent</th></tr>
  </thead>
  <tbody>
    <tr><td>Impact</td><td>Combien d'heures ou d'euros par an ?</td><td>Compter des gains théoriques jamais réalloués</td></tr>
    <tr><td>Effort</td><td>Combien de semaines-personne, intégrations comprises ?</td><td>Oublier le coût des connexions aux systèmes existants</td></tr>
    <tr><td>Risque</td><td>Que se passe-t-il si le système se trompe ?</td><td>Sous-estimer les cas touchant à des personnes</td></tr>
    <tr><td>Maturité de la donnée</td><td>La matière existe-t-elle, propre et accessible ?</td><td>Découvrir en semaine 6 que la GED est un chaos</td></tr>
  </tbody>
</table>
<p>Ce qui compte n'est pas la précision de la notation, forcément approximative, mais le fait que l'arbitrage devienne <strong>explicite et discutable</strong>. Un directeur qui voit son cas d'usage favori noté 2 sur l'axe « maturité de la donnée » comprend ce qu'il doit faire pour le remonter.</p>
<p>Retenez trois à cinq cas d'usage. Pas dix. Une organisation ne peut pas conduire dix changements simultanés.</p>

<h2 id="etape-3">3. Poser le cadre avant de coder</h2>
<p>Le cadre, c'est trois documents courts, produits en quelques jours :</p>
<ul>
  <li>une <strong>classification des données</strong> : ce qui peut être transmis à un service externe, ce qui doit rester dans un environnement maîtrisé, ce qui ne doit jamais être traité automatiquement ;</li>
  <li>une <strong>charte d'usage</strong> interne : ce que les collaborateurs ont le droit de faire, avec quels outils, et ce qui est proscrit ;</li>
  <li>une <strong>note de conformité</strong> : base légale des traitements, information des personnes, positionnement au regard du règlement européen sur l'IA, et supervision humaine prévue.</li>
</ul>
<p>Ces documents ne sont pas des formalités administratives. Ils déterminent l'architecture technique. Un cas d'usage qui manipule des données RH n'a pas la même conception qu'un assistant de recherche documentaire sur des fiches produits publiques.</p>

<h2 id="etape-4">4. Construire un pilote qui peut échouer</h2>
<p>Un bon pilote a quatre propriétés : un périmètre étroit, des utilisateurs volontaires, une durée bornée, et un critère d'arrêt écrit à l'avance.</p>
<p>Le critère d'arrêt est le plus souvent oublié, et c'est le plus important. Écrivez, avant de commencer : « si au bout de huit semaines moins de la moitié des utilisateurs pilotes s'en servent au moins trois fois par semaine, nous arrêtons ». Cette phrase transforme le pilote en expérience, et une expérience qui échoue est un résultat, pas une faute.</p>
<p>Sur le plan technique, visez la qualité de production dès le pilote. Une interface bâclée produit un rejet qui n'a rien à voir avec la pertinence du cas d'usage, et vous ne saurez plus ce que vous avez testé.</p>

<h2 id="etape-5">5. Traiter l'adoption comme un chantier à part entière</h2>
<p>C'est ici que se joue l'essentiel, et c'est ici que la plupart des budgets sont sous-dimensionnés. Quelques principes qui fonctionnent :</p>
<ul>
  <li><strong>Former sur les documents réels de l'entreprise.</strong> Une formation générique sur les « prompts » ne produit aucun transfert. Une session où l'on retraite ensemble trois dossiers de la semaine précédente, si.</li>
  <li><strong>Nommer des référents légitimes.</strong> Le meilleur relais n'est pas le plus technophile, c'est celui que les autres vont voir spontanément quand ils ont une question métier.</li>
  <li><strong>Répondre à la question de l'emploi.</strong> Elle est posée dans toutes les organisations, généralement en dehors des réunions officielles. Un engagement écrit de la direction sur ce que l'IA ne servira pas à faire vaut mieux que dix diaporamas rassurants.</li>
  <li><strong>Réécrire les procédures.</strong> Tant que le mode opératoire officiel décrit l'ancien geste, l'outil reste une option personnelle. L'usage ne s'installe qu'une fois intégré à la procédure.</li>
</ul>

<h2 id="etape-6">6. Mesurer, y compris ce qui dérange</h2>
<p>Trois familles d'indicateurs suffisent :</p>
<ul>
  <li><strong>Usage</strong> : part des utilisateurs actifs, fréquence, répartition par service. Agrégé et anonymisé — jamais de suivi individuel, qui détruit la confiance et vous expose juridiquement.</li>
  <li><strong>Valeur</strong> : mesure avant/après sur une tâche type, chronométrée sur un échantillon. Imparfaite mais infiniment plus utile qu'une estimation déclarative.</li>
  <li><strong>Qualité</strong> : taux d'erreur constaté, incidents, retours utilisateurs négatifs. Un système qui produit des réponses fausses non détectées coûte plus cher qu'il ne rapporte.</li>
</ul>
<p>Publiez ces chiffres en interne, y compris les mauvais. Une organisation qui voit une direction annoncer l'arrêt d'un cas d'usage sur la base de données factuelles fait immédiatement confiance à la démarche.</p>

<h2 id="etape-7">7. Industrialiser ou arrêter</h2>
<p>À l'issue du pilote, trois décisions sont possibles, et il faut avoir le courage des trois : généraliser, ajuster et reconduire une phase, ou arrêter.</p>
<p>L'industrialisation soulève des questions nouvelles : qui exploite l'outil au quotidien, comment sont gérés les incidents, comment les coûts d'usage sont suivis, comment on change de modèle sans tout reconstruire, comment le service est réversible si le fournisseur change ses conditions. Ces questions doivent être traitées avant la généralisation, pas après.</p>

<h2 id="erreurs">Les erreurs qui reviennent le plus souvent</h2>
<ul>
  <li><strong>Commencer par acheter des licences pour tout le monde.</strong> Le taux d'usage réel s'effondre après six semaines et la démarche perd sa crédibilité.</li>
  <li><strong>Confier le sujet à la seule DSI.</strong> C'est un sujet d'organisation du travail avant d'être un sujet technique.</li>
  <li><strong>Chercher le cas d'usage spectaculaire.</strong> La valeur est presque toujours dans le back-office, pas dans la relation client.</li>
  <li><strong>Traiter la conformité en fin de parcours.</strong> C'est la première cause de projets bloqués à la porte de la production.</li>
  <li><strong>Ne rien mesurer.</strong> Sans chiffres, le projet ne survit pas au premier changement de priorité budgétaire.</li>
</ul>
<p>Aucune de ces étapes ne demande une expertise technique rare. Elles demandent de la discipline, un peu de temps de direction, et l'acceptation qu'une partie des idées de départ sera abandonnée. C'est exactement ce que fait un accompagnement extérieur bien conduit : il tient l'ordre des étapes quand l'organisation, elle, a dix autres urgences.</p>
`,
  },
  {
    slug: "cout-projet-ia-entreprise",
    title: "Combien coûte réellement un projet d'IA en entreprise",
    metaTitle: "Combien coûte un projet d'IA en entreprise ? Repères et postes de coût",
    metaDescription:
      "Décomposition honnête du coût d'un projet d'intelligence artificielle : cadrage, développement, intégration, run, formation. Les postes que l'on oublie systématiquement.",
    excerpt:
      "Le coût visible d'un projet d'IA — les licences, le développement — représente rarement plus de la moitié de la dépense réelle. Voici la structure complète.",
    category: "Décision",
    date: "2026-05-20",
    updated: "2026-07-28",
    readingTime: 9,
    keywords: [
      "coût projet IA",
      "budget intelligence artificielle entreprise",
      "prix développement IA sur mesure",
      "ROI IA",
      "coût licences IA",
    ],
    toc: [
      { id: "poste-visible", label: "Ce que l'on budgète" },
      { id: "poste-invisible", label: "Ce que l'on oublie" },
      { id: "structure", label: "La structure de coût réelle" },
      { id: "run", label: "Le coût de run, ce grand impensé" },
      { id: "roi", label: "Calculer un retour sur investissement crédible" },
      { id: "arbitrage", label: "Acheter, adapter ou construire" },
    ],
    html: `
<p>La question du budget arrive toujours en début de conversation, et elle mérite une réponse plus utile que « cela dépend ». Cela dépend, en effet — mais la <em>structure</em> du coût, elle, est remarquablement stable. La connaître permet de repérer immédiatement un devis qui sous-estime le projet.</p>

<h2 id="poste-visible">Ce que l'on budgète</h2>
<p>Dans la quasi-totalité des budgets initiaux que nous voyons, trois postes figurent :</p>
<ul>
  <li>les <strong>licences</strong> ou l'abonnement à un service ;</li>
  <li>le <strong>développement</strong> ou le paramétrage initial ;</li>
  <li>éventuellement une <strong>journée de formation</strong>.</li>
</ul>
<p>Ces trois postes sont réels, faciles à chiffrer, et représentent en général entre 40 % et 60 % de la dépense totale sur deux ans.</p>

<h2 id="poste-invisible">Ce que l'on oublie</h2>
<p>Les postes systématiquement absents des budgets initiaux, par ordre de fréquence :</p>
<ul>
  <li><strong>La préparation des données.</strong> Nettoyer, structurer, dédoublonner un fonds documentaire est souvent le poste le plus lourd. Sur certains projets d'assistant documentaire, il représente à lui seul 30 à 40 % de la charge.</li>
  <li><strong>Les intégrations.</strong> Connecter un outil à un ERP vieillissant, à une GED maison ou à un annuaire interne coûte régulièrement plus cher que le développement de la fonctionnalité elle-même.</li>
  <li><strong>Le temps interne.</strong> Entretiens, ateliers, recettes, comités : entre 15 et 40 jours-personne côté client sur un projet de taille moyenne. Ce temps est réel même s'il n'apparaît sur aucune facture.</li>
  <li><strong>L'accompagnement au changement.</strong> Formations par métier, réécriture des procédures, animation des référents. Compter 20 à 30 % du budget projet si l'on veut que l'outil soit utilisé.</li>
  <li><strong>La conformité.</strong> Analyse d'impact, documentation technique, information des instances, éventuellement conseil juridique.</li>
  <li><strong>Le run.</strong> Voir plus bas — c'est le poste le plus sous-estimé.</li>
</ul>

<h2 id="structure">La structure de coût réelle</h2>
<p>Sur un projet type d'assistant métier déployé dans une PME, la répartition sur vingt-quatre mois ressemble le plus souvent à ceci :</p>
<table>
  <thead><tr><th>Poste</th><th>Part du coût total</th></tr></thead>
  <tbody>
    <tr><td>Cadrage et conception</td><td>10 – 15 %</td></tr>
    <tr><td>Préparation des données</td><td>15 – 30 %</td></tr>
    <tr><td>Développement et intégrations</td><td>25 – 35 %</td></tr>
    <tr><td>Conduite du changement et formation</td><td>15 – 25 %</td></tr>
    <tr><td>Exploitation et évolutions (24 mois)</td><td>15 – 25 %</td></tr>
  </tbody>
</table>
<p>Deux enseignements. D'abord, le développement pur est minoritaire — c'est contre-intuitif pour une direction qui négocie un devis à la journée-homme. Ensuite, tout projet dont le budget ne comporte aucune ligne « données » ni aucune ligne « adoption » est un projet dont le coût réel sera découvert en cours de route.</p>

<h2 id="run">Le coût de run, ce grand impensé</h2>
<p>Une fois l'outil en production, il continue de coûter :</p>
<ul>
  <li><strong>Consommation des modèles.</strong> Variable selon le volume et le modèle choisi. La bonne pratique consiste à instrumenter le suivi par cas d'usage dès le premier jour, et à router les requêtes simples vers des modèles moins coûteux.</li>
  <li><strong>Hébergement et supervision.</strong> Modeste sur une application légère, significatif si vous auto-hébergez des modèles pour des raisons de souveraineté.</li>
  <li><strong>Maintenance fonctionnelle.</strong> Les modèles évoluent, les fournisseurs changent leurs interfaces, vos procédures bougent. Prévoyez une enveloppe annuelle d'évolution, faute de quoi l'outil se dégrade silencieusement.</li>
  <li><strong>Animation.</strong> Quelqu'un doit continuer à répondre aux questions, à mettre à jour la base documentaire, à former les nouveaux arrivants. Souvent une fraction d'un poste, rarement zéro.</li>
</ul>

<h2 id="roi">Calculer un retour sur investissement crédible</h2>
<p>Un calcul de ROI n'est crédible que s'il est prudent et explicite sur ses hypothèses. Trois règles :</p>
<ol>
  <li><strong>Ne comptez que le temps réellement réalloué.</strong> Faire gagner dix minutes par jour à quarante personnes ne produit pas mécaniquement 1,5 ETP. Comptez ce que vous ferez concrètement de ce temps : plus de dossiers traités, moins d'heures supplémentaires, un recrutement différé.</li>
  <li><strong>Chiffrez un scénario pessimiste.</strong> Adoption à 50 % de la cible, gains à 60 % de l'estimation. Si le projet reste rentable dans ce scénario, il est solide.</li>
  <li><strong>Intégrez les gains non financiers séparément.</strong> Qualité, délai de réponse, attractivité, réduction du risque d'erreur : réels, mais à ne pas mélanger avec des euros pour ne pas fragiliser le dossier.</li>
</ol>

<h2 id="arbitrage">Acheter, adapter ou construire</h2>
<p>Trois options, trois profils de coût :</p>
<ul>
  <li><strong>Acheter une solution du marché.</strong> Coût initial faible, mise en œuvre rapide, mais dépendance forte et coût récurrent qui croît avec le nombre d'utilisateurs. Pertinent pour les besoins standards.</li>
  <li><strong>Adapter un socle existant.</strong> Le compromis le plus fréquent : une plateforme généraliste, configurée sur vos données et vos usages.</li>
  <li><strong>Construire sur mesure.</strong> Coût initial supérieur, mais coût récurrent maîtrisé et propriété complète. Devient rentable dès que le besoin est spécifique à votre métier ou que le nombre d'utilisateurs est élevé.</li>
</ul>
<p>L'erreur classique consiste à comparer un coût de construction sur trois mois à un coût de licence sur un an. Comparez toujours sur trois ans, coût de run inclus, et intégrez la valeur de la réversibilité : pouvoir changer de fournisseur sans reconstruire est un actif qui ne figure sur aucune facture.</p>
<p>Nous ne publions pas de grille tarifaire, parce qu'un diagnostic de cadrage et un déploiement multi-sites n'ont rien de comparable. En revanche, un échange de trente minutes suffit presque toujours à donner un ordre de grandeur honnête — y compris quand la réponse est que le projet ne vaut pas son coût.</p>
`,
  },
  {
    slug: "ai-act-pme-eti-obligations",
    title: "AI Act : ce que les PME, ETI et administrations doivent réellement faire",
    metaTitle: "AI Act : obligations concrètes pour les PME, ETI et administrations",
    metaDescription:
      "Lecture opérationnelle du règlement européen sur l'IA : classification des systèmes, obligations par niveau de risque, documentation attendue et calendrier.",
    excerpt:
      "Le règlement européen sur l'IA inquiète beaucoup plus qu'il ne contraint, pour la plupart des organisations. Encore faut-il savoir dans quelle catégorie on se trouve.",
    category: "Conformité",
    date: "2026-04-08",
    updated: "2026-07-15",
    readingTime: 10,
    keywords: [
      "AI Act PME",
      "règlement européen intelligence artificielle",
      "conformité IA entreprise",
      "obligations AI Act",
      "IA haut risque",
      "RGPD IA",
    ],
    toc: [
      { id: "principe", label: "Le principe : une réglementation par le risque" },
      { id: "roles", label: "Fournisseur ou déployeur : la première question" },
      { id: "categories", label: "Les quatre niveaux de risque" },
      { id: "haut-risque", label: "Les usages à haut risque, en pratique" },
      { id: "litteratie", label: "L'obligation de formation, souvent ignorée" },
      { id: "rgpd", label: "Articulation avec le RGPD" },
      { id: "faire", label: "Ce qu'il faut faire, concrètement" },
    ],
    html: `
<p>Le règlement européen sur l'intelligence artificielle produit deux réactions symétriques et également coûteuses : la panique, qui gèle tous les projets, et l'indifférence, qui expose à des blocages tardifs. La réalité est plus banale. Pour la majorité des organisations, les obligations réelles sont limitées — mais elles supposent d'avoir fait un travail de classification que presque personne n'a fait.</p>
<p><em>Cet article propose une lecture opérationnelle et ne constitue pas un avis juridique. Sur les usages sensibles, l'accompagnement par un conseil spécialisé reste nécessaire.</em></p>

<h2 id="principe">Le principe : une réglementation par le risque</h2>
<p>Le texte ne réglemente pas « l'IA » en tant que technologie. Il réglemente des <strong>usages</strong>, classés selon le risque qu'ils font peser sur les droits fondamentaux, la santé et la sécurité des personnes. Le même modèle peut donc relever d'obligations légères dans un contexte et d'obligations lourdes dans un autre.</p>
<p>Conséquence pratique immédiate : la conformité ne se traite pas au niveau de l'outil que vous avez acheté, mais au niveau de <strong>chaque cas d'usage</strong> que vous en faites.</p>

<h2 id="roles">Fournisseur ou déployeur : la première question</h2>
<p>Le règlement distingue plusieurs rôles, dont deux concernent la plupart des organisations :</p>
<ul>
  <li>le <strong>fournisseur</strong>, qui développe un système d'IA et le met sur le marché ou en service sous son nom ;</li>
  <li>le <strong>déployeur</strong>, qui utilise un système d'IA sous sa propre autorité dans un cadre professionnel.</li>
</ul>
<p>La plupart des PME et administrations sont des déployeurs, dont les obligations sont nettement plus légères. Attention toutefois : construire un outil interne à partir d'un modèle du marché, puis le mettre en service sous votre propre nom, peut vous faire basculer vers des obligations de fournisseur. C'est un point à trancher au cadrage, pas après le développement.</p>

<h2 id="categories">Les quatre niveaux de risque</h2>
<table>
  <thead><tr><th>Niveau</th><th>Exemples</th><th>Conséquence</th></tr></thead>
  <tbody>
    <tr><td>Inacceptable</td><td>Notation sociale, exploitation de vulnérabilités, certaines identifications biométriques</td><td>Interdit</td></tr>
    <tr><td>Haut risque</td><td>Recrutement, évaluation des salariés, accès à des services essentiels, sécurité de produits, certains usages publics</td><td>Obligations lourdes</td></tr>
    <tr><td>Risque limité</td><td>Agents conversationnels, génération de contenus</td><td>Transparence</td></tr>
    <tr><td>Risque minimal</td><td>Aide à la rédaction interne, recherche documentaire, synthèse</td><td>Bonnes pratiques</td></tr>
  </tbody>
</table>
<p>Dans nos missions, la très grande majorité des cas d'usage identifiés relèvent des deux derniers niveaux. Un assistant qui aide un chargé d'affaires à retrouver une fiche technique n'est pas un système à haut risque. Le dire clairement, documents à l'appui, débloque beaucoup de projets.</p>

<h2 id="haut-risque">Les usages à haut risque, en pratique</h2>
<p>Trois familles concernent fréquemment les organisations que nous accompagnons :</p>
<ul>
  <li><strong>Ressources humaines.</strong> Tri de candidatures, aide à la décision de promotion, évaluation de la performance. Dès qu'un système contribue à une décision affectant une personne dans son emploi, la vigilance doit être maximale.</li>
  <li><strong>Accès à des services essentiels.</strong> Attribution de prestations, évaluation de solvabilité, priorisation de demandes d'usagers.</li>
  <li><strong>Sécurité.</strong> Composants de sécurité de produits ou d'infrastructures.</li>
</ul>
<p>Pour ces usages, attendez-vous à devoir formaliser : une gestion des risques documentée, une gouvernance des données d'entraînement, une documentation technique, une journalisation, une supervision humaine effective, et une information claire des personnes concernées. Ce n'est pas hors de portée d'une ETI, mais cela se prépare — pas en trois semaines.</p>
<p>Un principe simple à retenir : <strong>maintenir une décision humaine réelle</strong>, non pas formelle, réduit très substantiellement la complexité. « Réelle » signifie que la personne dispose du temps, de l'information et de l'autorité pour contredire le système.</p>

<h2 id="litteratie">L'obligation de formation, souvent ignorée</h2>
<p>Une obligation transversale est passée largement inaperçue : les organisations qui déploient des systèmes d'IA doivent veiller à ce que leurs personnels concernés disposent d'un <strong>niveau suffisant de maîtrise</strong> de ces systèmes — compréhension des capacités, des limites et des risques.</p>
<p>C'est, paradoxalement, la meilleure nouvelle du texte : cette obligation converge exactement avec ce qui fait réussir un déploiement. Former sérieusement ses équipes n'est pas une charge réglementaire, c'est la condition de l'adoption. Autant traiter les deux d'un même mouvement.</p>

<h2 id="rgpd">Articulation avec le RGPD</h2>
<p>Les deux textes se superposent sans se remplacer. Dès que des données personnelles sont traitées — et c'est presque toujours le cas — le RGPD continue de s'appliquer intégralement : base légale, minimisation, durée de conservation, information des personnes, analyse d'impact lorsque le traitement est susceptible d'engendrer un risque élevé.</p>
<p>En pratique, l'analyse d'impact relative à la protection des données reste le document pivot. Bien menée, elle couvre une grande partie de ce que la conformité au règlement IA exigera par ailleurs.</p>

<h2 id="faire">Ce qu'il faut faire, concrètement</h2>
<ol>
  <li><strong>Inventorier.</strong> Lister tous les systèmes d'IA utilisés dans l'organisation, y compris ceux introduits par les services sans validation centrale. Cet inventaire est presque toujours plus long que prévu.</li>
  <li><strong>Classer.</strong> Pour chaque usage, déterminer le rôle (fournisseur ou déployeur) et le niveau de risque. Une page par usage suffit.</li>
  <li><strong>Écrire une charte d'usage.</strong> Ce qui est autorisé, avec quels outils, sur quelles données, avec quelle relecture humaine.</li>
  <li><strong>Former.</strong> De façon différenciée : sensibilisation large, formation approfondie pour les équipes concernées par des usages sensibles.</li>
  <li><strong>Documenter les usages sensibles.</strong> Gestion des risques, supervision humaine, journalisation, information des personnes.</li>
  <li><strong>Réexaminer périodiquement.</strong> Les usages dérivent, les outils évoluent. Une revue annuelle est un minimum.</li>
</ol>
<p>Pour une PME dont tous les usages relèvent du risque minimal, ce travail représente quelques jours. Pour une ETI avec des usages RH ou de sécurité, c'est un chantier de plusieurs mois. Dans les deux cas, l'engager tôt coûte infiniment moins cher que de découvrir le sujet au moment de la mise en production.</p>
`,
  },
  {
    slug: "cas-usage-ia-par-fonction",
    title: "Trente cas d'usage de l'IA, fonction par fonction",
    metaTitle: "30 cas d'usage concrets de l'IA en entreprise, par fonction",
    metaDescription:
      "Panorama opérationnel des cas d'usage de l'IA générative par fonction : commerce, production, finance, RH, juridique, support, marketing. Avec niveau de difficulté.",
    excerpt:
      "Un inventaire concret, sans promesse abusive, des usages qui fonctionnent réellement aujourd'hui dans les organisations de taille moyenne.",
    category: "Cas d'usage",
    date: "2026-03-18",
    updated: "2026-08-01",
    readingTime: 12,
    keywords: [
      "cas d'usage IA entreprise",
      "IA générative fonction commerciale",
      "IA finance comptabilité",
      "IA ressources humaines",
      "automatisation métier IA",
    ],
    toc: [
      { id: "lecture", label: "Comment lire cette liste" },
      { id: "commerce", label: "Commerce et avant-vente" },
      { id: "operations", label: "Opérations et production" },
      { id: "support", label: "Relation client et support" },
      { id: "finance", label: "Finance et administration" },
      { id: "rh", label: "Ressources humaines" },
      { id: "juridique", label: "Juridique et conformité" },
      { id: "marketing", label: "Marketing et communication" },
      { id: "direction", label: "Direction générale" },
    ],
    html: `
<p>Les listes de cas d'usage circulent en abondance, et la plupart mélangent ce qui fonctionne aujourd'hui avec ce qui fonctionnera peut-être un jour. Celle-ci ne retient que des usages que nous avons vus produire un effet mesurable dans des organisations de vingt à quelques milliers de personnes.</p>

<h2 id="lecture">Comment lire cette liste</h2>
<p>Chaque usage est accompagné d'un niveau de difficulté :</p>
<ul>
  <li><strong>Immédiat</strong> — réalisable en quelques jours avec des outils du marché, sans intégration.</li>
  <li><strong>Modéré</strong> — nécessite de préparer des données ou de connecter un système.</li>
  <li><strong>Exigeant</strong> — projet à part entière, avec conformité et conduite du changement.</li>
</ul>

<h2 id="commerce">Commerce et avant-vente</h2>
<ul>
  <li><strong>Réponse aux appels d'offres</strong> — Extraction des exigences d'un cahier des charges, pré-rédaction à partir de la bibliothèque de réponses passées, contrôle de complétude. <em>Modéré.</em> C'est l'un des cas d'usage au meilleur rendement dans les entreprises qui répondent régulièrement à des consultations.</li>
  <li><strong>Rédaction de propositions commerciales</strong> — Première version à partir des notes de rendez-vous et de vos modèles. <em>Immédiat.</em></li>
  <li><strong>Préparation de rendez-vous</strong> — Synthèse de l'historique client, actualité de l'entreprise, points d'attention. <em>Modéré.</em></li>
  <li><strong>Qualification des demandes entrantes</strong> — Classement, routage, détection des demandes prioritaires. <em>Modéré.</em></li>
  <li><strong>Comptes rendus de visite</strong> — Transcription et structuration automatique, alimentation du CRM. <em>Immédiat.</em> Effet secondaire notable : la qualité des données CRM s'améliore, parce que la saisie cesse d'être une corvée.</li>
</ul>

<h2 id="operations">Opérations et production</h2>
<ul>
  <li><strong>Recherche technique documentaire</strong> — Interrogation en langage naturel de plans, notices, procédures et historiques d'incidents, avec citation des sources. <em>Modéré à exigeant.</em></li>
  <li><strong>Aide au diagnostic de panne</strong> — Croisement des symptômes avec l'historique des interventions. <em>Exigeant.</em></li>
  <li><strong>Rédaction de procédures et modes opératoires</strong> — À partir d'un enregistrement du geste expliqué par l'opérateur expérimenté. <em>Immédiat.</em> Précieux pour capter le savoir avant un départ en retraite.</li>
  <li><strong>Contrôle qualité documentaire</strong> — Vérification de cohérence entre commande, plan, gamme et bon de livraison. <em>Modéré.</em></li>
  <li><strong>Planification et ordonnancement assistés</strong> — Suggestions d'affectation sous contraintes. <em>Exigeant.</em></li>
</ul>

<h2 id="support">Relation client et support</h2>
<ul>
  <li><strong>Assistance au conseiller en temps réel</strong> — Suggestion de réponse fondée sur la base de connaissances, validation humaine systématique. <em>Modéré.</em> Nettement plus efficace, et moins risqué, que le remplacement du conseiller.</li>
  <li><strong>Synthèse de dossier</strong> — Résumé de l'historique d'un client avant reprise par un autre conseiller. <em>Modéré.</em></li>
  <li><strong>Analyse des motifs de contact</strong> — Catégorisation automatique de milliers de tickets pour identifier les causes racines. <em>Modéré.</em> Souvent le cas d'usage qui révèle les vrais problèmes produit.</li>
  <li><strong>Rédaction et maintenance de la base de connaissances</strong> — Détection des articles manquants ou obsolètes à partir des tickets. <em>Modéré.</em></li>
  <li><strong>Agent conversationnel de premier niveau</strong> — Sur des questions factuelles bornées, avec transfert humain explicite et immédiat. <em>Exigeant.</em> À manier avec précaution : mal calibré, il dégrade la satisfaction.</li>
</ul>

<h2 id="finance">Finance et administration</h2>
<ul>
  <li><strong>Traitement des factures fournisseurs</strong> — Extraction, rapprochement, détection d'anomalies. <em>Modéré.</em></li>
  <li><strong>Contrôle de cohérence budgétaire</strong> — Détection d'écarts et d'imputations improbables. <em>Modéré.</em></li>
  <li><strong>Préparation des reportings</strong> — Rédaction des commentaires d'analyse à partir des chiffres, à valider. <em>Modéré.</em></li>
  <li><strong>Relance clients</strong> — Personnalisation des relances selon l'historique et l'ancienneté. <em>Immédiat.</em></li>
  <li><strong>Veille sur les aides et dispositifs</strong> — Suivi des dispositifs applicables à votre secteur et à votre territoire. <em>Immédiat.</em></li>
</ul>

<h2 id="rh">Ressources humaines</h2>
<p><em>Attention : plusieurs de ces usages relèvent de la catégorie à haut risque du règlement européen sur l'IA et exigent un encadrement strict.</em></p>
<ul>
  <li><strong>Rédaction d'offres d'emploi</strong> — Y compris relecture pour supprimer les formulations discriminantes. <em>Immédiat.</em></li>
  <li><strong>Aide au tri des candidatures</strong> — Uniquement en appui, sans notation automatique ni rejet automatisé. <em>Exigeant, encadrement obligatoire.</em></li>
  <li><strong>Réponses aux questions des salariés</strong> — Assistant interne sur la convention collective, les accords d'entreprise, les procédures. <em>Modéré.</em> Excellent rendement, risque faible.</li>
  <li><strong>Parcours d'intégration</strong> — Génération de parcours personnalisés et réponse aux questions des nouveaux arrivants. <em>Modéré.</em></li>
  <li><strong>Analyse des enquêtes internes</strong> — Synthèse des réponses ouvertes de plusieurs centaines de collaborateurs. <em>Immédiat.</em></li>
</ul>

<h2 id="juridique">Juridique et conformité</h2>
<ul>
  <li><strong>Revue de contrats</strong> — Détection des clauses manquantes ou non conformes à votre standard. <em>Modéré.</em></li>
  <li><strong>Veille réglementaire</strong> — Suivi ciblé des évolutions applicables à votre activité. <em>Modéré.</em></li>
  <li><strong>Préparation des audits</strong> — Collecte et vérification de la complétude des pièces. <em>Modéré.</em></li>
  <li><strong>Recherche dans le corpus interne</strong> — Délibérations, notes, décisions passées. <em>Modéré.</em></li>
</ul>

<h2 id="marketing">Marketing et communication</h2>
<ul>
  <li><strong>Production éditoriale régulière</strong> — Articles, fiches, publications, à partir de votre expertise réelle et sous relecture. <em>Immédiat.</em> La régularité obtenue vaut plus que la sophistication du texte.</li>
  <li><strong>Déclinaison multi-format</strong> — Un contenu source transformé en newsletter, publication sociale, argumentaire commercial. <em>Immédiat.</em></li>
  <li><strong>Analyse concurrentielle</strong> — Suivi structuré des discours et positionnements. <em>Modéré.</em></li>
</ul>

<h2 id="direction">Direction générale</h2>
<ul>
  <li><strong>Préparation de comités</strong> — Synthèse des documents préparatoires, questions à poser, points de vigilance. <em>Immédiat.</em></li>
  <li><strong>Analyse de documents longs</strong> — Rapports, études, réponses à consultation, avec vérification par sondage. <em>Immédiat.</em></li>
  <li><strong>Aide à la décision documentée</strong> — Construction d'options argumentées à partir de vos données internes. <em>Modéré.</em></li>
</ul>

<p>Une remarque pour finir. Les usages classés « immédiat » représentent, dans la plupart des organisations que nous accompagnons, la majorité des gains de la première année. Commencer par les plus spectaculaires est une erreur classique : ils consomment le budget, la patience et le capital de confiance nécessaires à la suite.</p>
`,
  },
  {
    slug: "pourquoi-les-pilotes-ia-echouent",
    title: "Pourquoi la plupart des pilotes IA n'arrivent jamais en production",
    metaTitle: "Pourquoi les pilotes IA échouent — et comment l'éviter",
    metaDescription:
      "Analyse des causes réelles d'échec des projets d'IA en entreprise : cadrage, propriété métier, données, conformité tardive, adoption. Et les contre-mesures.",
    excerpt:
      "Six causes récurrentes, aucune n'étant technique. Et ce qu'il faut mettre en place, très concrètement, pour ne pas les rencontrer.",
    category: "Méthode",
    date: "2026-02-24",
    readingTime: 8,
    keywords: [
      "échec projet IA",
      "pilote IA production",
      "adoption IA entreprise",
      "conduite du changement intelligence artificielle",
    ],
    toc: [
      { id: "cause-1", label: "1. Le pilote n'avait pas de propriétaire" },
      { id: "cause-2", label: "2. Le succès n'a jamais été défini" },
      { id: "cause-3", label: "3. La donnée n'était pas prête" },
      { id: "cause-4", label: "4. La conformité est arrivée trop tard" },
      { id: "cause-5", label: "5. L'outil n'a pas remplacé le geste" },
      { id: "cause-6", label: "6. Personne n'a assumé d'arrêter" },
      { id: "checklist", label: "La liste de contrôle avant de lancer" },
    ],
    html: `
<p>On cite volontiers des statistiques spectaculaires sur la proportion de projets d'IA qui n'atteignent jamais la production. Les chiffres varient selon les études et les définitions retenues ; le phénomène, lui, est incontestable et parfaitement observable sur le terrain. Ce qui frappe, c'est la répétitivité des causes.</p>

<h2 id="cause-1">1. Le pilote n'avait pas de propriétaire</h2>
<p>Un sponsor au comité de direction n'est pas un propriétaire. Le propriétaire est la personne dont le quotidien change si le projet réussit, et qui a l'autorité pour modifier une procédure. Sans elle, le projet reste une initiative de la DSI ou de l'innovation, et il meurt à la première réorganisation.</p>
<p><strong>Contre-mesure :</strong> désigner nommément un responsable métier, lui allouer du temps officiel — au moins une demi-journée par semaine — et faire du projet un objectif inscrit dans son évaluation.</p>

<h2 id="cause-2">2. Le succès n'a jamais été défini</h2>
<p>Interrogez trois participants d'un pilote sur ce qui constituerait une réussite : vous obtiendrez trois réponses différentes. Sans critère écrit, le projet ne peut ni être validé ni être arrêté. Il s'étire, puis s'éteint.</p>
<p><strong>Contre-mesure :</strong> une phrase, écrite avant le démarrage, contenant un chiffre et une date. « À la fin du mois de novembre, au moins douze des vingt utilisateurs pilotes utilisent l'outil trois fois par semaine et le temps moyen de production d'un devis est passé sous quarante minutes. » Cette phrase se relit en comité et se vérifie.</p>

<h2 id="cause-3">3. La donnée n'était pas prête</h2>
<p>C'est la cause la plus fréquente des dérapages de délai. Un assistant documentaire suppose des documents à jour, correctement nommés, sans quinze versions concurrentes du même contrat. Beaucoup de projets découvrent l'état réel du fonds documentaire en semaine six.</p>
<p><strong>Contre-mesure :</strong> auditer un échantillon de données <em>avant</em> l'engagement. Prendre cinquante documents au hasard, les faire évaluer par un expert métier : sont-ils à jour, complets, cohérents ? La réponse conditionne le calendrier et parfois la décision elle-même.</p>

<h2 id="cause-4">4. La conformité est arrivée trop tard</h2>
<p>Le scénario est classique : un pilote convaincant, une décision de généralisation, puis une revue juridique ou sécurité qui bloque tout parce que les données transitent par un service non validé, ou que l'analyse d'impact n'a pas été menée. Six mois de travail sont suspendus.</p>
<p><strong>Contre-mesure :</strong> associer le délégué à la protection des données et le responsable sécurité <em>dès le cadrage</em>, pas à la fin. Dans notre expérience, ils sont beaucoup plus constructifs quand ils sont consultés en amont que lorsqu'ils découvrent un projet abouti qu'on leur demande de valider en trois jours.</p>

<h2 id="cause-5">5. L'outil n'a pas remplacé le geste</h2>
<p>Tant que l'ancien mode opératoire reste possible et officiel, l'outil est une option. Or une option, en période de charge, n'est pas retenue : les gens font ce qu'ils savent faire vite. L'usage s'effondre dès la première période tendue.</p>
<p><strong>Contre-mesure :</strong> réécrire la procédure. Le nouveau geste doit devenir le geste normal, décrit dans le mode opératoire, présenté aux nouveaux arrivants, et intégré aux points d'équipe. Ce travail est peu spectaculaire et déterminant.</p>

<h2 id="cause-6">6. Personne n'a assumé d'arrêter</h2>
<p>Paradoxalement, l'incapacité à arrêter tue plus de projets qu'elle n'en sauve. Un pilote qui ne donne rien mais qu'on maintient consomme le budget, l'attention et la crédibilité nécessaires au cas d'usage suivant — qui, lui, aurait peut-être fonctionné.</p>
<p><strong>Contre-mesure :</strong> écrire le critère d'arrêt en même temps que le critère de succès, et le faire appliquer par le comité, pas par l'équipe projet — qui, elle, ne peut pas être juge et partie.</p>

<h2 id="checklist">La liste de contrôle avant de lancer</h2>
<p>Sept questions. Si vous ne pouvez pas répondre à l'une d'entre elles, il est trop tôt.</p>
<ol>
  <li>Qui est le propriétaire métier, nommément, et combien de temps y consacre-t-il ?</li>
  <li>Quelle phrase, avec un chiffre et une date, définit la réussite ?</li>
  <li>Quelle phrase définit l'arrêt ?</li>
  <li>Un échantillon de données a-t-il été audité par un expert métier ?</li>
  <li>Le délégué à la protection des données et la sécurité ont-ils validé le principe ?</li>
  <li>Quelle procédure existante sera réécrite ?</li>
  <li>Qui exploite l'outil et répond aux questions après la mise en service ?</li>
</ol>
<p>Aucune de ces questions ne porte sur le modèle, l'architecture ou le fournisseur. C'est précisément le point.</p>
`,
  },
  {
    slug: "ia-souveraine-hebergement-europeen",
    title: "IA souveraine, hébergement européen : comment décider sans idéologie",
    metaTitle: "IA souveraine ou fournisseurs américains : critères de décision",
    metaDescription:
      "Comparaison pragmatique des options : fournisseurs américains, éditeurs européens, modèles ouverts auto-hébergés. Critères juridiques, techniques et budgétaires.",
    excerpt:
      "La question n'est pas de savoir qui a le meilleur modèle, mais quelles données vous traitez, sous quelles contraintes, et à quel coût de réversibilité.",
    category: "Architecture",
    date: "2026-01-30",
    updated: "2026-06-22",
    readingTime: 9,
    keywords: [
      "IA souveraine",
      "hébergement européen IA",
      "modèles ouverts auto-hébergés",
      "cloud de confiance",
      "SecNumCloud IA",
      "transfert de données hors UE",
    ],
    toc: [
      { id: "vraie-question", label: "La vraie question à se poser" },
      { id: "options", label: "Les trois options réelles" },
      { id: "criteres", label: "Six critères de décision" },
      { id: "arbre", label: "Un arbre de décision simple" },
      { id: "reversibilite", label: "La réversibilité, actif sous-estimé" },
    ],
    html: `
<p>Le débat sur la souveraineté numérique est souvent conduit sur un registre qui n'aide pas les décideurs : soit un discours de méfiance générale, soit un haussement d'épaules. Il existe pourtant une manière parfaitement pragmatique de trancher, cas d'usage par cas d'usage.</p>

<h2 id="vraie-question">La vraie question à se poser</h2>
<p>Elle n'est pas « quel est le meilleur modèle ? », mais : <strong>quelles données ce cas d'usage fait-il sortir de mon système d'information, et quelles conséquences si elles étaient exposées ou soumises à une juridiction étrangère ?</strong></p>
<p>Formulée ainsi, la réponse devient différenciée. Un assistant qui reformule des fiches produits publiques n'appelle pas les mêmes précautions qu'un outil traitant des dossiers médicaux, des données RH nominatives ou des plans d'un contrat de défense.</p>

<h2 id="options">Les trois options réelles</h2>
<h3>Fournisseurs américains via leur offre entreprise</h3>
<p>Les modèles les plus performants, une intégration mature, un coût d'entrée faible et une facturation à l'usage. Les offres professionnelles excluent contractuellement l'entraînement sur vos données et proposent souvent un hébergement en région européenne. Subsiste la question des lois d'accès extraterritoriales, dont la portée réelle dépend fortement de votre secteur et de la sensibilité des données.</p>

<h3>Éditeurs européens</h3>
<p>Des modèles désormais très compétitifs sur la majorité des tâches professionnelles, un hébergement européen contractuellement clair, et pour certaines offres des niveaux de qualification adaptés aux exigences publiques. Léger écart persistant sur les tâches de raisonnement les plus complexes, sans conséquence pratique sur la plupart des cas d'usage d'entreprise.</p>

<h3>Modèles ouverts auto-hébergés</h3>
<p>Contrôle total : les données ne quittent jamais votre périmètre. En contrepartie, un coût d'infrastructure et de compétence réel, une charge d'exploitation permanente, et des performances inférieures aux meilleurs modèles propriétaires — largement suffisantes, toutefois, pour l'extraction, la classification, la synthèse et la recherche documentaire, qui constituent l'essentiel des besoins.</p>

<h2 id="criteres">Six critères de décision</h2>
<table>
  <thead><tr><th>Critère</th><th>Question</th></tr></thead>
  <tbody>
    <tr><td>Sensibilité des données</td><td>Données personnelles ? Secrets industriels ? Données de santé ? Informations classifiées ?</td></tr>
    <tr><td>Obligations sectorielles</td><td>Santé, défense, secteur public, opérateur d'importance vitale, exigences contractuelles de vos clients ?</td></tr>
    <tr><td>Exigence de performance</td><td>La tâche demande-t-elle réellement le meilleur modèle disponible ?</td></tr>
    <tr><td>Volume</td><td>À fort volume, l'auto-hébergement devient économiquement compétitif.</td></tr>
    <tr><td>Compétences internes</td><td>Avez-vous les moyens d'exploiter une infrastructure d'inférence dans la durée ?</td></tr>
    <tr><td>Perception</td><td>Vos clients, vos agents ou vos usagers accepteront-ils ce choix ?</td></tr>
  </tbody>
</table>

<h2 id="arbre">Un arbre de décision simple</h2>
<ol>
  <li><strong>Les données sont-elles publiques ou non sensibles ?</strong> Prenez le service le plus efficace, en veillant simplement aux conditions contractuelles d'usage des données.</li>
  <li><strong>Contiennent-elles des données personnelles ordinaires ?</strong> Offre entreprise avec hébergement européen, contrat de sous-traitance conforme, analyse d'impact menée. Un éditeur européen simplifie sensiblement le dossier.</li>
  <li><strong>Données sensibles, secrets industriels, obligations sectorielles fortes ?</strong> Éditeur européen qualifié, ou auto-hébergement selon le niveau d'exigence.</li>
  <li><strong>Contraintes réglementaires strictes ou volumes très élevés ?</strong> Auto-hébergement de modèles ouverts, avec le budget d'exploitation correspondant.</li>
</ol>
<p>Dans la pratique, une même organisation combine souvent deux options : un service externe pour les usages bureautiques courants, une infrastructure maîtrisée pour les traitements sensibles. C'est une architecture parfaitement normale, à condition que la règle de répartition soit écrite et connue des équipes.</p>

<h2 id="reversibilite">La réversibilité, actif sous-estimé</h2>
<p>Quelle que soit l'option retenue, une décision de conception vaut toutes les autres : <strong>ne jamais coupler votre application à un fournisseur unique</strong>. Concrètement, cela signifie isoler l'appel au modèle derrière une couche d'abstraction, conserver vos données et vos index dans un format standard, et tester périodiquement le fonctionnement avec un modèle alternatif.</p>
<p>Le coût de cette précaution est marginal au moment de la conception. Il devient prohibitif deux ans plus tard, quand un fournisseur double ses tarifs, retire un modèle sur lequel vos réglages étaient calibrés, ou modifie ses conditions d'usage des données. La souveraineté la plus utile au quotidien n'est pas géographique : c'est la capacité à changer d'avis.</p>
`,
  },
];

export const articles: Article[] = frTypo(rawArticles);

export function getArticle(slug: string): Article | undefined {
  return articles.find((a) => a.slug === slug);
}

export const articlesByDate = [...articles].sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);
