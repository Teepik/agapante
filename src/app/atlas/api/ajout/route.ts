import { NextResponse } from "next/server";
import { currentUser } from "@/lib/atlas/auth";
import { ingest, sanitize } from "@/lib/atlas/annonces";

export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

/** Ajout d'une annonce lue par le favori « + Atlas » ou collée dans l'Atlas (même origine, session requise). */
export async function POST(req: Request) {
  const u = await currentUser();
  if (!u) return json({ error: "Connectez-vous." }, 401);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ error: "Requête illisible." }, 400); }
  const a = sanitize(b);
  if (!a) return json({ error: "Annonce invalide." }, 400);
  try {
    return json(await ingest(u.id, a));
  } catch (e) {
    if (e instanceof Error && e.message === "limite") return json({ error: "Limite de 2 000 annonces atteinte." }, 409);
    throw e;
  }
}
