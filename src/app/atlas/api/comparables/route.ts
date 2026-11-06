import { NextResponse } from "next/server";
import { ventesCommune } from "@/lib/atlas/dvf";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Ventes de logements d'une commune (DVF, 5 dernières années), lues sur data.gouv.fr par le serveur.
 * Données publiques : la réponse est mise en cache 7 jours par le CDN, puis rafraîchie en arrière-plan.
 */
export async function GET(req: Request) {
  const code = new URL(req.url).searchParams.get("code") ?? "";
  if (!/^(\d{5}|2[AB]\d{3})$/.test(code)) return NextResponse.json({ error: "Code commune invalide." }, { status: 400 });
  try {
    const { ventes, annees } = await ventesCommune(code);
    return NextResponse.json(
      { code, annees, ventes, source: "DVF géolocalisées (DGFiP, Etalab)" },
      { headers: { "Cache-Control": "public, max-age=3600, s-maxage=604800, stale-while-revalidate=2592000" } },
    );
  } catch {
    return NextResponse.json({ error: "Les ventes sont momentanément indisponibles." }, { status: 502, headers: { "Cache-Control": "no-store" } });
  }
}
