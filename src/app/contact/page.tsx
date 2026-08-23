import type { Metadata } from "next";
import { ContactForm } from "@/components/ContactForm";
import { JsonLd } from "@/components/JsonLd";
import { Reveal } from "@/components/Reveal";
import { Breadcrumbs } from "@/components/ui";
import { createFormToken } from "@/lib/spam";
import { breadcrumbJsonLd, buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Contact — parlons de votre projet IA",
  description:
    "Décrivez votre situation en quelques phrases. Nous revenons vers vous sous 24 heures ouvrées pour un appel de cadrage de 30 minutes, sans engagement.",
  path: "/contact",
  keywords: ["contact conseil IA", "appel de cadrage IA", "consultant IA France"],
});

const expectations = [
  {
    step: "01",
    title: "Vous décrivez votre situation",
    detail:
      "Le formulaire prend trois minutes. Plus votre description est concrète — ce que vous avez tenté, ce qui bloque — plus notre première réponse sera utile.",
  },
  {
    step: "02",
    title: "Nous répondons sous 24 h ouvrées",
    detail:
      "Avec une première lecture de votre situation et une proposition de créneau. Si le sujet ne relève pas de nous, nous vous le disons et vous orientons.",
  },
  {
    step: "03",
    title: "Trente minutes au téléphone",
    detail:
      "Un échange de cadrage, sans engagement ni diaporama. Vous en sortez avec un avis franc sur ce qui vous paraît faisable, à quel horizon et à quel ordre de grandeur.",
  },
  {
    step: "04",
    title: "Vous décidez",
    detail:
      "Si une suite a du sens, nous vous adressons une proposition écrite avec un périmètre et un forfait. Sinon, nous en restons là — sans relance commerciale.",
  },
];

export default function ContactPage() {
  const formToken = createFormToken();
  const turnstileSiteKey = process.env.NEXT_PUBLIC_TURNSTILE_SITE_KEY;
  const crumbs = [
    { name: "Accueil", path: "/" },
    { name: "Contact", path: "/contact" },
  ];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd(crumbs),
          {
            "@context": "https://schema.org",
            "@type": "ContactPage",
            name: "Contacter Agapante",
            url: `${siteConfig.url}/contact`,
          },
        ]}
      />

      <section className="relative overflow-hidden">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="container-x relative z-10 pb-14 pt-16 lg:pt-20">
          <Breadcrumbs items={crumbs} />
          <Reveal>
            <p className="eyebrow mb-6">Contact</p>
            <h1 className="display max-w-[16ch] text-[clamp(2.4rem,6vw,4.6rem)] text-chalk">
              Trente minutes, et vous saurez si nous sommes utiles
            </h1>
            <p className="mt-8 max-w-2xl text-[1.1rem] leading-relaxed text-mute">
              Pas de formulaire à rallonge, pas de séquence d&apos;e-mails automatiques. Vous
              écrivez, une personne lit, une personne répond.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="pb-24 lg:pb-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <Reveal>
            <ContactForm formToken={formToken} turnstileSiteKey={turnstileSiteKey} />
          </Reveal>

          <Reveal delay={120}>
            <div className="flex flex-col gap-8">
              <div className="surface-card p-7">
                <p className="eyebrow mb-5">Coordonnées</p>
                <dl className="flex flex-col divide-y divide-ink-800">
                  {[
                    { k: "E-mail", v: siteConfig.contact.email },
                    { k: "Téléphone", v: siteConfig.contact.phone },
                    { k: "Zone d'intervention", v: siteConfig.contact.areaServed },
                    { k: "Délai de réponse", v: siteConfig.contact.availability },
                  ].map((row) => (
                    <div key={row.k} className="flex flex-col gap-1 py-3.5 first:pt-0 last:pb-0">
                      <dt className="text-[0.73rem] uppercase tracking-[0.13em] text-mute-dim">
                        {row.k}
                      </dt>
                      <dd className="text-[0.96rem] text-chalk-dim">{row.v}</dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <p className="eyebrow mb-6">Ce qui va se passer</p>
                <ol className="flex flex-col">
                  {expectations.map((e) => (
                    <li key={e.step} className="flex gap-5 border-b border-ink-800 py-5 last:border-0">
                      <span className="display shrink-0 text-[1.1rem] text-iris-400">{e.step}</span>
                      <div>
                        <h2 className="text-[1rem] font-medium text-chalk">{e.title}</h2>
                        <p className="mt-2 text-[0.9rem] leading-relaxed text-mute">{e.detail}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </div>

              <div className="rounded-[14px] border border-ink-700 bg-ink-900/60 p-6">
                <h2 className="text-[0.95rem] font-medium text-chalk">
                  Vos données, très simplement
                </h2>
                <p className="mt-3 text-[0.87rem] leading-relaxed text-mute">
                  Les informations transmises servent uniquement à traiter votre demande. Elles ne
                  sont ni revendues, ni utilisées à des fins publicitaires, ni transmises à des
                  tiers. Vous pouvez demander leur suppression à tout moment par simple e-mail.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
