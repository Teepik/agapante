# Agapante

Site vitrine du cabinet de conseil **Agapante** — déploiement de l'intelligence artificielle
en TPE, PME, ETI et administrations. Formulaire de contact et back-office de suivi des demandes
inclus.

## Stack

| Élément | Choix |
| --- | --- |
| Framework | Next.js 15 (App Router, React 19, Server Actions) |
| Langage | TypeScript strict |
| Styles | Tailwind CSS v4 (configuration CSS-first) |
| Base de données | PostgreSQL via `@neondatabase/serverless` |
| Polices | Inter + Instrument Serif, auto-hébergées (aucune requête tierce) |
| Hébergement | Vercel |

Aucun cookie tiers, aucun traceur, aucune dépendance analytique.

## Configuration

Copier `.env.example` vers `.env.local` et renseigner les variables.

| Variable | Rôle | Obligatoire |
| --- | --- | --- |
| `DATABASE_URL` | Connexion PostgreSQL (Neon). Injectée automatiquement par l'intégration Vercel Storage. | Oui |
| `ADMIN_PASSWORD` | Mot de passe d'accès à `/admin`. | Oui |
| `SESSION_SECRET` | Clé de signature du cookie de session et de hachage des IP. | Recommandé |
| `NEXT_PUBLIC_SITE_URL` | URL publique canonique (sans slash final). | Recommandé |
| `RESEND_API_KEY`, `NOTIFICATION_EMAIL` | Notification e-mail à chaque nouvelle demande. | Non |

Le schéma de la table `leads` est créé automatiquement au premier accès (`CREATE TABLE IF NOT
EXISTS`) : aucune migration à lancer.

## Développement

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # build de production
npm run typecheck  # vérification TypeScript
```

## Structure

```
src/
├── app/
│   ├── page.tsx                     Accueil
│   ├── expertises/[slug]/           3 pages d'offre
│   ├── secteurs/[slug]/             4 pages par type d'organisation
│   ├── ressources/[slug]/           Articles de fond
│   ├── methode/ a-propos/ contact/  Pages éditoriales
│   ├── admin/                       Back-office protégé par mot de passe
│   ├── og/                          Images Open Graph générées à la volée
│   ├── sitemap.ts robots.ts rss.xml/
├── components/                      UI partagée
└── lib/
    ├── content/                     Tout le contenu éditorial (TypeScript typé)
    ├── db.ts auth.ts notify.ts      Données, session admin, notifications
    ├── seo.ts                       Métadonnées et JSON-LD
    └── typo.ts                      Typographie française (espaces fines)
```

## Modifier le contenu

Tout le texte du site vit dans `src/lib/content/` :

- `expertises.ts` — les trois offres ;
- `secteurs.ts` — TPE, PME, ETI, administrations ;
- `articles.ts` — les articles de la rubrique Ressources ;
- `general.ts` — FAQ, méthode, principes, engagements, chiffres clés ;
- `../site.ts` — coordonnées, navigation, mentions.

Les mentions `[À COMPLÉTER]` (e-mail, téléphone, SIRET, etc.) sont volontairement visibles :
elles se trouvent dans `src/lib/site.ts`, `src/app/mentions-legales/page.tsx` et
`src/app/a-propos/page.tsx`.

## Back-office

`/admin` — connexion par mot de passe, session signée valable 12 h.

- liste des demandes avec filtres par statut et recherche plein texte ;
- fiche détaillée : statut, notes internes, réponse en un clic, suppression RGPD ;
- export CSV de l'ensemble des demandes.

## SEO

Métadonnées et canonicals par page, sitemap et robots générés, flux RSS, images Open Graph
dynamiques, et données structurées JSON-LD : `ProfessionalService`, `WebSite`, `Service`,
`FAQPage`, `Article`, `BreadcrumbList`, `CollectionPage`.
