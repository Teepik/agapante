import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Arrow, Breadcrumbs, Button, SectionHeading } from "@/components/ui";
import { expertises } from "@/lib/content/expertises";
import { getSecteur, secteurs } from "@/lib/content/secteurs";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return secteurs.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const secteur = getSecteur(slug);
  if (!secteur) return {};
  return buildMetadata({
    title: secteur.metaTitle,
    description: secteur.metaDescription,
    path: `/secteurs/${secteur.slug}`,
    keywords: secteur.keywords,
  });
}

export default async function SecteurPage({ params }: Params) {
  const { slug } = await params;
  const secteur = getSecteur(slug);
  if (!secteur) notFound();

  const others = secteurs.filter((s) => s.slug !== secteur.slug);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Secteurs", path: "/secteurs" },
    { name: secteur.title, path: `/secteurs/${secteur.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          serviceJsonLd({
            name: secteur.title,
            description: secteur.metaDescription,
            path: `/secteurs/${secteur.slug}`,
          }),
          faqJsonLd(secteur.faq),
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="container-x relative z-10 pb-20 pt-16 lg:pb-28 lg:pt-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6">
              {secteur.eyebrow} — {secteur.size}
            </p>
            <h1 className="display max-w-[18ch] text-[clamp(2.4rem,6vw,4.6rem)] text-chalk">
              {secteur.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-[1.12rem] leading-relaxed text-mute">
              {secteur.lede}
            </p>
            <div className="mt-10">
              <Button href="/contact">Parler de votre organisation</Button>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] text-chalk">
              Notre lecture de votre contexte
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-6 text-[1.04rem] leading-relaxed text-mute">
              {secteur.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-[1.15rem] text-chalk-dim" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Réalités du terrain" title="Ce avec quoi il faut composer" />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-ink-700/70 bg-ink-700/40 md:grid-cols-2">
            {secteur.realities.map((r, i) => (
              <Reveal key={r.title} delay={i * 70}>
                <div className="h-full bg-ink-950 px-7 py-8">
                  <h3 className="text-[1.08rem] font-medium text-chalk">{r.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-mute">{r.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Cas d'usage"
              title="Ce qui fonctionne réellement à cette échelle"
              lede="Sélection issue de missions concrètes. Les gains indiqués sont des ordres de grandeur observés, pas des promesses contractuelles."
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {secteur.useCases.map((u, i) => (
              <Reveal key={u.title} delay={i * 60}>
                <div className="surface-card flex h-full flex-col p-7">
                  <h3 className="text-[1.05rem] font-medium leading-snug text-chalk">{u.title}</h3>
                  <p className="mt-3 flex-1 text-[0.92rem] leading-relaxed text-mute">{u.detail}</p>
                  <p className="mt-5 inline-flex items-center gap-2 border-t border-ink-800 pt-4 text-[0.82rem] text-sage-400">
                    <span className="h-1 w-1 rounded-full bg-sage-400" />
                    {u.gain}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Notre approche" title="Comment nous intervenons ici" />
          </Reveal>
          <ol className="mt-12 flex flex-col">
            {secteur.approach.map((a, i) => (
              <Reveal as="li" key={a.title} delay={i * 70}>
                <div className="grid gap-4 border-t border-ink-800 py-8 sm:grid-cols-[4rem_1fr] lg:grid-cols-[6rem_18rem_1fr] lg:gap-10">
                  <span className="display text-[1.5rem] text-iris-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-[1.15rem] font-medium text-chalk">{a.title}</h3>
                  <p className="text-[0.98rem] leading-relaxed text-mute">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {secteur.funding ? (
        <section className="border-t border-ink-800/70 py-24 lg:py-32">
          <div className="container-x">
            <Reveal>
              <SectionHeading
                eyebrow="Financement"
                title="Des dispositifs existent"
                lede="Nous ne sommes ni prescripteurs ni intermédiaires, mais nous vous indiquons les pistes à explorer et fournissons les éléments nécessaires au montage des dossiers."
              />
            </Reveal>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {secteur.funding.map((f, i) => (
                <Reveal key={f.title} delay={i * 70}>
                  <div className="surface-card h-full p-7">
                    <h3 className="text-[1.05rem] font-medium text-chalk">{f.title}</h3>
                    <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">{f.detail}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow="Questions fréquentes" title={secteur.title} />
          </Reveal>
          <Reveal delay={100}>
            <Accordion items={secteur.faq} />
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="display text-[clamp(1.7rem,3.2vw,2.4rem)] text-chalk">
              Nos expertises appliquées à votre contexte
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {expertises.map((e, i) => (
              <Reveal key={e.slug} delay={i * 70}>
                <Link
                  href={`/expertises/${e.slug}`}
                  className="group surface-card flex h-full flex-col p-7 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03]"
                >
                  <h3 className="text-[1.1rem] font-medium text-chalk">{e.title}</h3>
                  <p className="mt-3 flex-1 text-[0.91rem] leading-relaxed text-mute">{e.lede}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-[0.85rem] text-chalk-dim">
                    Voir
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>

          <div className="mt-14">
            <p className="eyebrow mb-5">Autres organisations</p>
            <div className="flex flex-wrap gap-3">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={`/secteurs/${o.slug}`}
                  className="rounded-full border border-ink-600 px-5 py-2.5 text-[0.88rem] text-chalk-dim transition-colors hover:border-iris-400/60 hover:text-chalk"
                >
                  {o.title}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand />
    </>
  );
}
