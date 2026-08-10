import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Mentions légales",
  description: "Mentions légales du site Agapante : éditeur, hébergeur, propriété intellectuelle.",
  path: "/mentions-legales",
});

export default function MentionsLegalesPage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Mentions légales", path: "/mentions-legales" },
        ]}
      />
      <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-chalk">Mentions légales</h1>

      <div className="prose-agapante mt-12 max-w-3xl">
        <h2 id="editeur">Éditeur du site</h2>
        <p>
          Le présent site est édité par {siteConfig.legalName}.
        </p>
        <ul>
          <li>Forme juridique : [À COMPLÉTER]</li>
          <li>Capital social : [À COMPLÉTER]</li>
          <li>Siège social : [ADRESSE À COMPLÉTER]</li>
          <li>SIREN / SIRET : [À COMPLÉTER]</li>
          <li>Numéro de TVA intracommunautaire : [À COMPLÉTER]</li>
          <li>RCS : [À COMPLÉTER]</li>
          <li>Directeur de la publication : {siteConfig.founder}</li>
          <li>Contact : {siteConfig.contact.email} — {siteConfig.contact.phone}</li>
        </ul>

        <h2 id="hebergeur">Hébergement</h2>
        <p>
          Le site est hébergé par Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723,
          États-Unis — <a href="https://vercel.com">vercel.com</a>. Les données du formulaire de
          contact sont stockées dans une base de données hébergée en Europe.
        </p>

        <h2 id="propriete">Propriété intellectuelle</h2>
        <p>
          L&apos;ensemble des contenus présents sur ce site — textes, méthodes, structures
          éditoriales, éléments graphiques et code — est la propriété exclusive de
          {" "}{siteConfig.legalName}, sauf mention contraire. Toute reproduction, représentation,
          adaptation ou exploitation, totale ou partielle, sans autorisation écrite préalable est
          interdite.
        </p>
        <p>
          Les citations courtes accompagnées d&apos;un lien vers la source sont bienvenues et ne
          nécessitent pas d&apos;autorisation.
        </p>

        <h2 id="responsabilite">Limitation de responsabilité</h2>
        <p>
          Les informations publiées sur ce site sont fournies à titre informatif et ne constituent
          ni un conseil juridique, ni un conseil financier, ni un engagement contractuel. Elles
          reflètent l&apos;état de nos connaissances à la date de publication et peuvent évoluer.
          Toute décision prise sur la base de ces contenus relève de la seule responsabilité du
          lecteur.
        </p>

        <h2 id="liens">Liens hypertextes</h2>
        <p>
          Ce site peut contenir des liens vers des sites tiers. Nous n&apos;exerçons aucun contrôle
          sur ces sites et déclinons toute responsabilité quant à leur contenu.
        </p>

        <h2 id="donnees">Données personnelles</h2>
        <p>
          Le traitement des données personnelles est détaillé dans notre{" "}
          <a href="/politique-de-confidentialite">politique de confidentialité</a>.
        </p>

        <h2 id="droit">Droit applicable</h2>
        <p>
          Le présent site est soumis au droit français. Tout litige relatif à son utilisation
          relève de la compétence des tribunaux français.
        </p>

        <p className="text-[0.9rem]">
          <em>
            Note à l&apos;attention de l&apos;éditeur : les champs entre crochets doivent être
            complétés avant la mise en ligne publique du site.
          </em>
        </p>
      </div>
    </section>
  );
}
