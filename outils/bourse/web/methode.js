/* ================= Méthode et sources ================= */
function renderMethode(){
  const src = [
    ["Siblis Research — CAPE par pays, 28 marchés", "30 sept. 2026", "https://siblisresearch.com/data/cape-ratios-by-country/"],
    ["Siblis Research — rendement du dividende par pays", "30 juin 2026", "https://siblisresearch.com/data/global-dividend-yields/"],
    ["World PE Ratio — PER, écarts à l'historique et tendance, 41 marchés", "6 nov. 2026", "https://worldperatio.com/"],
    ["Aswath Damodaran — notes Moody's, primes de risque pays et actions", "5 janv. 2026", "https://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/ctryprem.html"],
    ["Trading Economics — taux d'État à 10 ans", "5-6 nov. 2026", "https://tradingeconomics.com/bonds"],
    ["Trading Economics — inflation par pays", "sept.-oct. 2026", "https://tradingeconomics.com/country-list/inflation-rate"],
    ["Trading Economics — taux directeurs", "oct.-nov. 2026", "https://tradingeconomics.com/country-list/interest-rate"],
    ["Trading Economics — courbe des OAT (et pages Allemagne, Italie, Espagne, États-Unis)", "6 nov. 2026", "https://tradingeconomics.com/france/government-bond-yield"],
    ["BCE — cours de référence de l'euro, historique depuis 1999", "30 oct. 2026", "https://www.ecb.europa.eu/stats/policy_and_exchange_rates/euro_reference_exchange_rates/html/index.en.html"],
    ["FRED — ICE BofA Euro High Yield, rendement effectif", "4 nov. 2026", "https://fred.stlouisfed.org/series/BAMLHE00EHYIEY"],
    ["FRED — ICE BofA Euro High Yield, écart ajusté", "4 nov. 2026", "https://fred.stlouisfed.org/series/BAMLHE00EHYIOAS"],
    ["BlackRock — iShares € Corp Bond, rendement et durée", "5 nov. 2026", "https://www.blackrock.com/uk/individual/products/251726/ishares-euro-corporate-bond-ucits-etf"],
    ["Weblex — barème de l'impôt sur le revenu 2026", "23 févr. 2026", "https://www.weblex.fr/chiffres-cles/bareme-de-l-impot-sur-le-revenu-2026-applique-aux-revenus-2025"],
    ["Indy — prélèvement forfaitaire en 2027, état des votes", "2 nov. 2026", "https://www.indy.fr/guide/fiscalite/gestion-financiere/flat-tax-2027/"],
    ["DB France Invest — décision de la BCE du 29 octobre 2026", "nov. 2026", "https://www.dbfranceinvest.com/taux-credit-immobilier-novembre-2026/"],
    ["Reuters via Easybourse — Moody's maintient la note de la France", "24 oct. 2026", "https://www.easybourse.com/international/news/1540095/moodys-maintient-note-souveraine-france-aa3.html"],
    ["Commerzbank — valeurs quotidiennes de l'€STR", "5 oct. 2026", "https://www.commerzbank.de/ms/documents/de-DE/einzelwertberechnung-august-september-2026.pdf"],
    ["Projet Patrimoine — panorama des placements 2026 (fonds euros, livrets, SCPI, crowdfunding, prévisions des gérants)", "18 oct. 2026", null],
    ["Projet Patrimoine — hypothèses d'inflation et de crédit", "19 oct. 2026", null]
  ];
  $("#methode").innerHTML = `
    <h2>Ce que mesure l'atlas</h2>
    <p>L'atlas réunit pour ${U.length} marchés investissables depuis la France les indicateurs qui annoncent le mieux les rendements des dix années suivantes : la valorisation des actions, le taux réel des obligations d'État et la tenue de la devise contre l'euro. ${Object.keys(P).length - U.length} autres pays figurent sur la carte pour leur inflation, leur taux directeur et leur note.</p>
    <h3>Actions</h3>
    <ul>
      <li><b>Rendement réel attendu = 1 / CAPE.</b> Le CAPE divise le cours par la moyenne des bénéfices des dix dernières années, corrigés de l'inflation. Son inverse donne un ordre de grandeur du rendement annuel au-delà de l'inflation sur dix ans.</li>
      <li><b>Cherté face à l'histoire</b> : écart du PER à sa moyenne sur 5, 10 et 20 ans, en écarts-types (World PE Ratio, à partir des ETF iShares pays).</li>
      <li><b>Tendance</b> : distance du cours à sa moyenne des 200 derniers jours.</li>
      <li><b>Score actions</b> : rang centile parmi les ${U.length} marchés sur quatre critères — rendement bénéficiaire (1 / CAPE, sinon 1 / PER) 35 %, PER face à 10 ans 35 %, tendance 15 %, prime de risque pays 15 %.</li>
    </ul>
    <h3>Obligations et devises</h3>
    <ul>
      <li><b>Taux réel</b> = taux d'État à 10 ans moins l'inflation sur un an.</li>
      <li><b>Taux en euros après devise</b> = (1 + taux) × (1 + variation annuelle de la devise contre l'euro sur 10 ans) − 1. Le calcul alternatif par la parité des pouvoirs d'achat figure dans chaque fiche.</li>
      <li><b>Score obligations</b> : taux réel 35 %, taux en euros après devise 35 %, note Moody's 20 %, stabilité de la devise 10 %.</li>
      <li>Les variations de devise viennent des cours de fin de mois de la BCE ; trois devises ancrées au dollar (riyal saoudien, dirham, riyal qatari) reprennent le cours du dollar.</li>
    </ul>
    <h3>Points de vigilance</h3>
    <p>Une règle explicite déclenche chaque mention : taux d'au moins 7 % ramené à moins d'un point au-dessus du Bund une fois la devise déduite ; inflation supérieure au taux à 10 ans ; note Ba1 ou moins ; inflation à deux chiffres ; PER à plus de 2 écarts-types au-dessus de sa moyenne 10 ans ; CAPE de 30 ou plus ; cours 15 % sous sa moyenne 200 jours. Un pays est hachuré sur la carte dès une mention rouge ou deux mentions orange.</p>
    <h2>Sélection d'actions</h2>
    <ul>
      <li><b>Univers</b> : ${B.etat === "pret" ? nf0.format(B.A.length) + " sociétés et " + nf0.format(B.E.length) + " ETF" : "près de 5 000 sociétés et 3 000 ETF"}. Actions : grands indices américains et européens, complétés par les grandes et moyennes capitalisations des États-Unis, du Japon, du Canada et de l'Australie, les petites et moyennes valeurs des places européennes et les grandes sociétés étrangères cotées à New York (liste tirée de FinanceDatabase, base ouverte). ETF : fonds UCITS cotés à Paris, Francfort, Amsterdam et Milan, hors produits à effet de levier, à découvert ou sur cryptomonnaies ; une seule part par fonds. Cours hebdomadaires sur cinq ans, ajustés des dividendes, convertis en euros ; comptes, prévisions et consensus des analystes de Yahoo Finance. Une tâche planifiée d'Agapante passe six fois par jour et relève les titres les plus anciens (cours à chaque passage, comptes une fois par semaine) ; les petits ETF et les petites sociétés sont relus moins souvent.</li>
      <li><b>ETF et obligations</b> : catégorie, zone, durée ou échéance et couverture de change déduites du nom et de la catégorie du fonds. Rendement réel attendu, net de frais : pour les actions, 1 / CAPE de la zone couverte, corrigé du style (value +0,7 point, petites valeurs +0,8, faible volatilité −0,4, qualité −0,2, dividendes +0,3, thèmes −1) ; pour les obligations, taux actuel de la courbe d'État de la zone à la durée du fonds, plus la prime des entreprises de qualité, moins les défauts attendus (haut rendement), puis la couverture de change ou la tendance de la devise ; pour l'or, l'inflation plus 0,5 point. Un ETF obligataire à échéance conservé jusqu'au terme rend à peu près son taux actuel.</li>
      <li><b>Notes de style</b> (0 à 100, rang centile) : Value, Croissance, Qualité, Momentum, Défensive, Rendement, Petites valeurs. Pour la valorisation et la qualité, la moitié de la note vient du rang dans tout l'univers, l'autre moitié du rang dans le secteur, pour comparer une banque à des banques. Le détail des critères s'affiche au survol de chaque note.</li>
      <li><b>Catégories</b> : croissance à prix raisonnable (value et croissance d'au moins 65 et 60), qualité et croissance (70 et 65), redressement (value d'au moins 70, cours qui repart sur trois mois après une année de baisse, prévisions en hausse), sinon le style le mieux noté s'il atteint 60, sinon profil équilibré.</li>
      <li><b>Pièges</b> : value piège (très bon marché, mais chiffre d'affaires en baisse et cours ou prévisions qui reculent), croissance payée cher (PER prévisionnel au-delà de 45), dividende fragile (plus de 6 % non couvert par le bénéfice ou le flux de trésorerie), dette lourde (plus de 4 fois l'excédent brut d'exploitation), peu liquide (moins d'un million d'euros échangés par jour).</li>
      <li><b>Rendement réel attendu par titre</b> : rendement bénéficiaire (1 / PER prévisionnel) corrigé d'un quart de l'écart entre sa croissance attendue et la médiane, puis ramené à mi-chemin du rendement attendu de son marché (1 / CAPE). Le rétrécissement vers le marché limite le poids des prévisions d'analystes, souvent trop optimistes ; la fourchette retenue va de −1 à 12 %.</li>
      <li><b>Ruptures</b> : six thèmes (IA, robotique, défense, électricité, dépendance à la Chine, droits de douane). Le classement part de l'industrie de chaque société, complété société par société ; le marché le confirme quand les prévisions de bénéfices montent de plus de 2 % en trois mois et que le cours devance son secteur de plus de 10 points sur un an.</li>
    </ul>
    <h2>Portefeuille fictif</h2>
    <ul>
      <li><b>Covariances</b> : rendements hebdomadaires en euros des cinq dernières années (fenêtre commune à toutes les lignes), resserrés vers une corrélation constante selon Ledoit et Wolf (2004) ; cette correction stabilise les résultats quand les lignes sont nombreuses.</li>
      <li><b>Paris indépendants</b> = carré du ratio de diversification (somme des volatilités pondérées divisée par la volatilité du portefeuille). Dix lignes indépendantes de même poids en donnent dix ; vingt actions corrélées à 0,25 en moyenne en donnent un peu plus de trois. La part du facteur dominant mesure le risque porté par la première composante principale.</li>
      <li><b>Part du risque</b> de chaque ligne : contribution d'Euler, poids × covariance avec le portefeuille ÷ variance. Une ligne dont la part du risque dépasse nettement le poids concentre le risque.</li>
      <li><b>Simulation</b> : 3 000 trajectoires obtenues en tirant au hasard des blocs de huit semaines consécutives dans l'historique (les crises et les rebonds gardent leur enchaînement), puis recalées pour que le rendement moyen égale le rendement réel attendu. Résultats en euros d'aujourd'hui, avant impôt.</li>
      <li><b>Optimisations</b> : volatilité minimale et diversification maximale sans vente à découvert, 25 % au plus par ligne ; risques égaux : chaque ligne apporte la même part de risque. Elles s'appuient sur le passé récent.</li>
      <li><b>Épreuves</b> : 2022 rejouée avec les cours réels quand l'historique le couvre ; 2008 et 2020 estimées par le bêta de chaque action face au marché mondial et l'écart de son secteur (indices sectoriels américains), et par l'ordre de grandeur des indices pour les obligations, le monétaire et l'or.</li>
    </ul>
    <h2>Constructeur</h2>
    <ul>
      <li>Le niveau de risque fixe une volatilité visée (3 à 19 % par an). L'horizon plafonne la part des actions (10 % à un an, 55 % à cinq ans, 100 % au-delà de neuf ans). La part défensive se répartit selon l'horizon entre monétaire, emprunts d'État et obligations d'entreprises ; l'or reçoit 4 à 7 %.</li>
      <li>Chaque liste propose les meilleurs candidats selon vos réglages et coche le nombre conseillé : pour les actions, environ une ligne par tranche de 2 500 € (8 à 25 lignes), en respectant au plus un quart des lignes par secteur, 40 % par pays et aucune paire corrélée au-delà de 0,8.</li>
      <li>Une fois les lignes choisies, la part des actions est recalculée pour que la volatilité du portefeuille complet atteigne la cible, avec les covariances réelles des lignes retenues.</li>
    </ul>
    <h2>Comparateur net</h2>
    <ul>
      <li><b>Impôt</b> : barème 2026 (0 % jusqu'à 11 600 € par part, 11 %, 30 %, 41 %, 45 %), plafond du quotient familial de 1 807 € par demi-part, décote de 1 483 € pour un couple. Le gain est imposé au forfait (12,8 %) ou au barème avec 6,8 % de CSG déductible, selon ce qui coûte le moins ; en pratique l'option pour le barème vaut pour tous les revenus du capital de l'année.</li>
      <li><b>Prélèvements sociaux</b> : 18,6 % en compte-titres et en PEA, 17,2 % en assurance-vie, prélevés chaque année sur les fonds euros.</li>
      <li><b>PEA</b> : après 5 ans, seuls les prélèvements sociaux s'appliquent ; un retrait avant 5 ans clôture le plan. <b>Assurance-vie</b> : après 8 ans, abattement de 9 200 € pour un couple puis 7,5 % (12,8 % sur les versements au-delà de 150 000 €).</li>
      <li><b>Rendements attendus</b> : taux à l'échéance moins défauts attendus pour les obligations ; 1 / CAPE plus inflation, ou consensus des gérants, pour les actions ; taux en vigueur pour les livrets et les fonds euros.</li>
      <li><b>Risque</b> : la probabilité de perte et la fourchette 90 % suivent une loi lognormale calée sur la volatilité annuelle de chaque classe ; pour un fonds obligataire, la dispersion est bornée par sa durée, car les coupons réinvestis compensent les variations de prix au bout de ce délai. La pire baisse passée rappelle ce que le modèle lisse.</li>
      <li><b>Inflation</b> : quatre chemins repris des hypothèses de Z-Pilote, appliqués année par année pour exprimer les résultats en euros d'aujourd'hui.</li>
    </ul>
    <h2>Limites</h2>
    <ul>
      <li>Les données forment une photographie du 6 novembre 2026 ; les cours de devises s'arrêtent au 30 octobre.</li>
      <li>Les notes Moody's datent de janvier 2026 (Damodaran), sauf la France, vérifiée au 23 octobre.</li>
      <li>Les pondérations des ETF Monde, Europe et Émergents sont arrondies d'après les fiches MSCI ; les marchés sans CAPE publié prennent le CAPE médian.</li>
      <li>Le revenu fiscal de référence du LEP est approché par le revenu net imposable ; la fiscalité des SCPI européennes est une estimation.</li>
      <li>L'atlas décrit et calcule ; la décision vous appartient. Un conseiller en investissements financiers peut valider montants et répartition au vu de vos revenus et de votre patrimoine exacts.</li>
    </ul>
    <h2>Mise à jour</h2>
    <p>Les données de marché des actions et des ETF se mettent à jour seules chaque jour. Pour actualiser les indicateurs par pays de l'atlas, demandez à Claude de mettre à jour l'Atlas financier : il relit les sources ci-dessous, reconstruit le fichier de données de l'atlas dans Agapante et propose la mise à jour en relecture. Liste de suivi, alertes, journal et portefeuilles restent en place et se réévaluent sur les nouvelles valeurs.</p>
    <h2>Sources</h2>
    <ul class="src">${src.map(s => `<li>${s[2] ? `<a href="${s[2]}" target="_blank" rel="noopener">${esc(s[0])}</a>` : esc(s[0])} <span class="note">· ${esc(s[1])}</span></li>`).join("")}</ul>`;
}
