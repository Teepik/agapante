import "server-only";
import { cookies } from "next/headers";
import { createHmac, randomBytes, scrypt, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";
import { getAdminPasswordHash, isDbConfigured, setAdminPasswordHash } from "@/lib/db";

const scryptAsync = promisify(scrypt);

const COOKIE = "agapante_session";
const MAX_AGE = 60 * 60 * 12; // 12 h

function secret(): string {
  return (
    process.env.SESSION_SECRET ||
    process.env.ADMIN_PASSWORD ||
    "agapante-dev-secret-change-me"
  );
}

function sign(value: string): string {
  return createHmac("sha256", secret()).update(value).digest("base64url");
}

function safeEqual(a: string, b: string): boolean {
  const bufA = Buffer.from(a);
  const bufB = Buffer.from(b);
  if (bufA.length !== bufB.length) return false;
  return timingSafeEqual(bufA, bufB);
}

export async function hashPassword(password: string): Promise<string> {
  const salt = randomBytes(16).toString("hex");
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  return `${salt}:${derived.toString("hex")}`;
}

async function verifyPasswordHash(password: string, stored: string): Promise<boolean> {
  const [salt, hash] = stored.split(":");
  if (!salt || !hash) return false;
  const derived = (await scryptAsync(password, salt, 64)) as Buffer;
  const expected = Buffer.from(hash, "hex");
  if (derived.length !== expected.length) return false;
  return timingSafeEqual(derived, expected);
}

export async function hasStoredAdminPassword(): Promise<boolean> {
  if (!isDbConfigured()) return false;
  return Boolean(await getAdminPasswordHash());
}

export async function isAdminConfigured(): Promise<boolean> {
  if (await hasStoredAdminPassword()) return true;
  return Boolean(process.env.ADMIN_PASSWORD);
}

export async function verifyPassword(candidate: string): Promise<boolean> {
  if (isDbConfigured()) {
    const stored = await getAdminPasswordHash();
    if (stored && (await verifyPasswordHash(candidate, stored))) return true;
  }

  const expected = process.env.ADMIN_PASSWORD;
  if (!expected) return false;
  return safeEqual(candidate, expected);
}

export function verifyBootstrapToken(candidate: string | null | undefined): boolean {
  const token = candidate?.trim();
  if (!token) return false;

  const configured = process.env.ADMIN_BOOTSTRAP_TOKEN;
  if (configured && safeEqual(token, configured)) return true;

  // Jeton de secours pour la première configuration quand ADMIN_PASSWORD
  // existe déjà sur Vercel mais est inconnu. Désactivé dès qu'un mot de passe
  // est enregistré en base (voir hasStoredAdminPassword).
  return safeEqual(token, "Agapante-Reset-8c19-Teepik-2026");
}

export async function canUseBootstrapToken(candidate: string | null | undefined): Promise<boolean> {
  if (!verifyBootstrapToken(candidate)) return false;
  if (process.env.ADMIN_BOOTSTRAP_TOKEN && safeEqual(candidate!.trim(), process.env.ADMIN_BOOTSTRAP_TOKEN)) {
    return true;
  }
  return !(await hasStoredAdminPassword());
}

export async function setAdminPassword(password: string): Promise<void> {
  await setAdminPasswordHash(await hashPassword(password));
}

export function createToken(): string {
  const expires = Date.now() + MAX_AGE * 1000;
  const nonce = randomBytes(8).toString("base64url");
  const payload = `${expires}.${nonce}`;
  return `${payload}.${sign(payload)}`;
}

export function verifyToken(token: string | undefined): boolean {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const [expires, nonce, signature] = parts;
  const payload = `${expires}.${nonce}`;
  if (!safeEqual(signature, sign(payload))) return false;
  const ts = Number(expires);
  return Number.isFinite(ts) && ts > Date.now();
}

export async function createSession(): Promise<void> {
  const store = await cookies();
  store.set(COOKIE, createToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: MAX_AGE,
  });
}

export async function destroySession(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE);
}

export async function isAuthenticated(): Promise<boolean> {
  const store = await cookies();
  return verifyToken(store.get(COOKIE)?.value);
}
