import { accesCollecte, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { collecter } from "@/lib/bourse/collecte";
import { erreursRecentes, etatCollecte, lireDonnee, reessayerEchecs, schemaBourse } from "@/lib/bourse/stockage";
import { analyseSociete, diagnostic } from "@/lib/bourse/yahoo";

export const dynamic = "force-dynamic";
export const maxDuration = 300;

/**
 * Collecte quotidienne de /bourse (Vercel Cron, vercel.json). Chaque passage relève les titres les plus anciens
 * pendant un peu plus de trois minutes (cours à chaque passage, comptes une fois par semaine), puis recalcule classements et rendements.
 * ?budget=45 : passage court, en secondes (appel manuel).
 * ?etat=1 : état de la collecte sans rien relever · ?traiter=0 : relevé seul · ?relever=0 : recalcul seul ·
 * ?reessayer=1 : remet en file les titres jamais relevés · ?test=SYMBOLE, ?isin=…&nom=…&pays=… : diagnostic · ?analyse=SYMBOLE : données d'analyse approfondie.
 */
export async function GET(req: Request) {
  if (!(await accesCollecte(req))) return new Response("Non autorisé", { status: 401 });
  const q = new URL(req.url).searchParams;
  try {
    if (q.get("analyse")) return Response.json(await analyseSociete(String(q.get("analyse")).slice(0, 40)), { headers: ENTETES_PRIVEES });
    if (q.get("test") || q.get("isin")) {
      return Response.json(await diagnostic({ sym: q.get("test") ?? undefined, isin: q.get("isin") ?? undefined, nom: q.get("nom") ?? undefined, pays: q.get("pays") ?? undefined }), { headers: ENTETES_PRIVEES });
    }
    if (q.get("controle") === "1") {
      await schemaBourse();
      return Response.json(await controle(), { headers: ENTETES_PRIVEES });
    }
    if (q.get("etat") === "1") {
      await schemaBourse();
      return Response.json({ etat: await etatCollecte(), erreurs: await erreursRecentes() }, { headers: ENTETES_PRIVEES });
    }
    if (q.get("reessayer") === "1") { await schemaBourse(); await reessayerEchecs(); }
    const budget = Number(q.get("budget"));
    const bilan = await collecter({ traiter: q.get("traiter") !== "0", relever: q.get("relever") !== "0", budgetMs: budget > 0 ? Math.min(230, budget) * 1000 : undefined, histo: q.get("histo") === "1" });
    return Response.json(bilan, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("collecte bourse", e);
    return Response.json({ erreur: e instanceof Error ? e.message : String(e) }, { status: 500, headers: ENTETES_PRIVEES });
  }
}

/** Contrôle de cohérence des données calculées : répartitions, quantiles, champs manquants, exemples. */
async function controle() {
  const d = await lireDonnee<{ meta: Record<string, unknown>; cols: string[]; rows: unknown[][] }>("actions");
  const e = await lireDonnee<{ etf: Record<string, unknown>[] }>("etf");
  if (!d || !d.contenu.cols) return { vide: true };
  const { cols, rows } = d.contenu;
  const A = rows.map((r) => Object.fromEntries(cols.map((k, i) => [k, r[i]]))) as Record<string, unknown>[];
  const E = e?.contenu.etf ?? [];
  const compte = (L: Record<string, unknown>[], f: (a: Record<string, unknown>) => string) => L.reduce<Record<string, number>>((o, a) => { const k = f(a); o[k] = (o[k] || 0) + 1; return o; }, {});
  const q = (L: Record<string, unknown>[], k: string) => {
    const v = L.map((a) => a[k]).filter((x): x is number => typeof x === "number").sort((x, y) => x - y);
    const at = (p: number) => v[Math.min(v.length - 1, Math.floor(p * v.length))];
    return { n: v.length, min: v[0], p10: at(0.1), med: at(0.5), p90: at(0.9), max: v[v.length - 1] };
  };
  const ex = (id: string) => { const a = A.find((x) => x.id === id) ?? E.find((x) => x.id === id); return a ? Object.fromEntries(Object.entries(a).filter(([k]) => !["isin", "x", "secteurEn", "industrie", "paysEn"].includes(k))) : null; };
  return {
    meta: d.contenu.meta, actions: A.length, etf: E.length,
    categories: compte(A, (a) => String(a.cat)), zones: compte(A, (a) => String(a.zone)), devises: compte(A, (a) => String(a.ccy)),
    etfClasses: compte(E, (a) => String(a.cls)), etfTer: compte(E, (a) => (typeof a.ter === "number" ? "connu" : "inconnu")), etfAum: q(E, "aum"), etfVol: q(E, "vol"),
    quantiles: Object.fromEntries(["mcap", "perF", "dy", "liq", "muR", "vol", "beta", "mom12", "rev90"].map((k) => [k, q(A, k)])),
    exemples: ["TM", "7203.T", "SHOP.TO", "BHP.AX", "TSM", "AALB.AS", "IB28.PA", "FM29.PA", "EUNK.DE", "IBCN.DE"].map(ex).filter(Boolean),
  };
}
