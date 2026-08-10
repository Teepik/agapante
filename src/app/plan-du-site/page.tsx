import Link from "next/link";
import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { articlesByDate } from "@/lib/content/articles";
import { expertises } from "@/lib/content/expertises";
import { secteurs } from "@/lib/content/secteurs";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Plan du site",
  description: "L'ensemble des pages du site Agapante, organisées par rubrique.",
  path: "/plan-du-site",
});

export default function PlanDuSitePage() {
  const groups = [
    {
      title: "Le cabinet",
      links: [
        { label: "Accueil", href: "/" },
        { label: "Notre méthode", href: "/methode" },
        { label: "À propos d'Agapante", href: "/a-propos" },
        { label: "Contact", href: "/contact" },
      ],
    },
    {
      title: "Expertises",
      links: [
        { label: "Toutes les expertises", href: "/expertises" },
        ...expertises.map((e) => ({ label: e.title, href: `/expertises/${e.slug}` })),
      ],
    },
    {
      title: "Secteurs",
      links: [
        { label: "Tous les secteurs", href: "/secteurs" },
        ...secteurs.map((s) => ({ label: s.title, href: `/secteurs/${s.slug}` })),
      ],
    },
    {
      title: "Ressources",
      links: [
        { label: "Toutes les ressources", href: "/ressources" },
        ...articlesByDate.map((a) => ({ label: a.title, href: `/ressources/${a.slug}` })),
      ],
    },
    {
      title: "Informations",
      links: [
        { label: "Mentions légales", href: "/mentions-legales" },
        { label: "Politique de confidentialité", href: "/politique-de-confidentialite" },
      ],
    },
  ];

  return (
    <section className="container-x py-16 lg:py-24">
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Plan du site", path: "/plan-du-site" },
        ]}
      />
      <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-chalk">Plan du site</h1>

      <div className="mt-14 grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {groups.map((group) => (
          <div key={group.title}>
            <h2 className="eyebrow mb-5">{group.title}</h2>
            <ul className="flex flex-col gap-2.5">
              {group.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-[0.94rem] text-mute transition-colors hover:text-chalk"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
