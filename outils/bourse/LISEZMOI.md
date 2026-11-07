# /bourse

Outil personnel (accès : mot de passe d'administration d'Agapante) : atlas financier par pays, classement d'un millier
d'actions par style, gagnants et perdants des ruptures, portefeuilles fictifs avec mesure de la diversification,
simulateur rendement/risque et constructeur de portefeuille.

## Données

- **Collecte** : `src/app/bourse/api/collecte/route.ts`, appelée chaque jour par Vercel Cron (`vercel.json`).
  Chaque passage relève pendant une quarantaine de secondes les titres les plus anciens sur Yahoo Finance
  (bibliothèque `yahoo-finance2`, aucune IA) : fiche (valorisation, comptes, prévisions des analystes) et cours
  hebdomadaires sur cinq ans (depuis 2005 pour les indices et les devises). Puis il recalcule notes, catégories,
  pièges, thèmes, rendements attendus et rendements hebdomadaires en euros (`src/lib/bourse/traitement.ts`).
- **Univers** : `src/lib/bourse/univers.json` (indices américains et européens) et `src/lib/bourse/config.ts`
  (ETF, indices de référence, devises, tables de thèmes).
- **Base Neon** : table `bourse_titres` (relevé brut par titre) et table `bourse_donnees` (données calculées
  `actions`, `rets`, `statut`, et l'espace personnel `etat:*` : suivi, alertes, journal, portefeuilles, réglages).
- **Atlas par pays** : `src/lib/bourse/atlas.json` et `monde.json` (fond de carte).

Appels manuels (session d'administration ouverte, ou déploiement de prévisualisation) :

- `/bourse/api/collecte` : un passage de collecte et de recalcul ;
- `/bourse/api/collecte?etat=1` : état de la collecte et dernières erreurs ;
- `/bourse/api/collecte?relever=0` : recalcul seul.

## Interface

Sources dans `outils/bourse/web/` (JavaScript sans dépendance hors d3 et topojson-client). Après modification :

```
node outils/bourse/web/assembler.mjs
```

Le script produit `src/lib/bourse/appli.generated.ts`, page autonome servie par `src/app/bourse/route.ts`.
