/* ================= Portefeuilles fictifs : diversification, risque, simulation ================= */
const PF = {undo:null, an:null};
const PF_DEF = () => ({liste:[], actif:null});
function pfStore(){ const s = Store.data.portefeuilles; return s && Array.isArray(s.liste) ? s : (Store.data.portefeuilles = PF_DEF()); }
function pfActive(){ const s = pfStore(); return s.liste.find(p => p.id === s.actif) || s.liste[0] || null; }
function pfSave(){ Store.save("portefeuilles", JSON.parse(JSON.stringify(pfStore()))); }
function pfNew(nom, lignes = [], montant = 50000, horizon = 10){
  const s = pfStore(), id = "p" + Date.now().toString(36);
  s.liste.push({id, nom:nom || `Portefeuille ${s.liste.length + 1}`, montant, horizon, lignes, cree:Date.now()}); s.actif = id; pfSave(); return id;
}
function pfAddLine(id, pfId){
  const s = pfStore(); let p = s.liste.find(x => x.id === pfId) || pfActive();
  if (!p){ pfNew("Portefeuille 1"); p = pfActive(); }
  if (p.lignes.some(l => l.id === id)){ toast("Déjà dans « " + p.nom + " »"); return; }
  const n = p.lignes.length, tot = p.lignes.reduce((a, l) => a + (+l.w || 0), 0) || 100;
  p.lignes = p.lignes.map(l => ({...l, w:+(l.w / tot * 100 * n / (n + 1)).toFixed(2)})).concat([{id, w:+(100 / (n + 1)).toFixed(2)}]);
  s.actif = p.id; pfSave(); toast(`Ajouté à « ${p.nom} »`);
  if (CUR === "portefeuille") renderPortefeuille();
}
const W_ZONE = {act_monde:W_WORLD, act_us:{US:1}, act_eu:W_EUROPE, act_jp:{JP:1}, act_em:W_EM, act_theme:{US:.7, _:.3}, act_style:W_WORLD, immo_cote:W_EUROPE, monetaire:{EZ:1}, etat:{EZ:1}, credit:{EZ:1}, monde_oblig:{US:1}, or:{OR:1}};
const CCY_OF = {US:"USD", JP:"JPY", GB:"GBP", CH:"CHF", CA:"CAD", AU:"AUD", SE:"SEK", DK:"DKK", NO:"NOK", PL:"PLN", OR:"USD (or)", EZ:"EUR", FR:"EUR", DE:"EUR", NL:"EUR", ES:"EUR", IT:"EUR", BE:"EUR", FI:"EUR", AT:"EUR", IE:"EUR", PT:"EUR"};
const ETF_ZONE_US = {"PSP5.PA":1, "PUST.PA":1, "SXR8.DE":1, "ZPRV.DE":1, "VVSM.DE":.8};
function pfLines(p){
  const out = [], miss = [];
  const tot = p.lignes.reduce((a, l) => a + Math.max(0, +l.w || 0), 0);
  for (const l of p.lignes){ const x = B.byId.get(l.id), r = B.R.get(l.id); if (!x || !r){ miss.push(l.id); continue; } out.push({x, r, w:tot > 0 ? Math.max(0, +l.w || 0) / tot : 0, wRaw:+l.w || 0}); }
  return {L:out, miss, tot};
}
/* Rendement observé d'une ligne pendant un épisode (si l'historique le couvre) */
function realized(id, a, b){
  const r = B.R.get(id); if (!r) return null; let v = 1, n = 0;
  for (let i = 0; i < B.dates.length; i++){ const d = B.dates[i]; if (d <= a || d > b) continue; if (!(r[i] === r[i])) return null; v *= 1 + r[i]; n++; }
  return n >= 3 ? (v - 1) * 100 : null;
}
const FIXED_SHOCK = {
  "2008":{monetaire:5, etat:9, credit:-4, monde_oblig:20, matieres:-45, metal:-10, hy:-28, infl:3, em:0, float:2, "EUNW.DE":-28, "IBCI.DE":3, "IUS7.DE":0},
  "2020":{monetaire:0, etat:-2, credit:-7, monde_oblig:3, matieres:-20, metal:-25, crypto:-35, hy:-17, infl:-5, em:-15, float:-2, "EUNW.DE":-17, "IBCI.DE":-5, "IUS7.DE":-15}
};
function shockOf(x, ep){
  const C = B.chocs[ep]; if (!C) return null;
  if (ep === "2022"){ const v = realized(x.id, C.debut, C.fin); if (ok(v)) return {v, obs:true}; }
  if (x.kind === "etf" && POCHE[x.cls] !== "actions"){
    const f = FIXED_SHOCK[ep] || {}; let v = f[x.id] ?? (["hy", "infl", "em", "float"].includes(x.bt) ? f[x.bt] : undefined) ?? f[x.cls];
    if (x.cls === "or") v = C.or_eur;
    if ((x.id === "SXRM.DE" || (x.bt === "gov" && x.bc === "USD" && !x.hdg)) && ok(C.ief_eur)) v = C.ief_eur;
    if (ep === "2022") return null;
    return ok(v) ? {v, obs:false} : null;
  }
  const world = ok(C.us_eur) && ok(C.eu) ? .7 * C.us_eur + .3 * C.eu : ok(C.us_eur) ? C.us_eur : C.eu;
  if (!ok(world)) return null;
  let v = (ok(x.beta) ? x.beta : 1) * world;
  const sec = x.kind === "action" ? x.secteurEn : x.sec;
  if (sec && C.secteurs_rel && ok(C.secteurs_rel[sec])) v += .6 * C.secteurs_rel[sec];
  return {v:clamp(v, -95, 150), obs:false};
}
const SCEN = [
  {id:"ia", l:"L'enthousiasme pour l'IA retombe", d:"Gagnants directs de l'IA −40 %, indirects −25 %, le reste du marché −10 % (selon son bêta), obligations d'État +3 %.",
    f:x => x.cls === "crypto" ? -25 : x.kind === "etf" && POCHE[x.cls] !== "actions" ? (x.cls === "etat" ? 3 : x.cls === "or" ? 5 : 0) : ((x.th || {}).ia >= 2 ? -40 : (x.th || {}).ia === 1 ? -25 : -10 * (ok(x.beta) ? x.beta : 1))},
  {id:"tw", l:"Blocus de Taïwan", d:"Sociétés très dépendantes de la Chine ou de Taïwan −35 %, exposées −20 %, le reste −15 % (selon son bêta), or +12 %, obligations d'État +4 %.",
    f:x => x.cls === "crypto" ? -20 : x.kind === "etf" && POCHE[x.cls] !== "actions" ? (x.cls === "etat" ? 4 : x.cls === "or" ? 12 : x.cls === "metal" ? 8 : x.cls === "credit" ? -4 : 0) : ((x.th || {}).chine <= -2 ? -35 : (x.th || {}).chine === -1 ? -20 : -15 * (ok(x.beta) ? x.beta : 1))},
  {id:"paix", l:"Paix durable en Europe de l'Est", d:"Défense −25 % (directs) et −12 % (indirects) ; le reste du marché +4 % (selon son bêta).",
    f:x => x.kind === "etf" && POCHE[x.cls] !== "actions" ? 0 : ((x.th || {}).defense >= 2 ? -25 : (x.th || {}).defense === 1 ? -12 : 4 * (ok(x.beta) ? x.beta : 1))}
];
function lookThrough(L){
  const pays = {}, ccy = {}, sect = {}, cat = {}, poche = {};
  const add = (o, k, v) => { o[k] = (o[k] || 0) + v; };
  for (const {x, w} of L){
    add(poche, POCHE[x.cls] || "actions", w);
    if (x.kind === "action"){ add(pays, x.pays || "—", w); add(ccy, x.ccy === "GBp" || x.ccy === "GBX" ? "GBP" : x.ccy, w); add(sect, x.secteur, w); add(cat, x.cat, w); continue; }
    const ob = POCHE[x.cls] === "obligations" || x.cls === "monetaire";
    const zw = ETF_ZONE_US[x.id] ? {US:1} : x.ed ? (W_ZONE[x.cls] || {_:1})
      : ob ? (x.bp ? {[x.bp]:1} : x.bc === "USD" ? {US:1} : x.bc === "GLOBAL" ? {US:.45, EZ:.3, JP:.1, _:.15} : x.bc === "GBP" ? {GB:1} : x.bc === "EMLOC" ? W_EM : x.bc === "CNY" ? {CN:1} : {EZ:1})
      : x.cls === "or" ? {OR:1} : x.cls === "metal" ? {MET:1} : x.cls === "matieres" ? {MP:1} : x.cls === "crypto" ? {CR:1} : geoWeights(x.geo);
    for (const [k, v] of Object.entries(zw)){
      const nm = k === "_" ? "Autres pays" : k === "EZ" ? "Zone euro (obligations, monétaire)" : k === "OR" ? "Or" : k === "MET" ? "Métaux précieux" : k === "MP" ? "Matières premières" : k === "CR" ? "Cryptomonnaies" : (P[k] ? P[k].nom : k);
      add(pays, nm, w * v); add(ccy, x.hdg ? "EUR" : k === "MP" || k === "MET" ? "USD (matières premières)" : k === "CR" ? "Cryptomonnaies" : CCY_OF[k] || (P[k] && P[k].ccy) || "Autres devises", w * v);
    }
    add(sect, x.cls === "act_secteur" && x.sec ? (SEC_FR[x.sec] || x.sec) : POCHE[x.cls] === "actions" ? "ETF actions (diversifié)" : POCHE_L[POCHE[x.cls]], w);
    add(cat, CLS_L[x.cls], w);
  }
  return {pays, ccy, sect, cat, poche};
}
function barsHtml(o, n = 8, warn = 1){
  const e = Object.entries(o).filter(([, v]) => v > .0005).sort((a, b) => b[1] - a[1]).slice(0, n);
  return `<div class="hbars">${e.map(([k, v]) => `<div class="hb${v > warn ? " w" : ""}"><span>${esc(k)}</span><i style="--w:${Math.min(100, v * 100)}%"></i><b>${nf0.format(v * 100)} %</b></div>`).join("")}</div>`;
}
/* Candidats examinés pour les ajouts qui diversifient : ETF de la liste éditoriale et plus gros encours, grandes sociétés */
function pfPool(){
  if (pfPool.c && pfPool.n === B.A.length + B.E.length) return pfPool.c;
  const etf = B.E.filter(e => e.ed).concat(B.E.filter(e => !e.ed && ok(e.aum)).sort((a, b) => b.aum - a.aum).slice(0, 140));
  const act = B.A.slice().sort((a, b) => (b.mcap || 0) - (a.mcap || 0)).slice(0, 220);
  pfPool.n = B.A.length + B.E.length; return (pfPool.c = etf.concat(act));
}
function renderPortefeuille(){
  const root = $("#pf-body");
  if (bourseWait(root)) return;
  const s = pfStore();
  if (!s.liste.length){
    root.innerHTML = `<div class="card"><h2>Portefeuilles fictifs</h2><p class="empty">Composez un portefeuille avec des actions et des ETF pour mesurer sa diversification réelle, son risque et ce qu'il peut rapporter. Trois points de départ :</p>
      <div class="btnrow"><button class="primary" id="pf-start-monde">ETF Monde seul</button><button class="ghost" id="pf-start-mix">60 % actions, 40 % obligations</button><button class="ghost" id="pf-start-vide">Portefeuille vide</button><button class="ghost" id="pf-start-cst">Partir du constructeur</button></div></div>`;
    $("#pf-start-monde").onclick = () => { pfNew("ETF Monde", [{id:"EUNL.DE", w:100}]); renderPortefeuille(); };
    $("#pf-start-mix").onclick = () => { pfNew("60 / 40", [{id:"EUNL.DE", w:45}, {id:"MEUD.PA", w:15}, {id:"EUNH.DE", w:25}, {id:"EUN5.DE", w:10}, {id:"GOLD.PA", w:5}]); renderPortefeuille(); };
    $("#pf-start-vide").onclick = () => { pfNew(); renderPortefeuille(); };
    $("#pf-start-cst").onclick = () => go("constructeur");
    return;
  }
  const p = pfActive(); s.actif = p.id;
  const besoin = p.lignes.map(l => l.id).concat(pfPool().map(x => x.id), ["EUNL.DE", "EUNH.DE", "GOLD.PA"]);
  if (!hasRets(besoin)){
    if (!root.querySelector(".pfgrid")) root.innerHTML = `<div class="card"><p class="empty">Chargement des cours…</p></div>`;
    needRets(besoin).then(() => { if (CUR === "portefeuille") renderPortefeuille(); });
    return;
  }
  const {L, miss, tot} = pfLines(p);
  const an = L.length ? Q.analyse(L.map(l => ({id:l.x.id, r:l.r, mu:l.x.mu})), L.map(l => l.w)) : null;
  PF.an = an;
  const rcOf = new Map(); if (an) L.forEach((l, i) => rcOf.set(l.x.id, an.rc[i]));
  root.innerHTML = `<div class="pfgrid">
    <div class="card" id="pf-edit">
      <div class="btnrow"><select id="pf-sel" aria-label="Portefeuille">${s.liste.map(x => `<option value="${x.id}" ${x.id === p.id ? "selected" : ""}>${esc(x.nom)}</option>`).join("")}</select>
        <button class="ghost small" id="pf-new">Nouveau</button><button class="ghost small" id="pf-ren">Renommer</button><button class="ghost small" id="pf-dup">Dupliquer</button><button class="ghost small danger" id="pf-del">Supprimer</button></div>
      <div class="form"><label for="pf-m">Montant (€)<input id="pf-m" type="number" min="1000" step="1000" value="${p.montant || 50000}"></label><label for="pf-h">Horizon (ans)<input id="pf-h" type="number" min="1" max="30" step="1" value="${p.horizon || 10}"></label></div>
      <div class="field search" style="max-width:none"><span>Ajouter une action ou un ETF</span><input id="pf-q" type="search" placeholder="Nom, code ou ISIN…" autocomplete="off" role="combobox" aria-expanded="false" aria-controls="pf-sugg"><div id="pf-sugg" class="sugg" hidden role="listbox"></div></div>
      ${miss.length ? `<p class="callout">Absents des données du jour : ${esc(miss.join(", "))}.</p>` : ""}
      <div class="lines">${p.lignes.length ? `<table class="t pfl"><thead><tr><th>Ligne</th><th class="n">Poids</th><th class="n">Montant</th><th class="n" title="Part du risque du portefeuille">Risque</th><th></th></tr></thead><tbody>
        ${p.lignes.map((l, i) => { const x = B.byId.get(l.id), rc = rcOf.get(l.id), w = tot > 0 ? l.w / tot : 0;
          return `<tr><td><button class="lk" data-f="${esc(l.id)}">${esc(x ? x.nom : l.id)}</button><span class="cmp" style="margin:0;display:block">${x ? (x.kind === "etf" ? esc(CLS_L[x.cls]) : esc(x.secteur) + " · " + esc(x.pays || "")) : "donnée absente"}</span></td>
            <td class="n"><input type="number" min="0" max="100" step="0.5" value="${+(+l.w).toFixed(2)}" data-i="${i}" class="wIn" aria-label="Poids de ${esc(x ? x.nom : l.id)} en %"></td>
            <td class="n">${F.eur((p.montant || 0) * w)}</td><td class="n ${ok(rc) && rc > w * 1.4 && rc > .06 ? "neg" : ""}">${ok(rc) ? nf0.format(rc * 100) + " %" : "—"}</td>
            <td class="n"><button class="x small" data-del="${i}" aria-label="Retirer">×</button></td></tr>`; }).join("")}
        </tbody><tfoot><tr><td>Total</td><td class="n ${Math.abs(tot - 100) > .5 ? "neg" : ""}"><b>${nf1.format(tot)} %</b></td><td class="n">${F.eur(p.montant || 0)}</td><td></td><td></td></tr></tfoot></table>` : '<p class="empty">Ajoutez des lignes avec la recherche ci-dessus, depuis le classement des actions ou depuis le constructeur.</p>'}</div>
      ${p.lignes.length ? `<div class="btnrow">${Math.abs(tot - 100) > .5 ? '<button class="ghost small" id="pf-norm">Ramener à 100 %</button>' : ""}
        <button class="ghost small" data-opt="eq" title="Même poids pour chaque ligne">Poids égaux</button><button class="ghost small" data-opt="erc" title="Chaque ligne apporte la même part du risque">Risques égaux</button>
        <button class="ghost small" data-opt="mv" title="Volatilité la plus basse possible, 25 % au plus par ligne">Volatilité minimale</button><button class="ghost small" data-opt="md" title="Ratio de diversification le plus élevé, 25 % au plus par ligne">Diversification maximale</button>
        ${PF.undo && PF.undo.id === p.id ? '<button class="ghost small" id="pf-undo">Annuler</button>' : ""}</div>
        <p class="note">Les poids proposés viennent des cinq dernières années de cours : ils décrivent le passé récent, sans garantie pour la suite.</p>` : ""}
    </div>
    <div class="stack" id="pf-an"></div></div>`;
  // Gestion des portefeuilles
  $("#pf-sel").oninput = e => { s.actif = e.target.value; pfSave(); renderPortefeuille(); };
  $("#pf-new").onclick = () => { pfNew(); renderPortefeuille(); };
  $("#pf-dup").onclick = () => { pfNew(p.nom + " (copie)", JSON.parse(JSON.stringify(p.lignes)), p.montant, p.horizon); renderPortefeuille(); };
  $("#pf-ren").onclick = () => openModal("Renommer le portefeuille", `<label class="field" for="pf-nom"><span>Nom</span><input id="pf-nom" value="${esc(p.nom)}" maxlength="60"></label>`, () => { const v = $("#pf-nom").value.trim(); if (!v) return false; p.nom = v; pfSave(); renderPortefeuille(); return true; });
  $("#pf-del").onclick = () => openModal("Supprimer le portefeuille", `<p>« ${esc(p.nom)} » et ses ${p.lignes.length} lignes seront effacés.</p>`, () => { s.liste = s.liste.filter(x => x.id !== p.id); s.actif = s.liste[0] ? s.liste[0].id : null; pfSave(); renderPortefeuille(); return true; });
  $("#pf-m").onchange = e => { p.montant = Math.max(0, +e.target.value || 0); pfSave(); renderPortefeuille(); };
  $("#pf-h").onchange = e => { p.horizon = clamp(Math.round(+e.target.value || 10), 1, 30); pfSave(); renderPortefeuille(); };
  attachSearch($("#pf-q"), $("#pf-sugg"), x => pfAddLine(x.id, p.id));
  $$("#pf-edit .wIn").forEach(inp => inp.onchange = () => { p.lignes[+inp.dataset.i].w = Math.max(0, +inp.value || 0); pfSave(); renderPortefeuille(); });
  $$("#pf-edit [data-del]").forEach(b => b.onclick = () => { p.lignes.splice(+b.dataset.del, 1); pfSave(); renderPortefeuille(); });
  $$("#pf-edit [data-f]").forEach(b => b.onclick = () => openFiche(b.dataset.f));
  if ($("#pf-norm")) $("#pf-norm").onclick = () => { p.lignes.forEach(l => l.w = +(l.w / tot * 100).toFixed(2)); pfSave(); renderPortefeuille(); };
  if ($("#pf-undo")) $("#pf-undo").onclick = () => { p.lignes = PF.undo.lignes; PF.undo = null; pfSave(); renderPortefeuille(); };
  $$("#pf-edit [data-opt]").forEach(b => b.onclick = () => {
    if (!an) return; const o = b.dataset.opt;
    const sg = Q.floorCov(an.sig), cap = Math.max(.25, 1 / L.length + .01);
    const w = o === "eq" ? L.map(() => 1 / L.length) : o === "erc" ? Q.capNorm(Q.erc(sg), Math.max(.35, cap)) : o === "mv" ? Q.minVar(sg, cap) : Q.maxDiv(sg, cap);
    PF.undo = {id:p.id, lignes:JSON.parse(JSON.stringify(p.lignes))};
    const byId = new Map(L.map((l, i) => [l.x.id, w[i]]));
    p.lignes = p.lignes.map(l => ({...l, w:byId.has(l.id) ? +(byId.get(l.id) * 100).toFixed(2) : 0}));
    pfSave(); renderPortefeuille();
  });
  if (an) renderPfAnalyse(p, L, an); else $("#pf-an").innerHTML = "";
}
function renderPfAnalyse(p, L, an){
  const N = L.length, M = p.montant || 0, H = p.horizon || 10;
  const verdict = an.enb >= Math.min(8, N * .6) ? ["good", "Bien diversifié"] : an.enb >= Math.min(4, N * .4) ? ["warn", "Diversification moyenne"] : ["bad", "Concentré"];
  const domin = an.pc1 > .8 ? "Un seul facteur, en général le marché actions mondial, porte l'essentiel du risque : ajouter des titres du même marché change peu le résultat." : an.pc1 > .6 ? "Le facteur dominant pèse lourd ; des obligations, de l'or ou des actions peu liées au marché mondial répartiraient mieux le risque." : "Le risque se partage entre plusieurs sources indépendantes.";
  // Simulation
  const sim = Q.simulate(an.rp, an.mu, H, 3000);
  const fan = Q.fan(an.rp, an.mu, H, 2000);
  const mw = B.byId.get("EUNL.DE"), anW = mw ? Q.analyse([{id:"EUNL.DE", r:B.R.get("EUNL.DE"), mu:mw.mu}], [1]) : null;
  const fanW = anW ? Q.fan(anW.rp, mw.mu, H, 2000) : null, simW = anW ? Q.simulate(anW.rp, mw.mu, H, 3000) : null;
  // Stress
  const eps = Object.keys(B.chocs).sort();
  const st = eps.map(ep => { let v = 0, cov = 0, obs = 0; for (const {x, w} of L){ const s = shockOf(x, ep); if (s){ v += w * s.v; cov += w; if (s.obs) obs += w; } } return {ep, v:cov > .5 ? v / cov : null, cov, obs}; });
  // Sensibilités
  const T = an.T, last = a => Array.from(a.slice(a.length - T), v => v === v ? v : 0);
  const fx = [["Monde", B.R.get("EUNL.DE")], ["Taux", B.R.get("EUNH.DE")], ["Dollar", B.usd], ["Or", B.R.get("GOLD.PA")]].filter(([, r]) => r);
  const beta = fx.length ? Q.ols(Array.from(an.rp), fx.map(([, r]) => last(r))).slice(1) : [];
  const bOf = k => { const i = fx.findIndex(([n]) => n === k); return i >= 0 ? beta[i] : 0; };
  const sens = [["Actions mondiales −20 %", bOf("Monde") * -20], ["Taux d'État euro +1 point (ETF obligations ≈ −7 %)", bOf("Taux") * -7], ["Dollar −10 % face à l'euro", bOf("Dollar") * -10], ["Or −15 %", bOf("Or") * -15]];
  const scen = SCEN.map(sc => ({...sc, v:L.reduce((a, {x, w}) => a + w * sc.f(x), 0)}));
  // Thèmes et concentrations
  const lt = lookThrough(L);
  const thE = {}; for (const {x, w} of L) for (const [k, v] of Object.entries(x.th || {})) thE[k] = (thE[k] || 0) + w * v / 2;
  // Corrélations
  const ord = Q.clusterOrder(an.corr);
  const pairs = []; for (let i = 0; i < N; i++) for (let j = i + 1; j < N; j++) if (an.corr[i][j] > .8) pairs.push([L[i].x, L[j].x, an.corr[i][j]]);
  pairs.sort((a, b) => b[2] - a[2]);
  // Suggestions
  const inPf = new Set(L.map(l => l.x.id));
  const pool = pfPool().filter(x => !inPf.has(x.id) && B.R.get(x.id));
  const scan = N >= 1 ? Q.scanAdd(an, an.R, L.map(l => l.w), pool.map(x => ({id:x.id, r:B.R.get(x.id), mu:x.mu, x})), .05).sort((a, b) => b.enb - a.enb).slice(0, 6) : [];
  const heavy = L.map((l, i) => ({x:l.x, w:l.w, rc:an.rc[i]})).filter(o => o.rc > o.w * 1.4 && o.rc > .06).sort((a, b) => b.rc - a.rc);
  const illq = L.filter(({x, w}) => x.kind === "action" && ok(x.liq) && M * w / (x.liq * 1e6 * .1) > .5);
  const horsPea = L.filter(({x}) => !x.pea).length;
  const k = (l, v, c) => `<div class="kpi"><div class="l">${l}</div><div class="v">${v}</div>${c ? `<div class="c">${c}</div>` : ""}</div>`;
  $("#pf-an").innerHTML = `
    <div class="card"><div class="btnrow" style="justify-content:space-between"><h2>Diversification réelle</h2><span class="pill ${verdict[0]}">${verdict[1]}</span></div>
      <div class="kpis k3">
        ${k("Paris indépendants", nf1.format(an.enb), `pour ${N} ligne${N > 1 ? "s" : ""} ; ${nf1.format(an.effN)} en comptant les poids seuls`)}
        ${k("Facteur dominant", nf0.format(an.pc1 * 100) + " %", "du risque porté par une seule source")}
        ${k("Corrélation moyenne", nf2.format(an.avgCorr), "entre les lignes, pondérée")}
        ${k("Volatilité annuelle", nf1.format(an.volP) + " %", `ETF Monde : ${anW ? nf1.format(anW.volP) + " %" : "—"}`)}
        ${k("Rendement réel attendu", F.pct(an.mu), "par an, avant impôt")}
        ${k("Pire baisse depuis 5 ans", F.pctS(an.mdd), `pire année glissante : ${F.pctS(an.worst52)}`)}</div>
      <p>${N > 1 ? `Vos ${N} lignes se comportent comme <b>${nf1.format(an.enb)} placements sans lien entre eux</b>. ` : ""}${esc(domin)}</p>
      <h3>Poids et part du risque, ligne par ligne</h3>
      <div class="rcbars">${L.map((l, i) => ({x:l.x, w:l.w, rc:an.rc[i]})).sort((a, b) => b.rc - a.rc).slice(0, 16).map(o => `<div class="rc"><span title="${esc(o.x.nom)}">${esc(o.x.nom)}</span>
        <div class="tr"><i class="w" style="--w:${o.w * 100}%"></i><i class="r" style="--w:${Math.max(0, o.rc) * 100}%"></i></div><b>${nf0.format(o.w * 100)} → ${nf0.format(o.rc * 100)} %</b></div>`).join("")}</div>
      <p class="note"><i class="dot" style="background:var(--muted)"></i>poids <i class="dot" style="background:var(--accent);margin-left:10px"></i>part du risque. Paris indépendants : carré du ratio de diversification (Choueifaty) ; covariances des cinq dernières années, resserrées vers une corrélation commune (Ledoit et Wolf) pour limiter le bruit.</p>
    </div>
    <div class="card"><h2>Ce que le portefeuille peut devenir en ${H} ans</h2>
      <div class="chart" id="pf-fan"></div>
      <div class="kpis k3">${k("Valeur médiane", F.eur(M * sim.p50), `${F.pctS((Math.pow(sim.p50, 1 / H) - 1) * 100)} par an, en euros d'aujourd'hui`)}
        ${k("Fourchette à 90 %", `${F.eur(M * sim.p5)} – ${F.eur(M * sim.p95)}`)}
        ${k("Probabilité de perte réelle", nf0.format(sim.pLoss) + " %", simW ? `ETF Monde : ${nf0.format(simW.pLoss)} %` : "")}
        ${k("Mauvaise année (1 sur 20)", F.pctS(sim.var95), `moyenne des pires 5 % : ${F.pctS(sim.cvar95)}`)}
        ${k("Baisse maximale en cours de route", F.pctS(sim.ddMed), `une fois sur vingt : ${F.pctS(sim.dd5)}`)}
        ${k("ETF Monde seul, médiane", simW ? F.eur(M * simW.p50) : "—", simW ? `fourchette ${F.eur(M * simW.p5)} – ${F.eur(M * simW.p95)}` : "")}</div>
      <p class="note">3 000 trajectoires tirées par blocs de huit semaines dans les cinq dernières années de cours, recalées sur le rendement réel attendu de chaque ligne (valorisation actuelle), avant impôt et en euros d'aujourd'hui.</p>
    </div>
    <div class="card"><h2>Épreuves</h2>
      <div class="det"><table class="t"><thead><tr><th>Crise passée</th><th class="n">Portefeuille</th></tr></thead><tbody>
        ${st.map(o => `<tr><td>${{"2008":"Crise financière (oct. 2007 – mars 2009)", "2020":"Covid (17 févr. – 23 mars 2020)", "2022":"Inflation et hausse des taux (janv. – oct. 2022)"}[o.ep] || o.ep}<span class="cmp">${o.obs > .9 ? "observé" : o.obs > .1 ? "observé en partie" : "estimé"}</span></td><td class="n ${o.v < 0 ? "neg" : "pos"}"><b>${fmt(o.v, F.pctS)}</b>${ok(o.v) && M ? `<span class="cmp">${F.eur(M * o.v / 100)}</span>` : ""}</td></tr>`).join("")}
        <tr><th>Sensibilités</th><th class="n"></th></tr>
        ${sens.map(([l, v]) => `<tr><td>${esc(l)}</td><td class="n ${v < 0 ? "neg" : "pos"}">${F.pctS(v)}</td></tr>`).join("")}
      </tbody></table>
      <table class="t"><thead><tr><th>Scénario de rupture</th><th class="n">Portefeuille</th></tr></thead><tbody>
        ${scen.map(sc => `<tr><td title="${esc(sc.d)}">${esc(sc.l)}<span class="cmp" style="display:block;margin:0">${esc(sc.d)}</span></td><td class="n ${sc.v < 0 ? "neg" : "pos"}"><b>${F.pctS(sc.v)}</b></td></tr>`).join("")}
      </tbody></table></div>
      <p class="note">Crises : les actions suivent leur bêta face au marché mondial et l'écart historique de leur secteur ; obligations, monétaire et or reprennent l'ordre de grandeur de leur indice. Sensibilités : régression des rendements hebdomadaires du portefeuille sur l'ETF Monde, l'ETF obligations d'État euro, le dollar et l'or. Scénarios de rupture : hypothèses illustratives appliquées au classement par thème.</p>
    </div>
    <div class="card"><h2>Concentrations</h2>
      <div class="det"><div><h3>Pays, ETF décomposés</h3>${barsHtml(lt.pays, 8, .5)}</div><div><h3>Devises</h3>${barsHtml(lt.ccy, 6, .7)}</div>
        <div><h3>Secteurs</h3>${barsHtml(lt.sect, 8, .3)}</div><div><h3>Styles et classes</h3>${barsHtml(lt.cat, 8, .5)}</div></div>
      <h3>Exposition aux ruptures</h3>
      <div class="thx">${Object.keys(B.meta.themes).map(t => { const v = thE[t] || 0; return `<div class="th"><span>${esc(themeL(t))}</span><div class="tr"><i style="--a:${50 + Math.min(50, Math.max(-50, v * 100))}%"></i></div><b class="${v > .005 ? "pos" : v < -.005 ? "neg" : ""}">${v > .005 ? "gagnant " : v < -.005 ? "menacé " : ""}${nf0.format(Math.abs(v) * 100)} %</b></div>`; }).join("")}</div>
      <p class="note">Part du portefeuille, pondérée par l'intensité (direct = 100 %, indirect = 50 %). ${horsPea ? `${horsPea} ligne${horsPea > 1 ? "s" : ""} hors PEA.` : "Toutes les lignes sont éligibles au PEA."}${illq.length ? ` Revente à prévoir sur plusieurs jours pour ${illq.map(l => esc(l.x.nom)).join(", ")} (au-delà de 10 % du volume quotidien).` : ""}</p>
    </div>
    <div class="card"><h2>Corrélations</h2>
      ${N >= 2 ? `<div class="chart" id="pf-heat"></div>` : '<p class="empty">Ajoutez au moins deux lignes.</p>'}
      ${pairs.length ? `<p><b>Doublons</b> (corrélation au-delà de 0,8) : ${pairs.slice(0, 8).map(([a, b, c]) => `${esc(a.nom)} et ${esc(b.nom)} (${nf2.format(c)})`).join(" ; ")}.</p>` : ""}
    </div>
    <div class="card"><h2>Pistes d'amélioration</h2>
      ${heavy.length ? `<div class="callout">${heavy.slice(0, 4).map(o => `<b>${esc(o.x.nom)}</b> pèse ${nf0.format(o.rc * 100)} % du risque pour ${nf0.format(o.w * 100)} % du poids`).join(" ; ")}. Alléger ces lignes réduit le risque plus que les autres.</div>` : ""}
      ${scan.length ? `<h3>Ajouts qui diversifient le plus (5 % du portefeuille)</h3><div class="tblwrap" style="border:0"><table class="t" style="min-width:520px"><thead><tr><th>Ajout</th><th class="n">Paris indép.</th><th class="n">Volatilité</th><th class="n">Rdt réel att.</th><th class="n">Corrélation</th><th></th></tr></thead><tbody>
        ${scan.map(o => `<tr><td><button class="lk" data-f="${esc(o.c.id)}">${esc(o.c.x.nom)}</button><span class="cmp" style="display:block;margin:0">${assetLabel(o.c.x)}</span></td><td class="n">${nf1.format(o.enbB)} → <b>${nf1.format(o.enb)}</b></td><td class="n">${nf1.format(o.volB)} → ${nf1.format(o.vol)} %</td><td class="n">${F.pct(o.mu)}</td><td class="n">${nf2.format(o.rho)}</td>
          <td class="n"><button class="ghost small" data-add="${esc(o.c.id)}">Ajouter</button></td></tr>`).join("")}</tbody></table></div>` : ""}
    </div>`;
  $$("#pf-an [data-f]").forEach(b => b.onclick = () => openFiche(b.dataset.f));
  $$("#pf-an [data-add]").forEach(b => b.onclick = () => {
    const pp = pfActive(), tot = pp.lignes.reduce((a, l) => a + (+l.w || 0), 0) || 100;
    pp.lignes = pp.lignes.map(l => ({...l, w:+(l.w / tot * 95).toFixed(2)})).concat([{id:b.dataset.add, w:5}]); pfSave(); renderPortefeuille(); });
  // Éventail
  const eur = v => M * v;
  const series = [{name:"Portefeuille", color:css("--accent"), pts:fan.map(f => [f.y, eur(f.p50)]), band:fan.map(f => [f.y, eur(f.p5), eur(f.p95)]), endLabel:"médiane"},
    {name:"Quartiles", color:css("--accent"), pts:fan.map(f => [f.y, eur(f.p25)]), dash:"2 3", w:1, noEnd:true}, {name:"Quartiles", color:css("--accent"), pts:fan.map(f => [f.y, eur(f.p75)]), dash:"2 3", w:1, noEnd:true}];
  if (fanW) series.push({name:"ETF Monde", color:css("--muted"), pts:fanW.map(f => [f.y, eur(f.p50)]), dash:"5 4", w:1.5, endLabel:"Monde"});
  lineChart($("#pf-fan"), series, {h:220, xFmt:v => v + " an" + (v > 1 ? "s" : ""), xTicks:Math.min(H, 8), yFmt:v => v >= 1e6 ? nf1.format(v / 1e6) + " M€" : nf0.format(v / 1000) + " k€", ref:[{y:M, label:"mise"}]});
  if (N >= 2) heatmap($("#pf-heat"), ord.map(i => L[i].x), ord.map(i => ord.map(j => an.corr[i][j])));
}
function heatmap(el, xs, C){
  const n = xs.length, lab = x => x.kind === "etf" ? x.id.split(".")[0] : x.id.split(".")[0];
  const W = Math.max(280, el.clientWidth || 500), left = 64, cell = Math.max(8, Math.min(26, (W - left - 4) / n)), H = left + cell * n;
  const col = d3.scaleLinear().domain([-1, 0, .5, 1]).range([css("--d6"), css("--d3"), css("--d1"), css("--d0")]).clamp(true);
  const svg = d3.select(el).html("").append("svg").attr("viewBox", `0 0 ${left + cell * n + 4} ${H}`).attr("role", "img").attr("aria-label", "Carte des corrélations").style("max-width", (left + cell * n + 4) + "px");
  const g = svg.append("g").attr("transform", `translate(${left},${left})`);
  for (let i = 0; i < n; i++) for (let j = 0; j < n; j++){
    g.append("rect").attr("x", j * cell).attr("y", i * cell).attr("width", cell - 1).attr("height", cell - 1).attr("rx", 1.5).attr("fill", col(C[i][j]))
      .append("title").text(`${xs[i].nom} · ${xs[j].nom} : ${nf2.format(C[i][j])}`);
  }
  const fs = Math.min(10.5, cell * .8);
  xs.forEach((x, i) => {
    svg.append("text").attr("x", left - 4).attr("y", left + i * cell + cell / 2 + fs / 3).attr("text-anchor", "end").text(lab(x)).style("font", `${fs}px var(--mono)`);
    svg.append("text").attr("transform", `translate(${left + i * cell + cell / 2 + fs / 3},${left - 4}) rotate(-60)`).text(lab(x)).style("font", `${fs}px var(--mono)`);
  });
}
