import { accesBourse, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { ecrireDonnee, lireDonnees, schemaBourse } from "@/lib/bourse/stockage";

export const dynamic = "force-dynamic";

const CLES = new Set(["suivi", "alertes", "journal", "foyer", "portefeuilles", "constructeur", "preferences"]);

/** Espace personnel de /bourse : liste de suivi, alertes, journal, foyer fiscal, portefeuilles fictifs, réglages. */
export async function GET() {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  try {
    await schemaBourse();
    const rows = await lireDonnees("etat:");
    const out: Record<string, unknown> = {};
    for (const r of rows) out[r.cle.slice(5)] = r.contenu;
    return Response.json(out, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("etat bourse", e);
    return Response.json({ erreur: "Base de données injoignable" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}

export async function PUT(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const corps = await req.text();
  if (corps.length > 900_000) return Response.json({ erreur: "Trop volumineux" }, { status: 413, headers: ENTETES_PRIVEES });
  let msg: { k?: string; v?: unknown };
  try {
    msg = JSON.parse(corps);
  } catch {
    return Response.json({ erreur: "JSON invalide" }, { status: 400, headers: ENTETES_PRIVEES });
  }
  if (!msg.k || !CLES.has(msg.k) || msg.v === undefined) return Response.json({ erreur: "Clé inconnue" }, { status: 400, headers: ENTETES_PRIVEES });
  try {
    await schemaBourse();
    await ecrireDonnee("etat:" + msg.k, msg.v);
    return Response.json({ ok: true }, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("etat bourse", e);
    return Response.json({ erreur: "Base de données injoignable" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}
