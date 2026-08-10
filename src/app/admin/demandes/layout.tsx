import Link from "next/link";
import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { Mark } from "@/components/Logo";
import { logout } from "../actions";

export const dynamic = "force-dynamic";

export default async function DemandesLayout({ children }: { children: React.ReactNode }) {
  if (!(await isAuthenticated())) redirect("/admin");

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-ink-700/80 bg-ink-950/90 backdrop-blur-xl">
        <div className="mx-auto flex h-16 w-full max-w-[92rem] items-center justify-between gap-6 px-6">
          <div className="flex items-center gap-8">
            <Link href="/admin/demandes" className="flex items-center gap-2.5">
              <Mark className="h-6 w-6" />
              <span className="display text-[1.15rem] text-chalk">Agapante</span>
              <span className="ml-1 rounded-full border border-ink-600 px-2.5 py-0.5 text-[0.66rem] uppercase tracking-[0.12em] text-mute">
                Back-office
              </span>
            </Link>
            <nav className="hidden items-center gap-1 sm:flex">
              <Link
                href="/admin/demandes"
                className="rounded-full px-3.5 py-1.5 text-[0.87rem] text-chalk-dim transition-colors hover:text-chalk"
              >
                Demandes
              </Link>
              <a
                href="/admin/export"
                className="rounded-full px-3.5 py-1.5 text-[0.87rem] text-chalk-dim transition-colors hover:text-chalk"
              >
                Export CSV
              </a>
              <Link
                href="/"
                className="rounded-full px-3.5 py-1.5 text-[0.87rem] text-chalk-dim transition-colors hover:text-chalk"
              >
                Voir le site
              </Link>
            </nav>
          </div>

          <form action={logout}>
            <button
              type="submit"
              className="rounded-full border border-ink-600 px-4 py-2 text-[0.84rem] text-chalk-dim transition-colors hover:border-iris-400/60 hover:text-chalk"
            >
              Déconnexion
            </button>
          </form>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[92rem] flex-1 px-6 py-10">{children}</div>
    </div>
  );
}
