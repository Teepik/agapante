import "server-only";
import { neon, type NeonQueryFunction } from "@neondatabase/serverless";

export type LeadStatus = "nouveau" | "en_cours" | "qualifie" | "gagne" | "clos";

export const LEAD_STATUSES: { value: LeadStatus; label: string; tone: string }[] = [
  { value: "nouveau", label: "Nouveau", tone: "text-iris-300 border-iris-400/40 bg-iris-400/10" },
  { value: "en_cours", label: "En cours", tone: "text-amber-sig border-amber-sig/40 bg-amber-sig/10" },
  { value: "qualifie", label: "Qualifié", tone: "text-sage-400 border-sage-400/40 bg-sage-400/10" },
  { value: "gagne", label: "Gagné", tone: "text-sage-400 border-sage-400/60 bg-sage-400/20" },
  { value: "clos", label: "Clos", tone: "text-mute border-ink-600 bg-ink-800" },
];

export type Lead = {
  id: number;
  created_at: string;
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  phone: string | null;
  org_type: string | null;
  headcount: string | null;
  need: string | null;
  timeline: string | null;
  message: string;
  source_path: string | null;
  referer: string | null;
  status: LeadStatus;
  notes: string | null;
  ip_hash: string | null;
  user_agent: string | null;
};

export function isDbConfigured(): boolean {
  return Boolean(process.env.DATABASE_URL);
}

let cachedSql: NeonQueryFunction<false, false> | null = null;

export function getSql(): NeonQueryFunction<false, false> {
  const url = process.env.DATABASE_URL;
  if (!url) {
    throw new Error(
      "DATABASE_URL n'est pas configurée. Ajoutez une base Postgres (Neon) au projet Vercel."
    );
  }
  if (!cachedSql) cachedSql = neon(url);
  return cachedSql;
}

let schemaReady: Promise<void> | null = null;

export function ensureSchema(): Promise<void> {
  if (!schemaReady) {
    schemaReady = (async () => {
      const sql = getSql();
      await sql`
        CREATE TABLE IF NOT EXISTS leads (
          id            SERIAL PRIMARY KEY,
          created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
          name          TEXT        NOT NULL,
          email         TEXT        NOT NULL,
          company       TEXT,
          role          TEXT,
          phone         TEXT,
          org_type      TEXT,
          headcount     TEXT,
          need          TEXT,
          timeline      TEXT,
          message       TEXT        NOT NULL,
          source_path   TEXT,
          referer       TEXT,
          status        TEXT        NOT NULL DEFAULT 'nouveau',
          notes         TEXT,
          ip_hash       TEXT,
          user_agent    TEXT
        )
      `;
      await sql`CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC)`;
      await sql`CREATE INDEX IF NOT EXISTS leads_status_idx ON leads (status)`;
      await sql`
        CREATE TABLE IF NOT EXISTS admin_credentials (
          id            SMALLINT PRIMARY KEY DEFAULT 1 CHECK (id = 1),
          password_hash TEXT        NOT NULL,
          updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
        )
      `;
    })().catch((error) => {
      schemaReady = null;
      throw error;
    });
  }
  return schemaReady;
}

export async function insertLead(input: {
  name: string;
  email: string;
  company: string | null;
  role: string | null;
  phone: string | null;
  org_type: string | null;
  headcount: string | null;
  need: string | null;
  timeline: string | null;
  message: string;
  source_path: string | null;
  referer: string | null;
  ip_hash: string | null;
  user_agent: string | null;
}): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    INSERT INTO leads (
      name, email, company, role, phone, org_type, headcount,
      need, timeline, message, source_path, referer, ip_hash, user_agent
    ) VALUES (
      ${input.name}, ${input.email}, ${input.company}, ${input.role}, ${input.phone},
      ${input.org_type}, ${input.headcount}, ${input.need}, ${input.timeline},
      ${input.message}, ${input.source_path}, ${input.referer}, ${input.ip_hash}, ${input.user_agent}
    )
    RETURNING id
  `) as { id: number }[];
  return rows[0].id;
}

export async function countRecentByIp(ipHash: string, minutes = 10): Promise<number> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT COUNT(*)::int AS count
    FROM leads
    WHERE ip_hash = ${ipHash}
      AND created_at > now() - (${minutes} * INTERVAL '1 minute')
  `) as { count: number }[];
  return rows[0]?.count ?? 0;
}

export async function listLeads(filter?: {
  status?: LeadStatus | "tous";
  search?: string;
}): Promise<Lead[]> {
  await ensureSchema();
  const sql = getSql();
  const status = filter?.status && filter.status !== "tous" ? filter.status : null;
  const search = filter?.search?.trim() ? `%${filter.search.trim()}%` : null;

  const rows = (await sql`
    SELECT * FROM leads
    WHERE (${status}::text IS NULL OR status = ${status})
      AND (
        ${search}::text IS NULL
        OR name ILIKE ${search}
        OR email ILIKE ${search}
        OR COALESCE(company, '') ILIKE ${search}
        OR message ILIKE ${search}
      )
    ORDER BY created_at DESC
    LIMIT 500
  `) as unknown as Lead[];
  return rows;
}

export async function getLead(id: number): Promise<Lead | null> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`SELECT * FROM leads WHERE id = ${id} LIMIT 1`) as unknown as Lead[];
  return rows[0] ?? null;
}

export async function updateLeadStatus(id: number, status: LeadStatus): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`UPDATE leads SET status = ${status} WHERE id = ${id}`;
}

export async function updateLeadNotes(id: number, notes: string): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`UPDATE leads SET notes = ${notes} WHERE id = ${id}`;
}

export async function deleteLead(id: number): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`DELETE FROM leads WHERE id = ${id}`;
}

export async function deleteLeads(ids: number[]): Promise<number> {
  const unique = [...new Set(ids.filter((id) => Number.isFinite(id) && id > 0))];
  if (unique.length === 0) return 0;
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    DELETE FROM leads WHERE id = ANY(${unique}::int[]) RETURNING id
  `) as { id: number }[];
  return rows.length;
}

export async function leadStats(): Promise<{ status: string; count: number }[]> {
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT status, COUNT(*)::int AS count FROM leads GROUP BY status
  `) as { status: string; count: number }[];
  return rows;
}

export async function getAdminPasswordHash(): Promise<string | null> {
  if (!isDbConfigured()) return null;
  await ensureSchema();
  const sql = getSql();
  const rows = (await sql`
    SELECT password_hash FROM admin_credentials WHERE id = 1 LIMIT 1
  `) as { password_hash: string }[];
  return rows[0]?.password_hash ?? null;
}

export async function setAdminPasswordHash(passwordHash: string): Promise<void> {
  await ensureSchema();
  const sql = getSql();
  await sql`
    INSERT INTO admin_credentials (id, password_hash, updated_at)
    VALUES (1, ${passwordHash}, now())
    ON CONFLICT (id) DO UPDATE
    SET password_hash = EXCLUDED.password_hash,
        updated_at = now()
  `;
}
