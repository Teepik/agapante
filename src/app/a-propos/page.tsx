import type { Metadata } from "next";
import { CtaBand } from "@/components/CtaBand";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs, SectionHeading } from "@/components/ui";
import { engagements } from "@/lib/content/general";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "À propos d'Agapante",
  description:
    "Agapante est un cabinet de conseil indépendant en déploiement de l'intelligence artificielle. Notre positionnement, nos convictions et notre façon de travailler.",
  path: "/a-propos",
  keywords: ["cabinet conseil IA indépendant", "agence IA France", "consultant IA entreprise"],
});

const convictions = [
  {
    title: "La technologie n'est plus le facteur limitant",
    detail:
      "Les modèles disponibles suffisent à l'immense majorité des besoins d'une organisation de taille moyenne. Ce qui limite, c'est le temps de direction, la qualité des données et la capacité à changer une procédure.",
  },
  {
    title: "Le back-office avant la vitrine",
    detail:
      "Les gains les plus solides se trouvent dans les gestes invisibles : rechercher un document, contrôler une pièce, rédiger une réponse type. Rarement dans les usages spectaculaires.",
  },
  {
    title: "Un consultant qui vend l'outil qu'il recommande n'est pas un consultant",
    detail:
      "Nous ne percevons aucune commission d'éditeur. C'est la seule façon de rendre un arbitrage crédible, y compris quand il conclut qu'il ne faut rien acheter.",
  },
  {
    title: "L'autonomie du client est le vrai critère de réussite",
    detail:
      "Une mission qui crée une dépendance a échoué, même si tout le monde est content. Nous formons, documentons et transférons systématiquement.",
  },
];

export default function AProposPage() {
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "À propos", path: "/a-propos" },
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
            <p className="eyebrow mb-6">À propos</p>
            <h1 className="display max-w-[18ch] text-[clamp(2.4rem,6vw,4.8rem)] text-chalk">
              Un cabinet volontairement petit, délibérément indépendant
            </h1>
            <p className="mt-8 max-w-2xl text-[1.12rem] leading-relaxed text-mute">
              Agapante intervient comme prestataire externe auprès d&apos;organisations qui
              n&apos;ont ni le temps ni les ressources internes pour conduire seules un
              déploiement d&apos;intelligence artificielle — et qui n&apos;ont pas envie
              d&apos;acheter une transformation.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-24">
          <Reveal>
            <h2 className="display text-[clamp(1.8rem,3.4vw,2.6rem)] text-chalk">
              Le nom, et ce qu&apos;il dit du travail
            </h2>
          </Reveal>
          <Reveal delay={100}>
            <div className="space-y-6 text-[1.04rem] leading-relaxed text-mute">
              <p className="text-[1.15rem] text-chalk-dim">
                L&apos;agapanthe est une plante dont la fleur, vue de près, n&apos;est pas une
                fleur : c&apos;est une ombelle, un assemblage de dizaines de tiges parties du même
                point.
              </p>
              <p>
                C&apos;est une image assez juste de ce que nous faisons. Un déploiement
                d&apos;intelligence artificielle réussi n&apos;est jamais un geste unique et
                spectaculaire. C&apos;est un ensemble de petits gestes cohérents — une procédure
                réécrite, un référent formé, un critère d&apos;arrêt tenu, une donnée nettoyée —
                qui partent tous de la même décision initiale et qui, ensemble seulement,
                produisent un effet.
              </p>
              <p>
                Le reste du nom est plus prosaïque : il se prononce facilement, il ne contient ni
                « AI », ni « tech », ni « solutions ». Nous avons trouvé cela reposant.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading
              eyebrow="Convictions"
              title="Ce que trois ans d'expérimentations collectives nous ont appris"
            />
          </Reveal>
          <div className="mt-14 grid gap-5 md:grid-cols-2">
            {convictions.map((c, i) => (
              <Reveal key={c.title} delay={i * 70}>
                <div className="surface-card h-full p-8">
                  <span className="display text-[1.2rem] text-iris-400">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.15rem] font-medium leading-snug text-chalk">
                    {c.title}
                  </h3>
                  <p className="mt-3.5 text-[0.95rem] leading-relaxed text-mute">{c.detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading eyebrow="L'équipe" title="Qui vous aurez en face" />
            <div className="mt-8 space-y-5 text-[1rem] leading-relaxed text-mute">
              <p>
                Agapante est dirigé par {siteConfig.founder}. Les missions sont conduites
                directement par la personne qui vous a rencontré — pas par une équipe junior à
                qui le dossier serait transmis après la signature.
              </p>
              <p>
                Sur les sujets qui l&apos;exigent — juridique, cybersécurité, métiers très
                spécialisés — nous mobilisons un réseau de partenaires indépendants, en le
                disant explicitement et sans marge cachée.
              </p>
              <p className="rounded-[14px] border border-ink-700 bg-ink-900/60 p-5 text-[0.92rem] text-mute-dim">
                [BLOC À COMPLÉTER — Ajoutez ici votre parcours : formation, expériences
                significatives, secteurs connus, publications ou interventions. Deux paragraphes
                suffisent : les prospects cherchent à savoir si vous connaissez leur monde.]
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="surface-card p-8 lg:p-10">
              <p className="eyebrow mb-6">En pratique</p>
              <dl className="flex flex-col divide-y divide-ink-800">
                {[
                  { k: "Zone d'intervention", v: siteConfig.contact.areaServed },
                  { k: "Langues de travail", v: "Français, anglais" },
                  { k: "Délai de réponse", v: siteConfig.contact.availability },
                  { k: "Confidentialité", v: "Accord de confidentialité systématique" },
                  { k: "Marchés publics", v: "Réponse aux consultations et MAPA" },
                  { k: "Contact", v: siteConfig.contact.email },
                ].map((row) => (
                  <div key={row.k} className="flex flex-col gap-1 py-4 first:pt-0 last:pb-0">
                    <dt className="text-[0.75rem] uppercase tracking-[0.13em] text-mute-dim">
                      {row.k}
                    </dt>
                    <dd className="text-[0.98rem] text-chalk-dim">{row.v}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="border-t border-ink-800/70 py-24 lg:py-32">
        <div className="container-x">
          <Reveal>
            <SectionHeading eyebrow="Engagements" title="Écrits dans chacune de nos propositions" />
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
        title="Le meilleur moyen de savoir si nous nous entendrons, c'est de se parler."
        secondary={{ href: "/ressources", label: "Lire nos analyses" }}
      />
    </>
  );
}
