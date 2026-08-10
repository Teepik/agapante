import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/ui";
import { buildMetadata } from "@/lib/seo";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = buildMetadata({
  title: "Politique de confidentialité",
  description:
    "Comment Agapante traite les données personnelles collectées via son site : finalités, base légale, durée de conservation, destinataires et droits des personnes.",
  path: "/politique-de-confidentialite",
});

export default function ConfidentialitePage() {
  return (
    <section className="container-x py-16 lg:py-24">
      <Breadcrumbs
        items={[
          { name: "Accueil", path: "/" },
          { name: "Confidentialité", path: "/politique-de-confidentialite" },
        ]}
      />
      <h1 className="display text-[clamp(2.2rem,5vw,3.6rem)] text-chalk">
        Politique de confidentialité
      </h1>

      <div className="prose-agapante mt-12 max-w-3xl">
        <p>
          Cette politique décrit la manière dont {siteConfig.legalName} traite les données
          personnelles collectées via le site {siteConfig.url}. Nous avons cherché à l&apos;écrire
          en français compréhensible plutôt qu&apos;en formulations juridiques opaques.
        </p>

        <h2 id="principe">Le principe général</h2>
        <p>
          Nous collectons le strict minimum, uniquement lorsque vous nous écrivez, et nous ne
          revendons ni ne cédons aucune donnée. Le site ne dépose aucun cookie publicitaire ni
          traceur tiers.
        </p>

        <h2 id="donnees">Données collectées</h2>
        <p>
          Via le formulaire de contact : nom, adresse e-mail, et de façon facultative téléphone,
          organisation, fonction, type de structure, nature du besoin, échéance envisagée, ainsi
          que le message que vous rédigez.
        </p>
        <p>
          Sont également enregistrés, à des fins de sécurité et de lutte contre les envois
          automatisés : la date de la demande, la page depuis laquelle elle a été envoyée, le
          navigateur utilisé et une empreinte non réversible de l&apos;adresse IP. Cette empreinte
          ne permet pas de reconstituer l&apos;adresse d&apos;origine.
        </p>

        <h2 id="finalites">Finalités et base légale</h2>
        <table>
          <thead>
            <tr>
              <th>Finalité</th>
              <th>Base légale</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Répondre à votre demande et échanger sur un projet</td>
              <td>Mesures précontractuelles prises à votre demande</td>
            </tr>
            <tr>
              <td>Assurer le suivi de la relation commerciale</td>
              <td>Intérêt légitime</td>
            </tr>
            <tr>
              <td>Prévenir les envois automatisés et les abus</td>
              <td>Intérêt légitime</td>
            </tr>
          </tbody>
        </table>

        <h2 id="destinataires">Destinataires</h2>
        <p>
          Les données sont accessibles uniquement aux personnes chargées du traitement des
          demandes au sein d&apos;Agapante. Elles sont stockées dans une base de données
          PostgreSQL hébergée en Europe. L&apos;hébergement du site est assuré par Vercel Inc.
        </p>
        <p>
          Si une notification par e-mail est activée, une copie du message peut transiter par un
          prestataire d&apos;envoi d&apos;e-mails, agissant en qualité de sous-traitant.
        </p>
        <p>
          Aucune donnée n&apos;est vendue, louée, cédée ou utilisée à des fins publicitaires.
        </p>

        <h2 id="duree">Durée de conservation</h2>
        <ul>
          <li>
            Demandes n&apos;ayant pas donné lieu à une relation commerciale : trois ans à compter
            du dernier contact.
          </li>
          <li>
            Demandes ayant abouti à une mission : durée de la relation contractuelle, puis
            conservation des documents comptables selon les obligations légales applicables.
          </li>
          <li>
            Données techniques de sécurité (empreinte d&apos;adresse IP, navigateur) : douze mois.
          </li>
        </ul>

        <h2 id="droits">Vos droits</h2>
        <p>
          Conformément au règlement général sur la protection des données, vous disposez d&apos;un
          droit d&apos;accès, de rectification, d&apos;effacement, de limitation, d&apos;opposition
          et de portabilité de vos données. Vous pouvez les exercer par simple e-mail à{" "}
          {siteConfig.contact.email}. Nous répondons sous un mois au plus.
        </p>
        <p>
          Vous avez également le droit d&apos;introduire une réclamation auprès de la Commission
          nationale de l&apos;informatique et des libertés (CNIL),{" "}
          <a href="https://www.cnil.fr">www.cnil.fr</a>.
        </p>

        <h2 id="cookies">Cookies</h2>
        <p>
          Ce site n&apos;utilise aucun cookie de mesure d&apos;audience, de publicité ou de
          traçage. Un unique cookie technique est déposé lors de la connexion à l&apos;espace
          d&apos;administration réservé à l&apos;éditeur du site ; il est strictement nécessaire au
          fonctionnement de cet espace et ne concerne pas les visiteurs.
        </p>

        <h2 id="securite">Sécurité</h2>
        <p>
          Les échanges avec le site sont chiffrés (HTTPS). L&apos;accès à la base de données est
          restreint et authentifié. L&apos;espace d&apos;administration est protégé par mot de
          passe et par une session signée cryptographiquement.
        </p>

        <h2 id="modifications">Modifications</h2>
        <p>
          Cette politique peut être mise à jour. La version en vigueur est celle publiée sur cette
          page.
        </p>
      </div>
    </section>
  );
}
