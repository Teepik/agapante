"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useMemo, useState, useTransition } from "react";
import { removeLeadById, removeLeads } from "../actions";

type LeadRow = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  org_type: string | null;
  need: string | null;
  timeline: string | null;
  message: string;
  status: string;
  statusLabel: string;
  statusTone: string;
  createdLabel: string;
};

function confirmDelete(count: number): boolean {
  const noun = count > 1 ? "demandes" : "demande";
  return window.confirm(
    `Supprimer définitivement ${count} ${noun} ? Cette action est irréversible.`
  );
}

export function LeadListTable({ leads }: { leads: LeadRow[] }) {
  const router = useRouter();
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [pending, startTransition] = useTransition();

  const allSelected = leads.length > 0 && selected.size === leads.length;
  const selectedCount = selected.size;

  const selectedIds = useMemo(() => [...selected], [selected]);

  function toggleAll() {
    setSelected(allSelected ? new Set() : new Set(leads.map((lead) => lead.id)));
  }

  function toggleOne(id: number) {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  function deleteOne(id: number) {
    if (!confirmDelete(1)) return;
    startTransition(async () => {
      const formData = new FormData();
      formData.set("id", String(id));
      await removeLeadById(formData);
      router.refresh();
    });
  }

  function deleteSelected() {
    if (selectedCount === 0 || !confirmDelete(selectedCount)) return;
    startTransition(async () => {
      const formData = new FormData();
      selectedIds.forEach((id) => formData.append("ids", String(id)));
      await removeLeads(formData);
      setSelected(new Set());
      router.refresh();
    });
  }

  return (
    <div className="mt-8">
      {selectedCount > 0 ? (
        <div className="mb-4 flex flex-wrap items-center gap-3 rounded-[12px] border border-amber-sig/30 bg-amber-sig/[0.06] px-4 py-3">
          <span className="text-[0.86rem] text-chalk-dim">
            {selectedCount} demande{selectedCount > 1 ? "s" : ""} sélectionnée
            {selectedCount > 1 ? "s" : ""}
          </span>
          <button
            type="button"
            disabled={pending}
            onClick={deleteSelected}
            className="rounded-full border border-amber-sig/40 px-4 py-2 text-[0.84rem] text-amber-sig transition-colors hover:bg-amber-sig/10 disabled:opacity-60"
          >
            Supprimer la sélection
          </button>
        </div>
      ) : null}

      <div className="overflow-hidden rounded-[16px] border border-ink-700">
        <table className="w-full border-collapse text-left">
          <thead className="bg-ink-850">
            <tr className="text-[0.72rem] uppercase tracking-[0.12em] text-mute-dim">
              <th className="w-10 px-4 py-3.5 font-medium">
                <input
                  type="checkbox"
                  checked={allSelected}
                  onChange={toggleAll}
                  aria-label="Tout sélectionner"
                  className="h-4 w-4 rounded border-ink-600 bg-ink-900 accent-iris-400"
                />
              </th>
              <th className="px-5 py-3.5 font-medium">Reçue le</th>
              <th className="px-5 py-3.5 font-medium">Contact</th>
              <th className="hidden px-5 py-3.5 font-medium md:table-cell">Organisation</th>
              <th className="hidden px-5 py-3.5 font-medium lg:table-cell">Besoin</th>
              <th className="px-5 py-3.5 font-medium">Statut</th>
              <th className="px-4 py-3.5 font-medium">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink-800">
            {leads.map((lead) => (
              <tr key={lead.id} className="transition-colors hover:bg-ink-900/60">
                <td className="px-4 py-4 align-top">
                  <input
                    type="checkbox"
                    checked={selected.has(lead.id)}
                    onChange={() => toggleOne(lead.id)}
                    aria-label={`Sélectionner ${lead.name}`}
                    className="h-4 w-4 rounded border-ink-600 bg-ink-900 accent-iris-400"
                  />
                </td>
                <td className="px-5 py-4 align-top text-[0.83rem] text-mute">
                  <Link href={`/admin/demandes/${lead.id}`} className="block">
                    {lead.createdLabel}
                  </Link>
                </td>
                <td className="px-5 py-4 align-top">
                  <Link href={`/admin/demandes/${lead.id}`} className="block">
                    <span className="block text-[0.95rem] font-medium text-chalk">{lead.name}</span>
                    <span className="mt-0.5 block text-[0.83rem] text-mute">{lead.email}</span>
                    <span className="mt-2 line-clamp-2 block max-w-md text-[0.82rem] leading-relaxed text-mute-dim md:hidden">
                      {lead.message}
                    </span>
                  </Link>
                </td>
                <td className="hidden px-5 py-4 align-top md:table-cell">
                  <Link href={`/admin/demandes/${lead.id}`} className="block">
                    <span className="block text-[0.88rem] text-chalk-dim">{lead.company ?? "—"}</span>
                    <span className="mt-0.5 block text-[0.8rem] text-mute-dim">{lead.org_type ?? ""}</span>
                  </Link>
                </td>
                <td className="hidden px-5 py-4 align-top lg:table-cell">
                  <Link href={`/admin/demandes/${lead.id}`} className="block">
                    <span className="block text-[0.85rem] text-chalk-dim">{lead.need ?? "—"}</span>
                    <span className="mt-0.5 block text-[0.8rem] text-mute-dim">{lead.timeline ?? ""}</span>
                  </Link>
                </td>
                <td className="px-5 py-4 align-top">
                  <Link href={`/admin/demandes/${lead.id}`}>
                    <span
                      className={`inline-block rounded-full border px-3 py-1 text-[0.75rem] ${lead.statusTone}`}
                    >
                      {lead.statusLabel}
                    </span>
                  </Link>
                </td>
                <td className="px-4 py-4 align-top">
                  <button
                    type="button"
                    disabled={pending}
                    onClick={() => deleteOne(lead.id)}
                    className="rounded-full border border-ink-600 px-3 py-1.5 text-[0.78rem] text-mute transition-colors hover:border-amber-sig/40 hover:text-amber-sig disabled:opacity-60"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
