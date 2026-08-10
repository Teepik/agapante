import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { engagements, methodSteps, principles } from "@/lib/content/general";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Notre méthode de déploiement de l'IA en organisation",
  description:
    "Comprendre, arbitrer, prouver, installer, transmettre : la méthode Agapante pour faire passer un projet d'IA de l'intention à l'usage réellement adopté.",
  path: "/methode",
  keywords: [
    "méthode déploiement IA",
    "conduite de projet intelligence artificielle",
    "cadrage IA entreprise",
    "adoption IA méthode",
  ],
});

const antiPatterns = [
  {
    title: "Commencer par acheter des licences pour tout le monde",
    detail:
      "Le taux d'usage réel s'effondre après six semaines et la démarche perd la crédibilité dont elle aura besoin plus tard.",
  },
  {
    title: "Confier le sujet à la seule DSI",
    detail:
      "C'est un sujet d'organisation du travail avant d'être un sujet technique. Sans porteur métier, rien ne s'installe.",
  },
  {
    title: "Chercher le cas d'usage spectaculaire",
    detail:
      "La valeur est presque toujours dans le back-office. Les cas d'usage visibles consomment le budget et la patience.",
  },
  {
    title: "Traiter la conformité en fin de parcours",
    detail:
      "Première cause de projets bloqués à la porte de la production. Le juridique et la sécurité doivent être là dès le cadrage.",
  },
  {
    title: "Ne rien mesurer",
    detail:
      "Sans chiffres, le projet ne survit pas au premier arbitrage budgétaire. Y compris les chiffres qui dérangent.",
  },
  {
    title: "Ne jamais oser arrêter",
    detail:
      "Un pilote maintenu artificiellement consomme les ressources du cas d'usage suivant, qui aurait peut-être fonctionné.",
  },
];

export default function MethodePage() {
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Méthode", path: "/methode" },
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
            <p className="eyebrow mb-6">La méthode</p>
            <h1 className="display max-w-[16ch] text-[clamp(2.5rem,6.4vw,5rem)] text-chalk">
              L&apos;ordre compte plus que les outils
            </h1>
            <p className="mt-8 max-w-2xl text-[1.12rem] leading-relaxed text-mute">
              Notre méthode n&apos;a rien d&apos;original, et c&apos;est volontaire. Elle est
              simplement ordonnée, et tenue jusqu&apos;au bout. Dans la plupart des organisations,
              c&apos;est exactement ce qui manque : non pas l&apos;idée, mais la discipline de la
              séquence.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <ol className="flex flex-col">
            {methodSteps.map((step, i) => (
              <Reveal as="li" key={step.number} delay={i * 60}>
                <div className="grid gap-8 border-t border-ink-800 py-12 lg:grid-cols-[8rem_1fr_20rem] lg:gap-14">
                  <div>
                    <span className="display text-[3rem] leading-none text-iris-400">
                      {step.number}
                    </span>
                    <p className="mt-3 text-[0.76rem] uppercase tracking-[0.14em] text-mute-dim">
                      {step.subtitle}
                    </p>
                  </div>

                  <div>
                    <h2 className="display text-[clamp(1.9rem,3.6vw,2.8rem)] text-chalk">
                      {step.title}
                    </h2>
                    <p className="mt-5 max-w-2xl text-[1.02rem] leading-relaxed text-mute">
                      {step.detail}
                    </p>
                  </div>

                  <div className="surface-card p-6">
                    <p className="eyebrow mb-4">Livrables</p>
                    <ul className="flex flex-col gap-2.5">
                      {step.outputs.map((o) => (
                        <li key={o} className="flex items-start gap-2.5 text-[0.9rem] text-chalk-dim">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-iris-400" />
                          {o}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Ce que nous ne faisons pas"
              title="Six pièges que nous refusons de vous laisser prendre"
              lede="Nous les avons tous rencontrés. Ils ne viennent jamais d'un manque d'intelligence, mais d'un manque de temps pour poser les bonnes questions au bon moment."
            />
          </Reveal>
          <div className="mt-14 grid gap-px overflow-hidden rounded-[20px] border border-ink-700/70 bg-ink-700/40 md:grid-cols-2 lg:grid-cols-3">
            {antiPatterns.map((a, i) => (
              <Reveal key={a.title} delay={i * 60}>
                <div className="h-full bg-ink-950 px-7 py-8">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full border border-amber-sig/40 text-[0.75rem] text-amber-sig">
                    ✕
                  </span>
                  <h3 className="mt-5 text-[1.05rem] font-medium leading-snug text-chalk">
                    {a.title}
                  </h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">{a.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x grid gap-16 lg:grid-cols-[0.85fr_1.15fr] lg:gap-24">
          <Reveal>
            <SectionHeading
              eyebrow="Principes"
              title="Quatre règles qui décident des missions que nous acceptons"
            />
          </Reveal>
          <div>
            {principles.map((p, i) => (
              <Reveal key={p.number} delay={i * 70}>
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
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Engagements" title="Ce sur quoi vous pouvez nous tenir" />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {engagements.map((e, i) => (
              <Reveal key={e.title} delay={i * 60}>
                <div className="surface-card h-full p-7">
                  <h3 className="text-[1.05rem] font-medium text-chalk">{e.title}</h3>
                  <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">{e.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="La méthode ne vaut que si elle rencontre votre réalité."
        text="Décrivez-nous votre situation en quelques phrases. Nous vous dirons franchement par quelle étape commencer — y compris si ce n'est pas la première."
        secondary={{ href: "/expertises", label: "Voir les expertises" }}
      />
    </>
  );
}
