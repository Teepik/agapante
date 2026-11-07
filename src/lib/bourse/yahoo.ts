import "server-only";
import YahooFinance from "yahoo-finance2";
import { SUFFIXE_PAYS } from "./config";
import type { Ligne, Serie } from "./stockage";

/* Relevé d'un titre sur Yahoo Finance : fiche (valorisation, comptes, prévisions) et cours hebdomadaires. Aucune IA. */

const yf = new YahooFinance({
  suppressNotices: ["yahooSurvey", "ripHistorical"],
  versionCheck: false,
  validation: { logErrors: false, logOptionsErrors: false },
  queue: { concurrency: 6, interval: 60 },
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

/** Trouve le titre coté sur la place du pays à partir d'un ISIN. */
export async function resoudreIsin(isin: string, pays?: string): Promise<string | null> {
  const r = (await yf.search(isin, { quotesCount: 10, newsCount: 0 }, SANS_VALIDATION)) as unknown as { quotes?: Obj[] };
  const qs = (r.quotes ?? []).filter((q) => txt(q.symbol) && (!q.quoteType || q.quoteType === "EQUITY"));
  const suf = pays ? SUFFIXE_PAYS[pays] : undefined;
  const pref = [suf, ".PA", ".DE", ".AS", ".MI", ".MC", ".BR", ".L", ".SW", ".ST", ".HE", ".CO", ".OL", ".VI", ".LS", ".IR"].filter(Boolean) as string[];
  for (const s of pref) {
    const q = qs.find((x) => String(x.symbol).endsWith(s));
    if (q) return String(q.symbol);
  }
  return null;
}

export type Releve = { sym: string; fiche: Obj; serie: Serie };

export async function releverTitre(l: Ligne): Promise<Releve> {
  let sym = l.sym || l.univ?.s || null;
  if (!sym && l.univ?.isin) sym = await resoudreIsin(l.univ.isin, l.univ.p);
  if (!sym) throw new Error("symbole introuvable pour " + l.cle);
  const cinqAns = new Date(Date.now() - (5 * 365.25 + 21) * 864e5);
  if (l.type === "fx" || l.type === "proxy") {
    const { serie, devise } = await serieHebdo(sym, new Date("2005-01-01T00:00:00Z"));
    if (serie.t.length < 52) throw new Error("historique insuffisant");
    return { sym, fiche: { currency: devise }, serie };
  }
  const modules = l.type === "etf"
    ? ["price", "summaryDetail", "defaultKeyStatistics", "fundProfile"]
    : ["price", "summaryDetail", "defaultKeyStatistics", "financialData", "assetProfile", "earningsTrend"];
  const [h, f] = await Promise.all([serieHebdo(sym, cinqAns), fiche(sym, modules).catch((e: unknown) => ({ erreurFiche: String(e).slice(0, 200) }) as Obj)]);
  if (h.serie.t.length < 30) throw new Error("historique insuffisant (" + h.serie.t.length + " semaines)");
  if (!f.currency && h.devise) f.currency = h.devise;
  if (h.vol13 !== null) f.vol13 = Math.round(h.vol13);
  return { sym, fiche: f, serie: h.serie };
}
