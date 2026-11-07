import "server-only";
import { ETF, FX, PROXIES } from "./config";
import atlas from "./atlas.json";
import univers from "./univers.json";
import universEtf from "./univers-etf.json";
import {
  ecrireDonnee, ecrireRets, enregistrerEchec, enregistrerTitre, etatCollecte, inscrireUnivers, libererEssai, lireTout, marquerEssai,
  schemaBourse, titresARelever, type EntreeUnivers, type Ligne,
} from "./stockage";
import { traiter } from "./traitement";
import { LimiteYahoo, releverTitre } from "./yahoo";

export function entreesUnivers() {
  const u = univers as EntreeUnivers[];
  const e = (universEtf as (EntreeUnivers & Record<string, unknown>)[]).filter((x) => x.s && !ETF[x.s]);
  return [
    ...FX.map((s) => ({ cle: s, sym: s, type: "fx" as const, univ: null })),
    ...PROXIES.map((s) => ({ cle: s, sym: s, type: "proxy" as const, univ: null })),
    ...Object.entries(ETF).map(([s, x]) => ({ cle: s, sym: s, type: "etf" as const, univ: { n: x[0] } as EntreeUnivers })),
    ...e.map((x) => ({ cle: x.s!, sym: x.s!, type: "etf" as const, univ: x as EntreeUnivers })),
    ...u.map((x) => ({ cle: (x.s || x.isin)!, sym: x.s ?? null, type: "action" as const, univ: x })),
  ];
}

export type BilanCollecte = {
  releves: number; fiches: number; echecs: number; limites: number; enAttente: number; traite: boolean; duree: number;
  erreurs: { cle: string; erreur: string }[]; etat?: unknown; traitement?: Record<string, unknown>;
};

const FICHE_JOURS = 6.5;

/** Relève un lot de titres dans le temps imparti (cours à chaque passage, comptes une fois par semaine), puis recalcule /bourse. */
export async function collecter(opts: { budgetMs?: number; traiter?: boolean; relever?: boolean } = {}): Promise<BilanCollecte> {
  const t0 = Date.now();
  const budget = opts.budgetMs ?? 200_000;
  await schemaBourse();
  await inscrireUnivers(entreesUnivers());
  const bilan: BilanCollecte = { releves: 0, fiches: 0, echecs: 0, limites: 0, enAttente: 0, traite: false, duree: 0, erreurs: [] };
  if (opts.relever !== false) {
    const dus = await titresARelever(Math.max(200, Math.round(budget / 1000) * 20), 60);
    await marquerEssai(dus.map((d) => d.cle));
    let i = 0, limitesSuite = 0;
    const faits = new Set<string>(), aReprendre: string[] = [];
    const travailleur = async () => {
      while (i < dus.length && Date.now() - t0 < budget && limitesSuite < 8) {
        const l = dus[i++];
        faits.add(l.cle);
        const avecFiche = !l.maj_fiche || Date.now() - new Date(l.maj_fiche).getTime() > FICHE_JOURS * 864e5;
        try {
          const r = await releverTitre(l, avecFiche);
          await enregistrerTitre(l.cle, r.sym, r.fiche, r.serie, r.vol13);
          bilan.releves++; if (r.fiche) bilan.fiches++;
          limitesSuite = 0;
        } catch (e) {
          const msg = e instanceof Error ? e.message : String(e);
          if (e instanceof LimiteYahoo) { bilan.limites++; limitesSuite++; aReprendre.push(l.cle); continue; }
          bilan.echecs++;
          if (bilan.erreurs.length < 15) bilan.erreurs.push({ cle: l.cle, erreur: msg.slice(0, 160) });
          await enregistrerEchec(l.cle, msg).catch(() => undefined);
        }
      }
    };
    await Promise.all(Array.from({ length: 10 }, travailleur));
    const restants = dus.filter((d) => !faits.has(d.cle)).map((d) => d.cle).concat(aReprendre);
    await libererEssai(restants);
    bilan.enAttente = restants.length;
  }
  if (opts.traiter !== false) {
    const lignes: Ligne[] = await lireTout();
    const s = traiter(lignes, atlas as unknown as { pays: Record<string, { cape?: number }> });
    await ecrireDonnee("actions", s.actions);
    await ecrireDonnee("etf", s.etf);
    await ecrireDonnee("retsmeta", s.retsmeta);
    await ecrireRets(s.rets);
    bilan.traite = true;
    bilan.traitement = { actions: s.actions.rows.length, etf: s.etf.etf.length, semaines: s.retsmeta.dates.length, fin: s.actions.meta.fin,
      tailleActions: JSON.stringify(s.actions).length, tailleEtf: JSON.stringify(s.etf).length };
  }
  bilan.etat = await etatCollecte();
  bilan.duree = Math.round((Date.now() - t0) / 100) / 10;
  await ecrireDonnee("statut", { ...bilan, date: new Date().toISOString() });
  return bilan;
}
