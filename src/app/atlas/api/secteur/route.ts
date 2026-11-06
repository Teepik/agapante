import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";
export const maxDuration = 30;

/**
 * Risques et DPE autour d'un bien, lus par le serveur sur les sources publiques :
 * - Géorisques (rapport de risques à l'adresse, ou risques de la commune sans position) ;
 * - Ademe, DPE des logements existants (répartition des classes autour du point et dans la commune).
 * Réponse mise en cache 30 jours par le CDN.
 */
const GEO = "https://www.georisques.gouv.fr/api/v1";
const ADEME = "https://data.ademe.fr/data-fair/api/v1/datasets/dpe03existant/values_agg";

type Risque = { nom: string; statut: string; niveau: "fort" | "moyen" | "faible" | "info" };

const get = async (url: string) => {
  const r = await fetch(url, { cache: "no-store", headers: { accept: "application/json" }, signal: AbortSignal.timeout(12000) });
  if (!r.ok) throw new Error(String(r.status));
  return r.json();
};

function niveau(statut: string): Risque["niveau"] {
  const s = statut.toLowerCase();
  if (/fort|élevé|eleve|significatif|zone 3|zone 4|zone 5|catégorie 3/.test(s)) return "fort";
  if (/moyen|modéré|modere|zone 2|catégorie 2|existant|exposé|expose/.test(s)) return "moyen";
  if (/faible|très faible|zone 1|catégorie 1/.test(s)) return "faible";
  return "info";
}

async function risquesPoint(lat: number, lon: number): Promise<{ risques: Risque[]; lien?: string }> {
  const o = await get(`${GEO}/resultats_rapport_risque?latlon=${lon},${lat}`);
  const risques: Risque[] = [];
  for (const groupe of [o?.risquesNaturels, o?.risquesTechnologiques]) {
    if (!groupe || typeof groupe !== "object") continue;
    for (const v of Object.values(groupe) as { present?: boolean; libelle?: string; libelleStatutAdresse?: string; libelleStatutCommune?: string }[]) {
      if (!v || !v.present) continue;
      const statut = String(v.libelleStatutAdresse || v.libelleStatutCommune || "Présent dans la commune");
      risques.push({ nom: String(v.libelle || "Risque"), statut, niveau: niveau(statut) });
    }
  }
  return { risques, lien: typeof o?.url === "string" ? o.url : undefined };
}

async function risquesCommune(code: string): Promise<{ risques: Risque[] }> {
  const o = await get(`${GEO}/gaspar/risques?code_insee=${code}`);
  const det = (o?.data?.[0]?.risques_detail ?? []) as { libelle_risque_long?: string }[];
  const noms = [...new Set(det.map(d => String(d.libelle_risque_long || "")).filter(Boolean))];
  return { risques: noms.map(nom => ({ nom, statut: "Recensé dans la commune", niveau: "info" as const })) };
}

async function dpe(qs: string): Promise<Record<string, number> | null> {
  const o = await get(`${ADEME}?field=etiquette_dpe&size=10&${qs}`);
  const out: Record<string, number> = {};
  for (const a of (o?.aggs ?? []) as { value?: string; total?: number }[]) if (a.value && /^[A-G]$/.test(a.value)) out[a.value] = a.total ?? 0;
  return Object.keys(out).length ? out : null;
}

export async function GET(req: Request) {
  const p = new URL(req.url).searchParams;
  const code = p.get("code") ?? "";
  const lat = Number(p.get("lat")), lon = Number(p.get("lon"));
  const type = p.get("type") === "appartement" ? "appartement" : p.get("type") === "maison" ? "maison" : null;
  if (!/^(\d{5}|2[AB]\d{3})$/.test(code)) return NextResponse.json({ error: "Code commune invalide." }, { status: 400 });
  const pos = Number.isFinite(lat) && Number.isFinite(lon) && Math.abs(lat) <= 90 && Math.abs(lon) <= 180 && !(lat === 0 && lon === 0);
  const r3 = (v: number) => Math.round(v * 1000) / 1000;
  const typeQs = type ? `&qs=${encodeURIComponent(`type_batiment:${type}`)}` : "";
  const [risk, dZone, dCom] = await Promise.allSettled([
    pos ? risquesPoint(r3(lat), r3(lon)) : risquesCommune(code),
    pos ? dpe(`geo_distance=${r3(lon)}:${r3(lat)}:500${typeQs}`) : Promise.resolve(null),
    dpe(`qs=${encodeURIComponent(`code_insee_ban:${code}${type ? ` AND type_batiment:${type}` : ""}`)}`),
  ]);
  const body = {
    code,
    position: pos,
    risques: risk.status === "fulfilled" ? risk.value.risques : null,
    lienGeorisques: risk.status === "fulfilled" && "lien" in risk.value ? risk.value.lien : null,
    dpeZone: dZone.status === "fulfilled" ? dZone.value : null,
    dpeCommune: dCom.status === "fulfilled" ? dCom.value : null,
    sources: "Géorisques (ministère de la Transition écologique), DPE des logements existants (Ademe)",
  };
  const complet = body.risques !== null && body.dpeCommune !== null;
  return NextResponse.json(body, {
    headers: { "Cache-Control": complet ? "public, max-age=86400, s-maxage=2592000, stale-while-revalidate=2592000" : "no-store" },
  });
}
