import Link from "next/link";
import { isDbConfigured, LEAD_STATUSES, leadStats, listLeads, type LeadStatus } from "@/lib/db";

export const dynamic = "force-dynamic";

type SearchParams = Promise<{ statut?: string; q?: string }>;

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function statusMeta(status: string) {
  return LEAD_STATUSES.find((s) => s.value === status) ?? LEAD_STATUSES[0];
}

export default async function DemandesPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  if (!isDbConfigured()) {
    return (
      <div className="surface-card mx-auto max-w-2xl p-8">
        <h1 className="display text-[1.8rem] text-chalk">Base de données non configurée</h1>
        <p className="mt-4 text-[0.95rem] leading-relaxed text-mute">
          La variable d&apos;environnement <code className="text-iris-300">DATABASE_URL</code>{" "}
          n&apos;est pas définie. Dans le tableau de bord Vercel, ouvrez le projet, onglet{" "}
          <strong className="text-chalk-dim">Storage</strong>, puis créez ou rattachez une base
          Postgres (Neon). La variable sera injectée automatiquement — il suffira ensuite de
          redéployer.
        </p>
        <p className="mt-4 text-[0.9rem] text-mute-dim">
          Le formulaire public affiche pendant ce temps un message invitant les visiteurs à écrire
          directement par e-mail : aucune demande n&apos;est perdue silencieusement.
        </p>
      </div>
    );
  }

  const status = (params.statut ?? "tous") as LeadStatus | "tous";
  const search = params.q ?? "";

  let leads: Awaited<ReturnType<typeof listLeads>> = [];
  let stats: { status: string; count: number }[] = [];
  let error: string | null = null;

  try {
    [leads, stats] = await Promise.all([listLeads({ status, search }), leadStats()]);
  } catch (e) {
    error = e instanceof Error ? e.message : "Erreur inconnue";
  }

  if (error) {
    return (
      <div className="surface-card mx-auto max-w-2xl p-8">
        <h1 className="display text-[1.8rem] text-chalk">Connexion à la base impossible</h1>
        <p className="mt-4 text-[0.92rem] leading-relaxed text-mute">{error}</p>
      </div>
    );
  }

  const total = stats.reduce((acc, s) => acc + s.count, 0);
  const countOf = (value: string) => stats.find((s) => s.status === value)?.count ?? 0;

  const buildHref = (nextStatus: string) => {
    const sp = new URLSearchParams();
    if (nextStatus !== "tous") sp.set("statut", nextStatus);
    if (search) sp.set("q", search);
    const qs = sp.toString();
    return `/admin/demandes${qs ? `?${qs}` : ""}`;
  };

  return (
    <div>
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="display text-[clamp(1.9rem,3.5vw,2.6rem)] text-chalk">
            Demandes de contact
          </h1>
          <p className="mt-2 text-[0.92rem] text-mute">
            {total} demande{total > 1 ? "s" : ""} enregistrée{total > 1 ? "s" : ""} au total
            {leads.length !== total ? ` — ${leads.length} affichée${leads.length > 1 ? "s" : ""}` : ""}
          </p>
        </div>

        <form className="flex w-full gap-2 lg:w-auto" action="/admin/demandes">
          {status !== "tous" ? <input type="hidden" name="statut" value={status} /> : null}
          <input
            type="search"
            name="q"
            defaultValue={search}
            placeholder="Rechercher un nom, un e-mail, une organisation…"
            className="w-full rounded-full border border-ink-600 bg-ink-900/70 px-5 py-2.5 text-[0.88rem] text-chalk placeholder:text-mute-dim focus:border-iris-400/70 focus:outline-none lg:w-96"
          />
          <button
            type="submit"
            className="shrink-0 rounded-full bg-chalk px-5 py-2.5 text-[0.86rem] font-medium text-ink-950 transition-colors hover:bg-iris-100"
          >
            Filtrer
          </button>
        </form>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        <Link
          href={buildHref("tous")}
          className={`rounded-full border px-4 py-2 text-[0.83rem] transition-colors ${
            status === "tous"
              ? "border-chalk bg-chalk text-ink-950"
              : "border-ink-600 text-chalk-dim hover:border-iris-400/50"
          }`}
        >
          Tous ({total})
        </Link>
        {LEAD_STATUSES.map((s) => (
          <Link
            key={s.value}
            href={buildHref(s.value)}
            className={`rounded-full border px-4 py-2 text-[0.83rem] transition-colors ${
              status === s.value
                ? "border-chalk bg-chalk text-ink-950"
                : `${s.tone} hover:opacity-80`
            }`}
          >
            {s.label} ({countOf(s.value)})
          </Link>
        ))}
      </div>

      {leads.length === 0 ? (
        <div className="surface-card mt-10 p-12 text-center">
          <p className="text-[1.05rem] text-chalk-dim">Aucune demande pour ce filtre.</p>
          <p className="mt-2 text-[0.9rem] text-mute">
            Les nouvelles demandes envoyées depuis la page contact apparaîtront ici
            automatiquement.
          </p>
        </div>
      ) : (
        <div className="mt-8 overflow-hidden rounded-[16px] border border-ink-700">
          <table className="w-full border-collapse text-left">
            <thead className="bg-ink-850">
              <tr className="text-[0.72rem] uppercase tracking-[0.12em] text-mute-dim">
                <th className="px-5 py-3.5 font-medium">Reçue le</th>
                <th className="px-5 py-3.5 font-medium">Contact</th>
                <th className="hidden px-5 py-3.5 font-medium md:table-cell">Organisation</th>
                <th className="hidden px-5 py-3.5 font-medium lg:table-cell">Besoin</th>
                <th className="px-5 py-3.5 font-medium">Statut</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-ink-800">
              {leads.map((lead) => {
                const meta = statusMeta(lead.status);
                return (
                  <tr key={lead.id} className="transition-colors hover:bg-ink-900/60">
                    <td className="px-5 py-4 align-top text-[0.83rem] text-mute">
                      <Link href={`/admin/demandes/${lead.id}`} className="block">
                        {formatDateTime(lead.created_at)}
                      </Link>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <Link href={`/admin/demandes/${lead.id}`} className="block">
                        <span className="block text-[0.95rem] font-medium text-chalk">
                          {lead.name}
                        </span>
                        <span className="mt-0.5 block text-[0.83rem] text-mute">{lead.email}</span>
                        <span className="mt-2 line-clamp-2 block max-w-md text-[0.82rem] leading-relaxed text-mute-dim md:hidden">
                          {lead.message}
                        </span>
                      </Link>
                    </td>
                    <td className="hidden px-5 py-4 align-top md:table-cell">
                      <Link href={`/admin/demandes/${lead.id}`} className="block">
                        <span className="block text-[0.88rem] text-chalk-dim">
                          {lead.company ?? "—"}
                        </span>
                        <span className="mt-0.5 block text-[0.8rem] text-mute-dim">
                          {lead.org_type ?? ""}
                        </span>
                      </Link>
                    </td>
                    <td className="hidden px-5 py-4 align-top lg:table-cell">
                      <Link href={`/admin/demandes/${lead.id}`} className="block">
                        <span className="block text-[0.85rem] text-chalk-dim">
                          {lead.need ?? "—"}
                        </span>
                        <span className="mt-0.5 block text-[0.8rem] text-mute-dim">
                          {lead.timeline ?? ""}
                        </span>
                      </Link>
                    </td>
                    <td className="px-5 py-4 align-top">
                      <Link href={`/admin/demandes/${lead.id}`}>
                        <span
                          className={`inline-block rounded-full border px-3 py-1 text-[0.75rem] ${meta.tone}`}
                        >
                          {meta.label}
                        </span>
                      </Link>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
