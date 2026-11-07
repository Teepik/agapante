/* ================= Données de marché : actions, ETF, rendements hebdomadaires en euros ================= */
const B = {etat:"attente", meta:null, A:[], E:[], byId:new Map(), dates:[], R:new Map(), usd:null, chocs:{}, statut:null};
const STY = {v:"Value", g:"Croissance", q:"Qualité", m:"Momentum", d:"Défensive", y:"Rendement", s:"Petites et moyennes"};
const STY_C = {v:"--c4", g:"--c3", q:"--c1", m:"--c2", d:"--c5", y:"--c6", s:"--muted"};
const STY_EXPL = {
  v:"Rendement bénéficiaire (inverse du PER prévisionnel), cours rapporté aux fonds propres, valeur d'entreprise rapportée à l'excédent brut d'exploitation, dividende, flux de trésorerie disponible. Moitié classement dans l'univers, moitié dans le secteur.",
  g:"Croissance du chiffre d'affaires et du bénéfice sur un an, croissance attendue par les analystes à un et cinq ans.",
  q:"Rentabilité des fonds propres, marge opérationnelle, marge brute, endettement net rapporté à l'excédent brut d'exploitation.",
  m:"Performance sur douze mois hors dernier mois, révision des bénéfices attendus sur trois mois.",
  d:"Volatilité sur trois ans et sensibilité au marché mondial (bêta) : plus elles sont basses, plus la note est haute.",
  y:"Rendement du dividende, réduit des deux tiers quand il dépasse les bénéfices ou le flux de trésorerie.",
  s:"Capitalisation boursière : les plus petites obtiennent la note la plus haute."
};
const CATS = ["Croissance à prix raisonnable","Qualité et croissance","Croissance","Qualité","Value","Momentum","Défensive","Rendement","Redressement","Profil équilibré"];
const CAT_C = {"Croissance à prix raisonnable":"--c5","Qualité et croissance":"--c1","Croissance":"--c3","Qualité":"--c1","Value":"--c4","Momentum":"--c2","Défensive":"--c5","Rendement":"--c6","Redressement":"--c2","Profil équilibré":"--muted"};
const CLS_L = {act_monde:"Actions monde", act_us:"Actions États-Unis", act_eu:"Actions Europe", act_jp:"Actions Japon", act_em:"Actions émergentes", act_pays:"Actions d'un pays ou d'une région",
  act_secteur:"Actions sectorielles", act_style:"Actions, facteur de style", act_theme:"Actions thématiques", monetaire:"Monétaire", etat:"Obligations d'État euro",
  credit:"Obligations d'entreprise euro", monde_oblig:"Obligations hors euro", or:"Or", metal:"Métaux précieux", matieres:"Matières premières", crypto:"Cryptomonnaies", immo_cote:"Immobilier coté", action:"Action"};
const POCHE = {act_monde:"actions", act_us:"actions", act_eu:"actions", act_jp:"actions", act_em:"actions", act_pays:"actions", act_secteur:"actions", act_style:"actions", act_theme:"actions", action:"actions",
  monetaire:"monetaire", etat:"obligations", credit:"obligations", monde_oblig:"obligations", or:"or", metal:"or", matieres:"or", crypto:"crypto", immo_cote:"actions"};
const POCHE_L = {actions:"Actions", obligations:"Obligations", monetaire:"Monétaire", or:"Or et matières premières", crypto:"Cryptomonnaies"};
const MET_L = {argent:"argent", platine:"platine", palladium:"palladium", panier:"panier de métaux précieux"};
const CR_L = {BTC:"bitcoin", ETH:"ether", SOL:"solana", XRP:"XRP", PANIER:"panier de cryptomonnaies"};
const ZONE_L = {all:"Toutes", eu:"Europe", us:"États-Unis", jp:"Japon", ca:"Canada", au:"Australie", autres:"Autres pays"};
const BT_L = {gov:"d'État", corp:"d'entreprises de qualité", hy:"à haut rendement", infl:"indexées sur l'inflation", em:"émergentes", agg:"diversifiées", float:"à taux variable"};
const BC_L = {USD:"en dollars", GBP:"en livres", GLOBAL:"du monde entier", EMLOC:"en devises locales", CNY:"en yuans"};
/* Durée des ETF obligataires de la sélection éditoriale */
const ED_T = {"EUNH.DE":7.5, "IBCI.DE":8, "EUN5.DE":4.4, "EUNW.DE":3, "SXRM.DE":7.5, "IUS7.DE":7};
const SEC_FR = {"Technology":"Technologie", "Healthcare":"Santé", "Financial Services":"Finance", "Consumer Cyclical":"Consommation cyclique", "Industrials":"Industrie",
  "Communication Services":"Communication", "Consumer Defensive":"Consommation courante", "Energy":"Énergie", "Basic Materials":"Matériaux", "Real Estate":"Immobilier", "Utilities":"Services aux collectivités"};
const STY_ETF = {v:"Value", g:"Croissance", q:"Qualité", m:"Momentum", d:"Faible volatilité", y:"Dividendes", s:"Petites et moyennes valeurs"};
/* Poids des zones des ETF (décomposition géographique approchée) */
const GEO_W = () => ({WORLD:W_WORLD, EUROPE:W_EUROPE, EM:W_EM, EMU:{FR:.33, DE:.28, NL:.15, IT:.09, ES:.08, _:.07}, US:{US:1}, NORDIC:{SE:.4, DK:.3, FI:.15, NO:.15},
  LATAM:{BR:.6, MX:.25, CL:.08, _:.07}, APXJ:{AU:.55, HK:.2, SG:.12, _:.13}});
const geoWeights = g => { const W = GEO_W(); return W[g] || (g && P[g] ? {[g]:1} : W.WORLD); };
/* Écart de rendement attendu des ETF de style et thématiques face à leur marché (hypothèses prudentes, en points) */
const ETF_ADJ = {"IS3S.DE":.7, "IQQ0.DE":-.4, "ZPRV.DE":1, "ZPRX.DE":1, "IS3Q.DE":-.2, "XAIX.DE":-1, "2B76.DE":-1, "VVSM.DE":-1.5, "IQQH.DE":-.5, "USPY.DE":-1, "DFEN.DE":-1.2};
const themeL = k => (B.meta && B.meta.themes && B.meta.themes[k]) || k;

/* Rendement réel attendu d'un ETF (% par an, avant impôt), net de l'inflation et des frais.
   Liste éditoriale : catalogue de l'atlas. ETF découverts : valorisation de leur zone (1 / CAPE) ou taux de leur courbe à leur durée. */
const STY_ADJ = {v:.7, s:.8, d:-.4, q:-.2, y:.3, m:0, g:-.3};
function bondNominal(e){
  const T = clamp(e.T || 6, .2, 30), cur = e.bc || "EUR", ezGov = t => .3 * curveAt("FR", t) + .25 * curveAt("DE", t) + .25 * curveAt("IT", t) + .2 * curveAt("ES", t);
  const gov = e.bp && D.courbes[e.bp] ? curveAt(e.bp, T) : cur === "USD" ? curveAt("US", T) : ezGov(T);
  const igSpread = 4.13 - curveAt("DE", 4.4);
  let y;
  switch (e.bt){
    case "float": y = cur === "USD" ? US3M + .5 : ESTR + .4; break;
    case "hy": y = (cur === "USD" ? 7.2 : 6.58) - (cur === "USD" ? 2 : 1.6); break;
    case "em": y = cur === "EMLOC" ? emLocalYield().yE : 7.04 - .8; break;
    case "corp": y = (cur === "USD" ? curveAt("US", T) + .9 : curveAt("DE", T) + igSpread) - .15; break;
    case "agg": y = cur === "GLOBAL" ? .5 * ezGov(T) + .5 * curveAt("US", T) + .3 : cur === "USD" ? curveAt("US", T) + .4 : ezGov(T) + .3; break;
    default: y = cur === "GLOBAL" ? .45 * curveAt("US", T) + .3 * ezGov(T) + .25 * 1.5 : cur === "GBP" && P.GB ? P.GB.y10 : gov;
  }
  if (cur === "CNY" && P.CN) y = (P.CN.y10 || 2) + (ok(P.CN.fx10) ? P.CN.fx10 : 0);
  let fxAdj = 0;
  if (cur === "USD") fxAdj = e.hdg ? -COUV_USD : (P.US.fx10 || 0);
  else if (cur === "GLOBAL") fxAdj = e.hdg ? -COUV_USD * .45 : (P.US.fx10 || 0) * .45;
  else if (cur === "GBP" && P.GB) fxAdj = e.hdg ? -Math.max(0, (P.GB.taux || ESTR) - ESTR) : (ok(P.GB.fx10) ? P.GB.fx10 : 0);
  y += fxAdj;
  return y;
}
function muEtf(e){
  const X = ctx(), pl = e.pl && PLI[e.pl];
  const reelDe = nomPct => ((1 + nomPct/100) / (1 + avgInfl(X)/100) - 1) * 100;
  let reel;
  if (pl) reel = reelDe(pl.r(X)) + (ETF_ADJ[e.id] || 0);
  else if (POCHE[e.cls] === "obligations" || e.cls === "monetaire") reel = e.cls === "monetaire" && !e.bt ? reelDe(ESTR) : reelDe(bondNominal(e));
  else if (e.cls === "or") reel = reelDe(PLI.or.r(X));
  else if (e.cls === "matieres" || e.cls === "metal" || e.cls === "crypto") reel = 0;
  else if (e.cls === "immo_cote") reel = basketEY(geoWeights(e.geo || "EUROPE")) - .5;
  else { const w = geoWeights(e.geo); reel = basketEY(w) + (STY_ADJ[e.sty] || 0) + (e.cls === "act_theme" ? -1 : 0); }
  return reel - (ok(e.ter) ? e.ter : e.spot ? 0 : .3);
}
/* Rendements hebdomadaires chargés à la demande */
const R_ATTENTE = new Map();
async function needRets(ids){
  const manque = [...new Set(ids)].filter(id => id && !B.R.has(id) && !R_ATTENTE.has(id) && B.byId.has(id));
  if (manque.length){
    const p = (async () => {
      for (let i = 0; i < manque.length; i += 1200){
        const lot = manque.slice(i, i + 1200);
        try {
          const r = await fetch("/bourse/api/rets", {method:"POST", credentials:"same-origin", headers:{"Content-Type":"application/json"}, body:JSON.stringify({ids:lot})});
          if (!r.ok) throw new Error(r.status);
          const j = await r.json();
          for (const [k, v] of Object.entries(j.r || {})) B.R.set(k, decode64(v));
        } catch(e){ console.error(e); }
      }
    })();
    for (const id of manque) R_ATTENTE.set(id, p);
    await p;
    for (const id of manque) R_ATTENTE.delete(id);
  }
  await Promise.all(ids.map(id => R_ATTENTE.get(id)).filter(Boolean));
}
const hasRets = ids => ids.every(id => !B.byId.has(id) || B.R.has(id));
function decode64(b){
  const bin = atob(b), n = bin.length >> 1, out = new Float64Array(n);
  for (let i = 0; i < n; i++){ let v = bin.charCodeAt(2*i) | (bin.charCodeAt(2*i + 1) << 8); if (v >= 32768) v -= 65536; out[i] = v === -32768 ? NaN : v * 1e-4; }
  return out;
}
async function loadBourse(){
  const get = q => fetch("/bourse/api/donnees?quoi=" + q, {credentials:"same-origin", cache:"no-store"}).then(r => { if (r.status === 401) { location.href = "/admin?suite=/bourse"; throw new Error("401"); } if (!r.ok) throw new Error(r.status); return r.json(); });
  try {
    const [a, e, rm] = await Promise.all([get("actions"), get("etf"), get("retsmeta")]);
    if (a.vide || e.vide || rm.vide || !a.cols){
      B.etat = "vide";
      try { B.statut = await get("statut"); } catch(err){}
    } else {
      B.meta = a.meta; B.chocs = a.chocs || {}; B.dates = rm.dates;
      B.A = a.rows.map(r => { const o = {}; a.cols.forEach((k, i) => { if (r[i] !== null) o[k] = r[i]; }); o.th = o.th || {}; o.sc = o.sc || {}; o.pg = o.pg || []; return o; });
      B.E = e.etf; B.usd = rm.usd ? decode64(rm.usd) : null;
      for (const x of B.A){ x.kind = "action"; x.cls = "action"; x.mu = x.muR; B.byId.set(x.id, x); }
      for (const x of B.E){ x.kind = "etf"; x.th = x.th || {}; if (x.ed && ED_T[x.id]) x.T = ED_T[x.id]; x.mu = muEtf(x); x.zone = x.cls === "act_us" || x.geo === "US" ? "us" : x.cls === "act_eu" ? "eu" : "monde"; B.byId.set(x.id, x); }
      B.etat = "pret";
    }
  } catch(err){
    if (B.etat !== "vide") B.etat = "erreur";
    console.error(err);
  }
  $("#b-date").textContent = B.etat === "pret" ? `${nf0.format(B.A.length)} actions et ${nf0.format(B.E.length)} ETF · cours au ${new Date(B.meta.fin).toLocaleDateString("fr-FR", {day:"numeric", month:"long", year:"numeric"})}` : "";
  if (["actions","opportunites","etf","ruptures","portefeuille","constructeur","suivi"].includes(CUR)) go(CUR, false);
}
/* Rafraîchit les rendements attendus des ETF quand le foyer (inflation, hypothèse) change */
function refreshMuEtf(){ for (const e of B.E) e.mu = muEtf(e); }

/* Message d'attente commun aux vues qui dépendent de la collecte */
function bourseWait(el){
  if (B.etat === "pret") return false;
  const st = B.statut;
  const msg = B.etat === "attente" ? "Chargement des cours et des comptes des sociétés…"
    : B.etat === "vide" ? `La première collecte des cours est en cours : chaque passage quotidien relève plusieurs centaines de titres, puis recalcule classements et rendements.${st && st.etat ? " État actuel : " + st.etat.map(e => `${e.type} ${e.releves}/${e.n}`).join(" · ") + "." : ""}`
    : "Les données de marché n'ont pas pu être chargées. Rechargez la page dans un instant.";
  el.innerHTML = `<div class="card"><p class="empty">${esc(msg)}</p></div>`;
  return true;
}

/* Petits éléments d'affichage partagés */
const cssV = k => css(k);
const pctS = v => fmt(v, F.pctS), pct1 = v => fmt(v, F.pct);
const mdE = v => ok(v) ? (v >= 100 ? nf0.format(v) : v >= 10 ? nf1.format(v) : nf2.format(v)) + " Md€" : "—";
const meur = v => ok(v) ? (v >= 100 ? nf0.format(v) : nf1.format(v)) + " M€" : "—";
function scoreCell(v, k){ if (!ok(v)) return `<td class="sc">—</td>`; return `<td class="sc" title="${esc(STY[k])} : ${nf0.format(v)} / 100"><i style="--w:${v}%;--c:var(${STY_C[k]})"></i><span>${nf0.format(v)}</span></td>`; }
function catPill(c){ return `<span class="pill cat" style="color:var(${CAT_C[c] || "--muted"})">${esc(c)}</span>`; }
const THEME_C = {ia:"IA", robot:"Robotique", defense:"Défense", energie:"Électricité", chine:"Chine", douane:"Douanes"};
function themePills(th, small){
  return Object.entries(th || {}).sort((a, b) => b[1] - a[1]).map(([k, v]) => { const a = v > 0 ? "▲" : "▼";
    return `<span class="pill ${v > 0 ? "good" : "bad"}${small ? " xs" : ""}" title="${esc(themeL(k))} : ${v > 0 ? "gagnant" : "menacé"}${Math.abs(v) === 2 ? " direct" : " indirect"}">${Math.abs(v) === 2 ? a + a : a} ${esc(THEME_C[k] || k)}</span>`; }).join("");
}
function piegePills(pg){ return (pg || []).map(([t, d]) => `<span class="pill warn xs" title="${esc(d)}">${esc(t)}</span>`).join(""); }
function assetLabel(x){ return x.kind === "etf" ? `${esc(x.id)} · ${esc(etfSousTitre(x))}${x.pea ? " · PEA" : ""}` : `${esc(x.id)} · ${esc(x.pays || "")} · ${esc(x.secteur || "")}`; }
function etfSousTitre(e){
  if (!e.bt && !e.sty && !e.sec && !e.geo) return CLS_L[e.cls] || e.cls;
  if (POCHE[e.cls] === "obligations" || (e.cls === "monetaire" && e.bt)) return `Obligations ${BT_L[e.bt] || ""}${e.bp && P[e.bp] && e.bc === "EUR" ? " (" + P[e.bp].nom + ")" : ""}${e.bc && e.bc !== "EUR" ? " " + (BC_L[e.bc] || e.bc) : ""}${e.hdg ? ", couvertes en euros" : ""}${e.ech ? ` · échéance ${e.ech}` : ok(e.T) ? ` · durée ≈ ${nf1.format(e.T)} ans` : ""}`;
  if (e.cls === "act_secteur") return `Actions · ${SEC_FR[e.sec] || e.sec || "secteur"}${e.geo ? " · " + geoL(e.geo) : ""}`;
  if (e.cls === "act_style" && e.sty) return `Actions · ${STY_ETF[e.sty]}${e.geo ? " · " + geoL(e.geo) : ""}`;
  if (e.cls === "act_pays") return `Actions · ${geoL(e.geo)}`;
  if (e.cls === "metal") return `Métaux précieux · ${MET_L[e.met] || "physique"}`;
  if (e.cls === "crypto") return `Cryptomonnaies · ${CR_L[e.cr] || ""}${e.spot ? " · détention en direct" : " · produit coté (ETP)"}`;
  return CLS_L[e.cls] || e.cls;
}
const GEO_N = {WORLD:"monde", EUROPE:"Europe", EMU:"zone euro", EM:"émergents", US:"États-Unis", NORDIC:"pays nordiques", LATAM:"Amérique latine", APXJ:"Asie-Pacifique hors Japon"};
const geoL = g => GEO_N[g] || (g && P[g] ? P[g].nom : g || "");
/* Recherche dans les actions et les ETF */
function searchAssets(q, n = 12, filtre){
  q = q.trim().toLowerCase(); if (!q) return [];
  const norm = s => String(s || "").toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "");
  const qq = norm(q);
  const all = (searchAssets.all && searchAssets.all.n === B.A.length + B.E.length ? searchAssets.all.v : (searchAssets.all = {n:B.A.length + B.E.length, v:B.E.concat(B.A)}).v).filter(x => !filtre || filtre(x));
  const sc = x => { const id = x.id.toLowerCase(), nm = norm(x.nom); if (id === qq || id.split(".")[0] === qq) return 0; if (nm.startsWith(qq) || id.startsWith(qq)) return 1; if (nm.includes(qq) || (x.isin || "").toLowerCase() === qq) return 2; return 9; };
  return all.map(x => [sc(x), x]).filter(([s]) => s < 9).sort((a, b) => a[0] - b[0] || (b[1].mcap || b[1].aum || 0) - (a[1].mcap || a[1].aum || 0)).slice(0, n).map(([, x]) => x);
}
function attachSearch(input, box, onPick, filtre){
  let cur = [], k = -1;
  const draw = () => { box.hidden = !cur.length; input.setAttribute("aria-expanded", cur.length > 0);
    box.innerHTML = cur.map((x, i) => `<button type="button" role="option" data-i="${i}" class="${i === k ? "on" : ""}"><span>${esc(x.nom)}</span><small>${assetLabel(x)}</small></button>`).join("");
    box.querySelectorAll("button").forEach(b => b.onmousedown = e => { e.preventDefault(); pick(+b.dataset.i); }); };
  const pick = i => { const x = cur[i]; if (!x) return; input.value = ""; cur = []; draw(); onPick(x); };
  input.oninput = () => { cur = searchAssets(input.value, 12, filtre); k = cur.length ? 0 : -1; draw(); };
  input.onkeydown = e => { if (e.key === "ArrowDown"){ k = Math.min(cur.length - 1, k + 1); draw(); e.preventDefault(); } else if (e.key === "ArrowUp"){ k = Math.max(0, k - 1); draw(); e.preventDefault(); } else if (e.key === "Enter"){ if (k >= 0){ pick(k); e.preventDefault(); } } else if (e.key === "Escape"){ cur = []; draw(); } };
  input.onblur = () => setTimeout(() => { cur = []; draw(); }, 120);
}
/* Courbe de valeur en euros d'un titre (base 100), éventuellement face à l'ETF Monde */
function valuePath(id){ const r = B.R.get(id); if (!r) return []; let v = 100, started = false; const pts = [];
  for (let i = 0; i < r.length; i++){ if (!started && !(r[i] === r[i])) continue; started = true; v *= 1 + (r[i] === r[i] ? r[i] : 0); pts.push([new Date(B.dates[i]), v]); } return pts; }
