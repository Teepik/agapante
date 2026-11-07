import "server-only";
import { ETF, FX, PROXIES } from "./config";
import atlas from "./atlas.json";
import univers from "./univers.json";
import {
  ecrireDonnee, enregistrerEchec, enregistrerTitre, etatCollecte, inscrireUnivers, lireTout, marquerEssai, schemaBourse,
  titresARelever, type EntreeUnivers, type Ligne,
} from "./stockage";
import { traiter } from "./traitement";
import { releverTitre } from "./yahoo";
import { getSql } from "@/lib/db";

export function entreesUnivers() {
  const u = univers as EntreeUnivers[];
  return [
    ...FX.map((s) => ({ cle: s, sym: s, type: "fx" as const, univ: null })),
    ...PROXIES.map((s) => ({ cle: s, sym: s, type: "proxy" as const, univ: null })),
    ...Object.entries(ETF).map(([s, e]) => ({ cle: s, sym: s, type: "etf" as const, univ: { n: e[0] } })),
    ...u.map((e) => ({ cle: (e.s || e.isin)!, sym: e.s ?? null, type: "action" as const, univ: e })),
  ];
}

export type BilanCollecte = {
  releves: number; echecs: number; enAttente: number; traite: boolean; duree: number;
  erreurs: { cle: string; erreur: string }[]; etat?: unknown; traitement?: Record<string, unknown>;
};

/** Relève un lot de titres dans le temps imparti, puis recalcule les données de /bourse. */
export async function collecter(opts: { budgetMs?: number; limite?: number; traiter?: boolean; relever?: boolean } = {}): Promise<BilanCollecte> {
  const t0 = Date.now();
  const budget = opts.budgetMs ?? 40_000;
  await schemaBourse();
  await inscrireUnivers(entreesUnivers());
  const bilan: BilanCollecte = { releves: 0, echecs: 0, enAttente: 0, traite: false, duree: 0, erreurs: [] };
  if (opts.relever !== false) {
    const dus = await titresARelever(opts.limite ?? 700, 60);
    await marquerEssai(dus.map((d) => d.cle));
    let i = 0;
    const faits = new Set<string>();
    const travailleur = async () => {
      while (i < dus.length && Date.now() - t0 < budget) {
        const l = dus[i++];
        faits.add(l.cle);
        try {
          const r = await releverTitre(l);
          await enregistrerTitre(l.cle, r.sym, r.fiche, r.serie);
          bilan.releves++;
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          bilan.echecs++;
          if (bilan.erreurs.length < 15) bilan.erreurs.push({ cle: l.cle, erreur: msg.slice(0, 160) });
          await enregistrerEchec(l.cle, msg).catch(() => undefined);
        }
      }
    };
    await Promise.all(Array.from({ length: 6 }, travailleur));
    const restants = dus.filter((d) => !faits.has(d.cle)).map((d) => d.cle);
    if (restants.length) await getSql()`UPDATE bourse_titres SET essai = NULL WHERE cle = ANY(${restants}::text[])`;
    bilan.enAttente = restants.length;
  }
  if (opts.traiter !== false && Date.now() - t0 < budget + 8_000) {
    const lignes: Ligne[] = await lireTout();
    const s = traiter(lignes, atlas as unknown as { pays: Record<string, { cape?: number }> });
    await ecrireDonnee("actions", s.actions);
    await ecrireDonnee("rets", s.rets);
    bilan.traite = true;
    bilan.traitement = { actions: s.actions.actions.length, etf: s.actions.etf.length, semaines: s.rets.dates.length, fin: s.actions.meta.fin };
  }
  bilan.etat = await etatCollecte();
  bilan.duree = Math.round((Date.now() - t0) / 100) / 10;
  await ecrireDonnee("statut", { ...bilan, date: new Date().toISOString() });
  return bilan;
}
