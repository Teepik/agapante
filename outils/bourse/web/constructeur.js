/* ================= Constructeur : réglages → allocation → listes avec un nombre à choisir ================= */
const RISQ = [
  {l:"Très prudent", vol:3}, {l:"Prudent", vol:5}, {l:"Modéré", vol:7.5}, {l:"Équilibré", vol:10},
  {l:"Dynamique", vol:13}, {l:"Offensif", vol:16}, {l:"Très offensif", vol:19}
];
const OR_PART = [0, .04, .05, .06, .07, .07, .05];
const CST_DEF = {risque:4, horizon:10, montant:50000, pea:true, geoEU:45, vifs:50, liq:5, profil:"qualite", w:{...PROFILS[1].w}, themes:{}, menaces:true, pieges:true,
  sectEx:[], pond:"egale", n:{}, picks:{}};
let CST = JSON.parse(JSON.stringify(CST_DEF));
const maxEq = h => h <= 1 ? .1 : h <= 2 ? .25 : h <= 3 ? .35 : h <= 4 ? .45 : h <= 5 ? .55 : h <= 7 ? .7 : h <= 9 ? .85 : 1;
const defSplit = h => h <= 2 ? {monetaire:.6, etat:.25, credit:.15} : h <= 5 ? {monetaire:.3, etat:.4, credit:.3} : {monetaire:.1, etat:.5, credit:.4};
function cstSave(){ clearTimeout(cstSave.t); cstSave.t = setTimeout(() => Store.save("constructeur", JSON.parse(JSON.stringify(CST))), 800); }
function applyConstructeur(c){ if (c) CST = {...JSON.parse(JSON.stringify(CST_DEF)), ...c, w:{...CST_DEF.w, ...(c.w || {})}, n:c.n || {}, picks:c.picks || {}, themes:c.themes || {}}; }

/* Corrélation sur les trois dernières années entre deux titres */
const CORR_CACHE = new Map();
function corr2(a, b){
  const key = a < b ? a + "|" + b : b + "|" + a; if (CORR_CACHE.has(key)) return CORR_CACHE.get(key);
  const ra = B.R.get(a), rb = B.R.get(b); if (!ra || !rb) return 0;
  const T = ra.length, s = Math.max(0, T - 156); let n = 0, ma = 0, mb = 0;
  for (let t = s; t < T; t++) if (ra[t] === ra[t] && rb[t] === rb[t]){ ma += ra[t]; mb += rb[t]; n++; }
  if (n < 40){ CORR_CACHE.set(key, 0); return 0; }
  ma /= n; mb /= n; let c = 0, va = 0, vb = 0;
  for (let t = s; t < T; t++) if (ra[t] === ra[t] && rb[t] === rb[t]){ const x = ra[t] - ma, y = rb[t] - mb; c += x * y; va += x * x; vb += y * y; }
  const r = va > 0 && vb > 0 ? c / Math.sqrt(va * vb) : 0; CORR_CACHE.set(key, r); return r;
}
function cstStockScore(x){
  let s = noteProfil(x, CST.w); if (!ok(s)) return null;
  for (const [k, v] of Object.entries(CST.themes)) if (v === 1 && (x.th[k] || 0) > 0) s += 6 * x.th[k];
  if (ok(x.muR)) s += 1.5 * (x.muR - 5);
  return s;
}
function cstStockPool(){
  return B.A.filter(x => {
    if (CST.pea && !x.pea) return false;
    if (CST.liq && !(x.liq >= CST.liq)) return false;
    if (CST.sectEx.includes(x.secteur)) return false;
    if (CST.pieges && x.pg && x.pg.length) return false;
    for (const [k, v] of Object.entries(x.th || {})){ if (CST.menaces && v <= -2) return false; const o = CST.themes[k]; if (o === 1 && v < 0) return false; if (o === -1 && v > 0) return false; }
    return B.R.get(x.id) && x.hist >= 104;
  }).map(x => ({x, s:cstStockScore(x)})).filter(o => ok(o.s)).sort((a, b) => b.s - a.s);
}
/* Sélection diversifiée : meilleure note d'abord, plafonds par secteur, pays et zone, pas de quasi-doublon */
function cstPickStocks(pool, N){
  const nEU = CST.pea ? N : Math.round(N * CST.geoEU / 100), quota = {eu:nEU, us:N - nEU};
  const capS = Math.max(2, Math.ceil(N * .25)), capP = Math.max(3, Math.ceil(N * .4));
  const picked = [], bySect = {}, byPays = {}, byZone = {eu:0, us:0};
  for (const pass of [0, 1, 2]) for (const {x} of pool){
    if (picked.length >= N) break;
    if (picked.includes(x)) continue;
    if (pass === 0 && byZone[x.zone] >= quota[x.zone]) continue;
    if (pass < 2 && ((bySect[x.secteur] || 0) >= capS || (byPays[x.pays] || 0) >= capP)) continue;
    if (picked.some(y => corr2(x.id, y.id) > .8)) continue;
    picked.push(x); bySect[x.secteur] = (bySect[x.secteur] || 0) + 1; byPays[x.pays] = (byPays[x.pays] || 0) + 1; byZone[x.zone]++;
  }
  return picked;
}
function cstEtfPool(){
  const eq = B.E.filter(e => POCHE[e.cls] === "actions" && e.cls !== "immo_cote" && (!CST.pea || e.pea));
  const sty = {"IS3S.DE":"v", "IS3Q.DE":"q", "IS3R.DE":"m", "IQQ0.DE":"d", "ZPRV.DE":"s", "ZPRX.DE":"s"};
  const score = e => {
    let s = 0;
    if (e.cls === "act_monde") s += 100 - e.ter * 50 + (e.id === "WPEA.PA" || e.id === "EUNL.DE" ? 5 : 0);
    if (e.cls === "act_eu") s += 40 + CST.geoEU * .6 + (e.id === "MEUD.PA" ? 8 : 0);
    if (e.cls === "act_us") s += 30 + (100 - CST.geoEU) * .4 + (e.id === "PUST.PA" ? -10 : 0);
    if (e.cls === "act_em") s += 38;
    if (e.cls === "act_jp") s += 20;
    if (sty[e.id]) s += 10 * (CST.w[sty[e.id]] || 0) - 5;
    for (const [k, v] of Object.entries(e.th || {})){ if (CST.themes[k] === 1) s += 25 * v; if (CST.themes[k] === -1) s -= 60; }
    if (e.cls === "act_theme" && !Object.keys(e.th || {}).some(k => CST.themes[k] === 1)) s -= 20;
    return s;
  };
  return eq.map(e => ({x:e, s:score(e)})).sort((a, b) => b.s - a.s);
}
function cstBondPool(){
  const infl = CMP.infl === "installee" || CMP.infl === "choc";
  const score = e => ({"EUNH.DE":90, "IBCI.DE":infl ? 85 : 55, "EUN5.DE":88, "EUNW.DE":CST.risque >= 5 ? 60 : 30, "SXRM.DE":CST.risque >= 4 ? 62 : 45, "IUS7.DE":CST.risque >= 6 ? 50 : 25}[e.id] || 20);
  return B.E.filter(e => POCHE[e.cls] === "obligations").map(e => ({x:e, s:score(e)})).sort((a, b) => b.s - a.s);
}
function cstLists(){
  const M = CST.montant, mx = maxEq(CST.horizon);
  const lists = [];
  const stockPool = cstStockPool();
  const eqGuess = Math.min(mx, [.08, .2, .38, .55, .72, .88, 1][CST.risque - 1]);
  const pocketV = M * eqGuess * CST.vifs / 100;
  const nV = CST.n.actions ?? (pocketV >= 20000 ? clamp(Math.round(pocketV / 2500), 8, 25) : clamp(Math.floor(pocketV / 1500), 0, 8));
  if (CST.vifs > 0 && nV > 0) lists.push({id:"actions", titre:"Actions en direct", poche:"actions", pool:stockPool, n:nV, auto:cstPickStocks(stockPool, nV),
    why:`Environ ${F.eur(pocketV)} en titres vifs : ${nV} lignes de ${F.eur(pocketV / Math.max(1, nV))} environ, assez pour diluer le risque propre à chaque société, sans lignes trop petites face aux frais de courtage.`});
  const etfPool = cstEtfPool(), pocketE = M * eqGuess * (100 - CST.vifs) / 100;
  const nE = CST.n.etf ?? (pocketE >= 30000 ? 3 : pocketE >= 10000 ? 2 : pocketE > 0 ? 1 : 0);
  if (CST.vifs < 100 && nE > 0){
    const auto = []; for (const {x} of etfPool){ if (auto.length >= nE) break; if (auto.some(y => y.cls === x.cls && x.cls !== "act_style" && x.cls !== "act_theme")) continue; auto.push(x); }
    lists.push({id:"etf", titre:"ETF actions", poche:"actions", pool:etfPool, n:nE, auto,
      why:"Un ETF Monde sert de cœur ; les suivants ajoutent la zone, le style ou le thème que vos réglages favorisent."});
  }
  const split = defSplit(CST.horizon), pocketB = M * (1 - eqGuess) * (split.etat + split.credit);
  const nB = CST.n.oblig ?? (pocketB >= 40000 ? 3 : pocketB >= 10000 ? 2 : pocketB > 1000 ? 1 : 0);
  if (nB > 0 && eqGuess < 1){ const bp = cstBondPool();
    const auto = []; for (const {x} of bp){ if (auto.length >= nB) break; if (auto.some(y => y.cls === x.cls) && auto.length < 2) continue; auto.push(x); }
    if (auto.length < nB) for (const {x} of bp){ if (auto.length >= nB) break; if (!auto.includes(x)) auto.push(x); }
    lists.push({id:"oblig", titre:"Obligations", poche:"obligations", pool:bp, n:nB, auto, why:`Horizon de ${CST.horizon} an${CST.horizon > 1 ? "s" : ""} : la part défensive se répartit entre monétaire (${nf0.format(split.monetaire * 100)} %), emprunts d'État (${nf0.format(split.etat * 100)} %) et entreprises de qualité (${nf0.format(split.credit * 100)} %).`});
  }
  const mon = B.byId.get("CSH2.PA");
  if (mon && eqGuess < 1 && split.monetaire > 0 && ((1 - eqGuess) * split.monetaire >= .025 || nB === 0)) lists.push({id:"mon", titre:"Monétaire", poche:"monetaire", pool:[{x:mon, s:1}], n:1, auto:[mon], why:"Rémunéré au taux de la BCE (€STR), quasiment sans variation : la réserve de sécurité."});
  const gold = B.byId.get("GOLD.PA");
  if (gold && OR_PART[CST.risque - 1] > 0 && eqGuess < 1) lists.push({id:"or", titre:"Or", poche:"or", pool:[{x:gold, s:1}], n:1, auto:[gold], why:"Peu lié aux actions comme aux obligations, l'or amortit les crises d'inflation et les chocs géopolitiques."});
  for (const l of lists){ const man = CST.picks[l.id]; l.sel = man ? man.map(id => B.byId.get(id)).filter(Boolean) : l.auto; l.manual = !!man; }
  return lists;
}
/* Poids à l'intérieur de chaque poche, puis part des actions recalée sur la volatilité visée */
function cstBuild(lists){
  const split = defSplit(CST.horizon), g0 = OR_PART[CST.risque - 1];
  const inner = {actions:new Map(), obligations:new Map(), monetaire:new Map(), or:new Map()};
  const st = lists.find(l => l.id === "actions"), et = lists.find(l => l.id === "etf");
  const vifsShare = st && st.sel.length ? (et && et.sel.length ? CST.vifs / 100 : 1) : 0;
  if (st && st.sel.length){ const raw = st.sel.map(x => CST.pond === "vol" && ok(x.vol) ? 1 / Math.max(8, x.vol) : 1), t = raw.reduce((a, b) => a + b, 0); st.sel.forEach((x, i) => inner.actions.set(x.id, vifsShare * raw[i] / t)); }
  if (et && et.sel.length){ const n = et.sel.length; et.sel.forEach((x, i) => inner.actions.set(x.id, (1 - vifsShare) * (n === 1 ? 1 : i === 0 ? .6 : .4 / (n - 1)))); }
  const ob = lists.find(l => l.id === "oblig");
  if (ob && ob.sel.length){
    const gov = ob.sel.filter(x => x.cls !== "credit"), cre = ob.sel.filter(x => x.cls === "credit");
    const sg = cre.length ? split.etat / (split.etat + split.credit) : 1, sc = gov.length ? 1 - sg : 1;
    gov.forEach(x => inner.obligations.set(x.id, sg / gov.length)); cre.forEach(x => inner.obligations.set(x.id, sc / cre.length));
  }
  const mon = lists.find(l => l.id === "mon"); if (mon && mon.sel.length) inner.monetaire.set(mon.sel[0].id, 1);
  const gold = lists.find(l => l.id === "or"); if (gold && gold.sel.length) inner.or.set(gold.sel[0].id, 1);
  const hasB = inner.obligations.size > 0, hasM = inner.monetaire.size > 0, hasO = inner.or.size > 0, hasA = inner.actions.size > 0;
  const defW = {obligations:hasB ? (hasM ? split.etat + split.credit : 1) : 0, monetaire:hasM ? (hasB ? split.monetaire : 1) : 0};
  const ids = [...new Set([...inner.actions.keys(), ...inner.obligations.keys(), ...inner.monetaire.keys(), ...inner.or.keys()])];
  if (!ids.length) return null;
  const weights = e => { const g = hasO ? Math.min(g0, Math.max(0, 1 - e)) : 0, d = Math.max(0, 1 - e - g), sd = defW.obligations + defW.monetaire || 1;
    return ids.map(id => (inner.actions.get(id) || 0) * (hasA ? e : 0) + (inner.obligations.get(id) || 0) * d * defW.obligations / sd + (inner.monetaire.get(id) || 0) * d * defW.monetaire / sd + (inner.or.get(id) || 0) * g); };
  const Rw = Q.window(ids.map(id => B.R.get(id)), 260, 52), cov = Q.covShrink(Rw).sigma;
  const volOf = w => Math.sqrt(Math.max(0, Q.quad(cov, w)) * 52) * 100;
  const mx = hasA ? maxEq(CST.horizon) : 0, target = RISQ[CST.risque - 1].vol;
  let best = 0, bd = Infinity;
  for (let e = 0; e <= mx + 1e-9; e += .005){ const w = weights(e), s = w.reduce((a, b) => a + b, 0); if (s < .999 && hasA && !(hasB || hasM || hasO)) continue; const d = Math.abs(volOf(w.map(x => x / (s || 1))) - target); if (d < bd){ bd = d; best = e; } }
  if (hasA && !(hasB || hasM || hasO)) best = 1;
  let w = weights(best); const s = w.reduce((a, b) => a + b, 0); w = w.map(x => x / (s || 1));
  return {ids, w, e:best, vol:volOf(w), target, mx, bd};
}
function renderConstructeur(){
  const root = $("#cst-body");
  if (bourseWait(root)) return;
  const lists = cstLists(), built = cstBuild(lists);
  const secteurs = [...new Set(B.A.map(x => x.secteur).filter(s => s && s !== "—"))].sort((a, b) => a.localeCompare(b, "fr"));
  const th = B.meta.themes, R = RISQ[CST.risque - 1];
  root.innerHTML = `<div class="cstgrid">
    <div class="card" id="cst-form"><h2>Vos réglages</h2>
      <label class="rg"><span>Risque accepté <b>${esc(R.l)}</b><small>volatilité visée ≈ ${nf1.format(R.vol)} % par an</small></span><input type="range" min="1" max="7" step="1" value="${CST.risque}" id="c-risque"></label>
      <div class="form">
        <label for="c-m">Montant (€)<input id="c-m" type="number" min="1000" step="1000" value="${CST.montant}"></label>
        <label for="c-h">Horizon (ans)<input id="c-h" type="number" min="1" max="30" step="1" value="${CST.horizon}"></label></div>
      <label class="rg"><span>Part des actions en titres vifs <b>${CST.vifs} %</b><small>le reste en ETF</small></span><input type="range" min="0" max="100" step="10" value="${CST.vifs}" id="c-vifs"></label>
      <label class="rg"><span>Europe dans les actions <b>${CST.pea ? "100 % (PEA)" : CST.geoEU + " %"}</b><small>${CST.pea ? "le PEA n'accepte que des sociétés européennes" : "le reste aux États-Unis"}</small></span><input type="range" min="0" max="100" step="5" value="${CST.geoEU}" id="c-geo" ${CST.pea ? "disabled" : ""}></label>
      <label class="field" for="c-liq"><span>Liquidité minimale des actions</span><select id="c-liq">${[[0, "Sans minimum"], [1, "1 M€ échangés par jour"], [5, "5 M€ par jour"], [20, "20 M€ par jour"], [100, "100 M€ par jour (grandes valeurs)"]].map(([v, l]) => `<option value="${v}" ${CST.liq === v ? "selected" : ""}>${l}</option>`).join("")}</select></label>
      <label class="chk"><input type="checkbox" id="c-pea" ${CST.pea ? "checked" : ""}> Actions logées dans un PEA</label>
      <label class="chk"><input type="checkbox" id="c-pg" ${CST.pieges ? "checked" : ""}> Écarter les pièges (value piège, dividende fragile, dette lourde…)</label>
      <label class="chk"><input type="checkbox" id="c-men" ${CST.menaces ? "checked" : ""}> Écarter les sociétés menacées directement par une rupture</label>
      <div class="field"><span>Style recherché</span><div class="chips" id="c-prof">${PROFILS.map(p => `<button class="chip" data-p="${p.id}" aria-pressed="${CST.profil === p.id}">${esc(p.l)}</button>`).join("")}</div></div>
      <div class="field"><span>Ruptures</span><div class="thset">${Object.entries(th).map(([k, l]) => `<div><span>${esc(l)}</span><div class="seg" data-th="${k}">${[[1, "Favoriser"], [0, "Neutre"], [-1, "Éviter"]].map(([v, t]) => `<button data-v="${v}" aria-pressed="${(CST.themes[k] || 0) === v}">${t}</button>`).join("")}</div></div>`).join("")}</div></div>
      <label class="field" for="c-pond"><span>Pondération des actions</span><select id="c-pond"><option value="egale" ${CST.pond === "egale" ? "selected" : ""}>Même poids</option><option value="vol" ${CST.pond === "vol" ? "selected" : ""}>Inverse de la volatilité</option></select></label>
      <div class="field"><span>Secteurs exclus</span><div class="chips" id="c-sect">${secteurs.map(s => `<button class="chip" data-s="${esc(s)}" aria-pressed="${CST.sectEx.includes(s)}">${esc(s)}</button>`).join("")}</div></div>
      <button class="ghost small" id="c-reset">Revenir aux réglages de départ</button>
    </div>
    <div class="stack" id="cst-out"></div></div>`;
  // Réglages
  const upd = () => { CST.picks = {}; cstSave(); renderConstructeur(); };
  const rg = (id, k) => { const el = $(id); el.oninput = () => { CST[k] = +el.value; el.previousElementSibling.querySelector("b").textContent = k === "risque" ? RISQ[CST.risque - 1].l : CST[k] + " %"; }; el.onchange = () => { if (k !== "risque") CST.n = {}; upd(); }; };
  rg("#c-risque", "risque"); rg("#c-vifs", "vifs"); rg("#c-geo", "geoEU");
  $("#c-m").onchange = e => { CST.montant = Math.max(1000, +e.target.value || 1000); CST.n = {}; upd(); };
  $("#c-h").onchange = e => { CST.horizon = clamp(Math.round(+e.target.value || 1), 1, 30); upd(); };
  $("#c-liq").oninput = e => { CST.liq = +e.target.value; upd(); };
  $("#c-pea").oninput = e => { CST.pea = e.target.checked; upd(); };
  $("#c-pg").oninput = e => { CST.pieges = e.target.checked; upd(); };
  $("#c-men").oninput = e => { CST.menaces = e.target.checked; upd(); };
  $("#c-pond").oninput = e => { CST.pond = e.target.value; cstSave(); renderConstructeur(); };
  $$("#c-prof button").forEach(b => b.onclick = () => { const p = PROFILS.find(x => x.id === b.dataset.p); CST.profil = p.id; CST.w = {...p.w}; upd(); });
  $$(".thset .seg").forEach(sg => sg.querySelectorAll("button").forEach(b => b.onclick = () => { CST.themes[sg.dataset.th] = +b.dataset.v; upd(); }));
  $$("#c-sect button").forEach(b => b.onclick = () => { const s = b.dataset.s; CST.sectEx = CST.sectEx.includes(s) ? CST.sectEx.filter(x => x !== s) : CST.sectEx.concat([s]); upd(); });
  $("#c-reset").onclick = () => { CST = JSON.parse(JSON.stringify(CST_DEF)); upd(); };
  renderCstOut(lists, built);
}
function renderCstOut(lists, built){
  const out = $("#cst-out");
  if (!built){ out.innerHTML = `<div class="card"><p class="empty">Aucune ligne ne correspond à ces réglages : assouplissez la liquidité, les exclusions ou les thèmes évités.</p></div>`; return; }
  const M = CST.montant, wOf = new Map(built.ids.map((id, i) => [id, built.w[i]]));
  const L = built.ids.map((id, i) => ({x:B.byId.get(id), r:B.R.get(id), w:built.w[i]})).filter(l => l.w > 1e-6);
  const an = Q.analyse(L.map(l => ({id:l.x.id, r:l.r, mu:l.x.mu})), L.map(l => l.w));
  const poches = {}; for (const l of L){ const k = POCHE[l.x.cls]; poches[k] = (poches[k] || 0) + l.w; }
  const lt = lookThrough(L), eqW = poches.actions || 0;
  const euEq = eqW > 0 ? L.filter(l => POCHE[l.x.cls] === "actions").reduce((a, l) => a + l.w * (l.x.kind === "action" ? (l.x.zone === "eu" ? 1 : 0) : l.x.cls === "act_eu" ? 1 : l.x.cls === "act_monde" || l.x.cls === "act_style" ? .16 : 0), 0) / eqW : 0;
  const st08 = (() => { let v = 0, c = 0; for (const {x, w} of L){ const s = shockOf(x, "2008"); if (s){ v += w * s.v; c += w; } } return c > .5 ? v / c : null; })();
  const minLine = Math.min(...L.map(l => l.w * M));
  const illq = L.filter(({x, w}) => x.kind === "action" && ok(x.liq) && M * w / (x.liq * 1e6 * .1) > 1);
  const peaAmt = L.filter(l => l.x.pea && POCHE[l.x.cls] === "actions").reduce((a, l) => a + l.w * M, 0), peaMax = 150000 * (CMP.adultes || 1);
  const secMax = Object.entries(lt.sect).filter(([k]) => !k.startsWith("ETF") && !POCHE_L[Object.keys(POCHE_L).find(p => POCHE_L[p] === k)]).sort((a, b) => b[1] - a[1])[0];
  const okVol = built.bd <= 1;
  const check = (good, l, v, c) => `<div class="chk2 ${good === true ? "good" : good === false ? "bad" : "neu"}"><i></i><div><b>${l}</b> <span>${v}</span>${c ? `<small>${c}</small>` : ""}</div></div>`;
  out.innerHTML = `
    <div class="card"><div class="btnrow" style="justify-content:space-between"><h2>Allocation proposée</h2><button class="primary" id="c-create">Créer ce portefeuille fictif</button></div>
      <div class="alloc">${["actions", "obligations", "monetaire", "or"].filter(k => poches[k] > 1e-4).map(k => `<div title="${POCHE_L[k]} : ${nf0.format(poches[k] * 100)} %" style="--w:${poches[k] * 100}%;--c:var(${{actions:"--c2", obligations:"--c1", monetaire:"--c5", or:"--c4"}[k]})"><b>${POCHE_L[k]}</b><span>${nf0.format(poches[k] * 100)} % · ${F.eur(poches[k] * M)}</span></div>`).join("")}</div>
      <div class="checks">
        ${check(okVol, "Volatilité estimée", `${nf1.format(built.vol)} % pour ${nf1.format(built.target)} % visés`, okVol ? "" : built.e >= built.mx - .001 ? `Plafond de ${nf0.format(built.mx * 100)} % d'actions pour un horizon de ${CST.horizon} an${CST.horizon > 1 ? "s" : ""}.` : "Cible hors d'atteinte avec ces lignes : changez le style ou la part en titres vifs.")}
        ${check(an.enb >= Math.min(6, L.length * .5), "Paris indépendants", nf1.format(an.enb) + " pour " + L.length + " lignes", `facteur dominant : ${nf0.format(an.pc1 * 100)} % du risque`)}
        ${check(null, "Rendement réel attendu", F.pct(an.mu) + " par an", "avant impôt, valorisations actuelles")}
        ${check(ok(st08) ? st08 > -RISQ[CST.risque - 1].vol * 3 : null, "Crise de 2008 rejouée", fmt(st08, F.pctS), ok(st08) ? F.eur(M * st08 / 100) : "")}
        ${check(minLine >= 1000, "Plus petite ligne", F.eur(minLine), minLine < 1000 ? "en dessous de 1 000 €, les frais pèsent lourd" : "")}
        ${check(illq.length === 0, "Liquidité", illq.length ? illq.length + " ligne(s) à vendre sur plusieurs jours" : "chaque ligne se vend dans la journée")}
        ${eqW > 0 ? check(CST.pea ? true : Math.abs(euEq * 100 - CST.geoEU) <= 12, "Europe dans les actions", nf0.format(euEq * 100) + " %", CST.pea ? "" : `visé : ${CST.geoEU} %`) : ""}
        ${CST.pea && peaAmt > 0 ? check(peaAmt <= peaMax, "Plafond du PEA", F.eur(peaAmt) + " en actions", `plafond de versements : ${F.eur(peaMax)} pour ${CMP.adultes || 1} PEA`) : ""}
        ${secMax ? check(secMax[1] <= .3, "Premier secteur", `${esc(secMax[0])} : ${nf0.format(secMax[1] * 100)} %`) : ""}
      </div>
      ${CST.pea && (poches.obligations || poches.or || poches.monetaire) ? `<p class="note">Obligations, monétaire et or n'entrent pas dans un PEA : cette part se loge sur un compte-titres ou en assurance-vie.</p>` : ""}
    </div>
    ${lists.map(l => { const top = l.pool.slice(0, Math.max(l.n * 3, 15)).map(o => o.x); for (const x of l.sel) if (!top.includes(x)) top.unshift(x);
      return `<div class="card cl" data-l="${l.id}"><div class="btnrow" style="justify-content:space-between"><h2>${esc(l.titre)} : ${l.n > 1 ? `choisissez <span class="big">${l.n}</span> parmi ${l.pool.length}` : `<span class="big">1</span> ligne`}</h2>
        <div class="btnrow">${l.pool.length > 1 ? `<button class="ghost small" data-n="-1" aria-label="Une ligne de moins">−</button><button class="ghost small" data-n="1" aria-label="Une ligne de plus">+</button>` : ""}${l.manual ? '<button class="ghost small" data-reset="1">Sélection automatique</button>' : ""}</div></div>
        <p class="note">${esc(l.why)} ${l.sel.length !== l.n ? `<b>${l.sel.length} cochée${l.sel.length > 1 ? "s" : ""}.</b>` : ""}</p>
        <div class="tblwrap" style="border:0"><table class="t cand"><thead><tr><th></th><th>Ligne</th>${l.id === "actions" ? "<th>Catégorie</th><th class=\"n\">Note</th>" : ""}<th class="n">Volat.</th><th class="n">Rdt réel att.</th><th class="n">Poids</th><th class="n">Montant</th></tr></thead><tbody>
          ${top.map(x => { const on = l.sel.includes(x), w = wOf.get(x.id) || 0;
            return `<tr class="${on ? "on" : ""}"><td><input type="checkbox" data-pick="${esc(x.id)}" ${on ? "checked" : ""} aria-label="Retenir ${esc(x.nom)}"></td>
              <td><button class="lk" data-f="${esc(x.id)}">${esc(x.nom)}</button><span class="cmp" style="display:block;margin:0">${x.kind === "action" ? `${esc(x.id)} · ${esc(x.pays || "")} · ${esc(x.secteur)} · ${meur(x.liq)}/j` : `${esc(x.id)} · ${esc(CLS_L[x.cls])} · frais ${nf2.format(x.ter)} %`}${x.th && Object.keys(x.th).length ? " " + themePills(x.th, true) : ""}</span></td>
              ${l.id === "actions" ? `<td>${catPill(x.cat)}</td><td class="n">${fmt(noteProfil(x, CST.w), v => nf0.format(v))}</td>` : ""}
              <td class="n">${fmt(x.vol, v => nf0.format(v) + " %")}</td><td class="n">${fmt(x.mu, F.pct)}</td><td class="n">${on ? nf1.format(w * 100) + " %" : ""}</td><td class="n">${on ? F.eur(w * M) : ""}</td></tr>`; }).join("")}
        </tbody></table></div></div>`; }).join("")}`;
  $$("#cst-out [data-f]").forEach(b => b.onclick = () => openFiche(b.dataset.f));
  $$("#cst-out .cl").forEach(card => {
    const l = lists.find(x => x.id === card.dataset.l);
    card.querySelectorAll("[data-pick]").forEach(cb => cb.onchange = () => { const cur = l.sel.map(x => x.id); const id = cb.dataset.pick;
      CST.picks[l.id] = cb.checked ? cur.concat([id]) : cur.filter(x => x !== id); cstSave(); renderConstructeur(); });
    card.querySelectorAll("[data-n]").forEach(b => b.onclick = () => { CST.n[l.id] = clamp(l.n + +b.dataset.n, 1, Math.min(40, l.pool.length)); delete CST.picks[l.id]; cstSave(); renderConstructeur(); });
    const rs = card.querySelector("[data-reset]"); if (rs) rs.onclick = () => { delete CST.picks[l.id]; cstSave(); renderConstructeur(); };
  });
  $("#c-create").onclick = () => {
    const lignes = L.map(l => ({id:l.x.id, w:+(l.w * 100).toFixed(2)}));
    pfNew(`Constructeur · ${RISQ[CST.risque - 1].l} · ${CST.horizon} ans`, lignes, CST.montant, CST.horizon);
    toast("Portefeuille fictif créé"); go("portefeuille");
  };
}
