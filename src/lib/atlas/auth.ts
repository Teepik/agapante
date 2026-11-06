import "server-only";
import { cookies } from "next/headers";
import { createHash, createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { one, type AtlasUser } from "./db";

const COOKIE = "atlas_session";
const MAX_AGE = 60 * 60 * 24 * 180;
const scryptAsync = promisify(scrypt);

const secret = () => process.env.ATLAS_SESSION_SECRET || process.env.SESSION_SECRET || process.env.ADMIN_PASSWORD || "atlas-dev-secret";
const sign = (v: string) => createHmac("sha256", secret()).update(v).digest("base64url");
function safeEqual(a: string, b: string) {
  const x = Buffer.from(a), y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}

// Mots de passe : scrypt, comme le back-office du site et Conduites
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

// Session : jeton signé HMAC (id.expiration.signature), cookie limité à /atlas
export async function createSession(userId: string) {
  const payload = `${userId}.${Date.now() + MAX_AGE * 1000}`;
  (await cookies()).set(COOKIE, `${payload}.${sign(payload)}`, {
    httpOnly: true, sameSite: "lax", secure: process.env.NODE_ENV === "production", path: "/atlas", maxAge: MAX_AGE,
  });
}
export async function destroySession() {
  (await cookies()).set(COOKIE, "", { path: "/atlas", maxAge: 0 });
}
export async function currentUser(): Promise<AtlasUser | null> {
  const token = (await cookies()).get(COOKIE)?.value;
  if (!token) return null;
  const parts = token.split(".");
  if (parts.length !== 3) return null;
  const [id, exp, sig] = parts;
  if (!safeEqual(sig, sign(`${id}.${exp}`)) || Number(exp) < Date.now()) return null;
  try {
    return (await one<AtlasUser>("SELECT id, email, name, password_hash FROM atlas_users WHERE id = $1", [id])) ?? null;
  } catch {
    return null;
  }
}

export function hashIp(ip: string | null): string | null {
  if (!ip) return null;
  return createHash("sha256").update(`${secret()}:${ip}`).digest("hex").slice(0, 32);
}
