import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { Mark } from "./Logo";
import { Arrow } from "./ui";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative mt-32 border-t border-ink-700/70 bg-ink-900/40">
      <div className="container-x py-16 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_2fr]">
          <div>
            <Link href="/" className="inline-flex items-center gap-2.5" aria-label="Agapante — accueil">
              <Mark className="h-8 w-8" />
              <span className="display text-[1.5rem] text-chalk">Agapante</span>
            </Link>
            <p className="mt-5 max-w-sm text-[0.95rem] leading-relaxed text-mute">
              Cabinet de conseil indépendant en déploiement de l&apos;intelligence artificielle.
              Nous aidons les TPE, PME, ETI et organisations publiques à passer des
              expérimentations aux usages réellement adoptés.
            </p>

            <div className="mt-8 space-y-2 text-[0.9rem] text-chalk-dim">
              <p>
                <span className="text-mute-dim">Écrire — </span>
                {siteConfig.contact.email}
              </p>
              <p>
                <span className="text-mute-dim">Appeler — </span>
                {siteConfig.contact.phone}
              </p>
              <p>
                <span className="text-mute-dim">Intervention — </span>
                {siteConfig.contact.areaServed}
              </p>
            </div>

            <Link
              href="/contact"
              className="group mt-8 inline-flex items-center gap-2 rounded-full border border-ink-600 px-5 py-3 text-[0.9rem] text-chalk transition-colors hover:border-iris-400/60 hover:bg-iris-400/[0.07]"
            >
              Démarrer une conversation
              <Arrow />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerNav.map((col) => (
              <div key={col.title}>
                <h3 className="eyebrow mb-4">{col.title}</h3>
                <ul className="flex flex-col gap-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="text-[0.88rem] text-mute transition-colors hover:text-chalk"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-ink-800 pt-8 text-[0.8rem] text-mute-dim sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {siteConfig.name}. Tous droits réservés.
          </p>
          <p className="max-w-lg sm:text-right">
            Site conçu pour être sobre : aucun traceur publicitaire, aucun cookie tiers.
          </p>
        </div>
      </div>
    </footer>
  );
}
