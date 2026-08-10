import Link from "next/link";
import { notFound } from "next/navigation";
import { getLead, LEAD_STATUSES } from "@/lib/db";
import { removeLead, saveNotes, setStatus } from "../../actions";

export const dynamic = "force-dynamic";

type Params = { params: Promise<{ id: string }> };

function formatDateTime(value: string) {
  return new Date(value).toLocaleString("fr-FR", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function LeadDetailPage({ params }: Params) {
  const { id } = await params;
  const leadId = Number(id);
  if (!Number.isFinite(leadId)) notFound();

  const lead = await getLead(leadId);
  if (!lead) notFound();

  const meta = LEAD_STATUSES.find((s) => s.value === lead.status) ?? LEAD_STATUSES[0];

  const rows = [
    { k: "Reçue le", v: formatDateTime(lead.created_at) },
    { k: "Nom", v: lead.name },
    { k: "E-mail", v: lead.email },
    { k: "Téléphone", v: lead.phone ?? "—" },
    { k: "Organisation", v: lead.company ?? "—" },
    { k: "Fonction", v: lead.role ?? "—" },
    { k: "Type de structure", v: lead.org_type ?? "—" },
    { k: "Besoin exprimé", v: lead.need ?? "—" },
    { k: "Échéance", v: lead.timeline ?? "—" },
    { k: "Page d'origine", v: lead.source_path ?? "—" },
  ];

  const mailto = `mailto:${lead.email}?subject=${encodeURIComponent(
    "Votre demande auprès d'Agapante"
  )}&body=${encodeURIComponent(`Bonjour ${lead.name.split(" ")[0]},\n\n`)}`;

  return (
    <div>
      <Link
        href="/admin/demandes"
        className="text-[0.85rem] text-mute transition-colors hover:text-chalk-dim"
      >
        ← Toutes les demandes
      </Link>

      <div className="mt-6 flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
        <div>
          <h1 className="display text-[clamp(1.9rem,3.5vw,2.6rem)] text-chalk">{lead.name}</h1>
          <p className="mt-2 text-[0.95rem] text-mute">
            {lead.company ? `${lead.company} — ` : ""}
            <a href={`mailto:${lead.email}`} className="text-iris-300 hover:underline">
              {lead.email}
            </a>
            {lead.phone ? ` — ${lead.phone}` : ""}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <span className={`rounded-full border px-3.5 py-1.5 text-[0.8rem] ${meta.tone}`}>
            {meta.label}
          </span>
          <a
            href={mailto}
            className="rounded-full bg-chalk px-5 py-2.5 text-[0.86rem] font-medium text-ink-950 transition-colors hover:bg-iris-100"
          >
            Répondre par e-mail
          </a>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
        <div className="flex flex-col gap-6">
          <div className="surface-card p-7">
            <h2 className="eyebrow mb-5">Message</h2>
            <p className="whitespace-pre-wrap text-[1rem] leading-relaxed text-chalk-dim">
              {lead.message}
            </p>
          </div>

          <form action={saveNotes} className="surface-card p-7">
            <input type="hidden" name="id" value={lead.id} />
            <h2 className="eyebrow mb-5">Notes internes</h2>
            <textarea
              name="notes"
              rows={7}
              defaultValue={lead.notes ?? ""}
              placeholder="Compte rendu d'appel, prochaine action, contexte…"
              className="w-full resize-y rounded-[12px] border border-ink-600 bg-ink-900/70 px-4 py-3 text-[0.94rem] text-chalk placeholder:text-mute-dim focus:border-iris-400/70 focus:outline-none"
            />
            <button
              type="submit"
              className="mt-4 rounded-full border border-ink-600 px-5 py-2.5 text-[0.86rem] text-chalk transition-colors hover:border-iris-400/60 hover:bg-iris-400/[0.07]"
            >
              Enregistrer les notes
            </button>
          </form>
        </div>

        <div className="flex flex-col gap-6">
          <div className="surface-card p-7">
            <h2 className="eyebrow mb-5">Statut</h2>
            <div className="flex flex-wrap gap-2">
              {LEAD_STATUSES.map((s) => (
                <form key={s.value} action={setStatus}>
                  <input type="hidden" name="id" value={lead.id} />
                  <input type="hidden" name="status" value={s.value} />
                  <button
                    type="submit"
                    className={`rounded-full border px-4 py-2 text-[0.82rem] transition-opacity ${
                      lead.status === s.value
                        ? "border-chalk bg-chalk text-ink-950"
                        : `${s.tone} hover:opacity-80`
                    }`}
                  >
                    {s.label}
                  </button>
                </form>
              ))}
            </div>
          </div>

          <div className="surface-card p-7">
            <h2 className="eyebrow mb-5">Informations</h2>
            <dl className="flex flex-col divide-y divide-ink-800">
              {rows.map((row) => (
                <div key={row.k} className="flex flex-col gap-1 py-3 first:pt-0 last:pb-0">
                  <dt className="text-[0.72rem] uppercase tracking-[0.12em] text-mute-dim">
                    {row.k}
                  </dt>
                  <dd className="break-words text-[0.92rem] text-chalk-dim">{row.v}</dd>
                </div>
              ))}
            </dl>
          </div>

          <form action={removeLead} className="rounded-[16px] border border-ink-700 p-6">
            <input type="hidden" name="id" value={lead.id} />
            <h2 className="text-[0.92rem] font-medium text-chalk">Supprimer définitivement</h2>
            <p className="mt-2 text-[0.84rem] leading-relaxed text-mute">
              À utiliser pour honorer une demande de suppression des données. L&apos;action est
              irréversible.
            </p>
            <button
              type="submit"
              className="mt-4 rounded-full border border-amber-sig/40 px-5 py-2.5 text-[0.84rem] text-amber-sig transition-colors hover:bg-amber-sig/10"
            >
              Supprimer cette demande
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
