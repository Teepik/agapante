import { NextResponse } from "next/server";
import { currentUser } from "@/lib/atlas/auth";
import { listAnnonces, saveAnnonce, deleteAnnonce, sanitize, cleanId } from "@/lib/atlas/annonces";

export const dynamic = "force-dynamic";
const json = (body: unknown, status = 200) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function GET() {
  const u = await currentUser();
  if (!u) return json({ error: "Connectez-vous." }, 401);
  return json({ annonces: await listAnnonces(u.id) });
}

/** Enregistre une annonce entière (création ou modification). */
export async function PUT(req: Request) {
  const u = await currentUser();
  if (!u) return json({ error: "Connectez-vous." }, 401);
  let b: Record<string, unknown>;
  try { b = await req.json(); } catch { return json({ error: "Requête illisible." }, 400); }
  const a = sanitize(b);
  if (!a) return json({ error: "Annonce invalide." }, 400);
  try { await saveAnnonce(u.id, a); } catch (e) {
    if (e instanceof Error && e.message === "limite") return json({ error: "Limite de 2 000 annonces atteinte : supprimez des annonces archivées." }, 409);
    throw e;
  }
  return json({ annonce: a });
}

export async function DELETE(req: Request) {
  const u = await currentUser();
  if (!u) return json({ error: "Connectez-vous." }, 401);
  const id = cleanId(new URL(req.url).searchParams.get("id"));
  if (!id) return json({ error: "Annonce invalide." }, 400);
  await deleteAnnonce(u.id, id);
  return json({ ok: true });
}
