import "server-only";
import { neon, neonConfig, type NeonQueryFunction } from "@neondatabase/serverless";
import { randomUUID } from "node:crypto";

/**
 * Données de l'Atlas immobilier (tables préfixées `atlas_` dans la base Neon du site).
 * Le schéma est créé au premier appel : aucune migration à lancer.
 */

let cached: NeonQueryFunction<false, false> | null = null;
function sqlClient() {
  const url = process.env.DATABASE_URL;
  if (!url) throw new Error("DATABASE_URL n'est pas configurée.");
  if (!cached) {
    // Tests locaux : point d'entrée HTTP alternatif (émulation du protocole Neon).
    if (process.env.NEON_FETCH_ENDPOINT) neonConfig.fetchEndpoint = process.env.NEON_FETCH_ENDPOINT;
    cached = neon(url);
  }
  return cached;
}

const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS atlas_users (
    id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL, name TEXT NOT NULL,
    ip_hash TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now(), last_login_at TIMESTAMPTZ)`,
  `CREATE TABLE IF NOT EXISTS atlas_annonces (
    user_id TEXT NOT NULL REFERENCES atlas_users(id) ON DELETE CASCADE, id TEXT NOT NULL,
    data JSONB NOT NULL, statut TEXT NOT NULL DEFAULT 'active',
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
    PRIMARY KEY (user_id, id))`,
  `CREATE INDEX IF NOT EXISTS atlas_annonces_user ON atlas_annonces(user_id, updated_at DESC)`,
];

let ready: Promise<void> | null = null;
function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      const sql = sqlClient();
      for (const stmt of SCHEMA) await sql.query(stmt);
    })().catch(e => { ready = null; throw e; });
  }
  return ready;
}

export async function q<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  await ensureSchema();
  return (await sqlClient().query(text, params)) as T[];
}
export async function one<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T | undefined> {
  return (await q<T>(text, params))[0];
}
export const uid = () => randomUUID();

export type AtlasUser = { id: string; email: string; name: string; password_hash: string };
export type Annonce = Record<string, unknown> & { id: string; statut?: string };

export const MAX_ANNONCES = 2000;
