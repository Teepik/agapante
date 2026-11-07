import { accesCollecte, ENTETES_PRIVEES } from "@/lib/bourse/acces";
import { collecter } from "@/lib/bourse/collecte";
import { erreursRecentes, etatCollecte, lireDonnee, reessayerEchecs, schemaBourse } from "@/lib/bourse/stockage";
import { diagnostic } from "@/lib/bourse/yahoo";

export const dynamic = "force-dynamic";
export const maxDuration = 60;

/**
 * Collecte quotidienne de /bourse (Vercel Cron, vercel.json). Chaque passage relève les titres les plus anciens
 * pendant une quarantaine de secondes, puis recalcule classements et rendements.
 * ?etat=1 : état de la collecte sans rien relever · ?traiter=0 : relevé seul · ?relever=0 : recalcul seul ·
 * ?reessayer=1 : remet en file les titres jamais relevés · ?test=SYMBOLE, ?isin=…&nom=…&pays=… : diagnostic.
 */
export async function GET(req: Request) {
  if (!(await accesCollecte(req))) return new Response("Non autorisé", { status: 401 });
  const q = new URL(req.url).searchParams;
  try {
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
    const bilan = await collecter({ traiter: q.get("traiter") !== "0", relever: q.get("relever") !== "0" });
    return Response.json(bilan, { headers: ENTETES_PRIVEES });
  } catch (e) {
    console.error("collecte bourse", e);
    return Response.json({ erreur: e instanceof Error ? e.message : String(e) }, { status: 500, headers: ENTETES_PRIVEES });
  }
}

/** Contrôle de cohérence des données calculées : répartitions, quantiles, champs manquants, exemples. */
async function controle() {
  const d = await lireDonnee<{ meta: Record<string, unknown>; actions: Record<string, unknown>[]; etf: Record<string, unknown>[] }>("actions");
  if (!d) return { vide: true };
  const A = d.contenu.actions;
  const compte = (f: (a: Record<string, unknown>) => string) => A.reduce<Record<string, number>>((o, a) => { const k = f(a); o[k] = (o[k] || 0) + 1; return o; }, {});
  const q = (k: string) => {
    const v = A.map((a) => a[k]).filter((x): x is number => typeof x === "number").sort((x, y) => x - y);
    const at = (p: number) => v[Math.min(v.length - 1, Math.floor(p * v.length))];
    return { n: v.length, min: v[0], p10: at(0.1), med: at(0.5), p90: at(0.9), max: v[v.length - 1] };
  };
  const ex = (id: string) => { const a = A.find((x) => x.id === id); return a ? { id, nom: a.nom, cat: a.cat, mcap: a.mcap, perF: a.perF, dy: a.dy, liq: a.liq, muR: a.muR, vol: a.vol, beta: a.beta, mom12: a.mom12, sc: a.sc, th: a.th, pg: a.pg } : null; };
  return {
    meta: d.contenu.meta, actions: A.length, etf: d.contenu.etf.length, etfSans: d.contenu.etf.map((e) => e.id),
    categories: compte((a) => String(a.cat)), zones: compte((a) => String(a.zone)), devises: compte((a) => String(a.ccy)), pea: compte((a) => String(a.pea)),
    pieges: compte((a) => ((a.pg as unknown[]) || []).map((p) => (p as string[])[0]).join("+") || "aucun"),
    quantiles: Object.fromEntries(["mcap", "perF", "dy", "liq", "muR", "vol", "beta", "mom12", "rev90", "roe", "fcfY", "nde", "upside"].map((k) => [k, q(k)])),
    exemples: ["AAPL", "NVDA", "MC.PA", "ASML.AS", "SHEL.L", "NESN.SW", "SAP.DE", "TTE.PA", "VOLV-B.ST", "NOVO-B.CO"].map(ex).filter(Boolean),
    etfMu: d.contenu.etf.map((e) => ({ id: e.id, vol: e.vol, mom12: e.mom12 })),
  };
}
