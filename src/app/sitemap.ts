import type { MetadataRoute } from "next";
import { articles } from "@/lib/content/articles";
import { expertises } from "@/lib/content/expertises";
import { secteurs } from "@/lib/content/secteurs";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "monthly", priority: 1 },
    { url: `${base}/expertises`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/secteurs`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${base}/methode`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${base}/ressources`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${base}/a-propos`, lastModified: now, changeFrequency: "yearly", priority: 0.6 },
    { url: `${base}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.9 },
    { url: `${base}/plan-du-site`, lastModified: now, changeFrequency: "monthly", priority: 0.3 },
    { url: `${base}/mentions-legales`, lastModified: now, changeFrequency: "yearly", priority: 0.2 },
    {
      url: `${base}/politique-de-confidentialite`,
      lastModified: now,
      changeFrequency: "yearly",
      priority: 0.2,
    },
  ];

  const expertisePages: MetadataRoute.Sitemap = expertises.map((e) => ({
    url: `${base}/expertises/${e.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const secteurPages: MetadataRoute.Sitemap = secteurs.map((s) => ({
    url: `${base}/secteurs/${s.slug}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${base}/ressources/${a.slug}`,
    lastModified: new Date(a.updated ?? a.date),
    changeFrequency: "yearly",
    priority: 0.7,
  }));

  return [...staticPages, ...expertisePages, ...secteurPages, ...articlePages];
}
