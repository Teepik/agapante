/**
 * Relais temporaire vers les données ouvertes officielles (Éducation nationale, Enseignement supérieur),
 * utilisé pour constituer les fichiers de données de la page. À retirer avant la mise en ligne.
 */
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

const ALLOWED = new Set(["data.education.gouv.fr", "data.enseignementsup-recherche.gouv.fr"]);

export async function GET(req: Request) {
  const target = new URL(req.url).searchParams.get("url");
  if (!target) return NextResponse.json({ error: "url manquante" }, { status: 400 });
  let u: URL;
  try {
    u = new URL(target);
  } catch {
    return NextResponse.json({ error: "url invalide" }, { status: 400 });
  }
  if (u.protocol !== "https:" || !ALLOWED.has(u.hostname)) {
    return NextResponse.json({ error: "hôte refusé" }, { status: 403 });
  }
  const res = await fetch(u, { cache: "no-store", headers: { accept: "application/json,text/csv;q=0.9,*/*;q=0.5" } });
  const body = await res.text();
  return new NextResponse(body, {
    status: res.status,
    headers: { "content-type": res.headers.get("content-type") ?? "text/plain; charset=utf-8", "cache-control": "no-store" },
  });
}
