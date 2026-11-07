/* ================= Fiscalité 2026 du foyer ================= */
const BAREME = [[11600,0],[29579,.11],[84577,.30],[181917,.41],[Infinity,.45]];   // revenus 2025, loi de finances du 19/02/2026
const QF_DEMI = 1807;                    // plafond de l'avantage par demi-part
const DECOTE = {couple:1483, seul:897};  // forfaits de la décote 2026
const PS = {cto:.186, pea:.186, av:.172, fe:.172};   // prélèvements sociaux (LFSS 2026 ; assurance-vie maintenue à 17,2 %)
const PFU_IR = .128, AV8_IR = .075, AV_ABAT = 9200, CSG_DED = .068;
function irParPart(q){ let t = 0, prev = 0; for (const [lim, r] of BAREME){ if (q > prev) t += (Math.min(q, lim) - prev) * r; prev = lim; } return t; }
function impot(R, parts){
  R = Math.max(0, R);
  const couple = parts >= 2, base = couple ? 2 : 1;
  const sans = irParPart(R / base) * base, avec = irParPart(R / parts) * parts;
  let imp = Math.max(avec, sans - (parts - base) * 2 * QF_DEMI);
  const forf = couple ? DECOTE.couple : DECOTE.seul;
  if (imp < forf / .4525) imp = Math.max(0, imp - (forf - .4525 * imp));
  return imp;
}
const tmiEff = (R, parts) => (impot(R + 1000, parts) - impot(R, parts)) / 1000;
/* Impôt sur le revenu dû sur X € de revenus du capital : forfaitaire ou barème (avec CSG déductible) */
function irCapital(X, F_, taux){ // taux : taux forfaitaire d'IR (12,8 % ou 7,5 %)
  if (X <= 0) return {pfu:0, bar:0, best:0, mode:"pfu"};
  const pfu = X * taux;
  const bar = Math.max(0, impot(F_.R + X, F_.parts) - impot(F_.R, F_.parts) - CSG_DED * X * tmiEff(F_.R + X, F_.parts));
  return {pfu, bar, best:Math.min(pfu, bar), mode: bar < pfu ? "barème" : "forfait"};
}
const plafondLEP = parts => 23028 + Math.max(0, parts - 1) * 2 * 6149;

/* Imposition d'une plus-value à la sortie selon l'enveloppe */
function taxeGain(env, gain, M, X){
  if (gain <= 0) return {ps:0, ir:0, mode:"—"};
  if (env === "pea"){
    const age = X.T + X.apea;
    if (age >= 5) return {ps:gain*PS.pea, ir:0, mode:"PEA de plus de 5 ans"};
    const i = irCapital(gain, X, PFU_IR); return {ps:gain*PS.pea, ir:i.best, mode:"PEA de moins de 5 ans · " + i.mode};
  }
  if (env === "av"){
    const age = X.T + X.aav;
    if (age >= 8){
      const base = Math.max(0, gain - AV_ABAT);
      const part150 = Math.min(1, 150000 / Math.max(M, 1));        // primes au-delà de 150 000 € : 12,8 %
      const forf = base * (part150 * AV8_IR + (1 - part150) * PFU_IR);
      const bar = Math.max(0, impot(X.R + base, X.parts) - impot(X.R, X.parts));
      return {ps:gain*PS.av, ir:Math.min(forf, bar), mode:"Contrat de plus de 8 ans · abattement de 9 200 € · " + (bar < forf ? "barème" : "forfait")};
    }
    const i = irCapital(gain, X, PFU_IR); return {ps:gain*PS.av, ir:i.best, mode:"Contrat de moins de 8 ans · " + i.mode};
  }
  const i = irCapital(gain, X, PFU_IR); return {ps:gain*PS.cto, ir:i.best, mode:"Compte-titres · " + i.mode};
}

/* ================= Hypothèses de marché ================= */
const INFL_PATHS = {
  installee:{l:"Inflation installée : 3 % par an", f:t => 3},
  cible:{l:"Retour à la cible : 1,9 %, 1,6 %, puis 2 %", f:t => t === 0 ? 1.9 : t === 1 ? 1.6 : 2},
  choc:{l:"Choc puis reflux : 5 %, 4,5 %, 3 %, puis 2 %", f:t => [5,4.5,3][t] ?? 2},
  basse:{l:"Inflation basse : 1 % par an (épreuve)", f:t => 1}
};
const ESTR = 2.44, US3M = 4.11, COUV_USD = US3M - ESTR;   // coût de couverture du dollar ≈ écart de taux courts
const W_WORLD = {US:.73, JP:.055, GB:.035, CA:.03, FR:.027, CH:.024, DE:.022, AU:.017, NL:.012, SE:.008, ES:.007, IT:.007, _:.046};
const W_EUROPE = {GB:.22, FR:.17, CH:.15, DE:.14, NL:.07, SE:.05, DK:.045, ES:.045, IT:.045, _:.065};
const W_EM = {CN:.26, TW:.21, IN:.15, KR:.12, BR:.04, SA:.03, ZA:.03, MX:.02, ID:.012, TH:.012, MY:.012, PL:.01, _:.073};
const EM_LOCAL = ["BR","MX","ID","ZA","IN","PL","CO","CL","TH","MY","CZ","HU","RO","PE","CN"];
function basketEY(w){   // rendement bénéficiaire (1/CAPE) pondéré ; la part « autres » prend le CAPE médian des pays disponibles
  const capes = U.map(c => c.cape).filter(ok).sort((a,b) => a-b), med = capes[Math.floor(capes.length/2)];
  let ey = 0; for (const [k, wt] of Object.entries(w)){ const cape = k === "_" ? med : (P[k] && ok(P[k].cape) ? P[k].cape : med); ey += wt / cape; }
  return 100 * ey;
}
function curveAt(code, T){
  const pts = D.courbes[code].pts; const t = Math.min(T, pts[pts.length-1][0]);
  for (let i = 1; i < pts.length; i++) if (t <= pts[i][0]){ const [x0,y0] = pts[i-1], [x1,y1] = pts[i]; return y0 + (y1-y0)*(t-x0)/(x1-x0); }
  return pts[pts.length-1][1];
}
const avgInfl = X => 100 * (Math.pow(X.inflSeq.reduce((a,v) => a*(1+v/100), 1), 1/X.T) - 1);
const nominal = (realPct, X) => ((1 + realPct/100) * (1 + avgInfl(X)/100) - 1) * 100;
function emLocalYield(){
  const b = EM_LOCAL.map(k => P[k]).filter(c => ok(c.y10));
  const y = b.reduce((a,c) => a + c.y10, 0) / b.length;
  const withFx = b.filter(c => ok(c.yEur));
  const yE = withFx.reduce((a,c) => a + c.yEur, 0) / withFx.length;
  return {y, yE, n:b.length, nfx:withFx.length};
}

/* ================= Catalogue des placements ================= */
const FAM = {
  reg:{l:"Épargne réglementée", c:"--c5"}, mon:{l:"Monétaire et dépôts", c:"--c5"}, fe:{l:"Fonds euros", c:"--c3"},
  etat:{l:"Obligations d'État", c:"--c1"}, credit:{l:"Crédit d'entreprise", c:"--c1"}, monde:{l:"Obligations hors euro", c:"--c6"},
  act:{l:"Actions", c:"--c2"}, div:{l:"Diversifiants", c:"--c4"}, immo:{l:"Immobilier papier", c:"--c6"}
};
const ENV_L = {livret:"Livret", pea:"PEA", av:"Assurance-vie", cto:"Compte-titres", direct:"Détention directe"};
const eqRate = (w, cons) => X => X.hyp === "cons" && cons ? cons : nominal(basketEY(w), X);
const PL = [
  {id:"livretA", nom:"Livret A", fam:"reg", envs:["livret"], nat:"exo", r:() => 1.7, vol:0, dd:"Aucune", liq:"Immédiate",
    plaf:X => 22950 * (X.adultes + X.enfants), src:"Taux du 1er août 2026 ; révision le 1er février 2027.", note:"Plafond de 22 950 € par titulaire, enfants compris ; l'argent placé sur le livret d'un enfant lui appartient."},
  {id:"ldds", nom:"LDDS", fam:"reg", envs:["livret"], nat:"exo", r:() => 1.7, vol:0, dd:"Aucune", liq:"Immédiate",
    plaf:X => 12000 * X.adultes, src:"Taux du 1er août 2026."},
  {id:"lep", nom:"LEP", fam:"reg", envs:["livret"], nat:"exo", r:() => 2.5, vol:0, dd:"Aucune", liq:"Immédiate",
    plaf:X => 10000 * X.adultes, elig:X => X.R <= plafondLEP(X.parts) ? true : `Revenu fiscal de référence au-delà de ${F.eur(plafondLEP(X.parts))} pour ${nf1.format(X.parts)} parts`,
    src:"Taux du 1er août 2026 ; plafond de revenu 2026 (service-public.fr).", note:"Le revenu fiscal de référence retenu ici est approché par le revenu net imposable."},
  {id:"monetaire", nom:"ETF monétaire €STR", fam:"mon", envs:["cto","av"], nat:"cap", ter:.10, r:() => ESTR, vol:.3, dd:"Quasi nulle", liq:"Quotidienne",
    isin:"LU1190417599", src:"€STR à 2,44 % depuis la hausse de la BCE du 16 septembre 2026.", note:"Taux variable : il suivra les prochaines décisions de la BCE (17 décembre 2026)."},
  {id:"cat", nom:"Compte à terme 12 mois", fam:"mon", envs:["cto"], nat:"coupon", r:X => (3.0 + (X.T - 1) * (ESTR - .2)) / X.T, vol:0, dd:"Aucune", liq:"Bloqué 12 mois",
    src:"3,00 % garantis un an (Klarna, relevé du 2 août 2026) ; ensuite réinvesti autour de l'€STR.", note:"Intérêts imposés chaque année."},
  {id:"feMoy", nom:"Fonds euros moyen", fam:"fe", envs:["av"], nat:"fe", r:() => 3.0, vol:0, dd:"Aucune (capital garanti)", liq:"Quelques jours ; gel possible 6 mois",
    src:"Prévisions Good Value for Money : 2,90 % pour 2026, 3,20 % pour 2027.", note:"Taux net de frais de gestion ; prélèvements sociaux retenus chaque année."},
  {id:"feTop", nom:"Meilleurs fonds euros", fam:"fe", envs:["av"], nat:"fe", r:() => 3.5, vol:0, dd:"Aucune (capital garanti)", liq:"Quelques jours ; gel possible 6 mois",
    src:"Corum, Ampli, Carac : 3,55 à 4,10 % servis en 2025.", note:"Souvent conditionnés à une part d'unités de compte ou à des bonus temporaires."},
  {id:"oat", nom:"OAT de même durée que l'horizon", fam:"etat", envs:["cto"], nat:"coupon", r:X => curveAt("FR", X.T), vol:0, dd:"Nulle si conservée jusqu'au terme", liq:"Revente possible au prix du marché",
    src:"Courbe des OAT du 6 novembre 2026, interpolée à l'horizon.", note:"Coupons imposés chaque année. Une revente avant l'échéance expose aux variations de taux."},
  {id:"bund", nom:"Bund de même durée que l'horizon", fam:"etat", envs:["cto"], nat:"coupon", r:X => curveAt("DE", X.T), vol:0, dd:"Nulle si conservé jusqu'au terme", liq:"Revente possible au prix du marché",
    src:"Courbe allemande du 6 novembre 2026, interpolée à l'horizon."},
  {id:"btp", nom:"BTP italien de même durée que l'horizon", fam:"etat", envs:["cto"], nat:"coupon", r:X => curveAt("IT", X.T), vol:0, dd:"Nulle si conservé jusqu'au terme ; signature Baa2", liq:"Revente possible au prix du marché",
    src:"Courbe italienne du 6 novembre 2026, interpolée à l'horizon."},
  {id:"etfGov", nom:"ETF emprunts d'État zone euro", fam:"etat", envs:["cto","av"], nat:"cap", ter:.15, r:() => 3.8, vol:6, dur:7, dd:"≈ −20 % (2021-2023)", liq:"Quotidienne",
    isin:"LU0290355717", src:"Estimation : moyenne des taux à 7 ans de la France, de l'Allemagne, de l'Italie et de l'Espagne pondérée par leur poids dans l'indice.", note:"Sur un horizon proche de la durée du fonds (≈ 7 ans), le rendement à l'échéance actuel donne un bon ordre de grandeur."},
  {id:"etfIG", nom:"ETF obligations d'entreprises € (qualité)", fam:"credit", envs:["cto","av"], nat:"cap", ter:.09, r:() => 4.13 - .15, vol:5, dur:4.4, dd:"≈ −16 % (2021-2022)", liq:"Quotidienne",
    isin:"IE00B3F81R35", src:"iShares € Corp Bond : rendement à l'échéance de 4,13 % et durée de 4,4 ans au 5 novembre 2026, moins 0,15 point de défauts attendus."},
  {id:"etfHY", nom:"ETF haut rendement €", fam:"credit", envs:["cto","av"], nat:"cap", ter:.50, r:() => 6.58 - 1.6, vol:8, dd:"≈ −33 % (2008)", liq:"Quotidienne",
    isin:"IE00B66F4759", src:"Indice ICE BofA Euro High Yield : 6,58 % au 4 novembre 2026, moins 1,6 point de pertes attendues (≈ 2,7 % de défauts par an, 60 % de perte)."},
  {id:"fondsDate", nom:"Fonds daté 2031", fam:"credit", envs:["av","cto"], nat:"cap", ter:1.5, r:() => 6.0 - .8, vol:4, dur:4, dd:"≈ −15 % en cours de vie (estimation)", liq:"Quotidienne, au prix du marché",
    src:"Exemple Carmignac Credit 2031 : 6,0 % brut avec 32 % de haut rendement, moins 0,8 point de défauts attendus.", note:"Échéance fixe fin 2031 : au-delà, le réinvestissement se fera aux taux de l'époque."},
  {id:"ustC", nom:"Treasuries 7-10 ans couverts en euros", fam:"monde", envs:["cto","av"], nat:"cap", ter:.10, r:() => 4.87 - COUV_USD, vol:6, dur:7, dd:"≈ −20 % (2022)", liq:"Quotidienne",
    src:`Taux américain à 10 ans de 4,87 % moins ${nf2.format(COUV_USD)} point de couverture (écart entre taux courts américains et €STR).`},
  {id:"ustNC", nom:"Treasuries 7-10 ans sans couverture", fam:"monde", envs:["cto","av"], nat:"cap", ter:.07, r:() => 4.87 + P.US.fx10, vol:9, dur:7, dd:"≈ −15 % en euros (2022)", liq:"Quotidienne",
    src:"Taux de 4,87 % corrigé de la variation annuelle du dollar contre l'euro sur 10 ans."},
  {id:"emUSD", nom:"Dette émergente en dollars, couverte", fam:"monde", envs:["cto","av"], nat:"cap", ter:.45, r:() => 7.04 - COUV_USD - .8, vol:9, dur:6.3, dd:"≈ −25 % (2022)", liq:"Quotidienne",
    src:"iShares J.P. Morgan $ EM Bond : 7,04 % au 16 octobre 2026, moins la couverture et 0,8 point de défauts attendus."},
  {id:"emLoc", nom:"Dette émergente en devises locales", fam:"monde", envs:["cto","av"], nat:"cap", ter:.30, r:() => emLocalYield().yE, vol:11, dur:5, dd:"≈ −30 % en euros (2013-2015)", liq:"Quotidienne",
    piege:true, src:"Moyenne des taux à 10 ans de 15 pays émergents, corrigée de la dérive de leur devise contre l'euro sur 10 ans (données de la carte)."},
  {id:"monde", nom:"ETF Monde (MSCI World)", fam:"act", envs:["pea","cto","av"], nat:"cap", ter:.20, r:eqRate(W_WORLD, 7.0), w:W_WORLD, cons:7.0, vol:15, dd:"≈ −55 % (2007-2009)", liq:"Quotidienne",
    isin:"FR001400U5Q4 (PEA) · IE00B4L5Y983 (compte-titres)", src:"Prudent : 1 / CAPE pondéré (73 % d'États-Unis) plus l'inflation. Consensus : Amundi, 6,5 à 7,5 %."},
  {id:"sp500", nom:"ETF S&P 500", fam:"act", envs:["pea","cto","av"], nat:"cap", ter:.15, r:eqRate({US:1}, 6.0), w:{US:1}, cons:6.0, vol:16, dd:"−51 % au pire depuis 2000", liq:"Quotidienne",
    isin:"FR0011871128 (PEA)", src:"Prudent : 1 / CAPE américain (35,9). Consensus : moyenne J.P. Morgan 7,5 %, Vanguard 4,2 à 6,2 %, Schroders 5,4 %."},
  {id:"europe", nom:"ETF Europe (Stoxx 600)", fam:"act", envs:["pea","cto","av"], nat:"cap", ter:.07, r:eqRate(W_EUROPE, 7.0), w:W_EUROPE, cons:7.0, vol:16, dd:"≈ −55 à −60 % (2007-2009)", liq:"Quotidienne",
    isin:"LU0908500753", src:"Prudent : 1 / CAPE pondéré des marchés européens. Consensus : J.P. Morgan 8,5 % (zone euro, en dollars), Schroders 8,7 % (Royaume-Uni), ramenés à 7 %."},
  {id:"japon", nom:"ETF Japon (TOPIX)", fam:"act", envs:["pea","cto","av"], nat:"cap", ter:.20, r:eqRate({JP:1}, 7.5), w:{JP:1}, cons:7.5, vol:17, dd:"≈ −55 % (2007-2009, en euros)", liq:"Quotidienne",
    isin:"FR0013411980", src:"Prudent : 1 / CAPE japonais (35,4). Consensus : J.P. Morgan 9,0 %, Schroders 9,1 %, Vanguard 4,5 à 6,5 %."},
  {id:"em", nom:"ETF Émergents", fam:"act", envs:["pea","cto","av"], nat:"cap", ter:.30, r:eqRate(W_EM, 6.5), w:W_EM, cons:6.5, vol:19, dd:"≈ −60 % (2007-2008)", liq:"Quotidienne",
    isin:"FR0013412020 (PEA)", src:"Prudent : 1 / CAPE pondéré (Chine, Taïwan, Inde, Corée…). Consensus : J.P. Morgan 7,2 %, Vanguard 2 à 4 %, Schroders 9,2 %."},
  {id:"acwi", nom:"ETF Monde tous pays (MSCI ACWI)", fam:"act", envs:["pea","cto","av"], nat:"cap", ter:.30,
    r:X => X.hyp === "cons" ? 6.9 : nominal(.89*basketEY(W_WORLD) + .11*basketEY(W_EM), X), cons:6.9, vol:15, dd:"≈ −55 % (2007-2009)", liq:"Quotidienne",
    src:"89 % pays développés, 11 % émergents. Amundi PEA Global MSCI ACWI, lancé en juillet 2026."},
  {id:"cac", nom:"ETF CAC 40", fam:"act", envs:["pea","cto","av"], nat:"cap", ter:.25, r:eqRate({FR:1}, null), w:{FR:1}, vol:18, dd:"≈ −60 % (2007-2009)", liq:"Quotidienne",
    isin:"FR0007052782", src:"1 / CAPE français (19,5) plus l'inflation, dans les deux hypothèses."},
  {id:"or", nom:"Or physique (ETC)", fam:"div", envs:["cto","av"], nat:"cap", ter:.12, r:X => ((1 + avgInfl(X)/100) * 1.005 - 1) * 100, vol:15, dd:"−45 % (2011-2015, en dollars)", liq:"Quotidienne",
    isin:"FR0013416716", src:"Hypothèse : l'or garde son pouvoir d'achat avec une prime de 0,5 % par an ; aucun revenu courant.", note:"Une poche d'environ 5 % a amélioré le rendement par unité de risque des portefeuilles (World Gold Council)."},
  {id:"scpi", nom:"SCPI européennes récentes", fam:"immo", envs:["direct"], nat:"scpi", r:() => 6.5, vol:6, dd:"Prix des parts −33 % pour certaines SCPI classiques (2024-2026)", liq:"Faible ; frais de sortie de 5 à 6 % les premières années",
    src:"Iroko Zen 7,14 %, Remake Live 7,05 % distribués en 2025, ramenés à 6,5 % par prudence (fonds jeunes, acomptes en baisse ailleurs).", note:"Loyers étrangers : impôt local puis impôt français au taux effectif, sans prélèvements sociaux. Estimation : 15 % du revenu prélevé au taux marginal de 11 %, 30 % au-delà."},
  {id:"crowd", nom:"Crowdfunding immobilier (Bricks, Tokimo)", fam:"immo", envs:["direct"], nat:"coupon", r:() => 11.0 - 4.5, vol:12, dd:"Perte totale possible sur un projet", liq:"Bloqué jusqu'à l'échéance",
    piege:true, src:"Rendement affiché de 10,5 à 11,4 % ; 7 à 12 % des montants en procédure ou en retard long ; 4,5 points de pertes et retards retenus.", note:"Intérêts imposés à 31,4 % chaque année ; pertes imputables seulement sur des intérêts de même nature."}
];
const PLI = Object.fromEntries(PL.map(p => [p.id, p]));

/* ================= Simulation ================= */
const PHI = x => { const t = 1/(1+.2316419*Math.abs(x)), d = .3989423*Math.exp(-x*x/2); const p = d*t*(.3193815+t*(-.3565638+t*(1.781478+t*(-1.821256+t*1.330274)))); return x > 0 ? 1-p : p; };
function simulate(p, env, X){
  const T = X.T, M = X.M, r = p.r(X) / 100;
  const ucFee = env === "av" && p.nat !== "fe" ? X.fav / 100 : 0;
  const g = r - (p.ter || 0)/100 - ucFee;
  const out = {p, env, r:r*100, g:g*100, lines:[], mode:""};
  let V = M, ps = 0, ir = 0, frais = 0;
  if (p.nat === "exo"){ V = M * Math.pow(1 + g, T); }
  else if (p.nat === "coupon"){
    const run = mode => { let v = M, a = 0, b = 0; for (let t = 0; t < T; t++){ const I = v * g; const s = I * PS.cto; const i = mode === "pfu" ? I * PFU_IR : irCapital(I, X, PFU_IR).bar; v += I - s - i; a += s; b += i; } return {v, a, b}; };
    const A = run("pfu"), B = run("bar"), best = B.v > A.v ? B : A;
    V = best.v; ps = best.a; ir = best.b; out.mode = "Intérêts imposés chaque année · " + (best === B ? "barème" : "forfait");
  }
  else if (p.nat === "cap"){
    const gross = M * Math.pow(1 + g, T); frais = M * (Math.pow(1 + r, T) - Math.pow(1 + g, T));
    const tx = taxeGain(env, gross - M, M, X); V = gross - tx.ps - tx.ir; ps = tx.ps; ir = tx.ir; out.mode = tx.mode;
  }
  else if (p.nat === "fe"){
    let v = M; for (let t = 0; t < T; t++){ const I = v * g; const s = I * PS.fe; v += I - s; ps += s; }
    const tx = taxeGain("av", v - M, M, X); ir = tx.ir; V = v - ir; out.mode = "Prélèvements sociaux chaque année · " + tx.mode.replace(/^Contrat/, "contrat");
  }
  else if (p.nat === "scpi"){
    const te = tmiEff(X.R, X.parts) <= .12 ? .15 : .30;
    let v = M; for (let t = 0; t < T; t++){ const I = v * g; v += I * (1 - te); ir += I * te; }
    if (T < 5){ const fee = .05 * M; v -= fee; frais += fee; }
    V = v; out.mode = `Revenus étrangers · ${nf0.format(te*100)} % prélevés (estimation)` + (T < 5 ? " · frais de sortie de 5 %" : "");
  }
  if (p.nat === "cap") frais = Math.max(0, frais);
  out.V = V; out.ps = ps; out.ir = ir; out.frais = frais;
  out.rNet = 100 * (Math.pow(Math.max(V, 1e-9) / M, 1/T) - 1);
  const deflator = X.inflSeq.reduce((a,v) => a*(1+v/100), 1);
  out.Vr = V / deflator; out.rReel = 100 * (Math.pow(Math.max(out.Vr, 1e-9) / M, 1/T) - 1);
  // Dispersion : écart-type du logarithme de la valeur finale ; pour un fonds obligataire, borné par sa durée
  const sd = (p.vol || 0)/100 * Math.sqrt(p.dur ? Math.min(T, p.dur) : T);
  const mu = Math.log(1 + g) * T - (p.dur ? 0 : (p.vol/100)**2 / 2 * T);
  out.pLoss = sd > 0 ? 100 * PHI(-mu / sd) : (V < M ? 100 : 0);
  if (sd > 0){
    const q = z => { const gross = M * Math.exp(mu + z * sd); if (p.nat === "cap"){ const tx = taxeGain(env, gross - M, M, X); return gross - tx.ps - tx.ir; } return V * gross / (M * Math.exp(mu)); };
    out.p5 = q(-1.645); out.p95 = q(1.645);
  } else { out.p5 = V; out.p95 = V; }
  out.p5r = out.p5 / deflator; out.p95r = out.p95 / deflator;
  return out;
}
function evaluate(p, X){
  const res = [];
  const elig = p.elig ? p.elig(X) : true;
  for (const env of p.envs){
    if (env === "pea" && X.M > 150000 * X.adultes) continue;
    const s = simulate(p, env, X); s.elig = elig; res.push(s);
  }
  res.sort((a,b) => b.V - a.V);
  const best = res[0];
  best.all = res;
  best.plaf = p.plaf ? p.plaf(X) : null;
  best.over = best.plaf && X.M > best.plaf;
  return best;
}
/* Trajectoire médiane et fourchette 90 % année par année (pour les graphiques) */
function trajectory(p, env, X){
  const pts = [];
  for (let t = 1; t <= X.T; t++){
    const Xt = {...X, T:t, inflSeq:X.inflSeq.slice(0, t)};
    const s = simulate(p, env, Xt);
    const k = X.real ? 1 : 0;
    pts.push({t, v: k ? s.Vr : s.V, lo: k ? s.p5r : s.p5, hi: k ? s.p95r : s.p95});
  }
  return pts;
}
