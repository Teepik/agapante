/* ================= Carte du monde ================= */
const MAP = {W:960, H:480, ind:INDS[0], grp:"Actions", zone:"all", sel:null, tab:"synthese", feats:[], byCode:{}, scale:null, rankDir:"top"};
const SMALL = ["SG","HK","LU","QA","MT","BH"];
function inZone(c){
  if (!c || MAP.zone === "all") return true;
  if (["DM","EM","FM"].includes(MAP.zone)) return c.cls === MAP.zone;
  return c.region === MAP.zone;
}
function valOf(c, k){ if (!c) return null; const v = c[k]; return ok(v) ? v : null; }
function buildScale(){
  const ind = MAP.ind;
  const vals = Object.values(P).filter(c => inZone(c) && (!c.hors || !["sA","sO"].includes(ind.k))).map(c => valOf(c, ind.k)).filter(ok).sort(d3.ascending);
  const n = 7;
  if (!vals.length){ MAP.scale = null; return; }
  const rev = ind.good === "low";
  if (ind.div){
    let m = Math.max(Math.abs(d3.quantile(vals, .04)), Math.abs(d3.quantile(vals, .96)));
    if (!(m > 0)) m = 1;
    const th = d3.range(1, n).map(i => -m + 2*m*i/n);
    const pal = d3.range(n).map(i => css("--d" + i));
    const q = d3.scaleThreshold().domain(th).range(rev ? pal.slice().reverse() : pal);
    MAP.scale = {fn:q, th, lo:-m, hi:m, rev, pal:rev ? pal.slice().reverse() : pal};
  } else {
    const pal = d3.range(n).map(i => css("--s" + i));
    let th;
    if (ind.k === "noteN") th = [3.5, 5.5, 7.5, 9.5, 12.5, 16.5];
    else { th = d3.range(1, n).map(i => d3.quantile(vals, i/n)); th = th.map((t,i) => i && t <= th[i-1] ? th[i-1] + 1e-9 : t); }
    const q = d3.scaleThreshold().domain(th).range(rev ? pal.slice().reverse() : pal);
    MAP.scale = {fn:q, th, lo:vals[0], hi:vals[vals.length-1], rev, pal:rev ? pal.slice().reverse() : pal};
  }
}
function fillOf(c){
  if (!c || !inZone(c)) return css(c ? "--out" : "--nodata");
  const v = valOf(c, MAP.ind.k);
  if (v === null || !MAP.scale) return css("--nodata");
  return MAP.scale.fn(v);
}
function shortV(v){
  const k = MAP.ind.k;
  if (k === "noteN") return NOTE_LBL[Math.round(v)] || "";
  if (k === "spr") return nf0.format(v);
  if (["sA","sO"].includes(k)) return nf0.format(v);
  return Math.abs(v) >= 10 ? nf0.format(v) : nf1.format(v);
}
function renderLegend(){
  const L = $("#legend"), ind = MAP.ind, s = MAP.scale;
  if (!s){ L.innerHTML = `<div class="t">${esc(ind.l)}</div><div class="note">Pas de donnée dans cette zone.</div>`; return; }
  // les cases vont toujours du moins favorable (clair) au plus favorable (foncé)
  const order = s.rev ? s.th.slice().reverse() : s.th;
  const tk = [order[0], order[Math.floor(order.length/2)], order[order.length-1]];
  const ends = ind.ends || (ind.good === "high" ? ["faible","élevé"] : ind.good === "low" ? ["élevé","faible"] : ["bas","haut"]);
  L.innerHTML = `<div class="t">${esc(ind.l)}</div>
    <div class="scale"><div class="row">${s.pal.map(c => `<span class="sw" style="background:${c}"></span>`).join("")}</div>
    <div class="ticks"><span></span>${tk.map(v => `<span>${esc(shortV(v))}</span>`).join("")}<span></span></div>
    <div class="ends"><span>${esc(ends[0])}</span><span>${esc(ends[1])}</span></div></div>
    <div class="nd" style="flex-direction:column;align-items:flex-start;gap:3px;margin:0"><span><i></i> Pas de donnée</span>${$("#hatch").checked ? '<span><i class="hatch"></i> Points de vigilance</span>' : ""}</div>`;
}
let svgSel, gMap, zoom, pathGen;
function initMap(world){
  const feats = topojson.feature(world, world.objects.countries).features.filter(f => f.id !== "010");
  const num2code = {}; for (const c of Object.values(P)) num2code[c.num] = c.code;
  for (const f of feats) f.code = num2code[f.id] || null;
  MAP.feats = feats;
  const proj = d3.geoNaturalEarth1().fitExtent([[6, 6], [MAP.W - 6, MAP.H - 6]], {type:"FeatureCollection", features:feats});
  pathGen = d3.geoPath(proj);
  svgSel = d3.select("#map").attr("viewBox", `0 0 ${MAP.W} ${MAP.H}`).attr("preserveAspectRatio", "xMidYMid meet");
  const defs = svgSel.append("defs");
  defs.append("pattern").attr("id", "hatchPat").attr("patternUnits", "userSpaceOnUse").attr("width", 5).attr("height", 5).attr("patternTransform", "rotate(45)")
    .append("line").attr("x1", 0).attr("y1", 0).attr("x2", 0).attr("y2", 5).attr("stroke", css("--bad")).attr("stroke-width", 1.4).attr("opacity", .75);
  gMap = svgSel.append("g");
  gMap.append("path").attr("d", pathGen({type:"Sphere"})).attr("fill", "none");
  gMap.append("g").attr("class", "cs").selectAll("path").data(feats).join("path").attr("class", "c").attr("d", pathGen).attr("data-code", d => d.code || "");
  gMap.append("g").attr("class", "hz").attr("pointer-events", "none");
  const mk = SMALL.filter(k => P[k] && !P[k].hors).map(k => ({code:k, c:proj(d3.geoCentroid(feats.find(f => f.code === k) || {type:"Point", coordinates:[0,0]}))})).filter(d => d.c);
  gMap.append("g").attr("class", "mks").selectAll("circle").data(mk).join("circle").attr("class", "mk").attr("r", 3.6).attr("cx", d => d.c[0]).attr("cy", d => d.c[1]).attr("data-code", d => d.code);
  zoom = d3.zoom().scaleExtent([1, 14]).translateExtent([[0,0],[MAP.W, MAP.H]]).on("zoom", e => { gMap.attr("transform", e.transform); gMap.selectAll("circle.mk").attr("r", 3.6 / Math.sqrt(e.transform.k)); });
  svgSel.call(zoom).on("dblclick.zoom", null);
  $("#zin").onclick = () => svgSel.transition().duration(250).call(zoom.scaleBy, 1.8);
  $("#zout").onclick = () => svgSel.transition().duration(250).call(zoom.scaleBy, 1/1.8);
  $("#zreset").onclick = () => svgSel.transition().duration(300).call(zoom.transform, d3.zoomIdentity);
  const tip = $("#tip"), box = $("#mapbox");
  let down = null;
  svgSel.on("pointerdown", e => { down = [e.clientX, e.clientY]; });
  svgSel.on("pointerup", e => {
    if (!down || Math.hypot(e.clientX - down[0], e.clientY - down[1]) > 5) return;
    const code = e.target.getAttribute && e.target.getAttribute("data-code");
    if (code && P[code]) selectCountry(code);
  });
  svgSel.on("pointermove", e => {
    const code = e.target.getAttribute && e.target.getAttribute("data-code");
    gMap.selectAll("path.c.hov").classed("hov", false);
    if (!code || !P[code]){ tip.hidden = true; return; }
    d3.select(e.target).classed("hov", true);
    const c = P[code], v = valOf(c, MAP.ind.k), r = box.getBoundingClientRect();
    const fl = (c.flags || []).filter(f => f.t !== "good");
    tip.innerHTML = `<b>${esc(c.nom)}</b>${esc(MAP.ind.l)} : ${esc(fmt(v, MAP.ind.f))}${fl.length ? `<div class="w">${fl.map(f => esc(f.l)).join(" · ")}</div>` : ""}`;
    tip.hidden = false;
    let x = e.clientX - r.left + 14, y = e.clientY - r.top + 12;
    if (x + tip.offsetWidth > r.width - 6) x = e.clientX - r.left - tip.offsetWidth - 12;
    if (y + tip.offsetHeight > r.height - 6) y = e.clientY - r.top - tip.offsetHeight - 10;
    tip.style.left = x + "px"; tip.style.top = y + "px";
  });
  svgSel.on("pointerleave", () => { tip.hidden = true; gMap.selectAll("path.c.hov").classed("hov", false); });
  $("#loading").hidden = true;
}
function drawMap(){
  if (!gMap) return;
  buildScale(); renderLegend();
  gMap.selectAll("path.c").attr("fill", d => fillOf(P[d.code])).classed("sel", d => d.code && d.code === MAP.sel);
  gMap.selectAll("circle.mk").attr("fill", d => fillOf(P[d.code])).classed("sel", d => d.code === MAP.sel);
  const hz = $("#hatch").checked ? MAP.feats.filter(f => f.code && P[f.code] && P[f.code].alert && inZone(P[f.code])) : [];
  gMap.select("g.hz").selectAll("path").data(hz, d => d.id).join("path").attr("d", pathGen).attr("fill", "url(#hatchPat)");
  renderRanking();
}
function setGroup(g){
  MAP.grp = g;
  $$("#grp button").forEach(b => b.setAttribute("aria-pressed", b.dataset.g === g));
  const sel = $("#ind");
  sel.innerHTML = INDS.filter(i => i.g === g).map(i => `<option value="${i.k}">${esc(i.l)}</option>`).join("");
  setIndicator(sel.value);
}
function setIndicator(k){ MAP.ind = IND[k]; $("#ind").value = k; drawMap(); }
function renderRanking(){
  const ind = MAP.ind, list = U.filter(c => inZone(c) && ok(valOf(c, ind.k)) && c.code !== "RU");
  const fav = ind.good === "low" ? (a,b) => a[ind.k] - b[ind.k] : (a,b) => b[ind.k] - a[ind.k];
  list.sort(fav); if (MAP.rankDir === "bottom") list.reverse();
  const top = list.slice(0, 12);
  const vals = list.map(c => c[ind.k]), lo = Math.min(...vals), hi = Math.max(...vals);
  const w = v => ind.good === "low" ? (hi - v) / (hi - lo || 1) : (v - lo) / (hi - lo || 1);
  const dirLbl = ind.good ? ["Les plus favorables","Les moins favorables"] : ["Les plus élevés","Les plus bas"];
  $("#ranking").innerHTML = `<div class="btnrow" style="justify-content:space-between"><h3>Classement · ${esc(ind.l)}</h3>
    <div class="seg" role="group" aria-label="Sens du classement"><button data-dir="top" aria-pressed="${MAP.rankDir === "top"}">${dirLbl[0]}</button><button data-dir="bottom" aria-pressed="${MAP.rankDir === "bottom"}">${dirLbl[1]}</button></div></div>
    ${top.length ? `<div class="rk">${top.map((c,i) => `<button data-code="${c.code}"><span class="i">${MAP.rankDir === "top" ? i+1 : list.length - i}</span><span>${esc(c.nom)}${c.alert ? ' <span class="pill bad" style="font-size:10px;padding:0 6px">vigilance</span>' : ""}</span><span class="v">${esc(fmt(c[ind.k], ind.f))}</span><span class="bar3"><i style="width:${(8 + 92*w(c[ind.k])).toFixed(0)}%"></i></span></button>`).join("")}</div>` : '<p class="note">Aucun pays de cette zone ne dispose de cet indicateur.</p>'}
    ${ind.d ? `<p class="note" style="margin-top:8px">${esc(ind.d)}</p>` : ""}`;
  $$("#ranking .rk button").forEach(b => b.onclick = () => selectCountry(b.dataset.code));
  $$("#ranking .seg button").forEach(b => b.onclick = () => { MAP.rankDir = b.dataset.dir; renderRanking(); });
}

/* ================= Fiche pays ================= */
function selectCountry(code, keepTab){
  MAP.sel = code;
  if (!keepTab && P[code] && P[code].hors) MAP.tab = "obligations";
  drawMap(); renderPanel();
  if (window.innerWidth < 960) document.querySelector(".panel").scrollIntoView({behavior:"smooth", block:"start"});
}
function kpi(l, v, c){ return `<div class="kpi"><div class="l">${esc(l)}</div><div class="v">${v}</div>${c ? `<div class="c">${c}</div>` : ""}</div>`; }
function rangOf(k, c, hb){ const l = U.filter(x => ok(x[k]) && x.code !== "RU").sort((a,b) => hb ? b[k] - a[k] : a[k] - b[k]); const i = l.indexOf(c); return i < 0 ? "" : `${i+1}<sup>e</sup> sur ${l.length}`; }
function renderPanel(){
  const c = P[MAP.sel];
  if (!c){ return; }
  $("#pname").textContent = c.nom;
  const meta = [];
  if (c.region) meta.push(c.region);
  if (c.cls) meta.push(CLS[c.cls] || c.cls);
  if (c.ccy) meta.push("Devise : " + c.ccy + (c.peg === "USD" ? " (ancrée au dollar)" : c.peg === "EUR" ? " (ancrée à l'euro)" : ""));
  if (c.note) meta.push("Moody's " + c.note);
  if (c.hors) meta.push("Indicateurs macroéconomiques seulement");
  $("#pmeta").innerHTML = meta.map(m => `<span>${esc(m)}</span>`).join("");
  $("#pflags").innerHTML = (c.flags || []).map(f => `<span class="pill ${f.t}" title="${esc(f.d)}">${esc(f.l)}</span>`).join("");
  $$(".tabs button").forEach(b => b.setAttribute("aria-selected", b.dataset.tab === MAP.tab));
  const body = $("#pbody");
  body.innerHTML = ({synthese:tabSynthese, actions:tabActions, obligations:tabOblig, devise:tabDevise, acces:tabAcces}[MAP.tab])(c);
  if (MAP.tab === "actions") drawCapeHist(c);
  if (MAP.tab === "devise") drawFx(c);
  if (MAP.tab === "obligations" && D.courbes[c.code]) drawMiniCurve(c);
  $$("#pbody [data-act]").forEach(b => b.onclick = () => panelAction(b.dataset.act, c));
}
function scoreBlock(title, s, parts, rangK){
  if (!ok(s)) return `<div><h3>${title}</h3><p class="empty">Données insuffisantes pour ce pays.</p></div>`;
  return `<div style="display:flex;flex-direction:column;gap:8px"><h3>${title}</h3>
    <div class="bigscore"><b>${nf0.format(s)}</b><span>/ 100 · ${rangOf(rangK, P[MAP.sel], true)}</span></div>
    <div class="scorebar">${parts.map(p => `<div class="sb"><div class="lab"><span>${esc(p.l)} <span style="white-space:nowrap;color:var(--muted)">· ${nf0.format(p.w*100)} %</span></span><span>${esc(fmt(p.v, p.f))}</span></div><div class="track"><i style="width:${ok(p.r) ? Math.max(3, p.r) : 0}%"></i></div></div>`).join("")}</div></div>`;
}
function tabSynthese(c){
  const fl = c.flags || [];
  const call = fl.map(f => `<div class="callout ${f.t === "bad" ? "bad" : f.t === "good" ? "good" : ""}"><b>${esc(f.l)}.</b> ${esc(f.d)}</div>`).join("");
  return `
    ${c.hors ? `<p class="empty">${esc(c.nom)} figure sur la carte pour ses indicateurs macroéconomiques et sa note ; l'atlas suit en détail ${U.length} marchés investissables.</p>` : `<div class="kpis">${scoreBlock("Score actions", c.sA, c.sAparts || [], "sA")}${scoreBlock("Score obligations", c.sO, c.sOparts || [], "sO")}</div>`}
    ${call ? `<div style="display:flex;flex-direction:column;gap:8px"><h3>Points saillants</h3>${call}</div>` : ""}
    <div class="kpis k3">
      ${kpi("Rendement réel attendu des actions", fmt(c.ey, F.pct), ok(c.cape) ? "1 / CAPE de " + nf1.format(c.cape) : "CAPE non publié")}
      ${kpi("PER", fmt(c.per, F.x), ok(c.z10) ? F.sig(c.z10) + " face à 10 ans" : "")}
      ${kpi("Taux d'État à 10 ans", fmt(c.y10, F.pct2), ok(c.dy10ytd) ? F.pts(c.dy10ytd) + " depuis janvier" : "")}
      ${kpi("Taux réel à 10 ans", fmt(c.reel, F.pts), ok(c.infl) ? "inflation " + F.pct(c.infl) : "")}
      ${kpi("Devise contre l'euro, 10 ans", c.ccy === "EUR" ? "euro" : fmt(c.fx10, F.pctS), c.ccy === "EUR" ? "aucun risque de change" : "par an")}
      ${kpi("Prime de risque pays", fmt(c.crp, F.pct2), c.note ? "Moody's " + esc(c.note) : "")}
    </div>
    ${c.hors ? "" : `<div class="btnrow"><button class="ghost" data-act="suivre">Suivre ce pays</button><button class="ghost" data-act="alerte">Créer une alerte</button></div>`}`;
}
function gauge(z, lbl){
  if (!ok(z)) return "";
  const pos = clamp((z + 3) / 6, 0, 1) * 100;
  return `<div><div class="lab" style="display:flex;justify-content:space-between;font-size:12.5px"><span>${esc(lbl)}</span><span style="font-family:var(--mono)">${F.sig(z)}</span></div>
    <div class="gauge"><div class="rail"></div><div class="tick" style="left:calc(${pos}% - 1px)"></div></div>
    <div class="gauge-axis" style="display:flex;justify-content:space-between;font-size:10.5px;color:var(--muted)"><span>−3 σ bon marché</span><span>moyenne</span><span>cher +3 σ</span></div></div>`;
}
function tabActions(c){
  if (!ok(c.per) && !ok(c.cape)) return `<p class="empty">Aucune donnée de valorisation actions pour ce pays dans les sources suivies (Siblis Research, World PE Ratio).</p>${ok(c.erp) ? `<table class="t"><tr><td>Prime de risque actions exigée (Damodaran)</td><td>${F.pct2(c.erp)}</td></tr></table>` : ""}`;
  const world = basketEY(W_WORLD);
  const rows = [];
  if (ok(c.cape)) rows.push(["CAPE (sept. 2026)", nf1.format(c.cape) + `<span class="cmp">${ok(c.cape_prev) ? "sept. 2025 : " + nf1.format(c.cape_prev) : ""}</span>`]);
  if (ok(c.cape_med)) rows.push(["CAPE médian 2006-2025", nf1.format(c.cape_med) + `<span class="cmp">plus cher que ${c.cape_rang} % des fins d'année</span>`]);
  if (ok(c.ey)) rows.push(["Rendement réel attendu (1 / CAPE)", F.pct(c.ey) + `<span class="cmp">Monde : ${F.pct(world)}</span>`]);
  if (ok(c.eyPe)) rows.push(["Rendement bénéficiaire courant (1 / PER)", F.pct(c.eyPe)]);
  if (ok(c.div)) rows.push(["Dividende (juin 2026)", F.pct(c.div) + `<span class="cmp">${ok(c.div_prev) ? "juin 2025 : " + F.pct(c.div_prev) : ""}</span>`]);
  if (ok(c.tend)) rows.push(["Cours face à la moyenne 200 jours", F.pctS(c.tend)]);
  if (ok(c.erp)) rows.push(["Prime de risque exigée (Damodaran)", F.pct2(c.erp) + `<span class="cmp">dont pays ${F.pct2(c.crp)}</span>`]);
  return `
    <div class="kpis">${kpi("PER", fmt(c.per, F.x), "6 novembre 2026")}${kpi("Rendement réel attendu", fmt(c.ey, F.pct), "par an sur 10 ans, hors inflation")}</div>
    <div style="display:flex;flex-direction:column;gap:10px"><h3>Cherté face à son histoire</h3>${gauge(c.z5, "PER face à sa moyenne 5 ans")}${gauge(c.z10, "PER face à sa moyenne 10 ans")}${gauge(c.z20, "PER face à sa moyenne 20 ans")}</div>
    <table class="t">${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>
    ${D.capeHist[c.code] ? `<div><h3>CAPE en fin d'année depuis 2006</h3><div class="chart" id="capeChart"></div></div>` : ""}
    <p class="note">Aux États-Unis, le niveau du PER explique environ 73 % des écarts de rendement sur 10 ans et presque rien sur un an (modèle de World PE Ratio : R² de 0,73 à 10 ans, de 0,01 à un an). La valorisation sert à répartir, rarement à choisir le moment.</p>`;
}
function drawCapeHist(c){
  const el = $("#capeChart"); if (!el) return;
  const s = D.capeHist[c.code].map(([p, v]) => [p === "2026-09" ? 2026.75 : +p, v]);
  lineChart(el, [{pts:s, color:css("--accent"), area:true}], {h:170, xFmt:d3.format("d"), ref:[{y:c.cape_med, label:"médiane"}], label:"CAPE " + c.nom});
}
function tabOblig(c){
  if (!ok(c.y10) && !ok(c.infl)) return `<p class="empty">Aucune donnée obligataire pour ce pays.</p>`;
  const rows = [];
  if (ok(c.spr)) rows.push(["Écart avec le Bund allemand", F.pb(c.spr)]);
  if (ok(c.dy10m)) rows.push(["Variation sur un mois", F.pts(c.dy10m)]);
  if (ok(c.dy10a)) rows.push(["Variation sur un an", F.pts(c.dy10a)]);
  if (ok(c.taux)) rows.push([c.taux_bce ? "Taux de dépôt de la BCE" : "Taux directeur", F.pct2(c.taux) + `<span class="cmp">${esc(refFr(c.taux_ref))}</span>`]);
  if (c.note) rows.push(["Note Moody's (janvier 2026)", esc(c.note) + (c.code === "FR" ? `<span class="cmp">maintenue le 23 oct. 2026 ; S&P et Fitch : A+</span>` : "")]);
  if (ok(c.spd)) rows.push(["Écart de défaut associé à la note", F.pct2(c.spd)]);
  const eur = c.ccy === "EUR" ? `<div class="callout good">Emprunt en euros : aucun risque de change pour un épargnant français.</div>` :
    `<table class="t"><tr><td>Taux en euros, dérive historique de la devise (10 ans)</td><td>${fmt(c.yEur, F.pct)}</td></tr><tr><td>Taux en euros, différentiel d'inflation avec la zone euro</td><td>${fmt(c.yPpp, F.pct)}</td></tr></table>
     <p class="note">Le premier calcul suppose que la devise continue de varier comme sur les dix dernières années ; le second, qu'elle compense l'écart d'inflation avec la zone euro (${F.pct(EZ_INFL)} en octobre).</p>`;
  return `
    <div class="kpis">${kpi("Taux d'État à 10 ans", fmt(c.y10, F.pct2), ok(c.dy10ytd) ? F.pts(c.dy10ytd) + " depuis janvier" : "")}${kpi("Inflation sur un an", fmt(c.infl, F.pct), esc(refFr(c.infl_ref)))}${kpi("Taux réel", fmt(c.reel, F.pts), "10 ans moins inflation")}${kpi("Rendement en euros", c.ccy === "EUR" ? fmt(c.y10, F.pct) : fmt(c.yEur, F.pct), c.ccy === "EUR" ? "sans change" : "après dérive de la devise")}</div>
    ${eur}
    <table class="t">${rows.map(r => `<tr><td>${r[0]}</td><td>${r[1]}</td></tr>`).join("")}</table>
    ${D.courbes[c.code] ? `<div><h3>Courbe des taux au 6 novembre 2026</h3><div class="chart" id="miniCurve"></div></div>` : ""}`;
}
function drawMiniCurve(c){ const el = $("#miniCurve"); if (!el) return; lineChart(el, [{pts:D.courbes[c.code].pts, color:css("--accent")}], {h:160, xFmt:v => v + " a", yFmt:v => nf1.format(v) + " %", label:"Courbe " + c.nom}); }
function tabDevise(c){
  if (c.ccy === "EUR") return `<p class="empty">${esc(c.nom)} utilise l'euro : aucun risque de change.</p>`;
  if (!D.fx[c.ccy]) return `<p class="empty">La BCE ne publie pas de cours de référence pour le ${esc(c.ccy)} ; l'atlas ne peut pas mesurer sa dérive contre l'euro. Les ETF en devises locales y restent exposés.</p>`;
  return `
    <div class="kpis k3">${kpi("Sur un an", fmt(c.fx1, F.pctS), "contre l'euro")}${kpi("Par an sur 5 ans", fmt(c.fx5, F.pctS), "")}${kpi("Par an sur 10 ans", fmt(c.fx10, F.pctS), "")}${kpi("Par an sur 20 ans", fmt(c.fx20, F.pctS), "")}${kpi("Volatilité annuelle", fmt(c.fxvol, F.pct), "10 ans, mensuelle")}${kpi("Cours BCE", nf2.format(c.fxlast) + " " + esc(D.fx[c.ccy].src), "pour 1 € · " + esc(D.meta.fx_date.split("-").reverse().join("/")))}</div>
    ${c.peg === "USD" ? `<div class="callout">Devise ancrée au dollar : son cours contre l'euro suit celui du dollar.</div>` : ""}
    <div><h3>Valeur de la devise en euros (base 100 en 2006)</h3><div class="chart" id="fxChart"></div></div>
    <p class="note">Au-dessus de 100, la devise vaut plus d'euros qu'en 2006 ; un placement dans cette devise y a gagné en change. Source : cours de référence de la BCE, fin de mois.</p>`;
}
function drawFx(c){
  const el = $("#fxChart"); if (!el || !D.fx[c.ccy]) return;
  const s = D.fx[c.ccy].s.filter(([m]) => m >= "2006-01"); const base = s[0][1];
  const pts = s.map(([m, v]) => [new Date(m + "-15"), 100 * base / v]);
  lineChart(el, [{pts, color:css("--accent"), area:true}], {h:180, xType:"time", ref:[{y:100}], yFmt:v => nf0.format(v), label:"Devise " + c.ccy});
}
function tabAcces(c){
  const a = acces(c);
  return `
    <div><h3>Actions</h3><ul style="margin:6px 0 0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${a.actions.map(t => `<li>${esc(t)}</li>`).join("") || "<li>Pas d'accès direct identifié.</li>"}</ul></div>
    <div><h3>Obligations</h3><ul style="margin:6px 0 0;padding-left:18px;display:flex;flex-direction:column;gap:6px">${a.oblig.map(t => `<li>${esc(t)}</li>`).join("")}</ul></div>
    ${a.ret ? `<table class="t"><tr><td>Retenue à la source sur les dividendes</td><td>${nf1.format(a.ret[0])} %</td></tr><tr><td>Plafond prévu par la convention fiscale</td><td>${nf1.format(a.ret[1])} %</td></tr><tr><td>Démarche</td><td class="l" style="text-align:right">${esc(a.ret[2])}</td></tr></table>
      <p class="note">En détention directe dans un compte-titres. Dans un PEA, la retenue étrangère est perdue ; dans un ETF capitalisant domicilié en Irlande, elle est réduite (≈ 15 % aux États-Unis) ou nulle (ETF synthétique).</p>` : ""}
    <div class="btnrow"><a class="ghost" style="text-decoration:none;padding:6px 11px;border:1px solid var(--line);border-radius:7px" href="${justetf("MSCI " + (ENGNAME[c.code] || c.nom))}" target="_blank" rel="noopener">Chercher les ETF sur justETF</a></div>`;
}
const ENGNAME = {US:"USA",GB:"United Kingdom",DE:"Germany",IT:"Italy",ES:"Spain",NL:"Netherlands",BE:"Belgium",AT:"Austria",FI:"Finland",IE:"Ireland",GR:"Greece",PT:"Portugal",CH:"Switzerland",SE:"Sweden",NO:"Norway",DK:"Denmark",PL:"Poland",CZ:"Czech",HU:"Hungary",TR:"Turkey",JP:"Japan",CN:"China",HK:"Hong Kong",TW:"Taiwan",KR:"Korea",IN:"India",ID:"Indonesia",MY:"Malaysia",TH:"Thailand",PH:"Philippines",VN:"Vietnam",SG:"Singapore",AU:"Australia",NZ:"New Zealand",CA:"Canada",MX:"Mexico",BR:"Brazil",CL:"Chile",CO:"Colombia",PE:"Peru",AR:"Argentina",ZA:"South Africa",SA:"Saudi Arabia",AE:"UAE",QA:"Qatar",IL:"Israel",EG:"Egypt",NG:"Nigeria",KE:"Kenya",MA:"Morocco",PK:"Pakistan",RO:"Romania",FR:"France"};
function panelAction(act, c){
  if (act === "suivre") addWatch({type:"pays", id:c.code});
  if (act === "alerte") openAlertModal({code:c.code, k:MAP.grp === "Obligations" ? "y10" : "sA"});
}

/* Recherche */
function initSearch(){
  const q = $("#q"), box = $("#sugg");
  let on = -1, items = [];
  const norm = s => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
  const show = () => {
    const t = norm(q.value.trim());
    if (!t){ box.hidden = true; q.setAttribute("aria-expanded", "false"); return; }
    items = Object.values(P).filter(c => norm(c.nom).includes(t) || (c.ccy && c.ccy.toLowerCase() === t)).sort((a,b) => (a.hors?1:0) - (b.hors?1:0) || norm(a.nom).indexOf(t) - norm(b.nom).indexOf(t)).slice(0, 10);
    on = -1;
    box.innerHTML = items.map((c,i) => `<button role="option" data-i="${i}">${esc(c.nom)}<small>${esc(c.hors ? "macro" : c.region || "")}</small></button>`).join("") || '<div class="note" style="padding:8px">Aucun pays</div>';
    box.hidden = false; q.setAttribute("aria-expanded", "true");
    $$("#sugg button").forEach(b => b.onmousedown = e => { e.preventDefault(); pick(+b.dataset.i); });
  };
  const pick = i => { const c = items[i]; if (!c) return; q.value = ""; box.hidden = true; selectCountry(c.code); };
  q.addEventListener("input", show);
  q.addEventListener("blur", () => setTimeout(() => box.hidden = true, 120));
  q.addEventListener("keydown", e => {
    if (box.hidden) return;
    if (e.key === "ArrowDown"){ on = Math.min(items.length - 1, on + 1); e.preventDefault(); }
    else if (e.key === "ArrowUp"){ on = Math.max(0, on - 1); e.preventDefault(); }
    else if (e.key === "Enter"){ pick(on < 0 ? 0 : on); e.preventDefault(); }
    else if (e.key === "Escape"){ box.hidden = true; }
    $$("#sugg button").forEach((b,i) => b.classList.toggle("on", i === on));
  });
}
