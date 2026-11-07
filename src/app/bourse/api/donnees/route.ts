import { accesBourse, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { lireDonnee, schemaBourse } from "@/lib/bourse/stockage";

export const dynamic = "force-dynamic";

/** Données calculées de /bourse : ?quoi=actions (fiches, notes, ETF, épisodes), rets (rendements hebdomadaires), statut. */
export async function GET(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const quoi = new URL(req.url).searchParams.get("quoi") ?? "actions";
  if (!["actions", "rets", "statut"].includes(quoi)) return new Response("Inconnu", { status: 400 });
  try {
    await schemaBourse();
    const d = await lireDonnee(quoi);
    if (!d) return Response.json({ vide: true }, { headers: ENTETES_PRIVEES });
    return Response.json({ maj: d.maj, ...(d.contenu as object) }, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("donnees bourse", e);
    return Response.json({ erreur: "Base de données injoignable" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}
