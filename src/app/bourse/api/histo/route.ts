import { accesBourse, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { lireHisto, lireSemaine, schemaBourse, semainesHisto } from "@/lib/bourse/stockage";

export const dynamic = "force-dynamic";

/**
 * Historique hebdomadaire des notes : ?id=SYMBOLE (évolution d'un titre), ?semaines=1 (semaines disponibles),
 * ?semaine=AAAA-MM-JJ (instantané complet d'une semaine, pour tester une stratégie avec les notes de l'époque).
 */
export async function GET(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const q = new URL(req.url).searchParams;
  try {
    await schemaBourse();
    if (q.get("semaines") === "1") return Response.json({ semaines: await semainesHisto() }, { headers: ENTETES_PRIVEES });
    const semaine = q.get("semaine");
    if (semaine && /^\d{4}-\d{2}-\d{2}$/.test(semaine)) return Response.json({ semaine, titres: await lireSemaine(semaine) }, { headers: ENTETES_PRIVEES });
    const id = String(q.get("id") ?? "").slice(0, 40);
    if (!id) return new Response("Paramètre manquant", { status: 400 });
    return Response.json({ id, points: await lireHisto(id) }, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("histo bourse", e);
    return Response.json({ erreur: "Base de données injoignable" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}
