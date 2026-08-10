import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Arrow, Breadcrumbs, SectionHeading } from "@/components/ui";
import { expertises } from "@/lib/content/expertises";
import { engagements } from "@/lib/content/general";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nos expertises : conseil, accompagnement et réalisation IA",
  description:
    "Trois modes d'intervention pour déployer l'intelligence artificielle : conseil et stratégie, accompagnement au déploiement, MVP clés en main. Pour TPE, PME, ETI et administrations.",
  path: "/expertises",
  keywords: [
    "expertises conseil IA",
    "prestations intelligence artificielle entreprise",
    "accompagnement IA",
    "développement MVP IA",
  ],
});

export default function ExpertisesPage() {
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Expertises", path: "/expertises" },
  ];

  return (
    <>
      <JsonLd data={breadcrumbJsonLd(crumbs)} />

      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="container-x relative z-10 pb-20 pt-16 lg:pb-28 lg:pt-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6">Expertises</p>
            <h1 className="display max-w-[17ch] text-[clamp(2.5rem,6vw,4.6rem)] text-chalk">
              Trois façons de travailler ensemble
            </h1>
            <p className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-mute">
              Elles se combinent souvent — un diagnostic qui débouche sur un MVP, un MVP qui
              appelle un accompagnement au déploiement — mais chacune se tient seule. Nous
              n&apos;imposons jamais la suite.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x flex flex-col gap-5">
          {expertises.map((exp, i) => (
            <Reveal key={exp.slug} delay={i * 80}>
              <Link
                href={`/expertises/${exp.slug}`}
                className="group surface-card block p-8 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03] lg:p-12"
              >
                <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
                  <div>
                    <span className="eyebrow">{exp.eyebrow}</span>
                    <h2 className="display mt-5 text-[clamp(1.9rem,3.6vw,2.9rem)] text-chalk">
                      {exp.title}
                    </h2>
                    <p className="mt-4 text-[1.15rem] italic text-iris-200">{exp.headline}</p>
                    <p className="mt-5 text-[1rem] leading-relaxed text-mute">{exp.lede}</p>
                    <span className="mt-8 inline-flex items-center gap-2 text-[0.92rem] font-medium text-chalk">
                      Voir le détail
                      <Arrow />
                    </span>
                  </div>

                  <ul className="flex flex-col gap-3 lg:pt-4">
                    {exp.deliverables.slice(0, 4).map((d) => (
                      <li key={d.title} className="flex items-start gap-3">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-iris-400" />
                        <div>
                          <p className="text-[0.94rem] font-medium text-chalk-dim">{d.title}</p>
                          <p className="mt-1 text-[0.87rem] leading-relaxed text-mute">
                            {d.detail}
                          </p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Nos engagements"
              title="Ce sur quoi vous pouvez nous tenir"
              lede="Ces engagements figurent dans nos propositions commerciales. Ils ne sont pas décoratifs."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-ink-700/70 bg-ink-700/40 md:grid-cols-2 lg:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.title} delay={i * 60}>
                <div className="h-full bg-ink-950 px-7 py-8">
                  <h3 className="text-[1.06rem] font-medium text-chalk">{e.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand secondary={{ href: "/methode", label: "Voir la méthode" }} />
    </>
  );
}
