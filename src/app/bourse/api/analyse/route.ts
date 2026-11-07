import { accesBourse, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { ecrireDonnee, lireDonnee, schemaBourse } from "@/lib/bourse/stockage";
import { analyseSociete } from "@/lib/bourse/yahoo";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/** Données d'analyse approfondie d'une société (comptes annuels, dirigeants, initiés, consensus) : ?id=SYMBOLE, &frais=1 pour relire Yahoo. Cache d'une semaine. */
export async function GET(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const q = new URL(req.url).searchParams;
  const id = String(q.get("id") ?? "").slice(0, 40);
  if (!/^[A-Za-z0-9.\-=^]+$/.test(id)) return new Response("Symbole invalide", { status: 400 });
  try {
    await schemaBourse();
    const cache = await lireDonnee<Record<string, unknown>>("analyse:" + id);
    if (cache && q.get("frais") !== "1" && Date.now() - new Date(cache.maj).getTime() < 7 * 864e5) return Response.json(cache.contenu, { headers: ENTETES_PRIVEES });
    const a = await analyseSociete(id);
    if (!a.erreurComptes || !a.erreurProfil) await ecrireDonnee("analyse:" + id, a);
    return Response.json(a, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("analyse bourse", e);
    return Response.json({ erreur: "Analyse indisponible pour l'instant" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}
