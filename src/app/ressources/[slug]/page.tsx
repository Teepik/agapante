import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Arrow, Breadcrumbs } from "@/components/ui";
import { articles, articlesByDate, getArticle } from "@/lib/content/articles";
import { articleJsonLd, breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.metaTitle,
    description: article.metaDescription,
    path: `/ressources/${article.slug}`,
    keywords: article.keywords,
    type: "article",
    publishedTime: article.date,
    modifiedTime: article.updated ?? article.date,
  });
}

function formatDate(value: string) {
  return new Date(value).toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArticlePage({ params }: Params) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const related = articlesByDate.filter((a) => a.slug !== article.slug).slice(0, 3);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Ressources", path: "/ressources" },
    { name: article.title, path: `/ressources/${article.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          articleJsonLd({
            title: article.title,
            description: article.metaDescription,
            path: `/ressources/${article.slug}`,
            date: article.date,
            updated: article.updated,
            keywords: article.keywords,
          }),
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="container-x relative z-10 pb-14 pt-16 lg:pt-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <div className="flex flex-wrap items-center gap-3 text-[0.74rem] uppercase tracking-[0.13em] text-mute-dim">
              <span className="text-iris-400">{article.category}</span>
              <span>·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span>·</span>
              <span>{article.readingTime} min de lecture</span>
            </div>
            <h1 className="display mt-7 max-w-[20ch] text-[clamp(2.2rem,5.4vw,4.2rem)] text-chalk">
              {article.title}
            </h1>
            <p className="mt-7 max-w-2xl text-[1.12rem] leading-relaxed text-mute">
              {article.excerpt}
            </p>
            {article.updated ? (
              <p className="mt-6 text-[0.8rem] text-mute-dim">
                Mis à jour le {formatDate(article.updated)}
              </p>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-16 lg:py-24">
        <div className="container-x grid gap-14 lg:grid-cols-[16rem_1fr] lg:gap-20">
          <aside className="lg:sticky lg:top-28 lg:self-start">
            <p className="eyebrow mb-5">Sommaire</p>
            <nav aria-label="Sommaire de l'article">
              <ol className="flex flex-col gap-2.5 border-l border-ink-700 pl-4">
                {article.toc.map((t) => (
                  <li key={t.id}>
                    <a
                      href={`#${t.id}`}
                      className="text-[0.86rem] leading-snug text-mute transition-colors hover:text-chalk"
                    >
                      {t.label}
                    </a>
                  </li>
                ))}
              </ol>
            </nav>

            <div className="mt-10 surface-card p-5">
              <p className="text-[0.88rem] leading-relaxed text-chalk-dim">
                Ce sujet concerne votre organisation ?
              </p>
              <Link
                href="/contact"
                className="group mt-4 inline-flex items-center gap-2 text-[0.86rem] font-medium text-iris-300"
              >
                Nous en parler
                <Arrow />
              </Link>
            </div>
          </aside>

          <article
            className="prose-agapante max-w-3xl"
            dangerouslySetInnerHTML={{ __html: article.html }}
          />
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <h2 className="display text-[clamp(1.7rem,3.2vw,2.4rem)] text-chalk">À lire ensuite</h2>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {related.map((a, i) => (
              <Reveal key={a.slug} delay={i * 70}>
                <Link
                  href={`/ressources/${a.slug}`}
                  className="group surface-card flex h-full flex-col p-7 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03]"
                >
                  <span className="text-[0.72rem] uppercase tracking-[0.13em] text-iris-400">
                    {a.category}
                  </span>
                  <h3 className="mt-4 text-[1.1rem] font-medium leading-snug text-chalk">
                    {a.title}
                  </h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-mute">{a.excerpt}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.85rem] text-chalk-dim">
                    Lire
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
