import "server-only";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { q, one, getGroupBySlug, getMembership, getUserById, type Group, type Membership, type User } from "./db";

export const BASE = "/conduites";
const COOKIE = "conduites_session";
const MAX_AGE = 60 * 60 * 24 * 90;
const scryptAsync = promisify(scrypt);

const secret = () => process.env.CONDUITES_SESSION_SECRET || process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "conduites-dev-secret";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("base64url");
function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

// ---- Mots de passe (scrypt, comme le back-office du site) ----
export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}
export async function verifyPassword(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hash, "hex");
  return derived.length === expected.length && timingSafeEqual(derived, expected);
}

// ---- Session (jeton signé HMAC : id.expiration.signature) ----
export async function createSession(userId: string) {
  const payload = `${userId}.${Date.now() + MAX_AGE * 1000}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: BASE, maxAge: MAX_AGE,
  });
}
export async function destroySession() {
  (await cookies()).set(COOKIE, "", { path: BASE, maxAge: 0 });
}
export async function getCurrentUser(): Promise<User | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [id, exp, sig] = parts;
  if (!safeEqual(sig, sign(`${id}.${exp}`)) || Number(exp) < Date.now()) return null;
  try {
    return (await getUserById(id)) ?? null;
  } catch {
    return null;
  }
}

export async function requireUser(next?: string): Promise<User> {
  const user = await getCurrentUser();
  if (!user) redirect(next ? `${BASE}/login?next=${encodeURIComponent(next)}` : `${BASE}/login`);
  return user;
}

export type GroupContext = { user: User; group: Group; membership: Membership; isAdmin: boolean; isOwner: boolean };

/** Contexte d'un groupe : l'utilisateur doit en être membre. */
export async function requireGroup(slug: string): Promise<GroupContext> {
  const user = await requireUser(`${BASE}/g/${slug}`);
  const group = await getGroupBySlug(slug);
  if (!group) redirect(BASE);
  const membership = await getMembership(group.id, user.id);
  if (!membership) redirect(`${BASE}?groupe=${slug}`);
  // Un groupe sans créateur (planning importé) : la première famille présente en devient responsable.
  if (membership.role !== "owner" && !(await one("SELECT 1 FROM conduites_memberships WHERE group_id = $1 AND role = 'owner' AND left_at IS NULL", [group.id]))) {
    await q("UPDATE conduites_memberships SET role = 'owner' WHERE id = $1", [membership.id]);
    await q("UPDATE conduites_groups SET created_by = COALESCE(created_by, $1) WHERE id = $2", [user.id, group.id]);
    membership.role = "owner";
  }
  const isOwner = membership.role === "owner";
  return { user, group, membership, isAdmin: isOwner || membership.role === "admin", isOwner };
}

export async function requireGroupAdmin(slug: string): Promise<GroupContext> {
  const ctx = await requireGroup(slug);
  if (!ctx.isAdmin) redirect(`${BASE}/g/${slug}`);
  return ctx;
}
