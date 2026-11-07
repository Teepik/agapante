"""Collecte hebdomadaire de agapante.com/bourse : univers, cours hebdomadaires sur 5 ans, comptes des sociétés.
Aucune IA : Yahoo Finance via yfinance, Wikipédia pour la liste du S&P 500."""
import os, io, json, time, datetime, traceback
from concurrent.futures import ThreadPoolExecutor
import pandas as pd, numpy as np, requests, yfinance as yf

ICI = os.path.dirname(os.path.abspath(__file__))
OUT = os.path.join(ICI, "_brut"); os.makedirs(OUT, exist_ok=True)
CFG = json.load(open(os.path.join(ICI, "config.json")))
LIMIT = int(os.environ.get("BOURSE_LIMITE", CFG.get("limit", 0)))
T0 = time.time(); LOG = []
def log(*a):
    s = " ".join(str(x) for x in a); print(s, flush=True)
    if any(k in s for k in ("total", "Terminé", "échec", "valides", "fiches complètes", "retenues")): print(f"::notice title=Collecte::{s[:900]}", flush=True)
    LOG.append(f"{int(time.time()-T0):5d}s {s}")
UA = {"User-Agent": "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36"}
try: yf.set_tz_cache_location("/tmp/yfcache")
except Exception: pass
log("yfinance", yf.__version__)

# ---------- 1. Univers ----------
univers = {}
def add(sym, **kw):
    if sym and sym not in univers: univers[sym] = {"yf": sym, **kw}

def sp500():
    html = requests.get("https://en.wikipedia.org/wiki/List_of_S%26P_500_companies", headers=UA, timeout=30).text
    t = pd.read_html(io.StringIO(html))[0]
    for s, n, sec, ind in zip(t["Symbol"], t["Security"], t["GICS Sector"], t["GICS Sub-Industry"]):
        add(str(s).replace(".", "-"), nom=n, indice="S&P 500", region="us", gics=sec, gics_sub=ind)
try:
    sp500(); log("S&P 500 :", len(univers))
except Exception as e:
    log("S&P 500 : échec", repr(e))

def screen_region(reg, n, exchanges):
    from yfinance import EquityQuery
    got, off = [], 0
    while len(got) < n * 2 and off < 1000:
        q = EquityQuery("and", [EquityQuery("eq", ["region", reg]), EquityQuery("gt", ["intradaymarketcap", 1e9])])
        r = yf.screen(q, size=250, offset=off, sortField="intradaymarketcap", sortAsc=False)
        qs = r.get("quotes", []) if isinstance(r, dict) else []
        if not qs: break
        got += qs; off += 250
        if len(qs) < 250: break
    keep = [x for x in got if x.get("exchange") in exchanges and x.get("quoteType", "EQUITY") == "EQUITY"]
    return keep[:n]
n_eu = 0
for reg, n in CFG["eu_targets"].items():
    try:
        rows = screen_region(reg, n, CFG["eu_exchanges"][reg])
        for x in rows:
            add(x["symbol"], nom=x.get("longName") or x.get("shortName"), indice="Europe", region=reg)
        n_eu += len(rows); log(f"Europe {reg} : {len(rows)} titres")
        time.sleep(1)
    except Exception as e:
        log(f"Europe {reg} : échec", repr(e))
log("Europe total :", n_eu)
if n_eu < 100:
    log("Repli sur les listes d'indices de Wikipédia")
    for url, suf in CFG.get("repli_wikipedia", {}).items():
        try:
            html = requests.get(url, headers=UA, timeout=30).text
            best = None
            for t in pd.read_html(io.StringIO(html)):
                cols = [c for c in t.columns if any(k in str(c).lower() for k in ("ticker", "symbol", "code"))]
                if cols and len(t) >= 15 and (best is None or len(t) > len(best[0])): best = (t, cols[0])
            if best is None: log("  aucune table", url); continue
            t, col = best; nn = 0
            for v in t[col].astype(str):
                v = v.strip().split(" ")[0] if suf != ".CO" and suf != ".ST" else v.strip().replace(" ", "-")
                if not v or v.lower() == "nan": continue
                base = v.split(".")[0] if v.count(".") == 1 and len(v.split(".")[1]) <= 2 else v.replace(".", "-")
                add(base + suf, nom=None, indice="Europe", region=suf); nn += 1
            log("  ", url.split("/")[-1], nn)
        except Exception as e:
            log("  échec", url, repr(e))

stocks = list(univers)
if LIMIT:
    us = [s for s in stocks if univers[s]["region"] == "us"][:LIMIT // 2]
    eu = [s for s in stocks if univers[s]["region"] != "us"][:LIMIT - len(us)]
    stocks = us + eu
log("Actions retenues :", len(stocks))

# ---------- 2. Cours hebdomadaires ----------
def download(tickers, **kw):
    frames = []
    for i in range(0, len(tickers), 80):
        chunk = tickers[i:i+80]
        for essai in range(3):
            try:
                d = yf.download(chunk, interval="1wk", auto_adjust=True, progress=False, threads=True, group_by="column", **kw)
                c = d["Close"] if isinstance(d.columns, pd.MultiIndex) else d[["Close"]].rename(columns={"Close": chunk[0]})
                v = d["Volume"] if isinstance(d.columns, pd.MultiIndex) else d[["Volume"]].rename(columns={"Volume": chunk[0]})
                frames.append((c, v)); break
            except Exception as e:
                log("téléchargement : nouvel essai", i, repr(e)); time.sleep(5 * (essai + 1))
        time.sleep(1)
    if not frames: return pd.DataFrame(), pd.DataFrame()
    return pd.concat([f[0] for f in frames], axis=1), pd.concat([f[1] for f in frames], axis=1)

allt = stocks + CFG["etf"] + CFG["fx"]
px, vol = download(allt, period="5y")
px = px.loc[:, ~px.columns.duplicated()]
ok_cols = [c for c in px.columns if px[c].notna().sum() >= 52]
px = px[ok_cols]
log("Cours : séries valides", len(ok_cols), "sur", len(allt), "· semaines", len(px))
px.index = px.index.strftime("%Y-%m-%d")
px.round(5).to_csv(f"{OUT}/prix_hebdo.csv")
# volume moyen en titres sur 13 semaines (liquidité)
vol = vol.loc[:, ~vol.columns.duplicated()]
volm = {c: float(vol[c].tail(13).mean()) for c in vol.columns if c in ok_cols and vol[c].tail(13).notna().any()}

pxp, _ = download(CFG["proxies"] + CFG["fx"], start="2005-01-01")
pxp = pxp.loc[:, ~pxp.columns.duplicated()]
pxp.index = pxp.index.strftime("%Y-%m-%d")
pxp.round(5).to_csv(f"{OUT}/proxies_hebdo.csv")
log("Proxies : séries", pxp.shape[1], "· semaines", len(pxp))

# ---------- 3. Comptes et prévisions ----------
FIELDS = ["longName","shortName","sector","industry","country","currency","financialCurrency","exchange","marketCap","enterpriseValue",
  "trailingPE","forwardPE","priceToBook","enterpriseToEbitda","enterpriseToRevenue","priceToSalesTrailing12Months","pegRatio","trailingPegRatio",
  "dividendYield","trailingAnnualDividendYield","payoutRatio","fiveYearAvgDividendYield","returnOnEquity","returnOnAssets",
  "profitMargins","operatingMargins","grossMargins","ebitdaMargins","revenueGrowth","earningsGrowth","earningsQuarterlyGrowth",
  "debtToEquity","currentRatio","quickRatio","totalDebt","totalCash","ebitda","totalRevenue","freeCashflow","operatingCashflow",
  "beta","averageVolume","averageDailyVolume10Day","fiftyTwoWeekHigh","fiftyTwoWeekLow","fiftyDayAverage","twoHundredDayAverage",
  "currentPrice","regularMarketPrice","targetMeanPrice","targetLowPrice","targetHighPrice","recommendationMean","numberOfAnalystOpinions",
  "trailingEps","forwardEps","sharesOutstanding","heldPercentInsiders","heldPercentInstitutions","fullTimeEmployees","quoteType",
  "totalAssets","yield","netExpenseRatio","fundFamily","category","legalType"]
def clean(v):
    if isinstance(v, (np.floating, float)):
        return None if (np.isnan(v) or np.isinf(v)) else float(v)
    if isinstance(v, (np.integer,)): return int(v)
    return v
def fetch(sym):
    out = {"yf": sym}
    for essai in range(3):
        try:
            t = yf.Ticker(sym)
            info = t.info or {}
            for f in FIELDS:
                if f in info: out[f] = clean(info[f])
            if sym in stocks:
                try:
                    et = t.eps_trend
                    if et is not None and len(et):
                        out["eps_trend"] = {str(i): {str(k): clean(v) for k, v in row.items()} for i, row in et.iterrows() if str(i) in ("0y", "+1y")}
                except Exception: pass
                try:
                    er = t.eps_revisions
                    if er is not None and len(er):
                        out["eps_rev"] = {str(i): {str(k): clean(v) for k, v in row.items()} for i, row in er.iterrows() if str(i) in ("0y", "+1y")}
                except Exception: pass
                try:
                    ge = t.growth_estimates
                    if ge is not None and len(ge):
                        out["growth_est"] = {str(i): {str(k): clean(v) for k, v in row.items()} for i, row in ge.iterrows()}
                except Exception: pass
            return out
        except Exception as e:
            if essai == 2: out["erreur"] = repr(e)[:200]
            time.sleep(3 * (essai + 1))
    return out
targets = [s for s in stocks if s in ok_cols] + [e for e in CFG["etf"] if e in ok_cols]
infos = {}
with ThreadPoolExecutor(max_workers=3) as ex:
    for i, res in enumerate(ex.map(fetch, targets)):
        infos[res["yf"]] = res
        if i % 100 == 0: log("Comptes :", i, "/", len(targets))
for s in infos:
    if s in univers: infos[s].update({k: v for k, v in univers[s].items() if k not in infos[s]})
    if s in volm: infos[s]["vol13"] = volm[s]
n_ok = sum(1 for v in infos.values() if v.get("marketCap") or v.get("totalAssets"))
log("Comptes : fiches complètes", n_ok, "sur", len(targets))
json.dump(infos, open(f"{OUT}/fiches.json", "w"), ensure_ascii=False, separators=(",", ":"))

meta = {"date": datetime.datetime.utcnow().strftime("%Y-%m-%d %H:%M UTC"), "limit": LIMIT, "actions": len(stocks),
        "series": len(ok_cols), "fiches": n_ok, "duree_s": int(time.time() - T0), "yfinance": yf.__version__}
json.dump(meta, open(f"{OUT}/meta.json", "w"), ensure_ascii=False, indent=1)
log("Terminé", meta)
open(f"{OUT}/journal.txt", "w").write("\n".join(LOG))
