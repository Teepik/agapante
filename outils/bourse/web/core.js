/* ================= Outils ================= */
const $ = s => document.querySelector(s), $$ = s => [...document.querySelectorAll(s)];
const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[c]));
const nf0 = new Intl.NumberFormat("fr-FR",{maximumFractionDigits:0});
const nf1 = new Intl.NumberFormat("fr-FR",{minimumFractionDigits:1,maximumFractionDigits:1});
const nf2 = new Intl.NumberFormat("fr-FR",{minimumFractionDigits:2,maximumFractionDigits:2});
const ok = v => v !== null && v !== undefined && isFinite(v);
const F = {
  pct: v => nf1.format(v) + " %", pct2: v => nf2.format(v) + " %",
  pctS: v => (v > 0 ? "+" : v < 0 ? "−" : "") + nf1.format(Math.abs(v)) + " %",
  pts: v => (v > 0 ? "+" : v < 0 ? "−" : "") + nf2.format(Math.abs(v)) + " pt",
  x: v => nf1.format(v), sig: v => (v > 0 ? "+" : v < 0 ? "−" : "") + nf1.format(Math.abs(v)) + " σ",
  pb: v => (v > 0 ? "+" : v < 0 ? "−" : "") + nf0.format(Math.abs(v)) + " pb", eur: v => nf0.format(Math.round(v)) + " €",
  n: v => nf0.format(v), sc: v => nf0.format(v) + " / 100", note: v => NOTE_LBL[Math.round(v)] || "—"
};
const fmt = (v, f) => ok(v) ? f(v) : "—";
const css = n => getComputedStyle(document.documentElement).getPropertyValue(n).trim();
const clamp = (v, a, b) => Math.max(a, Math.min(b, v));
function toast(msg){ const t = $("#toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast.t); toast.t = setTimeout(() => t.hidden = true, 2600); }
const MOIS = {Jan:"janv.",Feb:"févr.",Mar:"mars",Apr:"avr.",May:"mai",Jun:"juin",Jul:"juil.",Aug:"août",Sep:"sept.",Oct:"oct.",Nov:"nov.",Dec:"déc."};
const refFr = r => { if (!r) return ""; const [m,y] = r.split("/"); return (MOIS[m] || m) + " 20" + y; };

/* ================= Données ================= */
let D = null, P = {}, U = [];          // données brutes, pays, univers investissable
const NOTES = ["Aaa","Aa1","Aa2","Aa3","A1","A2","A3","Baa1","Baa2","Baa3","Ba1","Ba2","Ba3","B1","B2","B3","Caa1","Caa2","Caa3","Ca","C"];
const NOTE_LBL = {}; NOTES.forEach((n,i) => NOTE_LBL[i+1] = n);
const noteN = n => { const i = NOTES.indexOf(n); return i < 0 ? null : i + 1; };
const CLS = {DM:"Développé", EM:"Émergent", FM:"Frontière", SA:"Hors indice (MSCI)", NC:"Hors classement MSCI", EX:"Exclu des indices"};
const EZ_INFL = 4.0;  // inflation zone euro, octobre 2026 (estimation rapide Eurostat via Trading Economics)
const PEA_EU = new Set(["FR","DE","IT","ES","PT","NL","BE","AT","FI","IE","GR","LU","SK","SI","LT","HR","SE","DK","NO","IS","PL","CZ","HU","RO"]);

function derive(){
  for (const c of Object.values(P)){
    c.ey = ok(c.cape) ? 100 / c.cape : null;
    c.eyPe = ok(c.per) ? 100 / c.per : null;
    c.reel = ok(c.y10) && ok(c.infl) ? c.y10 - c.infl : null;
    c.noteN = noteN(c.note);
    if (ok(c.y10)){
      if (c.ccy === "EUR") c.yEur = c.y10;
      else if (ok(c.fx10)) c.yEur = ((1 + c.y10/100) * (1 + c.fx10/100) - 1) * 100;
      else c.yEur = null;
      // Méthode du différentiel d'inflation (parité des pouvoirs d'achat)
      c.yPpp = ok(c.infl) ? ((1 + c.y10/100) / (1 + c.infl/100) * (1 + EZ_INFL/100) - 1) * 100 : null;
    }
  }
  scores(); flags();
}
/* Rang centile parmi l'univers investissable */
function rankOf(key, val, higherBetter){
  const vals = U.map(c => c[key]).filter(ok);
  if (!ok(val) || vals.length < 3) return null;
  const below = vals.filter(v => higherBetter ? v < val : v > val).length;
  const eq = vals.filter(v => v === val).length;
  return 100 * (below + (eq - 1) / 2) / (vals.length - 1);
}
const SCORE_A = [
  {k:"eyA", l:"Valorisation absolue : rendement bénéficiaire", w:.35, hb:true, f:F.pct},
  {k:"z10", l:"Valorisation relative : PER face à sa moyenne 10 ans", w:.35, hb:false, f:F.sig},
  {k:"tend", l:"Tendance : cours face à sa moyenne 200 jours", w:.15, hb:true, f:F.pctS},
  {k:"crp", l:"Risque pays : prime exigée (Damodaran)", w:.15, hb:false, f:F.pct2}
];
const SCORE_O = [
  {k:"reel", l:"Taux réel : 10 ans moins inflation", w:.35, hb:true, f:F.pts},
  {k:"yEur", l:"Taux en euros après la dérive de la devise sur 10 ans", w:.35, hb:true, f:F.pct},
  {k:"noteN", l:"Qualité de signature (Moody's)", w:.20, hb:false, f:F.note},
  {k:"fxvol", l:"Stabilité de la devise contre l'euro", w:.10, hb:false, f:F.pct}
];
function scores(){
  for (const c of U) c.eyA = ok(c.ey) ? c.ey : c.eyPe;
  for (const c of U){
    c.sA = null; c.sO = null; c.sAparts = null; c.sOparts = null;
    if (ok(c.per) && ok(c.z10)){
      let s = 0, w = 0; c.sAparts = [];
      for (const comp of SCORE_A){ const r = rankOf(comp.k, c[comp.k], comp.hb); c.sAparts.push({...comp, v:c[comp.k], r}); if (ok(r)){ s += r*comp.w; w += comp.w; } }
      c.sA = w > .5 ? s / w : null;
    }
    if (ok(c.y10) && ok(c.infl)){
      let s = 0, w = 0; c.sOparts = [];
      for (const comp of SCORE_O){ const r = rankOf(comp.k, c[comp.k], comp.hb); c.sOparts.push({...comp, v:c[comp.k], r}); if (ok(r)){ s += r*comp.w; w += comp.w; } }
      c.sO = w > .5 ? s / w : null;
    }
  }
}
/* Points de vigilance : règles explicites, affichées telles quelles */
function flags(){
  const bund = P.DE.y10;
  for (const c of Object.values(P)){
    const f = [];
    if (c.code === "RU") f.push({t:"bad", l:"Marché fermé", d:"Les sanctions européennes ferment ce marché aux investisseurs de l'Union depuis 2022."});
    if (ok(c.y10) && c.y10 >= 7 && ok(c.yEur) && c.yEur < bund + 1)
      f.push({t:"bad", l:"Taux mangé par la devise", d:`Le taux de ${F.pct(c.y10)} paie surtout la baisse de la devise : elle a perdu ${F.pct(-c.fx10)} par an contre l'euro sur 10 ans, ce qui ramène le rendement en euros vers ${F.pct(c.yEur)}.`});
    if (ok(c.reel) && c.reel < 0) f.push({t:"warn", l:"Taux réel négatif", d:`L'inflation (${F.pct(c.infl)}) dépasse le taux d'État à 10 ans (${F.pct(c.y10)}).`});
    if (ok(c.noteN) && c.noteN >= 11) f.push({t:"warn", l:"Signature spéculative", d:`Note Moody's ${c.note} : catégorie spéculative, défaut plus probable.`});
    if (ok(c.infl) && c.infl >= 10) f.push({t:"bad", l:"Inflation à deux chiffres", d:`Inflation sur un an de ${F.pct(c.infl)}.`});
    if (ok(c.z10) && c.z10 >= 2) f.push({t:"warn", l:"Cher face à son histoire", d:`PER à ${F.sig(c.z10)} de sa moyenne sur 10 ans.`});
    if (ok(c.cape) && c.cape >= 30) f.push({t:"warn", l:"CAPE élevé", d:`CAPE de ${F.x(c.cape)} : rendement réel attendu proche de ${F.pct(100/c.cape)} par an sur 10 ans.`});
    if (ok(c.tend) && c.tend <= -15) f.push({t:"warn", l:"Tendance baissière", d:`Cours ${F.pct(-c.tend)} sous sa moyenne des 200 derniers jours.`});
    if (ok(c.z10) && c.z10 <= -1 && ok(c.tend) && c.tend > -15) f.push({t:"good", l:"Bon marché face à son histoire", d:`PER à ${F.sig(c.z10)} de sa moyenne sur 10 ans, sans tendance baissière marquée.`});
    if (ok(c.reel) && c.reel >= 2 && ok(c.noteN) && c.noteN <= 10 && (c.ccy === "EUR" || (ok(c.fx10) && c.fx10 > -2))) f.push({t:"good", l:"Taux réel solide", d:`Taux réel de ${F.pts(c.reel)} avec une signature de qualité et une devise stable.`});
    c.flags = f;
    c.alert = f.some(x => x.t === "bad") || f.filter(x => x.t === "warn").length >= 2;
  }
}

/* ================= Indicateurs de la carte ================= */
/* good : "high" = une valeur élevée est favorable à l'investisseur, "low" = l'inverse, null = neutre ; div = échelle centrée */
const INDS = [
  {k:"sA", g:"Actions", l:"Score Atlas actions (0-100)", f:F.sc, good:"high", ends:["moins attractif","plus attractif"], d:"Synthèse : valorisation absolue et relative, tendance, risque pays."},
  {k:"ey", g:"Actions", l:"Rendement réel attendu à 10 ans (1 / CAPE)", f:F.pct, good:"high", d:"Inverse du CAPE : la meilleure mesure simple du rendement réel des dix années suivantes."},
  {k:"cape", g:"Actions", l:"CAPE (PER corrigé du cycle, 10 ans)", f:F.x, good:"low", ends:["cher","bon marché"]},
  {k:"per", g:"Actions", l:"PER (cours / bénéfices des 12 derniers mois)", f:F.x, good:"low", ends:["cher","bon marché"]},
  {k:"z10", g:"Actions", l:"PER face à sa moyenne 10 ans (écarts-types)", f:F.sig, good:"low", div:true, ends:["plus cher que d'habitude","moins cher que d'habitude"]},
  {k:"z20", g:"Actions", l:"PER face à sa moyenne 20 ans (écarts-types)", f:F.sig, good:"low", div:true, ends:["plus cher que d'habitude","moins cher que d'habitude"]},
  {k:"div", g:"Actions", l:"Rendement du dividende", f:F.pct, good:"high"},
  {k:"tend", g:"Actions", l:"Tendance : cours face à la moyenne 200 jours", f:F.pctS, good:"high", div:true, ends:["baissière","haussière"]},
  {k:"erp", g:"Actions", l:"Prime de risque actions exigée (Damodaran)", f:F.pct2, good:null},
  {k:"sO", g:"Obligations", l:"Score Atlas obligations (0-100)", f:F.sc, good:"high", ends:["moins attractif","plus attractif"], d:"Synthèse : taux réel, taux en euros après devise, signature, stabilité de la devise."},
  {k:"y10", g:"Obligations", l:"Taux d'État à 10 ans", f:F.pct2, good:"high"},
  {k:"reel", g:"Obligations", l:"Taux réel à 10 ans (taux moins inflation)", f:F.pts, good:"high", div:true, ends:["négatif","positif"]},
  {k:"yEur", g:"Obligations", l:"Taux en euros après la dérive de la devise (10 ans)", f:F.pct, good:"high", d:"Taux à 10 ans corrigé de la variation annuelle moyenne de la devise contre l'euro depuis 2016."},
  {k:"spr", g:"Obligations", l:"Écart avec le Bund allemand (points de base)", f:F.pb, good:null},
  {k:"dy10ytd", g:"Obligations", l:"Variation du taux à 10 ans depuis janvier", f:F.pts, good:null, div:true, ends:["baisse","hausse"]},
  {k:"noteN", g:"Obligations", l:"Note souveraine Moody's", f:F.note, good:"low", ends:["Aaa","C"]},
  {k:"fx10", g:"Devises", l:"Variation annuelle contre l'euro sur 10 ans", f:F.pctS, good:"high", div:true, ends:["se déprécie","s'apprécie"]},
  {k:"fx5", g:"Devises", l:"Variation annuelle contre l'euro sur 5 ans", f:F.pctS, good:"high", div:true, ends:["se déprécie","s'apprécie"]},
  {k:"fx1", g:"Devises", l:"Variation contre l'euro sur un an", f:F.pctS, good:"high", div:true, ends:["se déprécie","s'apprécie"]},
  {k:"fxvol", g:"Devises", l:"Volatilité annuelle contre l'euro (10 ans)", f:F.pct, good:"low"},
  {k:"infl", g:"Macro", l:"Inflation sur un an", f:F.pct, good:"low"},
  {k:"taux", g:"Macro", l:"Taux directeur de la banque centrale", f:F.pct2, good:null},
  {k:"crp", g:"Macro", l:"Prime de risque pays (Damodaran)", f:F.pct2, good:"low"}
];
const IND = Object.fromEntries(INDS.map(i => [i.k, i]));

/* ================= Accès depuis la France ================= */
const RETENUE = {US:[30,15,"Formulaire W-8BEN chez le courtier"],CH:[35,15,"20 points à réclamer sous 3 ans"],DE:[26.375,15,"11,375 points à réclamer"],IT:[26,15,"11 points à réclamer"],
  CA:[25,15,"10 points à réclamer"],ES:[19,15,"4 points à réclamer"],JP:[15.3,10,"≈ 5 points à réclamer"],NL:[15,15,"Retenue déjà au plafond"],GB:[0,0,"Dividende versé brut"],FR:[0,0,"Dividende soumis à la fiscalité française"]};
const ETF_PEA = {
  US:"ETF S&P 500 éligibles au PEA (réplication synthétique), par exemple Amundi PEA S&P 500 (FR0011871128) ou iShares S&P 500 Swap PEA.",
  JP:"Amundi PEA Japon TOPIX (FR0013411980), frais de 0,20 %.",
  GB:"Inclus dans les ETF Europe éligibles au PEA, par exemple Amundi Core Stoxx Europe 600 (LU0908500753).",
  CH:"Inclus dans les ETF Europe éligibles au PEA, par exemple Amundi Core Stoxx Europe 600 (LU0908500753)."
};
const ETF_PAYS = new Set(["US","CA","GB","CH","JP","AU","CN","IN","KR","TW","BR","MX","ZA","SA","PL","TR","DE","FR","IT","ES","NL"]);
function acces(c){
  const a = {actions:[], oblig:[], ret:RETENUE[c.code]};
  if (c.code === "RU"){ a.actions.push("Marché fermé aux investisseurs européens depuis 2022."); a.oblig.push("Marché fermé."); return a; }
  if (PEA_EU.has(c.code)) a.actions.push("Actions éligibles au PEA en direct (siège dans l'Union européenne ou l'Espace économique européen), ou via un ETF Europe ou zone euro dans le PEA.");
  if (ETF_PEA[c.code]) a.actions.push("PEA : " + ETF_PEA[c.code]);
  if (c.cls === "EM") a.actions.push("PEA : présent dans Amundi PEA Émergents ESG Transition (FR0013412020) ou Amundi PEA Global MSCI ACWI, selon son poids dans l'indice.");
  if (ETF_PAYS.has(c.code) && !PEA_EU.has(c.code)) a.actions.push("Compte-titres : plusieurs ETF UCITS dédiés à ce pays sont cotés en Europe.");
  else if (!PEA_EU.has(c.code) && c.cls) a.actions.push("Compte-titres : les ETF UCITS dédiés à ce pays sont rares ; l'accès passe surtout par un ETF régional (émergents, frontières).");
  if (c.ccy === "EUR") a.oblig.push("Obligations d'État en direct chez certains courtiers (compte-titres), ou via un ETF d'emprunts d'État zone euro, en compte-titres ou en assurance-vie.");
  else if (c.code === "US") a.oblig.push("Treasuries en direct chez un courtier international (Interactive Brokers) ou via un ETF UCITS, avec ou sans couverture du dollar.");
  else if (c.cls === "DM") a.oblig.push("Via un ETF d'obligations mondiales ou un ETF dédié en devise locale ; la couverture de change coûte à peu près l'écart de taux courts avec la zone euro.");
  else if (c.cls) a.oblig.push("Via un ETF de dette émergente : en dollars (couvert ou non en euros) ou en devises locales, exposé au change.");
  return a;
}
const justetf = q => "https://www.justetf.com/fr/search.html?search=ETFS&query=" + encodeURIComponent(q);
