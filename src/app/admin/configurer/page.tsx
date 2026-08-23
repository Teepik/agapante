import Link from "next/link";
import type { Metadata } from "next";
import { Mark } from "@/components/Logo";
import { canUseBootstrapToken } from "@/lib/auth";
import { ConfigureForm } from "./ConfigureForm";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Configuration admin",
  robots: { index: false, follow: false },
};

type SearchParams = Promise<{ jeton?: string }>;

export default async function AdminConfigurePage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const token = params.jeton?.trim() ?? "";

  if (!(await canUseBootstrapToken(token))) {
    return (
      <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
        <div className="aurora" />
        <div className="grid-veil" />
        <div className="relative z-10 flex w-full max-w-md flex-col items-center">
          <Link href="/" className="mb-8 flex items-center gap-2.5" aria-label="Retour au site">
            <Mark className="h-7 w-7" />
            <span className="display text-[1.3rem] text-chalk">Agapante</span>
          </Link>
          <div className="surface-card w-full max-w-md p-8">
            <h1 className="display text-[1.9rem] text-chalk">Accès refusé</h1>
            <p className="mt-3 text-[0.92rem] leading-relaxed text-mute">
              Ce lien de configuration n&apos;est pas valide ou a expiré. Contactez l&apos;équipe
              qui gère le déploiement pour obtenir un nouveau jeton.
            </p>
          </div>
          <Link
            href="/admin"
            className="mt-8 text-[0.85rem] text-mute transition-colors hover:text-chalk-dim"
          >
            ← Retour à la connexion
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden px-6 py-16">
      <div className="aurora" />
      <div className="grid-veil" />
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        <Link href="/" className="mb-8 flex items-center gap-2.5" aria-label="Retour au site">
          <Mark className="h-7 w-7" />
          <span className="display text-[1.3rem] text-chalk">Agapante</span>
        </Link>
        <ConfigureForm token={token} />
        <Link
          href="/admin"
          className="mt-8 text-[0.85rem] text-mute transition-colors hover:text-chalk-dim"
        >
          ← Retour à la connexion
        </Link>
      </div>
    </div>
  );
}
