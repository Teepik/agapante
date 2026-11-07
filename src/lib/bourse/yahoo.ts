import "server-only";
import YahooFinance from "yahoo-finance2";
import { SUFFIXE_PAYS } from "./config";
import type { Ligne, Serie } from "./stockage";

/* Relevé d'un titre sur Yahoo Finance : fiche (valorisation, comptes, prévisions) et cours hebdomadaires. Aucune IA. */

const yf = new YahooFinance({
  suppressNotices: ["yahooSurvey", "ripHistorical"],
  versionCheck: false,
  validation: { logErrors: false, logOptionsErrors: false },
  queue: { concurrency: 10, interval: 35 },
});
const SANS_VALIDATION = { validateResult: false as const };

type Obj = Record<string, unknown>;
const num = (v: unknown): number | null => {
  if (typeof v === "number") return Number.isFinite(v) ? v : null;
  if (v && typeof v === "object" && "raw" in (v as Obj)) return num((v as Obj).raw);
  return null;
};
const txt = (v: unknown): string | null => (typeof v === "string" && v.trim() ? v.trim() : null);

const CHAMPS_NUM = [
  "marketCap", "enterpriseValue", "trailingPE", "forwardPE", "priceToBook", "enterpriseToEbitda", "enterpriseToRevenue",
  "priceToSalesTrailing12Months", "pegRatio", "dividendYield", "trailingAnnualDividendYield", "payoutRatio", "fiveYearAvgDividendYield",
  "returnOnEquity", "returnOnAssets", "profitMargins", "operatingMargins", "grossMargins", "ebitdaMargins", "revenueGrowth", "earningsGrowth",
  "earningsQuarterlyGrowth", "debtToEquity", "currentRatio", "quickRatio", "totalDebt", "totalCash", "ebitda", "totalRevenue", "freeCashflow",
  "operatingCashflow", "beta", "averageVolume", "fiftyTwoWeekHigh", "fiftyTwoWeekLow", "fiftyDayAverage", "twoHundredDayAverage",
  "currentPrice", "regularMarketPrice", "targetMeanPrice", "targetLowPrice", "targetHighPrice", "recommendationMean", "numberOfAnalystOpinions",
  "trailingEps", "forwardEps", "sharesOutstanding", "heldPercentInsiders", "heldPercentInstitutions", "fullTimeEmployees", "totalAssets", "yield",
  "annualReportExpenseRatio",
] as const;
const CHAMPS_TXT = ["longName", "shortName", "sector", "industry", "country", "currency", "financialCurrency", "exchange", "quoteType", "fundFamily", "category", "legalType", "website"] as const;

/** Lundi de la semaine (AAAA-MM-JJ), quel que soit le fuseau de la place de cotation. */
export function lundi(d: Date): string {
  const x = new Date(d.getTime() + 12 * 3600e3);
  const j = (x.getUTCDay() + 6) % 7;
  x.setUTCDate(x.getUTCDate() - j);
  return x.toISOString().slice(0, 10);
}

async function serieHebdo(sym: string, depuis: Date): Promise<{ serie: Serie; vol13: number | null; devise: string | null }> {
  const r = (await yf.chart(sym, { period1: depuis, interval: "1wk" }, SANS_VALIDATION)) as unknown as {
    meta?: Obj;
    quotes?: { date: Date | string | number; close?: number | null; adjclose?: number | null; volume?: number | null }[];
  };
  const parSemaine = new Map<string, [number, number]>();
  for (const q of r.quotes ?? []) {
    const c = num(q.adjclose) ?? num(q.close);
    if (c === null || c <= 0) continue;
    const d = q.date instanceof Date ? q.date : new Date(typeof q.date === "number" ? q.date * (q.date < 1e12 ? 1000 : 1) : q.date);
    if (Number.isNaN(d.getTime())) continue;
    parSemaine.set(lundi(d), [c, num(q.volume) ?? 0]);
  }
  const t = [...parSemaine.keys()].sort();
  const c = t.map((k) => +parSemaine.get(k)![0].toPrecision(7));
  const v = t.map((k) => Math.round(parSemaine.get(k)![1]));
  const derniers = v.slice(-14, -1).filter((x) => x > 0);
  const vol13 = derniers.length ? derniers.reduce((a, b) => a + b, 0) / derniers.length : null;
  return { serie: { t, c }, vol13, devise: txt(r.meta?.currency) };
}

async function fiche(sym: string, modules: string[]): Promise<Obj> {
  const r = (await yf.quoteSummary(sym, { modules: modules as never }, SANS_VALIDATION)) as unknown as Record<string, Obj | undefined>;
  const plat: Obj = {};
  for (const m of modules) {
    const o = r?.[m];
    if (!o || typeof o !== "object") continue;
    for (const k of CHAMPS_NUM) if (plat[k] == null && k in o) { const v = num(o[k]); if (v !== null) plat[k] = v; }
    for (const k of CHAMPS_TXT) if (plat[k] == null && k in o) { const v = txt(o[k]); if (v !== null) plat[k] = v; }
  }
  const fp = r?.fundProfile as Obj | undefined;
  const fe = (fp?.feesExpensesInvestment ?? {}) as Obj;
  const ter = num(fe.annualReportExpenseRatio) ?? num(fe.netExpRatio) ?? num(r?.defaultKeyStatistics?.annualReportExpenseRatio) ?? num(r?.summaryDetail?.expenseRatio);
  if (ter !== null) plat.ter = ter < 0.05 ? +(ter * 100).toFixed(3) : +ter.toFixed(3);
  if (fp && txt(fp.family)) plat.fundFamily = txt(fp.family);
  if (fp && txt(fp.categoryName)) plat.category = txt(fp.categoryName);
  const prof = r?.assetProfile ?? r?.summaryProfile;
  const resume = txt(prof?.longBusinessSummary);
  if (resume) plat.resume = resume.length > 700 ? resume.slice(0, 700).replace(/\s+\S*$/, "") + "…" : resume;
  const trend = (r?.earningsTrend?.trend as Obj[] | undefined) ?? [];
  for (const p of trend) {
    const per = txt(p.period);
    const eps = (p.epsTrend ?? {}) as Obj;
    if (per === "+1y") {
      plat.eps1y = num(eps.current); plat.eps1y90 = num(eps["90daysAgo"]); plat.g1 = num(p.growth);
    } else if (per === "0y") {
      plat.g0 = num(p.growth);
    } else if (per === "+5y") {
      plat.ltg = num(p.growth);
    }
  }
  return plat;
}

/** Trouve le titre coté sur la place du pays : recherche par ISIN, puis par nom de société. */
const PLACES_DE = [".F", ".BE", ".DU", ".MU", ".SG", ".HM", ".HA"];
async function chercher(q: string): Promise<Obj[]> {
  const r = (await yf.search(q, { quotesCount: 12, newsCount: 0 }, SANS_VALIDATION)) as unknown as { quotes?: Obj[] };
  return (r.quotes ?? []).filter((x) => txt(x.symbol) && (!x.quoteType || x.quoteType === "EQUITY"));
}
export async function resoudreIsin(isin: string, pays?: string, nom?: string | null): Promise<string | null> {
  const suf = pays ? SUFFIXE_PAYS[pays] : undefined;
  const pref = [suf, ".PA", ".DE", ".AS", ".MI", ".MC", ".BR", ".L", ".SW", ".ST", ".HE", ".CO", ".OL", ".VI", ".LS", ".IR"].filter(Boolean) as string[];
  const choisir = (qs: Obj[], seulement?: string) => {
    for (const s of seulement ? [seulement] : pref) { const q = qs.find((x) => String(x.symbol).endsWith(s)); if (q) return String(q.symbol); }
    return null;
  };
  const parIsin = await chercher(isin);
  const direct = choisir(parIsin);
  if (direct) return direct;
  if (nom) {
    const parNom = await chercher(nom);
    const n = choisir(parNom, suf) ?? (suf ? null : choisir(parNom));
    if (n) return n;
  }
  if (suf === ".DE") {
    const regional = parIsin.map((x) => String(x.symbol)).find((s) => PLACES_DE.some((p) => s.endsWith(p)));
    if (regional) return regional.slice(0, regional.lastIndexOf(".")) + ".DE";
  }
  return null;
}

export type Releve = { sym: string; fiche: Obj | null; serie: Serie; vol13: number | null };
/** Yahoo limite le débit : l'erreur est passagère, le titre sera repris au passage suivant sans compter d'échec. */
export class LimiteYahoo extends Error {}
const estLimite = (e: unknown) => /too many requests|\b429\b|rate limit|crumb/i.test(String(e instanceof Error ? e.message : e));

export async function releverTitre(l: Ligne, avecFiche = true): Promise<Releve> {
  try {
    let sym = l.sym || l.univ?.s || null;
    if (!sym && l.univ?.isin) sym = await resoudreIsin(l.univ.isin, l.univ.p, l.univ.n);
    if (!sym) throw new Error("symbole introuvable pour " + l.cle);
    const cinqAns = new Date(Date.now() - (5 * 365.25 + 21) * 864e5);
    if (l.type === "fx" || l.type === "proxy") {
      const { serie, devise } = await serieHebdo(sym, new Date("2005-01-01T00:00:00Z"));
      if (serie.t.length < 52) throw new Error("historique insuffisant");
      return { sym, fiche: { currency: devise }, serie, vol13: null };
    }
    const modules = l.type === "etf"
      ? ["price", "summaryDetail", "defaultKeyStatistics", "fundProfile"]
      : ["price", "summaryDetail", "defaultKeyStatistics", "financialData", "assetProfile", "earningsTrend"];
    const [h, f] = await Promise.all([
      serieHebdo(sym, cinqAns),
      avecFiche ? fiche(sym, modules).catch((e: unknown) => { if (estLimite(e)) throw e; return { erreurFiche: String(e).slice(0, 200) } as Obj; }) : Promise.resolve(null),
    ]);
    if (h.serie.t.length < 30) throw new Error("historique insuffisant (" + h.serie.t.length + " semaines)");
    if (f) {
      if (!f.currency && h.devise) f.currency = h.devise;
      if (h.vol13 !== null) f.vol13 = Math.round(h.vol13);
    }
    return { sym, fiche: f, serie: h.serie, vol13: h.vol13 !== null ? Math.round(h.vol13) : null };
  } catch (e) {
    if (estLimite(e)) throw new LimiteYahoo(String(e instanceof Error ? e.message : e).slice(0, 160));
    throw e;
  }
}

/** Diagnostic d'un symbole ou d'un ISIN (route de collecte, paramètres ?test= et ?isin=). */
export async function diagnostic(opts: { sym?: string; isin?: string; nom?: string; pays?: string }) {
  const out: Record<string, unknown> = {};
  if (opts.isin) {
    const r = (await yf.search(opts.isin, { quotesCount: 10, newsCount: 0 }, SANS_VALIDATION)) as unknown as { quotes?: Obj[] };
    out.recherche = (r.quotes ?? []).map((q) => ({ symbol: q.symbol, exchange: q.exchange, quoteType: q.quoteType, nom: q.shortname ?? q.longname }));
    out.resolu = await resoudreIsin(opts.isin, opts.pays, opts.nom);
  }
  if (opts.sym) {
    const depuis = new Date(Date.now() - (5 * 365.25 + 21) * 864e5);
    const brut = (await yf.chart(opts.sym, { period1: depuis, interval: "1wk" }, SANS_VALIDATION)) as unknown as { meta?: Obj; quotes?: Obj[] };
    const q = brut.quotes ?? [];
    out.points = q.length;
    out.premiers = q.slice(0, 2);
    out.derniers = q.slice(-2);
    out.meta = brut.meta ? { currency: brut.meta.currency, exchangeName: brut.meta.exchangeName, firstTradeDate: brut.meta.firstTradeDate, dataGranularity: brut.meta.dataGranularity, range: brut.meta.range } : null;
    const h = await serieHebdo(opts.sym, depuis);
    out.semaines = h.serie.t.length;
  }
  return out;
}
