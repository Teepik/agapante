export const siteConfig = {
  name: "Agapante",
  legalName: "Agapante — [RAISON SOCIALE À COMPLÉTER]",
  domain: "agapante.fr",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://agapante.vercel.app",
  tagline: "Cabinet de conseil en déploiement de l'IA en entreprise",
  shortDescription:
    "Agapante accompagne les TPE, PME, ETI et administrations dans le déploiement concret de l'intelligence artificielle : cadrage, conduite du changement et MVP clés en main.",
  description:
    "Agapante est un cabinet de conseil indépendant spécialisé dans le déploiement de l'intelligence artificielle en entreprise. Nous aidons les TPE, PME, ETI et organisations publiques à passer des expérimentations aux usages réellement adoptés : diagnostic, feuille de route, cadre de conformité (RGPD, AI Act), formation des équipes et développement de MVP clés en main.",
  locale: "fr_FR",
  lang: "fr",
  contact: {
    email: "[EMAIL À COMPLÉTER]",
    phone: "[TÉLÉPHONE À COMPLÉTER]",
    city: "[VILLE À COMPLÉTER]",
    region: "France",
    country: "FR",
    areaServed: "France entière — à distance et sur site",
    availability: "Réponse sous 24 h ouvrées",
  },
  social: {
    linkedin: "[URL LINKEDIN À COMPLÉTER]",
  },
  founder: "[PRÉNOM NOM À COMPLÉTER]",
} as const;

export type NavItem = {
  label: string;
  href: string;
  description?: string;
  children?: NavItem[];
};

export const mainNav: NavItem[] = [
  {
    label: "Expertises",
    href: "/expertises",
    children: [
      {
        label: "Conseil & stratégie IA",
        href: "/expertises/conseil-strategie-ia",
        description: "Diagnostic, cas d'usage priorisés, feuille de route chiffrée.",
      },
      {
        label: "Accompagnement au déploiement",
        href: "/expertises/accompagnement-deploiement-ia",
        description: "Pilotage, conduite du changement, montée en compétence.",
      },
      {
        label: "MVP IA clés en main",
        href: "/expertises/mvp-ia-cle-en-main",
        description: "Un produit fonctionnel en production en 6 à 10 semaines.",
      },
    ],
  },
  {
    label: "Secteurs",
    href: "/secteurs",
    children: [
      { label: "TPE", href: "/secteurs/tpe", description: "Moins de 20 salariés." },
      { label: "PME", href: "/secteurs/pme", description: "De 20 à 250 salariés." },
      { label: "ETI", href: "/secteurs/eti", description: "De 250 à 5 000 salariés." },
      {
        label: "Secteur public",
        href: "/secteurs/administrations",
        description: "Collectivités, établissements publics, opérateurs de l'État.",
      },
    ],
  },
  { label: "Méthode", href: "/methode" },
  { label: "Ressources", href: "/ressources" },
  { label: "À propos", href: "/a-propos" },
];

export const footerNav = [
  {
    title: "Expertises",
    links: [
      { label: "Conseil & stratégie IA", href: "/expertises/conseil-strategie-ia" },
      { label: "Accompagnement au déploiement", href: "/expertises/accompagnement-deploiement-ia" },
      { label: "MVP IA clés en main", href: "/expertises/mvp-ia-cle-en-main" },
      { label: "Toutes les expertises", href: "/expertises" },
    ],
  },
  {
    title: "Secteurs",
    links: [
      { label: "TPE", href: "/secteurs/tpe" },
      { label: "PME", href: "/secteurs/pme" },
      { label: "ETI", href: "/secteurs/eti" },
      { label: "Administrations", href: "/secteurs/administrations" },
    ],
  },
  {
    title: "Cabinet",
    links: [
      { label: "Notre méthode", href: "/methode" },
      { label: "À propos", href: "/a-propos" },
      { label: "Ressources", href: "/ressources" },
      { label: "Contact", href: "/contact" },
    ],
  },
  {
    title: "Informations",
    links: [
      { label: "Mentions légales", href: "/mentions-legales" },
      { label: "Confidentialité", href: "/politique-de-confidentialite" },
      { label: "Plan du site", href: "/plan-du-site" },
      { label: "Espace client", href: "/admin" },
    ],
  },
] as const;
