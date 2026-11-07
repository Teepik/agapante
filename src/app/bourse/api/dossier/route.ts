import { accesBourse, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { ecrireDonnee, lireDonnee, listeDossiers, schemaBourse, supprimerDonnee } from "@/lib/bourse/stockage";

export const dynamic = "force-dynamic";

const ID = /^[A-Za-z0-9.\-=^]{1,40}$/;

/** Dossiers d'analyse : GET (liste résumée) ou ?id=… (dossier complet) ; PUT {id, dossier} ; DELETE ?id=… */
export async function GET(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  try {
    await schemaBourse();
    if (id) {
      if (!ID.test(id)) return new Response("Symbole invalide", { status: 400 });
      const d = await lireDonnee("dossier:" + id);
      return Response.json(d ? { ...(d.contenu as object), maj: d.maj } : null, { headers: ENTETES_PRIVEES });
    }
    return Response.json({ dossiers: await listeDossiers() }, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("dossier bourse", e);
    return Response.json({ erreur: "Base de données injoignable" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}

export async function PUT(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const corps = await req.text();
  if (corps.length > 600_000) return Response.json({ erreur: "Dossier trop volumineux" }, { status: 413, headers: ENTETES_PRIVEES });
  try {
    const { id, dossier } = JSON.parse(corps) as { id?: string; dossier?: unknown };
    if (!id || !ID.test(id) || !dossier || typeof dossier !== "object") return Response.json({ erreur: "Requête invalide" }, { status: 400, headers: ENTETES_PRIVEES });
    await schemaBourse();
    await ecrireDonnee("dossier:" + id, dossier);
    return Response.json({ ok: true }, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("dossier bourse", e);
    return Response.json({ erreur: "Enregistrement impossible" }, { status: 503, headers: ENTETES_PRIVEES });
  }
}

export async function DELETE(req: Request) {
  if (!(await accesBourse())) return new Response("Non autorisé", { status: 401 });
  const id = new URL(req.url).searchParams.get("id");
  if (!id || !ID.test(id)) return new Response("Symbole invalide", { status: 400 });
  await schemaBourse();
  await supprimerDonnee("dossier:" + id);
  return Response.json({ ok: true }, { headers: ENTETES_PRIVEES });
}
