import { isAuthenticated } from "@/lib/auth";
import { isDbConfigured, listLeads } from "@/lib/db";

export const dynamic = "force-dynamic";

function csvCell(value: unknown): string {
  const str = value === null || value === undefined ? "" : String(value);
  return `"${str.replace(/"/g, '""').replace(/\r?\n/g, " ")}"`;
}

export async function GET() {
  if (!(await isAuthenticated())) {
    return new Response("Non autorisé", { status: 401 });
  }
  if (!isDbConfigured()) {
    return new Response("Base de données non configurée", { status: 503 });
  }

  const leads = await listLeads();
  const header = [
    "id",
    "date",
    "nom",
    "email",
    "telephone",
    "organisation",
    "fonction",
    "type_structure",
    "besoin",
    "echeance",
    "statut",
    "page_origine",
    "message",
    "notes",
  ];

  const lines = [
    header.join(";"),
    ...leads.map((l) =>
      [
        l.id,
        new Date(l.created_at).toISOString(),
        l.name,
        l.email,
        l.phone,
        l.company,
        l.role,
        l.org_type,
        l.need,
        l.timeline,
        l.status,
        l.source_path,
        l.message,
        l.notes,
      ]
        .map(csvCell)
        .join(";")
    ),
  ];

  const date = new Date().toISOString().slice(0, 10);

  return new Response(`﻿${lines.join("\r\n")}`, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="agapante-demandes-${date}.csv"`,
      "Cache-Control": "no-store",
    },
  });
}
