import { accesCollecte, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { collecter } from "@/lib/bourse/collecte";
import { erreursRecentes, etatCollecte, schemaBourse } from "@/lib/bourse/stockage";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Collecte quotidienne de /bourse (Vercel Cron, vercel.json). Chaque passage relève les titres les plus anciens
 * pendant une quarantaine de secondes, puis recalcule classements et rendements.
 * ?etat=1 : état de la collecte sans rien relever · ?traiter=0 : relevé seul · ?relever=0 : recalcul seul.
 */
export async function GET(req: Request) {
  if (!(await accesCollecte(req))) return new Response("Non autorisé", { status: 401 });
  const q = new URL(req.url).searchParams;
  try {
    if (q.get("etat") === "1") {
      await schemaBourse();
      return Response.json({ etat: await etatCollecte(), erreurs: await erreursRecentes() }, { headers: ENTETES_PRIVEES });
    }
    const bilan = await collecter({ traiter: q.get("traiter") !== "0", relever: q.get("relever") !== "0" });
    return Response.json(bilan, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("collecte bourse", e);
    return Response.json({ erreur: e instanceof Error ? e.message : String(e) }, { status: 500, headers: ENTETES_PRIVEES });
  }
}
