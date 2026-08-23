import Link from "next/link";
import { Mark } from "@/components/Logo";
import { logout } from "@/app/admin/actions";

type Props = {
  active: "demandes" | "vitrine";
  children: React.ReactNode;
};

const tabCls = (active: boolean) =>
  `shrink-0 rounded-full px-4 py-2 text-[0.86rem] font-medium transition-colors ${
    active
      ? "bg-chalk text-ink-950"
      : "border border-ink-600 text-chalk-dim hover:border-iris-400/50 hover:text-chalk"
  }`;

export function AdminShell({ active, children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 border-b border-ink-700/80 bg-ink-950/90 backdrop-blur-xl">
        <div className="mx-auto w-full max-w-[92rem] px-4 sm:px-6">
          <div className="flex h-16 items-center justify-between gap-4">
            <Link href="/admin/demandes" className="flex min-w-0 items-center gap-2.5">
              <Mark className="h-6 w-6 shrink-0" />
              <span className="display truncate text-[1.15rem] text-chalk">Agapante</span>
              <span className="hidden rounded-full border border-ink-600 px-2.5 py-0.5 text-[0.66rem] uppercase tracking-[0.12em] text-mute sm:inline">
                Back-office
              </span>
            </Link>

            <form action={logout}>
              <button
                type="submit"
                className="shrink-0 rounded-full border border-ink-600 px-4 py-2 text-[0.84rem] text-chalk-dim transition-colors hover:border-iris-400/60 hover:text-chalk"
              >
                Déconnexion
              </button>
            </form>
          </div>

          <div className="flex flex-col gap-3 border-t border-ink-800/80 py-3 sm:flex-row sm:items-center sm:justify-between">
            <nav
              className="flex gap-2 overflow-x-auto pb-0.5 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              aria-label="Sections du back-office"
            >
              <Link href="/admin/demandes" className={tabCls(active === "demandes")}>
                Demandes
              </Link>
              <Link href="/admin/vitrine" className={tabCls(active === "vitrine")}>
                Vitrine
              </Link>
            </nav>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-[0.82rem]">
              <a href="/admin/export" className="text-mute transition-colors hover:text-chalk-dim">
                Export CSV
              </a>
              <Link
                href="/vitrine"
                target="_blank"
                className="text-mute transition-colors hover:text-chalk-dim"
              >
                Voir la vitrine ↗
              </Link>
              <Link href="/" className="text-mute transition-colors hover:text-chalk-dim">
                Site public
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto w-full max-w-[92rem] flex-1 px-4 py-8 sm:px-6 sm:py-10">{children}</div>
    </div>
  );
}
