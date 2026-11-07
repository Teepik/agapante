"""Transforme la collecte hebdomadaire en fichiers de agapante.com/bourse :
actions.json (fiches, notes de style, catégories, pièges, thèmes, rendement attendu), rets.json (rendements hebdomadaires en euros),
etf.json (fiches ETF), chocs.json (épisodes historiques)."""
import json, math, os, sys, statistics, datetime
import numpy as np, pandas as pd

ICI = os.path.dirname(os.path.abspath(__file__))
SRC = sys.argv[1] if len(sys.argv) > 1 else os.path.join(ICI, "_brut")
OUT = sys.argv[2] if len(sys.argv) > 2 else os.path.join(ICI, "_sortie")
os.makedirs(OUT, exist_ok=True)
px = pd.read_csv(f"{SRC}/prix_hebdo.csv", index_col=0)
pr = pd.read_csv(f"{SRC}/proxies_hebdo.csv", index_col=0)
fiches = json.load(open(f"{SRC}/fiches.json"))
meta_src = json.load(open(f"{SRC}/meta.json"))
atlas = json.load(open(os.path.join(ICI, "..", "..", "src", "lib", "bourse", "atlas.json")))

# ---------------- Devises : conversion en euros ----------------
FXT = {"USD":"EURUSD=X","GBP":"EURGBP=X","GBp":"EURGBP=X","GBX":"EURGBP=X","CHF":"EURCHF=X","SEK":"EURSEK=X","DKK":"EURDKK=X","NOK":"EURNOK=X","PLN":"EURPLN=X","JPY":"EURJPY=X"}
def fx_ret(ccy, idx):
    t = FXT.get(ccy)
    if not t or t not in px.columns: return pd.Series(0.0, index=idx)
    s = px[t].reindex(idx).ffill()
    return (s.shift(1) / s - 1).fillna(0.0)          # variation de la valeur de la devise en euros
def eur_returns(t, ccy):
    s = px[t].ffill()
    r = s.pct_change()
    r[s.isna()] = np.nan
    return (1 + r) * (1 + fx_ret(ccy, px.index)) - 1
def fx_last(ccy):
    t = FXT.get(ccy)
    if ccy == "EUR" or not t or t not in px.columns: return 1.0
    v = px[t].dropna().iloc[-1]
    return (1 / v) / (100 if ccy in ("GBp", "GBX") else 1)

# ---------------- ETF : fiches fixes ----------------
ETF = {
 "WPEA.PA":("iShares MSCI World Swap PEA","IE0002XZSHO1",.20,"act_monde",True,"monde"),
 "DCAM.PA":("Amundi PEA Monde (MSCI World)","FR001400U5Q4",.20,"act_monde",True,"monde"),
 "PSP5.PA":("Amundi PEA S&P 500","FR0011871128",.15,"act_us",True,"sp500"),
 "PUST.PA":("Amundi PEA Nasdaq-100","FR0011871110",.23,"act_us",True,"sp500"),
 "PTPXE.PA":("Amundi PEA Japon TOPIX","FR0013411980",.20,"act_jp",True,"japon"),
 "PAEEM.PA":("Amundi PEA Émergents ESG Transition","FR0013412020",.30,"act_em",True,"em"),
 "MEUD.PA":("Amundi Core Stoxx Europe 600","LU0908500753",.07,"act_eu",True,"europe"),
 "CAC.PA":("Amundi CAC 40","FR0007052782",.25,"act_eu",True,"cac"),
 "MSE.PA":("Amundi Euro Stoxx 50","FR0007054358",.20,"act_eu",True,"europe"),
 "EUNL.DE":("iShares Core MSCI World","IE00B4L5Y983",.20,"act_monde",False,"monde"),
 "VWCE.DE":("Vanguard FTSE All-World","IE00BK5BQT80",.19,"act_monde",False,"acwi"),
 "IS3N.DE":("iShares Core MSCI EM IMI","IE00BKM4GZ66",.18,"act_em",False,"em"),
 "SXR8.DE":("iShares Core S&P 500","IE00B5BMR087",.07,"act_us",False,"sp500"),
 "IS3Q.DE":("iShares MSCI World Quality Factor","IE00BP3QZ601",.25,"act_style",False,"monde"),
 "IS3S.DE":("iShares MSCI World Value Factor","IE00BP3QZB59",.25,"act_style",False,"monde"),
 "IS3R.DE":("iShares MSCI World Momentum Factor","IE00BP3QZ825",.25,"act_style",False,"monde"),
 "IQQ0.DE":("iShares MSCI World Minimum Volatility","IE00B8FHGS14",.30,"act_style",False,"monde"),
 "ZPRV.DE":("SPDR MSCI USA Small Cap Value Weighted","IE00BSPLC413",.30,"act_style",False,"sp500"),
 "ZPRX.DE":("SPDR MSCI Europe Small Cap Value Weighted","IE00BSPLC298",.30,"act_style",False,"europe"),
 "XAIX.DE":("Xtrackers Artificial Intelligence & Big Data","IE00BGV5VN51",.35,"act_theme",False,"monde"),
 "2B76.DE":("iShares Automation & Robotics","IE00BYZK4552",.40,"act_theme",False,"monde"),
 "VVSM.DE":("VanEck Semiconductor","IE00BMC38736",.35,"act_theme",False,"sp500"),
 "IQQH.DE":("iShares Global Clean Energy","IE00B1XNHC34",.65,"act_theme",False,"monde"),
 "USPY.DE":("L&G Cyber Security","IE00BYPLS672",.69,"act_theme",False,"monde"),
 "DFEN.DE":("VanEck Defense","IE000YYE6WK5",.55,"act_theme",False,"europe"),
 "CSH2.PA":("Amundi Smart Overnight Return (€STR)","LU1190417599",.10,"monetaire",False,"monetaire"),
 "EUNH.DE":("iShares Core € Govt Bond","IE00B4WXJJ64",.07,"etat",False,"etfGov"),
 "DBXN.DE":("Xtrackers II Eurozone Government Bond","LU0290355717",.15,"etat",False,"etfGov"),
 "IBCI.DE":("iShares € Inflation Linked Govt Bond","IE00B0M62X26",.09,"etat",False,"etfGov"),
 "EUN5.DE":("iShares Core € Corp Bond","IE00B3F81R35",.09,"credit",False,"etfIG"),
 "EUNW.DE":("iShares € High Yield Corp Bond","IE00B66F4759",.50,"credit",False,"etfHY"),
 "SXRM.DE":("iShares $ Treasury Bond 7-10yr","IE00B3VWN518",.07,"monde_oblig",False,"ustNC"),
 "IUS7.DE":("iShares J.P. Morgan $ EM Bond","IE00B2NPKV68",.45,"monde_oblig",False,"emUSD"),
 "GOLD.PA":("Amundi Physical Gold ETC","FR0013416716",.12,"or",False,"or"),
 "IQQP.DE":("iShares European Property Yield","IE00B0M63284",.40,"immo_cote",False,None),
}
THEME_ETF = {"XAIX.DE":{"ia":2},"2B76.DE":{"robot":2},"VVSM.DE":{"ia":2,"chine":-1},"IQQH.DE":{"energie":2},"USPY.DE":{"defense":1,"ia":1},"DFEN.DE":{"defense":2}}

# ---------------- Rendements hebdomadaires en euros ----------------
R = {}
for t in px.columns:
    if t.endswith("=X"): continue
    f = fiches.get(t, {})
    ccy = f.get("currency") or ("EUR" if t.endswith((".PA", ".DE", ".AS", ".MC", ".MI", ".BR", ".LS", ".VI", ".HE", ".IR")) else "USD")
    R[t] = eur_returns(t, ccy)
dates = list(px.index[1:])
world = R.get("EUNL.DE")

def stats(r):
    r = r.dropna()
    if len(r) < 52: return {}
    r3 = r.tail(156)
    out = {"vol": float(r3.std() * math.sqrt(52) * 100)}
    if world is not None:
        w = world.reindex(r3.index).fillna(0)
        if w.var() > 0: out["beta"] = float(np.cov(r3, w)[0, 1] / w.var())
    lv = (1 + r).cumprod()
    if len(lv) >= 53: out["mom12"] = float((lv.iloc[-5] / lv.iloc[-53] - 1) * 100)   # 12 mois moins le dernier mois
    if len(lv) >= 14: out["mom3"] = float((lv.iloc[-1] / lv.iloc[-14] - 1) * 100)
    y = lv.tail(53); out["dd1y"] = float(((y / y.cummax()) - 1).min() * 100)
    out["hist"] = len(r)
    return out

# ---------------- Fiches actions ----------------
SECT_FR = {"Technology":"Technologie","Healthcare":"Santé","Financial Services":"Finance","Consumer Cyclical":"Consommation cyclique",
  "Industrials":"Industrie","Communication Services":"Communication","Consumer Defensive":"Consommation courante","Energy":"Énergie",
  "Basic Materials":"Matériaux","Real Estate":"Immobilier","Utilities":"Services aux collectivités"}
CYCL = {"Consumer Cyclical","Industrials","Energy","Basic Materials","Financial Services"}
DEFE = {"Consumer Defensive","Utilities","Healthcare"}
PEA_PAYS = {"France","Germany","Italy","Spain","Portugal","Netherlands","Belgium","Austria","Finland","Ireland","Greece","Luxembourg","Sweden",
  "Denmark","Norway","Iceland","Poland","Czech Republic","Hungary","Romania","Slovakia","Slovenia","Lithuania","Latvia","Estonia","Croatia","Malta","Cyprus","Liechtenstein","Bulgaria"}
PAYS_FR = {"United States":"États-Unis","France":"France","Germany":"Allemagne","United Kingdom":"Royaume-Uni","Switzerland":"Suisse","Netherlands":"Pays-Bas",
  "Sweden":"Suède","Italy":"Italie","Spain":"Espagne","Denmark":"Danemark","Finland":"Finlande","Norway":"Norvège","Belgium":"Belgique","Austria":"Autriche",
  "Portugal":"Portugal","Ireland":"Irlande","Poland":"Pologne","Luxembourg":"Luxembourg","Jersey":"Jersey","Bermuda":"Bermudes","Canada":"Canada","Israel":"Israël"}
def num(v, lo=None, hi=None):
    if v is None or isinstance(v, str): return None
    try: v = float(v)
    except Exception: return None
    if not math.isfinite(v): return None
    if lo is not None and v < lo: return None
    if hi is not None and v > hi: return None
    return v

items = []
for t, f in fiches.items():
    if t in ETF or f.get("quoteType") not in (None, "EQUITY"): continue
    if t not in R: continue
    st = stats(R[t])
    if not st: continue
    ccy = f.get("currency") or "EUR"
    fxe = fx_last(ccy)
    price = num(f.get("currentPrice")) or num(f.get("regularMarketPrice"))
    mcap = num(f.get("marketCap"), 0)
    mcap_eur = mcap * fx_last("GBP" if ccy in ("GBp", "GBX") else ccy) if mcap else None
    dy = num(f.get("dividendYield"), 0)
    if dy is not None and dy > .3: dy = dy / 100          # Yahoo publie parfois le dividende en pourcentage
    if dy is None: dy = num(f.get("trailingAnnualDividendYield"), 0, .3)
    fin_same = (f.get("financialCurrency") or ccy).upper()[:3] == ccy.upper()[:3]
    fcf = num(f.get("freeCashflow")); rev = num(f.get("totalRevenue"), 0)
    fcfY = fcf / (mcap * (100 if ccy in ("GBp","GBX") else 1)) if (fcf is not None and mcap and fin_same) else None
    if fcfY is not None and ccy in ("GBp","GBX"): fcfY *= 100
    debt, cash, ebitda = num(f.get("totalDebt")), num(f.get("totalCash")), num(f.get("ebitda"))
    sect = f.get("sector")
    nde = (debt - (cash or 0)) / ebitda if (debt is not None and ebitda and ebitda > 0 and sect != "Financial Services") else None
    et = (f.get("eps_trend") or {}).get("+1y") or {}
    rev90 = None
    c0, c90 = num(et.get("current")), num(et.get("90daysAgo"))
    if c0 and c90 and c90 > 0 and c0 > 0: rev90 = (c0 / c90 - 1) * 100
    ge = f.get("growth_est") or {}
    g1 = num((ge.get("+1y") or {}).get("stockTrend")) if ge else None
    ltg = num((ge.get("LTG") or {}).get("stockTrend")) if ge else None
    pef = num(f.get("forwardPE"), 0, 300); pet = num(f.get("trailingPE"), 0, 300)
    tgt = num(f.get("targetMeanPrice"), 0)
    vol13 = num(f.get("vol13"), 0)
    liq = vol13 / 5 * price * fxe if (vol13 and price) else None
    it = {
      "id": t, "nom": (f.get("longName") or f.get("shortName") or f.get("nom") or t).replace(" S.A.", "").replace(" SE", " SE"),
      "pays": PAYS_FR.get(f.get("country"), f.get("country")), "paysEn": f.get("country"), "zone": "us" if f.get("region") == "us" else "eu",
      "secteurEn": sect, "secteur": SECT_FR.get(sect, sect or "—"), "industrie": f.get("industry"), "ccy": ccy,
      "mcap": round(mcap_eur / 1e9, 2) if mcap_eur else None, "per": pet, "perF": pef, "pb": num(f.get("priceToBook"), 0, 200),
      "evEbitda": num(f.get("enterpriseToEbitda"), 0, 150), "dy": dy * 100 if dy is not None else None, "payout": num(f.get("payoutRatio"), 0, 5),
      "fcfY": fcfY * 100 if fcfY is not None else None, "roe": (num(f.get("returnOnEquity"), -5, 5) or 0) * 100 if f.get("returnOnEquity") is not None else None,
      "opm": num(f.get("operatingMargins"), -5, 1) * 100 if num(f.get("operatingMargins"), -5, 1) is not None else None,
      "gm": num(f.get("grossMargins"), -5, 1) * 100 if num(f.get("grossMargins"), -5, 1) is not None else None,
      "nde": nde, "revG": num(f.get("revenueGrowth"), -1, 10) * 100 if num(f.get("revenueGrowth"), -1, 10) is not None else None,
      "epsG": num(f.get("earningsGrowth"), -1, 10) * 100 if num(f.get("earningsGrowth"), -1, 10) is not None else None,
      "g1": g1 * 100 if g1 is not None else None, "ltg": ltg * 100 if ltg is not None else None, "rev90": rev90,
      "upside": (tgt / price - 1) * 100 if (tgt and price) else None, "reco": num(f.get("recommendationMean"), 1, 5), "nAna": num(f.get("numberOfAnalystOpinions"), 0),
      "liq": round(liq / 1e6, 1) if liq else None, "pea": f.get("country") in PEA_PAYS,
      **{k: (round(v, 3) if isinstance(v, float) else v) for k, v in st.items()}
    }
    items.append(it)
print("actions exploitables :", len(items))

# ---------------- Notes de style : rangs centiles ----------------
df = pd.DataFrame(items).set_index("id")
def rank(s, asc=True):
    return s.rank(pct=True, ascending=asc) * 100
def srank(col, asc=True, sector_mix=.5):
    s = df[col]
    g = rank(s, asc); sec = s.groupby(df["secteurEn"]).transform(lambda x: rank(x, asc) if x.notna().sum() >= 5 else rank(s, asc).reindex(x.index))
    return (1 - sector_mix) * g + sector_mix * sec
def combo(parts):
    m = pd.concat(parts, axis=1); n = m.notna().sum(axis=1)
    out = m.mean(axis=1, skipna=True); out[n == 0] = np.nan
    return out.rank(pct=True) * 100
df["ey"] = 1 / df["perF"].where(df["perF"] > 0, df["per"]); df["bp"] = 1 / df["pb"]; df["eb"] = 1 / df["evEbitda"]
fin = df["secteurEn"] == "Financial Services"
S = pd.DataFrame(index=df.index)
S["v"] = combo([srank("ey"), srank("bp").where(fin | True), srank("eb").where(~fin), srank("dy", sector_mix=.3), srank("fcfY").where(~fin)])
df["gBest"] = df["ltg"].fillna(df["g1"])
S["g"] = combo([srank("revG", sector_mix=.3), srank("epsG", sector_mix=.3), srank("gBest", sector_mix=.3)])
df["ndeInv"] = -df["nde"]
S["q"] = combo([srank("roe"), srank("opm"), srank("gm").where(~fin), srank("ndeInv").where(~fin)])
S["m"] = combo([rank(df["mom12"]), rank(df["rev90"])])
S["d"] = combo([rank(df["vol"], False), rank(df["beta"], False)])
dyOk = df["dy"].where(~((df["payout"] > 1.0) | (df["fcfY"] < 0)), df["dy"] * .3)
S["y"] = rank(dyOk)
S["s"] = rank(np.log(df["mcap"]), False)
for c in S.columns: df["s_" + c] = S[c].round(0)

# ---------------- Catégories et pièges ----------------
STYLE_L = {"v":"Value","g":"Croissance","q":"Qualité","m":"Momentum","d":"Défensive","y":"Rendement","s":"Petite et moyenne capitalisation"}
def categorie(r):
    v, g, q, m, d, y = (r.get("s_" + k) for k in "vgqmdy")
    nz = lambda x: x if x == x and x is not None else 0
    v, g, q, m, d, y = map(nz, (v, g, q, m, d, y))
    if v >= 65 and g >= 60: return "Croissance à prix raisonnable"
    if q >= 70 and g >= 65: return "Qualité et croissance"
    if v >= 70 and nz(r.get("mom3")) > 3 and nz(r.get("mom12")) < 0 and nz(r.get("rev90")) > 0: return "Redressement"
    best = max([("Value", v), ("Croissance", g), ("Qualité", q), ("Momentum", m), ("Défensive", d), ("Rendement", y)], key=lambda x: x[1])
    return best[0] if best[1] >= 60 else "Profil équilibré"
def pieges(r):
    p = []
    nz = lambda x: x if (x is not None and x == x) else None
    if (nz(r["s_v"]) or 0) >= 75 and ((nz(r.get("mom12")) or 0) < -15 or (nz(r.get("rev90")) or 0) < -5) and (nz(r.get("revG")) or 0) < 0:
        p.append(("Value piège", "Bon marché, mais chiffre d'affaires en baisse et cours ou prévisions qui reculent : la décote peut durer."))
    if (nz(r["s_g"]) or 0) >= 70 and (nz(r.get("perF")) or 0) > 45:
        p.append(("Croissance payée cher", f"PER prévisionnel de {r['perF']:.0f} : une simple déception sur la croissance suffit à faire baisser le cours."))
    if (nz(r.get("dy")) or 0) > 6 and ((nz(r.get("payout")) or 0) > 1 or (nz(r.get("fcfY")) is not None and r["fcfY"] < 0)):
        p.append(("Dividende fragile", "Dividende supérieur aux bénéfices ou au flux de trésorerie disponible : une baisse est probable."))
    if (nz(r.get("nde")) or 0) > 4:
        p.append(("Dette lourde", f"Dette nette de {r['nde']:.1f} fois l'excédent brut d'exploitation."))
    if (nz(r.get("liq")) or 99) < 1:
        p.append(("Peu liquide", "Moins d'un million d'euros échangés par jour en moyenne."))
    return p
df["cat"] = df.apply(categorie, axis=1)
df["cyclique"] = df["secteurEn"].isin(CYCL) & (df["beta"].fillna(1) > .9)

# ---------------- Thèmes de rupture ----------------
# Échelle : +2 gagnant direct, +1 gagnant indirect, −1 exposé, −2 menacé. Classement éditorial par industrie, puis par société.
THEMES = {"ia":"IA et centres de données","robot":"Robotique et automatisation","defense":"Défense et sécurité","energie":"Électricité, réseaux et nucléaire","chine":"Dépendance à la Chine et à Taïwan","douane":"Droits de douane et relocalisation"}
IND = {
 "Semiconductors":{"ia":2,"chine":-1,"douane":-1}, "Semiconductor Equipment & Materials":{"ia":2,"chine":-1},
 "Software - Infrastructure":{"ia":1}, "Software—Infrastructure":{"ia":1}, "Software - Application":{"ia":-1}, "Software—Application":{"ia":-1},
 "Information Technology Services":{"ia":-2}, "Electronic Components":{"ia":1}, "Computer Hardware":{"ia":1}, "Communication Equipment":{"ia":1},
 "Electrical Equipment & Parts":{"energie":2,"ia":1}, "Utilities - Regulated Electric":{"energie":2,"ia":1}, "Utilities—Regulated Electric":{"energie":2,"ia":1},
 "Utilities - Diversified":{"energie":1}, "Utilities—Diversified":{"energie":1}, "Utilities - Renewable":{"energie":2}, "Utilities—Renewable":{"energie":2},
 "Utilities - Independent Power Producers":{"energie":2,"ia":1}, "Utilities—Independent Power Producers":{"energie":2,"ia":1}, "Uranium":{"energie":2},
 "Specialty Industrial Machinery":{"robot":1,"douane":1}, "Farm & Heavy Construction Machinery":{"robot":1}, "Industrial Distribution":{"douane":1},
 "Aerospace & Defense":{"defense":2}, "Security & Protection Services":{"defense":1}, "Engineering & Construction":{"energie":1,"douane":1},
 "Advertising Agencies":{"ia":-2}, "Staffing & Employment Services":{"ia":-2}, "Consulting Services":{"ia":-1}, "Publishing":{"ia":-1},
 "Broadcasting":{"ia":-1}, "Internet Content & Information":{"ia":1}, "Luxury Goods":{"chine":-2}, "Auto Manufacturers":{"chine":-2,"douane":-1},
 "Auto Parts":{"chine":-1,"douane":-1}, "Specialty Chemicals":{"chine":-1}, "Chemicals":{"chine":-1}, "Steel":{"chine":-2,"douane":1},
 "Scientific & Technical Instruments":{"robot":1}, "Medical Instruments & Supplies":{"robot":0}, "Data Storage":{"ia":1}, "Telecom Services":{},
 "Footwear & Accessories":{"chine":-1,"douane":-1}, "Apparel Manufacturing":{"douane":-1}, "Furnishings, Fixtures & Appliances":{"douane":-1},
 "Insurance Brokers":{"ia":-1}, "Capital Markets":{}, "Rental & Leasing Services":{}, "Solar":{"energie":1,"chine":-1}
}
CIE = {
 "ASML.AS":{"ia":2,"chine":-1}, "ASM.AS":{"ia":2}, "BESI.AS":{"ia":2}, "IFX.DE":{"ia":1,"robot":1,"chine":-1}, "STMPA.PA":{"chine":-1,"robot":1},
 "SU.PA":{"energie":2,"ia":2}, "LR.PA":{"energie":1,"ia":1}, "ENR.DE":{"energie":2}, "SIE.DE":{"robot":1,"energie":1}, "ABBN.SW":{"robot":2,"energie":1},
 "RHM.DE":{"defense":2}, "HO.PA":{"defense":2}, "SAF.PA":{"defense":1}, "AIR.PA":{"defense":1}, "BA.L":{"defense":2}, "LDO.MI":{"defense":2},
 "SAAB-B.ST":{"defense":2}, "HAG.DE":{"defense":2}, "KOG.OL":{"defense":2}, "RR.L":{"defense":1,"energie":1}, "AM.PA":{"defense":2},
 "CAP.PA":{"ia":-2}, "TEP.PA":{"ia":-2}, "PUB.PA":{"ia":-1}, "SOP.PA":{"ia":-2}, "WPP.L":{"ia":-2}, "RAND.AS":{"ia":-2}, "ADEN.SW":{"ia":-2},
 "MC.PA":{"chine":-2}, "RMS.PA":{"chine":-1}, "KER.PA":{"chine":-2}, "CFR.SW":{"chine":-2}, "UHR.SW":{"chine":-2},
 "NVDA":{"ia":2,"chine":-1}, "AVGO":{"ia":2}, "AMD":{"ia":2,"chine":-1}, "TSM":{"ia":2,"chine":-2}, "MSFT":{"ia":2}, "GOOGL":{"ia":1}, "GOOG":{"ia":1},
 "META":{"ia":1}, "AMZN":{"ia":1}, "ORCL":{"ia":2}, "TSLA":{"robot":2,"chine":-1}, "ISRG":{"robot":2}, "ROK":{"robot":2}, "TER":{"robot":2,"ia":1},
 "VRT":{"ia":2,"energie":1}, "ETN":{"ia":2,"energie":2}, "GEV":{"energie":2,"ia":1}, "CEG":{"energie":2,"ia":2}, "VST":{"energie":2,"ia":2},
 "PWR":{"energie":2,"ia":1}, "ANET":{"ia":2}, "SMCI":{"ia":2}, "MU":{"ia":2}, "AMAT":{"ia":2,"chine":-1}, "LRCX":{"ia":2,"chine":-1}, "KLAC":{"ia":2,"chine":-1},
 "ACN":{"ia":-1}, "EPAM":{"ia":-2}, "CTSH":{"ia":-2}, "IT":{"ia":-1}, "ADBE":{"ia":-1}, "CRM":{"ia":-1}, "LMT":{"defense":2}, "RTX":{"defense":2},
 "NOC":{"defense":2}, "GD":{"defense":2}, "LHX":{"defense":2}, "PLTR":{"ia":2,"defense":1}, "AAPL":{"chine":-1,"douane":-1}, "NKE":{"chine":-1,"douane":-1},
 "SBUX":{"chine":-1}, "QCOM":{"chine":-1,"ia":1}, "INTC":{"ia":-1}, "VOW3.DE":{"chine":-2,"douane":-1}, "BMW.DE":{"chine":-2,"douane":-1},
 "MBG.DE":{"chine":-2,"douane":-1}, "RNO.PA":{"chine":-1}, "STLAM.MI":{"chine":-1,"douane":-1}, "BAS.DE":{"chine":-1}, "NEX.PA":{"energie":2,"ia":1},
 "PRY.MI":{"energie":2,"ia":1}, "VIE.PA":{}, "DSY.PA":{"ia":-1}, "SAP.DE":{"ia":1}, "EDEN.PA":{"ia":-1}
}
def themes(row):
    th = dict(IND.get(row["industrie"] or "", {}))
    th.update(CIE.get(row.name, {}))
    return {k: v for k, v in th.items() if v}
df["themes"] = df.apply(themes, axis=1)
# Confirmation par le marché : révisions des bénéfices et tendance face au secteur
secmom = df.groupby("secteurEn")["mom12"].transform("median")
df["momRel"] = df["mom12"] - secmom
def confirm(r):
    sig = 0
    if r["rev90"] == r["rev90"] and r["rev90"] is not None: sig += 1 if r["rev90"] > 2 else -1 if r["rev90"] < -2 else 0
    if r["momRel"] == r["momRel"] and r["momRel"] is not None: sig += 1 if r["momRel"] > 10 else -1 if r["momRel"] < -10 else 0
    return sig
df["conf"] = df.apply(confirm, axis=1)

# ---------------- Rendement réel attendu par titre ----------------
def basket_ey(codes_w):
    P = atlas["pays"]; capes = sorted(c["cape"] for c in P.values() if c.get("cape")); med = capes[len(capes)//2]
    return 100 * sum(w / (P.get(k, {}).get("cape") or med) for k, w in codes_w.items())
EY_EU = basket_ey({"GB":.22,"FR":.17,"CH":.15,"DE":.14,"NL":.07,"SE":.05,"DK":.045,"ES":.045,"IT":.045,"_":.065})
EY_US = basket_ey({"US":1})
gmed = df["gBest"].median()
def mu_reel(r):
    reg = EY_US if r["zone"] == "us" else EY_EU
    ey = r["ey"] * 100 if (r["ey"] == r["ey"] and r["ey"] and r["ey"] > 0) else None
    if ey is None: return round(reg - 1.0, 2)
    g = r["gBest"] if r["gBest"] == r["gBest"] and r["gBest"] is not None else gmed
    g = max(-10, min(30, g))
    model = ey + .25 * (g - gmed)
    return round(max(-1.0, min(12.0, .5 * model + .5 * reg)), 2)
df["muR"] = df.apply(mu_reel, axis=1)
print("rendement réel attendu : Europe", round(EY_EU, 2), "États-Unis", round(EY_US, 2), "médiane titres", df["muR"].median())

# ---------------- Sortie actions ----------------
KEEP = ["nom","pays","zone","secteur","secteurEn","industrie","ccy","mcap","per","perF","pb","evEbitda","dy","payout","fcfY","roe","opm","gm","nde","revG","epsG","g1","ltg",
        "rev90","upside","reco","nAna","liq","pea","vol","beta","mom12","mom3","dd1y","momRel","conf","muR","cat","cyclique","hist"]
def rnd(v):
    if isinstance(v, (bool, np.bool_)): return bool(v)
    if isinstance(v, (float, np.floating)):
        if not math.isfinite(v): return None
        return round(float(v), 2)
    if isinstance(v, (np.integer,)): return int(v)
    return v
out = []
for t, r in df.iterrows():
    o = {"id": t, **{k: rnd(r[k]) for k in KEEP}}
    o["sc"] = {k: (int(r["s_" + k]) if r["s_" + k] == r["s_" + k] else None) for k in "vgqmdys"}
    o["th"] = r["themes"]; o["pg"] = [list(x) for x in pieges(r)]
    out.append(o)
out.sort(key=lambda o: -(o["mcap"] or 0))

# ---------------- ETF ----------------
etf_out = []
for t, (nom, isin, ter, cls, pea, pl) in ETF.items():
    if t not in R: continue
    st = stats(R[t]); f = fiches.get(t, {})
    etf_out.append({"id": t, "nom": nom, "isin": isin, "ter": ter, "cls": cls, "pea": pea, "pl": pl, "th": THEME_ETF.get(t, {}),
                    "aum": round((num(f.get("totalAssets"), 0) or 0) / 1e9, 2) or None, **{k: rnd(v) for k, v in st.items()}})

# ---------------- Rendements hebdomadaires compacts (centièmes de point) ----------------
ids = [o["id"] for o in out] + [e["id"] for e in etf_out]
mat = {}
for t in ids:
    s = R[t].iloc[1:]
    mat[t] = [None if not math.isfinite(v) else int(round(v * 10000)) for v in s.values]
rets = {"dates": dates, "unit": 1e-4, "r": mat}

# ---------------- Épisodes de crise (indices de référence) ----------------
def ep(col, a, b, conv=None):
    if col not in pr.columns: return None
    s = pr[col].dropna(); s = s[(s.index >= a) & (s.index <= b)]
    if len(s) < 2: return None
    r = s.iloc[-1] / s.iloc[0] - 1
    if conv and conv in pr.columns:
        f = pr[conv].dropna(); f = f[(f.index >= a) & (f.index <= b)]
        if len(f) >= 2: r = (1 + r) * (f.iloc[0] / f.iloc[-1]) - 1
    return round(r * 100, 1)
EPIS = {"2008":("2007-10-08","2009-03-09"), "2020":("2020-02-17","2020-03-23"), "2022":("2022-01-03","2022-10-10")}
SECT_PROXY = {"Technology":"XLK","Financial Services":"XLF","Energy":"XLE","Healthcare":"XLV","Industrials":"XLI","Utilities":"XLU","Consumer Defensive":"XLP",
  "Consumer Cyclical":"XLY","Basic Materials":"XLB","Real Estate":"XLRE","Communication Services":"XLC"}
chocs = {}
for k, (a, b) in EPIS.items():
    us = ep("^GSPC", a, b, "EURUSD=X"); eu = ep("^STOXX", a, b)
    mk_us = ep("^GSPC", a, b)
    secs = {}
    for sec, px_ in SECT_PROXY.items():
        v = ep(px_, a, b)
        if v is not None and mk_us is not None: secs[sec] = round(v - mk_us, 1)
    chocs[k] = {"us_eur": us, "eu": eu, "or_eur": ep("GC=F", a, b, "EURUSD=X"), "usd": ep("EURUSD=X", b, b) , "secteurs_rel": secs,
                "tlt": ep("TLT", a, b), "eurusd": None}
    if "EURUSD=X" in pr.columns:
        f = pr["EURUSD=X"].dropna(); f = f[(f.index >= a) & (f.index <= b)]
        if len(f) >= 2: chocs[k]["usd"] = round((f.iloc[0] / f.iloc[-1] - 1) * 100, 1)
meta = {"date": meta_src.get("date"), "actions": len(out), "etf": len(etf_out), "semaines": len(dates), "themes": THEMES, "styles": STYLE_L,
        "eyEU": round(EY_EU, 2), "eyUS": round(EY_US, 2), "gmed": rnd(gmed)}
json.dump({"meta": meta, "actions": out, "etf": etf_out, "chocs": chocs}, open(f"{OUT}/actions.json", "w"), ensure_ascii=False, separators=(",", ":"))
json.dump(rets, open(f"{OUT}/rets.json", "w"), separators=(",", ":"))
print("écrit :", len(out), "actions,", len(etf_out), "ETF,", len(dates), "semaines")
print(f"::notice title=Traitement::{len(out)} actions, {len(etf_out)} ETF, {len(dates)} semaines ; catégories {df['cat'].value_counts().to_dict()}")
print("tailles :", os.path.getsize(f"{OUT}/actions.json"), os.path.getsize(f"{OUT}/rets.json"))
print("catégories :", df["cat"].value_counts().to_dict())
print("chocs :", json.dumps(chocs, ensure_ascii=False)[:600])
