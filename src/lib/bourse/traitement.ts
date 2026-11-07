/* Traitement des relevés : rendements hebdomadaires en euros, notes de style, catégories, pièges, thèmes,
   rendement réel attendu par titre et épisodes de crise. Calcul pur, sans accès réseau. */
import {
  CIE, CYCL, EPISODES, ETF, FXT, IND, PAYS_FR, PAYS_ISO, PEA_PAYS, SECT_FR, SECT_PROXY, THEME_ETF, THEMES,
} from "./config";
import type { Ligne } from "./stockage";

type Num = number; // NaN = absent
const ok = (v: unknown): v is number => typeof v === "number" && Number.isFinite(v);
const nn = (v: unknown, lo?: number, hi?: number): Num => {
  if (!ok(v)) return NaN;
  if (lo !== undefined && v < lo) return NaN;
  if (hi !== undefined && v > hi) return NaN;
  return v;
};
const r2 = (v: Num) => (Number.isFinite(v) ? Math.round(v * 100) / 100 : null);
const median = (a: Num[]) => {
  const b = a.filter(Number.isFinite).sort((x, y) => x - y);
  if (!b.length) return NaN;
  const m = b.length >> 1;
  return b.length % 2 ? b[m] : (b[m - 1] + b[m]) / 2;
};
const ajouterJours = (iso: string, j: number) => {
  const d = new Date(iso + "T00:00:00Z");
  d.setUTCDate(d.getUTCDate() + j);
  return d.toISOString().slice(0, 10);
};

/** Rang centile façon pandas (rangs moyens en cas d'égalité, rang / effectif). asc=false : la plus petite valeur obtient le meilleur rang. */
function rank(v: Num[], asc = true): Num[] {
  const idx = v.map((x, i) => [x, i] as const).filter(([x]) => Number.isFinite(x)).sort((a, b) => (asc ? a[0] - b[0] : b[0] - a[0]));
  const out = new Array<Num>(v.length).fill(NaN);
  const n = idx.length;
  for (let i = 0; i < n; ) {
    let j = i;
    while (j + 1 < n && idx[j + 1][0] === idx[i][0]) j++;
    const rk = (i + j + 2) / 2;
    for (let k = i; k <= j; k++) out[idx[k][1]] = (rk / n) * 100;
    i = j + 1;
  }
  return out;
}

type Item = Record<string, unknown> & { id: string; secteurEn: string | null };

export type Sortie = {
  /** Fiches des actions en colonnes (cols, rows) pour alléger le transfert, avec méta et épisodes. */
  actions: { meta: Record<string, unknown>; cols: string[]; rows: unknown[][]; chocs: Record<string, unknown> };
  etf: { etf: Record<string, unknown>[] };
  retsmeta: { dates: string[]; unit: number; usd: string };
  /** Rendements hebdomadaires par titre, base64 d'entiers 16 bits (unité 1e-4, −32768 = absent). */
  rets: Record<string, string>;
  /** Fiches complètes (objets), pour les contrôles. */
  liste: Record<string, unknown>[];
};
const ZONES = { us: "us", eu: "eu", jp: "jp", ca: "ca", au: "au" } as Record<string, string>;
function b64(a: Num[]): string {
  const t = new Int16Array(a.length);
  for (let i = 0; i < a.length; i++) t[i] = Number.isFinite(a[i]) ? Math.max(-32767, Math.min(32767, Math.round(a[i] * 10000))) : -32768;
  return Buffer.from(t.buffer).toString("base64");
}

export type NotesPassees = Map<string, { sc: (number | null)[]; cat: string | null; pg: string | null }>;

export function traiter(lignes: Ligne[], atlas: { pays: Record<string, { cape?: number }> }, semaines = 260,
  passe: { w1?: NotesPassees; w4?: NotesPassees; w13?: NotesPassees; depuis?: Record<string, string | null> } = {}): Sortie {
  const parSym = new Map<string, Ligne>();
  for (const l of lignes) if (l.serie && l.sym) parSym.set(l.sym, l);
  const titres = lignes.filter((l) => (l.type === "action" || l.type === "etf") && l.serie && l.sym);

  /* ---- Calendrier : lundis consécutifs jusqu'à la dernière semaine couverte par 70 % des titres ---- */
  const fins = titres.map((l) => l.serie!.t[l.serie!.t.length - 1]).sort();
  const fin = fins.length ? fins[Math.floor(fins.length * 0.3)] : new Date().toISOString().slice(0, 10);
  const cal: string[] = [];
  for (let k = semaines; k >= 0; k--) cal.push(ajouterJours(fin, -7 * k));
  const T = cal.length;
  /* Titres qui ne cotent plus (retrait de la cote, rachat) : dernier cours plus de trois semaines avant la fin du calendrier */
  const limite = ajouterJours(fin, -21);
  for (let i = titres.length - 1; i >= 0; i--) { const t = titres[i].serie!.t; if (t[t.length - 1] < limite) titres.splice(i, 1); }

  /* Cours reportés sur le calendrier (dernier cours connu, rien avant la première cotation) */
  const surCal = (l: Ligne): Num[] => {
    const { t, c } = l.serie!;
    const out = new Array<Num>(T).fill(NaN);
    let j = 0, last = NaN;
    for (let i = 0; i < T; i++) {
      while (j < t.length && t[j] <= cal[i]) { last = c[j]; j++; }
      out[i] = last;
    }
    return out;
  };
  const fxCache = new Map<string, Num[]>();
  const fxRet = (ccy: string): Num[] => {
    const s = FXT[ccy];
    if (!s) return new Array(T).fill(0);
    if (!fxCache.has(s)) {
      const l = parSym.get(s);
      if (!l) fxCache.set(s, new Array(T).fill(0));
      else {
        const p = surCal(l);
        fxCache.set(s, p.map((v, i) => (i === 0 || !Number.isFinite(v) || !Number.isFinite(p[i - 1]) ? 0 : p[i - 1] / v - 1)));
      }
    }
    return fxCache.get(s)!;
  };
  const fxDernier = (ccy: string): number => {
    const s = FXT[ccy];
    const l = s ? parSym.get(s) : undefined;
    if (ccy === "EUR" || !l) return 1;
    const v = l.serie!.c[l.serie!.c.length - 1];
    return 1 / v / (ccy === "GBp" || ccy === "GBX" ? 100 : 1);
  };
  /* Rendements hebdomadaires en euros (fractions), longueur T − 1 */
  const R = new Map<string, Num[]>();
  for (const l of titres) {
    const ccy = String(l.fiche?.currency ?? "EUR");
    const p = surCal(l), fx = fxRet(ccy);
    const r: Num[] = [];
    for (let i = 1; i < T; i++) {
      const a = p[i - 1], b = p[i];
      let x = Number.isFinite(a) && Number.isFinite(b) ? b / a - 1 : NaN;
      // Erreurs de cotation (pic isolé, passage pence ↔ livre) : un titre ne double pas et ne perd pas 60 % en une semaine sans nouvelle majeure
      if (x > 1 || x < -0.6) x = 0;
      r.push(Number.isFinite(x) ? (1 + x) * (1 + fx[i]) - 1 : NaN);
    }
    R.set(l.sym!, r);
  }
  const dates = cal.slice(1);
  const monde = R.get("EUNL.DE");

  const stats = (r: Num[]) => {
    const first = r.findIndex(Number.isFinite);
    if (first < 0) return null;
    const rr = r.slice(first).map((v) => (Number.isFinite(v) ? v : 0));
    if (rr.length < 52) return null;
    const r3 = rr.slice(-156), n3 = r3.length;
    const m3 = r3.reduce((a, b) => a + b, 0) / n3;
    const v3 = r3.reduce((a, b) => a + (b - m3) ** 2, 0) / (n3 - 1);
    const out: Record<string, number> = { vol: Math.sqrt(v3 * 52) * 100 };
    if (monde) {
      const w = monde.slice(-n3).map((v) => (Number.isFinite(v) ? v : 0));
      const mw = w.reduce((a, b) => a + b, 0) / n3;
      let cv = 0, vw = 0;
      for (let i = 0; i < n3; i++) { cv += (r3[i] - m3) * (w[i] - mw); vw += (w[i] - mw) ** 2; }
      if (vw > 0) out.beta = cv / vw;
    }
    const lv: number[] = []; let x = 1;
    for (const v of rr) { x *= 1 + v; lv.push(x); }
    const L = lv.length;
    if (L >= 53) out.mom12 = (lv[L - 5] / lv[L - 53] - 1) * 100;
    if (L >= 14) out.mom3 = (lv[L - 1] / lv[L - 14] - 1) * 100;
    const y = lv.slice(-53); let pk = -Infinity, dd = 0;
    for (const v of y) { pk = Math.max(pk, v); dd = Math.min(dd, v / pk - 1); }
    out.dd1y = dd * 100;
    out.hist = rr.length;
    return out;
  };

  /* ---- Fiches actions ---- */
  const items: Item[] = [];
  for (const l of titres) {
    if (l.type !== "action") continue;
    const f = (l.fiche ?? {}) as Record<string, unknown>;
    if (f.quoteType && f.quoteType !== "EQUITY") continue;
    const st = stats(R.get(l.sym!)!);
    if (!st) continue;
    const ccy = String(f.currency ?? "EUR");
    const pence = ccy === "GBp" || ccy === "GBX";
    const fxe = fxDernier(ccy);
    const price = Number.isFinite(nn(f.currentPrice)) ? nn(f.currentPrice) : nn(f.regularMarketPrice);
    const mcap = nn(f.marketCap, 0);
    const mcapEur = Number.isFinite(mcap) && mcap > 0 ? mcap * fxDernier(pence ? "GBP" : ccy) : NaN;
    let dy = nn(f.dividendYield, 0);
    if (Number.isFinite(dy) && dy > 0.3) dy = dy / 100;
    if (!Number.isFinite(dy)) dy = nn(f.trailingAnnualDividendYield, 0, 0.3);
    const finSame = String(f.financialCurrency ?? ccy).toUpperCase().slice(0, 3) === ccy.toUpperCase().slice(0, 3);
    const fcf = nn(f.freeCashflow);
    const fcfY = Number.isFinite(fcf) && mcap > 0 && finSame ? fcf / mcap : NaN;
    const debt = nn(f.totalDebt), cash = nn(f.totalCash), ebitda = nn(f.ebitda);
    const sect = (f.sector as string) || null;
    const nde = Number.isFinite(debt) && ebitda > 0 && sect !== "Financial Services" ? (debt - (Number.isFinite(cash) ? cash : 0)) / ebitda : NaN;
    const c0 = nn(f.eps1y), c90 = nn(f.eps1y90);
    const rev90 = c0 > 0 && c90 > 0 ? (c0 / c90 - 1) * 100 : NaN;
    const g1 = nn(f.g1), ltg = nn(f.ltg);
    const pef = nn(f.forwardPE, 0, 300), pet = nn(f.trailingPE, 0, 300);
    const tgt = nn(f.targetMeanPrice, 0);
    const vol13 = nn(f.vol13, 0);
    const liq = vol13 > 0 && price > 0 ? (vol13 / 5) * price * fxe : NaN;
    const paysEn = (f.country as string) || l.univ?.p || (l.univ?.r === "us" ? "United States" : null);
    const pct = (v: unknown, lo: number, hi: number) => { const x = nn(v, lo, hi); return Number.isFinite(x) ? x * 100 : NaN; };
    let nom = String(f.longName || f.shortName || l.univ?.n || l.sym).trim();
    const SUFFIXES = /(,|\s)\s*(Inc\.?|Incorporated|Corporation|Corp\.?|Company|Co\.|plc|PLC|S\.A\.|SA|SE|S\.E\.|N\.V\.|NV|AG|A\/S|ASA|AB|Oyj|Abp|S\.p\.A\.|SpA|S\.A\.B\.|Société Européenne|\(publ\)|\(The\)|Holding AG|Ltd\.?|Limited|KGaA|& Co\.)$/;
    for (let k = 0; k < 4 && SUFFIXES.test(nom); k++) nom = nom.replace(SUFFIXES, "").trim().replace(/[,-]$/, "").trim();
    if (nom === nom.toUpperCase() && nom.includes(" ") && nom.length > 8) nom = nom.replace(/\B[A-ZÀ-Ý]+/g, (w) => w.toLowerCase());
    items.push({
      id: l.sym!, nom, x: l.univ?.x ?? null, isin: l.univ?.isin ?? null,
      pays: paysEn ? PAYS_FR[paysEn] ?? paysEn : null, paysEn, zone: ZONES[l.univ?.r ?? ""] ?? "autres",
      secteurEn: sect, secteur: sect ? SECT_FR[sect] ?? sect : "—", industrie: (f.industry as string) || null, ccy,
      px: price, tgt, mcap: Number.isFinite(mcapEur) ? mcapEur / 1e9 : NaN, per: pet, perF: pef,
      // Certificats américains de sociétés étrangères : cours en dollars, comptes en devise locale, ces deux ratios n'ont pas de sens
      pb: l.univ?.r === "autres" && !finSame ? NaN : nn(f.priceToBook, 0, 200),
      evEbitda: l.univ?.r === "autres" && !finSame ? NaN : nn(f.enterpriseToEbitda, 0, 150), dy: Number.isFinite(dy) ? dy * 100 : NaN, payout: nn(f.payoutRatio, 0, 5),
      fcfY: Number.isFinite(fcfY) ? fcfY * 100 : NaN, roe: pct(f.returnOnEquity, -5, 5), opm: pct(f.operatingMargins, -5, 1),
      gm: pct(f.grossMargins, -5, 1), nde, revG: pct(f.revenueGrowth, -1, 10), epsG: pct(f.earningsGrowth, -1, 10),
      g1: Number.isFinite(g1) ? g1 * 100 : NaN, ltg: Number.isFinite(ltg) ? ltg * 100 : NaN, rev90,
      upside: tgt > 0 && price > 0 ? (tgt / price - 1) * 100 : NaN, reco: nn(f.recommendationMean, 1, 5), nAna: nn(f.numberOfAnalystOpinions, 0),
      liq: Number.isFinite(liq) ? liq / 1e6 : NaN, pea: paysEn ? PEA_PAYS.has(paysEn) : false, resume: (f.resume as string) || null,
      ...st,
    });
  }

  /* ---- Notes de style : rangs centiles, moitié dans l'univers, moitié dans le secteur ---- */
  const col = (k: string) => items.map((it) => (ok(it[k]) ? (it[k] as number) : NaN));
  const sect = items.map((it) => it.secteurEn ?? "");
  const estFin = items.map((it) => it.secteurEn === "Financial Services");
  const srank = (vals: Num[], asc = true, mix = 0.5): Num[] => {
    const g = rank(vals, asc);
    const sec = new Array<Num>(vals.length).fill(NaN);
    const groupes = new Map<string, number[]>();
    sect.forEach((s, i) => { if (!groupes.has(s)) groupes.set(s, []); groupes.get(s)!.push(i); });
    for (const idx of groupes.values()) {
      const sub = idx.map((i) => vals[i]);
      if (sub.filter(Number.isFinite).length >= 5) { const rr = rank(sub, asc); idx.forEach((i, k) => (sec[i] = rr[k])); }
      else idx.forEach((i) => (sec[i] = g[i]));
    }
    return vals.map((_, i) => (1 - mix) * g[i] + mix * sec[i]);
  };
  const sauf = (a: Num[], masque: boolean[]) => a.map((v, i) => (masque[i] ? NaN : v));
  const combo = (parts: Num[][]): Num[] => {
    const m = items.map((_, i) => { const v = parts.map((p) => p[i]).filter(Number.isFinite); return v.length ? v.reduce((a, b) => a + b, 0) / v.length : NaN; });
    return rank(m);
  };
  const inv = (a: Num[]) => a.map((v) => (v > 0 ? 1 / v : NaN));
  const perF = col("perF"), per = col("per");
  const ey = perF.map((v, i) => (v > 0 ? 1 / v : per[i] > 0 ? 1 / per[i] : NaN));
  const gBest = items.map((it) => (ok(it.ltg) ? (it.ltg as number) : ok(it.g1) ? (it.g1 as number) : NaN));
  const nonFin = estFin;
  const S: Record<string, Num[]> = {
    v: combo([srank(ey), srank(inv(col("pb"))), sauf(srank(inv(col("evEbitda"))), nonFin), srank(col("dy"), true, 0.3), sauf(srank(col("fcfY")), nonFin)]),
    g: combo([srank(col("revG"), true, 0.3), srank(col("epsG"), true, 0.3), srank(gBest, true, 0.3)]),
    q: combo([srank(col("roe")), srank(col("opm")), sauf(srank(col("gm")), nonFin), sauf(srank(col("nde").map((v) => -v)), nonFin)]),
    m: combo([rank(col("mom12")), rank(col("rev90"))]),
    d: combo([rank(col("vol"), false), rank(col("beta"), false)]),
  };
  const dyc = col("dy"), payout = col("payout"), fcfYc = col("fcfY");
  S.y = rank(dyc.map((v, i) => (payout[i] > 1 || fcfYc[i] < 0 ? v * 0.3 : v)));
  S.s = rank(col("mcap").map((v) => (v > 0 ? Math.log(v) : NaN)), false);

  /* ---- Catégories, pièges, thèmes, confirmation par le marché, rendement attendu ---- */
  const capes = Object.values(atlas.pays).map((c) => c.cape).filter(ok).sort((a, b) => a - b);
  const medCape = capes[capes.length >> 1] ?? 20;
  const panier = (w: Record<string, number>) => 100 * Object.entries(w).reduce((s, [k, x]) => s + x / (atlas.pays[k]?.cape ?? medCape), 0);
  const EY_EU = panier({ GB: 0.22, FR: 0.17, CH: 0.15, DE: 0.14, NL: 0.07, SE: 0.05, DK: 0.045, ES: 0.045, IT: 0.045, _: 0.065 });
  const EY_US = panier({ US: 1 });
  const gmed = median(gBest);
  const mom12 = col("mom12");
  const secMed = new Map<string, number>();
  for (const s of new Set(sect)) secMed.set(s, median(items.map((_, i) => (sect[i] === s ? mom12[i] : NaN))));

  const z = (v: unknown) => (ok(v) ? v : 0);
  const actions = items.map((it, i) => {
    const sc: Record<string, number | null> = {};
    for (const k of "vgqmdys") sc[k] = Number.isFinite(S[k][i]) ? Math.round(S[k][i]) : null;
    const [v, g, q, m, d, y] = ["v", "g", "q", "m", "d", "y"].map((k) => z(sc[k]));
    let cat: string;
    if (v >= 65 && g >= 60) cat = "Croissance à prix raisonnable";
    else if (q >= 70 && g >= 65) cat = "Qualité et croissance";
    else if (v >= 70 && z(it.mom3) > 3 && z(it.mom12) < 0 && z(it.rev90) > 0) cat = "Redressement";
    else {
      const best = ([["Value", v], ["Croissance", g], ["Qualité", q], ["Momentum", m], ["Défensive", d], ["Rendement", y]] as [string, number][])
        .reduce((a, b) => (b[1] > a[1] ? b : a));
      cat = best[1] >= 60 ? best[0] : "Profil équilibré";
    }
    const pg: [string, string][] = [];
    if (v >= 75 && (z(it.mom12) < -15 || z(it.rev90) < -5) && z(it.revG) < 0)
      pg.push(["Value piège", "Bon marché, mais chiffre d'affaires en baisse et cours ou prévisions qui reculent : la décote peut durer."]);
    if (g >= 70 && z(it.perF) > 45)
      pg.push(["Croissance payée cher", `PER prévisionnel de ${Math.round(it.perF as number)} : une simple déception sur la croissance suffit à faire baisser le cours.`]);
    if (z(it.dy) > 6 && (z(it.payout) > 1 || (ok(it.fcfY) && (it.fcfY as number) < 0)))
      pg.push(["Dividende fragile", "Dividende supérieur aux bénéfices ou au flux de trésorerie disponible : une baisse est probable."]);
    if (z(it.nde) > 4) pg.push(["Dette lourde", `Dette nette de ${(it.nde as number).toFixed(1).replace(".", ",")} fois l'excédent brut d'exploitation.`]);
    if (ok(it.liq) && (it.liq as number) < 1) pg.push(["Peu liquide", "Moins d'un million d'euros échangés par jour en moyenne."]);
    const th: Record<string, number> = { ...(IND[(it.industrie as string) ?? ""] ?? {}), ...(CIE[it.id] ?? {}) };
    for (const k of Object.keys(th)) if (!th[k]) delete th[k];
    const momRel = Number.isFinite(mom12[i]) ? mom12[i] - (secMed.get(sect[i]) ?? NaN) : NaN;
    let conf = 0;
    if (ok(it.rev90)) conf += (it.rev90 as number) > 2 ? 1 : (it.rev90 as number) < -2 ? -1 : 0;
    if (Number.isFinite(momRel)) conf += momRel > 10 ? 1 : momRel < -10 ? -1 : 0;
    const iso = PAYS_ISO[(it.paysEn as string) ?? ""];
    const reg = it.zone === "us" ? EY_US : it.zone === "eu" ? EY_EU : iso && atlas.pays[iso]?.cape ? 100 / atlas.pays[iso].cape! : 100 / medCape;
    let muR: number;
    if (!(ey[i] > 0)) muR = reg - 1;
    else {
      const gg = Math.max(-10, Math.min(30, Number.isFinite(gBest[i]) ? gBest[i] : gmed));
      const model = ey[i] * 100 + 0.25 * (gg - gmed);
      muR = Math.max(-1, Math.min(12, 0.5 * model + 0.5 * reg));
    }
    const out: Record<string, unknown> = {};
    for (const [k, val] of Object.entries(it)) out[k] = typeof val === "number" ? r2(val) : val;
    out.momRel = r2(momRel); out.conf = conf; out.muR = r2(muR); out.cat = cat;
    out.cyclique = !!it.secteurEn && CYCL.has(it.secteurEn) && (ok(it.beta) ? (it.beta as number) : 1) > 0.9;
    out.sc = sc; out.th = th; out.pg = pg;
    // Notes passées (historique hebdomadaire) : 7 notes dans l'ordre v g q m d y s, catégorie, pièges
    for (const [k, m] of [["h1", passe.w1], ["h4", passe.w4], ["h13", passe.w13]] as const) {
      const p = m?.get(it.id);
      if (!p) continue;
      out[k] = p.sc; out["c" + k.slice(1)] = p.cat;
      if (k === "h1") out.pg1 = p.pg;
    }
    return out;
  });
  actions.sort((a, b) => ((b.mcap as number) ?? 0) - ((a.mcap as number) ?? 0));

  /* ---- ETF : liste éditoriale, puis ETF découverts (classement fait à la constitution de l'univers) ---- */
  const etf: Record<string, unknown>[] = [];
  const vus = new Set<string>();
  const ajouterEtf = (id: string, meta: Record<string, unknown>) => {
    const r = R.get(id);
    if (!r || vus.has(id)) return;
    const st = stats(r);
    if (!st) return;
    const f = (parSym.get(id)?.fiche ?? {}) as Record<string, unknown>;
    const aum = nn(f.totalAssets, 0);
    const o: Record<string, unknown> = { id, ...meta, aum: aum > 0 ? Math.round(aum / 1e7) / 100 : null, ccy: f.currency ?? "EUR" };
    if (o.ter == null && ok(f.ter)) o.ter = f.ter;
    if (!o.f && f.fundFamily) o.f = f.fundFamily;
    for (const [k, v] of Object.entries(st)) o[k] = r2(v);
    etf.push(o); vus.add(id);
  };
  for (const [id, [nom, isin, ter, cls, pea, pl]] of Object.entries(ETF)) ajouterEtf(id, { nom, isin, ter, cls, pea, pl, th: THEME_ETF[id] ?? {}, ed: true });
  for (const l of titres) {
    if (l.type !== "etf" || !l.univ || ETF[l.sym!]) continue;
    const u = l.univ as Record<string, unknown>;
    if (!u.cls) continue;
    const { s: _s, n, ...rest } = u;
    void _s;
    ajouterEtf(l.sym!, { nom: n || l.sym, ...rest, th: u.th ?? {}, pea: !!u.pea });
  }

  /* ---- Rendements compacts ---- */
  const rets: Record<string, string> = {};
  for (const o of [...actions, ...etf]) rets[o.id as string] = b64(R.get(o.id as string)!);
  const usd = fxRet("USD").slice(1);

  /* ---- Épisodes de crise (indices de référence, cours reportés au lundi) ---- */
  const ep = (sym: string, a: string, b: string, conv?: string): number | null => {
    const l = parSym.get(sym);
    if (!l) return null;
    const pts = l.serie!.t.map((t, i) => [t, l.serie!.c[i]] as const).filter(([t]) => t >= a && t <= b);
    if (pts.length < 2) return null;
    let r = pts[pts.length - 1][1] / pts[0][1] - 1;
    if (conv) {
      const fl = parSym.get(conv);
      const fp = fl ? fl.serie!.t.map((t, i) => [t, fl.serie!.c[i]] as const).filter(([t]) => t >= a && t <= b) : [];
      if (fp.length >= 2) r = (1 + r) * (fp[0][1] / fp[fp.length - 1][1]) - 1;
    }
    return Math.round(r * 1000) / 10;
  };
  const chocs: Record<string, unknown> = {};
  for (const [k, [a, b]] of Object.entries(EPISODES)) {
    const mkUs = ep("^GSPC", a, b);
    const secs: Record<string, number> = {};
    for (const [s, px] of Object.entries(SECT_PROXY)) { const v = ep(px, a, b); if (v !== null && mkUs !== null) secs[s] = Math.round((v - mkUs) * 10) / 10; }
    const fl = parSym.get("EURUSD=X");
    let usdEur: number | null = null;
    if (fl) {
      const fp = fl.serie!.t.map((t, i) => [t, fl.serie!.c[i]] as const).filter(([t]) => t >= a && t <= b);
      if (fp.length >= 2) usdEur = Math.round((fp[0][1] / fp[fp.length - 1][1] - 1) * 1000) / 10;
    }
    chocs[k] = { debut: a, fin: b, us_eur: ep("^GSPC", a, b, "EURUSD=X"), us: mkUs, eu: ep("^STOXX", a, b) ?? ep("^FCHI", a, b), or_eur: ep("GC=F", a, b, "EURUSD=X"),
      usd: usdEur, tlt_eur: ep("TLT", a, b, "EURUSD=X"), ief_eur: ep("IEF", a, b, "EURUSD=X"), secteurs_rel: secs };
  }

  const majs = lignes.map((l) => l.maj).filter(Boolean).map((d) => new Date(d as string).getTime()).sort((a, b) => a - b);
  const meta = {
    date: majs.length ? new Date(majs[majs.length - 1]).toISOString() : null,
    plusAncien: majs.length ? new Date(majs[0]).toISOString() : null,
    fin, actions: actions.length, etf: etf.length, semaines: dates.length, themes: THEMES,
    zones: actions.reduce<Record<string, number>>((o, a) => { o[a.zone as string] = (o[a.zone as string] || 0) + 1; return o; }, {}),
    styles: { v: "Value", g: "Croissance", q: "Qualité", m: "Momentum", d: "Défensive", y: "Rendement", s: "Petite et moyenne capitalisation" },
    eyEU: r2(EY_EU), eyUS: r2(EY_US), gmed: r2(gmed), histo: passe.depuis ?? {},
  };
  const cols = [...new Set(actions.flatMap((a) => Object.keys(a)))].filter((k) => k !== "resume");
  const rows = actions.map((a) => cols.map((k) => (a[k] === undefined ? null : a[k])));
  return { actions: { meta, cols, rows, chocs }, etf: { etf }, retsmeta: { dates, unit: 1e-4, usd: b64(usd) }, rets, liste: actions };
}
