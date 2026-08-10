import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Arrow, Breadcrumbs, Button, SectionHeading } from "@/components/ui";
import { expertises, getExpertise } from "@/lib/content/expertises";
import { breadcrumbJsonLd, buildMetadata, faqJsonLd, serviceJsonLd } from "@/lib/seo";

type Params = { params: Promise<{ slug: string }> };

export function generateStaticParams() {
  return expertises.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const { slug } = await params;
  const expertise = getExpertise(slug);
  if (!expertise) return {};
  return buildMetadata({
    title: expertise.metaTitle,
    description: expertise.metaDescription,
    path: `/expertises/${expertise.slug}`,
    keywords: expertise.keywords,
  });
}

export default async function ExpertisePage({ params }: Params) {
  const { slug } = await params;
  const expertise = getExpertise(slug);
  if (!expertise) notFound();

  const others = expertises.filter((e) => e.slug !== expertise.slug);
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Expertises", path: "/expertises" },
    { name: expertise.title, path: `/expertises/${expertise.slug}` },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          serviceJsonLd({
            name: expertise.title,
            description: expertise.metaDescription,
            path: `/expertises/${expertise.slug}`,
          }),
          faqJsonLd(expertise.faq),
        ]}
      />

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="container-x relative z-10 pb-20 pt-16 lg:pb-28 lg:pt-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6">{expertise.eyebrow}</p>
            <h1 className="display max-w-[18ch] text-[clamp(2.4rem,6vw,4.8rem)] text-chalk">
              {expertise.headline}
            </h1>
            <p className="mt-8 max-w-2xl text-[1.12rem] leading-relaxed text-mute">
              {expertise.lede}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href="/contact">Discuter de cette mission</Button>
            </div>
          </Reveal>

          <Reveal delay={140}>
            <dl className="mt-16 grid gap-px overflow-hidden rounded-[18px] border border-ink-700/70 bg-ink-700/40 sm:grid-cols-3">
              {[
                { k: "Durée typique", v: expertise.duration },
                { k: "Format", v: expertise.format },
                { k: "Ce que vous obtenez", v: expertise.outcome },
              ].map((cell) => (
                <div key={cell.k} className="bg-ink-950/80 px-6 py-6 backdrop-blur">
                  <dt className="text-[0.7rem] uppercase tracking-[0.14em] text-mute-dim">
                    {cell.k}
                  </dt>
                  <dd className="mt-2.5 text-[1rem] text-chalk-dim">{cell.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* Intro */}
      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] text-chalk">
              Pourquoi cette mission existe
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-6 text-[1.04rem] leading-relaxed text-mute">
              {expertise.intro.map((p, i) => (
                <p key={i} className={i === 0 ? "text-[1.15rem] text-chalk-dim" : undefined}>
                  {p}
                </p>
              ))}
            </div>
          </Reveal>
        </div>
      </section>

      {/* Symptômes */}
      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Vous vous reconnaissez ?"
              title="Les phrases que nous entendons le plus souvent"
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {expertise.symptoms.map((s, i) => (
              <Reveal key={s.label} delay={i * 70}>
                <div className="surface-card h-full p-7">
                  <p className="display text-[1.28rem] leading-snug text-chalk">{s.label}</p>
                  <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">{s.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Livrables */}
      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Livrables"
              title="Ce que vous avez entre les mains à la fin"
              lede="Tout est transféré, documenté et réutilisable sans nous."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-ink-700/70 bg-ink-700/40 md:grid-cols-2 lg:grid-cols-3">
            {expertise.deliverables.map((d, i) => (
              <Reveal key={d.title} delay={i * 60}>
                <div className="h-full bg-ink-950 px-7 py-8">
                  <span className="display text-[1.1rem] text-iris-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.05rem] font-medium leading-snug text-chalk">
                    {d.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">{d.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Déroulé */}
      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Déroulé" title="Comment se passe la mission" />
          </Reveal>
          <ol className="mt-14 flex flex-col">
            {expertise.steps.map((step, i) => (
              <Reveal as="li" key={step.title} delay={i * 70}>
                <div className="grid gap-6 border-t border-ink-800 py-9 sm:grid-cols-[7rem_1fr] lg:grid-cols-[10rem_14rem_1fr] lg:gap-10">
                  <span className="display text-[1.6rem] text-iris-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-[1.2rem] font-medium text-chalk">{step.title}</h3>
                    <p className="mt-1.5 text-[0.78rem] uppercase tracking-[0.13em] text-mute-dim">
                      {step.duration}
                    </p>
                  </div>
                  <p className="text-[0.98rem] leading-relaxed text-mute">{step.detail}</p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal>
            <dl className="mt-10 grid gap-px overflow-hidden rounded-[18px] border border-ink-700/70 bg-ink-700/40 sm:grid-cols-3">
              {expertise.proof.map((p) => (
                <div key={p.label} className="bg-ink-950 px-6 py-7">
                  <dt className="display text-[2rem] leading-none text-chalk">{p.value}</dt>
                  <dd className="mt-3 text-[0.85rem] text-mute">{p.label}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
          <Reveal>
            <SectionHeading eyebrow="Questions fréquentes" title={`À propos de « ${expertise.title} »`} />
          </Reveal>
          <Reveal delay={100}>
            <Accordion items={expertise.faq} />
          </Reveal>
        </div>
      </section>

      {/* Autres expertises */}
      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <h2 className="display text-[clamp(1.7rem,3.2vw,2.4rem)] text-chalk">
              Les autres façons de travailler ensemble
            </h2>
          </Reveal>
          <div className="mt-10 grid gap-5 md:grid-cols-2">
            {others.map((o, i) => (
              <Reveal key={o.slug} delay={i * 80}>
                <Link
                  href={`/expertises/${o.slug}`}
                  className="group surface-card flex h-full flex-col p-8 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03]"
                >
                  <span className="eyebrow">{o.eyebrow}</span>
                  <h3 className="display mt-4 text-[1.7rem] text-chalk">{o.title}</h3>
                  <p className="mt-4 flex-1 text-[0.95rem] leading-relaxed text-mute">{o.lede}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.88rem] text-chalk-dim">
                    Voir le détail
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
