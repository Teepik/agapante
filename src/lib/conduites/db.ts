import "server-only";
import { neon, neonConfig, type NeonQueryFunction } from "@neondatabase/serverless";
import { randomUUID, randomBytes } from "node:crypto";

/**
 * Accès aux données de Conduites (tables préfixées `conduites_` dans la base Neon du site).
 * Le schéma est créé au premier appel ; le groupe Liesse et son planning de rentrée sont importés si la base est vide.
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

let ready: Promise<void> | null = null;
export function ensureSchema(): Promise<void> {
  if (!ready) {
    ready = (async () => {
      const sql = sqlClient();
      for (const stmt of SCHEMA) await sql.query(stmt);
      await seedIfEmpty();
      await backfillPassengers();
    })().catch(e => { ready = null; throw e; });
  }
  return ready;
}

/** Requête paramétrée ($1, $2…) ; renvoie les lignes. */
export async function q<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T[]> {
  await ensureSchema();
  return (await sqlClient().query(text, params)) as T[];
}
export async function one<T = Record<string, unknown>>(text: string, params: unknown[] = []): Promise<T | undefined> {
  return (await q<T>(text, params))[0];
}
export async function count(text: string, params: unknown[] = []): Promise<number> {
  const r = await one<{ n: number | string }>(text, params);
  return Number(r?.n ?? 0);
}

export const uid = () => randomUUID();
export const newToken = () => randomBytes(24).toString("base64url");

/** Code d'invitation lisible : 6 caractères sans ambiguïté (pas de 0/O, 1/I). */
export function inviteCode(): string {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  return [...randomBytes(6)].map(b => alphabet[b % alphabet.length]).join("");
}
export function slugify(s: string): string {
  return s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "").slice(0, 40) || "groupe";
}

// ---- Schéma ----
const SCHEMA = [
  `CREATE TABLE IF NOT EXISTS conduites_users (
    id TEXT PRIMARY KEY, email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
    first_name TEXT NOT NULL, last_name TEXT NOT NULL, phone TEXT, seats INT NOT NULL DEFAULT 5,
    notify BOOLEAN NOT NULL DEFAULT TRUE, ical_token TEXT UNIQUE, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS conduites_groups (
    id TEXT PRIMARY KEY, name TEXT NOT NULL, slug TEXT NOT NULL UNIQUE, invite_code TEXT NOT NULL UNIQUE, destination TEXT,
    created_by TEXT REFERENCES conduites_users(id) ON DELETE SET NULL, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`,
  `CREATE TABLE IF NOT EXISTS conduites_memberships (
    id TEXT PRIMARY KEY, group_id TEXT NOT NULL REFERENCES conduites_groups(id) ON DELETE CASCADE,
    user_id TEXT NOT NULL REFERENCES conduites_users(id) ON DELETE CASCADE, role TEXT NOT NULL DEFAULT 'member',
    joined_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(group_id, user_id))`,
  `CREATE TABLE IF NOT EXISTS conduites_children (
    id TEXT PRIMARY KEY, membership_id TEXT NOT NULL REFERENCES conduites_memberships(id) ON DELETE CASCADE,
    first_name TEXT NOT NULL, travels TEXT NOT NULL DEFAULT 'both')`,
  `CREATE TABLE IF NOT EXISTS conduites_trips (
    id TEXT PRIMARY KEY, group_id TEXT NOT NULL REFERENCES conduites_groups(id) ON DELETE CASCADE,
    date DATE NOT NULL, direction TEXT NOT NULL,
    driver_membership_id TEXT REFERENCES conduites_memberships(id) ON DELETE SET NULL, driver_name TEXT,
    seats INT, weight INT NOT NULL DEFAULT 1, comment TEXT, cancelled BOOLEAN NOT NULL DEFAULT FALSE,
    UNIQUE(group_id, date, direction))`,
  `CREATE TABLE IF NOT EXISTS conduites_absences (
    id TEXT PRIMARY KEY, trip_id TEXT NOT NULL REFERENCES conduites_trips(id) ON DELETE CASCADE,
    child_id TEXT NOT NULL REFERENCES conduites_children(id) ON DELETE CASCADE, UNIQUE(trip_id, child_id))`,
  `CREATE TABLE IF NOT EXISTS conduites_notifications (
    id TEXT PRIMARY KEY, trip_id TEXT NOT NULL REFERENCES conduites_trips(id) ON DELETE CASCADE,
    kind TEXT NOT NULL, sent_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(trip_id, kind))`,
  `CREATE TABLE IF NOT EXISTS conduites_settlements (
    id TEXT PRIMARY KEY, group_id TEXT NOT NULL REFERENCES conduites_groups(id) ON DELETE CASCADE,
    from_membership_id TEXT NOT NULL REFERENCES conduites_memberships(id) ON DELETE CASCADE,
    to_membership_id TEXT NOT NULL REFERENCES conduites_memberships(id) ON DELETE CASCADE,
    amount NUMERIC(10,2) NOT NULL, note TEXT, created_at TIMESTAMPTZ NOT NULL DEFAULT now())`,
  `ALTER TABLE conduites_groups ADD COLUMN IF NOT EXISTS cost_per_point NUMERIC(10,2) NOT NULL DEFAULT 0`,
  `ALTER TABLE conduites_groups ADD COLUMN IF NOT EXISTS split TEXT NOT NULL DEFAULT 'family'`,
  `ALTER TABLE conduites_trips ADD COLUMN IF NOT EXISTS departure_time TEXT`,
  `ALTER TABLE conduites_trips ADD COLUMN IF NOT EXISTS departure_place TEXT`,
  `ALTER TABLE conduites_trips ADD COLUMN IF NOT EXISTS done BOOLEAN NOT NULL DEFAULT FALSE`,
  `ALTER TABLE conduites_trips ADD COLUMN IF NOT EXISTS cost NUMERIC(10,2)`,
  `CREATE TABLE IF NOT EXISTS conduites_passengers (
    id TEXT PRIMARY KEY, trip_id TEXT NOT NULL REFERENCES conduites_trips(id) ON DELETE CASCADE,
    child_id TEXT NOT NULL REFERENCES conduites_children(id) ON DELETE CASCADE,
    created_at TIMESTAMPTZ NOT NULL DEFAULT now(), UNIQUE(trip_id, child_id))`,
  `CREATE INDEX IF NOT EXISTS conduites_passengers_trip ON conduites_passengers(trip_id)`,
  `ALTER TABLE conduites_trips ADD COLUMN IF NOT EXISTS extra NUMERIC(10,2) NOT NULL DEFAULT 0`,
  `ALTER TABLE conduites_trips ADD COLUMN IF NOT EXISTS extra_note TEXT`,
  `ALTER TABLE conduites_memberships ADD COLUMN IF NOT EXISTS left_at TIMESTAMPTZ`,
  `CREATE INDEX IF NOT EXISTS conduites_trips_group_date ON conduites_trips(group_id, date)`,
  `CREATE INDEX IF NOT EXISTS conduites_memberships_user ON conduites_memberships(user_id)`,
];

/** Première mise en service des inscriptions : les enfants existants sont inscrits sur les trajets futurs de leur sens. */
async function backfillPassengers() {
  const sql = sqlClient();
  const n = (await sql.query("SELECT COUNT(*)::int AS n FROM conduites_passengers")) as { n: number }[];
  if (n[0].n > 0) return;
  await sql.query(`
    INSERT INTO conduites_passengers (id, trip_id, child_id)
    SELECT gen_random_uuid()::text, t.id, c.id
    FROM conduites_trips t JOIN conduites_memberships m ON m.group_id = t.group_id AND m.left_at IS NULL JOIN conduites_children c ON c.membership_id = m.id
    WHERE t.date >= CURRENT_DATE AND NOT t.cancelled AND (c.travels = 'both' OR c.travels = t.direction)
    ON CONFLICT DO NOTHING`);
}

/** Le groupe Liesse et le planning de rentrée 2026 de l'ancien tableau. */
async function seedIfEmpty() {
  const sql = sqlClient();
  const n = (await sql.query("SELECT COUNT(*)::int AS n FROM conduites_groups")) as { n: number }[];
  if (n[0].n > 0) return;
  const gid = randomUUID();
  await sql.query("INSERT INTO conduites_groups (id, name, slug, invite_code, destination) VALUES ($1,$2,$3,$4,$5)",
    [gid, "Conduites Liesse", "liesse", (process.env.CONDUITES_INVITE_CODE || "LIESSE").toUpperCase(), "Académie de Liesse"]);
  const rows: [string, string, string | null, number | null, number, string | null][] = [
    ["2026-09-04", "retour", "Gaujard", null, 3, "Absence Bosco"],
    ["2026-09-06", "aller", "Leroy", 7, 1, "Voiture 7 places (amie)"],
    ["2026-09-11", "retour", "Leroy", 7, 1, "Voiture 7 places (amie)"],
    ["2026-09-13", "aller", "Parnaudeau", 7, 3, null],
    ["2026-09-18", "retour", "Leroy", 9, 1, "Abs. Jean-Eudes + Henri"],
    ["2026-09-20", "aller", "Proult", null, 1, "Abs. Jean-Eudes + Henri"],
    ["2026-09-25", "retour", "Vassard", null, 3, null],
    ["2026-09-27", "aller", "Parnaudeau", 7, 3, null],
    ["2026-10-02", "retour", "Gaujard", null, 3, null],
    ["2026-10-04", "aller", "Vassard", null, 3, null],
    ["2026-10-09", "retour", "Vassard", null, 3, null],
    ["2026-10-11", "aller", "Parnaudeau", null, 3, "À voir si 7 ou 9 places"],
    ["2026-10-16", "retour", "Gaujard", null, 3, null],
  ];
  const d = new Date("2026-11-01T12:00:00Z");
  const end = new Date("2026-12-18T12:00:00Z");
  while (d <= end) {
    const iso = d.toISOString().slice(0, 10);
    if (d.getUTCDay() === 5) rows.push([iso, "retour", null, null, 1, null]);
    if (d.getUTCDay() === 0) rows.push([iso, "aller", null, null, 1, null]);
    d.setUTCDate(d.getUTCDate() + 1);
  }
  for (const r of rows) {
    await sql.query("INSERT INTO conduites_trips (id, group_id, date, direction, driver_name, seats, weight, comment) VALUES ($1,$2,$3,$4,$5,$6,$7,$8) ON CONFLICT DO NOTHING",
      [randomUUID(), gid, ...r]);
  }
}

// ---- Types ----
export type User = {
  id: string; email: string; password_hash: string; first_name: string; last_name: string;
  phone: string | null; seats: number; notify: boolean; ical_token: string | null; created_at: string;
};
export type Group = { id: string; name: string; slug: string; invite_code: string; destination: string | null; created_by: string | null; created_at: string; cost_per_point: string | number; split: "family" | "child" };
export type Settlement = { id: string; from_membership_id: string; to_membership_id: string; amount: string | number; note: string | null; created_at: string; from_last: string; to_last: string };
export type Role = "owner" | "admin" | "member";
export type Membership = { id: string; group_id: string; user_id: string; role: Role; joined_at: string; left_at: string | null };
export type MemberRow = Membership & { first_name: string; last_name: string; email: string; phone: string | null; seats: number; children_count: number };
export type Travels = "both" | "aller" | "retour";
export type Child = { id: string; first_name: string; membership_id: string; travels: Travels };
export type Trip = {
  id: string; group_id: string; date: string; direction: "aller" | "retour"; driver_membership_id: string | null; driver_name: string | null;
  seats: number | null; weight: number; comment: string | null; cancelled: boolean;
  departure_time: string | null; departure_place: string | null; done: boolean; cost: string | number | null; extra: string | number; extra_note: string | null;
};
export type TripRow = Trip & { driver_last: string | null; driver_first: string | null; driver_seats: number | null; registered: number; mine_registered: number };
export type Passenger = { id: string; child_id: string; first_name: string; last_name: string; user_id: string; membership_id: string; created_at: string };

// ---- Groupes & adhésions ----
export const getGroupBySlug = (slug: string) => one<Group>("SELECT * FROM conduites_groups WHERE slug = $1", [slug]);
export const getGroupByCode = (code: string) => one<Group>("SELECT * FROM conduites_groups WHERE upper(invite_code) = upper($1)", [code.trim()]);
export const getMembership = (groupId: string, userId: string) =>
  one<Membership>("SELECT * FROM conduites_memberships WHERE group_id = $1 AND user_id = $2 AND left_at IS NULL", [groupId, userId]);
export const getUserById = (id: string) => one<User>("SELECT * FROM conduites_users WHERE id = $1", [id]);
export const getUserByEmail = (email: string) => one<User>("SELECT * FROM conduites_users WHERE email = $1", [email.toLowerCase()]);

export function listUserGroups(userId: string) {
  return q<Group & { role: Role; members: number; open_trips: number }>(`
    SELECT g.*, m.role,
      (SELECT COUNT(*)::int FROM conduites_memberships x WHERE x.group_id = g.id AND x.left_at IS NULL) AS members,
      (SELECT COUNT(*)::int FROM conduites_trips t WHERE t.group_id = g.id AND NOT t.cancelled AND t.driver_membership_id IS NULL AND t.driver_name IS NULL AND t.date >= CURRENT_DATE) AS open_trips
    FROM conduites_memberships m JOIN conduites_groups g ON g.id = m.group_id
    WHERE m.user_id = $1 AND m.left_at IS NULL ORDER BY g.name`, [userId]);
}
export function listMembers(groupId: string) {
  return q<MemberRow>(`
    SELECT m.*, u.first_name, u.last_name, u.email, u.phone, u.seats,
      (SELECT COUNT(*)::int FROM conduites_children c WHERE c.membership_id = m.id) AS children_count
    FROM conduites_memberships m JOIN conduites_users u ON u.id = m.user_id
    WHERE m.group_id = $1 AND m.left_at IS NULL
    ORDER BY CASE m.role WHEN 'owner' THEN 0 WHEN 'admin' THEN 1 ELSE 2 END, u.last_name, u.first_name`, [groupId]);
}

/** Ajoute un membre et rattache les conduites importées portant son nom de famille. */
export async function joinGroup(groupId: string, user: User, role: Role = "member"): Promise<Membership> {
  const existing = await getMembership(groupId, user.id);
  if (existing) return existing;
  // Une famille partie qui revient retrouve son historique (comptes, conduites passées).
  const gone = await one<Membership>("SELECT * FROM conduites_memberships WHERE group_id = $1 AND user_id = $2", [groupId, user.id]);
  const id = gone?.id ?? uid();
  if (gone) await q("UPDATE conduites_memberships SET left_at = NULL, role = 'member' WHERE id = $1", [id]);
  else await q("INSERT INTO conduites_memberships (id, group_id, user_id, role) VALUES ($1,$2,$3,$4)", [id, groupId, user.id, role]);
  await autoRegister(groupId, { membershipId: id });
  await q("UPDATE conduites_trips SET driver_membership_id = $1, driver_name = NULL WHERE group_id = $2 AND driver_membership_id IS NULL AND lower(driver_name) = lower($3)",
    [id, groupId, user.last_name]);
  return (await getMembership(groupId, user.id))!;
}

/** Les groupes importés sans créateur sont confiés à l'e-mail administrateur lors de sa première connexion. */
export async function claimOrphanGroups(user: User) {
  const adminEmail = (process.env.CONDUITES_ADMIN_EMAIL || "tparnaudeau@gmail.com").toLowerCase();
  if (user.email.toLowerCase() !== adminEmail) return;
  const orphans = await q<Group>("SELECT * FROM conduites_groups WHERE created_by IS NULL");
  for (const g of orphans) {
    await q("UPDATE conduites_groups SET created_by = $1 WHERE id = $2", [user.id, g.id]);
    const m = await joinGroup(g.id, user, "owner");
    await q("UPDATE conduites_memberships SET role = 'owner' WHERE id = $1", [m.id]);
  }
}

/** Jeton du flux calendrier, créé à la demande. */
export async function ensureIcalToken(user: User): Promise<string> {
  if (user.ical_token) return user.ical_token;
  const t = newToken();
  await q("UPDATE conduites_users SET ical_token = $1 WHERE id = $2", [t, user.id]);
  return t;
}

// ---- Trajets ----
const TRIP_SELECT = `
  SELECT t.*, to_char(t.date, 'YYYY-MM-DD') AS date, u.last_name AS driver_last, u.first_name AS driver_first, u.seats AS driver_seats,
    (SELECT COUNT(*)::int FROM conduites_passengers p WHERE p.trip_id = t.id) AS registered,
    (SELECT COUNT(*)::int FROM conduites_passengers p JOIN conduites_children c ON c.id = p.child_id WHERE p.trip_id = t.id AND c.membership_id = $MINE) AS mine_registered
  FROM conduites_trips t
  LEFT JOIN conduites_memberships m ON m.id = t.driver_membership_id
  LEFT JOIN conduites_users u ON u.id = m.user_id`;

export function listTrips(groupId: string, membershipId: string, from?: string, to?: string) {
  const where = ["t.group_id = $1"];
  const params: unknown[] = [groupId, membershipId];
  if (from) { params.push(from); where.push(`t.date >= $${params.length}`); }
  if (to) { params.push(to); where.push(`t.date <= $${params.length}`); }
  return q<TripRow>(`${TRIP_SELECT.replace("$MINE", "$2")} WHERE ${where.join(" AND ")} ORDER BY t.date ASC, t.direction DESC`, params);
}
export const getTrip = (groupId: string, membershipId: string, id: string) =>
  one<TripRow>(`${TRIP_SELECT.replace("$MINE", "$3")} WHERE t.id = $1 AND t.group_id = $2`, [id, groupId, membershipId]);

/** Passagers inscrits, dans l'ordre d'attribution des places : enfants du conducteur d'abord, puis ordre d'inscription. */
export function listPassengers(tripId: string) {
  return q<Passenger>(`
    SELECT p.id, p.child_id, p.created_at, c.first_name, c.membership_id, u.last_name, u.id AS user_id
    FROM conduites_passengers p JOIN conduites_children c ON c.id = p.child_id
    JOIN conduites_memberships m ON m.id = c.membership_id JOIN conduites_users u ON u.id = m.user_id
    JOIN conduites_trips t ON t.id = p.trip_id
    WHERE p.trip_id = $1
    ORDER BY (c.membership_id = t.driver_membership_id) DESC, p.created_at ASC, c.first_name ASC`, [tripId]);
}

/** Inscrit automatiquement les enfants dont le sens de voyage correspond, sur les trajets futurs (ou un trajet donné). */
export async function autoRegister(groupId: string, opts: { tripId?: string; childId?: string; membershipId?: string } = {}) {
  await q(`
    INSERT INTO conduites_passengers (id, trip_id, child_id)
    SELECT gen_random_uuid()::text, t.id, c.id
    FROM conduites_trips t
    JOIN conduites_memberships m ON m.group_id = t.group_id AND m.left_at IS NULL
    JOIN conduites_children c ON c.membership_id = m.id
    WHERE t.group_id = $1 AND t.date >= CURRENT_DATE AND NOT t.cancelled
      AND (c.travels = 'both' OR c.travels = t.direction)
      AND ($2::text IS NULL OR t.id = $2) AND ($3::text IS NULL OR c.id = $3) AND ($4::text IS NULL OR m.id = $4)
    ON CONFLICT DO NOTHING`, [groupId, opts.tripId ?? null, opts.childId ?? null, opts.membershipId ?? null]);
}
export const countChildren = (groupId: string) =>
  count("SELECT COUNT(*) AS n FROM conduites_children c JOIN conduites_memberships m ON m.id = c.membership_id WHERE m.group_id = $1 AND m.left_at IS NULL", [groupId]);
export const listChildrenInGroup = (groupId: string) => q<Child & { last_name: string; user_id: string }>(`
    SELECT c.*, u.last_name, u.id AS user_id FROM conduites_children c
    JOIN conduites_memberships m ON m.id = c.membership_id JOIN conduites_users u ON u.id = m.user_id
    WHERE m.group_id = $1 AND m.left_at IS NULL ORDER BY u.last_name, c.first_name`, [groupId]);
export const listMyChildren = (membershipId: string) => q<Child>("SELECT * FROM conduites_children WHERE membership_id = $1 ORDER BY first_name", [membershipId]);
export const unlinkedDrivers = (groupId: string) => q<{ driver_name: string; n: number }>(
  "SELECT driver_name, COUNT(*)::int AS n FROM conduites_trips WHERE group_id = $1 AND driver_membership_id IS NULL AND driver_name IS NOT NULL GROUP BY driver_name ORDER BY driver_name", [groupId]);

export function equityStats(groupId: string, from: string, to: string) {
  return q<{ id: string; last_name: string; first_name: string; trips: number; points: number; children: number }>(`
    SELECT m.id, u.last_name, u.first_name, COUNT(t.id)::int AS trips, COALESCE(SUM(t.weight),0)::int AS points,
      (SELECT COUNT(*)::int FROM conduites_children c WHERE c.membership_id = m.id) AS children
    FROM conduites_memberships m JOIN conduites_users u ON u.id = m.user_id
    LEFT JOIN conduites_trips t ON t.driver_membership_id = m.id AND NOT t.cancelled AND t.date >= $1 AND t.date <= $2
    WHERE m.group_id = $3 AND m.left_at IS NULL
    GROUP BY m.id, u.last_name, u.first_name ORDER BY points DESC, u.last_name`, [from, to, groupId]);
}

// ---- Comptes (partage des frais) ----
export type AccountMember = { id: string; last_name: string; first_name: string; left_at: string | null; children: number };
export type AccountRow = {
  id: string; date: string; direction: "aller" | "retour"; driver_membership_id: string; total: number; seats: number | null; done: boolean;
  child_id: string | null; membership_id: string | null;
};
/** Toutes les familles ayant appartenu au groupe (les parties comprises, pour que l'historique des comptes reste exact). */
export const listAccountMembers = (groupId: string) => q<AccountMember>(`
    SELECT m.id, u.last_name, u.first_name, m.left_at, (SELECT COUNT(*)::int FROM conduites_children c WHERE c.membership_id = m.id) AS children
    FROM conduites_memberships m JOIN conduites_users u ON u.id = m.user_id
    WHERE m.group_id = $1 ORDER BY m.left_at NULLS FIRST, u.last_name`, [groupId]);
/**
 * Trajets qui comptent dans les comptes (passés ou validés, non annulés, conduits par une famille du groupe),
 * une ligne par passager inscrit dans l'ordre d'attribution des places (enfants du conducteur d'abord).
 */
export const listAccountRows = (groupId: string, tripId?: string) => q<AccountRow>(`
    SELECT t.id, to_char(t.date,'YYYY-MM-DD') AS date, t.direction, t.driver_membership_id, t.done,
      (COALESCE(t.cost, g.cost_per_point) + COALESCE(t.extra, 0))::float AS total,
      COALESCE(t.seats, du.seats) AS seats, p.child_id, c.membership_id
    FROM conduites_trips t JOIN conduites_groups g ON g.id = t.group_id
    JOIN conduites_memberships dm ON dm.id = t.driver_membership_id JOIN conduites_users du ON du.id = dm.user_id
    LEFT JOIN conduites_passengers p ON p.trip_id = t.id
    LEFT JOIN conduites_children c ON c.id = p.child_id
    WHERE t.group_id = $1 AND NOT t.cancelled AND (t.date < CURRENT_DATE OR t.done)
      AND ($2::text IS NULL OR t.id = $2)
    ORDER BY t.date, t.direction DESC, t.id, (c.membership_id = t.driver_membership_id) DESC NULLS LAST, p.created_at, c.first_name`, [groupId, tripId ?? null]);

export function listSettlements(groupId: string) {
  return q<Settlement>(`
    SELECT s.*, uf.last_name AS from_last, ut.last_name AS to_last
    FROM conduites_settlements s
    JOIN conduites_memberships mf ON mf.id = s.from_membership_id JOIN conduites_users uf ON uf.id = mf.user_id
    JOIN conduites_memberships mt ON mt.id = s.to_membership_id JOIN conduites_users ut ON ut.id = mt.user_id
    WHERE s.group_id = $1
    ORDER BY s.created_at DESC`, [groupId]);
}
