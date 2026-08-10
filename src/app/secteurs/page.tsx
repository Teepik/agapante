import Link from "next/link";
import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Arrow, Breadcrumbs } from "@/components/ui";
import { secteurs } from "@/lib/content/secteurs";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Nos interventions par type d'organisation",
  description:
    "TPE, PME, ETI, collectivités et établissements publics : nos formats d'accompagnement au déploiement de l'IA, adaptés à la taille et aux contraintes de chaque structure.",
  path: "/secteurs",
  keywords: [
    "IA TPE PME ETI",
    "intelligence artificielle secteur public",
    "conseil IA par taille d'entreprise",
  ],
});

export default function SecteursPage() {
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Secteurs", path: "/secteurs" },
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
            <p className="eyebrow mb-6">Secteurs</p>
            <h1 className="display max-w-[17ch] text-[clamp(2.5rem,6vw,4.6rem)] text-chalk">
              La bonne échelle d&apos;intervention
            </h1>
            <p className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-mute">
              Une entreprise de huit personnes et une ETI de trois mille salariés n&apos;ont ni
              les mêmes contraintes, ni les mêmes leviers, ni le même rapport au risque. Nos
              formats d&apos;intervention diffèrent en conséquence — la méthode, elle, reste la
              même.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x grid gap-5 lg:grid-cols-2">
          {secteurs.map((sec, i) => (
            <Reveal key={sec.slug} delay={i * 80}>
              <Link
                href={`/secteurs/${sec.slug}`}
                className="group surface-card flex h-full flex-col p-8 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03] lg:p-11"
              >
                <div className="flex items-start justify-between gap-5">
                  <div>
                    <h2 className="display text-[2.1rem] text-chalk">{sec.title}</h2>
                    <p className="mt-2 text-[0.8rem] uppercase tracking-[0.13em] text-mute-dim">
                      {sec.size}
                    </p>
                  </div>
                  <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-600 text-mute transition-colors group-hover:border-iris-400/60 group-hover:text-iris-300">
                    <Arrow />
                  </span>
                </div>
                <p className="mt-6 text-[1rem] leading-relaxed text-mute">{sec.lede}</p>
                <ul className="mt-7 flex flex-1 flex-col gap-2 border-t border-ink-800 pt-6">
                  {sec.useCases.slice(0, 3).map((u) => (
                    <li key={u.title} className="flex items-start gap-2.5 text-[0.9rem] text-chalk-dim">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-iris-400" />
                      {u.title}
                    </li>
                  ))}
                </ul>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaBand secondary={{ href: "/expertises", label: "Voir les expertises" }} />
    </>
  );
}
