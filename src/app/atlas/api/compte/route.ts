import { NextResponse } from "next/server";
import { headers } from "next/headers";
import { currentUser, createSession, destroySession, hashPassword, verifyPassword, hashIp } from "@/lib/atlas/auth";
import { one, q, uid } from "@/lib/atlas/db";

export const dynamic = "force-dynamic";

const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });
const DISPOSABLE = /@(mailinator|yopmail|guerrillamail|tempmail|trashmail|10minutemail|maildrop|getnada|sharklasers|dispostable)\./i;

/** Compte connecté, ou null. */
export async function GET() {
  const u = await currentUser();
  return json({ user: u ? { email: u.email, name: u.name } : null });
}

/** Inscription, connexion et déconnexion. */
export async function POST(req: Request) {
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ error: "Requête illisible." }, 400); }
  const action = String(b.action || "");
  if (action === "deconnexion") { await destroySession(); return json({ ok: true }); }

  const email = String(b.email || "").trim().toLowerCase();
  const password = String(b.password || "");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) return json({ error: "Adresse e-mail invalide." }, 400);

  if (action === "connexion") {
    const u = await one<{ id: string; password_hash: string }>("SELECT id, password_hash FROM atlas_users WHERE email = $1", [email]);
    if (!u || !(await verifyPassword(password, u.password_hash))) return json({ error: "E-mail ou mot de passe incorrect." }, 401);
    await q("UPDATE atlas_users SET last_login_at = now() WHERE id = $1", [u.id]);
    await createSession(u.id);
    return json({ ok: true });
  }

  if (action === "inscription") {
    // Champ piège invisible : rempli seulement par les robots
    if (String(b.site || "")) return json({ ok: true });
    const name = String(b.name || "").trim().slice(0, 80);
    if (!name) return json({ error: "Indiquez votre prénom." }, 400);
    if (password.length < 8) return json({ error: "Choisissez un mot de passe d'au moins 8 caractères." }, 400);
    if (DISPOSABLE.test(email)) return json({ error: "Utilisez une adresse e-mail permanente." }, 400);
    const h = await headers();
    const ip = hashIp(h.get("x-forwarded-for")?.split(",")[0]?.trim() || null);
    if (ip) {
      const recent = await one<{ n: string }>("SELECT count(*) AS n FROM atlas_users WHERE ip_hash = $1 AND created_at > now() - interval '1 hour'", [ip]);
      if (Number(recent?.n ?? 0) >= 5) return json({ error: "Trop d'inscriptions récentes depuis cette connexion. Réessayez plus tard." }, 429);
    }
    if (await one("SELECT 1 FROM atlas_users WHERE email = $1", [email])) return json({ error: "Un compte existe déjà avec cette adresse. Connectez-vous." }, 409);
    const id = uid();
    await q("INSERT INTO atlas_users (id, email, password_hash, name, ip_hash, last_login_at) VALUES ($1, $2, $3, $4, $5, now())", [id, email, await hashPassword(password), name, ip]);
    await createSession(id);
    return json({ ok: true });
  }
  return json({ error: "Action inconnue." }, 400);
}
