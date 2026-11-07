import { accesBourse, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { lireRets, schemaBourse } from "@/lib/bourse/stockage";

export const dynamic = "force-dynamic";

/** Rendements hebdomadaires de titres choisis : POST {ids: [...]} → {r: {id: base64}}. Lus à la demande par l'interface. */
export async function POST(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  let ids: string[] = [];
  try {
    const b = (await req.json()) as { ids?: unknown };
    ids = Array.isArray(b.ids) ? b.ids.filter((x): x is string => typeof x === "string" && x.length < 40).slice(0, 1500) : [];
  } catch {
    return Response.json({ erreur: "JSON invalide" }, { status: 400, headers: ENTETES_PRIVEES });
  }
  try {
    await schemaBourse();
    return Response.json({ r: await lireRets(ids) }, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("rets bourse", e);
    return Response.json({ erreur: "Base de données injoignable" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}
