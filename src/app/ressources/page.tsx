import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Arrow, Breadcrumbs } from "@/components/ui";
import { articlesByDate } from "@/lib/content/articles";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Ressources : analyses et méthodes sur le déploiement de l'IA",
  description:
    "Articles de fond sur le déploiement de l'intelligence artificielle en entreprise : méthode, coûts, conformité AI Act, cas d'usage par fonction, souveraineté des données.",
  path: "/ressources",
  keywords: [
    "blog IA entreprise",
    "analyses déploiement IA",
    "guide intelligence artificielle PME",
    "ressources AI Act",
  ],
});

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function RessourcesPage() {
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Ressources", path: "/ressources" },
  ];
  const [featured, ...rest] = articlesByDate;

  const collection = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: "Ressources Agapante",
    url: `${siteConfig.url}/ressources`,
    hasPart: articlesByDate.map((a) => ({
      "@type": "Article",
      headline: a.title,
      url: `${siteConfig.url}/ressources/${a.slug}`,
      datePublished: a.date,
    })),
  };

  return (
    <>
      <JsonLd data={[breadcrumbJsonLd(crumbs), collection]} />

      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="container-x relative z-10 pb-16 pt-16 lg:pb-20 lg:pt-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6">Ressources</p>
            <h1 className="display max-w-[17ch] text-[clamp(2.5rem,6vw,4.6rem)] text-chalk">
              Ce que nous avons appris, écrit noir sur blanc
            </h1>
            <p className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-mute">
              Des analyses opérationnelles, sans jargon ni promesse abusive. C&apos;est aussi la
              meilleure façon de savoir, avant de nous appeler, si notre manière de penser vous
              convient.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-16">
        <div className="container-x">
          <Reveal>
            <Link
              href={`/ressources/${featured.slug}`}
              className="group surface-card block overflow-hidden p-8 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03] lg:p-14"
            >
              <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:gap-16">
                <div>
                  <div className="flex flex-wrap items-center gap-3 text-[0.72rem] uppercase tracking-[0.13em] text-mute-dim">
                    <span className="rounded-full border border-iris-400/40 bg-iris-400/10 px-3 py-1 text-iris-300">
                      À la une
                    </span>
                    <span>{featured.category}</span>
                    <span>·</span>
                    <span>{featured.readingTime} min de lecture</span>
                  </div>
                  <h2 className="display mt-6 text-[clamp(1.9rem,4vw,3.1rem)] text-chalk">
                    {featured.title}
                  </h2>
                  <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-mute">
                    {featured.excerpt}
                  </p>
                  <span className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-medium text-chalk">
                    Lire l&apos;article
                    <Arrow />
                  </span>
                </div>

                <div className="lg:pt-3">
                  <p className="eyebrow mb-4">Au sommaire</p>
                  <ul className="flex flex-col gap-2">
                    {featured.toc.slice(0, 6).map((t) => (
                      <li key={t.id} className="flex items-start gap-2.5 text-[0.88rem] text-mute">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-iris-500" />
                        {t.label}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Link>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((article, i) => (
            <Reveal key={article.slug} delay={i * 70}>
              <Link
                href={`/ressources/${article.slug}`}
                className="group surface-card flex h-full flex-col p-7 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03]"
              >
                <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.13em] text-mute-dim">
                  <span className="text-iris-400">{article.category}</span>
                  <span>·</span>
                  <span>{article.readingTime} min</span>
                </div>
                <h2 className="mt-5 text-[1.18rem] font-medium leading-snug text-chalk">
                  {article.title}
                </h2>
                <p className="mt-3.5 flex-1 text-[0.92rem] leading-relaxed text-mute">
                  {article.excerpt}
                </p>
                <div className="mt-6 flex items-center justify-between border-t border-ink-800 pt-4">
                  <time
                    dateTime={article.date}
                    className="text-[0.78rem] text-mute-dim"
                  >
                    {formatDate(article.date)}
                  </time>
                  <Arrow className="text-chalk-dim" />
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand
        title="Une question que nos articles ne traitent pas ?"
        text="Écrivez-la nous. Si elle revient souvent, elle deviendra probablement le prochain article — et en attendant, vous aurez une réponse."
      />
    </>
  );
}
