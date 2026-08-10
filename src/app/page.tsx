import Link from "next/link";
import type { Metadata } from "next";
import { Accordion } from "@/components/Accordion";
import { JsonLd } from "@/components/JsonLd";
import { Marquee } from "@/components/Marquee";
import { Reveal } from "@/components/Reveal";
import { Arrow, Button, Dot, SectionHeading } from "@/components/ui";
import { articlesByDate } from "@/lib/content/articles";
import { expertises } from "@/lib/content/expertises";
import { homeFaq, methodSteps, principles, stats } from "@/lib/content/general";
import { secteurs } from "@/lib/content/secteurs";
import { buildMetadata, faqJsonLd } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Conseil en déploiement de l'IA pour les entreprises et administrations",
  description:
    "Agapante accompagne les TPE, PME, ETI et organisations publiques dans le déploiement concret de l'intelligence artificielle : diagnostic, feuille de route, conduite du changement et MVP clés en main. Cabinet indépendant, France entière.",
  path: "/",
  keywords: [
    "conseil déploiement IA",
    "cabinet conseil intelligence artificielle",
    "IA PME ETI",
    "IA administration",
    "MVP IA clés en main",
    "accompagnement IA entreprise",
  ],
});

const marqueeItems = [
  "Industrie",
  "Services B2B",
  "BTP & construction",
  "Distribution",
  "Santé & médico-social",
  "Collectivités territoriales",
  "Établissements publics",
  "Bureaux d'études",
  "Transport & logistique",
  "Assurance & courtage",
];

export default function HomePage() {
  const latest = articlesByDate.slice(0, 3);

  return (
    <>
      <JsonLd data={faqJsonLd(homeFaq)} />

      {/* ---------------- HERO ---------------- */}
      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="noise" />

        <div className="container-x relative z-10 pb-24 pt-20 lg:pb-32 lg:pt-28">
          <Reveal>
            <span className="inline-flex items-center gap-2.5 rounded-full border border-ink-600 bg-ink-800/50 px-4 py-2 text-[0.76rem] tracking-wide text-chalk-dim backdrop-blur">
              <Dot />
              Cabinet indépendant — France entière
            </span>
          </Reveal>

          <Reveal delay={80}>
            <h1 className="display mt-9 max-w-[19ch] text-[clamp(2.7rem,7.4vw,5.6rem)] text-chalk">
              L&apos;intelligence artificielle ne transforme rien{" "}
              <span className="text-gradient italic">toute seule.</span>
            </h1>
          </Reveal>

          <div className="mt-12 grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
            <div>
              <Reveal delay={160}>
                <p className="max-w-2xl text-[1.1rem] leading-relaxed text-mute md:text-[1.25rem]">
                  Agapante conseille, accompagne et outille les TPE, PME, ETI et administrations
                  qui veulent passer des expérimentations aux usages réellement installés. Nous
                  travaillons sur vos processus, pas sur des diapositives.
                </p>
              </Reveal>

              <Reveal delay={240}>
                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <Button href="/contact">Prendre 30 minutes</Button>
                  <Button href="/methode" variant="ghost">
                    Découvrir la méthode
                  </Button>
                </div>
              </Reveal>
            </div>

            <Reveal delay={300}>
              <div className="lg:pt-2">
                <p className="eyebrow mb-1">Trois façons de travailler ensemble</p>
                <ul className="flex flex-col">
                  {expertises.map((exp) => (
                    <li key={exp.slug}>
                      <Link
                        href={`/expertises/${exp.slug}`}
                        className="group flex items-center justify-between gap-6 border-b border-ink-800 py-4 transition-colors hover:border-iris-400/50"
                      >
                        <span>
                          <span className="block text-[1rem] font-medium text-chalk">
                            {exp.title}
                          </span>
                          <span className="mt-0.5 block text-[0.82rem] text-mute-dim">
                            {exp.duration} · {exp.outcome}
                          </span>
                        </span>
                        <Arrow className="shrink-0 text-mute transition-colors group-hover:text-iris-300" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>

          <Reveal delay={320}>
            <dl className="mt-20 grid gap-px overflow-hidden rounded-[20px] border border-ink-700/70 bg-ink-700/40 sm:grid-cols-2 lg:grid-cols-4">
              {stats.map((stat) => (
                <div key={stat.label} className="bg-ink-950/80 px-6 py-7 backdrop-blur">
                  <dt className="display text-[2.4rem] leading-none text-chalk">{stat.value}</dt>
                  <dd className="mt-3">
                    <span className="block text-[0.9rem] font-medium text-chalk-dim">
                      {stat.label}
                    </span>
                    <span className="mt-1 block text-[0.8rem] text-mute-dim">{stat.detail}</span>
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      <div className="border-y border-ink-800/80">
        <Marquee items={marqueeItems} />
      </div>

      {/* ---------------- CONSTAT ---------------- */}
      <section className="relative py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <Reveal>
              <SectionHeading
                eyebrow="Le constat"
                title={
                  <>
                    Les projets d&apos;IA échouent rarement pour des raisons{" "}
                    <span className="italic text-mute">techniques.</span>
                  </>
                }
              />
            </Reveal>

            <Reveal delay={120}>
              <div className="space-y-6 text-[1.02rem] leading-relaxed text-mute lg:pt-4">
                <p>
                  Les modèles disponibles aujourd&apos;hui suffisent très largement aux besoins
                  d&apos;une PME ou d&apos;une administration. Ce qui manque n&apos;est presque
                  jamais la technologie.
                </p>
                <p>
                  Ce qui manque, c&apos;est un cas d&apos;usage choisi pour sa valeur et non pour
                  sa capacité à faire une belle démonstration. Un propriétaire métier qui a du
                  temps. Un critère de réussite écrit avant de commencer. Un cadre de conformité
                  posé avant le développement, pas après. Et une procédure réécrite, sans quoi
                  l&apos;outil restera une option que personne ne prend en période de charge.
                </p>
                <p className="border-l-2 border-iris-500 pl-5 text-chalk">
                  Notre métier consiste à tenir cet ordre-là, pendant que votre organisation gère
                  ses dix autres urgences.
                </p>
              </div>
            </Reveal>
          </div>

          <div className="mt-20 grid gap-px overflow-hidden rounded-[20px] border border-ink-700/70 bg-ink-700/40 md:grid-cols-3">
            {[
              {
                title: "Des pilotes qui s'éternisent",
                detail:
                  "Lancés sans critère de succès ni critère d'arrêt, ils consomment le budget et la crédibilité du sujet.",
              },
              {
                title: "Des outils achetés, jamais adoptés",
                detail:
                  "Les licences sont payées, l'usage réel se concentre sur trois enthousiastes, puis s'effondre.",
              },
              {
                title: "Des blocages découverts trop tard",
                detail:
                  "La revue juridique ou sécurité arrive après le développement et suspend six mois de travail.",
              },
            ].map((item, i) => (
              <Reveal key={item.title} delay={i * 90}>
                <div className="h-full bg-ink-950 px-7 py-9">
                  <span className="eyebrow">{`0${i + 1}`}</span>
                  <h3 className="mt-5 text-[1.15rem] font-medium text-chalk">{item.title}</h3>
                  <p className="mt-3 text-[0.94rem] leading-relaxed text-mute">{item.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- EXPERTISES ---------------- */}
      <section id="expertises" className="relative border-t border-ink-800/70 py-28 lg:py-36">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Trois façons de travailler ensemble"
              title="Conseiller, accompagner, construire"
              lede="Selon l'endroit où vous en êtes, vous avez besoin d'un regard extérieur qui tranche, d'une présence qui tient dans la durée, ou d'un objet réel qui débloque la décision."
            />
          </Reveal>

          <div className="mt-16 flex flex-col gap-5">
            {expertises.map((exp, i) => (
              <Reveal key={exp.slug} delay={i * 90}>
                <Link
                  href={`/expertises/${exp.slug}`}
                  className="group surface-card block overflow-hidden p-8 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03] lg:p-11"
                >
                  <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
                    <div>
                      <span className="eyebrow">{exp.eyebrow}</span>
                      <h3 className="display mt-5 text-[clamp(1.8rem,3.4vw,2.7rem)] text-chalk">
                        {exp.title}
                      </h3>
                      <p className="mt-5 text-[1rem] leading-relaxed text-mute">{exp.lede}</p>
                    </div>

                    <div className="flex flex-col justify-between gap-8">
                      <dl className="grid gap-px overflow-hidden rounded-[14px] border border-ink-700 bg-ink-700/50 sm:grid-cols-3">
                        {[
                          { k: "Durée", v: exp.duration },
                          { k: "Format", v: exp.format },
                          { k: "Résultat", v: exp.outcome },
                        ].map((cell) => (
                          <div key={cell.k} className="bg-ink-900 px-4 py-4">
                            <dt className="text-[0.68rem] uppercase tracking-[0.14em] text-mute-dim">
                              {cell.k}
                            </dt>
                            <dd className="mt-2 text-[0.86rem] leading-snug text-chalk-dim">
                              {cell.v}
                            </dd>
                          </div>
                        ))}
                      </dl>

                      <span className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-chalk">
                        Voir le détail de la mission
                        <Arrow />
                      </span>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- MÉTHODE ---------------- */}
      <section className="relative border-t border-ink-800/70 py-28 lg:py-36">
        <div className="container-x">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="La méthode"
                title="Cinq temps, dans cet ordre"
                lede="L'ordre compte davantage que le contenu de chaque étape. C'est en le respectant qu'un projet arrive en production."
              />
            </Reveal>
            <Reveal delay={100}>
              <Button href="/methode" variant="ghost" className="shrink-0">
                Méthode complète
              </Button>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-[20px] border border-ink-700/70 bg-ink-700/40 lg:grid-cols-5">
            {methodSteps.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 70} className="bg-ink-950">
                <div className="flex h-full flex-col px-6 py-8">
                  <div className="flex items-baseline justify-between gap-2">
                    <span className="display text-[1.8rem] text-iris-400">{step.number}</span>
                    <span className="text-[0.7rem] uppercase tracking-[0.14em] text-mute-dim">
                      {step.subtitle}
                    </span>
                  </div>
                  <h3 className="mt-5 text-[1.2rem] font-medium text-chalk">{step.title}</h3>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-relaxed text-mute">
                    {step.detail}
                  </p>
                  <ul className="mt-6 flex flex-col gap-1.5 border-t border-ink-800 pt-5">
                    {step.outputs.map((o) => (
                      <li key={o} className="flex items-start gap-2 text-[0.8rem] text-chalk-dim">
                        <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-iris-500" />
                        {o}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* ---------------- SECTEURS ---------------- */}
      <section className="relative border-t border-ink-800/70 py-28 lg:py-36">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="À qui nous nous adressons"
              title="La bonne échelle d'intervention"
              lede="Une entreprise de huit personnes et une ETI de trois mille n'ont ni les mêmes contraintes, ni les mêmes leviers. Nos formats diffèrent en conséquence."
            />
          </Reveal>

          <div className="mt-16 grid gap-5 sm:grid-cols-2">
            {secteurs.map((sec, i) => (
              <Reveal key={sec.slug} delay={i * 80}>
                <Link
                  href={`/secteurs/${sec.slug}`}
                  className="group surface-card flex h-full flex-col p-8 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03] lg:p-10"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <h3 className="display text-[1.9rem] text-chalk">{sec.title}</h3>
                      <p className="mt-1.5 text-[0.8rem] uppercase tracking-[0.13em] text-mute-dim">
                        {sec.size}
                      </p>
                    </div>
                    <span className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-ink-600 text-mute transition-colors group-hover:border-iris-400/60 group-hover:text-iris-300">
                      <Arrow />
                    </span>
                  </div>
                  <p className="mt-6 flex-1 text-[0.97rem] leading-relaxed text-mute">{sec.lede}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- PRINCIPES ---------------- */}
      <section className="relative border-t border-ink-800/70 py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
            <Reveal>
              <SectionHeading
                eyebrow="Ce qui nous engage"
                title="Quatre principes non négociables"
                lede="Ils déterminent les missions que nous acceptons — et celles que nous refusons."
              />
            </Reveal>

            <div className="flex flex-col">
              {principles.map((p, i) => (
                <Reveal key={p.number} delay={i * 80}>
                  <div className="flex gap-6 border-b border-ink-800 py-7 first:pt-0 last:border-0">
                    <span className="display shrink-0 text-[1.3rem] text-iris-400">{p.number}</span>
                    <div>
                      <h3 className="text-[1.12rem] font-medium text-chalk">{p.title}</h3>
                      <p className="mt-2.5 text-[0.96rem] leading-relaxed text-mute">{p.detail}</p>
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- RESSOURCES ---------------- */}
      <section className="relative border-t border-ink-800/70 py-28 lg:py-36">
        <div className="container-x">
          <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <Reveal>
              <SectionHeading
                eyebrow="Ressources"
                title="Ce que nous avons appris, écrit noir sur blanc"
                lede="Des analyses opérationnelles, sans jargon ni promesse abusive. C'est aussi la meilleure façon de savoir si nous pensons juste."
              />
            </Reveal>
            <Reveal delay={100}>
              <Button href="/ressources" variant="ghost" className="shrink-0">
                Toutes les ressources
              </Button>
            </Reveal>
          </div>

          <div className="mt-16 grid gap-5 md:grid-cols-3">
            {latest.map((article, i) => (
              <Reveal key={article.slug} delay={i * 80}>
                <Link
                  href={`/ressources/${article.slug}`}
                  className="group surface-card flex h-full flex-col p-7 transition-all duration-500 hover:border-iris-400/40 hover:bg-iris-400/[0.03]"
                >
                  <div className="flex items-center gap-3 text-[0.72rem] uppercase tracking-[0.13em] text-mute-dim">
                    <span className="text-iris-400">{article.category}</span>
                    <span>·</span>
                    <span>{article.readingTime} min</span>
                  </div>
                  <h3 className="mt-5 text-[1.16rem] font-medium leading-snug text-chalk">
                    {article.title}
                  </h3>
                  <p className="mt-3.5 flex-1 text-[0.92rem] leading-relaxed text-mute">
                    {article.excerpt}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.86rem] text-chalk-dim">
                    Lire
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- FAQ ---------------- */}
      <section className="relative border-t border-ink-800/70 py-28 lg:py-36">
        <div className="container-x">
          <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-24">
            <Reveal>
              <SectionHeading eyebrow="Questions fréquentes" title="Les réponses avant l'appel" />
            </Reveal>
            <Reveal delay={100}>
              <Accordion items={homeFaq} />
            </Reveal>
          </div>
        </div>
      </section>

      {/* ---------------- CTA ---------------- */}
      <section className="relative overflow-hidden border-t border-ink-800/70">
        <div className="aurora opacity-60" />
        <div className="container-x relative z-10 py-28 text-center lg:py-40">
          <Reveal>
            <p className="eyebrow text-center">Premier échange</p>
            <h2 className="display mx-auto mt-7 max-w-[16ch] text-[clamp(2.3rem,6vw,4.6rem)] text-chalk">
              Trente minutes, et vous saurez si nous sommes utiles.
            </h2>
            <p className="mx-auto mt-8 max-w-2xl text-[1.05rem] leading-relaxed text-mute">
              Un appel de cadrage, sans engagement et sans diaporama. Vous décrivez votre
              situation, nous vous disons franchement ce qui nous paraît possible, à quel
              horizon — et si le sujet ne vaut pas la dépense, nous vous le disons aussi.
            </p>
            <div className="mt-11 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <Button href="/contact">Décrire votre situation</Button>
              <Button href="/a-propos" variant="ghost">
                Qui est derrière Agapante
              </Button>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
