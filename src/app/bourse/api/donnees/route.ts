import { accesBourse, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { lireDonnee, lireFiche, schemaBourse } from "@/lib/bourse/stockage";

export const dynamic = "force-dynamic";

/** Données calculées de /bourse : ?quoi=actions (fiches et notes, en colonnes), etf, retsmeta (calendrier), statut, fiche&id=… (fiche brute). */
export async function GET(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const q = new URL(req.url).searchParams;
  const quoi = q.get("quoi") ?? "actions";
  if (!["actions", "etf", "retsmeta", "statut", "fiche"].includes(quoi)) return new Response("Inconnu", { status: 400 });
  try {
    await schemaBourse();
    if (quoi === "fiche") {
      const f = await lireFiche(String(q.get("id") ?? "").slice(0, 40));
      return Response.json({ resume: f?.resume ?? null, site: f?.website ?? null, effectif: f?.fullTimeEmployees ?? null }, { headers: ENTETES_PRIVEES });
    }
    const d = await lireDonnee(quoi);
    if (!d) return Response.json({ vide: true }, { headers: ENTETES_PRIVEES });
    return Response.json({ maj: d.maj, ...(d.contenu as object) }, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("donnees bourse", e);
    return Response.json({ erreur: "Base de données injoignable" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}
