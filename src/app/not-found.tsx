import Link from "next/link";
import { Button } from "@/components/ui";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden">
      <div className="aurora" />
      <div className="grid-veil" />
      <div className="container-x relative z-10 flex min-h-[70vh] flex-col justify-center py-24">
        <p className="eyebrow mb-6">Erreur 404</p>
        <h1 className="display max-w-[16ch] text-[clamp(2.4rem,6vw,4.4rem)] text-chalk">
          Cette page n&apos;existe pas — ou plus.
        </h1>
        <p className="mt-7 max-w-xl text-[1.05rem] leading-relaxed text-mute">
          Le lien est peut-être obsolète. Vous trouverez sans doute ce que vous cherchez dans les
          pages ci-dessous.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Button href="/">Retour à l&apos;accueil</Button>
          <Button href="/plan-du-site" variant="ghost">
            Plan du site
          </Button>
        </div>
        <div className="mt-14 flex flex-wrap gap-3">
          {[
            { label: "Expertises", href: "/expertises" },
            { label: "Secteurs", href: "/secteurs" },
            { label: "Méthode", href: "/methode" },
            { label: "Ressources", href: "/ressources" },
            { label: "Contact", href: "/contact" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="rounded-full border border-ink-600 px-5 py-2.5 text-[0.88rem] text-chalk-dim transition-colors hover:border-iris-400/60 hover:text-chalk"
            >
              {l.label}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
