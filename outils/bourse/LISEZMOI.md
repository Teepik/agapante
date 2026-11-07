# Collecte de agapante.com/bourse

Chaque samedi à 3 h 17 (UTC), GitHub Actions exécute trois scripts, sans aucune IA :

1. `collecte.py` relève sur Yahoo Finance (bibliothèque yfinance, accès officieux) les cours hebdomadaires sur 5 ans,
   les comptes et les prévisions des analystes d'environ 1 100 actions (S&P 500 et grandes valeurs européennes),
   d'une trentaine d'ETF, d'indices de référence depuis 2005 et des devises.
2. `traitement.py` calcule les rendements en euros, les notes de style (value, croissance, qualité, momentum,
   défensive, rendement, taille), les catégories, les pièges, l'exposition aux ruptures et le rendement attendu de chaque titre.
3. `enregistrer.py` range le résultat dans la base Neon du site (table `bourse_donnees`).

Le dépôt est public : aucune donnée de marché n'y est versionnée. Le secret GitHub `DATABASE_URL`
(même valeur que sur Vercel) est nécessaire à l'enregistrement.

`config.json` fixe l'univers ; `limit` à 0 lance la collecte complète. Sur une branche d'essai, les données
sont chiffrées avec `cle_essai_publique.pem` avant d'être poussées sur la branche `bourse-essai`.
