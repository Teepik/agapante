/* Paramètres de /bourse : univers complémentaire (ETF, indices, devises) et tables de lecture des données Yahoo. */

export type Classe =
  | "act_monde" | "act_us" | "act_eu" | "act_jp" | "act_em" | "act_style" | "act_theme"
  | "monetaire" | "etat" | "credit" | "monde_oblig" | "or" | "immo_cote";

/** ETF suivis : nom, ISIN, frais annuels (%), classe, éligible au PEA, placement correspondant dans l'atlas. */
export const ETF: Record<string, [string, string, number, Classe, boolean, string | null]> = {
  "WPEA.PA": ["iShares MSCI World Swap PEA", "IE0002XZSHO1", 0.2, "act_monde", true, "monde"],
  "DCAM.PA": ["Amundi PEA Monde (MSCI World)", "FR001400U5Q4", 0.2, "act_monde", true, "monde"],
  "PSP5.PA": ["Amundi PEA S&P 500", "FR0011871128", 0.15, "act_us", true, "sp500"],
  "PUST.PA": ["Amundi PEA Nasdaq-100", "FR0011871110", 0.23, "act_us", true, "sp500"],
  "PTPXE.PA": ["Amundi PEA Japon TOPIX", "FR0013411980", 0.2, "act_jp", true, "japon"],
  "PAEEM.PA": ["Amundi PEA Émergents ESG Transition", "FR0013412020", 0.3, "act_em", true, "em"],
  "MEUD.PA": ["Amundi Core Stoxx Europe 600", "LU0908500753", 0.07, "act_eu", true, "europe"],
  "CAC.PA": ["Amundi CAC 40", "FR0007052782", 0.25, "act_eu", true, "cac"],
  "MSE.PA": ["Amundi Euro Stoxx 50", "FR0007054358", 0.2, "act_eu", true, "europe"],
  "EUNL.DE": ["iShares Core MSCI World", "IE00B4L5Y983", 0.2, "act_monde", false, "monde"],
  "VWCE.DE": ["Vanguard FTSE All-World", "IE00BK5BQT80", 0.19, "act_monde", false, "acwi"],
  "IS3N.DE": ["iShares Core MSCI EM IMI", "IE00BKM4GZ66", 0.18, "act_em", false, "em"],
  "SXR8.DE": ["iShares Core S&P 500", "IE00B5BMR087", 0.07, "act_us", false, "sp500"],
  "IS3Q.DE": ["iShares MSCI World Quality Factor", "IE00BP3QZ601", 0.25, "act_style", false, "monde"],
  "IS3S.DE": ["iShares MSCI World Value Factor", "IE00BP3QZB59", 0.25, "act_style", false, "monde"],
  "IS3R.DE": ["iShares MSCI World Momentum Factor", "IE00BP3QZ825", 0.25, "act_style", false, "monde"],
  "IQQ0.DE": ["iShares MSCI World Minimum Volatility", "IE00B8FHGS14", 0.3, "act_style", false, "monde"],
  "ZPRV.DE": ["SPDR MSCI USA Small Cap Value Weighted", "IE00BSPLC413", 0.3, "act_style", false, "sp500"],
  "ZPRX.DE": ["SPDR MSCI Europe Small Cap Value Weighted", "IE00BSPLC298", 0.3, "act_style", false, "europe"],
  "XAIX.DE": ["Xtrackers Artificial Intelligence & Big Data", "IE00BGV5VN51", 0.35, "act_theme", false, "monde"],
  "2B76.DE": ["iShares Automation & Robotics", "IE00BYZK4552", 0.4, "act_theme", false, "monde"],
  "VVSM.DE": ["VanEck Semiconductor", "IE00BMC38736", 0.35, "act_theme", false, "sp500"],
  "IQQH.DE": ["iShares Global Clean Energy", "IE00B1XNHC34", 0.65, "act_theme", false, "monde"],
  "USPY.DE": ["L&G Cyber Security", "IE00BYPLS672", 0.69, "act_theme", false, "monde"],
  "DFEN.DE": ["VanEck Defense", "IE000YYE6WK5", 0.55, "act_theme", false, "europe"],
  "CSH2.PA": ["Amundi Smart Overnight Return (€STR)", "LU1190417599", 0.1, "monetaire", false, "monetaire"],
  "EUNH.DE": ["iShares Core € Govt Bond", "IE00B4WXJJ64", 0.07, "etat", false, "etfGov"],
  "DBXN.DE": ["Xtrackers II Eurozone Government Bond", "LU0290355717", 0.15, "etat", false, "etfGov"],
  "IBCI.DE": ["iShares € Inflation Linked Govt Bond", "IE00B0M62X26", 0.09, "etat", false, "etfGov"],
  "EUN5.DE": ["iShares Core € Corp Bond", "IE00B3F81R35", 0.09, "credit", false, "etfIG"],
  "EUNW.DE": ["iShares € High Yield Corp Bond", "IE00B66F4759", 0.5, "credit", false, "etfHY"],
  "SXRM.DE": ["iShares $ Treasury Bond 7-10yr", "IE00B3VWN518", 0.07, "monde_oblig", false, "ustNC"],
  "IUS7.DE": ["iShares J.P. Morgan $ EM Bond", "IE00B2NPKV68", 0.45, "monde_oblig", false, "emUSD"],
  "GOLD.PA": ["Amundi Physical Gold ETC", "FR0013416716", 0.12, "or", false, "or"],
  "IQQP.DE": ["iShares European Property Yield", "IE00B0M63284", 0.4, "immo_cote", false, null],
};

export const THEME_ETF: Record<string, Record<string, number>> = {
  "XAIX.DE": { ia: 2 }, "2B76.DE": { robot: 2 }, "VVSM.DE": { ia: 2, chine: -1 }, "IQQH.DE": { energie: 2 },
  "USPY.DE": { defense: 1, ia: 1 }, "DFEN.DE": { defense: 2 },
};

/** Indices et matières premières de référence, collectés depuis 2005 pour les épisodes de crise. */
export const PROXIES = ["^GSPC", "^STOXX", "^FCHI", "^GDAXI", "GC=F", "TLT", "IEF", "XLK", "XLF", "XLE", "XLV", "XLI", "XLU", "XLP", "XLY", "XLB", "XLRE", "XLC", "SMH", "ITA"];

/** Cours des devises contre l'euro (unités de devise pour un euro). */
export const FX = ["EURUSD=X", "EURGBP=X", "EURCHF=X", "EURSEK=X", "EURDKK=X", "EURNOK=X", "EURPLN=X", "EURJPY=X"];
export const FXT: Record<string, string> = {
  USD: "EURUSD=X", GBP: "EURGBP=X", GBp: "EURGBP=X", GBX: "EURGBP=X", CHF: "EURCHF=X", SEK: "EURSEK=X",
  DKK: "EURDKK=X", NOK: "EURNOK=X", PLN: "EURPLN=X", JPY: "EURJPY=X",
};

/** Place de cotation attendue selon le suffixe Yahoo, pour résoudre un ISIN vers le bon titre. */
export const SUFFIXE_PAYS: Record<string, string> = {
  France: ".PA", Germany: ".DE", "United Kingdom": ".L", Netherlands: ".AS", Spain: ".MC", Italy: ".MI", Belgium: ".BR",
  Finland: ".HE", Sweden: ".ST", Switzerland: ".SW", Denmark: ".CO", Norway: ".OL", Austria: ".VI", Portugal: ".LS", Ireland: ".IR",
};

export const SECT_FR: Record<string, string> = {
  Technology: "Technologie", Healthcare: "Santé", "Financial Services": "Finance", "Consumer Cyclical": "Consommation cyclique",
  Industrials: "Industrie", "Communication Services": "Communication", "Consumer Defensive": "Consommation courante", Energy: "Énergie",
  "Basic Materials": "Matériaux", "Real Estate": "Immobilier", Utilities: "Services aux collectivités",
};
export const CYCL = new Set(["Consumer Cyclical", "Industrials", "Energy", "Basic Materials", "Financial Services"]);
export const PEA_PAYS = new Set([
  "France", "Germany", "Italy", "Spain", "Portugal", "Netherlands", "Belgium", "Austria", "Finland", "Ireland", "Greece", "Luxembourg", "Sweden",
  "Denmark", "Norway", "Iceland", "Poland", "Czech Republic", "Hungary", "Romania", "Slovakia", "Slovenia", "Lithuania", "Latvia", "Estonia",
  "Croatia", "Malta", "Cyprus", "Liechtenstein", "Bulgaria",
]);
export const PAYS_FR: Record<string, string> = {
  "United States": "États-Unis", France: "France", Germany: "Allemagne", "United Kingdom": "Royaume-Uni", Switzerland: "Suisse",
  Netherlands: "Pays-Bas", Sweden: "Suède", Italy: "Italie", Spain: "Espagne", Denmark: "Danemark", Finland: "Finlande", Norway: "Norvège",
  Belgium: "Belgique", Austria: "Autriche", Portugal: "Portugal", Ireland: "Irlande", Poland: "Pologne", Luxembourg: "Luxembourg",
  Jersey: "Jersey", Bermuda: "Bermudes", Canada: "Canada", Israel: "Israël", "Isle of Man": "Île de Man", Guernsey: "Guernesey",
  Uruguay: "Uruguay", Brazil: "Brésil", China: "Chine", Taiwan: "Taïwan", "Hong Kong": "Hong Kong", Singapore: "Singapour",
  "Cayman Islands": "Îles Caïmans", Mexico: "Mexique", Argentina: "Argentine", Australia: "Australie", Japan: "Japon", Greece: "Grèce",
  Cyprus: "Chypre", "South Africa": "Afrique du Sud", "United Arab Emirates": "Émirats arabes unis", Chile: "Chili",
};

/* Thèmes de rupture. Échelle : +2 gagnant direct, +1 gagnant indirect, −1 exposé, −2 menacé.
   Classement éditorial par industrie, puis par société ; le marché le confirme ou le dément (révisions, tendance relative). */
export const THEMES: Record<string, string> = {
  ia: "IA et centres de données", robot: "Robotique et automatisation", defense: "Défense et sécurité",
  energie: "Électricité, réseaux et nucléaire", chine: "Dépendance à la Chine et à Taïwan", douane: "Droits de douane et relocalisation",
};
const S = (o: Record<string, number>) => o;
export const IND: Record<string, Record<string, number>> = {
  Semiconductors: S({ ia: 2, chine: -1, douane: -1 }), "Semiconductor Equipment & Materials": S({ ia: 2, chine: -1 }),
  "Software - Infrastructure": S({ ia: 1 }), "Software—Infrastructure": S({ ia: 1 }), "Software - Application": S({ ia: -1 }), "Software—Application": S({ ia: -1 }),
  "Information Technology Services": S({ ia: -2 }), "Electronic Components": S({ ia: 1 }), "Computer Hardware": S({ ia: 1 }), "Communication Equipment": S({ ia: 1 }),
  "Electrical Equipment & Parts": S({ energie: 2, ia: 1 }), "Utilities - Regulated Electric": S({ energie: 2, ia: 1 }), "Utilities—Regulated Electric": S({ energie: 2, ia: 1 }),
  "Utilities - Diversified": S({ energie: 1 }), "Utilities—Diversified": S({ energie: 1 }), "Utilities - Renewable": S({ energie: 2 }), "Utilities—Renewable": S({ energie: 2 }),
  "Utilities - Independent Power Producers": S({ energie: 2, ia: 1 }), "Utilities—Independent Power Producers": S({ energie: 2, ia: 1 }), Uranium: S({ energie: 2 }),
  "Specialty Industrial Machinery": S({ robot: 1, douane: 1 }), "Farm & Heavy Construction Machinery": S({ robot: 1 }), "Industrial Distribution": S({ douane: 1 }),
  "Aerospace & Defense": S({ defense: 2 }), "Security & Protection Services": S({ defense: 1 }), "Engineering & Construction": S({ energie: 1, douane: 1 }),
  "Advertising Agencies": S({ ia: -2 }), "Staffing & Employment Services": S({ ia: -2 }), "Consulting Services": S({ ia: -1 }), Publishing: S({ ia: -1 }),
  Broadcasting: S({ ia: -1 }), "Internet Content & Information": S({ ia: 1 }), "Luxury Goods": S({ chine: -2 }), "Auto Manufacturers": S({ chine: -2, douane: -1 }),
  "Auto Parts": S({ chine: -1, douane: -1 }), "Specialty Chemicals": S({ chine: -1 }), Chemicals: S({ chine: -1 }), Steel: S({ chine: -2, douane: 1 }),
  "Scientific & Technical Instruments": S({ robot: 1 }), "Data Storage": S({ ia: 1 }),
  "Footwear & Accessories": S({ chine: -1, douane: -1 }), "Apparel Manufacturing": S({ douane: -1 }), "Furnishings, Fixtures & Appliances": S({ douane: -1 }),
  "Insurance Brokers": S({ ia: -1 }), Solar: S({ energie: 1, chine: -1 }),
};
export const CIE: Record<string, Record<string, number>> = {
  "ASML.AS": { ia: 2, chine: -1 }, "ASM.AS": { ia: 2 }, "BESI.AS": { ia: 2 }, "IFX.DE": { ia: 1, robot: 1, chine: -1 }, "STMPA.PA": { chine: -1, robot: 1 },
  "SU.PA": { energie: 2, ia: 2 }, "LR.PA": { energie: 1, ia: 1 }, "ENR.DE": { energie: 2 }, "SIE.DE": { robot: 1, energie: 1 }, "ABBN.SW": { robot: 2, energie: 1 },
  "RHM.DE": { defense: 2 }, "HO.PA": { defense: 2 }, "SAF.PA": { defense: 1 }, "AIR.PA": { defense: 1 }, "BA.L": { defense: 2 }, "LDO.MI": { defense: 2 },
  "SAAB-B.ST": { defense: 2 }, "HAG.DE": { defense: 2 }, "KOG.OL": { defense: 2 }, "RR.L": { defense: 1, energie: 1 }, "AM.PA": { defense: 2 },
  "CAP.PA": { ia: -2 }, "TEP.PA": { ia: -2 }, "PUB.PA": { ia: -1 }, "SOP.PA": { ia: -2 }, "WPP.L": { ia: -2 }, "RAND.AS": { ia: -2 }, "ADEN.SW": { ia: -2 },
  "MC.PA": { chine: -2 }, "RMS.PA": { chine: -1 }, "KER.PA": { chine: -2 }, "CFR.SW": { chine: -2 }, "UHR.SW": { chine: -2 },
  NVDA: { ia: 2, chine: -1 }, AVGO: { ia: 2 }, AMD: { ia: 2, chine: -1 }, MSFT: { ia: 2 }, GOOGL: { ia: 1 }, GOOG: { ia: 1 },
  META: { ia: 1 }, AMZN: { ia: 1 }, ORCL: { ia: 2 }, TSLA: { robot: 2, chine: -1 }, ISRG: { robot: 2 }, ROK: { robot: 2 }, TER: { robot: 2, ia: 1 },
  VRT: { ia: 2, energie: 1 }, ETN: { ia: 2, energie: 2 }, GEV: { energie: 2, ia: 1 }, CEG: { energie: 2, ia: 2 }, VST: { energie: 2, ia: 2 },
  PWR: { energie: 2, ia: 1 }, ANET: { ia: 2 }, SMCI: { ia: 2 }, MU: { ia: 2 }, AMAT: { ia: 2, chine: -1 }, LRCX: { ia: 2, chine: -1 }, KLAC: { ia: 2, chine: -1 },
  ACN: { ia: -1 }, EPAM: { ia: -2 }, CTSH: { ia: -2 }, IT: { ia: -1 }, ADBE: { ia: -1 }, CRM: { ia: -1 }, LMT: { defense: 2 }, RTX: { defense: 2 },
  NOC: { defense: 2 }, GD: { defense: 2 }, LHX: { defense: 2 }, PLTR: { ia: 2, defense: 1 }, AAPL: { chine: -1, douane: -1 }, NKE: { chine: -1, douane: -1 },
  SBUX: { chine: -1 }, QCOM: { chine: -1, ia: 1 }, INTC: { ia: -1 }, "VOW3.DE": { chine: -2, douane: -1 }, "BMW.DE": { chine: -2, douane: -1 },
  "MBG.DE": { chine: -2, douane: -1 }, "RNO.PA": { chine: -1 }, "STLAM.MI": { chine: -1, douane: -1 }, "BAS.DE": { chine: -1 }, "NEX.PA": { energie: 2, ia: 1 },
  "PRY.MI": { energie: 2, ia: 1 }, "DSY.PA": { ia: -1 }, "SAP.DE": { ia: 1 }, "EDEN.PA": { ia: -1 },
};

/** Épisodes de crise : bornes des baisses du S&P 500. */
export const EPISODES: Record<string, [string, string]> = {
  "2008": ["2007-10-08", "2009-03-09"], "2020": ["2020-02-17", "2020-03-23"], "2022": ["2022-01-03", "2022-10-10"],
};
export const SECT_PROXY: Record<string, string> = {
  Technology: "XLK", "Financial Services": "XLF", Energy: "XLE", Healthcare: "XLV", Industrials: "XLI", Utilities: "XLU",
  "Consumer Defensive": "XLP", "Consumer Cyclical": "XLY", "Basic Materials": "XLB", "Real Estate": "XLRE", "Communication Services": "XLC",
};
