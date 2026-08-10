import type { Metadata } from "next";
import { siteConfig } from "./site";

type BuildMetaArgs = {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
  publishedTime,
  modifiedTime,
  noIndex,
}: BuildMetaArgs): Metadata {
  const url = `${siteConfig.url}${path === "/" ? "" : path}`;
  const ogUrl = `/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      type,
      url,
      siteName: siteConfig.name,
      title,
      description,
      locale: siteConfig.locale,
      images: [{ url: ogUrl, width: 1200, height: 630, alt: title }],
      ...(publishedTime ? { publishedTime } : {}),
      ...(modifiedTime ? { modifiedTime } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl],
    },
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "@id": `${siteConfig.url}/#organization`,
    name: siteConfig.name,
    alternateName: siteConfig.legalName,
    url: siteConfig.url,
    description: siteConfig.description,
    slogan: siteConfig.tagline,
    email: siteConfig.contact.email,
    telephone: siteConfig.contact.phone,
    priceRange: "$$$",
    knowsLanguage: ["fr-FR"],
    address: {
      "@type": "PostalAddress",
      addressLocality: siteConfig.contact.city,
      addressCountry: siteConfig.contact.country,
    },
    areaServed: {
      "@type": "Country",
      name: "France",
    },
    serviceType: [
      "Conseil en intelligence artificielle",
      "Accompagnement au déploiement de l'IA",
      "Développement de MVP IA",
      "Formation à l'intelligence artificielle",
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Prestations Agapante",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Conseil et stratégie IA",
            url: `${siteConfig.url}/expertises/conseil-strategie-ia`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Accompagnement au déploiement de l'IA",
            url: `${siteConfig.url}/expertises/accompagnement-deploiement-ia`,
          },
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "MVP IA clés en main",
            url: `${siteConfig.url}/expertises/mvp-ia-cle-en-main`,
          },
        },
      ],
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${siteConfig.url}/#website`,
    url: siteConfig.url,
    name: siteConfig.name,
    description: siteConfig.shortDescription,
    inLanguage: "fr-FR",
    publisher: { "@id": `${siteConfig.url}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.path === "/" ? "" : item.path}`,
    })),
  };
}

export function faqJsonLd(faq: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
}

export function serviceJsonLd(args: {
  name: string;
  description: string;
  path: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: args.name,
    description: args.description,
    url: `${siteConfig.url}${args.path}`,
    provider: { "@id": `${siteConfig.url}/#organization` },
    areaServed: { "@type": "Country", name: "France" },
    audience: {
      "@type": "BusinessAudience",
      name: "TPE, PME, ETI et organisations publiques",
    },
  };
}

export function articleJsonLd(args: {
  title: string;
  description: string;
  path: string;
  date: string;
  updated?: string;
  keywords: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.title,
    description: args.description,
    url: `${siteConfig.url}${args.path}`,
    mainEntityOfPage: `${siteConfig.url}${args.path}`,
    datePublished: args.date,
    dateModified: args.updated ?? args.date,
    inLanguage: "fr-FR",
    keywords: args.keywords.join(", "),
    author: { "@id": `${siteConfig.url}/#organization` },
    publisher: { "@id": `${siteConfig.url}/#organization` },
    image: `${siteConfig.url}/og?title=${encodeURIComponent(args.title)}`,
  };
}
